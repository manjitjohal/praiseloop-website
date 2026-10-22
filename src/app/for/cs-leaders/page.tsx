import type { Metadata } from "next";
import AudiencePage from "@/components/marketing/AudiencePage";
import { ExampleData, Kpi, RepRow } from "@/components/marketing/mocks";
import { TeamView as TeamSplit } from "@/components/marketing/visuals";

export const metadata: Metadata = {
  title: "For customer success leaders · AI coaching for CS teams · PraiseLoop",
  description:
    "Customer success coaching from the data you already have. Your best CSMs' habits, coached into the rest of the team, with one view of which plans moved renewals.",
};

function CsTeamView() {
  return (
    <div className="app">
      <div className="app-top">
        <span className="av g">CS</span>
        <div>
          <div className="hello">Customer success · Q4</div>
          <div className="sub">3 team leads · 18 CSMs</div>
        </div>
        <ExampleData />
      </div>
      <div className="kpis">
        <Kpi l="Renewals on track" v="86%" d="+3 pts" />
        <Kpi l="Plans run" v="14" d="this quarter" />
        <Kpi l="Clear result" v="6" d="4 early signal" />
        <Kpi l="CSMs coached" v="18/18" d="every week" />
      </div>
      <div className="panel">
        <div className="panel-h"><span>By team lead</span><span className="sub">plans working</span></div>
        <RepRow initials="HR" name="Hannah R." status="ahead" pill="4 of 5" gap="Next-step plans working best" />
        <RepRow initials="YA" name="Yusuf A." teal status="ontrack" pill="3 of 4" gap="Early renewal plans working, 1 too early to call" />
        <RepRow initials="CD" name="Chloe D." status="behind" pill="1 of 4" gap="2 plans approved but not started" />
      </div>
    </div>
  );
}

const MEASURES = [
  { h: "Next steps agreed", p: "How many client calls end with a clear next step and a date." },
  { h: "Accounts moving forward", p: "How often each account moves to its next stage." },
  { h: "Renewals started early", p: "Whether the renewal conversation starts around month 8, or at the last minute." },
  { h: "Early renewals and renewals at risk", p: "Which accounts renewed ahead of time, and which need attention now." },
];

export default function CsLeadersPage() {
  return (
    <AudiencePage
      eyebrow="For CS leaders"
      title={<>Your best CSMs already know how to <span className="kw">keep an account</span>. PraiseLoop coaches it into the rest of the team.</>}
      lede="Every CSM gets coached, whoever their team lead is. You get one view of which plans moved renewals, by team and by type of problem."
      media={<CsTeamView />}
      problem={{
        h: <>Health scores tell you which accounts are at risk. PraiseLoop shows your team <span className="kw">what to do differently</span>.</>,
        paras: [
          "Your tools can flag the account. They can't tell you why one CSM has renewals moving months ahead while another finds out at the renewal date. That gap is habits, and habits can be coached.",
          "Meanwhile your team leads spend the week on escalations, and the CSMs who are doing well get the least of their time.",
        ],
      }}
      extra={
        <>
          <section>
            <div className="container">
              <div className="head">
                <span className="eyebrow">Across every team</span>
                <h2>Where your team leads&apos; <span className="kw">time</span> goes.</h2>
                <p className="lede">PraiseLoop does the legwork with the CSMs who are behind, in every team. Your leads spend their time on the accounts and people that matter most.</p>
              </div>
              <TeamSplit lead="team lead" person="CSM" />
            </div>
          </section>
          <section className="warm2">
            <div className="container">
              <div className="head">
                <span className="eyebrow">Works from your renewals pipeline</span>
                <h2>Already tracking renewals in your CRM? <span className="kw">That&apos;s enough</span>.</h2>
                <p className="lede">PraiseLoop reads your renewals pipeline the same way it reads new business. Here&apos;s what it looks at for each CSM, against their own normal.</p>
              </div>
              <div className="plain">
                {MEASURES.map((m) => (
                  <div key={m.h}><h3>{m.h}</h3><p>{m.p}</p></div>
                ))}
              </div>
            </div>
          </section>
        </>
      }
      points={[
        { h: "Every CSM, every week", p: "Including the CSMs whose lead is tied up with an escalation." },
        { h: "What's working, team-wide", p: "Which plans move renewals, broken down by team lead and by the kind of gap." },
        { h: "Something to show the board", p: "Before and after for every plan, on each CSM's own baseline." },
      ]}
      objection={{
        q: "Will my team leads actually use it?",
        a: "It comes to them in the morning with what needs them, and it takes about five minutes. The coach handles the day-to-day with each CSM, so you're not asking leads to coach more. You're asking them to approve a plan and step in when it matters.",
      }}
    />
  );
}
