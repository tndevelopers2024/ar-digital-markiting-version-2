# AR Digital Marketing — brand and content update

The existing 22-section home-page structure, grids, card geometry, typography, and interaction patterns are retained.

## Identity

- Selected palette: red and blue.
- Primary blue: #245BA7; red: #D62832; supporting pale blue and blush surfaces.
- Original supplied logo: public/brand/ar-logo.png, copied without altering the artwork from AR_logo_transperant.png.
- The SVG viewport in Brand.tsx excludes the source image's transparent padding; it does not redraw the mark.
- Navigation, loader, comparison, dashboard, footer, favicon, metadata, and social preview use the AR identity.
- The 3D object, charts, buttons, gradients, highlights, and accent surfaces use the revised palette.

## Content adaptation

Reference: https://www.techienutpam.com/
Service detail: https://www.techienutpam.com/services
Supporting references: https://www.techienutpam.com/about and https://www.techienutpam.com/services/web-development-company-chennai

The public source's service and delivery themes informed original AR copy for the hero, positioning, service bento, comparison, industries, process, FAQ, audit introduction, and closing CTA. Its wider service catalog is grouped into the existing six cards: Digital Marketing & SEO; Web & E-Commerce; Branding & UI/UX; Mobile App Development; Content & Motion; AI & Automation. Quality assurance is included in the four-step process.

The source agency's client names, case studies, statistics, team identities, contact information, and testimonials have not been presented as AR's credentials. Existing concept projects and illustrative evidence remain labeled. AR's real domain, email, social destinations, approved client evidence, team details, and live form connections are still needed before launch.

## Configuration and files

Copy and brand information: lib/config.ts.
Theme: app/globals.css.
Logo presentation: components/ui/Brand.tsx.
3D palette: components/three/HeroObject.tsx and Scene.tsx.
Metadata artwork: app/icon.svg and app/opengraph-image.tsx.
Updated components: Services, WhyChooseUs, GrowthDashboard, Process, Hero, Footer, Loader; shared easing in lib/gsap.ts.

Historical BATCH-1.md through BATCH-5.md record earlier versions. Current workspace files are authoritative for the AR version.

## Verification

ESLint and the Webpack production build (including TypeScript) pass. Desktop and 360px mobile checks confirm the original section count, six service cards, AR metadata, original logo placement, and no horizontal page overflow. The headline remains three lines at the narrow breakpoint. Lighthouse has not been measured.
