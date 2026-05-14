import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/constants";
import { SEO_PAGES } from "@/data/seoPages";
import { PSEO_ROUTES } from "@/data/pSEO_routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS.website;
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/airport-taxi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/routes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Combine both data sources for dynamic pages
  const allSlugs = Array.from(new Set([...Object.keys(SEO_PAGES), ...Object.keys(PSEO_ROUTES)]));

  const seoPages: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...corePages, ...seoPages];
}
