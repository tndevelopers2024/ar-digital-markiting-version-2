# Nexora — Batch 1

Complete source for the foundation and homepage sections 1–4. These files are already implemented in the workspace.

## Dependency commands

```sh
npm install three @react-three/fiber @react-three/drei gsap lenis framer-motion react-hook-form zod @hookform/resolvers clsx
npm install -D @types/three
```

The dependencies were already installed in this project.

## Files

```text
app/globals.css
app/layout.tsx
app/page.tsx
app/icon.svg
app/opengraph-image.tsx
lib/config.ts
lib/gsap.ts
hooks/useIsMobile.ts
hooks/useLenis.ts
hooks/useReducedMotion.ts
components/ui/Brand.tsx
components/ui/Button.tsx
components/ui/Cursor.tsx
components/ui/Experience.tsx
components/ui/Loader.tsx
components/ui/Marquee.tsx
components/ui/SplitText.tsx
components/three/CameraRig.tsx
components/three/HeroObject.tsx
components/three/Scene.tsx
components/sections/About.tsx
components/sections/Hero.tsx
components/sections/Navbar.tsx
components/sections/TrustedBy.tsx
```

## app/globals.css

```css
@import "tailwindcss";
@import "lenis/dist/lenis.css";

:root {
  color-scheme: light;
  --background: #faf9f6;
  --surface: #ffffff;
  --foreground: #0e0e12;
  --muted: #6b6b76;
  --border: rgba(14, 14, 18, 0.08);
  --indigo: #5b4bff;
  --coral: #ff7a59;
  --peach: #ffd3b6;
  --gradient: linear-gradient(115deg, var(--indigo), var(--coral) 72%, var(--peach));
  --space: 8px;
  --radius: 24px;
  --glass: rgba(255, 255, 255, 0.6);
  --shadow: 0 4px 12px rgba(91, 75, 150, 0.025), 0 16px 48px rgba(91, 75, 150, 0.065);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 320ms;
  --duration-normal: 640ms;
  --duration-slow: 1120ms;
}
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-body);
}
* { box-sizing: border-box; }
html { scroll-padding-top: 112px; }
body { margin: 0; background: var(--background); color: var(--foreground); font-family: var(--font-body), Arial, sans-serif; -webkit-font-smoothing: antialiased; }
body::after { content: ""; position: fixed; inset: 0; z-index: 50; opacity: 0.032; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23000' filter='url(%23n)' opacity='.45' d='M0 0h160v160H0z'/%3E%3C/svg%3E"); }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; }
button, h1, h2, h3, p { margin: 0; }
button { color: inherit; }
::selection { background: #ded8ff; color: #21166a; }
:focus-visible { outline: 2px solid var(--indigo); outline-offset: 6px; border-radius: 4px; }
.skip-link { position: fixed; left: 24px; top: -80px; z-index: 120; background: white; padding: 16px 24px; border-radius: 16px; }
.skip-link:focus { top: 16px; }
main { position: relative; z-index: 2; overflow: clip; }
.section-container { width: min(100% - 112px, 1392px); margin-inline: auto; }
.eyebrow { display: flex; align-items: center; gap: 12px; font-size: 10px; font-weight: 550; letter-spacing: 1.7px; line-height: 1.7; }
.status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--indigo); box-shadow: 0 0 0 4px #5b4bff0a; flex-shrink: 0; }
.ambient-mesh { position: fixed; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 76% 46%, #e6deff88, transparent 33%), radial-gradient(ellipse at 89% 63%, #ffdfcc7a, transparent 28%); }
.scene { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.scene canvas { pointer-events: none; }
.nav-shell { position: fixed; z-index: 40; top: 24px; left: 50%; margin-left: -46%; width: 92%; max-width: 1440px; padding: 12px 16px 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border: 1px solid rgba(255, 255, 255, 0.9); border-radius: 80px; background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(20px); box-shadow: 0 4px 24px #56478905, 0 0 0 1px #0e0e1203; }
.brand { display: inline-flex; gap: 8px; align-items: center; font-family: var(--font-heading), sans-serif; font-size: 30px; letter-spacing: -1.8px; font-weight: 800; line-height: 1; }
.brand-mark { width: 28px; height: 28px; color: var(--indigo); }
.brand-period { font-family: var(--font-body), sans-serif; font-size: 10px; align-self: flex-start; letter-spacing: 0; padding-top: 4px; margin-left: -4px; }
.desktop-nav { display: flex; gap: 32px; align-items: center; padding-left: 56px; }
.desktop-nav a { font-size: 12px; color: #52525b; padding-block: 8px; transition: color var(--duration-fast); }
.desktop-nav a:hover { color: var(--indigo); }
.button { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 24px; min-height: 56px; padding: 16px 24px; border-radius: 99px; font-size: 13px; font-weight: 550; white-space: nowrap; isolation: isolate; }
.button::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--gradient); transform: translateX(-101%); transition: transform var(--duration-normal) var(--ease); }
.button:hover::before { transform: translateX(0); }
.button-primary { background: var(--indigo); color: white; box-shadow: 0 6px 16px #5b4bff1a; }
.button-primary::before { background: linear-gradient(100deg, #4e3be0, #7042be 65%, #a44349); }
.button-secondary { border: 1px solid var(--border); background: white; }
.button-secondary:hover { color: white; }
.nav-cta { min-height: 40px; padding: 12px 20px; font-size: 11px; gap: 20px; }
.nav-cta svg { width: 16px; height: 16px; }
.menu-toggle { display: none; }
.hero { position: relative; min-height: min(900px, 100svh); padding-top: 184px; padding-bottom: 100px; }
.hero-copy { position: relative; z-index: 3; max-width: 650px; pointer-events: none; }
.hero-copy a { pointer-events: auto; }
.hero h1 { font-family: var(--font-heading), sans-serif; font-size: clamp(72px, 7.3vw, 110px); font-weight: 500; line-height: 1.065; letter-spacing: -.055em; margin: 24px 0; }
.hero-line { display: block; overflow: hidden; padding-bottom: 6px; margin-bottom: -6px; }
.hero-line > span { display: block; }
.accent-line { color: var(--indigo); }
.headline-spark { display: inline-block; margin-left: 22px; font-size: 60px; vertical-align: 12%; color: var(--indigo); font-weight: 400; }
.hero-description { max-width: 368px; font-size: 15px; line-height: 1.8; color: var(--muted); margin-top: 24px; }
.hero-actions { display: flex; gap: 24px; align-items: center; margin-top: 32px; }
.text-link { display: inline-flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 500; }
.text-link svg { transition: transform var(--duration-normal) var(--ease); flex-shrink: 0; }
.text-link:hover svg { transform: translate(4px, -2px); }
.hero-actions .text-link { max-width: 150px; line-height: 1.5; }
.hero-proof { display: flex; align-items: center; gap: 12px; margin-top: 40px; }
.hero-proof p { font-size: 10px; font-weight: 550; }
.hero-proof > div > span { font-size: 10px; color: var(--muted); display: block; margin-top: 4px; }
.mini-avatars { display: flex; padding-left: 4px; }
.mini-avatars span { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--background); margin-left: -5px; background: #e8d9cc; color: #674c3b; font-family: var(--font-heading), sans-serif; font-size: 11px; }
.mini-avatars span:nth-child(2) { background: #d8d6e9; color: #514879; }
.mini-avatars span:nth-child(3) { background: #d5dfd4; color: #485745; }
.mini-avatars span:last-child { background: white; color: var(--indigo); }
.hero-art { position: absolute; width: 54%; height: 560px; top: 168px; right: -16px; pointer-events: none; }
.orbit { position: absolute; border: 1px solid #8d80c517; border-radius: 50%; width: 90%; height: 86%; top: 6%; left: 6%; transform: rotate(-25deg); }
.orbit-two { width: 96%; height: 65%; top: 16%; left: 1%; transform: rotate(26deg); border-style: dashed; border-color: #8d80c518; }
.art-coordinate { position: absolute; right: 0; top: 8px; font-size: 8px; color: #6b6b76; letter-spacing: 1.7px; }
.art-plus { color: #8c82b5; position: absolute; font-size: 22px; font-weight: 200; }
.plus-one { right: 3%; top: 48%; }.plus-two { left: 17%; bottom: 7%; }
.stat-chip { position: absolute; display: flex; align-items: center; gap: 12px; border: 1px solid #ffffffd9; border-radius: 16px; background: rgba(255, 255, 255, 0.73); box-shadow: var(--shadow); backdrop-filter: blur(16px); padding: 16px; }
.growth-chip { right: 0; top: 64px; transform: rotate(5deg); }
.chip-icon { display: grid; place-items: center; width: 40px; height: 40px; background: #f0edff; border-radius: 12px; color: var(--indigo); }
.chip-label { display: block; font-size: 7px; letter-spacing: 1.4px; color: var(--muted); margin-bottom: 4px; }
.stat-chip strong { display: block; font-family: var(--font-heading), sans-serif; font-size: 17px; letter-spacing: -.5px; font-weight: 600; }
.chip-note { display: block; font-size: 9px; color: var(--muted); margin-top: 4px; }
.mini-chart { width: 56px; height: 32px; color: var(--indigo); margin-left: 4px; }
.creative-chip { bottom: 64px; left: 8%; transform: rotate(-6deg); padding: 16px 24px 16px 16px; }
.spark-icon { font-size: 42px; line-height: 1; color: #9a63c9; }
.orbit-caption { position: absolute; right: 5%; bottom: 56px; font-size: 8px; letter-spacing: 1.5px; color: var(--muted); display: flex; align-items: center; gap: 12px; }
.orbit-caption > span { font-size: 24px; color: var(--indigo); }
.hero-bottom { position: absolute; bottom: 32px; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; color: var(--muted); }
.scroll-link { display: flex; align-items: center; gap: 12px; font-size: 10px; }
.scroll-circle { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 50%; color: var(--foreground); font-size: 16px; }
.hero-bottom > span { font-size: 8px; letter-spacing: 1.7px; }
.trusted { position: relative; border-top: 1px solid var(--border); padding: 40px 0 24px; }
.trusted-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.trusted-heading h2 { font-size: 11px; color: var(--muted); font-weight: 400; }
.tiny-cross { color: var(--indigo); font-size: 18px; line-height: 1; }
.marquee { position: relative; padding-bottom: 24px; overflow: hidden; margin-top: 32px; mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent); }
.marquee-track { display: flex; width: max-content; }
.marquee-group { display: flex; gap: 64px; align-items: center; padding-right: 64px; }
.partner { display: inline-flex; align-items: center; gap: 10px; color: #686671; font-family: var(--font-heading), sans-serif; font-size: 25px; font-weight: 650; letter-spacing: -1px; white-space: nowrap; }
.partner svg { width: 28px; height: 28px; }
.partner-1 { letter-spacing: -1.3px; }.partner-3 { font-size: 24px; }.partner-5 { font-weight: 800; }
.concept-note { text-align: right; font-size: 8px; color: var(--muted); margin-top: 24px; }
.about { position: relative; background: rgba(255, 255, 255, 0.72); border: 1px solid #fff; box-shadow: 0 -16px 64px #90819a03; backdrop-filter: blur(8px); border-radius: 32px 32px 0 0; margin-top: 64px; padding: 48px; margin-bottom: 32px; }
.about-top { display: flex; align-items: center; justify-content: space-between; }
.section-index { font-size: 8px; letter-spacing: 1.4px; color: var(--muted); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 64px; }
.about h2 { font-family: var(--font-heading), sans-serif; font-size: clamp(34px, 3.5vw, 56px); line-height: 1.18; font-weight: 500; letter-spacing: -2.5px; }
.about h2 span { color: var(--indigo); }
.about-statement { font-family: var(--font-heading), sans-serif; font-size: 25px; font-weight: 500; line-height: 1.55; letter-spacing: -.65px; }
.about-description { color: var(--muted); font-size: 13px; line-height: 1.9; margin-top: 24px; max-width: 430px; }
.about-link { margin-top: 24px; border-bottom: 1px solid #5b4bff33; padding-bottom: 8px; color: #5143ce; }
.about-pillars { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 64px; border-top: 1px solid var(--border); padding-top: 24px; gap: 32px; }
.about-pillars > div { display: flex; align-items: center; gap: 16px; }
.about-pillars > div > span { font-size: 9px; color: var(--muted); }
.about-pillars p { font-size: 11px; font-weight: 500; }
.about-pillars svg { margin-left: auto; color: var(--indigo); width: 16px; }
.loader { position: fixed; z-index: 100; inset: 0; background: var(--background); display: none; flex-direction: column; justify-content: space-between; padding: 48px; pointer-events: none; }
.loader-bottom { display: flex; align-items: flex-end; justify-content: space-between; }
.loader-bottom p { font-size: 13px; color: var(--muted); }
.loader-bottom > div { font-family: var(--font-heading), sans-serif; font-size: clamp(80px, 16vw, 240px); line-height: 1; color: var(--indigo); letter-spacing: -.07em; }
.loader-bottom sup { font-size: .2em; vertical-align: top; margin-top: .5em; display: inline-block; }
.cursor-dot, .cursor-ring { position: fixed; left: 0; top: 0; pointer-events: none; z-index: 90; border-radius: 50%; opacity: 0; }
.cursor-dot { width: 4px; height: 4px; margin: -2px; background: var(--indigo); }
.cursor-ring { width: 32px; height: 32px; margin: -16px; border: 1px solid #5b4bff50; display: grid; place-items: center; font-size: 7px; color: #4637b7; background: #ffffff18; }
@media (min-width: 1566px) { .nav-shell { margin-left: -720px; } }
@media (min-width: 1600px) { .hero { min-height: 920px; padding-top: 208px; }.hero-art { top: 208px; height: 600px; }.hero h1 { font-size: 112px; }.hero-description { font-size: 16px; } }
@media (max-width: 1100px) {
  .section-container { width: calc(100% - 64px); }
  .hero { padding-top: 168px; min-height: 810px; }
  .hero h1 { font-size: 80px; letter-spacing: -5px; }
  .hero-art { right: -8px; top: 208px; height: 440px; }
  .growth-chip { top: 32px; right: -8px; padding: 12px; }
  .mini-chart { display: none; }
  .creative-chip { left: 14%; bottom: 24px; }
  .orbit-caption { bottom: -16px; }
  .hero-actions { gap: 16px; }
  .hero-copy { max-width: 560px; }
  .desktop-nav { padding-left: 0; gap: 24px; }
  .about { padding: 40px 32px; }.about-grid { gap: 48px; }.about-statement { font-size: 22px; }
  .about-pillars { gap: 16px; }.about-pillars > div { gap: 8px; }.about-pillars p { font-size: 10px; }
}
@media (max-width: 767px) {
  .section-container { width: calc(100% - 40px); }
  .nav-shell { top: 16px; width: calc(100% - 32px); margin-left: calc(-50% + 16px); padding: 12px 16px; gap: 12px; }
  .brand { font-size: 25px; gap: 6px; }.brand-mark { width: 24px; height: 24px; }
  .desktop-nav { display: none; }.nav-cta { margin-left: auto; padding: 10px 14px; min-height: 36px; gap: 8px; font-size: 10px; }
  .menu-toggle { border: 0; display: flex; flex-direction: column; justify-content: center; gap: 5px; background: transparent; min-width: 36px; min-height: 40px; padding: 8px; }
  .menu-toggle span { display: block; height: 1px; width: 20px; background: var(--foreground); }
  .mobile-menu { position: absolute; top: calc(100% + 8px); right: 0; left: 0; padding: 16px 24px; border: 1px solid var(--border); border-radius: 24px; background: #fffffff5; box-shadow: var(--shadow); }
  .mobile-menu a { display: flex; justify-content: space-between; padding: 16px 0; font-size: 14px; }
  .hero { min-height: 1080px; padding-top: 136px; padding-bottom: 464px; }
  .eyebrow { font-size: 8px; letter-spacing: 1.15px; gap: 8px; }
  .hero h1 { font-size: clamp(60px, 12.7vw, 94px); line-height: 1.08; letter-spacing: -4px; margin: 24px 0; }
  .headline-spark { font-size: 42px; margin-left: 16px; }
  .hero-description { font-size: 14px; max-width: 340px; line-height: 1.8; }
  .hero-actions { gap: 16px; margin-top: 24px; }
  .button { min-height: 48px; padding: 14px 18px; gap: 16px; font-size: 11px; }.nav-cta { min-height: 36px; padding: 10px 14px; font-size: 10px; gap: 8px; }
  .hero-actions .text-link { font-size: 10px; max-width: 128px; gap: 8px; }
  .hero-proof { margin-top: 24px; }
  .hero-art { top: auto; bottom: 80px; height: 336px; width: 100%; right: 0; }
  .art-coordinate { top: 0; font-size: 6px; }.growth-chip { top: 40px; right: 0; }.stat-chip strong { font-size: 14px; }.chip-note { font-size: 8px; }.chip-label { font-size: 6px; }.chip-icon { width: 32px; height: 32px; }
  .creative-chip { left: 0; bottom: 0; padding: 12px 16px; }.spark-icon { font-size: 32px; }.orbit-caption { bottom: -24px; font-size: 6px; }.plus-two { left: 4%; bottom: 40%; }
  .scene { position: fixed; inset: 0; height: 100%; }
  .hero-bottom { bottom: 24px; }.hero-bottom > span { display: none; }.scroll-link { font-size: 9px; }
  .trusted { padding-top: 32px; }.trusted-heading { align-items: flex-start; flex-direction: column; gap: 8px; }.trusted-heading h2 { font-size: 10px; }.marquee { margin-top: 24px; }.marquee-group { gap: 40px; padding-right: 40px; }.partner { font-size: 22px; }.partner svg { width: 24px; height: 24px; }
  .about { padding: 32px 24px; margin-top: 32px; border-radius: 24px; }.section-index { display: none; }.about-grid { grid-template-columns: 1fr; gap: 32px; margin-top: 32px; }.about h2 { font-size: 40px; letter-spacing: -2px; }.about-statement { font-size: 21px; }.about-description { font-size: 12px; }.about-pillars { grid-template-columns: 1fr; margin-top: 32px; gap: 24px; }.about-pillars p { font-size: 12px; }.about-pillars > div { gap: 16px; }
  .loader { padding: 32px 24px; }.loader-bottom p { max-width: 120px; font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  .loader, .cursor-dot, .cursor-ring, .scene { display: none !important; }
  .marquee-track { transform: none !important; width: 100%; }.marquee-group { flex-wrap: wrap; justify-content: center; gap: 24px 40px; padding: 0; }.marquee-group[aria-hidden="true"] { display: none; }
  .reveal-word { opacity: 1 !important; }
  .hero-art::before { content: ""; position: absolute; inset: 15%; border-radius: 50%; background: var(--gradient); opacity: .25; }
}

.marquee-pause { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); padding: 2px 12px; border: 1px solid var(--border); border-radius: 99px; background: var(--background); color: var(--muted); font-size: 9px; }
```

## app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Manrope } from "next/font/google";
import { config } from "@/lib/config";
import "./globals.css";
const geist = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title: config.title,
  description: config.description,
  alternates: { canonical: "/" },
  openGraph: { title: config.title, description: config.description, url: config.url, siteName: config.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};
export const viewport: Viewport = { themeColor: "#FAF9F6", colorScheme: "light" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${geist.variable} ${manrope.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
```

## app/page.tsx

```tsx
import { Experience } from "@/components/ui/Experience";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, email: config.email, description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><TrustedBy/><About/></main></>;
}
```

## app/icon.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#FAF9F6"/><path d="M17 46V18h7l16 28h7V18h-7v20L24 18" fill="none" stroke="#5B4BFF" stroke-width="6" stroke-linejoin="round"/></svg>
```

## app/opengraph-image.tsx

```tsx
import { ImageResponse } from "next/og";
import { config } from "@/lib/config";
export const alt = "Nexora — Your next big thing starts here.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#FAF9F6", padding: 64, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>{config.name.toLowerCase()} ↗</div><div style={{ display: "flex", flexDirection: "column", fontSize: 94, lineHeight: 1.05, letterSpacing: -6 }}><span>Your next big thing.</span><span style={{ color: "#5B4BFF" }}>Starts here.</span></div><div style={{ display: "flex", fontSize: 20, color: "#6B6B76" }}>STRATEGY ↗ CREATIVITY ↗ PERFORMANCE</div><div style={{ display: "flex", position: "absolute", right: 50, top: 72, width: 280, height: 280, borderRadius: 140, background: "linear-gradient(135deg, #5B4BFF, #FF7A59, #FFD3B6)", opacity: 0.24 }}/></div>, size);
}
```

## lib/config.ts

```typescript
export const config = {
  name: "Nexora",
  url: "https://nexora.example",
  email: "hello@nexora.example",
  title: "Nexora — Make your next, extraordinary.",
  description: "Strategy, creativity, and performance. Nexora is the digital growth partner for ambitious brands ready for what’s next.",
  loader: "A little spark. A bigger future.",
  navigation: [
    { label: "Our approach", href: "#about" },
    { label: "Our partners", href: "#trusted" },
    { label: "Let’s talk", href: "mailto:hello@nexora.example" },
  ],
  booking: { label: "Book a call", href: "mailto:hello@nexora.example?subject=Let%E2%80%99s%20grow%20together" },
  hero: {
    eyebrow: "INDEPENDENT MINDS. EXTRAORDINARY GROWTH.",
    lines: ["Your next", "big thing.", "Starts here."],
    description: "We turn ambitious brands into the ones everyone’s talking about. A little strategy. A lot of possibility.",
    primary: { label: "Let’s grow together", href: "mailto:hello@nexora.example?subject=Let%E2%80%99s%20grow%20together" },
    secondary: { label: "Meet your unfair advantage", href: "#about" },
    proof: "Good people. Great partnerships.",
    rating: "Built for long-term growth",
    chipOne: { label: "THE GROWTH MINDSET", value: "3.2× growth", note: "An example of what’s possible" },
    chipTwo: { value: "98% happy partners", note: "Illustrative concept metric" },
    orbitLabel: "CREATIVITY, WITH A PURPOSE",
    artCoordinate: "N° 01 — THE POSSIBILITY EFFECT",
    bottomLeft: "YOUR AMBITION. OUR OBSESSION.",
    bottomRight: "STRATEGY ↗ CREATIVITY ↗ PERFORMANCE",
    scroll: "Scroll to see the bigger picture",
  },
  trusted: {
    eyebrow: "GOOD COMPANY TO KEEP",
    heading: "Big ambitions. Shared by great brands.",
    // Illustrative brand identities for this concept; replace with approved client logos.
    brands: ["Layers", "Quotient", "Circooles", "Sisyphus", "Catalog", "Nietzsche"],
    note: "Illustrative partner identities",
  },
  about: {
    eyebrow: "01 / THE NEXORA WAY",
    heading: ["More than", "an agency.", "Your next unfair", "advantage."],
    sideNote: "( A GOOD PLACE TO START )",
    statement: "The best brands don’t just get seen. They make people feel something. We bring sharp strategy, bold creativity, and serious performance together to make that happen.",
    description: "Think of us as an extension of your team. Curious by nature, collaborative by default, and as invested in your next chapter as you are.",
    link: "Sound like your kind of people?",
    pillars: ["Strategy that sees further", "Creative that moves people", "Performance you can measure"],
  },
  services: ["SEO", "Performance Ads", "Social Media", "Branding", "Web Development", "Content Strategy"],
  scene: [
    { selector: "#hero", x: 2.15, y: 0.1, scale: 1, rotation: 0, morph: 0.08, color: 0, opacity: 1, cameraZ: 8.2 },
    { selector: "#trusted", x: 2.5, y: 1.1, scale: 0.8, rotation: 1.5, morph: 0.13, color: 0.6, opacity: 0.45, cameraZ: 8.8 },
    { selector: "#about", x: 3.5, y: -0.3, scale: 0.85, rotation: 2.5, morph: 0.18, color: 1, opacity: 0.16, cameraZ: 9.2 },
  ],
} as const;
```

## lib/gsap.ts

```typescript
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("nexora", "0.16,1,0.3,1");
export const motion = { ease: "nexora", fast: 0.32, normal: 0.64, slow: 1.12 } as const;
export { gsap, ScrollTrigger };
```

## hooks/useIsMobile.ts

```typescript
"use client";
import { useSyncExternalStore } from "react";
const query = "(max-width: 767px), (pointer: coarse)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
export function useIsMobile() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
```

## hooks/useLenis.ts

```typescript
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useIsMobile } from "./useIsMobile";
export function useLenis() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    if (reduced || mobile) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, anchors: { offset: -112 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reduced, mobile]);
}
```

## hooks/useReducedMotion.ts

```typescript
"use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
```

## components/ui/Brand.tsx

```tsx
import { config } from "@/lib/config";
export function Brand({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`}><svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 25V7h5l12 18h5V7h-5v13L10 7" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="m23 3 5 5M4 24l5 5" stroke="currentColor" strokeWidth="3"/></svg>{config.name.toLowerCase()}<span className="brand-period">®</span></span>;
}
```

## components/ui/Button.tsx

```tsx
"use client";
import { useRef, useEffect, type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function Button({ children, href, secondary = false, className }: { children: ReactNode; href: string; secondary?: boolean; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => { const element = ref.current; return () => { gsap.killTweensOf(element); }; }, []);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || mobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gsap.to(ref.current, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.18, duration: motion.fast, overwrite: true });
  }
  function reset() { gsap.to(ref.current, { x: 0, y: 0, duration: motion.normal, ease: motion.ease, overwrite: true }); }
  return <a ref={ref} href={href} className={clsx("button", secondary ? "button-secondary" : "button-primary", className)} onMouseMove={move} onMouseLeave={reset} onBlur={reset}><span>{children}</span><Arrow diagonal={!secondary}/></a>;
}
```

## components/ui/Cursor.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    if (reduced || mobile) return;
    const elements = [dot.current, ring.current];
    const x = gsap.quickTo(ring.current, "x", { duration: 0.32, ease: "power3.out" });
    const y = gsap.quickTo(ring.current, "y", { duration: 0.32, ease: "power3.out" });
    function move(event: PointerEvent) {
      gsap.set(dot.current, { x: event.clientX, y: event.clientY, opacity: 1 });
      x(event.clientX); y(event.clientY);
      const target = (event.target as Element).closest("[data-cursor], a, button");
      const label = target?.getAttribute("data-cursor") || "";
      if (ring.current) ring.current.textContent = label;
      gsap.to(ring.current, { opacity: 1, scale: label ? 1.8 : target ? 1.35 : 1, duration: 0.32, overwrite: "auto" });
    }
    function leave() { gsap.set([dot.current, ring.current], { opacity: 0 }); }
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); x.tween.kill(); y.tween.kill(); gsap.killTweensOf(elements); };
  }, [reduced, mobile]);
  if (reduced || mobile) return null;
  return <div aria-hidden="true"><div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/></div>;
}
```

## components/ui/Experience.tsx

```tsx
"use client";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });
export function Experience() {
  useLenis();
  const reduced = useReducedMotion();
  return <><div className="ambient-mesh" aria-hidden="true"/>{!reduced && <Scene/>}<Loader/><Cursor/></>;
}
```

## components/ui/Loader.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, motion } from "@/lib/gsap";
import { Brand } from "./Brand";
import { config } from "@/lib/config";
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("nexora-intro")) return;
    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      gsap.set(ref.current, { display: "flex", yPercent: 0 });
      gsap.timeline({ onComplete: () => { sessionStorage.setItem("nexora-intro", "seen"); } })
        .to(progress, { value: 100, duration: motion.slow, ease: motion.ease, onUpdate: () => { if (number.current) number.current.textContent = Math.round(progress.value).toString().padStart(2, "0"); } })
        .to(ref.current, { yPercent: -100, duration: motion.slow, ease: motion.ease }, "+=0.08")
        .set(ref.current, { display: "none" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className="loader" aria-hidden="true"><Brand/><div className="loader-bottom"><p>{config.loader}</p><div><span ref={number}>00</span><sup>%</sup></div></div></div>;
}
```

## components/ui/Marquee.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Marquee({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animation = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => { animation.current?.paused(paused); }, [paused]);
  useEffect(() => {
    if (reduced) return;
    let settle: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      const tween = gsap.to(".marquee-track", { xPercent: -50, duration: 32, repeat: -1, ease: "none" });
      animation.current = tween;
      ScrollTrigger.create({ trigger: ref.current, start: "top bottom", end: "bottom top", onToggle: self => { if (!self.isActive) tween.pause(); else if (!ref.current?.hasAttribute("data-paused")) tween.resume(); }, onUpdate: self => {
        settle?.kill();
        tween.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 600, 3));
        settle = gsap.to(tween, { timeScale: 1, duration: 1.12, overwrite: true });
      } });
    }, ref);
    return () => { settle?.kill(); ctx.revert(); animation.current = null; };
  }, [reduced]);
  return <div ref={ref} className="marquee" data-paused={paused || undefined}><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 || undefined}>{items.map((item, i) => <span className={`partner partner-${i}`} key={item}><svg viewBox="0 0 32 32" fill="none" aria-hidden="true">{i % 3 === 0 ? <><path d="m16 3 13 8-13 8L3 11 16 3Z" fill="currentColor"/><path d="m3 17 13 8 13-8M3 23l13 8 13-8" stroke="currentColor" strokeWidth="3"/></> : i % 3 === 1 ? <><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="6"/><path d="m20 21 9 8" stroke="currentColor" strokeWidth="6"/></> : <><circle cx="11" cy="16" r="9" stroke="currentColor" strokeWidth="3"/><circle cx="21" cy="16" r="9" stroke="currentColor" strokeWidth="3"/></>}</svg>{item}</span>)}</div>)}</div>{!reduced && <button className="marquee-pause" aria-label={paused ? "Play partner marquee" : "Pause partner marquee"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>}</div>;
}
```

## components/ui/SplitText.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function SplitText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-word", { opacity: 0.2 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 45%", scrub: 0.64 } });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <p ref={ref} className={className} aria-label={text}>{text.split(" ").map((word, i) => <span key={i} aria-hidden="true" className="reveal-word">{word}{" "}</span>)}</p>;
}
```

## components/three/CameraRig.tsx

```tsx
"use client";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import type { MutableRefObject } from "react";
export type SceneState = { x: number; y: number; scale: number; rotation: number; morph: number; color: number; opacity: number; cameraZ: number };
export function CameraRig({ state, mobile }: { state: MutableRefObject<SceneState>; mobile: boolean }) {
  useFrame(({ camera, pointer }, delta) => {
    const dt = Math.min(delta, 0.05);
    camera.position.z = MathUtils.damp(camera.position.z, state.current.cameraZ, 4, dt);
    camera.position.x = MathUtils.damp(camera.position.x, mobile ? 0 : pointer.x * 0.13, 3, dt);
    camera.position.y = MathUtils.damp(camera.position.y, mobile ? 0 : pointer.y * 0.1, 3, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}
```

## components/three/HeroObject.tsx

```tsx
"use client";
import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Mesh, ShaderMaterial } from "three";
import type { SceneState } from "./CameraRig";
const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  void main() {
    vec3 p = position;
    p += normal * sin(p.y * 2.8 + uTime * 0.35) * sin(p.x * 2.0 + uTime * 0.2) * uMorph;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vPosition = p;
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragmentShader = `
  uniform float uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - abs(dot(n, vView)), 2.2);
    vec3 lavender = vec3(0.37, 0.26, 0.88);
    vec3 peach = vec3(1.0, 0.62, 0.45);
    vec3 cream = vec3(1.0, 0.94, 0.87);
    float band = sin(vPosition.y * 1.6 + vPosition.x * 1.1 + uColor) * 0.5 + 0.5;
    vec3 color = mix(lavender, peach, smoothstep(0.12, 0.85, band));
    color = mix(color, cream, smoothstep(0.55, 1.0, n.y * 0.5 + 0.5) * 0.75);
    float diffuse = max(dot(n, normalize(vec3(-0.4, 1.0, 1.6))), 0.0);
    color *= 0.73 + diffuse * 0.27;
    float spec = pow(max(dot(reflect(-normalize(vec3(-1.0, 2.0, 3.0)), n), vView), 0.0), 26.0);
    float strip = pow(max(dot(n, normalize(vec3(0.7, 0.0, 1.0))), 0.0), 24.0);
    color = mix(color, vec3(1.0, 0.98, 0.96), fresnel * 0.7 + spec * 0.55 + strip * 0.23);
    gl_FragColor = vec4(color, uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
export function HeroObject({ state, mobile }: { state: MutableRefObject<SceneState>; mobile: boolean }) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMorph: { value: 0.08 }, uColor: { value: 0 }, uOpacity: { value: 1 } }), []);
  useFrame(({ clock }, delta) => {
    if (!mesh.current || !material.current) return;
    const target = state.current;
    const dt = Math.min(delta, 0.05);
    const responsiveScale = Math.min(viewport.width / 12.2, 1.2);
    mesh.current.position.x = MathUtils.damp(mesh.current.position.x, mobile ? 0 : target.x * responsiveScale, 4, dt);
    mesh.current.position.y = mobile ? target.y : MathUtils.damp(mesh.current.position.y, target.y, 4, dt);
    mesh.current.rotation.x = MathUtils.damp(mesh.current.rotation.x, 0.3 + target.rotation * 0.3, 4, dt);
    mesh.current.rotation.y = MathUtils.damp(mesh.current.rotation.y, -0.25 + target.rotation, 4, dt);
    mesh.current.rotation.z = -0.35 + Math.sin(clock.elapsedTime * 0.18) * 0.06;
    const scale = MathUtils.damp(mesh.current.scale.x, mobile ? target.scale : target.scale * responsiveScale, 4, dt);
    mesh.current.scale.setScalar(scale);
    material.current.uniforms.uTime.value = clock.elapsedTime;
    for (const [uniform, value] of [["uMorph", target.morph], ["uColor", target.color], ["uOpacity", target.opacity]] as const) {
      material.current.uniforms[uniform].value = MathUtils.damp(material.current.uniforms[uniform].value, value, 4, dt);
    }
  });
  return <mesh ref={mesh} position={[mobile ? 0 : 2.15, mobile ? -1.55 : 0.1, 0]} rotation={[0.3, -0.25, -0.35]} scale={mobile ? 0.7 : 1}>
    <torusKnotGeometry args={[1.3, 0.46, mobile ? 96 : 160, mobile ? 16 : 24, 2, 3]}/>
    <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent/>
  </mesh>;
}
```

## components/three/Scene.tsx

```tsx
"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HeroObject } from "./HeroObject";
import { CameraRig, type SceneState } from "./CameraRig";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap } from "@/lib/gsap";
import { config } from "@/lib/config";
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function Scene() {
  const mobile = useIsMobile();
  const state = useRef<SceneState>({ ...config.scene[0] });
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (mobile) {
      const art = document.querySelector<HTMLElement>(".hero-art");
      const update = () => {
        if (!art) return;
        const rect = art.getBoundingClientRect();
        const worldHeight = 2 * Math.tan(19 * Math.PI / 180) * 8.2;
        Object.assign(state.current, config.scene[0], {
          x: 0,
          y: (0.5 - (rect.top + rect.height / 2) / window.innerHeight) * worldHeight,
          scale: (Math.min(rect.width, 420) * 0.86 / window.innerHeight * worldHeight) / 3.8,
          opacity: rect.bottom > 0 && rect.top < window.innerHeight ? 1 : 0,
        });
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
    }
    Object.assign(state.current, config.scene[0]);
    const ctx = gsap.context(() => {
      config.scene.slice(1).forEach(frame => {
        const { selector, ...values } = frame;
        gsap.to(state.current, { ...values, ease: "none", scrollTrigger: { trigger: selector, start: "top bottom", end: "top 25%", scrub: 1.12 } });
      });
    });
    return () => ctx.revert();
  }, [mobile]);
  return <div className="scene" aria-hidden="true"><CanvasBoundary><Canvas camera={{ position: [0, 0, 8.2], fov: 38 }} dpr={[1, mobile ? 1.25 : 1.75]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} frameloop={visible ? "always" : "never"} eventSource={typeof document !== "undefined" ? document.body : undefined} eventPrefix="client">
    <ambientLight intensity={1.5}/><directionalLight position={[-3, 5, 5]} intensity={3} color="#fff2e6"/>
    <HeroObject state={state} mobile={mobile}/><CameraRig state={state} mobile={mobile}/>
    {!mobile && <ContactShadows position={[2.15, -2.1, 0]} opacity={0.14} scale={8} blur={3} far={5} resolution={128} frames={1} color="#a59bc4"/>}
  </Canvas></CanvasBoundary></div>;
}
```

## components/sections/About.tsx

```tsx
import { config } from "@/lib/config";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow } from "@/components/ui/Button";
export function About() {
  const about = config.about;
  return <section id="about" className="about section-container" aria-labelledby="about-heading"><div className="about-top"><p className="eyebrow"><span className="status-dot"/>{about.eyebrow}</p><span className="section-index" aria-hidden="true">{about.sideNote}</span></div><div className="about-grid"><h2 id="about-heading">{about.heading[0]}<br/>{about.heading[1]}<br/><span>{about.heading[2]}<br/>{about.heading[3]}</span></h2><div className="about-content"><SplitText text={about.statement} className="about-statement"/><p className="about-description">{about.description}</p><a href={config.booking.href} className="text-link about-link">{about.link}<Arrow diagonal/></a></div></div><div className="about-pillars">{about.pillars.map((pillar, i) => <div key={pillar}><span>0{i + 1}</span><p>{pillar}</p><Arrow diagonal/></div>)}</div></section>;
}
```

## components/sections/Hero.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { Button, Arrow } from "@/components/ui/Button";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const delay = sessionStorage.getItem("nexora-intro") ? 0.1 : 1.45;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line > span", { yPercent: 115, duration: motion.slow, stagger: 0.12, ease: motion.ease, delay });
      gsap.from(".hero-enter", { y: 24, opacity: 0, duration: motion.normal, stagger: 0.1, delay: delay + 0.45, ease: motion.ease });
      gsap.from(".stat-chip", { y: 32, opacity: 0, duration: motion.slow, stagger: 0.2, delay: delay + 0.5, ease: motion.ease });
    }, ref);
    return () => ctx.revert();
  }, []);
  const hero = config.hero;
  return <section id="hero" ref={ref} className="hero section-container" aria-labelledby="hero-heading">
    <div className="hero-copy">
      <div className="eyebrow hero-enter"><span className="status-dot"/>{hero.eyebrow}</div>
      <h1 id="hero-heading">{hero.lines.map((line, i) => <span className={`hero-line ${i === 2 ? "accent-line" : ""}`} key={line}><span>{line}{i === 1 && <span className="headline-spark" aria-hidden="true">✳</span>}</span></span>)}</h1>
      <p className="hero-description hero-enter">{hero.description}</p>
      <div className="hero-actions hero-enter"><Button href={hero.primary.href}>{hero.primary.label}</Button><a href={hero.secondary.href} className="text-link">{hero.secondary.label}<Arrow/></a></div>
      <div className="hero-proof hero-enter"><div className="mini-avatars" aria-hidden="true"><span>J</span><span>A</span><span>M</span><span>+</span></div><div><p>{hero.proof}</p><span>{hero.rating}</span></div></div>
    </div>
    <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="art-plus plus-one">+</span><span className="art-plus plus-two">+</span><span className="art-coordinate">{hero.artCoordinate}</span>
      <div className="stat-chip growth-chip"><span className="chip-icon"><Arrow diagonal/></span><div><span className="chip-label">{hero.chipOne.label}</span><strong>{hero.chipOne.value}</strong><span className="chip-note">{hero.chipOne.note}</span></div><svg className="mini-chart" viewBox="0 0 72 36"><path d="M2 32 15 26 25 29 37 16 48 19 60 6 70 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      <div className="stat-chip creative-chip"><span className="spark-icon">✳</span><div><strong>{hero.chipTwo.value}</strong><span className="chip-note">{hero.chipTwo.note}</span></div></div>
      <span className="orbit-caption">{hero.orbitLabel}<span>↗</span></span>
    </div>
    <div className="hero-bottom hero-enter"><a href="#trusted" className="scroll-link"><span className="scroll-circle">↓</span>{hero.scroll}</a><span>{hero.bottomRight}</span></div>
  </section>;
}
```

## components/sections/Navbar.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    let previous = window.scrollY;
    let hidden = false;
    function scroll() {
      const current = window.scrollY;
      const shouldHide = current > previous && current > 160 && !open;
      if (Math.abs(current - previous) < 5 && current > 160) return;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        gsap.to(ref.current, { yPercent: shouldHide ? -160 : 0, duration: reduced ? 0 : motion.normal, ease: motion.ease, overwrite: true });
      }
      previous = current;
    }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", escape);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("keydown", escape); gsap.killTweensOf(element); };
  }, [open, reduced]);
  return <header ref={ref} className="nav-shell" onFocusCapture={() => gsap.to(ref.current, { yPercent: 0, duration: 0.2, overwrite: true })}>
    <a href="#hero" className="brand-link" aria-label={`${config.name} home`}><Brand/></a>
    <nav aria-label="Main navigation" className="desktop-nav">{config.navigation.map(link => <a href={link.href} key={link.label}>{link.label}</a>)}</nav>
    <Button href={config.booking.href} className="nav-cta">{config.booking.label}</Button>
    <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span/><span/></button>
    {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{config.navigation.map(link => <a href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}</nav>}
  </header>;
}
```

## components/sections/TrustedBy.tsx

```tsx
import { config } from "@/lib/config";
import { Marquee } from "@/components/ui/Marquee";
export function TrustedBy() {
  return <section id="trusted" className="trusted section-container" aria-labelledby="trusted-heading"><div className="trusted-heading"><p className="eyebrow"><span className="tiny-cross">✳</span>{config.trusted.eyebrow}</p><h2 id="trusted-heading">{config.trusted.heading}</h2></div><Marquee items={config.trusted.brands}/><p className="concept-note">{config.trusted.note}</p></section>;
}
```

## Next batch

5. Services bento grid
6. Why Choose Us comparison
7. Industries
8. Selected Work horizontal showcase

Continue only when you say “next”.
