import { BrandHeading } from "@/components/ui/BrandHeading";
import { PageHero } from "@/components/pages/PageHero";
import { PageImage } from "@/components/pages/PageImage";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { config, servicePages, siteFeatures } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceDetails } from "@/components/services/ServiceDetails";
import { serviceExperiences } from "@/components/services/ServiceExperience";
type Props = { params: Promise<{slug:string}> };
export function generateStaticParams() { return siteFeatures.servicePages ? servicePages.map(service=>({slug:service.slug})) : []; }
export const dynamicParams = false;
export async function generateMetadata({params}:Props):Promise<Metadata> {
  if (!siteFeatures.servicePages) notFound();
  const {slug}=await params; const service=servicePages.find(item=>item.slug===slug); if(!service) notFound();
  return {title:`${service.name} | ${config.name}`,description:service.description,alternates:{canonical:`/services/${slug}`},openGraph:{title:`${service.name} | ${config.name}`,description:service.description,url:`/services/${slug}`},twitter:{card:"summary_large_image",title:`${service.name} | ${config.name}`,description:service.description}};
}
export default async function ServicePage({params}:Props) {
  if (!siteFeatures.servicePages) notFound();
  const {slug}=await params; const service=servicePages.find(item=>item.slug===slug); if(!service) notFound();
  const experience=serviceExperiences[service.slug];
  const {Content}=experience;
  const related=experience.related.map(slug=>servicePages.find(item=>item.slug===slug)!);
  const schema={"@context":"https://schema.org","@type":"Service",name:service.name,description:service.description,url:`${config.url}/services/${slug}`,provider:{"@type":"Organization",name:config.name,url:config.url}};
  return <div className={`bespoke-page bespoke-${experience.layout}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <PageHero imageKey={slug} title={service.name} description={service.description} breadcrumbs={[{label:"Services",href:"/services"},{label:service.name}]}/>
    <PageImage imageKey={service.slug}/>
    <section id="service-details" className="bespoke-section section-container" aria-labelledby="service-scope-heading"><div className="bespoke-heading"><h2 id="service-scope-heading"><BrandHeading text="How We Can Help"/></h2><p>Choose the support that fits your priorities. We agree on the deliverables, timeline, and responsibilities before work begins.</p></div><div className="service-scope-grid">{service.features.map(feature=><article key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></section>
    <Content/>
    <ServiceDetails slug={service.slug} />
    <section className="service-faq section-container" aria-labelledby="service-faq-heading"><div className="service-page-section-heading"><h2 id="service-faq-heading"><BrandHeading text="Frequently Asked Questions"/></h2><p>Need more details? <Link href="/contact">Talk to our team</Link></p></div><Accordion items={service.faqs} openOnHover/></section>
    <section className="service-related section-container" aria-labelledby="related-heading"><div className="service-list-header"><h2 id="related-heading"><BrandHeading text="Related Services"/></h2><Link href="/services">All services</Link></div><div className="service-related-grid">{related.map(item=><Link key={item.slug} href={`/services/${item.slug}`}><h3>{item.name}</h3></Link>)}</div></section>
    <section className="service-page-cta section-container"><h2><BrandHeading text={experience.cta}/></h2><p>Tell us what you have in mind. We’ll help turn it into a clear plan.</p><Button href="/contact">{experience.button}</Button></section>
  </div>;
}
