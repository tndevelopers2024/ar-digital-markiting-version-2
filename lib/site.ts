const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const whatsappMessage = "Hi AR Digital Marketing, I’d like to discuss a project.";
const defaultWhatsappNumber = "+91 96531 12624";
const configuredWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || defaultWhatsappNumber;
const whatsappDigits = configuredWhatsapp.replace(/[\s()+-]/g, "");

export const site = {
  url: configuredUrl?.replace(/\/$/, "") || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" && !!configuredUrl?.startsWith("https://"),
  address: {
    label: "Dubai Office",
    line1: "Skycourt Tower C 110",
    line2: "Dubai Land, Wadi Al Safa 5",
    city: "Dubai",
    full: "Skycourt Tower C 110, Dubai Land, Wadi Al Safa 5, Dubai",
  },
  phones: {
    dubai: {
      label: "Dubai Number",
      display: "+971 56 581 9127",
      href: "tel:+971565819127",
    },
    india: {
      label: "India Number",
      display: "+91 96531 12624",
      href: "tel:+919653112624",
    },
  },
  whatsapp: {
    label: "WhatsApp",
    display: "+91 96531 12624",
    number: whatsappDigits,
    href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`,
  },
};

// Set official profile URLs before building; unset profiles are not rendered.
export const socialLinks = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: "Behance", href: process.env.NEXT_PUBLIC_BEHANCE_URL },
].flatMap(({ label, href }) => {
  if (!href?.trim()) return [];
  try {
    const url = new URL(href.trim());
    return url.protocol === "https:" && !url.username && !url.password
      ? [{ label, href: url.href }]
      : [];
  } catch {
    return [];
  }
});
