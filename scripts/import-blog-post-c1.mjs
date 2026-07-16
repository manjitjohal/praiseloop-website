// Creates the "Why Top Performers Leave — And How to See It Coming" blog post
// as a Sanity `blogPost` document (schema: sanity/schemaTypes/blogPost.ts).
//
// C1 — a cluster of the P1 pillar (post-true-cost-of-turnover-uae). Setting
// `pillar` below powers the automatic "Part of the series" / "In this
// series" links on both pages, no manual list to maintain.
//
// Usage (from the repo root):
//   1. Credentials already live in .env.local.
//   2. Run:  node scripts/import-blog-post-c1.mjs          (add --replace to overwrite)

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
  { p: "It arrives on an ordinary Tuesday, and it always feels sudden." },
  { p: "Your strongest performer — the one who hit every number, absorbed every hard project, never seemed to wobble — hands in their notice." },
  { p: "Leadership runs the usual post-mortem: was it pay, a title, a competitor?" },
  { p: "The honest answer, most of the time, is that the departure had been forming for months. The signs were there." },
  { p: "They simply weren't visible in anything the company was looking at." },

  { h2: "The illusion of the surprise" },
  { p: "Why the best people leave “without warning.”" },
  { p: "High performers are the hardest departures to see coming for one counter-intuitive reason: their competence hides the decline." },
  { p: "An average employee who disengages produces visibly worse work. A high performer who disengages keeps delivering — their skill covers the cracks long after the commitment has gone." },
  { p: "What actually fades isn't visible in a deliverable. It's the behaviour around the work: they stop challenging weak decisions, stop volunteering for the stretch assignment, stop mentoring, stop asking the future-focused questions." },
  { p: "The voice goes quiet first. The resignation comes last, often months after the person has mentally checked out." },
  { p: "So when a manager says “I had no idea,” they're usually telling the truth — they were watching output, which is the last thing to fall, instead of the behavioural signals that move first." },

  { h2: "What actually drives it" },
  { p: "It is rarely the money — and it shows up as behaviour before it shows up as a complaint." },
  { p: "In the GCC the reflex is to assume a competitor simply paid more, and pay genuinely matters here." },
  {
    stat: [
      { value: "80%", label: "of UAE/KSA professionals are open to moving for better pay", source: "Korn Ferry, 2026" },
      { value: "+25%", label: "jump in job-mobility willingness vs. the prior year", source: "Korn Ferry, 2026" },
    ],
    tone: "navy",
  },
  { p: "But pay is the trigger, not the cause. It's the reason someone takes the call." },
  { p: "The reason they were willing to take the call was built over months — and each of the drivers below shows up first as a behaviour, not a stated complaint, the same blind spot as above:" },
  {
    bulletPairs: [
      { lead: "Stalled growth", rest: "Top performers measure progress constantly. The moment the work stops stretching them, disengagement begins, usually before anyone notices." },
      { lead: "The high-performer tax", rest: "The reward for excellent work is more work. The strongest people quietly absorb the load others drop, and over time effort stops feeling rational." },
      { lead: "Recognition that went quiet", rest: "Early in a tenure their contribution is acknowledged constantly. As they become the reliable one, the acknowledgement fades, and the silence reads as being taken for granted." },
      { lead: "The manager", rest: "The oldest finding in retention research holds in the Gulf as everywhere: people don't leave companies, they leave managers." },
    ],
  },

  { h2: "Seeing it in time" },
  { p: "From hindsight to early warning." },
  { p: "The conventional tools are built for hindsight. The exit interview explains the loss once it's irreversible." },
  { p: "The annual engagement survey samples mood once or twice a year, long after the window to act has closed." },
  { p: "Neither tells a specific manager that a specific person is drifting, right now, while there's still time to do something." },
  { p: "What makes early sight possible is a concrete, observable pattern: specifically, whether someone who used to be recognised weekly for their contributions has gone quiet — no acknowledgement, no flagged wins — for a month or more." },
  { p: "That recognition-frequency decay is a real, event-based signal, and it moves months before a resignation does; sentiment is self-reported and easily masked, this isn't." },
  { p: "This is the principle PraiseLoop is built on. Recognition is the mechanism — every acknowledgement of good work is a verified, KPI-linked event captured in the natural flow of how teams already operate." },
  { p: "But recognition is the wedge, not the point. The product is the workforce intelligence those verified events make possible: an early, behavioural read on where engagement is decaying and which valuable people are quietly drifting toward the door." },
  { p: "That intelligence is deterministic — built on events that actually happened, captured through the Outcome Engine, not inferred from sentiment-mining or an annual survey." },

  { h2: "The bottom line" },
  { p: "A blindside resignation from a top performer is not bad luck. It's a signal the organisation couldn't see." },
  { quote: "People stay when their best work stays visible, and when the early drift gets noticed by someone who can still act on it." },
  { p: "The first step is to stop measuring only what people produce, and start seeing how they're engaging while it still makes a difference." },
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
  _id: "post-why-top-performers-leave-c1",
  _type: "blogPost",
  title: "Why Top Performers Leave — And How to See It Coming",
  slug: { _type: "slug", current: "why-top-performers-leave" },
  excerpt:
    "The resignation that blindsides you was telegraphed for months. Just not in any form your engagement survey was built to catch.",
  keyTakeaways: [
    "High performers rarely disengage in ways that show up in their output — their competence hides the decline until it's too late.",
    "Pay is usually the trigger for a resignation, not the cause; stalled growth, workload imbalance, and fading recognition build the willingness to leave.",
    "People leave managers, not companies — manager quality remains the single biggest controllable factor in retention.",
    "Recognition-frequency decay is an observable, event-based early-warning signal that moves months before a resignation does.",
    "Seeing the drift early — not just measuring output — is what turns a preventable departure into a save.",
  ],
  // Content strategy: Cluster of P1, Territory T1, Wave 1
  contentType: "cluster",
  territory: "t1",
  pillar: { _type: "reference", _ref: "post-true-cost-of-turnover-uae" },
  contentId: "C1",
  targetKeyword: "why top performers leave",
  searchIntent: "Informational — manager/HR leader trying to understand early attrition signals",
  wave: "wave-1",
  publishedAt: "2026-07-13T09:00:00Z",
  body,
  seoTitle: "Why Top Performers Leave — And How to See It Coming",
  seoDescription:
    "The resignation that blindsides you was telegraphed for months. Just not in any form your engagement survey was built to catch.",
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
    )}\n\nSet them in .env.local or the shell, then re-run:\n  node scripts/import-blog-post-c1.mjs\n`
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
        `Re-run with --replace to overwrite it:\n  node scripts/import-blog-post-c1.mjs --replace\n`
    );
    process.exit(1);
  }
  console.error("\nFailed to create blog post:\n", err?.message || err, "\n");
  process.exit(1);
}
