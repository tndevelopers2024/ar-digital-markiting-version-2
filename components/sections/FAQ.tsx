import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
export function FAQ() {
  const data = config.faq;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <Section id="faq" className="faq section-container batch-section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/><div className="faq-layout"><div className="faq-intro" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="faq-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p>{data.description}</p><div className="faq-contact"><p>{data.contact}</p><a href="#audit">{data.action}<span aria-hidden="true"> ↗</span></a></div></div><Accordion items={data.items}/></div></Section>;
}
