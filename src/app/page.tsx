import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { ExampleData, Kpi, RepRow } from "@/components/marketing/mocks";
import { Costs, HowTeams, Integrations, LoopLanes, RevenueTeams, Tiles, Versus, WeekToggle } from "@/components/marketing/visuals";
import { BOOKING_URL } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Will my managers stop looking after people who are behind?",
    a: "No. Managers still see everyone on the team and agree every plan. The coach works in steps: a nudge first, then a two-week plan the manager agrees, and only if nothing moves does it ask the manager for a 1:1. The manager stays in charge throughout.",
  },
  {
    q: "What can reps and CSMs see?",
    a: "Their own numbers, their coach, their plan and how far they are from target. Check-ins stay private unless they choose to share them.",
  },
  {
    q: "What do you need from our CRM?",
    a: "Read-only access to deals, stages, stage history, activity and owners in the pipelines you connect, such as new business and renewals. We don't write anything back to your CRM.",
  },
  {
    q: "How long does setup take?",
    a: "Connecting the CRM takes an afternoon. The rest is checking your data and loading targets, which we do with you.",
  },
  {
    q: "How much does it cost?",
    a: "Annual plans, priced by team size. Pilots are a fixed fee agreed up front, which comes off your first year if you carry on.",
  },
];

export default function Home() {
  return (
    <MarketingPage
      cta={{
        title: <>See what&apos;s <span className="kw">behind</span> your team&apos;s missed numbers.</>,
        body: "Book 20 minutes. We'll show you how it works, then look at where the gap is costing your team.",
      }}
    >
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow up">The AI coach for revenue teams</span>
            <h1 className="up d1">Every manager&apos;s hour should go where the <span className="kw">revenue</span> is.</h1>
            <p className="hero-line up d2">PraiseLoop finds the cause of underperformance across your revenue team, coaches the fix, and measures the revenue it brings back.</p>
            <p className="hero-sub up d3">Your managers get the intelligence, while PraiseLoop transforms underperformance across your sales and customer success teams.</p>
            <div className="actions up d4">
              <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo <Icon.Arrow /></Link>
              <a className="textlink" href="#how">See how it works with one rep</a>
            </div>
          </div>
          <div className="hero-media">
            <div className="app up">
              <div className="app-top">
                <span className="av">SM</span>
                <div style={{ flex: "1 1 160px" }}>
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
              <div className="panel">
                <div className="panel-h"><span>Your team today, and why</span><span className="sub">8 reps</span></div>
                <RepRow initials="SA" name="Sam A." teal status="behind" gap="Fewer proposals closing than his normal. Plan ready for you to agree." />
                <div className="rep">
                  <span className="av s">DM</span>
                  <span className="nm">Dan M.</span>
                  <span className="pill-swap"><span className="pill behind ps1">Behind target</span><span className="pill ontrack ps2">On track</span></span>
                  <span className="gap">Calls down 30% on his normal. Plan running, day 6.</span>
                </div>
                <RepRow initials="PK" name="Priya K." status="ahead" gap="Biggest deal of the quarter closes Thursday. Worth your time." />
                <RepRow initials="JL" name="Jess L." teal status="ontrack" gap="On track to hit target with a week to spare." />
              </div>
              <div className="hero-strip"><span className="spark-dot" /> PraiseLoop is supporting 3 reps today · 2 plans working</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="head center-head up">
            <span className="eyebrow">Who it&apos;s for</span>
            <h2>Built for <span className="kw">revenue</span> teams.</h2>
            <p className="lede">Every team that brings revenue in, keeps it or grows it. Starting with sales and customer success.</p>
          </div>
          <RevenueTeams />
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="head wide-head">
            <span className="eyebrow">The problem</span>
            <h2>Within every revenue team there&apos;s <span className="kw">underperformance</span>. And within every revenue team, there&apos;s a manager dealing with it.</h2>
            <p className="lede">You hired your managers to grow revenue. But most of their week goes on the people who are behind.</p>
          </div>
          <h3 className="list-lead">Where your managers&apos; week actually goes:</h3>
          <Tiles />
          <h3 className="list-lead costs-gap">The impact:</h3>
          <Costs />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="head">
            <span className="eyebrow">Same manager, same team</span>
            <h2>A different <span className="kw">week</span>.</h2>
            <p className="lede">Switch between a typical week today and the same week with PraiseLoop doing the legwork in the background.</p>
          </div>
          <WeekToggle />
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="head center-head">
            <span className="eyebrow">How PraiseLoop helps</span>
            <h2>The manager gets the <span className="kw">intelligence</span>. PraiseLoop does the legwork.</h2>
            <p className="lede">PraiseLoop reads the data your team already has and works out why each person&apos;s numbers moved. Managers see it all in a few minutes. The coach works through a plan with everyone who needs one, and tells the manager when someone needs a 1:1.</p>
          </div>
          <LoopLanes />
          <figure className="founder center-quote">
            <blockquote className="quote">&ldquo;The goal isn&apos;t to get every rep to 100%. It&apos;s to change their behaviours and help them build better habits. Moving someone from zero to fifty percent is a huge improvement, and now they&apos;re part of your mid and top performers.&rdquo;</blockquote>
            <figcaption className="quote-by"><span className="av g s">AV</span>Ash Vipani, CEO and co-founder, who runs a sales team himself</figcaption>
          </figure>
        </div>
      </section>

      <section id="how">
        <div className="container">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>One person, three weeks, and proof it <span className="kw">worked</span>.</h2>
            <p className="lede">Pick a team and click through what happened. <ExampleData /></p>
          </div>
          <HowTeams />
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="head">
            <span className="eyebrow">Already using AI?</span>
            <h2>AI chat tools answer questions. PraiseLoop changes <span className="kw">results</span>.</h2>
            <p className="lede">Your managers and reps may already ask an AI tool about their numbers. Here&apos;s the difference.</p>
          </div>
          <Versus />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="head center-head">
            <span className="eyebrow">Connects to your stack</span>
            <h2>Works from the data your team <span className="kw">already has</span>.</h2>
            <p className="lede">The data&apos;s already there. PraiseLoop connects to it, so nobody has extra admin. Already tracking renewals in your CRM? PraiseLoop reads your renewals pipeline the same way it reads new business.</p>
          </div>
          <Integrations />
          <p className="integ-sub">Live today: HubSpot and Fathom. Other tools connected for each customer as needed.</p>
          <p className="integ-note">In pilot with our first sales teams now. Pilots open for customer success teams.</p>
        </div>
      </section>

      <section className="warm2">
        <div className="container">
          <h2 className="h2-gap wide">Questions we get asked</h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
