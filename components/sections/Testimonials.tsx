"use client";
import { useRef, useState, type PointerEvent } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Testimonials() {
  const data = config.testimonials;
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  function go(index: number) {
    const track = ref.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduced ? "instant" : "smooth" });
  }
  function start(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (drag.current) event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x);
  }
  function end() { drag.current = null; setDragging(false); }
  function update() {
    const track = ref.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const index = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.offsetLeft - track.scrollLeft) ? i : best, 0);
    setActive(index);
  }
  return <Section id="testimonials" className="testimonials section-container batch-section"><div className="section-heading" data-reveal><div><h2 id="testimonials-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div><div ref={ref} className="testimonial-track" data-dragging={dragging || undefined} data-cursor="Drag" role="region" aria-roledescription="carousel" aria-label={data.label} tabIndex={0} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onScroll={update} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); go(Math.max(0, Math.min(data.items.length - 1, active + (event.key === "ArrowRight" ? 1 : -1)))); } }}>{data.items.map((item, index) => <article key={item.name} className={`testimonial-card tone-${item.color}`} aria-label={`${index + 1} of ${data.items.length}`} aria-roledescription="slide"><div className="review-header"><div className="testimonial-person"><span className="review-avatar" aria-hidden="true">{item.initials}</span><div><h3>{item.name}</h3><p>{item.role} · {item.company}</p></div></div><span className="review-sample">{data.sampleLabel}</span></div><div className="review-quote-mark" aria-hidden="true">“</div><blockquote><strong>{item.topic}</strong><p>{item.quote}</p></blockquote><div className="review-service"><span>{data.serviceLabel}</span><strong>{item.service}</strong></div></article>)}</div><div className="testimonial-controls"><span className="eyebrow">{data.hint}</span><div><button aria-label={data.previous} disabled={active === 0} onClick={() => go(active - 1)}>←</button><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(data.items.length).padStart(2, "0")}</span><button aria-label={data.next} disabled={active === data.items.length - 1} onClick={() => go(active + 1)}>→</button></div></div><p className="section-disclosure">{data.note}</p></Section>;
}
