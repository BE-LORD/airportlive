import { describe, expect, it } from "vitest";

import {
  ctaMedia,
  assetReuseNotes,
  fleetMedia,
  galleryMedia,
  heroMedia,
  journeyMedia,
  proofMedia,
  routeMedia,
  serviceMedia,
} from "./airportlive-media";

const flattenImages = () => [
  heroMedia,
  ...Object.values(serviceMedia),
  ...Object.values(proofMedia),
  ...Object.values(routeMedia),
  ...Object.values(journeyMedia),
  ...Object.values(galleryMedia),
  ctaMedia,
  ...fleetMedia.flatMap((vehicle) => [
    vehicle.exterior,
    vehicle.interior,
    vehicle.luggage,
  ]),
].filter((image): image is NonNullable<typeof image> => Boolean(image));

describe("AirportLive media manifest data", () => {
  it("keeps hero as the only priority image", () => {
    const priorityImages = flattenImages().filter((image) => image.priority);

    expect(priorityImages).toEqual([heroMedia]);
    expect(heroMedia.src).toBe("/media/hero/airportlive-mobile-hero-poster.webp");
    expect(heroMedia.sizes).toBe("100vw");
  });

  it("keeps XL6 interior unavailable instead of faking a missing asset", () => {
    const xl6 = fleetMedia.find((vehicle) => vehicle.id === "xl6-suv");

    expect(xl6).toBeDefined();
    expect(xl6?.interior).toBeUndefined();
    expect(flattenImages().some((image) => image.src.includes("airportlive-xl6-suv-interior"))).toBe(false);
  });

  it("provides alt text, section, sizes, and local media paths for every image", () => {
    for (const image of flattenImages()) {
      expect(image.src.startsWith("/media/")).toBe(true);
      expect(image.src.endsWith(".webp")).toBe(true);
      expect(image.alt.trim().length).toBeGreaterThan(12);
      expect(image.section.trim().length).toBeGreaterThan(0);
      expect(image.sizes.trim().length).toBeGreaterThan(0);
      expect(image.objectPosition?.trim().length).toBeGreaterThan(0);
    }
  });

  it("pins mobile crop positions for the approved imagery", () => {
    expect(heroMedia.objectPosition).toBe("center bottom");
    expect(serviceMedia.airportPickup.objectPosition).toBe("center bottom");
    expect(serviceMedia.outstationTaxi.objectPosition).toBe("center center");
    expect(serviceMedia.corporateTravel.objectPosition).toBe("center center");
    expect(serviceMedia.familyTours.objectPosition).toBe("center bottom");
    expect(serviceMedia.eventTransport.objectPosition).toBe("center center");
    expect(serviceMedia.cityRides.objectPosition).toBe("center center");
    expect(fleetMedia.find((vehicle) => vehicle.id === "innova-crysta")?.exterior.objectPosition).toBe("center center");
    expect(fleetMedia.find((vehicle) => vehicle.id === "innova-crysta")?.interior?.objectPosition).toBe("center center");
    expect(fleetMedia.find((vehicle) => vehicle.id === "innova-crysta")?.luggage?.objectPosition).toBe("center center");
    expect(proofMedia.driverPortrait.objectPosition).toBe("center center");
    expect(journeyMedia.bookingConfirmed.objectPosition).toBe("center center");
    expect(journeyMedia.driverAssigned.objectPosition).toBe("center bottom");
    expect(proofMedia.luggageLoading.objectPosition).toBe("center center");
    expect(journeyMedia.cabinComfort.objectPosition).toBe("center center");
    expect(journeyMedia.airportArrival.objectPosition).toBe("center bottom");
    expect(ctaMedia.objectPosition).toBe("center bottom");
  });

  it("documents allowed same-source reuse for the first integration pass", () => {
    expect(assetReuseNotes).toContain(
      "grok-e1a16ca4-6d30-4a41-ac61-d06ea4afb2c1_Zawa.webp maps to Event Transport and Tempo Traveller exterior."
    );
    expect(assetReuseNotes).toContain(
      "grok-4c3fc70e-fed4-4306-a27b-ee2e4eb586db_Zawa.webp maps to Premium Sedan interior and Clean Interior gallery proof."
    );
  });
});
