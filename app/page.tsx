import { Experience } from "@/components/ui/Experience";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Industries } from "@/components/sections/Industries";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Results } from "@/components/sections/Results";
import { GrowthDashboard } from "@/components/sections/GrowthDashboard";
import { ToolsPlatforms } from "@/components/sections/ToolsPlatforms";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Showreel } from "@/components/sections/Showreel";
import { Awards } from "@/components/sections/Awards";
import { FAQ } from "@/components/sections/FAQ";
import { AuditForm } from "@/components/sections/AuditForm";
import { Insights } from "@/components/sections/Insights";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, email: config.email, description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><TrustedBy/><About/><Services/><WhyChooseUs/><Industries/><SelectedWork/><Results/><GrowthDashboard/><ToolsPlatforms/><Process/><Pricing/><Team/><Testimonials/><Showreel/><Awards/><FAQ/><AuditForm/><Insights/><FinalCTA/></main><Footer/></>;
}
