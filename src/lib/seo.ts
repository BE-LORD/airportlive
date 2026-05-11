import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

/**
 * SEO Configuration — Spec: 11_SEO_ANALYTICS_QA.md, Addon Pack #7
 * Comprehensive metadata for Google, social media, and voice search.
 */

export const siteConfig = {
  name: BUSINESS.name,
  description:
    "Premium airport transfers across Ludhiana, Chandigarh, and Delhi NCR. Professional chauffeurs, Toyota Innova Crysta comfort, fixed fares, 24/7 WhatsApp booking. V3 Tour & Travels — WHERE LUXURY MEETS COMFORT.",
  url: BUSINESS.website,
  ogImage: `${BUSINESS.website}/api/og`,
  keywords: [
    // Primary intent keywords
    "airport transfer Ludhiana",
    "taxi service Chandigarh airport",
    "premium cab Delhi NCR",
    "airport taxi Punjab",
    // Route-specific
    "Ludhiana to Chandigarh airport taxi",
    "Ludhiana to Delhi airport cab",
    "Ludhiana to Amritsar airport transfer",
    "Chandigarh to Delhi airport taxi",
    "Delhi airport to Ludhiana cab",
    // Service-specific
    "corporate travel Punjab",
    "wedding car hire Ludhiana",
    "Toyota Innova Crysta rental Punjab",
    "professional chauffeur service Ludhiana",
    "24/7 taxi booking Punjab",
    "intercity taxi Punjab",
    "airport pickup drop Chandigarh",
    "fixed fare airport taxi",
    // Brand
    "Airport Live",
    "V3 Tour and Travels",
    "V3 Tour & Travels Ludhiana",
    "airportlive.in",
  ],
};

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: `${siteConfig.name} — ${BUSINESS.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: description ?? siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: BUSINESS.name }],
    creator: BUSINESS.name,
    publisher: BUSINESS.connectedBrand,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: title ?? `${siteConfig.name} — ${BUSINESS.tagline}`,
      description: description ?? siteConfig.description,
      images: [
        {
          url: image ?? siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${BUSINESS.name} — Premium Airport Transfers Across Punjab`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? `${siteConfig.name} — ${BUSINESS.tagline}`,
      description: description ?? siteConfig.description,
      images: [image ?? siteConfig.ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
    icons: {
      icon: "/favicon.ico",
    },
    category: "Travel & Transportation",
  };
}
