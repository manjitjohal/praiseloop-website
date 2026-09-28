"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import "../app/home-v2.css";
import "../app/roi-calculator.css";
import {
  CURRENCIES,
  PILOT_DAYS,
  RAMP_MONTHS,
  SOURCES,
  computeRoi,
  currencySymbol,
  defaultInputs,
  formatMoney,
  formatMultiple,
  formatNumber,
  fromSearchParams,
  pilotPlan,
  projection,
  rangeFor,
  scenarios,
  toSearchParams,
  withCurrency,
  type Currency,
  type RoiInputs,
  type RoiResult,
} from "@/lib/roi";

const BOOKING_URL = "/demo";
const UNLOCK_KEY = "pl-roi-pack";

/** PostHog is only initialised when its key is set; stay silent otherwise. */
const track = (event: string, props?: Record<string, unknown>) => {
  if (posthog.__loaded) posthog.capture(event, props);
};

/* ── Icons (Lucide) ───────────────────────────────────── */
type IP = React.SVGProps<SVGSVGElement>;
const svg = (children: React.ReactNode) => {
  const LucideIcon = (p: IP) => <svg className="ico" viewBox="0 0 24 24" aria-hidden {...p}>{children}</svg>;
  LucideIcon.displayName = "LucideIcon";
  return LucideIcon;
};
const Icon = {
  Arrow: svg(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>),
  ArrowDown: svg(<><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>),
  Chevron: svg(<path d="m6 9 6 6 6-6" />),
  Check: svg(<path d="M20 6 9 17l-5-5" />),
  Lock: svg(<><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  Mail: svg(<><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></>),
  Link: svg(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>),
  Printer: svg(<><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" /><rect x="6" y="14" width="12" height="8" rx="1" /></>),
  Reset: svg(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></>),
  UserCheck: svg(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="m16 11 2 2 4-4" /></>),
  Trending: svg(<><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></>),
  CalendarX: svg(<><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="m14 14-4 4" /><path d="m10 14 4 4" /></>),
  Calendar: svg(<><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>),
  Coins: svg(<><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></>),
  Layers: svg(<><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></>),
  Target: svg(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
  File: svg(<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></>),
};

/* ── Nav + footer (secondary-page versions of the homepage chrome) ── */
const NAV = [
  { label: "Performance", href: "/#performance" },
  { label: "AI Loop", href: "/#loop" },
  { label: "How it works", href: "/#how" },
  { label: "Impact", href: "/#impact" },
  { label: "ROI calculator", href: "/roi-calculator", current: true },
  { label: "Blog", href: "/blog" },
];

const Nav = () => (
  <header className="nav roi-noprint">
    <div className="container nav-row">
      <Link href="/" aria-label="PraiseLoop home">
        <Image className="nav-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={70} height={26} priority style={{ height: 26, width: "auto" }} />
      </Link>
      <nav className="nav-links">
        {NAV.map((l) => (
          <Link key={l.label} href={l.href} aria-current={l.current ? "page" : undefined} className={l.current ? "is-current" : undefined}>{l.label}</Link>
        ))}
      </nav>
      <div className="nav-cta">
        <Link href={BOOKING_URL} className="btn btn-primary">Book a demo</Link>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="foot roi-noprint">
    <div className="container foot-row">
      <Image className="foot-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={60} height={22} style={{ height: 22, width: "auto" }} />
      <nav className="foot-links">
        <Link href="/blog">Blog</Link>
        <Link href="/demo">Terms and Conditions</Link>
        <Link href="/demo">Privacy Policy</Link>
        <Link href="/demo">Cookie Policy</Link>
      </nav>
      <span className="foot-copy">© 2026 PraiseLoop. Performance, recognition and reward as one system.</span>
    </div>
  </footer>
);

/* ── Inputs ───────────────────────────────────────────── */
type NumericKey = Exclude<keyof RoiInputs, "currency">;
type Unit = "money" | "%" | "days" | "people";

type FieldDef = { key: NumericKey; label: string; unit: Unit; hint?: string; log?: boolean };

const BUSINESS_FIELDS: FieldDef[] = [
  { key: "headcount", label: "Employees in scope", unit: "people", log: true, hint: "One department, one region, or the whole company." },
  { key: "salary", label: "Average salary", unit: "money", hint: "Base salary, before employer on-costs." },
  { key: "turnover", label: "Annual voluntary turnover", unit: "%", hint: "People who chose to leave in the last 12 months, as a share of headcount." },
  { key: "absenceDays", label: "Absence days per person, per year", unit: "days", hint: "The UK average is 7.8 days (CIPD, 2023)." },
];

const ASSUMPTION_FIELDS: FieldDef[] = [
  { key: "turnoverReduction", label: "Voluntary exits avoided", unit: "%", hint: "Gallup finds 42% of leavers could have been kept. We assume PraiseLoop keeps about a third of them." },
  { key: "replacementCost", label: "Cost to replace a leaver (% of salary)", unit: "%", hint: "Gallup puts it at 50–200% of salary, depending on the role. 100% is the conservative middle." },
  { key: "middleShare", label: "Share of people in the movable middle", unit: "%", hint: "Not your stars and not your strugglers: the solid middle that recognition moves most." },
  { key: "productivityLift", label: "Productivity lift on the middle", unit: "%", hint: "Valued at salary cost, which is a floor. Output is usually worth more than it costs." },
  { key: "absenceReduction", label: "Reduction in absence days", unit: "%", hint: "We count only the salary cost of each day, not the disruption around it." },
  { key: "workingDays", label: "Working days a year", unit: "days", hint: "Turns salary into a daily cost." },
];

/** Cost inputs live only in the unlocked business case: pricing stays off the public page. */
const COST_FIELDS: FieldDef[] = [
  { key: "seatPrice", label: "PraiseLoop, per person per month", unit: "money", hint: "Illustrative list price. Your quote depends on seats and modules." },
  { key: "rewardBudget", label: "Reward budget, per person per year", unit: "money", hint: "Paid out only when a verified result lands. Set it to 0 if you're redirecting an existing budget." },
];

const SLIDER_STEPS = 1000;

/** Round a log-slider value to a human number: 5s under 100, 25s under 1,000, 250s under 10,000, and so on. */
const niceRound = (raw: number, min: number) => {
  const mag = 10 ** Math.floor(Math.log10(Math.max(raw, 1)));
  const unit = mag >= 100 ? mag / 4 : Math.max(1, mag / 2);
  return Math.max(min, Math.round(raw / unit) * unit);
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const parseNumber = (s: string) => Number(s.replace(/[^\d.]/g, ""));

function NumberBox({
  id, value, min, max, prefix, suffix, label,
  onCommit,
}: {
  id: string; value: number; min: number; max: number; prefix?: string; suffix?: string; label: string;
  onCommit: (n: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const commitDraft = () => {
    if (draft === null) return;
    const n = parseNumber(draft);
    if (draft.trim() !== "" && Number.isFinite(n)) onCommit(clamp(n, min, max));
    setDraft(null);
  };
  return (
    <span className="roi-box">
      {prefix && <span className="roi-box-affix">{prefix}</span>}
      <input
        id={id}
        inputMode="decimal"
        aria-label={label}
        value={draft ?? formatNumber(value, 2)}
        onFocus={(e) => { setDraft(String(value)); e.currentTarget.select(); }}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseNumber(e.target.value);
          if (e.target.value.trim() !== "" && Number.isFinite(n) && n >= min && n <= max) onCommit(n);
        }}
        onBlur={commitDraft}
        onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
      />
      {suffix && <span className="roi-box-affix">{suffix}</span>}
    </span>
  );
}

function Field({ def, inputs, onChange }: { def: FieldDef; inputs: RoiInputs; onChange: (key: NumericKey, v: number) => void }) {
  const { key, label, unit, hint, log } = def;
  const { min, max, step } = rangeFor(key, inputs.currency);
  const value = inputs[key];
  const sliderValue = log ? Math.round((Math.log(value / min) / Math.log(max / min)) * SLIDER_STEPS) : value;
  const pct = log ? (sliderValue / SLIDER_STEPS) * 100 : ((value - min) / (max - min)) * 100;
  const id = `roi-${key}`;

  return (
    <div className="roi-field">
      <div className="roi-field-top">
        <label htmlFor={`${id}-range`}>{label}</label>
        <NumberBox
          id={id}
          label={label}
          value={value}
          min={min}
          max={max}
          prefix={unit === "money" ? currencySymbol(inputs.currency) : undefined}
          suffix={unit === "%" ? "%" : unit === "days" ? "days" : undefined}
          onCommit={(n) => onChange(key, n)}
        />
      </div>
      <input
        id={`${id}-range`}
        className="roi-range"
        type="range"
        min={log ? 0 : min}
        max={log ? SLIDER_STEPS : max}
        step={log ? 1 : step}
        value={sliderValue}
        style={{ "--p": `${clamp(pct, 0, 100)}%` } as React.CSSProperties}
        onChange={(e) => {
          const s = Number(e.target.value);
          onChange(key, log ? niceRound(min * (max / min) ** (s / SLIDER_STEPS), min) : s);
        }}
      />
      {hint && <p className="roi-hint">{hint}</p>}
    </div>
  );
}

/* ── Results (live, ungated) ──────────────────────────── */
const DRIVERS = [
  { key: "retention", label: "Regretted exits avoided", Ico: Icon.UserCheck },
  { key: "productivity", label: "Productivity, movable middle", Ico: Icon.Trending },
  { key: "absence", label: "Absence days recovered", Ico: Icon.CalendarX },
] as const;

function Results({
  inputs, r, unlocked, onCopy, copied,
}: { inputs: RoiInputs; r: RoiResult; unlocked: boolean; onCopy: () => void; copied: boolean }) {
  const m = (v: number) => formatMoney(v, inputs.currency, { compact: true });
  const top = Math.max(r.retention, r.productivity, r.absence, 1);

  return (
    <aside className="roi-results" id="results">
      <div className="roi-results-head">
        <span className="roi-results-label">Estimated annual impact</span>
        <span className="roi-chip">Modelled estimate</span>
      </div>
      <div className="roi-results-num" aria-live="polite">{m(r.gross)}</div>
      <p className="roi-results-sub">
        About <b>{formatMoney(r.gross / inputs.headcount, inputs.currency)}</b> per employee a year, before costs.
      </p>

      <div className="roi-bars">
        {DRIVERS.map((d) => (
          <div key={d.key} className="roi-bar-row">
            <div className="roi-bar-top">
              <span className="roi-bar-label"><d.Ico />{d.label}</span>
              <span className="roi-bar-val">{m(r[d.key])}</span>
            </div>
            <span className="roi-bar-track">
              <span className="roi-bar-fill" style={{ width: `${Math.max(1.5, (r[d.key] / top) * 100)}%` }} />
            </span>
          </div>
        ))}
      </div>

      <div className="roi-results-cta roi-noprint">
        <a href="#business-case" className="btn btn-primary btn-arrow">
          {unlocked ? "See your net return" : "Get the CFO business case"} <Icon.ArrowDown />
        </a>
        <p className="roi-results-fine">Net return, payback month, scenarios and a {PILOT_DAYS}-day pilot plan, built on these inputs.</p>
        <button type="button" className="roi-link-btn" onClick={onCopy}>
          {copied ? <><Icon.Check /> Link copied</> : <><Icon.Link /> Copy a link to these numbers</>}
        </button>
      </div>
    </aside>
  );
}

/* ── The maths, in full (ungated) ─────────────────────── */
function Maths({ inputs: i, r, unlocked }: { inputs: RoiInputs; r: RoiResult; unlocked: boolean }) {
  const m = (v: number) => formatMoney(v, i.currency);
  const n = (v: number, d = 0) => formatNumber(v, d);
  const leavers = i.headcount * (i.turnover / 100);
  const absenceTotal = i.headcount * i.absenceDays;
  const daily = i.salary / i.workingDays;

  const cards = [
    {
      Ico: Icon.UserCheck,
      title: "Regretted exits avoided",
      value: r.retention,
      why: "People leave managers who never notice their work. When every verified result is seen and rewarded, fewer of your good people start looking.",
      lines: [
        `${n(i.headcount)} people × ${i.turnover}% turnover = ${n(leavers, 1)} leavers a year`,
        `${n(leavers, 1)} × ${i.turnoverReduction}% avoided = ${n(r.exitsAvoided, 1)} exits avoided`,
        `${n(r.exitsAvoided, 1)} × ${m(i.salary)} × ${i.replacementCost}% to replace = ${m(r.retention)}`,
      ],
    },
    {
      Ico: Icon.Trending,
      title: "Productivity lift on the movable middle",
      value: r.productivity,
      why: "Recognition tied to real KPIs shows the middle of your workforce exactly what good looks like, then rewards them for getting there.",
      lines: [
        `${n(i.headcount)} × ${i.middleShare}% = ${n(r.middleHeadcount)} people in the middle`,
        `${n(r.middleHeadcount)} × ${m(i.salary)} = ${m(r.middleHeadcount * i.salary)} of payroll`,
        `${m(r.middleHeadcount * i.salary)} × ${i.productivityLift}% lift = ${m(r.productivity)}`,
      ],
    },
    {
      Ico: Icon.CalendarX,
      title: "Absence days recovered",
      value: r.absence,
      why: "Teams that feel seen take fewer unplanned days. We count only the salary cost of those days, not the cover and disruption around them.",
      lines: [
        `${n(i.headcount)} × ${n(i.absenceDays, 1)} days = ${n(absenceTotal)} absence days a year`,
        `${n(absenceTotal)} × ${i.absenceReduction}% = ${n(r.daysRecovered)} days recovered`,
        `${n(r.daysRecovered)} × ${m(daily)} a day = ${m(r.absence)}`,
      ],
    },
  ];

  return (
    <section className="roi-maths" id="maths">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The maths, in full</span>
          <h2>Every line your CFO will check.</h2>
          <p className="lede">No black box. The impact above comes from these three calculations, using your inputs. Change an input and they update with it.</p>
        </div>
        <div className="roi-maths-grid">
          {cards.map((c) => (
            <article key={c.title} className="roi-maths-card">
              <div className="roi-maths-top">
                <span className="roi-maths-ic"><c.Ico /></span>
                <h3>{c.title}</h3>
                <span className="roi-maths-val">{m(c.value)}</span>
              </div>
              <p className="roi-maths-why">{c.why}</p>
              <ol className="roi-maths-lines">
                {c.lines.map((l) => <li key={l}>{l}</li>)}
              </ol>
            </article>
          ))}
          <a href="#business-case" className="roi-maths-card roi-maths-teaser">
            <div className="roi-maths-top">
              <span className="roi-maths-ic"><Icon.Coins /></span>
              <h3>Net return and payback</h3>
              {!unlocked && <span className="roi-maths-lock"><Icon.Lock /></span>}
            </div>
            <p className="roi-maths-why">
              The business case nets this impact against the PraiseLoop platform and the rewards themselves, which only pay out on verified
              results. Then it works out your return multiple and the month it pays back.
            </p>
            <span className="roi-teaser-link">{unlocked ? "See it below" : "Get the business case"} <Icon.ArrowDown /></span>
          </a>
        </div>

        <div className="roi-sources">
          <h3>Where the defaults come from</h3>
          <ul>
            {SOURCES.map((s) => (
              <li key={s.url}>
                {s.claim} <a href={s.url} target="_blank" rel="noopener noreferrer">{s.source}</a>
              </li>
            ))}
          </ul>
          <p>
            The lift assumptions (exits avoided, productivity, absence) are deliberately set well below the research, and they&apos;re PraiseLoop&apos;s
            modelled estimates, not measured results. A 90-day pilot replaces them with your own numbers.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── The business case pack (the gated extra) ─────────── */
const PACK_CONTENTS = [
  { Ico: Icon.Coins, h: "Net return and payback", p: "Your impact netted against platform and reward costs, with the return multiple and the month it pays back." },
  { Ico: Icon.Layers, h: "Three scenarios", p: "Conservative, expected and stretch, so finance can stress-test the lift." },
  { Ico: Icon.Calendar, h: "Three years, with ramp-up", p: "Impact building month by month to full run-rate." },
  { Ico: Icon.Target, h: `Your ${PILOT_DAYS}-day pilot plan`, p: "Sized to your team: seats, cost, and what the day-90 report should show." },
];

/** Locked previews keep the layout but never render the real figures. */
const masked = (s: string) => s.replace(/\d/g, "0");

function Pack({
  inputs: i, r, locked, onChange,
}: { inputs: RoiInputs; r: RoiResult; locked: boolean; onChange?: (key: NumericKey, v: number) => void }) {
  const show = (s: string) => (locked ? masked(s) : s);
  const m = (v: number) => show(formatMoney(v, i.currency, { compact: true }));
  const full = (v: number) => show(formatMoney(v, i.currency));
  const sc = scenarios(i);
  const proj = projection(r);
  const pilot = pilotPlan(i);
  const maxYear = Math.max(...proj.years.map((y) => Math.abs(y.net)), 1);

  return (
    <div className="roi-pack-body">
      <div className="roi-pack-block">
        <h4 className="roi-pack-h"><Icon.Coins /> Net return and payback</h4>
        <div className="roi-net">
          <dl className="roi-net-rows">
            <div><dt>Annual impact<small>From the calculator above</small></dt><dd>{full(r.gross)}</dd></div>
            <div className="cost">
              <dt>PraiseLoop platform<small>{show(formatNumber(i.headcount))} × {show(formatMoney(i.seatPrice, i.currency))} × 12 months, illustrative list price</small></dt>
              <dd>−{full(r.platformCost)}</dd>
            </div>
            <div className="cost">
              <dt>Reward budget<small>{show(formatNumber(i.headcount))} × {show(formatMoney(i.rewardBudget, i.currency))} a year, paid only on verified results</small></dt>
              <dd>−{full(r.rewardCost)}</dd>
            </div>
            <div className="total"><dt>Net impact a year</dt><dd>{full(r.net)}</dd></div>
          </dl>
          <div className="roi-net-kpis">
            <div><span className="k">Return on cost</span><span className="v">{show(formatMultiple(r.multiple))}</span></div>
            <div>
              <span className="k">Pays back in</span>
              <span className="v">{proj.paybackMonth ? <>month {show(String(proj.paybackMonth))}</> : "36+ months"}</span>
            </div>
          </div>
        </div>
        {r.net < 0 && !locked && (
          <p className="roi-pack-note">At these inputs PraiseLoop doesn&apos;t pay for itself. A more focused team or a smaller reward budget changes that.</p>
        )}
        {onChange && (
          <div className="roi-net-inputs roi-noprint">
            {COST_FIELDS.map((f) => <Field key={f.key} def={f} inputs={i} onChange={onChange} />)}
          </div>
        )}
      </div>

      <div className="roi-pack-block">
        <h4 className="roi-pack-h"><Icon.Layers /> Three scenarios</h4>
        <div className="roi-scen">
          {sc.map((s) => (
            <div key={s.key} className={`roi-scen-card${s.key === "expected" ? " is-expected" : ""}`}>
              <span className="roi-scen-label">{s.label}</span>
              <span className="roi-scen-num">{m(s.result.net)}</span>
              <span className="roi-scen-mult">{show(formatMultiple(s.result.multiple))} return</span>
              <span className="roi-scen-note">{s.key === "expected" ? "Your inputs" : `${s.factor}× the lift assumptions`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="roi-pack-block">
        <h4 className="roi-pack-h"><Icon.Calendar /> Three years, with ramp-up</h4>
        <div className="roi-years" role="img" aria-label={locked ? "Three-year projection (locked)" : proj.years.map((y) => `Year ${y.year}: ${formatMoney(y.net, i.currency)} net`).join(", ")}>
          {proj.years.map((y) => (
            <div key={y.year} className="roi-year" title={locked ? undefined : `Year ${y.year}: ${formatMoney(y.net, i.currency)} net, ${formatMoney(y.cumulative, i.currency)} cumulative`}>
              <span className="roi-year-val">{m(y.net)}</span>
              <span className="roi-year-bar-wrap">
                <span className={`roi-year-bar${y.net < 0 ? " neg" : ""}`} style={{ height: `${Math.max(3, (Math.abs(y.net) / maxYear) * 100)}%` }} />
              </span>
              <span className="roi-year-label">Year {y.year}</span>
              <span className="roi-year-cum">{m(y.cumulative)} cumulative</span>
            </div>
          ))}
        </div>
        <p className="roi-pack-note">
          Net of costs. Month 1 is go-live and counts no impact. Impact builds to full run-rate by month {RAMP_MONTHS}; costs run from day one.
        </p>
      </div>

      <div className="roi-pack-block">
        <h4 className="roi-pack-h"><Icon.Target /> Your {PILOT_DAYS}-day pilot</h4>
        <div className="roi-pilot">
          <div className="roi-pilot-stats">
            <div><span className="k">Pilot team</span><span className="v">{show(formatNumber(pilot.seats))} people</span></div>
            <div><span className="k">{PILOT_DAYS}-day cost</span><span className="v">{m(pilot.cost)}</span></div>
            <div><span className="k">Day-90 report should show</span><span className="v">{m(pilot.annualisedGross)}<small> / yr</small></span></div>
          </div>
          <p className="roi-pilot-p">
            At your assumptions, a {show(formatNumber(pilot.seats))}-person pilot points to about {show(formatNumber(pilot.exitsAvoided, 1))} regretted exits
            avoided and {show(formatNumber(pilot.daysRecovered))} absence days recovered a year. The day-90 report measures both against your baseline.
          </p>
          <ol className="roi-pilot-steps">
            <li><b>Weeks 1–2</b><span>Go live. Zero integrations needed to start.</span></li>
            <li><b>Day 30</b><span>Patterns emerge: who&apos;s being recognised, and what moved.</span></li>
            <li><b>Day 90</b><span>Your CFO report: the case for rolling out, or not.</span></li>
          </ol>
          <p className="roi-pilot-walk">If the numbers don&apos;t move, you walk away.</p>
        </div>
      </div>
    </div>
  );
}

function BusinessCase({
  inputs, r, unlocked, onChange, onUnlock, delivery, sentTo, onCopy, copied,
}: {
  inputs: RoiInputs; r: RoiResult; unlocked: boolean;
  onChange: (key: NumericKey, v: number) => void;
  onUnlock: (email: string) => Promise<void>;
  delivery: "idle" | "sending" | "sent" | "failed"; sentTo: string;
  onCopy: () => void; copied: boolean;
}) {
  const [email, setEmail] = useState("");

  if (unlocked) {
    return (
      <section className="roi-pack is-open" id="business-case">
        <div className="container">
          <div className="roi-pack-headrow">
            <div className="section-head">
              <span className="eyebrow">The CFO business case</span>
              <h2>Your business case, ready to forward.</h2>
              {delivery === "sent" && <p className="lede">We&apos;ve emailed a copy to <b>{sentTo}</b>. It links straight back to this model.</p>}
              {delivery === "failed" && <p className="lede">We couldn&apos;t email it just now. Save it as a PDF instead, or write to <a href="mailto:hello@praiseloop.com">hello@praiseloop.com</a>.</p>}
              {delivery === "idle" && <p className="lede">Built on the inputs above. Change any of them and this updates too.</p>}
            </div>
            <div className="roi-pack-actions roi-noprint">
              <button type="button" className="btn btn-ghost" onClick={() => { track("roi_pack_printed"); window.print(); }}><Icon.Printer /> Save as PDF</button>
              <button type="button" className="btn btn-ghost" onClick={onCopy}>{copied ? <><Icon.Check /> Link copied</> : <><Icon.Link /> Copy link</>}</button>
              <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book the {PILOT_DAYS}-day pilot <Icon.Arrow /></Link>
            </div>
          </div>
          <Pack inputs={inputs} r={r} locked={false} onChange={onChange} />
        </div>
      </section>
    );
  }

  return (
    <section className="roi-pack" id="business-case">
      <div className="container roi-pack-grid">
        <div className="roi-pack-offer">
          <span className="eyebrow">The CFO business case</span>
          <h2>Your number is free. The business case is one email away.</h2>
          <p className="lede">Everything above stays open. If you&apos;re taking this to finance, get the full pack, built on your inputs and formatted to forward.</p>
          <ul className="roi-pack-list">
            {PACK_CONTENTS.map((c) => (
              <li key={c.h}>
                <span className="ic"><c.Ico /></span>
                <div><strong>{c.h}</strong><span>{c.p}</span></div>
              </li>
            ))}
          </ul>
          <form
            className="roi-pack-form"
            onSubmit={(e) => { e.preventDefault(); onUnlock(email.trim()); }}
          >
            <span className="roi-pack-input">
              <Icon.Mail />
              <input type="email" required placeholder="you@company.com" aria-label="Work email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </span>
            <button type="submit" className="btn btn-primary btn-arrow" disabled={delivery === "sending"}>
              {delivery === "sending" ? "Sending…" : <>Send me the business case <Icon.Arrow /></>}
            </button>
          </form>
          <p className="roi-pack-fine">It opens here straight away, and we email you a copy to forward, with a PDF option. Our team sees your numbers too, so any follow-up starts from your model.</p>
        </div>

        <div className="roi-pack-preview">
          <div className="roi-pack-blur" aria-hidden inert>
            <Pack inputs={inputs} r={r} locked />
          </div>
          <div className="roi-pack-lock">
            <span className="roi-pack-lock-ic"><Icon.Lock /></span>
            <strong>Built on your inputs</strong>
            <span>Net return, scenarios, three years and a pilot plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────── */
const noopSubscribe = () => () => {};
const readSearch = () => window.location.search;
const readStoredUnlock = () => {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
};

function Calculator({ initialInputs, preUnlocked }: { initialInputs: RoiInputs; preUnlocked: boolean }) {
  const [inputs, setInputs] = useState<RoiInputs>(initialInputs);
  const [unlockedNow, setUnlockedNow] = useState(false);
  const [delivery, setDelivery] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const engaged = useRef(false);

  const unlocked = unlockedNow || preUnlocked;
  const r = computeRoi(inputs);

  const change = (next: RoiInputs) => {
    if (!engaged.current) {
      engaged.current = true;
      track("roi_calculator_engaged");
    }
    setInputs(next);
  };
  const changeField = (key: NumericKey, v: number) => change({ ...inputs, [key]: v });

  const copyLink = async () => {
    const url = `${window.location.origin}/roi-calculator?${toSearchParams(inputs, { includeCosts: unlocked })}${unlocked ? "&pack=1" : ""}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link", url);
    }
    track("roi_link_copied", { unlocked });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const unlock = async (email: string) => {
    setDelivery("sending");
    let delivered = false;
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, inputs }),
      });
      delivered = res.ok;
    } catch {
      delivered = false;
    }
    // The pack opens either way: the visitor asked for it and shouldn't pay for our email outage.
    setSentTo(email);
    setDelivery(delivered ? "sent" : "failed");
    setUnlockedNow(true);
    try {
      localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* private mode: the pack still opens for this visit */
    }
    track("roi_pack_requested", { delivered, headcount: inputs.headcount, currency: inputs.currency, net: Math.round(r.net) });
    requestAnimationFrame(() => document.getElementById("business-case")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <section className="hero roi-hero roi-noprint">
        <div className="container">
          <span className="eyebrow">ROI calculator</span>
          <h1>What&apos;s it worth to your <span className="kw">P&amp;L</span>?</h1>
          <p className="lede">
            Four numbers from your HRIS, two minutes, and a model your CFO can check line by line: regretted exits avoided, productivity on the
            movable middle, and absence days recovered.
          </p>
          <p className="hero-wedge">No email to see your number. Every assumption is on the page, and yours to change.</p>
        </div>
      </section>

      <section className="roi-calc" id="calculator">
        <div className="container roi-print-head" aria-hidden>
          <strong>PraiseLoop · ROI business case</strong>
          <span>
            {formatNumber(inputs.headcount)} employees · {formatMoney(inputs.salary, inputs.currency)} average salary · {inputs.turnover}% voluntary turnover ·{" "}
            {formatNumber(inputs.absenceDays, 1)} absence days per person. Modelled estimate, not a guarantee.
          </span>
        </div>
        <div className="container roi-grid">
          <div className="roi-inputs roi-noprint">
            <div className="roi-card">
              <div className="roi-card-head">
                <h2>Your business</h2>
                <div className="roi-seg" role="group" aria-label="Currency">
                  {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={inputs.currency === c}
                      onClick={() => change(withCurrency(inputs, c))}
                    >
                      {CURRENCIES[c].label}
                    </button>
                  ))}
                </div>
              </div>
              {BUSINESS_FIELDS.map((f) => (
                <Field key={f.key} def={f} inputs={inputs} onChange={changeField} />
              ))}

              <details className="roi-assump">
                <summary>
                  <span>Adjust the assumptions</span>
                  <span className="roi-assump-count">{ASSUMPTION_FIELDS.length}</span>
                  <Icon.Chevron className="ico roi-assump-chev" />
                </summary>
                <p className="roi-assump-intro">Our defaults sit deliberately below the published research. Tune them to your own data.</p>
                {ASSUMPTION_FIELDS.map((f) => (
                  <Field key={f.key} def={f} inputs={inputs} onChange={changeField} />
                ))}
              </details>

              <button type="button" className="roi-reset" onClick={() => change(defaultInputs(inputs.currency))}>
                <Icon.Reset /> Reset to defaults
              </button>
            </div>

            <a href="#results" className="roi-dock" aria-label="See the result breakdown">
              <span className="roi-dock-label">Annual impact</span>
              <span className="roi-dock-num">{formatMoney(r.gross, inputs.currency, { compact: true })}</span>
            </a>
          </div>

          <Results inputs={inputs} r={r} unlocked={unlocked} onCopy={copyLink} copied={copied} />
        </div>
      </section>

      <Maths inputs={inputs} r={r} unlocked={unlocked} />

      <BusinessCase
        inputs={inputs}
        r={r}
        unlocked={unlocked}
        onChange={changeField}
        onUnlock={unlock}
        delivery={delivery}
        sentTo={sentTo}
        onCopy={copyLink}
        copied={copied}
      />
    </>
  );
}

export default function RoiCalculator() {
  // Read the URL and storage after hydration (server snapshot = defaults), so a
  // shared link or an emailed business case reopens the exact model.
  const search = useSyncExternalStore(noopSubscribe, readSearch, () => "");
  const storedUnlock = useSyncExternalStore(noopSubscribe, readStoredUnlock, () => false);
  const params = new URLSearchParams(search);
  const initialInputs = fromSearchParams(params) ?? defaultInputs();

  return (
    <div className="plh roi">
      <Nav />
      <main>
        <Calculator key={search} initialInputs={initialInputs} preUnlocked={params.get("pack") === "1" || storedUnlock} />
      </main>

      <section className="cta2 roi-noprint">
        <div className="container cta2-inner">
          <h2>Prove it on one team in <span className="kw">90 days</span>.</h2>
          <p className="sub">The calculator models it. A pilot measures it. Two weeks to go live, 90 days to your CFO report, and if the numbers don&apos;t move, you walk.</p>
          <div className="roi-cta-row">
            <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></Link>
            <a href="#calculator" className="btn btn-outline">Back to the calculator</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
