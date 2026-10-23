import { servicePages } from "./config";

type Detail = readonly [title: string, description: string];
type ServiceDetails = {
  introduction: string;
  situations: readonly Detail[];
  deliverables: readonly Detail[];
  preparation: readonly string[];
  support: Detail;
};
type ServiceSlug = (typeof servicePages)[number]["slug"];

// Scope examples, not a promise that every engagement includes every item.
export const serviceDetails = {
  "web-development": {
    introduction: "Whether you are launching a business or replacing a site that no longer fits, the starting point is the task your website needs to perform.",
    situations: [
      ["Your first business website", "Bring your offer, services, and contact details into a clear structure. Start with the pages your customers need most, with room to add more as the business develops."],
      ["A website that has outgrown its structure", "Reorganise confusing navigation, outdated content, and disconnected enquiry journeys. Identify what should be retained before deciding what needs a redesign."],
      ["A campaign needs its own destination", "Create a focused landing page that continues the campaign message, explains the offer, and gives visitors one clear next step."],
    ],
    deliverables: [
      ["Page and content plan", "A sitemap, page priorities, and an inventory showing what content exists, what needs editing, and who will provide it."],
      ["Reusable website components", "Agreed page templates, mobile layouts, and interface components that keep future additions visually consistent."],
      ["Launch and handover notes", "An agreed release checklist, publishing guidance, and documentation for forms, integrations, and day-to-day updates."],
    ],
    preparation: ["Your current website address and the pages that matter most.", "Approved brand files, available copy, and examples of your work.", "The people who will review the website and maintain it after launch."],
    support: ["Keep the website useful after launch.", "Discuss a maintenance scope for content updates, dependency updates, backups, and form checks. We can also plan a review of how visitors use important pages and agree which improvements should come next."],
  },
  "ecommerce-development": {
    introduction: "The right store connects the shopping experience with the way you manage products, orders, and customer questions behind the scenes.",
    situations: [
      ["Taking your catalogue online", "Turn product information, variants, and images into organised collections. Plan how customers will compare options and understand delivery before they buy."],
      ["Moving from an existing platform", "Map the products, customer records, content, and integrations that need to move. Agree migration checks and a transition plan before replacing the current store."],
      ["Improving an established shop", "Review the path from search to checkout and identify confusing details. Prioritise changes around actual customer questions and operational constraints."],
    ],
    deliverables: [
      ["Catalogue structure", "Product and collection templates, variant rules, filtering requirements, and a clear plan for importing or entering your catalogue."],
      ["Purchase journey", "Agreed cart, checkout, payment-provider, and delivery configurations, with test scenarios for successful and unsuccessful orders."],
      ["Store operations guide", "Instructions for managing products, stock, orders, and routine customer updates, plus the responsibilities of connected providers."],
    ],
    preparation: ["A sample product list with variants, prices, images, and stock rules.", "Your delivery regions, returns process, and preferred payment providers.", "Details of existing inventory, accounting, or customer-service tools."],
    support: ["Plan for the next order, not just launch day.", "Ongoing work can include seasonal collections, product-page improvements, integration checks, and reviewing checkout friction. Agree how platform subscriptions, payment charges, and operational support will be handled separately from the build."],
  },
  "graphic-design": {
    introduction: "Good design makes a message easier to notice and understand. We shape the format around where the work will appear and what the audience needs to take away.",
    situations: [
      ["Launching an offer", "Give a new product, service, or event a coherent set of visuals. Develop a central creative idea that can adapt across digital placements and printed material."],
      ["Making everyday content consistent", "Build practical templates for the posts, proposals, and announcements your team produces regularly, with clear rules for editing them."],
      ["Refreshing existing materials", "Review presentations, brochures, or social assets that feel disconnected. Improve hierarchy and consistency while keeping recognisable brand elements."],
    ],
    deliverables: [
      ["Creative direction", "A visual concept with examples of composition, typography, and image treatment, explained in relation to your message and audience."],
      ["Production-ready assets", "Approved artwork exported in the agreed dimensions and file formats for each placement. Print requirements are confirmed with your production partner."],
      ["Editable templates", "Where included in scope, organised source files and short usage notes so your team can make routine updates without rebuilding each asset."],
    ],
    preparation: ["The message, audience, and action each asset should support.", "Existing logos, brand guidance, approved copy, and licensed imagery.", "A list of formats, dimensions, deadlines, and production requirements."],
    support: ["Build a visual library your team can use.", "Plan additional campaign formats, template updates, or recurring design support as your content needs grow. We can organise a shared asset library and define a review process to help future work stay consistent."],
  },
  "branding-strategy": {
    introduction: "A brand project begins with how you want your business to be understood. The strategy should give your team a clear basis for decisions about language, visuals, and customer experience.",
    situations: [
      ["Defining a new business", "Clarify the audience, offer, and reason to choose you before creating the identity. Give early marketing and product decisions a shared direction."],
      ["Repositioning an established brand", "Explore how the business has changed and where the current identity falls short. Decide what recognition to preserve and what needs to evolve."],
      ["Aligning a growing team", "Bring different descriptions of the business into a common message. Create practical guidance for people writing, designing, selling, and recruiting."],
    ],
    deliverables: [
      ["Positioning foundation", "An agreed audience definition, value proposition, and points of difference, grounded in the business context and available research."],
      ["Messaging framework", "A core story, supporting messages, and tone-of-voice examples showing how to communicate across common situations."],
      ["Brand application guide", "Guidance connecting the strategy to the agreed visual identity and sample applications, with priorities for introducing the work."],
    ],
    preparation: ["Your business story, customer groups, and plans for the next stage.", "Existing research, customer feedback, and current brand materials.", "Key decision-makers and the channels where the brand appears."],
    support: ["Turn the strategy into everyday practice.", "A rollout can cover website messaging, sales presentations, campaign templates, and team guidance. We can plan periodic reviews as your services or audiences change, keeping the brand useful beyond the initial presentation."],
  },
  "mobile-app-development": {
    introduction: "An app should earn its place in someone’s day. We focus on a useful core journey first, then plan the supporting features, integrations, and operational responsibilities.",
    situations: [
      ["Testing a product idea", "Define the smallest useful version of the experience. Separate assumptions to explore from features that are necessary for a first release."],
      ["Connecting an existing service", "Help customers book, track, or manage an activity they already complete with your business. Plan how the app connects to current systems and support teams."],
      ["Improving an existing app", "Review confusing journeys, incomplete features, and maintenance constraints. Agree what can be improved within the existing product and what requires a larger change."],
    ],
    deliverables: [
      ["Release scope and flows", "Prioritised features, user journeys, and acceptance criteria for the agreed release, including empty, loading, and error states."],
      ["App and integration work", "The agreed application screens and supporting API connections, with responsibilities for backend services and third-party accounts made clear."],
      ["Release preparation", "Testing notes, store-submission assets where included, and handover documentation. Store approval remains subject to the platform’s review."],
    ],
    preparation: ["The main user task and the platforms your audience needs.", "Available backend systems, integrations, and existing app information.", "A product owner who can prioritise features and review milestones."],
    support: ["Make room for the next release.", "Plan how feedback, defects, operating-system changes, and new features will be managed after launch. Support can include prioritising a release backlog, monitoring agreed operational signals, and improving the most important journeys."],
  },
  "ui-ux-design": {
    introduction: "Useful interfaces begin with understanding the person using them. We connect research, structure, and interaction design so each screen supports a clear task.",
    situations: [
      ["A journey feels difficult", "Explore where people lose confidence, repeat steps, or need help. Use the available evidence to identify friction before changing the visual design."],
      ["A new product needs definition", "Turn a product idea into flows and prototypes that can be discussed and tested before committing to a full build."],
      ["The interface has become inconsistent", "Review repeated patterns, competing styles, and missing states. Establish a shared component approach that designers and developers can use together."],
    ],
    deliverables: [
      ["Experience findings", "A summary of the agreed research or review, with observations, limitations, and prioritised opportunities for improvement."],
      ["Flows and prototypes", "Information architecture, wireframes, and interactive prototypes for key tasks, showing how important states connect."],
      ["Design handover", "Agreed interface layouts, component rules, interaction notes, and accessibility considerations for the implementation team."],
    ],
    preparation: ["The product, target users, and the decisions you need design to support.", "Existing analytics, support questions, or access to research participants.", "Technical constraints and the team that will implement the designs."],
    support: ["Stay involved through implementation.", "Design reviews during development can help resolve edge cases and keep the intended interaction intact. After release, further research or usability sessions can help decide which improvements deserve attention next."],
  },
  "video-editing": {
    introduction: "The edit brings your footage, message, and audience together. We plan the story and viewing context before deciding on pace, graphics, sound, and delivery formats.",
    situations: [
      ["Turning footage into a clear story", "Shape interviews, product footage, or event recordings into a focused piece. Identify the main message and the material that supports it."],
      ["Creating campaign cutdowns", "Adapt a longer video into shorter versions for different placements. Rework the opening, crop, captions, and ending for each viewing context."],
      ["Explaining a service or process", "Combine suitable footage, text, and motion graphics to make a sequence easier to understand without overwhelming the viewer."],
    ],
    deliverables: [
      ["Edit direction", "An agreed structure, reference style, and plan for footage selection, on-screen messages, and any additional assets needed."],
      ["Review versions", "Draft cuts at defined milestones, with an agreed method for consolidated feedback and a clear number of revision rounds."],
      ["Final exports", "Approved videos in the agreed aspect ratios and formats, with caption files or graphics variants where included in the brief."],
    ],
    preparation: ["Original footage, a short brief, and the intended audience and channels.", "Approved logos, copy, music permissions, and consent for featured people.", "Required durations, aspect ratios, deadlines, and a single feedback owner."],
    support: ["Get more use from the right material.", "Plan future cutdowns, alternate openings, or updated messaging without repeating the entire production. Agree how project files and source footage will be organised, retained, and handed over before editing begins."],
  },
  "digital-marketing": {
    introduction: "Marketing works best when the audience, message, and destination support the same goal. We start with your business priorities and choose activities that can be reviewed with useful evidence.",
    situations: [
      ["Building a clearer digital presence", "Identify gaps in how people discover and understand your business. Prioritise website content, search visibility, and relevant channels around customer needs."],
      ["Launching a focused campaign", "Connect an audience and offer with creative, landing pages, and an enquiry process. Agree the goal and measurement plan before publishing."],
      ["Improving ongoing activity", "Review available campaign data, lead quality, and customer feedback. Separate tracking issues from messaging or journey problems before deciding what to change."],
    ],
    deliverables: [
      ["Channel and campaign plan", "A prioritised plan covering audience, messages, channels, landing pages, responsibilities, and the budget assumptions discussed with your team."],
      ["Agreed campaign assets", "The content, creative, or account configuration included in the scope, with approval steps before anything is published."],
      ["Reporting and next actions", "A review format connecting the agreed measures to practical decisions, including context, limitations, and a list of proposed improvements."],
    ],
    preparation: ["Your offer, target audience, business goals, and current marketing activity.", "Relevant account access through approved permissions and available performance reports.", "Your working budget and the person who responds to incoming leads."],
    support: ["Keep learning after the campaign starts.", "Ongoing support can cover content planning, creative testing, landing-page improvements, and reporting. Media spend and third-party subscriptions are agreed separately; results depend on factors including the offer, market, budget, and follow-up."],
  },
  "ai-development": {
    introduction: "A practical AI project starts with a defined workflow and a way to judge whether the output is useful. We explore feasibility before expanding automation into important business processes.",
    situations: [
      ["Finding information in documents", "Explore a tool that helps staff locate and summarise approved material. Define which sources it may use, how access works, and when someone should verify the answer."],
      ["Reducing repetitive preparation", "Prototype assistance for drafting, organising, or classifying information. Keep review steps where errors would create extra work or affect a customer."],
      ["Testing an AI-powered feature", "Evaluate a narrow product capability against representative examples. Use the findings to decide whether the approach is ready to integrate or needs further work."],
    ],
    deliverables: [
      ["Workflow and feasibility plan", "A documented use case, input requirements, constraints, and an initial evaluation approach, with unsuitable uses identified early."],
      ["Prototype and evaluation", "A scoped implementation tested against agreed examples, including failure cases and a record of observed limitations."],
      ["Integration and review controls", "Agreed application connections, human review points, fallback behaviour, and operational notes for managing the feature."],
    ],
    preparation: ["A specific task, sample inputs, and examples of acceptable outputs.", "Your permissions to use the data and any access or retention constraints.", "A reviewer who understands the workflow and can assess output quality."],
    support: ["Evaluate the feature as the workflow changes.", "Plan regular reviews of output quality, cost, source material, and failure patterns. Changes to models or integrations should be checked against the agreed examples before release. AI output can be wrong, so the scope should include appropriate review and fallback paths."],
  },
  "software-testing": {
    introduction: "Testing should give your team useful evidence for release decisions. We focus on agreed risks and important user journeys, then document findings so they are reproducible and actionable.",
    situations: [
      ["Preparing for a release", "Review the features and journeys most important to the launch. Agree environments, devices, and acceptance criteria before testing begins."],
      ["Investigating recurring problems", "Reproduce reported failures and record the conditions that trigger them. Help the development team distinguish symptoms from the behaviour that needs fixing."],
      ["Checking a product after changes", "Build a focused regression checklist around the areas affected by an update, including connected workflows that could be disrupted."],
    ],
    deliverables: [
      ["Test scope and scenarios", "A risk-based plan describing what will be tested, which environments are included, and which areas remain outside the review."],
      ["Reproducible issue reports", "Findings with steps, expected and actual behaviour, relevant evidence, and severity to help your team prioritise fixes."],
      ["Retest and release summary", "A record of retested fixes, remaining issues, coverage, and known limitations to support your release decision."],
    ],
    preparation: ["A testable build, requirements, and a list of important user journeys.", "Approved test accounts, representative non-sensitive data, and environment access.", "Recent changes, known issues, supported devices, and the planned release window."],
    support: ["Make quality checks repeatable.", "A continuing engagement can maintain regression scenarios, review new releases, and automate stable repetitive checks where useful. Testing reduces uncertainty within its scope; it does not establish that a product is free of defects or replace a separately scoped specialist review."],
  },
} satisfies Record<ServiceSlug, ServiceDetails>;
