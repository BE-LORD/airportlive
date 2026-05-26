import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Footer from "./Footer";

describe("Footer brand mark", () => {
  it("renders the oversized Airport Live wordmark as a centered decorative lockup", () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain('data-footer-brand="true"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("justify-center");
    expect(html).toContain("text-center");
    expect(html).toContain(">AIRPORT</span>");
    expect(html).toContain(">LIVE</span>");
    expect(html).not.toContain("<h2");
  });
});
