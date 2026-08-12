"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SalesforceLogo, HubSpotLogo, BambooHRLogo, HiBobLogo,
  TeamsLogo, SlackLogo, WorkdayLogo, SAPLogo, ADPLogo,
} from "./BrandLogos";

/* ── Icons ─────────────────────────────────────────────────── */
const Icon = {
  Arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7h9m0 0L7.5 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bolt: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor"/>
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 4h10v4a5 5 0 01-10 0V4zm0 2H4a3 3 0 003 3M17 6h3a3 3 0 01-3 3M9 13h6l-1 4h-4l-1-4zm0 4h6v3H9v-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Webhook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="6" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 9l-4 7M12 9l4 7M9 18h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="9" height="9" viewBox="0 0 14 14" fill="none">
      <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="10" height="10" viewBox="0 0 14 14" fill="none">
      <path d="M3.5 3.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Loop: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 11a8 8 0 10-2.3 6M20 4v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Eye: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Lang: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 5h12M9 3v2c0 5-3 9-6 10M5 9c0 3 4 6 8 7m6-9l-5 12m0 0l-1-3m1 3h4l-1-3m-3 0h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Gift: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9h18v4H3zM5 13v8h14v-8M12 9v12M8 9a3 3 0 010-6c2 0 4 3 4 6m0 0a3 3 0 110-6c-2 0-4 3-4 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Spark: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v6m0 6v6m-9-9h6m6 0h6M5.5 5.5l4 4m5 5l4 4m-13 0l4-4m5-5l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Pin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Lock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Cloud: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 18a4 4 0 01-.6-7.9A5.5 5.5 0 0117 8.6 4.2 4.2 0 0116.8 18H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bell: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 16v-6a6 6 0 0112 0v6l1.5 2.5h-15L6 16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M10 21a2.5 2.5 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Frown: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9 10v.01M15 10v.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M8.5 16.5a5 5 0 017 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Exit: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M14 4h6v16h-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M4 12h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const ENGINE_NAME = "Outcome Coin Engine";
const DEPUTY_NAME = "AI Deputy";
const BOOKING_URL = "/demo";


/* ── Nav ───────────────────────────────────────────────────── */
const Nav = () => (
  <header className="nav">
    <div className="container">
      <div className="nav-row">
        <a href="#" aria-label="PraiseLoop">
          <Image src="/praiseloop-logo.png" alt="PraiseLoop" width={101} height={40} style={{ height: 40, width: "auto" }} priority />
        </a>
        <nav className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#proof">Proof</a>
          <a href="#pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a href="https://app.praiseloop.com">Sign in</a>
        </nav>
        <div className="nav-cta">
          <a href={BOOKING_URL} className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>Book a demo</a>
        </div>
      </div>
    </div>
  </header>
);

/* ── Hero ──────────────────────────────────────────────────── */
const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow no-dot hero-kicker">
            AI-Powered <span className="kw">Performance</span> · <span className="kw">Recognition</span> · <span className="kw">Rewards</span>
          </span>
          <h1 style={{ marginTop: 18 }}>
            Rewards are <span className="em">earned</span>,<br />
            not given.
          </h1>
          <p className="lede" style={{ marginTop: 22 }}>
            PraiseLoop plugs into the systems where work is already measured. When a verified KPI result lands, <span className="kw">recognition</span> and <span className="kw">reward</span> fire automatically — and the AI shows managers who&apos;s driving <span className="kw">performance</span> and who needs support.
          </p>
          <p className="hero-wedge">If the result didn&apos;t happen, the reward doesn&apos;t exist.</p>
          <div className="hero-cta">
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow">
              Book a demo <Icon.Arrow />
            </a>
            <a href="#how" className="btn btn-secondary">See how the loop works</a>
          </div>
          <div className="hero-meta">
            <span><span className="check"><Icon.Check /></span> Rewards fire from verified results</span>
            <span><span className="check"><Icon.Check /></span> AI flags who&apos;s slipping, early</span>
            <span><span className="check"><Icon.Check /></span> Live in two weeks</span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="dashboard-glow" />
          <div className="hero-photo">
            <Image src="/team-recognition.webp" alt="A team celebrating a colleague's win together" width={1024} height={768} priority />
          </div>
          <div className="hero-fire">
            <span className="spark"><Icon.Spark /></span>
            +500 coins · deal closed
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Integrations ──────────────────────────────────────────── */
const integrations = [
  { name: "Workday", Logo: WorkdayLogo },
  { name: "SAP SuccessFactors", Logo: SAPLogo },
  { name: "ADP", Logo: ADPLogo },
  { name: "BambooHR", Logo: BambooHRLogo },
  { name: "HiBob", Logo: HiBobLogo },
  { name: "Salesforce", Logo: SalesforceLogo },
  { name: "HubSpot", Logo: HubSpotLogo },
  { name: "Microsoft Teams", Logo: TeamsLogo },
  { name: "Slack", Logo: SlackLogo },
];

const Integrations = () => (
  <section className="integrations-section">
    <div className="container">
      <div className="integrations-header">
        <p className="integrations-title">Zero integrations required to start</p>
        <p className="integrations-sub">Connect your CRM, help desk, and HRIS whenever you&apos;re ready.</p>
      </div>
      <div className="integration-grid">
        {integrations.map((l) => (
          <span key={l.name} className="int-logo">
            <l.Logo />
            {l.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ── The Reframe (manager execution gap) ──────────────────── */
const Reframe = () => (
  <section id="why" className="outcomes" style={{ paddingBlock: 88 }}>
    <div className="container">
      <div className="gap-split">
        <div>
          <h2>Recognition drives <span className="kw">performance</span>. Managers just don&apos;t have the time to do it consistently.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            That&apos;s the <strong>manager execution gap</strong> — and when great work goes unseen, <span className="kw">performance</span> and retention pay for it. Left alone, it quietly compounds:
          </p>
        </div>
        <div className="gap-photo">
          <Image src="/person-executive.jpg" alt="A manager heads-down at her desk, out of time to recognise her team" width={1024} height={683} />
        </div>
      </div>

      <div className="mini-head">
        <span className="eyebrow">The manager execution gap</span>
        <h3>How an unseen win turns into a resignation</h3>
        <p>No single step is dramatic. Strung together, they&apos;re why your best people leave.</p>
      </div>

      <div className="cycle">
        <div className="cycle-step"><span className="ico"><Icon.Spark /></span><h4>Managers want to recognise</h4><p>They know praise moves performance.</p></div>
        <div className="cycle-step"><span className="ico"><Icon.Clock /></span><h4>The day takes over</h4><p>Back-to-back meetings. The loudest problem wins.</p></div>
        <div className="cycle-step"><span className="ico"><Icon.Bell /></span><h4>The moment slips by</h4><p>Great work goes unnoticed — or the thank-you lands too late to matter.</p></div>
        <div className="cycle-step"><span className="ico"><Icon.Frown /></span><h4>People disengage</h4><p>They feel unseen. They stop going the extra mile.</p></div>
        <div className="cycle-step"><span className="ico"><Icon.Exit /></span><h4>Your best people leave</h4><p>Replacing them costs far more than keeping them.</p></div>
      </div>

      <div className="cycle-band">
        <span className="cycle-repeat"><Icon.Loop /> The cycle repeats</span>
        <div className="cycle-break">
          <span><strong>PraiseLoop breaks it.</strong> The AI spots the moment, drafts the note — the manager clicks send. Ten seconds.</span>
          <a href="#how" className="cycle-break-link">See how <Icon.Arrow /></a>
        </div>
      </div>

      <div className="stat-strip">
        <div className="ss-item">
          <div className="n">70%</div>
          <p>of how engaged a team feels comes down to one person: the manager</p>
          <span className="src">Gallup</span>
        </div>
        <div className="ss-item">
          <div className="n">4–8&times;</div>
          <p>more output from a top performer than an average one</p>
          <span className="src">McKinsey</span>
        </div>
        <div className="ss-item">
          <div className="n teal">21%</div>
          <p>higher profitability for teams with high engagement</p>
          <span className="src">Gallup</span>
        </div>
      </div>

    </div>
  </section>
);

/* ── Mock UIs ─────────────────────────────────────────────── */

const MockImpactPanel = () => (
  <div className="impact-panel">
    <div className="ip-head">
      <div className="ip-title">Recognition impact <span>· last 90 days</span></div>
      <span className="illus-chip on-dark">Illustrative · demo data</span>
    </div>
    <div className="ip-row"><div className="n">Deals closed</div><div className="ip-track"><i style={{ width: "83%" }}></i></div><div className="v">↗ +25%</div></div>
    <div className="ip-row"><div className="n">CSAT</div><div className="ip-track"><i style={{ width: "70%" }}></i></div><div className="v">↗ +20%</div></div>
    <div className="ip-row"><div className="n">Retention</div><div className="ip-track"><i style={{ width: "60%" }}></i></div><div className="v">↗ +17%</div></div>
    <div className="ip-row rev"><div className="n">Revenue influenced</div><div className="ip-track"><i style={{ width: "92%" }}></i></div><div className="v">↗ $127K</div></div>
    <div className="ip-row down"><div className="n">Pipeline nudge</div><div className="ip-track"><i style={{ width: "18%" }}></i></div><div className="v">−12%</div></div>
    <p className="ip-foot">Recognised vs unrecognised — same rule, same period. We surface the <b>no-lift</b> rule too, so you stop paying for it. That honesty is what makes the rest believable.</p>
  </div>
);

/* ── Mock: the AI Deputy at work (concrete agent visual) ───── */
const MockAgentChat = () => (
  <div className="mock-ui dark-mock agent-chat">
    <div className="mock-header">
      <span className="mock-dot orange"></span>
      <span className="mock-title">PraiseLoop · {DEPUTY_NAME}</span>
      <span className="mock-badge active">Working</span>
    </div>
    <div className="mock-body">
      <div className="ac-signal">
        <span className="ac-ico"><Icon.Bolt /></span>
        <div>
          <strong>Verified result · from your CRM</strong>
          <p>Ravi closed 2 deals last week — $68K new revenue.</p>
        </div>
      </div>
      <div className="ac-msg">
        <span className="ac-avatar"><Icon.Spark /></span>
        <div className="ac-bubble">
          Ravi hasn&apos;t been recognised in <b>32 days</b>. Want to send praise in your voice?
        </div>
      </div>
      <div className="ac-draft">
        <span className="ac-draft-label">Drafted for you</span>
        <p>&ldquo;Ravi — two closes in a week is exceptional. That $68K moves the whole quarter. Thank you.&rdquo;</p>
        <div className="ac-actions">
          <span className="ac-btn primary"><Icon.Check /> Approve &amp; send</span>
          <span className="ac-btn ghost">Edit</span>
        </div>
      </div>
      <div className="ac-fire"><Icon.Bolt /> Reward fired · <b>+500 coins</b> · tied to the result</div>
    </div>
  </div>
);

/* ── The Loop — a true closed ring (manager → agent → employee → back) ── */
const LOOP_NODES = [
  { n: 1, title: "Verified result", desc: "A KPI lands in your CRM, HRIS or help desk.", pill: "Performance", cls: "perf", left: "50%", top: "15%" },
  { n: 2, title: "AI drafts recognition", desc: "In the manager’s voice — never auto-sent.", pill: "Recognition", cls: "rec", left: "83%", top: "39%" },
  { n: 3, title: "Manager approves", desc: "One click — the human stays in control.", pill: "Human", cls: "human", left: "71%", top: "78%" },
  { n: 4, title: "Reward fires", desc: "Coins land automatically, tied to the result.", pill: "Reward", cls: "rew", left: "29%", top: "78%" },
  { n: 5, title: "Performance measured", desc: "You see what moved — it feeds the next loop.", pill: "Performance", cls: "perf", left: "17%", top: "39%" },
];

// Five arrowheads at the mid-points between nodes, tangent to the ring (clockwise).
const LOOP_ARROWS = [
  { x: 423.4, y: 130.1, r: 36 },
  { x: 499.7, y: 364.9, r: 108 },
  { x: 300, y: 510, r: 180 },
  { x: 100.3, y: 364.9, r: 252 },
  { x: 176.6, y: 130.1, r: 324 },
];

const LoopRing = () => (
  <div className="loop">
    <div className="loop-ring">
      <svg className="loop-track" viewBox="0 0 600 600" aria-hidden="true">
        <circle cx="300" cy="300" r="210" fill="none" stroke="var(--orange)" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        <g fill="var(--orange)">
          {LOOP_ARROWS.map((a, i) => (
            <path key={i} d="M-6 -6 L7 0 L-6 6 Z" transform={`translate(${a.x},${a.y}) rotate(${a.r})`} />
          ))}
        </g>
      </svg>
      <div className="loop-hub">
        <span className="loop-hub-badge">The {DEPUTY_NAME}</span>
        <strong>Works the loop</strong>
        <p>Between every manager &amp; employee — you stay in control.</p>
      </div>
      {LOOP_NODES.map((s) => (
        <div key={s.n} className={`loop-node ${s.cls}`} style={{ left: s.left, top: s.top }}>
          <span className="loop-n">{s.n}</span>
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
          <span className={`ld-pill ${s.cls}`}>{s.pill}</span>
        </div>
      ))}
    </div>
    <div className="loop-caption"><Icon.Loop /> One continuous loop — every measured result feeds the next.</div>
  </div>
);

/* ── Beat spot-visuals — coded product fragments, one unified style ── */
const PerformanceSpot = () => (
  <div className="spot">
    <div className="spot-head">
      <span className="spot-dot" style={{ background: "var(--teal)" }} />
      <span className="spot-label">Performance signal</span>
      <span className="spot-chip teal">+14% KPI</span>
    </div>
    <svg className="spot-spark" viewBox="0 0 320 96" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--teal)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M8 74 L58 66 L108 70 L158 52 L208 46 L258 32 L310 18 L310 96 L8 96 Z" fill="url(#sparkFill)" />
      <path d="M8 74 L58 66 L108 70 L158 52 L208 46 L258 32 L310 18" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="310" cy="18" r="5" fill="var(--orange)" stroke="#fff" strokeWidth="2" />
    </svg>
    <div className="spot-row">
      <span className="spot-av">RS</span>
      <div className="spot-row-t"><strong>Ravi Shah</strong><span>Silent hero — consistent, unseen</span></div>
      <span className="ld-pill perf">Flagged</span>
    </div>
  </div>
);

const RecognitionSpot = () => (
  <div className="spot">
    <div className="spot-head">
      <span className="spot-dot" style={{ background: "var(--orange)" }} />
      <span className="spot-label">Recognition · earned</span>
    </div>
    <div className="spot-event">
      <div className="spot-event-top">
        <strong>Deal closed</strong>
        <span className="spot-verified"><Icon.Check /> Verified · CRM</span>
      </div>
      <span className="spot-event-sub">$68K · Q3 renewal</span>
    </div>
    <span className="spot-link"><Icon.Arrow /></span>
    <div className="spot-outcome">
      <span className="spot-badge"><Icon.Trophy /></span>
      <div className="spot-outcome-t"><strong>Recognition drafted</strong><span>in the manager’s voice</span></div>
      <span className="feed-coins">+250</span>
    </div>
  </div>
);

const RewardSpot = () => (
  <div className="spot">
    <div className="spot-head">
      <span className="spot-dot" style={{ background: "var(--orange)" }} />
      <span className="spot-label">Reward rule</span>
    </div>
    <div className="spot-rule">
      <span className="spot-kw when">WHEN</span> deal value &gt; <b>$10K</b><br />
      <span className="spot-kw then">THEN</span> award <b>500 coins</b>
    </div>
    <span className="spot-link"><Icon.Arrow /></span>
    <div className="spot-outcome">
      <span className="spot-badge orange"><Icon.Bolt /></span>
      <div className="spot-outcome-t"><strong>Reward fired</strong><span>tied to the result · budget ok</span></div>
      <span className="feed-coins">+500</span>
    </div>
  </div>
);

/* ── The three beats: Performance → Recognition → Reward ───── */
const BEATS = [
  {
    id: "performance",
    eyebrow: "Step one · Performance",
    Visual: PerformanceSpot,
    heading: <>Turn underperformance into <span className="kw">high performance</span>.</>,
    body: "Most organisations know who is underperforming — not why. PraiseLoop reads the behaviours, engagement and KPIs you already track, spots who’s slipping early and surfaces the silent heroes nobody noticed. Managers get a real-time picture and the next best action — not a once-a-year review.",
  },
  {
    id: "recognition",
    eyebrow: "Step two · Recognition",
    Visual: RecognitionSpot,
    heading: <><span className="kw">Performance</span> earns recognition.</>,
    body: "Traditional tools reward effort, opinion, or whoever remembers to fill in the nomination form. PraiseLoop ties recognition to verified outcomes — a closed deal, a resolved incident, a hit KPI. Recognition becomes the result of performance, drafted in the manager’s voice and sent in one click.",
  },
  {
    id: "reward",
    eyebrow: "Step three · Reward",
    Visual: RewardSpot,
    heading: <>Recognise improvement. <span className="kw">Reward</span> excellence.</>,
    body: "Write a rule in plain English — “close a deal over $10K, award 500 coins” — and the reward fires on its own when the result lands, with budget limits built in. As people hit KPIs and improve, they unlock rewards and growth. Progress becomes visible, celebrated, and worth something.",
  },
];

const Beats = () => (
  <section id="platform" className="beats">
    <div className="container">
      <div className="section-head" style={{ maxWidth: 800 }}>
        <span className="eyebrow">One loop, in this order</span>
        <h2><span className="kw">Performance</span>, <span className="kw">recognition</span> and <span className="kw">reward</span> — one system, not three tools.</h2>
        <p className="lede" style={{ marginTop: 16 }}>Performance comes first. Recognition is what it earns. Reward is what makes it repeat. Here is each stage on its own — then the loop that connects them.</p>
      </div>
      <div className="beat-list">
        {BEATS.map((b, i) => (
          <div key={b.id} id={b.id} className={`beat alt-block${i % 2 ? " reverse" : ""}`}>
            <div className="alt-text">
              <span className="eyebrow">{b.eyebrow}</span>
              <h3>{b.heading}</h3>
              <p>{b.body}</p>
            </div>
            <div className="alt-visual"><b.Visual /></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Meet the AI Deputy — the agent gets its own section ───── */
const MeetTheAgent = () => (
  <section id="deputy" className="agent-section">
    <div className="container">
      <div className="agent-grid">
        <div className="agent-copy">
          <span className="alt-badge on-dark">The agent at the centre of the loop</span>
          <h2>Meet the {DEPUTY_NAME} — it works between every manager and employee.</h2>
          <p>It watches the outcomes you already track, spots the moment worth recognising, and drafts the note in the manager’s voice. The manager edits, approves and sends in ten seconds — then the reward fires and the {DEPUTY_NAME} measures what actually moved.</p>
          <ul className="agent-points">
            <li><span className="ap-ico"><Icon.Eye /></span><div><strong>Watches</strong> every verified result across CRM, HRIS and help desk.</div></li>
            <li><span className="ap-ico"><Icon.Spark /></span><div><strong>Drafts &amp; recommends</strong> recognition, coaching and the next best action.</div></li>
            <li><span className="ap-ico"><Icon.Bolt /></span><div><strong>Fires the reward</strong> and reports the ROI — on your own data.</div></li>
          </ul>
          <div className="deputy-trust">
            <Icon.Shield />
            <span>Suggest-only — a human always approves. The {DEPUTY_NAME} reads <b>outcome events from your systems of record</b>; it never relays what employees tell it in chat.</span>
          </div>
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow" style={{ marginTop: 26 }}>See the agent in action <Icon.Arrow /></a>
        </div>
        <div className="agent-visual"><MockAgentChat /></div>
      </div>
    </div>
  </section>
);

/* ── The Loop — the closed ring + the proof layer ─────────── */
const TheLoop = () => (
  <section id="how" className="loop-section">
    <div className="container">
      <div className="section-head" style={{ maxWidth: 740 }}>
        <span className="eyebrow">The loop</span>
        <h2>From a verified result to a real reward — and back again.</h2>
        <p className="lede" style={{ marginTop: 16 }}>
          This is what recognition tools don’t show: <span className="kw">performance</span>, <span className="kw">recognition</span> and <span className="kw">reward</span> aren’t separate steps. Each one feeds the next, and the {DEPUTY_NAME} keeps it turning.
        </p>
      </div>

      <LoopRing />

      <div className="alt-block reverse" id="proof" style={{ marginTop: 8 }}>
        <div className="alt-text">
          <span className="alt-badge">The proof layer</span>
          <h3>The one page no other vendor has</h3>
          <p>Same rule, same period, your data: whether recognised people actually performed better. We show the rules with no lift too — so you stop paying for them. Recognition spend stops being a cost line and becomes an investment you can defend.</p>
          <a href={BOOKING_URL} className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>See the proof <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockImpactPanel /></div>
      </div>
    </div>
  </section>
);

/* ── Day-90 CFO model ─────────────────────────────────────── */
const ROICalculator = () => {
  const [seats, setSeats] = useState(200);
  const [salary, setSalary] = useState(60000);
  const [exits, setExits] = useState(4);

  const exitsValue = Math.round(exits * 1.5 * salary);
  const productivity = Math.round(0.02 * seats * salary);
  const gross = exitsValue + productivity;
  const cost = seats * 6 * 12;
  const net = gross - cost;
  const multiple = Math.round(net / cost);

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <section id="roi" className="roi-section">
      <div className="container">
        <div className="roi-card">
          <div>
            <h2>The report your CFO gets at day 90</h2>
            <p className="lede" style={{ marginTop: 14 }}>Underperformance is why good people leave — and every exit is a hire you have to fund and wait out. Not a benchmark deck: a worked model on your pilot department — the turnover and re-hiring you didn&apos;t pay for, plus the <span className="kw">performance</span> lift on the movable middle, netted against what the platform cost.</p>
            <div className="roi-controls">
              <div className="roi-row">
                <label>Pilot seats</label>
                <input type="range" min={50} max={1000} step={25} value={seats} onChange={e => setSeats(+e.target.value)} />
                <span className="roi-val">{seats.toLocaleString()}</span>
              </div>
              <div className="roi-row">
                <label>Average salary</label>
                <input type="range" min={30000} max={150000} step={5000} value={salary} onChange={e => setSalary(+e.target.value)} />
                <span className="roi-val">{fmt(salary)}</span>
              </div>
              <div className="roi-row">
                <label>Exits avoided / yr</label>
                <input type="range" min={1} max={12} step={1} value={exits} onChange={e => setExits(+e.target.value)} />
                <span className="roi-val">{exits}</span>
              </div>
            </div>
          </div>
          <div className="roi-readout">
            <div className="roi-tile">
              <span className="lbl">Gross annual impact</span>
              <div className="big">{fmt(gross)}</div>
              <span className="foot">{exits} exits &times; 1.5&times; salary + 2% productivity lift</span>
            </div>
            <div className="roi-tile">
              <span className="lbl">Platform cost</span>
              <div className="big">{fmt(cost)}</div>
              <span className="foot">{seats} seats &times; $6 &times; 12 months</span>
            </div>
            <div className="roi-tile featured">
              <span className="lbl">Net impact · return</span>
              <div className="big highlight">{fmt(net)} · {multiple}&times;</div>
              <span className="foot">Illustrative — the pilot replaces every number with yours</span>
            </div>
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow roi-cta">Run it on your data <Icon.Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Customer Stories (illustrative, labelled) ────────────── */
const CustomerStories = () => (
  <section className="stories">
    <div className="container">
      <div className="section-head" style={{ maxWidth: 760, marginBottom: 40 }}>
        <h2>What a strong first year looks like</h2>
        <p className="lede" style={{ marginTop: 16 }}>
          Illustrative composites, modelled on published recognition research — told the way your own day-90 report will read. <span className="illus-chip">Illustrative</span>
        </p>
      </div>
      <div className="stories-grid">
        <div className="story-card">
          <div className="story-metric"><span className="big">-24%</span><span className="sub">voluntary turnover</span></div>
          <blockquote className="story-quote">
            &ldquo;We used to run recognition on gut feel. PraiseLoop showed us which teams were being completely overlooked — and within a quarter, voluntary turnover dropped measurably.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/heather.png" alt="" width={48} height={48} className="story-avatar" />
            <div>
              <strong>Head of People Operations</strong>
              <span>Mid-market technology company · illustrative</span>
            </div>
          </div>
        </div>
        <div className="story-card">
          <div className="story-metric"><span className="big">3.2&times;</span><span className="sub">budget ROI</span></div>
          <blockquote className="story-quote">
            &ldquo;The moment our CFO saw recognition spend tied to actual retention numbers, the budget conversation changed completely. It went from a cost line to an investment.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/john.png" alt="" width={48} height={48} className="story-avatar" />
            <div>
              <strong>VP of HR</strong>
              <span>Regional services organisation · illustrative</span>
            </div>
          </div>
        </div>
        <div className="story-card">
          <div className="story-metric"><span className="big">+41%</span><span className="sub">engagement score</span></div>
          <blockquote className="story-quote">
            &ldquo;Our field teams were invisible in the old system. Silent-hero detection flagged 12 consistent performers nobody was recognising. Engagement scores jumped the next quarter.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/joe.png" alt="" width={48} height={48} className="story-avatar" />
            <div>
              <strong>Regional HR Director</strong>
              <span>GCC operations company · illustrative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── One number per buyer — asymmetric bento ──────────────── */
const Buyers = () => (
  <section id="solutions" style={{ paddingBlock: 72 }}>
    <div className="container">
      <div className="section-head" style={{ maxWidth: 760, marginBottom: 40 }}>
        <h2>Every stakeholder gets the number they care about.</h2>
        <p className="lede" style={{ marginTop: 16 }}>Sales, HR, finance — the same loop, read three different ways. All from your own data, not a benchmark deck.</p>
      </div>
      <div className="buyer-tiles">
        <div className="bb-tile">
          <span className="lbl">Sales leaders</span>
          <div className="num">+25% <small>deals</small></div>
          <p>Which recognition moves real deals and quota — and which does nothing.</p>
          <span className="illus-chip">Illustrative</span>
        </div>
        <div className="bb-tile">
          <span className="lbl">HR leaders</span>
          <div className="num">+17% <small>retention</small></div>
          <p>Fewer regretted exits — and fewer of the hires you have to fund to replace them.</p>
          <span className="illus-chip">Illustrative</span>
        </div>
        <div className="bb-tile">
          <span className="lbl">CFO &amp; CEO</span>
          <div className="num">34&times; <small>return</small></div>
          <p>One number: the payback on <span className="kw">performance</span>, from your own data.</p>
          <span className="illus-chip">Illustrative</span>
        </div>
      </div>
    </div>
  </section>
);

/* ── Trust Rail (compact) ─────────────────────────────────── */
const Trust = () => (
  <section id="trust" className="trust-rail">
    <div className="container">
      <span className="trust-label">Enterprise-grade from day one</span>
      <div className="trust-badges">
        <div className="trust-badge"><Icon.Spark /><span>Suggest-only AI — a human always approves</span></div>
        <div className="trust-badge"><Icon.Shield /><span>GDPR compliant</span></div>
        <div className="trust-badge"><Icon.Globe /><span>UAE PDPL ready</span></div>
        <div className="trust-badge"><Icon.Lock /><span>Encryption in transit &amp; at rest</span></div>
        <div className="trust-badge"><Icon.Webhook /><span>SSO &amp; audit logs</span></div>
        <div className="trust-badge"><Icon.Cloud /><span>Azure-hosted</span></div>
        <div className="trust-badge"><Icon.Pin /><span>Data residency</span></div>
      </div>
    </div>
  </section>
);

/* ── GCC ───────────────────────────────────────────────────── */
const GCC = () => (
  <section id="gcc" className="gcc">
    <div className="container">
      <div className="gcc-grid">
        <div>
          <h2>Built for a global, multilingual workforce</h2>
          <p className="lede" style={{ marginTop: 18 }}>Most recognition platforms are built US-first and English-only. PraiseLoop works across languages, regions and workforce types out of the box — with local compliance wherever you operate.</p>
          <div className="gcc-points">
            <div className="gcc-point"><div className="ico"><Icon.Lang /></div><div><h4>Any language, right-to-left included</h4><p>English, Arabic, Hindi and more — designed in alongside each other, not bolted on afterwards.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Gift /></div><div><h4>The frontline, included</h4><p>Field Worker Mode: offline-capable and multilingual, with rewards field teams actually want — time off, phone credit, savings. The majority of the workforce most platforms ignore.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Shield /></div><div><h4>Compliance wherever you operate</h4><p>GDPR and UAE PDPL ready — plus nationalisation reporting (Emiratisation, Saudisation) out of the box for the regions that need it.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Globe /></div><div><h4>Your data stays in-region</h4><p>Hosting in the UK, Europe and the GCC. Your data never leaves the region you choose.</p></div></div>
          </div>
        </div>
        <div>
          <div className="gcc-art">
            <Image src="/global-network.svg" alt="Minimal illustration of a connected world map linking teams across every continent" width={1820} height={1024} unoptimized style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="country-grid">
            <div className="country"><span className="flag uk"></span><span className="name">United Kingdom</span><span className="meta">GBP · EN</span></div>
            <div className="country"><span className="flag uae"></span><span className="name">United Arab Emirates</span><span className="meta">EMIRATISATION · AED · AR/EN</span></div>
            <div className="country"><span className="flag ksa"></span><span className="name">Saudi Arabia</span><span className="meta">SAUDISATION · SAR · AR/EN</span></div>
            <div className="country"><span className="flag qa"></span><span className="name">Qatar</span><span className="meta">QATARISATION · QAR · AR/EN</span></div>
          </div>
          <div style={{ marginTop: 20, padding: 18, background: "#fff", border: "1px dashed var(--outline-variant)", borderRadius: "var(--r)", fontSize: 13, color: "var(--on-surface-variant)", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Icon.Pin style={{ flexShrink: 0, marginTop: 2, color: "var(--orange)" }}/>
            <span>Data hosting in the UK, Europe, and the GCC — UAE (Dubai), KSA (Riyadh) and Qatar (Doha). More regions on request.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Pricing ──────────────────────────────────────────────── */
const Pricing = () => (
  <section id="pricing" style={{ paddingBlock: 72 }}>
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 44px" }}>
        <h2>Simple, transparent pricing</h2>
        <p className="lede" style={{ margin: "18px auto 0" }}>Every plan connects recognition and reward to real results. Pick the tier that fits your organisation.</p>
      </div>
      <div className="pricing-grid">
        <div className="pricing-card">
          <span className="pricing-tier">Starter</span>
          <p className="pricing-desc">For small teams building the recognition habit.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Peer recognition &amp; feed</li>
            <li><span className="check"><Icon.Check /></span>Rewards catalogue &amp; coins</li>
            <li><span className="check"><Icon.Check /></span>Slack &amp; Teams notifications</li>
            <li><span className="check"><Icon.Check /></span>Basic analytics dashboard</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Get started</a>
        </div>
        <div className="pricing-card featured">
          <span className="pricing-badge">Most popular</span>
          <span className="pricing-tier">Growth</span>
          <p className="pricing-desc">For organisations closing the manager execution gap.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Everything in Starter</li>
            <li><span className="check"><Icon.Check /></span>{DEPUTY_NAME} — suggest-only manager nudges</li>
            <li><span className="check"><Icon.Check /></span>{ENGINE_NAME} (unlimited integrations)</li>
            <li><span className="check"><Icon.Check /></span>Silent-hero detection</li>
            <li><span className="check"><Icon.Check /></span>Recognition impact dashboard</li>
            <li><span className="check"><Icon.Check /></span>Budget controls &amp; approvals</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Book a demo</a>
        </div>
        <div className="pricing-card">
          <span className="pricing-tier">Enterprise</span>
          <p className="pricing-desc">For large organisations with compliance, regional, and security requirements.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Everything in Growth</li>
            <li><span className="check"><Icon.Check /></span>Field Worker Mode (EN/AR/HI, offline)</li>
            <li><span className="check"><Icon.Check /></span>Nationalisation reporting</li>
            <li><span className="check"><Icon.Check /></span>Regional data residency</li>
            <li><span className="check"><Icon.Check /></span>SSO &amp; audit logging</li>
            <li><span className="check"><Icon.Check /></span>Dedicated success manager</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Contact sales</a>
        </div>
      </div>
    </div>
  </section>
);

/* ── Footer — Ft5 statement close ─────────────────────────── */
const FooterSection = () => (
  <footer>
    <div className="container footer-statement">
      <p className="footer-line">Rewards are <span className="em">earned</span>,<br />not given.</p>
      <Image src="/praiseloop-logo-white.png" alt="PraiseLoop" width={121} height={48} style={{ height: 48, width: "auto", marginTop: 44 }} />
      <nav className="footer-links-row">
        <a href="#deputy">The {DEPUTY_NAME}</a>
        <a href="#how">{ENGINE_NAME}</a>
        <a href="#proof">Proof</a>
        <a href="#gcc">Global reach</a>
        <a href="#pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="#trust">Security</a>
        <a href={BOOKING_URL}>Contact</a>
      </nav>
      <div className="footer-meta">
        <span>&copy; 2026 PraiseLoop</span>
        <span>Dubai &middot; Riyadh &middot; London</span>
        <span>hello@praiseloop.com</span>
      </div>
    </div>
  </footer>
);

/* ── App ───────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Integrations />
      <Beats />
      <Reframe />
      <MeetTheAgent />
      <TheLoop />
      <ROICalculator />
      <CustomerStories />
      <Buyers />
      <Trust />
      <GCC />
      <Pricing />
      <FooterSection />
    </>
  );
}
