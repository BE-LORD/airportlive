/**
 * Content Strategist Expert Module Tests
 * 
 * **Validates: Requirements 1.3, 17.1-17.15**
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { ContentStrategistExpert } from "./content-strategist";
import type { AuditContext } from "./base-expert";

describe("ContentStrategistExpert", () => {
  let expert: ContentStrategistExpert;
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "desktop",
      url: "https://example.com",
      timestamp: Date.now(),
    };

    // Setup DOM
    document.body.innerHTML = "";
  });

  describe("Heading Clarity Audit", () => {
    it("should detect empty headings", async () => {
      document.body.innerHTML = `
        <h1></h1>
        <h2>Valid Heading</h2>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const emptyHeadingIssue = findings.find((f) =>
        f.title.includes("Empty heading")
      );

      expect(emptyHeadingIssue).toBeDefined();
      expect(emptyHeadingIssue?.severity).toBe("major");
    });

    it("should detect vague heading language", async () => {
      document.body.innerHTML = `
        <h1>Our Things</h1>
        <h2>Some Stuff We Do</h2>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const vagueIssues = findings.filter((f) =>
        f.title.includes("Vague heading")
      );

      expect(vagueIssues.length).toBeGreaterThan(0);
    });

    it("should detect overly long headings", async () => {
      document.body.innerHTML = `
        <h2>This is an extremely long heading that goes on and on and on and provides way too much information for a heading element which should be concise</h2>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const longHeadingIssue = findings.find((f) =>
        f.title.includes("Heading too long")
      );

      expect(longHeadingIssue).toBeDefined();
    });

    it("should detect all-caps headings", async () => {
      document.body.innerHTML = `
        <h2>THIS IS ALL CAPS</h2>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const allCapsIssue = findings.find((f) =>
        f.title.includes("All-caps")
      );

      expect(allCapsIssue).toBeDefined();
    });
  });

  describe("Body Copy Scannability Audit", () => {
    it("should detect overly long paragraphs", async () => {
      const longText = "word ".repeat(150);
      document.body.innerHTML = `
        <p>${longText}</p>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const longParaIssue = findings.find((f) =>
        f.title.includes("Paragraph too long")
      );

      expect(longParaIssue).toBeDefined();
    });

    it("should detect very short paragraphs", async () => {
      document.body.innerHTML = `
        <p>Short.</p>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const shortParaIssue = findings.find((f) =>
        f.title.includes("Very short paragraph")
      );

      expect(shortParaIssue).toBeDefined();
    });

    it("should detect lack of lists", async () => {
      document.body.innerHTML = `
        <section>
          <p>Some content here</p>
          <p>More content here</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noListsIssue = findings.find((f) =>
        f.title.includes("No lists found")
      );

      expect(noListsIssue).toBeDefined();
    });
  });

  describe("CTA Language Audit", () => {
    it("should detect weak CTA language", async () => {
      document.body.innerHTML = `
        <button>Click Here</button>
        <button>Submit</button>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const weakCTAIssues = findings.filter((f) =>
        f.title.includes("Weak CTA")
      );

      expect(weakCTAIssues.length).toBeGreaterThan(0);
    });

    it("should detect empty buttons", async () => {
      document.body.innerHTML = `
        <button></button>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const emptyButtonIssue = findings.find((f) =>
        f.title.includes("Button has no text")
      );

      expect(emptyButtonIssue).toBeDefined();
      expect(emptyButtonIssue?.severity).toBe("major");
    });

    it("should detect overly long button text", async () => {
      document.body.innerHTML = `
        <button>This is a very long button text that should be shortened</button>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const longButtonIssue = findings.find((f) =>
        f.title.includes("Button text too long")
      );

      expect(longButtonIssue).toBeDefined();
    });

    it("should detect missing primary CTA", async () => {
      document.body.innerHTML = `
        <button>Regular Button</button>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noPrimaryCTAIssue = findings.find((f) =>
        f.title.includes("No primary CTA")
      );

      expect(noPrimaryCTAIssue).toBeDefined();
    });
  });

  describe("Value Propositions Audit", () => {
    it("should detect minimal hero content", async () => {
      document.body.innerHTML = `
        <section class="hero">
          <h1>Title</h1>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const minimalHeroIssue = findings.find((f) =>
        f.title.includes("Hero section lacks value proposition")
      );

      expect(minimalHeroIssue).toBeDefined();
    });

    it("should detect lack of benefit-focused language", async () => {
      document.body.innerHTML = `
        <section class="hero">
          <h1>Welcome to Our Website</h1>
          <p>We are a company that does things for people in various locations.</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noBenefitsIssue = findings.find((f) =>
        f.title.includes("Hero lacks benefit-focused")
      );

      expect(noBenefitsIssue).toBeDefined();
    });

    it("should detect missing 'Why Choose Us' section", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noWhyChooseUsIssue = findings.find((f) =>
        f.title.includes("No 'Why Choose Us'")
      );

      expect(noWhyChooseUsIssue).toBeDefined();
    });
  });

  describe("Social Proof Audit", () => {
    it("should detect missing testimonials", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noTestimonialsIssue = findings.find((f) =>
        f.title.includes("No testimonials")
      );

      expect(noTestimonialsIssue).toBeDefined();
    });

    it("should detect short testimonials", async () => {
      document.body.innerHTML = `
        <div class="testimonial">
          <p>Good service.</p>
        </div>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const shortTestimonialIssue = findings.find((f) =>
        f.title.includes("Testimonial too short")
      );

      expect(shortTestimonialIssue).toBeDefined();
    });

    it("should detect missing trust indicators", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noTrustIndicatorsIssue = findings.find((f) =>
        f.title.includes("No trust indicators")
      );

      expect(noTrustIndicatorsIssue).toBeDefined();
    });

    it("should detect missing statistics", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noStatsIssue = findings.find((f) =>
        f.title.includes("No statistics")
      );

      expect(noStatsIssue).toBeDefined();
    });
  });

  describe("Contact Information Audit", () => {
    it("should detect missing phone number", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Contact Us</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noPhoneIssue = findings.find((f) =>
        f.title.includes("No phone number")
      );

      expect(noPhoneIssue).toBeDefined();
      expect(noPhoneIssue?.severity).toBe("major");
    });

    it("should detect missing email", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Contact Us</h2>
          <p>Call us at 555-123-4567</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noEmailIssue = findings.find((f) =>
        f.title.includes("No email address")
      );

      expect(noEmailIssue).toBeDefined();
    });

    it("should detect missing contact section", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noContactSectionIssue = findings.find((f) =>
        f.title.includes("No contact section")
      );

      expect(noContactSectionIssue).toBeDefined();
    });

    it("should detect missing business hours", async () => {
      document.body.innerHTML = `
        <footer>
          <p>Contact: info@example.com</p>
          <p>Phone: 555-123-4567</p>
        </footer>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noHoursIssue = findings.find((f) =>
        f.title.includes("Business hours not specified")
      );

      expect(noHoursIssue).toBeDefined();
    });
  });

  describe("Tone Consistency Audit", () => {
    it("should detect inconsistent tone perspective", async () => {
      document.body.innerHTML = `
        <section>
          <p>We are the best. We offer great service. We have been in business for years.</p>
          <p>You can trust us.</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const inconsistentToneIssue = findings.find((f) =>
        f.title.includes("Inconsistent tone perspective")
      );

      expect(inconsistentToneIssue).toBeDefined();
    });

    it("should detect excessive exclamation marks", async () => {
      document.body.innerHTML = `
        <section>
          <p>Welcome! We're so excited! Book now! Amazing service!</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const excessiveExclamationIssue = findings.find((f) =>
        f.title.includes("Excessive exclamation marks")
      );

      expect(excessiveExclamationIssue).toBeDefined();
    });

    it("should detect business jargon", async () => {
      document.body.innerHTML = `
        <section>
          <p>We leverage synergy to facilitate paradigm shifts and utilize best practices.</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const jargonIssue = findings.find((f) =>
        f.title.includes("Business jargon")
      );

      expect(jargonIssue).toBeDefined();
    });
  });

  describe("Content Hierarchy Audit", () => {
    it("should detect skipped heading levels", async () => {
      document.body.innerHTML = `
        <h1>Main Title</h1>
        <h4>Skipped to H4</h4>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const skippedLevelsIssue = findings.find((f) =>
        f.title.includes("Heading hierarchy skips")
      );

      expect(skippedLevelsIssue).toBeDefined();
    });

    it("should detect missing semantic sections", async () => {
      document.body.innerHTML = `
        <div>
          <h2>Content</h2>
          <p>Some text</p>
        </div>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noSectionsIssue = findings.find((f) =>
        f.title.includes("No semantic sections")
      );

      expect(noSectionsIssue).toBeDefined();
    });

    it("should detect missing FAQ section", async () => {
      document.body.innerHTML = `
        <section>
          <h2>Our Services</h2>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const findings = expert.getFindings();
      const noFAQIssue = findings.find((f) =>
        f.title.includes("No FAQ section")
      );

      expect(noFAQIssue).toBeDefined();
    });
  });

  describe("Report Generation", () => {
    it("should generate comprehensive report", async () => {
      document.body.innerHTML = `
        <h1>Test Page</h1>
        <p>Some content</p>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const report = expert.generateReport();

      expect(report.expertRole).toBe("content_strategist");
      expect(report.issuesFound).toBeGreaterThan(0);
      expect(report.summary).toContain("Content Strategist");
      expect(report.recommendations.length).toBeGreaterThan(0);
    });

    it("should categorize issues by severity", async () => {
      document.body.innerHTML = `
        <h1></h1>
        <button></button>
        <section>
          <p>Short.</p>
        </section>
      `;

      expert = new ContentStrategistExpert(context);
      await expert.audit();

      const report = expert.generateReport();

      expect(report.criticalCount).toBeGreaterThanOrEqual(0);
      expect(report.majorCount).toBeGreaterThan(0);
      expect(report.minorCount).toBeGreaterThan(0);
    });
  });
});
