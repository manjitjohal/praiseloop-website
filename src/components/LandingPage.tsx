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

const ENGINE_NAME = "Outcome Engine";
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
          <h1>
            Reward <span className="em">outcomes</span>,<br />
            not effort.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            PraiseLoop spots when good people start to slip — and helps managers turn it around at the right moment. The AI drafts the recognition, your systems trigger the reward, and you see the payback on your own data.
          </p>
          <div className="hero-cta">
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow">
              Book a demo <Icon.Arrow />
            </a>
            <a href="#how" className="btn btn-secondary">See how it works</a>
          </div>
          <div className="hero-meta">
            <span><span className="check"><Icon.Check /></span> Ten seconds to say thank you</span>
            <span><span className="check"><Icon.Check /></span> Rewards fire from real results</span>
            <span><span className="check"><Icon.Check /></span> Live in two weeks</span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="dashboard-glow" />
          <div className="hero-stack">
            <div className="deputy-card">
              <div className="dc-head">
                <span className="dc-bot"><Icon.Spark /></span>
                <span className="dc-title">{DEPUTY_NAME} · recommendation</span>
                <span className="dc-badge">Suggest-only</span>
              </div>
              <div className="dc-msg">Sarah just closed a <strong>$48K deal</strong></div>
              <div className="dc-sub">Draft ready in your voice — the whole team sees it.</div>
              <div className="dc-draft">
                <span className="dc-draft-label">Draft · edit before sending</span>
                &ldquo;Sarah, that close was three months of patient work paying off. Textbook. The team should know.&rdquo;
              </div>
              <div className="dc-actions">
                <span className="dc-approve"><Icon.Check /> Approve reward</span>
                <span className="dc-ghost">Edit</span>
                <span className="dc-ghost">Later</span>
              </div>
            </div>
            <div className="mini-score">
              <div className="ms-head">
                <span>Recognition impact · 90 days</span>
                <span className="illus-chip on-dark">Illustrative</span>
              </div>
              <div className="ms-grid">
                <div><span className="k">Deals</span><span className="v">+25%</span></div>
                <div><span className="k">Retention</span><span className="v">+17%</span></div>
                <div><span className="k">Revenue</span><span className="v rev">$127K</span></div>
                <div><span className="k">Coverage</span><span className="v">84%</span></div>
              </div>
            </div>
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
        <span className="eyebrow no-dot">Zero integrations required on day one — connect your CRM, help desk, and HRIS when you&apos;re ready</span>
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
          <h2>Managers know recognition matters. They simply don&apos;t have time to do it consistently.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            That&apos;s the <strong>manager execution gap</strong> — and left alone, it quietly compounds:
          </p>
        </div>
        <div className="gap-photo">
          <Image src="/team-recognition.webp" alt="A team applauding a colleague during a morning stand-up" width={1024} height={768} />
        </div>
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

const MockDeputyQueue = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-dot orange"></span>
      <span className="mock-title">{DEPUTY_NAME} · manager queue</span>
      <span className="mock-badge active">2 pending</span>
    </div>
    <div className="mock-body">
      <div className="dep-card">
        <div className="dep-top"><span className="dep-type">Recognition nudge</span><span className="dep-pri">Priority 9</span></div>
        <p className="dep-title"><strong>Ravi</strong> closed two deals last week — and hasn&apos;t been recognised in <strong>32 days</strong>.</p>
        <div className="dep-user">
          <span className="dep-av">RK</span>
          <div><strong>Ravi Kumar</strong><span>Sales Engineer</span></div>
        </div>
        <div className="dep-draft">
          <span className="dc-draft-label">Draft · in your voice</span>
          &ldquo;Ravi, those two closes carried the week — quietly, like always. The team should know. Great work.&rdquo;
        </div>
        <div className="dep-chips">
          <span className="feed-tag value">Teamwork</span>
          <span className="feed-coins">+250 coins</span>
        </div>
        <div className="dep-approve"><Icon.Check /> Approve &amp; send</div>
        <div className="dep-secondary"><span>Edit</span><span>Maybe later</span><span>Why?</span></div>
      </div>
      <div className="dep-card compact">
        <div className="dep-top"><span className="dep-type teal">Silent hero</span><span className="dep-pri">Priority 7</span></div>
        <p className="dep-title"><strong>Deepa Patel</strong> — 34 days unrecognised; quietly closed 11 critical tickets this sprint.</p>
        <div className="dep-chips"><span className="feed-tag endorsed">Draft ready</span><span className="feed-coins">+120 coins</span></div>
      </div>
    </div>
  </div>
);

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

const MockRuleBuilder = () => (
  <div className="mock-ui dark-mock">
    <div className="mock-header">
      <span className="mock-dot orange"></span>
      <span className="mock-title">Rule builder</span>
      <span className="mock-badge active">Active</span>
    </div>
    <div className="mock-body">
      <div className="rule-card"><div className="rule-label">WHEN</div><div className="rule-row"><span className="rule-pill source">Salesforce</span><span className="rule-text">Deal closed &middot; value &ge; $50K</span></div></div>
      <div className="rule-arrow"><Icon.Bolt style={{ color: "var(--orange)" }} /></div>
      <div className="rule-card"><div className="rule-label">THEN</div><div className="rule-row"><span className="rule-pill reward">+500 coins</span><span className="rule-text">to deal owner + team</span></div>
        <div className="rule-conditions">
          <span className="rule-condition"><Icon.Check /> Budget cap: $2K/quarter</span>
          <span className="rule-condition"><Icon.Check /> Manager approval &gt; $500</span>
          <span className="rule-condition"><Icon.Check /> Auto-notify via Slack</span>
        </div>
      </div>
      <div className="rule-divider"></div>
      <div className="rule-card"><div className="rule-label">WHEN</div><div className="rule-row"><span className="rule-pill source jira">Zendesk</span><span className="rule-text">CSAT 5/5 &middot; critical ticket &lt; 1 hour</span></div></div>
      <div className="rule-arrow"><Icon.Bolt style={{ color: "var(--orange)" }} /></div>
      <div className="rule-card"><div className="rule-label">THEN</div><div className="rule-row"><span className="rule-pill reward">+120 coins</span><span className="rule-text">to assignee</span></div></div>
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

/* ── How It Works — the loop + deep dives ─────────────────── */
const HowItWorks = () => (
  <section id="how">
    <div className="container">
      <div className="how-split">
        <div>
          <h2>Your systems in. Measured outcomes back out.</h2>
          <p className="lede" style={{ marginTop: 18 }}>One closed loop: the AI watches the outcomes you already track, prompts the people who can act on them, and measures the result back in.</p>
          <a href={BOOKING_URL} className="btn btn-secondary btn-arrow" style={{ marginTop: 28 }}>See it live <Icon.Arrow /></a>
        </div>
        <div className="flow-steps">
          <div className="flow-step"><span className="n">1</span><div><h4>Connect your HRIS</h4><p>Plug into your HRIS, CRM, and help desk — or start with none at all.</p></div></div>
          <div className="flow-step"><span className="n">2</span><div><h4>The AI detects achievements</h4><p>It watches verified outcome events and finds the moment to act.</p></div></div>
          <div className="flow-step"><span className="n">3</span><div><h4>Recognition is sent</h4><p>The manager approves the ready draft — the reward lands instantly.</p></div></div>
          <div className="flow-step"><span className="n">4</span><div><h4>Engagement improves</h4><p>Measured on your data — recognised vs unrecognised, same rule, same period.</p></div></div>
          <div className="flow-loop"><Icon.Loop /> Every result feeds the next nudge</div>
        </div>
      </div>

      <div className="alt-block reverse featured-block" id="deputy" style={{ marginTop: 56 }}>
        <div className="alt-text">
          <span className="alt-badge">The differentiator</span>
          <span className="alt-num">01 · The manager side</span>
          <h3>Automate the prompt. Never the recognition.</h3>
          <p>The {DEPUTY_NAME} surfaces the moment — &ldquo;Ravi closed two deals last week and hasn&apos;t been recognised in 32 days&rdquo; — then drafts the note in the manager&apos;s voice. They edit, approve, done in ten seconds. Auto-sending praise backfires; the human click is the feature.</p>
          <div className="deputy-trust">
            <Icon.Shield />
            <span>The deputy reads <b>outcome events from your systems of record</b>. It never relays what employees tell it in chat.</span>
          </div>
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow" style={{ marginTop: 24 }}>See it in action <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockDeputyQueue /></div>
      </div>

      <div className="alt-block">
        <div className="alt-text">
          <span className="alt-num">02 · The employee side</span>
          <h3>Culture is group behaviour, not a manager broadcast</h3>
          <p>If only managers post, employees disengage. The flywheel is peers recognising each other — the engagement comes from seeing others engage. And employees open the app because it shows them what they can earn next, not just what they earned before. That&apos;s why adoption doesn&apos;t decay.</p>
          <a href="#solutions" className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>Explore the platform <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockRecognitionFeed /></div>
      </div>

      <div className="alt-block reverse">
        <div className="alt-text">
          <span className="alt-num">03 · The {ENGINE_NAME}</span>
          <h3>Your CRM fires the reward. Nobody fills in a form.</h3>
          <p>An admin types the rule in plain English — &ldquo;when a rep closes a deal over $10K, award 500 coins&rdquo; — and the AI maps it to the webhook. A deal closes, the coins land instantly, the win posts to the feed. Every coin is outcome-linked currency, traceable to a real event — with budget caps and approvals built in.</p>
          <a href={BOOKING_URL} className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>See the rule builder <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockRuleBuilder /></div>
      </div>

      <div className="alt-block" id="proof">
        <div className="alt-text">
          <span className="alt-num">04 · The proof layer</span>
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
            <p className="lede" style={{ marginTop: 14 }}>Not a benchmark deck — a worked model on your pilot department: turnover you didn&apos;t pay to replace, plus the productivity lift on the movable middle, netted against what the platform cost.</p>
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
            <h3>AI recognition that runs itself</h3>
            <p>The {DEPUTY_NAME} watches your systems, drafts the note, and learns what moves each team. Managers stay in control — one click to send.</p>
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
            <p>A manager playbook that runs itself.</p>
            <span className="illus-chip">Illustrative</span>
          </div>
          <div className="bb-tile">
            <span className="lbl">CFO &amp; CEO</span>
            <div className="num">34&times; <small>return</small></div>
            <p>One number: the payback on recognition, from your own data.</p>
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
          <h2>Workforce realities the US-built platforms weren&apos;t designed for</h2>
          <p className="lede" style={{ marginTop: 18 }}>The GCC isn&apos;t a translation problem — it&apos;s a completely different operating context. PraiseLoop was built for it from day one.</p>
          <div className="gcc-points">
            <div className="gcc-point"><div className="ico"><Icon.Lang /></div><div><h4>Arabic-first, not translated</h4><p>Full right-to-left interface designed alongside English, with tone and peer dynamics tuned for the region.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Gift /></div><div><h4>Field Worker Mode</h4><p>English, Arabic, and Hindi. Offline-capable, with rewards field teams actually want — time off, phone credit, savings. The 80% of the workforce most platforms ignore.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Shield /></div><div><h4>Nationalisation tracking built in</h4><p>Emiratisation and Saudisation reporting out of the box — recognition data feeds the filing.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Globe /></div><div><h4>Your data stays in-region</h4><p>GCC-based hosting with full PDPL compliance. Your data never leaves the region unless you choose otherwise.</p></div></div>
          </div>
        </div>
        <div>
          <div className="gcc-art">
            <Image src="/gcc-skyline.svg" alt="Minimal illustration of a dhow sailing past a Gulf minaret skyline under an orange sun" width={2048} height={1152} unoptimized style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="country-grid">
            <div className="country"><span className="flag uae"></span><span className="name">United Arab Emirates</span><span className="meta">EMIRATISATION · AED · AR/EN</span></div>
            <div className="country"><span className="flag ksa"></span><span className="name">Saudi Arabia</span><span className="meta">SAUDISATION · SAR · AR/EN</span></div>
            <div className="country"><span className="flag qa"></span><span className="name">Qatar</span><span className="meta">QATARISATION · QAR · AR/EN</span></div>
            <div className="country"><span className="flag uk"></span><span className="name">United Kingdom</span><span className="meta">GBP · EN</span></div>
          </div>
          <div style={{ marginTop: 20, padding: 18, background: "#fff", border: "1px dashed var(--outline-variant)", borderRadius: "var(--r)", fontSize: 13, color: "var(--on-surface-variant)", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Icon.Pin style={{ flexShrink: 0, marginTop: 2, color: "var(--orange)" }}/>
            <span>Data hosting available in UAE (Dubai), KSA (Riyadh), Qatar (Doha), and Europe.</span>
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
        <p className="lede" style={{ margin: "18px auto 0" }}>Every plan includes peer recognition and real rewards. Pick the tier that fits your organisation.</p>
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
      <p className="footer-line">Reward <span className="em">outcomes</span>,<br />not effort.</p>
      <Image src="/praiseloop-logo-white.png" alt="PraiseLoop" width={121} height={48} style={{ height: 48, width: "auto", marginTop: 44 }} />
      <nav className="footer-links-row">
        <a href="#deputy">The {DEPUTY_NAME}</a>
        <a href="#how">{ENGINE_NAME}</a>
        <a href="#proof">Proof</a>
        <a href="#gcc">GCC</a>
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
