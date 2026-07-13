/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  getBlogPosts,
  urlForImage,
  topicLabel,
  contentTypeBadge,
  formatDate,
  type BlogPostSummary,
} from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — PraiseLoop",
  description:
    "Insights on employee recognition, retention economics, and HR strategy — written for People leaders across the GCC and beyond.",
};

function Thumb({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
  const src = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(1200).height(675).fit("crop").auto("format").url()
    : undefined;

  if (src) {
    return (
      <div className="blog-thumb">
        <img src={src} alt={post.title} loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }

  return (
    <div className="blog-thumb placeholder">
      <Image src="/Orange logo - transparent bg.png" alt="" width={56} height={56} className="ph-mark" />
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPostSummary }) {
  const topic = topicLabel(post);
  const badge = contentTypeBadge(post.contentType);
  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-featured">
      <Thumb post={post} priority />
      <div className="blog-featured-body">
        <div className="blog-cat-row">
          {topic && <span className="blog-cat">{topic}</span>}
          {badge && <span className="blog-format">{badge}</span>}
        </div>
        <h2>{post.title}</h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="blog-card-meta" style={{ marginTop: 8 }}>
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          <span aria-hidden>·</span>
          <span>Read article →</span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  const topic = topicLabel(post);
  const badge = contentTypeBadge(post.contentType);
  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-card">
      <Thumb post={post} />
      <div className="blog-card-body">
        <div className="blog-cat-row">
          {topic && <span className="blog-cat">{topic}</span>}
          {badge && <span className="blog-format">{badge}</span>}
        </div>
        <h3>{post.title}</h3>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        {post.publishedAt && (
          <div className="blog-card-meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="blog-page">
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <div className="container">
            <span className="eyebrow">The PraiseLoop Blog</span>
            <h1>Recognition, retention, and the numbers behind them</h1>
            <p className="lede">
              Practical thinking on employee recognition, retention economics, and HR strategy — written for People
              leaders across the GCC and beyond.
            </p>
          </div>
        </section>

        <section className="blog-list">
          <div className="container">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <h3>No posts published yet</h3>
                <p>
                  New writing is on the way. In the meantime, publish your first post in the{" "}
                  <a href="/studio">Studio</a>.
                </p>
              </div>
            ) : (
              <>
                {featured && <FeaturedCard post={featured} />}
                {rest.length > 0 && (
                  <div className="blog-grid">
                    {rest.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
