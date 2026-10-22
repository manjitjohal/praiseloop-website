import { ImageResponse } from "next/og";

/** Default social share image for every page that doesn't set its own. */
export const alt = "PraiseLoop: the AI coach for revenue teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#153F3F", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#FFFFFF", fontSize: 34, fontWeight: 800 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: "#F26522" }} />
          PraiseLoop
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#9FD0D0", fontSize: 28, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>The AI coach for revenue teams</div>
          <div style={{ color: "#FFFFFF", fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>Every manager&apos;s hour should go where the revenue is.</div>
        </div>
        <div style={{ color: "#CFE3E3", fontSize: 26 }}>For sales and customer success teams</div>
      </div>
    ),
    size,
  );
}
