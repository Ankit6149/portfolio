import { expect, test } from "@playwright/test";

const ignoredLocalResources = ["/_vercel/insights/script.js"];

function isIgnoredLocalResource(url) {
  return ignoredLocalResources.some((resource) => url.includes(resource));
}

async function captureScene(page, testInfo, name) {
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `test-results/redesign-${testInfo.project.name}-${name}.png`,
    fullPage: false,
  });
}

test("portfolio renders one continuous React frame-sequence world", async ({ page }, testInfo) => {
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

  await page.goto("/redesign", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/Portfolio World Preview/);
  await expect(page.locator(".continuous-world")).toHaveAttribute("data-render-mode", "frame-sequence");
  await expect(page.locator(".continuous-world__stage")).toHaveCount(1);
  await expect(page.locator(".continuous-world__canvas")).toHaveCount(1);
  await expect(page.locator(".continuous-world__video")).toHaveCount(0);
  await expect(page.locator(".world-rest")).toHaveCount(0);
  await expect(page.locator(".world-transition")).toHaveCount(0);

  const manifest = await page.request.get("/portfolio-world/frames/master/manifest.json");
  expect(manifest.ok()).toBeTruthy();
  const manifestJson = await manifest.json();
  expect(manifestJson.frameCount).toBe(560);
  expect(manifestJson.sequenceFps).toBe(10);

  await expect(page.locator(".continuous-world")).toHaveAttribute("data-sequence-ready", "true", { timeout: 20_000 });
  await expect(page.locator(".continuous-world__canvas")).toBeVisible();
  await captureScene(page, testInfo, "start");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5));
  await page.waitForTimeout(1300);
  await captureScene(page, testInfo, "middle");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1300);
  await captureScene(page, testInfo, "end");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
