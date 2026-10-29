import Link from "next/link";
import styles from "./MarketingHero.module.css";

export function Hero() {
  return <section id="hero" className={`section-container ${styles.hero}`} aria-labelledby="hero-heading">
    <div className={styles.backdrop} aria-hidden="true" />
    <div className={styles.copy}>
      <p className={styles.eyebrow}>AR DIGITAL MARKETING</p>
      <h1 id="hero-heading" className={styles.title}>Digital marketing<br/>that helps your<br/><span>business grow.</span></h1>
      <p className={styles.description}>We help businesses reach the right people and turn attention into enquiries through SEO, paid advertising, social media and creative content.</p>
      <div className={styles.actions}><Link href="#audit" className={styles.primary}>Get your free website audit</Link></div>
      <p className={styles.promise}>Audience-first strategy <span>·</span> Clear reporting <span>·</span> Ongoing optimisation</p>
    </div>
    <div className={styles.visual} tabIndex={0} role="img" aria-label="Illustrative marketing plan connecting search, paid ads, and social content to a customer enquiry. This is a concept, not live performance data.">
      <div className={styles.board} aria-hidden="true">
        <div className={styles.boardHeader}><span className={styles.boardBrand}>ar<span> / growth studio</span></span><span className={styles.live}>THE BIGGER PICTURE</span></div>
        <div className={styles.boardIntro}><span>YOUR CUSTOMER JOURNEY</span><h2>Turn attention<br/><span>into opportunity.</span></h2><p>One strategy. Every touchpoint connected.</p></div>
        <div className={styles.chart}><div className={styles.grid}/><svg viewBox="0 0 440 150" fill="none"><path className={styles.growthLine} pathLength="1" d="M0 135C35 135 40 105 78 110S125 140 164 83 210 106 250 63 310 85 345 35 395 48 440 8" stroke="#285eae" strokeWidth="3"/><path d="M0 135C35 135 40 105 78 110S125 140 164 83 210 106 250 63 310 85 345 35 395 48 440 8V150H0Z" fill="url(#marketing-fill)"/><defs><linearGradient id="marketing-fill" x1="220" y1="0" x2="220" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#285eae" stopOpacity=".28"/><stop offset="1" stopColor="#285eae" stopOpacity="0"/></linearGradient></defs></svg><div className={styles.chartLabels}><span>DISCOVER</span><span>CONNECT</span><span>CONVERT</span></div></div>
        <div className={styles.channels}><div><span>SEARCH</span><strong>Get found.</strong><small>SEO & local discovery</small></div><div><span>CAMPAIGNS</span><strong>Get clicks.</strong><small>Google & Meta Ads</small></div><div><span>CONTENT</span><strong>Stay relevant.</strong><small>Social & creative</small></div></div>
        <div className={styles.boardFooter}>Built around your business goals <span>STRATEGY CONCEPT</span></div>
      </div>
    </div>
  </section>;
}
