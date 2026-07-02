import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { useWhatsAppRedirect } from "./useWhatsAppRedirect";

describe("useWhatsAppRedirect hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts in idle state", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    expect(result.current.state).toBe("idle");
    expect(result.current.isOpening).toBe(false);
    expect(result.current.label).toBe("Book on WhatsApp");
  });

  it("uses custom idle label", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123", "Chat with us")
    );
    expect(result.current.label).toBe("Chat with us");
  });

  it("transitions to opening state on open()", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    act(() => {
      result.current.open();
    });

    expect(result.current.state).toBe("opening");
    expect(result.current.isOpening).toBe(true);
    expect(result.current.label).toBe("Opening WhatsApp...");
  });

  it("opens WhatsApp after delay and transitions to success", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    act(() => {
      result.current.open();
    });

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(window.open).toHaveBeenCalledWith(
      "https://wa.me/123",
      "_blank",
      "noopener,noreferrer"
    );
    expect(result.current.state).toBe("success");
    expect(result.current.label).toBe("WhatsApp opened");
  });

  it("returns to idle after success timeout", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    act(() => {
      result.current.open();
    });

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(result.current.state).toBe("success");

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.state).toBe("idle");
  });

  it("does not open again while already opening", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    act(() => {
      result.current.open();
    });

    act(() => {
      result.current.open();
    });

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it("prevents default on mouse events", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.open(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("clear() cancels pending timer but state stays 'opening'", () => {
    const { result } = renderHook(() =>
      useWhatsAppRedirect("https://wa.me/123")
    );

    act(() => {
      result.current.open();
    });

    act(() => {
      result.current.clear();
    });

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(window.open).not.toHaveBeenCalled();
    // Note: clear() only cancels the timer; it does not reset state back to
    // 'idle', so the hook remains stuck in 'opening' and subsequent open()
    // calls are no-ops until the component re-mounts.
    expect(result.current.state).toBe("opening");
  });
});
