"use client";

export type DeviceTier = "low" | "mid" | "high";

export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "high";

  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (
    memory !== undefined &&
    memory <= 4 &&
    cores !== undefined &&
    cores <= 4
  ) {
    return "low";
  }

  if (
    memory !== undefined &&
    memory >= 8 &&
    cores !== undefined &&
    cores >= 8
  ) {
    return "high";
  }

  return "mid";
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
