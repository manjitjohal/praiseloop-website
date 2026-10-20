import type { Metadata } from "next";
import Link from "next/link";
import MarketingPage from "@/components/marketing/MarketingPage";
import { DidItWork, ManagerOverview, RepToday } from "@/components/marketing/mocks";
import { Loop } from "@/components/marketing/visuals";
import { BOOKING_URL } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Product · PraiseLoop",
  description:
    "PraiseLoop reads your CRM and works out why each rep's numbers moved. Managers approve a short plan in one tap, the coach works through it with the rep, and you see whether it helped.",
};

const PACKS = [
  {
    name: "Sales pack",
    blurb: "The coach, for every manager and rep. Where most teams start.",
    highlight: true,
    items: [
      "Manager overview and rep pages",
      "A coach for every rep",
      "Did it work?",
      "Check-ins when a rep drops from normal",
      "Guide to getting your CRM data ready",
    ],
  },
  {
    name: "Enterprise pack",
    blurb: "Everything in the Sales pack, with recognition and rewards on top.",
    items: [
      "Rewards that pay out on CRM results",
      "Recognition that names the result",
      "Rewards for real improvement on a rep's own normal",
      "We get your CRM data ready for you",
      "Single sign-on",
      "A named contact for setup and quarterly reviews",
    ],
  },
];

export default function ProductPage() {
  return (
    <MarketingPage>
      <section className="hero short">
        <div className="container hero-solo">
          <h1>Find the one thing each rep should change <span className="kw">this week</span>.</h1>
          <p className="lede">PraiseLoop reads your CRM and works out why each rep&apos;s numbers moved. Managers get a short plan for each one and approve it in one tap. The coach works through it with the rep every day, and a few weeks later it shows you whether it helped.</p>
          <div className="actions">
            <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo <Icon.Arrow /></Link>
          </div>
          <nav className="jump" aria-label="On this page">
            <a href="#manager">What managers see</a>
            <a href="#rep">What reps see</a>
            <a href="#did-it-work">Did it work?</a>
            <a href="#packs">Packs</a>
          </nav>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="head center-head">
            <span className="eyebrow">The loop</span>
            <h2>How the <span className="kw">loop</span> works.</h2>
            <p className="lede">Your manager and PraiseLoop take turns, so nothing about a rep who is behind gets missed, and the manager stays in charge.</p>
          </div>
          <Loop />
        </div>
      </section>

      <section className="warm" id="manager">
        <div className="container split">
          <div className="prose">
            <h2>Monday morning, for a <span className="kw">manager</span>.</h2>
            <p>Team numbers across the top. Under them, the coach&apos;s read on the week in a couple of sentences. Then every rep, with a status and the reason behind it.</p>
            <p>The reasons are specific. It might be activity, conversion at one stage, pipeline quality, a drop from that rep&apos;s normal, or a rise worth sharing. Each one opens up to the evidence.</p>
            <p>Managers can also just ask: <strong>&ldquo;who&apos;s closest to an accelerator this month?&rdquo;</strong></p>
          </div>
          <ManagerOverview reps={5} />
        </div>
      </section>

      <section id="rep">
        <div className="container split">
          <RepToday />
          <div className="prose">
            <h2>Reps use it because it helps them <span className="kw">earn more</span>.</h2>
            <p>It knows their target and where the next accelerator kicks in, so the first thing they see is how close they are and which deals would get them there.</p>
            <p>Before a call they can ask what the coach knows about the deal. And the habit it suggests comes from their own best weeks, which lands better than a generic playbook.</p>
            <p><Link className="textlink" href="/for/reps">More on what reps get</Link></p>
          </div>
        </div>
      </section>

      <section className="warm" id="did-it-work">
        <div className="container">
          <h2 style={{ marginBottom: 16 }}>Did it <span className="kw">work</span>?</h2>
          <div className="prose" style={{ marginBottom: 36 }}>
            <p>Every plan is measured twice: first the behaviour it asked for, then the number that behaviour should move. Both are compared with the rep&apos;s own last eight weeks, so a good month for the whole team doesn&apos;t make a plan look better than it was. Sometimes the answer is no, and the coach tries something different.</p>
          </div>
          <DidItWork />
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="h2-gap">Also in the <span className="kw">product</span></h2>
          <div className="plain">
            <div>
              <h3>Check-ins when someone dips</h3>
              <p>When a rep drops below their normal, the coach asks how they&apos;re getting on. They choose what their manager sees. Nobody gets a weekly survey.</p>
            </div>
            <div>
              <h3>Slack and Microsoft Teams</h3>
              <p>The coach can reach managers and reps where they already work. A mobile app for reps is next on the list.</p>
            </div>
            <div>
              <h3>Recognition and rewards</h3>
              <p>Rewards that pay out when the result lands in your CRM, from a budget you set. Part of the Enterprise pack.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="warm" id="packs">
        <div className="container">
          <h2 className="h2-gap">Two <span className="kw">packs</span></h2>
          <div className="grid2" style={{ maxWidth: 980 }}>
            {PACKS.map((p) => (
              <div key={p.name} className={`pack${p.highlight ? " hl" : ""}`}>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <ul>
                  {p.items.map((it) => <li key={it}><Icon.Check /> {it}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="fineprint">Both are annual. <Link className="textlink" href={BOOKING_URL}>Talk to us</Link> about pricing for your team.</p>
        </div>
      </section>
    </MarketingPage>
  );
}
