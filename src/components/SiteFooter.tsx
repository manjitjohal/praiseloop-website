import Image from "next/image";
import Link from "next/link";
import "../app/site.css";
import { CookieSettingsButton } from "./CookieBanner";
import { BOOKING_URL, PLAYBOOK_URL, SIGN_IN_URL } from "./site/blocks";

const COLUMNS = [
  {
    h: "Product",
    links: [
      { label: "How it works", href: "/product" },
      { label: "Did it work?", href: "/product#did-it-work" },
      { label: "Pilot", href: "/pilot" },
      { label: "Sign in", href: SIGN_IN_URL },
    ],
  },
  {
    h: "For",
    links: [
      { label: "Heads of sales", href: "/for/heads-of-sales" },
      { label: "Sales managers", href: "/for/sales-managers" },
      { label: "Reps", href: "/for/reps" },
    ],
  },
  {
    h: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Playbook", href: PLAYBOOK_URL },
      { label: "ROI calculator", href: "/roi-calculator" },
    ],
  },
  {
    h: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security and data", href: "/about#security" },
      { label: "Book a demo", href: BOOKING_URL },
    ],
  },
];

/** The one footer, on every page. Own `.pl` wrapper: see SiteHeader. */
export default function SiteFooter() {
  return (
    <div className="pl">
      <footer className="pl-foot">
        <div className="pl-shell">
          <nav className="pl-foot-grid" aria-label="Footer">
            <div className="pl-foot-brand">
              <Image src="/praiseloop-logo-white.png" alt="PraiseLoop" width={86} height={34} style={{ height: 34, width: "auto" }} />
              <p>Every manager&apos;s hour should go where the revenue is.</p>
            </div>
            {COLUMNS.map((col) => (
              <div key={col.h}>
                <h2>{col.h}</h2>
                {col.links.map((l) =>
                  l.href.startsWith("http")
                    ? <a key={l.href} href={l.href}>{l.label}</a>
                    : <Link key={l.href} href={l.href}>{l.label}</Link>,
                )}
              </div>
            ))}
          </nav>
          <div className="pl-foot-base">
            <span>© 2026 PraiseLoop Ltd · Registered in England and Wales</span>
            <span className="pl-foot-legal">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
              <CookieSettingsButton />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
