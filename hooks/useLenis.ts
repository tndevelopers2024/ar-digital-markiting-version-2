"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useIsMobile } from "./useIsMobile";
let activeLenis: Lenis | null = null;
export function scrollToPosition(top: number) {
  if (activeLenis) activeLenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "instant" });
}
export function useLenis() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  useEffect(() => {
    if (reduced || mobile) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, anchors: { offset: -112 } });
    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, [reduced, mobile]);
}
