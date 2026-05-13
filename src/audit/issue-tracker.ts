/**
 * Issue tracker data models and storage system
 * Manages discovered issues with categorization, prioritization, and persistence
 */

import type {
  Issue,
  IssueSeverity,
  IssueStatus,
  ExpertRole,
  Viewport,
} from "./types";

/**
 * Issue Tracker class for managing audit findings
 */
export class IssueTracker {
  private static instance: IssueTracker;
  private issues: Map<string, Issue> = new Map();
  private storageKey = "audit_issues";

  private constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  public static getInstance(): IssueTracker {
    if (!IssueTracker.instance) {
      IssueTracker.instance = new IssueTracker();
    }
    return IssueTracker.instance;
  }

  /**
   * Generate unique issue ID
   */
  private generateId(): string {
    return `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a new issue
   */
  public createIssue(params: {
    severity: IssueSeverity;
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
  }): Issue {
    const issue: Issue = {
      id: this.generateId(),
      status: "open",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...params,
    };

    this.issues.set(issue.id, issue);
    this.saveToStorage();

    return issue;
  }

  /**
   * Update an existing issue
   */
  public updateIssue(
    id: string,
    updates: Partial<Omit<Issue, "id" | "createdAt">>
  ): Issue | null {
    const issue = this.issues.get(id);
    if (!issue) return null;

    const updatedIssue: Issue = {
      ...issue,
      ...updates,
      updatedAt: Date.now(),
    };

    if (updates.status === "resolved" && !issue.resolvedAt) {
      updatedIssue.resolvedAt = Date.now();
    }

    this.issues.set(id, updatedIssue);
    this.saveToStorage();

    return updatedIssue;
  }

  /**
   * Delete an issue
   */
  public deleteIssue(id: string): boolean {
    const deleted = this.issues.delete(id);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  /**
   * Get issue by ID
   */
  public getIssue(id: string): Issue | null {
    return this.issues.get(id) || null;
  }

  /**
   * Get all issues
   */
  public getAllIssues(): Issue[] {
    return Array.from(this.issues.values());
  }

  /**
   * Filter issues by criteria
   */
  public filterIssues(filters: {
    severity?: IssueSeverity[];
    status?: IssueStatus[];
    component?: string[];
    viewport?: Viewport[];
    expertRole?: ExpertRole[];
  }): Issue[] {
    return this.getAllIssues().filter((issue) => {
      if (filters.severity && !filters.severity.includes(issue.severity)) {
        return false;
      }
      if (filters.status && !filters.status.includes(issue.status)) {
        return false;
      }
      if (filters.component && !filters.component.includes(issue.component)) {
        return false;
      }
      if (
        filters.viewport &&
        !issue.viewport.some((v) => filters.viewport!.includes(v))
      ) {
        return false;
      }
      if (filters.expertRole && issue.expertRole !== filters.expertRole[0]) {
        return false;
      }
      return true;
    });
  }

  /**
   * Sort issues by priority
   */
  public sortByPriority(issues: Issue[]): Issue[] {
    const severityOrder: Record<IssueSeverity, number> = {
      critical: 0,
      major: 1,
      minor: 2,
      enhancement: 3,
    };

    return [...issues].sort((a, b) => {
      // First by severity
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;

      // Then by creation date (newer first)
      return b.createdAt - a.createdAt;
    });
  }

  /**
   * Get issue summary statistics
   */
  public getSummary(): {
    totalIssues: number;
    criticalCount: number;
    majorCount: number;
    minorCount: number;
    enhancementCount: number;
    openCount: number;
    inProgressCount: number;
    resolvedCount: number;
    verifiedCount: number;
    byExpertRole: Record<ExpertRole, number>;
    byComponent: Record<string, number>;
    byViewport: Record<Viewport, number>;
  } {
    const issues = this.getAllIssues();

    const summary = {
      totalIssues: issues.length,
      criticalCount: 0,
      majorCount: 0,
      minorCount: 0,
      enhancementCount: 0,
      openCount: 0,
      inProgressCount: 0,
      resolvedCount: 0,
      verifiedCount: 0,
      byExpertRole: {} as Record<ExpertRole, number>,
      byComponent: {} as Record<string, number>,
      byViewport: { mobile: 0, desktop: 0 } as Record<Viewport, number>,
    };

    issues.forEach((issue) => {
      // Count by severity
      switch (issue.severity) {
        case "critical":
          summary.criticalCount++;
          break;
        case "major":
          summary.majorCount++;
          break;
        case "minor":
          summary.minorCount++;
          break;
        case "enhancement":
          summary.enhancementCount++;
          break;
      }

      // Count by status
      switch (issue.status) {
        case "open":
          summary.openCount++;
          break;
        case "in_progress":
          summary.inProgressCount++;
          break;
        case "resolved":
          summary.resolvedCount++;
          break;
        case "verified":
          summary.verifiedCount++;
          break;
      }

      // Count by expert role
      summary.byExpertRole[issue.expertRole] =
        (summary.byExpertRole[issue.expertRole] || 0) + 1;

      // Count by component
      summary.byComponent[issue.component] =
        (summary.byComponent[issue.component] || 0) + 1;

      // Count by viewport
      issue.viewport.forEach((v) => {
        summary.byViewport[v]++;
      });
    });

    return summary;
  }

  /**
   * Get issues grouped by component
   */
  public groupByComponent(): Record<string, Issue[]> {
    const grouped: Record<string, Issue[]> = {};

    this.getAllIssues().forEach((issue) => {
      if (!grouped[issue.component]) {
        grouped[issue.component] = [];
      }
      grouped[issue.component].push(issue);
    });

    return grouped;
  }

  /**
   * Get issues grouped by expert role
   */
  public groupByExpertRole(): Record<ExpertRole, Issue[]> {
    const grouped: Record<string, Issue[]> = {};

    this.getAllIssues().forEach((issue) => {
      if (!grouped[issue.expertRole]) {
        grouped[issue.expertRole] = [];
      }
      grouped[issue.expertRole].push(issue);
    });

    return grouped as Record<ExpertRole, Issue[]>;
  }

  /**
   * Save issues to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const data = JSON.stringify(Array.from(this.issues.entries()));
      localStorage.setItem(this.storageKey, data);
    } catch (e) {
      console.error("Failed to save issues to storage:", e);
    }
  }

  /**
   * Load issues from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const entries = JSON.parse(data) as [string, Issue][];
        this.issues = new Map(entries);
      }
    } catch (e) {
      console.error("Failed to load issues from storage:", e);
    }
  }

  /**
   * Export issues as JSON
   */
  public exportJSON(): string {
    return JSON.stringify(this.getAllIssues(), null, 2);
  }

  /**
   * Import issues from JSON
   */
  public importJSON(json: string): boolean {
    try {
      const issues = JSON.parse(json) as Issue[];
      issues.forEach((issue) => {
        this.issues.set(issue.id, issue);
      });
      this.saveToStorage();
      return true;
    } catch (e) {
      console.error("Failed to import issues:", e);
      return false;
    }
  }

  /**
   * Clear all issues
   */
  public clearAll(): void {
    this.issues.clear();
    this.saveToStorage();
  }
}

/**
 * Get singleton instance
 */
export function getIssueTracker(): IssueTracker {
  return IssueTracker.getInstance();
}
