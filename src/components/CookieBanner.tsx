"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../app/home-v2.css";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, readConsent, writeConsent } from "@/lib/consent";

/** Set when the footer's "Cookie settings" reopens the banner. */
let reopened = false;

const subscribe = (cb: () => void) => {
  const open = () => {
    reopened = true;
    cb();
  };
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener(OPEN_SETTINGS_EVENT, open);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener(OPEN_SETTINGS_EVENT, open);
    window.removeEventListener("storage", cb);
  };
};
const isOpen = () => reopened || readConsent() === null;

/**
 * Cookie consent banner, on every page. Accept and reject are equally easy,
 * and the choice can be changed at any time from the footer.
 */
export default function CookieBanner() {
  // Server snapshot is closed, so the banner only ever appears after hydration.
  const open = useSyncExternalStore(subscribe, isOpen, () => false);
  const pathname = usePathname();
  if (!open || pathname?.startsWith("/studio")) return null;

  const choose = (accept: boolean) => {
    reopened = false;
    writeConsent(accept ? "granted" : "denied");
  };

  return (
    <div className="plh plh-contents">
      <div className="cookie-banner" role="region" aria-label="Cookie consent">
        <p className="cookie-banner-h">Cookies</p>
        <p className="cookie-banner-p">
          We&apos;d like to use cookies to see how the site is used and to measure our marketing. Nothing beyond what the site needs to run is set
          unless you accept. <Link href="/cookies">Cookie Policy</Link>
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="btn cookie-reject" onClick={() => choose(false)}>Reject all</button>
          <button type="button" className="btn btn-primary" onClick={() => choose(true)}>Accept all</button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so a visitor can change their choice. */
export function CookieSettingsButton() {
  return (
    <button type="button" className="foot-link-btn" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}
