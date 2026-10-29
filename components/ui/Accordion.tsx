"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
export function Accordion({ items, openOnHover = false }: { items: readonly { question: string; answer: string }[]; openOnHover?: boolean }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function refresh() { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => ScrollTrigger.refresh()); }
  return <div className="accordion">{items.map((item) => <details key={item.question} onToggle={refresh} onPointerEnter={event => {
    if (!openOnHover || event.pointerType !== "mouse") return;
    const current = event.currentTarget;
    current.parentElement?.querySelectorAll("details").forEach(detail => { if (detail !== current && !detail.contains(document.activeElement)) detail.open = false; });
    current.open = true;
  }}><summary><span>{item.question}</span><span className="accordion-plus" aria-hidden="true">+</span></summary><div className="accordion-answer"><p>{item.answer}</p></div></details>)}</div>;
}
