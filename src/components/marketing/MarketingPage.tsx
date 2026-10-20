import Link from "next/link";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { BOOKING_URL, PLAYBOOK_URL } from "../site/blocks";

type Cta = { title: string; body: string };

const DEFAULT_CTA: Cta = {
  title: "Want to see it on your team?",
  body: "Book 20 minutes. We'll show you the product with example data, then talk about running a pilot on your own CRM.",
};

/** The closing call to action that ends every marketing page. */
export function DemoCta({ title, body }: Cta) {
  return (
    <section id="demo">
      <div className="container">
        <div className="cta">
          <div className="cta-copy">
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo</Link>
            <Link className="cta-alt" href={PLAYBOOK_URL}>Or get the sales coaching playbook</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Nav, page sections, closing call to action and footer. Styled by site.css under `.pl`. */
export default function MarketingPage({ children, cta = DEFAULT_CTA }: { children: React.ReactNode; cta?: Cta }) {
  return (
    <div className="pl">
      <SiteHeader />
      <main>
        {children}
        <DemoCta {...cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
