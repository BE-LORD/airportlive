import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Services from "./Services";

describe("Services mobile cards", () => {
  it("keeps service descriptions visible on mobile instead of depending on hover", () => {
    const html = renderToStaticMarkup(<Services />);

    expect(html).toContain("translate-y-0 text-sm leading-snug text-white/76 opacity-100");
    expect(html).not.toContain("text-white/70 text-sm md:text-base mb-6 leading-relaxed max-w-lg opacity-0 translate-y-4");
    expect(html).not.toContain("md:opacity-0");
  });

  it("uses a compact homepage service grid instead of tall bento blocks", () => {
    const html = renderToStaticMarkup(<Services />);

    expect(html).toContain("data-services-layout=\"compact\"");
    expect(html).toContain("Airport Pickup");
    expect(html).not.toContain("min-h-[340px]");
    expect(html).not.toContain("rounded-[28px]");
  });
});
