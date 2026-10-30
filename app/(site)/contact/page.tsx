import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/pages/PageParts";
import { ContactForm } from "@/components/pages/ContactForm";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";
import styles from "./ContactPage.module.css";
export const metadata = pageMetadata("Contact us", "Tell AR Digital Marketing about your website, brand, app, or marketing project. Start with a clear brief and find your next step.", "/contact");
const steps = [
  ["First, we listen.", "We review your goals, your audience, and what is already in place. Your enquiry gives us a starting point for the conversation."],
  ["Then, we find the focus.", "Together, we identify the priorities and services that fit. We’ll discuss scope, timing, and budget before proposing the work."],
  ["Next, a clear plan.", "You receive a proposed approach with deliverables and next steps, so you can decide how you would like to move forward."],
];
const questions = [
  ["Do I need a complete project brief?", "No. Share what your business does, what you want to improve, and anything you have already tried. We can work through the details together."],
  ["Can I start with just one service?", "Yes. You can start with a website, design project, content, or a marketing service. We can also discuss how several services could work together when that suits your goal."],
  ["What if I haven’t decided on a budget?", "Choose the service you are interested in and tell us your priorities. If you have a comfortable range, include it in your message; otherwise, we can discuss scope before you decide."],
  ["Can you improve an existing website or campaign?", "Yes. Include your website address or a short description of the current work in your message. We’ll discuss what is working, where you need help, and what a useful next step could look like."],
];
export default function ContactPage() {
  return <>
    <PageIntro label="Contact us" title="Let’s Talk About Your Project" description="A new idea. A better website. Your next stage of growth. Tell us where you want to go, and let’s work out the next step together." />
    <section id="page-content" className={`section-container ${styles.layout}`} aria-label="Start a project conversation">
      <aside className={styles.intro}>
        <div><p className={styles.eyebrow}>Good work starts with a conversation</p><h2><BrandHeading text="Your ambition. Our starting point." /></h2><p className={styles.copy}>You bring the business knowledge. We bring design, technology, and marketing together around your goals. A few details are all we need to get started.</p><div className={styles.tags}><span>Build something new</span><span>Improve what’s there</span><span>Reach more people</span></div></div>
        <figure className={styles.photo}><Image src="/images/inner-updated/contact-workspace.jpg" alt="Person working on a laptop at a marble desk" width={1536} height={1024} sizes="(max-width: 600px) 100vw, 40vw" /><figcaption><strong>Small beginnings.<br />Big possibilities.</strong><span>DESIGN · BUILD · GROW</span></figcaption></figure>
        <div className={styles.contactDetails}>
          <div className={styles.contactCard}>
            <span>{site.address.label}</span>
            <strong>{site.address.line1}</strong>
            <p>{site.address.line2}, {site.address.city}</p>
          </div>
          <div className={styles.contactCard}>
            <span>{site.phones.dubai.label}</span>
            <a href={site.phones.dubai.href}>{site.phones.dubai.display}</a>
          </div>
          <div className={styles.contactCard}>
            <span>{site.phones.india.label}</span>
            <a href={site.phones.india.href}>{site.phones.india.display}</a>
          </div>
          <div className={styles.contactCard}>
            <span>{site.whatsapp.label}</span>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a>
          </div>
        </div>
        {site.email && <p className={styles.email}>Prefer to put it in an email?<a href={`mailto:${site.email}`}>{site.email}</a></p>}
      </aside>
      <div className={styles.formShell}><ContactForm /></div>
    </section>
    <section className={`section-container ${styles.process}`} aria-labelledby="contact-next-title"><div className={styles.heading}><div><p className={styles.eyebrow}>From hello to a clear direction</p><h2 id="contact-next-title"><BrandHeading text="What happens next?" /></h2></div><p>A straightforward conversation about what your business needs and how we can help.</p></div><div className={styles.steps}>{steps.map(([title,copy])=><article className={styles.step} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className={`section-container ${styles.faq}`} aria-labelledby="contact-faq-title"><div className={styles.heading}><p className={styles.eyebrow}>Before you say hello</p><h2 id="contact-faq-title"><BrandHeading text="A few things you might be wondering." /></h2><p>No perfect brief required. Just a little context and a goal worth exploring.</p><Link href="/services">Find out how we can help</Link></div><div className={styles.questions}>{questions.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </>;
}
