"use client";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import clsx from "clsx";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Card({ children, className, tilt = true }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => { const nodes = [ref.current, light.current]; return () => { gsap.killTweensOf(nodes); }; }, []);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || mobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (tilt) gsap.to(ref.current, { rotationX: -(y / rect.height - 0.5) * 5, rotationY: (x / rect.width - 0.5) * 5, transformPerspective: 900, duration: motion.fast, overwrite: "auto" });
    gsap.to(light.current, { x, y, opacity: 0.75, duration: motion.fast, overwrite: "auto" });
  }
  function reset() {
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: motion.normal, ease: motion.ease, overwrite: "auto" });
    gsap.to(light.current, { opacity: 0, duration: motion.normal, overwrite: "auto" });
  }
  return <div ref={ref} className={clsx("interactive-card", className)} onPointerMove={move} onPointerLeave={reset}><span ref={light} className="card-reflection" aria-hidden="true"/>{children}</div>;
}
