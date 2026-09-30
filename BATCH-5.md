# Nexora — Batch 5

Final home-page sections 17–22. No additional dependencies are required. AR logo integration remains deferred at your request.

## File tree

```text
app/page.tsx
app/globals.css
lib/config.ts
lib/validation.ts
components/ui/Accordion.tsx
components/ui/Newsletter.tsx
components/three/Scene.tsx
components/sections/Awards.tsx
components/sections/FAQ.tsx
components/sections/AuditForm.tsx
components/sections/Insights.tsx
components/sections/FinalCTA.tsx
components/sections/Footer.tsx
```

## Complete source

These are complete new and updated files. Shared components from earlier batches remain in use. The persistent scene now uses a single scrubbed driver so section transitions cannot compete over the same state after viewport or layout changes.

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
import { Pricing } from "@/components/sections/Pricing";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Showreel } from "@/components/sections/Showreel";
import { Awards } from "@/components/sections/Awards";
import { FAQ } from "@/components/sections/FAQ";
import { AuditForm } from "@/components/sections/AuditForm";
import { Insights } from "@/components/sections/Insights";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, email: config.email, description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><TrustedBy/><About/><Services/><WhyChooseUs/><Industries/><SelectedWork/><Results/><GrowthDashboard/><ToolsPlatforms/><Process/><Pricing/><Team/><Testimonials/><Showreel/><Awards/><FAQ/><AuditForm/><Insights/><FinalCTA/></main><Footer/></>;
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

/* Batch 4: pricing, people, partner stories, and showreel. */
.pricing-toolbar { display: flex; justify-content: center; margin: 0 0 40px; }
.billing-toggle { display: flex; padding: 6px; gap: 4px; background: #eeecf3; border: 1px solid var(--border); border-radius: 99px; }
.billing-toggle button { min-height: 44px; padding: 12px 24px; background: transparent; border: 0; border-radius: 99px; font-size: 13px; }
.billing-toggle button[aria-pressed="true"] { background: white; box-shadow: var(--shadow); color: #4938c7; }
.billing-toggle button span { font-size: 10px; margin-left: 8px; color: #4f436c; }
.pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.price-card { position: relative; padding: 2px; border-radius: 26px; isolation: isolate; overflow: hidden; background: #e9e6ee; box-shadow: var(--shadow); }
.price-featured::before { content: ""; position: absolute; inset: -60%; z-index: -1; background: conic-gradient(from 30deg, #5b4bff, #ffd3b6, #ff7a59, #5b4bff); animation: price-orbit 14s linear infinite; }
.price-featured:hover::before, .price-featured:focus-within::before { animation-play-state: paused; }
@keyframes price-orbit { to { transform: rotate(360deg); } }
.price-inner { background: white; height: 100%; border-radius: 24px; padding: 32px; }
.price-featured .price-inner { background: #fcfbff; }
.price-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; min-height: 24px; margin-bottom: 32px; }
.price-badge { font-size: 8px; color: #4e3bb1; background: #ede8ff; border-radius: 99px; padding: 8px; letter-spacing: .8px; }
.price-card h3 { font: 500 32px var(--font-heading), sans-serif; letter-spacing: -1.4px; }
.price-description { font-size: 13px; color: var(--muted); line-height: 1.8; margin-top: 16px; min-height: 48px; max-width: 240px; }
.price-amount { margin: 32px 0; }
.price-amount p { display: flex; align-items: baseline; gap: 8px; }
.price-amount strong { font: 500 clamp(32px, 3.2vw, 48px) var(--font-heading), sans-serif; letter-spacing: -2px; }
.price-amount span, .price-amount small { font-size: 11px; color: var(--muted); }
.price-amount small { display: block; margin-top: 8px; }
.price-card .button { width: 100%; }
.price-card ul { list-style: none; padding: 24px 0 0; margin: 24px 0 0; border-top: 1px solid var(--border); display: grid; gap: 16px; }
.price-card li { display: flex; gap: 12px; font-size: 12px; line-height: 1.6; }
.price-card li > span { color: #6152b0; }
.team-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
.team-card { padding: 0; overflow: hidden; border-radius: 24px; background: white; border: 1px solid var(--border); }
.team-portrait { position: relative; overflow: hidden; padding-top: 24px; }
.team-portrait svg { display: block; width: 100%; height: auto; }
.team-initials { position: absolute; top: 16px; left: 16px; font-size: 10px; letter-spacing: 2px; }
.team-detail { position: absolute; bottom: 16px; left: 8px; right: 8px; text-align: center; padding: 12px 8px; background: #ffffffeb; backdrop-filter: blur(8px); border-radius: 12px; color: #45404c; font-size: 10px; opacity: 0; transform: translateY(12px); transition: transform var(--duration-normal) var(--ease), opacity var(--duration-normal); }
.team-card:hover .team-detail { opacity: 1; transform: translateY(0); }
.team-caption { padding: 24px 16px; }
.team-caption h3 { font: 500 17px var(--font-heading), sans-serif; letter-spacing: -.5px; }
.team-caption p { font-size: 10px; color: var(--muted); margin-top: 8px; }
.testimonial-track { position: relative; display: flex; gap: 24px; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x mandatory; cursor: grab; border-radius: 24px; overscroll-behavior-x: contain; }
.testimonial-track::-webkit-scrollbar { display: none; }
.testimonial-track::after { content: ""; flex: 0 0 calc(18% - 24px); }
.testimonial-track[data-dragging] { scroll-snap-type: none; cursor: grabbing; user-select: none; }
.testimonial-card { color: var(--foreground); flex: 0 0 82%; padding: clamp(24px, 5vw, 64px); border: 1px solid var(--border); border-radius: 24px; scroll-snap-align: start; background: white; }
.testimonial-card.tone-lavender { background: #f0ecfc; }
.testimonial-card.tone-peach { background: #fcf0e9; }
.testimonial-card.tone-sage { background: #edf3ef; }
.testimonial-card.tone-blue { background: #edf2fa; }
.testimonial-top { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #645a78; }
.testimonial-top span:last-child { font: 500 72px/1 var(--font-heading), sans-serif; color: #8271b0; }
.testimonial-card blockquote { font: 400 clamp(24px, 3vw, 42px)/1.3 var(--font-heading), sans-serif; letter-spacing: -1.3px; margin: 16px 0 48px; max-width: 840px; }
.testimonial-person { display: flex; gap: 16px; align-items: center; }
.testimonial-person > span { display: grid; place-items: center; width: 48px; height: 48px; background: #ffffffb3; border-radius: 50%; font-size: 12px; }
.testimonial-person h3 { font-size: 13px; font-weight: 550; }
.testimonial-person p { color: #655e6c; font-size: 11px; margin-top: 8px; }
.testimonial-person > strong { margin-left: auto; font: 600 24px var(--font-heading), sans-serif; letter-spacing: -1px; }
.testimonial-controls { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 24px; }
.testimonial-controls > div { display: flex; align-items: center; gap: 24px; }
.testimonial-controls > div > span { font-size: 11px; font-variant-numeric: tabular-nums; }
.testimonial-controls button { width: 48px; height: 48px; border: 1px solid var(--border); border-radius: 50%; background: white; }
.testimonial-controls button:disabled { opacity: .35; cursor: default; }
.testimonial-controls button:not(:disabled):hover { background: #ece8ff; }
.showreel { padding-bottom: 80px; }
.reel-frame { position: relative; isolation: isolate; overflow: hidden; width: 100%; min-height: 640px; margin: 0; border-radius: 40px; background: #ece6f7; transform-origin: center; }
.reel-art { position: absolute; z-index: -1; inset: 0; overflow: hidden; background: radial-gradient(ellipse at 74% 30%, #ffe4ce 0, transparent 50%), linear-gradient(120deg, #efecfb, #e6dff5 60%, #fce4df); }
.reel-grid { position: absolute; inset: 0; opacity: .2; background-image: linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px); background-size: 64px 64px; transform: rotate(-12deg) scale(1.3); }
.reel-content { position: relative; padding: 64px max(32px, calc((100vw - 1280px) / 2)); min-height: 560px; display: flex; flex-direction: column; justify-content: space-between; gap: 56px; }
.reel-title { font: 500 clamp(64px, 9vw, 144px)/.95 var(--font-heading), sans-serif; letter-spacing: -.075em; }
.reel-title span { font-size: .6em; letter-spacing: -.06em; }
.reel-content .eyebrow { color: #514666; }
.reel-sculpture { position: absolute; width: 440px; height: 440px; right: 7%; top: 8%; }
.reel-sculpture i { position: absolute; inset: 0; border: 64px solid #c6b5f1; border-radius: 44%; background: transparent; box-shadow: inset 12px 16px 24px #ffffffba, inset -16px -20px 32px #8b70bb4d, 16px 24px 40px #9a7aa129; transform: rotate(30deg) scaleX(.8); }
.reel-sculpture i:nth-child(2) { border-color: #f2c3b9; transform: rotate(-30deg) scaleX(.55); }
.reel-sculpture i:nth-child(3) { border-color: #d8c5f2; transform: rotate(90deg) scaleX(.6); }
.reel-spark { position: absolute; color: #8971bd; font-size: 80px; }
.reel-spark-one { top: 12%; left: 48%; }
.reel-spark-two { bottom: 12%; right: 6%; font-size: 112px; color: #c38b76; }
.reel-frame figcaption { position: relative; display: flex; justify-content: center; align-items: center; gap: 12px; background: #ffffff80; border-top: 1px solid #ffffff80; padding: 24px; font-size: 12px; color: #514666; }
@media (min-width: 1600px) { .reel-content { min-height: 680px; } .reel-sculpture { width: 560px; height: 560px; } }
@media (max-width: 1100px) { .price-inner { padding: 24px; } .price-badge { font-size: 7px; letter-spacing: 0; } .team-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .reel-sculpture { right: -5%; opacity: .75; } }
@media (max-width: 760px) {
  .pricing-grid { grid-template-columns: 1fr; } .price-inner { padding: 32px; } .price-description { min-height: 0; max-width: none; } .price-amount strong { font-size: 48px; } .price-top { margin-bottom: 24px; } .price-badge { font-size: 8px; } .team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .team-caption { padding: 24px 12px; } .team-caption h3 { font-size: 15px; } .team-caption p { font-size: 9px; } .team-detail { position: static; display: block; opacity: 1; transform: none; border-radius: 0; min-height: 48px; } .testimonial-card { flex-basis: 100%; } .testimonial-track::after { display: none; } .testimonial-card blockquote { font-size: 28px; letter-spacing: -.8px; min-height: 184px; margin-bottom: 32px; } .testimonial-person { gap: 8px; } .testimonial-person > strong { display: none; } .testimonial-controls > div { gap: 12px; } .testimonial-controls .eyebrow { font-size: 8px; letter-spacing: .8px; } .reel-frame { min-height: 480px; border-radius: 24px; } .reel-content { min-height: 440px; padding: 32px 24px; gap: 80px; } .reel-title { font-size: clamp(60px, 13vw, 96px); } .reel-sculpture { width: 300px; height: 300px; top: 8%; right: -24%; opacity: .5; } .reel-sculpture i { border-width: 40px; } .reel-spark { font-size: 48px; } .reel-spark-two { font-size: 64px; } .reel-content .eyebrow { font-size: 8px; letter-spacing: 1px; } .reel-frame figcaption { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) { .price-featured::before { animation: none; } .team-detail { transition: none; } .reel-frame, .reel-sculpture { transform: none !important; } }

/* Batch 5: recognition, questions, audit, insights, closing invitation, footer. */
.awards-heading { display: flex; justify-content: space-between; align-items: center; gap: 32px; margin-bottom: 40px; }
.awards-heading h2 { font: 500 clamp(24px, 2.6vw, 36px)/1.2 var(--font-heading), sans-serif; letter-spacing: -1.2px; max-width: 480px; }
.awards-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); list-style: none; margin: 0; padding: 0; border-block: 1px solid var(--border); }
.awards-strip li { padding: 32px 24px; border-right: 1px solid var(--border); }
.awards-strip li:first-child { padding-left: 0; }.awards-strip li:last-child { border-right: 0; }
.award-symbol { font-size: 32px; color: #87799c; }
.awards-strip h3 { font: 600 clamp(18px, 2vw, 28px) var(--font-heading), sans-serif; letter-spacing: -1px; margin: 16px 0 24px; }
.awards-strip p { display: flex; justify-content: space-between; gap: 8px; color: var(--muted); font-size: 10px; }
.faq-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 80px; align-items: start; }
.faq-intro h2, .audit-copy h2 { font: 500 clamp(36px, 4.2vw, 60px)/1.1 var(--font-heading), sans-serif; letter-spacing: -.055em; margin: 24px 0; }
.faq-intro h2 span, .audit-copy h2 span { color: var(--muted); }
.faq-intro > p:not(.eyebrow) { color: var(--muted); font-size: 14px; line-height: 1.9; max-width: 336px; }
.faq-contact { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); max-width: 336px; }
.faq-contact p { font-size: 12px; color: var(--muted); margin-bottom: 16px; }
.faq-contact a { font-size: 13px; border-bottom: 1px solid #b4a8d8; padding-bottom: 8px; }
.accordion { border-top: 1px solid var(--border); }
.accordion details { border-bottom: 1px solid var(--border); }
.accordion summary { display: flex; align-items: center; gap: 16px; padding: 24px 0; cursor: pointer; font-size: 15px; font-weight: 500; line-height: 1.6; list-style: none; }
.accordion summary::-webkit-details-marker { display: none; }
.accordion-number { color: var(--muted); font-size: 10px; flex: 0 0 24px; }
.accordion-plus { margin-left: auto; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: #ece8f7; color: #55448c; flex-shrink: 0; font-size: 20px; transition: transform var(--duration-normal) var(--ease); }
.accordion details[open] .accordion-plus { transform: rotate(45deg); }
.accordion-answer { padding: 0 40px 24px; }
.accordion-answer p { color: var(--muted); font-size: 13px; line-height: 1.9; }
.accordion details[open] .accordion-answer, .insight-body, .audit-success, .newsletter-success { animation: content-arrive var(--duration-normal) var(--ease) both; }
@keyframes content-arrive { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.audit-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 64px; border: 1px solid #ffffff; border-radius: 32px; background: linear-gradient(135deg, #f1edfbd9, #fbf3ecd9); box-shadow: var(--shadow); }
.audit-description { font-size: 14px; line-height: 1.9; color: #66616d; max-width: 392px; }
.audit-copy ul { list-style: none; padding: 0; margin: 32px 0; display: grid; gap: 16px; }
.audit-copy li { display: flex; gap: 12px; font-size: 12px; line-height: 1.6; }
.audit-copy li span { color: #6152a8; }
.audit-aside { display: flex; gap: 16px; align-items: center; margin-top: 64px; }
.audit-aside > span { font-size: 48px; color: #9b88bf; }
.audit-aside .eyebrow { font-size: 8px; letter-spacing: 1px; }
.audit-aside p:last-child { font-size: 11px; line-height: 1.7; color: #66616d; margin-top: 8px; }
.audit-panel { background: #ffffffed; border-radius: 24px; padding: 32px; box-shadow: var(--shadow); min-width: 0; }
.audit-panel h3 { font: 500 24px/1.2 var(--font-heading), sans-serif; letter-spacing: -.8px; margin-bottom: 32px; }
.form-field { margin-bottom: 24px; }
.form-field label { display: block; font-size: 11px; font-weight: 550; margin-bottom: 8px; }
.form-field input, .form-field select { width: 100%; min-height: 48px; padding: 12px 16px; border: 1px solid #dcd8e4; border-radius: 12px; background: #fcfbfe; color: var(--foreground); font-size: 14px; }
.form-field input::placeholder { color: #777080; }
.form-field [aria-invalid="true"] { border-color: #ad3b47; }
.field-error { color: #a02636; font-size: 11px; line-height: 1.6; margin-top: 8px; }
.audit-submit { width: 100%; border: 0; gap: 16px; white-space: normal; }
.form-note { font-size: 10px; line-height: 1.8; color: var(--muted); margin-top: 16px; }
.audit-success { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; min-height: 560px; }
.success-mark { display: grid; place-items: center; width: 72px; height: 72px; background: #eee9fc; color: #5e4da5; border-radius: 50%; font-size: 32px; margin-bottom: 32px; }
.audit-success h3 { font-size: 32px; margin-bottom: 16px; }
.audit-success p { color: var(--muted); font-size: 14px; line-height: 1.9; margin-bottom: 32px; }
.audit-success .button { white-space: normal; text-align: left; }
.insights-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: start; gap: 24px; }
.insight-card { border: 1px solid var(--border); border-radius: 24px; background: white; overflow: hidden; }
.insight-art { position: relative; display: grid; place-items: center; height: 208px; overflow: hidden; }
.insight-art > span { font: 500 136px/1 var(--font-heading), sans-serif; z-index: 1; transform: rotate(-12deg); transition: transform var(--duration-normal) var(--ease); }
.insight-card:hover .insight-art > span { transform: rotate(4deg) scale(1.08); }
.insight-art i { position: absolute; width: 184px; height: 184px; border: 1px solid currentColor; opacity: .16; border-radius: 50%; transform: translate(80px, 40px); }
.insight-art i:last-child { transform: translate(-80px, -40px); }
.insight-copy { padding: 24px; }
.insight-meta { display: flex; justify-content: space-between; gap: 8px; font-size: 8px; letter-spacing: .8px; color: var(--muted); }
.insight-copy h3 { font: 500 24px/1.25 var(--font-heading), sans-serif; letter-spacing: -.8px; margin: 24px 0 16px; }
.insight-copy > p:not(.insight-meta), .insight-body p { font-size: 12px; color: var(--muted); line-height: 1.9; }
.insight-copy details { margin-top: 24px; }
.insight-copy summary { display: flex; justify-content: space-between; align-items: center; min-height: 44px; padding-top: 16px; border-top: 1px solid var(--border); font-size: 12px; cursor: pointer; list-style: none; }
.insight-copy summary::-webkit-details-marker { display: none; }
.insight-close, details[open] .insight-open { display: none; } details[open] .insight-close { display: inline; }
.insight-body p { margin-top: 24px; }
.final-cta { position: relative; isolation: isolate; min-height: 840px; display: grid; align-items: center; justify-items: center; text-align: center; padding: 200px 24px 120px; }
.final-glow { position: absolute; z-index: -1; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 34%, #e4d8ff80, transparent 40%), radial-gradient(ellipse at 64% 44%, #ffdbc94d, transparent 40%); }
.final-cta-content { max-width: 1100px; }
.final-cta .eyebrow { justify-content: center; }
.final-cta h2 { font: 500 clamp(48px, 7.5vw, 112px)/1.02 var(--font-heading), sans-serif; letter-spacing: -.065em; margin: 32px 0; }
.final-cta h2 span { color: #635577; }
.final-description { max-width: 448px; margin-inline: auto; font-size: 14px; line-height: 1.9; color: #625b6c; }
.final-button { margin-top: 40px; min-height: 72px; padding: 24px 40px; font-size: 15px; }
.final-note { font-size: 8px; letter-spacing: 1.5px; color: #6b6277; margin-top: 32px; }
.footer { position: relative; z-index: 2; background: #f0eeea; border-radius: 40px 40px 0 0; padding: 72px 0 24px; overflow: hidden; }
.footer-top { display: grid; grid-template-columns: 1.1fr .7fr 1fr 1.3fr; gap: 40px; }
.footer-brand > p { max-width: 192px; color: var(--muted); font-size: 12px; line-height: 1.8; margin-top: 24px; }
.footer h3 { font-size: 12px; font-weight: 550; margin-bottom: 24px; }
.footer nav ul, .footer-connect ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
.footer nav a, .footer-connect > a, .footer-connect li { font-size: 11px; color: #625d68; }
.footer nav a:hover, .footer-connect > a:hover { color: #4938ba; text-decoration: underline; text-underline-offset: 4px; }
.footer-connect ul { margin-top: 24px; max-width: 120px; }
.footer-connect li { display: flex; justify-content: space-between; }
.footer-connect > p { max-width: 168px; margin-top: 16px; font-size: 9px; color: var(--muted); line-height: 1.6; }
.newsletter > p { font-size: 11px; color: var(--muted); line-height: 1.7; }
.newsletter h3 { line-height: 1.6; margin-bottom: 16px; }
.newsletter-input { display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #bcb6c5; margin-top: 24px; padding-bottom: 8px; }
.newsletter-input input { background: transparent; min-width: 0; width: 100%; border: 0; min-height: 44px; font-size: 12px; color: var(--foreground); }
.newsletter-input button { background: white; border: 1px solid var(--border); border-radius: 50%; flex: 0 0 40px; height: 40px; }
.newsletter form > p { font-size: 9px; color: var(--muted); margin-top: 12px; line-height: 1.6; }
.newsletter-success { margin-top: 24px; }
.newsletter-success p { font-size: 12px; line-height: 1.8; color: #514667; }
.newsletter-success button { padding: 12px 0; background: none; border: 0; font-size: 11px; color: #514667; text-decoration: underline; text-underline-offset: 4px; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; gap: 24px; border-top: 1px solid var(--border); margin-top: 64px; padding-top: 24px; font-size: 10px; color: #625d68; }
.footer-wordmark { display: flex; justify-content: center; align-items: flex-start; font: 600 clamp(96px, 22vw, 352px)/1.1 var(--font-heading), sans-serif; letter-spacing: -.08em; margin-top: 32px; }
.footer-wordmark > span { font: 500 16px var(--font-body), sans-serif; margin: 3% 0 0 8px; letter-spacing: 0; }
.footer-location { text-align: center; font-size: 8px; letter-spacing: 1.5px; color: var(--muted); margin-top: 16px; }
@media (max-width: 1100px) { .faq-layout { gap: 40px; } .audit-layout { padding: 40px; gap: 32px; } .audit-copy h2 { font-size: 40px; } .footer-top { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; } }
@media (max-width: 760px) {
  .awards-heading { flex-direction: column; align-items: flex-start; gap: 24px; } .awards-heading h2 { font-size: 28px; } .awards-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); } .awards-strip li { padding: 24px 16px; } .awards-strip li:first-child { padding-left: 16px; } .awards-strip li:nth-child(2) { border-right: 0; } .awards-strip li:nth-child(-n+2) { border-bottom: 1px solid var(--border); } .awards-strip h3 { font-size: 20px; } .awards-strip p { flex-direction: column; line-height: 1.7; } .faq-layout { grid-template-columns: 1fr; gap: 40px; } .faq-intro h2, .audit-copy h2 { font-size: 36px; } .faq-contact { margin-top: 24px; } .accordion summary { gap: 8px; font-size: 14px; } .accordion-number { flex-basis: 16px; } .accordion-answer { padding: 0 8px 24px 24px; } .audit-layout { grid-template-columns: 1fr; padding: 24px 16px; gap: 32px; } .audit-copy .eyebrow { font-size: 8px; letter-spacing: 1px; } .audit-aside { margin-top: 32px; } .audit-panel { padding: 24px 16px; } .audit-panel h3 { font-size: 22px; } .audit-submit { padding: 16px; font-size: 12px; } .form-field input, .form-field select { font-size: 16px; } .audit-success { min-height: 480px; } .insights-grid { grid-template-columns: 1fr; } .insight-art { height: 200px; } .final-cta { min-height: 640px; padding: 120px 24px 80px; } .final-cta h2 { font-size: clamp(42px, 9.5vw, 64px); } .final-button { min-height: 64px; padding: 20px 24px; font-size: 12px; gap: 16px; white-space: normal; } .footer { padding-top: 48px; border-radius: 24px 24px 0 0; } .footer-top { gap: 40px 24px; } .footer-brand, .newsletter { grid-column: 1 / -1; } .footer-bottom { align-items: flex-start; gap: 16px; font-size: 9px; } .footer-bottom p { max-width: 176px; line-height: 1.7; } .footer-bottom a { white-space: nowrap; } .footer-wordmark { font-size: 22vw; } .footer-wordmark > span { font-size: 10px; } .footer-location { font-size: 7px; letter-spacing: .7px; } .newsletter-input input { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) { .accordion details[open] .accordion-answer, .insight-body, .audit-success, .newsletter-success { animation: none; } .accordion-plus, .insight-art > span { transition: none; } }
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
    { label: "Let’s talk", href: "#audit" },
  ],
  booking: { label: "Book a call", href: "#audit" },
  hero: {
    eyebrow: "INDEPENDENT MINDS. EXTRAORDINARY GROWTH.",
    lines: ["Your next", "big thing.", "Starts here."],
    description: "We turn ambitious brands into the ones everyone’s talking about. A little strategy. A lot of possibility.",
    primary: { label: "Let’s grow together", href: "#audit" },
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
  pricing: {
    eyebrow: "10 / INVEST IN YOUR NEXT",
    heading: ["A little clarity.", "A lot of possibility."],
    description: "Choose a starting point. We’ll shape the right scope around your business, your ambition, and your next chapter.",
    monthlyLabel: "Monthly", yearlyLabel: "Yearly", saving: "Save 15%", billingLabel: "Billing frequency",
    perMonth: "/ month", monthlyNote: "Billed monthly", annualNote: "billed annually", popular: "THE GROWTH SWEET SPOT",
    action: "Let’s talk", note: "Illustrative pricing in USD. Ad spend, third-party tools, and applicable taxes are additional. Final scope and terms are agreed before work begins.",
    plans: [
      { name: "Starter", description: "A focused foundation for your next big move.", monthly: 1500, featured: false, number: "01", features: ["One priority growth channel", "Channel audit & action plan", "Monthly creative refresh", "Monthly performance review", "Dedicated project contact"] },
      { name: "Growth", description: "Connected thinking. Compounding momentum.", monthly: 3500, featured: true, number: "02", features: ["Three connected growth channels", "Strategy & conversion roadmap", "Creative testing every month", "Live reporting dashboard", "Fortnightly strategy sessions", "Dedicated growth strategist"] },
      { name: "Scale", description: "An embedded team for bigger ambitions.", monthly: 6500, featured: false, number: "03", features: ["Full-funnel channel strategy", "Brand, content & performance", "Continuous conversion testing", "Custom reporting & attribution", "Weekly working sessions", "Senior strategic direction"] },
    ],
  },
  team: {
    eyebrow: "11 / GOOD PEOPLE. BIG IDEAS.", heading: ["Meet your next", "favourite collaborators."],
    description: "Strategists, makers, and curious minds. Different perspectives, brought together by a shared love of work that matters.",
    note: "Illustrative team profiles and original character artwork for this concept.",
    people: [
      { name: "Alex Morgan", role: "Strategy Director", initials: "AM", color: "#e5dfff", ink: "#6858a5", detail: "Sees the bigger picture.", shape: 0 },
      { name: "Sam Rivera", role: "Creative Director", initials: "SR", color: "#ffe4d4", ink: "#b46850", detail: "Makes the unexpected click.", shape: 1 },
      { name: "Jamie Chen", role: "Head of Performance", initials: "JC", color: "#e1ece5", ink: "#497a6b", detail: "Turns signals into progress.", shape: 2 },
      { name: "Taylor Brooks", role: "Lead Developer", initials: "TB", color: "#dfe9f7", ink: "#537a9d", detail: "Brings possibility to life.", shape: 3 },
      { name: "Jordan Ellis", role: "Content Strategist", initials: "JE", color: "#f5e4ee", ink: "#996482", detail: "Finds the words that resonate.", shape: 4 },
    ],
  },
  testimonials: {
    eyebrow: "12 / BETTER, TOGETHER", heading: ["Good work gets noticed.", "Great partnerships get felt."],
    description: "The kind of collaboration we believe in: honest conversations, shared ambition, and a team that feels like your own.",
    note: "Sample testimonials written for this concept. These are not verified client endorsements.",
    label: "Partner stories", previous: "Previous testimonial", next: "Next testimonial", hint: "DRAG TO EXPLORE",
    items: [
      { quote: "They understood where we wanted to go — then helped us see how much further we could reach.", name: "Avery James", role: "Founder", company: "Layers", initials: "AJ", topic: "A shared ambition", color: "lavender" },
      { quote: "For the first time, our brand, our website, and our campaigns felt like one connected conversation.", name: "Casey Lee", role: "Marketing Lead", company: "Quotient", initials: "CL", topic: "Everything, connected", color: "peach" },
      { quote: "Clear thinking, thoughtful creative, and a team that made the whole process feel surprisingly simple.", name: "Riley Park", role: "Co-founder", company: "Catalog", initials: "RP", topic: "Clarity at every step", color: "sage" },
      { quote: "Every conversation came back to what mattered for our business. That focus made all the difference.", name: "Drew Walker", role: "Growth Lead", company: "Circooles", initials: "DW", topic: "Progress with purpose", color: "blue" },
    ],
  },
  showreel: {
    eyebrow: "13 / A FEEL FOR WHAT’S POSSIBLE", heading: ["Thinking in motion.", "Made to move you."],
    description: "A little strategy. A little creative alchemy. A whole world of possibilities.",
    posterTitle: ["Ideas", "in good company."], kicker: "THE NEXORA PERSPECTIVE", footer: "STRATEGY × CREATIVITY × PERFORMANCE",
    note: "Showreel poster — film coming soon.", label: "Abstract pastel sculpture with orbiting creative ideas",
  },
  awards: {
    eyebrow: "14 / ALWAYS RAISING THE BAR", heading: "Good work belongs in good company.",
    note: "Illustrative recognition for this concept. Replace with verified awards and press mentions before publishing.",
    items: [{ name: "Awwwards", detail: "Design recognition", year: "2026" }, { name: "The FWA", detail: "Digital craft", year: "2026" }, { name: "CSS Design Awards", detail: "Creative excellence", year: "2026" }, { name: "Design Week", detail: "Industry perspective", year: "2026" }],
  },
  faq: {
    eyebrow: "15 / A LITTLE MORE CLARITY", heading: ["Good questions.", "Straight answers."],
    description: "Wondering how this could work for your business? Here’s a good place to start.",
    contact: "Have something else in mind?", action: "Let’s talk it through",
    items: [
      { question: "What does working with Nexora look like?", answer: "We start with a conversation about your business, audience, and goals. Then we agree a clear scope, success measures, and a working rhythm. You’ll know who’s on your team, what’s happening next, and how the work connects to your priorities." },
      { question: "Can we start with just one service?", answer: "Absolutely. A focused SEO, paid media, brand, content, or website engagement can be a great starting point. We recommend the work that fits your current priorities, with room to connect more channels when it makes sense." },
      { question: "How long does it take to see results?", answer: "Timing depends on your starting point, channel, and goals. Paid campaigns can provide early learning after launch, while organic search and brand-building typically need sustained effort. We agree realistic milestones and review the evidence together; specific outcomes are never guaranteed." },
      { question: "What’s included in the monthly price?", answer: "The plans show possible starting scopes. Your proposal will specify deliverables, channels, reporting, and meeting cadence. Advertising spend, third-party subscriptions, and applicable taxes are separate unless explicitly included in your agreement." },
      { question: "Do you work with our existing team?", answer: "Yes. We can work alongside your in-house marketers, designers, or developers, or support you as an external team. We agree clear responsibilities and keep communication in the tools and rhythm that work for you." },
      { question: "Who owns the creative work and accounts?", answer: "Ownership, licenses, and handover arrangements are set out in your agreement before work begins. Our preferred approach is to work in accounts your business controls and provide a clear handover for agreed deliverables." },
      { question: "What happens after I request a free audit?", answer: "On the finished service, we would review the information you share and confirm whether an audit is a good fit. This website is currently a concept: the form validates your details and demonstrates a success screen, but does not send or store your submission." },
    ],
  },
  audit: {
    eyebrow: "16 / YOUR NEXT CHAPTER STARTS HERE", heading: ["Big possibilities.", "Start with a small hello."],
    description: "Tell us a little about your business. Let’s find the opportunities hiding in plain sight.",
    benefits: ["A fresh perspective on your website", "A closer look at your growth channels", "Practical ideas for your next move"],
    aside: "CURIOUS MINDS. NO PRESSURE.", asideNote: "A useful conversation is always a good place to start.",
    formTitle: "Request your free audit", name: "Your name", email: "Work email", website: "Website URL", budget: "Monthly marketing budget", select: "Choose a range", budgets: ["Under $1,500", "$1,500–$3,500", "$3,500–$6,500", "$6,500+", "Let’s work it out"],
    submit: "Find my next opportunity", demo: "Demo form. Your details stay in this page and are not sent or stored.",
    successTitle: "That’s a great starting point.", successBody: "You’ve completed the demo audit request. Nothing has been sent or saved. When the service goes live, this is where your next chapter begins.", reset: "Try the form again",
    errors: { name: "Please enter your name (at least 2 characters).", nameLength: "Please keep your name under 120 characters.", email: "Please enter a valid email address.", website: "Enter a complete http:// or https:// website URL.", budget: "Please choose a budget range." },
  },
  insights: {
    eyebrow: "17 / A LITTLE FOOD FOR THOUGHT", heading: ["Fresh perspectives.", "For your next move."],
    description: "Useful thinking from the intersection of strategy, creativity, and growth.", read: "Read the insight", close: "Close the insight", note: "Original short reads created for this agency concept.",
    items: [
      { category: "STRATEGY", minutes: "3 MIN READ", title: "Before you chase more traffic, ask a better question.", summary: "More attention only matters when it reaches the right people.", tone: "lavender", symbol: "↗", paragraphs: ["Start with the action you want someone to take. A purchase, an enquiry, and a return visit each call for a different journey. Defining that action helps you decide which audience and channel deserve your attention.", "Then look at the journey you already have. Does the first page make the offer clear? Can people find the evidence they need? Is the next step easy on a small screen? These questions can reveal useful work before you increase your media budget.", "Choose one friction point, make one deliberate change, and agree how you’ll assess it. Growth becomes easier to understand when every experiment answers a clear question."] },
      { category: "BRAND", minutes: "3 MIN READ", title: "Consistency is a creative advantage.", summary: "A recognisable brand gives every new idea a stronger starting point.", tone: "peach", symbol: "✳", paragraphs: ["A brand becomes familiar through the details people meet again and again: a tone of voice, a colour, an attitude, a promise. When those details work together, each interaction adds to the last.", "Consistency doesn’t mean repeating the same execution. It means keeping a clear point of view while exploring different ways to express it. A campaign, a product page, and a welcome email should feel related without feeling identical.", "Write down a small set of principles your team can actually use. Show examples of what each principle looks like in practice. A shared foundation creates more room for confident, distinctive ideas."] },
      { category: "PERFORMANCE", minutes: "3 MIN READ", title: "A useful dashboard tells you what to do next.", summary: "Move from collecting numbers to making clearer decisions.", tone: "sage", symbol: "⌁", paragraphs: ["The most useful report starts with a decision. What needs attention? What deserves more investment? What should we test next? A page full of metrics can hide those questions as easily as it can answer them.", "Keep a small set of measures connected to your goals. Add context: the comparison period, the source, and anything that changed in the business. Be explicit about attribution limits and avoid treating every movement as a causal result.", "Finish each review with an observation, a hypothesis, and an action. That simple rhythm turns reporting into a working conversation about progress."] },
    ],
  },
  finalCta: {
    eyebrow: "HERE’S TO WHAT’S NEXT", heading: ["Your ambition.", "Our next obsession."], description: "Bring the big idea. The tricky question. The what-if. We’ll bring the curiosity, the craft, and the commitment.", action: "Let’s make something matter", note: "GOOD PEOPLE. BIG POSSIBILITIES.",
  },
  footer: {
    message: "Strategy, creativity, and a little extraordinary.", navigationLabel: "Explore", connectLabel: "Connect", newsletterTitle: "A fresh perspective, occasionally.", newsletterDescription: "Ideas worth making room for in your inbox.", emailLabel: "Your email address", subscribe: "Join the list", newsletterNote: "Demo signup. No email is sent or stored.", newsletterSuccess: "Demo complete. You haven’t been subscribed.", newsletterReset: "Try another email", copyright: "Nexora. A digital agency concept.", back: "Back to top", location: "INDEPENDENT MINDS. CONNECTED EVERYWHERE.", socialNote: "Social profiles will be connected at launch.",
    links: [{ label: "Our approach", href: "#about" }, { label: "Services", href: "#services" }, { label: "Selected work", href: "#work" }, { label: "Our people", href: "#team" }, { label: "Insights", href: "#insights" }, { label: "Get in touch", href: "#audit" }],
    socials: ["Instagram", "LinkedIn", "Behance"],
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
    { selector: "#pricing", x: -3, y: 0, scale: 0.6, rotation: 8.5, morph: 0.08, color: 0.4, opacity: 0.02, cameraZ: 9.6 },
    { selector: "#team", x: 3, y: 0, scale: 0.7, rotation: 9, morph: 0.1, color: 0.6, opacity: 0.05, cameraZ: 9.6 },
    { selector: "#testimonials", x: -3, y: 0, scale: 0.7, rotation: 9.5, morph: 0.08, color: 0.3, opacity: 0.03, cameraZ: 9.6 },
    { selector: "#showreel", x: 0, y: 0, scale: 0.8, rotation: 10, morph: 0.12, color: 0.7, opacity: 0.04, cameraZ: 9.6 },
    { selector: "#awards", x: 3, y: 0, scale: 0.7, rotation: 10.5, morph: 0.1, color: 0.4, opacity: 0.03, cameraZ: 9.6 },
    { selector: "#faq", x: 3, y: 0, scale: 0.7, rotation: 11, morph: 0.08, color: 0.4, opacity: 0.02, cameraZ: 9.6 },
    { selector: "#audit", x: 3, y: 0, scale: 0.7, rotation: 11.5, morph: 0.08, color: 0.6, opacity: 0.02, cameraZ: 9.6 },
    { selector: "#insights", x: -3, y: 0, scale: 0.7, rotation: 12, morph: 0.1, color: 0.3, opacity: 0.05, cameraZ: 9.6 },
    { selector: "#contact", x: 0, y: 1, scale: 0.9, rotation: 13, morph: 0.15, color: 0.7, opacity: 0.7, cameraZ: 9 },
    { selector: "#footer", x: 0, y: 1.5, scale: 0.7, rotation: 14, morph: 0.1, color: 0.4, opacity: 0.08, cameraZ: 9.6 },
  ],
} as const;
```

### lib/validation.ts

```ts
import { z } from "zod";
import { config } from "@/lib/config";
export const auditSchema = z.object({
  name: z.string().trim().min(2, config.audit.errors.name).max(120, config.audit.errors.nameLength),
  email: z.string().trim().email(config.audit.errors.email).max(254, config.audit.errors.email),
  website: z.string().trim().url(config.audit.errors.website).refine(value => { try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; } }, config.audit.errors.website),
  budget: z.string().refine(value => config.audit.budgets.some(budget => budget === value), config.audit.errors.budget),
});
export type AuditValues = z.infer<typeof auditSchema>;
```

### components/ui/Accordion.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function refresh() { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => ScrollTrigger.refresh()); }
  return <div className="accordion">{items.map((item, index) => <details key={item.question} onToggle={refresh}><summary><span className="accordion-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className="accordion-plus" aria-hidden="true">+</span></summary><div className="accordion-answer"><p>{item.answer}</p></div></details>)}</div>;
}
```

### components/ui/Newsletter.tsx

```tsx
"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { config } from "@/lib/config";
export function Newsletter() {
  const data = config.footer;
  const [done, setDone] = useState(false);
  const message = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (done) message.current?.focus({ preventScroll: true }); }, [done]);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); event.currentTarget.reset(); setDone(true); }
  return <div className="newsletter"><h3>{data.newsletterTitle}</h3><p>{data.newsletterDescription}</p>{done ? <div ref={message} tabIndex={-1} role="status" className="newsletter-success"><p>{data.newsletterSuccess}</p><button onClick={() => { setDone(false); requestAnimationFrame(() => input.current?.focus()); }}>{data.newsletterReset} ↗</button></div> : <form onSubmit={submit} aria-describedby="newsletter-note"><label htmlFor="newsletter-email" className="sr-only">{data.emailLabel}</label><div className="newsletter-input"><input ref={input} id="newsletter-email" name="email" type="email" autoComplete="email" placeholder={data.emailLabel} required maxLength={254}/><button type="submit" aria-label={data.subscribe}>↗</button></div><p id="newsletter-note">{data.newsletterNote}</p></form>}</div>;
}
```

### components/three/Scene.tsx

```tsx
"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HeroObject } from "./HeroObject";
import { CameraRig, type SceneState } from "./CameraRig";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
    const driver = { progress: 0 };
    const keys = ["x", "y", "scale", "rotation", "morph", "color", "opacity", "cameraZ"] as const;
    let maxScroll = 1;
    let stops: { start: number; end: number; frame: SceneState }[] = [];
    function render() {
      const scroll = driver.progress * maxScroll;
      let previous: SceneState = config.scene[0];
      Object.assign(state.current, previous);
      for (const stop of stops) {
        if (scroll < stop.start) break;
        const progress = Math.min(1, Math.max(0, (scroll - stop.start) / (stop.end - stop.start)));
        for (const key of keys) state.current[key] = previous[key] + (stop.frame[key] - previous[key]) * progress;
        if (progress < 1) break;
        previous = stop.frame;
      }
    }
    function measure() {
      maxScroll = Math.max(1, ScrollTrigger.maxScroll(window));
      let previousEnd = 0;
      stops = config.scene.slice(1).flatMap(frame => {
        const element = document.querySelector(frame.selector);
        if (!element) return [];
        const top = element.getBoundingClientRect().top + window.scrollY;
        const start = Math.max(previousEnd, top - window.innerHeight);
        const end = Math.max(start + 1, top - window.innerHeight * .25);
        previousEnd = end;
        return [{ start, end, frame }];
      });
      render();
    }
    // One scrubbed driver owns the shared state, including after pin/viewport refreshes.
    const ctx = gsap.context(() => {
      measure();
      gsap.to(driver, { progress: 1, ease: "none", onUpdate: render, scrollTrigger: { start: 0, end: "max", scrub: 1.12, onRefresh: measure } });
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

### components/sections/Awards.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
export function Awards() {
  const data = config.awards;
  return <Section id="awards" className="awards section-container batch-section"><div className="awards-heading" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="awards-heading">{data.heading}</h2></div><ul className="awards-strip">{data.items.map(item => <li key={item.name} data-reveal><span className="award-symbol" aria-hidden="true">✳</span><h3>{item.name}</h3><p>{item.detail}<span>{item.year}</span></p></li>)}</ul><p className="section-disclosure">{data.note}</p></Section>;
}
```

### components/sections/FAQ.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
export function FAQ() {
  const data = config.faq;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <Section id="faq" className="faq section-container batch-section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/><div className="faq-layout"><div className="faq-intro" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="faq-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p>{data.description}</p><div className="faq-contact"><p>{data.contact}</p><a href="#audit">{data.action}<span aria-hidden="true"> ↗</span></a></div></div><Accordion items={data.items}/></div></Section>;
}
```

### components/sections/AuditForm.tsx

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@/lib/config";
import { auditSchema, type AuditValues } from "@/lib/validation";
import { Section } from "@/components/ui/Section";
import { Arrow } from "@/components/ui/Button";
import { ScrollTrigger } from "@/lib/gsap";
export function AuditForm() {
  const data = config.audit;
  const [success, setSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } = useForm<AuditValues>({ resolver: zodResolver(auditSchema), defaultValues: { name: "", email: "", website: "", budget: "" } });
  useEffect(() => {
    if (success) successRef.current?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [success]);
  function submit() { reset(); setSuccess(true); }
  function restart() { setSuccess(false); requestAnimationFrame(() => setFocus("name")); }
  return <Section id="audit" className="audit section-container batch-section"><div className="audit-layout"><div className="audit-copy" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="audit-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="audit-description">{data.description}</p><ul>{data.benefits.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><div className="audit-aside"><span aria-hidden="true">✳</span><div><p className="eyebrow">{data.aside}</p><p>{data.asideNote}</p></div></div></div><div className="audit-panel">{success ? <div ref={successRef} tabIndex={-1} className="audit-success" role="status"><span className="success-mark" aria-hidden="true">✓</span><h3>{data.successTitle}</h3><p>{data.successBody}</p><button className="button button-secondary" onClick={restart}>{data.reset}<Arrow/></button></div> : <form onSubmit={handleSubmit(submit)} noValidate aria-labelledby="audit-form-title" aria-describedby="audit-demo"><h3 id="audit-form-title">{data.formTitle}</h3><div className="form-field"><label htmlFor="audit-name">{data.name}</label><input id="audit-name" autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")}/>{errors.name && <p id="name-error" className="field-error" role="alert">{errors.name.message}</p>}</div><div className="form-field"><label htmlFor="audit-email">{data.email}</label><input id="audit-email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")}/>{errors.email && <p id="email-error" className="field-error" role="alert">{errors.email.message}</p>}</div><div className="form-field"><label htmlFor="audit-website">{data.website}</label><input id="audit-website" type="url" autoComplete="url" placeholder="https://" required aria-invalid={!!errors.website} aria-describedby={errors.website ? "website-error" : undefined} {...register("website")}/>{errors.website && <p id="website-error" className="field-error" role="alert">{errors.website.message}</p>}</div><div className="form-field"><label htmlFor="audit-budget">{data.budget}</label><select id="audit-budget" required aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-error" : undefined} {...register("budget")}><option value="">{data.select}</option>{data.budgets.map(budget => <option key={budget} value={budget}>{budget}</option>)}</select>{errors.budget && <p id="budget-error" className="field-error" role="alert">{errors.budget.message}</p>}</div><button className="button button-primary audit-submit" type="submit" disabled={isSubmitting}><span>{data.submit}</span><Arrow diagonal/></button><p id="audit-demo" className="form-note">{data.demo}</p></form>}</div></div></Section>;
}
```

### components/sections/Insights.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { ScrollTrigger } from "@/lib/gsap";
export function Insights() {
  const data = config.insights;
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function refresh() { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => ScrollTrigger.refresh()); }
  return <Section id="insights" className="insights section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="insights-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="insights-grid">{data.items.map(item => <article className="insight-card" key={item.title} data-reveal><div className={`insight-art tone-${item.tone}`} aria-hidden="true"><span>{item.symbol}</span><i/><i/></div><div className="insight-copy"><p className="insight-meta"><span>{item.category}</span><span>{item.minutes}</span></p><h3>{item.title}</h3><p>{item.summary}</p><details onToggle={refresh}><summary><span className="insight-open">{data.read}</span><span className="insight-close">{data.close}</span><span aria-hidden="true">↗</span></summary><div className="insight-body">{item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details></div></article>)}</div><p className="section-disclosure">{data.note}</p></Section>;
}
```

### components/sections/FinalCTA.tsx

```tsx
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
export function FinalCTA() {
  const data = config.finalCta;
  return <Section id="contact" className="final-cta batch-section"><div className="final-glow" aria-hidden="true"/><div className="final-cta-content" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="contact-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="final-description">{data.description}</p><Button href="#audit" className="final-button">{data.action}</Button><p className="final-note">{data.note}</p></div></Section>;
}
```

### components/sections/Footer.tsx

```tsx
import { config } from "@/lib/config";
import { Brand } from "@/components/ui/Brand";
import { Newsletter } from "@/components/ui/Newsletter";
export function Footer() {
  const data = config.footer;
  return <footer id="footer" className="footer"><div className="section-container"><div className="footer-top"><div className="footer-brand"><a href="#hero" aria-label={`${config.name} home`}><Brand/></a><p>{data.message}</p></div><nav aria-label={data.navigationLabel}><h3>{data.navigationLabel}</h3><ul>{data.links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul></nav><div className="footer-connect"><h3>{data.connectLabel}</h3><a href={`mailto:${config.email}`}>{config.email}</a><ul aria-label={data.socialNote}>{data.socials.map(social => <li key={social}><span>{social}</span><span aria-hidden="true">↗</span></li>)}</ul><p>{data.socialNote}</p></div><Newsletter/></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {data.copyright}</p><a href="#hero">{data.back}<span aria-hidden="true"> ↑</span></a></div><p className="footer-wordmark" aria-hidden="true">{config.name.toLowerCase()}<span>®</span></p><p className="footer-location">{data.location}</p></div></footer>;
}
```

## Verification

ESLint and the Webpack production build, including TypeScript, pass. Browser checks verified all four audit validation errors, rejection of non-HTTP URLs, successful mock submission, focus management and reset; keyboard FAQ expansion and seven matching JSON-LD entries; complete insight expansion; newsletter demo feedback; and mobile form/footer layouts at 360px without horizontal overflow. The closing 3D object was visually verified centered after the scene fix. One persistent canvas is retained. Lighthouse has not been measured.

## Remaining launch content

All 22 requested sections are assembled. The supplied logo remains deferred. Team profiles, metrics, testimonials, prices, and recognition are labeled illustrative and need approved business content before launch. Social destinations and contact details need real values in config. The audit and newsletter are local demonstrations with no backend or storage. The showreel remains a poster as requested.
