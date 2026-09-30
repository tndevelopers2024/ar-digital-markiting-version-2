"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Section({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.from(element, { y: 32, opacity: 0, duration: motion.slow, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach(path => {
        gsap.from(path, { attr: { "stroke-dashoffset": 1 }, duration: motion.normal, ease: motion.ease, scrollTrigger: { trigger: path, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <section ref={ref} id={id} className={className} aria-labelledby={`${id}-heading`}>{children}</section>;
}
