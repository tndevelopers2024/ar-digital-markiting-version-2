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
        {site.email && <a className="inner-text-link" href={`mailto:${site.email}`}>{site.email}</a>}
      </div>
      <ContactForm />
    </div>
  </section>;
}
