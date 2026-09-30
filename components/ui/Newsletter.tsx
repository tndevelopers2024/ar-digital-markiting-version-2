"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { config } from "@/lib/config";
export function Newsletter() {
  const data = config.footer;
  const [done, setDone] = useState(false);
  const message = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (done) message.current?.focus({ preventScroll: true }); }, [done]);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); event.currentTarget.reset(); setDone(true); }
  return <div className="newsletter"><h3>{data.newsletterTitle}</h3><p>{data.newsletterDescription}</p>{done ? <div ref={message} tabIndex={-1} role="status" className="newsletter-success"><p>{data.newsletterSuccess}</p><button onClick={() => { setDone(false); requestAnimationFrame(() => input.current?.focus()); }}>{data.newsletterReset} ↗</button></div> : <form onSubmit={submit} aria-describedby="newsletter-note"><label htmlFor="newsletter-email" className="sr-only">{data.emailLabel}</label><div className="newsletter-input"><input ref={input} id="newsletter-email" name="email" type="email" autoComplete="email" placeholder={data.emailLabel} required maxLength={254}/><button type="submit" aria-label={data.subscribe}>↗</button></div><p id="newsletter-note">{data.newsletterNote}</p></form>}</div>;
}
