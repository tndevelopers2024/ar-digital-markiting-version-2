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
      </div>
      <div className={styles.audit}>
        <div className={styles.auditTop}><span>YOUR FIRST STEP</span></div>
        <h3>Let’s talk about<br/>your goals.</h3>
        <p>Tell us what you want to achieve and we’ll help you find a clear next step.</p>
        <ul>
          <li><div><strong>Get discovered</strong><p>Search visibility and useful content.</p></div></li>
          <li><div><strong>Make every visit count</strong><p>Clearer pages and simpler enquiry journeys.</p></div></li>
          <li><div><strong>Know your next move</strong><p>Practical opportunities to focus on.</p></div></li>
        </ul>
        <Button href="/contact" className={styles.cta}>Talk to our team</Button>
        <p className={styles.note}>Your business. Your goals. A clearer starting point.</p>
      </div>
    </div>
  </Section>;
}
