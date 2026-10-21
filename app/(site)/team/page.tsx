import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { PageImage } from "@/components/pages/PageImage";
import { Team } from "@/components/sections/Team";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("Our team", "Explore the roles that connect strategy, design, development, content, and marketing at AR Digital Marketing.", "/team");
export default function TeamPage() {
  return <div className="team-page"><PageIntro label="Our team" title="One Team, Shared Direction" description="Strategy, design, development, and marketing working toward the same goal. Explore the skills we bring together around your project." /><PageImage imageKey="team"/><div id="page-content"><Team /></div>
    <section className="inner-section section-container team-working"><div className="bespoke-heading"><h2><BrandHeading text="Working Together" /></h2><p>Know what’s happening, who to speak to, and what comes next.<br />We make room for useful feedback throughout the project.</p></div><div>{[["A clear point of contact", "Know who is coordinating the work and where to bring your questions."], ["Useful reviews", "See work at agreed milestones and give feedback with the right context."], ["A connected handover", "Receive the agreed files, documentation, and walkthroughs to keep things moving."]].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section><PageCTA title="Put the Right Skills Around Your Project" /></div>;
}
