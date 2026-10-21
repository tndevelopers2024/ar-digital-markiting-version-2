import Link from "next/link";
import { BrandHeading } from "@/components/ui/BrandHeading";
import styles from "./PageHero.module.css";

type Crumb = { label: string; href?: string };
export function PageHero({ title, description, breadcrumbs }: { title: string; description: string; breadcrumbs: Crumb[] }) {
  return <header className={`section-container ${styles.hero}`}>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link>{breadcrumbs.map((crumb, index) => <span className={styles.crumb} key={`${crumb.label}-${index}`}><span aria-hidden="true">/</span>{crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}</span>)}</nav>
    <h1><BrandHeading text={title}/></h1>
    <p className={styles.description}>{description}</p>
  </header>;
}
