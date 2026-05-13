/**
 * Typography Expert Module
 * Validates font loading, hierarchy, readability, and design system compliance
 * Checks Cormorant for display, DM Sans for body, JetBrains Mono for code
 * 
 * **Validates: Requirements 1.3, 12.1-12.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class TypographyExpert extends BaseExpert {
  private readonly DISPLAY_FONT = "Cormorant Garamond";
  private readonly BODY_FONT = "DM Sans";
  private readonly CODE_FONT = "JetBrains Mono";
  private readonly MIN_BODY_SIZE = 16;
  private readonly MAX_LINE_LENGTH = 75;
  private readonly IDEAL_LINE_HEIGHT_MIN = 1.5;
  private readonly IDEAL_LINE_HEIGHT_MAX = 1.7;

  constructor(context: AuditContext) {
    super("typography_expert", context);
  }

  async audit(): Promise<void> {
    await this.auditFontLoading();
    await this.auditFontUsage();
    await this.auditHeadingHierarchy();
    await this.auditLineHeight();
    await this.auditLineLength();
    await this.auditFontSizes();
    await this.auditTextContrast();
    await this.auditLetterSpacing();
    await this.auditTextOverflow();
  }

  private async auditFontLoading(): Promise<void> {
    // Check for font-display strategy
    const styles = this.queryAll("style");
    let hasFontDisplay = false;

    styles.forEach((style) => {
      const content = style.textContent || "";
      if (content.includes("@font-face") && content.includes("font-display")) {
        hasFontDisplay = true;
      }
    });

    if (!hasFontDisplay) {
      this.reportIssue({
        severity: "major",
        title: "Font loading strategy not defined",
        description: "No font-display property found in @font-face rules",
        component: "Typography",
        stepsToReproduce: ["Check @font-face rules in CSS"],
        expectedBehavior: "Should use font-display: swap to prevent FOIT",
        actualBehavior: "No font-display property",
        suggestedFix: "Add font-display: swap to @font-face rules",
      });
    }

    // Check for font preloading
    const fontPreloads = this.queryAll('link[rel="preload"][as="font"]');
    if (fontPreloads.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "Critical fonts not preloaded",
        description: "No font preload links found",
        component: "Typography",
        stepsToReproduce: ["Check <head> for font preload links"],
        expectedBehavior: "Critical fonts should be preloaded",
        actualBehavior: "No font preloading",
        suggestedFix: 'Add <link rel="preload" as="font" href="font.woff2" crossorigin>',
      });
    }
  }

  private async auditFontUsage(): Promise<void> {
    // Check display font usage (Cormorant Garamond)
    const headings = this.queryAll("h1, h2, .hero-headline, [class*='display']");
    headings.forEach((heading) => {
      const style = this.getComputedStyle(heading);
      if (style && !style.fontFamily.includes(this.DISPLAY_FONT)) {
        this.reportIssue({
          severity: "minor",
          title: "Display font not used for heading",
          description: `Heading using ${style.fontFamily} instead of ${this.DISPLAY_FONT}`,
          component: "Typography",
          stepsToReproduce: ["Inspect heading font-family"],
          expectedBehavior: `Display text should use ${this.DISPLAY_FONT}`,
          actualBehavior: `Using ${style.fontFamily}`,
          suggestedFix: `Apply font-family: '${this.DISPLAY_FONT}' to display text`,
        });
      }
    });

    // Check body font usage (DM Sans)
    const bodyText = this.queryAll("p, li, span, div");
    const bodyFontIssues = bodyText.filter((element) => {
      const style = this.getComputedStyle(element);
      return style && !style.fontFamily.includes(this.BODY_FONT) && 
             !style.fontFamily.includes(this.CODE_FONT) &&
             !style.fontFamily.includes(this.DISPLAY_FONT);
    });

    if (bodyFontIssues.length > 5) {
      this.reportIssue({
        severity: "minor",
        title: "Body font not consistently applied",
        description: `${bodyFontIssues.length} elements not using ${this.BODY_FONT}`,
        component: "Typography",
        stepsToReproduce: ["Inspect body text font-family"],
        expectedBehavior: `Body text should use ${this.BODY_FONT}`,
        actualBehavior: `${bodyFontIssues.length} elements using different fonts`,
        suggestedFix: `Apply font-family: '${this.BODY_FONT}' to body text`,
      });
    }

    // Check code font usage (JetBrains Mono)
    const codeElements = this.queryAll("code, pre, .route-code, [class*='mono']");
    codeElements.forEach((code) => {
      const style = this.getComputedStyle(code);
      if (style && !style.fontFamily.includes(this.CODE_FONT) && 
          !style.fontFamily.includes("monospace")) {
        this.reportIssue({
          severity: "minor",
          title: "Monospace font not used for code",
          description: `Code element using ${style.fontFamily}`,
          component: "Typography",
          stepsToReproduce: ["Inspect code element font-family"],
          expectedBehavior: `Code should use ${this.CODE_FONT}`,
          actualBehavior: `Using ${style.fontFamily}`,
          suggestedFix: `Apply font-family: '${this.CODE_FONT}' to code elements`,
        });
      }
    });
  }

  private async auditHeadingHierarchy(): Promise<void> {
    const headings = this.getAllHeadings();
    
    // Check for single H1
    const h1Count = headings.filter((h) => h.tagName === "H1").length;
    if (h1Count === 0) {
      this.reportIssue({
        severity: "critical",
        title: "Missing H1 heading",
        description: "Page has no H1 heading",
        component: "Typography",
        stepsToReproduce: ["Check heading structure"],
        expectedBehavior: "Page should have exactly one H1",
        actualBehavior: "No H1 found",
        suggestedFix: "Add H1 heading for main page title",
      });
    } else if (h1Count > 1) {
      this.reportIssue({
        severity: "major",
        title: "Multiple H1 headings",
        description: `Found ${h1Count} H1 headings`,
        component: "Typography",
        stepsToReproduce: ["Count H1 elements"],
        expectedBehavior: "Page should have exactly one H1",
        actualBehavior: `${h1Count} H1 headings found`,
        suggestedFix: "Use only one H1, convert others to H2-H6",
      });
    }

    // Check for skipped heading levels
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        this.reportIssue({
          severity: "major",
          title: "Skipped heading level",
          description: `Heading jumps from H${previousLevel} to H${level}`,
          component: "Typography",
          stepsToReproduce: ["Review heading hierarchy"],
          expectedBehavior: "Heading levels should not skip (H1→H2→H3)",
          actualBehavior: `Skipped from H${previousLevel} to H${level}`,
          suggestedFix: "Use sequential heading levels",
        });
      }
      previousLevel = level;
    });
  }

  private async auditLineHeight(): Promise<void> {
    const bodyText = this.queryAll("p, li");
    
    bodyText.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const lineHeight = parseFloat(style.lineHeight) / parseFloat(style.fontSize);
        
        if (lineHeight < this.IDEAL_LINE_HEIGHT_MIN) {
          this.reportIssue({
            severity: "minor",
            title: "Line height too tight",
            description: `Line height is ${lineHeight.toFixed(2)}`,
            component: "Typography",
            stepsToReproduce: ["Measure line height"],
            expectedBehavior: `Line height should be ${this.IDEAL_LINE_HEIGHT_MIN}-${this.IDEAL_LINE_HEIGHT_MAX}`,
            actualBehavior: `Line height is ${lineHeight.toFixed(2)}`,
            suggestedFix: "Increase line-height to 1.5-1.7 for better readability",
          });
        } else if (lineHeight > 2) {
          this.reportIssue({
            severity: "minor",
            title: "Line height too loose",
            description: `Line height is ${lineHeight.toFixed(2)}`,
            component: "Typography",
            stepsToReproduce: ["Measure line height"],
            expectedBehavior: `Line height should be ${this.IDEAL_LINE_HEIGHT_MIN}-${this.IDEAL_LINE_HEIGHT_MAX}`,
            actualBehavior: `Line height is ${lineHeight.toFixed(2)}`,
            suggestedFix: "Reduce line-height to 1.5-1.7 for optimal readability",
          });
        }
      }
    });
  }

  private async auditLineLength(): Promise<void> {
    const paragraphs = this.queryAll("p");
    
    paragraphs.forEach((p) => {
      const text = this.getTextContent(p);
      const words = text.split(/\s+/).length;
      const avgCharsPerWord = 5;
      const estimatedChars = words * avgCharsPerWord;
      const style = this.getComputedStyle(p);
      
      if (style) {
        const width = parseFloat(style.width);
        const fontSize = parseFloat(style.fontSize);
        const charsPerLine = Math.floor(width / (fontSize * 0.5));
        
        if (charsPerLine > this.MAX_LINE_LENGTH && estimatedChars > 100) {
          this.reportIssue({
            severity: "minor",
            title: "Line length too long for readability",
            description: `Estimated ${charsPerLine} characters per line`,
            component: "Typography",
            stepsToReproduce: ["Measure paragraph width"],
            expectedBehavior: `Line length should be under ${this.MAX_LINE_LENGTH} characters`,
            actualBehavior: `Approximately ${charsPerLine} characters per line`,
            suggestedFix: "Add max-width constraint or increase font size",
          });
        }
      }
    });
  }

  private async auditFontSizes(): Promise<void> {
    // Check minimum font size on mobile
    if (this.isMobileViewport()) {
      const bodyText = this.queryAll("p, li, span, div");
      
      bodyText.forEach((element) => {
        const style = this.getComputedStyle(element);
        if (style) {
          const fontSize = parseFloat(style.fontSize);
          
          if (fontSize < this.MIN_BODY_SIZE && this.getTextContent(element).length > 20) {
            this.reportIssue({
              severity: "major",
              title: "Font size too small on mobile",
              description: `Font size is ${fontSize}px`,
              component: "Typography",
              stepsToReproduce: ["Check font size on mobile viewport"],
              expectedBehavior: `Body text should be at least ${this.MIN_BODY_SIZE}px on mobile`,
              actualBehavior: `Font size is ${fontSize}px`,
              suggestedFix: `Increase font size to ${this.MIN_BODY_SIZE}px minimum`,
            });
          }
        }
      });
    }

    // Check for consistent font scale
    const allText = this.queryAll("p, h1, h2, h3, h4, h5, h6, li, span");
    const fontSizes = new Set<number>();
    
    allText.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        fontSizes.add(Math.round(parseFloat(style.fontSize)));
      }
    });

    if (fontSizes.size > 12) {
      this.reportIssue({
        severity: "minor",
        title: "Too many font sizes",
        description: `Found ${fontSizes.size} different font sizes`,
        component: "Typography",
        stepsToReproduce: ["Audit all font sizes"],
        expectedBehavior: "Use consistent type scale (6-8 sizes)",
        actualBehavior: `${fontSizes.size} different font sizes`,
        suggestedFix: "Consolidate to type scale using clamp() or design tokens",
      });
    }
  }

  private async auditTextContrast(): Promise<void> {
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
            title: "Insufficient text contrast",
            description: `Contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AA`,
            component: "Typography",
            stepsToReproduce: ["Check color contrast"],
            expectedBehavior: isLargeText ? "3:1 minimum" : "4.5:1 minimum",
            actualBehavior: `${ratio.toFixed(2)}:1`,
            suggestedFix: "Adjust text or background color for better contrast",
          });
        }
      }
    });
  }

  private async auditLetterSpacing(): Promise<void> {
    // Check uppercase text for letter spacing
    const uppercaseElements = this.queryAll('[class*="uppercase"], [style*="text-transform: uppercase"]');
    
    uppercaseElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const letterSpacing = parseFloat(style.letterSpacing);
        
        if (letterSpacing < 0.5) {
          this.reportIssue({
            severity: "minor",
            title: "Uppercase text needs letter spacing",
            description: "Uppercase text has insufficient letter spacing",
            component: "Typography",
            stepsToReproduce: ["Check uppercase text letter-spacing"],
            expectedBehavior: "Uppercase text should have 0.05-0.1em letter spacing",
            actualBehavior: `Letter spacing is ${letterSpacing}px`,
            suggestedFix: "Add letter-spacing: 0.05em to uppercase text",
          });
        }
      }
    });
  }

  private async auditTextOverflow(): Promise<void> {
    const textElements = this.queryAll("p, h1, h2, h3, h4, h5, h6, span");
    
    textElements.forEach((element) => {
      const style = this.getComputedStyle(element);
      if (style) {
        const overflow = style.overflow;
        const textOverflow = style.textOverflow;
        
        if (overflow === "hidden" && textOverflow !== "ellipsis") {
          this.reportIssue({
            severity: "minor",
            title: "Text overflow without ellipsis",
            description: "Text may be cut off without indication",
            component: "Typography",
            stepsToReproduce: ["Check text overflow behavior"],
            expectedBehavior: "Hidden overflow should use text-overflow: ellipsis",
            actualBehavior: "No ellipsis indicator",
            suggestedFix: "Add text-overflow: ellipsis for truncated text",
          });
        }
      }
    });

    // Check for text wrapping issues
    const longWords = this.queryAll("p, span, div");
    longWords.forEach((element) => {
      const text = this.getTextContent(element);
      const words = text.split(/\s+/);
      const hasLongWord = words.some((word) => word.length > 20);
      
      if (hasLongWord) {
        const style = this.getComputedStyle(element);
        if (style && style.wordBreak === "normal" && style.overflowWrap === "normal") {
          this.reportIssue({
            severity: "minor",
            title: "Long words may overflow container",
            description: "Text contains long words without break strategy",
            component: "Typography",
            stepsToReproduce: ["Check text with long words on narrow viewport"],
            expectedBehavior: "Use word-break or overflow-wrap for long words",
            actualBehavior: "No word breaking strategy",
            suggestedFix: "Add overflow-wrap: break-word or word-break: break-word",
          });
        }
      }
    });
  }

  protected generateSummary(): string {
    return `Typography Expert audit found ${this.findings.length} issues related to fonts, hierarchy, and readability`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      `Use ${this.DISPLAY_FONT} for display text, ${this.BODY_FONT} for body`,
      "Implement font-display: swap to prevent FOIT",
      "Maintain logical heading hierarchy (H1→H2→H3)",
      "Ensure line height is 1.5-1.7 for body text",
      `Keep body text at least ${this.MIN_BODY_SIZE}px on mobile`
    );
    return recs;
  }
}
