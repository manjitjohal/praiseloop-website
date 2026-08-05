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
          <a href="#how">Platform</a>
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
        <div className="cycle-step"><span className="ico"><Icon.Bell /></span><h4>Recognition is forgotten</h4><p>Great work goes unnoticed — or lands too late.</p></div>
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

const MockRecognitionFeed = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-dot green"></span>
      <span className="mock-title">Recognition feed</span>
      <span className="mock-badge">Live</span>
    </div>
    <div className="mock-body">
      <div className="feed-item">
        <span className="feed-avatar" style={{ background: "var(--orange-soft)" }}>JR</span>
        <div className="feed-content">
          <div className="feed-top"><strong>Jamie Rodriguez</strong> <span className="feed-time">2m ago</span></div>
          <p>Thanked <strong>Priya Sharma</strong> for <em>shipping the client dashboard under the wire</em></p>
          <div className="feed-tags"><span className="feed-tag">Collaboration</span><span className="feed-tag value">Customer-obsession</span></div>
        </div>
      </div>
      <div className="feed-item">
        <span className="feed-avatar" style={{ background: "var(--slate)" }}>MK</span>
        <div className="feed-content">
          <div className="feed-top"><strong>Manager endorsement</strong> <span className="feed-time">18m ago</span></div>
          <p>Marcus endorsed <strong>Aisha Khan</strong> &middot; <em>exceptional Q2 client retention</em></p>
          <div className="feed-tags"><span className="feed-tag endorsed">Endorsed</span><span className="feed-coins">+250 coins</span></div>
        </div>
      </div>
      <div className="feed-item">
        <span className="feed-avatar" style={{ background: "var(--navy)" }}>SC</span>
        <div className="feed-content">
          <div className="feed-top"><strong>Milestone reached</strong> <span className="feed-time">1h ago</span></div>
          <p>Sarah Chen &middot; 2-year anniversary</p>
          <div className="feed-tags"><span className="feed-tag milestone">Milestone</span><span className="feed-coins">+200 coins</span></div>
        </div>
      </div>
      <div className="feed-item">
        <span className="feed-avatar" style={{ background: "var(--sand)", color: "var(--navy)" }}>AB</span>
        <div className="feed-content">
          <div className="feed-top"><strong>Alex Bello</strong> <span className="feed-time">2h ago</span></div>
          <p>Peer kudos &middot; helped <em>resolve P1 incident in 42 minutes</em></p>
          <div className="feed-tags"><span className="feed-tag">Teamwork</span></div>
        </div>
      </div>
    </div>
  </div>
);

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

/* ── The Loop diagram — manager ⇄ AI Deputy ⇄ employee ─────── */
const LoopDiagram = () => (
  <div className="loop-diagram">
    <div className="ld-actors">
      <div className="ld-actor">
        <span className="ld-role">The manager</span>
        <span className="ld-desc">Approves and sends in one click. Always stays in control.</span>
      </div>
      <div className="ld-conn"><Icon.Arrow /></div>
      <div className="ld-actor agent">
        <span className="ld-badge">The {DEPUTY_NAME}</span>
        <span className="ld-role">Works between the two</span>
        <span className="ld-desc">Watches outcomes · drafts the recognition · fires the reward · measures the lift.</span>
      </div>
      <div className="ld-conn"><Icon.Arrow /></div>
      <div className="ld-actor">
        <span className="ld-role">The employee</span>
        <span className="ld-desc">Earns real rewards for real results — and knows exactly why.</span>
      </div>
    </div>
    <div className="ld-track">
      <div className="ld-stage"><span className="n">1</span><h4>Verified result</h4><p>A KPI lands in your CRM, HRIS or help desk.</p></div>
      <div className="ld-stage p-rec"><span className="n">2</span><h4>Recognition drafted</h4><p>The AI writes the note in the manager&apos;s voice.</p><span className="ld-pill rec">Recognition</span></div>
      <div className="ld-stage"><span className="n">3</span><h4>Manager approves</h4><p>One click — the human decision stays human.</p></div>
      <div className="ld-stage p-rew"><span className="n">4</span><h4>Reward fires</h4><p>Coins land automatically, tied to the result.</p><span className="ld-pill rew">Reward</span></div>
      <div className="ld-stage p-perf"><span className="n">5</span><h4>Performance measured</h4><p>You see what actually moved, on your own data.</p><span className="ld-pill perf">Performance</span></div>
    </div>
    <div className="ld-return"><Icon.Loop /> Every measured result feeds the next — the loop compounds</div>
  </div>
);

/* ── How It Works — the loop + deep dives ─────────────────── */
const HowItWorks = () => (
  <section id="how">
    <div className="container">
      <div className="section-head" style={{ maxWidth: 760, marginBottom: 36 }}>
        <span className="eyebrow">The loop</span>
        <h2>From a verified result to a real reward — one connected loop</h2>
        <p className="lede" style={{ marginTop: 16 }}>
          The AI watches the outcomes you already track, prompts the manager who can act, fires the reward, and measures what it moved — then feeds it back in. <span className="kw">Performance</span>, <span className="kw">recognition</span> and <span className="kw">reward</span>, working as one system.
        </p>
      </div>

      <LoopDiagram />

      <div className="alt-block reverse featured-block" id="deputy" style={{ marginTop: 56 }}>
        <div className="alt-text">
          <span className="alt-badge">The differentiator · the manager side</span>
          <h3>Automate the prompt. Never the recognition.</h3>
          <p>The {DEPUTY_NAME} surfaces the moment — &ldquo;Ravi closed two deals last week and hasn&apos;t been recognised in 32 days&rdquo; — then drafts the note in the manager&apos;s voice. They edit, approve, done in ten seconds. Auto-sending praise backfires; the human click is the feature.</p>
          <div className="deputy-trust">
            <Icon.Shield />
            <span>The deputy reads <b>outcome events from your systems of record</b>. It never relays what employees tell it in chat.</span>
          </div>
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow" style={{ marginTop: 24 }}>See it in action <Icon.Arrow /></a>
        </div>
        <div className="alt-visual">
          <div className="gap-photo">
            <Image src="/manager-moment.webp" alt="A manager genuinely recognising a team member in a one-to-one" width={1400} height={1050} />
          </div>
        </div>
      </div>

      <div className="alt-block">
        <div className="alt-text">
          <span className="alt-badge">The employee side</span>
          <h3>Reward the right behaviours, and <span className="kw">performance</span> compounds</h3>
          <p>Every recognised action is a signal. Repeated across a team, those behaviours become how your people operate — and the ones you reward are the ones you get more of. PraiseLoop ties them to the numbers leaders actually track: <span className="kw">performance</span> climbs, while regretted attrition, absenteeism and quiet disengagement fall. That&apos;s the case that reaches the C-suite.</p>
          <a href="#solutions" className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>See the outcomes <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockRecognitionFeed /></div>
      </div>

      <div className="alt-block reverse">
        <div className="alt-text">
          <span className="alt-badge">The {ENGINE_NAME}</span>
          <h3>Your CRM fires the <span className="kw">reward</span>. Nobody fills in a form.</h3>
          <p>Most tools make someone fill in a nomination form. PraiseLoop watches your systems instead. Write a rule in plain English — &ldquo;close a deal over $10K, award 500 coins&rdquo; — and when it happens, the reward lands on its own. Every coin ties back to a real result, with budget limits built in.</p>
          <a href={BOOKING_URL} className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>Watch a rule fire <Icon.Arrow /></a>
        </div>
        <div className="alt-visual">
          <div className="gap-photo">
            <Image src="/form-fatigue.webp" alt="A weary manager pinching his brow over a clipboard of nomination forms" width={1024} height={768} />
          </div>
        </div>
      </div>

      <div className="alt-block" id="proof">
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
      <div className="buyer-bento">
        <div className="bb-hero">
          <div className="bb-hero-copy">
            <h3>The <span className="kw">performance</span> loop that runs itself</h3>
            <p>The {DEPUTY_NAME} watches your systems, drafts the recognition, fires the reward, and learns what moves each team. Managers stay in control — one click to send.</p>
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow" style={{ alignSelf: "flex-start" }}>See it in action <Icon.Arrow /></a>
          </div>
          <div className="bb-art">
            <Image src="/recognition-moment.webp" alt="Two colleagues sharing a high-five over a desk in a bright office" width={768} height={1024} />
          </div>
        </div>
        <div className="bb-col">
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
      <Reframe />
      <HowItWorks />
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
