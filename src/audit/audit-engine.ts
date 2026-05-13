/**
 * Audit Engine - Multi-Perspective Audit Orchestrator
 * Coordinates all 20+ expert modules and generates comprehensive reports
 * 
 * **Validates: Requirements 1.2, 1.5, 1.6, 1.7**
 */

import type { AuditContext, ExpertModule, ExpertReport } from "./experts/base-expert";
import type { AuditReport, DeviceCapabilities, FeatureSupport, PerformanceMetrics } from "./types";
import { getIssueTracker } from "./issue-tracker";
import { detectDeviceCapabilities } from "./utils/device-detection";
import { detectFeatureSupport } from "./utils/feature-detection";
import { getPerformanceMonitor } from "./utils/performance-monitor";

// Import all expert modules
import { UXDesignerExpert } from "./experts/ux-designer";
import { UIDesignerExpert } from "./experts/ui-designer";
import { MobileUXSpecialistExpert } from "./experts/mobile-ux-specialist";
import { DesktopUXSpecialistExpert } from "./experts/desktop-ux-specialist";
import { AccessibilityExpert } from "./experts/accessibility-expert";
import { PerformanceEngineerExpert } from "./experts/performance-engineer";
import { SecurityAnalystExpert } from "./experts/security-analyst";
import { SEOExpert } from "./experts/seo-expert";
import { ContentStrategistExpert } from "./experts/content-strategist";
import { AnimationDirectorExpert } from "./experts/animation-director-expert";
import { TypographyExpert } from "./experts/typography-expert";
import { ColorTheoryExpert } from "./experts/color-theory-expert";

/**
 * Audit Engine Configuration
 */
export interface AuditEngineConfig {
  /**
   * URL to audit (defaults to current page)
   */
  url?: string;

  /**
   * Viewport to test (defaults to current viewport)
   */
  viewport?: "mobile" | "desktop";

  /**
   * Expert modules to run (defaults to all)
   */
  experts?: string[];

  /**
   * Whether to run in parallel (defaults to true)
   */
  parallel?: boolean;

  /**
   * Timeout for each expert in milliseconds (defaults to 30000)
   */
  timeout?: number;
}

/**
 * Audit Engine Result
 */
export interface AuditEngineResult {
  report: AuditReport;
  expertReports: ExpertReport[];
  duration: number;
  errors: Array<{ expert: string; error: string }>;
}

/**
 * Audit Engine - Orchestrates all expert modules
 */
export class AuditEngine {
  private config: Required<AuditEngineConfig>;
  private issueTracker = getIssueTracker();
  private performanceMonitor = getPerformanceMonitor();

  constructor(config: AuditEngineConfig = {}) {
    this.config = {
      url: config.url || (typeof window !== "undefined" ? window.location.href : ""),
      viewport: config.viewport || this.detectViewport(),
      experts: config.experts || [],
      parallel: config.parallel !== false,
      timeout: config.timeout || 30000,
    };
  }

  /**
   * Detect current viewport type
   */
  private detectViewport(): "mobile" | "desktop" {
    if (typeof window === "undefined") return "desktop";
    return window.innerWidth < 1024 ? "mobile" : "desktop";
  }

  /**
   * Create audit context
   */
  private createContext(): AuditContext {
    return {
      viewport: this.config.viewport,
      url: this.config.url,
      timestamp: Date.now(),
    };
  }

  /**
   * Get all expert modules
   */
  private getAllExperts(context: AuditContext): ExpertModule[] {
    const experts: ExpertModule[] = [
      new UXDesignerExpert(context),
      new UIDesignerExpert(context),
      new MobileUXSpecialistExpert(context),
      new DesktopUXSpecialistExpert(context),
      new AccessibilityExpert(context),
      new PerformanceEngineerExpert(context),
      new SecurityAnalystExpert(context),
      new SEOExpert(context),
      new ContentStrategistExpert(context),
      new AnimationDirectorExpert(context),
      new TypographyExpert(context),
      new ColorTheoryExpert(context),
    ];

    // Filter by configured experts if specified
    if (this.config.experts.length > 0) {
      return experts.filter((expert) => {
        const report = expert.generateReport();
        return this.config.experts.includes(report.expertRole);
      });
    }

    return experts;
  }

  /**
   * Run a single expert with timeout
   */
  private async runExpertWithTimeout(
    expert: ExpertModule,
    timeout: number
  ): Promise<{ report: ExpertReport; error?: string }> {
    const expertReport = expert.generateReport();
    const expertName = expertReport.expertRole;

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout);
      });

      // Race between audit and timeout
      await Promise.race([expert.audit(), timeoutPromise]);

      return { report: expert.generateReport() };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Expert ${expertName} failed:`, errorMessage);
      return {
        report: expert.generateReport(),
        error: errorMessage,
      };
    }
  }

  /**
   * Run all experts in parallel
   */
  private async runExpertsParallel(
    experts: ExpertModule[]
  ): Promise<Array<{ report: ExpertReport; error?: string }>> {
    const promises = experts.map((expert) =>
      this.runExpertWithTimeout(expert, this.config.timeout)
    );

    return Promise.all(promises);
  }

  /**
   * Run all experts sequentially
   */
  private async runExpertsSequential(
    experts: ExpertModule[]
  ): Promise<Array<{ report: ExpertReport; error?: string }>> {
    const results: Array<{ report: ExpertReport; error?: string }> = [];

    for (const expert of experts) {
      const result = await this.runExpertWithTimeout(expert, this.config.timeout);
      results.push(result);
    }

    return results;
  }

  /**
   * Generate comprehensive audit report
   */
  private generateAuditReport(
    expertReports: ExpertReport[],
    deviceCapabilities: DeviceCapabilities,
    featureSupport: FeatureSupport,
    performanceMetrics: PerformanceMetrics
  ): AuditReport {
    // Collect all issues from expert reports
    const allIssues = expertReports.flatMap((report) => report.findings);

    // Calculate summary statistics
    const summary = {
      totalIssues: allIssues.length,
      criticalCount: allIssues.filter((i) => i.severity === "critical").length,
      majorCount: allIssues.filter((i) => i.severity === "major").length,
      minorCount: allIssues.filter((i) => i.severity === "minor").length,
      enhancementCount: allIssues.filter((i) => i.severity === "enhancement").length,
      byExpertRole: {} as Record<string, number>,
      byComponent: {} as Record<string, number>,
    };

    // Count by expert role
    expertReports.forEach((report) => {
      summary.byExpertRole[report.expertRole] = report.issuesFound;
    });

    // Count by component
    allIssues.forEach((issue) => {
      summary.byComponent[issue.component] =
        (summary.byComponent[issue.component] || 0) + 1;
    });

    return {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      deviceCapabilities,
      featureSupport,
      performanceMetrics,
      issues: allIssues,
      summary,
    };
  }

  /**
   * Run comprehensive audit
   */
  async run(): Promise<AuditEngineResult> {
    const startTime = Date.now();

    // Clear previous issues
    this.issueTracker.clearAll();

    // Collect system information
    const deviceCapabilities = detectDeviceCapabilities();
    const featureSupport = detectFeatureSupport();
    const performanceMetrics = this.performanceMonitor.getMetrics();

    // Create audit context
    const context = this.createContext();

    // Get all experts
    const experts = this.getAllExperts(context);

    console.log(`Running audit with ${experts.length} experts...`);

    // Run experts
    const results = this.config.parallel
      ? await this.runExpertsParallel(experts)
      : await this.runExpertsSequential(experts);

    // Extract reports and errors
    const expertReports = results.map((r) => r.report);
    const errors = results
      .filter((r) => r.error)
      .map((r) => ({
        expert: r.report.expertRole,
        error: r.error!,
      }));

    // Generate comprehensive report
    const report = this.generateAuditReport(
      expertReports,
      deviceCapabilities,
      featureSupport,
      performanceMetrics
    );

    const duration = Date.now() - startTime;

    console.log(`Audit completed in ${duration}ms`);
    console.log(`Found ${report.summary.totalIssues} issues from ${expertReports.length} experts`);
    console.log(`Critical: ${report.summary.criticalCount}, Major: ${report.summary.majorCount}, Minor: ${report.summary.minorCount}, Enhancements: ${report.summary.enhancementCount}`);

    if (errors.length > 0) {
      console.warn(`${errors.length} experts encountered errors:`, errors);
    }

    return {
      report,
      expertReports,
      duration,
      errors,
    };
  }

  /**
   * Run audit and return only the report
   */
  async runAndGetReport(): Promise<AuditReport> {
    const result = await this.run();
    return result.report;
  }

  /**
   * Run audit for specific experts only
   */
  async runExperts(expertRoles: string[]): Promise<AuditEngineResult> {
    this.config.experts = expertRoles;
    return this.run();
  }
}

/**
 * Create and run audit engine
 */
export async function runAudit(config?: AuditEngineConfig): Promise<AuditEngineResult> {
  const engine = new AuditEngine(config);
  return engine.run();
}

/**
 * Get singleton audit engine instance
 */
let auditEngineInstance: AuditEngine | null = null;

export function getAuditEngine(config?: AuditEngineConfig): AuditEngine {
  if (!auditEngineInstance) {
    auditEngineInstance = new AuditEngine(config);
  }
  return auditEngineInstance;
}
