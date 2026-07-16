// Creates the "How to Reduce Employee Turnover in High-Attrition Workforces"
// blog post as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// C3 — a cluster of the P1 pillar (post-true-cost-of-turnover-uae). Setting
// `pillar` below powers the automatic "Part of the series" / "In this
// series" links on both pages, no manual list to maintain.
//
// Usage (from the repo root):
//   1. Credentials already live in .env.local.
//   2. Run:  node scripts/import-blog-post-c3.mjs          (add --replace to overwrite)

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = resolve(repoRoot, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

// --- Article content ---------------------------------------------------------
const CONTENT = [
  { p: "Most advice on reducing turnover assumes you can fix it with money." },
  { p: "In a market like the Gulf — mobile, expatriate-heavy, where 80% of professionals say they're open to moving for better pay, a 25% jump on the prior year per Korn Ferry's 2026 regional workforce research — that's a losing game; there's always a competitor who will pay more." },
  { p: "The employers who genuinely reduce attrition in high-churn workforces aren't winning a salary auction. They're doing a handful of less obvious things, and doing them before the employee has already decided to leave." },

  { h2: "The levers that work" },
  { p: "What actually moves the number." },
  { p: "Pay has to be in the competitive range — below it, nothing else matters. But once you're roughly at market, the factors that keep people aren't financial." },
  { p: "The levers with the most evidence behind them:" },
  {
    bulletPairs: [
      { lead: "Manager quality", rest: "The most consistent finding in retention research: the direct manager is the single biggest controllable factor. Investing in manager effectiveness outperforms almost any perk." },
      { lead: "Visible growth", rest: "Top people leave when progress feels stalled or promotion feels political. A clear, near-term development path keeps the forward motion visible." },
      { lead: "Recognition that lands", rest: "Not an annual award — consistent, specific acknowledgement tied to real contribution. Its absence is one of the quietest, most common reasons good people drift." },
      { lead: "Workload fairness", rest: "The strongest performers silently absorb the slack. Rebalancing the “high-performer tax” removes a major, invisible push factor." },
    ],
  },
  { p: "None of these is a secret. Turnover stays high not because leaders don't know the levers, but because of timing." },

  { h2: "The timing problem" },
  { p: "Why most retention effort arrives too late." },
  { p: "Every lever above works only while the person is still reachable." },
  { p: "Disengagement is mostly invisible until it's irreversible: a high performer keeps delivering while they detach, so the manager has no obvious cue to act." },
  { p: "By the time the signals are unmistakable, or the resignation lands, the levers no longer work — you can't offer a growth path to someone who's already mentally left." },
  { p: "Annual engagement surveys and exit interviews are both lagging: they explain disengagement after the window to act has closed." },
  { p: "The employers reducing turnover have shifted the timing — they intervene early, on the specific people at risk, before the decision hardens." },

  { h2: "Seeing early" },
  { p: "The lever underneath all the others: visibility." },
  { p: "Early intervention depends on early sight." },
  { p: "You can't rebalance a workload, restart a stalled growth conversation, or re-engage a manager relationship if you don't know which person needs it, this month, before they've started interviewing elsewhere." },
  { p: "That visibility can't come from sentiment — too slow, too infrequent, too easily masked." },
  { p: "It has to come from a concrete, observable pattern: specifically, whether someone's recognition frequency has dropped off — fewer acknowledgements, less frequent positive contact from their manager, over a sustained period — because that decay is a real, event-based signal that moves before a resignation does, not after." },
  { p: "This is what PraiseLoop is built to provide. Recognition is the mechanism — every acknowledgement of good work is a verified, KPI-linked event captured as teams operate." },
  { p: "The product is the workforce intelligence that turns those events into an early read on who is drifting, while there's still time to pull a lever." },
  { p: "Because it's deterministic — built on events that happened, through the Outcome Engine, not inferred from sentiment — it gives managers a reason to act this week, on this person." },

  { h2: "The bottom line" },
  { p: "Reduce what you can finally see." },
  { p: "You won't out-pay the market, and you don't need to." },
  { p: "The levers that reduce turnover — better managers, visible growth, real recognition, fair workloads — are well understood." },
  { quote: "What separates the employers who actually move the number isn't knowing the levers. It's seeing, early enough to use them, which of their people are slipping away." },
];

let keyCounter = 0;
const nextKey = (prefix) => `${prefix}${String(keyCounter++).padStart(3, "0")}`;

function span(text, marks = []) {
  return { _type: "span", _key: nextKey("spn"), text, marks };
}

function textBlock(style, text) {
  return {
    _type: "block",
    _key: nextKey("blk"),
    style,
    markDefs: [],
    children: [span(text)],
  };
}

function listBlock(listItem, text, spans) {
  return {
    _type: "block",
    _key: nextKey("blk"),
    style: "normal",
    listItem,
    level: 1,
    markDefs: [],
    children: spans ?? [span(text)],
  };
}

const body = CONTENT.flatMap((item) => {
  if (item.h2 !== undefined) return [textBlock("h2", item.h2)];
  if (item.h3 !== undefined) return [textBlock("h3", item.h3)];
  if (item.quote !== undefined) {
    return [
      {
        _type: "pullQuote",
        _key: nextKey("pq"),
        quote: item.quote,
        ...(item.by ? { attribution: item.by } : {}),
      },
    ];
  }
  if (item.stat !== undefined) {
    return [
      {
        _type: "statCallout",
        _key: nextKey("sc"),
        tone: item.tone || "orange",
        stats: item.stat.map((s) => ({
          _type: "stat",
          _key: nextKey("st"),
          value: s.value,
          ...(s.label ? { label: s.label } : {}),
          ...(s.source ? { source: s.source } : {}),
        })),
      },
    ];
  }
  if (item.bulletPairs !== undefined) {
    return item.bulletPairs.map(({ lead, rest }) =>
      listBlock("bullet", null, [span(`${lead} — `, ["strong"]), span(rest)])
    );
  }
  if (item.bullets !== undefined) {
    return item.bullets.map((text) => listBlock("bullet", text));
  }
  if (item.numbered !== undefined) {
    return item.numbered.map((text) => listBlock("number", text));
  }
  return [textBlock("normal", item.p)];
});

const doc = {
  _id: "post-reduce-turnover-high-attrition-c3",
  _type: "blogPost",
  title: "How to Reduce Employee Turnover in High-Attrition Workforces",
  slug: { _type: "slug", current: "how-to-reduce-employee-turnover-high-attrition-workforces" },
  excerpt:
    "You cannot out-pay the GCC labour market. The employers actually moving the number are doing something else — and doing it earlier.",
  keyTakeaways: [
    "You can't out-pay a market where 80% of professionals are open to moving for better pay — the levers that actually reduce turnover aren't financial.",
    "Manager quality, visible growth, real recognition, and workload fairness are the best-evidenced retention levers once pay is roughly at market.",
    "Every lever only works while the person is still reachable — disengagement is invisible until it's already irreversible.",
    "Annual surveys and exit interviews are lagging indicators; the employers who move the number intervene earlier, on specific at-risk people.",
    "Recognition-frequency decay is the earliest observable signal — it moves before a resignation does, giving managers a real window to act.",
  ],
  // Content strategy: Cluster of P1, Territory T1, Wave 1
  contentType: "cluster",
  territory: "t1",
  pillar: { _type: "reference", _ref: "post-true-cost-of-turnover-uae" },
  contentId: "C3",
  targetKeyword: "how to reduce employee turnover",
  searchIntent: "High — HR/People leader looking for actionable retention strategies",
  wave: "wave-1",
  publishedAt: "2026-07-13T09:00:00Z",
  body,
  seoTitle: "How to Reduce Employee Turnover in High-Attrition Workforces",
  seoDescription:
    "You cannot out-pay the GCC labour market. The employers actually moving the number are doing something else — and doing it earlier.",
};

// --- Create in Sanity --------------------------------------------------------
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-15";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_TOKEN;

const missing = [];
if (!projectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) missing.push("SANITY_API_WRITE_TOKEN (an Editor token from sanity.io/manage)");
if (missing.length) {
  console.error(
    `\nMissing required config:\n  - ${missing.join(
      "\n  - "
    )}\n\nSet them in .env.local or the shell, then re-run:\n  node scripts/import-blog-post-c3.mjs\n`
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
const replace = process.argv.includes("--replace");

try {
  if (replace && !doc.featuredImage) {
    const existing = await client.getDocument(doc._id).catch(() => null);
    if (existing?.featuredImage) {
      doc.featuredImage = existing.featuredImage;
      console.log("  (preserving existing featuredImage)");
    }
  }
  const result = replace
    ? await client.createOrReplace(doc)
    : await client.create(doc);
  console.log(`\n✓ Blog post ${replace ? "created/replaced" : "created"} in ${dataset}`);
  console.log(`  _id:      ${result._id}`);
  console.log(`  title:    ${result.title}`);
  console.log(`  type:     ${result.contentType} · ${result.territory} · ${result.contentId}`);
  console.log(`  blocks:   ${result.body?.length}`);
  console.log(`  slug:     ${result.slug?.current}`);
  console.log(`  edit at:  /studio/structure/blogPost;${result._id}\n`);
} catch (err) {
  if (err?.statusCode === 409) {
    console.error(
      `\nA document with _id "${doc._id}" already exists.\n` +
        `Re-run with --replace to overwrite it:\n  node scripts/import-blog-post-c3.mjs --replace\n`
    );
    process.exit(1);
  }
  console.error("\nFailed to create blog post:\n", err?.message || err, "\n");
  process.exit(1);
}
