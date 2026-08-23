import { expect, test } from "@playwright/test";

const ignoredLocalResources = ["/_vercel/insights/script.js"];

function isIgnoredLocalResource(url) {
  return ignoredLocalResources.some((resource) => url.includes(resource));
}

async function captureScene(page, testInfo, name) {
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `test-results/redesign-${testInfo.project.name}-${name}.png`,
    fullPage: false,
  });
}

test("portfolio preserves the smooth single-master-video baseline", async ({ page }, testInfo) => {
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

  const world = page.locator(".continuous-world");
  await expect(world).toHaveAttribute("data-render-mode", "single-master-video");
  await expect(world).toHaveAttribute("data-world-sequence", "01-10");
  await expect(page.locator(".continuous-world__stage")).toHaveCount(1);
  await expect(page.locator(".continuous-world__video")).toHaveCount(1);
  await expect(page.locator(".continuous-world__canvas")).toHaveCount(0);
  await expect(page.locator(".world-ambient")).toHaveCount(0);
  await expect(page.locator(".world-endpoints")).toHaveCount(0);
  await expect(page.locator(".world-rest")).toHaveCount(0);
  await expect(page.locator(".world-transition")).toHaveCount(0);

  const video = page.locator(".continuous-world__video");
  await expect(video).toHaveAttribute("src", "/portfolio-world/master/master-scroll-1080p.mp4");
  await captureScene(page, testInfo, "start");

  await page.mouse.wheel(0, 5600);
  await expect.poll(async () => page.locator(".continuous-world__progress span").textContent(), { timeout: 10_000 })
    .not.toBe("0%");
  await captureScene(page, testInfo, "middle");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(900);
  await captureScene(page, testInfo, "end");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
