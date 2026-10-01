import type { Metadata } from "next";
import { config } from "./config";
export function pageMetadata(title:string,description:string,path:string):Metadata {
 return {title:`${title} | ${config.name}`,description,alternates:{canonical:path},openGraph:{title:`${title} | ${config.name}`,description,url:path},twitter:{card:"summary_large_image",title:`${title} | ${config.name}`,description}};
}
