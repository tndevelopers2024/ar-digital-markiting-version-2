# Nexora — Batch 3

Sections 9–12 are implemented. No additional dependencies are required.

## Files

```text
app/page.tsx
app/globals.css
lib/config.ts
hooks/useLenis.ts
components/ui/Counter.tsx
components/ui/Section.tsx
components/ui/Experience.tsx
components/sections/SelectedWork.tsx
components/sections/Results.tsx
components/sections/GrowthDashboard.tsx
components/sections/ToolsPlatforms.tsx
components/sections/Process.tsx
```

## Complete source

Complete new and updated files follow. Earlier batch components remain in use.

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
import { Results } from "@/components/sections/Results";
import { GrowthDashboard } from "@/components/sections/GrowthDashboard";
import { ToolsPlatforms } from "@/components/sections/ToolsPlatforms";
import { Process } from "@/components/sections/Process";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, email: config.email, description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><TrustedBy/><About/><Services/><WhyChooseUs/><Industries/><SelectedWork/><Results/><GrowthDashboard/><ToolsPlatforms/><Process/></main></>;
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

/* Batch 3: proof, reporting, connected tools, and the working process. */
.section-disclosure { color: var(--muted); font-size: 10px; line-height: 1.8; margin-top: 24px; }
.counter { font-variant-numeric: tabular-nums; }
.results { padding-top: 112px; }
.results-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block: 1px solid var(--border); }
.result-stat { padding: 32px; border-right: 1px solid var(--border); }.result-stat:first-child { padding-left: 0; }.result-stat:last-child { border-right: 0; padding-right: 0; }
.result-stat-top { display: flex; align-items: center; justify-content: space-between; }.result-stat-top > svg { color: var(--indigo); width: 24px; height: 24px; }
.result-stat > .counter { display: block; font-family: var(--font-heading), sans-serif; font-size: clamp(44px, 5.5vw, 80px); letter-spacing: -.06em; line-height: 1.1; margin-top: 48px; font-weight: 500; }
.result-stat:first-child > .counter { color: var(--indigo); }.result-stat h3 { font-size: 13px; font-weight: 500; margin-top: 16px; }.result-stat > p { font-size: 11px; line-height: 1.8; color: var(--muted); margin-top: 8px; max-width: 192px; }
.dashboard-section { padding-top: 48px; }
.growth-dashboard { background: #ffffffed; border: 1px solid white; border-radius: 24px; box-shadow: 0 4px 12px #64578c05, 0 32px 80px #64578c0b; overflow: hidden; }
.dashboard-topbar { display: flex; align-items: center; gap: 32px; border-bottom: 1px solid var(--border); padding: 24px 32px; }.dashboard-topbar .brand { font-size: 22px; letter-spacing: -1px; }.dashboard-topbar .brand-mark { width: 22px; height: 22px; }.dashboard-workspace { font-size: 11px; color: var(--muted); padding-left: 24px; border-left: 1px solid var(--border); }.demo-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 99px; background: #f6f3ff; color: #65569c; font-size: 8px; letter-spacing: 1px; margin-left: auto; }
.dashboard-body { padding: 32px; }.dashboard-title-row { display: flex; justify-content: space-between; align-items: center; gap: 24px; }.dashboard-title-row h3 { font-family: var(--font-heading), sans-serif; font-size: 24px; letter-spacing: -.8px; font-weight: 550; }.dashboard-title-row p { color: var(--muted); font-size: 11px; margin-top: 8px; }
.period-toggle { display: flex; border: 1px solid var(--border); border-radius: 99px; padding: 4px; gap: 4px; background: #f8f7fa; }.period-toggle button { padding: 8px 16px; border: 0; border-radius: 99px; color: var(--muted); background: transparent; font-size: 11px; min-height: 36px; transition: background var(--duration-fast), color var(--duration-fast); }.period-toggle button[aria-pressed="true"] { color: #5342bd; background: #fff; box-shadow: 0 2px 8px #655ca011; }
.dashboard-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 32px; }.dashboard-metric { padding: 24px; border: 1px solid var(--border); border-radius: 16px; background: #fdfcfe; min-width: 0; }.dashboard-metric > span:first-child { display: block; font-size: 11px; color: var(--muted); }.dashboard-metric > .counter { display: block; font-family: var(--font-heading), sans-serif; font-size: clamp(24px, 2.7vw, 40px); letter-spacing: -.055em; margin-top: 12px; line-height: 1.2; }.featured-metric { background: #f5f2ff; border-color: #e7e0fb; }.featured-metric > .counter { color: #5442c4; }.metric-change, .metric-context { display: block; font-size: 9px; color: var(--muted); margin-top: 12px; line-height: 1.7; }.metric-change { color: #447254; }.metric-change > span { color: var(--muted); margin-left: 4px; }
.dashboard-lower { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 32px; margin-top: 32px; }.traffic-panel { min-width: 0; }.chart-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }.dashboard-lower h4 { font-size: 13px; font-weight: 550; }.chart-legend { display: flex; gap: 16px; font-size: 8px; color: var(--muted); }.chart-legend > span { display: flex; align-items: center; gap: 6px; }.chart-legend i { display: inline-block; width: 12px; height: 2px; background: var(--indigo); }.chart-legend > span:last-child i { height: 0; border-top: 2px dashed #aaa4ba; background: none; }.traffic-chart { display: block; width: 100%; height: auto; margin-top: 24px; overflow: visible; }.traffic-chart text { font-family: var(--font-body), sans-serif; font-size: 11px; fill: var(--muted); }.chart-data { margin-top: 16px; font-size: 10px; color: var(--muted); }.chart-data summary { cursor: pointer; padding-block: 8px; width: fit-content; }.chart-data table { margin-top: 16px; width: 100%; border-collapse: collapse; font-size: 11px; }.chart-data th, .chart-data td { padding: 12px 8px; border-bottom: 1px solid var(--border); text-align: right; font-weight: 400; }.chart-data th:first-child { text-align: left; }.chart-data thead { color: #403651; }
.channel-panel { padding-left: 24px; border-left: 1px solid var(--border); }.channel-panel > p { font-size: 10px; color: var(--muted); margin-top: 8px; }.channel-list { display: grid; gap: 20px; margin-top: 24px; }.channel > div:first-child { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 10px; }.channel strong { font-weight: 500; color: var(--muted); }.channel-track { height: 5px; background: #f1eef6; border-radius: 8px; overflow: hidden; margin-top: 8px; }.channel-track > span { display: block; width: 100%; height: 100%; background: #8c7be4; border-radius: 8px; transform-origin: left; transition: transform var(--duration-normal) var(--ease); }.channel-1 .channel-track > span { background: #c6b8ec; }.channel-2 .channel-track > span { background: #f0b8a2; }.channel-3 .channel-track > span { background: #d2c8c0; }
.dashboard-insight { display: flex; gap: 12px; padding: 16px; margin-top: 24px; background: #fcf5ee; border-radius: 12px; }.dashboard-insight > svg { color: #936652; flex-shrink: 0; width: 18px; height: 18px; }.dashboard-insight span { font-size: 7px; letter-spacing: .8px; color: #815c4c; display: block; margin-top: 4px; }.dashboard-insight p { color: #77665e; font-size: 9px; line-height: 1.8; margin-top: 8px; }.dashboard-footer { display: flex; align-items: center; gap: 8px; border-top: 1px solid var(--border); padding: 16px 32px; font-size: 9px; color: var(--muted); }
.platforms { padding-top: 48px; }.platform-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 16px; padding: 0; margin: 0; list-style: none; }.platform-card { display: flex; align-items: center; gap: 16px; height: 104px; padding: 24px; border: 1px solid var(--border); border-radius: 20px; background: #ffffffb5; animation: platform-float var(--float-duration, 6s) var(--float-delay, 0s) ease-in-out infinite; }.platform-grid[data-paused] .platform-card, .platform-grid:hover .platform-card, .platform-grid:focus-within .platform-card { animation-play-state: paused; }.platform-mark { display: grid; place-items: center; width: 40px; height: 40px; flex-shrink: 0; border-radius: 12px; background: #eff0fc; color: #565bd3; font-family: var(--font-heading), sans-serif; font-size: 24px; font-weight: 650; letter-spacing: -1px; }.tone-peach { background: #fff0e8; color: #b7673c; }.tone-sage { background: #edf3e7; color: #607b44; }.tone-slate { background: #edf2f4; color: #506c7a; }.tone-lavender { background: #f1edff; color: #7862ba; }.tone-sand { background: #f6f0db; color: #8a7839; }.platform-card h3 { font-size: 13px; font-weight: 550; }.platform-card p { margin-top: 6px; font-size: 10px; color: var(--muted); }.platform-footer { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; }.float-toggle { display: flex; align-items: center; gap: 12px; border: 0; padding: 12px 0; margin-top: 16px; background: transparent; color: var(--muted); font-size: 10px; white-space: nowrap; }.float-toggle > span { font-size: 16px; color: var(--indigo); }
@keyframes platform-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.process-section { position: relative; background: #f2f0f7; border-radius: 40px 40px 0 0; border-top: 1px solid white; margin-top: 32px; }.process-stage { padding-block: 80px 48px; }.process-nav { position: relative; margin-bottom: 32px; }.process-nav ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); list-style: none; padding: 0; margin: 0; gap: 24px; }.process-nav button { display: flex; align-items: center; gap: 12px; text-align: left; background: transparent; border: 0; padding: 16px 0; width: 100%; font-size: 12px; color: var(--muted); }.step-dot { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid #dfdae9; border-radius: 50%; background: #f2f0f7; color: var(--muted); font-size: 11px; flex-shrink: 0; }.process-nav button[aria-current="step"] { color: #5341b4; }.process-nav button[aria-current="step"] .step-dot { background: var(--indigo); border-color: var(--indigo); color: white; }.step-nav-arrow { margin-left: auto; color: #9687ba; }.process-connector { position: absolute; left: 0; bottom: -4px; width: 100%; height: 2px; }
.process-panels { display: grid; gap: 24px; }.process-step { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; padding: 40px; border-radius: 24px; background: #ffffffdc; border: 1px solid white; scroll-margin-top: 120px; }.process-step-copy h3 { font-family: var(--font-heading), sans-serif; font-size: clamp(28px, 3vw, 44px); letter-spacing: -.045em; font-weight: 500; line-height: 1.2; margin-top: 16px; }.process-step-description { color: var(--muted); font-size: 13px; line-height: 1.9; max-width: 470px; margin-top: 16px; }.process-step-copy > ul { list-style: none; padding: 0; margin: 24px 0; display: grid; gap: 12px; }.process-step-copy li { font-size: 11px; display: flex; gap: 12px; align-items: center; }.process-step-copy li > span { color: var(--indigo); }.process-deliverable { padding-top: 20px; border-top: 1px solid var(--border); max-width: 470px; }.process-deliverable > span { font-size: 8px; color: #70608d; letter-spacing: 1px; }.process-deliverable p { font-size: 11px; line-height: 1.8; color: var(--muted); margin-top: 8px; }
.process-illustration { position: relative; min-height: 352px; border: 1px solid #eee8f5; border-radius: 20px; background: radial-gradient(ellipse at 70% 35%, #ece5ff, transparent 65%), #f9f7fc; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; }.process-art-index { position: absolute; left: 24px; top: 24px; font-size: 8px; letter-spacing: 1px; color: var(--muted); }.process-art-core { position: absolute; top: 48px; left: 0; width: 100%; height: 230px; }.process-art-ring { position: absolute; border: 1px solid #dad0ee; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(-25deg); }.ring-outer { width: 80%; height: 80%; }.ring-inner { width: 59%; height: 97%; transform: translate(-50%, -50%) rotate(40deg); border-style: dashed; }.process-art-symbol { display: grid; place-items: center; position: absolute; width: 88px; height: 88px; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(-8deg); border-radius: 24px; border: 1px solid white; background: linear-gradient(135deg, #faf8ff, #e7ddfc); color: #8a71cc; box-shadow: 0 16px 24px #8263bb13; }.process-art-symbol > svg { width: 42px; height: 42px; stroke-width: 1; }.process-art-chip { display: flex; align-items: center; gap: 12px; position: absolute; background: #ffffffe0; border: 1px solid white; border-radius: 12px; padding: 12px 16px; font-size: 10px; color: #655576; box-shadow: 0 8px 24px #8b6db20b; z-index: 2; }.process-art-chip > span:first-child { font-size: 7px; color: #8e829e; }.process-art-chip > span:last-child { color: #9b86c7; }.art-chip-0 { left: 6%; top: 2%; transform: rotate(-6deg); }.art-chip-1 { right: 4%; top: 39%; transform: rotate(5deg); }.art-chip-2 { left: 12%; bottom: 0; transform: rotate(-4deg); }.process-illustration > strong { position: relative; font-family: var(--font-heading), sans-serif; font-size: 19px; font-weight: 500; letter-spacing: -.5px; margin-top: 240px; }.process-art-caption { margin-top: 8px; color: var(--muted); font-size: 9px; }.process-step-1 .process-art-symbol { transform: translate(-50%, -50%) rotate(12deg); background: linear-gradient(130deg, white, #f4dfce); color: #c19276; }.process-step-2 .process-art-symbol { transform: translate(-50%, -50%) rotate(-18deg); }.process-step-3 .process-art-symbol { background: linear-gradient(130deg, white, #e4ebde); color: #869c79; }.process-growth-line { position: absolute; width: 90%; height: 80%; top: 4%; left: 5%; opacity: .5; }
.process-bottom { display: flex; align-items: center; justify-content: space-between; gap: 32px; margin-top: 24px; }.process-bottom > p { font-size: 9px; color: var(--muted); line-height: 1.8; max-width: 420px; }.process-controls { display: none; align-items: center; gap: 8px; }.process-scroll-label { color: var(--muted); font-size: 7px; letter-spacing: 1px; margin-right: 24px; }.process-count { font-size: 10px; color: var(--muted); margin-right: 16px; font-variant-numeric: tabular-nums; }.process-controls button { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; border: 1px solid #d9d1e5; background: transparent; }.process-controls button:first-of-type svg { transform: rotate(180deg); }.process-controls button:disabled { opacity: .3; cursor: default; }.process-controls button:hover:not(:disabled) { background: white; }
.process-is-pinned .process-stage { height: 100svh; display: flex; align-items: center; padding-block: 40px; }.process-is-pinned .process-stage > .section-container { min-width: 0; }.process-is-pinned .section-heading { margin-bottom: 16px; }.process-is-pinned .section-heading h2 { font-size: clamp(32px, 2.8vw, 44px); margin-top: 16px; }.process-is-pinned .process-nav { margin-bottom: 24px; }.process-is-pinned .process-panels { display: grid; gap: 0; }.process-is-pinned .process-step { grid-area: 1 / 1; opacity: 0; visibility: hidden; transform: translateY(16px); transition: opacity var(--duration-normal) var(--ease), transform var(--duration-normal) var(--ease), visibility var(--duration-normal); padding: 32px; }.process-is-pinned .process-step[data-active="true"] { opacity: 1; visibility: visible; transform: translateY(0); }.process-is-pinned .process-step-copy h3 { font-size: 32px; }.process-is-pinned .process-step-copy .eyebrow { font-size: 8px; }.process-is-pinned .process-step-description { font-size: 12px; margin-top: 12px; }.process-is-pinned .process-step-copy > ul { margin-block: 16px; gap: 8px; }.process-is-pinned .process-deliverable { padding-top: 16px; }.process-is-pinned .process-illustration { min-height: 328px; }.process-is-pinned .process-art-core { top: 24px; height: 208px; }.process-is-pinned .process-illustration > strong { margin-top: 224px; }.process-is-pinned .process-controls { display: flex; }
@media (max-width: 1100px) { .result-stat { padding: 24px; }.dashboard-metric { padding: 20px 16px; }.dashboard-lower { grid-template-columns: minmax(0, 1fr) 240px; gap: 24px; }.dashboard-metric > .counter { font-size: 30px; }.platform-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }.platform-card { padding: 20px; }.process-step { padding: 32px; gap: 24px; }.process-art-chip { padding: 10px 12px; gap: 8px; }.process-scroll-label { display: none; } }
@media (max-width: 767px) {
  .results { padding-top: 64px; }.results-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }.result-stat { padding: 24px 16px; }.result-stat:nth-child(odd) { padding-left: 0; }.result-stat:nth-child(even) { padding-right: 0; border-right: 0; }.result-stat:nth-child(-n+2) { border-bottom: 1px solid var(--border); }.result-stat > .counter { font-size: clamp(44px, 13vw, 64px); margin-top: 32px; }.result-stat h3 { font-size: 11px; }.result-stat > p { font-size: 10px; }.section-disclosure { font-size: 9px; margin-top: 16px; }
  .dashboard-section { padding-top: 24px; }.dashboard-topbar { padding: 20px; gap: 16px; }.dashboard-topbar .brand { font-size: 20px; }.dashboard-workspace { display: none; }.demo-badge { padding: 6px 8px; font-size: 6px; letter-spacing: .6px; }.dashboard-body { padding: 24px 16px; }.dashboard-title-row { align-items: flex-start; flex-direction: column; gap: 16px; }.dashboard-title-row h3 { font-size: 22px; }.dashboard-title-row p { font-size: 10px; }.period-toggle { align-self: stretch; }.period-toggle button { flex: 1; font-size: 10px; }.dashboard-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 24px; }.dashboard-metric { padding: 16px 12px; }.dashboard-metric > span:first-child { font-size: 9px; }.dashboard-metric > .counter { font-size: clamp(24px, 7.1vw, 34px); letter-spacing: -.06em; }.metric-change, .metric-context { font-size: 8px; margin-top: 8px; }.metric-change > span { display: block; margin-left: 0; }.dashboard-lower { grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }.chart-heading { flex-direction: column; align-items: flex-start; gap: 12px; }.chart-legend { font-size: 8px; gap: 12px; }.traffic-chart { margin-top: 16px; min-height: 144px; }.traffic-chart text { font-size: 18px; }.chart-data { margin-top: 8px; font-size: 9px; }.chart-data table { font-size: 9px; }.chart-data td, .chart-data th { padding: 10px 4px; }.channel-panel { border-left: 0; padding-left: 0; border-top: 1px solid var(--border); padding-top: 24px; }.channel-list { gap: 16px; }.dashboard-insight { margin-top: 20px; }.dashboard-footer { padding: 16px 20px; font-size: 8px; line-height: 1.8; }.dashboard-footer .status-dot { width: 5px; height: 5px; }
  .platforms { padding-top: 24px; }.platform-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }.platform-card { height: 132px; flex-direction: column; align-items: flex-start; justify-content: center; padding: 16px; gap: 12px; }.platform-mark { width: 32px; height: 32px; border-radius: 10px; font-size: 21px; }.platform-card h3 { font-size: 11px; }.platform-card p { font-size: 9px; line-height: 1.5; margin-top: 4px; }.platform-footer { flex-direction: column; align-items: flex-start; gap: 0; }.float-toggle { font-size: 9px; margin-top: 8px; padding-block: 8px; }
  .process-section { border-radius: 24px 24px 0 0; margin-top: 16px; }.process-stage { padding-block: 48px 32px; }.process-nav { margin-bottom: 24px; }.process-nav ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 16px; }.process-nav button { font-size: 10px; gap: 8px; padding-block: 8px; }.step-dot { width: 32px; height: 32px; font-size: 9px; }.step-nav-arrow { display: none; }.process-connector { display: none; }.process-step { grid-template-columns: 1fr; padding: 24px; gap: 24px; }.process-step-copy .eyebrow { font-size: 7px; letter-spacing: .8px; }.process-step-copy h3 { font-size: 29px; }.process-step-description { font-size: 12px; }.process-step-copy > ul { margin-block: 20px; }.process-step-copy li { font-size: 10px; line-height: 1.7; gap: 8px; }.process-deliverable > span { font-size: 7px; }.process-deliverable p { font-size: 10px; }.process-illustration { min-height: 300px; padding: 20px; }.process-art-core { top: 40px; height: 190px; }.process-art-index { top: 20px; left: 20px; font-size: 7px; }.process-art-symbol { width: 64px; height: 64px; border-radius: 20px; }.process-art-symbol > svg { width: 32px; height: 32px; }.process-art-chip { font-size: 8px; padding: 10px; gap: 6px; border-radius: 10px; }.process-art-chip > span:first-child { font-size: 6px; }.art-chip-0 { left: 3%; }.art-chip-1 { right: 1%; }.art-chip-2 { left: 5%; }.process-illustration > strong { margin-top: 216px; font-size: 16px; }.process-art-caption { font-size: 8px; }.process-bottom > p { font-size: 9px; }.process-bottom { margin-top: 20px; }
}
@media (prefers-reduced-motion: reduce) { .platform-card { animation: none; }.dashboard-line { stroke-dashoffset: 0 !important; }.process-step { transition: none; } }
```

### lib/config.ts

```ts
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
  results: {
    eyebrow: "06 / PROGRESS YOU CAN PUT A NUMBER ON",
    heading: ["Made to move people.", "Measured by what moves."],
    description: "We connect the creative to the commercial. Clear goals, useful signals, and a shared view of what success looks like.",
    note: "Illustrative results for this agency concept. Replace with verified client outcomes.",
    items: [
      { value: 3.2, decimals: 1, prefix: "", suffix: "×", label: "Revenue growth", description: "A bigger impact on the bottom line.", icon: "chart" },
      { value: 184, decimals: 0, prefix: "+", suffix: "%", label: "Organic visibility", description: "More of the right people finding you.", icon: "search" },
      { value: 4.8, decimals: 1, prefix: "", suffix: "×", label: "Return on ad spend", description: "A clearer picture of every investment.", icon: "target" },
      { value: 98, decimals: 0, prefix: "", suffix: "%", label: "Happy partnerships", description: "Good relationships make great work.", icon: "heart" },
    ],
  },
  dashboard: {
    eyebrow: "07 / NO GUESSING WHERE YOU STAND",
    heading: ["The bigger picture.", "Beautifully clear."],
    description: "Your growth, in one place. Know what’s working, see what’s next, and make the next decision with confidence.",
    title: "Growth overview",
    subtitle: "A little clarity goes a long way.",
    workspace: "Your brand / Growth workspace",
    badge: "INTERACTIVE DEMO",
    chartTitle: "Website visits",
    chartDescription: "Illustrative visits per reporting interval. Solid indigo shows the selected period; dashed grey shows the previous period.",
    current: "Selected period",
    previous: "Previous period",
    channelsTitle: "Where growth comes from",
    channelsSubtitle: "Share of website visits",
    tableLabel: "View accessible chart data",
    intervalLabel: "Reporting interval",
    periodLabel: "Choose a reporting period",
    note: "Sample data. This preview is not connected to an analytics account.",
    metricLabels: { visits: "Website visits", revenue: "Attributed revenue", roas: "Return on ad spend", conversions: "Conversions" },
    insightLabel: "THE NEXT OPPORTUNITY",
    insight: "Search is bringing the most visitors. Test a clearer landing-page story to turn more of that attention into action.",
    periods: [
      { id: "30", label: "30 days", range: "30-day sample", labels: ["01–05", "06–10", "11–15", "16–20", "21–25", "26–30"], visits: [12000, 15600, 18700, 24100, 27500, 32400], previous: [10000, 12000, 11000, 15000, 18000, 21500], revenue: 62400, roas: 4.8, conversions: 3218, channels: [{ name: "Organic search", share: 44 }, { name: "Paid media", share: 31 }, { name: "Direct & referral", share: 17 }, { name: "Social", share: 8 }] },
      { id: "90", label: "90 days", range: "90-day sample", labels: ["01–15", "16–30", "31–45", "46–60", "61–75", "76–90"], visits: [26000, 31200, 42700, 49800, 61300, 72800], previous: [18000, 22000, 25500, 29000, 36000, 45000], revenue: 184900, roas: 5.2, conversions: 7846, channels: [{ name: "Organic search", share: 48 }, { name: "Paid media", share: 27 }, { name: "Direct & referral", share: 16 }, { name: "Social", share: 9 }] },
    ],
  },
  platforms: {
    eyebrow: "08 / THE RIGHT TOOLS. THE RIGHT MINDS.",
    heading: ["A connected toolkit.", "An unfair advantage."],
    description: "From first insight to final interaction, we bring the tools together around your goals.",
    note: "An illustrative toolkit. Product names identify platforms, not certifications or formal partnerships.",
    pause: "Pause floating cards",
    play: "Resume floating cards",
    items: [
      { name: "Google Ads", label: "Search advertising", mark: "A", tone: "blue" },
      { name: "Meta", label: "Social advertising", mark: "∞", tone: "blue" },
      { name: "Google Analytics", label: "Measurement", mark: "▥", tone: "peach" },
      { name: "Semrush", label: "Search intelligence", mark: "S", tone: "peach" },
      { name: "Ahrefs", label: "Organic discovery", mark: "ah", tone: "blue" },
      { name: "Shopify", label: "Commerce", mark: "S", tone: "sage" },
      { name: "Webflow", label: "Web experiences", mark: "W", tone: "blue" },
      { name: "WordPress", label: "Publishing", mark: "W", tone: "slate" },
      { name: "Figma", label: "Collaborative design", mark: "F", tone: "lavender" },
      { name: "HubSpot", label: "Customer journeys", mark: "H", tone: "peach" },
      { name: "Mailchimp", label: "Email marketing", mark: "m", tone: "sand" },
      { name: "Looker Studio", label: "Clearer reporting", mark: "L", tone: "lavender" },
    ],
  },
  process: {
    eyebrow: "09 / FROM WHAT IF TO WHAT’S NEXT",
    heading: ["Big ambition.", "A clear way forward."],
    description: "No mystery. No disappearing acts. Just a thoughtful process that keeps us moving in the same direction.",
    stepLabel: "Step",
    deliverableLabel: "WHAT YOU WALK AWAY WITH",
    sequenceLabel: "Project stages",
    scrollLabel: "SCROLL THROUGH THE PROCESS",
    next: "Next step",
    previous: "Previous step",
    note: "Every engagement is different. We agree scope, milestones, and timing together before we start.",
    steps: [
      { title: "Get curious.", short: "Discover", icon: "search", number: "01", eyebrow: "LISTEN FIRST. LOOK CLOSER.", description: "We get inside your business, your audience, and your ambition. Asking better questions is how we find a better starting point.", details: ["Brand and channel audit", "Audience and competitor insights", "Shared goals and success measures"], deliverable: "A clear view of where you are, and where you could go.", visualTitle: "Find the opportunity.", visualLabels: ["Your business", "Your audience", "Your ambition"] },
      { title: "Find the way.", short: "Strategize", icon: "target", number: "02", eyebrow: "A SHARED DIRECTION. A SMARTER PLAN.", description: "We turn what we learn into a focused roadmap. The right message, the right channels, and the priorities that will make the biggest difference.", details: ["Positioning and messaging", "Channel and content planning", "A roadmap with clear priorities"], deliverable: "A practical growth strategy that everyone can get behind.", visualTitle: "Connect the dots.", visualLabels: ["Insight", "Strategy", "Opportunity"] },
      { title: "Make it matter.", short: "Create & launch", icon: "spark", number: "03", eyebrow: "GOOD IDEAS. THOUGHTFULLY EXECUTED.", description: "Our strategists, designers, and developers bring the plan to life together. We test the details, share the work, and launch with purpose.", details: ["Creative and development", "Collaborative reviews", "Tracking, testing, and launch"], deliverable: "A connected experience, ready to meet the world.", visualTitle: "Bring it to life.", visualLabels: ["Create", "Refine", "Launch"] },
      { title: "Keep getting better.", short: "Measure & grow", icon: "chart", number: "04", eyebrow: "LISTEN TO THE SIGNALS. BUILD MOMENTUM.", description: "Launch is a beginning. We learn from real behaviour, share what the numbers mean, and keep improving the things that move your business forward.", details: ["Clear performance reporting", "Testing and optimization", "New opportunities and next steps"], deliverable: "Useful insights, steady iteration, and a plan for what’s next.", visualTitle: "Make progress compound.", visualLabels: ["Learn", "Improve", "Grow"] },
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
    { selector: "#results", x: -3, y: 0.1, scale: 0.6, rotation: 6.5, morph: 0.1, color: 0.5, opacity: 0.06, cameraZ: 9.6 },
    { selector: "#dashboard", x: 3.2, y: 0.3, scale: 0.7, rotation: 7, morph: 0.1, color: 0.7, opacity: 0.03, cameraZ: 9.6 },
    { selector: "#platforms", x: -3.5, y: 0, scale: 0.65, rotation: 7.5, morph: 0.12, color: 0.4, opacity: 0.08, cameraZ: 9.6 },
    { selector: "#process", x: 3, y: 0, scale: 0.7, rotation: 8, morph: 0.08, color: 0.2, opacity: 0.03, cameraZ: 9.6 },
  ],
} as const;
```

### hooks/useLenis.ts

```ts
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useIsMobile } from "./useIsMobile";
let activeLenis: Lenis | null = null;
export function scrollToPosition(top: number) {
  if (activeLenis) activeLenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "instant" });
}
export function useLenis() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    if (reduced || mobile) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, anchors: { offset: -112 } });
    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, [reduced, mobile]);
}
```

### components/ui/Counter.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Counter({ value, decimals = 0, prefix = "", suffix = "", className = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const formatted = new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) { element.textContent = `${prefix}${new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)}${suffix}`; return; }
    const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      gsap.to(counter, { value, duration: motion.slow * 2, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 95%", once: true }, onUpdate: () => { element.textContent = `${prefix}${formatter.format(counter.value)}${suffix}`; }, onComplete: () => { element.textContent = `${prefix}${formatter.format(value)}${suffix}`; } });
    });
    return () => ctx.revert();
  }, [value, decimals, prefix, suffix, reduced]);
  return <span className={`counter ${className}`}><span className="sr-only">{prefix}{formatted}{suffix}</span><span ref={ref} aria-hidden="true">{prefix}{formatted}{suffix}</span></span>;
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
        gsap.from(path, { attr: { "stroke-dashoffset": 1 }, duration: motion.normal, ease: motion.ease, scrollTrigger: { trigger: path, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <section ref={ref} id={id} className={className} aria-labelledby={`${id}-heading`}>{children}</section>;
}
```

### components/ui/Experience.tsx

```tsx
"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis, scrollToPosition } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });
export function Experience() {
  useLenis();
  useEffect(() => {
    if (!window.location.hash) return;
    let cancelled = false;
    let frame = 0;
    const cancel = () => { cancelled = true; };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach(event => window.addEventListener(event, cancel, { passive: true, once: true }));
    // Restore deep links after the desktop pin spacers establish their final height.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        frame = requestAnimationFrame(() => {
          if (cancelled) return;
          let id = window.location.hash.slice(1);
          try { id = decodeURIComponent(id); } catch { return; }
          const target = document.getElementById(id);
          if (target) scrollToPosition(target.getBoundingClientRect().top + window.scrollY - 112);
        });
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); events.forEach(event => window.removeEventListener(event, cancel)); };
  }, []);
  const reduced = useReducedMotion();
  return <><div className="ambient-mesh" aria-hidden="true"/>{!reduced && <Scene/>}<Loader/><Cursor/></>;
}
```

### components/sections/SelectedWork.tsx

```tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToPosition } from "@/hooks/useLenis";
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
      // Cancel any in-flight smooth scroll before choosing a specific project.
      scrollToPosition(scroll.start + (scroll.end - scroll.start) * index / (data.projects.length - 1));
    }
  }
  function focusCard(index: number) {
    if (trigger.current && currentIndex.current !== index) moveTo(index);
  }
  return <section id="work" ref={root} className="work-section" aria-labelledby="work-heading"><div ref={stage} className="work-stage"><div className="section-container"><div className="section-heading work-heading"><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="work-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><div className="work-heading-aside"><p className="section-intro">{data.description}</p><p className="work-disclosure">{data.disclosure}</p></div></div><div className="work-viewport"><div ref={track} className="work-track">{data.projects.map((project, index) => <article key={project.id} className="work-card"><button className="project-open" aria-label={`${data.view}: ${project.brand}`} data-cursor="View" onClick={() => setSelected(project)} onFocus={() => focusCard(index)}><ProjectArtwork project={project}/><span className="project-open-arrow"><Arrow diagonal/></span></button><div className="work-card-info"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3><div className="project-tags">{project.services.map(service => <span key={service}>{service}</span>)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div></article>)}</div></div><div className="work-controls"><span className="work-scroll-hint">{data.scrollHint} <span aria-hidden="true">↘</span></span><div className="work-progress" aria-hidden="true"><span ref={progress}/></div><div className="work-navigation"><span className="work-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span>/ {String(data.projects.length).padStart(2, "0")}</span></span><button aria-label={data.previous} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))}><Arrow/></button><button aria-label={data.next} disabled={active === data.projects.length - 1} onClick={() => moveTo(Math.min(data.projects.length - 1, active + 1))}><Arrow/></button></div></div><p className="work-list-hint">{data.listHint}</p></div></div><ProjectDialog project={selected} onClose={close}/></section>;
}
```

### components/sections/Results.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
export function Results() {
  const data = config.results;
  return <Section id="results" className="results section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="results-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="results-grid">{data.items.map((item, i) => <article className="result-stat" key={item.label} data-reveal><div className="result-stat-top"><Icon name={item.icon}/><span className="card-number">0{i + 1}</span></div><Counter value={item.value} decimals={item.decimals} prefix={item.prefix} suffix={item.suffix}/><h3>{item.label}</h3><p>{item.description}</p></article>)}</div><p className="section-disclosure">{data.note}</p></Section>;
}
```

### components/sections/GrowthDashboard.tsx

```tsx
"use client";
import { useEffect, useId, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Brand } from "@/components/ui/Brand";
export function GrowthDashboard() {
  const data = config.dashboard;
  const [periodIndex, setPeriodIndex] = useState(0);
  const period = data.periods[periodIndex];
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const totalVisits = period.visits.reduce((sum, value) => sum + value, 0);
  const previousVisits = period.previous.reduce((sum, value) => sum + value, 0);
  const increase = ((totalVisits / previousVisits - 1) * 100).toFixed(1);
  const maximum = Math.ceil(Math.max(...period.visits, ...period.previous) / 20000) * 20000;
  const coords = (values: readonly number[]) => values.map((value, index) => [56 + index * 136, 222 - value / maximum * 190]);
  const points = coords(period.visits);
  const path = (values: readonly number[]) => coords(values).map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const line = path(period.visits);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".dashboard-line", { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: motion.slow * 2, ease: motion.ease, scrollTrigger: { trigger: panel.current, start: "top 85%", once: true } });
      gsap.from(".dashboard-area, .chart-point", { opacity: 0, duration: motion.slow, stagger: 0.06, scrollTrigger: { trigger: panel.current, start: "top 85%", once: true } });
    }, panel);
    return () => ctx.revert();
  }, [periodIndex, reduced]);
  return <Section id="dashboard" className="dashboard-section section-container batch-section"><div className="centered-heading" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="dashboard-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="section-intro">{data.description}</p></div>
    <div ref={panel} className="growth-dashboard" data-reveal><div className="dashboard-topbar"><Brand/><span className="dashboard-workspace">{data.workspace}</span><span className="demo-badge"><span className="status-dot"/>{data.badge}</span></div><div className="dashboard-body"><div className="dashboard-title-row"><div><h3>{data.title}</h3><p>{data.subtitle}</p></div><div className="period-toggle" role="group" aria-label={data.periodLabel}>{data.periods.map((option, index) => <button key={option.id} aria-pressed={periodIndex === index} onClick={() => setPeriodIndex(index)}>{option.label}</button>)}</div></div>
    <p className="sr-only" role="status">{period.range}: {totalVisits.toLocaleString("en-US")} website visits; {period.roas} times return on ad spend.</p>
    <div className="dashboard-metrics" key={period.id}><div className="dashboard-metric featured-metric"><span>{data.metricLabels.visits}</span><Counter value={totalVisits}/><span className="metric-change">↗ +{increase}% <span>{data.previous.toLowerCase()}</span></span></div><div className="dashboard-metric"><span>{data.metricLabels.revenue}</span><Counter value={period.revenue / 1000} prefix="$" suffix="k" decimals={1}/><span className="metric-context">{period.range}</span></div><div className="dashboard-metric"><span>{data.metricLabels.roas}</span><Counter value={period.roas} suffix="×" decimals={1}/><span className="metric-context">{period.range}</span></div><div className="dashboard-metric"><span>{data.metricLabels.conversions}</span><Counter value={period.conversions}/><span className="metric-context">{period.range}</span></div></div>
    <div className="dashboard-lower"><div className="traffic-panel"><div className="chart-heading"><h4>{data.chartTitle}</h4><div className="chart-legend"><span><i/>{data.current}</span><span><i/>{data.previous}</span></div></div><svg className="traffic-chart" viewBox="0 0 768 264" role="img" aria-labelledby={`${id}-title ${id}-description`}><title id={`${id}-title`}>{`${data.chartTitle} — ${period.range}`}</title><desc id={`${id}-description`}>{data.chartDescription}</desc><defs><linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5B4BFF" stopOpacity="0.15"/><stop offset="100%" stopColor="#5B4BFF" stopOpacity="0"/></linearGradient></defs>{[0, 1, 2, 3, 4].map(tick => { const y = 222 - tick * 47.5; return <g key={tick}><line x1="56" x2="736" y1={y} y2={y} stroke="#eeebf3" strokeDasharray="3 5"/><text x="42" y={y + 4} textAnchor="end">{tick * maximum / 4 / 1000}k</text></g>; })}<path className="dashboard-area" d={`${line} L736,222 L56,222 Z`} fill={`url(#${id}-area)`}/><path d={path(period.previous)} fill="none" stroke="#aaa4ba" strokeWidth="2" strokeDasharray="5 6"/><path className="dashboard-line" d={line} fill="none" stroke="#5B4BFF" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1"/>{points.map(([x, y], i) => <circle className="chart-point" key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#5B4BFF" strokeWidth="2"/>)}{period.labels.map((label, index) => <text key={label} x={56 + index * 136} y="252" textAnchor="middle">{label}</text>)}</svg><details className="chart-data"><summary>{data.tableLabel}</summary><table><caption className="sr-only">{data.chartTitle}: {period.range}</caption><thead><tr><th scope="col">{data.intervalLabel}</th><th scope="col">{data.current}</th><th scope="col">{data.previous}</th></tr></thead><tbody>{period.labels.map((label, i) => <tr key={label}><th scope="row">{label}</th><td>{period.visits[i].toLocaleString("en-US")}</td><td>{period.previous[i].toLocaleString("en-US")}</td></tr>)}</tbody></table></details></div><aside className="channel-panel"><h4>{data.channelsTitle}</h4><p>{data.channelsSubtitle}</p><div className="channel-list">{period.channels.map((channel, index) => <div className={`channel channel-${index}`} key={channel.name}><div><span>{channel.name}</span><strong>{channel.share}%</strong></div><div className="channel-track" aria-hidden="true"><span style={{ transform: `scaleX(${channel.share / 100})` }}/></div></div>)}</div><div className="dashboard-insight"><Icon name="spark"/><div><span>{data.insightLabel}</span><p>{data.insight}</p></div></div></aside></div></div><div className="dashboard-footer"><span className="status-dot"/>{data.note}</div></div>
  </Section>;
}
```

### components/sections/ToolsPlatforms.tsx

```tsx
"use client";
import { useState, type CSSProperties } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function ToolsPlatforms() {
  const data = config.platforms;
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  return <Section id="platforms" className="platforms section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="platforms-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><ul className="platform-grid" data-paused={paused || reduced || undefined}>{data.items.map((tool, index) => <li key={tool.name} data-reveal><div className="platform-card" style={{ "--float-delay": `${(index % 4) * -1.3}s`, "--float-duration": `${5 + index % 3}s` } as CSSProperties}><span className={`platform-mark tone-${tool.tone}`} aria-hidden="true">{tool.mark}</span><div><h3>{tool.name}</h3><p>{tool.label}</p></div></div></li>)}</ul><div className="platform-footer"><p className="section-disclosure">{data.note}</p>{!reduced && <button className="float-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? data.play : data.pause}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>}</div></Section>;
}
```

### components/sections/Process.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToPosition } from "@/hooks/useLenis";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
export function Process() {
  const data = config.process;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const current = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 900px) and (pointer: fine)", () => {
      element.classList.add("process-is-pinned");
      if (stage.current && stage.current.scrollHeight > window.innerHeight + 2) { element.classList.remove("process-is-pinned"); return; }
      setPinned(true);
      const update = (self: ScrollTrigger) => {
        const index = Math.min(data.steps.length - 1, Math.floor(self.progress * data.steps.length));
        if (index !== current.current) { current.current = index; setActive(index); }
        gsap.set(line.current, { attr: { "stroke-dashoffset": 1 - self.progress } });
      };
      trigger.current = ScrollTrigger.create({ trigger: stage.current, start: "top top", end: () => `+=${window.innerHeight * 3}`, pin: true, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: update, onRefresh: update });
      return () => { trigger.current = null; element.classList.remove("process-is-pinned"); setPinned(false); };
    }, section);
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    return () => { cancelled = true; media.revert(); };
  }, [reduced, data.steps.length]);
  function moveTo(index: number) {
    const scroll = trigger.current;
    if (scroll) scrollToPosition(scroll.start + (scroll.end - scroll.start) * (index + 0.08) / data.steps.length);
    else {
      setActive(index);
      document.getElementById(`process-step-${index}`)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "center" });
    }
  }
  return <section ref={section} id="process" className="process-section" aria-labelledby="process-heading"><div ref={stage} className="process-stage"><div className="section-container"><div className="section-heading"><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="process-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><nav className="process-nav" aria-label={data.sequenceLabel}><svg className="process-connector" viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1H1000" stroke="#dfdae9" strokeWidth="2"/><path ref={line} d="M0 1H1000" stroke="#5B4BFF" strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset="1"/></svg><ol>{data.steps.map((step, index) => <li key={step.number}><button aria-current={active === index ? "step" : undefined} onClick={() => moveTo(index)} aria-controls={`process-step-${index}`}><span className="step-dot">{step.number}</span><span>{step.short}</span><span className="step-nav-arrow" aria-hidden="true">↗</span></button></li>)}</ol></nav><div className="process-panels">{data.steps.map((step, index) => <article key={step.number} id={`process-step-${index}`} className={`process-step process-step-${index}`} data-active={active === index} aria-hidden={pinned && active !== index ? true : undefined} inert={pinned && active !== index ? true : undefined}><div className="process-step-copy"><p className="eyebrow">{step.eyebrow}</p><h3>{step.title}</h3><p className="process-step-description">{step.description}</p><ul>{step.details.map(detail => <li key={detail}><span aria-hidden="true">✓</span>{detail}</li>)}</ul><div className="process-deliverable"><span>{data.deliverableLabel}</span><p>{step.deliverable}</p></div></div><div className="process-illustration" aria-hidden="true"><span className="process-art-index">{data.stepLabel} / {step.number}</span><div className="process-art-core"><div className="process-art-ring ring-outer"/><div className="process-art-ring ring-inner"/><div className="process-art-symbol"><Icon name={step.icon}/></div>{step.visualLabels.map((label, i) => <span className={`process-art-chip art-chip-${i}`} key={label}><span>0{i + 1}</span>{label}<span>↗</span></span>)}{index === 3 && <svg className="process-growth-line" viewBox="0 0 300 130"><path d="M5 120 58 98 100 109 144 63 198 75 246 25 290 10" fill="none" stroke="#998ae7" strokeWidth="2"/></svg>}</div><strong>{step.visualTitle}</strong><span className="process-art-caption">{step.short} ↗</span></div></article>)}</div><div className="process-bottom"><p>{data.note}</p><div className="process-controls"><span className="process-scroll-label">{data.scrollLabel}</span><span className="process-count" role="status">{data.steps[active].number} / {String(data.steps.length).padStart(2, "0")}</span><button aria-label={data.previous} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))}><Arrow/></button><button aria-label={data.next} disabled={active === data.steps.length - 1} onClick={() => moveTo(Math.min(data.steps.length - 1, active + 1))}><Arrow/></button></div></div></div></div></section>;
}
```

## Validation

TypeScript and ESLint pass. Production build verified with `npm run build -- --webpack`. The default Turbopack build encounters an environment port-binding restriction during CSS processing. Lighthouse has not been measured.

Browser checks cover 360px mobile and 1440px/1920px desktop layouts, dashboard period switching, tool animation pause, counters, and process navigation. Short viewports, mobile devices, and reduced-motion preferences use the stacked process layout. All displayed performance figures are illustrative.

## Next batch

13. Pricing
14. Team
15. Testimonials
16. Video / Showreel

Wait for “next” before continuing.
