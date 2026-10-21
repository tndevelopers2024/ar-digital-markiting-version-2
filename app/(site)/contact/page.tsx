import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { ContactForm } from "@/components/pages/ContactForm";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";
export const metadata = pageMetadata("Contact us", "Tell AR Digital Marketing about your website, brand, app, or marketing project. Start with a clear brief and find your next step.", "/contact");
export default function ContactPage() {
  return <><PageIntro label="Contact us" title="Let’s Talk About Your Project" description="You don’t need a finished brief to get started. Tell us what you have, what you want to improve, and where you need help." />
    <section id="page-content" className="section-container contact-page-layout"><aside><h2><BrandHeading text="Start With Your Goals" /></h2><p className="section-description">A little context helps us make the first conversation useful. Share what you know; we can work through the details together.</p><ol>{[["Your business", "What you offer and who you want to reach."], ["Your goal", "What you would like the project to change."], ["Your priorities", "Any timelines, budget range, or existing work to consider."]].map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol><Link href="/services" className="inner-text-link">Explore our services</Link>{site.email && <p className="contact-email">Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a></p>}<div className="inner-contact-photo"><Image src="/images/inner-premium/team-studio.webp" alt="Illustrative creative consultation in a welcoming studio" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 40vw"/></div></aside><ContactForm /></section>
    <section className="section-container contact-next"><div><h2><BrandHeading text="What Happens Next" /></h2></div><p>We review your enquiry, discuss a suitable scope, and explain the proposed work. You’ll have a clear view of the priorities, timing, and next steps before a project begins.</p></section>
  </>;
}
