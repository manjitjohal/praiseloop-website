/**
 * ROI model for the /roi-calculator page.
 *
 * Shared by the client (live results) and /api/roi (emailed business case),
 * so the numbers a prospect sees on screen are exactly the numbers in their
 * inbox. The shape mirrors the deck's day-90 CFO report: regretted exits
 * avoided + productivity lift on the movable middle (+ absence), netted
 * against what the platform and rewards cost.
 *
 * Every default is a modelled assumption, labelled as such on the page.
 */

export type Currency = "GBP" | "USD" | "EUR" | "AED";

export type RoiInputs = {
  currency: Currency;
  /** Employees in scope. */
  headcount: number;
  /** Average annual salary. */
  salary: number;
  /** Annual voluntary turnover, %. */
  turnover: number;
  /** Absence days per employee per year. */
  absenceDays: number;
  /** Share of voluntary exits avoided, %. */
  turnoverReduction: number;
  /** Cost to replace a leaver, % of salary. */
  replacementCost: number;
  /** Share of the workforce in the movable middle, %. */
  middleShare: number;
  /** Productivity lift on the movable middle, %. */
  productivityLift: number;
  /** Reduction in absence days, %. */
  absenceReduction: number;
  /** Working days per year (converts salary into a daily cost). */
  workingDays: number;
  /** PraiseLoop cost per employee per month. */
  seatPrice: number;
  /** Reward budget per employee per year (coins redeemed for real rewards). */
  rewardBudget: number;
};

type NumericKey = Exclude<keyof RoiInputs, "currency">;

type Range = { min: number; max: number; step: number };

export const CURRENCIES: Record<
  Currency,
  { label: string; salary: number; salaryRange: Range; seatPrice: number; rewardBudget: number }
> = {
  GBP: { label: "£ GBP", salary: 45_000, salaryRange: { min: 15_000, max: 200_000, step: 1_000 }, seatPrice: 6, rewardBudget: 100 },
  USD: { label: "$ USD", salary: 65_000, salaryRange: { min: 20_000, max: 250_000, step: 1_000 }, seatPrice: 8, rewardBudget: 130 },
  EUR: { label: "€ EUR", salary: 50_000, salaryRange: { min: 15_000, max: 200_000, step: 1_000 }, seatPrice: 7, rewardBudget: 115 },
  AED: { label: "AED", salary: 180_000, salaryRange: { min: 40_000, max: 800_000, step: 5_000 }, seatPrice: 30, rewardBudget: 450 },
};

/** Bounds for every numeric input. Salary / price / budget bounds scale with currency. */
export function rangeFor(key: NumericKey, currency: Currency): Range {
  const c = CURRENCIES[currency];
  switch (key) {
    case "headcount": return { min: 10, max: 20_000, step: 1 };
    case "salary": return c.salaryRange;
    case "turnover": return { min: 2, max: 60, step: 1 };
    case "absenceDays": return { min: 1, max: 25, step: 0.5 };
    case "turnoverReduction": return { min: 0, max: 45, step: 1 };
    case "replacementCost": return { min: 30, max: 250, step: 5 };
    case "middleShare": return { min: 20, max: 80, step: 5 };
    case "productivityLift": return { min: 0, max: 15, step: 0.5 };
    case "absenceReduction": return { min: 0, max: 40, step: 1 };
    case "workingDays": return { min: 180, max: 260, step: 1 };
    case "seatPrice": return { min: 0, max: c.seatPrice * 5, step: currency === "AED" ? 1 : 0.5 };
    case "rewardBudget": return { min: 0, max: c.rewardBudget * 10, step: currency === "AED" ? 10 : 5 };
  }
}

export function defaultInputs(currency: Currency = "GBP"): RoiInputs {
  const c = CURRENCIES[currency];
  return {
    currency,
    headcount: 500,
    salary: c.salary,
    turnover: 15,
    absenceDays: 7.8,
    turnoverReduction: 15,
    replacementCost: 100,
    middleShare: 60,
    productivityLift: 3,
    absenceReduction: 10,
    workingDays: 230,
    seatPrice: c.seatPrice,
    rewardBudget: c.rewardBudget,
  };
}

/** Switch currency, resetting only the money inputs to that currency's defaults. */
export function withCurrency(inputs: RoiInputs, currency: Currency): RoiInputs {
  const c = CURRENCIES[currency];
  return { ...inputs, currency, salary: c.salary, seatPrice: c.seatPrice, rewardBudget: c.rewardBudget };
}

const NUMERIC_KEYS = Object.keys(defaultInputs()).filter((k) => k !== "currency") as NumericKey[];

/** Coerce untrusted values (URL params, API bodies) into a valid, clamped input set. */
export function sanitizeInputs(raw: unknown): RoiInputs {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const currency = (Object.keys(CURRENCIES) as Currency[]).includes(src.currency as Currency)
    ? (src.currency as Currency)
    : "GBP";
  const out = defaultInputs(currency);
  for (const key of NUMERIC_KEYS) {
    const n = Number(src[key]);
    if (src[key] === undefined || src[key] === "" || !Number.isFinite(n)) continue;
    const { min, max } = rangeFor(key, currency);
    out[key] = Math.min(max, Math.max(min, n));
  }
  return out;
}

/* ── URL state (shareable links) ─────────────────────────── */

const PARAM: Record<keyof RoiInputs, string> = {
  currency: "cur",
  headcount: "n",
  salary: "sal",
  turnover: "to",
  absenceDays: "abs",
  turnoverReduction: "tr",
  replacementCost: "rc",
  middleShare: "mid",
  productivityLift: "pl",
  absenceReduction: "ar",
  workingDays: "wd",
  seatPrice: "sp",
  rewardBudget: "rb",
};

/** Pricing is kept off the public page, so links from the free view leave the cost inputs out. */
const COST_KEYS: (keyof RoiInputs)[] = ["seatPrice", "rewardBudget"];

export function toSearchParams(inputs: RoiInputs, opts: { includeCosts?: boolean } = {}): URLSearchParams {
  const includeCosts = opts.includeCosts ?? true;
  const p = new URLSearchParams();
  for (const key of Object.keys(PARAM) as (keyof RoiInputs)[]) {
    if (!includeCosts && COST_KEYS.includes(key)) continue;
    p.set(PARAM[key], String(inputs[key]));
  }
  return p;
}

export function fromSearchParams(params: URLSearchParams): RoiInputs | null {
  if (![...params.keys()].some((k) => Object.values(PARAM).includes(k))) return null;
  const raw: Record<string, string> = {};
  for (const key of Object.keys(PARAM) as (keyof RoiInputs)[]) {
    const v = params.get(PARAM[key]);
    if (v !== null) raw[key] = v;
  }
  return sanitizeInputs(raw);
}

/* ── The model ───────────────────────────────────────────── */

export type RoiResult = {
  exitsAvoided: number;
  retention: number;
  middleHeadcount: number;
  productivity: number;
  daysRecovered: number;
  absence: number;
  gross: number;
  platformCost: number;
  rewardCost: number;
  cost: number;
  net: number;
  /** Net impact ÷ cost, the deck's "34×" figure. */
  multiple: number;
};

export function computeRoi(i: RoiInputs): RoiResult {
  const exitsAvoided = i.headcount * (i.turnover / 100) * (i.turnoverReduction / 100);
  const retention = exitsAvoided * i.salary * (i.replacementCost / 100);

  const middleHeadcount = i.headcount * (i.middleShare / 100);
  const productivity = middleHeadcount * i.salary * (i.productivityLift / 100);

  const daysRecovered = i.headcount * i.absenceDays * (i.absenceReduction / 100);
  const absence = daysRecovered * (i.salary / i.workingDays);

  const gross = retention + productivity + absence;
  const platformCost = i.headcount * i.seatPrice * 12;
  const rewardCost = i.headcount * i.rewardBudget;
  const cost = platformCost + rewardCost;
  const net = gross - cost;

  return {
    exitsAvoided,
    retention,
    middleHeadcount,
    productivity,
    daysRecovered,
    absence,
    gross,
    platformCost,
    rewardCost,
    cost,
    net,
    multiple: cost > 0 ? net / cost : 0,
  };
}

/* ── The business case pack (the gated extra) ────────────── */

/**
 * Month in which impact reaches full run-rate. Month 1 is go-live and counts
 * no impact at all; impact then builds linearly. Costs start on day one.
 */
export const RAMP_MONTHS = 6;

const rampFactor = (month: number) => Math.min(1, Math.max(0, (month - 1) / (RAMP_MONTHS - 1)));

export type Scenario = { key: "conservative" | "expected" | "stretch"; label: string; factor: number; result: RoiResult };

/** Scale only the lift assumptions; the business inputs stay as entered. */
export function scenarios(i: RoiInputs): Scenario[] {
  const at = (factor: number) =>
    computeRoi({
      ...i,
      turnoverReduction: i.turnoverReduction * factor,
      productivityLift: i.productivityLift * factor,
      absenceReduction: i.absenceReduction * factor,
    });
  return [
    { key: "conservative", label: "Conservative", factor: 0.5, result: at(0.5) },
    { key: "expected", label: "Expected", factor: 1, result: at(1) },
    { key: "stretch", label: "Stretch", factor: 1.5, result: at(1.5) },
  ];
}

export type YearRow = { year: number; impact: number; cost: number; net: number; cumulative: number };

export type Projection = {
  years: YearRow[];
  /** First month in which cumulative net turns positive, or null if it never does in 36 months. */
  paybackMonth: number | null;
};

/** 36-month view: impact ramps to full run-rate by RAMP_MONTHS; cost is flat. */
export function projection(r: RoiResult): Projection {
  const monthlyImpact = r.gross / 12;
  const monthlyCost = r.cost / 12;
  const years: YearRow[] = [];
  let cumulative = 0;
  let paybackMonth: number | null = null;

  for (let y = 1; y <= 3; y++) {
    let impact = 0;
    for (let m = 1; m <= 12; m++) {
      const month = (y - 1) * 12 + m;
      const monthImpact = monthlyImpact * rampFactor(month);
      impact += monthImpact;
      cumulative += monthImpact - monthlyCost;
      if (paybackMonth === null && cumulative >= 0) paybackMonth = month;
    }
    const cost = monthlyCost * 12;
    years.push({ year: y, impact, cost, net: impact - cost, cumulative });
  }
  return { years, paybackMonth };
}

export const PILOT_MAX_SEATS = 200;
export const PILOT_DAYS = 90;

export type PilotPlan = {
  seats: number;
  /** Platform + rewards for the 90-day pilot. */
  cost: number;
  /** The pilot team's share of the annual run-rate, i.e. what the day-90 report extrapolates to. */
  annualisedGross: number;
  exitsAvoided: number;
  daysRecovered: number;
};

export function pilotPlan(i: RoiInputs): PilotPlan {
  const seats = Math.min(i.headcount, PILOT_MAX_SEATS);
  const r = computeRoi({ ...i, headcount: seats });
  return {
    seats,
    cost: r.cost * (PILOT_DAYS / 365),
    annualisedGross: r.gross,
    exitsAvoided: r.exitsAvoided,
    daysRecovered: r.daysRecovered,
  };
}

/* ── Sources behind the defaults ─────────────────────────── */

export const SOURCES = [
  {
    claim: "Replacing an employee costs one-half to two times their annual salary.",
    source: "Gallup, 2019",
    url: "https://www.gallup.com/workplace/247391/fixable-problem-costs-businesses-trillion.aspx",
  },
  {
    claim: "42% of voluntary leavers say their manager or organisation could have kept them.",
    source: "Gallup, 2024",
    url: "https://www.gallup.com/workplace/646538/employee-turnover-preventable-often-ignored.aspx",
  },
  {
    claim: "Employees who get high-quality recognition are 45% less likely to have left two years later.",
    source: "Gallup & Workhuman, 2024",
    url: "https://www.gallup.com/workplace/650174/employee-retention-depends-getting-recognition-right.aspx",
  },
  {
    claim: "UK sickness absence averages 7.8 days per employee per year, the highest in over a decade.",
    source: "CIPD, 2023",
    url: "https://www.cipd.org/uk/knowledge/reports/health-well-being-work/",
  },
] as const;

/* ── Formatting ──────────────────────────────────────────── */

export function formatMoney(value: number, currency: Currency, opts: { compact?: boolean } = {}): string {
  const compact = opts.compact && Math.abs(value) >= 10_000;
  // Per-seat prices like £6.50 keep their pence; everything else rounds.
  const pence = !compact && Math.abs(value) < 100 && !Number.isInteger(value);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: pence ? 2 : 0,
    maximumFractionDigits: compact ? (Math.abs(value) >= 1_000_000 ? 2 : 0) : pence ? 2 : 0,
  }).format(value);
}

export function currencySymbol(currency: Currency): string {
  return (
    new Intl.NumberFormat("en-GB", { style: "currency", currency, currencyDisplay: "narrowSymbol" })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currency
  );
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(value);
}

export function formatMultiple(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)}×`;
}
