# Nexora — Batch 2

Sections 5–8 are implemented in the workspace. No additional dependencies are required.

## Files

```text
app/page.tsx
app/globals.css
lib/config.ts
components/ui/Card.tsx
components/ui/Icon.tsx
components/ui/Section.tsx
components/ui/ProjectArtwork.tsx
components/ui/ProjectDialog.tsx
components/sections/Services.tsx
components/sections/WhyChooseUs.tsx
components/sections/Industries.tsx
components/sections/SelectedWork.tsx
```

## Complete source

The following are complete files, including updated shared configuration, page composition, and styles. Existing Batch 1 components remain in use.

### app/page.tsx

```tsx
import { Experience } from "@/components/ui/Experience";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Industries } from "@/components/sections/Industries";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, email: config.email, description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><TrustedBy/><About/><Services/><WhyChooseUs/><Industries/><SelectedWork/></main></>;
}
```

### app/globals.css

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

/* Batch 2: capabilities, partnership, industries, and selected work. */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.batch-section { position: relative; padding-block: 96px; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 48px; margin-bottom: 48px; }
.section-heading h2, .centered-heading h2 { font-family: var(--font-heading), sans-serif; font-size: clamp(36px, 3.7vw, 56px); font-weight: 500; letter-spacing: -.045em; line-height: 1.18; margin-top: 24px; }
.section-heading h2 > span, .centered-heading h2 > span { color: var(--muted); }
.section-intro { color: var(--muted); font-size: 14px; line-height: 1.9; max-width: 320px; }
.interactive-card { position: relative; isolation: isolate; height: 100%; overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
.card-reflection { position: absolute; top: 0; left: 0; margin: -200px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle at center, #ffd3b677, #5b4bff12 42%, transparent 70%); opacity: 0; pointer-events: none; z-index: -1; }
.interactive-card:focus-within { outline: 2px solid var(--indigo); outline-offset: 4px; }
.card-number { font-size: 10px; letter-spacing: 1px; color: var(--muted); }
.services { padding-top: 80px; }
.services-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; }
.service-slot { grid-column: span 3; min-width: 0; }
.service-slot-0 { grid-column: span 7; }.service-slot-1 { grid-column: span 5; }
.service-card { padding: 24px; min-height: 344px; }
.service-slot-0 .service-card, .service-slot-1 .service-card { min-height: 480px; padding: 32px; }
.service-top, .industry-top { display: flex; justify-content: space-between; align-items: center; }
.service-icon { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 16px; border: 1px solid #5b4bff10; color: var(--indigo); background: #f5f3ff; }
.service-copy h3 { font-family: var(--font-heading), sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -.7px; margin-top: 32px; }
.service-tagline { font-size: 12px; margin-top: 8px; font-weight: 500; }
.service-description { margin-top: 12px; font-size: 12px; line-height: 1.85; color: var(--muted); max-width: 430px; }
.service-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; padding-right: 24px; }
.service-tags > span, .project-tags > span { font-size: 9px; color: #625d74; border: 1px solid #dedbe5; border-radius: 99px; padding: 6px 10px; background: #ffffff70; }
.card-action { display: grid; place-items: center; position: absolute; right: 16px; bottom: 16px; width: 40px; height: 40px; border-radius: 50%; color: var(--indigo); transition: background var(--duration-fast), transform var(--duration-normal) var(--ease); }
.card-action:hover { background: #eeebff; transform: rotate(45deg); }
.service-seo { background: linear-gradient(125deg, #fff 50%, #f5f1ff); }
.service-ads { background: linear-gradient(125deg, #fff 50%, #fff5ee); }
.service-visual { position: relative; height: 168px; margin-top: 8px; }
.service-slot-0 .service-copy h3, .service-slot-1 .service-copy h3 { margin-top: 16px; font-size: 28px; }
.search-orbit { position: absolute; width: 240px; height: 150px; border: 1px solid #bdb0ee40; border-radius: 50%; left: 50%; top: -4px; transform: translateX(-50%) rotate(-18deg); }
.search-widget { position: absolute; width: min(340px, 85%); left: 50%; top: 8px; transform: translateX(-50%) rotate(-5deg); background: #ffffffb3; border: 1px solid white; padding: 12px; border-radius: 16px; box-shadow: 0 8px 32px #6f54bc0e; }
.search-widget-bar { display: flex; align-items: center; gap: 8px; border: 1px solid #d7d2e9; padding: 10px; border-radius: 8px; font-size: 10px; white-space: nowrap; }
.search-widget-bar > svg { width: 14px; height: 14px; color: var(--indigo); }.search-enter { margin-left: auto; color: var(--muted); }
.search-result { display: flex; align-items: center; gap: 8px; padding: 12px 8px 0; }.result-favicon { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 6px; background: #ede8ff; color: var(--indigo); font-weight: 700; font-size: 14px; }.search-result > div { flex: 1; }.result-line { height: 4px; width: 80%; display: block; background: #cbc4e5; border-radius: 4px; }.result-line.short { margin-top: 6px; width: 58%; background: #e2deed; }.result-check { color: var(--indigo); font-size: 12px; }.search-result.faded { opacity: .4; }
.visual-caption { position: absolute; right: 0; bottom: 0; font-size: 8px; letter-spacing: .7px; color: var(--muted); }
.growth-bars { position: absolute; inset: 16px 32px 24px; display: flex; align-items: flex-end; gap: 10px; transform: rotate(-5deg); }.growth-bars > span { flex: 1; border-radius: 6px 6px 2px 2px; background: linear-gradient(180deg, #b7a7f1, #e7e0fc); border: 1px solid #b9acf244; }.growth-bars > span:nth-last-child(-n+2) { background: linear-gradient(180deg, #ffb996, #ffe6d7); border-color: #ffd3b6; }.growth-curve { position: absolute; inset: 0 16px auto; width: calc(100% - 32px); height: 120px; color: var(--indigo); }
.centered-heading { text-align: center; margin-bottom: 48px; }.centered-heading .eyebrow { justify-content: center; }.centered-heading .section-intro { margin: 24px auto 0; max-width: 416px; }.centered-heading h2 > span { color: var(--indigo); }
.comparison-section { width: min(100% - 112px, 1120px); }
.comparison-panel { background: #ffffffc9; border: 1px solid white; border-radius: 24px; padding: 8px 24px 0; box-shadow: var(--shadow); overflow: hidden; }
.comparison-table { width: 100%; border-collapse: collapse; text-align: left; table-layout: fixed; }
.comparison-table thead th { padding: 32px 24px; font-size: 13px; color: var(--muted); font-weight: 400; }.comparison-table th:first-child { width: 20%; padding-left: 8px; }.comparison-table thead th:nth-child(2) { width: 37%; }.comparison-table thead th:last-child { border-radius: 16px 16px 0 0; }.comparison-table thead th .brand { font-size: 26px; color: var(--foreground); }.comparison-table .brand-mark { width: 24px; height: 24px; }
.comparison-table tbody th, .comparison-table td { border-top: 1px solid var(--border); padding: 24px; font-size: 12px; font-weight: 400; }.comparison-table tbody th { color: var(--muted); }.comparison-table td:nth-child(2) { color: var(--muted); }.comparison-table th:last-child, .comparison-table td:last-child { background: #f2effb; color: #40366a; }.comparison-table tr:last-child td:last-child { border-radius: 0 0 16px 16px; }.comparison-cell { display: flex; align-items: center; gap: 12px; line-height: 1.65; }.comparison-mark { display: grid; place-items: center; flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; }.comparison-mark.positive { color: var(--indigo); background: #e7e1fa; }.comparison-mark.negative { color: #85818c; background: #f5f3f6; }.comparison-footer { display: flex; justify-content: center; align-items: center; gap: 12px; padding: 24px; font-size: 9px; letter-spacing: 1.5px; }.comparison-footer > span:last-child { font-size: 18px; color: var(--indigo); margin-left: 8px; }.comparison-note { max-width: 600px; margin: 16px auto 0; text-align: center; color: var(--muted); font-size: 10px; line-height: 1.7; }
.industries { padding-top: 64px; }.industry-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }.industry-card { padding: 32px; min-height: 224px; background: #ffffffb0; }.industry-top > svg { color: var(--indigo); width: 28px; height: 28px; }.industry-card h3 { font-family: var(--font-heading), sans-serif; margin-top: 32px; font-weight: 500; font-size: 22px; letter-spacing: -.7px; }.industry-card p { margin-top: 8px; max-width: calc(100% - 24px); color: var(--muted); font-size: 12px; line-height: 1.8; }.industry-link { position: absolute; display: grid; place-items: center; bottom: 24px; right: 16px; width: 40px; height: 40px; color: #7c739b; border-radius: 50%; transition: transform var(--duration-normal) var(--ease); }.industry-link:hover { transform: translate(3px, -3px); color: var(--indigo); }.industry-card:focus-within { background: linear-gradient(120deg, #f4f0ff, #fff5eb); }
.work-section { position: relative; background: #f3f1ed; margin-top: 32px; border-radius: 40px 40px 0 0; border-top: 1px solid white; }.work-stage { padding-block: 80px 48px; }.work-heading { margin-bottom: 40px; }.work-heading-aside { max-width: 320px; }.work-disclosure { font-size: 9px; color: var(--muted); margin-top: 16px; }.work-track { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px 24px; }.work-card { min-width: 0; }.work-card:last-child:nth-child(odd) { grid-column: 1 / -1; max-width: 900px; width: 100%; justify-self: center; }.project-open { display: block; position: relative; width: 100%; border: 0; padding: 0; border-radius: 24px; overflow: hidden; text-align: left; background: #ebe5df; }.project-open-arrow { display: grid; place-items: center; position: absolute; right: 24px; bottom: 24px; width: 48px; height: 48px; border-radius: 50%; background: #ffffffd9; color: var(--foreground); box-shadow: var(--shadow); transition: transform var(--duration-normal) var(--ease); }.project-open:hover .project-open-arrow { transform: rotate(45deg); }.project-open:focus-visible { outline-offset: -4px; }
.project-art { position: relative; aspect-ratio: 1.6; overflow: hidden; isolation: isolate; }.project-art-inner { position: absolute; inset: 0; overflow: hidden; }.art-brand { position: absolute; top: 8%; left: 6%; font-family: var(--font-heading), sans-serif; font-weight: 650; font-size: clamp(24px, 3vw, 44px); letter-spacing: -.055em; line-height: 1; z-index: 2; }.art-brand > span { font-size: .2em; vertical-align: top; margin: 6px 0 0 3px; display: inline-block; }.art-kicker { position: absolute; top: 10%; right: 6%; font-size: clamp(5px, .6vw, 8px); letter-spacing: 1px; z-index: 2; }.art-footnote { position: absolute; bottom: 8%; left: 6%; font-size: clamp(5px, .6vw, 8px); letter-spacing: 1.4px; z-index: 2; }
.art-forma { background: #e4e7db; color: #42523e; }.forma-circle { position: absolute; width: 54%; aspect-ratio: 1; border-radius: 50%; background: #d1d8c4; right: -2%; bottom: -18%; }.forma-copy { position: absolute; left: 6%; top: 38%; width: 36%; font-family: var(--font-heading), sans-serif; font-size: clamp(25px, 3.5vw, 48px); letter-spacing: -.05em; line-height: 1.05; }.bottle { position: absolute; width: 19%; height: 65%; top: 25%; filter: drop-shadow(12px 16px 8px #35402818); }.bottle-back { right: 28%; transform: rotate(-14deg); top: 19%; }.bottle-front { right: 9%; transform: rotate(12deg); }.bottle-cap { width: 57%; height: 17%; margin: auto; border-radius: 5px 5px 2px 2px; background: repeating-linear-gradient(90deg, #c6cdbe 0, #f0f2eb 3px, #c6cdbe 5px); }.bottle-body { height: 83%; border-radius: 24% 24% 12% 12% / 12% 12% 6% 6%; background: linear-gradient(90deg, #c9ceb9, #f7f6e9 32%, #eeeee1 68%, #bfc5ae); border: 1px solid #f0f2e3; display: flex; flex-direction: column; align-items: center; padding: 17% 8% 8%; }.bottle-body > span { font-family: var(--font-heading), sans-serif; font-size: clamp(17px, 2.6vw, 38px); letter-spacing: -.07em; }.bottle-body > strong { font-weight: 400; font-size: clamp(10px, 1.4vw, 18px); margin-top: 8%; }.bottle-body small { font-size: clamp(3px, .45vw, 6px); letter-spacing: .5px; text-align: center; margin-top: 8%; }.bottle-body i { font-style: normal; font-size: clamp(20px, 3vw, 40px); margin-top: auto; }.bottle-front .bottle-body { background: linear-gradient(90deg, #aebfa5, #d6e0c8 32%, #c8d6bd 68%, #99ad92); }
.art-orbit { background: #e6e2f3; color: #4d3c85; }.orbit-art-circle { position: absolute; width: 70%; aspect-ratio: 1; border: 1px solid #c9bee2; border-radius: 50%; left: -12%; bottom: -35%; }.orbit-copy { position: absolute; left: 6%; top: 28%; width: 46%; font-family: var(--font-heading), sans-serif; font-size: clamp(26px, 3.7vw, 52px); line-height: 1.08; letter-spacing: -.055em; }.workspace-window { position: absolute; width: 61%; height: 58%; right: -4%; bottom: -3%; transform: rotate(-8deg); border: 1px solid #ffffffc9; background: #faf9ff; border-radius: 12px; box-shadow: -12px 16px 40px #77629c22; overflow: hidden; }.window-chrome { height: 12%; display: flex; align-items: center; padding: 0 4%; gap: 4px; border-bottom: 1px solid #eae6f2; }.window-chrome > i { width: 4px; height: 4px; border-radius: 50%; background: #d1c9e1; }.window-chrome > span { font-size: clamp(4px, .5vw, 7px); margin-left: 12%; color: #776b8d; }.workspace-body { display: flex; height: 88%; }.workspace-sidebar { width: 17%; border-right: 1px solid #eae6f2; padding: 5%; display: flex; flex-direction: column; gap: 12%; }.workspace-avatar { background: #7662c1; color: #fff; width: 18px; height: 18px; border-radius: 5px; display: grid; place-items: center; font-size: 12px; }.workspace-sidebar i { width: 100%; height: 3px; background: #d7d1e5; }.workspace-content { padding: 5%; flex: 1; }.workspace-content > strong { font-size: clamp(8px, 1.2vw, 16px); font-weight: 550; }.workspace-subtitle { display: block; margin-top: 3%; color: #827391; font-size: 5px; letter-spacing: .6px; }.workspace-columns { display: flex; gap: 5%; margin-top: 8%; }.workspace-columns > div { width: 30%; }.workspace-column-title { display: block; width: 65%; height: 4px; border-radius: 4px; background: #cac0df; margin-bottom: 15%; }.workspace-task { padding: 12%; margin-bottom: 12%; background: white; border: 1px solid #eae6f2; border-radius: 5px; }.workspace-task i { display: block; width: 45%; height: 4px; background: #ecd7c9; border-radius: 2px; margin-bottom: 16%; }.workspace-task span { display: block; width: 100%; height: 2px; margin-top: 8%; background: #dcd6e8; }.workspace-task b { display: block; width: 10px; height: 10px; border-radius: 50%; background: #d8d0ea; margin-top: 20%; }.workspace-columns > div:nth-child(2) .workspace-task i { background: #d6dfc9; }
.art-sunday { background: #f5dbbd; color: #8b472b; }.sunday-sun { position: absolute; font-size: clamp(180px, 30vw, 450px); line-height: 1; right: -1%; top: -3%; color: #edbb85; font-family: sans-serif; }.sunday-copy { position: absolute; top: 36%; left: 6%; width: 40%; font-family: var(--font-heading), sans-serif; font-weight: 600; font-size: clamp(26px, 3.8vw, 52px); letter-spacing: -.055em; line-height: 1.08; }.coffee-cup { position: absolute; width: 31%; height: 63%; right: 13%; bottom: 5%; transform: rotate(13deg); filter: drop-shadow(10px 20px 12px #9f673124); }.coffee-lid { position: relative; z-index: 1; height: 13%; background: linear-gradient(#fffaf1, #e6d2b8); border: 1px solid #fff5e3; border-radius: 12px 12px 4px 4px; }.coffee-body { height: 87%; width: 94%; margin: auto; clip-path: polygon(0 0, 100% 0, 86% 100%, 14% 100%); background: linear-gradient(90deg, #d68155, #f1a36e 35%, #e5915c 70%, #c77448); display: flex; align-items: center; flex-direction: column; padding-top: 24%; color: #fff8e7; }.coffee-body strong { font-family: var(--font-heading), sans-serif; font-size: clamp(24px, 4.1vw, 60px); letter-spacing: -.07em; }.coffee-body span { font-size: clamp(6px, .8vw, 11px); }.coffee-body i { font-style: normal; font-size: clamp(40px, 6vw, 82px); line-height: 1; margin-top: 9%; }.coffee-stamp { position: absolute; left: 6%; bottom: 8%; font-size: clamp(5px, .6vw, 8px); letter-spacing: 1px; }
.art-haven { background: #e7e9df; color: #475b48; }.haven-copy { position: absolute; left: 6%; top: 28%; font-family: var(--font-heading), sans-serif; font-size: clamp(24px, 3.3vw, 46px); line-height: 1; letter-spacing: -.05em; width: 50%; z-index: 2; }.haven-sun { position: absolute; width: 25%; aspect-ratio: 1; border-radius: 50%; background: #f3dfb9; top: 15%; right: 11%; }.haven-house { position: absolute; right: -4%; bottom: 6%; width: 77%; height: 67%; }
.art-folio { background: #dce8eb; color: #355c68; }.folio-copy { position: absolute; top: 34%; left: 6%; width: 38%; font-family: var(--font-heading), sans-serif; font-size: clamp(28px, 4vw, 56px); line-height: 1.05; letter-spacing: -.055em; }.folio-paper { position: absolute; width: 36%; height: 72%; right: 13%; top: 21%; border-radius: 8px; padding: 4%; background: #f9fcfb; box-shadow: 8px 12px 32px #526d7914; transform: rotate(9deg); }.folio-paper.paper-back { background: #b6d0d5; transform: rotate(-9deg); right: 17%; top: 20%; }.folio-paper-head { display: flex; justify-content: space-between; font-size: clamp(9px, 1.3vw, 18px); font-weight: 600; }.folio-paper > strong { display: block; font-size: clamp(9px, 1.2vw, 16px); font-weight: 500; margin-top: 15%; }.folio-chart { height: 34%; display: flex; align-items: center; gap: 16%; margin-top: 12%; }.folio-donut { width: 50%; aspect-ratio: 1; border-radius: 50%; background: conic-gradient(#7b9fa8 0 45%, #b3cbd0 45% 78%, #e4c8a7 78%); position: relative; }.folio-donut::after { content: ""; position: absolute; inset: 24%; border-radius: 50%; background: #f9fcfb; }.folio-legend { width: 32%; display: grid; gap: 8px; }.folio-legend i { display: block; height: 3px; width: 100%; background: #c5d4d7; }.folio-bars { display: flex; height: 25%; align-items: flex-end; gap: 7%; margin-top: 12%; }.folio-bars span { flex: 1; background: #a3c1c8; border-radius: 2px 2px 0 0; }.folio-bars span:last-child { background: #527f8b; }
.work-card-info { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-top: 24px; }.project-category { display: block; color: var(--muted); font-size: 8px; letter-spacing: 1px; }.work-card h3 { font-family: var(--font-heading), sans-serif; font-size: 20px; line-height: 1.35; letter-spacing: -.6px; font-weight: 500; max-width: 340px; margin-top: 8px; }.project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }.project-tags > span { background: transparent; font-size: 8px; padding: 5px 9px; }.project-metric { flex-shrink: 0; text-align: right; padding-left: 24px; border-left: 1px solid #d9d5d0; max-width: 180px; }.project-metric strong { font-family: var(--font-heading), sans-serif; font-size: 36px; font-weight: 500; letter-spacing: -1.5px; line-height: 1; color: #5b4b9c; }.project-metric > span { display: block; font-size: 9px; color: var(--muted); line-height: 1.6; margin-top: 8px; }
.work-controls { display: none; align-items: center; gap: 32px; margin-top: 32px; }.work-scroll-hint, .work-list-hint { font-size: 8px; color: var(--muted); letter-spacing: 1.3px; }.work-scroll-hint > span { font-size: 16px; color: var(--indigo); margin-left: 12px; }.work-list-hint { text-align: center; margin-top: 48px; }.work-progress { flex: 1; height: 2px; background: #dcd6d0; overflow: hidden; }.work-progress > span { display: block; width: 100%; height: 100%; background: var(--indigo); transform-origin: left center; transform: scaleX(0); }.work-navigation { display: flex; align-items: center; gap: 8px; }.work-count { font-size: 11px; margin-right: 16px; font-variant-numeric: tabular-nums; }.work-count > span { color: var(--muted); }.work-navigation > button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #d9d4ce; display: grid; place-items: center; background: transparent; }.work-navigation > button:first-of-type svg { transform: rotate(180deg); }.work-navigation > button:disabled { opacity: .3; cursor: default; }.work-navigation > button:hover:not(:disabled) { background: white; }
.work-is-pinned .work-stage { height: 100svh; padding-block: 56px 32px; display: flex; align-items: center; }.work-is-pinned .work-stage > .section-container { min-width: 0; }.work-is-pinned .work-track { display: flex; gap: 32px; }.work-is-pinned .work-viewport { overflow: visible; }.work-is-pinned .work-card { flex: 0 0 min(68vw, 880px); max-width: none; }.work-is-pinned .work-card:last-child { max-width: none; }.work-is-pinned .project-art { aspect-ratio: auto; height: clamp(260px, 39svh, 480px); }.work-is-pinned .section-heading h2 { font-size: clamp(32px, 3vw, 48px); margin-top: 16px; }.work-is-pinned .section-heading { margin-bottom: 24px; }.work-is-pinned .work-controls { display: flex; }.work-is-pinned .work-list-hint { display: none; }.work-is-pinned .work-card-info { margin-top: 16px; }.work-is-pinned .project-tags { margin-top: 8px; }
.project-dialog { position: fixed; inset: 0; margin: auto; width: min(920px, calc(100% - 48px)); max-height: calc(100svh - 48px); padding: 0; border: 1px solid #fff; border-radius: 24px; background: var(--background); color: var(--foreground); overscroll-behavior: contain; box-shadow: 0 24px 100px #77708330; }.project-dialog::backdrop { background: #faf9f6d9; backdrop-filter: blur(12px); }.dialog-content { position: relative; }.dialog-close { position: sticky; top: 16px; float: right; z-index: 5; margin: 16px 16px -64px 0; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; border: 1px solid #ddd7e2; background: #ffffffed; font-size: 28px; font-weight: 300; line-height: 1; }.dialog-content > .project-art { aspect-ratio: 1.85; }.dialog-copy { padding: 40px; }.dialog-copy h2 { font-family: var(--font-heading), sans-serif; font-size: clamp(28px, 3vw, 44px); line-height: 1.2; font-weight: 500; letter-spacing: -.04em; max-width: 620px; margin-top: 16px; }.dialog-metrics { display: grid; grid-template-columns: 1fr 1fr; margin-block: 32px; padding-block: 24px; border-block: 1px solid var(--border); gap: 24px; }.dialog-metrics strong { font-family: var(--font-heading), sans-serif; display: block; color: var(--indigo); font-size: 40px; letter-spacing: -2px; font-weight: 500; }.dialog-metrics span { display: block; font-size: 12px; color: var(--muted); margin-top: 4px; }.dialog-story { display: grid; gap: 24px; margin-bottom: 32px; }.dialog-story > div { display: grid; grid-template-columns: 160px 1fr; gap: 24px; }.dialog-story h3 { font-size: 13px; font-weight: 500; line-height: 1.9; }.dialog-story p { font-size: 13px; color: var(--muted); line-height: 1.9; }.dialog-disclosure { margin-top: 24px; font-size: 10px; color: var(--muted); }
@media (max-width: 1100px) { .service-slot { grid-column: span 6; }.service-slot-0, .service-slot-1 { grid-column: span 6; }.service-card { min-height: 312px; }.comparison-section { width: calc(100% - 64px); }.comparison-table tbody th, .comparison-table td { padding: 20px 16px; }.industry-card { padding: 24px; }.industry-card h3 { font-size: 20px; }.work-card-info { gap: 16px; }.project-metric { padding-left: 16px; max-width: 128px; }.project-metric strong { font-size: 30px; }.work-card h3 { font-size: 18px; }.project-metric > span { font-size: 8px; } }
@media (max-width: 767px) {
  .batch-section { padding-block: 56px; }.section-heading { flex-direction: column; align-items: flex-start; gap: 24px; margin-bottom: 32px; }.section-heading h2, .centered-heading h2 { font-size: clamp(30px, 7.6vw, 42px); letter-spacing: -.045em; margin-top: 16px; }.section-intro { font-size: 13px; max-width: 400px; }.services-grid { gap: 16px; }.service-slot, .service-slot-0, .service-slot-1 { grid-column: 1 / -1; }.service-card { padding: 24px; min-height: 288px; }.service-slot-0 .service-card, .service-slot-1 .service-card { padding: 24px; min-height: 440px; }.service-copy h3 { margin-top: 24px; }.service-visual { height: 156px; }.search-widget { width: 92%; }.service-tags { max-width: calc(100% - 8px); }.service-slot-0 .service-copy h3, .service-slot-1 .service-copy h3 { font-size: 25px; }.services { padding-top: 40px; }
  .centered-heading { text-align: left; margin-bottom: 32px; }.centered-heading .eyebrow { justify-content: flex-start; }.centered-heading .section-intro { margin: 16px 0 0; }.comparison-section { width: calc(100% - 40px); }.comparison-panel { padding: 8px 12px 0; border-radius: 20px; }.comparison-table th:first-child { width: 22%; padding-left: 0; }.comparison-table thead th:nth-child(2) { width: 34%; }.comparison-table thead th { padding: 16px 8px; font-size: 10px; line-height: 1.5; }.comparison-table thead th .brand { font-size: 20px; gap: 4px; }.comparison-table .brand-mark { width: 17px; height: 17px; }.comparison-table .brand-period { font-size: 6px; padding-top: 2px; }.comparison-table tbody th, .comparison-table td { padding: 16px 8px; font-size: 10px; line-height: 1.6; overflow-wrap: anywhere; }.comparison-cell { flex-direction: column; align-items: flex-start; gap: 8px; }.comparison-mark { width: 20px; height: 20px; }.comparison-footer { font-size: 7px; gap: 8px; padding: 20px 0; letter-spacing: .9px; }.comparison-note { font-size: 9px; text-align: left; }
  .industry-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }.industry-card { padding: 20px 16px; min-height: 240px; }.industry-top > svg { width: 24px; height: 24px; }.industry-card h3 { margin-top: 24px; font-size: 18px; line-height: 1.35; }.industry-card p { font-size: 11px; max-width: 100%; padding-bottom: 24px; }.industry-link { bottom: 8px; right: 8px; width: 36px; height: 36px; }.card-number { font-size: 8px; }
  .work-section { margin-top: 16px; border-radius: 24px 24px 0 0; }.work-stage { padding-block: 48px 32px; }.work-track { grid-template-columns: 1fr; gap: 40px; }.work-card:last-child:nth-child(odd) { grid-column: auto; }.work-heading { gap: 16px; }.work-disclosure { font-size: 9px; margin-top: 12px; }.project-art { aspect-ratio: 1.22; }.project-open { border-radius: 20px; }.project-open-arrow { width: 40px; height: 40px; bottom: 16px; right: 16px; }.project-open-arrow svg { width: 18px; }.art-brand { font-size: 30px; }.art-kicker { font-size: 5px; max-width: 42%; text-align: right; line-height: 1.6; }.forma-copy, .orbit-copy, .sunday-copy, .haven-copy, .folio-copy { font-size: clamp(26px, 7.2vw, 42px); }.forma-copy { top: 34%; width: 43%; }.bottle { width: 22%; height: 59%; top: 30%; }.bottle-back { right: 27%; top: 28%; }.bottle-front { right: 7%; }.bottle-body > span { font-size: 23px; }.bottle-body > strong { font-size: 12px; }.bottle-body small { font-size: 4px; }.bottle-body i { font-size: 28px; }.art-footnote { font-size: 5px; max-width: 70%; }.orbit-copy { width: 55%; top: 26%; }.workspace-window { width: 74%; height: 48%; right: -5%; }.workspace-content > strong { font-size: 11px; }.workspace-subtitle { font-size: 4px; }.window-chrome > span { font-size: 5px; }.workspace-avatar { width: 12px; height: 12px; font-size: 8px; }.workspace-task b { width: 8px; height: 8px; }.sunday-copy { width: 43%; top: 30%; }.sunday-sun { top: 20%; font-size: 230px; }.coffee-cup { width: 34%; height: 55%; right: 12%; bottom: 8%; }.coffee-body strong { font-size: 31px; }.coffee-body span { font-size: 6px; }.coffee-body i { font-size: 48px; }.coffee-stamp { font-size: 5px; width: 48%; line-height: 1.8; }.haven-copy { top: 26%; width: 65%; }.haven-house { width: 100%; height: 63%; bottom: 8%; right: -13%; }.folio-copy { width: 43%; top: 32%; }.folio-paper { width: 41%; height: 62%; right: 9%; top: 30%; }.folio-paper.paper-back { right: 13%; top: 29%; }.folio-paper-head { font-size: 12px; }.folio-paper > strong { font-size: 11px; }.folio-legend { gap: 6px; }
  .work-card-info { margin-top: 16px; gap: 12px; }.work-card h3 { font-size: 18px; line-height: 1.45; }.project-metric { max-width: 104px; padding-left: 12px; }.project-metric strong { font-size: 28px; }.project-metric > span { font-size: 8px; }.project-tags { gap: 6px; margin-top: 12px; }.project-tags > span { padding: 4px 7px; font-size: 7px; }.project-category { font-size: 7px; line-height: 1.6; }.work-list-hint { font-size: 7px; line-height: 1.8; max-width: 240px; margin: 40px auto 0; }
  .project-dialog { width: calc(100% - 24px); max-height: calc(100svh - 24px); border-radius: 20px; }.dialog-content > .project-art { aspect-ratio: 1.2; }.dialog-copy { padding: 24px; }.dialog-close { width: 40px; height: 40px; margin-right: 12px; top: 12px; }.dialog-copy h2 { font-size: 28px; }.dialog-metrics { gap: 16px; margin-block: 24px; }.dialog-metrics strong { font-size: 32px; }.dialog-metrics span { font-size: 10px; line-height: 1.6; }.dialog-story > div { grid-template-columns: 1fr; gap: 8px; }.dialog-story p { font-size: 12px; }.dialog-disclosure { font-size: 9px; line-height: 1.7; }
}
@media (prefers-reduced-motion: reduce) { .interactive-card { transform: none !important; }.card-reflection { display: none; } [data-draw] { stroke-dashoffset: 0 !important; }.project-art-inner { transform: none !important; } }
```

### lib/config.ts

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
    { label: "Services", href: "#services" },
    { label: "Selected work", href: "#work" },
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
  servicesSection: {
    eyebrow: "02 / BUILT AROUND YOUR NEXT",
    heading: ["Big-picture thinkers.", "Detail-obsessed doers."],
    description: "Six connected disciplines. One team that sees the whole picture. We find the right mix to move your brand forward.",
    action: "Talk about",
    items: [
      { name: "SEO", slug: "seo", icon: "search", tagline: "Be the answer they find.", description: "Turn searches into discovery, and discovery into demand. Get found by the people already looking for you.", tags: ["Technical SEO", "Organic growth", "Local search"], visual: { label: "YOUR NEXT CUSTOMER IS SEARCHING", headline: "Found. Chosen. Remembered.", detail: "Visibility that compounds." } },
      { name: "Performance Ads", slug: "ads", icon: "target", tagline: "Make every click count.", description: "The right message, in the right moment. Campaigns built to turn attention into measurable action.", tags: ["Paid search", "Paid social", "Conversion"], visual: { label: "LESS GUESSWORK. MORE GROWTH.", headline: "Every move, measured.", detail: "Creative intuition. Clear signals." } },
      { name: "Social Media", slug: "social", icon: "social", tagline: "Start a conversation.", description: "Build a community that cares, shares, and comes back for more.", tags: ["Community", "Social strategy"] },
      { name: "Branding", slug: "branding", icon: "spark", tagline: "Unmistakably you.", description: "Find your voice. Define your world. Give people something to believe in.", tags: ["Identity", "Positioning"] },
      { name: "Web Development", slug: "web", icon: "code", tagline: "Built to make an impact.", description: "Beautiful, fast digital experiences that feel effortless and work harder.", tags: ["Websites", "E-commerce"] },
      { name: "Content Strategy", slug: "content", icon: "document", tagline: "Say something that sticks.", description: "Useful stories, sharp ideas, and a clear reason to choose your brand.", tags: ["Storytelling", "Editorial"] },
    ],
  },
  comparison: {
    eyebrow: "03 / A DIFFERENT KIND OF PARTNER",
    heading: ["The same old agency?", "Not our thing."],
    description: "You deserve more than a monthly report and a catch-up call. Here’s the partnership we’re building.",
    typical: "The typical approach",
    nexora: "The Nexora approach",
    featureLabel: "What matters",
    badge: "ON YOUR SIDE. ALL THE WAY.",
    note: "Our commitments, compared with common agency frustrations. Every partnership is different.",
    rows: [
      { label: "Strategy", typical: "A familiar playbook", nexora: "A plan shaped around your business" },
      { label: "Your team", typical: "Specialists working in silos", nexora: "One connected team, shared goals" },
      { label: "Success", typical: "Impressions and activity", nexora: "Outcomes that matter to you" },
      { label: "Communication", typical: "Waiting for the monthly report", nexora: "Open conversations, clear next steps" },
      { label: "The relationship", typical: "Another name on the client list", nexora: "Your ambition becomes our ambition" },
    ],
  },
  industries: {
    eyebrow: "04 / AMBITION HAS NO INDUSTRY",
    heading: ["Different worlds.", "The same drive to grow."],
    description: "We get curious about your world, then help you change it. Deep understanding comes before big ideas.",
    action: "Explore a partnership in",
    items: [
      { name: "E-commerce", icon: "bag", description: "From first click to forever customer.", number: "01" },
      { name: "SaaS & Technology", icon: "code", description: "Make complex feel indispensable.", number: "02" },
      { name: "Health & Wellness", icon: "heart", description: "Build trust. Make a positive impact.", number: "03" },
      { name: "Real Estate", icon: "building", description: "Turn places into possibilities.", number: "04" },
      { name: "Food & Hospitality", icon: "cup", description: "Create a craving. Inspire a visit.", number: "05" },
      { name: "Finance & Professional", icon: "chart", description: "Earn confidence at every touchpoint.", number: "06" },
    ],
  },
  work: {
    eyebrow: "05 / POSSIBILITIES, PUT INTO PRACTICE",
    heading: ["Good work.", "Even better outcomes."],
    description: "A few ways strategy and creativity can move a business forward.",
    disclosure: "Concept projects · All outcomes are illustrative",
    view: "Explore the concept",
    previous: "Previous project",
    next: "Next project",
    scrollHint: "SCROLL TO EXPLORE",
    listHint: "FIVE DIFFERENT CHALLENGES. ONE SHARED AMBITION.",
    close: "Close project",
    challenge: "The challenge",
    approach: "Our approach",
    outcome: "The opportunity",
    cta: "Let’s build your next chapter",
    projects: [
      { id: "forma", brand: "forma", category: "WELLNESS / E-COMMERCE", title: "A fresh perspective on everyday care.", services: ["Brand strategy", "E-commerce", "Performance ads"], theme: "forma", artTitle: "Forma botanical skincare brand and packaging concept", artEyebrow: "CARE, IN YOUR OWN FORM.", artCopy: "Daily rituals. Lasting good.", product: "daily", productDetail: "BOTANICAL FACE WASH / 200 ML", metric: "+184%", metricLabel: "illustrative online revenue", secondMetric: "4.2×", secondLabel: "illustrative return on ad spend", challenge: "Make a considered skincare brand stand out in a crowded category without losing its quiet confidence.", approach: "A warm visual identity, a clearer product story, and an e-commerce journey built around simple daily rituals. Connect the same story to a focused paid-media concept.", outcome: "An example growth scenario connecting brand recognition to conversion. Figures demonstrate the reporting format; they are not results from a live campaign." },
      { id: "orbit", brand: "orbit", category: "SAAS / TECHNOLOGY", title: "Making a complex product feel second nature.", services: ["Positioning", "Web development", "SEO"], theme: "orbit", artTitle: "Orbit project management website and workspace interface concept", artEyebrow: "LESS FRICTION. MORE FORWARD.", artCopy: "Space for your best work.", product: "Your workspace, in sync.", productDetail: "PLAN / CONNECT / CREATE", metric: "+216%", metricLabel: "illustrative qualified sign-ups", secondMetric: "−32%", secondLabel: "illustrative acquisition cost", challenge: "Give a powerful but unfamiliar workspace product a clear promise that a busy team can understand in seconds.", approach: "Lead with the outcome: a calmer, connected working day. Build a crisp product website, a focused onboarding concept, and an organic search strategy around real customer questions.", outcome: "A sample acquisition model showing how clearer positioning could improve qualified demand. All performance figures are concept assumptions." },
      { id: "sunday", brand: "sunday", category: "FOOD / HOSPITALITY", title: "A neighbourhood favourite. A bigger following.", services: ["Branding", "Social media", "Content strategy"], theme: "sunday", artTitle: "Sunday coffee shop branding concept with a takeaway coffee cup", artEyebrow: "A LITTLE SLOWER. A LITTLE BETTER.", artCopy: "Your everyday good thing.", product: "good days, brewed.", productDetail: "COFFEE / COMPANY / COMMUNITY", metric: "+128%", metricLabel: "illustrative local discovery", secondMetric: "3.6×", secondLabel: "illustrative social engagement", challenge: "Bring the warmth of an independent coffee spot to its digital presence and make it easier for new neighbours to find it.", approach: "A friendly visual language, a locally focused discovery strategy, and a content series that puts the people and rituals behind the counter front and centre.", outcome: "An illustrative local-growth scenario balancing search discovery and community interaction. These metrics are not verified business outcomes." },
      { id: "haven", brand: "haven", category: "REAL ESTATE / LIVING", title: "More than an address. A feeling of belonging.", services: ["Brand strategy", "Web development", "Paid search"], theme: "haven", artTitle: "Haven residential property website concept with architectural line art", artEyebrow: "ROOM FOR WHAT MATTERS.", artCopy: "Find your somewhere.", product: "Thoughtfully placed.", productDetail: "HOMES / NEIGHBOURHOODS / POSSIBILITIES", metric: "+162%", metricLabel: "illustrative qualified enquiries", secondMetric: "−28%", secondLabel: "illustrative cost per enquiry", challenge: "Help a residential property concept speak to the lives people want to build, while giving them the practical information they need.", approach: "Pair a human brand story with a clear property-discovery experience. Create neighbourhood-led content and a paid-search structure that connects intent to useful next steps.", outcome: "A concept lead-generation scenario demonstrating how enquiry quality and acquisition cost could be reported together. All figures are illustrative." },
      { id: "folio", brand: "folio", category: "FINANCE / PROFESSIONAL SERVICES", title: "Bringing clarity to a world of complexity.", services: ["Positioning", "Content strategy", "SEO"], theme: "folio", artTitle: "Folio financial planning brand and dashboard interface concept", artEyebrow: "A CLEARER WAY FORWARD.", artCopy: "Your future. In focus.", product: "The bigger picture.", productDetail: "CLARITY / CONFIDENCE / PROGRESS", metric: "+145%", metricLabel: "illustrative organic enquiries", secondMetric: "+64%", secondLabel: "illustrative consultation bookings", challenge: "Make a professional-services brand feel approachable and useful without sacrificing credibility or precision.", approach: "Build a straightforward message, an accessible visual system, and educational content that answers the questions people ask before starting a conversation.", outcome: "A sample reporting scenario connecting useful organic content to relevant enquiries. These are concept metrics, not financial or campaign performance claims." },
    ],
  },
  scene: [
    { selector: "#hero", x: 2.15, y: 0.1, scale: 1, rotation: 0, morph: 0.08, color: 0, opacity: 1, cameraZ: 8.2 },
    { selector: "#trusted", x: 2.5, y: 1.1, scale: 0.8, rotation: 1.5, morph: 0.13, color: 0.6, opacity: 0.45, cameraZ: 8.8 },
    { selector: "#about", x: 3.5, y: -0.3, scale: 0.85, rotation: 2.5, morph: 0.18, color: 1, opacity: 0.16, cameraZ: 9.2 },
    { selector: "#services", x: -3.5, y: 0.5, scale: 0.65, rotation: 3.4, morph: 0.1, color: 0.3, opacity: 0.08, cameraZ: 9.2 },
    { selector: "#why-us", x: 3.5, y: -0.4, scale: 0.8, rotation: 4.2, morph: 0.15, color: 0.8, opacity: 0.06, cameraZ: 9.6 },
    { selector: "#industries", x: -3, y: 0, scale: 0.7, rotation: 5, morph: 0.12, color: 0.4, opacity: 0.1, cameraZ: 9.2 },
    { selector: "#work", x: 3, y: 0.4, scale: 0.6, rotation: 6, morph: 0.08, color: 0.2, opacity: 0.04, cameraZ: 9.6 },
  ],
} as const;
```

### components/ui/Card.tsx

```tsx
"use client";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import clsx from "clsx";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Card({ children, className, tilt = true }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => { const nodes = [ref.current, light.current]; return () => { gsap.killTweensOf(nodes); }; }, []);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || mobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (tilt) gsap.to(ref.current, { rotationX: -(y / rect.height - 0.5) * 5, rotationY: (x / rect.width - 0.5) * 5, transformPerspective: 900, duration: motion.fast, overwrite: "auto" });
    gsap.to(light.current, { x, y, opacity: 0.75, duration: motion.fast, overwrite: "auto" });
  }
  function reset() {
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: motion.normal, ease: motion.ease, overwrite: "auto" });
    gsap.to(light.current, { opacity: 0, duration: motion.normal, overwrite: "auto" });
  }
  return <div ref={ref} className={clsx("interactive-card", className)} onPointerMove={move} onPointerLeave={reset}><span ref={light} className="card-reflection" aria-hidden="true"/>{children}</div>;
}
```

### components/ui/Icon.tsx

```tsx
import type { SVGProps } from "react";
const paths = {
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  target: "M22 12a10 10 0 1 1-10-10M17 12a5 5 0 1 1-5-5M12 12 22 2m-5 0h5v5",
  social: "M21 11a9 9 0 0 1-9 9H4l-3 3V11a10 10 0 0 1 20 0ZM6 10h10M6 14h6",
  spark: "m12 2 2.6 6.8L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-3.2L12 2Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
  document: "M5 2h10l5 5v15H5V2Zm9 0v6h6M9 12h7m-7 4h7",
  bag: "M4 7h16l1 15H3L4 7Zm4 1V6a4 4 0 0 1 8 0v2",
  heart: "M12 21 3 12C-3 4 7-2 12 6c5-8 15-2 9 6l-9 9Z",
  building: "M3 22V8l9-6 9 6v14H3Zm5 0v-8h8v8M8 9h1m6 0h1",
  cup: "M3 8h14v6a7 7 0 0 1-14 0V8Zm14 1h2a3 3 0 0 1 0 6h-2M6 2v2m5-2v2M2 22h18",
  chart: "M3 2v20h19M7 16l5-6 4 2 6-8M7 19h1m4 0h1m4 0h1",
} as const;
export type IconName = keyof typeof paths;
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]}/></svg>;
}
```

### components/ui/Section.tsx

```tsx
"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Section({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.from(element, { y: 32, opacity: 0, duration: motion.slow, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach(path => {
        gsap.from(path, { strokeDashoffset: 1, duration: motion.normal, ease: motion.ease, scrollTrigger: { trigger: path, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <section ref={ref} id={id} className={className} aria-labelledby={`${id}-heading`}>{children}</section>;
}
```

### components/ui/ProjectArtwork.tsx

```tsx
import type { config } from "@/lib/config";
export type Project = (typeof config.work.projects)[number];
export function ProjectArtwork({ project }: { project: Project }) {
  return <div className={`project-art art-${project.theme}`} role="img" aria-label={project.artTitle}><div className="project-art-inner" aria-hidden="true"><div className="art-brand">{project.brand}<span>®</span></div><span className="art-kicker">{project.artEyebrow}</span>
    {project.theme === "forma" && <><div className="forma-circle"/><div className="forma-copy">{project.artCopy}</div><div className="bottle bottle-back"><div className="bottle-cap"/><div className="bottle-body"><span>{project.brand}</span><strong>{project.product}</strong><small>{project.productDetail}</small><i>✳</i></div></div><div className="bottle bottle-front"><div className="bottle-cap"/><div className="bottle-body"><span>{project.brand}</span><strong>{project.product}</strong><small>{project.productDetail}</small><i>✳</i></div></div><div className="art-footnote">{project.productDetail}</div></>}
    {project.theme === "orbit" && <><div className="orbit-art-circle"/><div className="orbit-copy">{project.artCopy}</div><div className="workspace-window"><div className="window-chrome"><i/><i/><i/><span>{project.brand}.workspace</span></div><div className="workspace-body"><div className="workspace-sidebar"><span className="workspace-avatar">o</span>{[0, 1, 2, 3].map(n => <i key={n}/>)}</div><div className="workspace-content"><strong>{project.product}</strong><span className="workspace-subtitle">{project.productDetail}</span><div className="workspace-columns">{[0, 1, 2].map(n => <div key={n}><span className="workspace-column-title"/>{[0, 1].map(j => <div className="workspace-task" key={j}><i/><span/><span/><b/></div>)}</div>)}</div></div></div></div></>}
    {project.theme === "sunday" && <><div className="sunday-sun">✳</div><div className="sunday-copy">{project.artCopy}</div><div className="coffee-cup"><div className="coffee-lid"/><div className="coffee-body"><strong>{project.brand}</strong><span>{project.product}</span><i>☺</i></div></div><div className="coffee-stamp">{project.productDetail}</div></>}
    {project.theme === "haven" && <><div className="haven-copy">{project.artCopy}</div><div className="haven-sun"/><svg className="haven-house" viewBox="0 0 600 340" fill="none"><path d="M65 300V122l162-77 159 65v190H65Z" fill="#ddd9c8"/><path d="m227 45 159 65v190H227V45Z" fill="#cdcbb8"/><path d="M287 300V149l168-45 103 57v139H287Z" fill="#ebe8da"/><path d="m455 104 103 57v139H455V104Z" fill="#d8d7c6"/><path d="M101 159h83v141h-83zM320 184h93v116h-93z" fill="#9ca398"/><path d="M119 159v141m47-141v141m172-116v116m55-116v116" stroke="#f5f2e8" strokeWidth="3"/><path d="m250 118 22 9v58l-22-5v-62Zm224 53 43 22v56l-43-14v-64Z" fill="#9ca398"/><path d="M40 301h550" stroke="#748273" strokeWidth="3"/><path d="M33 300v-80m0 27c-37-19-31-52-10-55 32-5 46 26 10 55Zm543 53v-46m0 14c-27-6-25-43-7-44s34 28 7 44Z" stroke="#7d8d77" strokeWidth="3"/></svg><div className="art-footnote">{project.productDetail}</div></>}
    {project.theme === "folio" && <><div className="folio-copy">{project.artCopy}</div><div className="folio-paper paper-back"/><div className="folio-paper"><div className="folio-paper-head"><span>{project.brand} /</span><span>↗</span></div><strong>{project.product}</strong><div className="folio-chart"><div className="folio-donut"/><div className="folio-legend"><i/><i/><i/></div></div><div className="folio-bars">{[35, 42, 52, 50, 66, 75, 92].map((h, i) => <span key={i} style={{ height: `${h}%` }}/>)}</div></div><div className="art-footnote">{project.productDetail}</div></>}
  </div></div>;
}
```

### components/ui/ProjectDialog.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { ProjectArtwork, type Project } from "./ProjectArtwork";
import { Button } from "./Button";
export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [project]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-heading" onClose={onClose} data-lenis-prevent onClick={event => { if (event.target === ref.current) ref.current.close(); }}>
    {project && <div className="dialog-content"><button className="dialog-close" onClick={() => ref.current?.close()} aria-label={config.work.close} autoFocus><span aria-hidden="true">×</span></button><ProjectArtwork project={project}/><div className="dialog-copy"><p className="eyebrow">{project.category}</p><h2 id="project-dialog-heading">{project.title}</h2><div className="project-tags">{project.services.map(service => <span key={service}>{service}</span>)}</div><div className="dialog-metrics"><div><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><div><strong>{project.secondMetric}</strong><span>{project.secondLabel}</span></div></div><div className="dialog-story">{([{ label: config.work.challenge, text: project.challenge }, { label: config.work.approach, text: project.approach }, { label: config.work.outcome, text: project.outcome }]).map(item => <div key={item.label}><h3>{item.label}</h3><p>{item.text}</p></div>)}</div><Button href={`mailto:${config.email}?subject=${encodeURIComponent(`A project inspired by ${project.brand}`)}`}>{config.work.cta}</Button><p className="dialog-disclosure">{config.work.disclosure}</p></div></div>}
  </dialog>;
}
```

### components/sections/Services.tsx

```tsx
import { config } from "@/lib/config";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
export function Services() {
  const data = config.servicesSection;
  return <Section id="services" className="services section-container batch-section">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="services-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div>
    <div className="services-grid">{data.items.map((service, index) => <div key={service.slug} className={`service-slot service-slot-${index}`} data-reveal><Card className={`service-card service-${service.slug}`}>
      <div className="service-top"><span className="service-icon"><Icon name={service.icon}/></span><span className="card-number">0{index + 1}</span></div>
      {"visual" in service && <div className={`service-visual visual-${service.slug}`} aria-hidden="true">{service.slug === "seo" ? <><div className="search-orbit"/><div className="search-widget"><span className="search-widget-bar"><Icon name="search"/><span>{service.visual.headline}</span><span className="search-enter">↵</span></span><div className="search-result"><span className="result-favicon">n</span><div><span className="result-line"/><span className="result-line short"/></div><span className="result-check">✓</span></div><div className="search-result faded"><span className="result-favicon"/><div><span className="result-line"/><span className="result-line short"/></div></div></div><span className="visual-caption">{service.visual.detail}</span></> : <><div className="growth-bars">{[28, 40, 35, 58, 51, 75, 88].map((height, i) => <span key={i} style={{ height: `${height}%` }}/>)}</div><svg className="growth-curve" viewBox="0 0 300 100" fill="none"><path d="M5 90C55 90 45 57 90 66S155 34 180 38 237 6 294 7" stroke="currentColor" strokeWidth="2" pathLength="1" strokeDasharray="1" data-draw/><path d="m286 1 9 6-7 8" stroke="currentColor" strokeWidth="2"/></svg><span className="visual-caption">{service.visual.detail}</span></>}</div>}
      <div className="service-copy"><h3>{service.name}</h3><p className="service-tagline">{service.tagline}</p><p className="service-description">{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <a className="card-action" href={`mailto:${config.email}?subject=${encodeURIComponent(`${data.action} ${service.name}`)}`} aria-label={`${data.action} ${service.name}`}><Arrow diagonal/></a>
    </Card></div>)}</div>
  </Section>;
}
```

### components/sections/WhyChooseUs.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Brand } from "@/components/ui/Brand";
function Mark({ positive }: { positive: boolean }) {
  return <span className={`comparison-mark ${positive ? "positive" : "negative"}`}><svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={positive ? "m4 10 4 4 8-8" : "m6 6 8 8m0-8-8 8"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" data-draw/></svg></span>;
}
export function WhyChooseUs() {
  const data = config.comparison;
  return <Section id="why-us" className="comparison-section section-container batch-section">
    <div className="centered-heading" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="why-us-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="section-intro">{data.description}</p></div>
    <div className="comparison-panel" data-reveal><table className="comparison-table"><caption className="sr-only">{data.nexora} compared with {data.typical.toLowerCase()}</caption><thead><tr><th scope="col">{data.featureLabel}</th><th scope="col">{data.typical}</th><th scope="col"><Brand/><span className="sr-only">{data.nexora}</span></th></tr></thead><tbody>{data.rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td><span className="comparison-cell"><Mark positive={false}/><span>{row.typical}</span></span></td><td><span className="comparison-cell"><Mark positive/><span>{row.nexora}</span></span></td></tr>)}</tbody></table><div className="comparison-footer"><span className="status-dot"/>{data.badge}<span aria-hidden="true">↗</span></div></div><p className="comparison-note">{data.note}</p>
  </Section>;
}
```

### components/sections/Industries.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
export function Industries() {
  const data = config.industries;
  return <Section id="industries" className="industries section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="industries-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="industry-grid">{data.items.map(item => <div key={item.name} data-reveal><Card className="industry-card" tilt={false}><div className="industry-top"><Icon name={item.icon}/><span className="card-number">{item.number}</span></div><h3>{item.name}</h3><p>{item.description}</p><a className="industry-link" href={`mailto:${config.email}?subject=${encodeURIComponent(`${data.action} ${item.name}`)}`} aria-label={`${data.action} ${item.name}`}><Arrow diagonal/></a></Card></div>)}</div></Section>;
}
```

### components/sections/SelectedWork.tsx

```tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Arrow } from "@/components/ui/Button";
import { ProjectArtwork, type Project } from "@/components/ui/ProjectArtwork";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const currentIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const data = config.work;
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (reduced) return;
    const section = root.current;
    const strip = track.current;
    const pin = stage.current;
    if (!section || !strip || !pin) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 720px) and (pointer: fine)", () => {
      section.classList.add("work-is-pinned");
      const distance = () => Math.max(0, strip.scrollWidth - strip.clientWidth);
      const horizontal = gsap.to(strip, { x: () => -distance(), ease: "none", scrollTrigger: {
        trigger: pin, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.64, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => {
          const index = Math.round(self.progress * (data.projects.length - 1));
          if (index !== currentIndex.current) { currentIndex.current = index; setActive(index); }
          gsap.set(progress.current, { scaleX: self.progress });
        },
      } });
      trigger.current = horizontal.scrollTrigger ?? null;
      gsap.utils.toArray<HTMLElement>(".work-card", section).forEach(card => {
        gsap.fromTo(card.querySelector(".project-art-inner"), { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left right", end: "right left", scrub: true } });
      });
      return () => { trigger.current = null; section.classList.remove("work-is-pinned"); };
    }, root);
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    return () => { cancelled = true; media.revert(); };
  }, [reduced, data.projects.length]);
  function moveTo(index: number) {
    const scroll = trigger.current;
    if (scroll) {
      // Use the page's native scroll position; the shared Lenis instance synchronizes it.
      window.scrollTo({ top: scroll.start + (scroll.end - scroll.start) * index / (data.projects.length - 1), behavior: "instant" });
    }
  }
  function focusCard(index: number) {
    if (trigger.current && currentIndex.current !== index) moveTo(index);
  }
  return <section id="work" ref={root} className="work-section" aria-labelledby="work-heading"><div ref={stage} className="work-stage"><div className="section-container"><div className="section-heading work-heading"><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="work-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><div className="work-heading-aside"><p className="section-intro">{data.description}</p><p className="work-disclosure">{data.disclosure}</p></div></div><div className="work-viewport"><div ref={track} className="work-track">{data.projects.map((project, index) => <article key={project.id} className="work-card"><button className="project-open" aria-label={`${data.view}: ${project.brand}`} data-cursor="View" onClick={() => setSelected(project)} onFocus={() => focusCard(index)}><ProjectArtwork project={project}/><span className="project-open-arrow"><Arrow diagonal/></span></button><div className="work-card-info"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3><div className="project-tags">{project.services.map(service => <span key={service}>{service}</span>)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div></article>)}</div></div><div className="work-controls"><span className="work-scroll-hint">{data.scrollHint} <span aria-hidden="true">↘</span></span><div className="work-progress" aria-hidden="true"><span ref={progress}/></div><div className="work-navigation"><span className="work-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span>/ {String(data.projects.length).padStart(2, "0")}</span></span><button aria-label={data.previous} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))}><Arrow/></button><button aria-label={data.next} disabled={active === data.projects.length - 1} onClick={() => moveTo(Math.min(data.projects.length - 1, active + 1))}><Arrow/></button></div></div><p className="work-list-hint">{data.listHint}</p></div></div><ProjectDialog project={selected} onClose={close}/></section>;
}
```

## Validation

- Production build, TypeScript, and ESLint passed.
- Desktop pinning and next-project navigation verified.
- Native project dialogs verified, including Escape dismissal and focus restoration.
- 360px and 1920px layouts checked without page-level horizontal overflow.
- Five project cards, six service cards, six industry tiles, and one canvas verified.
- No browser console errors observed.
- Lighthouse performance score has not been measured.

## Next batch

9. Results / Stats
10. Growth Dashboard Preview
11. Tools and Platforms
12. Process

Continue only after “next”.
