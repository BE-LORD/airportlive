import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SplitTextReveal } from "./SplitTextReveal";

describe("SplitTextReveal accessibility", () => {
  it("does not put aria-label on a plain span role", () => {
    const html = renderToStaticMarkup(
      <SplitTextReveal text="WHERE LUXURY\nMEETS COMFORT" highlight="MEETS COMFORT" />
    );

    expect(html).not.toContain("aria-label=");
    expect(html).toContain("WHERE LUXURY");
    expect(html).toContain("MEETS COMFORT");
  });
});
