export type AirportLiveImage = {
  src: string;
  alt: string;
  section: string;
  priority?: boolean;
  sizes: string;
  objectPosition?: string;
};

export type FleetVehicleMedia = {
  id: "premium-sedan" | "innova-crysta" | "xl6-suv" | "tempo-traveller";
  name: string;
  exterior: AirportLiveImage;
  interior?: AirportLiveImage;
  luggage?: AirportLiveImage;
};

const heroSizes = "100vw";
const serviceSizes = "(max-width: 768px) 92vw, (max-width: 1200px) 33vw, 360px";
const fleetSizes = "(max-width: 768px) 88vw, (max-width: 1200px) 33vw, 420px";
const gallerySizes = "(max-width: 768px) 46vw, (max-width: 1200px) 25vw, 320px";
const journeySizes = "(max-width: 768px) 88vw, 420px";
const ctaSizes = "100vw";

export const heroMedia: AirportLiveImage = {
  src: "/media/hero/airportlive-mobile-hero-poster.webp",
  alt: "Professional AirportLive chauffeur with premium cab ready for airport transfer in Punjab",
  section: "Hero",
  priority: true,
  sizes: heroSizes,
  objectPosition: "center bottom",
};

export const serviceMedia = {
  airportPickup: {
    src: "/media/services/airportlive-airport-pickup-poster.webp",
    alt: "AirportLive chauffeur opening car door for airport pickup service",
    section: "Airport Pickup & Drop",
    sizes: serviceSizes,
    objectPosition: "center bottom",
  },
  outstationTaxi: {
    src: "/media/services/airportlive-outstation-highway.webp",
    alt: "Premium AirportLive cab on Punjab highway for outstation taxi service",
    section: "Outstation Taxi",
    sizes: serviceSizes,
    objectPosition: "center center",
  },
  corporateTravel: {
    src: "/media/services/airportlive-corporate-pickup.webp",
    alt: "AirportLive chauffeur ready for corporate travel pickup",
    section: "Corporate Travel",
    sizes: serviceSizes,
    objectPosition: "center center",
  },
  familyTours: {
    src: "/media/services/airportlive-family-tour.webp",
    alt: "Family airport transfer with AirportLive premium cab and luggage",
    section: "Family Tours",
    sizes: serviceSizes,
    objectPosition: "center bottom",
  },
  eventTransport: {
    src: "/media/services/airportlive-event-transport.webp",
    alt: "AirportLive group transport vehicles for event and wedding travel",
    section: "Event Transport",
    sizes: serviceSizes,
    objectPosition: "center center",
  },
  cityRides: {
    src: "/media/services/airportlive-city-rides.webp",
    alt: "AirportLive premium sedan for local city rides in Punjab",
    section: "Local City Rides",
    sizes: serviceSizes,
    objectPosition: "center center",
  },
} satisfies Record<string, AirportLiveImage>;

export const fleetMedia: FleetVehicleMedia[] = [
  {
    id: "premium-sedan",
    name: "Premium Sedan",
    exterior: {
      src: "/media/fleet/airportlive-premium-sedan-exterior.webp",
      alt: "AirportLive premium sedan exterior for executive airport transfer",
      section: "Fleet - Premium Sedan",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
    interior: {
      src: "/media/fleet/airportlive-premium-sedan-interior.webp",
      alt: "Clean premium sedan interior for comfortable AirportLive city and airport rides",
      section: "Fleet - Premium Sedan",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    exterior: {
      src: "/media/fleet/airportlive-innova-crysta-exterior.webp",
      alt: "Toyota Innova Crysta for premium AirportLive airport taxi service in Punjab",
      section: "Fleet - Innova Crysta",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
    interior: {
      src: "/media/fleet/airportlive-innova-crysta-interior.webp",
      alt: "Clean Innova Crysta interior for comfortable AirportLive airport transfer",
      section: "Fleet - Innova Crysta",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
    luggage: {
      src: "/media/fleet/airportlive-innova-luggage-space.webp",
      alt: "Luggage space in Innova Crysta for AirportLive airport taxi service",
      section: "Fleet - Innova Crysta",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
  },
  {
    id: "xl6-suv",
    name: "XL6 / SUV",
    exterior: {
      src: "/media/fleet/airportlive-xl6-suv-exterior.webp",
      alt: "AirportLive XL6 SUV exterior for family airport transfer with luggage",
      section: "Fleet - XL6 / SUV",
      sizes: fleetSizes,
      objectPosition: "center bottom",
    },
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    exterior: {
      src: "/media/fleet/airportlive-tempo-traveller-exterior.webp",
      alt: "AirportLive Tempo Traveller exterior for group airport and event travel",
      section: "Fleet - Tempo Traveller",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
    interior: {
      src: "/media/fleet/airportlive-tempo-traveller-interior.webp",
      alt: "Clean Tempo Traveller interior for AirportLive group transport",
      section: "Fleet - Tempo Traveller",
      sizes: fleetSizes,
      objectPosition: "center center",
    },
  },
];

export const proofMedia = {
  driverPortrait: {
    src: "/media/proof/airportlive-driver-portrait.webp",
    alt: "AirportLive chauffeur standing beside premium cab for safe Punjab airport transfer",
    section: "Trust / Legacy",
    sizes: fleetSizes,
    objectPosition: "center center",
  },
  luggageLoading: {
    src: "/media/proof/airportlive-luggage-loading.webp",
    alt: "AirportLive chauffeur loading luggage for airport pickup and drop service",
    section: "Proof",
    sizes: journeySizes,
    objectPosition: "center center",
  },
} satisfies Record<string, AirportLiveImage>;

export const routeMedia = {
  ludhianaDelhiAirport: {
    src: "/media/routes/airportlive-ludhiana-delhi-airport-route.webp",
    alt: "Premium taxi on Ludhiana to Delhi Airport route",
    section: "Route Corridor",
    sizes: "100vw",
    objectPosition: "center center",
  },
} satisfies Record<string, AirportLiveImage>;

export const journeyMedia = {
  bookingConfirmed: {
    src: "/media/journey/airportlive-booking-confirmed.webp",
    alt: "WhatsApp booking confirmation for AirportLive airport taxi service",
    section: "Journey Story",
    sizes: journeySizes,
    objectPosition: "center center",
  },
  driverAssigned: {
    src: "/media/journey/airportlive-driver-assigned.webp",
    alt: "AirportLive chauffeur assigned for airport pickup",
    section: "Journey Story",
    sizes: journeySizes,
    objectPosition: "center center",
  },
  cabinComfort: {
    src: "/media/journey/airportlive-cabin-comfort.webp",
    alt: "Comfortable cab interior for AirportLive airport transfer",
    section: "Journey Story",
    sizes: journeySizes,
    objectPosition: "center center",
  },
  airportArrival: {
    src: "/media/journey/airportlive-airport-arrival.webp",
    alt: "AirportLive cab arriving for airport drop-off",
    section: "Journey Story",
    sizes: journeySizes,
    objectPosition: "center bottom",
  },
} satisfies Record<string, AirportLiveImage>;

export const galleryMedia = {
  cleanInterior: {
    src: "/media/gallery/airportlive-clean-interior.webp",
    alt: "Clean AirportLive cab interior prepared for airport transfer",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center center",
  },
  airportPickupProof: {
    src: "/media/gallery/airportlive-airport-pickup-proof.webp",
    alt: "AirportLive chauffeur waiting at airport pickup lane with passenger placard",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center center",
  },
  familyTravelProof: {
    src: "/media/gallery/airportlive-family-travel-proof.webp",
    alt: "Family travel with AirportLive premium cab and luggage assistance",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center bottom",
  },
  groupTransportProof: {
    src: "/media/gallery/airportlive-group-transport-proof.webp",
    alt: "AirportLive group transport with Tempo Traveller and luggage at airport",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center center",
  },
  fleetLineup: {
    src: "/media/fleet/airportlive-fleet-lineup.webp",
    alt: "AirportLive fleet lineup for airport taxi and outstation travel in Punjab",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center center",
  },
  luggageHandled: {
    src: "/media/proof/airportlive-luggage-loading.webp",
    alt: "AirportLive chauffeur loading luggage for airport pickup and drop service",
    section: "Visual Proof",
    sizes: gallerySizes,
    objectPosition: "center center",
  },
} satisfies Record<string, AirportLiveImage>;

export const ctaMedia: AirportLiveImage = {
  src: "/media/cta/airportlive-ready-for-takeoff-poster.webp",
  alt: "Premium AirportLive cab ready for next airport transfer",
  section: "Final CTA",
  sizes: ctaSizes,
  objectPosition: "center bottom",
};

export const assetReuseNotes = [
  "grok-e1a16ca4-6d30-4a41-ac61-d06ea4afb2c1_Zawa.webp maps to Event Transport and Tempo Traveller exterior.",
  "grok-4c3fc70e-fed4-4306-a27b-ee2e4eb586db_Zawa.webp maps to Premium Sedan interior and Clean Interior gallery proof.",
] as const;
