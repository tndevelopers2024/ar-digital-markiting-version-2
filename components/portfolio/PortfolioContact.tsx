import { ContactForm } from "@/components/pages/ContactForm";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { site } from "@/lib/site";
import styles from "./Portfolio.module.css";

export function PortfolioContact() {
  return <section id="contact-section" className={styles.contactSection} aria-labelledby="portfolio-contact-title">
    <div className={styles.contactLayout}>
      <div className={styles.contactInfoSide}>
        <h2 id="portfolio-contact-title"><BrandHeading text="Let’s Build Your Next Project" /></h2>
        <p>Tell us what you want to create and what success would look like. We’ll help you define the scope, priorities, and next steps.</p>
        <ul className="project-enquiry-points"><li>A conversation about your goals</li><li>A clear scope and delivery plan</li><li>Design, development, and marketing together</li></ul>
        <div className={styles.contactCardsList}>
          <div className={styles.contactDirectCard}>
            <div className={styles.contactCardCopy}>
              <span>{site.address.label}</span>
              <strong>{site.address.full}</strong>
            </div>
          </div>
          <div className={styles.contactDirectCard}>
            <div className={styles.contactCardCopy}>
              <span>{site.phones.dubai.label}</span>
              <strong><a href={site.phones.dubai.href}>{site.phones.dubai.display}</a></strong>
            </div>
          </div>
          <div className={styles.contactDirectCard}>
            <div className={styles.contactCardCopy}>
              <span>{site.phones.india.label}</span>
              <strong><a href={site.phones.india.href}>{site.phones.india.display}</a></strong>
            </div>
          </div>
          <div className={styles.contactDirectCard}>
            <div className={styles.contactCardCopy}>
              <span>{site.whatsapp.label}</span>
              <strong><a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a></strong>
            </div>
          </div>
        </div>
        {site.email && <a className="inner-text-link" href={`mailto:${site.email}`}>{site.email}</a>}
      </div>
      <ContactForm />
    </div>
  </section>;
}
