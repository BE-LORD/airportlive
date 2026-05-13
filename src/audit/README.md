# Audit System

Comprehensive mobile & desktop audit and enhancement infrastructure for the V3 Tour & Travels website.

## Overview

This audit system provides a complete framework for evaluating website quality from 20+ expert perspectives, including device detection, feature detection, performance monitoring, and issue tracking.

## Features

### 1. Device Tier Detection (`utils/device-detection.ts`)

Detects device capabilities and classifies devices into tiers (high/mid/low) based on:
- CPU cores
- Memory (RAM)
- GPU capabilities
- Network connection speed

```typescript
import { detectDeviceCapabilities, getDeviceTier } from "@/audit";

// Get full device capabilities
const capabilities = detectDeviceCapabilities();
console.log(capabilities.tier); // 'high' | 'mid' | 'low'

// Quick tier check
const tier = getDeviceTier();
```

### 2. Feature Detection (`utils/feature-detection.ts`)

Detects browser feature support for:
- WebGL & WebGL2
- IntersectionObserver, ResizeObserver, MutationObserver, PerformanceObserver
- Service Workers & Web Workers
- Storage APIs (localStorage, sessionStorage, IndexedDB)
- WebAssembly
- CSS features (Grid, Custom Properties, Backdrop Filter, Clip Path)

```typescript
import { detectFeatureSupport, isFeatureSupported } from "@/audit";

// Get all feature support
const features = detectFeatureSupport();
console.log(features.webgl); // boolean

// Check specific feature
if (isFeatureSupported("webgl")) {
  // Enable 3D features
}
```

### 3. Performance Monitoring (`utils/performance-monitor.ts`)

Monitors Core Web Vitals and performance metrics:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)
- **FPS** (Frames Per Second)
- Memory usage
- DOM node count

```typescript
import { getPerformanceMonitor } from "@/audit";

const monitor = getPerformanceMonitor();

// Get Core Web Vitals
const vitals = monitor.getCoreWebVitals();
console.log(vitals.lcp); // number | null

// Get all metrics
const metrics = monitor.getMetrics();

// Check if meets thresholds
const thresholds = monitor.meetsThresholds();
console.log(thresholds.overall); // boolean

// Get current FPS
const fps = monitor.getFPS();
```

### 4. Issue Tracking (`issue-tracker.ts`)

Comprehensive issue management system for audit findings:

```typescript
import { getIssueTracker } from "@/audit";

const tracker = getIssueTracker();

// Create an issue
const issue = tracker.createIssue({
  severity: "critical",
  title: "Accessibility violation",
  description: "Missing alt text on hero image",
  component: "Hero",
  viewport: ["mobile", "desktop"],
  browsers: ["Chrome", "Firefox"],
  expertRole: "accessibility_expert",
  stepsToReproduce: ["Navigate to homepage", "Inspect hero image"],
  expectedBehavior: "Image should have descriptive alt text",
  actualBehavior: "Alt attribute is empty",
  suggestedFix: "Add descriptive alt text: 'Luxury Toyota Innova Crysta on scenic highway'",
});

// Update issue
tracker.updateIssue(issue.id, { status: "in_progress" });

// Filter issues
const criticalIssues = tracker.filterIssues({ severity: ["critical"] });

// Get summary
const summary = tracker.getSummary();
console.log(summary.criticalCount); // number

// Export/Import
const json = tracker.exportJSON();
tracker.importJSON(json);
```

## Types

All types are exported from `types.ts`:

```typescript
import type {
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
} from "@/audit";
```

### Expert Roles

The system supports 20 expert role perspectives:
- `ux_designer`
- `ui_designer`
- `accessibility_expert`
- `performance_engineer`
- `mobile_ux_specialist`
- `desktop_ux_specialist`
- `qa_tester`
- `security_analyst`
- `seo_expert`
- `content_strategist`
- `conversion_optimizer`
- `animation_director`
- `typography_expert`
- `color_theory_expert`
- `interaction_designer`
- `form_ux_specialist`
- `loading_state_designer`
- `error_handling_expert`
- `cross_browser_tester`
- `device_tester`

### Issue Severity Levels

- `critical`: Blocks core functionality or violates accessibility/security standards
- `major`: Significantly degrades user experience or performance
- `minor`: Causes slight inconvenience or visual inconsistency
- `enhancement`: Improvement opportunity beyond fixing existing issues

## Testing

Run the test suite:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Architecture

```
src/audit/
├── types.ts                    # Core type definitions
├── index.ts                    # Main exports
├── issue-tracker.ts            # Issue management system
├── utils/
│   ├── device-detection.ts     # Device tier detection
│   ├── feature-detection.ts    # Browser feature detection
│   ├── performance-monitor.ts  # Performance monitoring
│   └── index.ts                # Utils exports
└── README.md                   # This file
```

## Usage Example

```typescript
import {
  detectDeviceCapabilities,
  detectFeatureSupport,
  getPerformanceMonitor,
  getIssueTracker,
} from "@/audit";

// Initialize audit
const capabilities = detectDeviceCapabilities();
const features = detectFeatureSupport();
const monitor = getPerformanceMonitor();
const tracker = getIssueTracker();

// Log device info
console.log(`Device Tier: ${capabilities.tier}`);
console.log(`WebGL Support: ${features.webgl}`);

// Monitor performance
setTimeout(() => {
  const metrics = monitor.getMetrics();
  console.log(`LCP: ${metrics.lcp}ms`);
  console.log(`FPS: ${metrics.fps}`);
  
  // Check thresholds
  const thresholds = monitor.meetsThresholds();
  if (!thresholds.overall) {
    tracker.createIssue({
      severity: "major",
      title: "Core Web Vitals threshold exceeded",
      description: `LCP: ${metrics.lcp}ms (target: <2500ms)`,
      component: "Performance",
      viewport: ["mobile", "desktop"],
      browsers: ["Chrome"],
      expertRole: "performance_engineer",
      stepsToReproduce: ["Load homepage", "Measure LCP"],
      expectedBehavior: "LCP should be under 2.5 seconds",
      actualBehavior: `LCP is ${metrics.lcp}ms`,
      suggestedFix: "Optimize image loading and reduce JavaScript bundle size",
    });
  }
}, 5000);
```

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **Requirement 1.1, 1.2, 1.4**: Multi-perspective audit framework infrastructure
- **Requirement 19.1, 19.2**: Issue documentation and prioritization system

## Next Steps

Future tasks will build upon this infrastructure:
- Task 2: Implement 20+ expert role audit modules
- Task 3: Create audit orchestration and reporting system
- Task 4: Checkpoint - Verify audit system functionality

## License

Part of the V3 Tour & Travels website project.
