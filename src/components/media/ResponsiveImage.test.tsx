import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ResponsiveImage } from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("renders local optimized image markup with required accessible alt text", () => {
    const html = renderToStaticMarkup(
      <div className="relative aspect-[4/5]">
        <ResponsiveImage
          src="/media/hero/airportlive-mobile-hero-poster.webp"
          alt="Professional AirportLive chauffeur with premium cab ready for airport transfer in Punjab"
          fill
          sizes="100vw"
          priority
          className="rounded-lg"
          objectPosition="center bottom"
        />
      </div>
    );

    expect(html).toContain("Professional AirportLive chauffeur");
    expect(html).toContain("airportlive-mobile-hero-poster");
    expect(html).toContain("object-cover");
    expect(html).toContain("object-position:center bottom");
  });
});
