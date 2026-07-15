// Shared cinematic backdrop: deep ink base, slow-drifting runway grid,
// atmospheric glow, and a fine vignette. Rendered behind every scene so the
// whole ad feels like one continuous environment.

import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import type { LayoutInfo } from "../layout";

export function Backdrop({
  layout,
  tint = COLORS.signal,
  intensity = 1,
}: {
  layout: LayoutInfo;
  tint?: string;
  intensity?: number;
}) {
  const frame = useCurrentFrame();
  const cell = layout.vertical ? 64 : 96;
  // Perspective floor grid drift — slow, hypnotic, never loops harshly.
  const gridShift = (frame * 0.35) % cell;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {/* radial atmosphere */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% ${
            layout.vertical ? "38%" : "34%"
          }, ${hexA(tint, 0.14 * intensity)} 0%, transparent 55%), radial-gradient(90% 70% at 50% 120%, ${hexA(
            COLORS.navy,
            0.55 * intensity
          )} 0%, transparent 60%)`,
        }}
      />
      {/* runway grid, perspective-faded from bottom */}
      <AbsoluteFill
        style={{
          opacity: 0.5,
          backgroundImage: `linear-gradient(0deg, ${hexA(
            COLORS.mist,
            0.06
          )} 1px, transparent 1px), linear-gradient(90deg, ${hexA(
            COLORS.mist,
            0.06
          )} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `${gridShift}px ${gridShift}px`,
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 45%, #000 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 45%, #000 100%)",
        }}
      />
      {/* top light bloom */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${hexA(
            COLORS.ink,
            0.85
          )} 0%, transparent 30%, transparent 70%, ${hexA(COLORS.ink, 0.92)} 100%)`,
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${layout.vertical ? 220 : 320}px ${hexA(
            COLORS.ink,
            0.9
          )}`,
        }}
      />
    </AbsoluteFill>
  );
}

/** Apply an alpha to a #rrggbb hex color, returning an rgba() string. */
export function hexA(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
