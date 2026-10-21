# Production handover

## Verified on 21 October 2026

Detailed scope, measurements, fixes, commands, and limitations: [local production audit](docs/production-audit.md).

- ESLint passes.
- The optimized Next.js production build and TypeScript checks pass.
- Playwright/API audit: 158 passed, zero failed. Chromium and WebKit desktop/mobile cover every content route. Ten duplicate WebKit breakpoint cases are intentionally skipped; Firefox is blocked by a host browser-profile issue and remains unverified.
- Automated axe WCAG A/AA scans pass on all 26 pages at desktop/mobile sizes, plus portfolio modal states.
- Production dependency audit reports zero known advisories after updating Next.js to 16.3.8 and refreshing source-map-js. One unpatched development-only braces advisory remains in the ESLint dependency tree.
- Lighthouse representative-page scores: performance 99–100 desktop and 81–89 mobile; accessibility and best practices 100. Mobile LCP remains about 3.8–4.5s and needs further optimization. Staging SEO scores are reduced by disabled indexing.
- Production HTTP smoke checks pass for all 26 content pages and 43 local image/logo assets after the inner-page image update.
- All 14 new inner-page images return valid image responses through Next.js image optimization at 640px width.
- Checks cover common inner-page heroes, one H1 per page, titles, descriptions, canonicals, unique IDs, image alternatives, internal links and fragments, security headers, robots, sitemap, and branded 404s.
- Enquiry checks cover invalid origin, unsupported content type, malformed JSON, invalid fields, oversized bodies, honeypot rejection, and the per-instance rate limit. These checks do not send valid enquiries or contact a receiver.
- The portfolio form uses the same validated enquiry API as the contact page. It no longer simulates success.
- Portfolio studies are described as concepts. Unverified client endorsements, performance claims, and unrelated company contact details were removed from the portfolio.

Representative desktop/mobile screenshots were reviewed. Automated keyboard, menus, portfolio filters/dialogs, form validation/recovery, FAQ, reviews, and popup checks pass. Accessibility fixes and loading improvements were applied to the homepage and inner pages. Physical-device touch, manual screen-reader use, Firefox, live hosting, and successful remote enquiry delivery remain unverified.

## Run locally

Use a supported Node.js LTS release compatible with Next.js 16 (the installed package requires Node >=20.9.0). The repository uses `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
npm run dev
```

For a production preview:

```sh
npm run lint
npm run build
npm run test:e2e:local
npm run start -- --port 3002
```

In another terminal:

```sh
npm run test:smoke
npm run test:performance
npm run check:launch
```

`TEST_BASE_URL` changes the smoke test target; it defaults to `http://localhost:3002`. Use a local or isolated staging server for API rejection checks. They consume rate-limit entries but never send enquiries.

## Launch configuration still required

`npm run check:launch` currently reports a missing real HTTPS domain, incomplete enquiry receiver configuration, and disabled search indexing. A contact email is configured; confirm it is the approved business inbox before publishing.

Set these in the host's encrypted environment settings:

- `NEXT_PUBLIC_SITE_URL`: the canonical HTTPS domain.
- `NEXT_PUBLIC_CONTACT_EMAIL`: the approved business email.
- `ENQUIRY_WEBHOOK_URL`: the approved HTTPS email/CRM receiver.
- `ENQUIRY_WEBHOOK_TOKEN`: its server-only bearer token.
- `NEXT_PUBLIC_SITE_INDEXABLE`: keep `false` for staging; enable only for the approved public launch.

Public variables are embedded at build time. Rebuild after changing them. Never place credentials in a `NEXT_PUBLIC_` variable. Do not commit `.env` files.

## Enquiry delivery

The receiver accepts a bearer-authenticated JSON POST:

```json
{ "id": "unique-request-id", "receivedAt": "ISO timestamp", "kind": "contact or audit", "data": {} }
```

It must durably accept the enquiry before returning a successful status. Redirects are rejected. The server times out after 10 seconds; the client after 15 seconds. Forms preserve entered values and show an error if delivery fails or cannot be confirmed. Configure receiver-side deduplication and avoid logging submitted personal details.

Before launch, test a real approved enquiry through the receiver and inbox/CRM, plus failure and recovery. Configure shared edge rate limiting and trusted forwarded IP headers; the in-memory limit only protects one server instance.

## Content and final review

- The homepage still contains explicitly labelled preview reviews. Replace them with approved client reviews before public launch.
- Confirm the homepage business statistics and the services offered. Portfolio and campaign concept studies must remain labelled unless replaced with approved real work.
- Confirm rights to the supplied photos and brand assets.
- Add an approved privacy notice reflecting the actual host, enquiry processor, and data practices.
- Complete Firefox and manual real-device/screen-reader review; automated desktop/mobile navigation, portfolio filters/dialog focus/Escape, FAQ keyboard controls, form recovery, reduced-motion rendering, and narrow-screen checks now pass.
- After deployment, verify HTTPS and redirects, canonical URLs, sitemap and robots, real delivery, performance, monitoring, and rollback.
