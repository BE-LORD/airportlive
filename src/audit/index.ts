/**
 * Audit System - Main exports
 * Comprehensive mobile & desktop audit and enhancement system
 */

// Types
export type {
  DeviceTier,
  IssueSeverity,
  IssueStatus,
  ExpertRole,
  Viewport,
  DeviceCapabilities,
  FeatureSupport,
  CoreWebVitals,
  PerformanceMetrics,
  Issue,
  AuditReport,
} from "./types";

// Device Detection
export {
  detectGPU,
  detectConnection,
  calculateDeviceTier,
  detectDeviceCapabilities,
  getDeviceTier,
} from "./utils/device-detection";

// Feature Detection
export {
  detectWebGL,
  detectWebGL2,
  detectIntersectionObserver,
  detectResizeObserver,
  detectMutationObserver,
  detectPerformanceObserver,
  detectServiceWorker,
  detectWebWorker,
  detectLocalStorage,
  detectSessionStorage,
  detectIndexedDB,
  detectWebAssembly,
  detectCSSGrid,
  detectCSSCustomProperties,
  detectCSSBackdropFilter,
  detectCSSClipPath,
  detectFeatureSupport,
  isFeatureSupported,
} from "./utils/feature-detection";

// Performance Monitoring
export {
  PerformanceMonitor,
  getPerformanceMonitor,
} from "./utils/performance-monitor";

// Issue Tracking
export { IssueTracker, getIssueTracker } from "./issue-tracker";

// Expert Modules
export { BaseExpert } from "./experts/base-expert";
export type { ExpertModule, ExpertReport, AuditContext } from "./experts/base-expert";
export { UXDesignerExpert } from "./experts/ux-designer";
export { UIDesignerExpert } from "./experts/ui-designer";
export { MobileUXSpecialistExpert } from "./experts/mobile-ux-specialist";
export { DesktopUXSpecialistExpert } from "./experts/desktop-ux-specialist";
export { AccessibilityExpert } from "./experts/accessibility-expert";
export { PerformanceEngineerExpert } from "./experts/performance-engineer";
export { SecurityAnalystExpert } from "./experts/security-analyst";
export { SEOExpert } from "./experts/seo-expert";
export { ContentStrategistExpert } from "./experts/content-strategist";
export { AnimationDirectorExpert } from "./experts/animation-director-expert";
export { TypographyExpert } from "./experts/typography-expert";
export { ColorTheoryExpert } from "./experts/color-theory-expert";

// Audit Engine
export { AuditEngine, runAudit, getAuditEngine } from "./audit-engine";
export type { AuditEngineConfig, AuditEngineResult } from "./audit-engine";
