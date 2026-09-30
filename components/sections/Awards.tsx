import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
export function Awards() {
  const data = config.awards;
  return <Section id="awards" className="awards section-container batch-section"><div className="awards-heading" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="awards-heading">{data.heading}</h2></div><ul className="awards-strip">{data.items.map(item => <li key={item.name} data-reveal><span className="award-symbol" aria-hidden="true">✳</span><h3>{item.name}</h3><p>{item.detail}<span>{item.year}</span></p></li>)}</ul><p className="section-disclosure">{data.note}</p></Section>;
}
