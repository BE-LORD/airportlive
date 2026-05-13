/**
 * Unit tests for performance monitor
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { PerformanceMonitor, getPerformanceMonitor } from "./performance-monitor";

describe("PerformanceMonitor", () => {
  describe("getInstance", () => {
    it("should return singleton instance", () => {
      const instance1 = PerformanceMonitor.getInstance();
      const instance2 = PerformanceMonitor.getInstance();
      expect(instance1).toBe(instance2);
    });

    it("should be same as getPerformanceMonitor", () => {
      const instance1 = PerformanceMonitor.getInstance();
      const instance2 = getPerformanceMonitor();
      expect(instance1).toBe(instance2);
    });
  });

  describe("getFPS", () => {
    it("should return default 60 FPS when no frames measured", () => {
      const monitor = PerformanceMonitor.getInstance();
      expect(monitor.getFPS()).toBe(60);
    });

    it("should return a number", () => {
      const monitor = PerformanceMonitor.getInstance();
      const fps = monitor.getFPS();
      expect(typeof fps).toBe("number");
      expect(fps).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getMemoryUsage", () => {
    it("should return null when memory API is not available", () => {
      const monitor = PerformanceMonitor.getInstance();
      const memory = monitor.getMemoryUsage();
      expect(memory).toBeNull();
    });

    it("should return memory in MB when available", () => {
      // Mock performance.memory
      Object.defineProperty(global.performance, "memory", {
        value: {
          usedJSHeapSize: 10485760, // 10 MB in bytes
          totalJSHeapSize: 20971520,
          jsHeapSizeLimit: 2147483648,
        },
        writable: true,
      });

      const monitor = PerformanceMonitor.getInstance();
      const memory = monitor.getMemoryUsage();
      expect(memory).toBe(10); // 10 MB
    });
  });

  describe("getDOMNodeCount", () => {
    it("should return the current document node count", () => {
      const monitor = PerformanceMonitor.getInstance();
      expect(monitor.getDOMNodeCount()).toBe(
        document.getElementsByTagName("*").length
      );
    });
  });

  describe("getCoreWebVitals", () => {
    it("should return Core Web Vitals object", () => {
      const monitor = PerformanceMonitor.getInstance();
      const vitals = monitor.getCoreWebVitals();

      expect(vitals).toHaveProperty("lcp");
      expect(vitals).toHaveProperty("fid");
      expect(vitals).toHaveProperty("cls");
      expect(vitals).toHaveProperty("fcp");
      expect(vitals).toHaveProperty("ttfb");
      expect(vitals).toHaveProperty("inp");
    });

    it("should return null values when metrics not yet collected", () => {
      const monitor = PerformanceMonitor.getInstance();
      const vitals = monitor.getCoreWebVitals();

      // In test environment, these should be null
      expect(vitals.lcp).toBeNull();
      expect(vitals.fid).toBeNull();
      expect(vitals.cls).toBeNull();
    });
  });

  describe("getMetrics", () => {
    it("should return complete performance metrics", () => {
      const monitor = PerformanceMonitor.getInstance();
      const metrics = monitor.getMetrics();

      expect(metrics).toHaveProperty("lcp");
      expect(metrics).toHaveProperty("fid");
      expect(metrics).toHaveProperty("cls");
      expect(metrics).toHaveProperty("fcp");
      expect(metrics).toHaveProperty("ttfb");
      expect(metrics).toHaveProperty("inp");
      expect(metrics).toHaveProperty("fps");
      expect(metrics).toHaveProperty("memoryUsage");
      expect(metrics).toHaveProperty("domNodes");
      expect(metrics).toHaveProperty("scriptDuration");
      expect(metrics).toHaveProperty("layoutDuration");
      expect(metrics).toHaveProperty("paintDuration");
      expect(metrics).toHaveProperty("timestamp");
    });

    it("should have valid timestamp", () => {
      const monitor = PerformanceMonitor.getInstance();
      const metrics = monitor.getMetrics();
      const now = Date.now();

      expect(metrics.timestamp).toBeGreaterThan(0);
      expect(metrics.timestamp).toBeLessThanOrEqual(now);
    });
  });

  describe("meetsThresholds", () => {
    it("should return threshold check results", () => {
      const monitor = PerformanceMonitor.getInstance();
      const thresholds = monitor.meetsThresholds();

      expect(thresholds).toHaveProperty("lcp");
      expect(thresholds).toHaveProperty("fid");
      expect(thresholds).toHaveProperty("cls");
      expect(thresholds).toHaveProperty("overall");

      expect(typeof thresholds.lcp).toBe("boolean");
      expect(typeof thresholds.fid).toBe("boolean");
      expect(typeof thresholds.cls).toBe("boolean");
      expect(typeof thresholds.overall).toBe("boolean");
    });

    it("should pass thresholds when metrics are null", () => {
      const monitor = PerformanceMonitor.getInstance();
      const thresholds = monitor.meetsThresholds();

      // Null metrics should pass (not yet measured)
      expect(thresholds.lcp).toBe(true);
      expect(thresholds.fid).toBe(true);
      expect(thresholds.cls).toBe(true);
      expect(thresholds.overall).toBe(true);
    });
  });

  describe("getPerformanceTiming", () => {
    it("should return timing metrics", () => {
      const monitor = PerformanceMonitor.getInstance();
      const timing = monitor.getPerformanceTiming();

      expect(timing).toHaveProperty("scriptDuration");
      expect(timing).toHaveProperty("layoutDuration");
      expect(timing).toHaveProperty("paintDuration");

      expect(typeof timing.scriptDuration).toBe("number");
      expect(typeof timing.layoutDuration).toBe("number");
      expect(typeof timing.paintDuration).toBe("number");
    });
  });

  describe("cleanup", () => {
    it("should cleanup observers without errors", () => {
      const monitor = PerformanceMonitor.getInstance();
      expect(() => monitor.cleanup()).not.toThrow();
    });
  });
});
