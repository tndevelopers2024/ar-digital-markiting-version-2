"use client";
import { useEffect, useId, useRef, useState } from "react";
import { config } from "@/lib/config";
import { gsap, motion } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Brand } from "@/components/ui/Brand";
export function GrowthDashboard() {
  const data = config.dashboard;
  const [periodIndex, setPeriodIndex] = useState(0);
  const period = data.periods[periodIndex];
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const totalVisits = period.visits.reduce((sum, value) => sum + value, 0);
  const previousVisits = period.previous.reduce((sum, value) => sum + value, 0);
  const increase = ((totalVisits / previousVisits - 1) * 100).toFixed(1);
  const maximum = Math.ceil(Math.max(...period.visits, ...period.previous) / 20000) * 20000;
  const coords = (values: readonly number[]) => values.map((value, index) => [56 + index * 136, 222 - value / maximum * 190]);
  const points = coords(period.visits);
  const path = (values: readonly number[]) => coords(values).map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const line = path(period.visits);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".dashboard-line", { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: motion.slow * 2, ease: motion.ease, scrollTrigger: { trigger: panel.current, start: "top 85%", once: true } });
      gsap.from(".dashboard-area, .chart-point", { opacity: 0, duration: motion.slow, stagger: 0.06, scrollTrigger: { trigger: panel.current, start: "top 85%", once: true } });
    }, panel);
    return () => ctx.revert();
  }, [periodIndex, reduced]);
  return <Section id="dashboard" className="dashboard-section section-container batch-section"><div className="centered-heading" data-reveal><p className="eyebrow"><span className="status-dot"/>{data.eyebrow}</p><h2 id="dashboard-heading">{data.heading[0]}<br/><span>{data.heading[1]}</span></h2><p className="section-intro">{data.description}</p></div>
    <div ref={panel} className="growth-dashboard" data-reveal><div className="dashboard-topbar"><Brand/><span className="dashboard-workspace">{data.workspace}</span><span className="demo-badge"><span className="status-dot"/>{data.badge}</span></div><div className="dashboard-body"><div className="dashboard-title-row"><div><h3>{data.title}</h3><p>{data.subtitle}</p></div><div className="period-toggle" role="group" aria-label={data.periodLabel}>{data.periods.map((option, index) => <button key={option.id} aria-pressed={periodIndex === index} onClick={() => setPeriodIndex(index)}>{option.label}</button>)}</div></div>
    <p className="sr-only" role="status">{period.range}: {totalVisits.toLocaleString("en-US")} website visits; {period.roas} times return on ad spend.</p>
    <div className="dashboard-metrics" key={period.id}><div className="dashboard-metric featured-metric"><span>{data.metricLabels.visits}</span><Counter value={totalVisits}/><span className="metric-change">↗ +{increase}% <span>{data.previous.toLowerCase()}</span></span></div><div className="dashboard-metric"><span>{data.metricLabels.revenue}</span><Counter value={period.revenue / 1000} prefix="$" suffix="k" decimals={1}/><span className="metric-context">{period.range}</span></div><div className="dashboard-metric"><span>{data.metricLabels.roas}</span><Counter value={period.roas} suffix="×" decimals={1}/><span className="metric-context">{period.range}</span></div><div className="dashboard-metric"><span>{data.metricLabels.conversions}</span><Counter value={period.conversions}/><span className="metric-context">{period.range}</span></div></div>
    <div className="dashboard-lower"><div className="traffic-panel"><div className="chart-heading"><h4>{data.chartTitle}</h4><div className="chart-legend"><span><i/>{data.current}</span><span><i/>{data.previous}</span></div></div><svg className="traffic-chart" viewBox="0 0 768 264" role="img" aria-labelledby={`${id}-title ${id}-description`}><title id={`${id}-title`}>{`${data.chartTitle} — ${period.range}`}</title><desc id={`${id}-description`}>{data.chartDescription}</desc><defs><linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={config.theme.blue} stopOpacity="0.15"/><stop offset="100%" stopColor={config.theme.blue} stopOpacity="0"/></linearGradient></defs>{[0, 1, 2, 3, 4].map(tick => { const y = 222 - tick * 47.5; return <g key={tick}><line x1="56" x2="736" y1={y} y2={y} stroke="#e9eef5" strokeDasharray="3 5"/><text x="42" y={y + 4} textAnchor="end">{tick * maximum / 4 / 1000}k</text></g>; })}<path className="dashboard-area" d={`${line} L736,222 L56,222 Z`} fill={`url(#${id}-area)`}/><path d={path(period.previous)} fill="none" stroke="#9eaabb" strokeWidth="2" strokeDasharray="5 6"/><path className="dashboard-line" d={line} fill="none" stroke={config.theme.blue} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1"/>{points.map(([x, y], i) => <circle className="chart-point" key={i} cx={x} cy={y} r="4" fill="#fff" stroke={config.theme.blue} strokeWidth="2"/>)}{period.labels.map((label, index) => <text key={label} x={56 + index * 136} y="252" textAnchor="middle">{label}</text>)}</svg><details className="chart-data"><summary>{data.tableLabel}</summary><table><caption className="sr-only">{data.chartTitle}: {period.range}</caption><thead><tr><th scope="col">{data.intervalLabel}</th><th scope="col">{data.current}</th><th scope="col">{data.previous}</th></tr></thead><tbody>{period.labels.map((label, i) => <tr key={label}><th scope="row">{label}</th><td>{period.visits[i].toLocaleString("en-US")}</td><td>{period.previous[i].toLocaleString("en-US")}</td></tr>)}</tbody></table></details></div><aside className="channel-panel"><h4>{data.channelsTitle}</h4><p>{data.channelsSubtitle}</p><div className="channel-list">{period.channels.map((channel, index) => <div className={`channel channel-${index}`} key={channel.name}><div><span>{channel.name}</span><strong>{channel.share}%</strong></div><div className="channel-track" aria-hidden="true"><span style={{ transform: `scaleX(${channel.share / 100})` }}/></div></div>)}</div><div className="dashboard-insight"><Icon name="spark"/><div><span>{data.insightLabel}</span><p>{data.insight}</p></div></div></aside></div></div><div className="dashboard-footer"><span className="status-dot"/>{data.note}</div></div>
  </Section>;
}
