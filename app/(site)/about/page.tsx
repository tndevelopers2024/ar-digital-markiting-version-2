import Image from "next/image";
import Link from "next/link";
import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("About us", "Get to know AR Digital Marketing: connected design, development, and marketing with clear communication.", "/about");

export default function AboutPage() {
  return <>
    <PageIntro label="About us" title="About AR Digital Marketing" description="One team connecting your brand, website, and marketing. We turn your goals into a clear plan and keep you involved from the first conversation to launch." />
    <section id="page-content" className="inner-section section-container about-overview">
      <div><h2><BrandHeading text="Your Business Comes First" /></h2><p>A website, a brand, and a campaign serve the same business. We look at how they work together, so your customers have a clear experience from their first impression to their next conversation.</p><p>We start by listening: what you offer, who you want to reach, and what you want to improve. Then we agree on priorities, explain the options, and build a plan you can follow.</p><Link href="/services" className="inner-text-link">Explore our services</Link></div>
      <div className="about-overview-photo"><Image src="/images/inner-premium/team-studio.webp" alt="Illustrative creative team reviewing project layouts in a bright studio" fill sizes="(max-width: 767px) 100vw, 40vw" /></div>
    </section>
    <HowWeWork />
    <section className="inner-section section-container">
      <div className="bespoke-heading"><h2><BrandHeading text="What You Can Expect" /></h2><p>Clear communication and a shared understanding of the work.<br />Practical support from planning through delivery.</p></div>
      <div className="about-values">{[["01", "Plain language", "Understand what we recommend, what it involves, and what happens next."], ["02", "A shared direction", "Design, technology, and marketing decisions support the same business goal."], ["03", "Thoughtful delivery", "Review the work at agreed milestones, with space for testing and feedback."], ["04", "Room to improve", "Agree on a useful handover and the support you need after launch."]].map(([, title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="inner-section section-container about-next"><div><h2><BrandHeading text="Get to Know Us" /></h2><p className="section-description">Explore the skills behind the work and the ideas we share.</p></div><Link href="/team">Meet our team</Link><Link href="/blogs">Read our blogs</Link></section>
    <PageCTA title="Let’s Plan Your Next Step" />
  </>;
}
