"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { config } from "@/lib/config";
import { auditSchema, type AuditValues } from "@/lib/validation";
import { Section } from "@/components/ui/Section";
import { ScrollTrigger } from "@/lib/gsap";
import styles from "./AuditForm.module.css";
export function AuditForm() {
  const data = config.audit;
  const [error,setError]=useState("");
  const [company,setCompany]=useState("");
  const [success, setSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } = useForm<AuditValues>({ resolver: zodResolver(auditSchema), defaultValues: { name: "", email: "", website: "", budget: "" } });
  useEffect(() => {
    if (success) successRef.current?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [success]);
  async function submit(values:AuditValues) { setError(""); try { await submitEnquiry("audit",values,company); reset(); setSuccess(true); } catch(error) { setError(error instanceof Error?error.message:"Please try again later."); } }
  function restart() { setSuccess(false); requestAnimationFrame(() => setFocus("name")); }
  return <Section id="audit" className={`section-container ${styles.section}`}><div className={styles.layout}><div className={styles.copy}>
    <p className={styles.eyebrow}>A FRESH PERSPECTIVE. A SMARTER NEXT STEP.</p>
    <h2 id="audit-heading">Your website.<br/>New possibilities.<br/><span>Let’s take a look.</span></h2>
    <p className={styles.description}>Get a free website audit to uncover opportunities across search, content, and the journey from first visit to enquiry.</p>
    <div className={styles.benefits}>
      <div><div><h3>Be easier to find</h3><p>Understand how your search presence could work harder.</p></div></div>
      <div><div><h3>Give visitors a reason to stay</h3><p>Find opportunities for clearer content and a smoother experience.</p></div></div>
      <div><div><h3>Move forward with focus</h3><p>Start with practical ideas for your next improvements.</p></div></div>
    </div>
    <p className={styles.aside}>A useful conversation. No pressure.</p>
  </div><div className={`audit-panel ${styles.panel}`}>{success ? <div ref={successRef} tabIndex={-1} className="audit-success" role="status"><span className="success-mark" aria-hidden="true">✓</span><h3>{data.successTitle}</h3><p>{data.successBody}</p><button className="button button-secondary" onClick={restart}>{data.reset}</button></div> : <form onSubmit={handleSubmit(submit)} noValidate aria-labelledby="audit-form-title" aria-describedby="audit-demo"><div className={styles.formHeader}><span className={styles.badge}>FREE WEBSITE AUDIT</span></div><h3 id="audit-form-title">Find your next opportunity.</h3><p className={styles.formIntro}>Tell us a little about you and your website.</p><div className="form-field"><label htmlFor="audit-name">{data.name}</label><input id="audit-name" placeholder="Your full name" autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")}/>{errors.name && <p id="name-error" className="field-error" role="alert">{errors.name.message}</p>}</div><div className="form-field"><label htmlFor="audit-email">{data.email}</label><input id="audit-email" placeholder="you@company.com" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")}/>{errors.email && <p id="email-error" className="field-error" role="alert">{errors.email.message}</p>}</div><div className="form-field"><label htmlFor="audit-website">{data.website}</label><input id="audit-website" type="url" autoComplete="url" placeholder="https://yourwebsite.com" required aria-invalid={!!errors.website} aria-describedby={errors.website ? "website-error" : undefined} {...register("website")}/>{errors.website && <p id="website-error" className="field-error" role="alert">{errors.website.message}</p>}</div><div className="form-field"><label htmlFor="audit-budget">{data.budget}</label><select id="audit-budget" required aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-error" : undefined} {...register("budget")}><option value="">{data.select}</option>{data.budgets.map(budget => <option key={budget} value={budget}>{budget}</option>)}</select>{errors.budget && <p id="budget-error" className="field-error" role="alert">{errors.budget.message}</p>}</div><div className="form-trap" aria-hidden="true"><label htmlFor="audit-company">Leave this field empty</label><input id="audit-company" value={company} onChange={event=>setCompany(event.target.value)} tabIndex={-1} autoComplete="off"/></div>{error&&<p role="alert" className="field-error">{error}</p>}<button className="button button-primary audit-submit" type="submit" disabled={isSubmitting}><span>{isSubmitting?"Sending…":data.submit}</span></button><p id="audit-demo" className="form-note">{data.demo}</p></form>}</div></div></Section>;
}
