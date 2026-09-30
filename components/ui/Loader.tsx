"use client";
import { useEffect, useRef } from "react";
import { gsap, motion } from "@/lib/gsap";
import { Brand } from "./Brand";
import { config } from "@/lib/config";
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("ar-intro")) return;
    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      gsap.set(ref.current, { display: "flex", yPercent: 0 });
      gsap.timeline({ onComplete: () => { sessionStorage.setItem("ar-intro", "seen"); } })
        .to(progress, { value: 100, duration: motion.slow, ease: motion.ease, onUpdate: () => { if (number.current) number.current.textContent = Math.round(progress.value).toString().padStart(2, "0"); } })
        .to(ref.current, { yPercent: -100, duration: motion.slow, ease: motion.ease }, "+=0.08")
        .set(ref.current, { display: "none" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className="loader" aria-hidden="true"><Brand/><div className="loader-bottom"><p>{config.loader}</p><div><span ref={number}>00</span><sup>%</sup></div></div></div>;
}
