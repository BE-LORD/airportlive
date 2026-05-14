import { describe, expect, it } from "vitest";
import { HOME_METADATA, HOME_OG_IMAGE_URL } from "./homepage-metadata";

describe("homepage social metadata", () => {
  it("uses the premium Airport Live Open Graph contract", () => {
    expect(HOME_METADATA.metadataBase?.toString()).toBe("https://www.airportlive.in/");
    expect(HOME_METADATA.title).toEqual({
      absolute: "Airport Live | Premium Airport Transfers in Punjab — V3 Tour & Travels",
    });
    expect(HOME_METADATA.description).toBe(
      "Premium airport transfers, city rides, and outstation travel with professional chauffeurs, clean cars, and reliable service. Book Airport Live by V3 Tour & Travels at airportlive.in."
    );
    expect(HOME_METADATA.alternates?.canonical).toBe("https://www.airportlive.in");

    expect(HOME_METADATA.openGraph).toMatchObject({
      type: "website",
      url: "https://www.airportlive.in",
      siteName: "AIRPORT LIVE by V3 Tour & Travels",
      title: "Airport Live | Premium Airport Transfers in Punjab — V3 Tour & Travels",
      description:
        "Premium airport transfers, city rides, and outstation travel with professional chauffeurs, clean cars, and reliable service. Book Airport Live by V3 Tour & Travels at airportlive.in.",
    });
    expect(HOME_METADATA.openGraph?.images).toEqual([
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "AIRPORT LIVE by V3 Tour & Travels premium airport transfers social preview",
      },
    ]);

    expect(HOME_METADATA.twitter).toEqual({
      card: "summary_large_image",
      title: "Airport Live | Premium Airport Transfers in Punjab — V3 Tour & Travels",
      description:
        "Premium airport transfers, city rides, and outstation travel with professional chauffeurs, clean cars, and reliable service. Book Airport Live by V3 Tour & Travels at airportlive.in.",
      images: [HOME_OG_IMAGE_URL],
    });
    expect(HOME_METADATA.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    });
  });
});
