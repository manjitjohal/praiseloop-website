import Image from "next/image";
import Link from "next/link";
import "../app/home-v2.css";
import { CookieSettingsButton } from "./CookieBanner";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "Blog", href: "/blog" },
  { label: "ROI calculator", href: "/roi-calculator" },
  { label: "Book a demo", href: "/demo" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];

/** The one footer, on every page. Box-less `.plh` wrapper: see SiteHeader. */
export default function SiteFooter() {
  return (
    <div className="plh plh-contents">
      <footer className="foot">
        <div className="container foot-row">
          <Image className="foot-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={60} height={22} style={{ height: 22, width: "auto" }} />
          <nav className="foot-links" aria-label="Footer">
            {LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <CookieSettingsButton />
          </nav>
          <span className="foot-copy">The AI performance coach for sales teams. © 2026 PraiseLoop</span>
        </div>
      </footer>
    </div>
  );
}
