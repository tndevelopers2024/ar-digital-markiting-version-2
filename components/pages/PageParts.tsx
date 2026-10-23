import { BrandHeading } from "@/components/ui/BrandHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "./PageHero";
export function PageIntro({label,title,description}:{label:string;title:string;description:string}) {
 const images: Record<string,string> = { "About us":"about", "Our team":"team", "Contact us":"contact", "Campaigns":"projects", "Portfolio":"portfolio", "Blogs":"blogs", "Privacy policy":"privacy", "Terms & conditions":"terms", "Terms and conditions":"terms" };
 return <PageHero imageKey={images[label] ?? "services"} title={title} description={description} breadcrumbs={[{label}]}/>;
}
export function PageCTA({title="Tell us what you have in mind."}:{title?:string}) {
 return <section className="service-page-cta signature-cta section-container"><h2><BrandHeading text={title}/></h2><p>Bring your goals. We’ll help you shape the scope, priorities, and next step.</p><Button href="/contact">Discuss your project</Button></section>;
}
