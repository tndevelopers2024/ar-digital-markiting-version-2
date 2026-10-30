import Link from "next/link";
import { config, servicePages } from "@/lib/config";
import { site } from "@/lib/site";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { BackToTop } from "@/components/ui/BackToTop";

export function Footer({ showInvitation = true }: { innerPage?: boolean; showInvitation?: boolean }) {
  const data = config.footer;
  const groups = [
    { label: data.buildLabel, services: servicePages.slice(0, 6) },
    { label: data.growLabel, services: servicePages.slice(6) },
  ];
  return <footer id="footer" className="footer footer-expanded">
    <div className="section-container">
      {showInvitation && <div className="footer-invitation">
        <div><h2>{data.ctaHeading}</h2><p>{data.ctaDescription}</p></div>
        <Button href="/contact">{data.ctaAction}</Button>
      </div>}
      <div className="footer-directory">
        <div className="footer-brand">
          <Link href="/" aria-label={`${config.name} home`}><Brand/></Link>
          <p>{data.message}</p>
          <address className="footer-contact-details">
            <p><strong>{site.address.label}:</strong> {site.address.line1}, {site.address.line2}, {site.address.city}</p>
            <p><strong>{site.phones.dubai.label}:</strong> <a href={site.phones.dubai.href}>{site.phones.dubai.display}</a></p>
            <p><strong>{site.phones.india.label}:</strong> <a href={site.phones.india.href}>{site.phones.india.display}</a></p>
            <p><strong>{site.whatsapp.label}:</strong> <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a></p>
          </address>
          <Link href="/contact" className="footer-contact-link">Contact our team</Link>
          <SocialLinks/>
        </div>
        <nav aria-label="Footer company"><h3>{data.companyLabel}</h3><ul><li><Link href="/">Home</Link></li>{data.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>
        {groups.map(group => <nav key={group.label} aria-label={`Footer ${group.label}`}><h3>{group.label}</h3><ul>{group.services.map(service => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>)}</ul></nav>)}
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {data.copyright} All rights reserved.</p><BackToTop/></div>
      <p className="footer-wordmark" aria-hidden="true">{config.wordmark}</p><p className="footer-location">{data.location}</p>
    </div>
  </footer>;
}
