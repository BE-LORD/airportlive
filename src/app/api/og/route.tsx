import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/constants";

export const runtime = "edge";

/**
 * OG Image — Spec: 11_SEO_ANALYTICS_QA.md #5
 * Dynamic branded OG image with SONA CORRIDOR palette.
 */

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
          backgroundColor: "#F6F1E7",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Gold accent corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "300px",
            background:
              "linear-gradient(225deg, rgba(200,200,220,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Bottom indigo strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#1E2B4A",
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
              color: "#D1D1D1",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            LUDHIANA · CHANDIGARH · DELHI NCR
          </p>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#1E2B4A",
              textAlign: "center",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {BUSINESS.name}
          </h1>

          {/* Gold divider */}
          <div
            style={{
              width: "100px",
              height: "3px",
              backgroundColor: "#D1D1D1",
              borderRadius: "2px",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: "28px",
              color: "#5C4733",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            Premium Airport Transfers Across Punjab
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
              { v: "20+", l: "Years" },
              { v: "100+", l: "Fleet" },
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
                    color: "#D1D1D1",
                  }}
                >
                  {c.v}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#A08B72",
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
              color: "#D1D1D1",
              marginTop: "20px",
              letterSpacing: "0.15em",
              fontWeight: 500,
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
