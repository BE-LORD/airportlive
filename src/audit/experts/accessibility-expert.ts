/**
 * Accessibility Expert Module (WCAG 2.1 AA/AAA)
 * Integrates axe-core for automated accessibility testing
 * Tests keyboard navigation, screen reader compatibility, ARIA labels, semantic HTML
 * 
 * **Validates: Requirements 1.3, 6.1-6.17**
 */

import { BaseExpert, type AuditContext } from "./base-expert";
import type { AxeResults } from "axe-core";

// Define types for axe-core results
interface AxeResult {
  id: string;
  impact?: string;
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNodeResult[];
}

interface AxeNodeResult {
  target: string[];
  html: string;
  any: AxeCheckResult[];
  all: AxeCheckResult[];
  none: AxeCheckResult[];
}

interface AxeCheckResult {
  id: string;
  impact?: string;
  message?: string;
  data?: unknown;
}

export class AccessibilityExpert extends BaseExpert {
  private axe: typeof import("axe-core") | null = null;

  constructor(context: AuditContext) {
    super("accessibility_expert", context);
  }

  async audit(): Promise<void> {
    // Run axe-core automated tests first
    await this.runAxeCoreTests();
    
    // Then run manual checks
    await this.auditKeyboardNavigation();
    await this.auditScreenReaderCompatibility();
    await this.auditARIALabels();
    await this.auditSemanticHTML();
    await this.auditColorContrast();
    await this.auditTouchTargets();
    await this.auditFocusManagement();
  }

  /**
   * Run axe-core automated accessibility tests
   * Validates: Requirements 6.1-6.17
   */
  private async runAxeCoreTests(): Promise<void> {
    // Only run in browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    try {
      // Dynamically import axe-core
      const axeModule = await import("axe-core");
      this.axe = axeModule;

      // Configure axe to test for WCAG 2.1 AA and AAA
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results = await (this.axe as any).run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag21aaa"],
        },
      }) as AxeResults & { violations: AxeResult[]; incomplete?: AxeResult[] };

      // Process violations
      this.processAxeViolations(results.violations);

      // Process incomplete tests (need manual review)
      if (results.incomplete) {
        this.processAxeIncomplete(results.incomplete);
      }
    } catch (error) {
      // If axe-core fails to load or run, log but continue with manual tests
      console.warn("axe-core automated tests failed:", error);
    }
  }

  /**
   * Process axe-core violations and convert to issues
   */
  private processAxeViolations(violations: AxeResult[]): void {
    violations.forEach((violation) => {
      const severity = this.mapAxeImpactToSeverity(violation.impact);
      const affectedNodes = violation.nodes.length;

      this.reportIssue({
        severity,
        title: `${violation.id}: ${violation.help}`,
        description: `${violation.description}\n\nAffected elements: ${affectedNodes}\n\nWCAG: ${violation.tags.filter((tag: string) => tag.startsWith("wcag")).join(", ")}`,
        component: this.determineComponentFromNodes(violation.nodes),
        stepsToReproduce: [
          "Run axe-core automated accessibility scan",
          `Check elements: ${violation.nodes.slice(0, 3).map((n: AxeNodeResult) => n.target.join(" > ")).join(", ")}${affectedNodes > 3 ? ` and ${affectedNodes - 3} more` : ""}`,
        ],
        expectedBehavior: violation.help,
        actualBehavior: violation.description,
        suggestedFix: this.getAxeFixSuggestion(violation),
      });
    });
  }

  /**
   * Process axe-core incomplete tests (require manual verification)
   */
  private processAxeIncomplete(incomplete: AxeResult[]): void {
    incomplete.forEach((item) => {
      this.reportIssue({
        severity: "minor",
        title: `Manual review needed: ${item.help}`,
        description: `${item.description}\n\nThis check requires manual verification.\n\nWCAG: ${item.tags.filter((tag: string) => tag.startsWith("wcag")).join(", ")}`,
        component: this.determineComponentFromNodes(item.nodes),
        stepsToReproduce: [
          "Manual accessibility review required",
          `Check elements: ${item.nodes.slice(0, 3).map((n: AxeNodeResult) => n.target.join(" > ")).join(", ")}`,
        ],
        expectedBehavior: item.help,
        actualBehavior: "Requires manual verification",
        suggestedFix: "Manually verify this accessibility requirement with assistive technologies",
      });
    });
  }

  /**
   * Map axe-core impact levels to our severity levels
   */
  private mapAxeImpactToSeverity(impact?: string): "critical" | "major" | "minor" | "enhancement" {
    switch (impact) {
      case "critical":
        return "critical";
      case "serious":
        return "critical";
      case "moderate":
        return "major";
      case "minor":
        return "minor";
      default:
        return "minor";
    }
  }

  /**
   * Determine component name from axe-core node targets
   */
  private determineComponentFromNodes(nodes: AxeNodeResult[]): string {
    if (nodes.length === 0) return "Global";

    // Try to determine component from the first node's target
    const firstTarget = nodes[0].target[0];
    
    if (typeof firstTarget === "string") {
      if (firstTarget.includes("header") || firstTarget.includes("nav")) return "Header/Navigation";
      if (firstTarget.includes("hero")) return "Hero";
      if (firstTarget.includes("footer")) return "Footer";
      if (firstTarget.includes("form") || firstTarget.includes("input")) return "Forms";
      if (firstTarget.includes("button")) return "Buttons";
      if (firstTarget.includes("modal") || firstTarget.includes("dialog")) return "Modal";
      if (firstTarget.includes("img") || firstTarget.includes("image")) return "Images";
    }

    return "Global";
  }

  /**
   * Get fix suggestion from axe-core violation
   */
  private getAxeFixSuggestion(violation: AxeResult): string {
    // Combine all fix suggestions from nodes
    const fixes = violation.nodes
      .flatMap((node: AxeNodeResult) => node.all.concat(node.any, node.none))
      .map((check: AxeCheckResult) => check.message)
      .filter((msg): msg is string => typeof msg === 'string')
      .slice(0, 3);

    if (fixes.length > 0) {
      return `${violation.help}\n\nSuggestions:\n${fixes.map((f: string, i: number) => `${i + 1}. ${f}`).join("\n")}`;
    }

    return violation.help;
  }

  /**
   * Audit keyboard navigation
   * Validates: Requirements 6.3, 6.4, 6.14, 6.16
   */
  private async auditKeyboardNavigation(): Promise<void> {
    // Check for skip links
    const skipLinks = this.queryAll('a[href^="#"]').filter((link) =>
      this.getTextContent(link).toLowerCase().includes("skip")
    );

    if (skipLinks.length === 0) {
      this.reportIssue({
        severity: "major",
        title: "Missing skip navigation link",
        description: "No skip link found for keyboard users to bypass repetitive navigation",
        component: "Header/Navigation",
        stepsToReproduce: [
          "Load the page",
          "Press Tab key",
          "Observe first focusable element",
        ],
        expectedBehavior: "Skip link should be first focusable element allowing users to skip to main content",
        actualBehavior: "No skip link present",
        suggestedFix: 'Add <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a> as first element in body',
      });
    }

    // Check tab order - validate no positive tabindex values
    const focusableElements = this.queryAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      const tabIndex = element.getAttribute("tabindex");
      if (tabIndex && parseInt(tabIndex) > 0) {
        this.reportIssue({
          severity: "major",
          title: "Positive tabindex detected",
          description: `Element has tabindex="${tabIndex}" which disrupts natural tab order and makes keyboard navigation unpredictable`,
          component: "Global",
          stepsToReproduce: [
            "Tab through page with keyboard",
            "Notice unexpected focus order",
          ],
          expectedBehavior: "Use tabindex='0' or '-1' only, rely on natural DOM order for tab sequence",
          actualBehavior: `tabindex="${tabIndex}" found on element`,
          suggestedFix: "Remove positive tabindex values. Reorder DOM elements to achieve desired focus order.",
        });
      }
    });

    // Check for keyboard traps in modals and dialogs
    const modals = this.queryAll('[role="dialog"], [class*="modal"], [class*="dialog"]');
    modals.forEach((modal) => {
      const focusableInModal = modal.querySelectorAll(
        'a, button, input, select, textarea, [tabindex="0"]'
      );
      if (focusableInModal.length === 0) {
        this.reportIssue({
          severity: "critical",
          title: "Modal has no focusable elements (keyboard trap)",
          description: "Modal creates keyboard trap with no focusable content, preventing keyboard users from interacting or closing it",
          component: "Modal",
          stepsToReproduce: [
            "Open modal using keyboard",
            "Try to tab through modal",
            "Try to close modal with keyboard",
          ],
          expectedBehavior: "Modal should have focusable elements including a close button, and trap focus within modal boundaries",
          actualBehavior: "No focusable elements in modal",
          suggestedFix: "Add focusable close button with aria-label='Close'. Implement focus trap that cycles focus within modal. Ensure Escape key closes modal.",
        });
      }
    });

    // Check focus indicators are visible
    const interactiveElements = this.getAllInteractiveElements();
    interactiveElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const outline = style.outline;
        const outlineWidth = style.outlineWidth;
        const hasCustomFocus = element.className.includes("focus:") || 
                               element.className.includes("focus-visible:");

        // Check if outline is removed without custom focus styles
        if ((outline === "none" || outlineWidth === "0px") && !hasCustomFocus) {
          this.reportIssue({
            severity: "critical",
            title: "Focus indicator removed without replacement (WCAG 2.4.7)",
            description: "Element has outline: none but no custom focus style, making it impossible for keyboard users to see where focus is",
            component: "Global",
            stepsToReproduce: [
              "Tab to element with keyboard",
              "Observe lack of visual focus indicator",
            ],
            expectedBehavior: "Visible focus indicator with minimum 3:1 contrast ratio against background",
            actualBehavior: "No focus indicator visible",
            suggestedFix: "Add focus:ring-2 focus:ring-gold focus:ring-offset-2 or custom focus styles with sufficient contrast",
          });
        }
      }
    });

    // Check that all interactive elements are keyboard accessible
    const clickableNonInteractive = this.queryAll('[onclick]:not(a):not(button):not(input):not(select):not(textarea)');
    clickableNonInteractive.forEach((element) => {
      const hasTabindex = element.hasAttribute("tabindex");
      const hasRole = element.hasAttribute("role");
      
      if (!hasTabindex || !hasRole) {
        this.reportIssue({
          severity: "critical",
          title: "Interactive element not keyboard accessible",
          description: "Element has onclick handler but is not keyboard accessible",
          component: "Global",
          stepsToReproduce: [
            "Try to tab to element",
            "Try to activate with Enter or Space key",
          ],
          expectedBehavior: "All interactive elements should be keyboard accessible",
          actualBehavior: "Element cannot be reached or activated with keyboard",
          suggestedFix: "Use <button> element instead, or add tabindex='0', role='button', and keyboard event handlers for Enter and Space keys",
        });
      }
    });
  }

  /**
   * Audit screen reader compatibility
   * Validates: Requirements 6.2, 6.5, 6.7, 6.8, 6.9, 6.16, 6.17
   */
  private async auditScreenReaderCompatibility(): Promise<void> {
    // Check for proper heading hierarchy
    const headings = this.getAllHeadings();
    const h1Count = headings.filter((h) => h.tagName === "H1").length;

    if (h1Count === 0) {
      this.reportIssue({
        severity: "critical",
        title: "Missing H1 heading (WCAG 2.4.6)",
        description: "Page has no H1 heading for screen readers to identify main page topic",
        component: "Global",
        stepsToReproduce: [
          "Use screen reader (NVDA, JAWS, or VoiceOver)",
          "Navigate by headings (H key in NVDA/JAWS)",
          "Notice no H1 heading announced",
        ],
        expectedBehavior: "Page should have exactly one H1 heading describing the main page content",
        actualBehavior: "No H1 found",
        suggestedFix: "Add H1 heading for main page title (e.g., <h1>Premium Airport Transfer Services</h1>)",
      });
    } else if (h1Count > 1) {
      this.reportIssue({
        severity: "major",
        title: "Multiple H1 headings (WCAG 2.4.6)",
        description: `Found ${h1Count} H1 headings. Multiple H1s can confuse screen reader users about page structure`,
        component: "Global",
        stepsToReproduce: [
          "Use screen reader heading navigation",
          `Notice ${h1Count} H1 headings announced`,
        ],
        expectedBehavior: "Page should have exactly one H1 heading",
        actualBehavior: `${h1Count} H1 headings found`,
        suggestedFix: "Use only one H1 for main page title, convert others to H2-H6 based on content hierarchy",
      });
    }

    // Check heading hierarchy for skipped levels
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        this.reportIssue({
          severity: "major",
          title: "Heading hierarchy skips levels",
          description: `Heading jumps from H${previousLevel} to H${level}, skipping levels`,
          component: "Global",
          stepsToReproduce: [
            "Use screen reader heading navigation",
            "Notice unexpected heading level jump",
          ],
          expectedBehavior: "Heading levels should not skip (H1 → H2 → H3, not H1 → H3)",
          actualBehavior: `Heading skips from H${previousLevel} to H${level}`,
          suggestedFix: `Change H${level} to H${previousLevel + 1} or add intermediate heading levels`,
        });
      }
      previousLevel = level;
    });

    // Check for landmark roles
    const landmarks = {
      banner: this.query('[role="banner"], header:not([role])'),
      navigation: this.query('[role="navigation"], nav:not([role])'),
      main: this.query('[role="main"], main:not([role])'),
      contentinfo: this.query('[role="contentinfo"], footer:not([role])'),
    };

    Object.entries(landmarks).forEach(([landmark, element]) => {
      if (!element) {
        const landmarkName = landmark === "banner" ? "header" : 
                            landmark === "contentinfo" ? "footer" : 
                            landmark;
        this.reportIssue({
          severity: "major",
          title: `Missing ${landmark} landmark (WCAG 1.3.1)`,
          description: `No ${landmark} landmark found. Screen reader users rely on landmarks for efficient page navigation`,
          component: "Global",
          stepsToReproduce: [
            "Use screen reader landmark navigation (D key in NVDA/JAWS)",
            `Notice no ${landmark} landmark available`,
          ],
          expectedBehavior: `${landmark} landmark should be present for screen reader navigation`,
          actualBehavior: `No ${landmark} landmark found`,
          suggestedFix: `Add <${landmarkName}> element or add role="${landmark}" to appropriate container`,
        });
      }
    });

    // Check for multiple navigation landmarks without labels
    const navLandmarks = this.queryAll('[role="navigation"], nav');
    if (navLandmarks.length > 1) {
      navLandmarks.forEach((nav) => {
        const hasLabel = nav.hasAttribute("aria-label") || nav.hasAttribute("aria-labelledby");
        if (!hasLabel) {
          this.reportIssue({
            severity: "major",
            title: "Multiple navigation landmarks without unique labels",
            description: "When multiple navigation landmarks exist, each must have a unique label for screen reader users",
            component: "Navigation",
            stepsToReproduce: [
              "Use screen reader landmark navigation",
              "Notice multiple navigation landmarks with same announcement",
            ],
            expectedBehavior: "Each navigation landmark should have unique aria-label (e.g., 'Main navigation', 'Footer navigation')",
            actualBehavior: "Navigation landmark has no distinguishing label",
            suggestedFix: "Add aria-label='Main navigation' or aria-label='Footer navigation' to distinguish navigation landmarks",
          });
        }
      });
    }

    // Check image alt text
    const images = this.getAllImages();
    images.forEach((img) => {
      const alt = img.getAttribute("alt");
      const isDecorative = img.getAttribute("role") === "presentation" || 
                          img.getAttribute("role") === "none" ||
                          alt === "";
      const src = img.getAttribute("src") || "unknown";

      if (alt === null) {
        this.reportIssue({
          severity: "critical",
          title: "Image missing alt attribute (WCAG 1.1.1)",
          description: `Image ${src} has no alt attribute. Screen readers will announce the filename instead`,
          component: "Images",
          stepsToReproduce: [
            "Use screen reader to navigate images",
            "Hear filename announced instead of description",
          ],
          expectedBehavior: "All images should have alt attribute (descriptive text or empty string for decorative images)",
          actualBehavior: "Missing alt attribute",
          suggestedFix: 'Add alt="descriptive text" for meaningful images or alt="" for decorative images',
        });
      } else if (!isDecorative && alt.length < 3) {
        this.reportIssue({
          severity: "major",
          title: "Image alt text too short or not descriptive",
          description: `Image alt text "${alt}" is not descriptive enough for screen reader users`,
          component: "Images",
          stepsToReproduce: [
            "Use screen reader",
            `Hear "${alt}" announced, which doesn't convey image meaning`,
          ],
          expectedBehavior: "Alt text should describe image content and purpose",
          actualBehavior: `Alt text is "${alt}"`,
          suggestedFix: "Provide descriptive alt text explaining what the image shows and its purpose in context",
        });
      }

      // Check for redundant alt text
      if (alt && (alt.toLowerCase().includes("image of") || 
                  alt.toLowerCase().includes("picture of") ||
                  alt.toLowerCase().includes("photo of"))) {
        this.reportIssue({
          severity: "minor",
          title: "Redundant alt text",
          description: `Alt text "${alt}" includes redundant phrases like "image of" or "picture of"`,
          component: "Images",
          stepsToReproduce: [
            "Use screen reader",
            "Hear redundant announcement",
          ],
          expectedBehavior: "Alt text should be concise without redundant phrases (screen readers already announce 'image')",
          actualBehavior: `Alt text contains redundant phrase: "${alt}"`,
          suggestedFix: `Remove "image of" or "picture of" from alt text. Change to: "${alt.replace(/^(image|picture|photo) of /i, "")}"`,
        });
      }
    });

    // Check for text alternatives for non-text content
    const svgs = this.queryAll("svg");
    svgs.forEach((svg) => {
      const hasTitle = svg.querySelector("title");
      const hasAriaLabel = svg.hasAttribute("aria-label");
      const hasAriaLabelledBy = svg.hasAttribute("aria-labelledby");
      const isDecorative = svg.getAttribute("role") === "presentation" || 
                          svg.getAttribute("role") === "none" ||
                          svg.getAttribute("aria-hidden") === "true";

      if (!isDecorative && !hasTitle && !hasAriaLabel && !hasAriaLabelledBy) {
        this.reportIssue({
          severity: "major",
          title: "SVG missing text alternative (WCAG 1.1.1)",
          description: "SVG has no text alternative for screen readers",
          component: "Images",
          stepsToReproduce: [
            "Use screen reader",
            "Navigate to SVG",
            "Notice no description announced",
          ],
          expectedBehavior: "SVG should have <title> element, aria-label, or aria-labelledby",
          actualBehavior: "SVG has no text alternative",
          suggestedFix: "Add <title>Description</title> as first child of SVG, or add aria-label='Description'. For decorative SVGs, add aria-hidden='true'",
        });
      }
    });
  }

  /**
   * Audit ARIA labels and attributes
   * Validates: Requirements 6.7, 6.10
   */
  private async auditARIALabels(): Promise<void> {
    // Check buttons without accessible names
    const buttons = this.queryAll("button");
    buttons.forEach((button) => {
      const hasText = this.getTextContent(button).length > 0;
      const hasAriaLabel = button.hasAttribute("aria-label");
      const hasAriaLabelledBy = button.hasAttribute("aria-labelledby");
      const hasTitle = button.hasAttribute("title");

      if (!hasText && !hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
        this.reportIssue({
          severity: "critical",
          title: "Button missing accessible name (WCAG 4.1.2)",
          description: "Button has no text, aria-label, aria-labelledby, or title. Screen readers will announce 'button' with no context",
          component: "Buttons",
          stepsToReproduce: [
            "Use screen reader to navigate buttons",
            "Hear 'button' announced with no description",
          ],
          expectedBehavior: "Button should have accessible name describing its purpose",
          actualBehavior: "Button has no accessible name",
          suggestedFix: "Add visible text inside button, or add aria-label='descriptive text' for icon-only buttons",
        });
      }
    });

    // Check links without accessible names
    const links = this.getAllLinks();
    links.forEach((link) => {
      const hasText = this.getTextContent(link).length > 0;
      const hasAriaLabel = link.hasAttribute("aria-label");
      const hasTitle = link.hasAttribute("title");
      const hasAriaLabelledBy = link.hasAttribute("aria-labelledby");

      if (!hasText && !hasAriaLabel && !hasTitle && !hasAriaLabelledBy) {
        this.reportIssue({
          severity: "critical",
          title: "Link missing accessible name (WCAG 2.4.4, 4.1.2)",
          description: "Link has no text, aria-label, or title. Screen readers cannot describe link purpose",
          component: "Links",
          stepsToReproduce: [
            "Use screen reader to navigate links",
            "Hear 'link' announced with no description",
          ],
          expectedBehavior: "Link should have accessible name describing destination or purpose",
          actualBehavior: "Link has no accessible name",
          suggestedFix: "Add visible text inside link, or add aria-label='descriptive text' for icon-only links",
        });
      }

      // Check for generic link text
      const linkText = this.getTextContent(link).toLowerCase();
      const genericTexts = ["click here", "read more", "learn more", "here", "more"];
      if (genericTexts.includes(linkText)) {
        this.reportIssue({
          severity: "minor",
          title: "Link has generic text (WCAG 2.4.4)",
          description: `Link text "${linkText}" is not descriptive out of context`,
          component: "Links",
          stepsToReproduce: [
            "Use screen reader to list all links",
            `Hear multiple "${linkText}" links with no context`,
          ],
          expectedBehavior: "Link text should be descriptive and unique",
          actualBehavior: `Link text is generic: "${linkText}"`,
          suggestedFix: `Make link text more descriptive (e.g., "Read more about our services" instead of "Read more")`,
        });
      }
    });

    // Check form inputs for labels
    const inputs = this.queryAll("input:not([type='hidden']), select, textarea");
    inputs.forEach((input) => {
      const id = input.getAttribute("id");
      const type = input.getAttribute("type");
      const hasLabel = id && this.query(`label[for="${id}"]`);
      const hasAriaLabel = input.hasAttribute("aria-label");
      const hasAriaLabelledBy = input.hasAttribute("aria-labelledby");
      const hasTitle = input.hasAttribute("title");
      const isButton = type === "submit" || type === "button" || type === "reset";

      // Buttons don't need labels
      if (!isButton && !hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
        this.reportIssue({
          severity: "critical",
          title: "Form input missing label (WCAG 1.3.1, 3.3.2, 4.1.2)",
          description: "Input has no associated label. Screen reader users won't know what the input is for",
          component: "Forms",
          stepsToReproduce: [
            "Use screen reader to navigate form",
            "Hear input announced with no label",
          ],
          expectedBehavior: "Input should have associated <label> element or aria-label",
          actualBehavior: "No label found",
          suggestedFix: "Add <label for='inputId'>Label text</label> or aria-label='Label text' attribute",
        });
      }

      // Check for placeholder as label anti-pattern
      const placeholder = input.getAttribute("placeholder");
      if (placeholder && !hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        this.reportIssue({
          severity: "major",
          title: "Placeholder used as label (anti-pattern)",
          description: "Placeholder text is not a substitute for a label. It disappears when user types and has accessibility issues",
          component: "Forms",
          stepsToReproduce: [
            "Use screen reader",
            "Notice placeholder may not be announced as label",
            "Start typing and lose context",
          ],
          expectedBehavior: "Input should have persistent visible label",
          actualBehavior: "Only placeholder text present",
          suggestedFix: "Add visible <label> element. Placeholder can supplement label but not replace it",
        });
      }

      // Check required fields have indication
      if (input.hasAttribute("required")) {
        const label = id ? this.query(`label[for="${id}"]`) : null;
        const hasRequiredIndicator = label && 
          (this.getTextContent(label).includes("*") || 
           this.getTextContent(label).toLowerCase().includes("required"));
        const hasAriaRequired = input.getAttribute("aria-required") === "true";

        if (!hasRequiredIndicator && !hasAriaRequired) {
          this.reportIssue({
            severity: "major",
            title: "Required field not indicated (WCAG 3.3.2)",
            description: "Required field has no visual or programmatic indication",
            component: "Forms",
            stepsToReproduce: [
              "Use screen reader to navigate form",
              "Notice required field not announced as required",
            ],
            expectedBehavior: "Required fields should have visual indicator (*) and aria-required='true'",
            actualBehavior: "No required indication",
            suggestedFix: "Add aria-required='true' and visual indicator (e.g., asterisk) in label",
          });
        }
      }
    });

    // Check for proper ARIA roles
    const elementsWithRole = this.queryAll("[role]");
    const validRoles = [
      "alert", "alertdialog", "application", "article", "banner", "button",
      "checkbox", "complementary", "contentinfo", "dialog", "document",
      "feed", "figure", "form", "grid", "gridcell", "heading", "img",
      "link", "list", "listbox", "listitem", "main", "menu", "menubar",
      "menuitem", "navigation", "none", "note", "option", "presentation",
      "progressbar", "radio", "radiogroup", "region", "row", "rowgroup",
      "search", "separator", "slider", "spinbutton", "status", "switch",
      "tab", "table", "tablist", "tabpanel", "textbox", "timer", "toolbar",
      "tooltip", "tree", "treegrid", "treeitem"
    ];

    elementsWithRole.forEach((element) => {
      const role = element.getAttribute("role");
      if (role && !validRoles.includes(role)) {
        this.reportIssue({
          severity: "major",
          title: "Invalid ARIA role (WCAG 4.1.2)",
          description: `Element has invalid role="${role}". Invalid roles are ignored by assistive technologies`,
          component: "Global",
          stepsToReproduce: [
            "Validate ARIA roles",
            "Notice invalid role attribute",
          ],
          expectedBehavior: "Only valid ARIA roles should be used",
          actualBehavior: `Invalid role="${role}"`,
          suggestedFix: "Use valid ARIA role from WAI-ARIA specification or remove role attribute",
        });
      }
    });

    // Check for aria-hidden on focusable elements
    const ariaHiddenElements = this.queryAll("[aria-hidden='true']");
    ariaHiddenElements.forEach((element) => {
      const focusableChildren = element.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableChildren.length > 0) {
        this.reportIssue({
          severity: "critical",
          title: "Focusable element inside aria-hidden (WCAG 4.1.2)",
          description: "Element with aria-hidden='true' contains focusable elements, creating confusion for keyboard users",
          component: "Global",
          stepsToReproduce: [
            "Tab through page",
            "Notice focus moves to element that screen reader doesn't announce",
          ],
          expectedBehavior: "Focusable elements should not be inside aria-hidden containers",
          actualBehavior: "Focusable elements found inside aria-hidden",
          suggestedFix: "Remove aria-hidden, or add tabindex='-1' to focusable children, or restructure DOM",
        });
      }
    });

    // Check for redundant ARIA
    const buttonsWithRole = this.queryAll("button[role='button']");
    if (buttonsWithRole.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "Redundant ARIA role on button",
        description: "<button> elements already have implicit role='button', explicit role is redundant",
        component: "Buttons",
        stepsToReproduce: ["Inspect button elements"],
        expectedBehavior: "Use semantic HTML without redundant ARIA",
        actualBehavior: "button element has explicit role='button'",
        suggestedFix: "Remove role='button' from <button> elements",
      });
    }
  }

  /**
   * Audit semantic HTML usage
   * Validates: Requirements 6.8
   */
  private async auditSemanticHTML(): Promise<void> {
    // Check for divs that should be buttons
    const clickableDivs = this.queryAll('div[onclick], div[class*="click"], div[class*="button"]');
    clickableDivs.forEach((element) => {
      const hasRole = element.getAttribute("role") === "button";
      const hasTabindex = element.hasAttribute("tabindex");
      
      if (!hasRole || !hasTabindex) {
        this.reportIssue({
          severity: "major",
          title: "Div used instead of button (WCAG 4.1.2)",
          description: "Clickable div should be a <button> element for proper semantics and keyboard accessibility",
          component: "Global",
          stepsToReproduce: [
            "Use screen reader",
            "Try keyboard navigation",
            "Notice element not announced as button or not keyboard accessible",
          ],
          expectedBehavior: "Interactive elements should use semantic HTML (<button>)",
          actualBehavior: "Div used for interactive element",
          suggestedFix: "Replace <div onclick='...'> with <button type='button'>. If div is required for styling, add role='button' and tabindex='0' and keyboard handlers",
        });
      }
    });

    // Check for proper list markup
    const listLikeElements = this.queryAll('[class*="list"]:not(ul):not(ol), [class*="menu"]:not(ul):not(ol):not([role="menu"])');
    listLikeElements.forEach((element) => {
      const hasListRole = element.getAttribute("role") === "list";
      const hasMenuRole = element.getAttribute("role") === "menu";
      
      if (!hasListRole && !hasMenuRole) {
        this.reportIssue({
          severity: "minor",
          title: "List-like element not using semantic markup (WCAG 1.3.1)",
          description: "Element appears to be a list but doesn't use <ul>/<ol> or role='list'",
          component: "Global",
          stepsToReproduce: [
            "Use screen reader list navigation",
            "Notice element not announced as list",
          ],
          expectedBehavior: "Lists should use <ul> or <ol> elements with <li> children",
          actualBehavior: "Non-semantic element used for list",
          suggestedFix: "Use <ul><li>...</li></ul> or <ol><li>...</li></ol>, or add role='list' with child elements having role='listitem'",
        });
      }
    });

    // Check for proper table markup
    const tables = this.queryAll("table");
    tables.forEach((table) => {
      const hasCaption = table.querySelector("caption");
      const hasThead = table.querySelector("thead");
      const hasTh = table.querySelector("th");

      if (!hasCaption) {
        this.reportIssue({
          severity: "minor",
          title: "Table missing caption (WCAG 1.3.1)",
          description: "Table should have <caption> element to provide context for screen reader users",
          component: "Tables",
          stepsToReproduce: [
            "Use screen reader table navigation",
            "Notice no table description announced",
          ],
          expectedBehavior: "Table should have <caption> element describing table content",
          actualBehavior: "No caption found",
          suggestedFix: "Add <caption>Table description</caption> as first child of <table>",
        });
      }

      if (!hasThead || !hasTh) {
        this.reportIssue({
          severity: "major",
          title: "Table missing header cells (WCAG 1.3.1)",
          description: "Table should have <thead> and <th> elements for proper structure",
          component: "Tables",
          stepsToReproduce: [
            "Use screen reader table navigation",
            "Notice column headers not announced",
          ],
          expectedBehavior: "Table should have <thead> with <th> elements for column headers",
          actualBehavior: "Missing <thead> or <th> elements",
          suggestedFix: "Add <thead><tr><th>Header 1</th><th>Header 2</th></tr></thead> structure",
        });
      }
    });

    // Check for proper use of semantic sectioning elements
    const genericContainers = this.queryAll('div[class*="section"], div[class*="container"]');
    genericContainers.forEach((element) => {
      const hasRole = element.hasAttribute("role");
      const hasSemanticParent = element.closest("article, section, aside, nav, main, header, footer");
      
      if (!hasRole && !hasSemanticParent && element.children.length > 3) {
        this.reportIssue({
          severity: "minor",
          title: "Consider using semantic sectioning elements",
          description: "Large content sections should use semantic HTML5 elements for better document structure",
          component: "Global",
          stepsToReproduce: [
            "Use screen reader document navigation",
            "Notice lack of semantic structure",
          ],
          expectedBehavior: "Use <section>, <article>, <aside>, or <nav> for major content sections",
          actualBehavior: "Generic <div> used for major content section",
          suggestedFix: "Replace <div> with appropriate semantic element: <section> for thematic grouping, <article> for self-contained content, <aside> for tangential content",
        });
      }
    });

    // Check for proper use of <strong> and <em> vs <b> and <i>
    const boldElements = this.queryAll("b");
    if (boldElements.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "Use <strong> instead of <b> for semantic emphasis",
        description: "<b> is presentational, <strong> conveys semantic importance to screen readers",
        component: "Typography",
        stepsToReproduce: [
          "Use screen reader",
          "Notice <b> text not announced with emphasis",
        ],
        expectedBehavior: "Use <strong> for important text that should be emphasized",
        actualBehavior: "<b> elements found",
        suggestedFix: "Replace <b> with <strong> for semantically important text, or use CSS font-weight for purely visual styling",
      });
    }

    const italicElements = this.queryAll("i:not([class*='icon'])");
    if (italicElements.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "Use <em> instead of <i> for semantic emphasis",
        description: "<i> is presentational, <em> conveys semantic emphasis to screen readers",
        component: "Typography",
        stepsToReproduce: [
          "Use screen reader",
          "Notice <i> text not announced with emphasis",
        ],
        expectedBehavior: "Use <em> for emphasized text, <i> only for icons with appropriate aria-hidden",
        actualBehavior: "<i> elements found (excluding icons)",
        suggestedFix: "Replace <i> with <em> for semantically emphasized text, or use CSS font-style for purely visual styling",
      });
    }
  }

  /**
   * Audit color contrast ratios
   * Validates: Requirements 6.6, 6.13
   */
  private async auditColorContrast(): Promise<void> {
    // Check text color contrast
    const textElements = this.queryAll("p, h1, h2, h3, h4, h5, h6, a, button, span, li, label, td, th");

    textElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        const fontSize = parseFloat(style.fontSize);
        const fontWeight = parseInt(style.fontWeight);

        // Determine if text is "large" per WCAG definition
        // Large text: 18pt (24px) or larger, or 14pt (18.66px) bold or larger
        const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);

        // Only check if we have both colors and background is not transparent
        if (color && backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent") {
          const ratio = this.calculateContrastRatio(color, backgroundColor);

          // Check WCAG AA compliance
          if (!this.meetsContrastStandard(ratio, "AA", isLargeText)) {
            const requiredRatio = isLargeText ? "3:1" : "4.5:1";
            this.reportIssue({
              severity: "critical",
              title: `Insufficient color contrast (WCAG 1.4.3 Level AA)`,
              description: `Contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AA standard (requires ${requiredRatio} for ${isLargeText ? "large" : "normal"} text)`,
              component: "Typography",
              stepsToReproduce: [
                "Check color contrast with contrast checker tool",
                `Measure contrast between text (${color}) and background (${backgroundColor})`,
              ],
              expectedBehavior: isLargeText
                ? "Large text needs minimum 3:1 contrast ratio"
                : "Normal text needs minimum 4.5:1 contrast ratio",
              actualBehavior: `Contrast ratio is ${ratio.toFixed(2)}:1`,
              suggestedFix: `Adjust text color or background color to achieve ${requiredRatio} contrast. Consider using darker text or lighter background.`,
            });
          }

          // Check WCAG AAA compliance (enhanced contrast)
          if (!this.meetsContrastStandard(ratio, "AAA", isLargeText)) {
            const requiredRatio = isLargeText ? "4.5:1" : "7:1";
            this.reportIssue({
              severity: "minor",
              title: `Color contrast below AAA standard (WCAG 1.4.6 Level AAA)`,
              description: `Contrast ratio ${ratio.toFixed(2)}:1 meets AA but not AAA standard (requires ${requiredRatio})`,
              component: "Typography",
              stepsToReproduce: [
                "Check color contrast for AAA compliance",
              ],
              expectedBehavior: isLargeText
                ? "Large text needs minimum 4.5:1 for AAA"
                : "Normal text needs minimum 7:1 for AAA",
              actualBehavior: `Contrast ratio is ${ratio.toFixed(2)}:1`,
              suggestedFix: `For AAA compliance, increase contrast to ${requiredRatio}. This is an enhancement beyond AA requirements.`,
            });
          }
        }
      }
    });

    // Check focus indicator contrast
    const focusableElements = this.getAllInteractiveElements();
    focusableElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const outlineColor = style.outlineColor;
        const backgroundColor = style.backgroundColor;

        if (outlineColor && backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
          const ratio = this.calculateContrastRatio(outlineColor, backgroundColor);
          
          // Focus indicators need 3:1 contrast per WCAG 2.4.11 (Level AA)
          if (ratio < 3) {
            this.reportIssue({
              severity: "major",
              title: "Focus indicator has insufficient contrast (WCAG 2.4.11)",
              description: `Focus indicator contrast ${ratio.toFixed(2)}:1 is below required 3:1 minimum`,
              component: "Global",
              stepsToReproduce: [
                "Tab to element",
                "Observe focus indicator",
                "Measure contrast against adjacent colors",
              ],
              expectedBehavior: "Focus indicators must have at least 3:1 contrast ratio",
              actualBehavior: `Focus indicator contrast is ${ratio.toFixed(2)}:1`,
              suggestedFix: "Use a focus indicator color with at least 3:1 contrast against both the element and its background (e.g., gold #D1D1D1)",
            });
          }
        }
      }
    });

    // Check for color-only information
    const colorOnlyElements = this.queryAll('[class*="error"], [class*="success"], [class*="warning"], [class*="info"]');
    colorOnlyElements.forEach((element) => {
      const hasIcon = element.querySelector('[class*="icon"], svg');
      const hasText = this.getTextContent(element).length > 0;
      const hasAriaLabel = element.hasAttribute("aria-label");

      if (!hasIcon && !hasText && !hasAriaLabel) {
        this.reportIssue({
          severity: "major",
          title: "Information conveyed by color alone (WCAG 1.4.1)",
          description: "Status or information appears to be conveyed only by color without text or icons",
          component: "Global",
          stepsToReproduce: [
            "View element in grayscale",
            "Notice information is lost",
          ],
          expectedBehavior: "Information should not rely on color alone - use text labels or icons",
          actualBehavior: "Color appears to be only indicator",
          suggestedFix: "Add text label (e.g., 'Error:', 'Success:') or icon to supplement color coding",
        });
      }
    });
  }

  /**
   * Audit touch target sizes
   * Validates: Requirements 6.12
   */
  private async auditTouchTargets(): Promise<void> {
    const interactiveElements = this.getAllInteractiveElements();

    interactiveElements.forEach((element) => {
      const { width, height } = this.measureElementSize(element);
      const minSize = 44; // WCAG 2.5.5 Level AAA minimum

      // Check if element meets minimum touch target size
      if (width < minSize || height < minSize) {
        // Check if element has sufficient spacing to meet target size
        const style = this.getComputedStyle(element);
        const paddingTop = style ? parseFloat(style.paddingTop) : 0;
        const paddingBottom = style ? parseFloat(style.paddingBottom) : 0;
        const paddingLeft = style ? parseFloat(style.paddingLeft) : 0;
        const paddingRight = style ? parseFloat(style.paddingRight) : 0;

        const effectiveWidth = width + paddingLeft + paddingRight;
        const effectiveHeight = height + paddingTop + paddingBottom;

        if (effectiveWidth < minSize || effectiveHeight < minSize) {
          this.reportIssue({
            severity: "major",
            title: `Touch target too small (WCAG 2.5.5 Level AAA)`,
            description: `Interactive element is ${Math.round(width)}×${Math.round(height)}px (minimum ${minSize}×${minSize}px required for comfortable touch interaction)`,
            component: "Global",
            viewport: [this.context.viewport],
            stepsToReproduce: [
              "Measure interactive element size",
              "Try to tap element on touch device",
              "Notice difficulty hitting target",
            ],
            expectedBehavior: `Touch targets should be at least ${minSize}×${minSize}px for comfortable interaction`,
            actualBehavior: `Element is ${Math.round(width)}×${Math.round(height)}px`,
            suggestedFix: `Increase padding or min-width/min-height to ${minSize}px. Example: add class="min-w-[44px] min-h-[44px] p-2"`,
          });
        }
      }

      // Check spacing between touch targets
      const rect = element.getBoundingClientRect();
      const siblings = Array.from(element.parentElement?.children || [])
        .filter(child => child !== element && this.isInteractive(child));

      siblings.forEach((sibling) => {
        const siblingRect = sibling.getBoundingClientRect();
        const horizontalGap = Math.abs(rect.right - siblingRect.left);
        const verticalGap = Math.abs(rect.bottom - siblingRect.top);
        const minGap = 8; // Recommended minimum spacing

        if (horizontalGap < minGap && horizontalGap > 0) {
          this.reportIssue({
            severity: "minor",
            title: "Insufficient spacing between touch targets",
            description: `Only ${Math.round(horizontalGap)}px spacing between interactive elements (${minGap}px recommended)`,
            component: "Global",
            stepsToReproduce: [
              "Try to tap adjacent interactive elements on touch device",
              "Notice risk of mis-taps",
            ],
            expectedBehavior: `Interactive elements should have at least ${minGap}px spacing`,
            actualBehavior: `${Math.round(horizontalGap)}px spacing`,
            suggestedFix: `Add margin or gap between elements: gap-2 or mx-2`,
          });
        }
      });
    });
  }

  private async auditFocusManagement(): Promise<void> {
    // Check for focus management in SPAs
    const links = this.getAllLinks();
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) {
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target && !target.hasAttribute("tabindex")) {
          this.reportIssue({
            severity: "minor",
            title: "Skip link target not focusable",
            description: `Target element #${targetId} cannot receive focus`,
            component: "Navigation",
            stepsToReproduce: ["Click skip link", "Check if focus moves"],
            expectedBehavior: "Skip link target should be focusable",
            actualBehavior: "Target has no tabindex",
            suggestedFix: "Add tabindex='-1' to skip link target",
          });
        }
      }
    });

    // Check for focus restoration after modal close
    const modals = this.queryAll('[role="dialog"]');
    modals.forEach((modal) => {
      const closeButton = modal.querySelector('[aria-label*="close"], [data-close]');
      if (closeButton && !closeButton.hasAttribute("data-focus-restore")) {
        this.reportIssue({
          severity: "minor",
          title: "Modal may not restore focus on close",
          description: "Modal close button should restore focus to trigger",
          component: "Modal",
          stepsToReproduce: ["Open modal", "Close modal", "Check focus"],
          expectedBehavior: "Focus should return to element that opened modal",
          actualBehavior: "No focus restoration mechanism detected",
          suggestedFix: "Store reference to trigger element and restore focus on close",
        });
      }
    });
  }

  protected generateSummary(): string {
    return `Accessibility Expert audit found ${this.findings.length} WCAG 2.1 AA/AAA issues`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Ensure all interactive elements are keyboard accessible",
      "Provide proper ARIA labels and semantic HTML",
      "Meet WCAG AA color contrast standards (4.5:1 for text)",
      "Ensure touch targets meet 44x44px minimum size",
      "Implement proper focus management and indicators"
    );
    return recs;
  }
}
