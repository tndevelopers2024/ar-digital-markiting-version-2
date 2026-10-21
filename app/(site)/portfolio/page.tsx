import { PageIntro } from "@/components/pages/PageParts";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioInsights } from "@/components/portfolio/PortfolioInsights";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Our Portfolio",
  "Explore website, app, brand, and campaign concepts that show how AR Digital Marketing approaches a business brief.",
  "/portfolio"
);

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        label="Portfolio"
        title="Our Portfolio"
        description="Explore websites, apps, brand design, and digital campaigns. See how thoughtful design and reliable technology come together around a business goal."
      />

      <div id="page-content" className="section-container">
        <PortfolioStats />
        <PortfolioGallery />
        <PortfolioInsights />
        <PortfolioContact />
      </div>
    </>
  );
}
