import { InnerExperience } from "@/components/ui/InnerExperience";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
export default function SiteLayout({children}:{children:React.ReactNode}) {
 return <><InnerExperience/><Navbar innerPage/><main id="main" className="inner-pages">{children}</main><Footer innerPage/></>;
}
