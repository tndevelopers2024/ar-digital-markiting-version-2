"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Showreel() {
  const data = config.showreel;
  const frame = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(frame.current, { scale: .88 }, { scale: 1, ease: "none", scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 16%", scrub: .6 } });
      gsap.fromTo(".reel-sculpture", { rotate: -16, y: 40 }, { rotate: 12, y: -24, ease: "none", scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: .6 } });
    }, frame);
    return () => ctx.revert();
  }, [reduced]);
  return <Section id="showreel" className="showreel batch-section"><div className="section-container"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="showreel-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div></div><figure ref={frame} className="reel-frame"><div className="reel-art" role="img" aria-label={data.label}><div className="reel-grid"/><div className="reel-sculpture"><i/><i/><i/></div><span className="reel-spark reel-spark-one">✳</span><span className="reel-spark reel-spark-two">✳</span></div><div className="reel-content"><p className="eyebrow">{data.kicker}</p><p className="reel-title">{data.posterTitle[0]}<br/><span>{data.posterTitle[1]}</span></p><p className="eyebrow">{data.footer}</p></div><figcaption><span className="status-dot"/>{data.note}</figcaption></figure></Section>;
}
