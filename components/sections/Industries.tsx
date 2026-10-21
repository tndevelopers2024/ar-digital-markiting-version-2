"use client";
import { useState } from "react";
import Image from "next/image";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import styles from "./Industries.module.css";

export function Industries() {
  const data = config.industries;
  const [paused, setPaused] = useState(false);
  return <Section id="industries" className="industries section-container batch-section">
    <div className="section-heading"><div><h2 id="industries-heading">Industries <span>We Serve</span></h2><p className="section-description">Every industry has its own audience, challenges, and opportunities.<br className="description-break"/>{" "}We shape our approach around the way your business works.</p></div></div>
    <div className={styles.viewport} data-paused={paused || undefined} role="region" tabIndex={0} aria-label="Industries we serve">
      <div className={styles.track}>{[0, 1].map(copy => <div key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
        {data.items.map(item => <article key={item.name} className={styles.card}>
          <div className={styles.photo}><Image src={item.image} alt={copy === 0 ? item.imageAlt : ""} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"/></div>
          <div className={styles.copy}><Icon name={item.icon}/><h3>{item.name}</h3><p>{item.description}</p></div>
        </article>)}
      </div>)}</div>
    </div>
    <button type="button" className={styles.toggle} onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume industries" : "Pause industries"}</button>
  </Section>;
}
