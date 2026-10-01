"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { config } from "@/lib/config";
import { auditSchema, type AuditValues } from "@/lib/validation";
import { Section } from "@/components/ui/Section";
import { Arrow } from "@/components/ui/Button";
import { ScrollTrigger } from "@/lib/gsap";
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
  return <Section id="audit" className="audit section-container batch-section"><div className="audit-layout"><div className="audit-copy" data-reveal><h2 id="audit-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="audit-description">{data.description}</p><ul>{data.benefits.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><div className="audit-aside"><span aria-hidden="true">✳</span><div><p className="eyebrow">{data.aside}</p><p>{data.asideNote}</p></div></div></div><div className="audit-panel">{success ? <div ref={successRef} tabIndex={-1} className="audit-success" role="status"><span className="success-mark" aria-hidden="true">✓</span><h3>{data.successTitle}</h3><p>{data.successBody}</p><button className="button button-secondary" onClick={restart}>{data.reset}<Arrow/></button></div> : <form onSubmit={handleSubmit(submit)} noValidate aria-labelledby="audit-form-title" aria-describedby="audit-demo"><h3 id="audit-form-title">{data.formTitle}</h3><div className="form-field"><label htmlFor="audit-name">{data.name}</label><input id="audit-name" autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")}/>{errors.name && <p id="name-error" className="field-error" role="alert">{errors.name.message}</p>}</div><div className="form-field"><label htmlFor="audit-email">{data.email}</label><input id="audit-email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")}/>{errors.email && <p id="email-error" className="field-error" role="alert">{errors.email.message}</p>}</div><div className="form-field"><label htmlFor="audit-website">{data.website}</label><input id="audit-website" type="url" autoComplete="url" placeholder="https://" required aria-invalid={!!errors.website} aria-describedby={errors.website ? "website-error" : undefined} {...register("website")}/>{errors.website && <p id="website-error" className="field-error" role="alert">{errors.website.message}</p>}</div><div className="form-field"><label htmlFor="audit-budget">{data.budget}</label><select id="audit-budget" required aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-error" : undefined} {...register("budget")}><option value="">{data.select}</option>{data.budgets.map(budget => <option key={budget} value={budget}>{budget}</option>)}</select>{errors.budget && <p id="budget-error" className="field-error" role="alert">{errors.budget.message}</p>}</div><div className="form-trap" aria-hidden="true"><label htmlFor="audit-company">Leave this field empty</label><input id="audit-company" value={company} onChange={event=>setCompany(event.target.value)} tabIndex={-1} autoComplete="off"/></div>{error&&<p role="alert" className="field-error">{error}</p>}<button className="button button-primary audit-submit" type="submit" disabled={isSubmitting}><span>{isSubmitting?"Sending…":data.submit}</span><Arrow diagonal/></button><p id="audit-demo" className="form-note">{data.demo}</p></form>}</div></div></Section>;
}
