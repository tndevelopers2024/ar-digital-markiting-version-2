"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Marquee({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animation = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => { animation.current?.paused(paused); }, [paused]);
  useEffect(() => {
    if (reduced) return;
    let settle: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      const tween = gsap.to(".marquee-track", { xPercent: -50, duration: 32, repeat: -1, ease: "none" });
      animation.current = tween;
      ScrollTrigger.create({ trigger: ref.current, start: "top bottom", end: "bottom top", onToggle: self => { if (!self.isActive) tween.pause(); else if (!ref.current?.hasAttribute("data-paused")) tween.resume(); }, onUpdate: self => {
        settle?.kill();
        tween.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 600, 3));
        settle = gsap.to(tween, { timeScale: 1, duration: 1.12, overwrite: true });
      } });
    }, ref);
    return () => { settle?.kill(); ctx.revert(); animation.current = null; };
  }, [reduced]);
  return <div ref={ref} className="marquee" data-paused={paused || undefined}><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 || undefined}>{items.map((item, i) => <span className={`partner partner-${i}`} key={item}><svg viewBox="0 0 32 32" fill="none" aria-hidden="true">{i % 3 === 0 ? <><path d="m16 3 13 8-13 8L3 11 16 3Z" fill="currentColor"/><path d="m3 17 13 8 13-8M3 23l13 8 13-8" stroke="currentColor" strokeWidth="3"/></> : i % 3 === 1 ? <><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="6"/><path d="m20 21 9 8" stroke="currentColor" strokeWidth="6"/></> : <><circle cx="11" cy="16" r="9" stroke="currentColor" strokeWidth="3"/><circle cx="21" cy="16" r="9" stroke="currentColor" strokeWidth="3"/></>}</svg>{item}</span>)}</div>)}</div>{!reduced && <button className="marquee-pause" aria-label={paused ? "Play partner marquee" : "Pause partner marquee"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>}</div>;
}
