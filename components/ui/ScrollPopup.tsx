"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/validation";
import { submitEnquiry } from "@/lib/submit-enquiry";
import styles from "./ScrollPopup.module.css";

export function ScrollPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", service: "Not sure yet" },
  });
  useEffect(() => { if (sent) success.current?.focus(); }, [sent]);

  useEffect(() => {
    const element = dialog.current;
    const target = document.querySelector("#main > section:nth-of-type(4)");
    if (!element || !target) return;
    let shown = false;
    try { shown = sessionStorage.getItem("project-popup-seen") === "1"; } catch {}
    if (shown) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || window.scrollY < window.innerHeight) return;
      if (document.querySelector("dialog[open], [aria-modal='true']")) return;
      element.showModal();
      try { sessionStorage.setItem("project-popup-seen", "1"); } catch {}
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(target);
    return () => { observer.disconnect(); element.close(); };
  }, []);

  const close = () => dialog.current?.close();

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="scroll-popup-title" aria-describedby="scroll-popup-description" onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className={styles.content}>
      <button type="button" className={styles.close} onClick={close} aria-label="Close popup" autoFocus>×</button>
      <div className={styles.copy}>
        <h2 id="scroll-popup-title">Your next big move.<br/><span>Let’s build it.</span></h2>
        <p id="scroll-popup-description">A sharper brand, a better website, or an AI idea worth exploring. Tell us what you have in mind.</p>
        {sent ? <div ref={success} tabIndex={-1} role="status" className={styles.success}><h3>Thanks for reaching out.</h3><p>Your enquiry has been received. We’ll follow up soon.</p></div> : <form className={styles.form} noValidate onSubmit={handleSubmit(async values => {
          setError("");
          try { await submitEnquiry("contact", values, company); setSent(true); }
          catch (failure) { setError(failure instanceof Error ? failure.message : "Please try again."); }
        })}>
          <div className={styles.row}>
            <div><label htmlFor="popup-name">Your name</label><input id="popup-name" autoComplete="name" required maxLength={120} {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "popup-name-error" : undefined}/>{errors.name && <p id="popup-name-error" className={styles.error} role="alert">{errors.name.message}</p>}</div>
            <div><label htmlFor="popup-email">Email address</label><input id="popup-email" type="email" autoComplete="email" required maxLength={254} {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "popup-email-error" : undefined}/>{errors.email && <p id="popup-email-error" className={styles.error} role="alert">{errors.email.message}</p>}</div>
          </div>
          <label htmlFor="popup-message">What do you have in mind?</label><textarea id="popup-message" rows={3} required maxLength={3000} placeholder="A little about your project…" {...register("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "popup-message-error" : undefined}/>{errors.message && <p id="popup-message-error" className={styles.error} role="alert">{errors.message.message}</p>}
          <div className="form-trap" aria-hidden="true"><label htmlFor="popup-company">Leave this empty</label><input id="popup-company" tabIndex={-1} autoComplete="off" value={company} onChange={event => setCompany(event.target.value)}/></div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.action} disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send enquiry"}<span aria-hidden="true"></span></button>
          <p className={styles.note}>We’ll use your details to respond to your enquiry.</p>
        </form>}
        <button type="button" className={styles.later} onClick={close}>I’ll keep exploring</button>
      </div>
    </div>
  </dialog>;
}
