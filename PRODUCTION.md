# Production handover

## Current status
The code is prepared for a production build; public launch is blocked until real configuration and delivery verification are supplied. No deployment has been performed.

## Configure and run
Copy `.env.example` to `.env.local` for local work, or use your host's encrypted environment settings. Public values are embedded at build time; rebuild after changing them.

- `NEXT_PUBLIC_SITE_URL`: the real HTTPS canonical domain.
- `NEXT_PUBLIC_CONTACT_EMAIL`: an approved business inbox.
- `ENQUIRY_WEBHOOK_URL`: your approved HTTPS CRM/email relay endpoint.
- `ENQUIRY_WEBHOOK_TOKEN`: a server-only bearer secret, never a NEXT_PUBLIC value.
- `NEXT_PUBLIC_SITE_INDEXABLE`: false on staging; true only on the approved public domain.

Run `npm ci`, `npm run lint`, `npm run build -- --webpack`, then `npm start`. Run `npm run check:launch` separately to catch missing launch configuration. Use a supported Node.js LTS runtime compatible with the installed Next.js version.

## Enquiry receiver contract
POST JSON with a bearer token: `{ id, receivedAt, kind: "contact" | "audit", data }`.
The receiver must authenticate the token, durably queue/deliver the message, and only then return 2xx. Store no form payloads in request logs. Do not redirect. The server uses a 10-second timeout; the UI preserves entered values on failures and never displays a false success. Delivery timeouts may be ambiguous, so configure receiver-side deduplication by content/time window and monitoring. No automatic retries occur.

Both forms validate on client and server. The endpoint enforces origin, JSON content type, a 16 KB streaming body limit, a honeypot and a per-instance 5/minute IP limit. Configure a SHARED edge/WAF rate limit and trusted forwarding headers on the host; the in-process limit is not sufficient protection across multiple instances. Add a bot challenge if spam warrants it.

## Before public launch (owner decisions)
- Supply/verify domain, contact inbox, phone and social profiles. No fabricated contacts were added.
- Connect and test real enquiry delivery with an authorized test message, including failure/recovery and duplicate handling.
- Approve a privacy notice matching your actual hosting, processor, retention, analytics and contact practices; add its footer/form link when available. No invented legal terms or retention promises have been published.
- Configure HTTPS, domain redirects, deployment secrets, shared rate limiting, uptime/error monitoring and rollback in the hosting account.
- Confirm each advertised service and approve all public copy. Campaign examples and AI-created imagery remain clearly identified. Fictional reviews, awards, client logos, prices and numerical results are no longer rendered on the homepage. Sample staff identities were replaced with skills/roles.
- Branded favicon and Apple touch icon are generated from the existing AR artwork.
- Run Lighthouse against the deployed production build on representative desktop/mobile devices. No 90+ score is claimed without a measured run.
- After approval, set indexing true, rebuild, verify sitemap/robots/canonicals and submit the sitemap to search tools.

## Verification
`npm run test:smoke` targets a running production server using `TEST_BASE_URL` (default http://localhost:3002). It checks all static routes, response metadata, security headers, broken local assets, branded 404, robots and sitemap, plus non-delivery API rejection paths. It never submits a valid enquiry or contacts a configured receiver.

## Completed checks — 30 September 2026
- ESLint and the optimized webpack production build pass.
- Production smoke checks pass for 25 pages and 75 local image/logo assets; internal fragment targets, security headers, sitemap/robots and branded 404 are checked.
- Invalid origin, unsupported type, malformed JSON, invalid fields, oversized payload and per-instance rate-limit paths pass without delivering an enquiry.
- Production contact validation focuses the first invalid field and exposes field errors. Mobile homepage has one H1 and no horizontal overflow at 360 px; no runtime errors were observed in the checked contact flow.
- npm production dependency audit reports zero known advisories at the time of this check.
- The launch gate correctly fails because real domain, contact inbox, receiver credentials and indexing approval have not been supplied. Successful remote delivery, deployed Lighthouse, shared edge rate limiting and approved privacy content remain unverified.
