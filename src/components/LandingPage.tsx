"use client";

import { useState, useEffect } from "react";
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
  Stack: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Brain: (p: React.SVGProps<SVGSVGElement>) => (
    <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 4a3 3 0 013 0 3 3 0 013 0 3 3 0 012 5 3 3 0 01-1 5 3 3 0 01-4 2 3 3 0 01-4 0 3 3 0 01-4-2 3 3 0 01-1-5 3 3 0 012-5z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 4v16M9 9h6M8 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
/* TODO: Replace with your actual Calendly (or booking tool) URL before sharing externally */
const BOOKING_URL = "https://calendly.com/praiseloop/demo";

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
        <a href="#stats">Why it matters</a>
      </nav>
      <div className="nav-cta">
        <a href="#" className="btn btn-secondary" style={{ padding: "10px 16px", fontSize: 14 }}>Sign in</a>
        <a href={BOOKING_URL} className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Book a demo</a>
      </div>
    </div>
  </header>
);

/* ── Hero ──────────────────────────────────────────────────── */
const Hero = () => {
  const [showSecondBadge, setShowSecondBadge] = useState(false);

  useEffect(() => {
    const b = setInterval(() => setShowSecondBadge((v) => !v), 3500);
    return () => clearInterval(b);
  }, []);

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
            <a href="#how" className="btn btn-secondary">How it works</a>
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
                  <div className="value">
                    <span className="dash-counter">47</span>
                    <span className="unit">rewards</span>
                  </div>
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
                  <div className="value">
                    <span className="dash-counter">3</span>
                    <span className="unit">awaiting review</span>
                  </div>
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
          <div className={`hero-fire hero-fire-second ${showSecondBadge ? "visible" : ""}`}>
            <span className="spark spark-teal"><Icon.Check /></span>
            +120 coins · issue fixed
          </div>
        </div>
      </div>
    </section>
  );
};

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

/* ── Problem ───────────────────────────────────────────────── */
const Problem = () => (
  <section id="problem">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">The problem</span>
        <h2>Recognition stopped being connected to outcomes — and nobody noticed.</h2>
        <p className="lede">Companies say they reward performance. Their recognition systems have no idea who actually performed.</p>
      </div>
      <div className="problem-cards">
        <div className="problem-card">
          <div className="deco"><Icon.Stack /></div>
          <span className="num">01 / THE GAP</span>
          <h3>The data is in the wrong place</h3>
          <p>Real performance lives in your sales and project tools. Your recognition platform can&apos;t see any of it.</p>
        </div>
        <div className="problem-card">
          <div className="deco"><Icon.Eye /></div>
          <span className="num">02 / THE BIAS</span>
          <h3>Recognition stays subjective</h3>
          <p>Managers nominate favourites, peers thank friends, HR runs campaigns — none of it tied to who actually delivered results.</p>
        </div>
        <div className="problem-card">
          <div className="deco"><Icon.Brain /></div>
          <span className="num">03 / THE BLIND SPOT</span>
          <h3>There&apos;s no feedback loop</h3>
          <p>You can&apos;t tell whether your recognition programme is actually changing behaviour — because it was never connected to results.</p>
        </div>
      </div>
    </div>
  </section>
);

/* ── How It Works ──────────────────────────────────────────── */
const HowItWorks = () => (
  <section id="how" style={{ background: "var(--surface-container-low)" }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">How it works</span>
        <h2>Three layers. One closed loop.</h2>
        <p className="lede">Recognise great work. Automatically reward results. Learn what drives your best people.</p>
      </div>

      {/* Loop diagram */}
      <div className="loop-diagram">
        <svg viewBox="0 -30 900 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--orange)"/>
            </marker>
            <radialGradient id="engine-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="var(--orange)" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--outline-variant)"/>
              <stop offset="50%" stopColor="var(--orange)" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="var(--outline-variant)"/>
            </linearGradient>
          </defs>

          {/* Forward path (top arc) */}
          <path d="M 80 210 Q 220 60 450 60 Q 680 60 820 210" stroke="url(#path-grad)" strokeWidth="2.5" fill="none" strokeDasharray="6 8"/>
          {/* Return path (bottom arc) */}
          <path d="M 820 210 Q 680 260 450 260 Q 220 260 80 210" stroke="var(--orange)" strokeWidth="3" fill="none" markerEnd="url(#arr)"/>

          {/* Animated dots travelling along forward path */}
          <circle r="4" fill="var(--orange)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 80 210 Q 220 60 450 60 Q 680 60 820 210"/>
          </circle>
          <circle r="3" fill="var(--orange)" opacity="0.5">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M 80 210 Q 220 60 450 60 Q 680 60 820 210"/>
          </circle>
          {/* Animated dot on return path */}
          <circle r="4" fill="var(--orange)">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 820 210 Q 680 260 450 260 Q 220 260 80 210"/>
          </circle>

          {/* Floating labels on curves */}
          <text x="240" y="110" fontSize="10" fontWeight="600" fill="var(--on-surface-variant)" opacity="0.7" fontFamily="var(--font-mono)" letterSpacing="0.5">target hit</text>
          <text x="620" y="110" fontSize="10" fontWeight="600" fill="var(--on-surface-variant)" opacity="0.7" fontFamily="var(--font-mono)" letterSpacing="0.5">reward sent</text>
          <text x="390" y="280" fontSize="10" fontWeight="600" fill="var(--orange)" opacity="0.7" fontFamily="var(--font-mono)" letterSpacing="0.5">insights improve over time</text>

          {/* Node 1 — Recognition */}
          <g transform="translate(80 210)">
            <circle r="50" fill="#fff" stroke="var(--surface-container-high)" strokeWidth="2"/>
            <text y="-64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="2" fill="var(--on-surface-variant)">01</text>
            {/* Signal icon */}
            <path d="M-8-6l4 6-4 6M0-6l4 6-4 6M8-6l4 6-4 6" stroke="var(--orange)" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(-4,-12) scale(0.8)"/>
            <text y="10" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--on-surface)">Recognition</text>
            <text y="26" textAnchor="middle" fontSize="11" fill="var(--on-surface-variant)">Capture</text>
          </g>

          {/* Node 2 — Outcome Engine (larger, glowing) */}
          <g transform="translate(450 60)">
            <circle r="100" fill="url(#engine-glow)" className="engine-pulse"/>
            <circle r="72" fill="var(--navy)"/>
            <circle r="72" fill="none" stroke="var(--orange)" strokeWidth="2.5" opacity="0.5" className="engine-ring"/>
            <circle r="86" fill="none" stroke="var(--orange)" strokeWidth="1" opacity="0.2"/>
            <text y="-90" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="2" fill="var(--orange)">02 · CORE</text>
            {/* Bolt icon */}
            <path d="M-4-18l-8 14h6l-2 14 10-16h-7z" fill="var(--orange)" opacity="0.6" transform="translate(0,-4) scale(0.7)"/>
            <text y="4" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{ENGINE_NAME}</text>
            <text y="22" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">Auto-reward</text>
          </g>

          {/* Node 3 — Intelligence */}
          <g transform="translate(820 210)">
            <circle r="50" fill="#fff" stroke="var(--surface-container-high)" strokeWidth="2"/>
            <text y="-64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="2" fill="var(--on-surface-variant)">03</text>
            {/* Chart icon */}
            <rect x="-12" y="-12" width="5" height="10" rx="1" fill="var(--slate)" opacity="0.6"/>
            <rect x="-4" y="-18" width="5" height="16" rx="1" fill="var(--orange)" opacity="0.7"/>
            <rect x="4" y="-15" width="5" height="13" rx="1" fill="var(--slate)" opacity="0.6"/>
            <text y="10" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--on-surface)">Intelligence</text>
            <text y="26" textAnchor="middle" fontSize="11" fill="var(--on-surface-variant)">Compound</text>
          </g>
        </svg>
      </div>

      <div className="layers">
        {/* Layer 01 */}
        <div className="layer">
          <div>
            <span className="layer-tag">— Layer 01 / Recognition</span>
            <h3>Capture every moment of great work</h3>
            <p>Peer shout-outs, manager endorsements, milestones, value badges — all in one place, without anyone filling in a form.</p>
          </div>
          <div className="layer-visual">
            <div className="signal-row"><span className="av">JR</span><div><strong>Jamie</strong> thanked <strong>Priya</strong> · <em>shipped under the wire</em></div></div>
            <div className="signal-row"><span className="av b">MK</span><div><strong>Manager endorsement</strong> · <em>customer-obsession value</em></div></div>
            <div className="signal-row"><span className="av c">SC</span><div><strong>Milestone</strong> · 2-year anniversary</div></div>
            <div className="signal-row"><span className="av d">AB</span><div><strong>Peer kudos</strong> · helped <em>resolve P1</em></div></div>
          </div>
        </div>

        {/* Layer 02 — featured */}
        <div className="layer featured">
          <div>
            <span className="layer-badge">★ The differentiator</span>
            <span className="layer-tag">— Layer 02 / {ENGINE_NAME}</span>
            <h3>Results trigger rewards — automatically</h3>
            <p>Someone closes a deal in Salesforce. Resolves a critical issue in Jira. Earns a certification. The {ENGINE_NAME} spots it and sends the reward instantly — with full budget controls and approval workflows built in.</p>
          </div>
          <div className="coin-demo">
            <div className="layers-pre"><span>RECENT REWARDS</span><span className="line"></span><span>LIVE</span></div>
            <div className="coin-row"><span className="coin-source">Salesforce</span><span className="coin-event">Deal won · Acme Corp · $240K</span><span className="coin-amount">+500</span></div>
            <div className="coin-row"><span className="coin-source">Jira</span><span className="coin-event">Critical issue resolved · 42 min response</span><span className="coin-amount">+120</span></div>
            <div className="coin-row"><span className="coin-source">Training</span><span className="coin-event">Certification completed · AWS Solutions Architect</span><span className="coin-amount">+250</span></div>
            <div className="coin-row"><span className="coin-source">BambooHR</span><span className="coin-event">1-year milestone · Operations team</span><span className="coin-amount">+200</span></div>
          </div>
        </div>

        {/* Layer 03 */}
        <div className="layer">
          <div>
            <span className="layer-tag">— Layer 03 / Intelligence</span>
            <h3>Every recognition becomes an insight</h3>
            <p>Over time, PraiseLoop builds a picture of what drives your best people. Silent Hero Detection surfaces consistent performers who haven&apos;t been recognised in 30+ days — before disengagement sets in. Managers get nudges, not noise.</p>
          </div>
          <div className="layer-visual">
            <div className="timeline">
              <div className="timeline-item now"><span className="when">NOW</span><span className="what">Silent Hero Detection · smart writing help · manager nudges</span><span className="pill">Live</span></div>
              <div className="timeline-item next"><span className="when">Q3 &apos;26</span><span className="what">Recognition impact reporting</span><span className="pill">Soon</span></div>
              <div className="timeline-item next"><span className="when">Q3 &apos;26</span><span className="what">Team health scoring</span><span className="pill">Soon</span></div>
              <div className="timeline-item later"><span className="when">2027</span><span className="what">Flight risk alerts</span><span className="pill">Planned</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Sparkline ─────────────────────────────────────────────── */
const Sparkline = ({ points, trend = "up" }: { points: number[]; trend?: "up" | "down" }) => {
  const w = 120, h = 36;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((p) => h - ((p - min) / range) * (h - 4) - 2);
  const d = points.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  const fillD = `${d} L ${w} ${h} L 0 ${h} Z`;
  const color = trend === "up" ? "var(--orange)" : "var(--slate)";
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <path d={fillD} fill={color} opacity="0.12"/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="2.5" fill={color}/>
    </svg>
  );
};

/* ── Stats ─────────────────────────────────────────────────── */
const Stats = () => (
  <section id="stats" style={{ background: "var(--surface)", paddingBottom: 32 }}>
    <div className="container">
      <div className="section-head" style={{ maxWidth: 720 }}>
        <span className="eyebrow">By the numbers</span>
        <h2>The cost of recognition without measurement</h2>
      </div>
      <div className="stats-grid">
        <div className="stat"><div className="stat-row"><div className="num"><span className="sym">$</span>16K</div><Sparkline points={[8,9,11,10,12,14,16]} /></div><p>Average cost per departing employee in replacement and ramp</p><span className="src">SHRM</span></div>
        <div className="stat"><div className="stat-row"><div className="num">31<span className="sym">%</span></div><Sparkline points={[20,18,14,12,8,6,4]} trend="down" /></div><p>Lower voluntary turnover with strategic recognition</p><span className="src">Bersin by Deloitte</span></div>
        <div className="stat"><div className="stat-row"><div className="num">2.5<span className="sym">×</span></div><Sparkline points={[1,1.2,1.5,1.8,2,2.3,2.5]} /></div><p>More likely to rate innovative performance as excellent</p><span className="src">SHRM / Globoforce</span></div>
        <div className="stat"><div className="stat-row"><div className="num">41<span className="sym">%</span></div><Sparkline points={[30,26,24,18,14,10,8]} trend="down" /></div><p>Reduction in absenteeism with high-engagement cultures</p><span className="src">Gallup</span></div>
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
        <div className="vp-cta"><a href={BOOKING_URL} className="btn btn-primary btn-arrow">See it in action <Icon.Arrow /></a></div>
      </div>
    </div>
  </section>
);

/* ── Social Proof ─────────────────────────────────────────── */
const SocialProof = () => (
  <section id="proof" style={{ background: "var(--surface)", paddingBlock: 96 }}>
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
        <span className="eyebrow">What people are saying</span>
      </div>
      <div className="proof-grid">
        <div className="proof-card">
          <blockquote>
            &ldquo;We used to run recognition on gut feel. PraiseLoop showed us which teams were being completely overlooked — and within a quarter, voluntary turnover in those teams dropped measurably.&rdquo;
          </blockquote>
          <div className="proof-attr">
            <div className="proof-avatar">HR</div>
            <div>
              <strong>Head of People Operations</strong>
              <span>Mid-market technology company</span>
            </div>
          </div>
        </div>
        <div className="proof-card">
          <blockquote>
            &ldquo;The moment our CFO saw recognition spend tied to actual retention numbers, the budget conversation changed completely. It went from a cost line to an investment.&rdquo;
          </blockquote>
          <div className="proof-attr">
            <div className="proof-avatar">VP</div>
            <div>
              <strong>VP of HR</strong>
              <span>Regional services organisation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Trust / Compliance ───────────────────────────────────── */
const Trust = () => (
  <section id="trust" style={{ paddingBlock: 80 }}>
    <div className="container">
      <div className="section-head" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
        <span className="eyebrow">Security &amp; compliance</span>
        <h2 style={{ marginTop: 14 }}>Enterprise-grade from day one</h2>
        <p className="lede" style={{ margin: "18px auto 0" }}>PraiseLoop is built for organisations where data protection is a procurement requirement, not an afterthought.</p>
      </div>
      <div className="trust-grid">
        <div className="trust-card">
          <div className="trust-icon"><Icon.Shield /></div>
          <h4>GDPR compliant</h4>
          <p>Full compliance with the EU General Data Protection Regulation. Data processing agreements available on request.</p>
        </div>
        <div className="trust-card">
          <div className="trust-icon"><Icon.Globe /></div>
          <h4>UAE PDPL ready</h4>
          <p>Compliant with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection. Regional data residency available.</p>
        </div>
        <div className="trust-card">
          <div className="trust-icon"><Icon.Pin /></div>
          <h4>Data residency</h4>
          <p>Choose where your data lives — UAE, KSA, Qatar, or Europe. Your data never leaves your chosen region.</p>
        </div>
        <div className="trust-card">
          <div className="trust-icon"><Icon.Webhook /></div>
          <h4>SSO &amp; access controls</h4>
          <p>SAML-based single sign-on, role-based access, and audit logging for every action in the platform.</p>
        </div>
      </div>
    </div>
  </section>
);

/* ── Pricing ──────────────────────────────────────────────── */
const Pricing = () => (
  <section id="pricing" style={{ background: "var(--surface-container-low)", paddingBlock: 96 }}>
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
            <div className="gcc-point"><div className="ico"><Icon.Lang /></div><div><h4>Built natively for the region</h4><p>Full right-to-left Arabic interface designed alongside English, support for field workers and distributed teams, and cultural norms built into the product — not bolted on as a localisation layer.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Gift /></div><div><h4>Regional reward catalogues</h4><p>UAE, KSA, and Qatar gift cards, charity partners, and experiences employees actually want.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Globe /></div><div><h4>Your data stays in-region</h4><p>GCC-based hosting with full PDPL (UAE Federal Decree-Law No. 45) compliance. Your data never leaves the region unless you choose otherwise.</p></div></div>
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
        <h2 style={{ marginTop: 16 }}>See PraiseLoop in action.</h2>
        <p className="lede">30 minutes. We&apos;ll show you the full platform live — from someone hitting a target to the reward landing in their account.</p>
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
            <li><a href="#stats">Why it matters</a></li>
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
            <li><a href="#trust">Security &amp; compliance</a></li>
            <li><a href={BOOKING_URL}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PraiseLoop · All rights reserved</span>
        <span>Dubai · Riyadh · London</span>
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
      <Problem />
      <HowItWorks />
      <Solutions />
      <Stats />
      <SocialProof />
      <Trust />
      <GCC />
      <Pricing />
      <CTASection />
      <FooterSection />
    </>
  );
}
