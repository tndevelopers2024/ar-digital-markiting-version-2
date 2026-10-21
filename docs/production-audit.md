# Local production audit — 21 October 2026

## Verdict

The tested local production build passes functional, route, automated accessibility, and runtime dependency checks after the fixes below. Public launch is still pending configuration and delivery validation. Mobile performance also needs further optimization; Firefox could not run on this host.

This is a local audit of the optimized `next build` + `next start` application. It does not certify live hosting behavior, real enquiry delivery, full accessibility compliance, or field Core Web Vitals.

## Verified results

- **158 Playwright/API tests passed, zero failures, zero flaky results.** Ten duplicate breakpoint cases are intentionally skipped in WebKit because the extra breakpoint matrix runs in Chromium. WebKit still tests every route and user journey in desktop and mobile projects.
- **26 content routes × four browser profiles:** Chromium desktop, Chromium Android emulation, WebKit desktop, and WebKit iPhone emulation. WebKit results are engine/emulation coverage, not a claim that real Safari or physical phones were tested.
- **52 axe scans:** all 26 content pages in Chromium desktop/mobile, using WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags. No violations detected in those scans. Portfolio modal states are also scanned. Closed/hidden states and automated rules do not cover every accessibility requirement.
- Browser route checks cover runtime/console errors, failed responses, decoded images, one visible H1, and horizontal page overflow.
- Extra responsive checks cover 320, 375, 768, 1024, and 1920px on the homepage, service directory, portfolio, and contact page.
- Navigation checks cover desktop service dropdowns, mobile menus, service navigation, Escape/focus return, and browser history.
- Keyboard checks cover skip links, FAQ Enter/Space activation, portfolio modal focus containment, Escape, and focus restoration. WebKit uses Safari's Option+Tab behavior for link navigation.
- Portfolio checks cover all five categories and return to all concepts.
- Contact and portfolio forms cover empty-field errors, valid input, receiver failure, retained values, retry, success, reset, and success focus. The audit form also rejects unsafe website URLs and recovers from network failures. The scroll popup covers validation, failure recovery, success, focus, dismissal, and once-per-session display.
- Form browser tests intercept requests locally. **No test enquiries were sent to an external receiver.**
- Eight API tests exercise both accepted contact/audit forwarding through a stubbed receiver, payload/authentication headers, timeout/receiver failures, missing/insecure receiver configuration, invalid requests, honeypots, request-size limits, and per-instance rate limiting. These test the real handler with controlled outbound fetch responses; they do not prove inbox/CRM delivery.
- HTTP smoke checks pass for all 26 pages and 43 local image/logo assets, internal links and fragments, titles/descriptions/canonicals, unique IDs, image alternatives, security headers, robots, sitemap, and branded 404s. API rejection paths also pass.
- ESLint, TypeScript, and the optimized Next.js production build pass.
- Production dependency audit reports **zero known advisories** after updates.
- Representative desktop and mobile screenshots were inspected for the homepage, About, services, portfolio, and contact layouts.

## Issues fixed

1. Darkened low-contrast step numbers, labels, descriptions, and detail text in How We Work, plus the homepage About labels.
2. Corrected the brand's visible-text spacing and portfolio button accessible names so visible text is included in the accessible name.
3. Made scrollable industry/review regions and the mobile service comparison reachable by keyboard.
4. Restored focus to the actual portfolio opener after closing a dialog, including WebKit's pointer-focus behavior.
5. Updated Next.js and its ESLint configuration from 16.3.7 to 16.3.8 and refreshed source-map-js to remove the runtime advisories. See the [Next.js advisory](https://github.com/advisories/GHSA-cjq9-62q9-8jv4) and [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).
6. Removed the blocking homepage intro and text-reveal delay, so the server-rendered main message remains visible immediately. Decorative 3D code loads after the page load event during an idle period; reduced-motion users keep the static visual.
7. Kept initially visible inner-page sections visible while optional animation code loads; below-fold reveal effects remain.
8. Raised the loading priority of primary inner-page images and refined their responsive size hints.

## Lighthouse measurements

Lighthouse 13.5.0 against localhost, one serial desktop and mobile run per representative route, using default simulated mobile throttling. Scores are lab snapshots, not service guarantees. Reports are saved locally under `audit-results/`, which is ignored by Git.

| Route | Profile | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS | Report |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| / | mobile | 81 | 100 | 100 | 69 | 4.52s | 188ms | 0.000 | [HTML](../audit-results/home-mobile.html) |
| / | desktop | 99 | 100 | 100 | 69 | 0.99s | 0ms | 0.000 | [HTML](../audit-results/home-desktop.html) |
| /services/web-development | mobile | 89 | 100 | 100 | 69 | 3.77s | 10ms | 0.000 | [HTML](../audit-results/services-web-development-mobile.html) |
| /services/web-development | desktop | 100 | 100 | 100 | 69 | 0.77s | 0ms | 0.000 | [HTML](../audit-results/services-web-development-desktop.html) |
| /portfolio | mobile | 84 | 100 | 100 | 69 | 4.52s | 12ms | 0.000 | [HTML](../audit-results/portfolio-mobile.html) |
| /portfolio | desktop | 99 | 100 | 100 | 69 | 0.91s | 0ms | 0.000 | [HTML](../audit-results/portfolio-desktop.html) |
| /contact | mobile | 86 | 100 | 100 | 69 | 4.13s | 31ms | 0.000 | [HTML](../audit-results/contact-mobile.html) |
| /contact | desktop | 100 | 100 | 100 | 69 | 0.79s | 0ms | 0.000 | [HTML](../audit-results/contact-desktop.html) |

All eight runs scored 100 for automated accessibility and best practices. SEO is 69 because the staging build intentionally blocks indexing; indexing must be enabled with the real canonical domain for the approved launch.

The homepage mobile score improved **74 → 81**, measured LCP **6.36s → 4.52s**, and speed index **3.78s → 1.95s** in these runs. Desktop homepage performance improved **95 → 99**. Baseline reports are retained under `audit-results/baseline/`.

**Remaining performance work:** mobile LCP is approximately 3.8–4.5s across the measured routes. Lighthouse still identifies unused first-load JavaScript, render-blocking CSS, and some image-transfer savings. Desktop scores are 99–100 and mobile scores are 81–89. Reducing initial animation/UI bundles and shared CSS is the next optimization task. The current measurements do not support claiming all pages meet good mobile Core Web Vitals.

## Outstanding checks and launch blockers

- **Firefox coverage is pending.** Playwright's bundled Firefox exits before navigation with `Could not find profile folder`. Retrying a different temporary directory and the unrestricted environment produced the same result. This matches the reported [macOS profile-access issue](https://github.com/microsoft/playwright/issues/42768). Run the Firefox project on a compatible host/CI; its tests remain configured.
- The full dependency audit retains one **development-only** advisory for `braces` through the ESLint toolchain: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The registry reports no published patched version. It is absent from the production dependency audit; do not describe the full development tree as advisory-free.
- `npm run check:launch` fails for the real HTTPS canonical domain, approved enquiry receiver/token, and disabled search indexing. These remain required before public launch.
- Successful delivery to the actual receiver and inbox/CRM, production failure recovery, trusted forwarded-IP handling, and shared edge rate limiting remain unverified. The app's in-memory limiter covers one instance only.
- Replace preview testimonials with approved reviews, verify business statistics/claims, confirm asset rights, and add an approved privacy notice reflecting actual data processing.
- Real-device touch, screen-reader use, deployed HTTPS/redirects, caching/CDN behavior, production monitoring, rollback, and load testing remain outside this local run.
- Missing statically generated dynamic routes return the correct branded 404. The Next.js production process also logs `NoFallbackError` on these negative-route checks; no successful route or HTTP assertion failed.

## Re-run the audit

Use Node.js 22.19+ for Lighthouse (the audit used Node 24) and the committed pnpm lockfile.

```sh
pnpm install --frozen-lockfile
npx playwright install chromium firefox webkit
npm run lint
npm run build
npm run test:e2e:local
```

`test:e2e:local` runs API, Chromium desktop/mobile, and WebKit desktop/mobile. `npm run test:e2e` also includes Firefox; `npm run test:e2e -- --project=firefox-desktop` runs Firefox alone on a compatible host.

Playwright starts a production server on port 3002 when needed. Inspect its HTML report with `npm run test:e2e:report`; raw results, traces on failure, and representative screenshots are under `test-results/` and `playwright-report/`.

For HTTP and performance checks, start a production preview in one terminal:

```sh
npm run start -- --port 3003
```

Then run in another terminal:

```sh
TEST_BASE_URL=http://localhost:3003 npm run test:smoke
TEST_BASE_URL=http://localhost:3003 npm run test:performance
pnpm audit --prod
npm run check:launch
```

Performance HTML/JSON reports and their summary are saved to `audit-results/`. The scripts print failures; performance scores are recorded for review, not treated as a passing performance budget.
