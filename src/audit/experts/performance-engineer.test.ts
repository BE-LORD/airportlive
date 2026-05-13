/**
 * Performance Engineer Expert Module Tests
 * 
 * **Validates: Requirements 1.3, 5.1-5.15**
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { PerformanceEngineerExpert } from "./performance-engineer";
import type { AuditContext } from "./base-expert";

describe("PerformanceEngineerExpert", () => {
  let expert: PerformanceEngineerExpert;
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "desktop",
      url: "https://example.com",
      timestamp: Date.now(),
    };
    expert = new PerformanceEngineerExpert(context);
  });

  describe("Core Web Vitals Auditing", () => {
    it("should detect LCP exceeding 2.5s threshold", async () => {
      // Mock PerformanceMonitor to return poor LCP
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 3000, // 3s - exceeds 2.5s threshold
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 400,
        inp: 150,
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: false,
        fid: true,
        cls: true,
        overall: false,
      }));

      // @ts-ignore - accessing private property for testing
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const lcpIssue = findings.find((f) => f.title.includes("LCP"));
      expect(lcpIssue).toBeDefined();
      expect(lcpIssue?.severity).toBe("major");
      expect(lcpIssue?.description).toContain("3.00s");
    });

    it("should detect critical LCP exceeding 4s", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 4500, // 4.5s - critical
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 400,
        inp: 150,
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: false,
        fid: true,
        cls: true,
        overall: false,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const lcpIssue = findings.find((f) => f.title.includes("LCP is poor"));
      expect(lcpIssue).toBeDefined();
      expect(lcpIssue?.severity).toBe("critical");
    });

    it("should detect CLS exceeding 0.1 threshold", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 2000,
        fid: 50,
        cls: 0.15, // Exceeds 0.1 threshold
        fcp: 1500,
        ttfb: 400,
        inp: 150,
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: true,
        fid: true,
        cls: false,
        overall: false,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const clsIssue = findings.find((f) => f.title.includes("CLS"));
      expect(clsIssue).toBeDefined();
      expect(clsIssue?.severity).toBe("major");
      expect(clsIssue?.description).toContain("0.150");
    });

    it("should detect FID exceeding 100ms threshold", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 2000,
        fid: 150, // Exceeds 100ms
        cls: 0.05,
        fcp: 1500,
        ttfb: 400,
        inp: 150,
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: true,
        fid: false,
        cls: true,
        overall: false,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const fidIssue = findings.find((f) => f.title.includes("FID"));
      expect(fidIssue).toBeDefined();
      expect(fidIssue?.severity).toBe("major");
    });

    it("should detect INP exceeding 200ms threshold", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 400,
        inp: 250, // Exceeds 200ms
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: true,
        fid: true,
        cls: true,
        overall: true,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const inpIssue = findings.find((f) => f.title.includes("INP"));
      expect(inpIssue).toBeDefined();
      expect(inpIssue?.severity).toBe("major");
    });

    it("should not report issues when Core Web Vitals are good", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 2000, // Good
        fid: 50, // Good
        cls: 0.05, // Good
        fcp: 1500, // Good
        ttfb: 400, // Good
        inp: 150, // Good
      }));

      const mockMeetsThresholds = vi.fn(() => ({
        lcp: true,
        fid: true,
        cls: true,
        overall: true,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: mockMeetsThresholds,
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const coreWebVitalsIssues = findings.filter(
        (f) =>
          f.title.includes("LCP") ||
          f.title.includes("CLS") ||
          f.title.includes("FID") ||
          f.title.includes("INP")
      );
      expect(coreWebVitalsIssues.length).toBe(0);
    });
  });

  describe("Animation Performance Auditing", () => {
    it("should detect critically low FPS (<30)", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 2000,
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: () => 25, // Critical
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const fpsIssue = findings.find((f) => f.title.includes("FPS critically low"));
      expect(fpsIssue).toBeDefined();
      expect(fpsIssue?.severity).toBe("critical");
    });

    it("should detect low FPS (<50)", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 2000,
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: () => 45, // Below target
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const fpsIssue = findings.find((f) => f.title.includes("FPS below target"));
      expect(fpsIssue).toBeDefined();
      expect(fpsIssue?.severity).toBe("major");
    });

    it("should detect high memory usage", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 2000,
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: () => 60,
        getMemoryUsage: () => 150, // High memory
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const findings = expert.getFindings();

      const memoryIssue = findings.find((f) => f.title.includes("High memory usage"));
      expect(memoryIssue).toBeDefined();
      expect(memoryIssue?.severity).toBe("major");
    });

    it("should detect high DOM node count", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 2000,
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 2000, // High DOM count
      };

      await expert.audit();
      const findings = expert.getFindings();

      const domIssue = findings.find((f) => f.title.includes("High DOM node count"));
      expect(domIssue).toBeDefined();
      expect(domIssue?.severity).toBe("minor");
    });
  });

  describe("Report Generation", () => {
    it("should generate summary with issue counts", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 3000, // Issue
          fid: 50,
          cls: 0.15, // Issue
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: false, fid: true, cls: false, overall: false }),
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const report = expert.generateReport();

      expect(report.expertRole).toBe("performance_engineer");
      expect(report.issuesFound).toBeGreaterThan(0);
      expect(report.summary).toContain("Performance Engineer audit");
      expect(report.recommendations.length).toBeGreaterThan(0);
    });

    it("should include specific recommendations based on findings", async () => {
      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 3000, // LCP issue
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: false, fid: true, cls: true, overall: false }),
        getFPS: () => 45, // FPS issue
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();
      const report = expert.generateReport();

      const recommendations = report.recommendations.join(" ");
      expect(recommendations).toContain("LCP");
      expect(recommendations).toContain("animation performance");
    });
  });

  describe("Integration with PerformanceMonitor", () => {
    it("should use PerformanceMonitor for Core Web Vitals", async () => {
      const mockGetCoreWebVitals = vi.fn(() => ({
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 1500,
        ttfb: 400,
        inp: 150,
      }));

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: mockGetCoreWebVitals,
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: () => 60,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();

      expect(mockGetCoreWebVitals).toHaveBeenCalled();
    });

    it("should use PerformanceMonitor for FPS tracking", async () => {
      const mockGetFPS = vi.fn(() => 60);

      // @ts-ignore
      expert.performanceMonitor = {
        getCoreWebVitals: () => ({
          lcp: 2000,
          fid: 50,
          cls: 0.05,
          fcp: 1500,
          ttfb: 400,
          inp: 150,
        }),
        meetsThresholds: () => ({ lcp: true, fid: true, cls: true, overall: true }),
        getFPS: mockGetFPS,
        getMemoryUsage: () => 50,
        getDOMNodeCount: () => 500,
      };

      await expert.audit();

      expect(mockGetFPS).toHaveBeenCalled();
    });
  });
});
