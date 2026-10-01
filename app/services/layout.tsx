import { InnerExperience } from "@/components/ui/InnerExperience";
import { notFound } from "next/navigation";
import { siteFeatures } from "@/lib/config";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
export default function ServicesLayout({children}: {children: React.ReactNode}) {
  if (!siteFeatures.servicePages) notFound();
  return <><InnerExperience/><Navbar innerPage/><main id="main" className="service-pages">{children}</main><Footer innerPage/></>;
}
