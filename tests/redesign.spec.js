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

test("redesign renders its story and scroll layers without browser errors", async ({ page }, testInfo) => {
  const pageErrors = [];
  const consoleErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/redesign", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Portfolio Redesign Study/);
  await expect(page.locator(".hero-word--systems")).toContainText("SYSTEMS");
  await expect(page.locator(".hero-word--thinking")).toContainText("THINKING");
  await expect(page.locator(".hero-depth-plane--front")).toContainText(
    "expressed through software",
  );

  for (const selector of requiredSections) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await page.locator(".project-story--skribli").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-story--skribli .project-story__statement")).toBeVisible();

  await page.locator(".practice").scrollIntoViewIfNeeded();
  await expect(page.locator(".practice-number__value")).toBeVisible();

  await page.locator(".closing").scrollIntoViewIfNeeded();
  await expect(page.locator(".closing__links a")).toHaveCount(4);

  await page.screenshot({
    path: `test-results/redesign-${testInfo.project.name}.png`,
    fullPage: true,
  });

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
