/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  getBlogPost,
  getBlogSlugs,
  urlForImage,
  topicLabel,
  contentTypeBadge,
  formatDate,
  readingTime,
} from "@/lib/sanity";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found — PraiseLoop" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || undefined;
  const ogImage = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: `${title} — PraiseLoop`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

/* ── Helpers for section numbering / anchors ── */
type Heading = { key: string; num: number; text: string; id: string };

function blockText(block: { children?: Array<{ text?: string }> }): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/* ── Portable Text renderers (closes over section headings) ── */
function makeComponents(headingByKey: Map<string, Heading>): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h2: ({ children, value }) => {
        const h = headingByKey.get((value as { _key?: string })?._key ?? "");
        return (
          <h2 id={h?.id}>
            {h && <span className="sec-num">{String(h.num).padStart(2, "0")}</span>}
            <span>{children}</span>
          </h2>
        );
      },
      h3: ({ children }) => <h3>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => {
        const href = (value as { href?: string } | undefined)?.href ?? "#";
        const external = /^https?:\/\//.test(href);
        return (
          <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      },
    },
    types: {
      statCallout: ({ value }) => {
        const v = value as {
          stats?: { value: string; label?: string; source?: string }[];
          tone?: string;
        };
        const stats = v.stats ?? [];
        if (!stats.length) return null;
        return (
          <div className={`stat-callout tone-${v.tone || "orange"}`} data-count={stats.length}>
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="stat-value">{s.value}</span>
                {s.label && <span className="stat-label">{s.label}</span>}
                {s.source && <span className="stat-source">{s.source}</span>}
              </div>
            ))}
          </div>
        );
      },
      pullQuote: ({ value }) => {
        const v = value as { quote?: string; attribution?: string };
        if (!v.quote) return null;
        return (
          <blockquote className="pull-quote">
            <p>{v.quote}</p>
            {v.attribution && <cite>{v.attribution}</cite>}
          </blockquote>
        );
      },
      costStack: ({ value }) => {
        const v = value as {
          heading?: string;
          visibleTitle?: string;
          visibleItems?: string[];
          hiddenTitle?: string;
          hiddenItems?: string[];
          caption?: string;
        };
        const visible = v.visibleItems ?? [];
        const hidden = v.hiddenItems ?? [];
        if (!visible.length && !hidden.length) return null;
        return (
          <figure className="cost-stack">
            {v.heading && <div className="cost-stack-heading">{v.heading}</div>}
            <div className="cost-stack-zone above">
              {v.visibleTitle && <span className="zone-title">{v.visibleTitle}</span>}
              <ul>
                {visible.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="cost-stack-waterline">
              <span>the waterline</span>
            </div>
            <div className="cost-stack-zone below">
              {v.hiddenTitle && <span className="zone-title">{v.hiddenTitle}</span>}
              <ul>
                {hidden.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
            {v.caption && <figcaption className="cost-stack-caption">{v.caption}</figcaption>}
          </figure>
        );
      },
      image: ({ value }) => {
        const img = value as { alt?: string } | undefined;
        const src = img ? urlForImage(img)?.width(1600).fit("max").auto("format").url() : undefined;
        if (!src) return null;
        return (
          <figure className="post-figure">
            <img src={src} alt={img?.alt ?? ""} loading="lazy" />
            {img?.alt ? <figcaption>{img.alt}</figcaption> : null}
          </figure>
        );
      },
    },
  };
}

function BottomCTA() {
  return (
    <section className="post-cta">
      <div className="container container-wide">
        <div className="post-cta-card">
          <span className="eyebrow" style={{ color: "var(--orange)", justifyContent: "center" }}>
            See it live
          </span>
          <h2>Recognition that proves its ROI</h2>
          <p>
            See how PraiseLoop connects recognition to retention, engagement, and performance — with your data, in 30
            minutes.
          </p>
          <Link href="/demo" className="btn btn-primary">
            Book a demo →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const topic = topicLabel(post);
  const badge = contentTypeBadge(post.contentType);
  const clusters = post.clusters ?? [];
  const takeaways = post.keyTakeaways ?? [];
  const body = (post.body ?? []) as Array<{ _type?: string; _key?: string; style?: string; children?: Array<{ text?: string }> }>;
  const mins = readingTime(post.body);

  const headings: Heading[] = body
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b, i) => {
      const text = blockText(b);
      return { key: b._key ?? `h${i}`, num: i + 1, text, id: slugify(text) };
    });
  const headingByKey = new Map(headings.map((h) => [h.key, h]));
  const components = makeComponents(headingByKey);

  const coverSrc = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(1600).height(840).fit("crop").auto("format").url()
    : undefined;

  return (
    <div className="blog-page">
      <SiteHeader />
      <main>
        <article className="post">
          {/* Hero band */}
          <section className="post-hero">
            <div className="container container-narrow">
              <div className="post-back">
                <Link href="/blog">← All posts</Link>
              </div>

              {post.pillar && (
                <Link href={`/blog/${post.pillar.slug}`} className="post-series-up">
                  Part of the series &middot; <strong>{post.pillar.title}</strong> →
                </Link>
              )}

              <div className="blog-cat-row">
                {topic && <span className="blog-cat">{topic}</span>}
                {badge && <span className="blog-format">{badge}</span>}
              </div>
              <h1>{post.title}</h1>
              {post.excerpt && <p className="post-standfirst">{post.excerpt}</p>}
              <div className="post-meta">
                {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
                {post.publishedAt && <span aria-hidden>·</span>}
                <span>{mins} min read</span>
              </div>
            </div>
          </section>

          {coverSrc && (
            <div className="container container-wide">
              <div className="post-cover">
                <img src={coverSrc} alt={post.title} />
              </div>
            </div>
          )}

          <div className="container container-narrow post-content">
            {takeaways.length > 0 && (
              <aside className="post-takeaways">
                <span className="takeaways-label">Key takeaways</span>
                <ul>
                  {takeaways.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </aside>
            )}

            {headings.length >= 3 && (
              <nav className="post-toc" aria-label="In this article">
                <span className="toc-label">In this article</span>
                <ol>
                  {headings.map((h) => (
                    <li key={h.key}>
                      <a href={`#${h.id}`}>
                        <span className="toc-num">{String(h.num).padStart(2, "0")}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="post-body">
              {post.body ? <PortableText value={post.body} components={components} /> : null}
            </div>

            {clusters.length > 0 && (
              <aside className="post-series">
                <h2>In this series</h2>
                <ul className="post-series-list">
                  {clusters.map((c) => (
                    <li key={c._id}>
                      <Link href={`/blog/${c.slug}`}>
                        <span className="series-title">{c.title}</span>
                        {c.targetKeyword && <span className="series-kw">{c.targetKeyword}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </article>

        <BottomCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
