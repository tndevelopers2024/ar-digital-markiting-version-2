import Link from "next/link";
import { config } from "@/lib/config";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
export function Services() {
  const data = config.servicesSection;
  const destinations: Record<string, string> = { seo: "digital-marketing", ads: "web-development", branding: "branding-strategy", apps: "mobile-app-development", content: "video-editing", automation: "ai-development" };
  return <Section id="services" className="services section-container batch-section">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="services-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div>
    <div className="services-grid">{data.items.map((service, index) => <div key={service.slug} className={`service-slot service-slot-${index}`} data-reveal><Card className={`service-card service-${service.slug}`}>
      <div className="service-top"><span className="service-icon"><Icon name={service.icon}/></span><span className="card-number">0{index + 1}</span></div>
      {"visual" in service && <div className={`service-visual visual-${service.slug}`} aria-hidden="true">{service.slug === "seo" ? <><div className="search-orbit"/><div className="search-widget"><span className="search-widget-bar"><Icon name="search"/><span>{service.visual.headline}</span><span className="search-enter">↵</span></span><div className="search-result"><span className="result-favicon">{config.shortName}</span><div><span className="result-line"/><span className="result-line short"/></div><span className="result-check">✓</span></div><div className="search-result faded"><span className="result-favicon"/><div><span className="result-line"/><span className="result-line short"/></div></div></div><span className="visual-caption">{service.visual.detail}</span></> : <><div className="growth-bars">{[28, 40, 35, 58, 51, 75, 88].map((height, i) => <span key={i} style={{ height: `${height}%` }}/>)}</div><svg className="growth-curve" viewBox="0 0 300 100" fill="none"><path d="M5 90C55 90 45 57 90 66S155 34 180 38 237 6 294 7" stroke="currentColor" strokeWidth="2" pathLength="1" strokeDasharray="1" data-draw/><path d="m286 1 9 6-7 8" stroke="currentColor" strokeWidth="2"/></svg><span className="visual-caption">{service.visual.detail}</span></>}</div>}
      <div className="service-copy"><h3>{service.name}</h3><p className="service-tagline">{service.tagline}</p><p className="service-description">{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <Link className="card-action" href={`/services/${destinations[service.slug] ?? "web-development"}`} aria-label={`Explore ${service.name}`}><Arrow diagonal/></Link>
    </Card></div>)}</div>
    <Link className="all-services-link" href="/services">Explore all 10 services <Arrow diagonal/></Link>
  </Section>;
}
