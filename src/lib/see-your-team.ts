/**
 * "See your team on PraiseLoop" (/see-your-team): the answers a visitor gives
 * and the sample page built from them. Pure data, shared by the page and by
 * /api/see-your-team, which emails the same content.
 *
 * Every claim here must match the shipped product (coach-led, Nov 2026): the
 * Monday brief, two-week plans the manager agrees, "Did it work?" against each
 * rep’s own last eight weeks. No coins, rewards or Slack/Teams. The reps and
 * numbers are made up and labelled "Illustrative" wherever they show.
 */

import { formatMoney, type Currency } from "./roi";

export type Motion = "outbound" | "inbound" | "field" | "account";
export type Stall = "meetings" | "qualify" | "proposal" | "nextstep";
export type Spot = "week" | "fortnight" | "month" | "quarter";
export type Size = "s" | "m" | "l" | "xl";

/**
 * `deal` is an average deal size in `cur`. `dpm` is deals a rep closes in a
 * normal month; 0 means "use the default for how the team sells".
 */
export type Answers = { site: string; motion: Motion; stall: Stall; spot: Spot; size: Size; cur: Currency; deal: number; dpm: number };

/** Fallbacks for anything missing or invalid (e.g. a hand-edited URL). */
export const DEFAULTS: Answers = { site: "", motion: "outbound", stall: "proposal", spot: "month", size: "m", cur: "GBP", deal: 12_000, dpm: 0 };

/* ── Deal size (prices the slip) ───────────────────────── */

/** Same currencies as the ROI calculator, so a link between the two keeps working. */
export const CURRENCY_LIST: Currency[] = ["GBP", "USD", "EUR", "AED"];

/** Tap-to-pick bands for the deal-size question; the value is each band's working figure. */
export const DEAL_PRESETS: Record<Currency, { label: string; value: number }[]> = {
  GBP: [{ label: "Under £5k", value: 3_000 }, { label: "£5k to £20k", value: 12_000 }, { label: "£20k to £50k", value: 35_000 }, { label: "Over £50k", value: 80_000 }],
  USD: [{ label: "Under $5k", value: 3_000 }, { label: "$5k to $20k", value: 12_000 }, { label: "$20k to $50k", value: 35_000 }, { label: "Over $50k", value: 80_000 }],
  EUR: [{ label: "Under €5k", value: 3_000 }, { label: "€5k to €20k", value: 12_000 }, { label: "€20k to €50k", value: 35_000 }, { label: "Over €50k", value: 80_000 }],
  AED: [{ label: "Under AED 20k", value: 12_000 }, { label: "AED 20k to 75k", value: 45_000 }, { label: "AED 75k to 200k", value: 130_000 }, { label: "Over AED 200k", value: 300_000 }],
};
export const DEAL_MAX = 100_000_000;

export const QUARTER_WEEKS = 13;

/**
 * When a slip reaches the Monday brief: once a rep has been below their own
 * normal two weeks running (the product's own rule). Anchors the PraiseLoop
 * track of the quarter diagram, so confirm with product before changing it.
 */
export const PL_WEEKS = 2;
/** The plan runs two weeks, and "Did it work?" reads three weeks on. */
export const PLAN_WEEKS = 2;
export const VERDICT_WEEKS = 3;

/* ── The questions ─────────────────────────────────────── */

/** `dpm`: deals a rep closes in a normal month, a starting figure the visitor can change. */
export const MOTIONS: Record<Motion, { label: string; role: string; activity: string; dpm: number }> = {
  outbound: { label: "Outbound new business", role: "Account executive", activity: "calls", dpm: 3 },
  inbound: { label: "Inbound leads", role: "Account executive", activity: "calls", dpm: 4 },
  field: { label: "Field sales", role: "Field sales rep", activity: "visits", dpm: 5 },
  account: { label: "Account management", role: "Account manager", activity: "client calls", dpm: 4 },
};

export const SPOTS: Record<Spot, { label: string; weeks: number; when: string; how: string }> = {
  week: { label: "About a week", weeks: 1, when: "About a week in", how: "at the weekly pipeline review" },
  fortnight: { label: "Two to three weeks", weeks: 3, when: "Week 2 or 3", how: "when the stuck deals come up in a review" },
  month: { label: "About a month", weeks: 4, when: "Week 4", how: "in the month-end numbers" },
  quarter: { label: "Six weeks or more", weeks: 6, when: "Week 6 or later", how: "when the quarter’s numbers come in" },
};

export const SIZES: Record<Size, { label: string; reps: number }> = {
  s: { label: "Up to 5", reps: 5 },
  m: { label: "6 to 8", reps: 8 },
  l: { label: "9 to 12", reps: 11 },
  xl: { label: "More than 12", reps: 14 },
};

/* ── What each stall looks like for the lead rep, Sam ──── */

type Evidence = [label: string, value: string, tone: "ok" | "wn"];

type StallContent = {
  label: string;
  /** The first sign, in the "Today" lane. */
  slipStart: string;
  kpi: [label: string, value: string, delta: string];
  coach: string;
  gap: string;
  changedLead: string;
  changedRest: string;
  evidence: (activity: string) => Evidence[];
  /** The coach’s recommendation, to the manager. */
  plan: string;
  /** The same plan, as the coach puts it to Sam. */
  repPlan: string;
  todayStep: string;
  question: string;
  rising: string;
  did: { label: string; from: string; to: string; sub: string };
  moved: { from: string; to: string; sub: string; normal: string };
  planShort: string;
  /** The problem in a manager's words, for the kit's title. */
  problem: string;
  /** Sam's rate at the stall, normal vs slipped; wins are modelled to fall in step with it. */
  rate: { normal: number; slipped: number; say: string };
  /** The same 1:1, two ways. [speaker, line]; "M" is the manager. */
  talkToday: [speaker: "M" | "S", line: string][];
  talkPl: [speaker: "M" | "S", line: string][];
  /** The gated kit: find it in the CRM, run the habit for two weeks, measure it. */
  kit: { find: string[]; habit: string; track: string; behaviour: string; outcome: string };
};

export const STALLS: Record<Stall, StallContent> = {
  meetings: {
    label: "Getting first meetings",
    slipStart: "Sam books fewer first meetings than usual.",
    kpi: ["Meetings booked", "31", "-9 on normal"],
    coach: "The pipeline is thin at the top, not further down. Sam is booking fewer first meetings than his own normal, though his activity hasn’t dropped. I’ve drafted a two-week plan. Nothing here needs a 1:1 yet.",
    gap: "Drop from normal: 3 meetings booked in two weeks, against about 7. Plan ready.",
    changedLead: "Meetings booked: 3 in the last two weeks.",
    changedRest: "Over his last eight weeks it was about 7 a fortnight.",
    evidence: () => [["Outreach this fortnight", "140, his normal", "ok"], ["Replies that turned into a meeting", "3 of 14", "wn"], ["Replies answered the same day", "5 of 14", "wn"]],
    plan: "Sam is still getting replies. They cool off before he answers. For two weeks: answer every reply the same day, and offer two times to meet in the first message.",
    repPlan: "Your outreach is working: people are replying. The gap is the wait after they do. For two weeks, answer every reply the same day with two times to meet. I’ll show you if it works.",
    todayStep: "Answer yesterday’s 3 replies before 11, with two times each.",
    question: "When someone replies, what usually happens next, and how quickly?",
    rising: "Rising: replies turning into meetings, up on her normal. Worth a mention at the team meeting.",
    did: { label: "What he did differently", from: "36%", to: "86%", sub: "of replies answered the same day" },
    moved: { from: "3", to: "8", sub: "meetings booked a fortnight, against his own last 8 weeks", normal: "His 8-week normal · 7 a fortnight" },
    planShort: "answer every reply the same day, with two times to meet",
    problem: "too few first meetings",
    rate: { normal: 7, slipped: 3, say: "Sam books 3 first meetings a fortnight instead of about 7, and wins fall in step later in the quarter." },
    talkToday: [
      ["M", "How’s the month looking?"],
      ["S", "Bit quiet, but I’m doing the same outreach as ever."],
      ["M", "So why are the meetings down?"],
      ["S", "People just aren’t biting at the moment."],
    ],
    talkPl: [
      ["M", "People are replying to you. 9 of your last 14 replies waited more than a day for an answer."],
      ["S", "I batch them on a Friday."],
      ["M", "For two weeks, answer the same day and offer two times to meet. The coach will help you with it day to day."],
      ["S", "Fine. Want to look at the ones from this week?"],
    ],
    kit: {
      find: [
        "Pull first meetings booked per rep for the last eight weeks: meetings logged in your CRM, or deals created at your first stage.",
        "Compare each rep’s last two weeks with their own average for the eight.",
        "For anyone well below, look at their replies: how long did each wait for an answer?",
      ],
      habit: "Answer every reply the same day, with two times to meet in the first message.",
      track: "Each reply: answered the same day, with two times? Yes or no.",
      behaviour: "Replies answered the same day",
      outcome: "First meetings booked a fortnight, against the rep’s own last eight weeks",
    },
  },
  qualify: {
    label: "First meeting to opportunity",
    slipStart: "Fewer of Sam’s first meetings turn into opportunities.",
    kpi: ["First meeting to qualified", "31%", "-9 pts on normal"],
    coach: "Meetings are happening; fewer of them go anywhere. Sam is qualifying fewer first meetings than his own normal. I’ve drafted a two-week plan. Nothing here needs a 1:1 yet.",
    gap: "Conversion at a stage: 2 of 10 first meetings qualified, against about 5. Plan ready.",
    changedLead: "First meetings that became opportunities: 2 of his last 10.",
    changedRest: "Over his last eight weeks it was about 5 in 10.",
    evidence: () => [["First meetings held this fortnight", "10, his normal", "ok"], ["Timeline asked about on the first call", "3 of 10", "wn"], ["Second meeting booked before the call ended", "2 of 10", "wn"]],
    plan: "Sam is getting the meetings. He’s leaving without knowing when they want to decide. For two weeks: ask about timeline and who else decides on every first call, and book the second meeting before hanging up.",
    repPlan: "You’re getting in front of the right people. The gap is what you leave with. For two weeks, ask when they want to decide and who else is involved, and book the next meeting before you hang up. I’ll show you if it works.",
    todayStep: "On the 2pm first call, ask when they want this in place.",
    question: "On your last few first calls, what did you learn about when they want to decide?",
    rising: "Rising: first meetings turning into opportunities, up on her normal. Worth a mention at the team meeting.",
    did: { label: "What he did differently", from: "30%", to: "80%", sub: "of first calls where timeline and decision-makers came up" },
    moved: { from: "20%", to: "52%", sub: "of first meetings becoming opportunities, against his own last 8 weeks", normal: "His 8-week normal · 48%" },
    planShort: "ask about timeline and decision-makers on every first call",
    problem: "first meetings that go nowhere",
    rate: { normal: 0.5, slipped: 0.2, say: "2 in 10 of Sam’s first meetings become opportunities instead of about 5, and wins fall in step later in the quarter." },
    talkToday: [
      ["M", "How’s the month looking?"],
      ["S", "Plenty of first meetings in the diary."],
      ["M", "So why aren’t more of them turning into deals?"],
      ["S", "Bad fit, mostly. The leads aren’t great."],
    ],
    talkPl: [
      ["M", "You’re getting the meetings. On 7 of your last 10 first calls, timeline didn’t come up."],
      ["S", "I didn’t want to push on a first call."],
      ["M", "For two weeks, ask when they want to decide, and book the next meeting before you hang up. The coach will help you with it day to day."],
      ["S", "Fine. Can we go through Thursday’s call first?"],
    ],
    kit: {
      find: [
        "List the first meetings from the last eight weeks, and which became qualified opportunities.",
        "Group them by rep, and compare each rep’s last four weeks with the four before.",
        "For anyone well down, read the notes on a few that didn’t qualify: did timeline and decision-makers come up?",
      ],
      habit: "On every first call, ask when they want to decide and who else is involved, and book the next meeting before hanging up.",
      track: "Each first call: timeline asked and next meeting booked? Yes or no.",
      behaviour: "First calls where timeline and decision-makers came up",
      outcome: "First meetings becoming opportunities, against the rep’s own last eight weeks",
    },
  },
  proposal: {
    label: "After the proposal goes out",
    slipStart: "Sam’s proposals stop closing at his usual rate.",
    kpi: ["Proposal to close", "22%", "-5 pts on normal"],
    coach: "Proposals are stalling, not pipeline. Sam is closing fewer proposals than his own normal. I’ve drafted a two-week plan. Nothing here needs a 1:1 yet.",
    gap: "Conversion at proposal: 2 of 9 closed, against about 4 in 10. Plan ready.",
    changedLead: "Proposals closed: 2 of his last 9.",
    changedRest: "Over the previous eight weeks it was about 4 in 10.",
    evidence: () => [["Pipeline against target", "1.4x, healthy", "ok"], ["Proposals sent within 2 days", "9 of 9", "ok"], ["Decision call booked after the proposal", "3 of 9", "wn"]],
    plan: "Sam’s proposals are good. The deals go quiet after them. For two weeks: book the decision call before hanging up on every proposal.",
    repPlan: "Your proposals are good. The gap is after them: 6 of your last 9 had no decision call booked. For two weeks, book it before you hang up. I’ll show you if it works.",
    todayStep: "Book the decision call on the proposal you sent yesterday.",
    question: "What happens after a proposal goes out? Who’s waiting on whom?",
    rising: "Rising: proposals closing, up on her normal. Worth a mention at the team meeting.",
    did: { label: "What he did differently", from: "33%", to: "78%", sub: "of proposals with a decision call booked" },
    moved: { from: "22%", to: "41%", sub: "of proposals closed, against his own last 8 weeks", normal: "His 8-week normal · 40%" },
    planShort: "book the decision call before hanging up on every proposal",
    problem: "proposals that don’t close",
    rate: { normal: 0.4, slipped: 0.22, say: "Sam closes 2 in 9 proposals instead of about 4 in 10, so wins fall by the same share." },
    talkToday: [
      ["M", "How’s the month looking?"],
      ["S", "Bit slow, but there’s plenty in proposal."],
      ["M", "So why aren’t they closing?"],
      ["S", "Budgets, timing. They’re all still live."],
    ],
    talkPl: [
      ["M", "Your proposals go out fast. 6 of the last 9 had no decision call booked."],
      ["S", "I’ve been sending them and waiting to hear back."],
      ["M", "For two weeks, book the decision call before you hang up. The coach will help you with it day to day."],
      ["S", "Fine. Which deals first?"],
    ],
    kit: {
      find: [
        "List the deals that reached your proposal stage in the last eight weeks. In HubSpot, the “Date entered” property for that stage does this.",
        "Group them by deal owner, and count how many closed won.",
        "Compare each rep’s last four weeks with the four before. Anyone closing about a third fewer is worth a look.",
      ],
      habit: "Book the decision call before hanging up on every proposal.",
      track: "Each proposal: decision call booked before hanging up? Yes or no.",
      behaviour: "Proposals with a decision call booked",
      outcome: "Proposals closed, against the rep’s own last eight weeks",
    },
  },
  nextstep: {
    label: "Deals drifting, no next step",
    slipStart: "Sam’s deals start drifting without a dated next step.",
    kpi: ["Deals with a next step", "71%", "-12 pts on normal"],
    coach: "Deals are drifting, not disappearing. Sam has more deals with no dated next step than his own normal. I’ve drafted a two-week plan. Nothing here needs a 1:1 yet.",
    gap: "Pipeline quality: 6 deals with no dated next step, against about 2. Plan ready.",
    changedLead: "Deals with a dated next step: 9 of 15.",
    changedRest: "Over his last eight weeks it was about 13 in 15.",
    evidence: (a) => [[`${cap(a)} held this fortnight`, "22, his normal", "ok"], [`${cap(a)} that ended with an agreed next step`, "5 of 12", "wn"], ["Deals idle for 14 days or more", "6", "wn"]],
    plan: "Sam is still getting the meetings. They end without a next step. For two weeks: close every conversation with one agreed next step and a date in the diary.",
    repPlan: "Your buyers are still talking to you. The conversations are ending without a next step. For two weeks, close each one with one agreed next step and a date. I’ll show you if it works.",
    todayStep: "Put a date on the next step for your two idle deals.",
    question: "Which of your deals would you struggle to say what happens next on?",
    rising: "Rising: deals moving forward a stage, up on her normal. Worth a mention at the team meeting.",
    did: { label: "What he did differently", from: "42%", to: "80%", sub: "of conversations ending with a dated next step" },
    moved: { from: "60%", to: "85%", sub: "of open deals with a dated next step, against his own last 8 weeks", normal: "His 8-week normal · 87%" },
    planShort: "close every conversation with one agreed next step and a date",
    problem: "deals drifting without a next step",
    rate: { normal: 13 / 15, slipped: 9 / 15, say: "9 of Sam’s 15 deals have a dated next step instead of about 13, and we assume wins fall in step." },
    talkToday: [
      ["M", "How’s the month looking?"],
      ["S", "Pipeline’s full. Things are just slow."],
      ["M", "A lot of these deals haven’t moved. What’s going on?"],
      ["S", "Everyone’s busy. They’ll come back."],
    ],
    talkPl: [
      ["M", "Your buyers are still talking to you. 7 of your last 12 calls ended without a next step."],
      ["S", "They said they’d get back to me."],
      ["M", "For two weeks, end every call with one next step and a date in the diary. The coach will help you with it day to day."],
      ["S", "Fine. Let’s start with the six that have gone quiet."],
    ],
    kit: {
      find: [
        "Filter open deals with no next step date, or no activity in the last 14 days. In HubSpot, “Next activity date” and “Last activity date” do this.",
        "Group them by deal owner.",
        "Compare each rep’s count with their usual. Two or three is normal; six is a pattern.",
      ],
      habit: "Close every conversation with one agreed next step and a date in the diary.",
      track: "Each call: ended with a dated next step? Yes or no.",
      behaviour: "Calls ending with a dated next step",
      outcome: "Open deals with a dated next step, against the rep’s own last eight weeks",
    },
  },
};

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Parsing, sanitising and the URL ───────────────────── */

const pick = <T extends string>(v: unknown, allowed: Record<T, unknown>, fallback: T): T =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(allowed, v) ? (v as T) : fallback;

/** Whitelists every answer, so nothing a client sends is trusted as-is. */
export function sanitizeAnswers(raw: unknown): Answers {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const site = typeof r.site === "string" ? r.site.replace(/[\u0000-\u001f<>"]/g, "").trim().slice(0, 120) : "";
  const cur = (CURRENCY_LIST as string[]).includes(r.cur as string) ? (r.cur as Currency) : DEFAULTS.cur;
  const num = (v: unknown) => (v === null || v === undefined || v === "" ? NaN : Number(v));
  const deal = num(r.deal);
  const dpm = num(r.dpm);
  return {
    site,
    motion: pick(r.motion, MOTIONS, DEFAULTS.motion),
    stall: pick(r.stall, STALLS, DEFAULTS.stall),
    spot: pick(r.spot, SPOTS, DEFAULTS.spot),
    size: pick(r.size, SIZES, DEFAULTS.size),
    cur,
    deal: Number.isFinite(deal) ? Math.round(Math.min(DEAL_MAX, Math.max(0, deal))) : DEAL_PRESETS[cur][1].value,
    dpm: Number.isFinite(dpm) ? Math.round(Math.min(100, Math.max(0, dpm)) * 10) / 10 : 0,
  };
}

export function answersFromParams(p: URLSearchParams): Answers {
  return sanitizeAnswers({
    site: p.get("site") ?? "", motion: p.get("m"), stall: p.get("s"), spot: p.get("w"), size: p.get("n"),
    cur: p.get("c"), deal: p.get("d"), dpm: p.get("k"),
  });
}

/**
 * A full set of answers from the URL, or null. A shared or emailed link carries
 * all four choices and skips straight to the result; anything less asks.
 */
export function completeAnswersFromParams(p: URLSearchParams): Answers | null {
  const has = (k: string, allowed: Record<string, unknown>) => {
    const v = p.get(k);
    return v !== null && Object.prototype.hasOwnProperty.call(allowed, v);
  };
  return has("m", MOTIONS) && has("s", STALLS) && has("w", SPOTS) && has("n", SIZES) ? answersFromParams(p) : null;
}

/* ── The question steps, in the order they're asked ────── */

export type ChoiceKey = "motion" | "stall" | "spot" | "size";
export type StepKey = ChoiceKey | "deal" | "site";

export const STEPS: { key: StepKey; title: string; chip: string }[] = [
  { key: "motion", title: "How does your team mostly sell?", chip: "Sells" },
  { key: "stall", title: "Where do deals most often stall?", chip: "Stalls" },
  { key: "spot", title: "When a rep starts slipping, how long before their manager spots it?", chip: "Spotted after" },
  { key: "size", title: "How many reps does each manager look after?", chip: "Reps per manager" },
  { key: "deal", title: "Roughly what’s an average deal worth?", chip: "Deal size" },
  { key: "site", title: "Last one: what’s the company called?", chip: "Company" },
];

export const OPTIONS: Record<ChoiceKey, Record<string, { label: string }>> = {
  motion: MOTIONS,
  stall: STALLS,
  spot: SPOTS,
  size: SIZES,
};

/* ── The quarter: when a slip gets noticed ─────────────── */

/** Weeks of the quarter gone before anyone asks why, today and with PraiseLoop. */
export function quarter(a: Answers) {
  const today = SPOTS[a.spot].weeks;
  return { today, withPl: PL_WEEKS, back: Math.max(0, today - PL_WEEKS), plus: a.spot === "quarter" };
}

/* ── What the slip costs ───────────────────────────────── */

export const WEEKS_PER_MONTH = 52 / 12;

/**
 * Prices Sam's slip in the visitor's money. Arithmetic on their inputs only:
 * deals a rep closes a month × the share Sam's stall rate fell × deal size,
 * per week. It prices the weeks nobody noticed; it does not claim what the
 * plan wins back. Every assumption is shown on the page.
 */
export function slipCost(a: Answers) {
  const s = STALLS[a.stall];
  const dpm = a.dpm > 0 ? a.dpm : MOTIONS[a.motion].dpm;
  const drop = 1 - s.rate.slipped / s.rate.normal;
  // Round the weekly figure first and build every total from it, so the page adds up (2 × £19,000 = £38,000).
  const weekly = roundSig((dpm / WEEKS_PER_MONTH) * drop * a.deal);
  const q = quarter(a);
  return {
    dpm,
    drop,
    weekly,
    today: weekly * q.today,
    withPl: weekly * PL_WEEKS,
    back: weekly * q.back,
    /** One slip like this a quarter, unnoticed for the same number of weeks. */
    yearly: weekly * q.today * 4,
  };
}

/** Two significant figures, e.g. 18,692 → 19,000. */
export function roundSig(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const step = Math.pow(10, Math.max(0, Math.floor(Math.log10(value)) - 1));
  return Math.round(value / step) * step;
}

/** Money rounded to two significant figures, for "about £3,700". */
export function approx(value: number, cur: Currency): string {
  return formatMoney(roundSig(value), cur);
}

export function answersToParams(a: Answers): URLSearchParams {
  const p = new URLSearchParams();
  if (a.site) p.set("site", a.site);
  p.set("m", a.motion);
  p.set("s", a.stall);
  p.set("w", a.spot);
  p.set("n", a.size);
  p.set("c", a.cur);
  p.set("d", String(a.deal));
  if (a.dpm > 0) p.set("k", String(a.dpm));
  return p;
}

/**
 * "dune-freight.ae/about" → "Dune Freight". Without a dot it’s taken as a
 * name someone typed ("Dune Freight"). Empty when there’s nothing usable.
 */
export function companyFromSite(site: string): string {
  const raw = site.trim();
  if (!raw.includes(".")) {
    return raw.replace(/[^\p{L}\p{N}&'’ -]/gu, "").replace(/\s+/g, " ").trim().slice(0, 40);
  }
  const host = raw.toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#\s]/)[0];
  const label = host.includes(".") ? host.split(".")[0] : host;
  const words = label.split(/[-_]+/).filter((w) => /^[a-z0-9]+$/.test(w));
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").slice(0, 40);
}

export function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "PL";
  return (parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[1][0]).toUpperCase();
}

/* ── The page, built from the answers ──────────────────── */

export type RepLine = { initials: string; name: string; teal?: boolean; status: "ahead" | "ontrack" | "behind"; gap: string };

export function buildTeam(a: Answers) {
  const company = companyFromSite(a.site);
  const motion = MOTIONS[a.motion];
  const stall = STALLS[a.stall];
  const spot = SPOTS[a.spot];
  const reps = SIZES[a.size].reps;

  const sam: RepLine = { initials: "SA", name: "Sam A.", teal: true, status: "behind", gap: stall.gap };
  const priya: RepLine = { initials: "PK", name: "Priya K.", status: "ahead", gap: stall.rising };
  const rest: RepLine[] = [
    { initials: "OR", name: "Omar R.", status: "ontrack", gap: "Plan running, day 6. Early signal: the habit is sticking." },
    { initials: "JL", name: "Jess L.", teal: true, status: "ontrack", gap: "Steady against her normal. Nothing to do." },
    { initials: "DM", name: "Dan M.", status: "behind", gap: "Early read: one signal so far. The coach is watching; nothing to do yet." },
  ].slice(0, Math.max(0, reps - 2)) as RepLine[];
  const more = Math.max(0, reps - 2 - rest.length);

  return {
    company,
    teamName: company ? `${company}’s team` : "your team",
    at: company || "your team",
    avatar: initials(company || "Your team"),
    role: motion.role,
    activity: motion.activity,
    reps,
    spot,
    stall,
    sam,
    priya,
    rest,
    more,
    evidence: stall.evidence(motion.activity),
  };
}

export type Team = ReturnType<typeof buildTeam>;

/** One line per answer, for the lead email and the demo form’s message. */
export function summarise(a: Answers): string {
  return [
    a.site ? `Website: ${a.site}` : null,
    `Sells: ${MOTIONS[a.motion].label}`,
    `Deals stall: ${STALLS[a.stall].label}`,
    `A slipping rep is spotted after: ${SPOTS[a.spot].label}`,
    `Reps per manager: ${SIZES[a.size].label}`,
    `Average deal: ${formatMoney(a.deal, a.cur)}`,
    `Deals a rep closes a month: ${a.dpm > 0 ? a.dpm : `${MOTIONS[a.motion].dpm} (default)`}`,
  ].filter(Boolean).join(" · ");
}
