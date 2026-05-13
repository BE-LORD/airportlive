/**
 * Enhanced device tier detection utility
 * Detects device capabilities including GPU, CPU, memory, and connection
 */

import type { DeviceTier, DeviceCapabilities } from "../types";

/**
 * Detect GPU capabilities using WebGL
 */
export function detectGPU(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return null;

    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_debug_renderer_info"
    );
    if (!debugInfo) return null;

    return (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );
  } catch (e) {
    return null;
  }
}

/**
 * Detect network connection type and speed
 */
export function detectConnection(): string | null {
  if (typeof window === "undefined") return null;

  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };
  };

  if (!nav.connection) return null;

  return nav.connection.effectiveType || null;
}

/**
 * Calculate device tier based on multiple factors
 */
export function calculateDeviceTier(
  cores: number,
  memory: number | null,
  gpu: string | null,
  connection: string | null
): DeviceTier {
  let score = 0;

  // CPU cores scoring (0-3 points)
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else if (cores >= 2) score += 1;

  // Memory scoring (0-3 points)
  if (memory !== null) {
    if (memory >= 16) score += 3;
    else if (memory >= 8) score += 2;
    else if (memory >= 4) score += 1;
  }

  // GPU scoring (0-2 points)
  if (gpu) {
    const gpuLower = gpu.toLowerCase();
    if (
      gpuLower.includes("nvidia") ||
      gpuLower.includes("amd") ||
      gpuLower.includes("radeon") ||
      gpuLower.includes("geforce")
    ) {
      score += 2;
    } else if (
      gpuLower.includes("intel") ||
      gpuLower.includes("apple") ||
      gpuLower.includes("mali")
    ) {
      score += 1;
    }
  }

  // Connection scoring (0-1 points)
  if (connection) {
    if (connection === "4g" || connection === "5g") score += 1;
  }

  // Tier classification based on total score (0-10)
  if (score >= 7) return "high";
  if (score >= 4) return "mid";
  return "low";
}

/**
 * Detect comprehensive device capabilities
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      cores: 4,
      memory: null,
      gpu: null,
      connection: null,
      supportsWebGL: false,
      supportsIntersectionObserver: false,
      supportsResizeObserver: false,
      isTouchDevice: false,
      screenWidth: 1920,
      screenHeight: 1080,
      devicePixelRatio: 1,
    };
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (
    navigator as Navigator & { deviceMemory?: number }
  ).deviceMemory;
  const gpu = detectGPU();
  const connection = detectConnection();

  const supportsWebGL = (() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  })();

  const supportsIntersectionObserver = "IntersectionObserver" in window;
  const supportsResizeObserver = "ResizeObserver" in window;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const tier = calculateDeviceTier(cores, memory || null, gpu, connection);

  return {
    tier,
    cores,
    memory: memory || null,
    gpu,
    connection,
    supportsWebGL,
    supportsIntersectionObserver,
    supportsResizeObserver,
    isTouchDevice,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
}

/**
 * Get device tier (simplified version for quick checks)
 */
export function getDeviceTier(): DeviceTier {
  return detectDeviceCapabilities().tier;
}
