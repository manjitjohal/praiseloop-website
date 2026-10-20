import Link from "next/link";
import MarketingPage from "./MarketingPage";
import { BOOKING_URL } from "../site/blocks";
import { Icon } from "../site/icons";

/**
 * The shape shared by the "For …" pages (heads of sales, managers, reps):
 * hero with a product view, the problem as they'd put it, three things it
 * does for them, and the objection they'd raise, answered.
 */
export default function AudiencePage({
  title, lede, media, problem, extra, points, objection,
}: {
  title: React.ReactNode;
  lede: string;
  media: React.ReactNode;
  problem: { h: React.ReactNode; paras: string[] };
  extra?: React.ReactNode;
  points: { h: string; p: string }[];
  objection: { q: string; a: string };
}) {
  return (
    <MarketingPage>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>{title}</h1>
            <p className="lede">{lede}</p>
            <div className="actions">
              <Link className="btn btn-primary" href={BOOKING_URL}>Book a demo <Icon.Arrow /></Link>
              <Link className="textlink" href="/pilot">How a pilot works</Link>
            </div>
          </div>
          <div className="hero-media">{media}</div>
        </div>
      </section>

      <section className="warm">
        <div className="container split top">
          <h2>{problem.h}</h2>
          <div className="prose">
            {problem.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {extra}

      <section>
        <div className="container plain">
          {points.map((pt) => (
            <div key={pt.h}>
              <h3>{pt.h}</h3>
              <p>{pt.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="warm2">
        <div className="container answer">
          <p className="quote">&ldquo;{objection.q}&rdquo;</p>
          <div className="prose"><p>{objection.a}</p></div>
        </div>
      </section>
    </MarketingPage>
  );
}
