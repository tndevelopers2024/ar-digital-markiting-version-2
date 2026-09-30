import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
export function FinalCTA() {
  const data = config.finalCta;
  return <Section id="contact" className="final-cta batch-section"><div className="final-glow" aria-hidden="true"/><div className="final-cta-content" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="contact-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="final-description">{data.description}</p><Button href="#audit" className="final-button">{data.action}</Button><p className="final-note">{data.note}</p></div></Section>;
}
