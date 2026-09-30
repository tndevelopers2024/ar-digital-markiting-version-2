import type { config } from "@/lib/config";
export type Project = (typeof config.work.projects)[number];
export function ProjectArtwork({ project }: { project: Project }) {
  const v = project.visual;
  return <div className={`project-art campaign-art campaign-${project.theme}`} role="img" aria-label={project.artTitle}><div className="project-art-inner" aria-hidden="true">
    <div className="campaign-top"><span className="campaign-channel">{v.platform}</span><span>{project.artEyebrow}</span></div>
    <div className="campaign-copy"><p>{project.artCopy}</p><span>{v.caption}</span></div>
    <div className="campaign-preview"><div className="campaign-window-bar"><span/><span/><span/><small>{v.label}</small></div>
      {(project.theme === "seo" || project.theme === "paid") && <div className="campaign-search"><div className="campaign-search-field"><span>⌕</span>{v.query}</div><small>{v.badge}</small><strong>{v.title}</strong><p>{v.subtitle}</p>{project.theme === "paid" && <span className="campaign-mini-cta">{v.action} ↗</span>}<div className="campaign-sample-lines"><i/><i/></div></div>}
      {project.theme === "social" && <div className="campaign-social"><div className="campaign-social-profile"><span>AR</span><strong>{v.query}</strong><b>•••</b></div><div className="campaign-social-post"><span>✳</span><strong>{v.title}</strong><small>{v.subtitle}</small></div><div className="campaign-social-actions"><span>♡</span><span>↗</span><small>{v.action}</small></div></div>}
      {project.theme === "local" && <div className="campaign-local"><div className="campaign-map"><i/><i/><i/><span className="map-pin">●</span><span className="map-pin map-pin-small">●</span></div><div className="campaign-local-listing"><small>{v.badge}</small><strong>{v.title}</strong><p>{v.subtitle}</p><span className="campaign-mini-cta">{v.action} ↗</span></div></div>}
      {project.theme === "retention" && <div className="campaign-email"><div className="campaign-email-subject"><span>↗</span><strong>{v.query}</strong></div><span className="campaign-email-mark">AR</span><strong>{v.title}</strong><p>{v.subtitle}</p><span className="campaign-mini-cta">{v.action} ↗</span></div>}
    </div>
    <div className="campaign-signal"><span className="campaign-signal-label"><i/>{v.metric}</span>{project.theme === "seo" || project.theme === "paid" ? <svg viewBox="0 0 220 64" fill="none"><path d="M1 55H219M1 30H219" stroke="currentColor" opacity=".12"/><path d="M4 51 32 43 61 46 89 29 119 33 148 19 177 24 216 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="216" cy="6" r="4" fill="currentColor"/></svg> : <div className="campaign-journey">{v.labels.map((label, i) => <span key={label}><b>{String(i+1).padStart(2,"0")}</b>{label}</span>)}</div>}</div>
  </div></div>;
}
