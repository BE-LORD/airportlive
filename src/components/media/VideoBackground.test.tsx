import { render } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { VideoBackground } from "./VideoBackground";

describe("VideoBackground", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders poster image", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("src")).toBe("/images/poster.jpg");
    expect(img!.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders video element when reduced motion is off", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
  });

  it("does not render video when reduced motion is on", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const video = container.querySelector("video");
    expect(video).toBeNull();
  });

  it("renders desktop mp4 source", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const sources = container.querySelectorAll("source");
    const mp4Source = Array.from(sources).find(
      (s) => s.getAttribute("src") === "/video/desktop.mp4"
    );
    expect(mp4Source).toBeDefined();
    expect(mp4Source!.getAttribute("type")).toBe("video/mp4");
  });

  it("renders mobile sources when provided", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        mobileMp4="/video/mobile.mp4"
        mobileWebm="/video/mobile.webm"
        poster="/images/poster.jpg"
      />
    );

    const sources = container.querySelectorAll("source");
    const mobileMp4 = Array.from(sources).find(
      (s) => s.getAttribute("src") === "/video/mobile.mp4"
    );
    const mobileWebm = Array.from(sources).find(
      (s) => s.getAttribute("src") === "/video/mobile.webm"
    );

    expect(mobileMp4).toBeDefined();
    expect(mobileMp4!.getAttribute("media")).toBe("(max-width: 767px)");
    expect(mobileWebm).toBeDefined();
    expect(mobileWebm!.getAttribute("type")).toBe("video/webm");
  });

  it("renders desktop webm source when provided", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        desktopWebm="/video/desktop.webm"
        poster="/images/poster.jpg"
      />
    );

    const sources = container.querySelectorAll("source");
    const webm = Array.from(sources).find(
      (s) => s.getAttribute("src") === "/video/desktop.webm"
    );
    expect(webm).toBeDefined();
    expect(webm!.getAttribute("type")).toBe("video/webm");
  });

  it("renders overlay when overlayClassName is provided", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
        overlayClassName="bg-black/50"
      />
    );

    const overlays = container.querySelectorAll("div > div");
    const overlay = Array.from(overlays).find((el) =>
      el.className.includes("bg-black/50")
    );
    expect(overlay).toBeDefined();
  });

  it("does not render overlay when overlayClassName is not provided", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const children = container.firstElementChild!.children;
    const hasOverlay = Array.from(children).some(
      (el) =>
        el.tagName === "DIV" &&
        !el.querySelector("video") &&
        !el.querySelector("img")
    );
    expect(hasOverlay).toBe(false);
  });

  it("applies custom className", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
        className="custom-class"
      />
    );

    expect(container.firstElementChild!.className).toContain("custom-class");
  });

  it("applies aria-label to video when provided", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
        ariaLabel="Background video"
      />
    );

    const video = container.querySelector("video");
    expect(video!.getAttribute("aria-label")).toBe("Background video");
  });

  it("sets aria-hidden on video when no ariaLabel", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const video = container.querySelector("video");
    expect(video!.getAttribute("aria-hidden")).toBe("true");
  });

  it("applies custom objectPosition", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
        objectPosition="top center"
      />
    );

    const img = container.querySelector("img");
    expect(img!.style.objectPosition).toBe("top center");
  });

  it("video has correct attributes", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
        preload="metadata"
      />
    );

    const video = container.querySelector("video")!;
    expect(video.hasAttribute("autoplay")).toBe(true);
    expect(video.hasAttribute("loop")).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    expect(video.getAttribute("preload")).toBe("metadata");
  });

  it("poster image stays opaque when video is not loaded", () => {
    const { container } = render(
      <VideoBackground
        desktopMp4="/video/desktop.mp4"
        poster="/images/poster.jpg"
      />
    );

    const img = container.querySelector("img");
    expect(img!.className).toContain("opacity-100");
  });
});
