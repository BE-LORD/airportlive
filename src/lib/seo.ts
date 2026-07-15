import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

/**
 * SEO Configuration — Spec: 11_SEO_ANALYTICS_QA.md, Addon Pack #7
 * Comprehensive metadata for Google, social media, and voice search.
 */

export const siteConfig = {
  name: BUSINESS.name,
  description:
    "Luxury airport transfers across Punjab, Chandigarh, and Delhi NCR. Experience 5-star comfort in Toyota Innova Crysta with professional chauffeurs. Fixed fares, no hidden costs, and 24/7 WhatsApp booking. Trusted by 20,000+ travelers for reliable airport pickups and drops.",
  url: BUSINESS.website,
  ogImage: `${BUSINESS.website}/api/og`,
  keywords: [
    // High-Intent & Transactional
    "book airport taxi Punjab",
    "luxury airport transfer India",
    "reliable taxi Ludhiana to Delhi airport",
    "best cab service Chandigarh to Delhi airport",
    "fixed price airport taxi Punjab",
    // GEO & Local Entity
    "airport taxi Ludhiana",
    "taxi service Chandigarh airport",
    "premium cab Delhi NCR",
    "airport taxi Punjab",
    "taxi near Ludhiana railway station",
    "Chandigarh airport pickup drop",
    // Route-Specific (GEO Targeting)
    "Ludhiana to Chandigarh airport taxi",
    "Ludhiana to Delhi airport cab price",
    "Ludhiana to Amritsar airport transfer",
    "Chandigarh to Delhi airport taxi distance",
    "Delhi airport to Ludhiana cab 24/7",
    "Patiala to Delhi airport taxi",
    "Jalandhar to Delhi airport luxury cab",
    // Vehicle & Fleet
    "Innova Crysta for airport drop Punjab",
    "premium sedan for Delhi airport",
    "tempo traveller for wedding Ludhiana",
    "7 seater taxi Ludhiana to Delhi",
    // Trust & Authority
    "V3 Tour and Travels",
    "Airport Live booking",
    "V3 travels Punjab reviews",
    "safe airport taxi for females Punjab",
    "professional chauffeur Punjab",
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
