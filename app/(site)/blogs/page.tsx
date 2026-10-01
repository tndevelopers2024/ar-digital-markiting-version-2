import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { BlogCards } from "@/components/pages/BlogCards";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata=pageMetadata("Blogs","Simple, practical blogs about websites, branding, and digital marketing for your business.","/blogs");
export default function BlogsPage(){return <><PageIntro label="Blogs" title="Simple ideas. Useful next steps." description="Short reads on websites, branding, and digital marketing. Practical things to think about when you’re building or growing your business."/><section id="page-content" className="section-container blog-directory" aria-label="Latest blogs"><BlogCards/></section><PageCTA title="Ready to put an idea into practice?"/></>}
