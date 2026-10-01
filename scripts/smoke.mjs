import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3002';
const manifest=JSON.parse(await fs.readFile('.next/prerender-manifest.json','utf8'));
const routes=Object.keys(manifest.routes).filter(path=>!path.startsWith('/_')&&!/\.(xml|txt|svg|ico|png)$/.test(path)&&path!='/opengraph-image');
const assets=new Set();
const pages=new Map();
for(const path of routes){
 const response=await fetch(base+path);assert.equal(response.status,200,path);
 assert.equal(response.headers.get('x-content-type-options'),'nosniff');assert.equal(response.headers.get('x-frame-options'),'DENY');assert.equal(response.headers.get('x-powered-by'),null);
 const html=await response.text();pages.set(path,html);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${path}: one h1`);
 assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/<meta name="description"/);
 assert.doesNotMatch(html,/ar-marketing\.example|Website concept\./);
 for(const match of html.matchAll(/(?:src|href)="([^"<>]+)"/g)){
  const raw=match[1].replaceAll('&amp;','&');
  if(raw.startsWith('/images/')||raw.startsWith('/brand/'))assets.add(raw);
  if(raw.startsWith('/_next/image?'))assets.add(new URL(raw,base).searchParams.get('url'));
 }
}
for(const [path,html] of pages){
 for(const match of html.matchAll(/href="([^"<>]+)"/g)){
  const href=match[1].replaceAll('&amp;','&');
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const link=new URL(href,base+path);if(!pages.has(link.pathname))continue;
  if(link.hash)assert.ok(pages.get(link.pathname).includes(`id="${decodeURIComponent(link.hash.slice(1))}"`),`${path}: missing target ${href}`);
 }
}
for(const asset of assets){const response=await fetch(base+asset,{method:'HEAD'});assert.equal(response.status,200,asset);}
const missing=await fetch(base+'/missing-launch-check-page');assert.equal(missing.status,404);assert.match(await missing.text(),/Let’s get you back/);
for(const path of ['/robots.txt','/sitemap.xml'])assert.equal((await fetch(base+path)).status,200,path);
const home=await (await fetch(base)).text();assert.doesNotMatch(home,/id="(?:testimonials|awards|pricing|results|trusted)"/);
const origin=new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').origin;
const post=(body,headers={})=>fetch(base+'/api/enquiries',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body});
assert.equal((await post('{}',{Origin:'https://untrusted.invalid'})).status,403);
assert.equal((await post('{}',{'Content-Type':'text/plain'})).status,415);
assert.equal((await post('{',{'x-forwarded-for':'192.0.2.1'})).status,400);
assert.equal((await post(JSON.stringify({kind:'contact',data:{}}),{'x-forwarded-for':'192.0.2.2'})).status,400);
assert.equal((await post('x'.repeat(17000),{'x-forwarded-for':'192.0.2.3'})).status,413);
for(let i=0;i<5;i++)assert.equal((await post('{}',{'x-forwarded-for':'192.0.2.4'})).status,400);
assert.equal((await post('{}',{'x-forwarded-for':'192.0.2.4'})).status,429);
console.log(`PASS: ${routes.length} pages, ${assets.size} local assets, 404, security headers, SEO endpoints, and API rejection/rate-limit paths. No enquiries sent.`);
