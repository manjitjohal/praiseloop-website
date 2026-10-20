/**
 * Coded mock-ups of the product (no screenshots), shared by the marketing
 * pages. Every one carries an "Example data" label: the names and numbers are
 * illustrative, not customer results.
 */

import { Icon } from "../site/icons";

export const ExampleData = () => <span className="example">Example data</span>;

const Dot = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="5" fill="currentColor" /></svg>
);

export function Kpi({ l, v, d, down }: { l: string; v: string; d: string; down?: boolean }) {
  return (
    <div className="kpi">
      <span className="kpi-l">{l}</span>
      <span className="kpi-v">{v}</span>
      <span className={`kpi-d${down ? " dn" : ""}`}>{d}</span>
    </div>
  );
}

export function Coach({ label = "Your coach", text, primary, secondary }: { label?: string; text: string; primary: string; secondary: string }) {
  return (
    <div className="coach">
      <div className="coach-h"><span className="spark"><Dot /></span>{label}</div>
      <p>{text}</p>
      <div className="row"><span className="cbtn o">{primary}</span><span className="cbtn g">{secondary}</span></div>
    </div>
  );
}

type Status = "ahead" | "ontrack" | "behind";
const STATUS_LABEL: Record<Status, string> = { ahead: "Ahead of target", ontrack: "On track", behind: "Behind target" };

export type Rep = { initials: string; name: string; teal?: boolean; status: Status; pill?: string; gap?: string };

export function RepRow({ initials, name, teal, status, pill, gap }: Rep) {
  return (
    <div className="rep">
      <span className={`av s${teal ? " t" : ""}`}>{initials}</span>
      <span className="nm">{name}</span>
      <span className={`pill ${status}`}>{pill ?? STATUS_LABEL[status]}</span>
      {gap && <span className="gap">{gap}</span>}
    </div>
  );
}

const TEAM: Rep[] = [
  { initials: "PK", name: "Priya K.", status: "ahead", gap: "Rising: proposals up on her normal. Coach is sharing what changed with the team." },
  { initials: "SA", name: "Sam A.", teal: true, status: "behind", gap: "Conversion at proposal: 2 of 9 closed vs 4 of 10 normal. Plan ready." },
  { initials: "OR", name: "Omar R.", status: "ontrack", gap: "Drop from normal: meetings booked down 3 weeks running. Check-in sent." },
  { initials: "JL", name: "Jess L.", teal: true, status: "ontrack", gap: "Pipeline quality: 6 deals with no dated next step." },
  { initials: "DM", name: "Dan M.", status: "behind", gap: "Activity: calls down 30% on his 8-week baseline. Plan running, day 6." },
];

/** A sales manager's Monday morning: team numbers, the coach's read, every rep. */
export function ManagerOverview({ reps = 4, reasons = true }: { reps?: number; reasons?: boolean }) {
  return (
    <div className="app">
      <div className="app-top">
        <span className="av">SM</span>
        <div>
          <div className="hello">Good morning, Sarah</div>
          <div className="sub">Week 11 of Q4 · two weeks to close the quarter</div>
        </div>
        <ExampleData />
      </div>
      <div className="kpis">
        <Kpi l="Team to target" v="84%" d="+6 pts this month" />
        <Kpi l="Meetings booked" v="46" d="+12% on normal" />
        <Kpi l="Proposal to close" v="22%" d="-5 pts on normal" down />
        <Kpi l="Plans running" v="4" d="2 working" />
      </div>
      <Coach
        text="Proposals are stalling, not pipeline. Sam and Dan are closing fewer proposals than their own normal. I've drafted a two-week plan for each. Nothing here needs a 1:1 yet."
        primary="Run the plans"
        secondary="See the evidence"
      />
      <div className={`panel${reasons ? "" : " compact"}`}>
        <div className="panel-h"><span>Your team, rep by rep</span><span className="sub">8 reps</span></div>
        {TEAM.slice(0, reps).map((r) => <RepRow key={r.name} {...r} gap={reasons ? r.gap : undefined} />)}
      </div>
    </div>
  );
}

/** The rep's coach on a phone, overlapping the manager view in the home hero. */
export function PhoneMock() {
  return (
    <div className="phone">
      <div className="phone-top">
        <span className="sub">Your coach</span>
        <span className="phone-hello">Today, Sam</span>
        <span className="sub phone-meta">Month to target · 74%</span>
        <div className="bar"><span style={{ width: "74%" }} /></div>
        <span className="phone-note">1 deal from your next accelerator</span>
      </div>
      <div className="phone-body">
        <span className="lab">Today&apos;s focus</span>
        <div className="mini"><b>Acme:</b> proposal sent 5 days ago. Book the decision call before noon.</div>
        <div className="mini"><b>2pm call:</b> ask the budget question early. It&apos;s what moved your best month.</div>
        <div className="mini ask"><Dot size={14} /> Ask your coach anything</div>
      </div>
    </div>
  );
}

/** A rep's day: distance to target and the next accelerator, the plan, help before a call. */
export function RepToday() {
  return (
    <div className="app narrow">
      <div className="app-top">
        <span className="av t">SA</span>
        <div>
          <div className="hello">Today, Sam</div>
          <div className="sub">Tuesday · 9 working days left this month</div>
        </div>
        <ExampleData />
      </div>
      <div className="panel target">
        <div className="target-h"><span>Month to target</span><span>74%</span></div>
        <div className="bar lt"><span style={{ width: "74%" }} /></div>
        <div className="target-note"><b>1 deal from your next accelerator.</b> Acme or Northwind would get you there.</div>
      </div>
      <Coach
        text="Your proposals are good. The gap is after them: 6 of your last 9 had no decision call booked. Try booking it before you hang up, for two weeks. I'll show you if it works."
        primary="Start this week"
        secondary="Why this?"
      />
      <div className="mini note">
        <span className="lab">Before your 2pm call</span>
        <div>Northwind have asked about pricing twice. Ask who signs off before you send numbers.</div>
      </div>
    </div>
  );
}

/** One plan's result: the behaviour it asked for, the number it moved, against the rep's own baseline. */
export function DidItWork() {
  return (
    <div className="diw">
      <div className="diw-h">
        <span className="av t">SA</span>
        <div>
          <div className="diw-title">Sam A. · Did it work?</div>
          <div className="sub">Plan: book the decision call before you hang up on every proposal · 3 weeks</div>
        </div>
        <ExampleData />
      </div>
      <div className="diw-wide">
        <div className="diw-nums">
          <div className="ba-box">
            <span className="kpi-l">What he did differently</span>
            <div className="ba-v"><span className="was"><span className="sr-only">from </span>31%</span><span className="sr-only"> to </span>78%</div>
            <span className="sub">of proposals with a decision call booked</span>
          </div>
          <div className="ba-box">
            <span className="kpi-l">What it moved</span>
            <div className="ba-v"><span className="was"><span className="sr-only">from </span>18%</span><span className="sr-only"> to </span>27%</div>
            <span className="sub">proposal to close, against his own last 8 weeks</span>
          </div>
          <span className="conf"><Icon.Check /> Early signal · 3 weeks of data</span>
        </div>
        <svg className="chart" viewBox="0 0 480 170" role="img" aria-label="Proposal to close rate for Sam: baseline around 18 percent, rising to 27 percent after the plan started">
          <rect x="0" y="0" width="480" height="170" fill="#FFFFFF" />
          <line x1="30" y1="140" x2="470" y2="140" stroke="#ECECEA" />
          <rect x="250" y="10" width="220" height="130" fill="#E8F0F0" opacity="0.6" />
          <text x="258" y="26" fontSize="11" fontWeight="700" fill="#153F3F">PLAN RUNNING</text>
          <line x1="30" y1="96" x2="470" y2="96" stroke="#9CA3AF" strokeDasharray="5 5" />
          <text x="34" y="88" fontSize="11" fill="#5F6672">His 8-week normal · 18%</text>
          <polyline points="40,98 80,92 120,104 160,100 200,108 240,112 280,96 320,82 360,74 400,66 440,60" fill="none" stroke="#1B6B6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="440" cy="60" r="5" fill="#F26522" stroke="#FFFFFF" strokeWidth="2" />
          <text x="408" y="48" fontSize="12" fontWeight="800" fill="#1A1A1A">27%</text>
          <text x="40" y="160" fontSize="10.5" fill="#5F6672">8 weeks ago</text>
          <text x="420" y="160" fontSize="10.5" fill="#5F6672">This week</text>
        </svg>
      </div>
    </div>
  );
}
