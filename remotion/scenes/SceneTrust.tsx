// Scene 5 — trust wall. Four proof points that count up / stagger in.
// Facts sourced from src/lib/constants.ts (BUSINESS): 20+ yrs, 100+ fleet,
// 24/7 dispatch, fixed fares.

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, easeOut, phase, snap } from "../theme";
import type { LayoutInfo } from "../layout";

type Stat = {
  value: string;
  label: string;
  /** numeric target for count-up; undefined = no count-up (static string) */
  countTo?: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { value: "20+", label: "Years on the Road", countTo: 20, suffix: "+" },
  { value: "100+", label: "Vehicle Fleet", countTo: 100, suffix: "+" },
  { value: "24/7", label: "WhatsApp Dispatch" },
  { value: "Fixed", label: "Fares · No Surge" },
];

function StatCell({
  stat,
  index,
  layout,
}: {
  stat: Stat;
  index: number;
  layout: LayoutInfo;
}) {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const delay = 8 + index * 8;
  const enter = phase(frame, delay, delay + 22, snap);
  const ty = interpolate(enter, [0, 1], [46, 0]);

  let display = stat.value;
  if (stat.countTo !== undefined) {
    const n = Math.round(
      interpolate(frame, [delay, delay + 30], [0, stat.countTo], {
        easing: easeOut,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
    display = `${n}${stat.suffix ?? ""}`;
  }

  const valueSize = width * (layout.vertical ? 0.11 : 0.072) * layout.fontScale;
  const labelSize = width * (layout.vertical ? 0.02 : 0.014) * layout.fontScale;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: enter,
        translate: `0px ${ty}px`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: valueSize,
          fontWeight: 600,
          lineHeight: 0.9,
          color: COLORS.mist,
          background: `linear-gradient(180deg, ${COLORS.mist}, ${COLORS.goldSoft})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: labelSize,
          letterSpacing: labelSize * 0.22,
          textTransform: "uppercase",
          color: COLORS.muted,
          textAlign: "center",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export function SceneTrust({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const headIn = phase(frame, 0, 18, easeOut);
  const headSize = width * (layout.vertical ? 0.052 : 0.03) * layout.fontScale;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: layout.vertical ? 80 : 90,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: headSize,
          color: COLORS.mist,
          opacity: headIn,
          translate: `0px ${interpolate(headIn, [0, 1], [24, 0])}px`,
          textAlign: "center",
          maxWidth: layout.vertical ? "80%" : "70%",
          lineHeight: 1.1,
        }}
      >
        Trusted by Punjab for{" "}
        <span style={{ fontStyle: "italic", color: COLORS.goldSoft }}>
          two decades
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: layout.vertical ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: layout.vertical ? "70px 40px" : 72,
          alignItems: "start",
          justifyItems: "center",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} layout={layout} />
        ))}
      </div>
    </AbsoluteFill>
  );
}
