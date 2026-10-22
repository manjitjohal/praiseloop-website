"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "../app/site.css";
import { BOOKING_URL, SIGN_IN_URL } from "./site/blocks";
import { Icon } from "./site/icons";

type MenuLink = { href: string; title: string; blurb: string };
type MenuGroup = { h: string; links: MenuLink[] };
type NavEntry =
  | { kind: "link"; label: string; href: string; section: string }
  | { kind: "menu"; key: string; label: string; sections: string[]; links: MenuLink[]; groups?: MenuGroup[] };

const NAV: NavEntry[] = [
  { kind: "link", label: "Product", href: "/product", section: "/product" },
  {
    kind: "menu", key: "for", label: "For", sections: ["/for"], links: [],
    groups: [
      {
        h: "Sales teams",
        links: [
          { href: "/for/heads-of-sales", title: "Heads of sales", blurb: "Every manager coaching the same way, with proof" },
          { href: "/for/sales-managers", title: "Sales managers", blurb: "Know why the numbers moved, before the 1:1" },
          { href: "/for/reps", title: "Reps", blurb: "Your own coach, against your own best weeks" },
        ],
      },
      {
        h: "Customer success teams",
        links: [
          { href: "/for/cs-leaders", title: "CS leaders", blurb: "Know which CSM needs you, and what's working" },
          { href: "/for/csms", title: "CSMs", blurb: "Your book, your numbers, your best quarters" },
        ],
      },
    ],
  },
  { kind: "link", label: "Pilot", href: "/pilot", section: "/pilot" },
  {
    kind: "menu", key: "resources", label: "Resources", sections: ["/blog", "/playbook", "/roi-calculator"],
    links: [
      { href: "/blog", title: "Blog", blurb: "Coaching, incentives and the loop" },
      { href: "/playbook", title: "Sales coaching playbook", blurb: "Free guide for sales managers, coming soon" },
      { href: "/roi-calculator", title: "ROI calculator", blurb: "Model it on your own team" },
    ],
  },
  {
    kind: "menu", key: "company", label: "Company", sections: ["/about"],
    links: [
      { href: "/about", title: "About", blurb: "Who we are and why we built it" },
      { href: "/about#security", title: "Security and data", blurb: "What we read, where it lives" },
    ],
  },
];

const inSection = (path: string, section: string) => path === section || path.startsWith(`${section}/`);

/**
 * The one nav, on every page. Wrapped in its own `.pl` so it carries the
 * marketing tokens onto the older `.plh` pages (blog, demo, ROI, legal).
 */
export default function SiteHeader() {
  const path = usePathname();
  // A menu stays open only on the page it was opened on, so navigating closes it.
  const [menu, setMenu] = useState<{ key: string; path: string } | null>(null);
  const open = menu?.path === path ? menu.key : null;
  const setOpen = (key: string | null) => setMenu(key ? { key, path } : null);
  const navRef = useRef<HTMLElement>(null);
  // The phone menu, like the dropdowns, only stays open on the page it was opened on.
  const [mob, setMob] = useState<string | null>(null);
  const mobOpen = mob === path;

  useEffect(() => {
    if (!mobOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMob(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [mobOpen]);

  useEffect(() => {
    const nav = navRef.current;
    if (!open || !nav) return;
    const onPointer = (e: PointerEvent) => {
      if (!nav.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      nav.querySelector<HTMLButtonElement>(`[aria-controls="menu-${open}"]`)?.focus();
      setMenu(null);
    };
    // Tabbing out closes it. A null relatedTarget (a click that moves focus nowhere,
    // as Safari does on links) is left to the pointerdown check, so a menu link
    // isn't unmounted before its click lands.
    const onFocusOut = (e: FocusEvent) => {
      if (e.relatedTarget && !nav.contains(e.relatedTarget as Node)) setMenu(null);
    };
    // Any link in the bar closes it, including one to the page you're already on.
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) setMenu(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    nav.addEventListener("focusout", onFocusOut);
    nav.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      nav.removeEventListener("focusout", onFocusOut);
      nav.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div className="pl">
      <header className="pl-nav" ref={navRef}>
        <div className="pl-shell pl-nav-row">
          <Link href="/" aria-label="PraiseLoop home">
            <Image className="pl-nav-logo" src="/praiseloop-logo.png" alt="PraiseLoop" width={91} height={36} priority style={{ height: 36, width: "auto" }} />
          </Link>
          <nav className="pl-nav-links" aria-label="Main">
            {NAV.map((item) => {
              if (item.kind === "link") {
                const on = inSection(path, item.section);
                return (
                  <div key={item.href} className="pl-nav-item">
                    <Link className={`pl-nav-link${on ? " on" : ""}`} href={item.href} aria-current={path === item.href ? "page" : undefined}>{item.label}</Link>
                  </div>
                );
              }
              const on = item.sections.some((s) => inSection(path, s));
              const expanded = open === item.key;
              return (
                <div key={item.key} className="pl-nav-item">
                  <button
                    type="button"
                    className={`pl-nav-link${on ? " on" : ""}`}
                    aria-expanded={expanded}
                    aria-controls={`menu-${item.key}`}
                    onClick={() => setOpen(expanded ? null : item.key)}
                  >
                    {item.label} <Icon.Chevron />
                  </button>
                  {expanded && (
                    <div className={`pl-menu${item.groups ? " grp" : ""}`} id={`menu-${item.key}`}>
                      {item.groups
                        ? item.groups.map((g) => (
                            <div key={g.h} className="mg-col">
                              <span className="mg-h">{g.h}</span>
                              {g.links.map((l) => (
                                <Link key={l.href} href={l.href}>
                                  <strong>{l.title}</strong>
                                  <span>{l.blurb}</span>
                                </Link>
                              ))}
                            </div>
                          ))
                        : item.links.map((l) => (
                            <Link key={l.href} href={l.href}>
                              <strong>{l.title}</strong>
                              <span>{l.blurb}</span>
                            </Link>
                          ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="pl-nav-cta">
            <a className="pl-nav-link pl-signin" href={SIGN_IN_URL}>Sign in</a>
            <Link className="pl-nav-demo" href={BOOKING_URL}>Book a demo</Link>
            <button
              type="button"
              className="pl-burger"
              aria-label={mobOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobOpen}
              aria-controls="pl-mob"
              onClick={() => setMob(mobOpen ? null : path)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
                {mobOpen ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
              </svg>
            </button>
          </div>
        </div>
        {mobOpen && (
          <nav className="pl-mob" id="pl-mob" aria-label="Menu" onClick={(e) => { if ((e.target as Element).closest("a")) setMob(null); }}>
            {NAV.map((item) =>
              item.kind === "link" ? (
                <Link key={item.href} className="pl-mob-top" href={item.href}>{item.label}</Link>
              ) : (
                <div key={item.key} className="pl-mob-sec">
                  {(item.groups ?? [{ h: item.label, links: item.links }]).map((g) => (
                    <div key={g.h} className="pl-mob-grp">
                      <span className="pl-mob-h">{g.h}</span>
                      {g.links.map((l) => <Link key={l.href} href={l.href}>{l.title}</Link>)}
                    </div>
                  ))}
                </div>
              ),
            )}
            <a className="pl-mob-top" href={SIGN_IN_URL}>Sign in</a>
          </nav>
        )}
      </header>
    </div>
  );
}
