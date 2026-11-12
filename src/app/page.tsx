import Image from "next/image";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { ExampleData } from "@/components/marketing/mocks";
import { CoachingStory, Costs, HeroRecommendation, IntegrationsCompact, Roles, TeamsRow, Versus, WeekToggle } from "@/components/marketing/visuals";
import { BOOKING_URL } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Will my managers stop looking after people who are behind?",
    a: "No. Managers see everyone, agree every plan, and are only asked for a 1:1 when a plan isn't moving.",
  },
  {
    q: "What do you need from our CRM?",
    a: "Read-only access to your deals, stages and activity. Connecting takes an afternoon, and we never write anything back.",
  },
  {
    q: "How much does it cost?",
    a: "Annual plans priced by team size; pilots are a fixed fee that comes off year one.",
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
        <div className="container hero-grid hero-wide">
          <div className="hero-copy">
            <span className="eyebrow up">The AI coach for revenue teams</span>
            <h1 className="up d1">Every manager&apos;s hour should go where the <span className="kw">revenue</span> is.</h1>
            <p className="hero-line up d2">PraiseLoop reads your CRM and sales calls every morning, and tells each manager who needs coaching, what to change, and whether it worked.</p>
            <ul className="hero-points up d3">
              <li><b>Who needs coaching:</b> anyone whose numbers have slipped against their own last eight weeks.</li>
              <li><b>What to change:</b> one habit, backed by evidence, in a two-week plan the manager agrees.</li>
              <li><b>How it&apos;s tracked:</b> against that person&apos;s own baseline, so you see what actually moved.</li>
            </ul>
            <div className="actions up d4">
              <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo <Icon.Arrow /></Link>
              <a className="textlink" href="#how">See it work with one rep</a>
            </div>
          </div>
          <div className="hero-media up">
            <HeroRecommendation />
          </div>
        </div>
      </section>

      <section className="slim">
        <div className="container">
          <div className="teams-head">
            <span className="eyebrow">Built for revenue teams</span>
          </div>
          <TeamsRow />
        </div>
      </section>

      <section id="how" className="warm">
        <div className="container">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>One person, three weeks, and proof it <span className="kw">worked</span>.</h2>
            <p className="lede">The problem, what the coach did, and what changed. <ExampleData /></p>
          </div>
          <CoachingStory />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="head wide-head">
            <span className="eyebrow">The problem</span>
            <h2>Most of a manager&apos;s week goes on the people who are <span className="kw">behind</span>.</h2>
            <p className="lede">You hired your managers to grow revenue. Instead they sit in on calls, dig through reports and coach the same people again. That costs you three ways:</p>
          </div>
          <Costs />
          <h3 className="list-lead costs-gap">The same manager&apos;s week, with and without PraiseLoop</h3>
          <WeekToggle compact />
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <div className="head center-head">
            <span className="eyebrow">Who does what</span>
            <h2>The manager stays in charge. PraiseLoop does the <span className="kw">legwork</span>.</h2>
          </div>
          <Roles />
          <div className="quote-split">
            <div className="quote-photo">
              <Image src="/team-celebrating.jpg" alt="A sales team celebrating a win around their desks" width={1280} height={960} sizes="(max-width: 860px) 100vw, 520px" />
            </div>
          <figure className="founder quote-side">
            <blockquote className="quote">&ldquo;The goal isn&apos;t to get every rep to 100%. It&apos;s to change their behaviours and help them build better habits. Moving someone from zero to fifty percent is a huge improvement, and now they&apos;re part of your mid and top performers.&rdquo;</blockquote>
            <figcaption className="quote-by"><span className="av g s">AV</span>Ash Vipani, CEO and co-founder, who runs a sales team himself</figcaption>
          </figure>
          </div>
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

      <section className="slim">
        <div className="container">
          <div className="teams-head">
            <span className="eyebrow">Works from the data your team already has</span>
            <p className="sub">Read-only. Nothing for your team to update. In pilot with our first sales teams now.</p>
          </div>
          <IntegrationsCompact />
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
