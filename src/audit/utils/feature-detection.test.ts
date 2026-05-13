/**
 * Unit tests for feature detection utility
 */

import { describe, it, expect, vi } from "vitest";
import {
  detectWebGL,
  detectWebGL2,
  detectIntersectionObserver,
  detectResizeObserver,
  detectMutationObserver,
  detectPerformanceObserver,
  detectServiceWorker,
  detectWebWorker,
  detectLocalStorage,
  detectSessionStorage,
  detectIndexedDB,
  detectWebAssembly,
  detectCSSGrid,
  detectCSSCustomProperties,
  detectCSSBackdropFilter,
  detectCSSClipPath,
  detectFeatureSupport,
  isFeatureSupported,
} from "./feature-detection";

function withMissingGlobal<T extends keyof typeof globalThis>(
  key: T,
  callback: () => void
) {
  const original = globalThis[key];
  const originalWindow = window[key as keyof Window];
  Object.defineProperty(globalThis, key, {
    configurable: true,
    value: undefined,
  });
  Object.defineProperty(window, key, {
    configurable: true,
    value: undefined,
  });

  try {
    callback();
  } finally {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value: original,
    });
    Object.defineProperty(window, key, {
      configurable: true,
      value: originalWindow,
    });
  }
}

function setWindowGlobal<T extends keyof typeof globalThis>(
  key: T,
  value: (typeof globalThis)[T]
) {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    value,
  });
  Object.defineProperty(window, key, {
    configurable: true,
    value,
  });
}

describe("Feature Detection", () => {
  describe("detectWebGL", () => {
    it("should return false in non-browser environment", () => {
      expect(detectWebGL()).toBe(false);
    });
  });

  describe("detectWebGL2", () => {
    it("should return false in non-browser environment", () => {
      expect(detectWebGL2()).toBe(false);
    });
  });

  describe("detectIntersectionObserver", () => {
    it("should return false when IntersectionObserver is not available", () => {
      withMissingGlobal("IntersectionObserver", () => {
        expect(detectIntersectionObserver()).toBe(false);
      });
    });

    it("should return true when IntersectionObserver is available", () => {
      setWindowGlobal("IntersectionObserver", vi.fn() as any);
      expect(detectIntersectionObserver()).toBe(true);
    });
  });

  describe("detectResizeObserver", () => {
    it("should return false when ResizeObserver is not available", () => {
      withMissingGlobal("ResizeObserver", () => {
        expect(detectResizeObserver()).toBe(false);
      });
    });

    it("should return true when ResizeObserver is available", () => {
      setWindowGlobal("ResizeObserver", vi.fn() as any);
      expect(detectResizeObserver()).toBe(true);
    });
  });

  describe("detectMutationObserver", () => {
    it("should return false when MutationObserver is not available", () => {
      withMissingGlobal("MutationObserver", () => {
        expect(detectMutationObserver()).toBe(false);
      });
    });

    it("should return true when MutationObserver is available", () => {
      setWindowGlobal("MutationObserver", vi.fn() as any);
      expect(detectMutationObserver()).toBe(true);
    });
  });

  describe("detectPerformanceObserver", () => {
    it("should return false when PerformanceObserver is not available", () => {
      withMissingGlobal("PerformanceObserver", () => {
        expect(detectPerformanceObserver()).toBe(false);
      });
    });

    it("should return true when PerformanceObserver is available", () => {
      setWindowGlobal("PerformanceObserver", vi.fn() as any);
      expect(detectPerformanceObserver()).toBe(true);
    });
  });

  describe("detectServiceWorker", () => {
    it("should return false when serviceWorker is not available", () => {
      expect(detectServiceWorker()).toBe(false);
    });
  });

  describe("detectWebWorker", () => {
    it("should return false when Worker is not available", () => {
      expect(detectWebWorker()).toBe(false);
    });
  });

  describe("detectLocalStorage", () => {
    it("should return false in non-browser environment", () => {
      withMissingGlobal("localStorage", () => {
        expect(detectLocalStorage()).toBe(false);
      });
    });
  });

  describe("detectSessionStorage", () => {
    it("should return false in non-browser environment", () => {
      withMissingGlobal("sessionStorage", () => {
        expect(detectSessionStorage()).toBe(false);
      });
    });
  });

  describe("detectIndexedDB", () => {
    it("should return false when indexedDB is not available", () => {
      expect(detectIndexedDB()).toBe(false);
    });
  });

  describe("detectWebAssembly", () => {
    it("should return false when WebAssembly is not available", () => {
      withMissingGlobal("WebAssembly", () => {
        expect(detectWebAssembly()).toBe(false);
      });
    });
  });

  describe("detectCSSGrid", () => {
    it("should return false in non-browser environment", () => {
      expect(detectCSSGrid()).toBe(false);
    });
  });

  describe("detectCSSCustomProperties", () => {
    it("should return false in non-browser environment", () => {
      expect(detectCSSCustomProperties()).toBe(false);
    });
  });

  describe("detectCSSBackdropFilter", () => {
    it("should return false in non-browser environment", () => {
      expect(detectCSSBackdropFilter()).toBe(false);
    });
  });

  describe("detectCSSClipPath", () => {
    it("should return false in non-browser environment", () => {
      expect(detectCSSClipPath()).toBe(false);
    });
  });

  describe("detectFeatureSupport", () => {
    it("should return an object with all feature flags", () => {
      const support = detectFeatureSupport();
      expect(support).toHaveProperty("webgl");
      expect(support).toHaveProperty("webgl2");
      expect(support).toHaveProperty("intersectionObserver");
      expect(support).toHaveProperty("resizeObserver");
      expect(support).toHaveProperty("mutationObserver");
      expect(support).toHaveProperty("performanceObserver");
      expect(support).toHaveProperty("serviceWorker");
      expect(support).toHaveProperty("webWorker");
      expect(support).toHaveProperty("localStorage");
      expect(support).toHaveProperty("sessionStorage");
      expect(support).toHaveProperty("indexedDB");
      expect(support).toHaveProperty("webAssembly");
      expect(support).toHaveProperty("cssGrid");
      expect(support).toHaveProperty("cssCustomProperties");
      expect(support).toHaveProperty("cssBackdropFilter");
      expect(support).toHaveProperty("cssClipPath");
    });

    it("should return boolean values for all features", () => {
      const support = detectFeatureSupport();
      Object.values(support).forEach((value) => {
        expect(typeof value).toBe("boolean");
      });
    });
  });

  describe("isFeatureSupported", () => {
    it("should return boolean for specific feature", () => {
      const result = isFeatureSupported("webgl");
      expect(typeof result).toBe("boolean");
    });

    it("should work for all feature keys", () => {
      const features: Array<keyof ReturnType<typeof detectFeatureSupport>> = [
        "webgl",
        "webgl2",
        "intersectionObserver",
        "resizeObserver",
        "mutationObserver",
        "performanceObserver",
        "serviceWorker",
        "webWorker",
        "localStorage",
        "sessionStorage",
        "indexedDB",
        "webAssembly",
        "cssGrid",
        "cssCustomProperties",
        "cssBackdropFilter",
        "cssClipPath",
      ];

      features.forEach((feature) => {
        const result = isFeatureSupported(feature);
        expect(typeof result).toBe("boolean");
      });
    });
  });
});
