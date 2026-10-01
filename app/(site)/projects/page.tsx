import { PageIntro, PageCTA } from "@/components/pages/PageParts";
import { ProjectGallery } from "@/components/pages/ProjectGallery";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata=pageMetadata("Campaigns","Explore digital marketing campaign concepts across SEO, paid ads, social media, local search, and customer retention.","/projects");
export default function ProjectsPage(){return <><PageIntro label="Campaigns" title="Different ways to get your business moving." description="Explore how a clear goal turns into a search, advertising, social, or follow-up campaign. These examples show our approach to planning the work."/><p className="section-container page-disclosure">Campaign concepts and sample creative. These are not completed client projects or verified results.</p><div id="page-content"><ProjectGallery/></div><PageCTA title="What would you like your next campaign to do?"/></>}
