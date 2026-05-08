"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

/* ── Nav ───────────────────────────────────────────────────── */
const Nav = () => (
  <header className="nav">
    <div className="container nav-row">
      <a href="#" aria-label="PraiseLoop">
        <Image src="/praiseloop-logo.png" alt="PraiseLoop" width={200} height={52} style={{ height: 52, width: "auto" }} priority />
      </a>
      <nav className="nav-links">
        <a href="#how">Platform</a>
        <a href="#vp">For Sales</a>
        <a href="#gcc">GCC</a>
        <a href="#stats">Why it matters</a>
        <a href="#cta">Pricing</a>
      </nav>
      <div className="nav-cta">
        <a href="#" className="btn btn-secondary" style={{ padding: "10px 16px", fontSize: 14 }}>Sign in</a>
        <a href="#cta" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Book a demo</a>
      </div>
    </div>
  </header>
);

/* ── Hero ──────────────────────────────────────────────────── */
const Hero = () => {
  const [count, setCount] = useState(47);
  const [coins, setCoins] = useState(2400);

  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + (Math.random() < 0.6 ? 1 : 0)), 4200);
    const c = setInterval(() => setCoins((v) => v + 25), 3000);
    return () => { clearInterval(t); clearInterval(c); };
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
            Most recognition platforms reward <span className="strike">effort</span>.<br />
            PraiseLoop rewards <span className="em">outcomes</span>.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            When your CRM, ticketing, or LMS confirms a result, PraiseLoop fires the reward automatically. The work itself triggers the recognition.
          </p>
          <div className="hero-cta">
            <a href="#how" className="btn btn-primary btn-arrow">
              See the {ENGINE_NAME} in action <Icon.Arrow />
            </a>
            <a href="#how" className="btn btn-secondary">How it works</a>
          </div>
          <div className="hero-meta">
            <span><span className="check"><Icon.Check /></span> No credit card</span>
            <span><span className="check"><Icon.Check /></span> 30-min walkthrough</span>
            <span><span className="check"><Icon.Check /></span> Live webhook demo</span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="dashboard">
            <div className="dashboard-head">
              <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Image src="/Orange logo - transparent bg.png" alt="" width={16} height={16} style={{ height: 16, width: "auto" }} />
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
                    <span className="dash-counter">{count}</span>
                    <span className="unit">rewards</span>
                  </div>
                  <div className="sub">From 4 connected systems</div>
                </div>
                <span className="dash-tag">+12%</span>
              </div>
              <div className="dash-card featured">
                <div className="dash-icon"><Icon.Trophy /></div>
                <div>
                  <span className="label">Top performer</span>
                  <div className="value">Sarah Chen</div>
                  <div className="sub">$240K closed · {coins.toLocaleString()} coins earned</div>
                </div>
                <span className="dash-tag">Q2</span>
              </div>
              <div className="dash-card">
                <div className="dash-icon"><Icon.Webhook /></div>
                <div>
                  <span className="label">Webhook activity</span>
                  <div className="dash-systems" style={{ marginTop: 6 }}>
                    <span className="sys-pill"><span className="ping"></span>Salesforce</span>
                    <span className="sys-pill"><span className="ping"></span>Jira</span>
                    <span className="sys-pill"><span className="ping"></span>BambooHR</span>
                  </div>
                  <div className="sub" style={{ marginTop: 8 }}>All systems firing</div>
                </div>
              </div>
            </div>
            <div className="dash-caption">Simulated dashboard preview.</div>
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
const Integrations = () => (
  <section className="integrations-section" style={{ padding: "56px 0" }}>
    <div className="container integrations-row">
      <span className="eyebrow no-dot">Connects to the systems your work actually lives in</span>
      <div className="integration-logos">
        {[
          { n: "Salesforce", c: "#00a1e0" },
          { n: "HubSpot", c: "#ff7a59" },
          { n: "Jira", c: "#2684ff" },
          { n: "BambooHR", c: "#73c41d" },
          { n: "HiBob", c: "#e94e1b" },
          { n: "Microsoft Teams", c: "#5b5fc7" },
          { n: "Slack", c: "#611f69" },
          { n: "Google Workspace", c: "#4285f4" },
        ].map((l) => (
          <span key={l.n} className="int-logo">
            <span className="dot" style={{ background: l.c, opacity: 0.85 }}></span>
            {l.n}
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
          <span className="num">01 / DATA</span>
          <h3>The data is in the wrong place</h3>
          <p>Performance lives in your CRM and ticketing system. Recognition lives in a platform that can&apos;t see either.</p>
        </div>
        <div className="problem-card">
          <div className="deco"><Icon.Eye /></div>
          <span className="num">02 / SIGNAL</span>
          <h3>Recognition stays subjective</h3>
          <p>Managers nominate, peers thank, HR runs campaigns — none of it tied to what the company actually pays for.</p>
        </div>
        <div className="problem-card">
          <div className="deco"><Icon.Brain /></div>
          <span className="num">03 / LOOP</span>
          <h3>There&apos;s no feedback loop</h3>
          <p>You can&apos;t measure whether incentives drive behaviour when they aren&apos;t tied to it in the first place.</p>
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
        <p className="lede">Recognition captures the signal. The {ENGINE_NAME} connects it to outcomes. Intelligence compounds over time.</p>
      </div>

      {/* Loop diagram */}
      <div className="loop-diagram">
        <svg viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--orange)"/>
            </marker>
          </defs>
          <path d="M 80 200 Q 220 60 450 60 Q 680 60 820 200" stroke="var(--outline-variant)" strokeWidth="1.5" fill="none" strokeDasharray="4 6"/>
          <path d="M 820 200 Q 680 240 450 240 Q 220 240 80 200" stroke="var(--orange)" strokeWidth="2" fill="none" markerEnd="url(#arr)"/>
          <g transform="translate(80 200)">
            <circle r="44" fill="#fff" stroke="var(--surface-container-high)"/>
            <text y="-58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="2" fill="var(--on-surface-variant)">01</text>
            <text y="6" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--on-surface)">Recognition</text>
            <text y="22" textAnchor="middle" fontSize="11" fill="var(--on-surface-variant)">Capture</text>
          </g>
          <g transform="translate(450 60)">
            <circle r="62" fill="var(--navy)"/>
            <circle r="62" fill="none" stroke="var(--orange)" strokeWidth="2" opacity="0.4"/>
            <circle r="74" fill="none" stroke="var(--orange)" strokeWidth="1" opacity="0.2"/>
            <text y="-78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="2" fill="var(--orange)">02 · CORE</text>
            <text y="-4" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">{ENGINE_NAME}</text>
            <text y="16" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">Trigger reward</text>
          </g>
          <g transform="translate(820 200)">
            <circle r="44" fill="#fff" stroke="var(--surface-container-high)"/>
            <text y="-58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="2" fill="var(--on-surface-variant)">03</text>
            <text y="6" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--on-surface)">Intelligence</text>
            <text y="22" textAnchor="middle" fontSize="11" fill="var(--on-surface-variant)">Compound</text>
          </g>
          <circle cx="220" cy="105" r="3" fill="var(--orange)"/>
          <circle cx="350" cy="72" r="2" fill="var(--orange)" opacity="0.6"/>
          <circle cx="560" cy="72" r="2" fill="var(--orange)" opacity="0.6"/>
          <circle cx="690" cy="105" r="3" fill="var(--orange)"/>
        </svg>
      </div>

      <div className="layers">
        {/* Layer 01 */}
        <div className="layer">
          <div>
            <span className="layer-tag">— Layer 01 / Recognition</span>
            <h3>Capture every signal, automatically</h3>
            <p>Peer thanks, manager endorsements, milestones, value badges — turned into structured data without anyone filling in a form.</p>
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
            <h3>The work itself fires the reward</h3>
            <p>Deal closes in Salesforce. Ticket resolves in Jira. Cert completes in your LMS. The {ENGINE_NAME} fires automatically — configurable rules, double-entry ledger, approval thresholds. Recognition becomes evidence the work was done.</p>
          </div>
          <div className="coin-demo">
            <div className="layers-pre"><span>WEBHOOK STREAM</span><span className="line"></span><span>LIVE</span></div>
            <div className="coin-row"><span className="coin-source">salesforce</span><span className="coin-event">opportunity.closed_won · Acme Corp · $240K</span><span className="coin-amount">+500</span></div>
            <div className="coin-row"><span className="coin-source">jira</span><span className="coin-event">ticket.resolved · INC-2901 · P1 · 42m</span><span className="coin-amount">+120</span></div>
            <div className="coin-row"><span className="coin-source">workday</span><span className="coin-event">cert.completed · AWS Solutions Architect</span><span className="coin-amount">+250</span></div>
            <div className="coin-row"><span className="coin-source">hubspot</span><span className="coin-event">deal.closed_won · Northwind · $86K</span><span className="coin-amount">+180</span></div>
          </div>
        </div>

        {/* Layer 03 */}
        <div className="layer">
          <div>
            <span className="layer-tag">— Layer 03 / Intelligence</span>
            <h3>The signals build up over time</h3>
            <p>Every reward and recognition event is a data point. Today: quiet hero detection, smart writing, manager nudges. Next: ROI analysis, team health, attrition prediction.</p>
          </div>
          <div className="layer-visual">
            <div className="timeline">
              <div className="timeline-item now"><span className="when">NOW</span><span className="what">Quiet hero detection · smart writing · manager nudges</span><span className="pill">Live</span></div>
              <div className="timeline-item next"><span className="when">Q3 &apos;26</span><span className="what">Recognition ROI analysis</span><span className="pill">Soon</span></div>
              <div className="timeline-item next"><span className="when">Q3 &apos;26</span><span className="what">Team health scoring</span><span className="pill">Soon</span></div>
              <div className="timeline-item later"><span className="when">2027</span><span className="what">Attrition prediction</span><span className="pill">Planned</span></div>
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

/* ── VP Sales ──────────────────────────────────────────────── */
const VPSales = () => (
  <section id="vp" style={{ paddingBlock: 96 }}>
    <div className="container">
      <div className="vp">
        <div className="vp-head">
          <span className="eyebrow">Built for sales-driven teams</span>
          <h2>Your CRM already knows who deserves recognition. Why doesn&apos;t your recognition platform?</h2>
          <p className="lede">Closed deals, quota attainment, pipeline progression — measurable, in Salesforce, and disconnected from how reps actually get recognised. PraiseLoop closes the gap.</p>
        </div>
        <div className="vp-cards">
          <div className="vp-card"><div className="ico"><Icon.Webhook /></div><h4>Webhook the win</h4><p>Deal closes above threshold, the {ENGINE_NAME} fires. Your closer is paid before the manager sees the notification.</p></div>
          <div className="vp-card"><div className="ico"><Icon.Trophy /></div><h4>Beyond the leaderboard</h4><p>Reps see what they can earn next as a forward-looking quest log, not a backward-looking leaderboard.</p></div>
          <div className="vp-card"><div className="ico"><Icon.Eye /></div><h4>Manager view that makes sense</h4><p>Managers see KPI attainment. <em>&quot;Sarah closed Acme ($240K)&quot;</em> — not <em>&quot;Sarah received +500 coins.&quot;</em></p></div>
        </div>
        <div className="vp-cta"><a href="#cta" className="btn btn-primary btn-arrow">See the VP Sales demo <Icon.Arrow /></a></div>
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
          <p className="lede" style={{ marginTop: 18 }}>The GCC isn&apos;t a translation problem — it&apos;s a different operating context. PraiseLoop was built for it from day one.</p>
          <div className="gcc-points">
            <div className="gcc-point"><div className="ico"><Icon.Shield /></div><div><h4>Nationalisation tracking that matches the regulation</h4><p>Emiratisation, Nitaqat, Qatarisation reporting built in — not bolted on.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Lang /></div><div><h4>Arabic-first, not Arabic-translated</h4><p>Full RTL, native Arabic UX, designed alongside English — not after it.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Gift /></div><div><h4>Regional reward catalogues</h4><p>UAE, KSA, Qatar gift cards, charity partners, and experiences employees actually want.</p></div></div>
            <div className="gcc-point"><div className="ico"><Icon.Globe /></div><div><h4>Data residency your CISO will sign off on</h4><p>GCC-based hosting options when you need them.</p></div></div>
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
            <span>Hosting available in UAE (Dubai), KSA (Riyadh), Qatar (Doha), and EU-West.</span>
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
        <h2 style={{ marginTop: 16 }}>See the {ENGINE_NAME} fire in real time.</h2>
        <p className="lede">30 minutes. Your CRM, a webhook, the full loop — deal to reward to dashboard. Live.</p>
        <div className="hero-cta">
          <a href="#" className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></a>
          <a href="#" className="btn btn-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>Watch a 2-min explainer</a>
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
          <p className="footer-tag" style={{ marginTop: 18 }}>Performance-linked recognition for teams that measure what matters. Built for the GCC. Available globally.</p>
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
            <li><a href="#vp">For VP Sales</a></li>
            <li><a href="#">For HR</a></li>
            <li><a href="#gcc">For GCC teams</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#cta">Contact</a></li>
            <li><a href="#">Security</a></li>
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

      <Stats />
      <VPSales />
      <GCC />
      <CTASection />
      <FooterSection />
    </>
  );
}
