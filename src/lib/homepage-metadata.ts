import type { Metadata } from "next";

export const HOME_URL = "https://www.airportlive.in";
export const HOME_OG_IMAGE_PATH = "/og-airportlive-home.jpg";
export const HOME_OG_IMAGE_URL = `${HOME_URL}${HOME_OG_IMAGE_PATH}`;

export const HOME_TITLE =
  "Airport Live | Premium Airport Transfers in Punjab — V3 Tour & Travels";

export const HOME_DESCRIPTION =
  "Premium airport transfers, city rides, and outstation travel with professional chauffeurs, clean cars, and reliable service. Book Airport Live by V3 Tour & Travels at airportlive.in.";

export const HOME_SITE_NAME = "AIRPORT LIVE by V3 Tour & Travels";

export const HOME_METADATA: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: HOME_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: HOME_URL,
    siteName: HOME_SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "AIRPORT LIVE by V3 Tour & Travels premium airport transfers social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [HOME_OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
