/**
 * Performance monitoring infrastructure
 * Monitors Core Web Vitals and other performance metrics
 */

import type { CoreWebVitals, PerformanceMetrics } from "../types";

/**
 * Performance Monitor singleton class
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private fpsFrames: number[] = [];
  private lastFrameTime: number = 0;

  private constructor() {
    if (typeof window !== "undefined") {
      this.initializeObservers();
      this.startFPSMonitoring();
    }
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance observers for Core Web Vitals
   */
  private initializeObservers(): void {
    if (!("PerformanceObserver" in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn("LCP observer not supported:", e);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
          };
          if (fidEntry.processingStart) {
            this.metrics.fid =
              fidEntry.processingStart - entry.startTime;
          }
        });
      });
      fidObserver.observe({ type: "first-input", buffered: true });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn("FID observer not supported:", e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
            this.metrics.cls = clsValue;
          }
        });
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn("CLS observer not supported:", e);
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            this.metrics.fcp = entry.startTime;
          }
        });
      });
      fcpObserver.observe({ type: "paint", buffered: true });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn("FCP observer not supported:", e);
    }

    // Navigation Timing (TTFB)
    if (performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        const navEntry = navEntries[0] as PerformanceNavigationTiming;
        this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      }
    }

    // Interaction to Next Paint (INP) - newer metric
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const inpEntry = entry as PerformanceEntry & {
            processingStart?: number;
            processingEnd?: number;
          };
          if (inpEntry.processingStart && inpEntry.processingEnd) {
            const duration =
              inpEntry.processingEnd - entry.startTime;
            if (!this.metrics.inp || duration > this.metrics.inp) {
              this.metrics.inp = duration;
            }
          }
        });
      });
      inpObserver.observe({ type: "event", buffered: true });
      this.observers.push(inpObserver);
    } catch (e) {
      // INP is a newer metric, may not be supported
    }
  }

  /**
   * Start FPS monitoring using requestAnimationFrame
   */
  private startFPSMonitoring(): void {
    const measureFPS = (timestamp: number) => {
      if (this.lastFrameTime) {
        const delta = timestamp - this.lastFrameTime;
        const fps = 1000 / delta;
        this.fpsFrames.push(fps);

        // Keep only last 60 frames (1 second at 60fps)
        if (this.fpsFrames.length > 60) {
          this.fpsFrames.shift();
        }
      }
      this.lastFrameTime = timestamp;
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  /**
   * Get current FPS (average of last 60 frames)
   */
  public getFPS(): number {
    if (this.fpsFrames.length === 0) return 60;
    const sum = this.fpsFrames.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsFrames.length);
  }

  /**
   * Get memory usage (if available)
   */
  public getMemoryUsage(): number | null {
    if (typeof window === "undefined") return null;

    const perf = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };

    if (perf.memory) {
      return perf.memory.usedJSHeapSize / 1048576; // Convert to MB
    }

    return null;
  }

  /**
   * Get DOM node count
   */
  public getDOMNodeCount(): number {
    if (typeof document === "undefined") return 0;
    return document.getElementsByTagName("*").length;
  }

  /**
   * Get performance timing metrics
   */
  public getPerformanceTiming(): {
    scriptDuration: number;
    layoutDuration: number;
    paintDuration: number;
  } {
    if (typeof performance === "undefined" || !performance.getEntriesByType) {
      return { scriptDuration: 0, layoutDuration: 0, paintDuration: 0 };
    }

    const measures = performance.getEntriesByType("measure");
    let scriptDuration = 0;
    let layoutDuration = 0;
    let paintDuration = 0;

    measures.forEach((measure) => {
      if (measure.name.includes("script")) {
        scriptDuration += measure.duration;
      } else if (measure.name.includes("layout")) {
        layoutDuration += measure.duration;
      } else if (measure.name.includes("paint")) {
        paintDuration += measure.duration;
      }
    });

    return { scriptDuration, layoutDuration, paintDuration };
  }

  /**
   * Get Core Web Vitals
   */
  public getCoreWebVitals(): CoreWebVitals {
    return {
      lcp: this.metrics.lcp || null,
      fid: this.metrics.fid || null,
      cls: this.metrics.cls || null,
      fcp: this.metrics.fcp || null,
      ttfb: this.metrics.ttfb || null,
      inp: this.metrics.inp || null,
    };
  }

  /**
   * Get all performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    const timing = this.getPerformanceTiming();

    return {
      ...this.getCoreWebVitals(),
      fps: this.getFPS(),
      memoryUsage: this.getMemoryUsage(),
      domNodes: this.getDOMNodeCount(),
      scriptDuration: timing.scriptDuration,
      layoutDuration: timing.layoutDuration,
      paintDuration: timing.paintDuration,
      timestamp: Date.now(),
    };
  }

  /**
   * Check if Core Web Vitals meet thresholds
   */
  public meetsThresholds(): {
    lcp: boolean;
    fid: boolean;
    cls: boolean;
    overall: boolean;
  } {
    const vitals = this.getCoreWebVitals();

    const lcpPass = vitals.lcp === null || vitals.lcp <= 2500; // 2.5s
    const fidPass = vitals.fid === null || vitals.fid <= 100; // 100ms
    const clsPass = vitals.cls === null || vitals.cls <= 0.1; // 0.1

    return {
      lcp: lcpPass,
      fid: fidPass,
      cls: clsPass,
      overall: lcpPass && fidPass && clsPass,
    };
  }

  /**
   * Cleanup observers
   */
  public cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.fpsFrames = [];
  }
}

/**
 * Get singleton instance
 */
export function getPerformanceMonitor(): PerformanceMonitor {
  return PerformanceMonitor.getInstance();
}
