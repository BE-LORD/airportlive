import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { useIsMobile } from "./useIsMobile";

describe("useIsMobile", () => {
  let changeHandler: ((e: { matches: boolean }) => void) | null = null;
  let currentMatches = false;

  beforeEach(() => {
    changeHandler = null;
    currentMatches = false;

    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: currentMatches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, handler: any) => {
        changeHandler = handler;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("returns false for desktop viewport by default", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when matchMedia reports mobile width", () => {
    currentMatches = true;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("uses custom breakpoint", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => {
      expect(query).toBe("(max-width: 1023px)");
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(true);
  });

  it("updates when media query changes", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true });
      }
    });
  });

  it("removes event listener on unmount", () => {
    const removeListener = vi.fn();
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: removeListener,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(removeListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
