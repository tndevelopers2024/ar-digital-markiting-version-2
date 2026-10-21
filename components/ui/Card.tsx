import type { ReactNode } from "react";
import clsx from "clsx";
export function Card({ children, className }: { children: ReactNode; className?: string; tilt?: boolean }) {
  return <div className={clsx("interactive-card", className)}>{children}</div>;
}
