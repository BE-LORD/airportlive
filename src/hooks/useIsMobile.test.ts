import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { useIsMobile } from "./useIsMobile";

describe("useIsMobile", () => {
  let changeHandler: ((e: { matches: boolean }) => void) | null = null;
  let mockMediaQuery: { matches: boolean; media: string; onchange: null; addListener: ReturnType<typeof vi.fn>; removeListener: ReturnType<typeof vi.fn>; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn>; dispatchEvent: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    changeHandler = null;

    vi.mocked(window.matchMedia).mockImplementation((query: string) => {
      mockMediaQuery = {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_event: string, handler: any) => {
          changeHandler = handler;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
      return mockMediaQuery;
    });
  });

  it("returns false for desktop viewport by default", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when matchMedia reports mobile width", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => {
      mockMediaQuery = {
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_event: string, handler: any) => {
          changeHandler = handler;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
      return mockMediaQuery;
    });

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
      mockMediaQuery.matches = true;
      if (changeHandler) {
        changeHandler({ matches: true });
      }
    });

    expect(result.current).toBe(true);
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
