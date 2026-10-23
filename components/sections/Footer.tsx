import Link from "next/link";
import { config, servicePages } from "@/lib/config";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer({ innerPage = false, showInvitation = true }: { innerPage?: boolean; showInvitation?: boolean }) {
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
          <Link href="/contact" className="footer-contact-link">Contact our team</Link>
          <SocialLinks/>
        </div>
        <nav aria-label="Footer company"><h3>{data.companyLabel}</h3><ul><li><Link href="/">Home</Link></li>{data.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>
        {groups.map(group => <nav key={group.label} aria-label={`Footer ${group.label}`}><h3>{group.label}</h3><ul>{group.services.map(service => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>)}</ul></nav>)}
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {data.copyright} All rights reserved.</p><Link href={innerPage ? "#main" : "#hero"}>{data.back}</Link></div>
      <p className="footer-wordmark" aria-hidden="true">{config.wordmark}</p><p className="footer-location">{data.location}</p>
    </div>
  </footer>;
}
