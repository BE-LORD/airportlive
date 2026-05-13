/**
 * Desktop UX Specialist Expert Module
 * Evaluates hover states, cursor interactions, and large-screen layouts
 * 
 * **Validates: Requirements 1.3, 3.1-3.10**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class DesktopUXSpecialistExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("desktop_ux_specialist", context);
  }

  async audit(): Promise<void> {
    if (!this.isDesktopViewport()) {
      // Skip desktop-specific audits on mobile
      return;
    }

    await this.auditHoverStates();
    await this.auditCursorInteractions();
    await this.auditLargeScreenLayouts();
    await this.auditKeyboardAlternatives();
  }

  private async auditHoverStates(): Promise<void> {
    const interactiveElements = this.getAllInteractiveElements();

    interactiveElements.forEach((element) => {
      // Check if element has hover styles defined
      const hasHoverClass = element.className.includes("hover:");
      const style = this.getComputedStyle(element);

      if (!hasHoverClass && style) {
        this.reportIssue({
          severity: "minor",
          title: "Interactive element missing hover state",
          description: `${element.tagName} lacks hover styling`,
          component: element.closest("section")?.id || "Global",
          viewport: ["desktop"],
          stepsToReproduce: ["Hover over element on desktop"],
          expectedBehavior: "Element should show visual feedback on hover",
          actualBehavior: "No hover state defined",
          suggestedFix: "Add hover:bg-* or hover:scale-* classes for feedback",
        });
      }
    });

    // Check for consistent hover transitions
    const buttons = this.queryAll("button, a");
    buttons.forEach((button) => {
      const style = this.getComputedStyle(button);
      if (style && style.transition === "all 0s ease 0s") {
        this.reportIssue({
          severity: "minor",
          title: "Button missing hover transition",
          description: "Button has no transition for smooth hover effect",
          component: "Global",
          viewport: ["desktop"],
          stepsToReproduce: ["Hover over button"],
          expectedBehavior: "Smooth transition on hover",
          actualBehavior: "Instant state change",
          suggestedFix: "Add transition-colors or transition-all duration-300",
        });
      }
    });

    // Check for hover effects on cards
    const cards = this.queryAll('[class*="card"], article');
    cards.forEach((card) => {
      const hasHoverEffect =
        card.className.includes("hover:") ||
        card.className.includes("group-hover:");

      if (!hasHoverEffect) {
        this.reportIssue({
          severity: "minor",
          title: "Card missing hover effect",
          description: "Card lacks interactive hover feedback",
          component: "Cards",
          viewport: ["desktop"],
          stepsToReproduce: ["Hover over card"],
          expectedBehavior: "Card should show hover effect (scale, shadow, etc.)",
          actualBehavior: "No hover effect",
          suggestedFix: "Add hover:scale-105 or hover:shadow-lg for feedback",
        });
      }
    });
  }

  private async auditCursorInteractions(): Promise<void> {
    // Check for custom cursor implementation
    const customCursor = this.query('[class*="cursor"], #custom-cursor');
    if (!customCursor) {
      this.reportIssue({
        severity: "enhancement",
        title: "No custom cursor implementation",
        description: "Could enhance desktop experience with custom cursor",
        component: "Custom cursor",
        viewport: ["desktop"],
        stepsToReproduce: ["Move mouse on desktop"],
        expectedBehavior: "Custom cursor follows mouse",
        actualBehavior: "Default system cursor",
        suggestedFix: "Implement custom cursor component for premium feel",
      });
    }

    // Check for pointer cursor on interactive elements
    const interactiveElements = this.getAllInteractiveElements();
    interactiveElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.cursor !== "pointer") {
        this.reportIssue({
          severity: "minor",
          title: "Interactive element not showing pointer cursor",
          description: `${element.tagName} doesn't change cursor on hover`,
          component: "Global",
          viewport: ["desktop"],
          stepsToReproduce: ["Hover over element"],
          expectedBehavior: "Cursor should change to pointer",
          actualBehavior: `Cursor is ${style.cursor}`,
          suggestedFix: "Add cursor-pointer class to interactive elements",
        });
      }
    });

    // Check for magnetic button effects
    const ctaButtons = this.queryAll('[class*="cta"], [class*="primary"]');
    ctaButtons.forEach((button) => {
      const hasMagneticEffect = button.hasAttribute("data-magnetic");
      if (!hasMagneticEffect) {
        this.reportIssue({
          severity: "enhancement",
          title: "CTA button could use magnetic effect",
          description: "Primary buttons could have magnetic hover effect",
          component: "Buttons",
          viewport: ["desktop"],
          stepsToReproduce: ["Hover near button"],
          expectedBehavior: "Button pulls toward cursor",
          actualBehavior: "No magnetic effect",
          suggestedFix: "Add magnetic effect to primary CTA buttons",
        });
      }
    });
  }

  private async auditLargeScreenLayouts(): Promise<void> {
    const viewportWidth = window.innerWidth;

    // Check for proper max-width on large screens
    if (viewportWidth > 1920) {
      const containers = this.queryAll("main, .container");
      containers.forEach((container) => {
        const style = this.getComputedStyle(container);
        if (style) {
          const maxWidth = parseInt(style.maxWidth);
          if (maxWidth > 1600 || style.maxWidth === "none") {
            this.reportIssue({
              severity: "minor",
              title: "Container too wide on large screens",
              description: `Container has max-width of ${style.maxWidth}`,
              component: "Layout",
              viewport: ["desktop"],
              stepsToReproduce: ["View on 2560px+ screen"],
              expectedBehavior: "Content should have reasonable max-width",
              actualBehavior: `Max-width is ${style.maxWidth}`,
              suggestedFix: "Set max-width to 1440px or 1600px for readability",
            });
          }
        }
      });
    }

    // Check for multi-column layouts
    const sections = this.queryAll("section");
    sections.forEach((section) => {
      const children = Array.from(section.children);
      if (children.length > 1) {
        const style = this.getComputedStyle(section);
        if (style && style.display !== "grid" && style.display !== "flex") {
          this.reportIssue({
            severity: "minor",
            title: "Section not using modern layout",
            description: "Section with multiple children not using Grid/Flexbox",
            component: section.id || "Layout",
            viewport: ["desktop"],
            stepsToReproduce: ["Inspect section layout"],
            expectedBehavior: "Use Grid or Flexbox for multi-column layouts",
            actualBehavior: `Display is ${style.display}`,
            suggestedFix: "Use display: grid or display: flex for layout",
          });
        }
      }
    });

    // Check for proper sidebar layouts on wide screens
    if (viewportWidth > 1280) {
      const hasSidebar = this.query("aside, [class*='sidebar']");
      const mainContent = this.query("main");

      if (mainContent && !hasSidebar) {
        const style = this.getComputedStyle(mainContent);
        if (style && parseInt(style.maxWidth) > 900) {
          this.reportIssue({
            severity: "enhancement",
            title: "Could utilize sidebar on wide screens",
            description: "Wide screens could benefit from sidebar layout",
            component: "Layout",
            viewport: ["desktop"],
            stepsToReproduce: ["View on 1440px+ screen"],
            expectedBehavior: "Consider sidebar for navigation or supplementary content",
            actualBehavior: "Single column layout",
            suggestedFix: "Add sidebar for navigation or related content on wide screens",
          });
        }
      }
    }
  }

  private async auditKeyboardAlternatives(): Promise<void> {
    // Check that hover-dependent features have keyboard alternatives
    const hoverElements = this.queryAll('[class*="hover:"]');

    hoverElements.forEach((element) => {
      const hasFocusAlternative = element.className.includes("focus:");
      if (!hasFocusAlternative) {
        this.reportIssue({
          severity: "major",
          title: "Hover effect missing keyboard alternative",
          description: "Element has hover state but no focus state",
          component: "Global",
          viewport: ["desktop"],
          stepsToReproduce: ["Tab to element with keyboard"],
          expectedBehavior: "Focus state should match hover state",
          actualBehavior: "No focus state defined",
          suggestedFix: "Add focus: classes matching hover: classes",
        });
      }
    });

    // Check for keyboard-accessible dropdowns
    const dropdowns = this.queryAll('[class*="dropdown"], [role="menu"]');
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector("button, [role='button']");
      if (trigger) {
        const hasAriaExpanded = trigger.hasAttribute("aria-expanded");
        if (!hasAriaExpanded) {
          this.reportIssue({
            severity: "major",
            title: "Dropdown missing aria-expanded",
            description: "Dropdown trigger lacks aria-expanded attribute",
            component: "Dropdown",
            viewport: ["desktop"],
            stepsToReproduce: ["Navigate to dropdown with keyboard"],
            expectedBehavior: "Dropdown should have aria-expanded state",
            actualBehavior: "No aria-expanded attribute",
            suggestedFix: "Add aria-expanded to dropdown trigger",
          });
        }
      }
    });

    // Check for keyboard navigation in carousels
    const carousels = this.queryAll('[class*="carousel"], [class*="slider"]');
    carousels.forEach((carousel) => {
      const prevButton = carousel.querySelector('[aria-label*="previous"]');
      const nextButton = carousel.querySelector('[aria-label*="next"]');

      if (!prevButton || !nextButton) {
        this.reportIssue({
          severity: "major",
          title: "Carousel missing keyboard navigation",
          description: "Carousel lacks previous/next buttons for keyboard users",
          component: "Carousel",
          viewport: ["desktop"],
          stepsToReproduce: ["Try navigating carousel with keyboard"],
          expectedBehavior: "Keyboard users can navigate carousel",
          actualBehavior: "No keyboard navigation buttons",
          suggestedFix: "Add previous/next buttons with proper aria-labels",
        });
      }
    });
  }

  protected generateSummary(): string {
    return `Desktop UX Specialist audit found ${this.findings.length} issues related to hover states, cursor interactions, and large-screen layouts`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Ensure all interactive elements have hover states",
      "Implement custom cursor for premium desktop experience",
      "Optimize layouts for large screens with proper max-widths",
      "Provide keyboard alternatives for all hover-dependent features"
    );
    return recs;
  }
}
