import Image from "next/image";
import styles from "./ServiceCardImages.module.css";
import Link from "next/link";
import { config, siteFeatures } from "@/lib/config";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
export function Services() {
  const data = config.servicesSection;
  const destinations: Record<string, string> = { seo: "digital-marketing", ads: "web-development", branding: "branding-strategy", apps: "mobile-app-development", content: "video-editing", automation: "ai-development" };
  const images: Record<string, { src: string; alt: string }> = {
    seo: { src: "/images/home/what-is-seo.webp", alt: "Search engine optimization overview" },
    ads: { src: "/images/home/ecommerce-website-features.jpg", alt: "E-commerce website features overview" },
    branding: { src: "/images/home/uiux-user-research.jpg", alt: "User research in UI and UX design" },
    apps: { src: "/images/home/mobile-apps-development.png", alt: "Mobile apps development on a digital interface" },
    content: { src: "/images/home/animation-motion-design.png", alt: "Animation and motion design" },
    automation: { src: "/images/home/ai-scalability.jpg", alt: "AI technology and scalability" },
  };
  return <Section id="services" className="services section-container batch-section">
    <div className="section-heading" data-reveal><div><h2 id="services-heading">Our <span>Services</span></h2><p className="section-description">Design, development, and marketing shaped around your goals.<br className="description-break"/>{" "}Find the right support for your next stage of growth.</p></div></div>
    <div className="services-grid">{data.items.map((service, index) => <div key={service.slug} className={`service-slot service-slot-${index}`} data-reveal><Card className={`service-card service-${service.slug} ${styles.card}`} tilt={false}>
      <div className={`${styles.image} ${index < 2 ? styles.featured : ""}`}><Image src={images[service.slug].src} alt={images[service.slug].alt} fill sizes={index < 2 ? "(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 60vw" : "(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw"}/></div>
      <div className="service-copy"><h3>{service.name}</h3><p className="service-tagline">{service.tagline}</p><p className="service-description">{service.description}</p></div>
      <Link className="card-action" href={siteFeatures.servicePages ? `/services/${destinations[service.slug] ?? "web-development"}` : "#audit"} aria-label={`${siteFeatures.servicePages ? "Explore" : "Ask about"} ${service.name}`}/>
    </Card></div>)}</div>
    {siteFeatures.servicePages && <Link className="all-services-link" href="/services">Explore all 10 services</Link>}
  </Section>;
}
