import Image from "next/image";
import Link from "next/link";

const ENGINE_NAME = "Outcome Engine";

/** Site-wide footer used on secondary pages (blog, etc.). */
export default function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/praiseloop-logo-white.png"
              alt="PraiseLoop"
              width={200}
              height={56}
              style={{ height: 56, width: "auto" }}
            />
            <p className="footer-tag" style={{ marginTop: 18 }}>
              Performance-linked recognition that proves its impact on retention, engagement, and performance.
            </p>
            <span className="footer-mantra">Reward outcomes, not effort.</span>
          </div>
          <div>
            <h5>Platform</h5>
            <ul>
              <li><a href="/#how">Recognition layer</a></li>
              <li><a href="/#how">{ENGINE_NAME}</a></li>
              <li><a href="/#how">Intelligence layer</a></li>
              <li><a href="/#outcomes">Why it matters</a></li>
            </ul>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              <li><a href="/#solutions">For Sales teams</a></li>
              <li><a href="/#solutions">For People &amp; HR</a></li>
              <li><a href="/#gcc">For GCC teams</a></li>
              <li><a href="/#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="/#trust">Security &amp; compliance</a></li>
              <li><Link href="/demo">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 PraiseLoop &middot; All rights reserved</span>
          <span>Dubai &middot; Riyadh &middot; London</span>
        </div>
      </div>
    </footer>
  );
}
