"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { config, servicePages, siteFeatures } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Navbar({ innerPage = false }: { innerPage?: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const closeMenus = () => { setOpen(false); setServicesOpen(false); };
  const homeHref = (href: string) => href.startsWith("#") && innerPage ? `/${href}` : href;
  const [servicesOpen, setServicesOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    let previous = window.scrollY;
    let hidden = false;
    function scroll() {
      const current = window.scrollY;
      const shouldHide = current > previous && current > 160 && !open && !servicesOpen;
      if (Math.abs(current - previous) < 5 && current > 160) return;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        gsap.to(ref.current, { yPercent: shouldHide ? -160 : 0, duration: reduced ? 0 : motion.normal, ease: motion.ease, overwrite: true });
      }
      previous = current;
    }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); setServicesOpen(false); } }
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", escape);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("keydown", escape); gsap.killTweensOf(element); };
  }, [open, servicesOpen, reduced]);
  useEffect(() => {
    function outside(event: PointerEvent) { if (!ref.current?.contains(event.target as Node)) { setOpen(false); setServicesOpen(false); } }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return <header ref={ref} className="nav-shell" onFocusCapture={() => gsap.to(ref.current, { yPercent: 0, duration: 0.2, overwrite: true })}>
    <Link href="/" onClick={closeMenus} className="brand-link" aria-label={`${config.name} home`}><Brand/></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{config.navigation.map(link => link.label === "Services" && siteFeatures.servicePages ? <div className={`nav-services ${isActive("/services") ? "nav-active" : ""}`} key={link.label}><Link href="/services" onClick={closeMenus} aria-current={pathname === "/services" ? "page" : undefined}>Services</Link><button type="button" aria-label={servicesOpen ? "Close service pages" : "Show service pages"} aria-expanded={servicesOpen} aria-controls="service-menu" onClick={() => setServicesOpen(!servicesOpen)}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div> : <Link href={homeHref(link.href)} onClick={closeMenus} className={isActive(link.href) ? "nav-active" : undefined} aria-current={pathname === link.href ? "page" : undefined} key={link.label}>{link.label}</Link>)}</nav>
    {siteFeatures.servicePages && servicesOpen && <nav id="service-menu" className="service-menu" aria-label="Service pages"><div><p>WHAT CAN WE HELP WITH?</p><Link href="/services">Explore all services ↗</Link></div><ul>{servicePages.map(service => <li key={service.slug}><Link href={`/services/${service.slug}`} onClick={closeMenus}>{service.name}<span aria-hidden="true">↗</span></Link></li>)}</ul></nav>}
    <Button href={homeHref(config.booking.href)} className="nav-cta">{config.booking.label}</Button>
    <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => { setOpen(!open); setServicesOpen(false); }}><span/><span/></button>
    {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{config.navigation.map(link => <Link href={link.label === "Services" && siteFeatures.servicePages ? "/services" : homeHref(link.href)} key={link.label} aria-current={pathname === link.href ? "page" : undefined} onClick={closeMenus}>{link.label}<span aria-hidden="true">↗</span></Link>)}{siteFeatures.servicePages && <details className="mobile-service-links"><summary>Explore services <span aria-hidden="true">+</span></summary>{servicePages.map(service => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenus}>{service.name}</Link>)}</details>}</nav>}
  </header>;
}
