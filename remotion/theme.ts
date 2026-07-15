// AIRPORTLIVE — shared design system for the cinematic ad.
// Palette is derived from the live site tokens (tailwind.config.ts) plus a
// cinematic "signal" accent used across the intro compositions.

import { Easing, interpolate } from "remotion";

export const COLORS = {
  ink: "#050607", // near-black cinematic base
  inkSoft: "#0b0f12",
  charcoal: "#141414",
  mist: "#f6f8f7",
  cream: "#F8F7F3",
  muted: "#8a938f",
  line: "rgba(246,248,247,0.14)",
  gold: "#C79A4B", // premium accent from brand
  goldSoft: "#e7c98a",
  signal: "#7ef0f4", // cyan runway signal
  signalDeep: "#1d8f97",
  navy: "#0e1c33",
} as const;

// Easing curves — a small, consistent set used everywhere.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const snap = Easing.bezier(0.2, 0.95, 0.15, 1);

export const FONTS = {
  serif: "Cormorant, 'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', 'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
} as const;

export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** Eased 0→1 ramp between two frames, clamped on both ends. */
export function phase(
  frame: number,
  from: number,
  to: number,
  easing = easeOut
) {
  return interpolate(frame, [from, to], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Eased 1→0 ramp — the inverse of phase(). */
export function fadeOut(
  frame: number,
  from: number,
  to: number,
  easing = easeInOut
) {
  return 1 - phase(frame, from, to, easing);
}

/** Symmetric in/out envelope for a segment that lives on screen for a while. */
export function inOut(
  frame: number,
  inFrom: number,
  inTo: number,
  outFrom: number,
  outTo: number
) {
  return Math.min(phase(frame, inFrom, inTo), fadeOut(frame, outFrom, outTo));
}
