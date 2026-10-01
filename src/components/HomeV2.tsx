import Image from "next/image";
import Link from "next/link";
import "../app/home-v2.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CountUp from "./site/CountUp";
import { Icon } from "./site/icons";
import {
  BOOKING_URL,
  PLAYBOOK_URL,
  STATS,
  CtaBand,
  FinalCta,
  NotList,
  PageHero,
  PillarGrid,
  StatBand,
} from "./site/blocks";

/* ── 4 · How it works (coded five-step flow) ──────────── */
const SigArrow = () => <span className="sig-arrow"><Icon.Arrow /></span>;

const SigChart = () => (
  <svg className="sig-chart" viewBox="0 0 200 68" aria-hidden>
    <defs>
      <linearGradient id="sigTrend" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1B6B6B" stopOpacity="0.14" />
        <stop offset="1" stopColor="#1B6B6B" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M8 52 L40 46 L72 49 L104 36 L136 39 L168 24 L192 12 L192 68 L8 68 Z" fill="url(#sigTrend)" />
    <path d="M8 52 L40 46 L72 49 L104 36 L136 39 L168 24 L192 12" fill="none" stroke="#1B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {[[40, 46], [104, 36], [168, 24]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#1B6B6B" />
    ))}
    <circle cx="192" cy="12" r="3.5" fill="#F26522" stroke="#fff" strokeWidth="1.5" />
  </svg>
);

const Flow = () => (
  <section id="how" className="flow">
    <div className="container">
      <div className="section-head center">
        <span className="eyebrow">See the loop</span>
        <h2>How it works, step by step.</h2>
        <p className="lede">From a result landing in your CRM to a reward in the rep&apos;s account.</p>
        <span className="example-chip">Example data</span>
      </div>

      <div className="sig">
        <div className="sig-row">
          {/* 1 · Connect */}
          <div className="sig-card">
            <span className="sig-num">1</span>
            <span className="sig-ic"><Icon.Database /></span>
            <h4>Connect</h4>
            <span className="sig-sub">Your CRM is the input</span>
            <div className="sig-panel">
              <span className="sig-panel-h">CRM</span>
              <div className="sig-list">
                <div className="sig-li"><span className="i"><Icon.Bars /></span>HubSpot<span className="ok"><Icon.Check /></span></div>
                <div className="sig-li"><span className="i"><Icon.Bars /></span>Salesforce<span className="ok"><Icon.Check /></span></div>
                <div className="sig-li muted"><span className="i"><Icon.Plus /></span>More on request</div>
              </div>
            </div>
          </div>

          <SigArrow />

          {/* 2 · Uncover */}
          <div className="sig-card">
            <span className="sig-num">2</span>
            <span className="sig-ic"><Icon.Search /></span>
            <h4>Uncover</h4>
            <span className="sig-sub">See what changed</span>
            <div className="sig-panel">
              <span className="sig-panel-h">This week</span>
              <SigChart />
              <div className="sig-insight up"><span className="d"><Icon.ArrowUp /></span>Meetings booked up 20% this week</div>
              <div className="sig-insight warn"><span className="d"><Icon.Alert /></span>Deals stalled at proposal</div>
            </div>
            <span className="sig-foot teal">Detected by Praise AI</span>
          </div>

          <SigArrow />

          {/* 3 · Coach */}
          <div className="sig-card">
            <span className="sig-num">3</span>
            <span className="sig-ic"><Icon.Message /></span>
            <h4>Coach</h4>
            <span className="sig-sub">Turn insight into action</span>
            <div className="sig-panel warn-panel">
              <span className="sig-tag-orange">Coaching moment</span>
              <p className="sig-p">Sam&apos;s meetings-to-opportunity rate is up 11% this month.</p>
              <span className="sig-tag-teal">Suggested 1:1 prompt</span>
              <p className="sig-quote">&ldquo;What&apos;s changed in your approach recently?&rdquo;</p>
              <span className="sig-btn">Discuss in 1:1 <Icon.Arrow /></span>
            </div>
          </div>

          <SigArrow />

          {/* 4 · Recognise */}
          <div className="sig-card">
            <span className="sig-num">4</span>
            <span className="sig-ic"><Icon.Sparkles /></span>
            <h4>Recognise</h4>
            <span className="sig-sub">Name the result</span>
            <div className="sig-panel">
              <div className="sig-recog-top">
                <Image className="sig-avatar" src="/heather.png" alt="" width={40} height={40} />
                <strong>Great work, Sam! 🎉</strong>
              </div>
              <div className="sig-points">+50 coins</div>
              <p className="sig-p">12 meetings booked this week, your best week this quarter.</p>
              <div className="sig-by">Recognised by Sarah (Manager)</div>
            </div>
          </div>

          <SigArrow />

          {/* 5 · Reward */}
          <div className="sig-card">
            <span className="sig-num">5</span>
            <span className="sig-ic"><Icon.Gift /></span>
            <h4>Reward</h4>
            <span className="sig-sub">Pay out on the result</span>
            <div className="sig-panel">
              <span className="sig-tag-teal">Reward issued</span>
              <div className="sig-coin-row"><span className="sig-coin">$</span><strong>+500 coins</strong></div>
              <p className="sig-p">Deal closed over $10K.</p>
              <span className="sig-redeem">Redeem in the rewards store <Icon.Arrow /></span>
            </div>
          </div>
        </div>

        <div className="sig-connectors">{[0, 1, 2, 3, 4].map((i) => <span key={i} />)}</div>

        <div className="sig-bar">
          <span className="sig-bar-ic"><Icon.Sparkles /></span>
          <strong>Praise AI</strong>
          <span className="sig-bar-div">|</span>
          <span className="sig-bar-sub">Powers the whole loop</span>
        </div>

        <div className="sig-legend">
          <span className="sig-leg"><Icon.Bars />CRM activity in</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Message />Better manager conversations</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Users />Better rep habits</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Trophy />Results that hit the CRM</span>
        </div>
      </div>
    </div>
  </section>
);

/* ── 5 · Who it's for ─────────────────────────────────── */
const PEOPLE = [
  { img: "/manager-moment.webp", role: "Sales managers", body: "Know who to talk to this week and what to say, without watching dashboards all day." },
  { img: "/recognition-moment.webp", role: "Reps", body: "A coach of your own, plus recognition and rewards tied to the numbers you actually hit." },
  { img: "/person-analytics.jpg", role: "Sales leaders", body: "Every manager coaching consistently, and incentive spend tied to results that actually happened." },
];

const People = () => (
  <section id="who" className="people">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Who it&apos;s for</span>
        <h2>Built for the whole sales team.</h2>
      </div>
      <div className="people-grid three">
        {PEOPLE.map((p) => (
          <div key={p.role} className="person">
            <div className="person-photo">
              <Image src={p.img} alt="" fill sizes="(max-width: 980px) 100vw, 30vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="person-body">
              <h4>{p.role}</h4>
              <p>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── 6 · Where PraiseLoop fits ────────────────────────── */
const STACK = [
  { k: "CRM", h: "The pipeline", p: "Deals, stages and activity" },
  { k: "Conversation intelligence", h: "The calls", p: "Recorded and reviewed" },
  { k: "Enablement", h: "The content", p: "Decks, playbooks, training" },
];

const Fit = () => (
  <section id="fit" className="fit">
    <div className="container fit-grid">
      <div className="fit-body">
        <span className="eyebrow">Where PraiseLoop fits</span>
        <h2>Your CRM tracks the deals. PraiseLoop coaches the <span className="kw">people</span>.</h2>
        <p>Most sales tools are built around the deal or the call. Your CRM shows the pipeline, conversation intelligence reviews calls, and enablement tools hold your content.</p>
        <p>PraiseLoop sits on top of the CRM and works with the people behind the numbers: what changed, what to do next, and recognising it when it works.</p>
        <p>It adds to the tools you already have rather than replacing them.</p>
      </div>
      <div className="stack" aria-label="PraiseLoop sits on top of your CRM, alongside conversation intelligence and enablement tools">
        <div className="stack-top">
          <span className="k">PraiseLoop</span>
          <strong>The people behind the numbers</strong>
          <span>What changed · what to do next · recognising it when it works</span>
        </div>
        <div className="stack-row">
          {STACK.map((s) => (
            <div key={s.k} className="stack-item">
              <span className="k">{s.k}</span>
              <strong>{s.h}</strong>
              <span>{s.p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── 7 · Integrations ─────────────────────────────────── */
const LIVE = ["HubSpot", "Salesforce"];
const ON_REQUEST = ["Slack", "Microsoft Teams", "Workday", "BambooHR", "HiBob", "ADP", "SAP SuccessFactors"];

const Integrations = () => (
  <div id="integrations" className="ints">
    <div className="container">
      <div className="ints-head">
        <p className="ints-title">Works with the tools you already run.</p>
      </div>
      <div className="ints-groups">
        <span className="ints-label">Live today</span>
        <div className="ints-chips">{LIVE.map((n) => <span key={n} className="int-chip live">{n}</span>)}</div>
        <span className="ints-label">Available on request</span>
        <div className="ints-chips">{ON_REQUEST.map((n) => <span key={n} className="int-chip req">{n}</span>)}</div>
      </div>
    </div>
  </div>
);

/* ── Page ─────────────────────────────────────────────── */
export default function HomeV2() {
  return (
    <div className="plh">
      <SiteHeader />
      <CountUp />

      {/* 1 · Hero */}
      <PageHero
        title={<>The <span className="kw">AI performance coach</span> for sales teams.</>}
        lede="PraiseLoop coaches every manager and rep from your CRM, then recognises and rewards the results automatically."
        actions={
          <>
            <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></Link>
            <Link href={PLAYBOOK_URL} className="btn btn-ghost">Get the sales coaching playbook</Link>
          </>
        }
        meta="Connects to HubSpot and Salesforce."
        media={
          <div className="hero-media">
            <div className="hero-glow" />
            <div className="hero-photo">
              <Image src="/hero-employees.jpg" alt="A sales team celebrating a colleague's win with a high five" fill sizes="(max-width: 960px) 100vw, 45vw" priority style={{ objectFit: "cover" }} />
            </div>
          </div>
        }
      />

      {/* 2 · Stats band */}
      <StatBand
        id="proof"
        eyebrow="Why it works"
        title={<>Coaching, recognition and reward each <span className="kw">move the number</span>.</>}
        lede="Most managers don't have time to do all three, every week. PraiseLoop does it for them, from your CRM."
        stats={[STATS.coach, STATS.recognise, STATS.reward, STATS.result]}
      />

      {/* 3 · Three pillars */}
      <PillarGrid
        id="loop"
        eyebrow="One loop"
        title={<>Coach. Recognise. <span className="kw">Reward</span>. One loop.</>}
        items={[
          {
            Ico: Icon.Message,
            h: "Coach",
            p: "Every manager and every rep gets an AI coach built on your CRM numbers. Managers see what changed this week and the conversation to have. Reps see their own progress, privately.",
          },
          {
            Ico: Icon.Sparkles,
            h: "Recognise",
            p: <>Recognition that names the result: &ldquo;12 meetings booked, your best week this quarter.&rdquo; People believe it because it&apos;s specific.</>,
          },
          {
            Ico: Icon.Gift,
            h: "Reward",
            p: "Rules built from the incentives you already pay. When the CRM records the result, coins land, redeemable for real rewards.",
          },
        ]}
        line="Coaching moves the numbers. Recognition and rewards lock in what worked."
      />

      {/* 4 · See the loop */}
      <Flow />

      {/* 5 · Who it's for */}
      <People />

      {/* 6 · Where PraiseLoop fits */}
      <Fit />

      {/* 7 · Integrations */}
      <Integrations />

      {/* 8 · What it isn't */}
      <NotList
        title={<>Coaching, not <span className="kw">surveillance</span>.</>}
        items={[
          { Ico: Icon.EyeOff, text: <><strong>Not a leaderboard</strong> that ranks your people.</> },
          { Ico: Icon.Receipt, text: <><strong>Not a replacement for your commission plan.</strong> It sits alongside it.</> },
          { Ico: Icon.MicOff, text: <><strong>No call recording needed.</strong> It works from the CRM activity you already have.</> },
        ]}
      />

      {/* 9 · Early access */}
      <CtaBand
        id="early-access"
        eyebrow="Early access"
        title="We're onboarding our first sales teams now."
        body="If you run a sales team of five or more, we'd like to set PraiseLoop up on your own KPIs and show you the loop working with your data."
        cta={{ label: "Talk to us about early access", href: BOOKING_URL }}
      />

      {/* 10 · Final CTA */}
      <FinalCta
        title={<>See the loop on your own <span className="kw">KPIs</span>.</>}
        sub="A 20-minute demo, using the numbers your team already tracks."
        secondary={{ label: "Get the sales coaching playbook", href: PLAYBOOK_URL }}
      />

      <SiteFooter />
    </div>
  );
}
