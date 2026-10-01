/**
 * Section blocks shared by the homepage and the standalone landing pages
 * (/cfo, /consultancies, /playbook). Server-safe: no hooks. Styled by
 * home-v2.css under `.plh`.
 */

import Link from "next/link";
import { Icon, type IP } from "./icons";

export const BOOKING_URL = "/demo";
export const PLAYBOOK_URL = "/playbook";

/* ── Sourced stats ────────────────────────────────────── */

export type Stat = {
  stage: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  text: string;
  source: string;
  url: string;
};

/**
 * Every number on the marketing site traces to a primary source (UK
 * advertising rules require substantiation). Checked against the original
 * reports, Oct 2026. Don't add a stat here without its source.
 */
export const STATS = {
  coach: {
    stage: "Coach",
    value: 51,
    suffix: "%",
    text: "more likely to get regular coaching, if you're a top-performing seller",
    source: "RAIN Group, 2022",
    url: "https://www.rainsalestraining.com/sales-research/sales-management",
  },
  recognise: {
    stage: "Recognise",
    value: 32.5,
    decimals: 1,
    prefix: "+",
    suffix: "%",
    text: "sales against goal when recognition was introduced",
    source: "Lourenço, The Accounting Review, 2016",
    url: "https://doi.org/10.2308/accr-51148",
  },
  reward: {
    stage: "Reward",
    value: 22,
    prefix: "+",
    suffix: "%",
    text: "average performance gain from incentive programmes",
    source: "Condly et al., meta-analysis of 45 studies, 2003",
    url: "https://doi.org/10.1111/j.1937-8327.2003.tb00287.x",
  },
  result: {
    stage: "Result",
    value: 18,
    suffix: "%",
    text: "higher sales productivity in the most engaged teams",
    source: "Gallup, 2024",
    url: "https://www.gallup.com/workplace/713024/employee-engagement-and-productivity.aspx",
  },
} satisfies Record<string, Stat>;

const formatStat = (s: Stat) =>
  `${s.prefix ?? ""}${s.value.toLocaleString("en-GB", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })}${s.suffix}`;

export function StatBand({
  id, eyebrow, title, lede, stats, tone = "grey",
}: { id?: string; eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; stats: Stat[]; tone?: "grey" | "white" }) {
  return (
    <section id={id} className={`impact${tone === "white" ? " is-white" : ""}`}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className={`stats-panel cols-${stats.length}`}>
          {stats.map((s) => (
            <div key={s.stage} className="stat">
              <div className="stat-label">{s.stage}</div>
              <div
                className="stat-num"
                data-count={s.value}
                data-decimals={s.decimals ?? 0}
                data-prefix={s.prefix ?? ""}
                data-suffix={s.suffix}
              >
                {formatStat(s)}
              </div>
              <div className="stat-sub">{s.text}</div>
              <a className="stat-src" href={s.url} target="_blank" rel="noopener noreferrer">{s.source}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Hero ─────────────────────────────────────────────── */

export function PageHero({
  eyebrow, title, lede, actions, meta, media,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  actions: React.ReactNode;
  meta?: React.ReactNode;
  media?: React.ReactNode;
}) {
  return (
    <section className="hero" id="top">
      <div className={`container${media ? " hero-grid" : " hero-solo"}`}>
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          <div className="hero-cta">{actions}</div>
          {meta && <p className="hero-meta"><Icon.Check />{meta}</p>}
        </div>
        {media}
      </div>
    </section>
  );
}

/* ── Three-part block (Coach · Recognise · Reward) ────── */

export type Pillar = { Ico: React.ComponentType<IP>; h: string; p: React.ReactNode };

export function PillarGrid({
  id, eyebrow, title, lede, items, line, tone = "white",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  items: Pillar[];
  line?: React.ReactNode;
  tone?: "white" | "grey";
}) {
  return (
    <section id={id} className={`pillars${tone === "grey" ? " is-grey" : ""}`}>
      <div className="container">
        <div className="section-head center">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className={`pillar-grid cols-${items.length}`}>
          {items.map((p, i) => (
            <article key={p.h} className="pillar">
              <div className="pillar-top">
                <span className="ic"><p.Ico /></span>
                <span className="pillar-step">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </article>
          ))}
        </div>
        {line && <p className="pillar-line">{line}</p>}
      </div>
    </section>
  );
}

/* ── What it isn't ────────────────────────────────────── */

export function NotList({
  title, lede, items,
}: { title: React.ReactNode; lede?: React.ReactNode; items: { Ico: React.ComponentType<IP>; text: React.ReactNode }[] }) {
  return (
    <section className="isnt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">What it isn&apos;t</span>
          <h2>{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className="isnt-grid">
          {items.map((it, i) => (
            <div key={i} className="isnt-card">
              <span className="ic"><it.Ico /></span>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Light-teal call-to-action band (early access etc.) ── */

export function CtaBand({
  id, eyebrow, title, body, cta,
}: { id?: string; eyebrow: string; title: React.ReactNode; body: React.ReactNode; cta: { label: string; href: string } }) {
  return (
    <section className="early" id={id}>
      <div className="container early-inner">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <Link href={cta.href} className="btn btn-primary btn-arrow">{cta.label} <Icon.Arrow /></Link>
      </div>
    </section>
  );
}

/* ── Short text section ───────────────────────────────── */

export function TextSection({
  eyebrow, title, children, tone = "white",
}: { eyebrow: string; title: React.ReactNode; children: React.ReactNode; tone?: "white" | "grey" }) {
  return (
    <section className={`textsec${tone === "grey" ? " is-grey" : ""}`}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <div className="textsec-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA (dark) ───────────────────────────────── */

export function FinalCta({
  title, sub, secondary,
}: { title: React.ReactNode; sub: React.ReactNode; secondary?: { label: string; href: string } }) {
  return (
    <section className="cta2">
      <div className="container cta2-inner">
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
        <div className="cta2-actions">
          <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></Link>
          {secondary && <Link href={secondary.href} className="btn btn-outline">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}
