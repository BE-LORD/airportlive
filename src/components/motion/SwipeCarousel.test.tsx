import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [vi.fn(), null]),
}));

import { SwipeCarousel } from "./SwipeCarousel";

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

describe("SwipeCarousel", () => {
  it("renders all slide children", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test carousel">{slides}</SwipeCarousel>
    );

    expect(html).toContain("Slide 1");
    expect(html).toContain("Slide 2");
    expect(html).toContain("Slide 3");
  });

  it("applies aria-label to root element", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Fleet carousel">{slides}</SwipeCarousel>
    );

    expect(html).toContain('aria-label="Fleet carousel"');
  });

  it("does not render arrow buttons by default", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test carousel">{slides}</SwipeCarousel>
    );

    expect(html).not.toContain("Previous slide");
    expect(html).not.toContain("Next slide");
  });

  it("renders arrow buttons when showArrows is true", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test carousel" showArrows>
        {slides}
      </SwipeCarousel>
    );

    expect(html).toContain("Previous slide");
    expect(html).toContain("Next slide");
  });

  it("applies custom className", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test" className="custom-class">
        {slides}
      </SwipeCarousel>
    );

    expect(html).toContain("custom-class");
  });

  it("applies slideClassName to slide wrappers", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test" slideClassName="slide-custom">
        {slides}
      </SwipeCarousel>
    );

    const matches = html.match(/slide-custom/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(3);
  });

  it("wraps each child in a flex slide container", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test">{slides}</SwipeCarousel>
    );

    expect(html).toContain("flex touch-pan-y");
    expect(html).toContain("min-w-0");
  });

  it("renders the overflow-hidden viewport", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test">{slides}</SwipeCarousel>
    );

    expect(html).toContain("overflow-hidden");
  });

  it("applies viewportClassName", () => {
    const html = renderToStaticMarkup(
      <SwipeCarousel ariaLabel="Test" viewportClassName="vp-custom">
        {slides}
      </SwipeCarousel>
    );

    expect(html).toContain("vp-custom");
  });
});
