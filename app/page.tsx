import { Experience } from "@/components/ui/Experience";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Industries } from "@/components/sections/Industries";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { GrowthDashboard } from "@/components/sections/GrowthDashboard";
import { ToolsPlatforms } from "@/components/sections/ToolsPlatforms";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Showreel } from "@/components/sections/Showreel";
import { FAQ } from "@/components/sections/FAQ";
import { AuditForm } from "@/components/sections/AuditForm";
import { Insights } from "@/components/sections/Insights";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { config } from "@/lib/config";
export default function Home() {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: config.name, url: config.url, ...(config.email ? {email: config.email} : {}), description: config.description, knowsAbout: config.services };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}/><Experience/><Navbar/><main id="main"><Hero/><About/><Services/><WhyChooseUs/><Industries/><SelectedWork/><GrowthDashboard/><ToolsPlatforms/><Process/><Team/><Showreel/><FAQ/><AuditForm/><Insights/><FinalCTA/></main><Footer/></>;
}
