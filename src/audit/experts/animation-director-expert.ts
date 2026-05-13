/**
 * Animation Director Expert Module
 * Validates GSAP animations, scroll-triggered effects, and FPS monitoring
 * Checks easing curves, prefers-reduced-motion support, and animation performance
 * 
 * **Validates: Requirements 1.3, 11.1-11.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

type WindowWithGsap = Window & {
  gsap?: {
    plugins?: {
      ScrollTrigger?: unknown;
    };
  };
};

export class AnimationDirectorExpert extends BaseExpert {
  private fpsReadings: number[] = [];
  private animationFrameId: number | null = null;

  constructor(context: AuditContext) {
    super("animation_director", context);
  }

  async audit(): Promise<void> {
    await this.auditGSAPAnimations();
    await this.auditScrollTriggeredAnimations();
    await this.auditFPSPerformance();
    await this.auditEasingCurves();
    await this.auditPrefersReducedMotion();
    await this.auditAnimationTiming();
    await this.auditLayoutShift();
  }

  private async auditGSAPAnimations(): Promise<void> {
    // Check for GSAP usage
    const hasGSAP =
      typeof window !== "undefined" && Boolean((window as WindowWithGsap).gsap);

    if (!hasGSAP) {
      this.reportIssue({
        severity: "minor",
        title: "GSAP not detected",
        description: "GSAP library not found but animations may be present",
        component: "Animations",
        stepsToReproduce: ["Check for GSAP in window object"],
        expectedBehavior: "GSAP should be loaded for animation management",
        actualBehavior: "GSAP not found",
        suggestedFix: "Ensure GSAP is properly loaded before animations initialize",
      });
      return;
    }

    // Check for animations using non-composited properties
    const animatedElements = this.queryAll('[class*="gsap"], [data-gsap]');
    
    animatedElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const transform = style.transform;
        const willChange = style.willChange;

        // Check if element is animated but not GPU accelerated
        if (transform === "none" && willChange === "auto") {
          this.reportIssue({
            severity: "major",
            title: "Animation not GPU accelerated",
            description: "Animated element missing transform or will-change",
            component: "Animations",
            stepsToReproduce: ["Inspect animated element styles"],
            expectedBehavior: "Animated elements should use transform for GPU acceleration",
            actualBehavior: "No transform or will-change detected",
            suggestedFix: "Add transform: translateZ(0) or will-change: transform",
          });
        }
      }
    });

    // Check for excessive will-change usage
    const willChangeElements = this.queryAll('[style*="will-change"]');
    if (willChangeElements.length > 15) {
      this.reportIssue({
        severity: "minor",
        title: "Excessive will-change usage",
        description: `${willChangeElements.length} elements using will-change`,
        component: "Animations",
        stepsToReproduce: ["Count elements with will-change"],
        expectedBehavior: "Use will-change sparingly (< 15 elements)",
        actualBehavior: `${willChangeElements.length} elements with will-change`,
        suggestedFix: "Remove will-change from non-animating elements",
      });
    }
  }

  private async auditScrollTriggeredAnimations(): Promise<void> {
    // Check for ScrollTrigger usage
    const hasScrollTrigger =
      typeof window !== "undefined" &&
      Boolean((window as WindowWithGsap).gsap?.plugins?.ScrollTrigger);

    if (!hasScrollTrigger) {
      this.reportIssue({
        severity: "minor",
        title: "ScrollTrigger plugin not detected",
        description: "ScrollTrigger not found but scroll animations may be needed",
        component: "Animations",
        stepsToReproduce: ["Check for ScrollTrigger plugin"],
        expectedBehavior: "ScrollTrigger should be registered for scroll animations",
        actualBehavior: "ScrollTrigger not found",
        suggestedFix: "Register ScrollTrigger plugin: gsap.registerPlugin(ScrollTrigger)",
      });
    }

    // Check for scroll-triggered elements
    const scrollElements = this.queryAll('[data-scroll], [data-animate-on-scroll]');
    
    scrollElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        const style = this.getComputedStyle(element);
        if (style && style.opacity === "0") {
          this.reportIssue({
            severity: "minor",
            title: "Scroll animation element invisible in viewport",
            description: "Element is in viewport but still hidden",
            component: "Animations",
            stepsToReproduce: ["Scroll to element", "Check visibility"],
            expectedBehavior: "Element should animate in when in viewport",
            actualBehavior: "Element remains hidden",
            suggestedFix: "Verify ScrollTrigger start position and animation trigger",
          });
        }
      }
    });

    // Check for proper scroll animation positioning
    const sections = this.queryAll("section");
    sections.forEach((section, index) => {
      const hasAnimation = section.querySelector('[data-scroll], [class*="animate"]');
      if (hasAnimation && index > 0) {
        // Verify animation triggers at appropriate viewport position
        const rect = section.getBoundingClientRect();
        if (rect.top < 0 && rect.bottom > window.innerHeight) {
          this.reportIssue({
            severity: "minor",
            title: "Scroll animation may trigger too early/late",
            description: `Section ${index + 1} animation positioning may need adjustment`,
            component: "Animations",
            stepsToReproduce: ["Scroll through page", "Observe animation timing"],
            expectedBehavior: "Animations should trigger at 'top 80%' or similar",
            actualBehavior: "Animation timing may be off",
            suggestedFix: "Adjust ScrollTrigger start position (e.g., 'top 80%')",
          });
        }
      }
    });
  }

  private async auditFPSPerformance(): Promise<void> {
    if (typeof window === "undefined" || !window.requestAnimationFrame) return;

    // Monitor FPS for 3 seconds
    let lastTime = performance.now();
    let frames = 0;
    const duration = 3000;
    const startTime = performance.now();

    const measureFPS = (currentTime: number) => {
      frames++;
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        this.fpsReadings.push(fps);
        frames = 0;
        lastTime = currentTime;
      }

      if (currentTime - startTime < duration) {
        this.animationFrameId = requestAnimationFrame(measureFPS);
      } else {
        this.analyzeFPSReadings();
      }
    };

    this.animationFrameId = requestAnimationFrame(measureFPS);
  }

  private analyzeFPSReadings(): void {
    if (this.fpsReadings.length === 0) return;

    const avgFPS = this.fpsReadings.reduce((a, b) => a + b, 0) / this.fpsReadings.length;
    const minFPS = Math.min(...this.fpsReadings);

    if (avgFPS < 60) {
      const severity = avgFPS < 30 ? "critical" : avgFPS < 50 ? "major" : "minor";
      this.reportIssue({
        severity,
        title: `Animation FPS below 60 (avg: ${Math.round(avgFPS)})`,
        description: `Animations running at average ${Math.round(avgFPS)} FPS`,
        component: "Animations",
        stepsToReproduce: ["Monitor FPS during animations", "Scroll through page"],
        expectedBehavior: "Maintain 60 FPS for smooth animations",
        actualBehavior: `Average FPS: ${Math.round(avgFPS)}, Min FPS: ${minFPS}`,
        suggestedFix: "Optimize animations, reduce particle count, use GPU acceleration",
      });
    }

    if (minFPS < 30) {
      this.reportIssue({
        severity: "critical",
        title: "Animation FPS drops below 30",
        description: `Minimum FPS recorded: ${minFPS}`,
        component: "Animations",
        stepsToReproduce: ["Monitor FPS during heavy animations"],
        expectedBehavior: "FPS should never drop below 30",
        actualBehavior: `Minimum FPS: ${minFPS}`,
        suggestedFix: "Critical performance issue - reduce animation complexity",
      });
    }
  }

  private async auditEasingCurves(): Promise<void> {
    // Check for consistent easing usage
    const animatedElements = this.queryAll('[style*="transition"], [class*="transition"]');
    const easings = new Set<string>();

    animatedElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.transitionTimingFunction !== "ease") {
        easings.add(style.transitionTimingFunction);
      }
    });

    if (easings.size > 5) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent easing curves",
        description: `Found ${easings.size} different easing functions`,
        component: "Animations",
        stepsToReproduce: ["Inspect transition timing functions"],
        expectedBehavior: "Use consistent easing from design system",
        actualBehavior: `${easings.size} different easing functions`,
        suggestedFix: "Standardize on power2.out, power3.out, or design system easings",
      });
    }

    // Check for linear easing (usually not desired)
    const linearElements = this.queryAll('[style*="linear"]');
    if (linearElements.length > 3) {
      this.reportIssue({
        severity: "minor",
        title: "Excessive linear easing usage",
        description: `${linearElements.length} elements using linear easing`,
        component: "Animations",
        stepsToReproduce: ["Check transition timing functions"],
        expectedBehavior: "Use eased transitions for natural motion",
        actualBehavior: "Multiple elements using linear easing",
        suggestedFix: "Replace linear with ease-out or power2.out for better feel",
      });
    }
  }

  private async auditPrefersReducedMotion(): Promise<void> {
    // Check if prefers-reduced-motion is respected
    const prefersReducedMotion = typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Check if animations are still running
      const animatedElements = this.queryAll('[class*="animate"], [data-gsap]');
      
      animatedElements.forEach((element) => {
        const style = this.getComputedStyle(element);
        if (style && style.animation !== "none") {
          this.reportIssue({
            severity: "critical",
            title: "Animation not respecting prefers-reduced-motion",
            description: "Animation running despite user preference for reduced motion",
            component: "Animations",
            stepsToReproduce: [
              "Enable prefers-reduced-motion in OS settings",
              "Reload page",
              "Observe animations"
            ],
            expectedBehavior: "Animations should be disabled or reduced",
            actualBehavior: "Animations still running",
            suggestedFix: "Add @media (prefers-reduced-motion: reduce) to disable animations",
          });
        }
      });
    }

    // Check for reduced motion CSS
    const styles = this.queryAll("style");
    const hasReducedMotionCSS = styles.some((style) =>
      style.textContent?.includes("prefers-reduced-motion")
    );

    if (!hasReducedMotionCSS) {
      this.reportIssue({
        severity: "major",
        title: "No prefers-reduced-motion support detected",
        description: "No CSS rules found for reduced motion preference",
        component: "Animations",
        stepsToReproduce: ["Search for prefers-reduced-motion in CSS"],
        expectedBehavior: "Should have @media (prefers-reduced-motion: reduce) rules",
        actualBehavior: "No reduced motion CSS found",
        suggestedFix: "Add CSS rules to disable/reduce animations for accessibility",
      });
    }
  }

  private async auditAnimationTiming(): Promise<void> {
    // Check for appropriate animation durations
    const animatedElements = this.queryAll('[style*="transition"], [class*="transition"]');
    
    animatedElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const duration = parseFloat(style.transitionDuration);
        
        if (duration > 1) {
          this.reportIssue({
            severity: "minor",
            title: "Animation duration too long",
            description: `Animation duration is ${duration}s`,
            component: "Animations",
            stepsToReproduce: ["Trigger animation", "Measure duration"],
            expectedBehavior: "Most animations should be 0.2-0.6s",
            actualBehavior: `Duration is ${duration}s`,
            suggestedFix: "Reduce animation duration to 0.3-0.5s for better UX",
          });
        }

        if (duration < 0.1 && duration > 0) {
          this.reportIssue({
            severity: "minor",
            title: "Animation duration too short",
            description: `Animation duration is ${duration}s`,
            component: "Animations",
            stepsToReproduce: ["Trigger animation", "Observe speed"],
            expectedBehavior: "Animations should be at least 0.15s",
            actualBehavior: `Duration is ${duration}s`,
            suggestedFix: "Increase duration to 0.2s minimum for visibility",
          });
        }
      }
    });

    // Check stagger timing
    const staggerElements = this.queryAll('[data-stagger], [class*="stagger"]');
    if (staggerElements.length > 0) {
      // Verify stagger creates smooth sequential effect
      const delays = new Set<string>();
      staggerElements.forEach((element) => {
        const style = this.getComputedStyle(element);
        if (style) {
          delays.add(style.transitionDelay);
        }
      });

      if (delays.size < 2 && staggerElements.length > 3) {
        this.reportIssue({
          severity: "minor",
          title: "Stagger animation not properly configured",
          description: "Stagger elements have same delay",
          component: "Animations",
          stepsToReproduce: ["Observe stagger animation"],
          expectedBehavior: "Stagger should have incremental delays",
          actualBehavior: "All elements have same delay",
          suggestedFix: "Configure GSAP stagger with proper delay increment (0.03-0.1s)",
        });
      }
    }
  }

  private async auditLayoutShift(): Promise<void> {
    // Check if animations cause layout shift
    const animatedElements = this.queryAll('[class*="animate"]');
    
    animatedElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const animationName = style.animationName;
        
        // Check if animating width, height, margin, padding (causes layout shift)
        if (
          animationName.includes("width") ||
          animationName.includes("height") ||
          animationName.includes("margin") ||
          animationName.includes("padding")
        ) {
          this.reportIssue({
            severity: "major",
            title: "Animation causes layout shift",
            description: "Animation modifies layout properties",
            component: "Animations",
            stepsToReproduce: ["Trigger animation", "Observe layout changes"],
            expectedBehavior: "Animate only transform and opacity",
            actualBehavior: "Animating layout properties",
            suggestedFix: "Use transform: scale() instead of width/height changes",
          });
        }
      }
    });

    // Check for animations without reserved space
    const fadeInElements = this.queryAll('[class*="fade-in"], [data-fade]');
    fadeInElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.opacity === "0" && style.height === "auto") {
        this.reportIssue({
          severity: "minor",
          title: "Fade-in animation may cause layout shift",
          description: "Element has no reserved height before animation",
          component: "Animations",
          stepsToReproduce: ["Load page", "Observe layout shifts"],
          expectedBehavior: "Reserve space for animating elements",
          actualBehavior: "No height reserved",
          suggestedFix: "Set min-height or use skeleton placeholder",
        });
      }
    });
  }

  protected generateSummary(): string {
    const avgFPS = this.fpsReadings.length > 0
      ? Math.round(this.fpsReadings.reduce((a, b) => a + b, 0) / this.fpsReadings.length)
      : 0;
    return `Animation Director audit found ${this.findings.length} issues. Average FPS: ${avgFPS || "N/A"}`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Ensure all animations run at 60fps using GPU acceleration",
      "Validate ScrollTrigger animations activate at appropriate positions",
      "Implement prefers-reduced-motion support for accessibility",
      "Use consistent easing curves from design system",
      "Avoid animating layout properties (width, height, margin, padding)"
    );
    return recs;
  }

  // Cleanup
  public cleanup(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
