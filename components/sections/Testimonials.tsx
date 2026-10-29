"use client";
import { useState } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const data = config.testimonials;
  const [paused, setPaused] = useState(false);
  return <Section id="testimonials" className={`testimonials section-container ${styles.section}`}>
    <div className={`section-heading ${styles.heading}`}><div><h2 id="testimonials-heading">Client <span>Testimonials</span></h2><p className="section-description">Good work starts with listening and grows through collaboration.<br className="description-break"/>{" "}Explore perspectives on the experience of working with our team.</p></div></div>
    <p className="page-disclosure">{data.note}</p>
    <div className={styles.viewport} data-paused={paused || undefined} role="region" tabIndex={0} aria-label={data.label}>
      <div className={styles.track}>{[0, 1].map(copy => <div key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
        {data.items.map(item => <article key={item.name} className={styles.card}>
          <div className={styles.top}><span className={styles.quoteMark} aria-hidden="true">“</span><span className={styles.preview}>Preview review</span></div>
          <blockquote><h3>{item.topic}</h3><p>{item.quote}</p></blockquote>
          <div className={styles.person}><span className={styles.avatar} aria-hidden="true">{item.initials}</span><div><h4>{item.name}</h4><p>{item.role} · {item.company}</p></div></div>
          <p className={styles.service}>{item.service}</p>
        </article>)}
      </div>)}</div>
    </div>
    <div className={styles.bottom}><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume reviews" : "Pause reviews"}</button></div>
  </Section>;
}
