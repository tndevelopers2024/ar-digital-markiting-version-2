"use client";
import { type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  if (diagonal) return null;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function Button({ children, href, secondary = false, className, onClick }: { children: ReactNode; href: string; secondary?: boolean; interactive?: boolean; className?: string; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return <a href={href} onClick={onClick} className={clsx("button", secondary ? "button-secondary" : "button-primary", className)}><span>{children}</span></a>;
}
