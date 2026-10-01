import Image from "next/image";
import { config, homeImages } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Arrow } from "@/components/ui/Button";
export function Industries() {
  const data = config.industries;
  return <Section id="industries" className="industries section-container batch-section"><div className="section-heading" data-reveal><div><h2 id="industries-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="industry-grid">{data.items.map(item => <div key={item.name} data-reveal><Card className="industry-card industry-photo-card" tilt={false}><div className="industry-photo"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 600px) 100vw, (max-width: 767px) 50vw, 33vw"/></div><div className="industry-photo-copy"><div className="industry-top"><Icon name={item.icon}/><span className="card-number">{item.number}</span></div><h3>{item.name}</h3><p>{item.description}</p><a className="industry-link" href="/contact" aria-label={`${data.action} ${item.name}`}><Arrow diagonal/></a></div></Card></div>)}</div><p className="section-disclosure">{homeImages.caption}</p></Section>;
}
