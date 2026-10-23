import Image from "next/image";
import Link from "next/link";
import { homeImages } from "@/lib/config";
import styles from "./About.module.css";

export function About() {
  return <section id="about" className={`section-container ${styles.section}`} aria-labelledby="about-heading">
    <div className={styles.text}>
    <header className={styles.heading}>
      <span className={styles.label}>About</span>
      <h2 id="about-heading">AR Digital<br/><span className={styles.red}>Marketing</span></h2>
    </header>
    <div className={styles.copy}>
      <p>We help businesses get discovered, build trust, and turn online interest into enquiries. Our work brings search, paid advertising, social media, and conversion-focused websites into one connected marketing plan.</p>
      <p>We start by understanding your business, your audience, and what you want to achieve. Then we choose the channels, messages, and customer journeys that fit those goals—and agree on what success should look like.</p>
      <p>From campaign planning to ongoing optimisation, you get clear communication, useful reporting, and a team that keeps asking what could work better.</p>
      <Link href="/about" className={styles.link}>More about us <span aria-hidden="true"></span></Link>
    </div>
    </div>
    <figure className={styles.photo}><Image {...homeImages.strategy} alt={homeImages.strategy.alt} fill sizes="(max-width: 767px) 100vw, 45vw"/></figure>
    <div className={styles.highlights}>
      <dl className={styles.overview}>
        <div><dt>Get discovered</dt><dd>Search</dd></div>
        <div><dt>Reach your audience</dt><dd>Paid ads</dd></div>
        <div><dt>Build recognition</dt><dd>Social</dd></div>
        <div><dt>Learn and improve</dt><dd>Insights</dd></div>
      </dl>

    </div>
  </section>;
}
