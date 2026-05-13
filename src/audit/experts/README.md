# Expert Audit Modules

This directory contains specialized expert modules that evaluate the website from different professional perspectives.

## Implemented Experts

### 1. UX Designer Expert (`ux-designer.ts`)
**Role**: Evaluates navigation, user flows, and interaction patterns

**Audits**:
- Navigation structure and semantic HTML
- Skip links for keyboard navigation
- Call-to-action visibility and clarity
- Form accessibility in user flows
- Error state handling
- Interaction pattern consistency
- Information architecture and heading hierarchy

**Validates**: Requirements 1.3, 2.1-2.10, 3.1-3.10

### 2. UI Designer Expert (`ui-designer.ts`)
**Role**: Evaluates visual consistency, spacing, and layout

**Audits**:
- Border radius consistency across components
- Shadow and elevation system consistency
- Section spacing and padding uniformity
- Container widths and max-width constraints
- Grid and Flexbox layout implementation
- Text alignment patterns
- Vertical alignment in flex containers

**Validates**: Requirements 1.3, 2.1-2.10, 3.1-3.10

### 3. Mobile UX Specialist Expert (`mobile-ux-specialist.ts`)
**Role**: Evaluates touch targets, gestures, and mobile-specific patterns

**Audits**:
- Touch target sizes (44x44px minimum per WCAG)
- Spacing between touch targets
- Swipe gesture affordances
- Horizontal scroll indicators
- Mobile menu implementation
- Sticky mobile booking bar
- Mobile-optimized form inputs (tel, email types)
- Viewport meta tag configuration
- Horizontal scroll prevention
- Safe area insets for notched devices

**Validates**: Requirements 1.3, 2.1-2.10

**Note**: Only runs on mobile viewports (< 1024px)

### 4. Desktop UX Specialist Expert (`desktop-ux-specialist.ts`)
**Role**: Evaluates hover states, cursor interactions, and large-screen layouts

**Audits**:
- Hover states on interactive elements
- Hover transition smoothness
- Card hover effects
- Custom cursor implementation
- Pointer cursor on interactive elements
- Magnetic button effects
- Container max-widths on large screens (1920px+)
- Multi-column layout implementation
- Sidebar utilization on wide screens
- Keyboard alternatives for hover-dependent features
- Dropdown accessibility (aria-expanded)
- Carousel keyboard navigation

**Validates**: Requirements 1.3, 3.1-3.10

**Note**: Only runs on desktop viewports (≥ 1024px)

## Base Expert Class

All expert modules extend `BaseExpert` which provides:

### Shared Utilities
- DOM inspection methods (`query`, `queryAll`, `isElementVisible`)
- Element measurement (`getElementDimensions`, `measureElementSize`)
- Style computation (`getComputedStyle`)
- Interactive element detection (`isInteractive`, `getAllInteractiveElements`)
- Accessibility helpers (`calculateContrastRatio`, `meetsContrastStandard`)
- Touch target validation (`meetsTouchTargetSize`)
- Performance metrics (`getPageLoadMetrics`, `countDOMNodes`)
- Viewport detection (`isMobileViewport`, `isDesktopViewport`)
- User interaction simulation (`simulateClick`, `simulateKeyPress`)

### Issue Reporting
- `reportIssue()` - Creates and tracks issues with full context
- Automatic issue attribution to expert role
- Severity classification (critical, major, minor, enhancement)
- Viewport and browser targeting

### Report Generation
- `generateReport()` - Creates expert-specific audit report
- Issue count by severity
- Summary and recommendations
- Timestamp and metadata

## Usage Example

```typescript
import { UXDesignerExpert, UIDesignerExpert } from '@/audit/experts';

// Create audit context
const context = {
  viewport: 'desktop',
  url: window.location.href,
  timestamp: Date.now(),
};

// Run UX audit
const uxExpert = new UXDesignerExpert(context);
await uxExpert.audit();
const uxFindings = uxExpert.getFindings();
const uxReport = uxExpert.generateReport();

// Run UI audit
const uiExpert = new UIDesignerExpert(context);
await uiExpert.audit();
const uiFindings = uiExpert.getFindings();
const uiReport = uiExpert.generateReport();

console.log(`UX Issues: ${uxFindings.length}`);
console.log(`UI Issues: ${uiFindings.length}`);
```

## Testing

All expert modules have comprehensive test coverage in `ux-ui-experts.test.ts`:

- Instance creation tests
- Audit execution tests
- Issue detection tests
- Viewport-specific behavior tests
- Report generation tests
- Interface compliance tests

Run tests:
```bash
npm test -- src/audit/experts/ux-ui-experts.test.ts
```

## Architecture

```
BaseExpert (abstract)
├── UXDesignerExpert
├── UIDesignerExpert
├── MobileUXSpecialistExpert
├── DesktopUXSpecialistExpert
├── AccessibilityExpert
├── PerformanceEngineerExpert
├── SecurityAnalystExpert
└── SEOExpert
```

## Issue Structure

Each reported issue includes:
- `id` - Unique identifier
- `severity` - critical | major | minor | enhancement
- `status` - open | in_progress | resolved | verified
- `title` - Brief description
- `description` - Detailed explanation
- `component` - Affected component/section
- `viewport` - mobile | desktop | both
- `browsers` - Affected browsers
- `expertRole` - Expert who identified the issue
- `stepsToReproduce` - How to reproduce
- `expectedBehavior` - What should happen
- `actualBehavior` - What actually happens
- `suggestedFix` - Recommended solution
- `screenshot` - Optional visual evidence
- `createdAt` - Timestamp
- `updatedAt` - Last modified timestamp

## Future Experts

Additional expert modules planned:
- Animation Director
- Typography Expert
- Color Theory Expert
- Form UX Specialist
- Loading State Designer
- Error Handling Expert
- Cross-Browser Tester
- Device Tester
- Conversion Optimizer
- Content Strategist

## Contributing

When adding new expert modules:

1. Extend `BaseExpert` class
2. Implement `audit()` method with specific checks
3. Use `reportIssue()` to document findings
4. Override `generateSummary()` and `generateRecommendations()` if needed
5. Add comprehensive tests
6. Export from `index.ts`
7. Update this README

## References

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Touch Target Size: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- Core Web Vitals: https://web.dev/vitals/
