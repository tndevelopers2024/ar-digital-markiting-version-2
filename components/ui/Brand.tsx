import { config } from "@/lib/config";
export function Brand({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`} aria-label={config.name}><svg className="brand-logo" viewBox="243 347 594 327" aria-hidden="true"><image href={config.logo} width="1080" height="1080"/></svg><span className="brand-label">Digital<span>Marketing</span></span></span>;
}
