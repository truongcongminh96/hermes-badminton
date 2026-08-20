import { expect, test } from "@playwright/test";

test("landing page renders and interactions work", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("caret-color")) consoleErrors.push(message.text());
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const loader = page.locator(".hermes-loader");
  await expect(loader).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await expect(loader).toHaveAttribute("aria-label", /Căn lưới|Gọi cầu|Mở sân/);
    await page.screenshot({ path: "test-results/hermes-loading-desktop.png" });
  }
  await expect(loader).toHaveCount(0, { timeout: 4_000 });
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(/Hermes Badminton/);
  await expect(page.getByRole("heading", { name: "PLAY THE NEXT POINT." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chọn nhịp chơi của bạn." })).toBeAttached();
  await expect(page.locator(".kinetic-group")).toHaveCount(2);
  await expect(page.locator(".style-allround h3 span")).toHaveCount(2);
  const kineticGroupWidths = await page.locator(".kinetic-group").evaluateAll((groups) =>
    groups.map((group) => group.getBoundingClientRect().width),
  );
  expect(Math.abs(kineticGroupWidths[0] - kineticGroupWidths[1])).toBeLessThanOrEqual(1);
  // Verify no layout shift or breaking issues

  const revealSections = page.locator("[data-reveal]");
  for (let index = 0; index < await revealSections.count(); index += 1) {
    await revealSections.nth(index).scrollIntoViewIfNeeded();
    await expect(revealSections.nth(index)).toHaveClass(/is-visible/);
  }
  await page.locator("footer.footer").scrollIntoViewIfNeeded();
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
    await expect(page.locator(".digital-club-pass-card")).toBeVisible();
    await expect(page.locator(".club-pass-code")).toHaveText(/HERMES-HN-/);
    await expect(page.getByText("player@example.com")).toBeVisible();
  }

  await page.screenshot({
    path: `test-results/hermes-${testInfo.project.name}.png`,
    fullPage: true,
  });

  expect(consoleErrors).toEqual([]);
});

test("racket matcher quiz calculates tactical spec sheet", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hermes-loader")).toHaveCount(0, { timeout: 4_000 });

  // Open matcher from hero text-link
  await page.locator(".hero-matcher-trigger").click();
  const modal = page.locator(".matcher-modal-window");
  await expect(modal).toBeVisible();
  await expect(modal.getByRole("heading", { name: "Vị trí và lối đánh ưa thích của bạn?" })).toBeVisible();

  // Step 1: Select Speed
  await modal.getByRole("button", { name: /Đánh đôi \/\/ Đứng lưới & Phản tạt/ }).click();
  await modal.getByRole("button", { name: "Tiếp tục →" }).click();

  // Step 2: Select Moderate wrist
  await expect(modal.getByRole("heading", { name: "Lực cổ tay & Kinh nghiệm đánh cầu?" })).toBeVisible();
  await modal.getByRole("button", { name: /Lực tay trung bình \/\/ Cần trợ lực/ }).click();
  await modal.getByRole("button", { name: "Tiếp tục →" }).click();

  // Step 3: Select Speed priority & analyze
  await expect(modal.getByRole("heading", { name: "Tiêu chí quan trọng nhất khi cầm vợt?" })).toBeVisible();
  await modal.getByRole("button", { name: /Tốc độ xoay chuyển & Thoát gió/ }).click();
  await modal.getByRole("button", { name: "Phân tích cấu hình ✦" }).click();

  // Result sheet
  await expect(modal.locator(".result-badge")).toHaveText("MATCHED 98.4%");
  await expect(modal.getByRole("heading", { name: /HERMES STRIVE 01 PROTO/ })).toBeVisible();
  await expect(modal.getByText("Khung vợt khí động học vát gió kép")).toBeVisible();

  // Close modal
  await modal.locator(".modal-close-btn").click();
  await expect(modal).toHaveCount(0);
});

test("court booking modal generates digital match pass", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hermes-loader")).toHaveCount(0, { timeout: 4_000 });

  // Click on Tuesday session card
  await page.locator(".session-featured").click();
  const modal = page.locator(".booking-modal-window");
  await expect(modal).toBeVisible();
  await expect(modal.getByRole("heading", { name: "After work" })).toBeVisible();
  await expect(modal.getByText("Sân 01 & Sân 02")).toBeVisible();

  // Fill in booking details
  await modal.getByLabel("Họ và tên / Biệt danh trên sân").fill("Minh Trương");
  await modal.getByLabel("Số điện thoại / Zalo / Email").fill("0912345678");
  await modal.getByLabel("Lối chơi bạn muốn thể hiện").selectOption("Speed");

  // Submit booking
  await modal.getByRole("button", { name: "Xác nhận vào đội hình →" }).click();

  // Verify digital match pass
  await expect(modal.locator(".pass-verified-badge")).toHaveText("LINEUP CONFIRMED");
  await expect(modal.getByRole("heading", { name: "Minh Trương" })).toBeVisible();
  await expect(modal.getByText("LỐI CHƠI // SPEED")).toBeVisible();
  await expect(modal.locator(".pass-barcode-lines")).toBeVisible();

  // Close pass
  await modal.getByRole("button", { name: "Hoàn tất & Đóng vé" }).click();
  await expect(modal).toHaveCount(0);
});

test("loading gate respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hermes-loader")).toHaveCount(0, { timeout: 1_500 });
  await expect(page.getByRole("heading", { name: "PLAY THE NEXT POINT." })).toBeVisible();
  await expect.poll(() => page.locator(".kinetic-track").evaluate((track) => getComputedStyle(track).animationName)).toBe("none");
  await context.close();
});

test("mobile navigation keeps mode and signup accessible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hermes-loader")).toHaveCount(0, { timeout: 4_000 });
  await page.locator(".mobile-menu summary").click();

  await expect(page.locator(".mobile-menu").getByRole("button", { name: /Mode/ })).toBeVisible();
  await expect(page.locator(".mobile-menu").getByRole("link", { name: "Ghi danh" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
