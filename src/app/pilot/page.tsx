import type { Metadata } from "next";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { BOOKING_URL } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Pilot · PraiseLoop",
  description:
    "Try PraiseLoop for 90 days on your own sales team. On day one we agree the number that would make it worth it. On day 90 we show you where it landed.",
};

const TIMELINE = [
  { when: "Week 0", h: "Data check", p: "We connect your CRM, check its health, and load targets and incentive thresholds. You'll usually learn something here." },
  { when: "Week 1", h: "Half the team goes live", p: "Managers get their morning overview. Their reps get a coach." },
  { when: "Week 4", h: "The other half joins", p: "Starting in two halves means any difference between them is down to the coach, not the time of quarter." },
  { when: "Day 90", h: "Did it work?", p: "Behaviour, stage movement and the number you chose, each against the rep's own baseline.", end: true },
];

const FAQ = [
  { q: "What does it cost?", a: "The pilot is a fixed fee, agreed up front. If you carry on after day 90, it comes off your first year." },
  { q: "Do we need IT involved?", a: "Only briefly. Someone with admin access to your CRM for about an hour, to connect it and check permissions." },
  { q: "Can we pick which reps are in it?", a: "Yes, within reason. We'd ask for at least two managers' teams, so there's something to compare." },
  { q: "How much time does it take?", a: "Connecting the CRM and agreeing the measure, then about five minutes a day for managers." },
  { q: "What happens at day 90?", a: "You see the results and decide. If it's working, you move to an annual Sales or Enterprise pack." },
];

export default function PilotPage() {
  return (
    <MarketingPage cta={{ title: <>Talk to us about a <span className="kw">pilot</span>.</>, body: "Twenty minutes to see whether your team's a fit, and which number we'd measure." }}>
      <section className="hero">
        <div className="container hero-solo">
          <h1>Try it for <span className="kw">90 days</span> on your own team.</h1>
          <p className="lede">We&apos;re onboarding our first sales teams now. On day one we agree the number that would make it worth it. On day 90 we show you where it landed.</p>
          <div className="actions">
            <Link className="btn btn-primary" href={BOOKING_URL}>Talk to us about a pilot <Icon.Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="prose" style={{ marginBottom: 44 }}>
            <h2>What the <span className="kw">90 days</span> look like</h2>
            <p>Ninety days is long enough to see reps change what they do, and to see that start to show up in the stage it should affect. We&apos;ll report closed revenue too, but we won&apos;t claim it all for the coach.</p>
          </div>
          <ol className="tl">
            {TIMELINE.map((t) => (
              <li key={t.when} className={`tl-i${t.end ? " or" : ""}`}>
                <span className="tl-w">{t.when}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="container split top">
          <div className="prose">
            <h2>Who it <span className="kw">suits</span></h2>
            <p>Sales teams with more than one manager, where the head of sales wants everyone coaching the same way. That usually means somewhere between 20 and 100 reps.</p>
            <p>Customer success teams too. If your renewals run through a pipeline in your CRM, we measure the habits and the stage movement first, and report renewals alongside as they come in.</p>
            <p><strong>Start with managers only.</strong> If you&apos;d rather not put a coach in front of reps straight away, the pilot can start with managers: they get the morning overview and the plans, and the rep side switches on when you&apos;re ready.</p>
          </div>
          <div className="plain">
            <div>
              <h3>A CRM we can read</h3>
              <p>HubSpot today. Other CRMs connected on request.</p>
            </div>
            <div>
              <h3>Targets and an incentive plan</h3>
              <p>We need to know where the lines are. We don&apos;t calculate commission.</p>
            </div>
            <div>
              <h3>Someone who owns it</h3>
              <p>A sales leader who agrees the measure on day one and looks at it on day 90.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <h2 className="h2-gap">Pilot questions</h2>
          <div className="qa">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
