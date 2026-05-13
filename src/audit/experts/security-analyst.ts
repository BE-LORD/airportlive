/**
 * Security Analyst Expert Module
 * Evaluates CSP, XSS, CSRF, and header validation
 * 
 * **Validates: Requirements 1.3, 8.1-8.15**
 */

import { BaseExpert, type AuditContext } from "./base-expert";

export class SecurityAnalystExpert extends BaseExpert {
  constructor(context: AuditContext) {
    super("security_analyst", context);
  }

  async audit(): Promise<void> {
    await this.auditSecurityHeaders();
    await this.auditXSSVulnerabilities();
    await this.auditCSRFProtection();
    await this.auditThirdPartyScripts();
    await this.auditDataExposure();
  }

  private async auditSecurityHeaders(): Promise<void> {
    // Note: In browser context, we can only check meta tags
    // Server headers would need to be checked server-side

    // Check for CSP meta tag
    const cspMeta = this.query('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      this.reportIssue({
        severity: "critical",
        title: "Missing Content Security Policy",
        description: "No CSP header or meta tag found",
        component: "Security",
        stepsToReproduce: ["Inspect <head> for CSP"],
        expectedBehavior: "CSP should be configured",
        actualBehavior: "No CSP found",
        suggestedFix: "Add CSP header or meta tag to prevent XSS attacks",
      });
    }

    // Check for X-Frame-Options (via meta tag or header)
    const frameOptions = this.query('meta[http-equiv="X-Frame-Options"]');
    if (!frameOptions) {
      this.reportIssue({
        severity: "major",
        title: "Missing X-Frame-Options protection",
        description: "Site may be vulnerable to clickjacking",
        component: "Security",
        stepsToReproduce: ["Check security headers"],
        expectedBehavior: "X-Frame-Options should be set to DENY or SAMEORIGIN",
        actualBehavior: "No X-Frame-Options found",
        suggestedFix: "Add X-Frame-Options: DENY header",
      });
    }

    // Check for HTTPS
    if (typeof window !== "undefined" && window.location.protocol !== "https:") {
      this.reportIssue({
        severity: "critical",
        title: "Site not using HTTPS",
        description: "Connection is not encrypted",
        component: "Security",
        stepsToReproduce: ["Check URL protocol"],
        expectedBehavior: "Site should use HTTPS",
        actualBehavior: "Using HTTP",
        suggestedFix: "Enable HTTPS and redirect HTTP to HTTPS",
      });
    }
  }

  private async auditXSSVulnerabilities(): Promise<void> {
    // Check for inline event handlers (potential XSS vectors)
    const elementsWithInlineEvents = this.queryAll(
      "[onclick], [onload], [onerror], [onmouseover]"
    );

    if (elementsWithInlineEvents.length > 0) {
      this.reportIssue({
        severity: "major",
        title: "Inline event handlers detected",
        description: `${elementsWithInlineEvents.length} elements with inline event handlers`,
        component: "Security",
        stepsToReproduce: ["Search for inline event handlers"],
        expectedBehavior: "Use addEventListener instead of inline handlers",
        actualBehavior: `${elementsWithInlineEvents.length} inline handlers found`,
        suggestedFix: "Replace inline event handlers with addEventListener",
      });
    }

    // Check for eval() usage in scripts
    const scripts = this.queryAll("script");
    scripts.forEach((script) => {
      const content = script.textContent || "";
      if (content.includes("eval(")) {
        this.reportIssue({
          severity: "critical",
          title: "eval() usage detected",
          description: "eval() can execute arbitrary code",
          component: "Security",
          stepsToReproduce: ["Search scripts for eval()"],
          expectedBehavior: "Avoid eval() for security",
          actualBehavior: "eval() found in script",
          suggestedFix: "Remove eval() and use safer alternatives",
        });
      }

      if (content.includes("innerHTML") && !content.includes("DOMPurify")) {
        this.reportIssue({
          severity: "major",
          title: "Unsafe innerHTML usage",
          description: "innerHTML without sanitization can lead to XSS",
          component: "Security",
          stepsToReproduce: ["Search for innerHTML usage"],
          expectedBehavior: "Sanitize HTML before using innerHTML",
          actualBehavior: "Unsanitized innerHTML detected",
          suggestedFix: "Use DOMPurify or textContent instead of innerHTML",
        });
      }
    });

    // Check for user input fields without proper validation
    const inputs = this.queryAll("input, textarea");
    inputs.forEach((input) => {
      const type = input.getAttribute("type");
      const hasPattern = input.hasAttribute("pattern");
      const hasMaxLength = input.hasAttribute("maxlength");

      if (type === "text" && !hasPattern && !hasMaxLength) {
        this.reportIssue({
          severity: "minor",
          title: "Input field lacks validation",
          description: "Text input has no pattern or maxlength validation",
          component: "Forms",
          stepsToReproduce: ["Inspect form inputs"],
          expectedBehavior: "Inputs should have validation attributes",
          actualBehavior: "No validation attributes",
          suggestedFix: "Add pattern and maxlength attributes for validation",
        });
      }
    });
  }

  private async auditCSRFProtection(): Promise<void> {
    // Check forms for CSRF tokens
    const forms = this.queryAll("form");

    forms.forEach((form, index) => {
      const method = form.getAttribute("method")?.toUpperCase();
      if (method === "POST") {
        const hasCSRFToken = form.querySelector(
          'input[name="csrf"], input[name="_csrf"], input[name="csrfToken"]'
        );

        if (!hasCSRFToken) {
          this.reportIssue({
            severity: "critical",
            title: "Form missing CSRF protection",
            description: `Form ${index + 1} has no CSRF token`,
            component: "Forms",
            stepsToReproduce: ["Inspect POST forms"],
            expectedBehavior: "POST forms should include CSRF token",
            actualBehavior: "No CSRF token found",
            suggestedFix: "Add hidden CSRF token input to form",
          });
        }
      }
    });

    // Check for SameSite cookie attribute (can only check if cookies are accessible)
    if (typeof document !== "undefined" && document.cookie) {
      const cookies = document.cookie.split(";");
      // Note: We can't directly check SameSite from JavaScript
      // This would need to be checked server-side
      this.reportIssue({
        severity: "minor",
        title: "Cookie security should be verified",
        description: "Ensure cookies have Secure, HttpOnly, and SameSite attributes",
        component: "Security",
        stepsToReproduce: ["Check cookie attributes in DevTools"],
        expectedBehavior: "Cookies should have Secure, HttpOnly, SameSite=Strict",
        actualBehavior: "Cannot verify from client-side",
        suggestedFix: "Set cookie attributes: Secure; HttpOnly; SameSite=Strict",
      });
    }
  }

  private async auditThirdPartyScripts(): Promise<void> {
    // Check for external scripts without SRI
    const externalScripts = this.queryAll('script[src^="http"]');

    externalScripts.forEach((script) => {
      const src = script.getAttribute("src") || "";
      const hasIntegrity = script.hasAttribute("integrity");

      if (!hasIntegrity && !src.includes(window.location.hostname)) {
        this.reportIssue({
          severity: "major",
          title: "External script without SRI",
          description: `Script ${src} lacks Subresource Integrity`,
          component: "Security",
          stepsToReproduce: ["Check external script tags"],
          expectedBehavior: "External scripts should have integrity attribute",
          actualBehavior: "No integrity attribute",
          suggestedFix: "Add integrity and crossorigin attributes to external scripts",
        });
      }
    });

    // Check for external stylesheets without SRI
    const externalStyles = this.queryAll('link[rel="stylesheet"][href^="http"]');

    externalStyles.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const hasIntegrity = link.hasAttribute("integrity");

      if (!hasIntegrity && !href.includes(window.location.hostname)) {
        this.reportIssue({
          severity: "minor",
          title: "External stylesheet without SRI",
          description: `Stylesheet ${href} lacks Subresource Integrity`,
          component: "Security",
          stepsToReproduce: ["Check external link tags"],
          expectedBehavior: "External stylesheets should have integrity attribute",
          actualBehavior: "No integrity attribute",
          suggestedFix: "Add integrity and crossorigin attributes to external stylesheets",
        });
      }
    });

    // Check for tracking scripts
    const trackingDomains = ["google-analytics.com", "googletagmanager.com", "facebook.net"];
    const trackingScripts = externalScripts.filter((script) => {
      const src = script.getAttribute("src") || "";
      return trackingDomains.some((domain) => src.includes(domain));
    });

    if (trackingScripts.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "Third-party tracking scripts detected",
        description: `${trackingScripts.length} tracking script(s) found`,
        component: "Privacy",
        stepsToReproduce: ["Check for analytics scripts"],
        expectedBehavior: "Consider privacy implications of tracking",
        actualBehavior: `${trackingScripts.length} tracking scripts`,
        suggestedFix: "Ensure GDPR compliance and cookie consent for tracking",
      });
    }
  }

  private async auditDataExposure(): Promise<void> {
    // Check for exposed API keys or secrets in scripts
    const scripts = this.queryAll("script");
    const sensitivePatterns = [
      /api[_-]?key/i,
      /secret/i,
      /password/i,
      /token/i,
      /private[_-]?key/i,
    ];

    scripts.forEach((script) => {
      const content = script.textContent || "";
      sensitivePatterns.forEach((pattern) => {
        if (pattern.test(content)) {
          this.reportIssue({
            severity: "critical",
            title: "Potential sensitive data exposure",
            description: "Script may contain API keys or secrets",
            component: "Security",
            stepsToReproduce: ["Inspect script content"],
            expectedBehavior: "No sensitive data in client-side code",
            actualBehavior: "Potential sensitive data found",
            suggestedFix: "Move sensitive data to environment variables on server",
          });
        }
      });
    });

    // Check for console.log statements in production
    scripts.forEach((script) => {
      const content = script.textContent || "";
      if (content.includes("console.log")) {
        this.reportIssue({
          severity: "minor",
          title: "console.log statements in production",
          description: "Debug statements may expose sensitive information",
          component: "Security",
          stepsToReproduce: ["Check browser console"],
          expectedBehavior: "Remove console.log in production",
          actualBehavior: "console.log statements present",
          suggestedFix: "Remove or disable console.log in production build",
        });
      }
    });

    // Check for exposed email addresses (spam protection)
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = document.body.textContent || "";
    const emails = bodyText.match(emailPattern);

    if (emails && emails.length > 0) {
      this.reportIssue({
        severity: "minor",
        title: "Email addresses exposed in plain text",
        description: `${emails.length} email address(es) found in page content`,
        component: "Privacy",
        stepsToReproduce: ["Search page for email addresses"],
        expectedBehavior: "Obfuscate or protect email addresses from scrapers",
        actualBehavior: "Plain text email addresses",
        suggestedFix: "Use contact forms or email obfuscation techniques",
      });
    }
  }

  protected generateSummary(): string {
    return `Security Analyst audit found ${this.findings.length} security vulnerabilities and concerns`;
  }

  protected generateRecommendations(): string[] {
    const recs = super.generateRecommendations();
    recs.push(
      "Implement Content Security Policy to prevent XSS attacks",
      "Add CSRF tokens to all POST forms",
      "Use Subresource Integrity for external scripts",
      "Remove sensitive data and debug statements from production",
      "Ensure HTTPS is enforced across the site"
    );
    return recs;
  }
}
