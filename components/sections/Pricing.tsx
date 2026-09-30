"use client";
import { useState } from "react";
import { config } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export function Pricing() {
  const data = config.pricing;
  const [yearly, setYearly] = useState(false);
  return <Section id="pricing" className="pricing section-container batch-section">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="pricing-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2></div><p className="section-intro">{data.description}</p></div>
    <div className="pricing-toolbar"><div className="billing-toggle" role="group" aria-label={data.billingLabel}><button aria-pressed={!yearly} onClick={() => setYearly(false)}>{data.monthlyLabel}</button><button aria-pressed={yearly} onClick={() => setYearly(true)}>{data.yearlyLabel}{" "}<span>{data.saving}</span></button></div></div>
    <div className="pricing-grid">{data.plans.map(plan => <article key={plan.name} className={`price-card${plan.featured ? " price-featured" : ""}`} data-reveal><div className="price-inner"><div className="price-top"><span className="card-number">{plan.number}</span>{plan.featured && <span className="price-badge">{data.popular}</span>}</div><h3>{plan.name}</h3><p className="price-description">{plan.description}</p><div className="price-amount" aria-live="polite" aria-atomic="true"><p><strong>{currency.format(plan.monthly * (yearly ? .85 : 1))}</strong><span>{data.perMonth}</span></p><small>{yearly ? `${currency.format(plan.monthly * .85 * 12)} ${data.annualNote}` : data.monthlyNote}</small></div><Button secondary={!plan.featured} href={`mailto:${config.email}?subject=${encodeURIComponent(`${plan.name} plan — ${yearly ? 'yearly' : 'monthly'}`)}`}>{data.action}<span className="sr-only"> — {plan.name}</span></Button><ul>{plan.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul></div></article>)}</div>
    <p className="section-disclosure">{data.note}</p>
  </Section>;
}
