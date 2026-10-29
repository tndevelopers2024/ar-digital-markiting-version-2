import { BrandHeading } from "@/components/ui/BrandHeading";
import styles from "./Portfolio.module.css";

export function PortfolioStats() {
  return <section className={styles.statsBanner} aria-labelledby="portfolio-approach-heading">
    <div className={styles.bannerHeader}>
      <h2 id="portfolio-approach-heading"><BrandHeading text="Ideas Into Experiences" /></h2>
      <p className={styles.bannerLead}>Explore the thinking behind a website, app, or campaign. These concept studies show how we approach a brief, shape a solution, and define useful deliverables.</p>
    </div>
    <div className={styles.statsGrid}>
      {[["01", "Understand", "Define the audience, business goal, and task to solve."], ["02", "Design", "Connect a clear message with a useful customer journey."], ["03", "Build", "Bring the agreed experience to life across devices."], ["04", "Improve", "Review feedback and decide what to work on next."]].map(([, title, copy]) => <div key={title} className={styles.statCard}><span className={styles.statLabel}>{title}</span><p className={styles.statDesc}>{copy}</p></div>)}
    </div>
  </section>;
}
