"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Cursor } from "./Cursor";

export function InnerExperience() {
  const path = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    // Keep the initial page visible while optional animation code loads.
    void import("@/lib/gsap").then(({ gsap, motion, ScrollTrigger }) => {
      if (cancelled) return;
      const root = document.getElementById("main");
      if (!root) return;
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".page-image-story, .bespoke-section, .inner-section, .service-faq, .service-related, .service-page-cta, .about-page-banner, .contact-page-layout, .blog-directory, .project-gallery, .blog-article > section", root);
        sections.forEach(section => {
          if (section.getBoundingClientRect().top < window.innerHeight) return;
          gsap.from(section, { y: 28, opacity: 0, duration: motion.slow, ease: motion.ease, scrollTrigger: { trigger: section, start: "top 94%", once: true } });
        });
      }, root);
      cleanup = () => ctx.revert();
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [path, reduced]);
  return <><div className="ambient-mesh" aria-hidden="true"/><Cursor/></>;
}
