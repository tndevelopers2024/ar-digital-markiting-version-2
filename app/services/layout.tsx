import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
export default function ServicesLayout({children}: {children: React.ReactNode}) {
  return <><div className="ambient-mesh" aria-hidden="true"/><Navbar innerPage/><main id="main" className="service-pages">{children}</main><Footer innerPage/></>;
}
