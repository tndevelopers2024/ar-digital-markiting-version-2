const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const site = {
  url: configuredUrl?.replace(/\/$/, "") || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" && !!configuredUrl?.startsWith("https://"),
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
