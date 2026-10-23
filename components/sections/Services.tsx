import Image from "next/image";
import styles from "./ServiceCardImages.module.css";
import Link from "next/link";
import { siteFeatures } from "@/lib/config";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
export function Services() {
  const items = [
    { slug: "seo", name: "SEO & Local Search", tagline: "Be there when customers search.", description: "Technical SEO, useful content, and local visibility that help the right people discover your business." },
    { slug: "ads", name: "Google & Meta Ads", tagline: "Put your budget behind intent.", description: "Focused paid campaigns, audience targeting, and creative testing built around qualified enquiries." },
    { slug: "branding", name: "Social Media Marketing", tagline: "Give people a reason to follow.", description: "A clear content strategy, consistent publishing, and community conversations that build recognition." },
    { slug: "apps", name: "Landing Pages & Conversion", tagline: "Make the next click count.", description: "Focused pages, clearer offers, and simpler enquiry journeys that help turn interest into action." },
    { slug: "content", name: "Content & Creative", tagline: "Make your message matter.", description: "Campaign copy, social creative, reels, and video that speak to your audience at the right moment." },
    { slug: "automation", name: "Analytics & Optimisation", tagline: "Know what to improve next.", description: "Conversion tracking and clear reporting that connect campaign decisions to your business goals." },
  ];
  const destinations: Record<string, string> = { seo: "digital-marketing", ads: "digital-marketing", branding: "digital-marketing", apps: "web-development", content: "video-editing", automation: "digital-marketing" };
  const images: Record<string, { src: string; alt: string }> = {
    seo: { src: "/images/services/seo-search.jpg", alt: "Google search engine displayed on a screen" },
    ads: { src: "/images/services/campaign-performance.jpg", alt: "Performance graph displayed on a laptop" },
    branding: { src: "/images/services/social-apps.jpg", alt: "Social media applications displayed on a smartphone" },
    apps: { src: "/images/inner-premium/web-development.webp", alt: "Responsive website on a laptop and phone" },
    content: { src: "/images/services/video-editing.jpg", alt: "Video editing timeline displayed on a studio monitor" },
    automation: { src: "/images/home/analytics.webp", alt: "Marketing analytics reports and dashboards" },
  };
  return <Section id="services" className="services section-container batch-section">
    <div className="section-heading" data-reveal><div><h2 id="services-heading">Your growth. <span>Our focus.</span></h2><p className="section-description">Find your audience. Earn their attention. Make it easier to choose you.<br className="description-break"/>{" "}Connected marketing services, built around your next business goal.</p></div></div>
    <div className="services-grid">{items.map((service, index) => <div key={service.slug} className={`service-slot service-slot-${index}`} data-reveal><Card className={`service-card service-${service.slug} ${styles.card}`} tilt={false}>
      <div className={`${styles.image} ${index < 2 ? styles.featured : ""}`}><Image src={images[service.slug].src} alt={images[service.slug].alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"/></div>
      <div className="service-copy"><h3>{service.name}</h3><p className="service-tagline">{service.tagline}</p><p className="service-description">{service.description}</p></div>
      <Link className="card-action" href={siteFeatures.servicePages ? `/services/${destinations[service.slug] ?? "web-development"}` : "#audit"} aria-label={`${siteFeatures.servicePages ? "Explore" : "Ask about"} ${service.name}`}/>
    </Card></div>)}</div>
    {siteFeatures.servicePages && <Link className="all-services-link" href="/services">Explore our full range of services</Link>}
  </Section>;
}
