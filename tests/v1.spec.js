import { expect, test } from "@playwright/test";

const requiredSections = [
  "#top",
  "#story",
  "#work",
  ".work-list",
  "#research",
  "#beyond",
  ".closing",
];

const ignoredLocalResources = ["/_vercel/insights/script.js"];

function isIgnoredLocalResource(url) {
  return ignoredLocalResources.some((resource) => url.includes(resource));
}

async function captureScene(page, testInfo, name) {
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `test-results/v1-${testInfo.project.name}-${name}.png`,
    fullPage: false,
  });
}

test("V1 renders the painterly editorial portfolio without browser errors", async ({ page }, testInfo) => {
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

  await page.goto("/v1", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Portfolio V1/);
  await expect(page.locator(".hero h1")).toContainText("Curiosity");
  await expect(page.locator(".hero h1")).toContainText("thread.");
  await expect(page.locator(".v1-nav")).toHaveCount(1);

  for (const selector of requiredSections) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await expect(page.locator(".work-row")).toHaveCount(3);
  await expect(page.locator(".practice")).toHaveCount(4);
  await expect(page.getByText("86.82%", { exact: true }).first()).toBeVisible();

  await captureScene(page, testInfo, "hero");

  await page.locator("#story").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /The medium changed/ })).toBeVisible();
  await captureScene(page, testInfo, "story");

  await page.locator(".work-row").first().scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Skribly" })).toBeVisible();
  await captureScene(page, testInfo, "work");

  await page.locator("#research").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /Biology and software/ })).toBeVisible();
  await captureScene(page, testInfo, "research");

  await page.locator("#beyond").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /Not everything needs/ })).toBeVisible();
  await captureScene(page, testInfo, "beyond");

  await page.locator(".closing").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "The questions continue." })).toBeVisible();
  await expect(page.locator(".closing-links a")).toHaveCount(4);
  await captureScene(page, testInfo, "closing");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
