import Link from "next/link";
import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { config } from "@/lib/config";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata(
  "Terms and conditions",
  "Terms and conditions for using the AR Digital Marketing website, submitting project enquiries, and reviewing illustrative service information.",
  "/terms-and-conditions",
);

const termsSections = [
  {
    id: "part-1",
    number: "01",
    title: "Website use and acceptance",
    paragraphs: [
      "These terms and conditions govern your use of the AR Digital Marketing website. By browsing this website or submitting an enquiry through our forms, you agree to use the site lawfully and in accordance with these terms.",
      "You must not misuse the website by attempting unauthorised access, sending automated or unsolicited spam through our enquiry endpoints, interfering with security features or rate limits, or using the site in a way that disrupts access for others.",
    ],
  },
  {
    id: "part-2",
    number: "02",
    title: "Illustrative content, pricing, and examples",
    paragraphs: [
      "The information on this website is provided as a general guide to our design, development, e-commerce, mobile app, AI, testing, and digital marketing services. Campaign previews, portfolio concepts, interactive product demonstrations, and sample dashboards are illustrative examples created to explain our approach unless explicitly stated otherwise.",
      "Any indicative package pricing shown on the website is a starting point for discussion and excludes advertising media spend, third-party software subscriptions, payment processing fees, and applicable taxes unless expressly included in a written agreement. Search rankings, traffic, conversion rates, and commercial results depend on many factors outside our control and are never guaranteed.",
    ],
  },
  {
    id: "part-3",
    number: "03",
    title: "Enquiries, audits, and project agreements",
    paragraphs: [
      "Submitting a contact form, portfolio enquiry, or free website audit request does not create a binding contract or agency relationship. We review each enquiry to confirm whether the project is a suitable fit and how we can help.",
      "All client engagements are governed by a separate written proposal, statement of work, or service agreement signed by both parties. That agreement sets out the confirmed scope, deliverables, review milestones, fees, payment schedule, intellectual property handover, and post-launch support arrangements.",
    ],
  },
  {
    id: "part-4",
    number: "04",
    title: "Intellectual property",
    paragraphs: [
      "Unless otherwise noted, the text, layout, visual design, custom graphics, and source code on this website are owned by or licensed to AR Digital Marketing and are protected by applicable copyright and intellectual property laws. You may view and print pages for your own business evaluation, but you may not copy, republish, or redistribute website materials for commercial use without written permission.",
      "Product names, logos, and platform marks mentioned on the website identify the respective tools and platforms and remain the property of their respective owners. Their inclusion does not imply formal endorsement or partnership unless explicitly stated.",
    ],
  },
  {
    id: "part-5",
    number: "05",
    title: "Privacy and third-party services",
    paragraphs: [
      "Information you submit through our website forms is handled in accordance with our privacy policy. Please do not submit confidential credentials, regulated personal data, or payment details through general website forms.",
      "Where this website links to external websites, social profiles, or third-party platforms, those services are operated independently and are governed by their own terms and privacy practices.",
    ],
  },
  {
    id: "part-6",
    number: "06",
    title: "Disclaimers, liability, and updates",
    paragraphs: [
      "While we take care to keep the website accurate, accessible, and secure, the site and its content are provided on an “as is” and “as available” basis without warranties of uninterrupted availability or fitness for a particular purpose. To the fullest extent permitted by law, AR Digital Marketing is not liable for indirect or consequential loss arising from your use of, or reliance on, general information on this website.",
      "We may update these terms and conditions from time to time to reflect changes in our services, website features, or legal requirements. The latest version will always be published on this page.",
    ],
  },
] as const;

const keyPoints = [
  "Website content, campaign concepts, and starting prices are for general guidance rather than a binding offer.",
  "Every client project is governed by a separate written scope and agreement before work begins.",
  "Media spend, third-party tools, and platform fees are separate unless explicitly included in your proposal.",
  "Personal details shared in enquiries are handled in line with our privacy policy.",
] as const;

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageIntro
        label="Terms and conditions"
        title="Terms and Conditions"
        description="Clear terms for browsing the AR Digital Marketing website, exploring our service examples, and starting a project conversation with our team."
      />
      <div id="page-content" className="section-container blog-article-layout">
        <aside aria-label="Terms and conditions sections">
          <p>IN THESE TERMS</p>
          {termsSections.map(section => (
            <Link key={section.id} href={`#${section.id}`}>
              {section.title}
            </Link>
          ))}
        </aside>
        <article className="blog-article">
          <p className="article-byline">
            {config.name} · Effective October 2026
          </p>
          {termsSections.map(section => (
            <section id={section.id} key={section.id}>
              <span>{section.number}</span>
              <h2>
                <BrandHeading text={section.title} />
              </h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section className="article-checklist">
            <h2>
              <BrandHeading text="Key points at a glance" />
            </h2>
            <ul>
              {keyPoints.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
          <section className="article-takeaway">
            <span>QUESTIONS ABOUT THESE TERMS</span>
            <p>
              If you have a question about these website terms, our privacy policy, or how we scope and agree client projects, please contact our team.
            </p>
            {site.email ? (
              <a href={`mailto:${site.email}`}>Email {site.email}</a>
            ) : (
              <Link href="/contact">Contact our team →</Link>
            )}
          </section>
          <Link className="inner-text-link" href="/privacy-policy">
            ← Read our privacy policy
          </Link>
        </article>
      </div>
      <PageCTA title="Ready to Discuss Your Project?" />
    </>
  );
}
