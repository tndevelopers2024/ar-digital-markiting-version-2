import { ImageResponse } from "next/og";
import { config } from "@/lib/config";
export const alt = "AR Digital Marketing — Ideas into digital impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#FAF9F6", padding: 64, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>{config.name} ↗</div><div style={{ display: "flex", flexDirection: "column", fontSize: 94, lineHeight: 1.05, letterSpacing: -6 }}><span>Your idea. Built right.</span><span style={{ color: "#245BA7" }}>Made real.</span></div><div style={{ display: "flex", fontSize: 20, color: "#6B6B76" }}>DESIGN ↗ DEVELOPMENT ↗ DIGITAL GROWTH</div><div style={{ display: "flex", position: "absolute", right: 50, top: 72, width: 280, height: 280, borderRadius: 140, background: "linear-gradient(135deg, #245BA7, #D62832, #F6D7DB)", opacity: 0.24 }}/></div>, size);
}
