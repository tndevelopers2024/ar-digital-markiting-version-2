import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const routes: string[] = Object.keys(manifest.routes).filter(path =>
  !path.startsWith("/_") && !/\.(xml|txt|svg|ico|png)$/.test(path) && path !== "/opengraph-image",
);

async function prepare(page: Page, suppressPopup = true) {
  await page.addInitScript(suppress => {
    sessionStorage.setItem("ar-intro", "seen");
    if (suppress) sessionStorage.setItem("project-popup-seen", "1");
  }, suppressPopup);
}

async function scan(page: Page) {
  return new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
}

test.beforeEach(async ({ page }) => prepare(page));

for (const route of routes) {
  test(`render and accessibility ${route}`, async ({ page, browserName }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    const failedResponses: string[] = [];
    page.on("response", response => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    // Exercise lazy images and reveal animations throughout the entire page.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 25));
      }
      // Scroll horizontal reduced-motion galleries as well as the vertical page.
      for (const image of Array.from(document.images).filter(image => image.getClientRects().length > 0 && !image.complete)) {
        image.scrollIntoView({ block: "center", inline: "center" });
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      await Promise.race([
        Promise.all(Array.from(document.images).filter(image => image.getClientRects().length > 0).map(image => image.decode().catch(() => undefined))),
        new Promise(resolve => setTimeout(resolve, 5000)),
      ]);
    });
    const brokenImages = await page.locator("img").evaluateAll(images => images.filter(image => image instanceof HTMLImageElement && image.getClientRects().length > 0 && (!image.complete || image.naturalWidth === 0)).map(image => image.getAttribute("src")));
    expect(brokenImages, "Images must decode").toEqual([]);
    const overflow = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    expect(overflow.document, "No horizontal page overflow").toBeLessThanOrEqual(overflow.viewport + 1);
    expect(errors, "No browser runtime or console errors").toEqual([]);
    expect(failedResponses, "No failed assets or requests").toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    if (browserName === "chromium") {
      const result = await scan(page);
      await testInfo.attach("accessibility", { body: JSON.stringify(result.violations, null, 2), contentType: "application/json" });
      expect(result.violations.map(rule => ({ id: rule.id, nodes: rule.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), "WCAG A/AA violations").toEqual([]);
    }
    if (["/", "/about", "/services", "/services/web-development", "/portfolio", "/contact"].includes(route)) {
      await page.screenshot({ path: testInfo.outputPath("page.png"), fullPage: true });
    }
  });
}

test("navigation, services menu, Escape, and browser history", async ({ page, isMobile }) => {
  await page.goto("/about");
  if (isMobile) {
    const toggle = page.getByRole("button", { name: "Open menu", exact: true });
    await toggle.click();
    await expect(page.locator("#mobile-navigation-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(page.locator("#mobile-navigation-menu")).toHaveCount(0);
    await toggle.click();
    await page.locator("#mobile-navigation-menu summary").click();
    await page.locator("#mobile-navigation-menu").getByRole("link", { name: "Web Development", exact: true }).click();
  } else {
    const toggle = page.getByRole("button", { name: "Toggle services menu" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#desktop-services-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(page.locator("#desktop-services-menu")).toHaveCount(0);
    await page.keyboard.press("Enter");
    await page.locator("#desktop-services-menu").getByRole("link", { name: "Web Development", exact: true }).click();
  }
  await expect(page).toHaveURL(/\/services\/web-development$/);
  await expect(page.locator("h1")).toHaveText("Web Development");
  await page.goBack();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("h1")).toContainText("About");
});

test("portfolio filtering and modal keyboard focus", async ({ page, browserName }) => {
  await page.goto("/portfolio");
  const group = page.getByRole("group", { name: "Filter portfolio concepts" });
  await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(15);
  for (const category of ["Websites", "Mobile apps", "Brand & design", "Search", "Marketing"]) {
    const button = group.getByRole("button", { name: new RegExp(`^${category}`) });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(3);
  }
  const trigger = page.getByRole("button", { name: /^Explore / }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close concept" })).toBeFocused();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(element => document.activeElement === document.body || element.contains(document.activeElement))).toBe(true);
  }
  if (browserName === "chromium") expect((await scan(page)).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await group.getByRole("button", { name: /^All concepts/ }).click();
  await expect(page.getByRole("button", { name: /^Explore / })).toHaveCount(15);
});

for (const route of ["/contact", "/portfolio"]) {
  test(`contact form validation, failure recovery, and success ${route}`, async ({ page }) => {
    await page.goto(route);
    const form = page.locator("form.contact-form");
    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(4);
    await expect(form.getByLabel("Your name")).toBeFocused();
    const message = "Local automated QA enquiry. This is intercepted and must not be delivered.";
    await form.getByLabel("Your name").fill("QA Example");
    await form.getByLabel("Email address").fill("qa@example.invalid");
    await form.getByLabel("What can we help with?").selectOption({ label: "Not sure yet" });
    await form.getByLabel("A little about your project").fill(message);
    let submissions = 0;
    await page.route("**/api/enquiries", async route => {
      submissions++;
      const body = route.request().postDataJSON();
      expect(body.kind).toBe("contact");
      expect(body.data.email).toBe("qa@example.invalid");
      await route.fulfill({ status: submissions === 1 ? 503 : 200, json: { message: submissions === 1 ? "QA receiver unavailable. Try again." : "Your enquiry has been received." } });
    });
    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(form.getByRole("alert")).toContainText("QA receiver unavailable");
    await expect(form.getByLabel("A little about your project")).toHaveValue(message);
    await expect(form.getByRole("button", { name: "Send enquiry" })).toBeEnabled();
    await form.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.locator(".contact-success")).toBeFocused();
    await expect(page.locator(".contact-success")).toContainText("Thank you for your enquiry");
    await page.getByRole("button", { name: "Try another enquiry" }).click();
    await expect(form.getByLabel("Your name")).toBeFocused();
    await expect(form.getByLabel("Your name")).toHaveValue("");
    expect(submissions).toBe(2);
  });
}

test("audit form rejects invalid input and preserves data after a network failure", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("#audit form");
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(4);
  await page.locator("#audit-name").fill("QA Example");
  await page.locator("#audit-email").fill("qa@example.invalid");
  await page.locator("#audit-website").fill("javascript:alert(1)");
  await page.locator("#audit-budget").selectOption({ index: 1 });
  await form.locator('button[type="submit"]').click();
  await expect(page.locator("#audit-website")).toHaveAttribute("aria-invalid", "true");
  await page.locator("#audit-website").fill("https://example.invalid");
  await page.route("**/api/enquiries", route => route.abort("failed"));
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toContainText("couldn’t confirm delivery");
  await expect(page.locator("#audit-website")).toHaveValue("https://example.invalid");
  await page.unroute("**/api/enquiries");
  await page.route("**/api/enquiries", route => route.fulfill({ status: 200, json: { message: "Your enquiry has been received." } }));
  await form.locator('button[type="submit"]').click();
  await expect(page.locator(".audit-success")).toBeFocused();
});

test("FAQ keyboard activation and reviews pause control", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const faq = page.locator("#faq details").first();
  await faq.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator(".accordion-answer")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(faq).not.toHaveAttribute("open");
  const pause = page.getByRole("button", { name: "Pause reviews", exact: true });
  await pause.click();
  await expect(page.getByRole("button", { name: "Resume reviews" })).toHaveAttribute("aria-pressed", "true");
});

test("skip link moves keyboard navigation into main content", async ({ page, browserName }) => {
  await page.goto("/about");
  // WebKit follows Safari's default: Option+Tab includes links in keyboard navigation.
  const tabKey = browserName === "webkit" ? "Alt+Tab" : "Tab";
  await page.keyboard.press(tabKey);
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press(tabKey);
  expect(await page.locator("main").evaluate(element => element.contains(document.activeElement))).toBe(true);
});

test("404 recovery", async ({ page }) => {
  const response = await page.goto("/qa-missing-page");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("back");
  await page.getByRole("link", { name: /home/i }).first().click();
  await expect(page).toHaveURL("/");
});

test("normal-motion homepage scroll popup and focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => sessionStorage.removeItem("project-popup-seen"));
  await page.goto("/");
  const target = page.locator("#main > section").nth(3);
  await target.scrollIntoViewIfNeeded();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close popup" })).toBeFocused();
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await expect(dialog.locator('[aria-invalid="true"]')).toHaveCount(3);
  await dialog.getByLabel("Your name").fill("QA Example");
  await dialog.getByLabel("Email address").fill("qa@example.invalid");
  const message = "A local popup test. This enquiry must not be delivered.";
  await dialog.getByLabel("What do you have in mind?").fill(message);
  await page.route("**/api/enquiries", route => route.fulfill({ status: 503, json: { message: "QA receiver unavailable." } }));
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await expect(dialog.getByRole("alert")).toContainText("QA receiver unavailable");
  await expect(dialog.getByLabel("What do you have in mind?")).toHaveValue(message);
  await page.unroute("**/api/enquiries");
  await page.route("**/api/enquiries", route => route.fulfill({ status: 200, json: { message: "Your enquiry has been received." } }));
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await expect(dialog.getByRole("status")).toBeFocused();
  await expect(dialog.getByRole("status")).toContainText("Your enquiry has been received");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await target.scrollIntoViewIfNeeded();
  await expect(dialog).not.toBeVisible();
});

for (const width of [320, 375, 768, 1024, 1920]) {
  test(`responsive boundaries ${width}px`, async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/services", "/portfolio", "/contact"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width + 1);
      const toggle = page.getByRole("button", { name: "Open menu", exact: true });
      if (width < 1200) {
        await toggle.click();
        await expect(page.locator("#mobile-navigation-menu")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth), `menu ${route}`).toBeLessThanOrEqual(width + 1);
        await page.keyboard.press("Escape");
      }
    }
  });
}

test("hero slideshow advances, pauses, and supports manual selection", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.mouse.move(0, 0);
  const heading = page.locator("#hero-heading");
  await expect(heading).toContainText("More visibility.");
  await expect(heading).toContainText("Get discovered.", { timeout: 10000 });
  await page.getByRole("button", { name: "Pause banner slideshow", exact: true }).click();
  await page.getByRole("button", { name: "Play banner slideshow", exact: true }).blur();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(6500);
  await expect(heading).toContainText("Get discovered.");
  await page.getByRole("button", { name: "Show slide 3: Social & content", exact: true }).click();
  await expect(heading).toContainText("Tell your story.");
  await page.getByRole("button", { name: "Next banner slide", exact: true }).click();
  await expect(heading).toContainText("More visibility.");
});


test("industry showcase selection updates the feature", async ({ page }, testInfo) => {
  await page.goto("/");
  const industries = page.locator("#industries");
  await industries.scrollIntoViewIfNeeded();
  const healthcare = industries.getByRole("button", { name: /Healthcare & Wellness/ });
  await healthcare.click();
  await expect(healthcare).toHaveAttribute("aria-pressed", "true");
  await expect(industries.getByRole("heading", { name: "Make the first step feel easier." })).toBeVisible();
  await expect(industries.getByRole("img", { name: "Bright reception area inside a healthcare facility" })).toBeVisible();
  const education = industries.getByRole("button", { name: /Education & Training/ });
  await education.focus();
  await page.keyboard.press("Enter");
  await expect(education).toHaveAttribute("aria-pressed", "true");
  await expect(healthcare).toHaveAttribute("aria-pressed", "false");
  await expect(industries.getByRole("heading", { name: "Turn curiosity into a new chapter." })).toBeVisible();
  await industries.screenshot({ path: testInfo.outputPath("industries.png") });
  await industries.getByRole("link", { name: "Let’s talk about your business" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("brand intro exits, skips, and respects reduced motion", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const intro = page.getByTestId("brand-preloader");
  await expect(intro).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("preloader.png") });
  await expect(intro).toBeHidden({ timeout: 5000 });
  await page.getByRole("link", { name: "Explore services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(intro).toBeVisible();
  await expect(intro).toBeHidden({ timeout: 5000 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(intro).toBeVisible();
  await intro.getByRole("button", { name: "Skip intro" }).click();
  await expect(intro).toBeHidden();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(intro).toBeHidden();
});
