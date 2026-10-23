"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { Brand } from "./Brand";
import styles from "./Loader.module.css";

export function Loader() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const dismiss = useRef<() => void>(() => {});
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = ref.current;
    if (!element) return;
    let finished = false;
    let timeline: gsap.core.Timeline;
    const finish = () => {
      if (finished) return;
      finished = true;
      timeline?.kill();
      element.style.display = "none";
      element.setAttribute("aria-hidden", "true");
      if (skip.current) skip.current.tabIndex = -1;
      if (document.activeElement === skip.current) {
        const main = document.getElementById("main");
        if (main) { const previous = main.getAttribute("tabindex"); main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); if (previous === null) main.removeAttribute("tabindex"); else main.setAttribute("tabindex", previous); }
      }
    };
    dismiss.current = finish;
    element.style.display = "flex";
    element.setAttribute("aria-hidden", "false");
    if (skip.current) skip.current.tabIndex = 0;
    const ctx = gsap.context(() => {
      timeline = gsap.timeline({ onComplete: finish });
      timeline.fromTo("[data-loader-center]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" })
        .to(element, { clipPath: "inset(0 0 100% 0 round 0 0 50px 50px)", duration: .65, ease: "power3.inOut" }, 2);
    }, element);
    // The introduction must never obstruct keyboard navigation or outlive its animation.
    const onKey = (event: KeyboardEvent) => { if (["Escape", "Tab"].includes(event.key)) finish(); };
    window.addEventListener("keydown", onKey);
    const timeout = window.setTimeout(finish, 3500);
    return () => { window.clearTimeout(timeout); window.removeEventListener("keydown", onKey); ctx.revert(); element.style.display = "none"; dismiss.current = () => {}; };
  }, [pathname]);
  return <div ref={ref} className={styles.loader} aria-hidden="true" data-testid="brand-preloader">
    <div className={styles.top}><Brand /><span>IDEAS INTO IMPACT</span></div>
    <div className={styles.center} data-loader-center>
      <div className={styles.orbit} aria-hidden="true"><div className={styles.ring} /><div className={styles.ringInner} /><span className={styles.monogram}>a<span>r</span><b>.</b></span></div>
      <p className={styles.kicker}>A little spark. A bigger possibility.</p>
      <div className={styles.words} aria-label="Design. Build. Grow."><span>Design.</span><span>Build.</span><span>Grow.</span></div>
      <div className={styles.line} aria-hidden="true"><span /></div>
    </div>
    <div className={styles.bottom}><span>YOUR NEXT CHAPTER STARTS HERE</span><button ref={skip} type="button" tabIndex={-1} onClick={() => dismiss.current()}>Skip intro</button></div>
  </div>;
}
