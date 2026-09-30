import { config } from "@/lib/config";
import { SplitText } from "@/components/ui/SplitText";
import { Arrow } from "@/components/ui/Button";
export function About() {
  const about = config.about;
  return <section id="about" className="about section-container" aria-labelledby="about-heading"><div className="about-top"><p className="eyebrow"><span className="status-dot"/>{about.eyebrow}</p><span className="section-index" aria-hidden="true">{about.sideNote}</span></div><div className="about-grid"><h2 id="about-heading">{about.heading[0]}<br/>{about.heading[1]}<br/><span>{about.heading[2]}<br/>{about.heading[3]}</span></h2><div className="about-content"><SplitText text={about.statement} className="about-statement"/><p className="about-description">{about.description}</p><a href={config.booking.href} className="text-link about-link">{about.link}<Arrow diagonal/></a></div></div><div className="about-pillars">{about.pillars.map((pillar, i) => <div key={pillar}><span>0{i + 1}</span><p>{pillar}</p><Arrow diagonal/></div>)}</div></section>;
}
