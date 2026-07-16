// Creates the "True Cost of Employee Turnover in the UAE (2026)" blog post
// as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// This is the P1 pillar post — UAE-specific figures, Emiratisation penalty
// schedule, and an FAQ section. It replaced an earlier GCC-wide draft of P1.
//
// Usage (from the repo root):
//   1. Credentials already live in .env.local:
//        NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
//   2. Run:  node scripts/import-blog-post.mjs          (add --replace to overwrite)

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// --- Minimal .env.local loader (Node does not read it automatically) ---------
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
// Each entry becomes one Portable Text block:
//   { p }                → paragraph          { h2 }          → section heading
//   { h3 }                → sub-heading        { quote, by }   → pull quote
//   { stat, tone }        → stat callout       { costStack }   → iceberg figure
//   { bullets }           → bullet list (plain strings)
//   { bulletPairs }       → bullet list, each item "**lead** — rest"
//   { numbered }          → ordered list
const CONTENT = [
  { p: "There's a comfortable story UAE employers tell themselves about turnover. It goes like this: the Gulf is a stable place to work — no income tax, good salaries, safety, a high quality of life. People come and they stay." },
  { p: "The data appears to back it up: the UAE is regularly described as having one of the lowest turnover rates in the world." },
  { p: "The story is true. It's also incomplete." },
  { p: "A low average turnover rate hides a much more expensive reality: it isn't the headcount you lose that hurts, it's which people leave, what they take with them, and a regional cost structure that makes every departure more expensive here than almost anywhere else." },
  { p: "Most UAE and wider GCC enterprises have never worked out what that number actually is for their own business. Here's how, with a worked example." },

  { h2: "What it really costs to replace an employee in the UAE" },
  { p: "Ask any HR director what turnover costs and you'll get a version of the same figure." },
  { p: "SHRM estimates replacing an employee costs 50–200% of their annual salary. Gallup puts the replacement of a manager or leader at around 200% of salary, a technical professional at 80%, and a frontline worker at 40%." },
  { p: "Those numbers are real and widely cited — and for the Gulf, too low." },
  {
    stat: [
      { value: "50–200%", label: "of salary to replace an employee", source: "SHRM" },
      { value: "200%", label: "to replace a manager or leader", source: "Gallup" },
      { value: "80%", label: "a technical professional", source: "Gallup" },
      { value: "40%", label: "a frontline worker", source: "Gallup" },
    ],
    tone: "orange",
  },
  { p: "They were built on US and European labour markets, where an employee who leaves hands back a laptop and walks out. In the UAE, a departure triggers costs that don't exist in those benchmarks at all." },
  { p: "Start with the visa. Almost ninety percent of the UAE workforce is expatriate, and residency is tied to the employer. When someone leaves, their visa is cancelled and the replacement needs a new one sponsored from scratch — government fees for visas, medical tests, and Emirates ID run roughly AED 3,000 to AED 6,300 per employee in year one alone." },
  { p: "Then there's end-of-service gratuity: roughly one month's base salary accrued per year worked, falling due the moment the employee leaves — 21 days of basic salary per year for the first five years, 30 days per year after that, capped at two years' pay. A departure converts a slowly accruing liability into an immediate cash outflow." },
  { p: "Add the costs that do appear in the global benchmark — recruitment fees, onboarding, the ramp-up gap — and the less visible ones are usually the larger ones: the productivity gap during the vacancy, three to six months before a new hire reaches full output, the extra load on the team absorbing the work, and the institutional knowledge that leaves with them." },
  {
    costStack: {
      heading: "Worked example: one mid-level UAE employee, AED 180,000 salary",
      visibleTitle: "Above the surface — what the global benchmark counts",
      visibleItems: ["Replacement cost at a 100% multiplier — AED 180,000", "Visa, medical & Emirates ID — ~AED 4,500"],
      hiddenTitle: "Below the surface — what nobody totals",
      hiddenItems: [
        "End-of-service gratuity falling due — ~AED 15,000",
        "The productivity gap during the vacancy",
        "3–6 months before the new hire reaches full output",
        "The team absorbing the extra load",
        "Institutional knowledge walking out the door",
      ],
      caption:
        "≈ AED 199,500 to replace one mid-level UAE employee — before counting lost output. Apply the 200% multiplier for a specialist or client-facing role and the number roughly doubles.",
    },
  },

  { h2: "The number nobody owns" },
  { p: "The cost of turnover isn't high because any one piece of it is large. It's high because the pieces are scattered across the business and nobody adds them up." },
  { p: "The recruitment fee sits in procurement. The visa and gratuity costs sit in legal and finance. Onboarding sits in L&D. The manager's lost weeks sit nowhere at all. The revenue dip from a departed account manager gets written off as “market conditions.”" },
  { p: "Five departments each carry a fragment of the cost." },
  { quote: "None of them carries the total — which is why nobody makes the case for fixing it with the urgency the number deserves." },

  { h2: "How much does turnover really cost? (And why the average misleads)" },
  { p: "The headline turnover rate flatters UAE employers because it averages two very different populations." },
  { p: "Settled, well-compensated employees — often with families anchored locally — do stay, pulling the average down. Underneath that average sits a highly mobile expatriate professional layer for whom moving is straightforward: no mortgage, no family network to uproot, routine lateral moves across borders." },
  { p: "Per Korn Ferry's 2026 regional workforce research, 80% of UAE and Saudi employees say they're willing to change jobs for better pay — a 25% jump on the prior year, as salary growth (4.1% UAE, 4.6% Saudi Arabia, 4.3% Qatar/Oman) fails to keep pace with cost-of-living increases." },
  {
    stat: [
      { value: "80%", label: "of UAE/KSA employees would change jobs for better pay", source: "Korn Ferry, 2026" },
      { value: "+25%", label: "jump in job-mobility willingness vs. the prior year", source: "Korn Ferry, 2026" },
      { value: "4.1–4.6%", label: "salary growth across UAE/KSA/Qatar/Oman — trailing cost of living", source: "Korn Ferry, 2026" },
    ],
    tone: "navy",
  },
  { p: "The people most likely to move are frequently the people you can least afford to lose: client-facing, high-performing, expensive to replace." },
  { quote: "A 12% average turnover rate concentrated in your best 12% is not a stable workforce. It's a slow, invisible leak in exactly the wrong place." },

  { h2: "Emiratisation and Saudisation: the hidden compliance cost of turnover" },
  { p: "For nationalised roles, a departure stops being just a financial calculation and becomes a regulatory one." },
  { p: "Companies with Emiratisation targets are running two retention problems at once: keeping the expatriate workforce that runs daily operations, and developing and keeping the national workforce that satisfies the mandate." },
  { p: "MoHRE's fines for missing 2025 Emiratisation targets reached AED 108,000 per unfilled national position for the 20–49 employee band, collected as a lump sum in January 2026." },
  { p: "For the enterprise segment — 50+ employees, PraiseLoop's actual buyer — the structure is different: a monthly per-position fine that climbed from AED 6,000 to AED 9,000 through 2023–2025, and rises again to AED 10,000/month (AED 120,000 annually) from 1 July 2026 for companies that missed their H1 2026 checkpoint. Meeting the quota also unlocks reduced government fees and preferential access to public contracts." },
  {
    stat: [
      { value: "AED 108,000", label: "one-off fine, 20–49 employee band", source: "MoHRE, Jan 2026" },
      { value: "AED 120,000/yr", label: "fine for 50+ enterprise band, from 1 Jul 2026", source: "MoHRE" },
      { value: "5 bands", label: "Nitaqat “Mutawar” scoring in KSA — slip one and new expat visas tighten" },
    ],
    tone: "orange",
  },
  { p: "In Saudi Arabia, Nitaqat scoring — now in its Mutawar phase across five bands, from Platinum down through High Green, Mid Green, Low Green, to Red — ties national-workforce levels directly to operational privileges. Slip a band and your ability to issue new expatriate visas tightens." },
  { p: "To be clear: a recognition platform is not a compliance system, and shouldn't pretend to be one — payroll and quota systems own compliance. But the retention side of that agenda, keeping national talent engaged long enough to count, is a people problem, and people problems are won or lost on whether you can see them coming." },

  { h2: "The manager already knew" },
  { p: "Gallup research finds that 42% of voluntary employee turnover is preventable — the departing employee said their manager or employer could have changed their mind, most often through more positive one-on-one interactions or simply raising the subject of their future with the company before they'd decided to leave." },
  {
    stat: [{ value: "42%", label: "of voluntary turnover is preventable", source: "Gallup" }],
    tone: "teal",
  },
  { p: "That's the starting point for what changes next: most retention tools can't surface that signal in time. Engagement surveys are retrospective and opinion-based. Manual recognition generates goodwill but no structured data. HR dashboards count heads; they don't show the behavioural patterns that precede a resignation." },
  { p: "The shift underway among employers who hold onto their best people is from explaining departures after the fact to seeing them coming while there's still time to act — tracking which recognition events happen, to whom, and how the pattern is changing, rather than relying on an annual mood check." },
  { p: "PraiseLoop's Outcome Engine ties every recognition event to a verified, KPI-linked outcome, turning the pattern of who is and isn't being recognised into a live signal a manager can act on." },

  { h2: "How to calculate your true cost of employee turnover" },
  {
    numbered: [
      "Take your headcount and apply your actual attrition rate — not the industry average.",
      "Multiply departures by average total compensation for those roles.",
      "Apply a replacement multiplier: 100% as a conservative floor, 200% for specialist or client-facing roles.",
      "Add the UAE-specific lines global benchmarks ignore: visa and permit costs, end-of-service gratuity falling due, and agency fees.",
      "Sum the total. For most enterprises above a few hundred people, this runs into the millions of dirhams.",
      "Ask the board question: what would a 15% reduction in that number be worth, and what would it cost to achieve?",
    ],
  },
  { p: "The answer is almost always lopsided in retention's favour." },

  { h2: "Global benchmark costs vs. UAE-specific costs" },
  {
    bulletPairs: [
      { lead: "Recruitment & onboarding", rest: "Global benchmark 50–200% of salary (SHRM/Gallup) — UAE adds longer specialist search cycles." },
      { lead: "Ramp-up / productivity gap", rest: "3–6 months to full output globally — compounded in the UAE by visa processing delays." },
      { lead: "Visa & permit costs", rest: "Not part of the global benchmark — AED 3,000–6,300 per employee in year one." },
      { lead: "End-of-service gratuity", rest: "Not part of the global benchmark — roughly one month's salary per year worked, due on exit." },
      { lead: "Emiratisation / Saudisation risk", rest: "Not part of the global benchmark — AED 108,000 one-off (20–49 band) or AED 120,000/year (50+ enterprise band, from July 2026)." },
    ],
  },

  { h2: "Frequently asked questions" },
  { h3: "How much does it cost to replace an employee in the UAE?" },
  { p: "Conservatively, 100–200% of their annual salary once you add UAE-specific costs — visa, Emirates ID, end-of-service gratuity — on top of the SHRM/Gallup global benchmark. See the worked example above." },
  { h3: "What is the average employee turnover rate in the UAE?" },
  { p: "Headline rates are often cited as among the lowest globally, but this masks wide variation by role and seniority — see our companion benchmarks piece for the full 2026 picture." },
  { h3: "How is the cost of employee turnover calculated?" },
  { p: "Headcount × attrition rate × average compensation × replacement multiplier (100–200%), plus UAE-specific visa, gratuity, and agency costs. Full method above." },
  { h3: "Does losing an Emirati employee trigger a penalty?" },
  { p: "Yes. For the 20–49 employee band it's a one-off AED 108,000 fine; for enterprises with 50+ employees — PraiseLoop's actual buyer segment — it's a monthly fine rising to AED 10,000 (AED 120,000/year) from July 2026 for missed targets." },

  { h2: "The bottom line" },
  { p: "For most enterprises, the true cost of turnover runs into the millions of dirhams a year, concentrated in a small number of departures that were often preventable." },
  { quote: "The hard part was never the maths. It was seeing the number in the first place." },
];

let keyCounter = 0;
const nextKey = (prefix) => `${prefix}${String(keyCounter++).padStart(3, "0")}`;

function span(text, marks = []) {
  return { _type: "span", _key: nextKey("spn"), text, marks };
}

function textBlock(style, text, opts = {}) {
  return {
    _type: "block",
    _key: nextKey("blk"),
    style,
    markDefs: [],
    ...opts,
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
  if (item.costStack !== undefined) {
    return [{ _type: "costStack", _key: nextKey("cst"), ...item.costStack }];
  }
  if (item.bullets !== undefined) {
    return item.bullets.map((text) => listBlock("bullet", text));
  }
  if (item.bulletPairs !== undefined) {
    return item.bulletPairs.map(({ lead, rest }) =>
      listBlock("bullet", null, [span(`${lead} — `, ["strong"]), span(rest)])
    );
  }
  if (item.numbered !== undefined) {
    return item.numbered.map((text) => listBlock("number", text));
  }
  return [textBlock("normal", item.p)];
});

const doc = {
  _id: "post-true-cost-of-turnover-uae",
  _type: "blogPost",
  title: "The True Cost of Employee Turnover in the UAE (2026)",
  slug: { _type: "slug", current: "true-cost-employee-turnover-uae-gcc" },
  excerpt:
    "The UAE's low turnover rate hides a far more expensive reality. Here's how to calculate what employee turnover actually costs your business — visa, gratuity and all.",
  keyTakeaways: [
    "The UAE's headline turnover rate is low on average — but it flatters employers by masking who's actually leaving.",
    "Visa re-sponsorship (AED 3,000–6,300) and end-of-service gratuity turn a slow-accruing liability into an immediate cash cost on every exit.",
    "A mid-level UAE departure runs to roughly AED 199,500 once visa, gratuity, and a 100% replacement multiplier are counted — before lost output.",
    "For nationalised roles, a departure is also a compliance event: Emiratisation fines reach AED 120,000/year per unfilled enterprise-band position from July 2026.",
    "42% of turnover is preventable, per Gallup — the earliest warning signs are visible to managers long before someone resigns.",
  ],
  // Content strategy (P1 in the content list): Pillar, Territory T1, Wave 1
  contentType: "pillar",
  territory: "t1",
  contentId: "P1",
  targetKeyword: "cost of employee turnover UAE",
  searchIntent: "High — problem-aware buyer quantifying a loss (UAE-specific)",
  wave: "wave-1",
  publishedAt: "2026-07-13T09:00:00Z",
  body,
  seoTitle: "The True Cost of Employee Turnover in the UAE (2026)",
  seoDescription:
    "The UAE's low turnover rate hides a far more expensive reality. Here's how to calculate what employee turnover actually costs your business — visa, gratuity and all.",
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
    )}\n\nSet them in .env.local or the shell, then re-run:\n  node scripts/import-blog-post.mjs\n`
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
        `Re-run with --replace to overwrite it:\n  node scripts/import-blog-post.mjs --replace\n`
    );
    process.exit(1);
  }
  console.error("\nFailed to create blog post:\n", err?.message || err, "\n");
  process.exit(1);
}
