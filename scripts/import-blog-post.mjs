// Creates the "True Cost of Employee Turnover in GCC Enterprise" blog post
// as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// Usage (from the repo root):
//   1. Put credentials in .env.local (or the shell environment):
//        NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
//        NEXT_PUBLIC_SANITY_DATASET=production
//        SANITY_API_WRITE_TOKEN=sk...           # an Editor/write token from sanity.io/manage
//   2. Run:  node scripts/import-blog-post.mjs
//
// The document uses a fixed _id, so re-running is safe: pass --replace to
// overwrite an existing copy, otherwise a second run reports a conflict.

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
// Each entry becomes one Portable Text block. `h2` = section heading.
const CONTENT = [
  { style: "normal", text: "There's a comfortable story GCC employers tell themselves about turnover. It goes like this: the Gulf is a stable place to work. No income tax, good salaries, safety, a high quality of life. People come and they stay. And the data appears to back it up — the UAE is regularly described as having one of the lowest turnover rates in the world." },
  { style: "normal", text: "The story is true. It's also a trap. Because a low average turnover rate hides a much more expensive reality: it isn't the headcount you lose that hurts. It's which people leave, what they take with them, and a regional cost structure that makes every single departure more expensive here than almost anywhere else. Most GCC enterprises have no idea what that number actually is. This piece works it out." },

  { style: "h2", text: "The benchmark everyone quotes, and why it understates the Gulf" },
  { style: "normal", text: "Ask any HR director what turnover costs and you'll get a version of the same figure. SHRM estimates that replacing an employee costs between 50% and 200% of their annual salary. Gallup puts the replacement of a manager or leader at around 200% of salary, a technical professional at 80%, and a frontline worker at 40%. Those numbers are real, widely cited, and — for the Gulf — too low." },
  { style: "normal", text: "They were built on US and European labour markets, where an employee who leaves simply hands back a laptop and walks out. In the GCC, a departure triggers a set of costs that don't exist in those benchmarks at all." },
  { style: "normal", text: "Start with the visa. Almost ninety percent of the UAE workforce is expatriate, and residency is tied to the employer. When someone leaves, their visa is cancelled and the replacement needs a new one sponsored from scratch. Government fees for visas, medical tests, and Emirates ID run between roughly AED 3,000 and AED 6,300 per employee in the first year alone." },
  { style: "normal", text: "Then there's end-of-service gratuity. It accrues at roughly one month's base salary per year worked and falls due the moment the employee leaves — 21 days of basic salary per year for the first five years, 30 days per year thereafter, capped at two years' pay. A departure converts a slowly accruing liability into an immediate cash outflow." },
  { style: "normal", text: "Add the costs that do appear in the global benchmark — recruitment fees, onboarding, and the ramp-up gap. The less visible costs are usually the larger ones: the productivity gap during the vacancy, the three to six months before a new hire reaches full output, the extra load on the team that absorbs the work in the meantime, and the institutional knowledge that walks out the door." },
  { style: "normal", text: "Stack the Gulf-specific costs on top of the global ones and the true cost of losing a mid-level GCC employee sits comfortably at the upper end of the SHRM range — not the middle." },

  { style: "h2", text: "The number nobody owns" },
  { style: "normal", text: "Here's the real problem. The cost of turnover is not high because any one piece of it is large. It's high because the pieces are scattered across the business, and nobody adds them up." },
  { style: "normal", text: "The recruitment fee sits in a procurement line. The visa and gratuity costs sit in legal and finance. Onboarding sits in L&D. The manager's lost weeks sit nowhere at all. The revenue dip from a departed account manager gets written off as “market conditions.” Five departments each carry a fragment of the cost. None of them carries the total." },
  { style: "normal", text: "And because no single person sees the full figure, no single person ever makes the case for fixing it with the urgency the figure deserves. This is the gap. Not ambition. Not budget. Visibility." },

  { style: "h2", text: "Why the Gulf's low average is misleading" },
  { style: "normal", text: "The headline turnover rate flatters GCC employers because it averages two very different populations. Settled, well-compensated employees — often on golden visas, often with families anchored locally — do stay, and they pull the average down. But underneath that average sits a highly mobile expatriate professional layer for whom moving is straightforward. There's no mortgage tying them down and no family network to uproot, and lateral moves across borders are routine." },
  { style: "normal", text: "Nearly seventy percent of UAE employees recently reported that rising living costs are outpacing their salaries, with two-thirds considering resignation within three months. The people most likely to move are frequently the people you can least afford to lose: client-facing, high-performing, expensive to replace." },
  { style: "normal", text: "A 12% average turnover rate that is concentrated in your best 12% is not a stable workforce. It's a slow, invisible leak in exactly the wrong place." },

  { style: "h2", text: "The Emiratisation and Saudisation multiplier" },
  { style: "normal", text: "For nationalised roles, the cost of a departure stops being just a financial calculation and becomes a regulatory one. Companies with Emiratisation targets are running two retention problems at once: keeping the expatriate workforce that runs daily operations, and developing and keeping the national workforce that satisfies the mandate." },
  { style: "normal", text: "Losing a national employee doesn't just trigger replacement costs — it sets back progress against a target with real teeth. From January 2026, fines of AED 108,000 per missing Emirati apply to private-sector shortfalls, and meeting the quota also unlocks reduced government fees and preferential access to public contracts." },
  { style: "normal", text: "In KSA, Nitaqat scoring — now in its Mutawar phase across five bands, from Platinum down through High Green, Mid Green, Low Green, to Red — ties national-workforce levels directly to operational privileges. Slip a band, and your ability to issue new expatriate visas tightens. A single national departure can therefore carry a cost that has nothing to do with recruitment and everything to do with your operating licence." },
  { style: "normal", text: "To be clear: a recognition platform is not a compliance system, and shouldn't pretend to be one. Payroll and quota systems own compliance. But the retention side of that agenda — keeping national talent engaged long enough to count — is squarely a people problem. And people problems are won or lost on whether you can see them coming." },

  { style: "h2", text: "What changes when retention becomes a data problem" },
  { style: "normal", text: "The companies that will pull ahead on retention over the next two years won't be the ones running another engagement survey or bolting on another benefit. They'll be the ones who stop treating retention as a feeling and start treating it as data." },
  { style: "normal", text: "The question isn't “are our people happy?” It's sharper than that: which behaviours, which moments of recognition, which performance patterns separate the people who stay from the people who go? Most of the tools currently in use can't answer that. One of the main reasons the real cost of turnover stays unknown is that most companies simply don't track the exit costs in the first place. Engagement surveys are retrospective and opinion-based. Manual recognition tools generate goodwill but no structured data. HR dashboards count heads; they don't surface the behavioural signals that precede a resignation." },
  { style: "normal", text: "And the warning signs are usually there. Gallup has found that 52% of employees who leave say their manager could have done something to prevent it. The information existed. Nobody could see it in time." },
  { style: "normal", text: "That's the shift now underway, and it's arriving fastest in markets where the cost of getting it wrong is highest. The move is away from recognition as a cultural nicety and toward recognition as a data stream — one that ties acknowledgement to verified performance and turns the resulting patterns into something a leader can act on before they harden into an exit statistic." },
  { style: "normal", text: "It's a different kind of platform. And it begins with treating every recognition event not as a pat on the back, but as a data point about who is engaged, who is drifting, and why." },

  { style: "h2", text: "The calculation worth running before your next board meeting" },
  { style: "normal", text: "You don't need a new system to start. You need one honest calculation most GCC HR teams have never completed in full." },
  { style: "normal", text: "Take your headcount. Apply your actual attrition rate, not the industry average. Multiply departures by average total compensation. Apply a replacement multiplier of 100% as a conservative floor and 200% for specialist or client-facing roles. Then add the Gulf-specific lines the global benchmarks ignore: visa and permit costs, end-of-service gratuity falling due, and agency fees." },
  { style: "normal", text: "That total is your annual cost of turnover. For most enterprises above a few hundred people, it runs into the millions of dirhams — and a meaningful share of it is concentrated in a small number of departures you might have prevented." },
  { style: "normal", text: "Then ask the only question that matters to a board: what would a fifteen percent reduction in that number be worth, and what would it cost to achieve? The answer is almost always lopsided in retention's favour." },
  { style: "normal", text: "The hard part was never the maths. It was seeing the number in the first place." },
];

const body = CONTENT.map((c, i) => ({
  _type: "block",
  _key: `blk${String(i).padStart(2, "0")}`,
  style: c.style,
  markDefs: [],
  children: [{ _type: "span", _key: `spn${String(i).padStart(2, "0")}`, text: c.text, marks: [] }],
}));

const doc = {
  _id: "post-true-cost-of-turnover-gcc",
  _type: "blogPost",
  title: "The True Cost of Employee Turnover in GCC Enterprise",
  slug: { _type: "slug", current: "the-true-cost-of-employee-turnover-in-gcc-enterprise" },
  excerpt:
    "Why the region's reassuring turnover numbers hide a far more expensive reality — and what it takes to see it before it costs you.",
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
