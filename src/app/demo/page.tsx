import type { Metadata } from "next";
import MarketingPage from "@/components/marketing/MarketingPage";
import DemoForm from "@/components/marketing/DemoForm";
import { Icon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Book a demo · PraiseLoop",
  description:
    "Book 20 minutes. We'll show you PraiseLoop with example data, then talk about running a pilot on your own HubSpot or Salesforce data.",
};

const SEE = [
  "A manager's Monday morning: every rep, why their numbers moved, and a plan ready for anyone who's slipped",
  "What a rep sees: how far they are from target and their next accelerator, and the one habit to try this week",
  "How every plan gets an answer, measured against the rep's own last eight weeks",
  "How a 90-day pilot on your own CRM works, and the number we'd agree to measure",
];

export default function DemoPage() {
  return (
    <MarketingPage cta={null}>
      <section className="hero">
        <div className="container hero-grid demo-grid">
          <div className="hero-copy">
            <h1>See how it would coach <span className="kw">your reps</span>.</h1>
            <p className="lede">Book 20 minutes. We&apos;ll show you the product with example data, then talk about running a pilot on your own HubSpot or Salesforce data.</p>
            <div>
              <h2 className="see-h">What you&apos;ll see</h2>
              <ul className="see">
                {SEE.map((s) => <li key={s}><Icon.Check /> {s}</li>)}
              </ul>
            </div>
          </div>
          <div className="hero-media">
            <DemoForm />
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
