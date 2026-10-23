import styles from "./WhatsAppFab.module.css";

export function WhatsAppFab() {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
  const number = configured.replace(/[\s()+-]/g, "");
  const ready = /^[1-9]\d{7,14}$/.test(number);
  const content = <>
    <span className={styles.tooltip}>WhatsApp</span>
    <svg viewBox="2 2 28 28" fill="currentColor" aria-hidden="true"><path d="M16.04 2.5A13.4 13.4 0 0 0 4.55 22.8L2.7 29.5l6.86-1.8a13.4 13.4 0 0 0 6.48 1.67h.01A13.44 13.44 0 0 0 16.04 2.5Zm.01 24.6a11.14 11.14 0 0 1-5.68-1.55l-.41-.25-4.07 1.07 1.09-3.97-.27-.42a11.12 11.12 0 1 1 9.34 5.12Zm6.1-8.32c-.34-.17-1.99-.98-2.3-1.09-.31-.11-.53-.17-.76.17-.22.33-.87 1.09-1.07 1.31-.19.22-.39.25-.73.08-.33-.17-1.41-.52-2.69-1.66-1-.89-1.67-1.99-1.87-2.32-.19-.34-.02-.52.15-.69.15-.15.33-.39.5-.58.17-.2.22-.34.33-.56.11-.22.06-.42-.03-.59-.08-.17-.75-1.82-1.03-2.49-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.89.42-.31.33-1.17 1.14-1.17 2.79 0 1.65 1.2 3.24 1.37 3.46.17.22 2.36 3.6 5.72 5.05.8.35 1.42.55 1.9.71.8.25 1.53.22 2.11.13.64-.1 1.99-.81 2.27-1.59.28-.78.28-1.45.19-1.59-.08-.14-.3-.22-.64-.39Z" /></svg>
  </>;
  if (!ready) return <button type="button" className={styles.fab} aria-label="WhatsApp" aria-disabled="true">{content}</button>;
  return <a className={styles.fab} href={`https://wa.me/${number}?text=${encodeURIComponent("Hi AR Digital Marketing, I’d like to discuss a project.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)">{content}</a>;
}
