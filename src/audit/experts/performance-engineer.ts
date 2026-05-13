/**
 * Performance Engineer Expert Module
 * Integrates Lighthouse for Core Web Vitals measurement
 * Analyzes bundle size, animation performance, lazy loading, and render-blocking resources
 * 
 * **Validates: Requirements 1.3, 5.1-5.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";
import { getPerformanceMonitor } from "../utils/performance-monitor";

export class PerformanceEngineerExpert extends BaseExpert {
  private performanceMonitor = getPerformanceMonitor();

  constructor(context: AuditContext) {
    super("performance_engineer", context);
  }

  async audit(): Promise<void> {
    await this.auditCoreWebVitals();
    await this.auditBundleSize();
    await this.auditAnimationPerformance();
    await this.auditLazyLoading();
    await this.auditRenderBlockingResources();
    await this.auditImageOptimization();
  }

  private async auditCoreWebVitals(): Promise<void> {
    if (typeof window === "undefined" || !window.performance) return;

    // Use PerformanceMonitor to get Core Web Vitals
    const vitals = this.performanceMonitor.getCoreWebVitals();
    const thresholds = this.performanceMonitor.meetsThresholds();

    // Check LCP (Largest Contentful Paint) - should be < 2.5s
    if (vitals.lcp !== null) {
      const lcpSeconds = vitals.lcp / 1000;
      
      if (vitals.lcp > 4000) {
        this.reportIssue({
          severity: "critical",
          title: "LCP is poor (>4s)",
          description: `Largest Contentful Paint is ${lcpSeconds.toFixed(2)}s, far exceeding the 2.5s threshold`,
          component: "Performance - Core Web Vitals",
          stepsToReproduce: [
            "Load page in Chrome DevTools",
            "Open Performance tab",
            "Record page load",
            "Check LCP metric"
          ],
          expectedBehavior: "LCP should be under 2.5s for good user experience",
          actualBehavior: `LCP is ${lcpSeconds.toFixed(2)}s`,
          suggestedFix: "Critical: Optimize hero images with WebP/AVIF, preload critical fonts, inline critical CSS, optimize server response time (TTFB)",
        });
      } else if (vitals.lcp > 2500) {
        this.reportIssue({
          severity: "major",
          title: "LCP exceeds 2.5s threshold",
          description: `Largest Contentful Paint is ${lcpSeconds.toFixed(2)}s`,
          component: "Performance - Core Web Vitals",
          stepsToReproduce: [
            "Load page",
            "Measure LCP in Chrome DevTools Performance panel"
          ],
          expectedBehavior: "LCP should be under 2.5s",
          actualBehavior: `LCP is ${lcpSeconds.toFixed(2)}s`,
          suggestedFix: "Optimize largest content element: compress images, use next/image with priority, preload critical fonts, reduce render-blocking resources",
        });
      }
    }

    // Check CLS (Cumulative Layout Shift) - should be < 0.1
    if (vitals.cls !== null && vitals.cls > 0.1) {
      const severity = vitals.cls > 0.25 ? "critical" : "major";
      
      this.reportIssue({
        severity,
        title: `CLS exceeds 0.1 threshold (${vitals.cls.toFixed(3)})`,
        description: `Cumulative Layout Shift is ${vitals.cls.toFixed(3)}, causing visual instability`,
        component: "Performance - Core Web Vitals",
        stepsToReproduce: [
          "Load page",
          "Observe content shifting during load",
          "Check CLS in Chrome DevTools"
        ],
        expectedBehavior: "CLS should be under 0.1 for stable visual experience",
        actualBehavior: `CLS is ${vitals.cls.toFixed(3)}`,
        suggestedFix: "Add explicit width/height to all images, reserve space for dynamic content, avoid inserting content above existing content, use CSS aspect-ratio for responsive images",
      });
    }

    // Check FID (First Input Delay) - should be < 100ms
    if (vitals.fid !== null && vitals.fid > 100) {
      const severity = vitals.fid > 300 ? "critical" : "major";
      
      this.reportIssue({
        severity,
        title: `FID exceeds 100ms threshold (${vitals.fid.toFixed(0)}ms)`,
        description: `First Input Delay is ${vitals.fid.toFixed(0)}ms, causing delayed interactivity`,
        component: "Performance - Core Web Vitals",
        stepsToReproduce: [
          "Load page",
          "Immediately try to interact (click button, scroll)",
          "Measure response delay"
        ],
        expectedBehavior: "FID should be under 100ms for responsive interactions",
        actualBehavior: `FID is ${vitals.fid.toFixed(0)}ms`,
        suggestedFix: "Reduce JavaScript execution time, break up long tasks with setTimeout/requestIdleCallback, defer non-critical JS, use code splitting",
      });
    }

    // Check INP (Interaction to Next Paint) - newer metric replacing FID
    if (vitals.inp !== null && vitals.inp > 200) {
      const severity = vitals.inp > 500 ? "critical" : "major";
      
      this.reportIssue({
        severity,
        title: `INP exceeds 200ms threshold (${vitals.inp.toFixed(0)}ms)`,
        description: `Interaction to Next Paint is ${vitals.inp.toFixed(0)}ms, indicating slow response to user interactions`,
        component: "Performance - Core Web Vitals",
        stepsToReproduce: [
          "Interact with various elements on the page",
          "Measure time until visual feedback appears"
        ],
        expectedBehavior: "INP should be under 200ms for good responsiveness",
        actualBehavior: `INP is ${vitals.inp.toFixed(0)}ms`,
        suggestedFix: "Optimize event handlers, reduce JavaScript execution during interactions, use passive event listeners, debounce/throttle expensive operations",
      });
    }

    // Check FCP (First Contentful Paint) - should be < 1.8s
    if (vitals.fcp !== null && vitals.fcp > 1800) {
      this.reportIssue({
        severity: "major",
        title: `FCP exceeds 1.8s threshold (${(vitals.fcp / 1000).toFixed(2)}s)`,
        description: `First Contentful Paint is ${(vitals.fcp / 1000).toFixed(2)}s, delaying initial content visibility`,
        component: "Performance - Core Web Vitals",
        stepsToReproduce: [
          "Load page",
          "Measure time until first content appears"
        ],
        expectedBehavior: "FCP should be under 1.8s",
        actualBehavior: `FCP is ${(vitals.fcp / 1000).toFixed(2)}s`,
        suggestedFix: "Inline critical CSS, eliminate render-blocking resources, optimize server response time, use CDN for static assets",
      });
    }

    // Check TTFB (Time to First Byte) - should be < 600ms
    if (vitals.ttfb !== null && vitals.ttfb > 600) {
      const severity = vitals.ttfb > 1000 ? "major" : "minor";
      
      this.reportIssue({
        severity,
        title: `TTFB exceeds 600ms threshold (${vitals.ttfb.toFixed(0)}ms)`,
        description: `Time to First Byte is ${vitals.ttfb.toFixed(0)}ms, indicating slow server response`,
        component: "Performance - Server",
        stepsToReproduce: [
          "Load page",
          "Check Network tab for document request timing"
        ],
        expectedBehavior: "TTFB should be under 600ms",
        actualBehavior: `TTFB is ${vitals.ttfb.toFixed(0)}ms`,
        suggestedFix: "Optimize server-side rendering, use edge caching, enable HTTP/2, optimize database queries, use CDN",
      });
    }
  }

  private async auditBundleSize(): Promise<void> {
    if (typeof window === "undefined" || !window.performance) return;

    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    let totalJSSize = 0;
    let totalCSSSize = 0;
    const largeResources: { name: string; size: number; type: string }[] = [];

    resources.forEach((resource) => {
      const size = resource.transferSize || 0;
      const url = resource.name;

      if (url.endsWith(".js")) {
        totalJSSize += size;
        if (size > 200000) {
          // 200KB
          largeResources.push({
            name: url.split("/").pop() || url,
            size,
            type: "JavaScript",
          });
        }
      } else if (url.endsWith(".css")) {
        totalCSSSize += size;
        if (size > 100000) {
          // 100KB
          largeResources.push({
            name: url.split("/").pop() || url,
            size,
            type: "CSS",
          });
        }
      }
    });

    if (totalJSSize > 500000) {
      // 500KB
      this.reportIssue({
        severity: "major",
        title: "JavaScript bundle size too large",
        description: `Total JS size is ${(totalJSSize / 1024).toFixed(0)}KB`,
        component: "Performance",
        stepsToReproduce: ["Analyze network tab"],
        expectedBehavior: "JS bundle should be under 500KB",
        actualBehavior: `JS bundle is ${(totalJSSize / 1024).toFixed(0)}KB`,
        suggestedFix: "Implement code splitting, tree shaking, and lazy loading",
      });
    }

    if (totalCSSSize > 200000) {
      // 200KB
      this.reportIssue({
        severity: "minor",
        title: "CSS bundle size too large",
        description: `Total CSS size is ${(totalCSSSize / 1024).toFixed(0)}KB`,
        component: "Performance",
        stepsToReproduce: ["Analyze network tab"],
        expectedBehavior: "CSS bundle should be under 200KB",
        actualBehavior: `CSS bundle is ${(totalCSSSize / 1024).toFixed(0)}KB`,
        suggestedFix: "Remove unused CSS, use critical CSS extraction",
      });
    }

    largeResources.forEach((resource) => {
      this.reportIssue({
        severity: "minor",
        title: `Large ${resource.type} file detected`,
        description: `${resource.name} is ${(resource.size / 1024).toFixed(0)}KB`,
        component: "Performance",
        stepsToReproduce: ["Check network tab"],
        expectedBehavior: "Individual files should be under 200KB",
        actualBehavior: `File is ${(resource.size / 1024).toFixed(0)}KB`,
        suggestedFix: "Split large files, implement code splitting",
      });
    });
  }

  private async auditAnimationPerformance(): Promise<void> {
    // Use PerformanceMonitor to check FPS
    const currentFPS = this.performanceMonitor.getFPS();
    
    if (currentFPS < 30) {
      this.reportIssue({
        severity: "critical",
        title: "Animation FPS critically low (<30)",
        description: `Animations running at ${currentFPS} FPS, causing severe jank`,
        component: "Performance - Animations",
        stepsToReproduce: [
          "Scroll through page",
          "Observe animation smoothness",
          "Monitor FPS in DevTools Performance panel"
        ],
        expectedBehavior: "Maintain 60 FPS for smooth animations",
        actualBehavior: `${currentFPS} FPS`,
        suggestedFix: "Critical: Reduce animation complexity, disable particle systems on low-tier devices, use CSS transforms instead of layout properties, enable GPU acceleration with will-change",
      });
    } else if (currentFPS < 50) {
      this.reportIssue({
        severity: "major",
        title: "Animation FPS below target (<50)",
        description: `Animations running at ${currentFPS} FPS, noticeable jank`,
        component: "Performance - Animations",
        stepsToReproduce: [
          "Scroll through page with animations",
          "Monitor FPS during scroll"
        ],
        expectedBehavior: "Maintain 60 FPS",
        actualBehavior: `${currentFPS} FPS`,
        suggestedFix: "Optimize animations: reduce particle count, use requestAnimationFrame, avoid animating layout properties (width, height, top, left), use transform and opacity only",
      });
    }

    // Check for animations using non-composited properties
    const animatedElements = this.queryAll('[class*="animate"], [style*="animation"], [style*="transition"]');

    let nonCompositedCount = 0;
    animatedElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const animation = style.animation;
        const transition = style.transition;
        
        // Check if animating expensive properties
        const expensiveProps = ['width', 'height', 'top', 'left', 'margin', 'padding'];
        const hasExpensiveAnimation = expensiveProps.some(prop => 
          animation.includes(prop) || transition.includes(prop)
        );
        
        if (hasExpensiveAnimation) {
          nonCompositedCount++;
        }
      }
    });

    if (nonCompositedCount > 0) {
      this.reportIssue({
        severity: "major",
        title: `${nonCompositedCount} animation(s) using non-composited properties`,
        description: "Animations trigger layout/paint instead of composite-only operations",
        component: "Performance - Animations",
        stepsToReproduce: [
          "Inspect animated elements",
          "Check CSS animation/transition properties",
          "Enable Paint Flashing in DevTools"
        ],
        expectedBehavior: "Animate only transform and opacity for 60fps performance",
        actualBehavior: `${nonCompositedCount} elements animating layout properties`,
        suggestedFix: "Replace width/height/top/left animations with transform: scale/translate. Use opacity for fade effects. Add will-change: transform for frequently animated elements.",
      });
    }

    // Check for excessive will-change usage
    const elementsWithWillChange = this.queryAll('[style*="will-change"]');
    if (elementsWithWillChange.length > 10) {
      this.reportIssue({
        severity: "minor",
        title: "Excessive will-change usage",
        description: `${elementsWithWillChange.length} elements using will-change, consuming GPU memory`,
        component: "Performance - Animations",
        stepsToReproduce: [
          "Inspect elements with will-change",
          "Check GPU memory usage"
        ],
        expectedBehavior: "Use will-change sparingly (< 10 elements)",
        actualBehavior: `${elementsWithWillChange.length} elements with will-change`,
        suggestedFix: "Remove will-change from elements not actively animating. Add will-change only before animation starts, remove after animation completes.",
      });
    }

    // Check for animations without prefers-reduced-motion support
    const hasReducedMotionCheck = this.queryAll('[data-reduced-motion], .reduce-motion').length > 0;
    if (animatedElements.length > 5 && !hasReducedMotionCheck) {
      this.reportIssue({
        severity: "major",
        title: "Animations don't respect prefers-reduced-motion",
        description: "No reduced motion support detected for accessibility",
        component: "Performance - Animations",
        viewport: ["mobile", "desktop"],
        stepsToReproduce: [
          "Enable prefers-reduced-motion in OS settings",
          "Load page",
          "Observe animations still playing"
        ],
        expectedBehavior: "Animations should be disabled or reduced when user prefers reduced motion",
        actualBehavior: "Animations play regardless of user preference",
        suggestedFix: "Add @media (prefers-reduced-motion: reduce) CSS rules to disable/reduce animations. Check window.matchMedia('(prefers-reduced-motion: reduce)') in JavaScript.",
      });
    }

    // Check memory usage if available
    const memoryUsage = this.performanceMonitor.getMemoryUsage();
    if (memoryUsage !== null && memoryUsage > 100) {
      this.reportIssue({
        severity: "major",
        title: `High memory usage (${memoryUsage.toFixed(0)}MB)`,
        description: "JavaScript heap size is high, may cause performance issues",
        component: "Performance - Memory",
        stepsToReproduce: [
          "Open Chrome DevTools",
          "Check Memory tab",
          "Take heap snapshot"
        ],
        expectedBehavior: "Memory usage should be under 100MB",
        actualBehavior: `${memoryUsage.toFixed(0)}MB used`,
        suggestedFix: "Check for memory leaks, dispose Three.js geometries/materials properly, remove event listeners when components unmount, limit particle count",
      });
    }

    // Check DOM node count
    const domNodes = this.performanceMonitor.getDOMNodeCount();
    if (domNodes > 1500) {
      this.reportIssue({
        severity: "minor",
        title: `High DOM node count (${domNodes})`,
        description: "Large DOM tree can slow down rendering and interactions",
        component: "Performance - DOM",
        stepsToReproduce: [
          "Inspect page structure",
          "Count total DOM nodes"
        ],
        expectedBehavior: "Keep DOM nodes under 1500 for optimal performance",
        actualBehavior: `${domNodes} DOM nodes`,
        suggestedFix: "Simplify DOM structure, use virtualization for long lists, remove unnecessary wrapper elements",
      });
    }
  }

  private async auditLazyLoading(): Promise<void> {
    // Check images for lazy loading
    const images = this.getAllImages();
    const imagesWithoutLazyLoading = images.filter(
      (img) => !img.hasAttribute("loading") && !img.hasAttribute("data-src")
    );

    // Identify above-fold vs below-fold images
    const viewportHeight = window.innerHeight || 0;
    const belowFoldImages = imagesWithoutLazyLoading.filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.top > viewportHeight;
    });

    if (belowFoldImages.length > 3) {
      this.reportIssue({
        severity: "major",
        title: "Below-fold images not using lazy loading",
        description: `${belowFoldImages.length} below-fold images load eagerly, wasting bandwidth`,
        component: "Performance - Images",
        stepsToReproduce: [
          "Open Network tab",
          "Load page",
          "Observe all images loading immediately"
        ],
        expectedBehavior: "Below-fold images should lazy load",
        actualBehavior: `${belowFoldImages.length} images without lazy loading`,
        suggestedFix: 'Add loading="lazy" to below-fold images, or use next/image component which handles lazy loading automatically',
      });
    }

    // Check for code splitting
    const scripts = this.queryAll("script[src]");
    const hasModuleScripts = scripts.some((script) =>
      script.getAttribute("type")?.includes("module")
    );

    if (!hasModuleScripts && scripts.length > 5) {
      this.reportIssue({
        severity: "minor",
        title: "No code splitting detected",
        description: "All JavaScript loaded upfront, increasing initial bundle size",
        component: "Performance - Code Splitting",
        stepsToReproduce: [
          "Check script tags in page source",
          "Analyze bundle size in Network tab"
        ],
        expectedBehavior: "Use dynamic imports for code splitting",
        actualBehavior: "All scripts loaded synchronously",
        suggestedFix: "Implement dynamic imports for route-based code splitting: import('component').then(...). Use Next.js dynamic imports with next/dynamic.",
      });
    }

    // Check for IntersectionObserver usage
    const hasIntersectionObserver = this.queryAll('[data-observe], [data-lazy]').length > 0;
    if (!hasIntersectionObserver && images.length > 10) {
      this.reportIssue({
        severity: "minor",
        title: "Could benefit from IntersectionObserver",
        description: "Many images could use intersection-based lazy loading for better control",
        component: "Performance - Lazy Loading",
        stepsToReproduce: [
          "Review lazy loading strategy",
          "Check for IntersectionObserver usage in code"
        ],
        expectedBehavior: "Use IntersectionObserver for lazy loading with custom thresholds",
        actualBehavior: "No IntersectionObserver implementation detected",
        suggestedFix: "Implement IntersectionObserver for progressive loading with rootMargin for preloading images before they enter viewport",
      });
    }

    // Check for component-level code splitting
    const hasNextDynamic = typeof window !== "undefined" && 
      document.querySelector('[data-next-dynamic]');
    
    if (!hasNextDynamic) {
      this.reportIssue({
        severity: "enhancement",
        title: "Consider component-level code splitting",
        description: "Heavy components could be dynamically imported to reduce initial bundle",
        component: "Performance - Code Splitting",
        stepsToReproduce: [
          "Analyze bundle composition",
          "Identify heavy components (Three.js, GSAP animations)"
        ],
        expectedBehavior: "Heavy components loaded on-demand",
        actualBehavior: "All components in main bundle",
        suggestedFix: "Use next/dynamic for heavy components: const HeavyComponent = dynamic(() => import('./HeavyComponent'), { loading: () => <Skeleton /> })",
      });
    }
  }

  private async auditRenderBlockingResources(): Promise<void> {
    // Check for render-blocking stylesheets
    const stylesheets = this.queryAll('link[rel="stylesheet"]');
    const blockingStylesheets = stylesheets.filter(
      (link) => !link.hasAttribute("media") || link.getAttribute("media") === "all"
    );

    if (blockingStylesheets.length > 2) {
      this.reportIssue({
        severity: "major",
        title: "Multiple render-blocking stylesheets",
        description: `${blockingStylesheets.length} blocking CSS files`,
        component: "Performance",
        stepsToReproduce: ["Check <head> for stylesheets"],
        expectedBehavior: "Minimize render-blocking CSS",
        actualBehavior: `${blockingStylesheets.length} blocking stylesheets`,
        suggestedFix: "Inline critical CSS, defer non-critical CSS",
      });
    }

    // Check for render-blocking scripts
    const scripts = this.queryAll("script[src]");
    const blockingScripts = scripts.filter(
      (script) =>
        !script.hasAttribute("async") &&
        !script.hasAttribute("defer") &&
        script.getAttribute("type") !== "module"
    );

    if (blockingScripts.length > 0) {
      this.reportIssue({
        severity: "critical",
        title: "Render-blocking JavaScript detected",
        description: `${blockingScripts.length} blocking script(s)`,
        component: "Performance",
        stepsToReproduce: ["Check script tags in <head>"],
        expectedBehavior: "Scripts should be async or deferred",
        actualBehavior: `${blockingScripts.length} blocking scripts`,
        suggestedFix: "Add async or defer attributes to script tags",
      });
    }

    // Check for font loading strategy
    const fontLinks = this.queryAll('link[rel="preload"][as="font"]');
    const fontFaces = this.queryAll("style").some((style) =>
      style.textContent?.includes("@font-face")
    );

    if (fontFaces && fontLinks.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "Fonts not preloaded",
        description: "Custom fonts could be preloaded for faster rendering",
        component: "Performance",
        stepsToReproduce: ["Check font loading"],
        expectedBehavior: "Critical fonts should be preloaded",
        actualBehavior: "No font preloading detected",
        suggestedFix: 'Add <link rel="preload" as="font"> for critical fonts',
      });
    }
  }

  private async auditImageOptimization(): Promise<void> {
    const images = this.getAllImages();

    images.forEach((img) => {
      const src = img.getAttribute("src") || "";
      const naturalWidth = img.naturalWidth;
      const displayWidth = img.width;

      // Check for oversized images
      if (naturalWidth > displayWidth * 2) {
        this.reportIssue({
          severity: "major",
          title: "Image larger than display size",
          description: `Image is ${naturalWidth}px but displayed at ${displayWidth}px`,
          component: "Images",
          stepsToReproduce: ["Check image dimensions"],
          expectedBehavior: "Image size should match display size",
          actualBehavior: `Image is ${Math.round((naturalWidth / displayWidth) * 100)}% larger`,
          suggestedFix: "Use responsive images with srcset or resize images",
        });
      }

      // Check for modern image formats
      if (!src.includes(".webp") && !src.includes(".avif")) {
        this.reportIssue({
          severity: "minor",
          title: "Image not using modern format",
          description: "Image could be optimized with WebP or AVIF",
          component: "Images",
          stepsToReproduce: ["Check image format"],
          expectedBehavior: "Use WebP or AVIF for better compression",
          actualBehavior: `Using ${src.split(".").pop()} format`,
          suggestedFix: "Convert images to WebP/AVIF with fallbacks",
        });
      }

      // Check for width/height attributes
      if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
        this.reportIssue({
          severity: "major",
          title: "Image missing width/height attributes",
          description: "Image can cause layout shift",
          component: "Images",
          stepsToReproduce: ["Load page and observe layout shifts"],
          expectedBehavior: "Images should have width and height attributes",
          actualBehavior: "Missing dimensions",
          suggestedFix: "Add width and height attributes to prevent CLS",
        });
      }
    });
  }

  protected generateSummary(): string {
    const criticalCount = this.findings.filter(f => f.severity === "critical").length;
    const majorCount = this.findings.filter(f => f.severity === "major").length;
    
    if (criticalCount > 0) {
      return `Performance Engineer audit found ${this.findings.length} issues (${criticalCount} critical, ${majorCount} major). Critical issues require immediate attention to meet Core Web Vitals thresholds.`;
    }
    
    return `Performance Engineer audit found ${this.findings.length} issues related to Core Web Vitals, bundle size, animations, and optimization. Focus on LCP < 2.5s, FID < 100ms, CLS < 0.1, and 60fps animations.`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    
    // Add specific recommendations based on findings
    const hasLCPIssue = this.findings.some(f => f.title.includes("LCP"));
    const hasCLSIssue = this.findings.some(f => f.title.includes("CLS"));
    const hasFPSIssue = this.findings.some(f => f.title.includes("FPS"));
    const hasBundleIssue = this.findings.some(f => f.title.includes("bundle"));
    
    if (hasLCPIssue) {
      recs.push("Optimize LCP: Use next/image with priority for hero images, preload critical fonts, inline critical CSS");
    }
    
    if (hasCLSIssue) {
      recs.push("Reduce CLS: Add explicit width/height to all images, use aspect-ratio CSS, reserve space for dynamic content");
    }
    
    if (hasFPSIssue) {
      recs.push("Improve animation performance: Use transform/opacity only, enable GPU acceleration, reduce particle count on low-tier devices");
    }
    
    if (hasBundleIssue) {
      recs.push("Reduce bundle size: Implement code splitting with dynamic imports, tree-shake unused code, lazy load heavy components");
    }
    
    recs.push(
      "Use PerformanceMonitor utility to track Core Web Vitals in production",
      "Implement device tier detection to gate expensive features",
      "Add prefers-reduced-motion support for all animations",
      "Use modern image formats (WebP/AVIF) with proper dimensions",
      "Eliminate render-blocking resources with async/defer attributes"
    );
    
    return recs;
  }
}
