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

test("portfolio preserves one continuous world and builds Studio as an in-world interaction", async ({ page }, testInfo) => {
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
  await expect(world).toHaveAttribute("data-active-world", "01");
  await expect(page.locator(".continuous-world__stage")).toHaveCount(1);
  await expect(page.locator(".continuous-world__video")).toHaveCount(1);
  await expect(page.locator(".continuous-world__canvas")).toHaveCount(0);
  await expect(page.locator(".world-ambient")).toHaveCount(0);
  await expect(page.locator(".world-endpoints")).toHaveCount(0);
  await expect(page.locator(".world-rest")).toHaveCount(0);
  await expect(page.locator(".world-transition")).toHaveCount(0);

  const video = page.locator(".continuous-world__video");
  await expect(video).toHaveAttribute("src", "/portfolio-world/master/master-scroll-1080p.mp4");
  await captureScene(page, testInfo, "01-arrival");

  await page.evaluate(() => {
    const root = document.querySelector(".continuous-world");
    const maxScroll = root.offsetHeight - window.innerHeight;
    window.scrollTo(0, root.offsetTop + maxScroll * 0.61);
  });

  await expect(world).toHaveAttribute("data-active-world", "06", { timeout: 10_000 });
  await expect(page.locator(".world-index")).toContainText("06");
  await expect(page.locator(".world-index")).toContainText("Studio");

  const studioInteraction = page.locator(".world-studio-interaction");
  await expect(studioInteraction).toHaveAttribute("data-visible", "true", { timeout: 10_000 });
  const studioHotspot = page.getByRole("button", { name: "Open selected work in the studio" });
  await expect(studioHotspot).toBeEnabled();
  await captureScene(page, testInfo, "06-studio");

  await studioHotspot.click();
  await expect(world).toHaveAttribute("data-folio-open", "true");
  await expect(page.locator(".world-folio")).toHaveCount(1);
  await expect(page.locator(".world-folio__ornament")).toHaveAttribute("src", "/portfolio-world/ui/cream-gold-frame.png");
  await expect(page.locator(".world-folio h2")).toHaveText("The Wild Oasis");
  await captureScene(page, testInfo, "06-studio-folio");

  await page.getByRole("button", { name: "Show CardXpert AI" }).click();
  await expect(page.locator(".world-folio h2")).toHaveText("CardXpert AI");

  await page.getByRole("button", { name: "Close selected work" }).last().click();
  await expect(world).toHaveAttribute("data-folio-open", "false");
  await expect(page.locator(".world-folio")).toHaveCount(0);
  await expect(world).toHaveAttribute("data-active-world", "06");

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(world).toHaveAttribute("data-active-world", "10", { timeout: 10_000 });
  await captureScene(page, testInfo, "10-closing-world");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
