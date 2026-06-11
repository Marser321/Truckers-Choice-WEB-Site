import type { MetadataRoute } from "next";
import { services, locations, resources } from "@/lib/content";

const BASE_URL = "https://truckerspermitting.com";
const LOCALES = ["en", "es"] as const;

const paths = [
  "",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/packages",
  "/locations",
  ...locations.map((location) => `/locations/${location.slug}`),
  "/resources",
  ...resources.map((resource) => `/resources/${resource.slug}`),
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((alt) => [alt, `${BASE_URL}/${alt}${path}`])),
      },
    }))
  );
}
