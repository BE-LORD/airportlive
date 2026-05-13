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
    it("should return default capabilities in non-browser environment", () => {
      const capabilities = detectDeviceCapabilities();
      expect(capabilities).toMatchObject({
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
      });
    });
  });

  describe("getDeviceTier", () => {
    it("should return a valid device tier", () => {
      const tier = getDeviceTier();
      expect(["low", "mid", "high"]).toContain(tier);
    });
  });
});
