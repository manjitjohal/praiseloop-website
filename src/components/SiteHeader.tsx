import Image from "next/image";
import Link from "next/link";

/** Site-wide header used on secondary pages (blog, etc.).
 *  Section links point back to the homepage so they work from any route. */
export default function SiteHeader() {
  return (
    <header className="nav">
      <div className="container nav-row">
        <Link href="/" aria-label="PraiseLoop">
          <Image
            src="/praiseloop-logo.png"
            alt="PraiseLoop"
            width={200}
            height={52}
            style={{ height: 52, width: "auto" }}
            priority
          />
        </Link>
        <nav className="nav-links">
          <a href="/#how">Platform</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#gcc">GCC</a>
          <a href="/#pricing">Pricing</a>
          <Link href="/blog">Blog</Link>
        </nav>
        <div className="nav-cta">
          <a
            href="https://app.praiseloop.com"
            className="btn btn-secondary"
            style={{ padding: "10px 16px", fontSize: 14 }}
          >
            Sign in
          </a>
          <Link href="/demo" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
