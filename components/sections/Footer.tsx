import { config } from "@/lib/config";
import { Brand } from "@/components/ui/Brand";
import { Newsletter } from "@/components/ui/Newsletter";
export function Footer({ innerPage = false }: { innerPage?: boolean }) {
  const homeHref = (href: string) => href.startsWith("#") && innerPage ? `/${href}` : href;
  const data = config.footer;
  return <footer id="footer" className="footer"><div className="section-container"><div className="footer-top"><div className="footer-brand"><a href={homeHref("#hero")} aria-label={`${config.name} home`}><Brand/></a><p>{data.message}</p></div><nav aria-label={data.navigationLabel}><h3>{data.navigationLabel}</h3><ul>{data.links.map(link => <li key={link.label}><a href={link.label === "Services" ? "/services" : homeHref(link.href)}>{link.label}</a></li>)}</ul></nav><div className="footer-connect"><h3>{data.connectLabel}</h3><a href={`mailto:${config.email}`}>{config.email}</a><ul aria-label={data.socialNote}>{data.socials.map(social => <li key={social}><span>{social}</span><span aria-hidden="true">↗</span></li>)}</ul><p>{data.socialNote}</p></div><Newsletter/></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {data.copyright}</p><a href={innerPage ? "#main" : "#hero"}>{data.back}<span aria-hidden="true"> ↑</span></a></div><p className="footer-wordmark" aria-hidden="true">{config.wordmark}</p><p className="footer-location">{data.location}</p></div></footer>;
}
