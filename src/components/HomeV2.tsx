"use client";

import { useEffect } from "react";
import Image from "next/image";
import "../app/home-v2.css";

const BOOKING_URL = "/demo";

/* ── Icons (Lucide-style) ─────────────────────────────── */
type IP = React.SVGProps<SVGSVGElement>;
const svg = (children: React.ReactNode) => (p: IP) => (
  <svg className="ico" viewBox="0 0 24 24" {...p}>{children}</svg>
);
const Icon = {
  Arrow: svg(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>),
  Chevron: svg(<path d="m6 9 6 6 6-6" />),
  Trending: svg(<><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></>),
  Award: svg(<><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></>),
  Trophy: svg(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>),
  Bars: svg(<><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>),
  Search: svg(<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>),
  Target: svg(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
  Repeat: svg(<><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>),
  Database: svg(<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></>),
  Bulb: svg(<><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.5 2.7 1.5 4C8.3 12.3 8.8 13 9 14" /><path d="M9 18h6" /><path d="M10 22h4" /></>),
  UserCheck: svg(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="m16 11 2 2 4-4" /></>),
  Users: svg(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  User: svg(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
  Sparkles: svg(<><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" /></>),
  Gift: svg(<><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></>),
  Zap: svg(<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />),
  Mail: svg(<><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></>),
  Calendar: svg(<><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>),
  Send: svg(<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></>),
  Check: svg(<path d="M20 6 9 17l-5-5" />),
  Message: svg(<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />),
  Heart: svg(<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />),
  Alert: svg(<><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></>),
  ArrowUp: svg(<><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>),
  Quote: (p: IP) => (
    <svg className="ico" viewBox="0 0 24 24" {...p}>
      <path d="M7.5 4C5 4 3 6 3 8.7c0 2.4 1.7 4.3 4 4.6-.2 1.8-1.3 3-3 3.6-.4.2-.5.7-.2 1 .2.3.6.4.9.2C8 16.9 10 14 10 10.2V8.7C10 6 9.9 4 7.5 4Zm11 0C16 4 14 6 14 8.7c0 2.4 1.7 4.3 4 4.6-.2 1.8-1.3 3-3 3.6-.4.2-.5.7-.2 1 .2.3.6.4.9.2C19 16.9 21 14 21 10.2V8.7C21 6 20.9 4 18.5 4Z" />
    </svg>
  ),
};

/* ── GDPR compliance badge (coded, no image) ──────────── */
const GdprBadge = () => {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 33 + Math.cos(a) * 27, y: 33 + Math.sin(a) * 27 };
  });
  return (
    <span className="gdpr" aria-label="GDPR compliant">
      <svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="GDPR compliant">
        <circle cx="33" cy="33" r="31" fill="#EEF3F2" stroke="#D7E3E1" />
        {stars.map((s, i) => (
          <text key={i} x={s.x} y={s.y + 3.2} fontSize="7" textAnchor="middle" fill="#EBB400">★</text>
        ))}
        <text x="33" y="36.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1B6B6B" fontFamily="var(--font)">GDPR</text>
        <circle cx="50" cy="18" r="8" fill="#1B6B6B" />
        <path d="M46.4 18.2l2.4 2.4 4.2-4.6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
};

/* ── Nav ──────────────────────────────────────────────── */
const NAV = [
  { label: "Performance", href: "#performance", chevron: true },
  { label: "AI Loop", href: "#loop" },
  { label: "Who it's for", href: "#who" },
  { label: "How it works", href: "#how" },
  { label: "Integrations", href: "#integrations" },
  { label: "Impact", href: "#impact" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "/blog" },
];

const Nav = () => (
  <header className="nav">
    <div className="container nav-row">
      <a href="#top" aria-label="PraiseLoop">
        <Image className="nav-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={70} height={26} priority style={{ height: 26, width: "auto" }} />
      </a>
      <nav className="nav-links">
        {NAV.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
            {l.chevron && <Icon.Chevron className="ico chev" />}
          </a>
        ))}
      </nav>
      <div className="nav-cta">
        <a href={BOOKING_URL} className="btn btn-primary">Book a demo</a>
      </div>
    </div>
  </header>
);

/* ── Hero ─────────────────────────────────────────────── */
const Hero = () => (
  <section className="hero" id="top">
    <div className="container hero-grid">
      <div>
        <h1>
          The <span className="kw">AI</span> loop that turns <span className="kw">Performance</span>,{" "}
          <span className="kw">Recognition</span> and <span className="kw">Reward</span> into <span className="kw">ROI</span>.
        </h1>
        <p className="lede">
          Our AI continuously analyses workforce performance, KPIs, behaviours and engagement, giving
          managers real-time intelligence into what drives high-performing teams and where intervention is needed.
        </p>
        <p className="hero-wedge">
          Measure. Recognise. Reward. Improve. Repeat. Performance isn&apos;t managed once a year. It&apos;s optimised every day.
        </p>
        <div className="gdpr"><GdprBadge /></div>
        <div className="hero-cta">
          <a href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></a>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-glow" />
        <div className="hero-photo">
          <Image src="/hero-employees.jpg" alt="A team celebrating a colleague's win together with a high five" fill sizes="(max-width: 960px) 100vw, 45vw" priority style={{ objectFit: "cover" }} />
        </div>
      </div>
    </div>
  </section>
);

/* ── Coded spot cards (from v2.html) ──────────────────── */
const PerformanceSpot = () => (
  <div className="spot">
    <div className="spot-head">
      <span className="spot-dot" style={{ background: "var(--teal)" }} />
      <span className="spot-label">Performance signal</span>
      <span className="spot-chip teal">+14% KPI</span>
    </div>
    <svg className="spot-spark" viewBox="0 0 320 88" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="beatSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B6B6B" stopOpacity="0.16" />
          <stop offset="1" stopColor="#1B6B6B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M8 68 L58 60 L108 64 L158 46 L208 40 L258 28 L310 16 L310 88 L8 88 Z" fill="url(#beatSpark)" />
      <path d="M8 68 L58 60 L108 64 L158 46 L208 40 L258 28 L310 16" fill="none" stroke="#1B6B6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="310" cy="16" r="5" fill="#F26522" stroke="#fff" strokeWidth="2" />
    </svg>
    <div className="spot-row">
      <span className="spot-av">RS</span>
      <div className="spot-row-t"><strong>Ravi Shah</strong><span>Silent hero: consistent, unseen</span></div>
      <span className="pill-tag flag">Flagged</span>
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
      <div><strong>Deal closed</strong><br /><span>$68K · Q3 renewal</span></div>
      <span className="pill-tag verified"><Icon.Check /> Verified · CRM</span>
    </div>
    <div className="spot-link"><svg className="ico" viewBox="0 0 24 24" style={{ transform: "rotate(90deg)" }}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></div>
    <div className="spot-outcome">
      <span className="spot-badge"><Icon.Trophy /></span>
      <div className="spot-outcome-t"><strong>Recognition drafted</strong><span>in the manager&apos;s voice</span></div>
      <span className="spot-coins">+250</span>
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
      <span className="spot-when">WHEN</span> deal value &gt; <b>$10K</b><br />
      <span className="spot-then">THEN</span> award <b>500 coins</b>
    </div>
    <div className="spot-link"><svg className="ico" viewBox="0 0 24 24" style={{ transform: "rotate(90deg)" }}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></div>
    <div className="spot-outcome">
      <span className="spot-badge orange"><Icon.Zap /></span>
      <div className="spot-outcome-t"><strong>Reward fired</strong><span>tied to the result · budget ok</span></div>
      <span className="spot-coins">+500</span>
    </div>
  </div>
);

/* ── Three beats ──────────────────────────────────────── */
const Beats = () => (
  <section id="performance">
    <div className="container">
      <div className="beat">
        <div className="beat-text">
          <span className="eyebrow">Performance comes first</span>
          <h3>Turn Underperformance into <span className="kw">High Performance</span></h3>
          <p>Most organisations know who is underperforming, but not why. PraiseLoop analyses behaviour, engagement and KPIs to spot issues early, then gives managers real-time AI recommendations that help employees improve every day, so teams get stronger and business outcomes improve.</p>
        </div>
        <div className="beat-visual"><PerformanceSpot /></div>
      </div>
    </div>

    <div className="beats-band">
      <div className="container">
        <div className="beat reverse">
          <div className="beat-visual"><RecognitionSpot /></div>
          <div className="beat-text">
            <span className="eyebrow">Recognition doesn&apos;t create performance</span>
            <h3><span className="kw">Performance</span> Earns Recognition</h3>
            <p>Traditional recognition rewards effort or opinion. PraiseLoop rewards measurable performance tied to real KPIs and verified outcomes, so recognition becomes the outcome of performance, not just the driver of it.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="beat">
        <div className="beat-text">
          <span className="eyebrow">Reward growth, not just results</span>
          <h3>Recognise Improvement. <span className="kw">Reward Excellence.</span></h3>
          <p>Every employee can improve. PraiseLoop celebrates high performers and those making measurable progress. As they hit KPIs, complete coaching and deliver better outcomes, they unlock recognition, rewards and growth opportunities. Continuous improvement becomes visible, celebrated and rewarded, driving engagement, retention and performance.</p>
        </div>
        <div className="beat-visual"><RewardSpot /></div>
      </div>
    </div>
  </section>
);

/* ── Mid CTA ──────────────────────────────────────────── */
const MidCta = () => (
  <div className="midcta">
    <div className="container midcta-inner">
      <h3>Ready to turn performance into measurable ROI?</h3>
      <a href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></a>
    </div>
  </div>
);

/* ── Phone mock ───────────────────────────────────────── */
const PhoneMock = () => (
  <div className="phone">
    <div className="phone-screen">
      <div className="phone-notch" />
      <div className="ph-status">
        <span>9:41</span>
        <span className="dots"><i /><i /><i style={{ height: 6 }} /><span style={{ marginLeft: 4 }}>📶</span></span>
      </div>
      <div className="ph-head">
        <span className="ph-logo">P</span>
        <span className="t"><strong>PraiseLoop</strong><span>AI Coaching Agent</span></span>
        <span className="menu">⋯</span>
      </div>
      <div className="ph-body">
        <div className="ph-msg ai">
          <div className="ph-bubble">Hi Alex 👋 I&apos;ve analysed your team&apos;s performance this week. Here are the top insights:</div>
        </div>
        <div className="ph-ov">
          <div className="h">Team Performance Overview</div>
          <div className="ph-ov-grid">
            <div className="ph-stat"><div className="l">Win Rate</div><div className="n">28%</div><div className="u">↗ 8pp</div></div>
            <div className="ph-stat"><div className="l">Pipeline</div><div className="n">$4.2M</div><div className="u">↗ 12%</div></div>
            <div className="ph-stat"><div className="l">Avg Deal</div><div className="n">$68K</div><div className="u">↗ 8%</div></div>
          </div>
        </div>
        <div className="ph-msg user">
          <div className="ph-bubble">Thanks! What&apos;s driving the improvement in our pipeline?</div>
        </div>
        <div className="ph-init">
          <div className="h">Recommended Initiatives</div>
          <div className="row"><span className="ck"><Icon.Check /></span> Replicate top-performer cadence</div>
          <div className="row"><span className="ck"><Icon.Check /></span> Run discovery skills workshop</div>
          <div className="row"><span className="ck"><Icon.Check /></span> Improve proposal value messaging</div>
          <div className="cta">View full Praise Initiatives</div>
        </div>
      </div>
      <div className="ph-input">
        <span className="box">Message PraiseLoop AI…</span>
        <span className="send"><Icon.Send /></span>
      </div>
    </div>
  </div>
);

/* ── Teal loop ────────────────────────────────────────── */
const LOOP_CARDS = [
  { Ico: Icon.Bars, h: "Measure", p: "Analyse workforce performance, KPIs, engagement and behavioural trends in real time." },
  { Ico: Icon.Search, h: "Analyse", p: "Spot employees who need support and those who are consistently excelling." },
  { Ico: Icon.Target, h: "Coach", p: "AI agents recommend coaching actions, development plans and performance interventions." },
  { Ico: Icon.Trending, h: "Improve", p: "Employees improve their KPIs and complete personalised coaching journeys." },
];

const Loop = () => (
  <section id="loop" className="loopwrap">
    <div className="container">
      <div className="loop-head">
        <span className="eyebrow on-dark">The AI performance loop</span>
        <h2>Measure. Coach. Improve.<br />Recognise. <span className="kw">Reward</span>. Repeat.</h2>
        <p className="lede">PraiseLoop works alongside managers every day, analysing performance, KPIs and engagement trends to spot who needs support and who is excelling. It recommends coaching actions and development plans, then automatically recognises verified achievements and rewards meaningful outcomes.</p>
      </div>

      <div className="loop-mock"><PhoneMock /></div>

      <div className="loop-cards">
        {LOOP_CARDS.map((c) => (
          <div key={c.h} className="loop-card">
            <span className="ic"><c.Ico /></span>
            <h4>{c.h}</h4>
            <p>{c.p}</p>
          </div>
        ))}
      </div>

      <div className="loop-band">
        <span className="loop-band-ico"><Icon.Repeat /></span>
        <h3>One continuous <span className="kw">AI-powered</span> loop.</h3>
        <p className="loop-flow">
          Measure <span className="arw">→</span> Analyse <span className="arw">→</span> Coach <span className="arw">→</span> Improve <span className="arw">→</span> Recognise <span className="arw">→</span> Reward <span className="arw">→</span> Repeat
        </p>
      </div>

      <div className="loop-cta">
        <a href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></a>
      </div>
    </div>
  </section>
);

/* ── People ───────────────────────────────────────────── */
const PEOPLE = [
  { img: "/recognition-moment.webp", role: "Employees", body: "See exactly why you were recognised, and earn real rewards for real results." },
  { img: "/manager-moment.webp", role: "Sales Managers", body: "The AI spots the close, drafts the praise, fires the reward. One click, ten seconds." },
  { img: "/person-executive.jpg", role: "HR Directors", body: "Recognition that runs itself, with engagement and retention you can actually measure." },
  { img: "/person-analytics.jpg", role: "Sales Directors", body: "Workforce data turned into ROI: performance lift, cost of underperformance, board-ready." },
];

const People = () => (
  <section id="who" className="people">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Built for the whole performance chain</span>
        <h2>One loop. Four people who feel it every day.</h2>
        <p className="lede">From the rep hitting quota to the CHRO reporting on productivity, PraiseLoop gives everyone the same verified view of what good performance looks like, and what it&apos;s worth.</p>
      </div>
      <div className="people-grid">
        {PEOPLE.map((p) => (
          <div key={p.role} className="person">
            <div className="person-photo">
              <Image src={p.img} alt={p.role} fill sizes="(max-width: 980px) 50vw, 22vw" style={{ objectFit: "cover" }} />
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

/* ── Intelligence flow — closed loop ring ─────────────── */
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
        <span className="eyebrow">How it works</span>
        <h2>From signal to <span className="kw">reward</span> in one continuous flow</h2>
        <p className="lede">PraiseLoop turns the performance signals already happening across your business into timely coaching, recognition and reward.</p>
      </div>

      <div className="sig">
        <div className="sig-row">
          {/* 1 · Connect */}
          <div className="sig-card">
            <span className="sig-num">1</span>
            <span className="sig-ic"><Icon.Database /></span>
            <h4>Connect</h4>
            <span className="sig-sub">Bring signals together</span>
            <div className="sig-panel">
              <div className="sig-list">
                <div className="sig-li"><span className="i"><Icon.Users /></span>HRIS<span className="ok"><Icon.Check /></span></div>
                <div className="sig-li"><span className="i"><Icon.Bars /></span>CRM<span className="ok"><Icon.Check /></span></div>
                <div className="sig-li"><span className="i"><Icon.User /></span>ATS<span className="ok"><Icon.Check /></span></div>
                <div className="sig-li"><span className="i"><Icon.Heart /></span>Engagement<span className="ok"><Icon.Check /></span></div>
              </div>
            </div>
            <span className="sig-foot">4 signals connected</span>
          </div>

          <SigArrow />

          {/* 2 · Uncover */}
          <div className="sig-card">
            <span className="sig-num">2</span>
            <span className="sig-ic"><Icon.Search /></span>
            <h4>Uncover</h4>
            <span className="sig-sub">See what matters</span>
            <div className="sig-panel">
              <span className="sig-panel-h">Performance insight</span>
              <SigChart />
              <div className="sig-insight up"><span className="d"><Icon.ArrowUp /></span>Strong collaboration</div>
              <div className="sig-insight warn"><span className="d"><Icon.Alert /></span>Coaching opportunity</div>
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
              <span className="sig-tag-orange">Coaching opportunity</span>
              <p className="sig-p">Sam&apos;s customer satisfaction has improved 11% over the last 30 days.</p>
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
            <span className="sig-sub">Make progress visible</span>
            <div className="sig-panel">
              <div className="sig-recog-top">
                <Image className="sig-avatar" src="/heather.png" alt="" width={40} height={40} />
                <strong>Great work, Sam! 🎉</strong>
              </div>
              <div className="sig-points">+50 points</div>
              <p className="sig-p">For going above and beyond for the team</p>
              <div className="sig-by">Recognised by Sarah (Manager)</div>
            </div>
          </div>

          <SigArrow />

          {/* 5 · Reward */}
          <div className="sig-card">
            <span className="sig-num">5</span>
            <span className="sig-ic"><Icon.Gift /></span>
            <h4>Reward</h4>
            <span className="sig-sub">Connect to real rewards</span>
            <div className="sig-panel">
              <span className="sig-tag-teal">Reward issued</span>
              <div className="sig-coin-row"><span className="sig-coin">$</span><strong>+50 coins</strong></div>
              <p className="sig-p">For outstanding performance</p>
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
          <span className="sig-leg"><Icon.Bars />Signals in</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Message />Better manager actions</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Users />Better behaviours</span>
          <Icon.Arrow className="ico sig-leg-arrow" />
          <span className="sig-leg"><Icon.Trophy />Measurable outcomes</span>
        </div>
      </div>
    </div>
  </section>
);

/* ── Integrations ─────────────────────────────────────── */
const INTS = ["Workday", "SAP SuccessFactors", "ADP", "BambooHR", "HiBob", "Salesforce", "HubSpot", "Microsoft Teams", "Slack"];

const Integrations = () => (
  <div id="integrations" className="ints">
    <div className="container">
      <div className="ints-head">
        <p className="ints-title">Zero integrations required to start</p>
        <p className="ints-sub">Go live on day one, then connect your CRM, help desk, behavioural, financial and HRIS whenever you&apos;re ready. 25+ integrations available.</p>
      </div>
    </div>
    <div className="marquee">
      <div className="marquee-track">
        {[...INTS, ...INTS].map((n, i) => <span key={i} className="int">{n}</span>)}
      </div>
    </div>
  </div>
);

/* ── Orange outcome ───────────────────────────────────── */
const OUTCOMES = [
  { Ico: Icon.Zap, h: "Turn performance into action", p: "Verified KPIs automatically trigger recognition and rewards, with no manual tracking and no missed moments." },
  { Ico: Icon.Users, h: "Coach, not just cheer", p: "AI agents flag underperformance early and recommend the next step, so managers lead instead of guess." },
  { Ico: Icon.Trending, h: "Report ROI, not just recognition", p: "Engagement, retention and performance tied to real business outcomes: board-ready, in real time." },
];

const Outcome = () => (
  <section className="outcome">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow on-orange">The outcome</span>
        <h2>Performance intelligence that actually shows up in the numbers.</h2>
        <p className="lede">PraiseLoop doesn&apos;t just make recognition easier. It closes the loop between workforce behaviour and business results, every day, every team, every KPI.</p>
      </div>
      <div className="outcome-grid">
        {OUTCOMES.map((o) => (
          <div key={o.h} className="oc-card">
            <span className="ic"><o.Ico /></span>
            <h4>{o.h}</h4>
            <p>{o.p}</p>
          </div>
        ))}
      </div>
      <p className="outcome-trust">Praise AI reads outcome events from your <b>systems of record</b>. It never relays what employees tell it in chat.</p>
    </div>
  </section>
);

/* ── Impact stats ─────────────────────────────────────── */
const STATS = [
  { label: "Performance", num: 14, prefix: "+", suffix: "%", tone: "orange", sub: <>on the <span className="kw">KPIs</span> you already track</> },
  { label: "Regretted attrition", num: 22, prefix: "−", suffix: "%", tone: "", sub: "in the first two quarters" },
  { label: "Absenteeism", num: 9, prefix: "−", suffix: "%", tone: "", sub: "across recognised teams" },
  { label: "Manager time", num: 10, prefix: "", suffix: "s", tone: "", sub: "per recognition sent" },
];

const Impact = () => (
  <section id="impact" className="impact">
    <div className="container">
      <div className="section-head center">
        <span className="eyebrow">The employee side</span>
        <h2>Reward the right behaviours, and <span className="kw">performance compounds</span></h2>
        <p className="lede">Every recognised action is a signal. Repeated across a team, those behaviours become how your people operate. PraiseLoop ties them to the numbers leaders actually track, turning workforce data into measurable business outcomes and reducing the cost of underperformance.</p>
      </div>
      <div className="stats-panel">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-num ${s.tone}`} data-count={s.num} data-prefix={s.prefix} data-suffix={s.suffix}>
              {s.prefix}{s.num}{s.suffix}
            </div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Testimonials ─────────────────────────────────────── */
const TST = [
  { initials: "DB", quote: "Every employee has the potential to improve. PraiseLoop celebrates high performers and those making measurable progress.", name: "Deepak Bhavsar", role: "CEO, Tandem Search" },
  { initials: "KB", quote: "We saw a 19% uplift in sales productivity within one quarter. The AI coaching prompts keep our reps aligned every single day.", name: "Kalpesh Baxi", role: "Founder, Baxfield" },
  { initials: "SN", quote: "For the first time, HR and sales leaders are looking at the same truth. Recognition actually means something here.", name: "Saravana Namasivayam", role: "Head of Transformation, Nordic Logistics" },
  { initials: "MR", quote: "Recognition went from a nice-to-have to a number our board asks about. The ROI report pays for the platform on its own.", name: "Maria Rossi", role: "People Director, Helvia Group" },
];

const Testimonials = () => (
  <section id="testimonials" className="tst">
    <div className="container">
      <div className="section-head center">
        <span className="eyebrow on-orange">What leaders say</span>
        <h2>Loved by HR, Sales and the people they lead.</h2>
      </div>
      <div className="tst-marquee">
        <div className="tst-track">
          {[...TST, ...TST].map((t, i) => (
            <div key={i} className="tst-card" aria-hidden={i >= TST.length}>
              <span className="tst-qi"><Icon.Quote /></span>
              <p className="tst-quote">{t.quote}</p>
              <div className="tst-attr">
                <span className="tst-avatar">{t.initials}</span>
                <div><strong>{t.name}</strong><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Dark CTA ─────────────────────────────────────────── */
const FinalCta = () => (
  <section className="cta2">
    <div className="container cta2-inner">
      <h2>Turn measured results into <span className="kw">measured ROI</span>.</h2>
      <p className="sub">Performance isn&apos;t managed once a year. It&apos;s optimised every day. See the loop running on your own KPIs. Live in two weeks.</p>
      <form className="cta2-form" action={BOOKING_URL} method="get">
        <span className="cta2-input">
          <Icon.Mail />
          <input type="email" name="email" placeholder="you@company.com" aria-label="Work email" />
        </span>
        <button type="submit" className="btn btn-primary btn-arrow">Get the walkthrough <Icon.Arrow /></button>
      </form>
      <p className="cta2-note">No spam. Just the loop, your KPIs and the ROI maths.</p>
      <div className="cta2-alt">
        <span className="or">OR</span>
        <a href={BOOKING_URL} className="btn btn-outline"><Icon.Calendar /> Schedule a meeting</a>
      </div>
    </div>
  </section>
);

/* ── Footer ───────────────────────────────────────────── */
const Footer = () => (
  <footer className="foot">
    <div className="container foot-row">
      <Image className="foot-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={60} height={22} style={{ height: 22, width: "auto" }} />
      <nav className="foot-links">
        <a href="/blog">Blog</a>
        <a href="/demo">Terms and Conditions</a>
        <a href="/demo">Privacy Policy</a>
        <a href="/demo">Cookie Policy</a>
      </nav>
      <span className="foot-copy">© 2026 PraiseLoop. Performance, recognition and reward as one system.</span>
    </div>
  </footer>
);

/* ── Count-up (reduced-motion aware) ──────────────────── */
function useCountUp() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const nums = document.querySelectorAll<HTMLElement>(".plh .stat-num[data-count]");
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseFloat(el.dataset.count || "0");
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        let start: number | null = null;
        const tick = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / 1100, 1);
          const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = pre + val + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/* ── Page ─────────────────────────────────────────────── */
export default function HomeV2() {
  useCountUp();
  return (
    <div className="plh">
      <Nav />
      <Hero />
      <Beats />
      <MidCta />
      <Loop />
      <People />
      <Flow />
      <Integrations />
      <Outcome />
      <Impact />
      <Testimonials />
      <FinalCta />
      <Footer />
    </div>
  );
}
