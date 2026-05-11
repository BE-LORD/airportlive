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
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
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

/**
 * Returns all schema objects as an array for injection into <head>
 */
export function buildAllSchemas() {
  return [
    buildLocalBusinessSchema(),
    buildFAQSchema(),
    buildOrganizationSchema(),
  ];
}
