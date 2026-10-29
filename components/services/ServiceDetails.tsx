import Link from "next/link";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { serviceDetails } from "@/lib/service-details";
import styles from "./ServiceDetails.module.css";

export function ServiceDetails({ slug }: { slug: keyof typeof serviceDetails }) {
  const details = serviceDetails[slug];
  return <div className={styles.expansion}>
    <section className={`section-container ${styles.section}`} aria-labelledby="service-fit-heading">
      <div className={styles.heading}><div><p className={styles.eyebrow}>Find your starting point</p><h2 id="service-fit-heading"><BrandHeading text="Where this service fits." /></h2></div><p>{details.introduction}</p></div>
      <div className={styles.scenarios}>{details.situations.map(([title, description]) => <article key={title}><div className={styles.cardTop}><span className={styles.motif} aria-hidden="true"><i /><i /><i /></span></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className={`section-container ${styles.section}`} aria-labelledby="service-deliverables-heading">
      <div className={styles.deliverables}><div className={styles.deliverablesIntro}><p className={styles.eyebrow}>Clarity at every milestone</p><h2 id="service-deliverables-heading"><BrandHeading text="Know what you’re working towards." /></h2><p>We turn the brief into tangible work you can review. These are examples of deliverables we can include; your proposal defines the exact scope.</p><div className={styles.scopeNote}><span aria-hidden="true">✓</span><p>Agreed deliverables.<br />Clear responsibilities.<br />Room for useful feedback.</p></div></div><ol className={styles.deliverableList}>{details.deliverables.map(([title, description]) => <li key={title}><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div>
    </section>
    <section className={`section-container ${styles.section}`} aria-labelledby="service-preparation-heading"><div className={styles.preparation}><div><p className={styles.eyebrow}>A useful first conversation</p><h2 id="service-preparation-heading"><BrandHeading text="Bring the context. We’ll shape the plan." /></h2><p>You don’t need every answer before getting in touch. Share what you have, and we’ll help identify the missing pieces.</p><Link href="/contact" className={styles.textLink}>Tell us about your project</Link></div><div className={styles.brief}><div className={styles.briefHeader}><span>YOUR STARTING CHECKLIST</span><span>Essentials</span></div><ul>{details.preparation.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><p>Have only part of the brief? Start there. We can help organise the remaining requirements during the first conversation.</p></div></div></section>
    <section className={`section-container ${styles.section}`} aria-labelledby="service-support-heading"><div className={styles.support}><div><p className={styles.eyebrow}>Think beyond the first delivery</p><h2 id="service-support-heading"><BrandHeading text={details.support[0]} /></h2></div><div><p>{details.support[1]}</p><Link href="/contact" className={styles.button}>Discuss ongoing support</Link></div></div></section>
  </div>;
}
