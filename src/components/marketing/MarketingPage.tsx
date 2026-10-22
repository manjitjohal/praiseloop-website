import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import DemoForm from "./DemoForm";
import { Icon } from "../site/icons";

type Cta = { title: React.ReactNode; body: string };

const DEFAULT_CTA: Cta = {
  title: <>Want to see it on <span className="kw">your team</span>?</>,
  body: "Book 20 minutes. We'll show you how it works, then look at where the gap is costing your team.",
};

/**
 * The closing call to action that ends every marketing page: the pitch on
 * the left, the real demo form (posts to /api/demo) on the right.
 */
export function DemoCta({ title, body }: Cta) {
  return (
    <section id="demo" className="warm">
      <div className="container book">
        <div className="book-copy">
          <span className="eyebrow">Book a demo</span>
          <h2>{title}</h2>
          <p className="lede">{body}</p>
          <div className="book-pts">
            <div><Icon.Check /><span>A walk-through with example data</span></div>
            <div><Icon.Check /><span>Where your managers&apos; time is going today</span></div>
            <div><Icon.Check /><span>Whether a 90-day pilot on your own CRM makes sense</span></div>
          </div>
        </div>
        <div className="book-form"><DemoForm /></div>
      </div>
    </section>
  );
}

/**
 * Nav, page sections, closing call to action and footer. Styled by site.css
 * under `.pl`. `cta={null}` drops the closing band (the demo page itself).
 */
export default function MarketingPage({ children, cta = DEFAULT_CTA }: { children: React.ReactNode; cta?: Cta | null }) {
  return (
    <div className="pl">
      <SiteHeader />
      <main>
        {children}
        {cta && <DemoCta {...cta} />}
      </main>
      <SiteFooter />
    </div>
  );
}
