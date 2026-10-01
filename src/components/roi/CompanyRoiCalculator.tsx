"use client";

import { useState } from "react";
import {
  CURRENCIES,
  PILOT_DAYS,
  SOURCES,
  computeRoi,
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
import {
  BusinessCase,
  Field,
  Icon,
  MathsSection,
  PackBlock,
  PilotSteps,
  ResultsCta,
  RoiHero,
  RoiPage,
  ScenarioCards,
  YearsChart,
  masked,
  useCopyLink,
  useEngaged,
  useRoiUrlState,
  useUnlock,
  type FieldDef,
} from "./shared";

/* ── Inputs ───────────────────────────────────────────── */
type NumericKey = Exclude<keyof RoiInputs, "currency">;

const BUSINESS_FIELDS: FieldDef<NumericKey>[] = [
  { key: "headcount", label: "Employees in scope", unit: "people", log: true, hint: "One department, one region, or the whole company." },
  { key: "salary", label: "Average salary", unit: "money", hint: "Base salary, before employer on-costs." },
  { key: "turnover", label: "Annual voluntary turnover", unit: "%", hint: "People who chose to leave in the last 12 months, as a share of headcount." },
  { key: "absenceDays", label: "Absence days per person, per year", unit: "days", hint: "The UK average is 7.8 days (CIPD, 2023)." },
];

const ASSUMPTION_FIELDS: FieldDef<NumericKey>[] = [
  { key: "turnoverReduction", label: "Voluntary exits avoided", unit: "%", hint: "Gallup finds 42% of leavers could have been kept. We assume PraiseLoop keeps about a third of them." },
  { key: "replacementCost", label: "Cost to replace a leaver (% of salary)", unit: "%", hint: "Gallup puts it at 50–200% of salary, depending on the role. 100% is the conservative middle." },
  { key: "middleShare", label: "Share of people in the movable middle", unit: "%", hint: "Not your stars and not your strugglers: the solid middle that recognition moves most." },
  { key: "productivityLift", label: "Productivity lift on the middle", unit: "%", hint: "Valued at salary cost, which is a floor. Output is usually worth more than it costs." },
  { key: "absenceReduction", label: "Reduction in absence days", unit: "%", hint: "We count only the salary cost of each day, not the disruption around it." },
  { key: "workingDays", label: "Working days a year", unit: "days", hint: "Turns salary into a daily cost." },
];

/** Cost inputs live only in the unlocked business case: pricing stays off the public page. */
const COST_FIELDS: FieldDef<NumericKey>[] = [
  { key: "seatPrice", label: "PraiseLoop, per person per month", unit: "money", hint: "Illustrative list price. Your quote depends on seats and modules." },
  { key: "rewardBudget", label: "Reward budget, per person per year", unit: "money", hint: "Paid out only when a verified result lands. Set it to 0 if you're redirecting an existing budget." },
];

function InputField({ def, inputs, onChange }: { def: FieldDef<NumericKey>; inputs: RoiInputs; onChange: (key: NumericKey, v: number) => void }) {
  return <Field def={def} value={inputs[def.key]} range={rangeFor(def.key, inputs.currency)} currency={inputs.currency} onChange={onChange} />;
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

      <ResultsCta unlocked={unlocked} onCopy={onCopy} copied={copied} />
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

  return (
    <MathsSection
      lede="No black box. The impact above comes from these three calculations, using your inputs. Change an input and they update with it."
      unlocked={unlocked}
      teaser="The business case nets this impact against the PraiseLoop platform and the rewards themselves, which only pay out on verified results. Then it works out your return multiple and the month it pays back."
      sources={SOURCES}
      sourcesNote="The lift assumptions (exits avoided, productivity, absence) are deliberately set well below the research, and they're PraiseLoop's modelled estimates, not measured results. A 90-day pilot replaces them with your own numbers."
      cards={[
        {
          Ico: Icon.UserCheck,
          title: "Regretted exits avoided",
          value: m(r.retention),
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
          value: m(r.productivity),
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
          value: m(r.absence),
          why: "Teams that feel seen take fewer unplanned days. We count only the salary cost of those days, not the cover and disruption around them.",
          lines: [
            `${n(i.headcount)} × ${n(i.absenceDays, 1)} days = ${n(absenceTotal)} absence days a year`,
            `${n(absenceTotal)} × ${i.absenceReduction}% = ${n(r.daysRecovered)} days recovered`,
            `${n(r.daysRecovered)} × ${m(daily)} a day = ${m(r.absence)}`,
          ],
        },
      ]}
    />
  );
}

/* ── The business case pack (the gated extra) ─────────── */
const PACK_CONTENTS = [
  { Ico: Icon.Coins, h: "Net return and payback", p: "Your impact netted against platform and reward costs, with the return multiple and the month it pays back." },
  { Ico: Icon.Layers, h: "Three scenarios", p: "Conservative, expected and stretch, so finance can stress-test the lift." },
  { Ico: Icon.Calendar, h: "Three years, with ramp-up", p: "Impact building month by month to full run-rate." },
  { Ico: Icon.Target, h: `Your ${PILOT_DAYS}-day pilot plan`, p: "Sized to your team: seats, cost, and what the day-90 report should show." },
];

function Pack({
  inputs: i, r, locked, onChange,
}: { inputs: RoiInputs; r: RoiResult; locked: boolean; onChange?: (key: NumericKey, v: number) => void }) {
  const show = (s: string) => (locked ? masked(s) : s);
  const m = (v: number) => show(formatMoney(v, i.currency, { compact: true }));
  const full = (v: number) => show(formatMoney(v, i.currency));
  const proj = projection(r);
  const pilot = pilotPlan(i);

  return (
    <div className="roi-pack-body">
      <PackBlock Ico={Icon.Coins} title="Net return and payback">
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
            {COST_FIELDS.map((f) => <InputField key={f.key} def={f} inputs={i} onChange={onChange} />)}
          </div>
        )}
      </PackBlock>

      <PackBlock Ico={Icon.Layers} title="Three scenarios">
        <ScenarioCards
          show={show}
          items={scenarios(i).map((s) => ({
            key: s.key,
            label: s.label,
            net: m(s.result.net),
            multiple: s.result.multiple,
            note: s.key === "expected" ? "Your inputs" : `${s.factor}× the lift assumptions`,
          }))}
        />
      </PackBlock>

      <PackBlock Ico={Icon.Calendar} title="Three years, with ramp-up">
        <YearsChart proj={proj} currency={i.currency} locked={locked} />
      </PackBlock>

      <PackBlock Ico={Icon.Target} title={<>Your {PILOT_DAYS}-day pilot</>}>
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
          <PilotSteps
            steps={[
              { when: "Weeks 1–2", what: "Go live. Zero integrations needed to start." },
              { when: "Day 30", what: "Patterns emerge: who's being recognised, and what moved." },
              { when: "Day 90", what: "Your CFO report: the case for rolling out, or not." },
            ]}
          />
        </div>
      </PackBlock>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
function Calculator({ initialInputs, preUnlocked }: { initialInputs: RoiInputs; preUnlocked: boolean }) {
  const [inputs, setInputs] = useState<RoiInputs>(initialInputs);
  const engage = useEngaged("company");
  const { copied, copy } = useCopyLink("company");
  const { unlocked, delivery, sentTo, unlock } = useUnlock("company", preUnlocked);

  const r = computeRoi(inputs);

  const change = (next: RoiInputs) => {
    engage();
    setInputs(next);
  };
  const changeField = (key: NumericKey, v: number) => change({ ...inputs, [key]: v });
  const copyLink = () => copy(toSearchParams(inputs, { includeCosts: unlocked }).toString(), unlocked);
  const requestPack = (email: string) =>
    unlock(email, inputs, { headcount: inputs.headcount, currency: inputs.currency, net: Math.round(r.net) });

  return (
    <>
      <RoiHero
        model="company"
        title={<>What&apos;s it worth to your <span className="kw">P&amp;L</span>?</>}
        lede="The company-wide view. Four numbers from your HRIS, two minutes, and a model your CFO can check line by line: regretted exits avoided, productivity on the movable middle, and absence days recovered."
        wedge="No email to see your number. Every assumption is on the page, and yours to change."
      />

      <section className="roi-calc" id="calculator">
        <div className="container roi-print-head" aria-hidden>
          <strong>PraiseLoop · Company-wide ROI business case</strong>
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
                <InputField key={f.key} def={f} inputs={inputs} onChange={changeField} />
              ))}

              <details className="roi-assump">
                <summary>
                  <span>Adjust the assumptions</span>
                  <span className="roi-assump-count">{ASSUMPTION_FIELDS.length}</span>
                  <Icon.Chevron className="ico roi-assump-chev" />
                </summary>
                <p className="roi-assump-intro">Our defaults sit deliberately below the published research. Tune them to your own data.</p>
                {ASSUMPTION_FIELDS.map((f) => (
                  <InputField key={f.key} def={f} inputs={inputs} onChange={changeField} />
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
        model="company"
        unlocked={unlocked}
        delivery={delivery}
        sentTo={sentTo}
        onUnlock={requestPack}
        onCopy={copyLink}
        copied={copied}
        contents={PACK_CONTENTS}
        lockSub="Net return, scenarios, three years and a pilot plan"
        renderPack={(locked) => <Pack inputs={inputs} r={r} locked={locked} onChange={locked ? undefined : changeField} />}
      />
    </>
  );
}

export default function CompanyRoiCalculator() {
  const { search, params, preUnlocked } = useRoiUrlState();
  const initialInputs = fromSearchParams(params) ?? defaultInputs();

  return (
    <RoiPage
      cta={{
        title: <>Prove it on one team in <span className="kw">90 days</span>.</>,
        sub: "The calculator models it. A pilot measures it. Two weeks to go live, 90 days to your CFO report, and if the numbers don't move, you walk.",
      }}
    >
      <Calculator key={search} initialInputs={initialInputs} preUnlocked={preUnlocked} />
    </RoiPage>
  );
}
