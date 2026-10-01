"use client";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToPosition } from "@/hooks/useLenis";
import Image from "next/image";
import { Arrow } from "@/components/ui/Button";
export function Process() {
  const data = config.process;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const current = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 900px) and (pointer: fine)", () => {
      element.classList.add("process-is-pinned");
      if (stage.current && stage.current.scrollHeight > window.innerHeight + 2) { element.classList.remove("process-is-pinned"); return; }
      setPinned(true);
      const update = (self: ScrollTrigger) => {
        const index = Math.min(data.steps.length - 1, Math.floor(self.progress * data.steps.length));
        if (index !== current.current) { current.current = index; setActive(index); }
        gsap.set(line.current, { attr: { "stroke-dashoffset": 1 - self.progress } });
      };
      trigger.current = ScrollTrigger.create({ trigger: stage.current, start: "top top", end: () => `+=${window.innerHeight * 3}`, pin: true, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: update, onRefresh: update });
      return () => { trigger.current = null; element.classList.remove("process-is-pinned"); setPinned(false); };
    }, section);
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    return () => { cancelled = true; media.revert(); };
  }, [reduced, data.steps.length]);
  function moveTo(index: number) {
    const scroll = trigger.current;
    if (scroll) scrollToPosition(scroll.start + (scroll.end - scroll.start) * (index + 0.08) / data.steps.length);
    else {
      setActive(index);
      document.getElementById(`process-step-${index}`)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "center" });
    }
  }
  return <section ref={section} id="process" className="process-section" aria-labelledby="process-heading"><div ref={stage} className="process-stage"><div className="section-container"><div className="section-heading"><div><h2 id="process-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><nav className="process-nav" aria-label={data.sequenceLabel}><svg className="process-connector" viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1H1000" stroke="#dbe3ee" strokeWidth="2"/><path ref={line} d="M0 1H1000" stroke={config.theme.blue} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset="1"/></svg><ol>{data.steps.map((step, index) => <li key={step.number}><button aria-current={active === index ? "step" : undefined} onClick={() => moveTo(index)} aria-controls={`process-step-${index}`}><span className="step-dot">{step.number}</span><span>{step.short}</span><span className="step-nav-arrow" aria-hidden="true">↗</span></button></li>)}</ol></nav><div className="process-panels">{data.steps.map((step, index) => <article key={step.number} id={`process-step-${index}`} className={`process-step process-step-${index}`} data-active={active === index} aria-hidden={pinned && active !== index ? true : undefined} inert={pinned && active !== index ? true : undefined}><div className="process-step-copy"><p className="eyebrow">{step.eyebrow}</p><h3>{step.title}</h3><p className="process-step-description">{step.description}</p><ul>{step.details.map(detail => <li key={detail}><span aria-hidden="true">✓</span>{detail}</li>)}</ul><div className="process-deliverable"><span>{data.deliverableLabel}</span><p>{step.deliverable}</p></div></div><figure className="process-illustration process-photo"><Image src={step.image} alt={step.imageAlt} fill sizes="(max-width: 767px) 100vw, 45vw"/><span className="process-photo-number">{data.stepLabel} {step.number}</span><figcaption><strong>{step.visualTitle}</strong><span>Illustrative process imagery</span></figcaption></figure></article>)}</div><div className="process-bottom"><p>{data.note}</p><div className="process-controls"><span className="process-scroll-label">{data.scrollLabel}</span><span className="process-count" role="status">{data.steps[active].number} / {String(data.steps.length).padStart(2, "0")}</span><button aria-label={data.previous} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))}><Arrow/></button><button aria-label={data.next} disabled={active === data.steps.length - 1} onClick={() => moveTo(Math.min(data.steps.length - 1, active + 1))}><Arrow/></button></div></div></div></div></section>;
}
