/**
 * Color Theory Expert Module
 * Validates design system color tokens, palette consistency, and contrast ratios
 * Checks gold (#C8780A) and cream (#F6F1E7) usage, color blindness compatibility
 * 
 * **Validates: Requirements 1.3, 13.1-13.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class ColorTheoryExpert extends BaseExpert {
  private readonly GOLD = "#C8780A";
  private readonly CREAM = "#F6F1E7";
  private readonly INDIGO = "#1E2B4A";
  private readonly GRAIN_OPACITY = 0.035;

  constructor(context: AuditContext) {
    super("color_theory_expert", context);
  }

  async audit(): Promise<void> {
    await this.auditDesignSystemColors();
    await this.auditGoldAccentUsage();
    await this.auditCreamBackgroundUsage();
    await this.auditIndigoUsage();
    await this.auditContrastRatios();
    await this.auditColorBlindness();
    await this.auditGradients();
    await this.auditShadowColors();
    await this.auditPureBlackWhite();
  }

  private async auditDesignSystemColors(): Promise<void> {
    // Collect all colors used in the design
    const allElements = this.queryAll("*");
    const colorsUsed = new Set<string>();

    allElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        if (style.color && style.color !== "rgba(0, 0, 0, 0)") {
          colorsUsed.add(this.normalizeColor(style.color));
        }
        if (style.backgroundColor && style.backgroundColor !== "rgba(0, 0, 0, 0)") {
          colorsUsed.add(this.normalizeColor(style.backgroundColor));
        }
        if (style.borderColor && style.borderColor !== "rgba(0, 0, 0, 0)") {
          colorsUsed.add(this.normalizeColor(style.borderColor));
        }
      }
    });

    if (colorsUsed.size > 20) {
      this.reportIssue({
        severity: "minor",
        title: "Too many unique colors",
        description: `Found ${colorsUsed.size} unique colors in use`,
        component: "Color System",
        stepsToReproduce: ["Audit all colors used in design"],
        expectedBehavior: "Use consistent color palette (8-12 colors)",
        actualBehavior: `${colorsUsed.size} unique colors`,
        suggestedFix: "Consolidate to design system color tokens",
      });
    }
  }

  private async auditGoldAccentUsage(): Promise<void> {
    // Check if gold is used for primary actions
    const buttons = this.queryAll("button, .btn, [role='button']");
    const primaryButtons = buttons.filter((btn) =>
      btn.className.includes("primary") || btn.className.includes("cta")
    );

    primaryButtons.forEach((button) => {
      const style = this.getComputedStyle(button);
      if (style) {
        const bgColor = this.normalizeColor(style.backgroundColor);
        const textColor = this.normalizeColor(style.color);

        if (!this.isColorSimilar(bgColor, this.GOLD) && 
            !this.isColorSimilar(textColor, this.GOLD)) {
          this.reportIssue({
            severity: "minor",
            title: "Primary action not using gold accent",
            description: "Primary button should use gold color",
            component: "Buttons",
            stepsToReproduce: ["Inspect primary button colors"],
            expectedBehavior: `Primary actions should use ${this.GOLD}`,
            actualBehavior: `Using ${bgColor}`,
            suggestedFix: `Apply background-color: ${this.GOLD} to primary buttons`,
          });
        }
      }
    });

    // Check focus indicators use gold
    const focusableElements = this.getAllInteractiveElements();
    focusableElements.slice(0, 5).forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.outlineColor) {
        const outlineColor = this.normalizeColor(style.outlineColor);
        if (!this.isColorSimilar(outlineColor, this.GOLD) && 
            outlineColor !== "rgb(0, 0, 0)") {
          this.reportIssue({
            severity: "minor",
            title: "Focus indicator not using gold",
            description: "Focus outline should use brand gold color",
            component: "Accessibility",
            stepsToReproduce: ["Tab to element", "Check focus outline color"],
            expectedBehavior: `Focus indicators should use ${this.GOLD}`,
            actualBehavior: `Using ${outlineColor}`,
            suggestedFix: `Apply outline-color: ${this.GOLD} to focus states`,
          });
        }
      }
    });
  }

  private async auditCreamBackgroundUsage(): Promise<void> {
    // Check main page areas use cream background
    const mainSections = this.queryAll("main, section, body");
    
    mainSections.forEach((section) => {
      const style = this.getComputedStyle(section);
      if (style) {
        const bgColor = this.normalizeColor(style.backgroundColor);
        
        // Check if using cream or white
        if (!this.isColorSimilar(bgColor, this.CREAM) && 
            !this.isColorSimilar(bgColor, "#FFFFFF") &&
            bgColor !== "rgba(0, 0, 0, 0)") {
          this.reportIssue({
            severity: "minor",
            title: "Section not using cream background",
            description: `Section using ${bgColor} instead of cream`,
            component: "Layout",
            stepsToReproduce: ["Inspect section background colors"],
            expectedBehavior: `Main areas should use ${this.CREAM}`,
            actualBehavior: `Using ${bgColor}`,
            suggestedFix: `Apply background-color: ${this.CREAM} to main sections`,
          });
        }
      }
    });
  }

  private async auditIndigoUsage(): Promise<void> {
    // Check indigo is used for contrast sections
    const darkSections = this.queryAll('[class*="dark"], [class*="contrast"]');
    
    darkSections.forEach((section) => {
      const style = this.getComputedStyle(section);
      if (style) {
        const bgColor = this.normalizeColor(style.backgroundColor);
        
        if (!this.isColorSimilar(bgColor, this.INDIGO) && 
            !this.isColorSimilar(bgColor, "#000000")) {
          this.reportIssue({
            severity: "minor",
            title: "Dark section not using indigo",
            description: `Dark section using ${bgColor}`,
            component: "Layout",
            stepsToReproduce: ["Inspect dark section background"],
            expectedBehavior: `Dark sections should use ${this.INDIGO}`,
            actualBehavior: `Using ${bgColor}`,
            suggestedFix: `Apply background-color: ${this.INDIGO} to dark sections`,
          });
        }
      }
    });
  }

  private async auditContrastRatios(): Promise<void> {
    const textElements = this.queryAll("p, h1, h2, h3, h4, h5, h6, a, button, span, li");
    
    textElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.color && style.backgroundColor && 
          style.backgroundColor !== "rgba(0, 0, 0, 0)") {
        const fontSize = parseFloat(style.fontSize);
        const fontWeight = parseInt(style.fontWeight);
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
        
        const ratio = this.calculateContrastRatio(style.color, style.backgroundColor);
        
        if (!this.meetsContrastStandard(ratio, "AA", isLargeText)) {
          this.reportIssue({
            severity: "critical",
            title: "Insufficient color contrast",
            description: `Contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AA`,
            component: "Color System",
            stepsToReproduce: ["Check color contrast"],
            expectedBehavior: isLargeText ? "3:1 minimum" : "4.5:1 minimum",
            actualBehavior: `${ratio.toFixed(2)}:1`,
            suggestedFix: "Adjust text or background color for better contrast",
          });
        }
      }
    });
  }

  private async auditColorBlindness(): Promise<void> {
    // Check if information is conveyed by color alone
    const statusElements = this.queryAll('[class*="success"], [class*="error"], [class*="warning"]');
    
    statusElements.forEach((element) => {
      const hasIcon = element.querySelector("svg, [class*='icon']");
      const hasText = this.getTextContent(element).length > 0;
      
      if (!hasIcon && !hasText) {
        this.reportIssue({
          severity: "major",
          title: "Information conveyed by color alone",
          description: "Status indicator relies only on color",
          component: "Accessibility",
          stepsToReproduce: ["Check status indicators"],
          expectedBehavior: "Use icons or text in addition to color",
          actualBehavior: "Only color indicates status",
          suggestedFix: "Add icon or text label to status indicators",
        });
      }
    });

    // Check link differentiation
    const links = this.getAllLinks();
    links.forEach((link) => {
      const style = this.getComputedStyle(link);
      if (style) {
        const textDecoration = style.textDecoration;
        const fontWeight = parseInt(style.fontWeight);
        
        if (textDecoration === "none" && fontWeight < 600) {
          this.reportIssue({
            severity: "minor",
            title: "Links not distinguishable without color",
            description: "Links have no underline or bold weight",
            component: "Typography",
            stepsToReproduce: ["Check link styling"],
            expectedBehavior: "Links should have underline or bold weight",
            actualBehavior: "Links rely only on color",
            suggestedFix: "Add text-decoration: underline or increase font-weight",
          });
        }
      }
    });
  }

  private async auditGradients(): Promise<void> {
    const elementsWithGradient = this.queryAll('[style*="gradient"], [class*="gradient"]');
    
    elementsWithGradient.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.backgroundImage.includes("gradient")) {
        // Check if gradient has sufficient contrast
        const hasText = element.querySelector("p, h1, h2, h3, h4, h5, h6, span");
        if (hasText) {
          this.reportIssue({
            severity: "minor",
            title: "Text on gradient background",
            description: "Gradient may cause contrast issues",
            component: "Color System",
            stepsToReproduce: ["Check text on gradient"],
            expectedBehavior: "Ensure text contrast across entire gradient",
            actualBehavior: "Text on gradient background",
            suggestedFix: "Add text shadow or overlay to ensure contrast",
          });
        }
      }
    });
  }

  private async auditShadowColors(): Promise<void> {
    const shadowElements = this.queryAll('[style*="box-shadow"], .card, .elevated');
    const shadowColors = new Set<string>();
    
    shadowElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style && style.boxShadow !== "none") {
        // Extract shadow color from box-shadow
        const shadowMatch = style.boxShadow.match(/rgba?\([^)]+\)/);
        if (shadowMatch) {
          shadowColors.add(shadowMatch[0]);
        }
      }
    });

    // Check if shadows use warm colors (not pure black)
    shadowColors.forEach((color) => {
      if (color.includes("rgb(0, 0, 0") || color.includes("rgba(0, 0, 0")) {
        this.reportIssue({
          severity: "minor",
          title: "Shadow using pure black",
          description: "Shadows should use warm colors",
          component: "Color System",
          stepsToReproduce: ["Inspect box-shadow colors"],
          expectedBehavior: "Use warm shadow colors (brown/gold tints)",
          actualBehavior: "Using pure black shadows",
          suggestedFix: "Use rgba(23, 17, 10, 0.08) for warm shadows",
        });
      }
    });
  }

  private async auditPureBlackWhite(): Promise<void> {
    const allElements = this.queryAll("*");
    let pureBlackCount = 0;
    let pureWhiteCount = 0;

    allElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        if (this.isColorSimilar(style.color, "#000000")) pureBlackCount++;
        if (this.isColorSimilar(style.color, "#FFFFFF")) pureWhiteCount++;
        if (this.isColorSimilar(style.backgroundColor, "#000000")) pureBlackCount++;
        if (this.isColorSimilar(style.backgroundColor, "#FFFFFF")) pureWhiteCount++;
      }
    });

    if (pureBlackCount > 5) {
      this.reportIssue({
        severity: "minor",
        title: "Pure black (#000000) used",
        description: `${pureBlackCount} elements using pure black`,
        component: "Color System",
        stepsToReproduce: ["Audit color usage"],
        expectedBehavior: "Use off-black colors for softer appearance",
        actualBehavior: `${pureBlackCount} instances of pure black`,
        suggestedFix: "Replace with #17110A or similar off-black",
      });
    }

    if (pureWhiteCount > 10) {
      this.reportIssue({
        severity: "minor",
        title: "Pure white (#FFFFFF) overused",
        description: `${pureWhiteCount} elements using pure white`,
        component: "Color System",
        stepsToReproduce: ["Audit color usage"],
        expectedBehavior: "Use cream (#F6F1E7) for warmer appearance",
        actualBehavior: `${pureWhiteCount} instances of pure white`,
        suggestedFix: `Replace with ${this.CREAM} for brand consistency`,
      });
    }
  }

  // Helper methods
  private normalizeColor(color: string): string {
    // Convert rgb/rgba to hex for comparison
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]).toString(16).padStart(2, "0");
      const g = parseInt(rgbMatch[2]).toString(16).padStart(2, "0");
      const b = parseInt(rgbMatch[3]).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`.toUpperCase();
    }
    return color.toUpperCase();
  }

  private isColorSimilar(color1: string, color2: string, threshold: number = 10): boolean {
    const c1 = this.normalizeColor(color1);
    const c2 = this.normalizeColor(color2);
    
    if (c1 === c2) return true;
    
    // Extract RGB values
    const rgb1 = this.hexToRgb(c1);
    const rgb2 = this.hexToRgb(c2);
    
    if (!rgb1 || !rgb2) return false;
    
    // Calculate color distance
    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
    
    return distance < threshold;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  protected generateSummary(): string {
    return `Color Theory Expert audit found ${this.findings.length} issues related to palette consistency and contrast`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      `Use ${this.GOLD} for primary actions and focus indicators`,
      `Apply ${this.CREAM} background to main page areas`,
      "Ensure all text meets WCAG AA contrast standards (4.5:1)",
      "Don't convey information by color alone",
      "Avoid pure black (#000000) and excessive pure white (#FFFFFF)"
    );
    return recs;
  }
}
