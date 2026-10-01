"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HeroObject } from "./HeroObject";
import { CameraRig, type SceneState } from "./CameraRig";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { config } from "@/lib/config";
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function Scene({ variant = "home" }: { variant?: "home" | "inner" }) {
  const mobile = useIsMobile();
  const state = useRef<SceneState>({ ...config.scene[0] });
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (variant === "inner") {
      const hero = document.querySelector<HTMLElement>(".signature-intro, .inner-intro, .service-page-hero");
      const cta = document.querySelector<HTMLElement>(".service-page-cta");
      const signature = !!document.querySelector(".signature-intro");
      const driver = {progress: 0};
      function update() {
        const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
        const heroVisibility = Math.max(0, Math.min(1, heroBottom / window.innerHeight));
        const ctaTop = cta?.getBoundingClientRect().top ?? window.innerHeight * 2;
        const ending = Math.max(0, Math.min(1, 1 - ctaTop / window.innerHeight));
        Object.assign(state.current, {
          x: 2.65 * (1 - ending), y: -.05 + ending * .35,
          scale: .82 - driver.progress * .12 + ending * .15,
          rotation: driver.progress * 2.4, morph: .1 + driver.progress * .08,
          color: driver.progress * .5,
          opacity: Math.max(signature ? heroVisibility * .9 : heroVisibility * .12, ending * .12), cameraZ: 8.2,
        });
      }
      const ctx = gsap.context(() => {
        update();
        gsap.to(driver, { progress: 1, ease: "none", onUpdate: update, scrollTrigger: { start: 0, end: "max", scrub: .64, onRefresh: update } });
      });
      return () => ctx.revert();
    }
    if (mobile) {
      const art = document.querySelector<HTMLElement>(".hero-art");
      const update = () => {
        if (!art) return;
        const rect = art.getBoundingClientRect();
        const worldHeight = 2 * Math.tan(19 * Math.PI / 180) * 8.2;
        Object.assign(state.current, config.scene[0], {
          x: 0,
          y: (0.5 - (rect.top + rect.height / 2) / window.innerHeight) * worldHeight,
          scale: (Math.min(rect.width, 420) * 0.86 / window.innerHeight * worldHeight) / 3.8,
          opacity: rect.bottom > 0 && rect.top < window.innerHeight ? 1 : 0,
        });
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
    }
    Object.assign(state.current, config.scene[0]);
    const driver = { progress: 0 };
    const keys = ["x", "y", "scale", "rotation", "morph", "color", "opacity", "cameraZ"] as const;
    let maxScroll = 1;
    let stops: { start: number; end: number; frame: SceneState }[] = [];
    function render() {
      const scroll = driver.progress * maxScroll;
      let previous: SceneState = config.scene[0];
      Object.assign(state.current, previous);
      for (const stop of stops) {
        if (scroll < stop.start) break;
        const progress = Math.min(1, Math.max(0, (scroll - stop.start) / (stop.end - stop.start)));
        for (const key of keys) state.current[key] = previous[key] + (stop.frame[key] - previous[key]) * progress;
        if (progress < 1) break;
        previous = stop.frame;
      }
    }
    function measure() {
      maxScroll = Math.max(1, ScrollTrigger.maxScroll(window));
      let previousEnd = 0;
      stops = config.scene.slice(1).flatMap(frame => {
        const element = document.querySelector(frame.selector);
        if (!element) return [];
        const top = element.getBoundingClientRect().top + window.scrollY;
        const start = Math.max(previousEnd, top - window.innerHeight);
        const end = Math.max(start + 1, top - window.innerHeight * .25);
        previousEnd = end;
        return [{ start, end, frame }];
      });
      render();
    }
    // One scrubbed driver owns the shared state, including after pin/viewport refreshes.
    const ctx = gsap.context(() => {
      measure();
      gsap.to(driver, { progress: 1, ease: "none", onUpdate: render, scrollTrigger: { start: 0, end: "max", scrub: 1.12, onRefresh: measure } });
    });
    return () => ctx.revert();
  }, [mobile, variant]);
  return <div className="scene" aria-hidden="true"><CanvasBoundary><Canvas camera={{ position: [0, 0, 8.2], fov: 38 }} dpr={[1, mobile ? 1.25 : 1.75]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} frameloop={visible ? "always" : "never"} eventSource={typeof document !== "undefined" ? document.body : undefined} eventPrefix="client">
    <ambientLight intensity={1.5}/><directionalLight position={[-3, 5, 5]} intensity={3} color="#fff4f4"/>
    <HeroObject state={state} mobile={mobile}/><CameraRig state={state} mobile={mobile}/>
    {!mobile && variant === "home" && <ContactShadows position={[2.15, -2.1, 0]} opacity={0.14} scale={8} blur={3} far={5} resolution={128} frames={1} color="#91a6c2"/>}
  </Canvas></CanvasBoundary></div>;
}
