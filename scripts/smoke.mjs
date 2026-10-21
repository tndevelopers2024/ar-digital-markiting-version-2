import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
createRequire(require.resolve('next/package.json'))('@next/env').loadEnvConfig(process.cwd());
const base = process.env.TEST_BASE_URL || 'http://localhost:3002';
const manifest = JSON.parse(await fs.readFile('.next/prerender-manifest.json', 'utf8'));
const routes = Object.keys(manifest.routes).filter(path => !path.startsWith('/_') && !/\.(xml|txt|svg|ico|png)$/.test(path) && path !== '/opengraph-image');
const assets = new Set();
const pages = new Map();
for (const path of routes) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  assert.equal(response.headers.get('x-powered-by'), null);
  const html = await response.text();
  pages.set(path, html);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one h1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${path}: title`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: description`);
  assert.match(html, /rel="canonical"/, `${path}: canonical`);
  if (path !== '/') assert.match(html, /aria-label="Breadcrumb"/, `${path}: common hero`);
  assert.doesNotMatch(html, /digitalmaven\.io|Al-Futtaim|Hafiz|href="#"/, `${path}: unrelated or unfinished content`);
  assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<button\b/, `${path}: nested interactive controls`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: duplicate ids`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /\balt="/, `${path}: image alternative`);
  for (const match of html.matchAll(/(?:src|href)="([^"<>]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (raw.startsWith('/images/') || raw.startsWith('/brand/')) assets.add(raw);
    if (raw.startsWith('/_next/image?')) assets.add(new URL(raw, base).searchParams.get('url'));
  }
}
const otherLinks = new Set();
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const link = new URL(href, base + path);
    if (!pages.has(link.pathname)) { otherLinks.add(link.pathname); continue; }
    if (link.hash) assert.ok(pages.get(link.pathname).includes(`id="${decodeURIComponent(link.hash.slice(1))}"`), `${path}: missing target ${href}`);
  }
}
for (const path of otherLinks) assert.equal((await fetch(base + path)).status, 200, `Internal link: ${path}`);
for (const asset of assets) assert.equal((await fetch(base + asset, { method: 'HEAD' })).status, 200, asset);
for (const path of ['/missing-launch-check-page', '/services/missing-service', '/blogs/missing-post', '/projects/missing-campaign']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /Let’s get you back/);
}
for (const path of ['/robots.txt', '/sitemap.xml']) assert.equal((await fetch(base + path)).status, 200, path);
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin;
const prefix = `192.0.${Math.floor(Math.random() * 250)}.`;
const post = (body, suffix, headers = {}) => fetch(base + '/api/enquiries', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'x-forwarded-for': prefix + suffix, ...headers }, body,
});
assert.equal((await post('{}', 1, { Origin: 'https://untrusted.invalid' })).status, 403);
assert.equal((await post('{}', 2, { 'Content-Type': 'text/plain' })).status, 415);
assert.equal((await post('{', 3)).status, 400);
assert.equal((await post(JSON.stringify({ kind: 'contact', data: {} }), 4)).status, 400);
assert.equal((await post('x'.repeat(17000), 5)).status, 413);
// A filled honeypot is always rejected, even when the visible fields are valid.
assert.equal((await post(JSON.stringify({ kind: 'contact', company: 'bot', data: { name: 'QA Example', email: 'qa@example.invalid', service: 'Not sure yet', message: 'Local validation test; must not be delivered.' } }), 6)).status, 400);
for (let i = 0; i < 5; i++) assert.equal((await post('{}', 7)).status, 400);
assert.equal((await post('{}', 7)).status, 429);
console.log(`PASS: ${routes.length} pages, ${assets.size} local assets, internal links, fragments, common heroes, metadata, unique IDs, image alternatives, 404s, security headers, and API rejection/rate-limit paths. No enquiries sent.`);
