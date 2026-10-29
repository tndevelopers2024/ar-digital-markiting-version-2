"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./GrowthBanner.module.css";

export function GrowthBanner() {
  const [paused, setPaused] = useState(false);
  return <section className={`section-container ${styles.section}`} aria-labelledby="growth-banner-heading">
    <div className={styles.banner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 id="growth-banner-heading">Big ambitions.<br/><span>Connected marketing.</span></h2>
        <p className={styles.description}>Bring search, social, and paid campaigns together around one goal: growing your business.</p>
        <Button href="/contact">Talk to our team</Button>
      </div>
      <div className={styles.artwork}>
      <div className={styles.visual} aria-hidden="true" data-paused={paused || undefined}>
        <div className={styles.ring}/>
        <div className={`${styles.orbiter} ${styles.search}`}><span>Search</span></div>
        <div className={`${styles.orbiter} ${styles.social}`}><span>Social</span></div>
        <div className={`${styles.orbiter} ${styles.ads}`}><span>Paid ads</span></div>
        <div className={styles.center}>Your<br/>next step.</div>
        <p>ONE STRATEGY. MORE POSSIBILITIES.</p>
      </div>
      <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume animation" : "Pause animation"}</button>
      </div>
    </div>
  </section>;
}
