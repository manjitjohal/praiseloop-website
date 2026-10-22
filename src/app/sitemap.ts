import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/sanity";

const BASE = "https://www.praiseloop.com";

const PAGES = [
  "", "/product", "/pilot", "/about", "/demo", "/playbook", "/roi-calculator", "/blog",
  "/for/heads-of-sales", "/for/sales-managers", "/for/reps", "/for/cs-leaders", "/for/csms",
  "/terms", "/cookies",
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBlogSlugs().catch(() => [] as string[]);
  return [
    ...PAGES.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...slugs.map((s) => ({ url: `${BASE}/blog/${s}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
