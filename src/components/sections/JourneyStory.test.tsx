import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import JourneyStory from "./JourneyStory";

describe("JourneyStory mobile layout", () => {
  it("uses normal vertical document flow on mobile instead of a nested horizontal scroller", () => {
    const html = renderToStaticMarkup(<JourneyStory />);

    expect(html).toContain("grid-cols-1");
    expect(html).toContain("touch-pan-y");
    expect(html).not.toContain("overflow-x-auto");
    expect(html).not.toContain("snap-x");
    expect(html).not.toContain("snap-start");
    expect(html).not.toContain("min-w-[82vw]");
  });
});
