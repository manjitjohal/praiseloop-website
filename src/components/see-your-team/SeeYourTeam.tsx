"use client";

/**
 * /see-your-team, answers first.
 *
 * 1. Six questions, one at a time, while a skeleton of the Monday brief fills
 *    in beside them. Nothing else on the page competes with the question.
 * 2. The result:
 *    - their answers as editable chips;
 *    - what the slip costs in their money (arithmetic on their inputs, every
 *      assumption shown and editable), with the quarter drawn under it;
 *    - the same 1:1 two ways, which is where the "why" shows, plus one
 *      sourced benchmark;
 *    - the top of the Monday brief, with the email gate beside it.
 * 3. A work email unlocks a kit they can run by hand (find it in the CRM, open
 *    the 1:1, a two-week plan with a tracker, measure it) and the rest of the
 *    brief, as tabs, and emails the kit to keep.
 *
 * A link that already carries the answers (shared, or from the email) skips
 * the questions. Content and claims live in src/lib/see-your-team.ts.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import "../../app/see-your-team.css";
import { DemoCta } from "../marketing/MarketingPage";
import { DidItWork, ExampleData, Kpi, RepRow, type DiwData } from "../marketing/mocks";
import { STATS } from "../site/blocks";
import { Icon } from "../site/icons";
import { formatMoney, type Currency } from "@/lib/roi";
import {
  CURRENCY_LIST,
  DEAL_MAX,
  DEAL_PRESETS,
  DEFAULTS,
  MOTIONS,
  OPTIONS,
  PLAN_WEEKS,
  PL_WEEKS,
  QUARTER_WEEKS,
  SIZES,
  STALLS,
  STEPS,
  VERDICT_WEEKS,
  answersToParams,
  approx,
  buildTeam,
  companyFromSite,
  completeAnswersFromParams,
  initials,
  quarter,
  slipCost,
  summarise,
  type Answers,
  type ChoiceKey,
  type StepKey,
  type Team,
} from "@/lib/see-your-team";

const UNLOCK_KEY = "pl-syt-pack";

/** PostHog is only initialised when its key is set; stay silent otherwise. */
const track = (event: string, props?: Record<string, unknown>) => {
  if (posthog.__loaded) posthog.capture(event, props);
};

const noopSubscribe = () => () => {};
const readSearch = () => window.location.search;
const readStoredUnlock = () => {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
};

const isComplete = (d: Partial<Answers>) => Boolean(d.motion && d.stall && d.spot && d.size);

const smooth = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

type Delivery = "idle" | "sending" | "sent" | "failed";
type TabId = "kit" | "plan" | "team" | "diw" | "rep";
const TABS: { id: TabId; label: string }[] = [
  { id: "kit", label: "Your two-week fix" },
  { id: "plan", label: "Sam’s plan" },
  { id: "team", label: "The team" },
  { id: "diw", label: "Did it work?" },
  { id: "rep", label: "Sam’s view" },
];

/** What a chip shows for each answer. */
const answerLabel = (a: Answers, k: StepKey) =>
  k === "site" ? companyFromSite(a.site) : k === "deal" ? formatMoney(a.deal, a.cur) : OPTIONS[k][a[k]].label;

export default function SeeYourTeam() {
  // The URL and a stored unlock are read after hydration (the server renders
  // the first question), so a shared or emailed link reopens the exact page.
  const search = useSyncExternalStore(noopSubscribe, readSearch, () => "");
  const storedUnlock = useSyncExternalStore(noopSubscribe, readStoredUnlock, () => false);
  const params = new URLSearchParams(search);
  const fromUrl = completeAnswersFromParams(params);

  const [picked, setPicked] = useState<Partial<Answers>>({});
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState(0);
  const draft: Partial<Answers> = { ...(fromUrl ?? {}), ...picked };
  const showResult = isComplete(draft) && (finished || fromUrl !== null);
  // Defaults only fill gaps while the questions are still being asked.
  const a: Answers = { ...DEFAULTS, ...draft };
  const t = buildTeam(a);

  const [unlockedNow, setUnlockedNow] = useState(false);
  const [delivery, setDelivery] = useState<Delivery>("idle");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const unlocked = unlockedNow || storedUnlock || params.get("pack") === "1";

  const [editing, setEditing] = useState<StepKey | null>(null);
  const [pulse, setPulse] = useState<{ key: StepKey; n: number } | null>(null);
  const [gatePulse, setGatePulse] = useState(0);
  const [tab, setTab] = useState<TabId>("kit");

  const stepHead = useRef<HTMLHeadingElement>(null);
  const resultHead = useRef<HTMLHeadingElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const interacted = useRef(false);
  const justFinished = useRef(false);
  /** "See Sam's plan" glows once, the first time the brief comes into view. */
  const nudged = useRef(false);
  const [demoOpen, setDemoOpen] = useState(false);

  // Move focus with the questions, so keyboard and screen-reader users land on each one.
  useEffect(() => {
    if (interacted.current) stepHead.current?.focus();
  }, [step]);

  // On the reveal, start at the top of the result and announce its heading.
  useEffect(() => {
    if (showResult && justFinished.current) {
      justFinished.current = false;
      window.scrollTo({ top: 0, behavior: smooth() });
      resultHead.current?.focus({ preventScroll: true });
    }
  }, [showResult]);

  const writeUrl = (next: Answers, pack: boolean) => {
    try {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}?${answersToParams(next)}${pack ? "&pack=1" : ""}`);
    } catch {
      /* the page still works; only the shareable URL lags */
    }
  };

  /* ── asking ── */
  const advanceFrom = (key: StepKey) => setStep(STEPS.findIndex((s) => s.key === key) + 1);
  const choose = (key: ChoiceKey, value: string) => {
    if (!interacted.current) track("syt_started");
    interacted.current = true;
    setPicked((p) => ({ ...p, [key]: value }));
    advanceFrom(key);
  };
  const chooseDeal = (cur: Currency, deal: number) => {
    interacted.current = true;
    setPicked((p) => ({ ...p, cur, deal }));
    advanceFrom("deal");
  };
  const back = () => {
    interacted.current = true;
    setStep((s) => Math.max(0, s - 1));
  };
  const finish = (site: string) => {
    const next = { ...a, site };
    setPicked((p) => ({ ...p, site }));
    setFinished(true);
    justFinished.current = true;
    writeUrl(next, unlocked);
    track("syt_completed", { motion: next.motion, stall: next.stall, spot: next.spot, size: next.size, cur: next.cur, deal: next.deal, named: Boolean(site) });
  };

  /* ── the result ── */
  /** An answer changed from its chip: update, close the editor, highlight what it changed. */
  const edit = (key: StepKey, patch: Partial<Answers>) => {
    const next = { ...a, ...patch };
    setPicked((p) => ({ ...p, ...patch }));
    setEditing(null);
    setPulse((p) => ({ key, n: (p?.n ?? 0) + 1 }));
    writeUrl(next, unlocked);
    track("syt_answer_edited", { key });
  };
  /** A figure typed into the cost sentence: update quietly, so the field keeps focus. */
  const tweak = (patch: Partial<Answers>) => {
    setPicked((p) => ({ ...p, ...patch }));
    writeUrl({ ...a, ...patch }, unlocked);
  };

  const openPlan = () => {
    track("syt_plan_clicked", { unlocked });
    if (unlocked) setTab("plan");
    else setGatePulse((n) => n + 1);
    requestAnimationFrame(() => {
      document.getElementById("pack")?.scrollIntoView({ behavior: smooth(), block: "start" });
      if (!unlocked) emailInput.current?.focus({ preventScroll: true });
    });
  };

  const unlock = async (email: string) => {
    setDelivery("sending");
    let delivered = false;
    try {
      const res = await fetch("/api/see-your-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers: a }),
      });
      delivered = res.ok;
    } catch {
      delivered = false;
    }
    // It opens either way: the visitor asked for it and shouldn't pay for an email outage.
    setSentTo(email);
    setDelivery(delivered ? "sent" : "failed");
    setUnlockedNow(true);
    setTab("kit");
    writeUrl(a, true);
    try {
      localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* private mode: it still opens for this visit */
    }
    track("syt_pack_requested", { delivered, motion: a.motion, stall: a.stall, spot: a.spot, size: a.size, cur: a.cur });
    requestAnimationFrame(() => document.getElementById("pack")?.scrollIntoView({ behavior: smooth(), block: "start" }));
  };

  /** Back to question 1 with nothing filled in. An unlock stays unlocked. */
  const restart = () => {
    setPicked({});
    setFinished(false);
    setStep(0);
    setEditing(null);
    setPulse(null);
    try {
      window.history.replaceState(window.history.state, "", window.location.pathname);
    } catch {
      /* the questions still show; the old answers just stay in the URL */
    }
    track("syt_restarted");
    window.scrollTo({ top: 0, behavior: smooth() });
    requestAnimationFrame(() => stepHead.current?.focus({ preventScroll: true }));
  };

  const openDemo = () => {
    setDemoOpen(true);
    track("syt_demo_opened", { unlocked });
    requestAnimationFrame(() => {
      document.getElementById("demo")?.scrollIntoView({ behavior: smooth(), block: "start" });
      document.getElementById("name")?.focus({ preventScroll: true });
    });
  };

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?${answersToParams(a)}&pack=1`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link", url);
    }
    track("syt_link_copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // A short highlight on the blocks an edited answer changed (none on first render).
  const fresh = (deps: StepKey[]) => (pulse && deps.includes(pulse.key) ? " syt-fresh" : "");
  const whose = t.company ? `${t.company}’s` : "your";

  /* ── 1. The questions ── */
  if (!showResult) {
    const index = Math.min(step, STEPS.length - 1);
    const current = STEPS[index];
    return (
      <section className="hero syt-hero">
        <div className="container syt-ask">
          <div className="syt-ask-main">
            <h1>See your team on <span className="kw">PraiseLoop</span>.</h1>
            <p className="lede">Six quick questions. Then you&rsquo;ll see what a slipping rep costs your team, how a 1:1 changes when you know why, and the brief your sales manager would open on Monday. No email needed.</p>
            <StepCard
              index={index}
              title={current.title}
              stepKey={current.key}
              draft={draft}
              headRef={stepHead}
              onChoose={choose}
              onCurrency={(cur) => setPicked((p) => ({ ...p, cur }))}
              onDeal={chooseDeal}
              onBack={back}
              onFinish={finish}
              onSite={(v) => setPicked((p) => ({ ...p, site: v }))}
            />
            <p className="syt-aside">Rather talk it through? <Link className="textlink" href="/demo">Book a demo</Link></p>
          </div>
          <Preview d={draft} />
        </div>
      </section>
    );
  }

  /* ── 2. The result ── */
  const changed = pulse ? STEPS.find((s) => s.key === pulse.key) : null;
  return (
    <>
      <section className="hero syt-hero is-result">
        <div className="container">
          <div className="syt-result-head">
            <h1 ref={resultHead} tabIndex={-1}>
              {t.company ? <>{t.company} on <span className="kw">PraiseLoop</span>.</> : <>Your team on <span className="kw">PraiseLoop</span>.</>}
            </h1>
            <p className="lede">Built from your answers. Sam and his numbers are made up; the money is worked out from yours.</p>
            <AnswerChips a={a} open={editing} setOpen={setEditing} onPick={edit} onRestart={restart} />
            <p className="sr-only" aria-live="polite">{changed ? `Updated: ${changed.chip}.` : ""}</p>
          </div>
          <div key={`c${pulse?.n ?? 0}`} className={`syt-quarter${fresh(["motion", "stall", "spot", "deal"])}`}>
            <CostBlock a={a} t={t} onTweak={tweak} />
          </div>
        </div>
      </section>

      <section className="syt-talk-sec">
        <div className="container">
          <div key={`t${pulse?.n ?? 0}`} className={`syt-talkx${fresh(["stall"])}`}>
            <TalkBlock t={t} />
          </div>
        </div>
      </section>

      <section className="syt-brief-sec">
        <div className="container">
          <div className="syt-head">
            <h2>The brief {whose} sales manager opens on Monday.</h2>
          </div>
          <div className={`syt-brief-grid${unlocked ? " is-open" : ""}`}>
            <div key={`b${pulse?.n ?? 0}`} className={`syt-brief${fresh(["motion", "stall", "size", "site"])}`}>
              <BriefTop t={t} onPlan={openPlan} nudgedRef={nudged} />
            </div>
            {!unlocked && (
              <div id="pack" className="syt-gate-col">
                <Gate t={t} pulse={gatePulse} sending={delivery === "sending"} onUnlock={unlock} inputRef={emailInput} />
              </div>
            )}
          </div>

          {unlocked && (
            <div id="pack" className="syt-full">
              <div className="syt-full-head">
                <div>
                  <h2>{t.company ? `${t.company}’s` : "Your"} two-week fix, and the rest of the brief.</h2>
                  {delivery === "sent" && <p className="syt-flag">We&rsquo;ve emailed the kit to <b>{sentTo}</b>, ready to keep or forward to your head of sales.</p>}
                  {delivery === "failed" && <p className="syt-flag">We couldn&rsquo;t email it just now. Copy the link instead, or write to <a className="textlink" href="mailto:hello@praiseloop.com">hello@praiseloop.com</a>.</p>}
                </div>
                <div className="actions">
                  <button type="button" className="btn btn-ghost" onClick={copyLink}>{copied ? <><Icon.Check /> Link copied</> : <><Icon.Link /> Copy link</>}</button>
                  <a className="btn btn-primary" href="#demo">Book a demo <Icon.Arrow /></a>
                </div>
              </div>
              <FullBrief t={t} tab={tab} setTab={setTab} />
            </div>
          )}
        </div>
      </section>

      {/* One ask at a time: before the gate is used, a light band; the full form once they ask for it or have unlocked. */}
      {unlocked || demoOpen ? (
        <DemoCta
          eyebrow={null}
          title={<>Book 20 minutes. We&rsquo;ll start from <span className="kw">this page</span>.</>}
          body="We’ll pick up where your page leaves off: where your deals stall, what it’s costing, and the number we’d measure in a pilot."
          aside={
            <p className="syt-bring">
              <span className="syt-bring-h">We&rsquo;ll bring your answers:</span>{" "}
              {STEPS.map((s) => [s.chip, answerLabel(a, s.key)] as const).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" · ")}
            </p>
          }
          form={{
            defaults: { company: t.company, email: sentTo },
            hideKnownEmail: true,
            context: `From See your team on PraiseLoop · ${summarise(a)}`,
          }}
        />
      ) : (
        <section className="syt-demo-band">
          <div className="container">
            <div className="syt-band">
              <div>
                <h2>Rather see it live?</h2>
                <p>Book 20 minutes. We&rsquo;ll start from this page, with your answers.</p>
              </div>
              <button type="button" className="btn btn-primary" onClick={openDemo}>Book a demo <Icon.Arrow /></button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ── The question card ─────────────────────────────────── */

function StepCard({
  index, title, stepKey, draft, headRef, onChoose, onCurrency, onDeal, onBack, onFinish, onSite,
}: {
  index: number; title: string; stepKey: StepKey; draft: Partial<Answers>;
  headRef: React.RefObject<HTMLHeadingElement | null>;
  onChoose: (key: ChoiceKey, value: string) => void;
  onCurrency: (cur: Currency) => void;
  onDeal: (cur: Currency, deal: number) => void;
  onBack: () => void;
  onFinish: (site: string) => void;
  /** The company name as it is typed, so the preview picks it up live. */
  onSite: (site: string) => void;
}) {
  const cur = draft.cur ?? DEFAULTS.cur;
  return (
    <div className="syt-stepcard">
      <div className="syt-progress">
        <span>Question {index + 1} of {STEPS.length}</span>
        <span className="syt-dots" aria-hidden="true">
          {STEPS.map((s, i) => <i key={s.key} className={i < index ? "done" : i === index ? "now" : undefined} />)}
        </span>
      </div>
      <h2 ref={headRef} tabIndex={-1} id="syt-q">
        <span className="sr-only">Question {index + 1} of {STEPS.length}: </span>{title}
      </h2>

      {stepKey === "site" ? (
        <form className="syt-site" onSubmit={(e) => { e.preventDefault(); onFinish((draft.site ?? "").trim()); }}>
          <div className="field">
            <label htmlFor="syt-site-in">Company name or website <span className="syt-optional">optional</span></label>
            <input id="syt-site-in" autoComplete="organization" spellCheck={false} maxLength={120} placeholder="e.g. dunefreight.com" value={draft.site ?? ""} onChange={(e) => onSite(e.target.value)} />
          </div>
          <div className="syt-site-actions">
            <button type="submit" className="btn btn-primary">See my team <Icon.Arrow /></button>
            <button type="button" className="syt-link" onClick={() => onFinish("")}>Skip</button>
          </div>
        </form>
      ) : stepKey === "deal" ? (
        <>
          <CurrencyPicker value={cur} onChange={onCurrency} />
          <div className="syt-choices" role="group" aria-labelledby="syt-q">
            {DEAL_PRESETS[cur].map((p) => (
              <button key={p.label} type="button" className="syt-choice" aria-pressed={draft.cur === cur && draft.deal === p.value} onClick={() => onDeal(cur, p.value)}>
                <span>{p.label}</span>
                <Icon.Arrow />
              </button>
            ))}
          </div>
          <p className="syt-step-note">A rough band is fine. You can type the exact figure on the next page.</p>
        </>
      ) : (
        <div className="syt-choices" role="group" aria-labelledby="syt-q">
          {Object.entries(OPTIONS[stepKey]).map(([v, o]) => (
            <button key={v} type="button" className="syt-choice" aria-pressed={draft[stepKey] === v} onClick={() => onChoose(stepKey, v)}>
              <span>{o.label}</span>
              <Icon.Arrow />
            </button>
          ))}
        </div>
      )}

      {index > 0 && (
        <button type="button" className="syt-back" onClick={onBack}><Icon.Arrow /> Back</button>
      )}
    </div>
  );
}

function CurrencyPicker({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="syt-cur" role="group" aria-label="Currency">
      {CURRENCY_LIST.map((c) => (
        <button key={c} type="button" aria-pressed={value === c} onClick={() => onChange(c)}>{c}</button>
      ))}
    </div>
  );
}

/* ── The brief, filling in as they answer ──────────────── */

function Sk({ w }: { w: number | string }) {
  return <span className="syt-sk" style={{ width: typeof w === "number" ? `${w}px` : w }} />;
}

function SkKpi() {
  return (
    <div className="kpi">
      <Sk w="70%" />
      <Sk w={44} />
      <Sk w="55%" />
    </div>
  );
}

const Spark = () => (
  <span className="spark"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="5" fill="currentColor" /></svg></span>
);

function Preview({ d }: { d: Partial<Answers> }) {
  const company = d.site ? companyFromSite(d.site) : "";
  const stall = d.stall ? STALLS[d.stall] : null;
  const reps = d.size ? SIZES[d.size].reps : null;
  const weekly = d.stall && d.deal !== undefined ? slipCost({ ...DEFAULTS, ...d }).weekly : null;
  return (
    <div className="syt-preview" aria-hidden="true">
      <p className="syt-preview-lab">Your Monday brief, filling in as you answer</p>
      <div className="app">
        <div className="app-top">
          <span className="av">{company ? initials(company) : "?"}</span>
          <div>
            <div className="hello">Good morning</div>
            <div className="sub">
              {company || "Your team"} · {d.motion ? <span key={d.motion} className="syt-in">{MOTIONS[d.motion].label}</span> : <Sk w={92} />} · {reps ? <span className="syt-in">{reps} reps</span> : <Sk w={40} />}
            </div>
          </div>
          <ExampleData />
        </div>
        <div className="kpis">
          <Kpi l="Team to target" v="84%" d="+6 pts this month" />
          {reps ? <Kpi l="Reps on track" v={`${reps - 2} of ${reps}`} d="Same as last week" /> : <SkKpi />}
          {stall ? <Kpi l={stall.kpi[0]} v={stall.kpi[1]} d={stall.kpi[2]} down /> : <SkKpi />}
          <Kpi l="Plans running" v="1" d="Early signal" />
        </div>
        <div className="coach">
          <div className="coach-h"><Spark />Your coach</div>
          {stall ? <p key={d.stall} className="syt-in">{stall.coach}</p> : <div className="syt-sk-lines"><Sk w="94%" /><Sk w="82%" /><Sk w="56%" /></div>}
        </div>
        <div className="panel">
          <div className="panel-h"><span>Needs you this week</span><span className="sub">1 rep</span></div>
          <div className="rep">
            <span className="av s t">SA</span>
            <span className="nm">Sam A.</span>
            <span className="pill behind">Behind target</span>
            {stall ? <span key={d.stall} className="gap syt-in">{stall.gap}</span> : <span className="gap"><Sk w="90%" /></span>}
          </div>
        </div>
        <div className="syt-preview-q">
          <span>A week of Sam&rsquo;s slip costs about</span>
          {weekly !== null ? <b key={`${d.stall}${d.deal}${d.cur}`} className="syt-in">{approx(weekly, d.cur ?? DEFAULTS.cur)}</b> : <Sk w={64} />}
        </div>
      </div>
    </div>
  );
}

/* ── Their answers, as chips they can change ───────────── */

function AnswerChips({
  a, open, setOpen, onPick, onRestart,
}: {
  a: Answers; open: StepKey | null; setOpen: (k: StepKey | null) => void;
  onPick: (k: StepKey, patch: Partial<Answers>) => void; onRestart: () => void;
}) {
  return (
    <div className="syt-answers">
      <ul className="syt-chips" aria-label="Your answers">
        {STEPS.map((s) => (
          <li key={s.key}>
            <button
              type="button"
              className={`syt-chip${open === s.key ? " on" : ""}`}
              aria-expanded={open === s.key}
              aria-controls={open === s.key ? "syt-edit" : undefined}
              onClick={() => setOpen(open === s.key ? null : s.key)}
            >
              <span className="k">{s.chip}</span>
              <span className="v">{answerLabel(a, s.key) || "Add a name"}</span>
              <Icon.Chevron />
            </button>
          </li>
        ))}
        <li><button type="button" className="syt-link syt-restart" onClick={onRestart}><Icon.Reset /> Start over</button></li>
      </ul>
      {open && <EditPanel key={open} k={open} a={a} onPick={onPick} onClose={() => setOpen(null)} />}
    </div>
  );
}

function EditPanel({ k, a, onPick, onClose }: { k: StepKey; a: Answers; onPick: (k: StepKey, patch: Partial<Answers>) => void; onClose: () => void }) {
  const step = STEPS.find((s) => s.key === k)!;
  const [site, setSite] = useState(a.site);
  const [cur, setCur] = useState<Currency>(a.cur);
  return (
    <div className="syt-edit" id="syt-edit" onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <p className="syt-edit-q" id="syt-edit-q">{step.title}</p>
      {k === "site" ? (
        <form className="syt-edit-site" onSubmit={(e) => { e.preventDefault(); onPick("site", { site: site.trim() }); }}>
          <div className="field">
            <label className="sr-only" htmlFor="syt-edit-in">Company name or website</label>
            <input id="syt-edit-in" autoComplete="organization" spellCheck={false} maxLength={120} placeholder="e.g. dunefreight.com" value={site} onChange={(e) => setSite(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      ) : k === "deal" ? (
        <>
          <CurrencyPicker value={cur} onChange={setCur} />
          <div className="syt-opts" role="group" aria-labelledby="syt-edit-q">
            {DEAL_PRESETS[cur].map((p) => (
              <button key={p.label} type="button" className="syt-opt" aria-pressed={a.cur === cur && a.deal === p.value} onClick={() => onPick("deal", { cur, deal: p.value })}>{p.label}</button>
            ))}
          </div>
        </>
      ) : (
        <div className="syt-opts" role="group" aria-labelledby="syt-edit-q">
          {Object.entries(OPTIONS[k]).map(([v, o]) => (
            <button key={v} type="button" className="syt-opt" aria-pressed={a[k] === v} onClick={() => onPick(k, { [k]: v })}>{o.label}</button>
          ))}
        </div>
      )}
      <button type="button" className="syt-close" onClick={onClose} aria-label="Close"><Icon.X /></button>
    </div>
  );
}

/* ── What the slip costs, in their money ───────────────── */

/** A number typed inline in a sentence. Keeps its own text while typing; commits valid numbers. */
function InlineNumber({ value, onCommit, label, max, width }: { value: number; onCommit: (n: number) => void; label: string; max: number; width: string }) {
  const show = (n: number) => n.toLocaleString("en-GB");
  const [text, setText] = useState(show(value));
  return (
    <input
      className="syt-inline"
      style={{ width }}
      inputMode="decimal"
      aria-label={label}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const n = Number(e.target.value.replace(/[^0-9.]/g, ""));
        if (e.target.value.trim() !== "" && Number.isFinite(n)) onCommit(Math.min(max, Math.max(0, n)));
      }}
      onBlur={() => setText(show(value))}
    />
  );
}

function CostBlock({ a, t, onTweak }: { a: Answers; t: Team; onTweak: (patch: Partial<Answers>) => void }) {
  const c = slipCost(a);
  const q = quarter(a);
  // The weekly figure is already rounded; totals are exact multiples of it, so they add up on the page.
  const m = (v: number) => formatMoney(v, a.cur);
  const weeks = q.today === 1 ? "a week" : `${q.today}${q.plus ? "+" : ""} weeks`;
  return (
    <>
      <div className="syt-number">
        <div className="syt-big" aria-hidden="true"><b>{m(c.weekly)}</b><span>a week</span></div>
        <div className="syt-number-copy">
          <h2>What Sam&rsquo;s slip costs, for every week nobody notices.</h2>
          <p>Today it&rsquo;s spotted {t.spot.how}, about {weeks} in: <b>{m(c.today)}</b> gone.</p>
          {q.back > 0 ? (
            <p>PraiseLoop puts it in the Monday brief by week {PL_WEEKS}. That&rsquo;s {q.back}{q.plus ? "+" : ""} {q.back === 1 ? "week" : "weeks"} sooner, worth about <b>{m(c.back)}</b> at this rate, before the plan has done anything.</p>
          ) : (
            <p>PraiseLoop won&rsquo;t spot it sooner than you do. What changes is knowing why, and that&rsquo;s the next section.</p>
          )}
        </div>
      </div>

      <p className="syt-model">
        <span className="syt-model-k">Worked out from your numbers.</span>{" "}
        A rep closes about{" "}
        <InlineNumber value={c.dpm} max={100} width="3.2em" label="Deals a rep closes in a normal month" onCommit={(n) => onTweak({ dpm: n })} />{" "}
        deals a month, worth about{" "}
        <span className="syt-money">
          <select className="syt-inline-cur" aria-label="Currency" value={a.cur} onChange={(e) => { const cur = e.target.value as Currency; onTweak({ cur, deal: DEAL_PRESETS[cur][1].value }); }}>
            {CURRENCY_LIST.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
          </select>
          <InlineNumber key={a.cur} value={a.deal} max={DEAL_MAX} width="6.5em" label="Average deal size" onCommit={(n) => onTweak({ deal: Math.round(n) })} />
        </span>{" "}
        each. {t.stall.rate.say}
      </p>
      <p className="syt-year">One slip like this a quarter is about <b>{m(c.yearly)}</b> a year, in weeks nobody noticed.</p>

      <QuarterDiagram today={q.today} />

      <p className="syt-roi">
        <Link className="textlink" href={`/roi-calculator?cur=${a.cur}`}>Model your whole sales team in the ROI calculator</Link>
      </p>
    </>
  );
}

/** The first eight weeks of the quarter, where everything happens; labels sit on the markers. */
const SHOW_WEEKS = 8;

function QuarterDiagram({ today }: { today: number }) {
  const pctOf = (w: number) => (w / SHOW_WEEKS) * 100;
  const pct = (w: number) => `${pctOf(w)}%`;
  const span = (from: number, to: number) => ({ left: pct(from), width: pct(Math.min(SHOW_WEEKS, to) - from) });
  const edge = (w: number) => (pctOf(w) < 16 ? " at-l" : pctOf(w) > 84 ? " at-r" : "");
  const planEnd = PL_WEEKS + PLAN_WEEKS;
  const verdict = PL_WEEKS + VERDICT_WEEKS;
  return (
    <figure className="syt-qd">
      <figcaption className="syt-qd-note">
        Say Sam starts slipping in the first week of the quarter.
        <span className="sr-only"> Today it&rsquo;s spotted around week {today}, then a 1:1 works out why. With PraiseLoop it&rsquo;s in the brief by week {PL_WEEKS}, the plan runs weeks {PL_WEEKS + 1} to {planEnd}, and &ldquo;Did it work?&rdquo; reads by week {verdict}.</span>
      </figcaption>
      <div className="syt-qd-chart" aria-hidden="true">
        <div className="syt-qd-row">
          <span className="syt-qd-name">Today</span>
          <div className="syt-qd-track">
            <span className="seg qd-slip" style={span(0, today)}><em>Unnoticed</em></span>
            <span className="seg qd-why" style={span(today, today + 1)}><em>Why?</em></span>
            <i className="mark qd-today" style={{ left: pct(today) }} />
            <span className={`qd-lab qd-today${edge(today)}`} style={{ left: pct(today) }}>Spotted · wk {today}</span>
          </div>
        </div>
        <div className="syt-qd-row">
          <span className="syt-qd-name">PraiseLoop</span>
          <div className="syt-qd-track">
            <span className="seg qd-slip" style={span(0, PL_WEEKS)} />
            <span className="seg qd-plan" style={span(PL_WEEKS, planEnd)}><em>Plan</em></span>
            <i className="mark qd-brief" style={{ left: pct(PL_WEEKS) }} />
            <i className="mark qd-verdict" style={{ left: pct(verdict) }} />
            <span className={`qd-lab qd-brief${edge(PL_WEEKS)}`} style={{ left: pct(PL_WEEKS) }}>In the brief · wk {PL_WEEKS}</span>
            <span className={`qd-lab qd-verdict${edge(verdict)}`} style={{ left: pct(verdict) }}>Did it work? · wk {verdict}</span>
          </div>
        </div>
        <div className="syt-qd-row axis">
          <span className="syt-qd-name">Week</span>
          <div className="syt-qd-weeks">
            {Array.from({ length: SHOW_WEEKS }, (_, i) => <span key={i}>{i + 1}</span>)}
          </div>
        </div>
        <p className="syt-qd-tail">The quarter runs to week {QUARTER_WEEKS}.</p>
      </div>
    </figure>
  );
}

/* ── The same 1:1, two ways ────────────────────────────── */

function TalkBlock({ t }: { t: Team }) {
  const stat = STATS.coach;
  const line = ([who, text]: [string, string], i: number) => (
    <p key={i} className={`syt-line ${who === "M" ? "m" : "s"}`}>
      <span className="who">{who === "M" ? "You" : "Sam"}</span>
      <span className="say">{text}</span>
    </p>
  );
  return (
    <>
      <div className="syt-head">
        <h2>The same 1:1 with Sam, two ways.</h2>
        <p className="syt-flag">The difference is what you walk in knowing. <ExampleData /></p>
      </div>
      <div className="syt-convos">
        <figure className="syt-convo is-today">
          <figcaption>Today</figcaption>
          {t.stall.talkToday.map(line)}
          <p className="syt-convo-foot">Twenty minutes in, you&rsquo;re still working out why.</p>
        </figure>
        <figure className="syt-convo is-pl">
          <figcaption>With PraiseLoop</figcaption>
          {t.stall.talkPl.map(line)}
          <p className="syt-convo-foot">The plan is agreed early, and the rest of the 1:1 is about Sam&rsquo;s deals.</p>
        </figure>
      </div>
      <p className="syt-stat">
        <b>{stat.value}{stat.suffix}</b>
        <span>more likely to get regular coaching, if you&rsquo;re a top-performing seller.</span>
        <a href={stat.url} target="_blank" rel="noopener noreferrer">{stat.source}</a>
      </p>
    </>
  );
}

/* ── Mock buttons that do what they say ────────────────── */

function CoachCard({
  label = "Your coach", text, primary, secondary, onPrimary, onSecondary, primaryPressed, secondaryExpanded, note, nudge,
}: {
  label?: string; text: string; primary: React.ReactNode; secondary: string;
  onPrimary: () => void; onSecondary: () => void;
  primaryPressed?: boolean; secondaryExpanded?: boolean; note?: React.ReactNode;
  /** A one-off glow on the primary button, to show it's clickable. */
  nudge?: boolean;
}) {
  return (
    <div className="coach">
      <div className="coach-h"><Spark />{label}</div>
      <p>{text}</p>
      <div className="row">
        <button type="button" className={`cbtn o${nudge ? " syt-nudge" : ""}`} onClick={onPrimary} aria-pressed={primaryPressed}>{primary}</button>
        <button type="button" className="cbtn g" onClick={onSecondary} aria-expanded={secondaryExpanded}>{secondary}</button>
      </div>
      {note && <p className="syt-coach-note">{note}</p>}
    </div>
  );
}

/** A plan card: the primary button agrees/starts it, "Why this?" shows the reason. */
function PlanCoach({ label, text, primary, done, why }: { label?: string; text: string; primary: string; done: string; why: React.ReactNode }) {
  const [isDone, setDone] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  return (
    <CoachCard
      label={label}
      text={text}
      primary={isDone ? <><Icon.Check /> {done}</> : primary}
      onPrimary={() => setDone(true)}
      primaryPressed={isDone}
      secondary="Why this?"
      onSecondary={() => setShowWhy((v) => !v)}
      secondaryExpanded={showWhy}
      note={showWhy ? why : null}
    />
  );
}

/* ── The top of the brief (free) ───────────────────────── */

function BriefTop({ t, onPlan, nudgedRef }: { t: Team; onPlan: () => void; nudgedRef: React.RefObject<boolean> }) {
  const [kl, kv, kd] = t.stall.kpi;
  const box = useRef<HTMLDivElement>(null);
  const [nudge, setNudge] = useState(false);

  // The first time the brief is properly in view, "See Sam's plan" glows once. Never again after that.
  useEffect(() => {
    const el = box.current;
    if (!el || nudgedRef.current || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || nudgedRef.current) return;
      nudgedRef.current = true;
      io.disconnect();
      setNudge(true);
      timer = setTimeout(() => setNudge(false), 2600);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [nudgedRef]);

  return (
    <div className="app" ref={box}>
      <div className="app-top">
        <span className="av">{t.avatar}</span>
        <div>
          <div className="hello">Good morning</div>
          <div className="sub">Monday brief · {t.company || "Your team"} · {t.reps} reps</div>
        </div>
        <ExampleData />
      </div>
      <div className="kpis">
        <Kpi l="Team to target" v="84%" d="+6 pts this month" />
        <Kpi l="Reps on track" v={`${t.reps - 2} of ${t.reps}`} d="Same as last week" />
        <Kpi l={kl} v={kv} d={kd} down />
        <Kpi l="Plans running" v="1" d="Early signal" />
      </div>
      <CoachCard text={t.stall.coach} primary="See Sam’s plan" secondary="See the evidence" onPrimary={onPlan} onSecondary={onPlan} nudge={nudge} />
      <div className="panel">
        <div className="panel-h"><span>Needs you this week</span><span className="sub">1 rep</span></div>
        <RepRow {...t.sam} />
      </div>
    </div>
  );
}

/* ── The gate, beside the brief: a kit worth an email ──── */

function Gate({
  t, pulse, sending, onUnlock, inputRef,
}: { t: Team; pulse: number; sending: boolean; onUnlock: (email: string) => void; inputRef: React.RefObject<HTMLInputElement | null> }) {
  const [email, setEmail] = useState("");
  return (
    <div className="syt-gate">
      {pulse > 0 && <span key={pulse} className="syt-glow" aria-hidden="true" />}
      <span className="syt-lock"><Icon.Lock /></span>
      <h3>Get the two-week fix for {t.stall.problem}.</h3>
      <div className="syt-teaser">
        <span className="lab">Step 1 · Find who has it</span>
        <p>{t.stall.kit.find[0]}</p>
      </div>
      <div className="syt-opens">
        <span className="syt-opens-h">Also opens</span>
        <ul className="syt-locked-tabs">
          {TABS.map((x) => <li key={x.id}><Icon.Lock />{x.label}</li>)}
        </ul>
      </div>
      <form className="syt-form" onSubmit={(e) => { e.preventDefault(); onUnlock(email.trim()); }}>
        <span className="syt-input">
          <Icon.Mail />
          <input ref={inputRef} type="email" required placeholder="you@company.com" aria-label="Work email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </span>
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? "Sending…" : <>Send me the fix <Icon.Arrow /></>}
        </button>
      </form>
      <p className="syt-fine">Opens here straight away. We send one email with the kit and don&rsquo;t add you to a mailing list. Our team sees your answers, so a demo starts from this page.</p>
    </div>
  );
}

/* ── After the gate: the kit, then the brief, as tabs ──── */

function FullBrief({ t, tab, setTab }: { t: Team; tab: TabId; setTab: (id: TabId) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((x) => x.id === tab);
    const j = e.key === "ArrowRight" ? (i + 1) % TABS.length
      : e.key === "ArrowLeft" ? (i - 1 + TABS.length) % TABS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? TABS.length - 1
      : -1;
    if (j < 0) return;
    e.preventDefault();
    setTab(TABS[j].id);
    tabRefs.current[j]?.focus();
  };
  return (
    <>
      <div className="syt-tabs" role="tablist" aria-label="Your fix and the full brief" onKeyDown={onKey}>
        {TABS.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`syt-tab-${x.id}`}
            aria-selected={tab === x.id}
            aria-controls="syt-panel"
            tabIndex={tab === x.id ? 0 : -1}
            className={`syt-tab${tab === x.id ? " on" : ""}`}
            onClick={() => setTab(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="syt-panel" role="tabpanel" id="syt-panel" aria-labelledby={`syt-tab-${tab}`} tabIndex={0}>
        {tab === "kit" && <KitTab t={t} />}
        {tab === "plan" && <PlanTab t={t} />}
        {tab === "team" && <TeamTab t={t} />}
        {tab === "diw" && <DidItWork d={diwFor(t)} />}
        {tab === "rep" && <RepTab t={t} />}
      </div>
    </>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function KitTab({ t }: { t: Team }) {
  const k = t.stall.kit;
  return (
    <div className="syt-kit">
      <div className="syt-kit-h">
        <h3>The two-week fix for {t.stall.problem}</h3>
        <p>Run it by hand for one rep. PraiseLoop runs it every morning for every rep, and remembers last week.</p>
      </div>
      <ol className="syt-kit-steps">
        <li>
          <span className="n" aria-hidden="true">1</span>
          <div>
            <h4>Find who has it</h4>
            <ul>{k.find.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </li>
        <li>
          <span className="n" aria-hidden="true">2</span>
          <div>
            <h4>Open the 1:1</h4>
            <p>Start with something that&rsquo;s going well, then ask:</p>
            <p className="syt-kit-q">&ldquo;{t.stall.question}&rdquo;</p>
          </div>
        </li>
        <li>
          <span className="n" aria-hidden="true">3</span>
          <div>
            <h4>Agree one habit, for two weeks</h4>
            <p className="syt-kit-habit">{k.habit}</p>
            <p>Every working day, note it: {k.track}</p>
            <div className="syt-tracker" role="group" aria-label="Two-week tracker">
              {[1, 2].map((w) => (
                <div key={w} className="syt-tracker-row">
                  <span className="wk">Week {w}</span>
                  {DAYS.map((d) => (
                    <label key={d}><input type="checkbox" aria-label={`Week ${w}, ${d}`} /><span>{d}</span></label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </li>
        <li>
          <span className="n" aria-hidden="true">4</span>
          <div>
            <h4>Measure it twice</h4>
            <p>First the habit: <b>{k.behaviour}</b>. Then the number it should move: <b>{k.outcome}</b>.</p>
            <p>Look for an early signal after two weeks and a verdict at three. If it didn&rsquo;t move, try a different habit, not more of the same.</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

function PlanTab({ t }: { t: Team }) {
  const warn = t.evidence.find(([, , tone]) => tone === "wn");
  return (
    <div className="app rec syt-tab-narrow">
      <div className="app-top">
        <span className="av t">SA</span>
        <div>
          <div className="hello">Sam A. · {t.role}</div>
          <div className="sub">Coach recommendation · Monday 8:04</div>
        </div>
        <ExampleData />
      </div>
      <div className="rec-what">
        <span className="rec-k">What&rsquo;s changed</span>
        <p><b>{t.stall.changedLead}</b> {t.stall.changedRest}</p>
      </div>
      <div className="panel evidence">
        <div className="panel-h"><span>The evidence</span><span className="sub">From your CRM and calls</span></div>
        {t.evidence.map(([k, v, tone]) => <div className="ev" key={k}><span>{k}</span><b className={tone}>{v}</b></div>)}
      </div>
      <PlanCoach
        label="Recommended plan · 2 weeks"
        text={t.stall.plan}
        primary="Agree plan"
        done="Agreed. Sam has the plan"
        why={warn ? <>Because of this: {warn[0].toLowerCase()}, {warn[1]}. The plan works on that one habit and nothing else.</> : null}
      />
      <div className="rec-foot"><Icon.Check /> Tracked against Sam&rsquo;s own last eight weeks.</div>
    </div>
  );
}

function TeamTab({ t }: { t: Team }) {
  return (
    <div className="syt-team">
      <div className="panel">
        <div className="panel-h"><span>What moved</span><span className="sub">Worth recognising</span></div>
        <RepRow {...t.priya} />
      </div>
      <div className="panel">
        <div className="panel-h"><span>Your team, rep by rep</span><span className="sub">{t.reps} reps</span></div>
        <RepRow {...t.sam} />
        <RepRow {...t.priya} gap="Rising. See above." />
        {t.rest.map((r) => <RepRow key={r.name} {...r} />)}
        {t.more > 0 && <div className="syt-more">+ {t.more} more, on track against their own normal</div>}
      </div>
    </div>
  );
}

function RepTab({ t }: { t: Team }) {
  return (
    <div className="syt-rep">
      <div className="app narrow">
        <div className="app-top">
          <span className="av t">SA</span>
          <div>
            <div className="hello">Today, Sam</div>
            <div className="sub">Tuesday · 9 working days left this month</div>
          </div>
          <ExampleData />
        </div>
        <div className="panel target">
          <div className="target-h"><span>Month to target</span><span>74%</span></div>
          <div className="bar lt"><span style={{ width: "74%" }} /></div>
          <div className="target-note"><b>Forecast 92%.</b> One more win this month gets you there.</div>
        </div>
        <PlanCoach
          text={t.stall.repPlan}
          primary="Start this week"
          done="Started. Day 1 of 10"
          why={<>{t.stall.changedLead} {t.stall.changedRest}</>}
        />
        <div className="mini note">
          <span className="lab">Your plan · day 3 of 10</span>
          <div>Agreed with your manager. Today: {t.stall.todayStep}</div>
        </div>
      </div>
      <div className="syt-rep-copy">
        <p>Sam sees his own numbers, his plan and how far he is from target.</p>
        <p>He&rsquo;s measured against his own best weeks, not ranked against the team. And there are no labels: ahead of target, on track or behind it.</p>
        <p><Link className="textlink" href="/for/reps">More on what reps get</Link></p>
      </div>
    </div>
  );
}

function diwFor(t: Team): DiwData {
  const { did, moved, planShort } = t.stall;
  return {
    initials: "SA",
    name: "Sam A.",
    plan: planShort,
    didLabel: did.label,
    didFrom: did.from,
    didTo: did.to,
    didSub: did.sub,
    movedFrom: moved.from,
    movedTo: moved.to,
    movedSub: moved.sub,
    chartLabel: `Sam, ${moved.sub}: around his normal, then a dip, then ${moved.to} after the plan started`,
    normalLabel: moved.normal,
    points: "40,98 80,92 120,100 160,94 200,116 240,120 280,108 320,96 360,84 400,74 440,66",
    endY: 66,
  };
}
