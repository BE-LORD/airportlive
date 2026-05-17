import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type AirportLiveIntroProps = {
  layout: "desktop" | "mobile";
};

const ink = "#020405";
const mist = "#eef7f6";
const signal = "#92f4f7";
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.7, 0, 0.84, 0);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const snap = Easing.bezier(0.2, 0.95, 0.15, 1);

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function phase(frame: number, from: number, to: number, easing = easeOut) {
  return interpolate(frame, [from, to], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function fadeOut(frame: number, from: number, to: number, easing = easeInOut) {
  return 1 - phase(frame, from, to, easing);
}

function PlaneClouds({ layout }: AirportLiveIntroProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mobile = layout === "mobile";
  const drift = interpolate(frame, [0, durationInFrames], [mobile ? -12 : -24, mobile ? 14 : 24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1.15], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: ink }}>
      <Video
        src={staticFile(
          mobile
            ? "media/video/airportlive-ready-takeoff-mobile.mp4"
            : "media/video/airportlive-ready-takeoff-desktop.mp4"
        )}
        muted
        loop
        objectFit="cover"
        trimBefore={mobile ? 30 : 36}
        playbackRate={0.72}
        style={{
          width: "100%",
          height: "100%",
          objectPosition: mobile ? "center center" : "center 48%",
          transform: `translate3d(${drift}px, 0, 0) scale(${scale})`,
          filter: "contrast(1.1) saturate(0.72) brightness(0.78)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2,4,5,0.88), rgba(2,4,5,0.18), rgba(2,4,5,0.9)), linear-gradient(180deg, rgba(2,4,5,0.82), rgba(2,4,5,0.12) 44%, rgba(2,4,5,0.9))",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.42) 1px, transparent 1px)",
          backgroundSize: mobile ? "72px 72px" : "92px 92px",
          transform: `translate3d(${(frame % 120) * -0.08}px, ${(frame % 120) * -0.05}px, 0)`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
}

function AirTypography({ layout }: AirportLiveIntroProps) {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const mobile = layout === "mobile";
  const enter = phase(frame, 0, 26, snap);
  const hold = fadeOut(frame, durationInFrames - 30, durationInFrames - 1, easeIn);
  const breathing = Math.sin(frame * 0.055) * 0.008;
  const scale = interpolate(enter, [0, 1], [0.84, 1]) + breathing * enter;
  const y = interpolate(enter, [0, 1], [mobile ? 42 : 34, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tracking = interpolate(enter, [0, 1], [mobile ? 20 : 30, mobile ? 1.5 : 2.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fillOpacity = interpolate(frame, [0, 26, 82, durationInFrames - 1], [0, 0.2, 0.12, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeOpacity = interpolate(frame, [0, 28, durationInFrames - 22, durationInFrames - 1], [0.18, 0.94, 0.86, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweep = interpolate(frame, [26, 88], [-width * 0.32, width * 1.16], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: hold }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="air-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={mobile ? 9 : 8} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.57 0 0 0 0 0.96 0 0 0 0 0.98 0 0 0 0.72 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="50%"
          y={mobile ? "50%" : "53%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={mist}
          fillOpacity={fillOpacity}
          stroke={mist}
          strokeOpacity={strokeOpacity}
          strokeWidth={mobile ? 3.4 : 3}
          paintOrder="stroke"
          fontFamily="Arial Black, Impact, Arial, sans-serif"
          fontSize={mobile ? height * 0.17 : height * 0.36}
          fontWeight={900}
          letterSpacing={tracking}
          filter="url(#air-soft-glow)"
          transform={`translate(${width / 2} ${height / 2}) translate(0 ${y}) scale(${scale}) translate(${-width / 2} ${-height / 2})`}
        >
          AIR
        </text>
        <text
          x="50%"
          y={mobile ? "50%" : "53%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="transparent"
          stroke={signal}
          strokeOpacity={strokeOpacity * 0.46}
          strokeWidth={mobile ? 1.2 : 1}
          fontFamily="Arial Black, Impact, Arial, sans-serif"
          fontSize={mobile ? height * 0.17 : height * 0.36}
          fontWeight={900}
          letterSpacing={tracking}
          transform={`translate(${width / 2} ${height / 2}) translate(0 ${y}) scale(${scale * 1.006}) translate(${-width / 2} ${-height / 2})`}
        >
          AIR
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          left: sweep,
          top: -height * 0.12,
          width: mobile ? width * 0.28 : width * 0.18,
          height: height * 1.24,
          opacity: phase(frame, 18, 36) * fadeOut(frame, 84, 98, easeIn),
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
}

function EdgeFade() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const close = phase(frame, durationInFrames - 18, durationInFrames - 1, easeIn);

  return (
    <AbsoluteFill style={{ background: ink, opacity: clamp01(close) }} />
  );
}

export function AirportLiveIntro({ layout }: AirportLiveIntroProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: ink, overflow: "hidden" }}>
      <PlaneClouds layout={layout} />
      <AirTypography layout={layout} />
      <EdgeFade />
    </AbsoluteFill>
  );
}
