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

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
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
  const coverSrc = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(1600).height(840).fit("crop").auto("format").url()
    : undefined;

  return (
    <div className="blog-page">
      <SiteHeader />
      <main>
        <article className="post">
          <div className="container container-narrow">
            <div className="post-back">
              <Link href="/blog">← All posts</Link>
            </div>

            {post.pillar && (
              <Link href={`/blog/${post.pillar.slug}`} className="post-series-up">
                Part of the series &middot; <strong>{post.pillar.title}</strong> →
              </Link>
            )}

            <header className="post-head">
              <div className="blog-cat-row">
                {topic && <span className="blog-cat">{topic}</span>}
                {badge && <span className="blog-format">{badge}</span>}
              </div>
              <h1>{post.title}</h1>
              {post.excerpt && <p className="post-standfirst">{post.excerpt}</p>}
              {post.publishedAt && (
                <div className="post-meta">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
              )}
            </header>
          </div>

          {coverSrc && (
            <div className="container container-wide">
              <div className="post-cover">
                <img src={coverSrc} alt={post.title} />
              </div>
            </div>
          )}

          <div className="container container-narrow">
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
