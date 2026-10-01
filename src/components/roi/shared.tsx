"use client";

/**
 * Pieces shared by the two ROI calculators: the sales calculator
 * (/roi-calculator) and the company-wide one (/roi-calculator/company-wide).
 * Chrome, inputs, the maths section, the email-gated business case shell and
 * the state hooks live here; each calculator owns its own model and copy.
 */

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import "../../app/home-v2.css";
import "../../app/roi-calculator.css";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { Icon, type IP } from "../site/icons";
import {
  PILOT_DAYS,
  RAMP_MONTHS,
  currencySymbol,
  formatMoney,
  formatMultiple,
  formatNumber,
  type Currency,
  type Projection,
  type Range,
} from "@/lib/roi";

export const BOOKING_URL = "/demo";
const UNLOCK_KEY = "pl-roi-pack";

export type RoiModel = "sales" | "company";

export const CALCULATORS: Record<RoiModel, { label: string; href: string }> = {
  sales: { label: "Sales team", href: "/roi-calculator" },
  company: { label: "Company-wide", href: "/roi-calculator/company-wide" },
};

/** PostHog is only initialised when its key is set; stay silent otherwise. */
export const track = (event: string, props?: Record<string, unknown>) => {
  if (posthog.__loaded) posthog.capture(event, props);
};

export { Icon };

/** Nav, closing CTA and footer around a calculator. */
export function RoiPage({ cta, children }: { cta: { title: React.ReactNode; sub: string }; children: React.ReactNode }) {
  return (
    <div className="plh roi">
      <SiteHeader />
      <main>{children}</main>

      <section className="cta2 roi-noprint">
        <div className="container cta2-inner">
          <h2>{cta.title}</h2>
          <p className="sub">{cta.sub}</p>
          <div className="roi-cta-row">
            <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></Link>
            <a href="#calculator" className="btn btn-outline">Back to the calculator</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/** Switches between the sales and company-wide calculators. */
function CalcSwitch({ active }: { active: RoiModel }) {
  return (
    <nav className="roi-switch" aria-label="Choose a calculator">
      {(Object.keys(CALCULATORS) as RoiModel[]).map((k) => (
        <Link key={k} href={CALCULATORS[k].href} aria-current={k === active ? "page" : undefined}>
          {CALCULATORS[k].label}
        </Link>
      ))}
    </nav>
  );
}

export function RoiHero({
  model, title, lede, wedge,
}: { model: RoiModel; title: React.ReactNode; lede: React.ReactNode; wedge: React.ReactNode }) {
  return (
    <section className="hero roi-hero roi-noprint">
      <div className="container">
        <div className="roi-hero-top">
          <span className="eyebrow">ROI calculator</span>
          <CalcSwitch active={model} />
        </div>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        <p className="hero-wedge">{wedge}</p>
      </div>
    </section>
  );
}

/* ── Inputs ───────────────────────────────────────────── */
export type Unit = "money" | "%" | "days" | "people";

export type FieldDef<K extends string> = { key: K; label: string; unit: Unit; hint?: string; log?: boolean };

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

export function Field<K extends string>({
  def, value, range, currency, onChange,
}: { def: FieldDef<K>; value: number; range: Range; currency: Currency; onChange: (key: K, v: number) => void }) {
  const { key, label, unit, hint, log } = def;
  const { min, max, step } = range;
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
          prefix={unit === "money" ? currencySymbol(currency) : undefined}
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

/* ── Results CTA (inside the dark live-results panel) ─── */
export function ResultsCta({ unlocked, onCopy, copied }: { unlocked: boolean; onCopy: () => void; copied: boolean }) {
  return (
    <div className="roi-results-cta roi-noprint">
      <a href="#business-case" className="btn btn-primary btn-arrow">
        {unlocked ? "See your net return" : "Get the CFO business case"} <Icon.ArrowDown />
      </a>
      <p className="roi-results-fine">Net return, payback month, scenarios and a {PILOT_DAYS}-day pilot plan, built on these inputs.</p>
      <button type="button" className="roi-link-btn" onClick={onCopy}>
        {copied ? <><Icon.Check /> Link copied</> : <><Icon.Link /> Copy a link to these numbers</>}
      </button>
    </div>
  );
}

/* ── The maths, in full (ungated) ─────────────────────── */
export type MathsCard = { Ico: React.ComponentType<IP>; title: string; value: string; why: string; lines: string[] };

export function MathsSection({
  lede, cards, unlocked, teaser, sources, sourcesNote,
}: {
  lede: string;
  cards: MathsCard[];
  unlocked: boolean;
  teaser: string;
  sources: readonly { claim: string; source: string; url: string }[];
  sourcesNote: string;
}) {
  return (
    <section className="roi-maths" id="maths">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The maths, in full</span>
          <h2>Every line your CFO will check.</h2>
          <p className="lede">{lede}</p>
        </div>
        <div className="roi-maths-grid">
          {cards.map((c) => (
            <article key={c.title} className="roi-maths-card">
              <div className="roi-maths-top">
                <span className="roi-maths-ic"><c.Ico /></span>
                <h3>{c.title}</h3>
                <span className="roi-maths-val">{c.value}</span>
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
            <p className="roi-maths-why">{teaser}</p>
            <span className="roi-teaser-link">{unlocked ? "See it below" : "Get the business case"} <Icon.ArrowDown /></span>
          </a>
        </div>

        <div className="roi-sources">
          <h3>Where the defaults come from</h3>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                {s.claim} <a href={s.url} target="_blank" rel="noopener noreferrer">{s.source}</a>
              </li>
            ))}
          </ul>
          <p>{sourcesNote}</p>
        </div>
      </div>
    </section>
  );
}

/* ── Business case pack building blocks ───────────────── */

/** Locked previews keep the layout but never render the real figures. */
export const masked = (s: string) => s.replace(/\d/g, "0");

export function PackBlock({ Ico, title, children }: { Ico: React.ComponentType<IP>; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="roi-pack-block">
      <h4 className="roi-pack-h"><Ico /> {title}</h4>
      {children}
    </div>
  );
}

export function ScenarioCards({
  items, show,
}: {
  items: { key: string; label: string; net: string; multiple: number; note: string }[];
  show: (s: string) => string;
}) {
  return (
    <div className="roi-scen">
      {items.map((s) => (
        <div key={s.key} className={`roi-scen-card${s.key === "expected" ? " is-expected" : ""}`}>
          <span className="roi-scen-label">{s.label}</span>
          <span className="roi-scen-num">{s.net}</span>
          <span className="roi-scen-mult">{show(formatMultiple(s.multiple))} return</span>
          <span className="roi-scen-note">{s.note}</span>
        </div>
      ))}
    </div>
  );
}

export function YearsChart({ proj, currency, locked }: { proj: Projection; currency: Currency; locked: boolean }) {
  const m = (v: number) => (locked ? masked : String)(formatMoney(v, currency, { compact: true }));
  const maxYear = Math.max(...proj.years.map((y) => Math.abs(y.net)), 1);
  return (
    <>
      <div className="roi-years" role="img" aria-label={locked ? "Three-year projection (locked)" : proj.years.map((y) => `Year ${y.year}: ${formatMoney(y.net, currency)} net`).join(", ")}>
        {proj.years.map((y) => (
          <div key={y.year} className="roi-year" title={locked ? undefined : `Year ${y.year}: ${formatMoney(y.net, currency)} net, ${formatMoney(y.cumulative, currency)} cumulative`}>
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
    </>
  );
}

export function PilotSteps({ steps }: { steps: { when: string; what: string }[] }) {
  return (
    <>
      <ol className="roi-pilot-steps">
        {steps.map((s) => <li key={s.when}><b>{s.when}</b><span>{s.what}</span></li>)}
      </ol>
      <p className="roi-pilot-walk">If the numbers don&apos;t move, you walk away.</p>
    </>
  );
}

/* ── The business case (email-gated) ──────────────────── */
export type Delivery = "idle" | "sending" | "sent" | "failed";

export function BusinessCase({
  unlocked, delivery, sentTo, onUnlock, onCopy, copied, model, contents, lockSub, renderPack,
}: {
  unlocked: boolean; delivery: Delivery; sentTo: string;
  onUnlock: (email: string) => void;
  onCopy: () => void; copied: boolean;
  model: RoiModel;
  contents: { Ico: React.ComponentType<IP>; h: string; p: string }[];
  lockSub: string;
  renderPack: (locked: boolean) => React.ReactNode;
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
              <button type="button" className="btn btn-ghost" onClick={() => { track("roi_pack_printed", { model }); window.print(); }}><Icon.Printer /> Save as PDF</button>
              <button type="button" className="btn btn-ghost" onClick={onCopy}>{copied ? <><Icon.Check /> Link copied</> : <><Icon.Link /> Copy link</>}</button>
              <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book the {PILOT_DAYS}-day pilot <Icon.Arrow /></Link>
            </div>
          </div>
          {renderPack(false)}
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
            {contents.map((c) => (
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
            {renderPack(true)}
          </div>
          <div className="roi-pack-lock">
            <span className="roi-pack-lock-ic"><Icon.Lock /></span>
            <strong>Built on your inputs</strong>
            <span>{lockSub}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── State hooks ──────────────────────────────────────── */
const noopSubscribe = () => () => {};
const readSearch = () => window.location.search;
const readStoredUnlock = () => {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * The URL and stored unlock, read after hydration (server snapshot = defaults),
 * so a shared link or an emailed business case reopens the exact model.
 */
export function useRoiUrlState() {
  const search = useSyncExternalStore(noopSubscribe, readSearch, () => "");
  const storedUnlock = useSyncExternalStore(noopSubscribe, readStoredUnlock, () => false);
  const params = new URLSearchParams(search);
  return { search, params, preUnlocked: params.get("pack") === "1" || storedUnlock };
}

/** Fires roi_calculator_engaged once, on the first change. */
export function useEngaged(model: RoiModel) {
  const engaged = useRef(false);
  return () => {
    if (engaged.current) return;
    engaged.current = true;
    track("roi_calculator_engaged", { model });
  };
}

export function useCopyLink(model: RoiModel) {
  const [copied, setCopied] = useState(false);
  const copy = async (query: string, unlocked: boolean) => {
    const url = `${window.location.origin}${CALCULATORS[model].href}?${query}${unlocked ? "&pack=1" : ""}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link", url);
    }
    track("roi_link_copied", { model, unlocked });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return { copied, copy };
}

export function useUnlock(model: RoiModel, preUnlocked: boolean) {
  const [unlockedNow, setUnlockedNow] = useState(false);
  const [delivery, setDelivery] = useState<Delivery>("idle");
  const [sentTo, setSentTo] = useState("");

  const unlock = async (email: string, inputs: object, trackProps: Record<string, unknown>) => {
    setDelivery("sending");
    let delivered = false;
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, model, inputs }),
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
    track("roi_pack_requested", { model, delivered, ...trackProps });
    requestAnimationFrame(() => document.getElementById("business-case")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return { unlocked: unlockedNow || preUnlocked, delivery, sentTo, unlock };
}
