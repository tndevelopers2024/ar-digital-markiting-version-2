"use client";
import Image from "next/image";
import { useState } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import styles from "./ToolsPlatforms.module.css";

export function ToolsPlatforms() {
  const data = config.platforms;
  const [paused, setPaused] = useState(false);
  const rows = [data.items.slice(0, 4), data.items.slice(4, 8), data.items.slice(8)];
  return <Section id="platforms" className="platforms section-container batch-section">
    <div className="section-heading" data-reveal><div><h2 id="platforms-heading">Tools &amp; <span>Platforms</span></h2><p className="section-description">The right tools help turn a clear strategy into better work.<br className="description-break"/>{" "}We choose platforms that fit your business and your goals.</p></div></div>
    <div className={styles.marquee} data-paused={paused || undefined}>
      {rows.map((tools, row) => <div key={row} className={styles.lane}><div className={`${styles.track} ${row === 1 ? styles.reverse : ""}`}>
        {[0, 1].map(copy => <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>{[...tools, ...tools].map((tool, index) => <li key={`${tool.name}-${index}`} className={styles.card} aria-hidden={index >= tools.length ? true : undefined}>
          <Image src={tool.logo} alt="" width={40} height={40}/><div><h3>{tool.name}</h3><p>{tool.label}</p></div>
        </li>)}</ul>)}
      </div></div>)}
    </div>
    <button type="button" className={styles.toggle} onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume animation" : "Pause animation"}</button>
  </Section>;
}
