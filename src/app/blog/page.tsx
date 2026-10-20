/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { PLAYBOOK_URL } from "@/components/site/blocks";
import { getBlogPosts, topicLabel, urlForImage, SALES_TOPIC_LABELS, type BlogPostSummary } from "@/lib/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog · PraiseLoop",
  description: "Writing for sales leaders who coach: coaching, incentives and how the two fit together.",
};

const TOPIC_TONE: Record<string, string> = { coaching: "#E8F0F0", incentives: "#FDEBDD", loop: "#F4F4F3" };

function PostCard({ post }: { post: BlogPostSummary }) {
  const tag = topicLabel(post);
  const cover = post.featuredImage
    ? urlForImage(post.featuredImage)?.width(800).height(300).fit("crop").auto("format").url()
    : undefined;
  return (
    <Link className="pcard" href={`/blog/${post.slug.current}`}>
      <div className="pcard-art" style={{ background: TOPIC_TONE[post.salesTopic ?? ""] ?? TOPIC_TONE.coaching }}>
        {cover && <img src={cover} alt="" loading="lazy" />}
        {tag && <span className="tag">{tag}</span>}
      </div>
      <div className="pcard-body">
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
      </div>
    </Link>
  );
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const all = await getBlogPosts();
  // Sales posts lead; the older HR and retention posts follow. Newest first within each.
  const posts = [...all.filter((p) => p.salesTopic), ...all.filter((p) => !p.salesTopic)];
  // Only topics that have posts get a tab.
  const topics = Object.entries(SALES_TOPIC_LABELS).filter(([value]) => posts.some((p) => p.salesTopic === value));
  const active = topic && topics.some(([value]) => value === topic) ? topic : undefined;
  const shown = active ? posts.filter((p) => p.salesTopic === active) : posts;

  return (
    <MarketingPage>
      <section className="hero" style={{ paddingBottom: 32 }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(36px,4.4vw,56px)" }}>For sales leaders who coach.</h1>
          <p className="lede" style={{ marginTop: 16 }}>Writing on coaching, incentives and how the two fit together.</p>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty">
              <h2>The first posts are on the way</h2>
              <p>We&apos;re writing about coaching, incentives and how the two fit together.</p>
            </div>
          ) : (
            <>
              {topics.length > 0 && (
                <nav className="tabs" aria-label="Filter posts by topic">
                  <Link className={`tab${active ? "" : " on"}`} href="/blog" aria-current={active ? undefined : "page"}>All</Link>
                  {topics.map(([value, label]) => (
                    <Link key={value} className={`tab${active === value ? " on" : ""}`} href={`/blog?topic=${value}`} aria-current={active === value ? "page" : undefined}>
                      {label}
                    </Link>
                  ))}
                </nav>
              )}
              <div className="grid2">
                {shown.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="warm" id="playbook">
        <div className="container split">
          <div className="prose">
            <h2>The sales coaching playbook</h2>
            <p>A free guide for sales managers: how to find the real gap behind a rep&apos;s number, put together a two-week plan, and tell whether it worked.</p>
            <div className="actions" style={{ marginTop: 20 }}>
              <Link className="btn btn-primary" href={PLAYBOOK_URL}>Get the playbook</Link>
            </div>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <div className="plain">
              <div>
                <h3>The five gaps</h3>
                <p>Activity, conversion at a stage, pipeline quality, drops and rises.</p>
              </div>
              <div>
                <h3>Two-week plans</h3>
                <p>A template for each gap.</p>
              </div>
              <div>
                <h3>Measuring it</h3>
                <p>Before and after, against the rep&apos;s own normal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roi">
        <div className="container split">
          <div className="prose">
            <h2>ROI calculator</h2>
            <p>Put in your revenue, team size and how many reps are below target, and see what moving them closer to target would be worth.</p>
          </div>
          <div>
            <Link className="btn btn-ghost" href="/roi-calculator">Try the calculator</Link>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
