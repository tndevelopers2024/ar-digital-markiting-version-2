"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { config, homeImages } from "@/lib/config";
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
      gsap.fromTo(".home-reel-photo", { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: .6 } });
    }, frame);
    return () => ctx.revert();
  }, [reduced]);
  return <Section id="showreel" className="showreel batch-section"><div className="section-container"><div className="section-heading" data-reveal><div><h2 id="showreel-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div></div><figure ref={frame} className="reel-frame home-reel-frame"><div className="reel-art"><div className="home-reel-photo"><Image {...homeImages.content} alt={homeImages.content.alt} fill sizes="100vw"/></div></div><div className="reel-content"><p className="eyebrow">{data.kicker}</p><p className="reel-title">{data.posterTitle[0]}<br/><span>{data.posterTitle[1]}</span></p><p className="eyebrow">{data.footer}</p></div><figcaption><span className="status-dot"/>{homeImages.caption}</figcaption></figure></Section>;
}
