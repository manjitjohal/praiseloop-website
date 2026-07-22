import Image from "next/image";
import Link from "next/link";

/** Site-wide header used on secondary pages (blog, etc.).
 *  Section links point back to the homepage so they work from any route. */
export default function SiteHeader() {
  return (
    <header className="nav">
      <div className="container">
        <div className="nav-row">
          <Link href="/" aria-label="PraiseLoop">
            <Image
              src="/praiseloop-logo.png"
              alt="PraiseLoop"
              width={101}
              height={40}
              style={{ height: 40, width: "auto" }}
              priority
            />
          </Link>
          <nav className="nav-links">
            <a href="/#how">Platform</a>
            <a href="/#proof">Proof</a>
            <a href="/#pricing">Pricing</a>
            <Link href="/blog">Blog</Link>
            <a href="https://app.praiseloop.com">Sign in</a>
          </nav>
          <div className="nav-cta">
            <Link href="/demo" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
