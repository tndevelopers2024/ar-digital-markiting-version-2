"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { config, homeImages } from "@/lib/config";
import { type Project } from "@/components/ui/ProjectArtwork";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import styles from "./SelectedWork.module.css";

const photos = {
  seo: homeImages.campaignSeo,
  paid: homeImages.campaignPaid,
  social: homeImages.campaignSocial,
  local: homeImages.campaignLocal,
  retention: homeImages.campaignRetention,
};

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const data = config.work;

  return <section id="work" className={`section-container ${styles.section}`} aria-labelledby="work-heading">
    <header className={styles.header}>
      <div><span className={styles.eyebrow}>CREATIVE THINKING. CLEAR DIRECTION.</span><h2 id="work-heading">Get seen. Get chosen.<br/><span>Keep growing.</span></h2></div>
      <p>From the first search to the next visit, explore how we connect your brand with the people who matter.</p>
    </header>
    <div className={styles.grid}>{data.projects.map((project, index) => <article key={project.id} className={`${styles.card} ${index === 0 ? styles.featured : ""}`}>
      <button type="button" className={styles.open} onClick={() => setSelected(project)}>
        <div className={styles.photo}><Image {...photos[project.theme]} alt={photos[project.theme].alt} fill sizes={index === 0 ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 100vw, 42vw"}/><span className={styles.platform}>{project.visual.platform}</span><span className={styles.photoNote}>Campaign concept</span></div>
        <div className={styles.copy}>
          <div className={styles.topline}><span>{String(index + 1).padStart(2, "0")} / {project.visual.platform}</span><span className={styles.arrow} aria-hidden="true"></span></div>
          <h3>{project.artCopy}</h3>
          <p>{project.title}</p>
          <div className={styles.tags}>{project.services.map(service => <span key={service}>{service}</span>)}</div>
          <div className={styles.footer}><span>Explore the approach</span><span>{project.metric} <small>/ focus</small></span></div>
        </div>
      </button>
    </article>)}</div>
    <p className={styles.note}>Illustrative campaign concepts showing our approach to strategy and creative.</p>
    <ProjectDialog project={selected} onClose={close}/>
  </section>;
}
