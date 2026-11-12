import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import DemoForm, { type DemoFormProps } from "./DemoForm";
import { Icon } from "../site/icons";

type Cta = {
  title: React.ReactNode;
  body: string;
  form?: DemoFormProps;
  /** `null` drops the "Book a demo" eyebrow. */
  eyebrow?: string | null;
  /** Replaces the three default "what you'll get" points. */
  aside?: React.ReactNode;
};

const DEFAULT_CTA: Cta = {
  title: <>Want to see it on <span className="kw">your team</span>?</>,
  body: "Book 20 minutes. We'll show you how it works, then look at where the gap is costing your team.",
};

/**
 * The closing call to action that ends every marketing page: the pitch on
 * the left, the real demo form (posts to /api/demo) on the right.
 */
export function DemoCta({ title, body, form, eyebrow = "Book a demo", aside }: Cta) {
  return (
    <section id="demo" className="warm">
      <div className="container book">
        <div className="book-copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          <p className="lede">{body}</p>
          {aside ?? (
            <div className="book-pts">
              <div><Icon.Check /><span>A walk-through with example data</span></div>
              <div><Icon.Check /><span>Where your managers&apos; time is going today</span></div>
              <div><Icon.Check /><span>Whether a 90-day pilot on your own CRM makes sense</span></div>
            </div>
          )}
        </div>
        <div className="book-form"><DemoForm {...form} /></div>
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
