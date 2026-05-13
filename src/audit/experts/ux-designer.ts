/**
 * UX Designer Expert Module
 * Evaluates navigation, user flows, and interaction patterns
 * 
 * **Validates: Requirements 1.3, 2.1-2.10, 3.1-3.10**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class UXDesignerExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("ux_designer", context);
  }

  async audit(): Promise<void> {
    await this.auditNavigation();
    await this.auditUserFlows();
    await this.auditInteractionPatterns();
    await this.auditInformationArchitecture();
  }

  private async auditNavigation(): Promise<void> {
    // Check navigation structure
    const nav = this.query("nav");
    if (!nav) {
      this.reportIssue({
        severity: "critical",
        title: "Missing navigation element",
        description: "No <nav> element found in the page",
        component: "Header/Navigation",
        stepsToReproduce: ["Load the page", "Inspect DOM for <nav> element"],
        expectedBehavior: "Navigation should be wrapped in semantic <nav> element",
        actualBehavior: "No <nav> element found",
        suggestedFix: "Wrap navigation links in a <nav> element for semantic HTML",
      });
    }

    // Check for skip links
    const skipLinks = this.queryAll('a[href^="#"]').filter((link) =>
      this.getTextContent(link).toLowerCase().includes("skip")
    );
    if (skipLinks.length === 0) {
      this.reportIssue({
        severity: "major",
        title: "Missing skip navigation links",
        description: "No skip links found for keyboard navigation",
        component: "Header/Navigation",
        stepsToReproduce: ["Load page", "Tab through elements"],
        expectedBehavior: "Skip link should be first focusable element",
        actualBehavior: "No skip links present",
        suggestedFix: "Add skip link to main content as first focusable element",
      });
    }

    // Check navigation link clarity
    const navLinks = this.queryAll("nav a");
    navLinks.forEach((link) => {
      const text = this.getTextContent(link);
      if (text.length < 2) {
        this.reportIssue({
          severity: "minor",
          title: "Navigation link has unclear text",
          description: `Link text "${text}" is too short or unclear`,
          component: "Header/Navigation",
          stepsToReproduce: ["Navigate to header", "Read link text"],
          expectedBehavior: "Link text should be descriptive",
          actualBehavior: `Link text is "${text}"`,
          suggestedFix: "Use descriptive link text that explains destination",
        });
      }
    });
  }

  private async auditUserFlows(): Promise<void> {
    // Check primary CTA visibility
    const ctaButtons = this.queryAll('button, a[href*="book"], a[href*="contact"]');
    if (ctaButtons.length === 0) {
      this.reportIssue({
        severity: "critical",
        title: "No clear call-to-action buttons found",
        description: "Primary conversion actions are not visible",
        component: "Hero section",
        stepsToReproduce: ["Load page", "Look for booking/contact buttons"],
        expectedBehavior: "Clear CTA buttons should be prominently displayed",
        actualBehavior: "No CTA buttons found",
        suggestedFix: "Add prominent booking and contact CTA buttons",
      });
    }

    // Check form accessibility in user flow
    const forms = this.queryAll("form");
    forms.forEach((form, index) => {
      const inputs = form.querySelectorAll("input, select, textarea");
      if (inputs.length === 0) {
        this.reportIssue({
          severity: "major",
          title: `Form ${index + 1} has no input fields`,
          description: "Form element exists but contains no inputs",
          component: "Booking flow",
          stepsToReproduce: ["Navigate to form", "Inspect form structure"],
          expectedBehavior: "Form should contain input fields",
          actualBehavior: "Form is empty",
          suggestedFix: "Add appropriate input fields to form",
        });
      }
    });

    // Check for clear error states
    const errorMessages = this.queryAll('[role="alert"], .error, [aria-live="polite"]');
    if (errorMessages.length === 0 && forms.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "No error message containers found",
        description: "Forms lack visible error message areas",
        component: "Booking flow",
        stepsToReproduce: ["Submit form with invalid data"],
        expectedBehavior: "Error messages should be displayed",
        actualBehavior: "No error message containers present",
        suggestedFix: "Add aria-live regions for form validation errors",
      });
    }
  }

  private async auditInteractionPatterns(): Promise<void> {
    // Check for consistent interaction patterns
    const buttons = this.queryAll("button");
    const buttonStyles = new Set<string>();

    buttons.forEach((button) => {
      const style = this.getComputedStyle(button);
      if (style) {
        const styleKey = `${style.backgroundColor}-${style.color}-${style.borderRadius}`;
        buttonStyles.add(styleKey);
      }
    });

    if (buttonStyles.size > 3) {
      this.reportIssue({
        severity: "minor",
        title: "Inconsistent button styling",
        description: `Found ${buttonStyles.size} different button styles`,
        component: "Global",
        stepsToReproduce: ["Inspect all buttons on page"],
        expectedBehavior: "Buttons should follow consistent design system",
        actualBehavior: `${buttonStyles.size} different button styles found`,
        suggestedFix: "Standardize button styles using design system tokens",
      });
    }

    // Check for hover feedback on interactive elements
    const interactiveElements = this.getAllInteractiveElements();
    interactiveElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.cursor !== "pointer") {
        this.reportIssue({
          severity: "minor",
          title: "Interactive element missing pointer cursor",
          description: `Element ${element.tagName} doesn't show pointer cursor`,
          component: "Global",
          stepsToReproduce: ["Hover over element"],
          expectedBehavior: "Interactive elements should show pointer cursor",
          actualBehavior: "Cursor remains default",
          suggestedFix: "Add cursor: pointer to interactive elements",
        });
      }
    });
  }

  private async auditInformationArchitecture(): Promise<void> {
    // Check heading hierarchy
    const headings = this.getAllHeadings();
    const h1Count = headings.filter((h) => h.tagName === "H1").length;

    if (h1Count === 0) {
      this.reportIssue({
        severity: "critical",
        title: "Missing H1 heading",
        description: "Page has no H1 heading",
        component: "Global",
        stepsToReproduce: ["Inspect page headings"],
        expectedBehavior: "Page should have exactly one H1",
        actualBehavior: "No H1 found",
        suggestedFix: "Add H1 heading for main page title",
      });
    } else if (h1Count > 1) {
      this.reportIssue({
        severity: "major",
        title: "Multiple H1 headings",
        description: `Found ${h1Count} H1 headings`,
        component: "Global",
        stepsToReproduce: ["Inspect page headings"],
        expectedBehavior: "Page should have exactly one H1",
        actualBehavior: `${h1Count} H1 headings found`,
        suggestedFix: "Use only one H1 for main page title, use H2-H6 for subsections",
      });
    }

    // Check for logical heading sequence
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      if (level - previousLevel > 1) {
        this.reportIssue({
          severity: "minor",
          title: "Heading hierarchy skip detected",
          description: `Heading jumps from H${previousLevel} to H${level}`,
          component: "Global",
          stepsToReproduce: ["Review heading structure"],
          expectedBehavior: "Headings should not skip levels",
          actualBehavior: `Skip from H${previousLevel} to H${level}`,
          suggestedFix: "Use sequential heading levels (H1 → H2 → H3)",
        });
      }
      previousLevel = level;
    });
  }

  protected generateSummary(): string {
    return `UX Designer audit found ${this.findings.length} issues related to navigation, user flows, and interaction patterns`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Ensure clear navigation structure with semantic HTML",
      "Provide skip links for keyboard users",
      "Maintain consistent interaction patterns across components",
      "Use logical heading hierarchy for information architecture"
    );
    return recs;
  }
}
