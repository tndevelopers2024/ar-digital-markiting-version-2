"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis, scrollToPosition } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });
export function Experience() {
  useLenis();
  useEffect(() => {
    if (!window.location.hash) return;
    let cancelled = false;
    let frame = 0;
    const cancel = () => { cancelled = true; };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach(event => window.addEventListener(event, cancel, { passive: true, once: true }));
    // Restore deep links after the desktop pin spacers establish their final height.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        frame = requestAnimationFrame(() => {
          if (cancelled) return;
          let id = window.location.hash.slice(1);
          try { id = decodeURIComponent(id); } catch { return; }
          const target = document.getElementById(id);
          if (target) scrollToPosition(target.getBoundingClientRect().top + window.scrollY - 112);
        });
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); events.forEach(event => window.removeEventListener(event, cancel)); };
  }, []);
  const reduced = useReducedMotion();
  return <><div className="ambient-mesh" aria-hidden="true"/>{!reduced && <Scene/>}<Loader/><Cursor/></>;
}
