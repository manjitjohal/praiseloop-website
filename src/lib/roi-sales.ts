/**
 * Sales ROI model for /roi-calculator (the default calculator).
 *
 * Anchored on numbers a sales leader already knows: company revenue against
 * the size of the team that sells it, how many reps are below target, and
 * where they land. The one lever is a performance lift on the reps below
 * target, capped at target. Reps already at target are left out of the gain.
 *
 * Shared by the client and /api/roi, so the page and the emailed business case
 * always agree. The company-wide model lives in ./roi.ts, alongside the
 * currency, ramp, pilot and formatting helpers this file reuses.
 *
 * Every default is a modelled assumption, labelled as such on the page.
 */

import { CURRENCIES, PILOT_MAX_SEATS, type Currency, type Range } from "./roi";

export type SalesInputs = {
  currency: Currency;
  /** Annual company revenue. */
  revenue: number;
  /** Quota-carrying sales reps. */
  reps: number;
  /** Share of reps below target, %. */
  belowTarget: number;
  /** Where reps below target land on average, % of target. */
  attainment: number;
  /** Performance lift on reps below target, %. Capped at target. */
  lift: number;
  /** Gross margin, %. Turns added revenue into the gross profit the business case nets against cost. */
  grossMargin: number;
  /** PraiseLoop cost per rep per month. */
  seatPrice: number;
  /** Reward budget per rep per year (coins redeemed for real rewards). */
  rewardBudget: number;
};

export type SalesKey = Exclude<keyof SalesInputs, "currency">;

/** Revenue defaults and bounds per currency. Seat price comes from the shared CURRENCIES table. */
const SALES_CURRENCIES: Record<Currency, { revenue: number; revenueRange: Range; rewardBudget: number }> = {
  GBP: { revenue: 40_000_000, revenueRange: { min: 500_000, max: 2_000_000_000, step: 1 }, rewardBudget: 500 },
  USD: { revenue: 50_000_000, revenueRange: { min: 500_000, max: 2_500_000_000, step: 1 }, rewardBudget: 650 },
  EUR: { revenue: 45_000_000, revenueRange: { min: 500_000, max: 2_000_000_000, step: 1 }, rewardBudget: 575 },
  AED: { revenue: 180_000_000, revenueRange: { min: 2_000_000, max: 9_000_000_000, step: 1 }, rewardBudget: 2_300 },
};

export function salesRangeFor(key: SalesKey, currency: Currency): Range {
  const c = SALES_CURRENCIES[currency];
  switch (key) {
    case "revenue": return c.revenueRange;
    case "reps": return { min: 2, max: 5_000, step: 1 };
    case "belowTarget": return { min: 5, max: 95, step: 1 };
    case "attainment": return { min: 20, max: 95, step: 1 };
    case "lift": return { min: 0, max: 30, step: 0.5 };
    case "grossMargin": return { min: 5, max: 95, step: 1 };
    case "seatPrice": return { min: 0, max: CURRENCIES[currency].seatPrice * 5, step: currency === "AED" ? 1 : 0.5 };
    case "rewardBudget": return { min: 0, max: c.rewardBudget * 10, step: currency === "AED" ? 50 : 10 };
  }
}

export function defaultSalesInputs(currency: Currency = "GBP"): SalesInputs {
  return {
    currency,
    revenue: SALES_CURRENCIES[currency].revenue,
    reps: 40,
    belowTarget: 55,
    attainment: 70,
    lift: 10,
    grossMargin: 50,
    seatPrice: CURRENCIES[currency].seatPrice,
    rewardBudget: SALES_CURRENCIES[currency].rewardBudget,
  };
}

/** Switch currency, resetting only the money inputs to that currency's defaults. */
export function salesWithCurrency(inputs: SalesInputs, currency: Currency): SalesInputs {
  const d = defaultSalesInputs(currency);
  return { ...inputs, currency, revenue: d.revenue, seatPrice: d.seatPrice, rewardBudget: d.rewardBudget };
}

const SALES_KEYS = Object.keys(defaultSalesInputs()).filter((k) => k !== "currency") as SalesKey[];

/** Coerce untrusted values (URL params, API bodies) into a valid, clamped input set. */
export function sanitizeSalesInputs(raw: unknown): SalesInputs {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const currency = (Object.keys(CURRENCIES) as Currency[]).includes(src.currency as Currency)
    ? (src.currency as Currency)
    : "GBP";
  const out = defaultSalesInputs(currency);
  for (const key of SALES_KEYS) {
    const n = Number(src[key]);
    if (src[key] === undefined || src[key] === "" || !Number.isFinite(n)) continue;
    const { min, max } = salesRangeFor(key, currency);
    out[key] = Math.min(max, Math.max(min, n));
  }
  return out;
}

/* ── URL state (shareable links) ─────────────────────────── */

/** Kept distinct from the company-wide params, so an old company-wide link can be told apart and redirected. */
const PARAM: Record<keyof SalesInputs, string> = {
  currency: "cur",
  revenue: "rev",
  reps: "reps",
  belowTarget: "below",
  attainment: "att",
  lift: "lift",
  grossMargin: "gm",
  seatPrice: "sp",
  rewardBudget: "rb",
};

/** Pricing is kept off the public page, so links from the free view leave the cost inputs out. */
const COST_KEYS: (keyof SalesInputs)[] = ["seatPrice", "rewardBudget"];

export function salesToSearchParams(inputs: SalesInputs, opts: { includeCosts?: boolean } = {}): URLSearchParams {
  const includeCosts = opts.includeCosts ?? true;
  const p = new URLSearchParams();
  for (const key of Object.keys(PARAM) as (keyof SalesInputs)[]) {
    if (!includeCosts && COST_KEYS.includes(key)) continue;
    p.set(PARAM[key], String(inputs[key]));
  }
  return p;
}

export function salesFromSearchParams(params: URLSearchParams): SalesInputs | null {
  if (![...params.keys()].some((k) => Object.values(PARAM).includes(k))) return null;
  const raw: Record<string, string> = {};
  for (const key of Object.keys(PARAM) as (keyof SalesInputs)[]) {
    const v = params.get(PARAM[key]);
    if (v !== null) raw[key] = v;
  }
  return sanitizeSalesInputs(raw);
}

/* ── The model ───────────────────────────────────────────── */

export type SalesResult = {
  /** Company revenue ÷ sales reps. */
  revenuePerRep: number;
  repsAtTarget: number;
  repsBelow: number;
  /** Target-level output in rep-equivalents: reps at target, plus reps below target × their attainment. */
  repEquivalents: number;
  /** What a rep at target brings in, implied from revenue, team size and attainment. */
  targetPerRep: number;
  /** What a rep below target brings in today. */
  belowRepRevenue: number;
  /** Revenue from all reps below target today. */
  belowRevenue: number;
  /** Revenue between where reps below target land and target. */
  gap: number;
  /** Attainment of reps below target after the lift, % of target (never above 100). */
  newAttainment: number;
  /** True when the lift would have pushed reps below target past target. */
  capped: boolean;
  addedRevenue: number;
  /** Added revenue per rep below target. */
  addedPerRep: number;
  /** Share of the gap the lift closes, 0–1. */
  gapClosed: number;
  /** Added revenue × gross margin: the impact the business case nets against cost. */
  gross: number;
  platformCost: number;
  rewardCost: number;
  cost: number;
  net: number;
  /** Net impact ÷ cost. */
  multiple: number;
};

export function computeSales(i: SalesInputs): SalesResult {
  const revenuePerRep = i.revenue / i.reps;
  const repsBelow = i.reps * (i.belowTarget / 100);
  const repsAtTarget = i.reps - repsBelow;
  const attainment = i.attainment / 100;

  // Reps at target are counted at 100% of target, reps below at their attainment.
  // Revenue ÷ that headcount-equivalent is the target line.
  const repEquivalents = repsAtTarget + repsBelow * attainment;
  const targetPerRep = i.revenue / repEquivalents;
  const belowRepRevenue = targetPerRep * attainment;
  const belowRevenue = repsBelow * belowRepRevenue;
  const gap = repsBelow * (targetPerRep - belowRepRevenue);

  const lifted = attainment * (1 + i.lift / 100);
  const newAttainment = Math.min(1, lifted);
  const addedRevenue = repsBelow * targetPerRep * (newAttainment - attainment);

  const gross = addedRevenue * (i.grossMargin / 100);
  const platformCost = i.reps * i.seatPrice * 12;
  const rewardCost = i.reps * i.rewardBudget;
  const cost = platformCost + rewardCost;
  const net = gross - cost;

  return {
    revenuePerRep,
    repsAtTarget,
    repsBelow,
    repEquivalents,
    targetPerRep,
    belowRepRevenue,
    belowRevenue,
    gap,
    newAttainment: newAttainment * 100,
    capped: lifted > 1,
    addedRevenue,
    addedPerRep: repsBelow > 0 ? addedRevenue / repsBelow : 0,
    gapClosed: gap > 0 ? addedRevenue / gap : 0,
    gross,
    platformCost,
    rewardCost,
    cost,
    net,
    multiple: cost > 0 ? net / cost : 0,
  };
}

/* ── The business case pack (the gated extra) ────────────── */

export type SalesScenario = { key: "conservative" | "expected" | "stretch"; label: string; factor: number; result: SalesResult };

/** Scale only the lift; the business inputs stay as entered. */
export function salesScenarios(i: SalesInputs): SalesScenario[] {
  const at = (factor: number) => computeSales({ ...i, lift: i.lift * factor });
  return [
    { key: "conservative", label: "Conservative", factor: 0.5, result: at(0.5) },
    { key: "expected", label: "Expected", factor: 1, result: at(1) },
    { key: "stretch", label: "Stretch", factor: 1.5, result: at(1.5) },
  ];
}

export type SalesPilotPlan = {
  reps: number;
  /** Platform + rewards for the 90-day pilot. */
  cost: number;
  /** The pilot team's added revenue at full run-rate, i.e. what the day-90 report extrapolates to. */
  annualisedRevenue: number;
  repsBelow: number;
};

/** The pilot keeps the same revenue per rep; it just runs on fewer reps. */
export function salesPilotPlan(i: SalesInputs, days: number): SalesPilotPlan {
  const reps = Math.min(i.reps, PILOT_MAX_SEATS);
  const r = computeSales({ ...i, reps, revenue: i.revenue * (reps / i.reps) });
  return {
    reps,
    cost: r.cost * (days / 365),
    annualisedRevenue: r.addedRevenue,
    repsBelow: r.repsBelow,
  };
}

/* ── Sources behind the defaults ─────────────────────────── */

export const SALES_SOURCES = [
  {
    claim: "57% of quota-carrying reps missed quota in Q2 2025, across 246 cloud and software companies and around 47,000 reps.",
    source: "RepVue Cloud Sales Index, via QuotaPath",
    url: "https://www.quotapath.com/blog/saas-sales-reps-missed-quota/",
  },
  {
    claim: "Teams in the top quartile of engagement are 18% more productive in sales than teams in the bottom quartile.",
    source: "Gallup Q12 meta-analysis, 2024",
    url: "https://www.gallup.com/workplace/713024/employee-engagement-and-productivity.aspx",
  },
  {
    claim: "Employees whose recognition meets at least four of Gallup's five pillars are nine times as likely to be engaged.",
    source: "Gallup & Workhuman, 2024",
    url: "https://www.gallup.com/workplace/650174/employee-retention-depends-getting-recognition-right.aspx",
  },
] as const;
