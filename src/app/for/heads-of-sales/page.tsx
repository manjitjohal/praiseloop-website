import type { Metadata } from "next";
import AudiencePage from "@/components/marketing/AudiencePage";
import { ExampleData, Kpi, RepRow } from "@/components/marketing/mocks";
import { TeamView as TeamSplit } from "@/components/marketing/visuals";

export const metadata: Metadata = {
  title: "For heads of sales · PraiseLoop",
  description:
    "Your best reps' habits, coached into the rest of the team. Every rep gets coached, whoever their manager is, and you see which plans moved the number.",
};

function TeamView() {
  return (
    <div className="app">
      <div className="app-top">
        <span className="av g">HS</span>
        <div>
          <div className="hello">Sales team · Q4</div>
          <div className="sub">4 managers · 38 reps</div>
        </div>
        <ExampleData />
      </div>
      <div className="kpis">
        <Kpi l="Team to target" v="81%" d="+4 pts" />
        <Kpi l="Plans run" v="27" d="this quarter" />
        <Kpi l="Clear result" v="11" d="6 early signal" />
        <Kpi l="Reps coached" v="38/38" d="every week" />
      </div>
      <div className="panel">
        <div className="panel-h"><span>By manager</span><span className="sub">plans working</span></div>
        <RepRow initials="SM" name="Sarah M." status="ahead" pill="5 of 6" gap="Proposal-stage plans working best" />
        <RepRow initials="KH" name="Khalid H." teal status="ontrack" pill="3 of 5" gap="Activity plans working, 2 too early to call" />
        <RepRow initials="LB" name="Lena B." status="ontrack" pill="2 of 4" gap="Pipeline-quality plans need a second go" />
        <RepRow initials="TW" name="Tom W." teal status="behind" pill="1 of 6" gap="3 plans approved but not started" />
      </div>
    </div>
  );
}

export default function HeadsOfSalesPage() {
  return (
    <AudiencePage
      title={<>Turn the middle of your sales team into <span className="kw">top performers</span>.</>}
      lede="Your best reps' habits, coached into the rest of the team. Every rep gets coached, whoever their manager is. You get one view of which plans moved the number, by manager and by type of problem."
      media={<TeamView />}
      extra={
        <section>
          <div className="container">
            <div className="head">
              <span className="eyebrow">Across every team</span>
              <h2>Where your managers&apos; <span className="kw">time</span> goes.</h2>
              <p className="lede">PraiseLoop does the legwork with the reps who are behind, in every team. Your managers spend their time where the revenue is.</p>
            </div>
            <TeamSplit />
          </div>
        </section>
      }
      problem={{
        h: <>Some of your managers coach <span className="kw">every week</span>. Some haven&apos;t run a proper 1:1 since the summer.</>,
        paras: [
          "Results tend to follow the same split. From the CRM you can see who's behind, but you can't see what anyone did about it, or whether it helped.",
          "Meanwhile your forecast keeps leaning on the same handful of reps who are close every quarter and don't quite get there.",
        ],
      }}
      points={[
        { h: "Every rep, every week", p: "Including the reps whose manager is flat out with hiring or a big deal." },
        { h: "What's working, team-wide", p: "Which plans move numbers, broken down by manager and by the kind of gap." },
        { h: "Something to show at renewal", p: "Before and after for every plan, on each rep's own baseline." },
      ]}
      objection={{
        q: "Will my managers actually use it?",
        a: "It comes to them in the morning with what needs them, and it takes about five minutes. The coach handles the day-to-day with each rep, so you're not asking managers to coach more. You're asking them to approve a plan and step in when it matters.",
      }}
    />
  );
}
