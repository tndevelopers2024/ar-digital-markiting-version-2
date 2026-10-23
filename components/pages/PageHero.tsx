import Image from "next/image";
import Link from "next/link";
import { BrandHeading } from "@/components/ui/BrandHeading";
import styles from "./PageHero.module.css";

type Crumb = { label: string; href?: string };
export function PageHero({ title, description, breadcrumbs, imageSrc, imageKey = "services" }: { title: string; description: string; breadcrumbs: Crumb[]; imageKey?: string; imageSrc?: string }) {
  const headerImages: Record<string, string> = {
    "article-metrics": "/images/unique/header-article-metrics.jpg",
    "article-brand": "/images/unique/header-article-brand.jpg",
    "article-visitors": "/images/unique/header-article-visitors.jpg",
    "digital-marketing": "/images/unique/header-marketing.jpg",
    "video-editing": "/images/unique/header-video.jpg",
    "ui-ux-design": "/images/unique/header-uiux.jpg",
    "branding-strategy": "/images/unique/header-branding.jpg",
    "ecommerce-development": "/images/unique/header-ecommerce.jpg",
    "project-seo": "/images/inner-updated/search-performance.jpg",
    "project-paid": "/images/inner-updated/paid-performance.jpg",
    "project-social": "/images/inner-updated/social-campaign.jpg",
    "project-local": "/images/unique/header-local.jpg",
    "project-retention": "/images/unique/header-retention.jpg",
    "portfolio": "/images/portfolio-exclusive/header.jpg",
    "privacy": "/images/unique/header-privacy.jpg",
    "terms": "/images/unique/header-terms.jpg",
  };
  return <header className={`section-container ${styles.hero}`}>
    <div className={styles.photo} aria-hidden="true"><Image src={imageSrc ?? headerImages[imageKey] ?? `/images/pages/${imageKey}.webp`} alt="" fill sizes="(max-width: 767px) 100vw, 60vw" preload /></div>
    <div className={styles.content}>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link>{breadcrumbs.map((crumb, index) => <span className={styles.crumb} key={`${crumb.label}-${index}`}><span aria-hidden="true">/</span>{crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}</span>)}</nav>
    <h1><BrandHeading text={title}/></h1>
    <p className={styles.description}>{description}</p>
    <div className={styles.actions}><Link href={imageKey === "contact" ? "#page-content" : "/contact"} className={styles.primary}>{imageKey === "contact" ? "Tell us about your project" : "Let’s talk about your goals"}</Link><Link href="/services" className={styles.secondary}>Explore services</Link></div>
    </div>
  </header>;
}
