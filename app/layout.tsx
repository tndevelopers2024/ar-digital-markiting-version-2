import type { Metadata, Viewport } from "next";
import { Geist, Manrope } from "next/font/google";
import { config } from "@/lib/config";
import "./globals.css";
const geist = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title: config.title,
  description: config.description,
  alternates: { canonical: "/" },
  openGraph: { title: config.title, description: config.description, url: config.url, siteName: config.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};
export const viewport: Viewport = { themeColor: "#FAF9F6", colorScheme: "light" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${geist.variable} ${manrope.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
