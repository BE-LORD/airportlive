import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/constants";

// Node.js runtime (default). Edge runtime disables static optimization for this
// route and is unnecessary here — the image is fully derived from static data.
export const runtime = "nodejs";

/**
 * OG Image — dynamic branded social share card.
 * Uses the site's dark "Midnight & Platinum" palette so text is high-contrast
 * and on-brand (dark background, platinum headings, muted body).
 */

const COLORS = {
  bg: "#0A0A0A",
  surface: "#141414",
  platinum: "#E5E4E2",
  white: "#FFFFFF",
  textMuted: "#A0A0A0",
  accent: "#E8943A",
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.bg,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${COLORS.surface} 0%, ${COLORS.bg} 60%)`,
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Top accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: COLORS.platinum,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "16px",
              color: COLORS.platinum,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
              margin: 0,
            }}
          >
            LUDHIANA · CHANDIGARH · DELHI NCR
          </p>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 700,
              color: COLORS.white,
              textAlign: "center",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {BUSINESS.name}
          </h1>

          {/* Divider */}
          <div
            style={{
              width: "100px",
              height: "3px",
              backgroundColor: COLORS.accent,
              borderRadius: "2px",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: "28px",
              color: COLORS.textMuted,
              textAlign: "center",
              maxWidth: "760px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {BUSINESS.tagline} across Ludhiana, Chandigarh &amp; Delhi NCR
          </p>

          {/* Trust chips */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            {[
              { v: BUSINESS.experience, l: "Years" },
              { v: BUSINESS.fleetCount, l: "Fleet" },
              { v: "24/7", l: "Service" },
            ].map((c) => (
              <div
                key={c.l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: COLORS.platinum,
                  }}
                >
                  {c.v}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.l}
                </span>
              </div>
            ))}
          </div>

          {/* Website */}
          <p
            style={{
              fontSize: "18px",
              color: COLORS.platinum,
              marginTop: "20px",
              letterSpacing: "0.15em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {BUSINESS.websiteDisplay}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
