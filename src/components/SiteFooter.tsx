import Image from "next/image";
import Link from "next/link";

/** Site-wide footer used on secondary pages (blog, etc.) — Ft5 statement close. */
export default function SiteFooter() {
  return (
    <footer>
      <div className="container footer-statement">
        <p className="footer-line">Reward <span className="em">outcomes</span>,<br />not effort.</p>
        <Image
          src="/praiseloop-logo-white.png"
          alt="PraiseLoop"
          width={121}
          height={48}
          style={{ height: 48, width: "auto", marginTop: 44 }}
        />
        <nav className="footer-links-row">
          <a href="/#deputy">The AI Deputy</a>
          <a href="/#how">Outcome Engine</a>
          <a href="/#proof">Proof</a>
          <a href="/#gcc">GCC</a>
          <a href="/#pricing">Pricing</a>
          <Link href="/blog">Blog</Link>
          <a href="/#trust">Security</a>
          <Link href="/demo">Contact</Link>
        </nav>
        <div className="footer-meta">
          <span>&copy; 2026 PraiseLoop</span>
          <span>Dubai &middot; Riyadh &middot; London</span>
          <span>hello@praiseloop.com</span>
        </div>
      </div>
    </footer>
  );
}
