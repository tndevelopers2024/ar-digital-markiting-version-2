"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { config, servicePages, siteFeatures } from "@/lib/config";
import {
  Navbar as AceternityNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar({ innerPage = false }: { innerPage?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const homeHref = (href: string) =>
    href.startsWith("#") && innerPage ? `/${href}` : href;

  const closeMenus = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const expanded = containerRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
        expanded?.focus();
        closeMenus();
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = config.navigation.map((link) => ({
    name: link.label,
    link:
      link.label === "Services" && siteFeatures.servicePages
        ? "/services"
        : homeHref(link.href),
  }));

  return (
    <div ref={containerRef}>
      <AceternityNavbar>
        {/* Desktop Resizable Nav */}
        <NavBody className="justify-between relative">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="relative z-20 flex items-center pr-2 group"
            aria-label={`${config.name} home`}
          >
            <Brand className="transition-transform duration-200 group-hover:scale-[1.02]" />
          </Link>

          {/* Navigation Links with Hover Pill Indicator */}
          <NavItems
            items={navItems}
            activeHref={pathname}
            renderItem={(item) => {
              const isServices =
                item.name === "Services" && siteFeatures.servicePages;
              const active = isServices
                ? isActive("/services")
                : isActive(item.link);

              return (
                <div
                  className="relative flex items-center"
                  onBlur={event => {
                    if (isServices && !event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false);
                  }}
                  onMouseEnter={() => {
                    if (isServices) setServicesOpen(true);
                  }}
                >
                  <Link
                    href={item.link}
                    onClick={closeMenus}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full flex items-center gap-1",
                      active
                        ? "text-neutral-900 font-semibold"
                        : "text-neutral-600 ",
                    )}
                  >
                    <span className="relative z-20">{item.name}</span>
                  </Link>
                    {isServices && (
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-label="Toggle services menu"
                        aria-controls="desktop-services-menu"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setServicesOpen(!servicesOpen);
                        }}
                        className="relative z-20 min-h-11 min-w-7 flex items-center justify-center text-neutral-500 transition-transform"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={cn(
                            "transition-transform duration-200",
                            servicesOpen && "rotate-180",
                          )}
                        >
                          <path
                            d="m4 6 4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}

                  {/* Services Dropdown Menu */}
                  {isServices && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          id="desktop-services-menu"
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          onMouseLeave={() => setServicesOpen(false)}
                          className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[680px] rounded-3xl bg-white/95 p-6 shadow-2xl border border-neutral-200/80 backdrop-blur-2xl z-50 pointer-events-auto"
                        >
                          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                            <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                              WHAT CAN WE HELP WITH?
                            </span>
                            <Link
                              href="/services"
                              onClick={closeMenus}
                              className="text-xs font-semibold text-blue-600  flex items-center gap-1"
                            >
                              Explore all services
                            </Link>
                          </div>
                          <ul className="grid grid-cols-2 gap-2 pt-4">
                            {servicePages.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={closeMenus}
                                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-medium text-neutral-700   transition-colors"
                                >
                                  <span>{service.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            }}
          />

          {/* Primary Action Button */}
          <div className="relative z-20 pl-2">
            <Button
              href={homeHref(config.booking.href)}
              onClick={closeMenus}
              className="nav-cta"
            >
              {config.booking.label}
            </Button>
          </div>
        </NavBody>

        {/* Mobile Resizable Nav */}
        <MobileNav>
          <MobileNavHeader>
            <Link
              href="/"
              onClick={closeMenus}
              className="flex items-center"
              aria-label={`${config.name} home`}
            >
              <Brand />
            </Link>
            <div className="flex items-center gap-2">
              <Button
                href={homeHref(config.booking.href)}
                onClick={closeMenus}
                className="nav-cta nav-cta-mobile"
              >
                {config.booking.label}
              </Button>
              <MobileNavToggle
                isOpen={open}
                onClick={() => {
                  setOpen(!open);
                  setServicesOpen(false);
                }}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col w-full divide-y divide-neutral-100">
              {config.navigation.map((link) => {
                const isServices =
                  link.label === "Services" && siteFeatures.servicePages;
                const linkHref = isServices ? "/services" : homeHref(link.href);
                const active = isActive(linkHref);

                return (
                  <div key={link.label} className="py-2.5 flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={linkHref}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMenus}
                        className={cn(
                          "text-base font-semibold transition-colors flex items-center justify-between w-full py-1",
                          active ? "text-neutral-950 font-bold" : "text-neutral-700",
                        )}
                      >
                        <span>{link.label}</span>
                      </Link>
                    </div>

                    {isServices && (
                      <details className="mt-2 text-sm text-neutral-600 bg-neutral-50 rounded-2xl p-3 border border-neutral-100">
                        <summary className="cursor-pointer font-medium text-neutral-800 flex items-center justify-between py-1">
                          <span>Explore all services</span>
                          <span className="text-neutral-400 text-xs">+</span>
                        </summary>
                        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-neutral-200/60">
                          {servicePages.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={closeMenus}
                              className="text-neutral-700  py-1 flex items-center justify-between"
                            >
                              <span>{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full pt-3">
              <Button
                href={homeHref(config.booking.href)}
                onClick={closeMenus}
                className="nav-cta w-full"
              >
                {config.booking.label}
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </AceternityNavbar>
    </div>
  );
}
