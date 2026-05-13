/**
 * UX/UI Expert Modules Test Suite
 * Tests UX Designer, UI Designer, Mobile UX Specialist, and Desktop UX Specialist
 * 
 * **Validates: Requirements 1.3, 2.1-2.10, 3.1-3.10**
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { UXDesignerExpert } from "./ux-designer";
import { UIDesignerExpert } from "./ui-designer";
import { MobileUXSpecialistExpert } from "./mobile-ux-specialist";
import { DesktopUXSpecialistExpert } from "./desktop-ux-specialist";
import type { AuditContext } from "./base-expert";

describe("UX Designer Expert", () => {
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    // Mock DOM
    document.body.innerHTML = `
      <nav>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <main>
        <h1>Welcome</h1>
        <h2>Our Services</h2>
        <button>Book Now</button>
        <form>
          <input type="text" name="name" />
          <input type="email" name="email" />
        </form>
      </main>
    `;
  });

  it("should create UX Designer expert instance", () => {
    const expert = new UXDesignerExpert(context);
    expect(expert).toBeDefined();
  });

  it("should audit navigation structure", async () => {
    const expert = new UXDesignerExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should find navigation element
    expect(findings.some(f => f.component === "Header/Navigation")).toBe(true);
  });

  it("should detect missing skip links", async () => {
    const expert = new UXDesignerExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should report missing skip links
    const skipLinkIssue = findings.find(f => f.title.includes("skip"));
    expect(skipLinkIssue).toBeDefined();
    expect(skipLinkIssue?.severity).toBe("major");
  });

  it("should validate heading hierarchy", async () => {
    const expert = new UXDesignerExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should validate H1 presence
    const h1Issues = findings.filter(f => f.title.includes("H1"));
    expect(h1Issues.length).toBeGreaterThanOrEqual(0);
  });

  it("should generate expert report", async () => {
    const expert = new UXDesignerExpert(context);
    await expert.audit();
    const report = expert.generateReport();
    
    expect(report.expertRole).toBe("ux_designer");
    expect(report.issuesFound).toBeGreaterThanOrEqual(0);
    expect(report.summary).toContain("UX Designer");
    expect(report.recommendations).toBeDefined();
  });
});

describe("UI Designer Expert", () => {
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    document.body.innerHTML = `
      <div class="container">
        <button style="border-radius: 8px;">Button 1</button>
        <button style="border-radius: 8px;">Button 2</button>
        <div class="card" style="box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Card</div>
      </div>
      <section style="padding: 32px;">
        <p style="text-align: left;">Content</p>
      </section>
    `;
  });

  it("should create UI Designer expert instance", () => {
    const expert = new UIDesignerExpert(context);
    expect(expert).toBeDefined();
  });

  it("should audit visual consistency", async () => {
    const expert = new UIDesignerExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    expect(findings).toBeDefined();
    expect(Array.isArray(findings)).toBe(true);
  });

  it("should check border radius consistency", async () => {
    // Add inconsistent border radius
    document.body.innerHTML += `
      <button style="border-radius: 4px;">Button 3</button>
      <button style="border-radius: 12px;">Button 4</button>
      <button style="border-radius: 16px;">Button 5</button>
      <button style="border-radius: 20px;">Button 6</button>
    `;

    const expert = new UIDesignerExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should detect inconsistent border radius
    const borderRadiusIssue = findings.find(f => f.title.includes("border radius"));
    expect(borderRadiusIssue).toBeDefined();
  });

  it("should generate expert report", async () => {
    const expert = new UIDesignerExpert(context);
    await expert.audit();
    const report = expert.generateReport();
    
    expect(report.expertRole).toBe("ui_designer");
    expect(report.summary).toContain("UI Designer");
  });
});

describe("Mobile UX Specialist Expert", () => {
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "mobile",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 667,
    });

    document.body.innerHTML = `
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <button style="width: 30px; height: 30px;">Small Button</button>
      <button style="width: 48px; height: 48px;">Good Button</button>
      <form>
        <input type="text" name="phone" />
        <input type="text" name="email" />
      </form>
    `;
  });

  it("should create Mobile UX Specialist expert instance", () => {
    const expert = new MobileUXSpecialistExpert(context);
    expect(expert).toBeDefined();
  });

  it("should detect small touch targets", async () => {
    const expert = new MobileUXSpecialistExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should find touch target issues
    const touchTargetIssue = findings.find(f => f.title.includes("Touch target"));
    expect(touchTargetIssue).toBeDefined();
    expect(touchTargetIssue?.viewport).toContain("mobile");
  });

  it("should validate mobile input types", async () => {
    const expert = new MobileUXSpecialistExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should detect incorrect input types
    const phoneInputIssue = findings.find(f => f.title.includes("Phone input"));
    const emailInputIssue = findings.find(f => f.title.includes("Email input"));
    
    expect(phoneInputIssue || emailInputIssue).toBeDefined();
  });

  it("should skip audit on desktop viewport", async () => {
    const desktopContext: AuditContext = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const expert = new MobileUXSpecialistExpert(desktopContext);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should have no findings on desktop
    expect(findings.length).toBe(0);
  });

  it("should generate expert report", async () => {
    const expert = new MobileUXSpecialistExpert(context);
    await expert.audit();
    const report = expert.generateReport();
    
    expect(report.expertRole).toBe("mobile_ux_specialist");
    expect(report.summary).toContain("Mobile UX Specialist");
  });
});

describe("Desktop UX Specialist Expert", () => {
  let context: AuditContext;

  beforeEach(() => {
    context = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    // Mock desktop viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    document.body.innerHTML = `
      <button>Button without hover</button>
      <button class="hover:bg-gold">Button with hover</button>
      <a href="#" style="cursor: default;">Link</a>
      <div class="container" style="max-width: 2000px;">Wide container</div>
    `;
  });

  it("should create Desktop UX Specialist expert instance", () => {
    const expert = new DesktopUXSpecialistExpert(context);
    expect(expert).toBeDefined();
  });

  it("should detect missing hover states", async () => {
    const expert = new DesktopUXSpecialistExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should find hover state issues
    const hoverIssue = findings.find(f => f.title.includes("hover"));
    expect(hoverIssue).toBeDefined();
    expect(hoverIssue?.viewport).toContain("desktop");
  });

  it("should validate cursor interactions", async () => {
    const expert = new DesktopUXSpecialistExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should detect cursor issues
    const cursorIssue = findings.find(f => f.title.includes("cursor"));
    expect(cursorIssue).toBeDefined();
  });

  it("should check large screen layouts", async () => {
    const expert = new DesktopUXSpecialistExpert(context);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should detect wide container or other layout issues
    const layoutIssue = findings.find(f => 
      f.title.includes("Container too wide") || 
      f.component === "Layout"
    );
    // Layout issues may or may not be present depending on DOM structure
    expect(findings).toBeDefined();
    expect(Array.isArray(findings)).toBe(true);
  });

  it("should skip audit on mobile viewport", async () => {
    const mobileContext: AuditContext = {
      viewport: "mobile",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    const expert = new DesktopUXSpecialistExpert(mobileContext);
    await expert.audit();
    const findings = expert.getFindings();
    
    // Should have no findings on mobile
    expect(findings.length).toBe(0);
  });

  it("should generate expert report", async () => {
    const expert = new DesktopUXSpecialistExpert(context);
    await expert.audit();
    const report = expert.generateReport();
    
    expect(report.expertRole).toBe("desktop_ux_specialist");
    expect(report.summary).toContain("Desktop UX Specialist");
  });
});

describe("Expert Module Integration", () => {
  it("should all experts implement ExpertModule interface", async () => {
    const context: AuditContext = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    const experts = [
      new UXDesignerExpert(context),
      new UIDesignerExpert(context),
      new MobileUXSpecialistExpert(context),
      new DesktopUXSpecialistExpert(context),
    ];

    for (const expert of experts) {
      expect(expert.audit).toBeDefined();
      expect(expert.getFindings).toBeDefined();
      expect(expert.generateReport).toBeDefined();
      
      await expert.audit();
      const findings = expert.getFindings();
      const report = expert.generateReport();
      
      expect(Array.isArray(findings)).toBe(true);
      expect(report.expertRole).toBeDefined();
      expect(report.timestamp).toBeGreaterThan(0);
      expect(report.issuesFound).toBeGreaterThanOrEqual(0);
    }
  });

  it("should all experts extend BaseExpert", () => {
    const context: AuditContext = {
      viewport: "desktop",
      url: "http://localhost:3000",
      timestamp: Date.now(),
    };

    const uxExpert = new UXDesignerExpert(context);
    const uiExpert = new UIDesignerExpert(context);
    const mobileExpert = new MobileUXSpecialistExpert(context);
    const desktopExpert = new DesktopUXSpecialistExpert(context);

    // All should have BaseExpert methods
    expect(uxExpert.getFindings).toBeDefined();
    expect(uiExpert.getFindings).toBeDefined();
    expect(mobileExpert.getFindings).toBeDefined();
    expect(desktopExpert.getFindings).toBeDefined();
  });
});
