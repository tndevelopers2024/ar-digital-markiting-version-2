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
      <p>We bring design, development, and digital marketing together to help your business grow. From your brand identity and website to mobile apps and AI solutions, we create digital experiences built around your goals.</p>
      <p>We start by understanding your business, your audience, and what you want to achieve. Then we turn that understanding into thoughtful design, reliable technology, and campaigns that help the right people find you.</p>
      <p>With one connected team, clear communication, and support beyond launch, you always know what’s happening and what comes next.</p>
      <Link href="/about" className={styles.link}>More about us <span aria-hidden="true"></span></Link>
    </div>
    </div>
    <figure className={styles.photo}><Image {...homeImages.strategy} alt={homeImages.strategy.alt} fill sizes="(max-width: 767px) 100vw, 45vw"/></figure>
    <div className={styles.highlights}>
      <dl className={styles.overview}>
        <div><dt>Years in business</dt><dd>8+</dd></div>
        <div><dt>Projects delivered</dt><dd>500+</dd></div>
        <div><dt>Happy clients</dt><dd>500+</dd></div>
        <div><dt>Code &amp; IP ownership</dt><dd>100%</dd></div>
      </dl>

    </div>
  </section>;
}
