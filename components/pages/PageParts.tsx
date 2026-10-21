import { BrandHeading } from "@/components/ui/BrandHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "./PageHero";
export function PageIntro({label,title,description}:{label:string;title:string;description:string}) {
 return <PageHero title={title} description={description} breadcrumbs={[{label}]}/>;
}
export function PageCTA({title="Tell us what you have in mind."}:{title?:string}) {
 return <section className="service-page-cta signature-cta section-container"><div className="final-glow" aria-hidden="true"/><h2><BrandHeading text={title}/></h2><p>A clear conversation is a good place to start.</p><Button href="/contact" className="final-button">Discuss your project</Button></section>;
}
