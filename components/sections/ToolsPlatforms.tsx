"use client";
import { useState, type CSSProperties } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function ToolsPlatforms() {
  const data = config.platforms;
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  return <Section id="platforms" className="platforms section-container batch-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="platforms-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><ul className="platform-grid" data-paused={paused || reduced || undefined}>{data.items.map((tool, index) => <li key={tool.name} data-reveal><div className="platform-card" style={{ "--float-delay": `${(index % 4) * -1.3}s`, "--float-duration": `${5 + index % 3}s` } as CSSProperties}><span className={`platform-mark tone-${tool.tone}`} aria-hidden="true">{tool.mark}</span><div><h3>{tool.name}</h3><p>{tool.label}</p></div></div></li>)}</ul><div className="platform-footer"><p className="section-disclosure">{data.note}</p>{!reduced && <button className="float-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? data.play : data.pause}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>}</div></Section>;
}
