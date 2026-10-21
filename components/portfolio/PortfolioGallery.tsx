"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioCategories, portfolioProjects, type PortfolioProject } from "@/lib/portfolio-data";
import { BrandHeading } from "@/components/ui/BrandHeading";
import styles from "./Portfolio.module.css";

export function PortfolioGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const filteredProjects = portfolioProjects.filter(project => activeTab === "all" || project.category === activeTab);

  useEffect(() => {
    const element = dialog.current;
    if (!selectedProject || !element) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = opener.current;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  const close = () => dialog.current?.close();
  return <section className={styles.portfolioSection} aria-labelledby="portfolio-gallery-title">
    <div className="bespoke-heading"><h2 id="portfolio-gallery-title"><BrandHeading text="Explore the Possibilities" /></h2><p>Choose a category and open a concept to see the brief, approach, and deliverables. These are illustrative studies, not completed client projects or measured results.</p></div>
    <div className={styles.filtersWrapper} role="group" aria-label="Filter portfolio concepts">
      {portfolioCategories.map(category => <button type="button" key={category.id} aria-pressed={activeTab === category.id} className={`${styles.filterButton} ${activeTab === category.id ? styles.filterButtonActive : ""}`} onClick={() => setActiveTab(category.id)}>{category.label}<span className={styles.countBadge}>{category.id === "all" ? portfolioProjects.length : portfolioProjects.filter(project => project.category === category.id).length}</span></button>)}
    </div>
    <p className={styles.filterInfo} role="status">Showing {filteredProjects.length} {filteredProjects.length === 1 ? "concept" : "concepts"}</p>
    <div className={styles.portfolioGrid}>
      {filteredProjects.map(project => <article key={project.id} className={styles.portfolioCard}>
        <div className={styles.cardMedia}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" className={styles.cardImage} /></div>
        <div className={styles.cardContent}><h3 className={styles.cardTitle}>{project.title}</h3><p className={styles.cardSummary}>{project.summary}</p><button type="button" className={styles.cardAction} onClick={event => { opener.current = event.currentTarget; setSelectedProject(project); }} aria-haspopup="dialog" aria-label={`Explore concept: ${project.title}`}>Explore concept</button></div>
      </article>)}
    </div>
    <dialog ref={dialog} className={styles.conceptDialog} aria-labelledby="modal-case-title" onClose={() => setSelectedProject(null)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {selectedProject && <div>
        <div className={styles.modalHeader}><span>{selectedProject.categoryLabel} · Concept study</span><button type="button" className={styles.modalCloseBtn} onClick={close} aria-label="Close concept" autoFocus>×</button></div>
        <div className={styles.modalBody}>
          <div className={styles.modalHeroMedia}><Image src={selectedProject.image} alt={selectedProject.imageAlt} fill sizes="(max-width: 900px) 100vw, 860px" style={{ objectFit: "cover" }} /></div>
          <h2 id="modal-case-title" className={styles.modalTitle}>{selectedProject.title}</h2><p className={styles.modalSummary}>{selectedProject.summary}</p>
          <div className={styles.modalSplit}><div className={styles.modalSplitBox}><h3>The brief</h3><p>{selectedProject.challenge}</p></div><div className={styles.modalSplitBox}><h3>The approach</h3><p>{selectedProject.solution}</p></div></div>
          <div className={styles.resultsList}><h3>Planned deliverables</h3><ul>{selectedProject.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className={styles.modalFooterActions}><button type="button" className="button button-secondary" onClick={close}>Close</button><Link href="/contact" className="button button-primary" onClick={close}>Discuss your project</Link></div>
        </div>
      </div>}
    </dialog>
  </section>;
}
