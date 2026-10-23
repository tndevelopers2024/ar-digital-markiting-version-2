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
    services: ["UX design", "E-commerce", "Website development"], image: "/images/portfolio-exclusive/retail-storefront.jpg", imageAlt: "Laptop and smartphone displaying an online shop",
  },
  {
    id: "service-booking-app", title: "Everyday Booking, Made Easier", category: "app", categoryLabel: "Mobile App Development",
    summary: "A service app concept that brings discovery, booking, and account management into one place.",
    challenge: "Help customers choose a service and a suitable time without repeated calls or complicated forms.",
    solution: "Focus on three core journeys: find a service, book a time, and manage the booking. Design clear confirmations, reminders, and helpful error states.",
    deliverables: ["Interactive prototype of the core booking flow", "Account, booking, and notification screens", "Device checks and a release plan"],
    services: ["Mobile UX", "App development", "Testing"], image: "/images/portfolio-exclusive/service-booking-app.jpg", imageAlt: "Woman browsing an application on her smartphone outdoors",
  },
  {
    id: "brand-system", title: "One Brand Across Every Touchpoint", category: "creative", categoryLabel: "Branding & UI/UX",
    summary: "A connected identity and interface direction for a business ready to bring its message together.",
    challenge: "Replace inconsistent presentations, social assets, and website styles with a clear visual direction the team can use.",
    solution: "Start with the audience and brand positioning. Develop typography, colour, reusable layouts, and interface components around a shared message.",
    deliverables: ["Brand direction and visual identity guidelines", "Reusable social and presentation templates", "A consistent website component library"],
    services: ["Brand strategy", "Graphic design", "UI/UX"], image: "/images/portfolio-exclusive/brand-system.jpg", imageAlt: "Brand design materials and colour swatches arranged on a desk",
  },
  {
    id: "local-search", title: "Helping Local Customers Find You", category: "seo", categoryLabel: "Search & Discovery",
    summary: "A search concept that connects useful service information with the questions local customers ask.",
    challenge: "Make service pages easier to find and understand, with clear information for people comparing local businesses.",
    solution: "Review site structure, search intent, and business information. Plan focused service pages and useful answers, then measure relevant visits and enquiries.",
    deliverables: ["Technical and content review", "Search topics and service page recommendations", "An agreed reporting and improvement plan"],
    services: ["Technical SEO", "Content planning", "Local search"], image: "/images/portfolio-exclusive/local-search.jpg", imageAlt: "Business reports and charts being reviewed on a laptop",
  },
  {
    id: "connected-campaign", title: "A Campaign With a Clear Next Step", category: "marketing", categoryLabel: "Digital Marketing",
    summary: "A campaign concept connecting the audience, creative message, landing page, and enquiry journey.",
    challenge: "Give a new offer a consistent message across advertising and social content, with a useful way to measure interest.",
    solution: "Define the audience and offer, plan creative variations, and match the landing page to the campaign. Review lead quality alongside spend and conversion data.",
    deliverables: ["Audience and channel plan", "Campaign creative and landing page direction", "Conversion tracking requirements and review schedule"],
    services: ["Campaign strategy", "Content", "Paid advertising"], image: "/images/portfolio-exclusive/connected-campaign.jpg", imageAlt: "Campaign planning with charts and graphs on a laptop",
  },
{
  "id": "studio-website",
  "title": "Northline Studio — Portfolio Website",
  "category": "web",
  "categoryLabel": "Web Design",
  "summary": "A sample architecture studio website that makes projects easy to browse and enquiries easy to start.",
  "challenge": "Balance large project photography with fast mobile navigation and clear service information.",
  "solution": "Organise work by project type, pair each gallery with a short story, and place a concise enquiry form beside relevant services.",
  "deliverables": [
    "Project gallery and case-study templates",
    "Service pages and enquiry form",
    "Responsive implementation and image optimisation"
  ],
  "services": [
    "Web design",
    "Development",
    "Performance"
  ],
  "image": "/images/portfolio-exclusive/studio-website.jpg",
  "imageAlt": "Creative portfolio website on a laptop in a studio workspace"
},
{
  "id": "consulting-website",
  "title": "Clearpath — Consulting Website",
  "category": "web",
  "categoryLabel": "Business Websites",
  "summary": "A fictional consultancy site built around a clear offer and a useful first conversation.",
  "challenge": "Explain specialist services without overwhelming visitors with jargon or long menus.",
  "solution": "Group the offer around business needs, answer common questions, and provide a focused consultation request journey.",
  "deliverables": [
    "Service and sector page designs",
    "Consultation form and confirmation states",
    "Content structure and editing guide"
  ],
  "services": [
    "Content design",
    "UX",
    "Web development"
  ],
  "image": "/images/portfolio-exclusive/consulting-website.jpg",
  "imageAlt": "Designer working with a laptop and project materials in a home office"
},
{
  "id": "daily-planner",
  "title": "Daylight — Personal Planner App",
  "category": "app",
  "categoryLabel": "Productivity Apps",
  "summary": "A sample mobile planner for capturing tasks and organising the week.",
  "challenge": "Help busy users plan their day without making task management another job.",
  "solution": "Build a quick-add flow, a readable daily view, and reminder controls with clear defaults.",
  "deliverables": [
    "Daily and weekly view prototypes",
    "Task creation and reminder flows",
    "Accessibility and device test plan"
  ],
  "services": [
    "Mobile UX",
    "App development",
    "Testing"
  ],
  "image": "/images/portfolio-exclusive/daily-planner.jpg",
  "imageAlt": "Person reviewing information on a smartphone beside planning documents"
},
{
  "id": "community-app",
  "title": "Neighbourhood — Community App",
  "category": "app",
  "categoryLabel": "Community Apps",
  "summary": "A fictional local community app for discovering events and sharing updates.",
  "challenge": "Make local information easy to discover while keeping posting and reporting straightforward.",
  "solution": "Design topic-based feeds, event saving, and clear community controls with useful empty states.",
  "deliverables": [
    "Community feed and event screens",
    "Posting and reporting prototypes",
    "Notification preference flows"
  ],
  "services": [
    "Product strategy",
    "Mobile design",
    "App development"
  ],
  "image": "/images/portfolio-exclusive/community-app.jpg",
  "imageAlt": "Person browsing a social application on a smartphone"
},
{
  "id": "editorial-brand",
  "title": "Paper & Form — Editorial Identity",
  "category": "creative",
  "categoryLabel": "Visual Identity",
  "summary": "A sample identity for an independent publication with a consistent digital voice.",
  "challenge": "Connect article layouts, subscription pages, and promotional materials without losing readability.",
  "solution": "Build a typography-led system with flexible layouts for long reads, short updates, and social previews.",
  "deliverables": [
    "Typography and colour guidelines",
    "Article and newsletter templates",
    "Social launch asset layouts"
  ],
  "services": [
    "Brand design",
    "Art direction",
    "Editorial design"
  ],
  "image": "/images/portfolio-exclusive/editorial-brand.jpg",
  "imageAlt": "Printed colour swatches for visual design projects"
},
{
  "id": "wellness-design",
  "title": "Stillwell — Wellness Experience",
  "category": "creative",
  "categoryLabel": "UI/UX Design",
  "summary": "A fictional wellness service with a calm, accessible booking experience.",
  "challenge": "Help visitors compare sessions and understand what to expect before making a booking.",
  "solution": "Sketch service comparisons, simplify the booking steps, and test the wording of key decisions.",
  "deliverables": [
    "Service comparison wireframes",
    "Booking prototype and usability tasks",
    "Accessible component specification"
  ],
  "services": [
    "UX research",
    "Interface design",
    "Prototyping"
  ],
  "image": "/images/portfolio-exclusive/wellness-design.jpg",
  "imageAlt": "Hand selecting neutral colour swatches on a white desk"
},
{
  "id": "technical-search",
  "title": "BrightCart — Technical Search Review",
  "category": "seo",
  "categoryLabel": "Technical SEO",
  "summary": "A sample search improvement plan for a growing online catalogue.",
  "challenge": "Keep product and category pages understandable to people and search engines as the catalogue grows.",
  "solution": "Review page structure, indexing rules, internal links, and structured data, then prioritise fixes by impact and effort.",
  "deliverables": [
    "Technical review and prioritised backlog",
    "Category and product metadata plan",
    "Search monitoring checklist"
  ],
  "services": [
    "Technical SEO",
    "Site architecture",
    "Analytics"
  ],
  "image": "/images/portfolio-exclusive/technical-search.jpg",
  "imageAlt": "Laptop and printed charts arranged for analysis"
},
{
  "id": "content-search",
  "title": "Fieldnotes — Search Content Plan",
  "category": "seo",
  "categoryLabel": "Content Strategy",
  "summary": "A fictional educational resource that answers practical customer questions.",
  "challenge": "Turn scattered articles into a useful library with clear topics and next steps.",
  "solution": "Map search intent, group related guides, and design links that connect learning to relevant services.",
  "deliverables": [
    "Topic clusters and editorial calendar",
    "Article brief and internal-link templates",
    "Content review and measurement plan"
  ],
  "services": [
    "Search research",
    "Content planning",
    "Information architecture"
  ],
  "image": "/images/portfolio-exclusive/content-search.jpg",
  "imageAlt": "Magnifying glass over handwritten notes and analysis documents"
},
{
  "id": "social-launch",
  "title": "Gather — Social Launch Campaign",
  "category": "marketing",
  "categoryLabel": "Social Media Marketing",
  "summary": "A sample launch campaign for a community-focused lifestyle brand.",
  "challenge": "Give a new brand a recognisable voice and a reason for people to follow.",
  "solution": "Create content pillars, plan a launch sequence, and pair useful posts with clear landing-page messages.",
  "deliverables": [
    "Launch content calendar",
    "Post and short-video creative briefs",
    "Channel reporting framework"
  ],
  "services": [
    "Social strategy",
    "Creative direction",
    "Content"
  ],
  "image": "/images/portfolio-exclusive/social-launch.jpg",
  "imageAlt": "Professional comparing printed charts with laptop data"
},
{
  "id": "workshop-campaign",
  "title": "Skillspace — Workshop Campaign",
  "category": "marketing",
  "categoryLabel": "Campaign Planning",
  "summary": "A fictional workshop promotion connecting an audience need to a simple registration journey.",
  "challenge": "Explain the value of a new workshop and make the registration requirements easy to understand.",
  "solution": "Build an audience and message plan, align the campaign page with the offer, and define registration tracking.",
  "deliverables": [
    "Audience and channel brief",
    "Registration page and email copy",
    "Creative variations and review plan"
  ],
  "services": [
    "Campaign strategy",
    "Landing pages",
    "Conversion tracking"
  ],
  "image": "/images/portfolio-exclusive/workshop-campaign.jpg",
  "imageAlt": "Team reviewing documents and charts in a workshop"
},
];
