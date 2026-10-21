"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToPosition } from "@/lib/scroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Cursor } from "./Cursor";
import { ScrollPopup } from "./ScrollPopup";
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });
export function Experience() {
  const [sceneReady, setSceneReady] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    let frame: number | undefined;
    const schedule = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setSceneReady(true));
      else frame = requestAnimationFrame(() => setSceneReady(true));
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);
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
  return <><div className="ambient-mesh" aria-hidden="true"/>{!reduced && sceneReady && <Scene/>}<Cursor/><ScrollPopup/></>;
}
