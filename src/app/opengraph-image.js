import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.name} — a New York digital studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card for the homepage (also used for Twitter/X) — the brand's navy, cyan and violet
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "radial-gradient(ellipse at 76% 42%, #10285a 0%, #03050b 62%)", color: "#eef1f7", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 6, textTransform: "uppercase", color: "#8a90a3", fontFamily: "monospace" }}>
          <span>New York · Est. {SITE.established}</span>
          <span style={{ color: "#36e4d0" }}>AI · SaaS · Mobile · Web</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
          <span>We create digital</span>
          <span style={{ color: "#36e4d0" }}>experiences</span>
          <span>that move people.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>THE LINCOLN</span>
          <span style={{ fontSize: 16, letterSpacing: 12, color: "#36e4d0", fontFamily: "monospace" }}>MEDIA</span>
        </div>
      </div>
    ),
    size
  );
}
