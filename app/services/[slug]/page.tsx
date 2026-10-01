import { PageImage } from "@/components/pages/PageImage";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { config, servicePages, siteFeatures } from "@/lib/config";
import { Button, Arrow } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
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
  const {Artwork,Content}=experience;
  const related=experience.related.map(slug=>servicePages.find(item=>item.slug===slug)!);
  const schema={"@context":"https://schema.org","@type":"Service",name:service.name,description:service.description,url:`${config.url}/services/${slug}`,provider:{"@type":"Organization",name:config.name,url:config.url}};
  return <div className={`bespoke-page bespoke-${experience.layout}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <section className="service-page-hero section-container"><nav className="service-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span></nav><div className="service-detail-hero"><div><h1>{service.heading.split(". ").map((part,i,parts)=><span className="service-title-part" key={part}>{part}{i<parts.length-1?".":""}</span>)}</h1><p className="service-page-lead">{service.description}</p><div className="service-page-actions"><Button href="/contact">Discuss your project</Button><Link className="text-link" href="#service-details">Explore this service <Arrow/></Link></div></div><div className="bespoke-hero-art"><Artwork/></div></div></section>
    <PageImage imageKey={service.slug}/><div id="service-details"><Content/></div>
    <section className="service-faq section-container" aria-labelledby="service-faq-heading"><div className="service-page-section-heading"><h2 id="service-faq-heading">About {service.name.toLowerCase()}</h2><p>Need more details? <Link href="/contact">Talk to our team ↗</Link></p></div><Accordion items={service.faqs}/></section>
    <section className="service-related section-container" aria-labelledby="related-heading"><div className="service-list-header"><h2 id="related-heading">You may also need</h2><Link href="/services">All services ↗</Link></div><div className="service-related-grid">{related.map(item=><Link key={item.slug} href={`/services/${item.slug}`}><h3>{item.name}</h3><Arrow diagonal/></Link>)}</div></section>
    <section className="service-page-cta section-container"><h2>{experience.cta}</h2><p>Tell us what you have in mind. We’ll help turn it into a clear plan.</p><Button href="/contact">{experience.button}</Button></section>
  </div>;
}
