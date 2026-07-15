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

  it("supports contain fit and keeps responsive art-direction props off the rendered image", () => {
    const html = renderToStaticMarkup(
      <div className="relative aspect-[16/9]">
        <ResponsiveImage
          src="/media/fleet/airportlive-fleet-lineup.webp"
          mobileSrc="/media/fleet/airportlive-fleet-lineup-mobile.webp"
          alt="AirportLive premium fleet lineup for Punjab airport taxi and outstation travel"
          fill
          sizes="100vw"
          objectFit="contain"
          objectPosition="center center"
          mobileObjectPosition="center bottom"
        />
      </div>
    );

    expect(html).toContain("object-contain");
    expect(html).not.toContain("object-cover");
    expect(html).not.toContain("mobileSrc");
    expect(html).not.toContain("mobileObjectPosition");
  });
});
