/**
 * Unit tests for issue tracker
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { IssueTracker, getIssueTracker } from "./issue-tracker";
import type { Issue, IssueSeverity, IssueStatus } from "./types";

describe("IssueTracker", () => {
  let tracker: IssueTracker;

  beforeEach(() => {
    tracker = IssueTracker.getInstance();
    tracker.clearAll();
  });

  describe("getInstance", () => {
    it("should return singleton instance", () => {
      const instance1 = IssueTracker.getInstance();
      const instance2 = IssueTracker.getInstance();
      expect(instance1).toBe(instance2);
    });

    it("should be same as getIssueTracker", () => {
      const instance1 = IssueTracker.getInstance();
      const instance2 = getIssueTracker();
      expect(instance1).toBe(instance2);
    });
  });

  describe("createIssue", () => {
    it("should create a new issue with all required fields", () => {
      const issue = tracker.createIssue({
        severity: "critical",
        title: "Test Issue",
        description: "Test description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "accessibility_expert",
        stepsToReproduce: ["Step 1", "Step 2"],
        expectedBehavior: "Should work",
        actualBehavior: "Does not work",
        suggestedFix: "Fix it",
      });

      expect(issue).toHaveProperty("id");
      expect(issue.severity).toBe("critical");
      expect(issue.title).toBe("Test Issue");
      expect(issue.status).toBe("open");
      expect(issue.createdAt).toBeGreaterThan(0);
      expect(issue.updatedAt).toBeGreaterThan(0);
    });

    it("should generate unique IDs for each issue", () => {
      const issue1 = tracker.createIssue({
        severity: "major",
        title: "Issue 1",
        description: "Description 1",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const issue2 = tracker.createIssue({
        severity: "minor",
        title: "Issue 2",
        description: "Description 2",
        component: "Footer",
        viewport: ["desktop"],
        browsers: ["Firefox"],
        expertRole: "ui_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      expect(issue1.id).not.toBe(issue2.id);
    });
  });

  describe("updateIssue", () => {
    it("should update an existing issue", () => {
      const issue = tracker.createIssue({
        severity: "major",
        title: "Original Title",
        description: "Original description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const updated = tracker.updateIssue(issue.id, {
        title: "Updated Title",
        status: "in_progress",
      });

      expect(updated).not.toBeNull();
      expect(updated!.title).toBe("Updated Title");
      expect(updated!.status).toBe("in_progress");
      expect(updated!.updatedAt).toBeGreaterThan(issue.updatedAt);
    });

    it("should set resolvedAt when status changes to resolved", () => {
      const issue = tracker.createIssue({
        severity: "major",
        title: "Test Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const updated = tracker.updateIssue(issue.id, { status: "resolved" });

      expect(updated).not.toBeNull();
      expect(updated!.resolvedAt).toBeGreaterThan(0);
    });

    it("should return null for non-existent issue", () => {
      const updated = tracker.updateIssue("non-existent-id", {
        title: "Updated",
      });
      expect(updated).toBeNull();
    });
  });

  describe("deleteIssue", () => {
    it("should delete an existing issue", () => {
      const issue = tracker.createIssue({
        severity: "minor",
        title: "Test Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const deleted = tracker.deleteIssue(issue.id);
      expect(deleted).toBe(true);

      const retrieved = tracker.getIssue(issue.id);
      expect(retrieved).toBeNull();
    });

    it("should return false for non-existent issue", () => {
      const deleted = tracker.deleteIssue("non-existent-id");
      expect(deleted).toBe(false);
    });
  });

  describe("getIssue", () => {
    it("should retrieve an issue by ID", () => {
      const issue = tracker.createIssue({
        severity: "major",
        title: "Test Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const retrieved = tracker.getIssue(issue.id);
      expect(retrieved).toEqual(issue);
    });

    it("should return null for non-existent issue", () => {
      const retrieved = tracker.getIssue("non-existent-id");
      expect(retrieved).toBeNull();
    });
  });

  describe("getAllIssues", () => {
    it("should return empty array when no issues", () => {
      const issues = tracker.getAllIssues();
      expect(issues).toEqual([]);
    });

    it("should return all created issues", () => {
      tracker.createIssue({
        severity: "critical",
        title: "Issue 1",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      tracker.createIssue({
        severity: "major",
        title: "Issue 2",
        description: "Description",
        component: "Footer",
        viewport: ["desktop"],
        browsers: ["Firefox"],
        expertRole: "ui_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const issues = tracker.getAllIssues();
      expect(issues).toHaveLength(2);
    });
  });

  describe("filterIssues", () => {
    beforeEach(() => {
      tracker.createIssue({
        severity: "critical",
        title: "Critical Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "accessibility_expert",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      tracker.createIssue({
        severity: "major",
        title: "Major Issue",
        description: "Description",
        component: "Footer",
        viewport: ["desktop"],
        browsers: ["Firefox"],
        expertRole: "performance_engineer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      tracker.createIssue({
        severity: "minor",
        title: "Minor Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile", "desktop"],
        browsers: ["Safari"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });
    });

    it("should filter by severity", () => {
      const critical = tracker.filterIssues({ severity: ["critical"] });
      expect(critical).toHaveLength(1);
      expect(critical[0].severity).toBe("critical");
    });

    it("should filter by component", () => {
      const headerIssues = tracker.filterIssues({ component: ["Header"] });
      expect(headerIssues).toHaveLength(2);
    });

    it("should filter by viewport", () => {
      const mobileIssues = tracker.filterIssues({ viewport: ["mobile"] });
      expect(mobileIssues).toHaveLength(2);
    });

    it("should filter by multiple criteria", () => {
      const filtered = tracker.filterIssues({
        severity: ["critical", "major"],
        viewport: ["mobile"],
      });
      expect(filtered).toHaveLength(1);
    });
  });

  describe("sortByPriority", () => {
    it("should sort issues by severity and date", () => {
      const minor = tracker.createIssue({
        severity: "minor",
        title: "Minor Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const critical = tracker.createIssue({
        severity: "critical",
        title: "Critical Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "accessibility_expert",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const major = tracker.createIssue({
        severity: "major",
        title: "Major Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "performance_engineer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const sorted = tracker.sortByPriority(tracker.getAllIssues());

      expect(sorted[0].severity).toBe("critical");
      expect(sorted[1].severity).toBe("major");
      expect(sorted[2].severity).toBe("minor");
    });
  });

  describe("getSummary", () => {
    it("should return correct summary statistics", () => {
      tracker.createIssue({
        severity: "critical",
        title: "Critical Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "accessibility_expert",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      tracker.createIssue({
        severity: "major",
        title: "Major Issue",
        description: "Description",
        component: "Footer",
        viewport: ["desktop"],
        browsers: ["Firefox"],
        expertRole: "performance_engineer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const summary = tracker.getSummary();

      expect(summary.totalIssues).toBe(2);
      expect(summary.criticalCount).toBe(1);
      expect(summary.majorCount).toBe(1);
      expect(summary.openCount).toBe(2);
      expect(summary.byExpertRole.accessibility_expert).toBe(1);
      expect(summary.byComponent.Header).toBe(1);
      expect(summary.byViewport.mobile).toBe(1);
    });
  });

  describe("exportJSON and importJSON", () => {
    it("should export and import issues correctly", () => {
      tracker.createIssue({
        severity: "critical",
        title: "Test Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      const json = tracker.exportJSON();
      tracker.clearAll();

      const imported = tracker.importJSON(json);
      expect(imported).toBe(true);
      expect(tracker.getAllIssues()).toHaveLength(1);
    });
  });

  describe("clearAll", () => {
    it("should clear all issues", () => {
      tracker.createIssue({
        severity: "major",
        title: "Test Issue",
        description: "Description",
        component: "Header",
        viewport: ["mobile"],
        browsers: ["Chrome"],
        expertRole: "ux_designer",
        stepsToReproduce: [],
        expectedBehavior: "Expected",
        actualBehavior: "Actual",
        suggestedFix: "Fix",
      });

      tracker.clearAll();
      expect(tracker.getAllIssues()).toHaveLength(0);
    });
  });
});
