import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, fadeOut, inOut, phase } from "../theme";
import type { LayoutInfo } from "../layout";

// Scene 2 — "The Hook".
// Real takeoff footage, graded dark, with a bold promise line and a
// floating glass boarding-pass chip. Establishes the emotional stakes:
// flights don't wait.
export function SceneHook({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();
  const { vertical, fontScale } = layout;

  const scale = interpolate(frame, [0, durationInFrames], [1.14, 1.24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame, [0, durationInFrames], [vertical ? -14 : -26, vertical ? 14 : 26]);

  const line1 = inOut(frame, 10, 34, durationInFrames - 22, durationInFrames - 2);
  const line2 = inOut(frame, 26, 50, durationInFrames - 22, durationInFrames - 2);
  const y1 = interpolate(phase(frame, 10, 34), [0, 1], [34, 0]);
  const y2 = interpolate(phase(frame, 26, 50), [0, 1], [34, 0]);

  const headSize = (vertical ? width * 0.078 : width * 0.05) * fontScale;
  const cardIn = phase(frame, 40, 66) * fadeOut(frame, durationInFrames - 20, durationInFrames - 2);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <Video
        src={staticFile(
          vertical
            ? "media/video/airportlive-ready-takeoff-mobile.mp4"
            : "media/video/airportlive-ready-takeoff-desktop.mp4"
        )}
        muted
        loop
        trimBefore={vertical ? 30 : 36}
        playbackRate={0.7}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: vertical ? "center 45%" : "center 46%",
          translate: `${drift}px 0px`,
          scale,
          filter: "contrast(1.12) saturate(0.7) brightness(0.66)",
        }}
      />
      {/* Grade + vignette */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.ink}dd, ${COLORS.ink}22 42%, ${COLORS.ink}ee)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: vertical ? "0 8%" : "0 12%",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: vertical ? "100%" : "70%" }}>
          <div
            style={{
              fontFamily: FONTS.serif,
              fontWeight: 600,
              fontSize: headSize,
              lineHeight: 1.08,
              color: COLORS.mist,
              opacity: line1,
              translate: `0px ${y1}px`,
            }}
          >
            Your flight won&apos;t wait.
          </div>
          <div
            style={{
              fontFamily: FONTS.serif,
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: headSize * 1.04,
              lineHeight: 1.08,
              color: COLORS.signal,
              opacity: line2,
              translate: `0px ${y2}px`,
              textShadow: `0 0 30px ${COLORS.signalDeep}66`,
            }}
          >
            Neither do we.
          </div>
        </div>
      </AbsoluteFill>

      {/* Glass boarding-pass chip */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: vertical ? "16%" : "13%",
          translate: `-50% ${interpolate(cardIn, [0, 1], [30, 0])}px`,
          opacity: cardIn,
          display: "flex",
          alignItems: "center",
          gap: vertical ? 18 : 22,
          padding: vertical ? "16px 26px" : "18px 32px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: `1px solid ${COLORS.line}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.45)`,
        }}
      >
        <div
          style={{
            width: vertical ? 12 : 14,
            height: vertical ? 12 : 14,
            borderRadius: 999,
            background: COLORS.signal,
            boxShadow: `0 0 18px ${COLORS.signal}`,
            opacity: 0.6 + Math.sin(frame * 0.3) * 0.4,
          }}
        />
        <div
          style={{
            fontFamily: FONTS.mono,
            fontWeight: 500,
            fontSize: (vertical ? width * 0.03 : width * 0.017) * fontScale,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: COLORS.mist,
          }}
        >
          On-time pickups · 24/7
        </div>
      </div>
    </AbsoluteFill>
  );
}
