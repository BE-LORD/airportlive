import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, fadeOut, phase } from "../theme";
import type { LayoutInfo } from "../layout";

// Scene 1 — "Ignition".
// A headlight beam sweeps across the frame and the AIRPORTLIVE wordmark
// resolves out of the light. Sets the premium, cinematic tone.
export function SceneIgnition({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const { vertical, fontScale } = layout;

  // Beam sweeps left -> right early, then settles.
  const beamX = interpolate(frame, [0, 46], [-width * 0.6, width * 0.62], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const beamOpacity = phase(frame, 4, 20) * fadeOut(frame, 46, 74);

  // Wordmark reveal.
  const enter = phase(frame, 22, 52, Easing.bezier(0.2, 0.95, 0.15, 1));
  const tracking = interpolate(enter, [0, 1], [vertical ? 28 : 44, vertical ? 6 : 10]);
  const wordY = interpolate(enter, [0, 1], [vertical ? 40 : 30, 0]);
  const brandSize = (vertical ? width * 0.14 : width * 0.088) * fontScale;
  const tagSize = (vertical ? width * 0.038 : width * 0.022) * fontScale;

  const out = fadeOut(frame, durationInFrames - 16, durationInFrames - 1);

  // Subtle breathing glow on the wordmark once settled.
  const glow = 0.5 + Math.sin(frame * 0.12) * 0.12 * enter;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: out,
      }}
    >
      {/* Headlight beam */}
      <div
        style={{
          position: "absolute",
          left: beamX,
          top: -height * 0.2,
          width: width * 0.5,
          height: height * 1.4,
          opacity: beamOpacity,
          rotate: "14deg",
          background: `linear-gradient(90deg, transparent, ${COLORS.signal}55, rgba(255,255,255,0.9), ${COLORS.signal}55, transparent)`,
          filter: "blur(26px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: vertical ? height * 0.018 : height * 0.02,
          translate: `0px ${wordY}px`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: brandSize,
            letterSpacing: tracking,
            lineHeight: 1,
            color: COLORS.mist,
            textShadow: `0 0 ${28 * glow}px ${COLORS.signal}aa, 0 0 ${70 * glow}px ${COLORS.signalDeep}66`,
            opacity: enter,
          }}
        >
          AIRPORT<span style={{ color: COLORS.signal }}>LIVE</span>
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontWeight: 500,
            fontSize: tagSize,
            letterSpacing: (vertical ? 6 : 9) * enter,
            textTransform: "uppercase",
            color: COLORS.muted,
            opacity: phase(frame, 42, 60),
          }}
        >
          Premium Airport Transfers
        </div>
      </div>
    </AbsoluteFill>
  );
}
