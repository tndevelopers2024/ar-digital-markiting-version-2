import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
export function Results() {
  const data = config.results;
  return <Section id="results" className="results section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="results-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="results-grid">{data.items.map((item, i) => <article className="result-stat" key={item.label} data-reveal><div className="result-stat-top"><Icon name={item.icon}/><span className="card-number">0{i + 1}</span></div><Counter value={item.value} decimals={item.decimals} prefix={item.prefix} suffix={item.suffix}/><h3>{item.label}</h3><p>{item.description}</p></article>)}</div><p className="section-disclosure">{data.note}</p></Section>;
}
