"use client";
import { useRef, useEffect, type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function Button({ children, href, secondary = false, className }: { children: ReactNode; href: string; secondary?: boolean; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => { const element = ref.current; return () => { gsap.killTweensOf(element); }; }, []);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || mobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gsap.to(ref.current, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.18, duration: motion.fast, overwrite: true });
  }
  function reset() { gsap.to(ref.current, { x: 0, y: 0, duration: motion.normal, ease: motion.ease, overwrite: true }); }
  return <a ref={ref} href={href} className={clsx("button", secondary ? "button-secondary" : "button-primary", className)} onMouseMove={move} onMouseLeave={reset} onBlur={reset}><span>{children}</span><Arrow diagonal={!secondary}/></a>;
}
