/**
 * Core type definitions for the audit system
 */

export type DeviceTier = "low" | "mid" | "high";

export type IssueSeverity = "critical" | "major" | "minor" | "enhancement";

export type IssueStatus = "open" | "in_progress" | "resolved" | "verified";

export type ExpertRole =
  | "ux_designer"
  | "ui_designer"
  | "accessibility_expert"
  | "performance_engineer"
  | "mobile_ux_specialist"
  | "desktop_ux_specialist"
  | "qa_tester"
  | "security_analyst"
  | "seo_expert"
  | "content_strategist"
  | "conversion_optimizer"
  | "animation_director"
  | "typography_expert"
  | "color_theory_expert"
  | "interaction_designer"
  | "form_ux_specialist"
  | "loading_state_designer"
  | "error_handling_expert"
  | "cross_browser_tester"
  | "device_tester";

export type Viewport = "mobile" | "desktop";

export interface DeviceCapabilities {
  tier: DeviceTier;
  cores: number;
  memory: number | null;
  gpu: string | null;
  connection: string | null;
  supportsWebGL: boolean;
  supportsIntersectionObserver: boolean;
  supportsResizeObserver: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

export interface FeatureSupport {
  webgl: boolean;
  webgl2: boolean;
  intersectionObserver: boolean;
  resizeObserver: boolean;
  mutationObserver: boolean;
  performanceObserver: boolean;
  serviceWorker: boolean;
  webWorker: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webAssembly: boolean;
  cssGrid: boolean;
  cssCustomProperties: boolean;
  cssBackdropFilter: boolean;
  cssClipPath: boolean;
}

export interface CoreWebVitals {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  inp: number | null; // Interaction to Next Paint
}

export interface PerformanceMetrics extends CoreWebVitals {
  fps: number;
  memoryUsage: number | null;
  domNodes: number;
  scriptDuration: number;
  layoutDuration: number;
  paintDuration: number;
  timestamp: number;
}

export interface Issue {
  id: string;
  severity: IssueSeverity;
  status: IssueStatus;
  title: string;
  description: string;
  component: string;
  viewport: Viewport[];
  browsers: string[];
  expertRole: ExpertRole;
  stepsToReproduce: string[];
  expectedBehavior: string;
  actualBehavior: string;
  suggestedFix: string;
  screenshot?: string;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: number;
}

export interface AuditReport {
  id: string;
  timestamp: number;
  deviceCapabilities: DeviceCapabilities;
  featureSupport: FeatureSupport;
  performanceMetrics: PerformanceMetrics;
  issues: Issue[];
  summary: {
    totalIssues: number;
    criticalCount: number;
    majorCount: number;
    minorCount: number;
    enhancementCount: number;
    byExpertRole: Record<ExpertRole, number>;
    byComponent: Record<string, number>;
  };
}
