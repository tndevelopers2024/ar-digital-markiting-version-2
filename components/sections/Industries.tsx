"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Industries.module.css";

const stories = [
  { headline: "From first look to next purchase.", copy: "Help shoppers discover your products, feel confident in their choice, and find a reason to come back.", focus: ["Product storytelling", "Shopping experiences", "Customer retention"], alt: "Clothing and merchandise displayed in a retail store" },
  { headline: "Turn curiosity into a new chapter.", copy: "Make your courses easier to discover and help future learners understand where their next step could take them.", focus: ["Course discovery", "Enrolment journeys", "Useful content"], alt: "Students collaborating around a laptop in a library" },
  { headline: "Make the first step feel easier.", copy: "Bring clarity to your services with approachable content and simple journeys from an initial question to an enquiry.", focus: ["Service information", "Local visibility", "Appointment enquiries"], alt: "Bright reception area inside a healthcare facility" },
  { headline: "Let your spaces tell their story.", copy: "Show the details that make a project different and connect interested people with the information they need.", focus: ["Project showcases", "Location storytelling", "Qualified enquiries"], alt: "Modern residential property beside a swimming pool" },
  { headline: "Give them a taste before they arrive.", copy: "Capture the atmosphere, share what makes your place special, and make planning a visit feel effortless.", focus: ["Menu & venue content", "Local discovery", "Reservation journeys"], alt: "Restaurant interior with dining tables and warm lighting" },
  { headline: "Make your expertise easy to choose.", copy: "Explain the value of your work, answer the questions that matter, and create a confident first impression.", focus: ["Clear positioning", "Thoughtful websites", "Lead generation"], alt: "Modern office towers viewed from street level" },
];

export function Industries() {
  const items = config.industries.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const reduced = useReducedMotion();
  const playing = !paused && !reduced;
  useEffect(() => {
    if (!playing || engaged) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(index => (index + 1) % items.length); }, 8000);
    return () => window.clearInterval(timer);
  }, [playing, engaged, items.length]);
  const item = items[active];
  const story = stories[active];
  return <Section id="industries" className={`industries section-container batch-section ${styles.section}`}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>Different worlds. Shared ambition.</p><h2 id="industries-heading">Your industry.<br /><span>Our next possibility.</span></h2></div><p>Every business has its own world.<br />We get to know yours, then shape the design, content, and marketing around it.</p></div>
    <div className={styles.showcase} onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}>
      <div className={styles.menu}>
        <div className={styles.options} role="group" aria-label="Choose an industry">{items.map((industry,index) => <button type="button" key={industry.name} aria-pressed={active === index} aria-controls="industry-feature" className={styles.option} onClick={() => { setActive(index); setPaused(true); }}><Icon name={industry.icon} /><span>{industry.name}</span></button>)}</div>
        <div className={styles.menuFooter}><p>Don’t see your industry?<br /><Link href="/contact">Let’s find your direction.</Link></p>{!reduced && <button type="button" className={styles.playback} onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume industries" : "Pause industries"}>{paused ? "Play" : "Pause"}</button>}</div>
      </div>
      <div id="industry-feature" className={styles.feature} role="region" aria-label="Featured industry" aria-live={playing ? "off" : "polite"}>
        <div className={styles.photo} key={item.image}><Image src={item.image} alt={story.alt} fill sizes="(max-width: 800px) 100vw, 58vw" /><span className={styles.photoLabel}>{item.name}</span><span className={styles.photoNumber} aria-hidden="true">{item.number}</span></div>
        <div className={styles.detail}><p className={styles.eyebrow}>Built around your audience</p><h3>{story.headline}</h3><p className={styles.description}>{story.copy}</p><div className={styles.tags}>{story.focus.map(focus => <span key={focus}>{focus}</span>)}</div><div className={styles.detailFooter}><Link href="/contact">Let’s talk about your business</Link><span>{item.number} / 06</span></div></div>
      </div>
    </div>
  </Section>;
}
