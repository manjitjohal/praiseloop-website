"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SalesforceLogo, HubSpotLogo, JiraLogo, BambooHRLogo,
  HiBobLogo, TeamsLogo, SlackLogo, GoogleWorkspaceLogo,
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
};

const ENGINE_NAME = "Outcome Engine";
const BOOKING_URL = "/demo";


/* ── Nav ───────────────────────────────────────────────────── */
const Nav = () => (
  <header className="nav">
    <div className="container nav-row">
      <a href="#" aria-label="PraiseLoop">
        <Image src="/praiseloop-logo.png" alt="PraiseLoop" width={200} height={52} style={{ height: 52, width: "auto" }} priority />
      </a>
      <nav className="nav-links">
        <a href="#how">Platform</a>
        <a href="#solutions">Solutions</a>
        <a href="#gcc">GCC</a>
        <a href="#pricing">Pricing</a>
        <a href="#outcomes">Why it matters</a>
        <a href="/blog">Blog</a>
      </nav>
      <div className="nav-cta">
        <a href="https://app.praiseloop.com" className="btn btn-secondary" style={{ padding: "10px 16px", fontSize: 14 }}>Sign in</a>
        <a href={BOOKING_URL} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Book a demo</a>
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
          <span className="eyebrow-badge">
            <span className="dot"></span>
            Performance-linked recognition
          </span>
          <h1 style={{ marginTop: 24 }}>
            You invest in recognition.<br />
            Can you <span className="em">prove</span> it&apos;s working?
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            PraiseLoop connects recognition to measurable outcomes — retention, engagement, and performance. When someone hits a target, resolves an issue, or completes a certification, the reward fires automatically. No forms. No delays. And for the first time, you can measure the impact.
          </p>
          <div className="hero-cta">
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow">
              Book a demo <Icon.Arrow />
            </a>
            <a href="#how" className="btn btn-secondary">See how it works</a>
          </div>
          <div className="hero-meta">
            <span><span className="check"><Icon.Check /></span> No credit card</span>
            <span><span className="check"><Icon.Check /></span> 30-min walkthrough</span>
            <span><span className="check"><Icon.Check /></span> Live platform demo</span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="dashboard-glow" />
          <div className="dashboard">
            <div className="dashboard-head">
              <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Image src="/Orange logo - transparent bg.png" alt="" width={28} height={28} style={{ height: 28, width: "auto" }} />
                <span style={{ color: "var(--outline)" }}>· live</span>
              </h4>
              <div className="dashboard-dots"><span></span><span></span><span></span></div>
            </div>
            <div className="dash-cards">
              <div className="dash-card">
                <div className="dash-icon"><Icon.Bolt /></div>
                <div>
                  <span className="label">Triggered today</span>
                  <div className="value"><span className="dash-counter">47</span><span className="unit">rewards</span></div>
                  <div className="sub">From 4 connected systems</div>
                </div>
                <span className="dash-tag">+12%</span>
              </div>
              <div className="dash-card featured">
                <div className="dash-avatar">RC</div>
                <div>
                  <span className="label">Recognition coverage</span>
                  <div className="value">84<span className="unit" style={{ color: "rgba(255,255,255,0.7)" }}>%</span></div>
                  <div className="sub">of employees recognised this quarter</div>
                </div>
                <span className="dash-tag">+9%</span>
              </div>
              <div className="dash-card">
                <div className="dash-icon"><Icon.Webhook /></div>
                <div>
                  <span className="label">Connected systems</span>
                  <div className="dash-systems" style={{ marginTop: 6 }}>
                    <span className="sys-pill"><span className="ping"></span>Salesforce</span>
                    <span className="sys-pill"><span className="ping"></span>Jira</span>
                    <span className="sys-pill"><span className="ping"></span>BambooHR</span>
                  </div>
                  <div className="sub" style={{ marginTop: 8 }}>All synced</div>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-icon"><Icon.Shield /></div>
                <div>
                  <span className="label">Pending approvals</span>
                  <div className="value"><span className="dash-counter">3</span><span className="unit">awaiting review</span></div>
                  <div className="sub">Avg response: 1.4 hrs</div>
                </div>
                <span className="dash-tag" style={{ background: "var(--soft-teal)", color: "var(--teal)" }}>On track</span>
              </div>
            </div>
          </div>
          <div className="hero-fire">
            <span className="spark"><Icon.Spark /></span>
            +500 coins · target hit
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── People Strip (social proof faces) ────────────────────── */
const PeopleStrip = () => (
  <section className="people-strip">
    <div className="container">
      <div className="people-row">
        <div className="people-faces">
          <Image src="/testimonial-1.png" alt="" width={44} height={44} className="people-face" />
          <Image src="/heather.png" alt="" width={44} height={44} className="people-face" />
          <Image src="/john.png" alt="" width={44} height={44} className="people-face" />
          <Image src="/joe.png" alt="" width={44} height={44} className="people-face" />
          <Image src="/person-executive.jpg" alt="" width={44} height={44} className="people-face" />
        </div>
        <span className="people-text">Trusted by People &amp; HR leaders across the GCC, UK, and Europe</span>
      </div>
    </div>
  </section>
);

/* ── Integrations ──────────────────────────────────────────── */
const integrations = [
  { name: "Salesforce", Logo: SalesforceLogo },
  { name: "HubSpot", Logo: HubSpotLogo },
  { name: "Jira", Logo: JiraLogo },
  { name: "BambooHR", Logo: BambooHRLogo },
  { name: "HiBob", Logo: HiBobLogo },
  { name: "Microsoft Teams", Logo: TeamsLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Google Workspace", Logo: GoogleWorkspaceLogo },
];

const Integrations = () => (
  <section className="integrations-section">
    <div className="container">
      <div className="integrations-header">
        <span className="eyebrow no-dot">Connects to the systems your work actually lives in</span>
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

/* ── Outcomes (ported from standalone — richer cards) ─────── */
const Outcomes = () => (
  <section id="outcomes" className="outcomes">
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
        <span className="eyebrow">Measurable impact</span>
        <h2 style={{ marginTop: 14 }}>Recognition that moves the numbers that matter</h2>
      </div>
      <div className="outcome-grid">
        <div className="outcome-card">
          <span className="num">01 / RETENTION</span>
          <h3>Keep your best people</h3>
          <p>Strategic recognition reduces voluntary turnover by connecting rewards to the outcomes that make people want to stay.</p>
          <div className="outcome-foot">
            <div className="outcome-stat"><span className="big">31%</span><span className="sub">Lower turnover</span></div>
            <span className="src">Bersin by Deloitte</span>
          </div>
        </div>
        <div className="outcome-card tone-sand">
          <span className="num">02 / COST</span>
          <h3>Cut replacement spend</h3>
          <p>Every departure costs months of productivity. Recognition is the cheapest lever to reduce that number.</p>
          <div className="outcome-foot">
            <div className="outcome-stat"><span className="big">$16K</span><span className="sub">Avg replacement cost</span></div>
            <span className="src">SHRM</span>
          </div>
        </div>
        <div className="outcome-card tone-teal">
          <span className="num">03 / PERFORMANCE</span>
          <h3>Unlock innovation</h3>
          <p>Recognised employees are dramatically more likely to go above and beyond — and their teams follow.</p>
          <div className="outcome-foot">
            <div className="outcome-stat"><span className="big">2.5&times;</span><span className="sub">Better innovation</span></div>
            <span className="src">SHRM / Globoforce</span>
          </div>
        </div>
        <div className="outcome-card tone-navy">
          <span className="num">04 / ENGAGEMENT</span>
          <h3>Reduce absenteeism</h3>
          <p>High-engagement cultures built on recognition see dramatically lower absence rates across the board.</p>
          <div className="outcome-foot">
            <div className="outcome-stat"><span className="big">41%</span><span className="sub">Less absenteeism</span></div>
            <span className="src">Gallup</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* Hero Product section removed — photos used in Customer Stories instead */

/* ── How It Works — Alternating Blocks ───────────────────── */

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
      <div className="rule-card"><div className="rule-label">WHEN</div><div className="rule-row"><span className="rule-pill source jira">Jira</span><span className="rule-text">Critical issue resolved &lt; 1 hour</span></div></div>
      <div className="rule-arrow"><Icon.Bolt style={{ color: "var(--orange)" }} /></div>
      <div className="rule-card"><div className="rule-label">THEN</div><div className="rule-row"><span className="rule-pill reward">+120 coins</span><span className="rule-text">to assignee</span></div></div>
    </div>
  </div>
);

/* Rich Analytics Board (ported from standalone) */
const MockAnalyticsBoard = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-dot green"></span>
      <span className="mock-title">Intelligence dashboard</span>
      <div className="ab-tabs">
        <span className="ab-tab active">Overview</span>
        <span className="ab-tab">Teams</span>
        <span className="ab-tab">Trends</span>
      </div>
      <span className="ab-range"><span className="ab-dot"></span>Q2 2026</span>
    </div>
    <div className="mock-body">
      <div className="ab-kpis">
        <div className="ab-kpi"><span className="lbl">Coverage</span><div className="big">84<span className="unit">%</span></div><span className="delta up">+9% vs Q1</span></div>
        <div className="ab-kpi"><span className="lbl">Silent heroes</span><div className="big risk">4</div><span className="delta down">Need attention</span></div>
        <div className="ab-kpi"><span className="lbl">Rewards sent</span><div className="big">1,247</div><span className="delta up">+22% vs Q1</span></div>
        <div className="ab-kpi"><span className="lbl">Budget used</span><div className="big">68<span className="unit">%</span></div><span className="delta up">On track</span></div>
      </div>
      <div className="ab-grid">
        <div className="ab-heat">
          <div className="ab-card-head"><h4>Recognition heatmap</h4><span>BY TEAM · 12 MONTHS</span></div>
          <div className="heat-table">
            {["Engineering", "Sales", "Operations", "Support"].map(team => (
              <div className="heat-row" key={team}>
                <span className="heat-label">{team}</span>
                <div className="heat-cells">
                  {Array.from({ length: 12 }, (_, i) => {
                    const intensity = team === "Sales" ? [3,3,4,4,5,5,5,4,5,5,5,5][i]
                      : team === "Engineering" ? [2,2,3,2,3,4,4,3,4,5,4,5][i]
                      : team === "Support" ? [1,1,2,2,1,2,3,2,3,3,4,3][i]
                      : [2,3,3,4,3,4,4,5,4,5,5,5][i];
                    const colors = ["var(--surface-container)", "var(--orange-tint)", "#ffd4b8", "#ffab7a", "var(--orange)"];
                    return <span key={i} className="heat-cell" style={{ background: colors[intensity - 1] }} />;
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="heat-legend"><span>Low</span>{[1,2,3,4,5].map(i => {const c = ["var(--surface-container)","var(--orange-tint)","#ffd4b8","#ffab7a","var(--orange)"]; return <span key={i} className="heat-cell" style={{background:c[i-1]}} />;})}<span>High</span></div>
        </div>
        <div className="ab-risk">
          <div className="ab-card-head"><h4>Silent hero alerts</h4><span>30+ DAYS UNRECOGNISED</span></div>
          <ul className="risk-list">
            <li><span className="av">DP</span><div><strong>Deepa Patel</strong><span className="sub">Engineering · 34 days</span></div><span className="risk-pill high">High</span></li>
            <li><span className="av b">TK</span><div><strong>Tom Kwon</strong><span className="sub">Operations · 31 days</span></div><span className="risk-pill high">High</span></li>
            <li><span className="av c">RH</span><div><strong>Rachel Hayes</strong><span className="sub">Support · 42 days</span></div><span className="risk-pill med">Medium</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorks = () => (
  <section id="how">
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
        <span className="eyebrow">How it works</span>
        <h2 style={{ marginTop: 14 }}>Three layers. One closed loop.</h2>
        <p className="lede" style={{ margin: "18px auto 0" }}>Recognise great work. Automatically reward results. Learn what drives your best people.</p>
      </div>

      <div className="alt-block">
        <div className="alt-text">
          <span className="alt-num">01</span>
          <h3>Capture every moment of great work</h3>
          <p>Peer shout-outs, manager endorsements, milestones, value badges — all in one place, without anyone filling in a form. Every recognition is tagged, timestamped, and tied to an employee profile.</p>
          <a href="#solutions" className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>Explore the platform <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockRecognitionFeed /></div>
      </div>

      <div className="alt-block reverse featured-block">
        <div className="alt-text">
          <span className="alt-badge">The differentiator</span>
          <span className="alt-num">02</span>
          <h3>Results trigger rewards — automatically</h3>
          <p>Someone closes a deal in Salesforce. Resolves a critical issue in Jira. Earns a certification. The {ENGINE_NAME} spots it and sends the reward instantly — with full budget controls and approval workflows built in.</p>
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow" style={{ marginTop: 24 }}>See it in action <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockRuleBuilder /></div>
      </div>

      <div className="alt-block">
        <div className="alt-text">
          <span className="alt-num">03</span>
          <h3>Every recognition becomes an insight</h3>
          <p>Over time, PraiseLoop builds a picture of what drives your best people. Silent Hero Detection surfaces consistent performers who haven&apos;t been recognised in 30+ days — before disengagement sets in.</p>
          <a href={BOOKING_URL} className="btn btn-secondary btn-arrow" style={{ marginTop: 24 }}>See the analytics <Icon.Arrow /></a>
        </div>
        <div className="alt-visual"><MockAnalyticsBoard /></div>
      </div>
    </div>
  </section>
);

/* ── ROI Calculator ──────────────────────────────────────── */
const ROICalculator = () => {
  const [employees, setEmployees] = useState(500);
  const [turnover, setTurnover] = useState(18);
  const [cost, setCost] = useState(16000);

  const departures = Math.round(employees * turnover / 100);
  const currentCost = departures * cost;
  const savedDepartures = Math.round(departures * 0.31);
  const savings = savedDepartures * cost;

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <section id="roi" className="roi-section">
      <div className="container">
        <div className="roi-card">
          <div>
            <span className="eyebrow">ROI calculator</span>
            <h2 style={{ marginTop: 14 }}>What is recognition costing you right now?</h2>
            <p className="lede" style={{ marginTop: 14 }}>Adjust the sliders to see what outcome-linked recognition could save your organisation.</p>
            <div className="roi-controls">
              <div className="roi-row">
                <label>Employees</label>
                <input type="range" min={50} max={5000} step={50} value={employees} onChange={e => setEmployees(+e.target.value)} />
                <span className="roi-val">{employees.toLocaleString()}</span>
              </div>
              <div className="roi-row">
                <label>Turnover rate</label>
                <input type="range" min={5} max={40} step={1} value={turnover} onChange={e => setTurnover(+e.target.value)} />
                <span className="roi-val">{turnover}%</span>
              </div>
              <div className="roi-row">
                <label>Replacement cost</label>
                <input type="range" min={5000} max={50000} step={1000} value={cost} onChange={e => setCost(+e.target.value)} />
                <span className="roi-val">{fmt(cost)}</span>
              </div>
            </div>
          </div>
          <div className="roi-readout">
            <div className="roi-tile">
              <span className="lbl">Annual turnover cost</span>
              <div className="big">{fmt(currentCost)}</div>
              <span className="foot">{departures} departures &times; {fmt(cost)} each</span>
            </div>
            <div className="roi-tile featured">
              <span className="lbl">Potential annual savings</span>
              <div className="big highlight">{fmt(savings)}</div>
              <span className="foot">{savedDepartures} fewer departures (31% reduction)</span>
            </div>
            <a href={BOOKING_URL} className="btn btn-primary btn-arrow roi-cta">See it with your data <Icon.Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Customer Stories ─────────────────────────────────────── */
const CustomerStories = () => (
  <section className="stories">
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
        <span className="eyebrow">What people are saying</span>
        <h2 style={{ marginTop: 14 }}>Real results from real teams</h2>
      </div>
      <div className="stories-grid">
        <div className="story-card">
          <div className="story-metric"><span className="big">-24%</span><span className="sub">voluntary turnover</span></div>
          <blockquote className="story-quote">
            &ldquo;We used to run recognition on gut feel. PraiseLoop showed us which teams were being completely overlooked — and within a quarter, voluntary turnover dropped measurably.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/heather.png" alt="Head of People Operations" width={48} height={48} className="story-avatar" />
            <div>
              <strong>Head of People Operations</strong>
              <span>Mid-market technology company</span>
            </div>
          </div>
        </div>
        <div className="story-card">
          <div className="story-metric"><span className="big">3.2&times;</span><span className="sub">budget ROI</span></div>
          <blockquote className="story-quote">
            &ldquo;The moment our CFO saw recognition spend tied to actual retention numbers, the budget conversation changed completely. It went from a cost line to an investment.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/john.png" alt="VP of HR" width={48} height={48} className="story-avatar" />
            <div>
              <strong>VP of HR</strong>
              <span>Regional services organisation</span>
            </div>
          </div>
        </div>
        <div className="story-card">
          <div className="story-metric"><span className="big">+41%</span><span className="sub">engagement score</span></div>
          <blockquote className="story-quote">
            &ldquo;Our field teams were invisible in the old system. PraiseLoop&apos;s Silent Hero Detection flagged 12 consistent performers nobody was recognising. Engagement scores jumped the next quarter.&rdquo;
          </blockquote>
          <div className="story-attr">
            <Image src="/joe.png" alt="Regional HR Director" width={48} height={48} className="story-avatar" />
            <div>
              <strong>Regional HR Director</strong>
              <span>GCC operations company</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Solutions / Use Cases ─────────────────────────────────── */
const Solutions = () => (
  <section id="solutions" style={{ paddingBlock: 96 }}>
    <div className="container">
      <div className="vp">
        <div className="vp-head">
          <span className="eyebrow">Built for every team</span>
          <h2>Your business systems already know who performed. PraiseLoop connects the dots.</h2>
          <p className="lede">Sales, engineering, operations, support — every team produces measurable results. PraiseLoop sees them all and rewards automatically.</p>
        </div>
        <div className="vp-cards" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="vp-card"><div className="ico"><Icon.Bolt /></div><h4>Sales</h4><p>Deal closes in your CRM? The reward lands before the manager sees the update. Pipeline wins, quota hits — all automated.</p></div>
          <div className="vp-card"><div className="ico"><Icon.Webhook /></div><h4>Engineering</h4><p>Critical issue resolved in 42 minutes? Sprint delivered early? PraiseLoop spots it in Jira and rewards the team instantly.</p></div>
          <div className="vp-card"><div className="ico"><Icon.Eye /></div><h4>People &amp; HR</h4><p>See which teams are being overlooked, track recognition coverage across the org, and prove the link between recognition and retention.</p></div>
          <div className="vp-card"><div className="ico"><Icon.Trophy /></div><h4>Operations</h4><p>Project milestones, certifications, anniversaries — any measurable outcome can trigger a reward with full budget controls.</p></div>
        </div>
        <div className="vp-cta"><a href={BOOKING_URL} className="btn btn-primary btn-arrow">Talk to sales <Icon.Arrow /></a></div>
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
        <div className="trust-badge"><Icon.Shield /><span>GDPR compliant</span></div>
        <div className="trust-badge"><Icon.Globe /><span>UAE PDPL ready</span></div>
        <div className="trust-badge"><Icon.Pin /><span>Data residency</span></div>
        <div className="trust-badge"><Icon.Webhook /><span>SSO &amp; audit logs</span></div>
      </div>
    </div>
  </section>
);

/* ── Pricing ──────────────────────────────────────────────── */
const Pricing = () => (
  <section id="pricing" style={{ paddingBlock: 96 }}>
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
        <span className="eyebrow">Pricing</span>
        <h2 style={{ marginTop: 14 }}>Simple, transparent pricing</h2>
        <p className="lede" style={{ margin: "18px auto 0" }}>Every plan includes the {ENGINE_NAME}, peer recognition, and manager tools. Pick the tier that fits your organisation.</p>
      </div>
      <div className="pricing-grid">
        <div className="pricing-card">
          <span className="pricing-tier">Starter</span>
          <p className="pricing-desc">For small teams getting started with outcome-linked recognition.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Peer recognition &amp; shout-outs</li>
            <li><span className="check"><Icon.Check /></span>{ENGINE_NAME} (1 integration)</li>
            <li><span className="check"><Icon.Check /></span>Basic analytics dashboard</li>
            <li><span className="check"><Icon.Check /></span>Slack &amp; Teams notifications</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Get started</a>
        </div>
        <div className="pricing-card featured">
          <span className="pricing-badge">Most popular</span>
          <span className="pricing-tier">Growth</span>
          <p className="pricing-desc">For organisations connecting recognition to business outcomes.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Everything in Starter</li>
            <li><span className="check"><Icon.Check /></span>{ENGINE_NAME} (unlimited integrations)</li>
            <li><span className="check"><Icon.Check /></span>Silent Hero Detection</li>
            <li><span className="check"><Icon.Check /></span>Manager nudges &amp; insights</li>
            <li><span className="check"><Icon.Check /></span>Budget controls &amp; approvals</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Book a demo</a>
        </div>
        <div className="pricing-card">
          <span className="pricing-tier">Enterprise</span>
          <p className="pricing-desc">For large organisations with compliance, regional, and security requirements.</p>
          <ul className="pricing-features">
            <li><span className="check"><Icon.Check /></span>Everything in Growth</li>
            <li><span className="check"><Icon.Check /></span>GDPR &amp; PDPL compliance</li>
            <li><span className="check"><Icon.Check /></span>Regional data residency</li>
            <li><span className="check"><Icon.Check /></span>SSO &amp; audit logging</li>
            <li><span className="check"><Icon.Check /></span>Nationalisation reporting</li>
            <li><span className="check"><Icon.Check /></span>Dedicated success manager</li>
          </ul>
          <a href={BOOKING_URL} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Contact sales</a>
        </div>
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
          <span className="eyebrow">Built for the GCC</span>
          <h2 style={{ marginTop: 14 }}>Workforce realities the US-built platforms weren&apos;t designed for</h2>
          <p className="lede" style={{ marginTop: 18 }}>The GCC isn&apos;t a translation problem — it&apos;s a completely different operating context. PraiseLoop was built for it from day one.</p>
          <div className="gcc-points">
            <div className="gcc-point"><div className="ico"><Icon.Shield /></div><div><h4>Nationalisation tracking built in</h4><p>Emiratisation, Nitaqat, and Qatarisation reporting out of the box — not bolted on later.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Lang /></div><div><h4>Built natively for the region</h4><p>Full right-to-left Arabic interface designed alongside English, support for field workers and distributed teams, and cultural norms built into the product.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Gift /></div><div><h4>Regional reward catalogues</h4><p>UAE, KSA, and Qatar gift cards, charity partners, and experiences employees actually want.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Globe /></div><div><h4>Your data stays in-region</h4><p>GCC-based hosting with full PDPL compliance. Your data never leaves the region unless you choose otherwise.</p></div></div>
          </div>
        </div>
        <div>
          <div className="country-grid">
            <div className="country"><span className="flag uae"></span><span className="name">United Arab Emirates</span><span className="meta">EMIRATISATION · AED · AR/EN</span></div>
            <div className="country"><span className="flag ksa"></span><span className="name">Saudi Arabia</span><span className="meta">NITAQAT · SAR · AR/EN</span></div>
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

/* ── CTA ───────────────────────────────────────────────────── */
const CTASection = () => (
  <section id="cta" className="cta-section">
    <div className="container">
      <div className="cta-card">
        <span className="eyebrow" style={{ color: "var(--orange)" }}>Demo</span>
        <h2 style={{ marginTop: 16 }}>See your engagement, see your ROI — with your data. In 30 minutes.</h2>
        <p className="lede">We&apos;ll show you the full platform live — from someone hitting a target to the reward landing in their account.</p>
        <div className="hero-cta">
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></a>
        </div>
      </div>
    </div>
  </section>
);

/* ── Footer ────────────────────────────────────────────────── */
const FooterSection = () => (
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/praiseloop-logo-white.png" alt="PraiseLoop" width={200} height={56} style={{ height: 56, width: "auto" }} />
          <p className="footer-tag" style={{ marginTop: 18 }}>Performance-linked recognition that proves its impact on retention, engagement, and performance.</p>
          <span className="footer-mantra">Reward outcomes, not effort.</span>
        </div>
        <div>
          <h5>Platform</h5>
          <ul>
            <li><a href="#how">Recognition layer</a></li>
            <li><a href="#how">{ENGINE_NAME}</a></li>
            <li><a href="#how">Intelligence layer</a></li>
            <li><a href="#outcomes">Why it matters</a></li>
          </ul>
        </div>
        <div>
          <h5>Solutions</h5>
          <ul>
            <li><a href="#solutions">For Sales teams</a></li>
            <li><a href="#solutions">For People &amp; HR</a></li>
            <li><a href="#gcc">For GCC teams</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#trust">Security &amp; compliance</a></li>
            <li><a href={BOOKING_URL}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 PraiseLoop &middot; All rights reserved</span>
        <span>Dubai &middot; Riyadh &middot; London</span>
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
      <Outcomes />
      <HowItWorks />
      <ROICalculator />
      <CustomerStories />
      <Solutions />
      <Trust />
      <GCC />
      <Pricing />
      <CTASection />
      <FooterSection />
    </>
  );
}
