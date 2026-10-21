import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
export function FAQ() {
  const data = config.faq;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <Section id="faq" className="faq section-container batch-section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/><div className="faq-layout"><div className="faq-intro" data-reveal><h2 id="faq-heading">Frequently Asked <span>Questions</span></h2><p className="section-description">Find clear answers about our services and how we work.<br className="description-break"/>{" "}Here’s what to know before starting your project.</p><div className="faq-contact"><p>{data.contact}</p><a href="#audit">{data.action}</a></div></div><Accordion items={data.items} openOnHover/></div></Section>;
}
