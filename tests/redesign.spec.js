import { expect, test } from "@playwright/test";

const ignoredLocalResources = ["/_vercel/insights/script.js"];

function isIgnoredLocalResource(url) {
  return ignoredLocalResources.some((resource) => url.includes(resource));
}

async function captureScene(page, testInfo, name) {
  await page.waitForTimeout(900);
  await page.screenshot({
    path: `test-results/redesign-${testInfo.project.name}-${name}.png`,
    fullPage: false,
  });
}

async function scrollWorldTo(page, progress) {
  await page.evaluate((nextProgress) => {
    const root = document.querySelector(".continuous-world");
    const maxScroll = root.offsetHeight - window.innerHeight;
    window.scrollTo(0, root.offsetTop + maxScroll * nextProgress);
  }, progress);
}

test("portfolio preserves one continuous world with living, restrained rest states", async ({ page }, testInfo) => {
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
  const cameraPlane = page.locator(".continuous-world__camera-plane");
  await expect(world).toHaveAttribute("data-render-mode", "single-master-video");
  await expect(world).toHaveAttribute("data-world-sequence", "01-10");
  await expect(world).toHaveAttribute("data-active-world", "01");
  await expect(page.locator(".continuous-world__stage")).toHaveCount(1);
  await expect(page.locator(".continuous-world__video")).toHaveCount(1);
  await expect(cameraPlane).toHaveCount(1);
  await expect(page.locator(".continuous-world__canvas")).toHaveCount(0);
  await expect(page.locator(".world-endpoints")).toHaveCount(0);
  await expect(page.locator(".world-transition")).toHaveCount(0);

  const video = page.locator(".continuous-world__video");
  await expect(video).toHaveAttribute("src", "/portfolio-world/master/master-scroll-1080p.mp4");

  // The living layers are real source-pixel crops, not full-screen fake overlays.
  const regions = page.locator(".world-ambient-region");
  await expect(regions).toHaveCount(9);
  await expect(page.locator('[data-ambient-id="01-river"] video')).toHaveAttribute("src", "/portfolio-world/ambient/01-river.mp4");
  await expect(page.locator('[data-ambient-id="05-passage-stream"] video')).toHaveAttribute("src", "/portfolio-world/ambient/05-passage-stream.mp4");
  await expect(page.locator('[data-ambient-id="06-studio-foliage"]')).toHaveAttribute("data-kind", "foliage");
  await expect(page.locator('[data-ambient-id="10-fountain-pool"] video')).toHaveAttribute("src", "/portfolio-world/ambient/10-fountain-pool.mp4");

  // Arrival becomes alive only after the camera settles; travel itself remains the master video.
  await expect(world).toHaveAttribute("data-rest-world", "01", { timeout: 3_000 });

  const finePointer = await page.evaluate(() => window.matchMedia("(pointer: fine)").matches);
  if (finePointer) {
    const viewport = page.viewportSize();
    await page.mouse.move(viewport.width * 0.82, viewport.height * 0.34);
    await page.waitForTimeout(350);
    const depth = await cameraPlane.evaluate((element) => ({
      x: parseFloat(element.style.getPropertyValue("--depth-x")) || 0,
      y: parseFloat(element.style.getPropertyValue("--depth-y")) || 0,
      rx: parseFloat(element.style.getPropertyValue("--depth-rx")) || 0,
      ry: parseFloat(element.style.getPropertyValue("--depth-ry")) || 0,
    }));
    expect(Math.abs(depth.x)).toBeGreaterThan(0.05);
    expect(Math.abs(depth.x)).toBeLessThanOrEqual(5.6);
    expect(Math.abs(depth.y)).toBeLessThanOrEqual(3.9);
    expect(Math.abs(depth.rx)).toBeLessThanOrEqual(0.23);
    expect(Math.abs(depth.ry)).toBeLessThanOrEqual(0.33);
  }

  await captureScene(page, testInfo, "01-living-arrival");

  // Confirm another exact rest frame activates its own real river layer.
  await scrollWorldTo(page, 8 / 56);
  await expect(world).toHaveAttribute("data-active-world", "03", { timeout: 10_000 });
  await expect(world).toHaveAttribute("data-rest-world", "03", { timeout: 3_000 });
  await captureScene(page, testInfo, "03-living-threshold");

  // Follow the same spatial path a person scrolls through. CI's bundled headless
  // Chromium does not guarantee H.264 decode support, so media decode is not used
  // as an assertion; the world state and interaction layer are validated instead.
  for (const progress of [0.31, 0.44, 0.54, 0.61]) {
    await scrollWorldTo(page, progress);
    await page.waitForTimeout(300);
  }

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
  await expect(studioInteraction).toHaveCSS("pointer-events", "none");
  await captureScene(page, testInfo, "06-studio-folio");

  await page.getByRole("button", { name: "Show CardXpert AI" }).click();
  await expect(page.locator(".world-folio h2")).toHaveText("CardXpert AI");

  await page.getByRole("button", { name: "Close selected work" }).last().click();
  await expect(world).toHaveAttribute("data-folio-open", "false");
  await expect(page.locator(".world-folio")).toHaveCount(0);
  await expect(world).toHaveAttribute("data-active-world", "06");

  for (const progress of [0.76, 0.88, 0.96, 1]) {
    await scrollWorldTo(page, progress);
    await page.waitForTimeout(250);
  }
  await expect(world).toHaveAttribute("data-active-world", "10", { timeout: 10_000 });
  await expect(world).toHaveAttribute("data-rest-world", "10", { timeout: 3_000 });
  await captureScene(page, testInfo, "10-living-closing-world");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
