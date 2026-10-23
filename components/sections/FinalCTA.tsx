import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
export function FinalCTA() {
  const data = config.finalCta;
  return <Section id="contact" className="final-cta batch-section"><div className="final-glow" aria-hidden="true"/><div className="final-cta-content" data-reveal><h2 id="contact-heading">Ready for your next<br/><span>growth opportunity?</span></h2><p className="final-description">Let’s find out how search, paid campaigns, and a clearer customer journey could work harder for your business.</p><Button href="#audit" className="final-button">Get your free website audit</Button><p className="final-note">{data.note}</p></div></Section>;
}
