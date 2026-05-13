/**
 * Content Strategist Expert Module
 * Evaluates content quality, tone, clarity, and conversion focus
 * 
 * **Validates: Requirements 1.3, 17.1-17.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class ContentStrategistExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("content_strategist", context);
  }

  async audit(): Promise<void> {
    await this.auditHeadingClarity();
    await this.auditBodyCopyScannability();
    await this.auditCTALanguage();
    await this.auditValuePropositions();
    await this.auditSocialProof();
    await this.auditContactInformation();
    await this.auditToneConsistency();
    await this.auditContentHierarchy();
  }

  private async auditHeadingClarity(): Promise<void> {
    const headings = this.getAllHeadings();

    headings.forEach((heading) => {
      const text = this.getTextContent(heading);

      // Check for empty headings
      if (text.length === 0) {
        this.reportIssue({
          severity: "major",
          title: "Empty heading found",
          description: `${heading.tagName} has no text content`,
          component: "Content",
          stepsToReproduce: ["Review page headings"],
          expectedBehavior: "All headings should have clear, descriptive text",
          actualBehavior: "Empty heading",
          suggestedFix: "Add descriptive text to heading or remove it",
        });
        return;
      }

      // Check for vague headings
      const vagueWords = ["things", "stuff", "items", "content", "information"];
      const hasVagueWords = vagueWords.some((word) =>
        text.toLowerCase().includes(word)
      );

      if (hasVagueWords) {
        this.reportIssue({
          severity: "minor",
          title: "Vague heading language",
          description: `Heading "${text}" uses non-specific language`,
          component: "Content",
          stepsToReproduce: ["Review heading text"],
          expectedBehavior: "Headings should be specific and descriptive",
          actualBehavior: `Vague language in: "${text}"`,
          suggestedFix: "Replace vague words with specific, descriptive terms",
        });
      }

      // Check for overly long headings
      if (text.length > 100) {
        this.reportIssue({
          severity: "minor",
          title: "Heading too long",
          description: `Heading is ${text.length} characters`,
          component: "Content",
          stepsToReproduce: ["Check heading length"],
          expectedBehavior: "Headings should be concise (under 100 characters)",
          actualBehavior: `${text.length} characters`,
          suggestedFix: "Shorten heading to improve scannability",
        });
      }

      // Check for all-caps headings (except H1 which might be stylistic)
      if (text === text.toUpperCase() && text.length > 5 && heading.tagName !== "H1") {
        this.reportIssue({
          severity: "minor",
          title: "All-caps heading reduces readability",
          description: `Heading "${text}" is all uppercase`,
          component: "Content",
          stepsToReproduce: ["Review heading case"],
          expectedBehavior: "Use sentence or title case for readability",
          actualBehavior: "All-caps text",
          suggestedFix: "Convert to sentence or title case",
        });
      }
    });
  }

  private async auditBodyCopyScannability(): Promise<void> {
    // Check paragraph lengths
    const paragraphs = this.queryAll("p");

    paragraphs.forEach((p) => {
      const text = this.getTextContent(p);
      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;

      // Check for overly long paragraphs
      if (wordCount > 100) {
        this.reportIssue({
          severity: "minor",
          title: "Paragraph too long for scanning",
          description: `Paragraph has ${wordCount} words`,
          component: "Content",
          stepsToReproduce: ["Review paragraph length"],
          expectedBehavior: "Paragraphs should be 50-100 words for scannability",
          actualBehavior: `${wordCount} words`,
          suggestedFix: "Break into shorter paragraphs or use bullet points",
        });
      }

      // Check for very short paragraphs (might be incomplete)
      if (wordCount > 0 && wordCount < 5) {
        this.reportIssue({
          severity: "minor",
          title: "Very short paragraph",
          description: `Paragraph has only ${wordCount} words`,
          component: "Content",
          stepsToReproduce: ["Review paragraph content"],
          expectedBehavior: "Paragraphs should be complete thoughts",
          actualBehavior: `Only ${wordCount} words`,
          suggestedFix: "Expand paragraph or combine with adjacent content",
        });
      }
    });

    // Check for use of lists (good for scannability)
    const lists = this.queryAll("ul, ol");
    const sections = this.queryAll("section, article, main");

    if (sections.length > 0 && lists.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "No lists found for scannability",
        description: "Page lacks bullet points or numbered lists",
        component: "Content",
        stepsToReproduce: ["Review content structure"],
        expectedBehavior: "Use lists to break up text and improve scannability",
        actualBehavior: "No lists found",
        suggestedFix: "Convert appropriate content to bullet points or numbered lists",
      });
    }

    // Check for text walls (large blocks without breaks)
    const headings = this.getAllHeadings();
    const mainContent = this.query("main") || (typeof document !== "undefined" ? document.body : null);
    
    if (mainContent) {
      const textContent = mainContent.textContent || "";
      const sentences = textContent.split(/[.!?]+/).filter((s) => s.trim().length > 0);

      if (sentences.length > 20 && headings.length < 3) {
        this.reportIssue({
          severity: "major",
          title: "Content lacks visual breaks",
          description: "Large amount of text without sufficient headings",
          component: "Content",
          stepsToReproduce: ["Review content structure"],
          expectedBehavior: "Break content with headings every 3-5 paragraphs",
          actualBehavior: "Insufficient heading structure",
          suggestedFix: "Add subheadings to break up content sections",
        });
      }
    }
  }

  private async auditCTALanguage(): Promise<void> {
    // Find potential CTA buttons
    const buttons = this.queryAll("button, a.button, [class*='btn'], [class*='cta']");

    buttons.forEach((button) => {
      const text = this.getTextContent(button).toLowerCase();

      // Check for weak CTA language
      const weakPhrases = ["click here", "submit", "go", "ok", "continue"];
      const hasWeakLanguage = weakPhrases.some((phrase) => text === phrase);

      if (hasWeakLanguage) {
        this.reportIssue({
          severity: "minor",
          title: "Weak CTA language",
          description: `Button text "${text}" is not action-oriented`,
          component: "Content",
          stepsToReproduce: ["Review CTA button text"],
          expectedBehavior: "CTAs should use specific, action-oriented language",
          actualBehavior: `Generic text: "${text}"`,
          suggestedFix: "Use specific action verbs (e.g., 'Book Your Ride', 'Get Quote', 'Start Journey')",
        });
      }

      // Check for empty buttons
      if (text.length === 0) {
        const hasAriaLabel = button.hasAttribute("aria-label");
        if (!hasAriaLabel) {
          this.reportIssue({
            severity: "major",
            title: "Button has no text",
            description: "CTA button is empty",
            component: "Content",
            stepsToReproduce: ["Review button content"],
            expectedBehavior: "Buttons should have clear, action-oriented text",
            actualBehavior: "Empty button",
            suggestedFix: "Add descriptive button text",
          });
        }
      }

      // Check for overly long button text
      if (text.length > 30) {
        this.reportIssue({
          severity: "minor",
          title: "Button text too long",
          description: `Button text is ${text.length} characters`,
          component: "Content",
          stepsToReproduce: ["Review button text length"],
          expectedBehavior: "Button text should be concise (under 30 characters)",
          actualBehavior: `${text.length} characters`,
          suggestedFix: "Shorten button text to key action phrase",
        });
      }
    });

    // Check for presence of primary CTAs
    const primaryCTAs = this.queryAll('[class*="primary"], [class*="cta-main"]');
    if (primaryCTAs.length === 0) {
      this.reportIssue({
        severity: "major",
        title: "No primary CTA identified",
        description: "Page lacks clear primary call-to-action",
        component: "Content",
        stepsToReproduce: ["Review page for primary CTA"],
        expectedBehavior: "Page should have clear primary action",
        actualBehavior: "No primary CTA found",
        suggestedFix: "Add prominent primary CTA button",
      });
    }
  }

  private async auditValuePropositions(): Promise<void> {
    // Check hero section for value proposition
    const hero = this.query('[class*="hero"], [id*="hero"], header + section');

    if (hero) {
      const heroText = this.getTextContent(hero);
      const wordCount = heroText.split(/\s+/).filter((w) => w.length > 0).length;

      if (wordCount < 10) {
        this.reportIssue({
          severity: "major",
          title: "Hero section lacks value proposition",
          description: "Hero section has minimal content",
          component: "Hero",
          stepsToReproduce: ["Review hero section content"],
          expectedBehavior: "Hero should clearly communicate value proposition",
          actualBehavior: `Only ${wordCount} words in hero`,
          suggestedFix: "Add clear value proposition explaining what you offer and why",
        });
      }

      // Check for benefit-focused language
      const benefitWords = ["save", "fast", "easy", "reliable", "professional", "quality", "best"];
      const hasBenefits = benefitWords.some((word) =>
        heroText.toLowerCase().includes(word)
      );

      if (!hasBenefits) {
        this.reportIssue({
          severity: "minor",
          title: "Hero lacks benefit-focused language",
          description: "Hero section doesn't emphasize customer benefits",
          component: "Hero",
          stepsToReproduce: ["Review hero messaging"],
          expectedBehavior: "Hero should highlight key benefits",
          actualBehavior: "No benefit-focused language detected",
          suggestedFix: "Add language that emphasizes customer benefits",
        });
      }
    }

    // Check for "Why Choose Us" or similar sections
    const whyChooseUs = this.query('[class*="why"], [id*="why"], [class*="benefits"]');

    if (!whyChooseUs) {
      this.reportIssue({
        severity: "minor",
        title: "No 'Why Choose Us' section",
        description: "Page lacks section explaining unique value",
        component: "Content",
        stepsToReproduce: ["Review page sections"],
        expectedBehavior: "Include section explaining competitive advantages",
        actualBehavior: "No 'Why Choose Us' section",
        suggestedFix: "Add section highlighting unique selling points",
      });
    }
  }

  private async auditSocialProof(): Promise<void> {
    // Check for testimonials
    const testimonials = this.queryAll('[class*="testimonial"], [class*="review"]');

    if (testimonials.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "No testimonials found",
        description: "Page lacks social proof through testimonials",
        component: "Content",
        stepsToReproduce: ["Review page for testimonials"],
        expectedBehavior: "Include customer testimonials for credibility",
        actualBehavior: "No testimonials",
        suggestedFix: "Add customer testimonials or reviews section",
      });
    } else {
      // Check testimonial quality
      testimonials.forEach((testimonial) => {
        const text = this.getTextContent(testimonial);
        const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;

        if (wordCount < 10) {
          this.reportIssue({
            severity: "minor",
            title: "Testimonial too short",
            description: `Testimonial has only ${wordCount} words`,
            component: "Testimonials",
            stepsToReproduce: ["Review testimonial content"],
            expectedBehavior: "Testimonials should be detailed and specific",
            actualBehavior: `Only ${wordCount} words`,
            suggestedFix: "Expand testimonial with specific details and benefits",
          });
        }
      });
    }

    // Check for trust badges or certifications
    const trustBadges = this.queryAll('[class*="trust"], [class*="badge"], [class*="certification"]');

    if (trustBadges.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "No trust indicators found",
        description: "Page lacks trust badges or certifications",
        component: "Content",
        stepsToReproduce: ["Review page for trust indicators"],
        expectedBehavior: "Display relevant certifications or trust badges",
        actualBehavior: "No trust indicators",
        suggestedFix: "Add trust badges, certifications, or partner logos",
      });
    }

    // Check for statistics or numbers (social proof)
    const statsSection = this.query('[class*="stats"], [class*="numbers"], [class*="metrics"]');
    if (!statsSection) {
      this.reportIssue({
        severity: "minor",
        title: "No statistics or metrics displayed",
        description: "Page lacks quantifiable achievements",
        component: "Content",
        stepsToReproduce: ["Review page for statistics"],
        expectedBehavior: "Display key metrics (customers served, years in business, etc.)",
        actualBehavior: "No statistics section",
        suggestedFix: "Add section with key business metrics and achievements",
      });
    }
  }

  private async auditContactInformation(): Promise<void> {
    // Check for phone number
    const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const bodyText = (typeof document !== "undefined" ? document.body.textContent : "") || "";
    const hasPhone = phonePattern.test(bodyText);

    if (!hasPhone) {
      this.reportIssue({
        severity: "major",
        title: "No phone number found",
        description: "Contact phone number not visible on page",
        component: "Contact",
        stepsToReproduce: ["Search page for phone number"],
        expectedBehavior: "Phone number should be easily accessible",
        actualBehavior: "No phone number found",
        suggestedFix: "Add visible phone number in header or contact section",
      });
    }

    // Check for email address
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const hasEmail = emailPattern.test(bodyText);

    if (!hasEmail) {
      this.reportIssue({
        severity: "minor",
        title: "No email address found",
        description: "Contact email not visible on page",
        component: "Contact",
        stepsToReproduce: ["Search page for email"],
        expectedBehavior: "Email should be accessible for contact",
        actualBehavior: "No email found",
        suggestedFix: "Add email address or contact form",
      });
    }

    // Check for contact section
    const contactSection = this.query('[class*="contact"], [id*="contact"], footer');

    if (!contactSection) {
      this.reportIssue({
        severity: "major",
        title: "No contact section found",
        description: "Page lacks dedicated contact area",
        component: "Contact",
        stepsToReproduce: ["Review page structure"],
        expectedBehavior: "Include clear contact section",
        actualBehavior: "No contact section",
        suggestedFix: "Add contact section with multiple contact methods",
      });
    }

    // Check for business hours
    const hoursKeywords = ["hours", "open", "available", "timing"];
    const hasHours = hoursKeywords.some((keyword) =>
      bodyText.toLowerCase().includes(keyword)
    );

    if (!hasHours) {
      this.reportIssue({
        severity: "minor",
        title: "Business hours not specified",
        description: "Operating hours not clearly stated",
        component: "Contact",
        stepsToReproduce: ["Search for business hours"],
        expectedBehavior: "Display business hours or availability",
        actualBehavior: "No hours information",
        suggestedFix: "Add business hours or 24/7 availability statement",
      });
    }
  }

  private async auditToneConsistency(): Promise<void> {
    // Check for consistent use of first/second person
    const bodyText = (typeof document !== "undefined" ? document.body.textContent : "") || "";
    const firstPersonCount = (bodyText.match(/\b(we|our|us)\b/gi) || []).length;
    const secondPersonCount = (bodyText.match(/\b(you|your)\b/gi) || []).length;

    if (firstPersonCount > 0 && secondPersonCount > 0) {
      const ratio = firstPersonCount / secondPersonCount;
      if (ratio > 3 || ratio < 0.33) {
        this.reportIssue({
          severity: "minor",
          title: "Inconsistent tone perspective",
          description: "Imbalanced use of first-person vs. second-person language",
          component: "Content",
          stepsToReproduce: ["Review content tone"],
          expectedBehavior: "Balance 'we/our' with 'you/your' for customer focus",
          actualBehavior: `Ratio: ${ratio.toFixed(2)}`,
          suggestedFix: "Balance company-focused and customer-focused language",
        });
      }
    }

    // Check for exclamation mark overuse
    const exclamationCount = (bodyText.match(/!/g) || []).length;
    const sentenceCount = (bodyText.match(/[.!?]+/g) || []).length;

    if (sentenceCount > 0 && exclamationCount / sentenceCount > 0.2) {
      this.reportIssue({
        severity: "minor",
        title: "Excessive exclamation marks",
        description: "Overuse of exclamation marks reduces professionalism",
        component: "Content",
        stepsToReproduce: ["Review punctuation usage"],
        expectedBehavior: "Use exclamation marks sparingly",
        actualBehavior: `${exclamationCount} exclamation marks in ${sentenceCount} sentences`,
        suggestedFix: "Reduce exclamation marks to maintain professional tone",
      });
    }

    // Check for jargon or complex language
    const complexWords = ["utilize", "leverage", "synergy", "paradigm", "facilitate"];
    const hasJargon = complexWords.some((word) =>
      bodyText.toLowerCase().includes(word)
    );

    if (hasJargon) {
      this.reportIssue({
        severity: "minor",
        title: "Business jargon detected",
        description: "Content uses complex or jargon-heavy language",
        component: "Content",
        stepsToReproduce: ["Review language complexity"],
        expectedBehavior: "Use clear, simple language",
        actualBehavior: "Jargon or complex words found",
        suggestedFix: "Replace jargon with simple, clear language",
      });
    }
  }

  private async auditContentHierarchy(): Promise<void> {
    // Check for logical heading progression
    const headings = this.getAllHeadings();
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.substring(1));

      // Check for skipped heading levels
      if (previousLevel > 0 && currentLevel > previousLevel + 1) {
        this.reportIssue({
          severity: "minor",
          title: "Heading hierarchy skips levels",
          description: `Heading jumps from H${previousLevel} to H${currentLevel}`,
          component: "Content",
          stepsToReproduce: ["Review heading structure"],
          expectedBehavior: "Heading levels should progress sequentially",
          actualBehavior: `Skipped from H${previousLevel} to H${currentLevel}`,
          suggestedFix: "Use sequential heading levels (H2 after H1, H3 after H2, etc.)",
        });
      }

      previousLevel = currentLevel;
    });

    // Check for content flow (intro -> body -> conclusion)
    const sections = this.queryAll("section, article");

    if (sections.length === 0) {
      this.reportIssue({
        severity: "minor",
        title: "No semantic sections defined",
        description: "Content lacks semantic structure",
        component: "Content",
        stepsToReproduce: ["Review page structure"],
        expectedBehavior: "Use <section> or <article> to organize content",
        actualBehavior: "No semantic sections",
        suggestedFix: "Wrap content in semantic <section> elements",
      });
    }

    // Check for FAQ section
    const faqSection = this.query('[class*="faq"], [id*="faq"]');
    const hasQuestions = this.queryAll('[class*="question"]').length > 0;

    if (!faqSection && !hasQuestions) {
      this.reportIssue({
        severity: "minor",
        title: "No FAQ section found",
        description: "Page lacks frequently asked questions",
        component: "Content",
        stepsToReproduce: ["Review page for FAQ"],
        expectedBehavior: "Include FAQ section to address common questions",
        actualBehavior: "No FAQ section",
        suggestedFix: "Add FAQ section with common customer questions",
      });
    }
  }

  protected generateSummary(): string {
    return `Content Strategist audit found ${this.findings.length} issues related to content quality, clarity, and conversion focus`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Use clear, descriptive headings that guide users through content",
      "Break up text with lists, subheadings, and short paragraphs",
      "Use action-oriented language in CTAs",
      "Prominently display value propositions and benefits",
      "Include social proof through testimonials and trust indicators",
      "Make contact information easily accessible",
      "Maintain consistent, professional tone throughout",
      "Organize content with logical hierarchy and flow"
    );
    return recs;
  }
}
