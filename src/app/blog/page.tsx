/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  getBlogPosts,
  urlForImage,
  topicLabel,
  contentTypeBadge,
  formatDate,
  TERRITORY_LABELS,
  type BlogPostSummary,
} from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — PraiseLoop",
  description:
    "Insights on employee recognition, retention economics, and HR strategy — written for People leaders across the GCC and beyond.",
};

const TERRITORIES = [
  { value: "t1", blurb: "Turnover, retention, productivity, manager effectiveness." },
  { value: "t2", blurb: "Workforce intelligence, buyer guides and comparisons." },
  { value: "t3", blurb: "Emiratisation, Saudization and GCC-specific realities." },
  { value: "feeder", blurb: "Recognition, gamification and frontline engagement." },
];

// Planned Wave-1 pieces from the content list — shown until they're published.
const ROADMAP = [
  { title: "Why Top Performers Leave — And How to See It Coming", territory: "t1" },
  { title: "Employee Turnover Rate UAE / KSA: Benchmarks for 2026", territory: "t1" },
  { title: "How to Reduce Employee Turnover in High-Attrition Workforces", territory: "t1" },
];

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

  const topic = topicLabel(post);
  return (
    <div className="blog-thumb placeholder" data-territory={post.territory ?? "default"}>
      <span className="ph-loop" aria-hidden>
        ↻
      </span>
      <div className="ph-inner">
        {topic && <span className="ph-kicker">{topic}</span>}
        <span className="ph-title">{post.title}</span>
      </div>
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
        <span className="featured-kicker">Featured</span>
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

function TopicRail({
  active,
  counts,
}: {
  active?: string;
  counts: Record<string, number>;
}) {
  return (
    <div className="topic-rail">
      <div className="topic-rail-head">
        <span className="eyebrow no-dot">Browse by topic</span>
        {active && (
          <Link href="/blog" className="topic-clear">
            Clear filter ✕
          </Link>
        )}
      </div>
      <div className="topic-grid">
        {TERRITORIES.map((t) => (
          <Link
            key={t.value}
            href={active === t.value ? "/blog" : `/blog?territory=${t.value}`}
            className={`topic-card${active === t.value ? " active" : ""}`}
            data-territory={t.value}
          >
            <span className="topic-count">{counts[t.value] ?? 0}</span>
            <span className="topic-name">{TERRITORY_LABELS[t.value]}</span>
            <span className="topic-blurb">{t.blurb}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <section className="roadmap">
      <div className="roadmap-head">
        <span className="eyebrow">On the roadmap</span>
        <p>More Wave 1 pieces in the Performance &amp; Retention series, publishing soon.</p>
      </div>
      <div className="roadmap-grid">
        {ROADMAP.map((r) => (
          <div key={r.title} className="roadmap-card" data-territory={r.territory}>
            <span className="roadmap-tag">Coming soon</span>
            <span className="roadmap-title">{r.title}</span>
            <span className="roadmap-topic">{TERRITORY_LABELS[r.territory]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ territory?: string }>;
}) {
  const { territory } = await searchParams;
  const posts = await getBlogPosts();

  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    if (p.territory) acc[p.territory] = (acc[p.territory] ?? 0) + 1;
    return acc;
  }, {});

  const activeTerritory = territory && TERRITORY_LABELS[territory] ? territory : undefined;
  const filtered = activeTerritory ? posts.filter((p) => p.territory === activeTerritory) : posts;
  const [featured, ...rest] = filtered;
  const showRoadmap = posts.length > 0 && posts.length < 6;

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
                <TopicRail active={activeTerritory} counts={counts} />

                {filtered.length === 0 ? (
                  <div className="blog-empty small">
                    <p>
                      No posts in <strong>{TERRITORY_LABELS[activeTerritory ?? ""]}</strong> yet.{" "}
                      <Link href="/blog">View all posts</Link>.
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

                {showRoadmap && !activeTerritory && <Roadmap />}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
