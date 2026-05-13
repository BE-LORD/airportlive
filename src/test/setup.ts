/**
 * Vitest setup file
 * Configures test environment and global mocks
 */

import { vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as any;

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as any;

// Mock requestAnimationFrame
const requestAnimationFrameMock = vi.fn((cb: FrameRequestCallback) =>
  window.setTimeout(() => cb(performance.now()), 16)
) as any;
global.requestAnimationFrame = requestAnimationFrameMock;
window.requestAnimationFrame = requestAnimationFrameMock;

// Mock cancelAnimationFrame
const cancelAnimationFrameMock = vi.fn((id: number) => window.clearTimeout(id));
global.cancelAnimationFrame = cancelAnimationFrameMock as any;
window.cancelAnimationFrame = cancelAnimationFrameMock as any;

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  writable: true,
  value: vi.fn(() => null),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock as any;

// Mock CSS.supports
global.CSS = {
  supports: vi.fn().mockReturnValue(false),
} as any;
