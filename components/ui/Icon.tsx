import type { SVGProps } from "react";
const paths = {
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  target: "M22 12a10 10 0 1 1-10-10M17 12a5 5 0 1 1-5-5M12 12 22 2m-5 0h5v5",
  social: "M21 11a9 9 0 0 1-9 9H4l-3 3V11a10 10 0 0 1 20 0ZM6 10h10M6 14h6",
  spark: "m12 2 2.6 6.8L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-3.2L12 2Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
  document: "M5 2h10l5 5v15H5V2Zm9 0v6h6M9 12h7m-7 4h7",
  bag: "M4 7h16l1 15H3L4 7Zm4 1V6a4 4 0 0 1 8 0v2",
  heart: "M12 21 3 12C-3 4 7-2 12 6c5-8 15-2 9 6l-9 9Z",
  building: "M3 22V8l9-6 9 6v14H3Zm5 0v-8h8v8M8 9h1m6 0h1",
  cup: "M3 8h14v6a7 7 0 0 1-14 0V8Zm14 1h2a3 3 0 0 1 0 6h-2M6 2v2m5-2v2M2 22h18",
  chart: "M3 2v20h19M7 16l5-6 4 2 6-8M7 19h1m4 0h1m4 0h1",
} as const;
export type IconName = keyof typeof paths;
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]}/></svg>;
}
