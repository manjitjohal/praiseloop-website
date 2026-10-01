"use client";

import { useState } from "react";
import {
  CURRENCIES,
  PILOT_DAYS,
  formatMoney,
  formatMultiple,
  formatNumber,
  projection,
  type Currency,
} from "@/lib/roi";
import {
  SALES_SOURCES,
  computeSales,
  defaultSalesInputs,
  salesFromSearchParams,
  salesPilotPlan,
  salesRangeFor,
  salesScenarios,
  salesToSearchParams,
  salesWithCurrency,
  type SalesInputs,
  type SalesKey,
  type SalesResult,
} from "@/lib/roi-sales";
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
const TEAM_FIELDS: FieldDef<SalesKey>[] = [
  { key: "revenue", label: "Annual company revenue", unit: "money", log: true, hint: "Total revenue over the last 12 months." },
  { key: "reps", label: "Sales reps", unit: "people", log: true, hint: "Quota-carrying reps. Leave out managers and support roles." },
];

const TARGET_FIELDS: FieldDef<SalesKey>[] = [
  { key: "belowTarget", label: "Reps below target", unit: "%", hint: "Share of reps who missed target over the last 12 months. RepVue puts it at 57% across software sales." },
  { key: "attainment", label: "Where reps below target land", unit: "%", hint: "Their average attainment, as a % of target. Your CRM or sales dashboard will have it." },
];

const LIFT_FIELD: FieldDef<SalesKey> = {
  key: "lift",
  label: "Performance lift for reps below target",
  unit: "%",
  hint: "Gallup finds the most engaged teams sell 18% more than the least engaged. We assume just over half of that, on reps below target only, and never past target.",
};

/** Margin and cost inputs live only in the unlocked business case: pricing stays off the public page. */
const PACK_FIELDS: FieldDef<SalesKey>[] = [
  { key: "grossMargin", label: "Gross margin", unit: "%", hint: "Turns added revenue into gross profit. Use your blended margin." },
  { key: "seatPrice", label: "PraiseLoop, per rep per month", unit: "money", hint: "Illustrative list price. Your quote depends on seats and modules." },
  { key: "rewardBudget", label: "Reward budget, per rep per year", unit: "money", hint: "Paid out only when a verified result lands. Set it to 0 if you're redirecting an existing incentive budget." },
];

function InputField({ def, inputs, onChange }: { def: FieldDef<SalesKey>; inputs: SalesInputs; onChange: (key: SalesKey, v: number) => void }) {
  return <Field def={def} value={inputs[def.key]} range={salesRangeFor(def.key, inputs.currency)} currency={inputs.currency} onChange={onChange} />;
}

const pct = (v: number) => `${formatNumber(v, 1)}%`;

/* ── Results (live, ungated) ──────────────────────────── */
function Results({
  inputs: i, r, unlocked, onCopy, copied,
}: { inputs: SalesInputs; r: SalesResult; unlocked: boolean; onCopy: () => void; copied: boolean }) {
  const m = (v: number) => formatMoney(v, i.currency, { compact: true });
  const closed = Math.min(100, r.gapClosed * 100);

  return (
    <aside className="roi-results" id="results">
      <div className="roi-results-head">
        <span className="roi-results-label">Added revenue a year</span>
        <span className="roi-chip">Modelled estimate</span>
      </div>
      <div className="roi-results-num" aria-live="polite">{m(r.addedRevenue)}</div>
      <p className="roi-results-sub">
        From lifting <b>{formatNumber(r.repsBelow, 1)} reps</b> below target from {pct(i.attainment)} to <b>{pct(r.newAttainment)}</b> of target.
        About <b>{m(r.addedPerRep)}</b> more from each.
      </p>

      <dl className="roi-kpis">
        <div><dt>Revenue per rep</dt><dd>{m(r.revenuePerRep)}</dd></div>
        <div><dt>A rep at target</dt><dd>{m(r.targetPerRep)}</dd></div>
        <div><dt>A rep below target</dt><dd>{m(r.belowRepRevenue)}</dd></div>
      </dl>

      <div className="roi-gap">
        <div className="roi-gap-top">
          <span className="roi-bar-label"><Icon.Gauge />Your gap to target</span>
          <span className="roi-bar-val">{m(r.gap)}</span>
        </div>
        <span
          className="roi-gap-track"
          role="img"
          aria-label={`${formatNumber(closed)}% of a ${formatMoney(r.gap, i.currency)} gap to target recovered`}
        >
          <span className="roi-gap-fill" style={{ width: `${Math.max(1.5, closed)}%` }} />
        </span>
        <div className="roi-gap-legend">
          <span><i className="dot is-fill" />{m(r.addedRevenue)} recovered ({formatNumber(closed)}%)</span>
          <span><i className="dot" />{m(Math.max(0, r.gap - r.addedRevenue))} still below target</span>
        </div>
      </div>

      <ResultsCta unlocked={unlocked} onCopy={onCopy} copied={copied} />
    </aside>
  );
}

/* ── The maths, in full (ungated) ─────────────────────── */
function Maths({ inputs: i, r, unlocked }: { inputs: SalesInputs; r: SalesResult; unlocked: boolean }) {
  const m = (v: number) => formatMoney(v, i.currency);
  const n = (v: number, d = 1) => formatNumber(v, d);

  return (
    <MathsSection
      lede="No black box. The added revenue above comes from these three calculations, using your inputs. Change an input and they update with it."
      unlocked={unlocked}
      teaser="The business case turns added revenue into gross profit at your margin, then nets it against the PraiseLoop platform and the rewards, which only pay out on verified results. Then it works out your return multiple and the month it pays back."
      sources={SALES_SOURCES}
      sourcesNote="The lift is deliberately set well below the research, and it's PraiseLoop's modelled estimate, not a measured result. A 90-day pilot, a full quarter of attainment, replaces it with your own numbers."
      cards={[
        {
          Ico: Icon.Users,
          title: "Revenue per rep",
          value: m(r.revenuePerRep),
          why: "Company revenue against the size of the team that sells it. The simplest read on sales productivity, and the baseline for everything below.",
          lines: [
            `${m(i.revenue)} ÷ ${n(i.reps, 0)} reps = ${m(r.revenuePerRep)} per rep`,
            `${n(i.reps, 0)} reps × ${100 - i.belowTarget}% = ${n(r.repsAtTarget)} at or above target`,
            `${n(i.reps, 0)} reps × ${i.belowTarget}% = ${n(r.repsBelow)} below target, at ${i.attainment}% of it`,
          ],
        },
        {
          Ico: Icon.Gauge,
          title: "Your gap to target",
          value: m(r.gap),
          why: "The revenue between where your reps below target land and target itself. The target line is implied from your revenue, counting each rep at target at 100% of it.",
          lines: [
            `${n(r.repsAtTarget)} + (${n(r.repsBelow)} × ${i.attainment}%) = ${n(r.repEquivalents)} reps' worth of on-target output`,
            `${m(i.revenue)} ÷ ${n(r.repEquivalents)} = ${m(r.targetPerRep)} a rep at target`,
            `${m(r.targetPerRep)} × ${i.attainment}% = ${m(r.belowRepRevenue)} a rep below target`,
            `${n(r.repsBelow)} × (${m(r.targetPerRep)} − ${m(r.belowRepRevenue)}) = ${m(r.gap)} gap`,
          ],
        },
        {
          Ico: Icon.Trending,
          title: "Lift on the reps below target",
          value: m(r.addedRevenue),
          why: "Recognition tied to real targets shows reps below target exactly what good looks like, and rewards every verified step towards it. Reps already at target aren't counted.",
          lines: [
            `${n(r.repsBelow)} reps × ${m(r.belowRepRevenue)} = ${m(r.belowRevenue)} from reps below target today`,
            r.capped
              ? `${i.lift}% lift, capped at target: ${n(r.repsBelow)} × ${m(r.targetPerRep - r.belowRepRevenue)} = ${m(r.addedRevenue)} added`
              : `${m(r.belowRevenue)} × ${i.lift}% lift = ${m(r.addedRevenue)} added revenue`,
            `${i.attainment}% → ${pct(r.newAttainment)} of target, closing ${formatNumber(r.gapClosed * 100)}% of the gap`,
          ],
        },
      ]}
    />
  );
}

/* ── The business case pack (the gated extra) ─────────── */
const PACK_CONTENTS = [
  { Ico: Icon.Coins, h: "Net return and payback", p: "Added revenue turned into gross profit, netted against platform and reward costs, with the return multiple and the month it pays back." },
  { Ico: Icon.Layers, h: "Three scenarios", p: "Conservative, expected and stretch, so finance can stress-test the lift." },
  { Ico: Icon.Calendar, h: "Three years, with ramp-up", p: "Impact building month by month to full run-rate." },
  { Ico: Icon.Target, h: `Your ${PILOT_DAYS}-day pilot plan`, p: "Sized to your sales team: reps, cost, and what the day-90 report should show." },
];

function Pack({
  inputs: i, r, locked, onChange,
}: { inputs: SalesInputs; r: SalesResult; locked: boolean; onChange?: (key: SalesKey, v: number) => void }) {
  const show = (s: string) => (locked ? masked(s) : s);
  const m = (v: number) => show(formatMoney(v, i.currency, { compact: true }));
  const full = (v: number) => show(formatMoney(v, i.currency));
  const proj = projection(r);
  const pilot = salesPilotPlan(i, PILOT_DAYS);

  return (
    <div className="roi-pack-body">
      <PackBlock Ico={Icon.Coins} title="Net return and payback">
        <div className="roi-net">
          <dl className="roi-net-rows">
            <div><dt>Added revenue<small>From the calculator above</small></dt><dd>{full(r.addedRevenue)}</dd></div>
            <div><dt>Gross profit on it<small>At a {show(String(i.grossMargin))}% gross margin</small></dt><dd>{full(r.gross)}</dd></div>
            <div className="cost">
              <dt>PraiseLoop platform<small>{show(formatNumber(i.reps))} reps × {show(formatMoney(i.seatPrice, i.currency))} × 12 months, illustrative list price</small></dt>
              <dd>−{full(r.platformCost)}</dd>
            </div>
            <div className="cost">
              <dt>Reward budget<small>{show(formatNumber(i.reps))} reps × {show(formatMoney(i.rewardBudget, i.currency))} a year, paid only on verified results</small></dt>
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
          <p className="roi-pack-note">At these inputs PraiseLoop doesn&apos;t pay for itself. A smaller reward budget, or a team with more reps below target, changes that.</p>
        )}
        {onChange && (
          <div className="roi-net-inputs roi-noprint">
            {PACK_FIELDS.map((f) => <InputField key={f.key} def={f} inputs={i} onChange={onChange} />)}
          </div>
        )}
      </PackBlock>

      <PackBlock Ico={Icon.Layers} title="Three scenarios">
        <ScenarioCards
          show={show}
          items={salesScenarios(i).map((s) => ({
            key: s.key,
            label: s.label,
            net: m(s.result.net),
            multiple: s.result.multiple,
            note: s.key === "expected" ? "Your inputs" : `${s.factor}× the lift, ${m(s.result.addedRevenue)} added revenue`,
          }))}
        />
      </PackBlock>

      <PackBlock Ico={Icon.Calendar} title="Three years, with ramp-up">
        <YearsChart proj={proj} currency={i.currency} locked={locked} />
      </PackBlock>

      <PackBlock Ico={Icon.Target} title={<>Your {PILOT_DAYS}-day pilot</>}>
        <div className="roi-pilot">
          <div className="roi-pilot-stats">
            <div><span className="k">Pilot team</span><span className="v">{show(formatNumber(pilot.reps))} reps</span></div>
            <div><span className="k">{PILOT_DAYS}-day cost</span><span className="v">{m(pilot.cost)}</span></div>
            <div><span className="k">Day-90 report should show</span><span className="v">{m(pilot.annualisedRevenue)}<small> / yr added</small></span></div>
          </div>
          <p className="roi-pilot-p">
            At your assumptions, a {show(formatNumber(pilot.reps))}-rep pilot points to about {m(pilot.annualisedRevenue)} added revenue a year, with
            its {show(formatNumber(pilot.repsBelow, 1))} reps below target moving from {show(pct(i.attainment))} to {show(pct(r.newAttainment))} of target.
            The day-90 report measures a full quarter of attainment against your baseline.
          </p>
          <PilotSteps
            steps={[
              { when: "Weeks 1–2", what: "Go live. Zero integrations needed to start." },
              { when: "Day 30", what: "Patterns emerge: which reps are moving, and what moved them." },
              { when: "Day 90", what: "Your CFO report: a quarter of attainment, and the case for rolling out, or not." },
            ]}
          />
        </div>
      </PackBlock>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
function Calculator({ initialInputs, preUnlocked }: { initialInputs: SalesInputs; preUnlocked: boolean }) {
  const [inputs, setInputs] = useState<SalesInputs>(initialInputs);
  const engage = useEngaged("sales");
  const { copied, copy } = useCopyLink("sales");
  const { unlocked, delivery, sentTo, unlock } = useUnlock("sales", preUnlocked);

  const r = computeSales(inputs);

  const change = (next: SalesInputs) => {
    engage();
    setInputs(next);
  };
  const changeField = (key: SalesKey, v: number) => change({ ...inputs, [key]: v });
  const copyLink = () => copy(salesToSearchParams(inputs, { includeCosts: unlocked }).toString(), unlocked);
  const requestPack = (email: string) =>
    unlock(email, inputs, {
      reps: inputs.reps,
      currency: inputs.currency,
      addedRevenue: Math.round(r.addedRevenue),
      net: Math.round(r.net),
    });

  return (
    <>
      <RoiHero
        model="sales"
        title={<>How much revenue is sitting below <span className="kw">target</span>?</>}
        lede="Your revenue, the size of your sales team, and how many reps are below target. Two minutes, and a model your CFO can check line by line: what lifting those reps towards target is worth."
        wedge="No email to see your number. Every assumption is on the page, and yours to change."
      />

      <section className="roi-calc" id="calculator">
        <div className="container roi-print-head" aria-hidden>
          <strong>PraiseLoop · Sales ROI business case</strong>
          <span>
            {formatMoney(inputs.revenue, inputs.currency)} revenue · {formatNumber(inputs.reps)} sales reps · {inputs.belowTarget}% below target at{" "}
            {inputs.attainment}% of it · {inputs.lift}% lift. Modelled estimate, not a guarantee.
          </span>
        </div>
        <div className="container roi-grid">
          <div className="roi-inputs roi-noprint">
            <div className="roi-card">
              <div className="roi-card-head">
                <h2>Your sales team</h2>
                <div className="roi-seg" role="group" aria-label="Currency">
                  {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={inputs.currency === c}
                      onClick={() => change(salesWithCurrency(inputs, c))}
                    >
                      {CURRENCIES[c].label}
                    </button>
                  ))}
                </div>
              </div>
              {TEAM_FIELDS.map((f) => (
                <InputField key={f.key} def={f} inputs={inputs} onChange={changeField} />
              ))}
              <div className="roi-derived" aria-live="polite">
                <span>Revenue per rep<small>Company revenue ÷ sales reps</small></span>
                <b>{formatMoney(r.revenuePerRep, inputs.currency, { compact: true })}</b>
              </div>
              {TARGET_FIELDS.map((f) => (
                <InputField key={f.key} def={f} inputs={inputs} onChange={changeField} />
              ))}

              <h3 className="roi-card-sub">The lift</h3>
              <InputField def={LIFT_FIELD} inputs={inputs} onChange={changeField} />

              <button type="button" className="roi-reset" onClick={() => change(defaultSalesInputs(inputs.currency))}>
                <Icon.Reset /> Reset to defaults
              </button>
            </div>

            <a href="#results" className="roi-dock" aria-label="See the result breakdown">
              <span className="roi-dock-label">Added revenue</span>
              <span className="roi-dock-num">{formatMoney(r.addedRevenue, inputs.currency, { compact: true })}</span>
            </a>
          </div>

          <Results inputs={inputs} r={r} unlocked={unlocked} onCopy={copyLink} copied={copied} />
        </div>
      </section>

      <Maths inputs={inputs} r={r} unlocked={unlocked} />

      <BusinessCase
        model="sales"
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

export default function SalesRoiCalculator() {
  const { search, params, preUnlocked } = useRoiUrlState();
  const initialInputs = salesFromSearchParams(params) ?? defaultSalesInputs();

  return (
    <RoiPage
      cta={{
        title: <>Prove it on one sales team in <span className="kw">90 days</span>.</>,
        sub: "The calculator models it. A pilot measures it: two weeks to go live, a full quarter of attainment by your CFO report, and if the numbers don't move, you walk.",
      }}
    >
      <Calculator key={search} initialInputs={initialInputs} preUnlocked={preUnlocked} />
    </RoiPage>
  );
}
