"use client";
import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import { ProjectArtwork, type Project } from "./ProjectArtwork";
import { Arrow } from "./Button";
export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [project]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-heading" onClose={onClose} data-lenis-prevent onClick={event => { if (event.target === ref.current) ref.current.close(); }}>
    {project && <div className="dialog-content"><button className="dialog-close" onClick={() => ref.current?.close()} aria-label={config.work.close} autoFocus><span aria-hidden="true">×</span></button><ProjectArtwork project={project}/><div className="dialog-copy"><p className="eyebrow">{project.category}</p><h2 id="project-dialog-heading">{project.title}</h2><div className="project-tags">{project.services.map(service => <span key={service}>{service}</span>)}</div><div className="dialog-metrics"><div><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><div><strong>{project.secondMetric}</strong><span>{project.secondLabel}</span></div></div><div className="dialog-story">{([{ label: config.work.challenge, text: project.challenge }, { label: config.work.approach, text: project.approach }, { label: config.work.outcome, text: project.outcome }]).map(item => <div key={item.label}><h3>{item.label}</h3><p>{item.text}</p></div>)}</div><a className="button button-primary" href="#audit" onClick={() => ref.current?.close()}>{config.work.cta}<Arrow diagonal/></a><a className="inner-text-link" href={`/projects/${project.id}`}>View full campaign ↗</a><p className="dialog-disclosure">{config.work.disclosure}</p></div></div>}
  </dialog>;
}
