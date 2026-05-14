import { BUSINESS } from "@/lib/constants";
import { faqs } from "@/data/faqs";

/**
 * Schema.org — TaxiService + LocalBusiness + FAQPage + Organization
 * Spec: 02_TRD.md #8, 11_SEO_ANALYTICS_QA.md #3, Addon Pack #7.2
 */

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    name: BUSINESS.name,
    alternateName: BUSINESS.connectedBrand,
    url: BUSINESS.website,
    telephone: BUSINESS.phoneFull,
    email: BUSINESS.email,
    description: BUSINESS.primaryService,
    slogan: BUSINESS.tagline,
    areaServed: BUSINESS.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Airport Transfer Services",
      itemListElement: BUSINESS.coreRoutes.map((route) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: route,
          serviceType: "Airport Transfer",
        },
      })),
    },
    priceRange: "$$$",
    openingHours: "Mo-Su 00:00-23:59",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Model Town",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      postalCode: "141002",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.9010",
      longitude: "75.8573",
    },
    logo: `${BUSINESS.website}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneFull,
      contactType: "reservations",
      availableLanguage: ["English", "Hindi", "Punjabi"],
    },
  };
}

export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    alternateName: BUSINESS.connectedBrand,
    url: BUSINESS.website,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneFull,
    slogan: BUSINESS.tagline,
    areaServed: BUSINESS.serviceArea,
  };
}

export function buildAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
    },
    ratingValue: "4.9",
    reviewCount: "2540",
    bestRating: "5",
    worstRating: "1",
  };
}

export function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BUSINESS.website,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Taxi Services",
        item: `${BUSINESS.website}#fleet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Airport Transfers",
        item: `${BUSINESS.website}#booking`,
      },
    ],
  };
}

/**
 * Returns all schema objects as an array for injection into <head>
 */
export function buildAllSchemas() {
  return [
    buildLocalBusinessSchema(),
    buildFAQSchema(),
    buildOrganizationSchema(),
    buildAggregateRatingSchema(),
    buildBreadcrumbSchema(),
  ];
}
