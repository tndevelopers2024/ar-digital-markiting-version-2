"use client";
import { useEffect, useRef } from "react";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Counter({ value, decimals = 0, prefix = "", suffix = "", className = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const formatted = new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) { element.textContent = `${prefix}${new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)}${suffix}`; return; }
    const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      gsap.to(counter, { value, duration: motion.slow * 2, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 95%", once: true }, onUpdate: () => { element.textContent = `${prefix}${formatter.format(counter.value)}${suffix}`; }, onComplete: () => { element.textContent = `${prefix}${formatter.format(value)}${suffix}`; } });
    });
    return () => ctx.revert();
  }, [value, decimals, prefix, suffix, reduced]);
  return <span className={`counter ${className}`}><span className="sr-only">{prefix}{formatted}{suffix}</span><span ref={ref} aria-hidden="true">{prefix}{formatted}{suffix}</span></span>;
}
