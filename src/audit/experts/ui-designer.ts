/**
 * UI Designer Expert Module
 * Evaluates visual consistency, spacing, and layout
 * 
 * **Validates: Requirements 1.3, 2.1-2.10, 3.1-3.10**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class UIDesignerExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("ui_designer", context);
  }

  async audit(): Promise<void> {
    await this.auditVisualConsistency();
    await this.auditSpacing();
    await this.auditLayout();
    await this.auditAlignment();
  }

  private async auditVisualConsistency(): Promise<void> {
    // Check for consistent border radius
    const elements = this.queryAll("button, .card, input, select, textarea");
    const borderRadii = new Set<string>();

    elements.forEach((el) => {
      const style = this.getComputedStyle(el);
      if (style && style.borderRadius !== "0px") {
        borderRadii.add(style.borderRadius);
      }
    });

    if (borderRadii.size > 4) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent border radius values",
        description: `Found ${borderRadii.size} different border radius values`,
        component: "Global",
        stepsToReproduce: ["Inspect border radius across components"],
        expectedBehavior: "Border radius should follow design system tokens",
        actualBehavior: `${borderRadii.size} different values found`,
        suggestedFix: "Use consistent border radius tokens from design system",
      });
    }

    // Check for consistent shadows
    const shadowElements = this.queryAll(".card, button, .elevated");
    const shadows = new Set<string>();

    shadowElements.forEach((el) => {
      const style = this.getComputedStyle(el);
      if (style && style.boxShadow !== "none") {
        shadows.add(style.boxShadow);
      }
    });

    if (shadows.size > 5) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent shadow styles",
        description: `Found ${shadows.size} different shadow styles`,
        component: "Global",
        stepsToReproduce: ["Inspect box shadows across components"],
        expectedBehavior: "Shadows should follow elevation system",
        actualBehavior: `${shadows.size} different shadow styles`,
        suggestedFix: "Use consistent shadow tokens from design system",
      });
    }
  }

  private async auditSpacing(): Promise<void> {
    // Check for consistent spacing between sections
    const sections = this.queryAll("section, .section");
    const spacings = new Map<string, number>();

    sections.forEach((section, index) => {
      if (index < sections.length - 1) {
        const currentBottom = section.getBoundingClientRect().bottom;
        const nextTop = sections[index + 1].getBoundingClientRect().top;
        const gap = nextTop - currentBottom;
        const gapKey = Math.round(gap / 8) * 8; // Round to nearest 8px
        spacings.set(`section-${index}`, gapKey);
      }
    });

    const uniqueSpacings = new Set(spacings.values());
    if (uniqueSpacings.size > 3) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent section spacing",
        description: `Found ${uniqueSpacings.size} different spacing values between sections`,
        component: "Global",
        stepsToReproduce: ["Measure spacing between sections"],
        expectedBehavior: "Section spacing should be consistent",
        actualBehavior: `${uniqueSpacings.size} different spacing values`,
        suggestedFix: "Use consistent spacing scale (8px, 16px, 24px, 32px, etc.)",
      });
    }

    // Check for consistent padding
    const containers = this.queryAll(".container, main, section");
    const paddings = new Set<string>();

    containers.forEach((el) => {
      const style = this.getComputedStyle(el);
      if (style) {
        paddings.add(`${style.paddingTop}-${style.paddingBottom}`);
      }
    });

    if (paddings.size > 4) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent container padding",
        description: `Found ${paddings.size} different padding combinations`,
        component: "Global",
        stepsToReproduce: ["Inspect container padding values"],
        expectedBehavior: "Container padding should be consistent",
        actualBehavior: `${paddings.size} different padding values`,
        suggestedFix: "Use consistent padding tokens from spacing scale",
      });
    }
  }

  private async auditLayout(): Promise<void> {
    // Check for proper container widths
    const containers = this.queryAll(".container, main");
    containers.forEach((container) => {
      const style = this.getComputedStyle(container);
      if (style) {
        const maxWidth = parseInt(style.maxWidth);
        if (maxWidth > 1600) {
          this.reportIssue({
            severity: "minor",
            title: "Container max-width too large",
            description: `Container has max-width of ${maxWidth}px`,
            component: "Layout",
            stepsToReproduce: ["Inspect container on large screen"],
            expectedBehavior: "Container should have reasonable max-width (1280-1600px)",
            actualBehavior: `Max-width is ${maxWidth}px`,
            suggestedFix: "Set max-width to 1280px or 1440px for optimal readability",
          });
        }
      }
    });

    // Check for responsive grid usage
    const grids = this.queryAll('[class*="grid"]');
    grids.forEach((grid) => {
      const style = this.getComputedStyle(grid);
      if (style && style.display !== "grid") {
        this.reportIssue({
          severity: "minor",
          title: "Element with grid class not using CSS Grid",
          description: "Element has grid class but display is not grid",
          component: "Layout",
          stepsToReproduce: ["Inspect grid elements"],
          expectedBehavior: "Elements with grid class should use display: grid",
          actualBehavior: `Display is ${style.display}`,
          suggestedFix: "Apply display: grid to grid containers",
        });
      }
    });

    // Check for proper flex usage
    const flexContainers = this.queryAll('[class*="flex"]');
    flexContainers.forEach((flex) => {
      const style = this.getComputedStyle(flex);
      if (style && style.display !== "flex") {
        this.reportIssue({
          severity: "minor",
          title: "Element with flex class not using Flexbox",
          description: "Element has flex class but display is not flex",
          component: "Layout",
          stepsToReproduce: ["Inspect flex elements"],
          expectedBehavior: "Elements with flex class should use display: flex",
          actualBehavior: `Display is ${style.display}`,
          suggestedFix: "Apply display: flex to flex containers",
        });
      }
    });
  }

  private async auditAlignment(): Promise<void> {
    // Check for proper text alignment
    const textElements = this.queryAll("p, h1, h2, h3, h4, h5, h6, li");
    const alignments = new Map<string, number>();

    textElements.forEach((el) => {
      const style = this.getComputedStyle(el);
      if (style) {
        const align = style.textAlign;
        alignments.set(align, (alignments.get(align) || 0) + 1);
      }
    });

    // Check for center-aligned body text (usually not recommended)
    const centerAligned = alignments.get("center") || 0;
    const totalText = textElements.length;
    if (centerAligned / totalText > 0.3) {
      this.reportIssue({
        severity: "minor",
        title: "Excessive center-aligned text",
        description: `${Math.round((centerAligned / totalText) * 100)}% of text is center-aligned`,
        component: "Typography",
        stepsToReproduce: ["Review text alignment across page"],
        expectedBehavior: "Body text should be left-aligned for readability",
        actualBehavior: "Too much center-aligned text",
        suggestedFix: "Use center alignment sparingly, prefer left-align for body text",
      });
    }

    // Check for proper vertical alignment in flex containers
    const flexContainers = this.queryAll('[style*="display: flex"], [class*="flex"]');
    flexContainers.forEach((container) => {
      const style = this.getComputedStyle(container);
      if (style && style.display === "flex") {
        const alignItems = style.alignItems;
        if (alignItems === "stretch" && container.children.length > 1) {
          // Check if children have different heights
          const heights = Array.from(container.children).map(
            (child) => child.getBoundingClientRect().height
          );
          const uniqueHeights = new Set(heights);
          if (uniqueHeights.size > 1) {
            this.reportIssue({
              severity: "minor",
              title: "Flex container with misaligned children",
              description: "Flex children have different heights with align-items: stretch",
              component: "Layout",
              stepsToReproduce: ["Inspect flex container alignment"],
              expectedBehavior: "Flex children should be properly aligned",
              actualBehavior: "Children have inconsistent heights",
              suggestedFix: "Set explicit align-items value (center, flex-start, etc.)",
            });
          }
        }
      }
    });
  }

  protected generateSummary(): string {
    return `UI Designer audit found ${this.findings.length} issues related to visual consistency, spacing, and layout`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Use consistent design tokens for border radius and shadows",
      "Maintain consistent spacing scale across components",
      "Apply proper layout systems (Grid/Flexbox) consistently",
      "Ensure text alignment follows readability best practices"
    );
    return recs;
  }
}
