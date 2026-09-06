import type { MetadataRoute } from "next";
import { roles } from "@/content/roles";
import { practiceAreas } from "@/content/practice-areas";
import { resources } from "@/content/resources";
import { siteUrl } from "@/lib/config";
export const staticPaths = [
  "/",
  "/legal-staffing",
  "/operations-staffing",
  "/about",
  "/process",
  "/contact",
  "/request-candidates",
  "/talent",
  "/confidentiality",
  "/privacy",
  "/terms",
  "/resources",
];
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths,
    ...roles.map((role) => `/roles/${role.slug}`),
    ...practiceAreas.map((area) => `/practice-areas/${area.slug}`),
    ...resources.map((resource) => `/resources/${resource.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
