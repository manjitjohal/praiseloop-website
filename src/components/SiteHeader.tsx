import Image from "next/image";
import Link from "next/link";
import "../app/home-v2.css";

const LINKS = [
  { key: "how", label: "How it works", href: "/#how" },
  { key: "sales", label: "For sales teams", href: "/#who" },
  { key: "blog", label: "Blog", href: "/blog" },
] as const;

export const SIGN_IN_URL = "https://app.praiseloop.com";

/**
 * The one nav, on every page. It wraps itself in a box-less `.plh` so the
 * marketing styles apply even on pages that aren't `.plh` themselves (blog,
 * demo), without restyling the rest of those pages.
 */
export default function SiteHeader({ current }: { current?: (typeof LINKS)[number]["key"] }) {
  return (
    <div className="plh plh-contents">
      <header className="nav">
        <div className="container nav-row">
          <Link href="/" aria-label="PraiseLoop home">
            <Image className="nav-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={70} height={26} priority style={{ height: 26, width: "auto" }} />
          </Link>
          <nav className="nav-links" aria-label="Main">
            {LINKS.map((l) => (
              <Link key={l.key} href={l.href} aria-current={l.key === current ? "page" : undefined}>{l.label}</Link>
            ))}
          </nav>
          <div className="nav-cta">
            <a href={SIGN_IN_URL} className="nav-signin">Sign in</a>
            <Link href="/demo" className="btn btn-primary">Book a demo</Link>
          </div>
        </div>
      </header>
    </div>
  );
}
