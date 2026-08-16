import { expect, test } from "@playwright/test";

test("landing page renders and interactions work", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const loader = page.locator(".hermes-loader");
  await expect(loader).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await page.screenshot({ path: "test-results/hermes-loading-desktop.png" });
  }
  await expect(loader).toHaveCount(0, { timeout: 4_000 });
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(/Hermes Badminton/);
  await expect(page.getByRole("heading", { name: "PLAY THE NEXT POINT." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chọn nhịp chơi của bạn." })).toBeAttached();
  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);

  const revealSections = page.locator("[data-reveal]");
  for (let index = 0; index < await revealSections.count(); index += 1) {
    await revealSections.nth(index).scrollIntoViewIfNeeded();
    await expect(revealSections.nth(index)).toHaveClass(/is-visible/);
  }
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator("img").evaluateAll((images) =>
    images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).length,
  )).toBe(0);

  if (testInfo.project.name === "desktop") {
    await page.getByRole("button", { name: /Mode/ }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "day");

    await page.getByLabel("Email của bạn").fill("player@example.com");
    await page.getByRole("button", { name: "Vào đội hình", exact: true }).last().click();
    await expect(page.getByText("Lineup in progress")).toBeVisible();
    await expect(page.getByText("Court ready. Hẹn gặp bạn trên sân.")).toBeVisible();
  }

  await page.screenshot({
    path: `test-results/hermes-${testInfo.project.name}.png`,
    fullPage: true,
  });

  expect(consoleErrors).toEqual([]);
});

test("loading gate respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hermes-loader")).toHaveCount(0, { timeout: 1_500 });
  await expect(page.getByRole("heading", { name: "PLAY THE NEXT POINT." })).toBeVisible();
  await context.close();
});
