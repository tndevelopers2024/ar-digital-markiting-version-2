"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import styles from "./MarketingHero.module.css";

const slides = [
  { label: "Digital growth", eyebrow: "YOUR NEXT CHAPTER OF GROWTH", lines: ["More visibility.", "Better leads.", "Real momentum."], description: "Digital marketing that connects the dots between people finding your business and choosing it. SEO, paid ads, and social media—with a clear plan behind every click.", image: "/images/home/strategy.webp", board: ["Turn attention", "into opportunity."] },
  { label: "Search & advertising", eyebrow: "REACH PEOPLE READY TO ACT", lines: ["Get discovered.", "Earn the click.", "Make it count."], description: "Show up where your customers are looking. Connect search visibility and focused paid campaigns with landing pages that make the next step easy.", image: "/images/home/campaign-paid.webp", board: ["Turn searches", "into conversations."] },
  { label: "Social & content", eyebrow: "GIVE YOUR BRAND A STRONGER VOICE", lines: ["Tell your story.", "Build trust.", "Stay top of mind."], description: "Bring your brand to life with social content, campaign creative, and video. Give the right people a reason to notice, follow, and remember your business.", image: "/images/home/campaign-social.webp", board: ["Turn content", "into connection."] },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const playing = !paused && !reduced;
  const slide = slides[active];
  useEffect(() => {
    if (!playing || hovered || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused]);
  function selectSlide(index: number) {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  }
  return <section id="hero" className={`section-container ${styles.hero}`} aria-labelledby="hero-heading" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div key={slide.image} className={styles.backdrop} aria-hidden="true" style={{ "--hero-image": `url("${slide.image}")` } as CSSProperties}/>
    <div className={styles.copy}>
      <p className={styles.eyebrow}><span/> {slide.eyebrow}</p>
      <h1 id="hero-heading" className={styles.title}>{slide.lines[0]}<br/>{slide.lines[1]}<br/><span>{slide.lines[2]}</span></h1>
      <p className={styles.description}>{slide.description}</p>
      <div className={styles.actions}><Link href="#audit" className={styles.primary}>Get your free website audit <span aria-hidden="true">↗</span></Link><Link href="#work" className={styles.secondary}>Explore our approach <span aria-hidden="true">↓</span></Link></div>
      <p className={styles.promise}>Audience-first strategy <span>·</span> Clear reporting <span>·</span> Ongoing optimisation</p>
    </div>
    <div className={styles.visual} tabIndex={0} role="img" aria-label="Illustrative marketing plan connecting search, paid ads, and social content to a customer enquiry. This is a concept, not live performance data.">
      <div className={styles.board} aria-hidden="true">
        <div className={styles.boardHeader}><span className={styles.boardBrand}>ar<span> / growth studio</span></span><span className={styles.live}>THE BIGGER PICTURE</span></div>
        <div className={styles.boardIntro}><span>YOUR CUSTOMER JOURNEY</span><h2>{slide.board[0]}<br/><span>{slide.board[1]}</span></h2><p>One strategy. Every touchpoint connected.</p></div>
        <div className={styles.chart}><div className={styles.grid}/><svg viewBox="0 0 440 150" fill="none"><path className={styles.growthLine} pathLength="1" d="M0 135C35 135 40 105 78 110S125 140 164 83 210 106 250 63 310 85 345 35 395 48 440 8" stroke="#285eae" strokeWidth="3"/><path d="M0 135C35 135 40 105 78 110S125 140 164 83 210 106 250 63 310 85 345 35 395 48 440 8V150H0Z" fill="url(#marketing-fill)"/><defs><linearGradient id="marketing-fill" x1="220" y1="0" x2="220" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#285eae" stopOpacity=".28"/><stop offset="1" stopColor="#285eae" stopOpacity="0"/></linearGradient></defs></svg><div className={styles.chartLabels}><span>DISCOVER</span><span>CONNECT</span><span>CONVERT</span></div></div>
        <div className={styles.channels}><div><span>01 / SEARCH</span><strong>Get found.</strong><small>SEO & local discovery</small></div><div><span>02 / CAMPAIGNS</span><strong>Get clicks.</strong><small>Google & Meta Ads</small></div><div><span>03 / CONTENT</span><strong>Stay relevant.</strong><small>Social & creative</small></div></div>
        <div className={styles.boardFooter}><span className={styles.signal}/> Built around your business goals <span>STRATEGY CONCEPT</span></div>
      </div>
    </div>
    <div className={styles.slideControls} aria-label="Banner controls">
      <button type="button" onClick={() => selectSlide(active - 1)} aria-label="Previous banner slide">←</button>
      <div className={styles.slideDots}>{slides.map((item, index) => <button key={item.label} type="button" aria-label={`Show slide ${index + 1}: ${item.label}`} aria-pressed={active === index} onClick={() => selectSlide(index)}><span/></button>)}</div>
      <button type="button" onClick={() => selectSlide(active + 1)} aria-label="Next banner slide">→</button>
      {!reduced && <button data-playback type="button" className={styles.playback} onClick={() => setPaused(value => !value)} aria-label={paused ? "Play banner slideshow" : "Pause banner slideshow"}>{paused ? "Play" : "Pause"}</button>}
      <span className={styles.slideCount} aria-live={playing ? "off" : "polite"}>{String(active + 1).padStart(2, "0")} / 03 · {slide.label}</span>
    </div>
    <div className={styles.channelBar}><span>BUILT TO HELP YOU GROW</span><div><span>Search engine optimisation</span><span>Google & Meta Ads</span><span>Social media marketing</span><span>Conversion strategy</span></div></div>
  </section>;
}
