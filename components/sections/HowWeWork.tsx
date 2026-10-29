import styles from "./HowWeWork.module.css";

const steps = [
  { number: "01", label: "UNDERSTAND YOUR AUDIENCE", title: "Find the opportunity.", description: "We review your business goals, audience, website, and current channels to understand where customers find you and where opportunities are missed.", detail: "Audience research · Channel audit", icon: "chat" },
  { number: "02", label: "BUILD THE CAMPAIGN", title: "Launch with purpose.", description: "We bring the right channels, creative, landing pages, and tracking into a focused campaign plan, with a budget and priorities agreed together.", detail: "Channel strategy · Campaign creative", icon: "plan" },
  { number: "03", label: "MEASURE AND OPTIMISE", title: "Learn. Refine. Grow.", description: "We review traffic, enquiries, and lead quality, then test and refine your campaigns. Clear reporting helps you understand the next decision.", detail: "Conversion tracking · Clear reporting", icon: "launch" },
];

function StepIcon({ kind }: { kind: string }) {
  return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "chat" ? <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-6 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 5h10M7 13h6"/> : kind === "plan" ? <><path d="M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="5" rx="1"/><path d="m8 13 3 3 5-6"/></> : <><path d="M12 21V11M12 15C5 15 3 11 3 6c5 0 9 2 9 9ZM12 11c0-6 4-9 9-9 0 5-3 9-9 9ZM7 21h10"/></>}
  </svg>;
}

export function HowWeWork() {
  return <section id="process" className={`section-container ${styles.section}`} aria-labelledby="process-heading">
    <header className="section-heading"><div><h2 id="process-heading">How We <span>Work</span></h2><p className="section-description">From understanding your audience to improving your next campaign.<br className="description-break"/>{" "}A clear process that keeps your business goals in view.</p></div></header>
    <div className={styles.grid}>{steps.map(step => <article key={step.number} className={styles.card}>
      <div className={styles.top}><span className={styles.icon}><StepIcon kind={step.icon}/></span></div>
      <span className={styles.label}>{step.label}</span><h3>{step.title}</h3><p className={styles.description}>{step.description}</p><p className={styles.detail}>{step.detail}</p>
    </article>)}</div>

  </section>;
}
