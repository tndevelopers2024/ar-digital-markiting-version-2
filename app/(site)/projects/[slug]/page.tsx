import { PageHero } from "@/components/pages/PageHero";
import { PageImage } from "@/components/pages/PageImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { config } from "@/lib/config";
import { PageCTA } from "@/components/pages/PageParts";
import { pageMetadata } from "@/lib/page-metadata";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return config.work.projects.map(project=>({slug:project.id}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const project=config.work.projects.find(item=>item.id===slug);if(!project)notFound();return pageMetadata(project.brand,project.challenge,`/projects/${slug}`);}
export default async function CampaignPage({params}:Props){const {slug}=await params;const project=config.work.projects.find(item=>item.id===slug);if(!project)notFound();const next=config.work.projects[(config.work.projects.indexOf(project)+1)%config.work.projects.length];return <><PageHero title={project.title} description={project.challenge} breadcrumbs={[{label:"Campaigns",href:"/projects"},{label:project.brand}]}/><PageImage imageKey={`project-${project.id}`}/><p className="section-container page-disclosure">{config.work.disclosure}</p><section className="inner-section section-container campaign-plan"><aside><span className="demo-label">THE CAMPAIGN PLAN</span><h2>From a clear goal<br/>to useful action.</h2><Link href="/services/digital-marketing">Our marketing services</Link></aside><div>{[{label:"01 / THE BUSINESS GOAL",title:"What we want to change",text:project.challenge},{label:"02 / THE APPROACH",title:"How the campaign works",text:project.approach},{label:"03 / THE MEASUREMENT",title:"How we review progress",text:project.outcome}].map(item=><article key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><section className="section-container next-campaign"><span>EXPLORE ANOTHER APPROACH</span><Link href={`/projects/${next.id}`}>{next.brand}</Link></section><PageCTA title="Let’s plan a campaign around your goals."/></>}
