import Image from "next/image";
import { homeImages } from "@/lib/config";
import type { Project } from "./ProjectArtwork";

const campaignPhotos = {
  seo: homeImages.campaignSeo,
  paid: homeImages.campaignPaid,
  social: homeImages.campaignSocial,
  local: homeImages.campaignLocal,
  retention: homeImages.campaignRetention,
};

export function HomeCampaignArtwork({ project }: { project: Project }) {
  return <div className={`project-art home-campaign-photo home-campaign-${project.theme}`}>
    <div className="project-art-inner">
      <Image {...campaignPhotos[project.theme]} alt={campaignPhotos[project.theme].alt} fill sizes="(max-width: 767px) 100vw, 65vw"/>
      <div className="home-campaign-wash"/>
      <div className="home-campaign-copy">
        <span className="home-campaign-platform">{project.visual.platform}</span>
        <p>{project.artCopy}</p>
        <span className="home-campaign-detail">{project.visual.caption}</span>
      </div>
      <span className="home-campaign-label">Campaign concept · Illustrative image</span>
    </div>
  </div>;
}
