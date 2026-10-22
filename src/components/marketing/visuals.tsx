"use client";

/**
 * Visual sections for the Oct 2026 homepage refresh (ported from the
 * "PraiseLoop Homepage Redesign" canvas, 20 Oct). Styled in site.css under
 * the "Visual sections" block. Animations respect prefers-reduced-motion.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coach, DidItWork, NADIA, RepRow } from "./mocks";

const P = {
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  flask: <><path d="M9 3h6" /><path d="M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3" /></>,
  repeat: <><path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />,
  exit: <><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /><path d="M10 17l-5-5 5-5" /><path d="M5 12h11" /></>,
  check: <path d="M20 6L9 17l-5-5" />,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
};
function Svg({ d, color, size = 30 }: { d: React.ReactNode; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
}

const TEAL = "#1B6B6B";
const BEHIND = "#B54848";

/* ── Problem: where the week goes ─────────────────────── */

const TILES: [keyof typeof P, string, string][] = [
  ["phone", "Sitting in on calls", "From first pitch to renewal, to get one person over the line"],
  ["pen", "Rewriting the playbook", "Talk tracks, sequences and plays that have stopped working"],
  ["search", "Digging through reports", "Working out why the numbers dropped"],
  ["flask", "Testing what sticks", "New ideas, new scripts, new incentives"],
  ["repeat", "Coaching, again", "Before meetings, after them, and the team's method in every 1:1"],
];
export function Tiles() {
  return (
    <div className="tiles">
      {TILES.map(([k, h, p], i) => (
        <div key={h} className={`tile up d${i + 1}`}>
          <Svg d={P[k]} color={TEAL} />
          <h3>{h}</h3>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}

const COSTS: [keyof typeof P, string, string][] = [
  ["target", "Missed targets and renewals", "Managers chase the gap instead of the next deal or renewal."],
  ["star", "Overlooked stars", "Top performers get the least time, even though they'd bring in the most revenue with it."],
  ["exit", "Good people walk out", "People who don't improve leave, switch off or coast. Then you're hiring again."],
];
export function Costs() {
  return (
    <div className="costs">
      {COSTS.map(([k, h, p], i) => (
        <div key={h} className="cost">
          <span className={`cost-i pop d${i + 2}`}><Svg d={P[k]} color={BEHIND} /></span>
          <div><h3>{h}</h3><p>{p}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ── A week today vs with PraiseLoop ──────────────────── */

type Blk = ["b" | "t" | "g", string];
const TODAY: [string, Blk[]][] = [
  ["Mon", [["g", "Pipeline review"], ["b", "1:1 with Sam: why he's behind"], ["b", "Rewrite Dan's sequence"], ["b", "Join Omar's pitch"]]],
  ["Tue", [["b", "Sit in on Sam's demo"], ["b", "Pull reports for the team"], ["g", "Team meeting"], ["b", "Coach Dan before his call"]]],
  ["Wed", [["b", "1:1 with Dan"], ["b", "Test a new script"], ["g", "Forecast call"], ["b", "Join Omar's call"]]],
  ["Thu", [["b", "Rework the incentive idea"], ["b", "1:1 with Omar"], ["t", "Priya's big deal"], ["b", "Coach Sam, again"]]],
  ["Fri", [["b", "Reports, again"], ["g", "Forecast"], ["t", "Quick catch-up with Priya"], ["g", "Admin"]]],
];
const WITH: [string, Blk[]][] = [
  ["Mon", [["g", "Pipeline review"], ["b", "Agree 3 plans in PraiseLoop"], ["t", "Priya's big deal"], ["t", "Strategy with Jess"]]],
  ["Tue", [["t", "Join Priya's pitch"], ["g", "Team meeting"], ["b", "Sam needs you: 1:1"], ["t", "Close the Acme deal"]]],
  ["Wed", [["t", "Coach your top performers"], ["g", "Forecast call"], ["t", "Big deal review"], ["g", "Hiring"]]],
  ["Thu", [["t", "Join Jess's demo"], ["t", "Check which plans worked"], ["b", "1:1 with Dan"], ["t", "Big deal prep"]]],
  ["Fri", [["g", "Forecast"], ["t", "Celebrate the wins"], ["g", "Admin"], ["t", "Plan next quarter"]]],
];

export function WeekToggle() {
  const [wk, setWk] = useState<"today" | "with">("today");
  const [pinned, setPinned] = useState(false);
  const [day, setDay] = useState(0);
  useEffect(() => {
    if (pinned) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setWk((w) => (w === "today" ? "with" : "today")), 5000);
    return () => clearInterval(t);
  }, [pinned]);
  const pick = (w: "today" | "with") => () => { setWk(w); setPinned(true); };
  const days = wk === "today" ? TODAY : WITH;
  return (
    <div className="wk-block">
      <div className="wk-top">
        <div className="tog" role="group" aria-label="Compare weeks">
          <button type="button" className={wk === "today" ? "on" : ""} aria-pressed={wk === "today"} onClick={pick("today")}>A week today</button>
          <button type="button" className={wk === "with" ? "on" : ""} aria-pressed={wk === "with"} onClick={pick("with")}>A week with PraiseLoop</button>
        </div>
        <div className="legend">
          <span><i style={{ background: BEHIND }} />Reps who are behind</span>
          <span><i style={{ background: TEAL }} />Top performers and big deals</span>
          <span><i style={{ background: "#ECECEA" }} />Everything else</span>
        </div>
      </div>
      <div className="wk-days" role="group" aria-label="Pick a day">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
          <button key={d} type="button" className={day === i ? "on" : ""} onClick={() => setDay(i)}>{d}</button>
        ))}
      </div>
      <div className="wk-wrap">
        <div className={`wk d${day}`} key={wk}>
          {days.map(([d, blocks], di) => (
            <div className="wk-day" key={d}>
              <div className="wk-d">{d}</div>
              {blocks.map(([c, txt], bi) => (
                <div key={txt + bi} className={`blk ${c}`} style={{ animationDelay: `${(di * 4 + bi) * 0.04}s` }}>{txt}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {wk === "with" && (
        <div className="bg-chips">
          <span className="bg-k">Running in the background:</span>
          <span className="c">Spotting drops</span><span className="c">Finding why</span>
          <span className="c">Day-to-day support for each rep</span><span className="c">Measuring what worked</span>
        </div>
      )}
      <p className="fineprint"><i>Example week for a sales manager of eight reps. Not measured data.</i></p>
    </div>
  );
}

/* ── The loop ─────────────────────────────────────────── */

const STEPS: [boolean, string, string, number, number][] = [
  [false, "PraiseLoop", "Spots the drop", 50, 9],
  [true, "Your manager", "Sees who's behind and why", 85, 30],
  [true, "Your manager", "Agrees the plan", 85, 70],
  [false, "The coach", "Supports them, day to day", 50, 91],
  [true, "Your manager", "Steps in when someone needs them", 15, 70],
  [false, "PraiseLoop", "Measures whether it worked", 15, 30],
];
const RING_ARROWS = [-60, 0, 60, 120, 180, 240].map((a) => {
  const t = (a * Math.PI) / 180, cx = 460, cy = 235, rx = 390, ry = 195;
  const x = cx + rx * Math.cos(t), y = cy + ry * Math.sin(t);
  const ang = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
  return { x: x.toFixed(1), y: y.toFixed(1), ang: ang.toFixed(1) };
});
export function Loop() {
  return (
    <div>
      <div className="loop" role="img" aria-label="The PraiseLoop loop: PraiseLoop spots the drop; your manager sees who is behind and why; your manager agrees the plan; the coach supports them day to day; your manager steps in when someone needs them; PraiseLoop measures whether it worked, and the loop starts again.">
        <svg className="loop-ring" viewBox="0 0 920 470" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="460" cy="235" rx="390" ry="195" fill="none" stroke={TEAL} strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" opacity="0.55" />
          {RING_ARROWS.map((r) => <path key={r.ang} d="M -8 -7 L 8 0 L -8 7 Z" fill={TEAL} transform={`translate(${r.x},${r.y}) rotate(${r.ang})`} />)}
        </svg>
        <div className="loop-c"><strong>PraiseLoop</strong><em>The manager and PraiseLoop, working the loop together on everyone who is behind.</em></div>
        {STEPS.map(([m, who, what, x, y], i) => (
          <div key={what} className={`ln${m ? " m" : ""} s${i + 1}`} style={{ left: `${x}%`, top: `${y}%` }}>
            <span>{who}</span><b>{what}</b>
          </div>
        ))}
      </div>
      <div className="loop-key">
        <span><i style={{ borderColor: "#153F3F", background: "#153F3F" }} />Your manager</span>
        <span><i style={{ borderColor: TEAL, background: "#FFFFFF" }} />PraiseLoop and the coach</span>
      </div>
    </div>
  );
}

/* ── Team at a glance (heads of sales) ────────────────── */

export function TeamView({ lead = "manager", person = "rep" }: { lead?: string; person?: string }) {
  const dots = (x0: number, n: number, col: string, drift = false) =>
    Array.from({ length: n }, (_, i) => {
      const r = Math.floor(i / 3), c = i % 3;
      return <circle key={`${x0}-${i}`} cx={x0 + c * 46} cy={110 + r * 46} r={17} fill={col} className={drift && i === 2 ? "drift" : undefined} />;
    });
  return (
    <svg viewBox="0 0 880 300" role="img" aria-label={`An example team split into behind, on track and ahead. PraiseLoop does the legwork with the ${person}s who are behind and moves them up; the ${lead}'s time goes on the ${person}s who are on track and ahead.`} style={{ width: "100%", height: "auto", fontFamily: "inherit" }}>
      <path d="M 330 40 L 330 22 L 860 22 L 860 40" fill="none" stroke="#153F3F" strokeWidth="2.5" />
      <text x="595" y="14" textAnchor="middle" fontSize="14" fontWeight="800" fill="#153F3F">Where your {lead}&apos;s time goes</text>
      <path d="M 20 40 L 20 22 L 280 22 L 280 40" fill="none" stroke={TEAL} strokeWidth="2.5" />
      <text x="150" y="14" textAnchor="middle" fontSize="14" fontWeight="800" fill={TEAL}>Where PraiseLoop does the legwork</text>
      <text x="96" y="78" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A">Behind</text>
      <text x="436" y="78" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A">On track</text>
      <text x="736" y="78" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A1A1A">Ahead</text>
      {dots(50, 4, BEHIND, true)}
      {dots(390, 5, "#B8C4C4")}
      {dots(690, 3, TEAL)}
      <g className="nudge">
        <path d="M 200 200 L 340 200" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
        <path d="M -9 -8 L 9 0 L -9 8 Z" fill={TEAL} transform="translate(344,200)" />
      </g>
      <text x="270" y="228" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={TEAL}>moving up</text>
      <text x="20" y="282" fontSize="13.5" fill="#5F6672">The {lead} still sees every {person} and agrees every plan. PraiseLoop flags when someone who&apos;s behind needs them in person.</text>
    </svg>
  );
}

/* ── How it works, click-through ──────────────────────── */

const HOW_STEPS = ["PraiseLoop spots the drop", "It works out why", "Sarah agrees the plan", "Did it work?"];
const CS_STEPS = ["PraiseLoop spots the drop", "It works out why", "Hannah agrees the plan", "Did it work?"];

/** How it works, with a Sales / Customer success switch. */
export function HowTeams() {
  const [team, setTeam] = useState<"sales" | "cs">("sales");
  return (
    <div>
      <div className="tog how-tog" role="group" aria-label="Pick a team">
        <button type="button" className={team === "sales" ? "on" : ""} aria-pressed={team === "sales"} onClick={() => setTeam("sales")}>Sales team</button>
        <button type="button" className={team === "cs" ? "on" : ""} aria-pressed={team === "cs"} onClick={() => setTeam("cs")}>Customer success team</button>
      </div>
      {team === "sales" ? (
        <>
          <p className="lede how-lede">Sam is one of Sarah&apos;s eight reps. Click through what happened.</p>
          <HowSteps />
        </>
      ) : (
        <>
          <p className="lede how-lede">Nadia is one of Hannah&apos;s six CSMs. Click through what happened.</p>
          <CsSteps />
        </>
      )}
    </div>
  );
}

function CsSteps() {
  const [st, setSt] = useState(0);
  return (
    <div>
      <div className="stp" role="group" aria-label="Steps">
        {CS_STEPS.map((s, i) => (
          <button key={s} type="button" className={st === i ? "on" : ""} aria-pressed={st === i} onClick={() => setSt(i)}><i>{i + 1}</i>{s}</button>
        ))}
      </div>
      <div className="stp-body" key={st}>
        {st === 0 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Monday, week 1</span><h3>PraiseLoop spots the drop</h3><p>Nadia&apos;s client calls have ended with an agreed next step 3 times in her last 10. Over the previous eight weeks it was about 7 in 10. Two of her accounts reach month 8 of their contract this month.</p></div>
            <div className="panel"><RepRow initials="NK" name="Nadia K." teal status="behind" gap="Next steps agreed: 3 of her last 10 calls, against about 7 in 10 normally" /></div>
          </div></div>
        )}
        {st === 1 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Same morning</span><h3>It works out why</h3><p>She&apos;s on as many client calls as ever. What&apos;s changed is how they end: fewer finish with an agreed next step, and renewal conversations are starting late.</p></div>
            <div className="panel evidence">
              <div className="ev"><span>Client calls held this month</span><b className="ok">10, her normal</b></div>
              <div className="ev"><span>Renewal conversation started by month 8</span><b className="wn">1 of 4</b></div>
              <div className="ev"><span>Next step agreed with the client</span><b className="wn">3 of 10</b></div>
            </div>
          </div></div>
        )}
        {st === 2 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Tuesday</span><h3>Hannah agrees the plan. Nadia gets one thing to try.</h3><p>A two-week plan, built from what worked in Nadia&apos;s own best quarters. Hannah approves it in one tap between escalations.</p></div>
            <div className="walk-stack">
              <Coach label="Coach, to Nadia" text="Your clients are hearing from you. The calls are ending without a next step. For the next two weeks, close every call with one agreed next step and a date." primary="Start this week" secondary="Why this?" />
              <span className="sub">Hannah ran this plan · Tue 9:02 · she&apos;ll see how it&apos;s going each morning</span>
            </div>
          </div></div>
        )}
        {st === 3 && (
          <div className="later">
            <span className="walk-when">Three weeks later</span>
            <h3>Every plan gets an answer, against the CSM&apos;s own normal.</h3>
            <DidItWork d={NADIA} />
            <p>Renewals land in lumps, so PraiseLoop measures the habit and the stage movement first, and reports renewals alongside as they come in.</p>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-ghost stp-next" onClick={() => setSt((s) => (s + 1) % 4)}>{st === 3 ? "Start again" : "Next step"}</button>
    </div>
  );
}

export function HowSteps() {
  const [st, setSt] = useState(0);
  return (
    <div>
      <div className="stp" role="group" aria-label="Steps">
        {HOW_STEPS.map((s, i) => (
          <button key={s} type="button" className={st === i ? "on" : ""} aria-pressed={st === i} onClick={() => setSt(i)}><i>{i + 1}</i>{s}</button>
        ))}
      </div>
      <div className="stp-body" key={st}>
        {st === 0 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Monday, week 1</span><h3>PraiseLoop spots the drop</h3><p>Sam has closed 2 of his last 9 proposals. Over the previous eight weeks he was closing about 4 in 10. Nobody has flagged it yet.</p></div>
            <div className="panel"><RepRow initials="SA" name="Sam A." teal status="behind" gap="Conversion at proposal: 2 of his last 9, against about 4 in 10 normally" /></div>
          </div></div>
        )}
        {st === 1 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Same morning</span><h3>It works out why</h3><p>His pipeline is fine and his proposals go out on time. What&apos;s changed is what happens next: 6 of the 9 had no decision call booked, and those deals went quiet.</p></div>
            <div className="panel evidence">
              <div className="ev"><span>Pipeline against target</span><b className="ok">1.4x, healthy</b></div>
              <div className="ev"><span>Proposals sent within 2 days of the demo</span><b className="ok">9 of 9</b></div>
              <div className="ev"><span>Decision call booked after the proposal</span><b className="wn">3 of 9</b></div>
            </div>
          </div></div>
        )}
        {st === 2 && (
          <div className="walk"><div className="walk-i">
            <div><span className="walk-when">Tuesday</span><h3>Sarah agrees the plan. Sam gets one thing to try.</h3><p>A two-week plan, built from what worked in Sam&apos;s own best months. Sarah approves it in one tap on her way into a meeting.</p></div>
            <div className="walk-stack">
              <Coach label="Coach, to Sam" text="Your proposals are good. The deals are going quiet after them. For the next two weeks, try booking the decision call before you hang up." primary="Start this week" secondary="Why this?" />
              <span className="sub">Sarah ran this plan · Tue 9:02 · she&apos;ll see how it&apos;s going each morning</span>
            </div>
          </div></div>
        )}
        {st === 3 && (
          <div className="later">
            <span className="walk-when">Three weeks later</span>
            <h3>Every plan gets an answer, against the rep&apos;s own normal.</h3>
            <DidItWork />
            <p>It says &ldquo;early signal&rdquo; because three weeks is three weeks. If the number hadn&apos;t moved, it would have said so and suggested something else.</p>
          </div>
        )}
      </div>
      <button type="button" className="btn btn-ghost stp-next" onClick={() => setSt((s) => (s + 1) % 4)}>{st === 3 ? "Start again" : "Next step"}</button>
    </div>
  );
}

/* ── AI chat tools vs PraiseLoop ──────────────────────── */

export function Versus() {
  const left = ["Waits for you to ask the right question", "Only sees what you paste in", "Doesn't know each person's normal", "Gives advice, then it's down to you"];
  const right = ["Spots the drop on its own, every day", "Connected to your team's data all the time", "Measures everyone against their own best weeks", "Agrees a plan with the manager, supports the person, and checks it worked"];
  return (
    <div className="vs">
      <div className="vs-col vs-them"><h3>A chat tool like ChatGPT</h3>{left.map((t) => <div className="vs-row" key={t}><Svg d={P.x} color="#9CA3AF" size={22} /><span>{t}</span></div>)}</div>
      <div className="vs-col vs-us"><h3>PraiseLoop</h3>{right.map((t) => <div className="vs-row" key={t}><Svg d={P.check} color="#9FD0D0" size={22} /><span>{t}</span></div>)}</div>
    </div>
  );
}

/* ── Integrations ─────────────────────────────────────── */

const LIVE = ["HubSpot", "Fathom"];
const SOON = ["Salesforce", "Gmail", "Outlook", "Google Calendar", "Slack", "Microsoft Teams"];
export function Integrations() {
  return (
    <div className="int-groups">
      <div className="int-grp">
        <span className="int-lab">Live today</span>
        <div className="int-row">{LIVE.map((t) => <span className="chip live" key={t}>{t}</span>)}</div>
      </div>
      <div className="int-grp">
        <span className="int-lab">Coming soon, or connected on request</span>
        <div className="int-row">{SOON.map((t) => <span className="chip soon" key={t}>{t}</span>)}</div>
      </div>
    </div>
  );
}

/* ── Who it's for (home) ──────────────────────────────── */

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
const BARS = [42, 64, 52, 78, 100];
export function TeamCards() {
  return (
    <div className="teams">
      <Link className="team-card up d1" href="/for/heads-of-sales">
        <div className="team-viz">
          <div className="bars" aria-hidden="true">
            {BARS.map((h, i) => <span key={h} className={`bar-g${i === BARS.length - 1 ? " hi" : ""}`} style={{ height: `${h}%`, animationDelay: `${0.1 + i * 0.1}s` }} />)}
          </div>
          <small>Every rep&apos;s number, and why it moved this week</small>
        </div>
        <h3>Sales teams</h3>
        <p>Pipeline, proposals and quota. PraiseLoop finds why each rep&apos;s number moved and coaches the fix.</p>
        <div className="team-roles"><span>Heads of sales</span><span>Sales managers</span><span>Reps</span></div>
        <span className="team-go">For sales teams <Arrow /></span>
      </Link>
      <Link className="team-card up d2" href="/for/cs-leaders">
        <div className="team-viz">
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="32" cy="32" r="26" fill="none" stroke="#E4E4E1" strokeWidth="7" />
            <circle className="ring-p" cx="32" cy="32" r="26" fill="none" stroke={TEAL} strokeWidth="7" strokeLinecap="round" transform="rotate(-90 32 32)" />
            <circle className="ring-dot" cx="32" cy="32" r="6" fill="#F26522" />
          </svg>
          <small>Every account in each CSM&apos;s book, and where it&apos;s heading</small>
        </div>
        <h3>Customer success teams</h3>
        <p>Renewals, expansion and the accounts in each CSM&apos;s book. PraiseLoop shows which CSM needs you, and what to change.</p>
        <div className="team-roles"><span>CS leaders</span><span>CSMs</span></div>
        <span className="team-go">For customer success teams <Arrow /></span>
      </Link>
    </div>
  );
}
