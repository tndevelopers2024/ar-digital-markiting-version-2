import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Brand } from "@/components/ui/Brand";
function Mark({ positive }: { positive: boolean }) {
  return <span className={`comparison-mark ${positive ? "positive" : "negative"}`}><svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={positive ? "m4 10 4 4 8-8" : "m6 6 8 8m0-8-8 8"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" data-draw/></svg></span>;
}
export function WhyChooseUs() {
  const data = config.comparison;
  return <Section id="why-us" className="comparison-section section-container batch-section">
    <div className="centered-heading" data-reveal><h2 id="why-us-heading">Why <span>Choose Us</span></h2><p className="section-intro section-description">One team connecting your search, ads, content, and customer journey.<br className="description-break"/>{" "}A shared strategy, clear reporting, and a focus on relevant enquiries.</p></div>
    <div className="comparison-panel" data-reveal role="region" aria-label="Service comparison" tabIndex={0}><table className="comparison-table"><caption className="sr-only">{data.agency} compared with {data.typical.toLowerCase()}</caption><thead><tr><th scope="col">{data.featureLabel}</th><th scope="col">{data.typical}</th><th scope="col"><Brand/><span className="sr-only">{data.agency}</span></th></tr></thead><tbody>{data.rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td><span className="comparison-cell"><Mark positive={false}/><span>{row.typical}</span></span></td><td><span className="comparison-cell"><Mark positive/><span>{row.agency}</span></span></td></tr>)}</tbody></table></div>
  </Section>;
}
