import { socialLinks } from "@/lib/site";
import styles from "./SocialLinks.module.css";

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "Instagram") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  }
  if (platform === "LinkedIn") {
    return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.4 3.3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.6 9h3.6v12H3.6V9Zm5.9 0H13v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-6c0-1.5 0-3.4-2-3.4s-2.3 1.6-2.3 3.3V21H9.5V9Z"/></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h5a3 3 0 0 1 0 6H3V6Zm0 6h5a3 3 0 0 1 0 6H3v-6ZM15 6h5M14 14h7c0-5-7-5-7 0 0 4 5 5 7 2"/></svg>;
}

export function SocialLinks() {
  if (!socialLinks.length) return null;
  return <nav className={styles.socials} aria-label="Follow AR Digital Marketing">
    {socialLinks.map(({ label, href }) => <a key={label} className={styles.link} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
      <span className={styles.icon}><SocialIcon platform={label}/></span>
      <span>{label}</span>
    </a>)}
  </nav>;
}
