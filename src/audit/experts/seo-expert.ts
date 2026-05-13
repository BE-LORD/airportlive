/**
 * SEO Expert Module
 * Evaluates meta tags, structured data, and sitemap validation
 * 
 * **Validates: Requirements 1.3, 7.1-7.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class SEOExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("seo_expert", context);
  }

  async audit(): Promise<void> {
    await this.auditMetaTags();
    await this.auditStructuredData();
    await this.auditHeadingHierarchy();
    await this.auditInternalLinking();
    await this.auditTechnicalSEO();
  }

  private async auditMetaTags(): Promise<void> {
    // Check title tag
    const title = this.query("title");
    if (!title) {
      this.reportIssue({
        severity: "critical",
        title: "Missing title tag",
        description: "Page has no <title> element",
        component: "SEO",
        stepsToReproduce: ["Inspect <head> element"],
        expectedBehavior: "Page should have unique title (50-60 characters)",
        actualBehavior: "No title tag found",
        suggestedFix: "Add <title> tag with descriptive page title",
      });
    } else {
      const titleText = this.getTextContent(title);
      if (titleText.length < 30) {
        this.reportIssue({
          severity: "major",
          title: "Title tag too short",
          description: `Title is ${titleText.length} characters`,
          component: "SEO",
          stepsToReproduce: ["Check title length"],
          expectedBehavior: "Title should be 50-60 characters",
          actualBehavior: `Title is ${titleText.length} characters`,
          suggestedFix: "Expand title to include key information",
        });
      } else if (titleText.length > 60) {
        this.reportIssue({
          severity: "minor",
          title: "Title tag too long",
          description: `Title is ${titleText.length} characters`,
          component: "SEO",
          stepsToReproduce: ["Check title length"],
          expectedBehavior: "Title should be 50-60 characters",
          actualBehavior: `Title is ${titleText.length} characters`,
          suggestedFix: "Shorten title to avoid truncation in search results",
        });
      }
    }

    // Check meta description
    const metaDesc = this.query('meta[name="description"]');
    if (!metaDesc) {
      this.reportIssue({
        severity: "critical",
        title: "Missing meta description",
        description: "Page has no meta description",
        component: "SEO",
        stepsToReproduce: ["Inspect meta tags"],
        expectedBehavior: "Page should have unique description (150-160 characters)",
        actualBehavior: "No meta description",
        suggestedFix: 'Add <meta name="description" content="...">',
      });
    } else {
      const desc = metaDesc.getAttribute("content") || "";
      if (desc.length < 120) {
        this.reportIssue({
          severity: "major",
          title: "Meta description too short",
          description: `Description is ${desc.length} characters`,
          component: "SEO",
          stepsToReproduce: ["Check meta description length"],
          expectedBehavior: "Description should be 150-160 characters",
          actualBehavior: `Description is ${desc.length} characters`,
          suggestedFix: "Expand description to include more details",
        });
      } else if (desc.length > 160) {
        this.reportIssue({
          severity: "minor",
          title: "Meta description too long",
          description: `Description is ${desc.length} characters`,
          component: "SEO",
          stepsToReproduce: ["Check meta description length"],
          expectedBehavior: "Description should be 150-160 characters",
          actualBehavior: `Description is ${desc.length} characters`,
          suggestedFix: "Shorten description to avoid truncation",
        });
      }
    }

    // Check Open Graph tags
    const ogTags = {
      "og:title": this.query('meta[property="og:title"]'),
      "og:description": this.query('meta[property="og:description"]'),
      "og:image": this.query('meta[property="og:image"]'),
      "og:url": this.query('meta[property="og:url"]'),
      "og:type": this.query('meta[property="og:type"]'),
    };

    Object.entries(ogTags).forEach(([tag, element]) => {
      if (!element) {
        this.reportIssue({
          severity: "major",
          title: `Missing ${tag} tag`,
          description: "Open Graph tag missing for social sharing",
          component: "SEO",
          stepsToReproduce: ["Check Open Graph tags"],
          expectedBehavior: "All OG tags should be present",
          actualBehavior: `${tag} missing`,
          suggestedFix: `Add <meta property="${tag}" content="...">`,
        });
      }
    });

    // Check Twitter Card tags
    const twitterCard = this.query('meta[name="twitter:card"]');
    if (!twitterCard) {
      this.reportIssue({
        severity: "minor",
        title: "Missing Twitter Card tags",
        description: "No Twitter Card meta tags found",
        component: "SEO",
        stepsToReproduce: ["Check Twitter meta tags"],
        expectedBehavior: "Twitter Card tags should be present",
        actualBehavior: "No Twitter Card tags",
        suggestedFix: 'Add <meta name="twitter:card" content="summary_large_image">',
      });
    }

    // Check canonical URL
    const canonical = this.query('link[rel="canonical"]');
    if (!canonical) {
      this.reportIssue({
        severity: "major",
        title: "Missing canonical URL",
        description: "No canonical link tag found",
        component: "SEO",
        stepsToReproduce: ["Check for canonical tag"],
        expectedBehavior: "Page should have canonical URL",
        actualBehavior: "No canonical tag",
        suggestedFix: 'Add <link rel="canonical" href="...">',
      });
    }
  }

  private async auditStructuredData(): Promise<void> {
    // Check for JSON-LD structured data
    const jsonLdScripts = this.queryAll('script[type="application/ld+json"]');

    if (jsonLdScripts.length === 0) {
      this.reportIssue({
        severity: "major",
        title: "Missing structured data",
        description: "No JSON-LD structured data found",
        component: "SEO",
        stepsToReproduce: ["Check for JSON-LD scripts"],
        expectedBehavior: "Page should have structured data (Organization, LocalBusiness, etc.)",
        actualBehavior: "No structured data",
        suggestedFix: "Add JSON-LD structured data for rich snippets",
      });
    } else {
      // Validate JSON-LD syntax
      jsonLdScripts.forEach((script, index) => {
        try {
          const data = JSON.parse(script.textContent || "");
          if (!data["@context"] || !data["@type"]) {
            this.reportIssue({
              severity: "major",
              title: "Invalid structured data",
              description: `JSON-LD ${index + 1} missing @context or @type`,
              component: "SEO",
              stepsToReproduce: ["Validate JSON-LD"],
              expectedBehavior: "JSON-LD should have @context and @type",
              actualBehavior: "Missing required properties",
              suggestedFix: "Add @context and @type to JSON-LD",
            });
          }
        } catch (e) {
          this.reportIssue({
            severity: "critical",
            title: "Malformed structured data",
            description: `JSON-LD ${index + 1} has invalid JSON syntax`,
            component: "SEO",
            stepsToReproduce: ["Parse JSON-LD"],
            expectedBehavior: "Valid JSON syntax",
            actualBehavior: "JSON parse error",
            suggestedFix: "Fix JSON syntax in structured data",
          });
        }
      });
    }
  }

  private async auditHeadingHierarchy(): Promise<void> {
    const headings = this.getAllHeadings();
    const h1Count = headings.filter((h) => h.tagName === "H1").length;

    if (h1Count === 0) {
      this.reportIssue({
        severity: "critical",
        title: "Missing H1 heading",
        description: "Page has no H1 heading",
        component: "SEO",
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
        component: "SEO",
        stepsToReproduce: ["Check heading structure"],
        expectedBehavior: "Page should have exactly one H1",
        actualBehavior: `${h1Count} H1 headings`,
        suggestedFix: "Use only one H1, convert others to H2-H6",
      });
    }

    // Check for empty headings
    headings.forEach((heading) => {
      const text = this.getTextContent(heading);
      if (text.length === 0) {
        this.reportIssue({
          severity: "major",
          title: "Empty heading found",
          description: `${heading.tagName} has no text content`,
          component: "SEO",
          stepsToReproduce: ["Check heading content"],
          expectedBehavior: "Headings should have descriptive text",
          actualBehavior: "Empty heading",
          suggestedFix: "Add descriptive text to heading or remove it",
        });
      }
    });
  }

  private async auditInternalLinking(): Promise<void> {
    const links = this.getAllLinks();
    const internalLinks = links.filter((link) => {
      const href = link.getAttribute("href") || "";
      return href.startsWith("/") || href.startsWith("#") || href.includes(window.location.hostname);
    });

    if (internalLinks.length < 5) {
      this.reportIssue({
        severity: "minor",
        title: "Limited internal linking",
        description: `Only ${internalLinks.length} internal links found`,
        component: "SEO",
        stepsToReproduce: ["Count internal links"],
        expectedBehavior: "Good internal linking structure",
        actualBehavior: `Only ${internalLinks.length} internal links`,
        suggestedFix: "Add more internal links to improve site structure",
      });
    }

    // Check for broken anchor links
    const anchorLinks = links.filter((link) => link.getAttribute("href")?.startsWith("#"));
    anchorLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const targetId = href.substring(1);
      if (targetId && !document.getElementById(targetId)) {
        this.reportIssue({
          severity: "minor",
          title: "Broken anchor link",
          description: `Link to #${targetId} has no target`,
          component: "SEO",
          stepsToReproduce: ["Click anchor link"],
          expectedBehavior: "Anchor links should have valid targets",
          actualBehavior: `No element with id="${targetId}"`,
          suggestedFix: "Add target element or fix link href",
        });
      }
    });

    // Check for descriptive link text
    links.forEach((link) => {
      const text = this.getTextContent(link).toLowerCase();
      const genericTexts = ["click here", "read more", "here", "link", "more"];
      if (genericTexts.includes(text)) {
        this.reportIssue({
          severity: "minor",
          title: "Non-descriptive link text",
          description: `Link text "${text}" is not descriptive`,
          component: "SEO",
          stepsToReproduce: ["Review link text"],
          expectedBehavior: "Link text should describe destination",
          actualBehavior: `Generic text: "${text}"`,
          suggestedFix: "Use descriptive link text that explains destination",
        });
      }
    });
  }

  private async auditTechnicalSEO(): Promise<void> {
    // Check for robots meta tag
    const robotsMeta = this.query('meta[name="robots"]');
    if (robotsMeta) {
      const content = robotsMeta.getAttribute("content") || "";
      if (content.includes("noindex")) {
        this.reportIssue({
          severity: "critical",
          title: "Page set to noindex",
          description: "Page is blocked from search engines",
          component: "SEO",
          stepsToReproduce: ["Check robots meta tag"],
          expectedBehavior: "Page should be indexable",
          actualBehavior: "noindex directive found",
          suggestedFix: "Remove noindex if page should be indexed",
        });
      }
    }

    // Check viewport meta tag
    const viewport = this.query('meta[name="viewport"]');
    if (!viewport) {
      this.reportIssue({
        severity: "critical",
        title: "Missing viewport meta tag",
        description: "Page not optimized for mobile",
        component: "SEO",
        stepsToReproduce: ["Check viewport meta tag"],
        expectedBehavior: "Viewport meta tag should be present",
        actualBehavior: "No viewport tag",
        suggestedFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
      });
    }

    // Check for language declaration
    const htmlLang = document.documentElement.getAttribute("lang");
    if (!htmlLang) {
      this.reportIssue({
        severity: "major",
        title: "Missing language declaration",
        description: "HTML element has no lang attribute",
        component: "SEO",
        stepsToReproduce: ["Check <html> tag"],
        expectedBehavior: "HTML should have lang attribute",
        actualBehavior: "No lang attribute",
        suggestedFix: 'Add lang="en" to <html> tag',
      });
    }

    // Check image alt attributes
    const images = this.getAllImages();
    const imagesWithoutAlt = images.filter((img) => !img.hasAttribute("alt"));
    if (imagesWithoutAlt.length > 0) {
      this.reportIssue({
        severity: "major",
        title: "Images missing alt attributes",
        description: `${imagesWithoutAlt.length} images without alt text`,
        component: "SEO",
        stepsToReproduce: ["Check image alt attributes"],
        expectedBehavior: "All images should have alt text",
        actualBehavior: `${imagesWithoutAlt.length} images missing alt`,
        suggestedFix: "Add descriptive alt text to all images",
      });
    }
  }

  protected generateSummary(): string {
    return `SEO Expert audit found ${this.findings.length} issues related to meta tags, structured data, and technical SEO`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Add unique title and meta description to all pages",
      "Implement Open Graph and Twitter Card tags",
      "Add JSON-LD structured data for rich snippets",
      "Ensure proper heading hierarchy with single H1",
      "Use descriptive link text and alt attributes"
    );
    return recs;
  }
}
