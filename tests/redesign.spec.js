import { expect, test } from "@playwright/test";

const requiredSections = [
  ".redesign-hero",
  ".origin",
  ".observations",
  ".project-story--skribli",
  ".project-story--signalflow",
  ".project-story--emotion",
  ".practice",
  ".beyond",
  ".closing",
];

const ignoredLocalResources = ["/_vercel/insights/script.js"];

function isIgnoredLocalResource(url) {
  return ignoredLocalResources.some((resource) => url.includes(resource));
}

async function captureScene(page, testInfo, name) {
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `test-results/redesign-${testInfo.project.name}-${name}.png`,
    fullPage: false,
  });
}

test("redesign renders its connected story without browser errors", async ({ page }, testInfo) => {
  const pageErrors = [];
  const consoleErrors = [];
  const failedResponses = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    const locationUrl = message.location().url || "";
    if (message.type() === "error" && !isIgnoredLocalResource(locationUrl)) {
      consoleErrors.push(`${message.text()}${locationUrl ? ` (${locationUrl})` : ""}`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && !isIgnoredLocalResource(response.url())) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/redesign", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Portfolio Preview/);
  await expect(page.locator(".hero-word--systems")).toContainText("SYSTEMS");
  await expect(page.locator(".hero-word--thinking")).toContainText("THINKING");
  await expect(page.locator(".hero-depth-plane--front")).toContainText(
    "expressed through software",
  );
  await expect(page.locator(".world__thread")).toHaveCount(1);
  await expect(page.locator(".section-rail")).toHaveCount(1);

  for (const selector of requiredSections) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await captureScene(page, testInfo, "hero");

  await page.locator(".origin").scrollIntoViewIfNeeded();
  await captureScene(page, testInfo, "origin");

  await page.locator(".project-story--skribli").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-story--skribli .project-story__statement")).toBeVisible();
  await captureScene(page, testInfo, "skribli");

  await page.locator(".project-story--signalflow").scrollIntoViewIfNeeded();
  await captureScene(page, testInfo, "signalflow");

  await page.locator(".project-story--emotion").scrollIntoViewIfNeeded();
  await captureScene(page, testInfo, "research");

  await page.locator(".practice").scrollIntoViewIfNeeded();
  await expect(page.locator(".practice-number__value")).toHaveText("806");
  await captureScene(page, testInfo, "practice");

  await page.locator(".beyond").scrollIntoViewIfNeeded();
  await captureScene(page, testInfo, "beyond");

  await page.locator(".closing").scrollIntoViewIfNeeded();
  await expect(page.locator(".closing__links > *")).toHaveCount(4);
  await captureScene(page, testInfo, "closing");

  await page.locator(".alpha-entry").click();
  await expect(page.locator(".alpha-panel")).toBeVisible();
  await page.locator(".alpha-panel__close").click();
  await expect(page.locator(".alpha-panel")).toHaveCount(0);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
