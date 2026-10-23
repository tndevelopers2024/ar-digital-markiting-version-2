import { BlogCards } from "@/components/pages/BlogCards";
import { BrandHeading } from "@/components/ui/BrandHeading";
import styles from "./Portfolio.module.css";
export function PortfolioInsights() {
  return <section className={styles.insightsSection} aria-labelledby="portfolio-insights-heading">
    <div className="bespoke-heading"><h2 id="portfolio-insights-heading"><BrandHeading text="Latest Blogs" /></h2><p>Practical ideas for your brand, website, and marketing.<br />Explore useful tips before you start your next project.</p></div>
    <BlogCards showImages={false} limit={3} />
  </section>;
}
