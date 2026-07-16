// Creates the "Employee Turnover Rate UAE & KSA: Benchmarks for 2026" blog
// post as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// C2 — a cluster of the P1 pillar (post-true-cost-of-turnover-uae). Setting
// `pillar` below powers the automatic "Part of the series" / "In this
// series" links on both pages, no manual list to maintain.
//
// Usage (from the repo root):
//   1. Credentials already live in .env.local.
//   2. Run:  node scripts/import-blog-post-c2.mjs          (add --replace to overwrite)

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
  { p: "If you want to know whether your turnover is a problem, you need a credible number to compare against." },
  { p: "This piece puts the best-sourced 2026 figures for the UAE and Saudi Arabia in one place — actual job moves, mobility intent, salary growth, and the reasons people leave — each attributed to its source." },
  { p: "Then it goes one layer deeper than any benchmark can: because the number that matters most isn't the market average. It's which of your people are part of it." },

  { h2: "The mobility picture" },
  { p: "How much are GCC employees actually moving?" },
  { p: "Start with what actually happened, not what people say they'll do: 27% of GCC professionals changed employers in 2025, and close to four in ten are considering a move in 2026, per the Hays GCC Salary Guide 2026, a survey of more than 1,600 employers and professionals across the region." },
  { p: "For context, US voluntary turnover averaged 13% over the same period (Mercer, 2,617 organisations) — Gulf mobility runs roughly double the US baseline." },
  {
    stat: [
      { value: "27%", label: "of GCC professionals changed employers in 2025", source: "Hays GCC Salary Guide 2026" },
      { value: "~40%", label: "considering a move in 2026", source: "Hays GCC Salary Guide 2026" },
      { value: "13%", label: "US voluntary turnover, for comparison", source: "Mercer, 2025" },
    ],
    tone: "orange",
  },
  { p: "The intent layer is even starker. 80% of employees in the UAE and Saudi Arabia say they are willing to change jobs for better pay, a 25% jump on the prior year, per Korn Ferry research spanning more than 1,000 organisations and 400,000 employees." },
  { p: "That is not 80% actively job-hunting, but it is a workforce sitting with its options open." },
  { p: "The driver is a squeeze — and a paradox." },
  { p: "Korn Ferry's 2026 pay forecast puts salary growth at 4.1% in the UAE, 4.6% in Saudi Arabia — the highest in the region — and 4.3% in Qatar and Oman." },
  { p: "Hays found 58% of professionals received a pay rise in 2025 (up from 51% the year before), yet 60% still feel their pay does not match their responsibilities." },
  { p: "Raises are happening; they just aren't closing the gap with cost-of-living pressure, especially housing and education. When pay stops keeping pace with the bills, willingness to move rises — and shows up later as turnover." },
  { quote: "80% willing to move is not 80% leaving. It is the size of the pool your competitors are fishing in — and the cost of being the easiest catch." },

  { h2: "The 2026 benchmark table" },
  { p: "What the sourced numbers say." },
  {
    bulletPairs: [
      { lead: "Changed employers in 2025 (GCC)", rest: "27% — Hays GCC Salary Guide 2026 (1,600+ surveyed)." },
      { lead: "Considering a move in 2026", rest: "~40% — Hays GCC Salary Guide 2026." },
      { lead: "Willing to switch jobs for better pay (UAE/KSA)", rest: "80%, +25% YoY — Korn Ferry (1,000+ orgs, 400,000 employees)." },
      { lead: "UAE salary growth", rest: "4.1% — Korn Ferry Salary Forecast 2026." },
      { lead: "Saudi Arabia salary growth", rest: "4.6% — Korn Ferry Salary Forecast 2026." },
      { lead: "Qatar / Oman salary growth", rest: "4.3% — Korn Ferry Salary Forecast 2026." },
      { lead: "Received a pay rise in 2025", rest: "58%, vs 51% in 2024 — Hays GCC Salary Guide 2026." },
      { lead: "Feel pay doesn't match responsibilities", rest: "60% — Hays GCC Salary Guide 2026." },
      { lead: "Organisations reporting skills gaps", rest: "90% — Hays GCC Salary Guide 2026." },
      { lead: "US voluntary turnover (comparator)", rest: "13% — Mercer 2025 Turnover Survey." },
    ],
  },
  { p: "Two of these numbers deserve top billing on their own." },
  { p: "Saudi Arabia now leads the region on pay growth, a direct result of Vision 2030-driven competition for talent." },
  { p: "And the 27%-versus-13% gap with the US means a Gulf employer loses people at roughly twice the rate its global benchmarks assume — budgets and workforce plans imported from HQ will systematically understate the problem." },

  { h2: "Why they leave (and why it's not all pay)" },
  { p: "When Hays asked employers why they lose talent, pay led — but didn't dominate: low salaries and benefits (38%), competition for talent (31%), and lack of career progression (28%)." },
  {
    stat: [
      { value: "38%", label: "cite low salaries & benefits", source: "Hays GCC Salary Guide 2026" },
      { value: "31%", label: "cite competition for talent", source: "Hays GCC Salary Guide 2026" },
      { value: "28%", label: "cite lack of career progression", source: "Hays GCC Salary Guide 2026" },
    ],
    tone: "navy",
  },
  { p: "Nearly a third of attrition is attributed to something no counter-offer fixes." },
  { p: "PwC's Middle East Workforce Hopes and Fears survey (1,286 employees) sharpens the same point from the employee side: Gulf employees rank job security among their top priorities at higher rates than global peers, 69% gained new skills in the past year (versus 56% globally), and 81% prefer roles that build transferable skills." },
  { p: "This is not a reckless workforce — it is a development-hungry one that moves when growth stalls." },
  { p: "That matters because pay is the one lever most employers can't win on alone. Progression, recognition and visible development are levers you control entirely." },

  { h2: "The layer the average can't show you" },
  { p: "Your turnover isn't a number. It's specific people." },
  { p: "Here's what even a fully-sourced benchmark table can't tell you: a company-wide rate is an average of wildly different realities." },
  { p: "A 27% market figure might be 8% in one team and 40% in another, under one struggling manager, concentrated in your highest-value roles." },
  { p: "The benchmark tells you whether to worry. It can't tell you where the problem is, who is at risk, or when — while there's still time to act." },
  { quote: "A market benchmark is a mirror, not a map. It shows you how you compare." },
  { p: "Seeing who is actually leaving takes a different kind of visibility — deterministic, behavioural intelligence that tracks engagement at the level of the individual and the team, not the company average reported a quarter too late." },
  { p: "PraiseLoop's Outcome Engine captures verified, KPI-linked events as teams work, building an early read on where engagement is decaying — and because a third of attrition traces to progression and recognition, not pay, it's decay a manager can actually reverse." },

  { h2: "The bottom line" },
  { p: "Use the benchmark. Then look past it." },
  { p: "The 2026 picture is clear and well-supported: more than a quarter of the market changed jobs last year, twice the US rate; pay is rising but not keeping pace with expectations; and a meaningful share of attrition is driven by progression, not compensation." },
  { p: "That's the most complete public benchmark available for the region this year." },
  { quote: "But the employers who actually move the number are the ones who stop managing to the average and start seeing the specific, individual attrition it hides." },
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
  _id: "post-turnover-benchmarks-uae-ksa-c2",
  _type: "blogPost",
  title: "Employee Turnover Rate UAE & KSA: Benchmarks for 2026",
  slug: { _type: "slug", current: "employee-turnover-rate-uae-ksa-benchmarks-2026" },
  excerpt:
    "The most complete, best-sourced picture of GCC turnover and job mobility for 2026 — reconciling Korn Ferry, Hays, PwC and Mercer in one place — and the sharper layer underneath it that most benchmarks miss.",
  keyTakeaways: [
    "27% of GCC professionals changed employers in 2025 — roughly double the 13% US voluntary-turnover baseline.",
    "80% of UAE/KSA employees are open to moving for better pay, up 25% year-on-year, even as raises land (58% got one in 2025).",
    "Pay leads employer-cited reasons for attrition (38%) but doesn't dominate — competition for talent (31%) and stalled progression (28%) account for most of the rest.",
    "Saudi Arabia now leads the region on salary growth (4.6%), driven by Vision 2030 competition for talent.",
    "A company-wide benchmark is a mirror, not a map — the real risk sits in specific teams and individuals a market average can't show you.",
  ],
  // Content strategy: Cluster of P1, Territory T1, Wave 1
  contentType: "cluster",
  territory: "t1",
  pillar: { _type: "reference", _ref: "post-true-cost-of-turnover-uae" },
  contentId: "C2",
  targetKeyword: "GCC employee turnover rate 2026 / UAE KSA turnover benchmarks",
  searchIntent: "High — buyer benchmarking their own turnover against the market",
  wave: "wave-1",
  publishedAt: "2026-07-13T09:00:00Z",
  body,
  seoTitle: "Employee Turnover Rate UAE & KSA: Benchmarks for 2026",
  seoDescription:
    "The most complete, best-sourced picture of GCC turnover and job mobility for 2026 — reconciling Korn Ferry, Hays, PwC and Mercer in one place.",
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
    )}\n\nSet them in .env.local or the shell, then re-run:\n  node scripts/import-blog-post-c2.mjs\n`
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
        `Re-run with --replace to overwrite it:\n  node scripts/import-blog-post-c2.mjs --replace\n`
    );
    process.exit(1);
  }
  console.error("\nFailed to create blog post:\n", err?.message || err, "\n");
  process.exit(1);
}
