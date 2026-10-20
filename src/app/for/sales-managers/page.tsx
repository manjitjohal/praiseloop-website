import type { Metadata } from "next";
import AudiencePage from "@/components/marketing/AudiencePage";
import { ManagerOverview } from "@/components/marketing/mocks";
import { WeekToggle } from "@/components/marketing/visuals";

export const metadata: Metadata = {
  title: "For sales managers · PraiseLoop",
  description:
    "Know why a rep is behind, and how to get them back on target, before the 1:1. Five minutes in the morning shows you every rep, what's changed and why.",
};

export default function SalesManagersPage() {
  return (
    <AudiencePage
      title={<>Know why a rep is behind, and how to get them back on target, <span className="kw">before the 1:1</span>.</>}
      lede="Five minutes in the morning shows you every rep, what's changed and why, with a plan ready for anyone who's slipped."
      media={<ManagerOverview />}
      extra={
        <section>
          <div className="container">
            <div className="head">
              <span className="eyebrow">Your week</span>
              <h2>Same team. A different <span className="kw">week</span>.</h2>
              <p className="lede">Switch between a typical week today and the same week with PraiseLoop doing the legwork.</p>
            </div>
            <WeekToggle />
          </div>
        </section>
      }
      problem={{
        h: <>You can see Sam is behind. The dashboard can&apos;t tell you <span className="kw">why</span>.</>,
        paras: [
          "Maybe it's his proposals going quiet after they're sent. Maybe he's just booking fewer meetings. Working it out takes twenty minutes of the 1:1, and there are five left to do anything about it.",
          "And the reps who aren't in trouble or on fire mostly don't get coached at all.",
        ],
      }}
      points={[
        { h: "One tap to run a plan", p: "Or let the coach run plans for a rep you trust it with, and just keep an eye on them." },
        { h: "1:1s with the homework done", p: "What's been tried with each rep and what moved, before you sit down." },
        { h: "Ask it anything", p: "“Who's closest to an accelerator this month?” answered from your own data." },
      ]}
      objection={{
        q: "I already have dashboards. Why would I need this?",
        a: "Dashboards tell you what happened. PraiseLoop tells you why for each rep, then does something about it: a plan, shared with the rep, and a check a few weeks later on whether it helped. You still make the calls. It does the legwork.",
      }}
    />
  );
}
