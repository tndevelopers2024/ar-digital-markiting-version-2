"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function refresh() { cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => ScrollTrigger.refresh()); }
  return <div className="accordion">{items.map((item, index) => <details key={item.question} onToggle={refresh}><summary><span className="accordion-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className="accordion-plus" aria-hidden="true">+</span></summary><div className="accordion-answer"><p>{item.answer}</p></div></details>)}</div>;
}
