/**
 * Feature detection utility
 * Detects browser capabilities for WebGL, IntersectionObserver, and other features
 */

import type { FeatureSupport } from "../types";

/**
 * Detect WebGL support
 */
export function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Detect WebGL 2 support
 */
export function detectWebGL2(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch (e) {
    return false;
  }
}

/**
 * Detect IntersectionObserver support
 */
export function detectIntersectionObserver(): boolean {
  return typeof window !== "undefined" && "IntersectionObserver" in window;
}

/**
 * Detect ResizeObserver support
 */
export function detectResizeObserver(): boolean {
  return typeof window !== "undefined" && "ResizeObserver" in window;
}

/**
 * Detect MutationObserver support
 */
export function detectMutationObserver(): boolean {
  return typeof window !== "undefined" && "MutationObserver" in window;
}

/**
 * Detect PerformanceObserver support
 */
export function detectPerformanceObserver(): boolean {
  return typeof window !== "undefined" && "PerformanceObserver" in window;
}

/**
 * Detect Service Worker support
 */
export function detectServiceWorker(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
}

/**
 * Detect Web Worker support
 */
export function detectWebWorker(): boolean {
  return typeof window !== "undefined" && typeof Worker !== "undefined";
}

/**
 * Detect localStorage support
 */
export function detectLocalStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Detect sessionStorage support
 */
export function detectSessionStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const test = "__sessionStorage_test__";
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Detect IndexedDB support
 */
export function detectIndexedDB(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window;
}

/**
 * Detect WebAssembly support
 */
export function detectWebAssembly(): boolean {
  return typeof window !== "undefined" && typeof WebAssembly !== "undefined";
}

/**
 * Detect CSS Grid support
 */
export function detectCSSGrid(): boolean {
  if (typeof window === "undefined") return false;

  return CSS.supports("display", "grid");
}

/**
 * Detect CSS Custom Properties support
 */
export function detectCSSCustomProperties(): boolean {
  if (typeof window === "undefined") return false;

  return CSS.supports("--test", "0");
}

/**
 * Detect CSS backdrop-filter support
 */
export function detectCSSBackdropFilter(): boolean {
  if (typeof window === "undefined") return false;

  return (
    CSS.supports("backdrop-filter", "blur(10px)") ||
    CSS.supports("-webkit-backdrop-filter", "blur(10px)")
  );
}

/**
 * Detect CSS clip-path support
 */
export function detectCSSClipPath(): boolean {
  if (typeof window === "undefined") return false;

  return CSS.supports("clip-path", "circle(50%)");
}

/**
 * Detect all browser features
 */
export function detectFeatureSupport(): FeatureSupport {
  return {
    webgl: detectWebGL(),
    webgl2: detectWebGL2(),
    intersectionObserver: detectIntersectionObserver(),
    resizeObserver: detectResizeObserver(),
    mutationObserver: detectMutationObserver(),
    performanceObserver: detectPerformanceObserver(),
    serviceWorker: detectServiceWorker(),
    webWorker: detectWebWorker(),
    localStorage: detectLocalStorage(),
    sessionStorage: detectSessionStorage(),
    indexedDB: detectIndexedDB(),
    webAssembly: detectWebAssembly(),
    cssGrid: detectCSSGrid(),
    cssCustomProperties: detectCSSCustomProperties(),
    cssBackdropFilter: detectCSSBackdropFilter(),
    cssClipPath: detectCSSClipPath(),
  };
}

/**
 * Check if a specific feature is supported
 */
export function isFeatureSupported(feature: keyof FeatureSupport): boolean {
  const support = detectFeatureSupport();
  return support[feature];
}
