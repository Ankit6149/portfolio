import { expect, test } from "@playwright/test";

const requiredRestScenes = [
  "#arrival",
  "#approach",
  "#threshold",
  "#estate",
  "#study",
  "#library",
  "#studio",
  "#reflection",
  "#nature",
  "#closing",
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

test("cinematic portfolio scrubs motion between clean scene stills", async ({ page }, testInfo) => {
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
  await expect(page).toHaveTitle(/Portfolio World Preview/);
  await expect(page.locator(".world-header")).toHaveCount(1);
  await expect(page.locator(".scene-rail")).toHaveCount(1);

  for (const selector of requiredRestScenes) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await expect(page.locator(".world-transition")).toHaveCount(9);
  await expect(page.locator(".world-transition.has-video")).toHaveCount(7);
  await expect(page.locator(".world-transition__video")).toHaveCount(7);
  await expect(page.locator(".world-transition.is-fallback")).toHaveCount(2);

  await expect(page.locator("#arrival .world-rest__copy h1")).toContainText("Ankit Bhardwaj");
  await captureScene(page, testInfo, "arrival-still");

  const firstTransition = page.locator("#transition-01");
  await firstTransition.scrollIntoViewIfNeeded();
  await expect(firstTransition.locator("video")).toBeVisible();
  await captureScene(page, testInfo, "transition-01");

  await page.locator("#studio").scrollIntoViewIfNeeded();
  await expect(page.locator("#studio .world-rest__copy h1")).toBeVisible();
  await captureScene(page, testInfo, "studio-still");

  await page.locator("#closing").scrollIntoViewIfNeeded();
  await expect(page.locator("#closing .world-rest__copy h1")).toBeVisible();
  await captureScene(page, testInfo, "closing-still");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
