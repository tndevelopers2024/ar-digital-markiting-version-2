"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToPosition } from "@/hooks/useLenis";
import { Arrow } from "@/components/ui/Button";
import { type Project } from "@/components/ui/ProjectArtwork";
import { HomeCampaignArtwork } from "@/components/ui/HomeCampaignArtwork";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const currentIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const data = config.work;
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (reduced) return;
    const section = root.current;
    const strip = track.current;
    const pin = stage.current;
    if (!section || !strip || !pin) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 900px) and (pointer: fine)", () => {
      section.classList.add("work-is-pinned");
      if (pin.scrollHeight > window.innerHeight + 2) { section.classList.remove("work-is-pinned"); return; }
      const distance = () => Math.max(0, strip.scrollWidth - strip.clientWidth);
      const horizontal = gsap.to(strip, { x: () => -distance(), ease: "none", scrollTrigger: {
        trigger: pin, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.64, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => {
          const index = Math.round(self.progress * (data.projects.length - 1));
          if (index !== currentIndex.current) { currentIndex.current = index; setActive(index); }
          gsap.set(progress.current, { scaleX: self.progress });
        },
      } });
      trigger.current = horizontal.scrollTrigger ?? null;
      gsap.utils.toArray<HTMLElement>(".work-card", section).forEach(card => {
        gsap.fromTo(card.querySelector(".project-art-inner"), { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left right", end: "right left", scrub: true } });
      });
      return () => { trigger.current = null; section.classList.remove("work-is-pinned"); };
    }, root);
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    return () => { cancelled = true; media.revert(); };
  }, [reduced, data.projects.length]);
  function moveTo(index: number) {
    const scroll = trigger.current;
    if (scroll) {
      // Cancel any in-flight smooth scroll before choosing a specific project.
      scrollToPosition(scroll.start + (scroll.end - scroll.start) * index / (data.projects.length - 1));
    }
  }
  function focusCard(index: number) {
    if (trigger.current && currentIndex.current !== index) moveTo(index);
  }
  return <section id="work" ref={root} className="work-section" aria-labelledby="work-heading"><div ref={stage} className="work-stage"><div className="section-container"><div className="section-heading work-heading"><div><h2 id="work-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><div className="work-heading-aside"><p className="section-intro">{data.description}</p><p className="work-disclosure">{data.disclosure}</p></div></div><div className="work-viewport"><div ref={track} className="work-track">{data.projects.map((project, index) => <article key={project.id} className="work-card"><button className="project-open" aria-label={`${data.view}: ${project.brand}`} data-cursor="View" onClick={() => setSelected(project)} onFocus={() => focusCard(index)}><HomeCampaignArtwork project={project}/><span className="project-open-arrow"><Arrow diagonal/></span></button><div className="work-card-info"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3><div className="project-tags">{project.services.map(service => <span key={service}>{service}</span>)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div></article>)}</div></div><div className="work-controls"><span className="work-scroll-hint">{data.scrollHint} <span aria-hidden="true">↘</span></span><div className="work-progress" aria-hidden="true"><span ref={progress}/></div><div className="work-navigation"><span className="work-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span>/ {String(data.projects.length).padStart(2, "0")}</span></span><button aria-label={data.previous} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))}><Arrow/></button><button aria-label={data.next} disabled={active === data.projects.length - 1} onClick={() => moveTo(Math.min(data.projects.length - 1, active + 1))}><Arrow/></button></div></div><p className="work-list-hint">{data.listHint}</p></div></div><ProjectDialog project={selected} onClose={close}/></section>;
}
