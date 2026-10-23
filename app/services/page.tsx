import { BrandHeading } from "@/components/ui/BrandHeading";
import { PageHero } from "@/components/pages/PageHero";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { config, servicePages, siteFeatures, serviceCardImages } from "@/lib/config";
import { Button } from "@/components/ui/Button";
export const metadata: Metadata = { title: `Our Services | ${config.name}`, description: "Explore our website, design, app, marketing, AI, and testing services. Find the right support for your business.", alternates:{canonical:"/services"}, openGraph:{title:`Our Services | ${config.name}`,description:"Design, development, and digital marketing for your business.",url:"/services"} };
export default function ServicesPage() {
  if (!siteFeatures.servicePages) notFound();
  return <><PageHero title="Our Services" description="Design, development, and digital marketing built around your goals. Start with one service or bring them together with one connected team." breadcrumbs={[{label:"Services"}]}/><section id="service-directory" className="section-container service-directory" aria-labelledby="service-list-heading"><div className="service-list-header"><h2 id="service-list-heading"><BrandHeading text="Find Your Service"/></h2><span>10 ways we can help</span></div><div className="service-directory-grid">{servicePages.map((service,index)=><Link href={`/services/${service.slug}`} className="service-directory-card service-directory-photo-card" key={service.slug}><div className="directory-card-image"><Image src={serviceCardImages[service.slug].src} alt={serviceCardImages[service.slug].alt} fill sizes="(max-width: 767px) 100vw, 45vw"/></div><div className="directory-card-copy"><div className="directory-card-top"><span>{String(index+1).padStart(2,'0')}</span></div><h3>{service.name}</h3><p>{service.description}</p><span className="directory-card-link">Explore service</span></div></Link>)}</div></section><section className="service-page-cta section-container"><h2><BrandHeading text="Not Sure Where to Start?"/></h2><p>Tell us what you want to improve. We’ll help you choose the next step.</p><Button href="/contact">Tell us about your business</Button></section></>;
}
