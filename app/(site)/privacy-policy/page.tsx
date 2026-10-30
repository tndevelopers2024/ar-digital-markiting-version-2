import Link from "next/link";
import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { BrandHeading } from "@/components/ui/BrandHeading";
import { config } from "@/lib/config";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata(
  "Privacy policy",
  "How AR Digital Marketing collects, uses, and protects the information you share through our website and enquiry forms.",
  "/privacy-policy",
);

const policySections = [
  {
    id: "part-1",
    number: "01",
    title: "Information we collect",
    paragraphs: [
      "We only collect personal information that you choose to share with us when you make an enquiry. Depending on whether you use our contact form, portfolio enquiry form, project popup, or free website audit form, this includes your name, email address, website URL, the service you are interested in, an indicative budget range, and the project details in your message.",
      "Please avoid including passwords, payment card numbers, confidential business credentials, or sensitive personal data in any website form. If a project requires access to private systems or documents, we will agree a secure way to share them after our initial conversation.",
    ],
  },
  {
    id: "part-2",
    number: "02",
    title: "How we use your information",
    paragraphs: [
      "We use the details you submit to review your request, understand your goals, prepare a relevant response or website audit, and follow up about a potential project. We do not use enquiry form submissions to subscribe you to automated marketing newsletters unless you explicitly ask us to.",
      "We also use basic technical checks when a form is submitted—including origin verification, a hidden anti-spam field, payload size limits, and a temporary SHA-256 hash of the network address—solely to protect the website from automated abuse and repeated spam requests.",
    ],
  },
  {
    id: "part-3",
    number: "03",
    title: "How enquiries are processed and shared",
    paragraphs: [
      "When you submit a form on this website, our server validates the fields and forwards the enquiry over an encrypted HTTPS connection to our designated enquiry processor or business inbox, along with a unique request identifier and timestamp.",
      "We do not sell, rent, or trade your personal information. Access is limited to team members and trusted service providers (such as our website host, email service, or customer relationship tools) who need the information to deliver and respond to your enquiry under confidentiality and data-protection commitments.",
    ],
  },
  {
    id: "part-4",
    number: "04",
    title: "Browser storage, cookies, and analytics",
    paragraphs: [
      "This website uses temporary browser session storage in your active tab (specifically the project-popup-seen key) so that the project enquiry prompt does not repeat while you browse.",
      "These session storage items are cleared when you close your browser tab and do not track you across other websites. We do not set third-party advertising cookies by default.",
    ],
  },
  {
    id: "part-5",
    number: "05",
    title: "Data retention and security",
    paragraphs: [
      "Temporary rate-limit counters held in server memory expire automatically after 60 seconds. Enquiry messages and related correspondence are kept only for as long as needed to respond to your request, manage an active client relationship, or meet applicable legal, tax, and accounting requirements.",
      "We protect information in transit using HTTPS and apply strict browser security headers, content validation, and server-side timeouts. While no internet transmission can be guaranteed to be completely free of risk, we design our forms and infrastructure to minimise the data we collect and exposure to unauthorised access.",
    ],
  },
  {
    id: "part-6",
    number: "06",
    title: "Your choices and privacy rights",
    paragraphs: [
      "Depending on where you live and the laws that apply to you, you may have the right to request access to the personal information we hold about you, ask us to correct inaccurate details, request deletion of your enquiry records, or object to or restrict certain processing.",
      "To make a privacy request or ask a question about how your information is handled, please contact our team through the contact page or by email where a business contact address is published. We may ask you to confirm your identity before acting on a request regarding stored enquiry data.",
    ],
  },
] as const;

const summaryPoints = [
  "We only collect the contact and project details you choose to submit in our forms.",
  "Your details are used to respond to your enquiry or website audit request—never sold to third parties.",
  "Session storage is used only to remember interface states during your current browsing tab.",
  "You can request access, correction, or deletion of your enquiry details at any time.",
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        label="Privacy policy"
        title="Privacy Policy"
        description="How AR Digital Marketing collects, uses, and protects the information you share when you browse our website or get in touch about a project."
      />
      <div id="page-content" className="section-container blog-article-layout">
        <aside aria-label="Privacy policy sections">
          <p>IN THIS POLICY</p>
          {policySections.map(section => (
            <Link key={section.id} href={`#${section.id}`}>
              {section.title}
            </Link>
          ))}
        </aside>
        <article className="blog-article">
          <p className="article-byline">
            {config.name} · Effective October 2026
          </p>
          {policySections.map(section => (
            <section id={section.id} key={section.id}>

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
              <BrandHeading text="Privacy at a glance" />
            </h2>
            <ul>
              {summaryPoints.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
          <section className="article-takeaway">
            <span>QUESTIONS OR DATA REQUESTS</span>
            <p>
              If you would like to review, update, or delete the details you have shared with{" "}
              {config.name}, or if you have a question about this policy, please get in touch with our team.
            </p>
            <p>
              <strong>{site.address.label}:</strong> {site.address.full}
              <br />
              <strong>{site.phones.dubai.label}:</strong> <a href={site.phones.dubai.href}>{site.phones.dubai.display}</a> ·{" "}
              <strong>{site.phones.india.label}:</strong> <a href={site.phones.india.href}>{site.phones.india.display}</a> ·{" "}
              <strong>{site.whatsapp.label}:</strong> <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a>
            </p>
            {site.email ? (
              <a href={`mailto:${site.email}`}>Email {site.email}</a>
            ) : (
              <Link href="/contact">Contact our team →</Link>
            )}
          </section>
          <Link className="inner-text-link" href="/terms-and-conditions">
            Read our terms and conditions →
          </Link>
        </article>
      </div>
      <PageCTA title="Questions About Your Privacy?" />
    </>
  );
}
