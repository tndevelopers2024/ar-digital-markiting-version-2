"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { Button, Arrow } from "@/components/ui/Button";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const delay = sessionStorage.getItem("ar-intro") ? 0.1 : 1.45;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line > span", { yPercent: 115, duration: motion.slow, stagger: 0.12, ease: motion.ease, delay });
      gsap.from(".hero-enter", { y: 24, opacity: 0, duration: motion.normal, stagger: 0.1, delay: delay + 0.45, ease: motion.ease });
      gsap.from(".stat-chip", { y: 32, opacity: 0, duration: motion.slow, stagger: 0.2, delay: delay + 0.5, ease: motion.ease });
    }, ref);
    return () => ctx.revert();
  }, []);
  const hero = config.hero;
  return <section id="hero" ref={ref} className="hero section-container" aria-labelledby="hero-heading">
    <div className="hero-copy">
      <h1 id="hero-heading">{hero.lines.map((line, i) => <span className={`hero-line ${i === 2 ? "accent-line" : ""}`} key={line}><span>{line}{i === 1 && <span className="headline-spark" aria-hidden="true">✳</span>}</span></span>)}</h1>
      <p className="hero-description hero-enter">{hero.description}</p>
      <div className="hero-actions hero-enter"><Button href={hero.primary.href}>{hero.primary.label}</Button><a href={hero.secondary.href} className="text-link">{hero.secondary.label}<Arrow/></a></div>
      <div className="hero-proof hero-enter"><div className="mini-avatars" aria-hidden="true"><span>J</span><span>A</span><span>M</span><span>+</span></div><div><p>{hero.proof}</p><span>{hero.rating}</span></div></div>
    </div>
    <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="art-plus plus-one">+</span><span className="art-plus plus-two">+</span><span className="art-coordinate">{hero.artCoordinate}</span>
      <div className="stat-chip growth-chip"><span className="chip-icon"><Arrow diagonal/></span><div><span className="chip-label">{hero.chipOne.label}</span><strong>{hero.chipOne.value}</strong><span className="chip-note">{hero.chipOne.note}</span></div><svg className="mini-chart" viewBox="0 0 72 36"><path d="M2 32 15 26 25 29 37 16 48 19 60 6 70 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      <div className="stat-chip creative-chip"><span className="spark-icon">✳</span><div><strong>{hero.chipTwo.value}</strong><span className="chip-note">{hero.chipTwo.note}</span></div></div>
      <span className="orbit-caption">{hero.orbitLabel}<span>↗</span></span>
    </div>
    <div className="hero-bottom hero-enter"><a href="#about" className="scroll-link"><span className="scroll-circle">↓</span>{hero.scroll}</a><span>{hero.bottomRight}</span></div>
  </section>;
}
