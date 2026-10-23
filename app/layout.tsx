import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { config } from "@/lib/config";
import { site } from "@/lib/site";
import { Loader } from "@/components/ui/Loader";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import "./globals.css";
import "./page-polish.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  robots: { index: site.indexable, follow: site.indexable },
  title: config.title,
  description: config.description,
  alternates: { canonical: "/" },
  openGraph: { title: config.title, description: config.description, url: config.url, siteName: config.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};

export const viewport: Viewport = { themeColor: "#FAF9F6", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Loader />
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
