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
      "CRM health check, with a fix for each gap",
      "Check-ins when a rep drops from normal (coming)",
    ],
  },
  {
    name: "Enterprise pack",
    blurb: "Everything in the Sales pack, with recognition and rewards on top.",
    items: [
      "Rewards that pay out on CRM results",
      "Recognition that names the result",
      "Rewards for real improvement on a rep's own normal",
      "CRM health check, and we fix the gaps for you",
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
            <a href="#crm-health">CRM health</a>
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
            <p>Managers can also just ask: <strong>&ldquo;who&apos;s closest to target this month?&rdquo;</strong></p>
          </div>
          <ManagerOverview reps={5} />
        </div>
      </section>

      <section id="rep">
        <div className="container split">
          <RepToday />
          <div className="prose">
            <h2>Reps use it because it helps them <span className="kw">hit their number</span>.</h2>
            <p>It knows their target, so the first thing they see is how close they are and which deals would get them there.</p>
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
              <h3>Coaches the way you manage</h3>
              <p>Managers set their own coaching style and add context about each rep, so the coach&apos;s suggestions sound like the manager, not a script.</p>
            </div>
            <div>
              <h3>Check-ins when someone dips (coming)</h3>
              <p>When a rep drops below their normal, the coach asks how they&apos;re getting on. They choose what their manager sees. Nobody gets a weekly survey.</p>
            </div>
            <div>
              <h3>Slack, Microsoft Teams and mobile (coming)</h3>
              <p>The coach will reach managers and reps where they already work, with a mobile app for reps after that.</p>
            </div>
            <div>
              <h3>Recognition and rewards</h3>
              <p>Rewards that pay out when the result lands in your CRM, from a budget you set. Part of the Enterprise pack.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="warm" id="crm-health">
        <div className="container split top">
          <div className="prose">
            <h2>Works with a <span className="kw">messy CRM</span>.</h2>
            <p>Most CRMs have gaps. PraiseLoop scores yours out of 100 when you connect it, and gives you a fix for each gap, so the coach works from data you can trust.</p>
          </div>
          <div className="plain">
            <div><h3>Next steps without dates</h3><p>Deals where nobody has said when the next thing happens.</p></div>
            <div><h3>Activity not logged against deals</h3><p>Calls and emails that happened but don&apos;t show up where they count.</p></div>
            <div><h3>Deals PraiseLoop can&apos;t see</h3><p>Open deals owned by people who aren&apos;t set up yet.</p></div>
            <div><h3>Deals past their close date</h3><p>Pipeline that needs a new date or closing out.</p></div>
          </div>
        </div>
      </section>

      <section id="packs">
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
