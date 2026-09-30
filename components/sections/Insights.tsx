"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { ScrollTrigger } from "@/lib/gsap";
export function Insights() {
  const data = config.insights;
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function refresh() { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => ScrollTrigger.refresh()); }
  return <Section id="insights" className="insights section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="insights-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div className="insights-grid">{data.items.map(item => <article className="insight-card" key={item.title} data-reveal><div className={`insight-art tone-${item.tone}`} aria-hidden="true"><span>{item.symbol}</span><i/><i/></div><div className="insight-copy"><p className="insight-meta"><span>{item.category}</span><span>{item.minutes}</span></p><h3>{item.title}</h3><p>{item.summary}</p><details onToggle={refresh}><summary><span className="insight-open">{data.read}</span><span className="insight-close">{data.close}</span><span aria-hidden="true">↗</span></summary><div className="insight-body">{item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details></div></article>)}</div><p className="section-disclosure">{data.note}</p></Section>;
}
