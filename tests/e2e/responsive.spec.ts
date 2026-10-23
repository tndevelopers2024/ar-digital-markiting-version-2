import { test, expect } from "@playwright/test";

const sizes = [
  ["small-phone",320,568], ["iphone-se",375,667], ["iphone",390,844], ["large-iphone",430,932],
  ["phone-landscape",844,390], ["ipad-portrait",768,1024], ["ipad-landscape",1024,768],
  ["small-laptop",1280,720], ["laptop",1366,768], ["macbook",1440,900], ["large-macbook",1728,1117],
  ["full-hd",1920,1080], ["qhd",2560,1440], ["4k",3840,2160],
] as const;
const routes = ["/", "/about", "/services", "/services/web-development", "/services/ecommerce-development", "/portfolio", "/projects", "/blogs", "/blogs/write-a-clear-campaign-brief", "/contact"];
for (const [name,width,height] of sizes) {
  test(`viewport matrix ${name} ${width}x${height}`, async ({ page, browserName }, testInfo) => {
    test.skip(!["chromium-desktop", "webkit-desktop"].includes(testInfo.project.name));
    test.setTimeout(120000);
    await page.setViewportSize({ width, height });
    await page.addInitScript(() => { sessionStorage.setItem("project-popup-seen", "1"); });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(dimensions.scroll, `${route}: horizontal overflow`).toBeLessThanOrEqual(dimensions.width + 1);
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
      const box = await heading.boundingBox();
      expect(box!.x, `${route}: heading left edge`).toBeGreaterThanOrEqual(-1);
      expect(box!.x + box!.width, `${route}: heading right edge`).toBeLessThanOrEqual(width + 1);
      if (route === "/") {
        const hero = await page.locator("#hero").boundingBox();
        expect(hero!.height).toBeGreaterThanOrEqual(height - 1);
        if (width >= 1280) expect(hero!.height, "Desktop banner should fit the opening viewport").toBeLessThanOrEqual(height + 1);
        await page.screenshot({ path: testInfo.outputPath(`hero-${browserName}.png`) });
      }
      if (route === "/contact") {
        const form = page.locator(".contact-form");
        await form.scrollIntoViewIfNeeded();
        const fields = await form.locator("input:not([tabindex='-1']), select, textarea, button[type='submit']").evaluateAll(elements => elements.map(element => { const r=element.getBoundingClientRect(); return { left:r.left, right:r.right, height:r.height }; }));
        for (const field of fields) { expect(field.left).toBeGreaterThanOrEqual(0); expect(field.right).toBeLessThanOrEqual(width); expect(field.height).toBeGreaterThanOrEqual(44); }
      }
    }
  });
}

for (const width of [640, 1024, 1199, 1200, 1280, 1366]) {
  test(`slides and sticky navigation at ${width}px`, async ({ page }, testInfo) => {
    test.skip(!["chromium-desktop", "webkit-desktop"].includes(testInfo.project.name));
    await page.setViewportSize({ width, height: 720 });
    await page.addInitScript(() => sessionStorage.setItem("project-popup-seen", "1"));
    await page.goto("/");
    for (let slide = 1; slide <= 3; slide++) {
      await page.getByRole("button", { name: new RegExp(`^Show slide ${slide}:`) }).click();
      const hero = await page.locator("#hero").boundingBox();
      if (width >= 1200) expect(hero!.height).toBeLessThanOrEqual(721);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    }
    await page.locator("#services").scrollIntoViewIfNeeded();
    const mobileToggle = page.getByRole("button", { name: "Open menu", exact: true });
    if (width < 1200) {
      await mobileToggle.click();
      const menu = page.locator("#mobile-navigation-menu");
      await expect(menu).toBeVisible();
      const bounds = await menu.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      await page.keyboard.press("Escape");
    } else {
      const toggle = page.getByRole("button", { name: "Toggle services menu" });
      await toggle.click();
      await expect(page.locator("#desktop-services-menu")).toBeVisible();
      const links = page.locator("#desktop-services-menu a");
      for (const link of await links.all()) {
        const bounds = await link.boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      }
    }
  });
}
