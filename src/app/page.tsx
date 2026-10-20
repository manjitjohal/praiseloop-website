import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { Coach, DidItWork, ExampleData, ManagerOverview, PhoneMock, RepRow } from "@/components/marketing/mocks";
import { BOOKING_URL } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What can reps see?",
    a: "Their own numbers, their coach, their plan and how far they are from target. Check-ins stay private unless they share them. If you run contests, reps see those too, and you decide what goes on them.",
  },
  {
    q: "Does it replace our commission plan?",
    a: "No. We need to know where your targets and accelerator thresholds sit, but we never calculate commission.",
  },
  {
    q: "What do you need from our CRM?",
    a: "Read-only access to deals, stages, stage history, activity and deal owners. We don't write anything back to your CRM.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live within two weeks. Connecting the CRM takes an afternoon. The rest is checking your data and loading targets, and that check usually tells you something about your pipeline on day one.",
  },
  {
    q: "Where is our data held?",
    a: <>In UK or EU data centres by default, encrypted in transit and at rest. More on our <Link className="textlink" href="/about#security">security and data</Link> page.</>,
  },
  {
    q: "Does it work for teams outside sales?",
    a: "We're focused on sales teams for now.",
  },
];

export default function Home() {
  return (
    <MarketingPage>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Turn sales underperformance into <span className="kw">revenue</span>.</h1>
            <p className="hero-line">PraiseLoop is the AI performance coach for sales teams. It diagnoses why each rep is falling short, coaches them back to target, and measures the revenue impact. Managers get the intelligence; the agent closes the gap.</p>
            <p className="hero-sub">Your managers get the intelligence. The agent does the coaching.</p>
            <div className="actions">
              <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo <Icon.Arrow /></Link>
              <a className="textlink" href="#how">See how it works with one rep</a>
            </div>
            <p className="hero-note">Runs on the HubSpot or Salesforce data you already have.</p>
          </div>
          <div className="hero-media">
            <div className="hero-mock">
              <ManagerOverview reasons={false} />
              <PhoneMock />
            </div>
          </div>
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="split top">
            <h2>Most of your number sits with the reps nobody has time for.</h2>
            <div className="prose">
              <p>Your top performers mostly manage themselves. New starters get onboarding. The reps in the middle get a monthly 1:1 and a dashboard, and that&apos;s usually where the quarter is won or lost.</p>
              <p>It isn&apos;t that managers don&apos;t believe in coaching. They just don&apos;t have the hours to do it for a whole team, every week.</p>
            </div>
          </div>
          <figure className="founder">
            <blockquote className="quote">“Every team I&apos;ve sold into had the same story. The reps who got better were the ones someone sat down with every week, and there were never enough weeks to go round. We built PraiseLoop so it stops depending on whose team you&apos;re in.”</blockquote>
            <figcaption className="quote-by"><span className="av g s">AV</span>Ash Vipani, CEO and co-founder</figcaption>
          </figure>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="h2-gap wide">The coach works with every rep, every day, and keeps the manager posted.</h2>
          <div className="grid2">
            <div className="role dark">
              <span className="role-k">For the manager</span>
              <p className="role-lead">Sarah opens it at half eight. She sees all eight reps, which two have slipped and why, and a plan for each that she can start with one tap.</p>
              <p>If she trusts the coach with a rep, she can let it run their plans without checking in each time. When she does sit down with Sam, she already knows what&apos;s been tried.</p>
            </div>
            <div className="role mint">
              <span className="role-k">For the rep</span>
              <p className="role-lead">Sam sees how far he is from target and from his next accelerator, and the two or three things worth doing today.</p>
              <p>Before a call he can ask the coach what it knows about the deal. If it checks in on how he&apos;s doing, he decides what Sarah gets to see.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="warm" id="how">
        <div className="container">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>How it works, with one rep.</h2>
            <p className="lede">Sam is one of Sarah&apos;s eight reps. Here&apos;s what happened over three weeks. <ExampleData /></p>
          </div>
          <div className="walk">
            <div className="walk-i">
              <div>
                <span className="walk-when">Monday, week 1</span>
                <h3>The coach spots a drop</h3>
                <p>Sam has closed 2 of his last 9 proposals. Over the previous eight weeks he was closing about 4 in 10. Nobody has flagged it yet.</p>
              </div>
              <div className="panel">
                <RepRow initials="SA" name="Sam A." teal status="behind" gap="Conversion at proposal: 2 of his last 9, against about 4 in 10 normally" />
              </div>
            </div>
            <div className="walk-i">
              <div>
                <span className="walk-when">Same morning</span>
                <h3>It works out why</h3>
                <p>His pipeline is fine and his proposals go out on time. What&apos;s changed is what happens next: 6 of the 9 had no decision call booked, and those deals went quiet.</p>
              </div>
              <div className="panel evidence">
                <div className="ev"><span>Pipeline against target</span><b className="ok">1.4x, healthy</b></div>
                <div className="ev"><span>Proposals sent within 2 days of the demo</span><b className="ok">9 of 9</b></div>
                <div className="ev"><span>Decision call booked after the proposal</span><b className="wn">3 of 9</b></div>
              </div>
            </div>
            <div className="walk-i">
              <div>
                <span className="walk-when">Tuesday</span>
                <h3>Sarah runs the plan, Sam gets one thing to try</h3>
                <p>A two-week plan, built from what worked in Sam&apos;s own best months. Sarah approves it in one tap on her way into a meeting.</p>
              </div>
              <div className="walk-stack">
                <Coach
                  label="Coach, to Sam"
                  text="Your proposals are good. The deals are going quiet after them. For the next two weeks, try booking the decision call before you hang up."
                  primary="Start this week"
                  secondary="Why this?"
                />
                <span className="sub">Sarah ran this plan · Tue 9:02 · she&apos;ll see how it&apos;s going each morning</span>
              </div>
            </div>
          </div>
          <div className="later">
            <span className="walk-when">Three weeks later</span>
            <h3>Did it work? Every plan gets an answer, measured against the rep&apos;s own last eight weeks.</h3>
            <DidItWork />
            <p>It says &ldquo;early signal&rdquo; because three weeks is three weeks. If the number hadn&apos;t moved, it would have said so and suggested something else. On the Enterprise pack, Sam&apos;s closed deals also trigger a reward from the budget you set.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="split top">
            <div className="prose">
              <h3>Your reps will ask if it&apos;s watching them.</h3>
              <p>It isn&apos;t recording calls. PraiseLoop reads the same CRM data their manager can already see.</p>
              <p>Nobody gets labelled either. The app shows whether someone is ahead of target, on track or behind it, and when the coach checks in with a rep, the rep decides what gets shared.</p>
            </div>
            <div className="prose">
              <h3>Your CRM shows what happened. PraiseLoop shows <span className="kw">why</span>.</h3>
              <p>Your CRM has the deals, your call tool has the calls, enablement has the content. PraiseLoop works on the people: why someone&apos;s numbers moved, and what to do about it.</p>
              <div className="chips">
                <span className="chip live"><Icon.Check /> HubSpot</span>
                <span className="chip live"><Icon.Check /> Salesforce</span>
                <span className="chip">Slack</span>
                <span className="chip">Microsoft Teams</span>
              </div>
              <p className="fineprint">Live today: HubSpot and Salesforce. Other CRMs on request.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <h2 className="h2-gap wide">Questions we get asked</h2>
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
