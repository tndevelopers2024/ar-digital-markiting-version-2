import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
export function Industries() {
  const data = config.industries;
  return <Section id="industries" className="industries section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="industries-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="industry-grid">{data.items.map(item => <div key={item.name} data-reveal><Card className="industry-card" tilt={false}><div className="industry-top"><Icon name={item.icon}/><span className="card-number">{item.number}</span></div><h3>{item.name}</h3><p>{item.description}</p><a className="industry-link" href={`mailto:${config.email}?subject=${encodeURIComponent(`${data.action} ${item.name}`)}`} aria-label={`${data.action} ${item.name}`}><Arrow diagonal/></a></Card></div>)}</div></Section>;
}
