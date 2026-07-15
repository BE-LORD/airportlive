// Scene 6 — closing CTA. Brand lockup + WhatsApp number + domain.
// Contact facts from src/lib/constants.ts (BUSINESS.phone / .domain).

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, easeOut, fadeOut, phase, snap } from "../theme";
import type { LayoutInfo } from "../layout";

const PHONE_DISPLAY = "98880 00510";
const DOMAIN = "airportlive.in";

export function SceneCTA({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();

  const logoIn = phase(frame, 4, 26, snap);
  const lineIn = phase(frame, 16, 34, easeOut);
  const pillIn = phase(frame, 28, 48, snap);
  const domainIn = phase(frame, 40, 56, easeOut);
  const outro = fadeOut(frame, durationInFrames - 16, durationInFrames - 1);

  // Gentle breathing pulse on the CTA pill, driven by frame (render-safe).
  const pulse = 1 + Math.sin(frame * 0.16) * 0.02 * pillIn;

  const brandSize = width * (layout.vertical ? 0.115 : 0.078) * layout.fontScale;
  const subSize = width * (layout.vertical ? 0.026 : 0.017) * layout.fontScale;
  const phoneSize = width * (layout.vertical ? 0.05 : 0.03) * layout.fontScale;
  const domainSize = width * (layout.vertical ? 0.022 : 0.014) * layout.fontScale;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: outro,
      }}
    >
      {/* Radial glow behind the lockup */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 46%, ${COLORS.signalDeep}22, transparent 55%)`,
          opacity: logoIn,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: layout.vertical ? 34 : 26,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: brandSize * 0.06,
            opacity: logoIn,
            scale: interpolate(logoIn, [0, 1], [0.86, 1]),
            translate: `0px ${interpolate(logoIn, [0, 1], [26, 0])}px`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: brandSize,
              fontWeight: 700,
              letterSpacing: -brandSize * 0.02,
              color: COLORS.mist,
            }}
          >
            AIRPORT
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: brandSize,
              fontWeight: 700,
              letterSpacing: -brandSize * 0.02,
              color: COLORS.signal,
            }}
          >
            LIVE
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: subSize,
            letterSpacing: subSize * 0.34,
            textTransform: "uppercase",
            color: COLORS.muted,
            opacity: lineIn,
            translate: `0px ${interpolate(lineIn, [0, 1], [14, 0])}px`,
          }}
        >
          Premium Airport Transfers
        </div>

        {/* WhatsApp CTA pill */}
        <div
          style={{
            marginTop: layout.vertical ? 26 : 20,
            display: "flex",
            alignItems: "center",
            gap: phoneSize * 0.5,
            padding: `${phoneSize * 0.55}px ${phoneSize * 1.1}px`,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.signal}, ${COLORS.signalDeep})`,
            boxShadow: `0 20px 60px ${COLORS.signalDeep}55, inset 0 1px 0 rgba(255,255,255,0.4)`,
            opacity: pillIn,
            scale: `${interpolate(pillIn, [0, 1], [0.8, 1]) * pulse}`,
          }}
        >
          {/* WhatsApp glyph */}
          <svg
            width={phoneSize * 1.15}
            height={phoneSize * 1.15}
            viewBox="0 0 24 24"
            fill={COLORS.ink}
          >
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.34-.5.05-.5.42-3.15-.66-2.66-1.08-4.32-3.78-4.45-3.96-.13-.18-1.06-1.4-1.06-2.67s.66-1.9.9-2.16c.24-.26.52-.32.7-.32.17 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.8 1.9.87 2.04.07.13.12.29.02.47-.1.18-.15.29-.29.45-.14.16-.3.36-.43.48-.14.14-.29.3-.12.58.16.29.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.27 1.4.29.14.45.12.62-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.65.78 1.94.92.29.14.48.22.55.34.07.12.07.68-.17 1.36Z" />
          </svg>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: phoneSize,
              fontWeight: 700,
              letterSpacing: phoneSize * 0.02,
              color: COLORS.ink,
              whiteSpace: "nowrap",
            }}
          >
            {PHONE_DISPLAY}
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: domainSize,
            letterSpacing: domainSize * 0.3,
            color: COLORS.goldSoft,
            opacity: domainIn,
            marginTop: layout.vertical ? 8 : 4,
          }}
        >
          {DOMAIN}
        </div>
      </div>
    </AbsoluteFill>
  );
}
