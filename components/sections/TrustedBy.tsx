import { config } from "@/lib/config";
import { Marquee } from "@/components/ui/Marquee";
export function TrustedBy() {
  return <section id="trusted" className="trusted section-container" aria-labelledby="trusted-heading"><div className="trusted-heading"><p className="eyebrow"><span className="tiny-cross">✳</span>{config.trusted.eyebrow}</p><h2 id="trusted-heading">{config.trusted.heading}</h2></div><Marquee items={config.trusted.brands}/><p className="concept-note">{config.trusted.note}</p></section>;
}
