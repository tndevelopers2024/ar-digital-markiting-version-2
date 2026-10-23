import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";
export function FinalCTA() {
  return <Section id="contact" className={`section-container ${styles.section}`}>
    <div className={styles.panel}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>LET’S MAKE YOUR NEXT MOVE COUNT</p>
        <h2 id="contact-heading">Good marketing<br/>starts with<br/><span>a clear direction.</span></h2>
        <p className={styles.description}>You bring the ambition. We’ll help you find the opportunities to turn more visits into meaningful enquiries.</p>
        <a className={styles.secondary} href="/contact">Have a project in mind? Let’s talk</a>
      </div>
      <div className={styles.audit}>
        <div className={styles.auditTop}><span>YOUR FIRST STEP</span></div>
        <h3>A fresh look at<br/>your website.</h3>
        <p>Discover what’s working—and where there’s room to grow.</p>
        <ul>
          <li><span aria-hidden="true">01</span><div><strong>Get discovered</strong><p>Search visibility and useful content.</p></div></li>
          <li><span aria-hidden="true">02</span><div><strong>Make every visit count</strong><p>Clearer pages and simpler enquiry journeys.</p></div></li>
          <li><span aria-hidden="true">03</span><div><strong>Know your next move</strong><p>Practical opportunities to focus on.</p></div></li>
        </ul>
        <Button href="#audit" className={styles.cta}>Get your free website audit</Button>
        <p className={styles.note}>Your business. Your goals. A clearer starting point.</p>
      </div>
    </div>
  </Section>;
}
