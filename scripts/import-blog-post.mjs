// Creates the "True Cost of Employee Turnover in GCC Enterprise" blog post
// as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// Usage (from the repo root):
//   1. Put credentials in .env.local (or the shell environment):
//        NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
//        NEXT_PUBLIC_SANITY_DATASET=production
//        SANITY_API_WRITE_TOKEN=sk...           # an Editor/write token from sanity.io/manage
//   2. Run:  node scripts/import-blog-post.mjs           (add --replace to overwrite)

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
//   { p }              → paragraph        { h2 }            → section heading
//   { quote, by }      → pull quote       { stat, tone }    → stat callout
const CONTENT = [
  { p: "There's a comfortable story GCC employers tell themselves about turnover. It goes like this: the Gulf is a stable place to work. No income tax, good salaries, safety, a high quality of life. People come and they stay. And the data appears to back it up — the UAE is regularly described as having one of the lowest turnover rates in the world." },
  { p: "The story is true. It's also a trap. Because a low average turnover rate hides a much more expensive reality: it isn't the headcount you lose that hurts. It's which people leave, what they take with them, and a regional cost structure that makes every single departure more expensive here than almost anywhere else. Most GCC enterprises have no idea what that number actually is. This piece works it out." },

  { h2: "The benchmark everyone quotes, and why it understates the Gulf" },
  { p: "Ask any HR director what turnover costs and you'll get a version of the same figure. SHRM estimates that replacing an employee costs between 50% and 200% of their annual salary. Gallup puts the replacement of a manager or leader at around 200% of salary, a technical professional at 80%, and a frontline worker at 40%. Those numbers are real, widely cited, and — for the Gulf — too low." },
  {
    stat: [
      { value: "50–200%", label: "of salary to replace an employee", source: "SHRM" },
      { value: "200%", label: "to replace a manager or leader", source: "Gallup" },
      { value: "80%", label: "a technical professional", source: "Gallup" },
      { value: "40%", label: "a frontline worker", source: "Gallup" },
    ],
    tone: "orange",
  },
  { p: "They were built on US and European labour markets, where an employee who leaves simply hands back a laptop and walks out. In the GCC, a departure triggers a set of costs that don't exist in those benchmarks at all." },
  { p: "Start with the visa. Almost ninety percent of the UAE workforce is expatriate, and residency is tied to the employer. When someone leaves, their visa is cancelled and the replacement needs a new one sponsored from scratch. Government fees for visas, medical tests, and Emirates ID run between roughly AED 3,000 and AED 6,300 per employee in the first year alone." },
  { p: "Then there's end-of-service gratuity. It accrues at roughly one month's base salary per year worked and falls due the moment the employee leaves — 21 days of basic salary per year for the first five years, 30 days per year thereafter, capped at two years' pay. A departure converts a slowly accruing liability into an immediate cash outflow." },
  {
    stat: [
      { value: "~90%", label: "of the UAE workforce is expatriate — residency tied to the employer" },
      { value: "AED 3,000–6,300", label: "visa, medical & Emirates ID, first year alone", source: "UAE government fees" },
      { value: "21–30 days", label: "of basic salary accrue as gratuity, per year of service" },
    ],
    tone: "navy",
  },
  { p: "Add the costs that do appear in the global benchmark — recruitment fees, onboarding, and the ramp-up gap. The less visible costs are usually the larger ones: the productivity gap during the vacancy, the three to six months before a new hire reaches full output, the extra load on the team that absorbs the work in the meantime, and the institutional knowledge that walks out the door." },
  {
    costStack: {
      heading: "What it costs to lose one mid-level employee",
      visibleTitle: "Above the surface — what the benchmarks count",
      visibleItems: ["Recruitment & agency fees", "Onboarding & training"],
      hiddenTitle: "Below the surface — what nobody totals",
      hiddenItems: [
        "Visa, permit & Emirates ID — re-sponsored from scratch",
        "End-of-service gratuity falling due",
        "The productivity gap during the vacancy",
        "3–6 months before the new hire reaches full output",
        "The team absorbing the extra load",
        "Institutional knowledge walking out the door",
      ],
      caption:
        "The visible costs are the tip. In the GCC, the hidden mass is bigger — and it's the part nobody owns.",
    },
  },
  { p: "Stack the Gulf-specific costs on top of the global ones and the true cost of losing a mid-level GCC employee sits comfortably at the upper end of the SHRM range — not the middle." },

  { h2: "The number nobody owns" },
  { p: "Here's the real problem. The cost of turnover is not high because any one piece of it is large. It's high because the pieces are scattered across the business, and nobody adds them up." },
  { p: "The recruitment fee sits in a procurement line. The visa and gratuity costs sit in legal and finance. Onboarding sits in L&D. The manager's lost weeks sit nowhere at all. The revenue dip from a departed account manager gets written off as “market conditions.” Five departments each carry a fragment of the cost. None of them carries the total." },
  { p: "And because no single person sees the full figure, no single person ever makes the case for fixing it with the urgency the figure deserves." },
  { quote: "This is the gap. Not ambition. Not budget. Visibility." },

  { h2: "Why the Gulf's low average is misleading" },
  { p: "The headline turnover rate flatters GCC employers because it averages two very different populations. Settled, well-compensated employees — often on golden visas, often with families anchored locally — do stay, and they pull the average down. But underneath that average sits a highly mobile expatriate professional layer for whom moving is straightforward. There's no mortgage tying them down and no family network to uproot, and lateral moves across borders are routine." },
  { p: "Nearly seventy percent of UAE employees recently reported that rising living costs are outpacing their salaries, with two-thirds considering resignation within three months. The people most likely to move are frequently the people you can least afford to lose: client-facing, high-performing, expensive to replace." },
  { p: "A 12% average turnover rate that is concentrated in your best 12% is not a stable workforce." },
  { quote: "It's a slow, invisible leak in exactly the wrong place." },

  { h2: "The Emiratisation and Saudisation multiplier" },
  { p: "For nationalised roles, the cost of a departure stops being just a financial calculation and becomes a regulatory one. Companies with Emiratisation targets are running two retention problems at once: keeping the expatriate workforce that runs daily operations, and developing and keeping the national workforce that satisfies the mandate." },
  { p: "Losing a national employee doesn't just trigger replacement costs — it sets back progress against a target with real teeth. From January 2026, fines of AED 108,000 per missing Emirati apply to private-sector shortfalls, and meeting the quota also unlocks reduced government fees and preferential access to public contracts." },
  {
    stat: [
      { value: "AED 108,000", label: "fine per missing Emirati, from January 2026", source: "UAE private-sector rule" },
      { value: "5 bands", label: "Nitaqat “Mutawar” scoring in KSA — slip one and new expat visas tighten" },
    ],
    tone: "orange",
  },
  { p: "In KSA, Nitaqat scoring — now in its Mutawar phase across five bands, from Platinum down through High Green, Mid Green, Low Green, to Red — ties national-workforce levels directly to operational privileges. Slip a band, and your ability to issue new expatriate visas tightens. A single national departure can therefore carry a cost that has nothing to do with recruitment and everything to do with your operating licence." },
  { p: "To be clear: a recognition platform is not a compliance system, and shouldn't pretend to be one. Payroll and quota systems own compliance. But the retention side of that agenda — keeping national talent engaged long enough to count — is squarely a people problem. And people problems are won or lost on whether you can see them coming." },

  { h2: "What changes when retention becomes a data problem" },
  { p: "The companies that will pull ahead on retention over the next two years won't be the ones running another engagement survey or bolting on another benefit. They'll be the ones who stop treating retention as a feeling and start treating it as data." },
  { p: "The question isn't “are our people happy?” It's sharper than that: which behaviours, which moments of recognition, which performance patterns separate the people who stay from the people who go? Most of the tools currently in use can't answer that. One of the main reasons the real cost of turnover stays unknown is that most companies simply don't track the exit costs in the first place. Engagement surveys are retrospective and opinion-based. Manual recognition tools generate goodwill but no structured data. HR dashboards count heads; they don't surface the behavioural signals that precede a resignation." },
  { p: "And the warning signs are usually there. Gallup has found that 52% of employees who leave say their manager could have done something to prevent it. The information existed. Nobody could see it in time." },
  {
    stat: [
      { value: "52%", label: "of leavers say their manager could have prevented it", source: "Gallup" },
      { value: "~70%", label: "of UAE employees say living costs are outpacing their pay" },
    ],
    tone: "teal",
  },
  { p: "That's the shift now underway, and it's arriving fastest in markets where the cost of getting it wrong is highest. The move is away from recognition as a cultural nicety and toward recognition as a data stream — one that ties acknowledgement to verified performance and turns the resulting patterns into something a leader can act on before they harden into an exit statistic." },
  { p: "It's a different kind of platform. And it begins with treating every recognition event not as a pat on the back, but as a data point about who is engaged, who is drifting, and why." },

  { h2: "The calculation worth running before your next board meeting" },
  { p: "You don't need a new system to start. You need one honest calculation most GCC HR teams have never completed in full." },
  { p: "Take your headcount. Apply your actual attrition rate, not the industry average. Multiply departures by average total compensation. Apply a replacement multiplier of 100% as a conservative floor and 200% for specialist or client-facing roles. Then add the Gulf-specific lines the global benchmarks ignore: visa and permit costs, end-of-service gratuity falling due, and agency fees." },
  { p: "That total is your annual cost of turnover. For most enterprises above a few hundred people, it runs into the millions of dirhams — and a meaningful share of it is concentrated in a small number of departures you might have prevented." },
  { p: "Then ask the only question that matters to a board: what would a fifteen percent reduction in that number be worth, and what would it cost to achieve? The answer is almost always lopsided in retention's favour." },
  { quote: "The hard part was never the maths. It was seeing the number in the first place." },
];

let keyCounter = 0;
const nextKey = (prefix) => `${prefix}${String(keyCounter++).padStart(3, "0")}`;

function textBlock(style, text) {
  return {
    _type: "block",
    _key: nextKey("blk"),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey("spn"), text, marks: [] }],
  };
}

const body = CONTENT.map((item) => {
  if (item.h2 !== undefined) return textBlock("h2", item.h2);
  if (item.quote !== undefined) {
    return {
      _type: "pullQuote",
      _key: nextKey("pq"),
      quote: item.quote,
      ...(item.by ? { attribution: item.by } : {}),
    };
  }
  if (item.stat !== undefined) {
    return {
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
    };
  }
  if (item.costStack !== undefined) {
    return { _type: "costStack", _key: nextKey("cst"), ...item.costStack };
  }
  return textBlock("normal", item.p);
});

const doc = {
  _id: "post-true-cost-of-turnover-gcc",
  _type: "blogPost",
  title: "The True Cost of Employee Turnover in GCC Enterprise",
  slug: { _type: "slug", current: "the-true-cost-of-employee-turnover-in-gcc-enterprise" },
  excerpt:
    "Why the region's reassuring turnover numbers hide a far more expensive reality — and what it takes to see it before it costs you.",
  keyTakeaways: [
    "A low average turnover rate hides the costs that matter: which people leave, and what it takes to replace them in the Gulf.",
    "Visa fees, end-of-service gratuity and agency costs push a mid-level GCC departure to the top of the SHRM 50–200% range.",
    "The true cost stays invisible because it's split across five departments and no single person totals it.",
    "For nationalised roles, a departure is also a regulatory risk — Emiratisation fines and Nitaqat band slippage.",
    "Retention becomes manageable when recognition and performance data surface the early warning signs.",
  ],
  // Content strategy (P1 in the content list): Pillar, Territory T1, Wave 1
  contentType: "pillar",
  territory: "t1",
  contentId: "P1",
  targetKeyword: "cost of employee turnover / cost of attrition",
  searchIntent: "High — problem-aware buyer quantifying a loss",
  wave: "wave-1",
  publishedAt: "2026-07-13T09:00:00Z",
  body,
  seoTitle: "The True Cost of Employee Turnover in GCC Enterprise",
  seoDescription:
    "The Gulf's low turnover rates hide a costlier reality — visa fees, end-of-service gratuity, and Emiratisation penalties make every GCC departure pricier than global benchmarks admit.",
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
  const result = replace
    ? await client.createOrReplace(doc)
    : await client.create(doc);
  console.log(`\n✓ Blog post ${replace ? "created/replaced" : "created"} in ${dataset}`);
  console.log(`  _id:      ${result._id}`);
  console.log(`  title:    ${result.title}`);
  console.log(`  type:     ${result.contentType} · ${result.territory} · ${result.contentId}`);
  console.log(`  blocks:   ${result.body?.length} (incl. stat callouts + pull quotes)`);
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
