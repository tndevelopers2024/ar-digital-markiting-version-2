const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const site = {
  url: configuredUrl?.replace(/\/$/, "") || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" && !!configuredUrl?.startsWith("https://"),
};
