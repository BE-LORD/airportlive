/**
 * Mobile UX Specialist Expert Module
 * Evaluates touch targets, gestures, and mobile-specific patterns
 * 
 * **Validates: Requirements 1.3, 2.1-2.10**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class MobileUXSpecialistExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("mobile_ux_specialist", context);
  }

  async audit(): Promise<void> {
    if (!this.isMobileViewport()) {
      // Skip mobile-specific audits on desktop
      return;
    }

    await this.auditTouchTargets();
    await this.auditGestures();
    await this.auditMobilePatterns();
    await this.auditViewportHandling();
  }

  private async auditTouchTargets(): Promise<void> {
    const interactiveElements = this.getAllInteractiveElements();

    interactiveElements.forEach((element) => {
      const { width, height } = this.measureElementSize(element);
      const minSize = 44; // WCAG 2.5.5 minimum

      if (width < minSize || height < minSize) {
        this.reportIssue({
          severity: "major",
          title: "Touch target too small",
          description: `Element is ${Math.round(width)}x${Math.round(height)}px (minimum 44x44px)`,
          component: element.closest("section")?.id || "Global",
          viewport: ["mobile"],
          stepsToReproduce: [
            "View on mobile device",
            "Measure interactive element size",
          ],
          expectedBehavior: "Touch targets should be at least 44x44px",
          actualBehavior: `Element is ${Math.round(width)}x${Math.round(height)}px`,
          suggestedFix: "Increase padding or min-width/min-height to meet 44x44px minimum",
        });
      }
    });

    // Check spacing between touch targets
    const buttons = this.queryAll("button, a");
    for (let i = 0; i < buttons.length - 1; i++) {
      const current = buttons[i].getBoundingClientRect();
      const next = buttons[i + 1].getBoundingClientRect();

      // Check if buttons are on same row (similar y position)
      if (Math.abs(current.top - next.top) < 10) {
        const gap = next.left - current.right;
        if (gap < 8) {
          this.reportIssue({
            severity: "minor",
            title: "Insufficient spacing between touch targets",
            description: `Only ${Math.round(gap)}px between adjacent buttons`,
            component: "Global",
            viewport: ["mobile"],
            stepsToReproduce: ["View on mobile", "Check button spacing"],
            expectedBehavior: "At least 8px spacing between touch targets",
            actualBehavior: `${Math.round(gap)}px spacing`,
            suggestedFix: "Add gap-2 or gap-3 (8-12px) between buttons",
          });
        }
      }
    }
  }

  private async auditGestures(): Promise<void> {
    // Check for swipeable carousels
    const carousels = this.queryAll('[class*="carousel"], [class*="slider"]');
    carousels.forEach((carousel) => {
      const hasSwipeIndicator = carousel.querySelector('[aria-label*="swipe"]');
      if (!hasSwipeIndicator) {
        this.reportIssue({
          severity: "minor",
          title: "Carousel missing swipe affordance",
          description: "No visual indicator that carousel is swipeable",
          component: "Carousel",
          viewport: ["mobile"],
          stepsToReproduce: ["View carousel on mobile"],
          expectedBehavior: "Visual cue indicating swipe gesture support",
          actualBehavior: "No swipe indicator present",
          suggestedFix: "Add swipe indicator or drag hint for mobile users",
        });
      }
    });

    // Check for horizontal scroll containers
    const scrollContainers = this.queryAll('[style*="overflow-x"]');
    scrollContainers.forEach((container) => {
      const style = this.getComputedStyle(container);
      if (style && style.overflowX === "scroll") {
        const hasScrollIndicator = container.querySelector('[class*="scroll-indicator"]');
        if (!hasScrollIndicator) {
          this.reportIssue({
            severity: "minor",
            title: "Horizontal scroll container missing indicator",
            description: "No visual cue for horizontal scrolling",
            component: "Scroll Container",
            viewport: ["mobile"],
            stepsToReproduce: ["View on mobile", "Check for scroll hint"],
            expectedBehavior: "Visual indicator for horizontal scroll",
            actualBehavior: "No scroll indicator",
            suggestedFix: "Add fade gradient or scroll indicator at edges",
          });
        }
      }
    });
  }

  private async auditMobilePatterns(): Promise<void> {
    // Check for mobile menu
    const mobileMenu = this.query('[class*="mobile-menu"], [aria-label*="mobile menu"]');
    if (!mobileMenu) {
      this.reportIssue({
        severity: "major",
        title: "Missing mobile menu",
        description: "No mobile-specific navigation menu found",
        component: "Header/Navigation",
        viewport: ["mobile"],
        stepsToReproduce: ["View on mobile viewport"],
        expectedBehavior: "Mobile menu should be present",
        actualBehavior: "No mobile menu found",
        suggestedFix: "Implement hamburger menu for mobile navigation",
      });
    }

    // Check for sticky mobile booking bar
    const mobileBookingBar = this.query('[class*="mobile-booking"], [class*="sticky-bar"]');
    if (!mobileBookingBar) {
      this.reportIssue({
        severity: "minor",
        title: "Missing sticky mobile booking bar",
        description: "No persistent booking CTA on mobile",
        component: "Mobile booking bar",
        viewport: ["mobile"],
        stepsToReproduce: ["Scroll page on mobile"],
        expectedBehavior: "Sticky booking bar should be visible",
        actualBehavior: "No sticky booking bar",
        suggestedFix: "Add sticky bottom bar with booking CTA for mobile",
      });
    }

    // Check for mobile-optimized forms
    const forms = this.queryAll("form");
    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        const type = input.getAttribute("type");
        const inputMode = input.getAttribute("inputmode");

        // Check for appropriate input types
        if (input.name?.includes("phone") && type !== "tel") {
          this.reportIssue({
            severity: "minor",
            title: "Phone input not using tel type",
            description: "Phone field should use type='tel' for mobile keyboard",
            component: "Booking flow",
            viewport: ["mobile"],
            stepsToReproduce: ["Focus phone input on mobile"],
            expectedBehavior: "Numeric keyboard should appear",
            actualBehavior: "Default keyboard appears",
            suggestedFix: "Set type='tel' for phone number inputs",
          });
        }

        if (input.name?.includes("email") && type !== "email") {
          this.reportIssue({
            severity: "minor",
            title: "Email input not using email type",
            description: "Email field should use type='email' for mobile keyboard",
            component: "Booking flow",
            viewport: ["mobile"],
            stepsToReproduce: ["Focus email input on mobile"],
            expectedBehavior: "Email keyboard should appear",
            actualBehavior: "Default keyboard appears",
            suggestedFix: "Set type='email' for email inputs",
          });
        }
      });
    });
  }

  private async auditViewportHandling(): Promise<void> {
    // Check for viewport meta tag
    const viewportMeta = this.query('meta[name="viewport"]');
    if (!viewportMeta) {
      this.reportIssue({
        severity: "critical",
        title: "Missing viewport meta tag",
        description: "No viewport meta tag found",
        component: "Global",
        viewport: ["mobile"],
        stepsToReproduce: ["Inspect <head> element"],
        expectedBehavior: "Viewport meta tag should be present",
        actualBehavior: "No viewport meta tag",
        suggestedFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
      });
    } else {
      const content = viewportMeta.getAttribute("content");
      if (!content?.includes("width=device-width")) {
        this.reportIssue({
          severity: "major",
          title: "Viewport meta tag missing width=device-width",
          description: "Viewport not set to device width",
          component: "Global",
          viewport: ["mobile"],
          stepsToReproduce: ["Check viewport meta content"],
          expectedBehavior: "Should include width=device-width",
          actualBehavior: `Content is "${content}"`,
          suggestedFix: "Set content='width=device-width, initial-scale=1'",
        });
      }
    }

    // Check for horizontal scroll
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    if (bodyWidth > viewportWidth) {
      this.reportIssue({
        severity: "major",
        title: "Horizontal scroll detected",
        description: `Body width (${bodyWidth}px) exceeds viewport (${viewportWidth}px)`,
        component: "Global",
        viewport: ["mobile"],
        stepsToReproduce: ["View on mobile", "Try scrolling horizontally"],
        expectedBehavior: "No horizontal scroll",
        actualBehavior: "Page scrolls horizontally",
        suggestedFix: "Add overflow-x: hidden to body or fix overflowing elements",
      });
    }

    // Check for safe area insets on notched devices
    const hasNotch = window.innerHeight > 800 && this.isMobileViewport();
    if (hasNotch) {
      const header = this.query("header");
      if (header) {
        const style = this.getComputedStyle(header);
        if (style && !style.paddingTop.includes("env(safe-area-inset-top)")) {
          this.reportIssue({
            severity: "minor",
            title: "Header not accounting for safe area insets",
            description: "Header may be obscured by device notch",
            component: "Header/Navigation",
            viewport: ["mobile"],
            stepsToReproduce: ["View on iPhone with notch"],
            expectedBehavior: "Header should respect safe area insets",
            actualBehavior: "No safe area padding",
            suggestedFix: "Add padding-top: env(safe-area-inset-top) to header",
          });
        }
      }
    }
  }

  protected generateSummary(): string {
    return `Mobile UX Specialist audit found ${this.findings.length} issues related to touch targets, gestures, and mobile patterns`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Ensure all touch targets meet 44x44px minimum size",
      "Provide visual affordances for swipe gestures",
      "Use appropriate input types for mobile keyboards",
      "Handle viewport and safe area insets properly"
    );
    return recs;
  }
}
