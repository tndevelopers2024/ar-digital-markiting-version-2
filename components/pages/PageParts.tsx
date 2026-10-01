import Link from "next/link";
import { Button, Arrow } from "@/components/ui/Button";
import Image from "next/image";
import { innerPageImages } from "@/lib/config";
const introPages = {
 "About us": { key: "about", action: "How we work", note: "Design, development, and marketing. One connected team." },
 "Our team": { key: "team", action: "Meet the team", note: "Different skills. A shared commitment to good work." },
 "Contact us": { key: "contact", action: "Start your enquiry", note: "Bring your ideas. We’ll help you shape the next step." },
 "Campaigns": { key: "projects", action: "Browse campaigns", note: "Search · Advertising · Social · Customer retention" },
 "Blogs": { key: "blogs", action: "Read the blogs", note: "Practical advice on websites, brands, and marketing." },
} as const;
export function PageIntro({label,title,description}:{label:string;title:string;description:string}) {
 const page=introPages[label as keyof typeof introPages];
 const photo=innerPageImages[page.key];
 return <header className={`inner-intro route-intro route-intro-${page.key} section-container`}>
  <nav className="service-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span></nav>
  <div className="route-intro-layout">
   <div className="route-intro-copy"><h1>{title}</h1><p className="route-intro-description">{description}</p><div className="route-intro-actions"><Button href="#page-content">{page.action}</Button>{page.key==='about'&&<Link href="/team" className="text-link">Meet our people <Arrow/></Link>}</div></div>
   <figure className="route-intro-visual"><div className="route-intro-photo"><Image src={photo.src} alt={photo.alt} fill sizes={page.key==='projects'||page.key==='team'?"90vw":"(max-width: 767px) 100vw, 50vw"} preload/></div><figcaption><span>{page.note}</span><small>Illustrative imagery · AI-created</small></figcaption></figure>
  </div>
 </header>;
}
export function PageCTA({title="Tell us what you have in mind."}:{title?:string}) {
 return <section className="service-page-cta signature-cta section-container"><div className="final-glow" aria-hidden="true"/><h2>{title}</h2><p>A clear conversation is a good place to start.</p><Button href="/contact" className="final-button">Discuss your project</Button><p className="signature-cta-note">GOOD PEOPLE. BIG POSSIBILITIES.</p></section>;
}
