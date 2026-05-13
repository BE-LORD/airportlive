/**
 * Unit tests for device detection utility
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  detectGPU,
  detectConnection,
  calculateDeviceTier,
  detectDeviceCapabilities,
  getDeviceTier,
} from "./device-detection";

describe("Device Detection", () => {
  const originalDocument = global.document;

  beforeEach(() => {
    vi.restoreAllMocks();
    global.document = originalDocument;
    Object.defineProperty(global.navigator, "connection", {
      configurable: true,
      value: undefined,
    });
  });

  describe("detectGPU", () => {
    it("should return null in non-browser environment", () => {
      const result = detectGPU();
      expect(result).toBeNull();
    });

    it("should detect GPU when WebGL is available", () => {
      // Mock WebGL context
      const mockCanvas = {
        getContext: vi.fn().mockReturnValue({
          getExtension: vi.fn().mockReturnValue({
            UNMASKED_RENDERER_WEBGL: 37446,
          }),
          getParameter: vi.fn().mockReturnValue("NVIDIA GeForce GTX 1080"),
        }),
      };

      global.document = {
        createElement: vi.fn().mockReturnValue(mockCanvas),
      } as any;

      const result = detectGPU();
      expect(result).toBe("NVIDIA GeForce GTX 1080");
    });
  });

  describe("detectConnection", () => {
    it("should return null when connection API is not available", () => {
      const result = detectConnection();
      expect(result).toBeNull();
    });

    it("should detect connection type when available", () => {
      // Mock navigator.connection
      Object.defineProperty(global.navigator, "connection", {
        value: { effectiveType: "4g" },
        writable: true,
      });

      const result = detectConnection();
      expect(result).toBe("4g");
    });
  });

  describe("calculateDeviceTier", () => {
    it("should return 'high' for high-end devices", () => {
      const tier = calculateDeviceTier(8, 16, "NVIDIA GeForce RTX 3080", "4g");
      expect(tier).toBe("high");
    });

    it("should return 'mid' for mid-range devices", () => {
      const tier = calculateDeviceTier(4, 8, "Intel HD Graphics", "4g");
      expect(tier).toBe("mid");
    });

    it("should return 'low' for low-end devices", () => {
      const tier = calculateDeviceTier(2, 2, null, "3g");
      expect(tier).toBe("low");
    });

    it("should handle null memory gracefully", () => {
      const tier = calculateDeviceTier(8, null, "NVIDIA GeForce GTX 1080", "4g");
      expect(tier).toBe("mid"); // Should still work without memory info
    });

    it("should handle null GPU gracefully", () => {
      const tier = calculateDeviceTier(8, 16, null, "4g");
      expect(tier).toBe("high"); // Should still classify as high
    });

    it("should handle null connection gracefully", () => {
      const tier = calculateDeviceTier(8, 16, "NVIDIA GeForce RTX 3080", null);
      expect(tier).toBe("high"); // Should still classify as high
    });
  });

  describe("detectDeviceCapabilities", () => {
    it("should return detected capabilities in the jsdom test environment", () => {
      const capabilities = detectDeviceCapabilities();

      expect(["low", "mid", "high"]).toContain(capabilities.tier);
      expect(typeof capabilities.cores).toBe("number");
      expect(capabilities.memory === null || typeof capabilities.memory === "number").toBe(true);
      expect(capabilities.gpu === null || typeof capabilities.gpu === "string").toBe(true);
      expect(capabilities.connection === null || typeof capabilities.connection === "string").toBe(true);
      expect(typeof capabilities.supportsWebGL).toBe("boolean");
      expect(typeof capabilities.supportsIntersectionObserver).toBe("boolean");
      expect(typeof capabilities.supportsResizeObserver).toBe("boolean");
      expect(typeof capabilities.isTouchDevice).toBe("boolean");
      expect(capabilities.screenWidth).toBe(window.innerWidth);
      expect(capabilities.screenHeight).toBe(window.innerHeight);
      expect(capabilities.devicePixelRatio).toBe(window.devicePixelRatio || 1);
    });
  });

  describe("getDeviceTier", () => {
    it("should return a valid device tier", () => {
      const tier = getDeviceTier();
      expect(["low", "mid", "high"]).toContain(tier);
    });
  });
});
