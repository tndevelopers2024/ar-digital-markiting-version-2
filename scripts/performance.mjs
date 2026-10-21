import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const require = createRequire(import.meta.url);
const lighthouseRequire = createRequire(require.resolve("lighthouse"));
const { launch } = await import(pathToFileURL(lighthouseRequire.resolve("chrome-launcher")).href);
const base = process.env.TEST_BASE_URL || "http://localhost:3002";
const routes = process.env.AUDIT_ROUTES?.split(",") || ["/", "/services/web-development", "/portfolio", "/contact"];
await fs.mkdir("audit-results", { recursive: true });
const summary = [];
for (const route of routes) {
  for (const formFactor of ["mobile", "desktop"]) {
    const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--disable-dev-shm-usage"] });
    try {
      const options = {
        port: chrome.port,
        logLevel: "error",
        output: ["html", "json"],
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        formFactor,
        ...(formFactor === "desktop" ? {
          screenEmulation: { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false },
          throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
        } : {}),
      };
      const result = await lighthouse(new URL(route, base).href, options);
      if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError || "No Lighthouse result"));
      const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${formFactor}`;
      await fs.writeFile(`audit-results/${name}.html`, result.report[0]);
      await fs.writeFile(`audit-results/${name}.json`, result.report[1]);
      const entry = {
        route, formFactor,
        scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
        metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].map(key => [key, { value: result.lhr.audits[key].numericValue, display: result.lhr.audits[key].displayValue }])),
        findings: Object.values(result.lhr.audits).filter(audit => audit.score !== null && audit.score < 1 && !["manual", "informative", "notApplicable"].includes(audit.scoreDisplayMode)).map(audit => ({ id: audit.id, title: audit.title, score: audit.score, display: audit.displayValue })),
      };
      summary.push(entry);
      console.log(JSON.stringify(entry));
      await fs.writeFile("audit-results/summary.json", JSON.stringify(summary, null, 2));
    } finally {
      await chrome.kill();
    }
  }
}
