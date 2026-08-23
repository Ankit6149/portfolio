import { expect, test } from "@playwright/test";

const requiredScenes = [
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

test("portfolio world base renders the ten cinematic scenes without browser errors", async ({ page }, testInfo) => {
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
  await expect(page.locator(".portfolio-world-base")).toHaveCount(1);
  await expect(page.locator(".world-header")).toHaveCount(1);
  await expect(page.locator(".scene-rail")).toHaveCount(1);
  await expect(page.locator(".world-scene")).toHaveCount(10);
  await expect(page.locator("#arrival h1")).toContainText("Ankit Bhardwaj");

  for (const selector of requiredScenes) {
    await expect(page.locator(selector)).toHaveCount(1);
    await expect(page.locator(`${selector} .world-scene__image`)).toHaveCount(1);
  }

  await captureScene(page, testInfo, "arrival");

  await page.locator("#study").scrollIntoViewIfNeeded();
  await expect(page.locator("#study h1")).toContainText("Biology");
  await captureScene(page, testInfo, "study");

  await page.locator("#studio").scrollIntoViewIfNeeded();
  await expect(page.locator("#studio h1")).toContainText("built");
  await captureScene(page, testInfo, "studio");

  await page.locator("#closing").scrollIntoViewIfNeeded();
  await expect(page.locator("#closing .world-scene__actions > *")).toHaveCount(2);
  await captureScene(page, testInfo, "closing");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
