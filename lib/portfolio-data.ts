export interface PortfolioProject {
  id: string;
  title: string;
  category: "creative" | "web" | "app" | "seo" | "marketing";
  categoryLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  services: string[];
  image: string;
  imageAlt: string;
}

export const portfolioCategories = [
  { id: "all", label: "All concepts" },
  { id: "creative", label: "Brand & design" },
  { id: "web", label: "Websites" },
  { id: "app", label: "Mobile apps" },
  { id: "seo", label: "Search" },
  { id: "marketing", label: "Marketing" },
] as const;

// Illustrative briefs only. Replace with approved case studies when available.
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "retail-storefront", title: "A Simpler Shopping Experience", category: "web", categoryLabel: "Web & E-Commerce",
    summary: "A retail storefront that helps customers find the right product and understand the next step.",
    challenge: "Make a growing catalogue easy to browse on a phone, with useful product information and a clear path to checkout.",
    solution: "Plan category navigation, accessible product pages, and a focused basket journey. Connect stock, payment, and delivery information around the customer’s needs.",
    deliverables: ["Responsive storefront and product templates", "A mapped basket and checkout journey", "Catalogue management and a handover guide"],
    services: ["UX design", "E-commerce", "Website development"], image: "/images/inner-premium/ecommerce.webp", imageAlt: "Online ceramic homeware store displayed beside products and carefully packed orders",
  },
  {
    id: "service-booking-app", title: "Everyday Booking, Made Easier", category: "app", categoryLabel: "Mobile App Development",
    summary: "A service app concept that brings discovery, booking, and account management into one place.",
    challenge: "Help customers choose a service and a suitable time without repeated calls or complicated forms.",
    solution: "Focus on three core journeys: find a service, book a time, and manage the booking. Design clear confirmations, reminders, and helpful error states.",
    deliverables: ["Interactive prototype of the core booking flow", "Account, booking, and notification screens", "Device checks and a release plan"],
    services: ["Mobile UX", "App development", "Testing"], image: "/images/inner-premium/mobile-app.webp", imageAlt: "Three smartphones displaying a coordinated service booking app concept",
  },
  {
    id: "brand-system", title: "One Brand Across Every Touchpoint", category: "creative", categoryLabel: "Branding & UI/UX",
    summary: "A connected identity and interface direction for a business ready to bring its message together.",
    challenge: "Replace inconsistent presentations, social assets, and website styles with a clear visual direction the team can use.",
    solution: "Start with the audience and brand positioning. Develop typography, colour, reusable layouts, and interface components around a shared message.",
    deliverables: ["Brand direction and visual identity guidelines", "Reusable social and presentation templates", "A consistent website component library"],
    services: ["Brand strategy", "Graphic design", "UI/UX"], image: "/images/inner-premium/branding.webp", imageAlt: "Coordinated navy and ivory packaging, stationery, and fabric swatches",
  },
  {
    id: "local-search", title: "Helping Local Customers Find You", category: "seo", categoryLabel: "Search & Discovery",
    summary: "A search concept that connects useful service information with the questions local customers ask.",
    challenge: "Make service pages easier to find and understand, with clear information for people comparing local businesses.",
    solution: "Review site structure, search intent, and business information. Plan focused service pages and useful answers, then measure relevant visits and enquiries.",
    deliverables: ["Technical and content review", "Search topics and service page recommendations", "An agreed reporting and improvement plan"],
    services: ["Technical SEO", "Content planning", "Local search"], image: "/images/inner-premium/search-strategy.webp", imageAlt: "Search topic planning with a laptop and organised research cards",
  },
  {
    id: "connected-campaign", title: "A Campaign With a Clear Next Step", category: "marketing", categoryLabel: "Digital Marketing",
    summary: "A campaign concept connecting the audience, creative message, landing page, and enquiry journey.",
    challenge: "Give a new offer a consistent message across advertising and social content, with a useful way to measure interest.",
    solution: "Define the audience and offer, plan creative variations, and match the landing page to the campaign. Review lead quality alongside spend and conversion data.",
    deliverables: ["Audience and channel plan", "Campaign creative and landing page direction", "Conversion tracking requirements and review schedule"],
    services: ["Campaign strategy", "Content", "Paid advertising"], image: "/images/inner-premium/marketing-analytics.webp", imageAlt: "Marketing dashboards on a laptop and tablet beside printed performance reports",
  },
];
