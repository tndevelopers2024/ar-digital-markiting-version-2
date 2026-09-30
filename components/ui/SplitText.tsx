"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function SplitText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-word", { opacity: 0.2 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 45%", scrub: 0.64 } });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <p ref={ref} className={className} aria-label={text}>{text.split(" ").map((word, i) => <span key={i} aria-hidden="true" className="reveal-word">{word}{" "}</span>)}</p>;
}
