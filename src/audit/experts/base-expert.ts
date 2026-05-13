/**
 * Base expert module interface and abstract class
 * Provides shared audit utilities for DOM inspection and metric collection
 * 
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */

import type { Issue, ExpertRole, Viewport, IssueSeverity } from "../types";
import { getIssueTracker } from "../issue-tracker";

/**
 * Expert module interface
 * All expert modules must implement these methods
 */
export interface ExpertModule {
  /**
   * Execute the audit for this expert's domain
   */
  audit(): Promise<void>;

  /**
   * Get all findings discovered by this expert
   */
  getFindings(): Issue[];

  /**
   * Generate a report specific to this expert's perspective
   */
  generateReport(): ExpertReport;
}

/**
 * Expert report structure
 */
export interface ExpertReport {
  expertRole: ExpertRole;
  timestamp: number;
  issuesFound: number;
  criticalCount: number;
  majorCount: number;
  minorCount: number;
  enhancementCount: number;
  findings: Issue[];
  summary: string;
  recommendations: string[];
}

/**
 * Audit context provided to expert modules
 */
export interface AuditContext {
  viewport: Viewport;
  url: string;
  timestamp: number;
}

/**
 * Abstract base class for expert modules
 * Provides shared utilities for DOM inspection and metric collection
 */
export abstract class BaseExpert implements ExpertModule {
  protected expertRole: ExpertRole;
  protected context: AuditContext;
  protected issueTracker = getIssueTracker();
  protected findings: Issue[] = [];

  constructor(expertRole: ExpertRole, context: AuditContext) {
    this.expertRole = expertRole;
    this.context = context;
  }

  /**
   * Execute the audit (must be implemented by subclasses)
   */
  abstract audit(): Promise<void>;

  /**
   * Get all findings discovered by this expert
   */
  getFindings(): Issue[] {
    return this.findings;
  }

  /**
   * Generate a report specific to this expert's perspective
   */
  generateReport(): ExpertReport {
    const criticalCount = this.findings.filter(
      (f) => f.severity === "critical"
    ).length;
    const majorCount = this.findings.filter(
      (f) => f.severity === "major"
    ).length;
    const minorCount = this.findings.filter(
      (f) => f.severity === "minor"
    ).length;
    const enhancementCount = this.findings.filter(
      (f) => f.severity === "enhancement"
    ).length;

    return {
      expertRole: this.expertRole,
      timestamp: Date.now(),
      issuesFound: this.findings.length,
      criticalCount,
      majorCount,
      minorCount,
      enhancementCount,
      findings: this.findings,
      summary: this.generateSummary(),
      recommendations: this.generateRecommendations(),
    };
  }

  /**
   * Generate summary text (can be overridden by subclasses)
   */
  protected generateSummary(): string {
    return `Found ${this.findings.length} issues from ${this.expertRole} perspective`;
  }

  /**
   * Generate recommendations (can be overridden by subclasses)
   */
  protected generateRecommendations(): string[] {
    return this.findings
      .filter((f) => f.severity === "critical" || f.severity === "major")
      .map((f) => f.suggestedFix);
  }

  /**
   * Report an issue and add to findings
   */
  protected reportIssue(params: {
    severity: IssueSeverity;
    title: string;
    description: string;
    component: string;
    viewport?: Viewport[];
    browsers?: string[];
    stepsToReproduce: string[];
    expectedBehavior: string;
    actualBehavior: string;
    suggestedFix: string;
    screenshot?: string;
  }): Issue {
    const issue = this.issueTracker.createIssue({
      ...params,
      viewport: params.viewport || [this.context.viewport],
      browsers: params.browsers || ["Chrome", "Firefox", "Safari", "Edge"],
      expertRole: this.expertRole,
    });

    this.findings.push(issue);
    return issue;
  }

  // ============================================================================
  // Shared DOM Inspection Utilities
  // ============================================================================

  /**
   * Query all elements matching a selector
   */
  protected queryAll(selector: string): Element[] {
    if (typeof document === "undefined") return [];
    return Array.from(document.querySelectorAll(selector));
  }

  /**
   * Query a single element
   */
  protected query(selector: string): Element | null {
    if (typeof document === "undefined") return null;
    return document.querySelector(selector);
  }

  /**
   * Check if element is visible in viewport
   */
  protected isElementVisible(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Check if element is in DOM
   */
  protected isElementInDOM(element: Element): boolean {
    return document.body.contains(element);
  }

  /**
   * Get computed style for element
   */
  protected getComputedStyle(element: Element): CSSStyleDeclaration | null {
    if (typeof window === "undefined") return null;
    return window.getComputedStyle(element);
  }

  /**
   * Get element dimensions
   */
  protected getElementDimensions(element: Element): {
    width: number;
    height: number;
    top: number;
    left: number;
  } {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    };
  }

  /**
   * Check if element has attribute
   */
  protected hasAttribute(element: Element, attr: string): boolean {
    return element.hasAttribute(attr);
  }

  /**
   * Get attribute value
   */
  protected getAttribute(element: Element, attr: string): string | null {
    return element.getAttribute(attr);
  }

  /**
   * Get text content
   */
  protected getTextContent(element: Element): string {
    return element.textContent?.trim() || "";
  }

  /**
   * Check if element is interactive
   */
  protected isInteractive(element: Element): boolean {
    const interactiveTags = [
      "A",
      "BUTTON",
      "INPUT",
      "SELECT",
      "TEXTAREA",
      "DETAILS",
    ];
    const hasTabIndex = element.hasAttribute("tabindex");
    const hasClickHandler =
      element.hasAttribute("onclick") ||
      element.getAttribute("role") === "button";

    return (
      interactiveTags.includes(element.tagName) ||
      hasTabIndex ||
      hasClickHandler
    );
  }

  /**
   * Get all interactive elements
   */
  protected getAllInteractiveElements(): Element[] {
    return this.queryAll(
      'a, button, input, select, textarea, [tabindex], [onclick], [role="button"]'
    );
  }

  /**
   * Get all images
   */
  protected getAllImages(): HTMLImageElement[] {
    return this.queryAll("img") as HTMLImageElement[];
  }

  /**
   * Get all links
   */
  protected getAllLinks(): HTMLAnchorElement[] {
    return this.queryAll("a") as HTMLAnchorElement[];
  }

  /**
   * Get all headings
   */
  protected getAllHeadings(): HTMLHeadingElement[] {
    return this.queryAll("h1, h2, h3, h4, h5, h6") as HTMLHeadingElement[];
  }

  /**
   * Get all form elements
   */
  protected getAllFormElements(): HTMLElement[] {
    return this.queryAll(
      "input, select, textarea, button[type=submit]"
    ) as HTMLElement[];
  }

  // ============================================================================
  // Shared Metric Collection Utilities
  // ============================================================================

  /**
   * Calculate color contrast ratio
   */
  protected calculateContrastRatio(
    foreground: string,
    background: string
  ): number {
    const getLuminance = (color: string): number => {
      // Parse RGB values
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 0;

      const [r, g, b] = rgb.map((val) => {
        const normalized = parseInt(val) / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : Math.pow((normalized + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if contrast meets WCAG standards
   */
  protected meetsContrastStandard(
    ratio: number,
    level: "AA" | "AAA",
    isLargeText: boolean = false
  ): boolean {
    if (level === "AA") {
      return isLargeText ? ratio >= 3 : ratio >= 4.5;
    } else {
      return isLargeText ? ratio >= 4.5 : ratio >= 7;
    }
  }

  /**
   * Measure element size
   */
  protected measureElementSize(element: Element): {
    width: number;
    height: number;
  } {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  /**
   * Check if touch target meets minimum size
   */
  protected meetsTouchTargetSize(
    element: Element,
    minSize: number = 44
  ): boolean {
    const { width, height } = this.measureElementSize(element);
    return width >= minSize && height >= minSize;
  }

  /**
   * Get page load metrics
   */
  protected getPageLoadMetrics(): {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number | null;
    firstContentfulPaint: number | null;
  } | null {
    if (typeof window === "undefined" || !window.performance) return null;

    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");

    return {
      domContentLoaded: navigation?.domContentLoadedEventEnd || 0,
      loadComplete: navigation?.loadEventEnd || 0,
      firstPaint: paint.find((p) => p.name === "first-paint")?.startTime || null,
      firstContentfulPaint:
        paint.find((p) => p.name === "first-contentful-paint")?.startTime ||
        null,
    };
  }

  /**
   * Count DOM nodes
   */
  protected countDOMNodes(): number {
    if (typeof document === "undefined") return 0;
    return document.getElementsByTagName("*").length;
  }

  /**
   * Get viewport dimensions
   */
  protected getViewportDimensions(): { width: number; height: number } {
    if (typeof window === "undefined") return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * Check if mobile viewport
   */
  protected isMobileViewport(): boolean {
    const { width } = this.getViewportDimensions();
    return width < 1024;
  }

  /**
   * Check if desktop viewport
   */
  protected isDesktopViewport(): boolean {
    return !this.isMobileViewport();
  }

  /**
   * Wait for element to appear
   */
  protected async waitForElement(
    selector: string,
    timeout: number = 5000
  ): Promise<Element | null> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const element = this.query(selector);
      if (element) return element;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return null;
  }

  /**
   * Simulate user interaction
   */
  protected simulateClick(element: Element): void {
    if (typeof window === "undefined") return;
    
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  }

  /**
   * Simulate keyboard interaction
   */
  protected simulateKeyPress(element: Element, key: string): void {
    const event = new KeyboardEvent("keydown", {
      key,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  }
}
