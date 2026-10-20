import type { Metadata } from "next";
import MarketingPage from "@/components/marketing/MarketingPage";

export const metadata: Metadata = {
  title: "About · PraiseLoop",
  description:
    "Most sales managers don't have time to coach everyone. We built PraiseLoop to fill the gap, starting with sales. Who we are, and how we handle your data.",
};

const TEAM = [
  { initials: "AV", name: "Ash Vipani", role: "CEO and co-founder", line: "Has spent his career selling into enterprise sales teams." },
  { initials: "RP", name: "Rosh Patel", role: "COO and co-founder", line: "Built go-to-market strategies for technology companies before PraiseLoop." },
  { initials: "MJ", name: "Manjit Johal", role: "CTO and co-founder", line: "Builds the product, from the CRM connections to the coach itself." },
];

const DATA = [
  {
    h: "What we read",
    p: "Deals, stages, stage history, activity and deal owners, read-only. Targets and incentive thresholds you give us at setup. Call recordings only if an admin turns it on: each call is read once to pull out next steps and objections, then deleted.",
  },
  { h: "What we don't", p: "The content of emails, or anything outside your CRM and the tools you connect. We don't write back to your CRM either." },
  { h: "Where it's kept", p: "UK or EU data centres. Encrypted in transit and at rest, with access limited to the people who need it." },
  { h: "Your rights", p: "UK GDPR, and a data processing agreement with every customer." },
];

export default function AboutPage() {
  return (
    <MarketingPage>
      <section className="hero">
        <div className="container hero-solo">
          <h1>Every rep <span className="kw">coached</span>, not just the ones a manager has time for.</h1>
          <div className="prose">
            <p>Most sales managers don&apos;t have time to coach everyone. We built PraiseLoop to fill the gap.</p>
            <p>We started out building a recognition product. The more sales teams we spoke to, the clearer it got that the thing they were short of wasn&apos;t praise. It was coaching, and time to do it.</p>
            <p>So we rebuilt PraiseLoop around a coach that works with every rep, using data the team already has. We started with sales because the numbers are already in the CRM, and you can tell quickly whether something&apos;s working.</p>
          </div>
        </div>
      </section>

      <section className="warm">
        <div className="container">
          <h2 className="h2-gap">The <span className="kw">team</span></h2>
          <div className="grid3">
            {TEAM.map((t) => (
              <div key={t.name} className="person">
                <span className="ph" aria-hidden>{t.initials}</span>
                <div>
                  <h3>{t.name}</h3>
                  <span className="src">{t.role}</span>
                  <p className="src" style={{ marginTop: 6 }}>{t.line}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fineprint" style={{ marginTop: 32 }}>PraiseLoop Ltd is a UK company, registered in England and Wales.</p>
        </div>
      </section>

      <section id="security">
        <div className="container split top">
          <div className="prose">
            <h2>Security and <span className="kw">data</span></h2>
            <p>Your company owns its data. We use it to coach your team and for nothing else.</p>
          </div>
          <div className="plain">
            {DATA.map((d) => (
              <div key={d.h}>
                <h3>{d.h}</h3>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
