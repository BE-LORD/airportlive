/**
 * Unit tests for BaseExpert module
 * Tests the base expert module interface and abstract class
 * 
 * **Validates: Requirements 1.1, 1.3, 1.4**
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { BaseExpert, type AuditContext, type ExpertModule } from "./base-expert";
import type { Issue, ExpertRole } from "../types";

// Concrete implementation for testing
class TestExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("ux_designer", context);
  }

  async audit(): Promise<void> {
    // Test implementation
    this.reportIssue({
      severity: "major",
      title: "Test issue",
      description: "Test description",
      component: "Test component",
      stepsToReproduce: ["Step 1", "Step 2"],
      expectedBehavior: "Expected behavior",
      actualBehavior: "Actual behavior",
      suggestedFix: "Suggested fix",
    });
  }
}

describe("BaseExpert", () => {
  let expert: TestExpert;
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "mobile",
      url: "https://example.com",
      timestamp: Date.now(),
    };
    expert = new TestExpert(context);
  });

  describe("ExpertModule interface", () => {
    it("should implement audit() method", () => {
      expect(expert.audit).toBeDefined();
      expect(typeof expert.audit).toBe("function");
    });

    it("should implement getFindings() method", () => {
      expect(expert.getFindings).toBeDefined();
      expect(typeof expert.getFindings).toBe("function");
    });

    it("should implement generateReport() method", () => {
      expect(expert.generateReport).toBeDefined();
      expect(typeof expert.generateReport).toBe("function");
    });
  });

  describe("audit()", () => {
    it("should execute audit and create findings", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      expect(findings.length).toBeGreaterThan(0);
    });

    it("should report issues during audit", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      expect(findings[0]).toMatchObject({
        severity: "major",
        title: "Test issue",
        description: "Test description",
        component: "Test component",
      });
    });
  });

  describe("getFindings()", () => {
    it("should return empty array initially", () => {
      const findings = expert.getFindings();
      expect(findings).toEqual([]);
    });

    it("should return all findings after audit", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      expect(Array.isArray(findings)).toBe(true);
      expect(findings.length).toBe(1);
    });

    it("should return Issue objects with correct structure", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      const issue = findings[0];

      expect(issue).toHaveProperty("id");
      expect(issue).toHaveProperty("severity");
      expect(issue).toHaveProperty("status");
      expect(issue).toHaveProperty("title");
      expect(issue).toHaveProperty("description");
      expect(issue).toHaveProperty("component");
      expect(issue).toHaveProperty("viewport");
      expect(issue).toHaveProperty("browsers");
      expect(issue).toHaveProperty("expertRole");
      expect(issue).toHaveProperty("stepsToReproduce");
      expect(issue).toHaveProperty("expectedBehavior");
      expect(issue).toHaveProperty("actualBehavior");
      expect(issue).toHaveProperty("suggestedFix");
      expect(issue).toHaveProperty("createdAt");
      expect(issue).toHaveProperty("updatedAt");
    });
  });

  describe("generateReport()", () => {
    it("should generate report with correct structure", async () => {
      await expert.audit();
      const report = expert.generateReport();

      expect(report).toHaveProperty("expertRole");
      expect(report).toHaveProperty("timestamp");
      expect(report).toHaveProperty("issuesFound");
      expect(report).toHaveProperty("criticalCount");
      expect(report).toHaveProperty("majorCount");
      expect(report).toHaveProperty("minorCount");
      expect(report).toHaveProperty("enhancementCount");
      expect(report).toHaveProperty("findings");
      expect(report).toHaveProperty("summary");
      expect(report).toHaveProperty("recommendations");
    });

    it("should count issues by severity correctly", async () => {
      // Create expert with multiple issues
      class MultiIssueExpert extends BaseExpert {
        constructor(context: AuditContext) {
          super("ux_designer", context);
        }

        async audit(): Promise<void> {
          this.reportIssue({
            severity: "critical",
            title: "Critical issue",
            description: "Critical",
            component: "Test",
            stepsToReproduce: ["Step 1"],
            expectedBehavior: "Expected",
            actualBehavior: "Actual",
            suggestedFix: "Fix",
          });

          this.reportIssue({
            severity: "major",
            title: "Major issue",
            description: "Major",
            component: "Test",
            stepsToReproduce: ["Step 1"],
            expectedBehavior: "Expected",
            actualBehavior: "Actual",
            suggestedFix: "Fix",
          });

          this.reportIssue({
            severity: "minor",
            title: "Minor issue",
            description: "Minor",
            component: "Test",
            stepsToReproduce: ["Step 1"],
            expectedBehavior: "Expected",
            actualBehavior: "Actual",
            suggestedFix: "Fix",
          });

          this.reportIssue({
            severity: "enhancement",
            title: "Enhancement",
            description: "Enhancement",
            component: "Test",
            stepsToReproduce: ["Step 1"],
            expectedBehavior: "Expected",
            actualBehavior: "Actual",
            suggestedFix: "Fix",
          });
        }
      }

      const multiExpert = new MultiIssueExpert(context);
      await multiExpert.audit();
      const report = multiExpert.generateReport();

      expect(report.issuesFound).toBe(4);
      expect(report.criticalCount).toBe(1);
      expect(report.majorCount).toBe(1);
      expect(report.minorCount).toBe(1);
      expect(report.enhancementCount).toBe(1);
    });

    it("should include summary and recommendations", async () => {
      await expert.audit();
      const report = expert.generateReport();

      expect(typeof report.summary).toBe("string");
      expect(report.summary.length).toBeGreaterThan(0);
      expect(Array.isArray(report.recommendations)).toBe(true);
    });
  });

  describe("reportIssue()", () => {
    it("should create issue with provided parameters", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      const issue = findings[0];

      expect(issue.severity).toBe("major");
      expect(issue.title).toBe("Test issue");
      expect(issue.description).toBe("Test description");
      expect(issue.component).toBe("Test component");
      expect(issue.stepsToReproduce).toEqual(["Step 1", "Step 2"]);
      expect(issue.expectedBehavior).toBe("Expected behavior");
      expect(issue.actualBehavior).toBe("Actual behavior");
      expect(issue.suggestedFix).toBe("Suggested fix");
    });

    it("should set viewport from context if not provided", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      const issue = findings[0];

      expect(issue.viewport).toContain("mobile");
    });

    it("should set default browsers if not provided", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      const issue = findings[0];

      expect(issue.browsers).toEqual(["Chrome", "Firefox", "Safari", "Edge"]);
    });

    it("should set expertRole from expert instance", async () => {
      await expert.audit();
      const findings = expert.getFindings();
      const issue = findings[0];

      expect(issue.expertRole).toBe("ux_designer");
    });
  });

  describe("DOM Inspection Utilities", () => {
    beforeEach(() => {
      // Setup DOM
      document.body.innerHTML = `
        <div id="test-container">
          <button id="test-button" class="btn">Click me</button>
          <a href="#" id="test-link">Link</a>
          <img src="test.jpg" alt="Test image" id="test-image" />
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <input type="text" id="test-input" />
          <select id="test-select"></select>
          <textarea id="test-textarea"></textarea>
        </div>
      `;
    });

    describe("queryAll()", () => {
      it("should query all elements matching selector", () => {
        const buttons = (expert as any).queryAll("button");
        expect(buttons.length).toBe(1);
        expect(buttons[0].id).toBe("test-button");
      });

      it("should return empty array if no matches", () => {
        const elements = (expert as any).queryAll(".nonexistent");
        expect(elements).toEqual([]);
      });
    });

    describe("query()", () => {
      it("should query single element", () => {
        const button = (expert as any).query("#test-button");
        expect(button).not.toBeNull();
        expect(button?.id).toBe("test-button");
      });

      it("should return null if no match", () => {
        const element = (expert as any).query("#nonexistent");
        expect(element).toBeNull();
      });
    });

    describe("isElementVisible()", () => {
      it("should check if element is visible in viewport", () => {
        const button = document.getElementById("test-button")!;
        const isVisible = (expert as any).isElementVisible(button);
        expect(typeof isVisible).toBe("boolean");
      });
    });

    describe("isElementInDOM()", () => {
      it("should return true for element in DOM", () => {
        const button = document.getElementById("test-button")!;
        const inDOM = (expert as any).isElementInDOM(button);
        expect(inDOM).toBe(true);
      });

      it("should return false for element not in DOM", () => {
        const button = document.createElement("button");
        const inDOM = (expert as any).isElementInDOM(button);
        expect(inDOM).toBe(false);
      });
    });

    describe("getComputedStyle()", () => {
      it("should get computed style for element", () => {
        const button = document.getElementById("test-button")!;
        const style = (expert as any).getComputedStyle(button);
        expect(style).not.toBeNull();
      });
    });

    describe("getElementDimensions()", () => {
      it("should get element dimensions", () => {
        const button = document.getElementById("test-button")!;
        const dimensions = (expert as any).getElementDimensions(button);

        expect(dimensions).toHaveProperty("width");
        expect(dimensions).toHaveProperty("height");
        expect(dimensions).toHaveProperty("top");
        expect(dimensions).toHaveProperty("left");
        expect(typeof dimensions.width).toBe("number");
        expect(typeof dimensions.height).toBe("number");
      });
    });

    describe("hasAttribute()", () => {
      it("should check if element has attribute", () => {
        const button = document.getElementById("test-button")!;
        expect((expert as any).hasAttribute(button, "id")).toBe(true);
        expect((expert as any).hasAttribute(button, "data-test")).toBe(false);
      });
    });

    describe("getAttribute()", () => {
      it("should get attribute value", () => {
        const button = document.getElementById("test-button")!;
        expect((expert as any).getAttribute(button, "id")).toBe("test-button");
        expect((expert as any).getAttribute(button, "class")).toBe("btn");
      });

      it("should return null for non-existent attribute", () => {
        const button = document.getElementById("test-button")!;
        expect((expert as any).getAttribute(button, "data-test")).toBeNull();
      });
    });

    describe("getTextContent()", () => {
      it("should get trimmed text content", () => {
        const button = document.getElementById("test-button")!;
        expect((expert as any).getTextContent(button)).toBe("Click me");
      });
    });

    describe("isInteractive()", () => {
      it("should identify interactive elements", () => {
        const button = document.getElementById("test-button")!;
        const link = document.getElementById("test-link")!;
        const input = document.getElementById("test-input")!;

        expect((expert as any).isInteractive(button)).toBe(true);
        expect((expert as any).isInteractive(link)).toBe(true);
        expect((expert as any).isInteractive(input)).toBe(true);
      });

      it("should identify non-interactive elements", () => {
        const heading = document.querySelector("h1")!;
        expect((expert as any).isInteractive(heading)).toBe(false);
      });
    });

    describe("getAllInteractiveElements()", () => {
      it("should get all interactive elements", () => {
        const interactive = (expert as any).getAllInteractiveElements();
        expect(interactive.length).toBeGreaterThan(0);
      });
    });

    describe("getAllImages()", () => {
      it("should get all images", () => {
        const images = (expert as any).getAllImages();
        expect(images.length).toBe(1);
        expect(images[0].id).toBe("test-image");
      });
    });

    describe("getAllLinks()", () => {
      it("should get all links", () => {
        const links = (expert as any).getAllLinks();
        expect(links.length).toBe(1);
        expect(links[0].id).toBe("test-link");
      });
    });

    describe("getAllHeadings()", () => {
      it("should get all headings", () => {
        const headings = (expert as any).getAllHeadings();
        expect(headings.length).toBe(2);
      });
    });

    describe("getAllFormElements()", () => {
      it("should get all form elements", () => {
        const formElements = (expert as any).getAllFormElements();
        expect(formElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Metric Collection Utilities", () => {
    describe("calculateContrastRatio()", () => {
      it("should calculate contrast ratio between colors", () => {
        const ratio = (expert as any).calculateContrastRatio(
          "rgb(0, 0, 0)",
          "rgb(255, 255, 255)"
        );
        expect(ratio).toBeGreaterThan(20); // Black on white should be ~21:1
      });

      it("should handle same colors", () => {
        const ratio = (expert as any).calculateContrastRatio(
          "rgb(128, 128, 128)",
          "rgb(128, 128, 128)"
        );
        expect(ratio).toBeCloseTo(1, 1);
      });
    });

    describe("meetsContrastStandard()", () => {
      it("should check WCAG AA standard for normal text", () => {
        expect((expert as any).meetsContrastStandard(4.5, "AA", false)).toBe(true);
        expect((expert as any).meetsContrastStandard(4.4, "AA", false)).toBe(false);
      });

      it("should check WCAG AA standard for large text", () => {
        expect((expert as any).meetsContrastStandard(3, "AA", true)).toBe(true);
        expect((expert as any).meetsContrastStandard(2.9, "AA", true)).toBe(false);
      });

      it("should check WCAG AAA standard for normal text", () => {
        expect((expert as any).meetsContrastStandard(7, "AAA", false)).toBe(true);
        expect((expert as any).meetsContrastStandard(6.9, "AAA", false)).toBe(false);
      });

      it("should check WCAG AAA standard for large text", () => {
        expect((expert as any).meetsContrastStandard(4.5, "AAA", true)).toBe(true);
        expect((expert as any).meetsContrastStandard(4.4, "AAA", true)).toBe(false);
      });
    });

    describe("measureElementSize()", () => {
      it("should measure element size", () => {
        const button = document.getElementById("test-button")!;
        const size = (expert as any).measureElementSize(button);

        expect(size).toHaveProperty("width");
        expect(size).toHaveProperty("height");
        expect(typeof size.width).toBe("number");
        expect(typeof size.height).toBe("number");
      });
    });

    describe("meetsTouchTargetSize()", () => {
      it("should check if element meets minimum touch target size", () => {
        const button = document.getElementById("test-button")!;
        // Mock getBoundingClientRect to return specific size
        vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
          width: 50,
          height: 50,
          top: 0,
          left: 0,
          right: 50,
          bottom: 50,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        });

        expect((expert as any).meetsTouchTargetSize(button, 44)).toBe(true);
      });

      it("should return false for small elements", () => {
        const button = document.getElementById("test-button")!;
        vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
          width: 30,
          height: 30,
          top: 0,
          left: 0,
          right: 30,
          bottom: 30,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        });

        expect((expert as any).meetsTouchTargetSize(button, 44)).toBe(false);
      });
    });

    describe("countDOMNodes()", () => {
      it("should count DOM nodes", () => {
        const count = (expert as any).countDOMNodes();
        expect(typeof count).toBe("number");
        expect(count).toBeGreaterThan(0);
      });
    });

    describe("getViewportDimensions()", () => {
      it("should get viewport dimensions", () => {
        const dimensions = (expert as any).getViewportDimensions();
        expect(dimensions).toHaveProperty("width");
        expect(dimensions).toHaveProperty("height");
        expect(typeof dimensions.width).toBe("number");
        expect(typeof dimensions.height).toBe("number");
      });
    });

    describe("isMobileViewport()", () => {
      it("should detect mobile viewport", () => {
        const isMobile = (expert as any).isMobileViewport();
        expect(typeof isMobile).toBe("boolean");
      });
    });

    describe("isDesktopViewport()", () => {
      it("should detect desktop viewport", () => {
        const isDesktop = (expert as any).isDesktopViewport();
        expect(typeof isDesktop).toBe("boolean");
      });
    });
  });

  describe("User Interaction Utilities", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="test-button">Click me</button>
      `;
    });

    describe("simulateClick()", () => {
      it("should simulate click event", () => {
        const button = document.getElementById("test-button")!;
        const clickHandler = vi.fn();
        button.addEventListener("click", clickHandler);

        (expert as any).simulateClick(button);
        expect(clickHandler).toHaveBeenCalled();
      });
    });

    describe("simulateKeyPress()", () => {
      it("should simulate key press event", () => {
        const button = document.getElementById("test-button")!;
        const keyHandler = vi.fn();
        button.addEventListener("keydown", keyHandler);

        (expert as any).simulateKeyPress(button, "Enter");
        expect(keyHandler).toHaveBeenCalled();
      });
    });
  });

  describe("Async Utilities", () => {
    describe("waitForElement()", () => {
      it("should wait for element to appear", async () => {
        // Add element after delay
        setTimeout(() => {
          const div = document.createElement("div");
          div.id = "delayed-element";
          document.body.appendChild(div);
        }, 100);

        const element = await (expert as any).waitForElement("#delayed-element", 1000);
        expect(element).not.toBeNull();
        expect(element?.id).toBe("delayed-element");
      });

      it("should return null if element does not appear within timeout", async () => {
        const element = await (expert as any).waitForElement("#nonexistent", 100);
        expect(element).toBeNull();
      });
    });
  });
});
