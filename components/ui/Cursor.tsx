"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    if (reduced || mobile) return;
    const elements = [dot.current, ring.current];
    const x = gsap.quickTo(ring.current, "x", { duration: 0.32, ease: "power3.out" });
    const y = gsap.quickTo(ring.current, "y", { duration: 0.32, ease: "power3.out" });
    function move(event: PointerEvent) {
      gsap.set(dot.current, { x: event.clientX, y: event.clientY, opacity: 1 });
      x(event.clientX); y(event.clientY);
      const target = (event.target as Element).closest("[data-cursor], a, button");
      const label = target?.getAttribute("data-cursor") || "";
      if (ring.current) ring.current.textContent = label;
      gsap.to(ring.current, { opacity: 1, scale: label ? 1.8 : target ? 1.35 : 1, duration: 0.32, overwrite: "auto" });
    }
    function leave() { gsap.set([dot.current, ring.current], { opacity: 0 }); }
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); x.tween.kill(); y.tween.kill(); gsap.killTweensOf(elements); };
  }, [reduced, mobile]);
  if (reduced || mobile) return null;
  return <div aria-hidden="true"><div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/></div>;
}
