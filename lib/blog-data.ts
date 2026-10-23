import { blogCardImages, blogGuides, blogSlugs, config } from "./config";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  minutes: string;
  summary: string;
  paragraphs: readonly string[];
  guide: { headings: readonly string[]; checklist: readonly string[]; takeaway: string; service: string };
  card: { src: string; alt: string };
  heroSrc?: string;
  imageKey?: "article-visitors" | "article-brand" | "article-metrics";
};

const additions: BlogPost[] = [
  {
    slug: "write-a-clear-campaign-brief", title: "A Better Campaign Starts with a Clear Brief", category: "Campaign strategy", minutes: "2 min read",
    summary: "Turn a broad marketing idea into a focused plan your whole team can work from.",
    card: { src: "/images/blogs/campaign-card.jpg", alt: "Laptop and printed business reports on a planning desk" }, heroSrc: "/images/blogs/campaign-hero.jpg",
    paragraphs: [
      "A campaign brief should begin with a business problem, not a list of channels. Perhaps a service is getting enquiries from the wrong audience, or people know your name but do not understand your offer. Write down the problem and choose one action you want the campaign to encourage. For a consultation business, that might be a completed appointment request. Awareness, clicks, and enquiries are different goals; deciding which matters most gives your team a useful starting point.",
      "Describe who the campaign is for and what they need to decide. Go beyond an age range or job title: include the question they are asking, the concern that could stop them, and the evidence that might help. Then write a single sentence connecting their need to your offer. For example, a local studio could focus on helping first-time customers understand what happens during an introductory session. Use that sentence to check whether each headline and visual belongs in the campaign.",
      "Give the team practical boundaries: the offer, available assets, agreed spend, launch window, and person responsible for approvals. Explain where a click should lead and who will respond to enquiries. A strong advertisement cannot fix a confusing booking page or an unattended inbox. Walk through the journey before publishing, including the confirmation message people see after completing the form.",
      "Agree how you will review the campaign before it starts. Record the starting position, choose a few measures connected to the goal, and set a review date. Keep notes about changes to the offer, audience, and creative so you can interpret the results. If enquiries increase but many are unsuitable, investigate the message and targeting rather than treating the headline count as success. End each review with a specific decision and someone responsible for carrying it out."
    ],
    guide: { headings: ["Start with the business problem", "Make the audience specific", "Connect the whole journey", "Agree what you will learn"], checklist: ["Can everyone name the campaign’s main goal?", "Does the landing page match the promise?", "Who reviews results and handles enquiries?"], takeaway: "A useful brief makes the next decision easier. Keep it focused enough that everyone can explain the campaign in a sentence.", service: "digital-marketing" }
  },
  {
    slug: "build-a-manageable-content-calendar", title: "Build a Content Calendar You Can Actually Keep", category: "Social media", minutes: "2 min read",
    summary: "Plan useful posts around customer questions and a publishing rhythm your team can sustain.",
    card: { src: "/images/blogs/calendar-card.jpg", alt: "Hands typing a content plan on a laptop" }, heroSrc: "/images/blogs/calendar-hero.jpg",
    paragraphs: [
      "A content calendar works best when it solves a planning problem. Start by listing the questions customers ask before they buy, the details they often misunderstand, and the moments when your team can show its process. These are stronger starting points than filling every day with a different promotional message. A design studio, for example, could explain how a brief works, show a material choice, and answer a common question about revisions.",
      "Group those ideas into a few repeatable themes: helpful advice, process, product or service explanations, and people behind the work. Decide how often you can publish without rushing production. Two thoughtful posts each week may suit a small team better than a daily schedule that quickly becomes difficult to maintain. Leave room for timely updates and customer questions instead of locking every slot weeks in advance.",
      "For each planned post, record the audience question, central message, format, required asset, owner, and next step. A simple shared table is enough. Separate drafting from approval so everyone can see what is ready and what is waiting. Prepare related posts together: one explanation might become a short video, a visual checklist, and a longer article, with each version adapted to its format instead of repeating the same caption everywhere.",
      "Review the calendar regularly with the people who speak to customers. Look for useful conversations, questions, relevant site visits, and enquiries rather than relying only on likes. If a post creates confusion, update the explanation. If a topic leads to thoughtful questions, consider a follow-up. Keep a small bank of evergreen ideas for busy weeks, and remove themes that no longer serve your audience or business."
    ],
    guide: { headings: ["Collect real customer questions", "Choose a realistic rhythm", "Make every post easy to prepare", "Review and adjust"], checklist: ["Does each post answer a useful question?", "Are an owner and approval date assigned?", "Is there room for new questions and updates?"], takeaway: "Consistency comes from a manageable process, not from filling every day on the calendar.", service: "digital-marketing" }
  },
  {
    slug: "landing-page-before-ad-spend", title: "Check Your Landing Page Before You Run Ads", category: "Websites", minutes: "2 min read",
    summary: "Give campaign visitors a clear promise, useful evidence, and an easy next step.",
    card: { src: "/images/blogs/landing-card.jpg", alt: "Professionals reviewing data on a laptop and tablet" }, heroSrc: "/images/blogs/landing-hero.jpg",
    paragraphs: [
      "Start by reading your advertisement and landing page together. If the ad promises help with a specific service, the page should explain that service immediately. Sending every campaign to a general homepage can make visitors search for the information they expected. Match the headline, offer, and next step to the campaign, then remove details that distract from the decision the visitor needs to make.",
      "People need more than a prominent button. Explain who the offer is for, what is included, and what happens next. Use genuine examples or clearly labelled demonstrations where they help someone understand the work. Answer likely questions about the process, required information, or timing without making promises your team cannot keep. Place those answers close to the relevant action so visitors do not have to piece the story together.",
      "Open the page on a phone and complete the intended action yourself. Read the text, use the navigation, enter information into the form, and check the confirmation. Ask only for details needed at this stage. A consultation request may not require a long project questionnaire before the first conversation. Make labels and error messages clear, and make sure a visitor can recover from a mistake without starting over.",
      "Test what happens after submission as carefully as the page itself. Confirm that the request reaches the right person and that someone knows how to respond. If you measure completed enquiries, verify the measurement with a controlled test and follow your consent requirements. Record the starting results before changing the page. Then change one meaningful part at a time and review the quality of enquiries alongside their number."
    ],
    guide: { headings: ["Keep the promise consistent", "Answer the decision-making questions", "Try the journey on a phone", "Check what happens after the click"], checklist: ["Do the advertisement and page describe the same offer?", "Can someone finish the form on a phone?", "Does the request reach the right team member?"], takeaway: "Make the destination useful before paying to send more people to it.", service: "web-development" }
  },
  {
    slug: "plan-a-useful-welcome-email", title: "Make Your Welcome Email Worth Opening", category: "Email marketing", minutes: "2 min read",
    summary: "Set expectations and help new subscribers take one useful next step.",
    card: { src: "/images/blogs/email-card.jpg", alt: "Handwritten marketing plan in a business notebook" }, heroSrc: "/images/blogs/email-hero.jpg",
    paragraphs: [
      "A welcome email should continue the conversation that began at signup. If someone subscribed for practical advice, start with advice rather than an unexpected sales pitch. Remind them why they are receiving the message and identify the business clearly. Explain what you plan to send and how often, using a schedule your team can maintain. This sets a useful expectation before you ask the reader to do anything else.",
      "Choose one main purpose for the first message. It might deliver a promised resource, explain how a service works, or point a new customer toward getting-started information. Write a subject line that describes that purpose plainly. Keep the introduction brief and put the most useful information early. Several equally prominent buttons can make the next step harder to choose, so give the main action a clear label and treat additional links as supporting information.",
      "Build the message around material the reader can use immediately. A service business could share a short preparation checklist; a retailer might explain care instructions or where to find sizing information. Make sure the email still makes sense if images do not load. Test the links, check the layout on a phone, and send a preview to someone who was not involved in writing it. Ask them what they would expect to happen after clicking.",
      "Send only to people who have agreed to receive the relevant messages, and make preferences and unsubscribe options easy to find. Give readers a monitored way to reply when appropriate. Review replies, link activity, and subsequent actions together; no single number tells the whole story. If people repeatedly ask the same question, improve the welcome message before adding more emails to the sequence."
    ],
    guide: { headings: ["Continue the signup promise", "Choose one main action", "Give something useful first", "Make the conversation easy to manage"], checklist: ["Does the message deliver what signup promised?", "Do all links work on a phone?", "Are preferences and unsubscribe options easy to find?"], takeaway: "A good welcome email helps the reader feel oriented and makes one useful next step clear.", service: "digital-marketing" }
  },
  {
    slug: "plan-short-videos-with-purpose", title: "Give Every Short Video One Clear Job", category: "Video & content", minutes: "2 min read",
    summary: "Turn a small idea into a focused video with a clear opening, useful footage, and a purposeful ending.",
    card: { src: "/images/blogs/video-card.jpg", alt: "Filmmaker recording with a camera in a studio" }, heroSrc: "/images/blogs/video-hero.jpg",
    paragraphs: [
      "Before picking up a camera, decide what the viewer should understand after watching. A short video can answer a question, demonstrate a detail, or introduce a process. Trying to explain the whole business at once often produces a crowded script. For a product demonstration, choose one feature and show how it helps in a real situation. Write the main point in a sentence and use it to decide what belongs in the video.",
      "Plan a simple sequence: show the question or situation, demonstrate the useful detail, and finish with the next step. The opening should help viewers recognise the topic without a long introduction. You do not need exaggerated claims or an unrelated surprise to make it clear. Sketch the shots on paper and note any text that needs to appear on screen. This small preparation step can prevent missing footage and repeated filming later.",
      "Record in a space where the subject is easy to see and speech is easy to hear. Capture a few supporting shots that show the detail you are discussing, rather than filling every pause with decorative footage. Leave space for captions and check that important content remains visible in the intended crop. Use music, footage, and other material you have permission to use, and obtain agreement from people featured in the recording.",
      "Watch the edit once without sound and once while focusing only on the audio. Correct captions, remove unnecessary pauses, and check that the final action follows naturally from the topic. A helpful demonstration might invite someone to read a guide instead of immediately requesting a sale. Review the questions the video generates and use them to plan the next piece. Keep the original footage organised so useful clips are easy to find later."
    ],
    guide: { headings: ["Pick one useful idea", "Plan the story before filming", "Capture what the explanation needs", "Edit for clarity"], checklist: ["Is the video’s purpose clear from the opening?", "Are speech and captions easy to understand?", "Does the ending offer a relevant next step?"], takeaway: "A focused video is easier to plan, easier to understand, and easier to improve.", service: "video-editing" }
  },
  {
    slug: "website-launch-checklist", title: "The Website Launch Checks That Are Easy to Miss", category: "Website planning", minutes: "2 min read",
    summary: "Look beyond the homepage and check the journeys, content, and handover that make a launch work.",
    card: { src: "/images/blogs/launch-card.jpg", alt: "Marketing planning documents arranged on a desk" }, heroSrc: "/images/blogs/launch-hero.jpg",
    paragraphs: [
      "A launch review should begin with the tasks visitors need to complete. List the main journeys: finding a service, checking an important detail, contacting the team, or completing a purchase. Walk through each one from its likely starting page. Check buttons, navigation, forms, and confirmation messages. Include less obvious paths such as a visitor arriving directly on an article rather than entering through the homepage.",
      "Review the words and assets as carefully as the layout. Confirm contact information, opening hours where relevant, service descriptions, and destination links. Remove placeholder text and label sample work clearly. Check that image descriptions are useful and that headings explain the page structure. Ask someone unfamiliar with the project to describe the offer after reading an important page; confusion at this stage is valuable feedback.",
      "Try the site on a phone, a larger screen, and with keyboard navigation. Make sure menus, form fields, error messages, and dialogs remain usable. Check that images load and text is readable without relying on a single screen size. If replacing an existing website, review important old addresses and plan where visitors should land. Test the launch setup itself instead of assuming that everything working in a development environment will behave identically online.",
      "Agree who owns the site after launch. Record how enquiries are delivered, who updates content, where approved assets live, and how issues are reported. Keep access with the appropriate people and document the recovery process. Schedule a short follow-up review after real visitors begin using the site. A launch is a handover into regular operation, so the team needs a practical maintenance plan as well as a finished design."
    ],
    guide: { headings: ["Test complete visitor journeys", "Review content and details", "Check more than one screen", "Plan the handover"], checklist: ["Have real enquiries been tested end to end?", "Are placeholders and broken links removed?", "Is someone responsible for updates after launch?"], takeaway: "A successful launch means the website works for visitors and the team knows how to look after it.", service: "software-testing" }
  }
];

const originalKeys = ["article-visitors", "article-brand", "article-metrics"] as const;
export const blogPosts: BlogPost[] = [
  ...additions,
  ...config.insights.items.map((post, index) => ({
    ...post, slug: blogSlugs[index], guide: blogGuides[index], card: blogCardImages[index], imageKey: originalKeys[index],
  })),
];
