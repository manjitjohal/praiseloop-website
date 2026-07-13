import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from "../../sanity/lib/queries";

/**
 * Read-only Sanity access for the public blog.
 *
 * Unlike sanity/lib/client.ts (which throws when the env vars are missing),
 * this module degrades gracefully: if the project isn't configured, every
 * helper returns empty data so the site still builds and renders (e.g. a
 * Vercel deploy before Sanity credentials are added). Add the env vars and the
 * blog lights up automatically.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-15";

export const sanityConfigured = Boolean(projectId);

const readClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

const imageBuilder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Returns an image URL builder, or null when Sanity isn't configured. */
export function urlForImage(source: SanityImageSource) {
  return imageBuilder ? imageBuilder.image(source) : null;
}

/* ── Taxonomy (mirrors sanity/schemaTypes/blogPost.ts) ── */

/** Reader-facing topic label per territory. */
export const TERRITORY_LABELS: Record<string, string> = {
  t1: "Performance & Retention",
  t2: "Category & Comparison",
  t3: "Localization",
  feeder: "Recognition",
};

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  pillar: "Guide",
  cluster: "Article",
  comparison: "Comparison",
  glossary: "Definition",
  feeder: "Article",
  pov: "Perspective",
  aeo: "Reference",
};

/** The category-style pill shown on cards: territory first, then a sensible fallback. */
export function topicLabel(post: {
  territory?: string;
  contentType?: string;
}): string | null {
  if (post.territory && TERRITORY_LABELS[post.territory]) return TERRITORY_LABELS[post.territory];
  if (post.contentType && CONTENT_TYPE_LABELS[post.contentType]) return CONTENT_TYPE_LABELS[post.contentType];
  return null;
}

/** A small secondary badge for content types that read as a distinct format. */
export function contentTypeBadge(contentType?: string): string | null {
  if (!contentType) return null;
  if (["pillar", "comparison", "glossary", "pov"].includes(contentType)) {
    return CONTENT_TYPE_LABELS[contentType];
  }
  return null;
}

/* ── Types ── */
export type PillarRef = {
  _id: string;
  title: string;
  slug: string;
  contentType?: string;
  territory?: string;
};

export type ClusterRef = {
  _id: string;
  title: string;
  slug: string;
  contentType?: string;
  territory?: string;
  targetKeyword?: string;
};

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featuredImage?: SanityImageSource;
  contentType?: string;
  territory?: string;
  contentId?: string;
  targetKeyword?: string;
  pillar?: PillarRef | null;
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
  searchIntent?: string;
  wave?: string;
  seoTitle?: string;
  seoDescription?: string;
  pillar?: PillarRef | null;
  clusters?: ClusterRef[];
};

/* ── Data access ── */
export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  if (!readClient) return [];
  try {
    return (await readClient.fetch<BlogPostSummary[]>(BLOG_POSTS_QUERY)) ?? [];
  } catch (err) {
    console.error("Failed to load blog posts:", err);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!readClient) return null;
  try {
    return (await readClient.fetch<BlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug })) ?? null;
  } catch (err) {
    console.error(`Failed to load blog post "${slug}":`, err);
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!readClient) return [];
  try {
    return (
      (await readClient.fetch<string[]>(
        `*[_type == "blogPost" && defined(slug.current)].slug.current`
      )) ?? []
    );
  } catch (err) {
    console.error("Failed to load blog slugs:", err);
    return [];
  }
}

/* ── Helpers ── */
export function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
