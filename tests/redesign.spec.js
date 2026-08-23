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

test("portfolio renders one continuous master video with living endpoints", async ({ page }, testInfo) => {
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
  await expect(world).toHaveAttribute("data-active-endpoint", "02");
  await expect(page.locator(".continuous-world__stage")).toHaveCount(1);
  await expect(page.locator(".continuous-world__video")).toHaveCount(1);
  await expect(page.locator(".continuous-world__canvas")).toHaveCount(0);
  await expect(page.locator(".world-endpoints button")).toHaveCount(8);
  await expect(page.locator(".world-ambient")).toHaveCount(1);
  await expect(page.locator(".world-hotspot")).toHaveCount(1);

  const video = page.locator(".continuous-world__video");
  await expect(video).toHaveAttribute("src", "/portfolio-world/master/master-scroll-1080p.mp4");
  await captureScene(page, testInfo, "endpoint-02");

  await page.locator(".world-hotspot").first().click();
  await expect(page.locator(".world-folio")).toHaveClass(/is-open/);
  await expect(page.locator(".world-folio h2")).toContainText("portfolio");
  await page.locator(".world-folio__close").click();

  await page.getByRole("button", { name: "Go to 04 — Study" }).click();
  await expect(world).toHaveAttribute("data-active-endpoint", "04", { timeout: 10_000 });
  await expect(page.locator(".world-hotspot")).toHaveCount(2);
  await captureScene(page, testInfo, "endpoint-04");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(world).toHaveAttribute("data-active-endpoint", "09", { timeout: 10_000 });
  await captureScene(page, testInfo, "endpoint-09");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
