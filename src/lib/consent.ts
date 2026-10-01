/**
 * Cookie consent: one stored choice that drives Google Consent Mode (GA4 and
 * Tag Manager) and PostHog. Nothing non-essential sets a cookie until the
 * visitor accepts. Read and written in the browser only.
 */

export type Consent = "granted" | "denied";

export const CONSENT_KEY = "pl-cookie-consent";
/** Fired on window when the choice changes (detail: Consent). */
export const CONSENT_EVENT = "pl:consent";
/** Fired on window to reopen the banner (the footer's "Cookie settings"). */
export const OPEN_SETTINGS_EVENT = "pl:cookie-settings";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

type Gtag = (...args: unknown[]) => void;

/** Expire cookies by name prefix on this host and its parent domains. */
function clearCookies(prefixes: string[]) {
  const parts = location.hostname.split(".");
  const domains = ["", ...parts.map((_, i) => "." + parts.slice(i).join(".")).slice(0, -1)];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!prefixes.some((p) => name.startsWith(p))) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    /* private mode: the choice holds for this page view */
  }

  const state = consent === "granted" ? "granted" : "denied";
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  w.gtag?.("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
  w.dataLayer?.push({ event: "cookie_consent_update", cookie_consent: consent });

  // Withdrawing consent removes what was set while it was given.
  if (consent === "denied") clearCookies(["_ga", "_gid", "_gcl", "ph_"]);

  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

/**
 * Runs first in <head>, before Tag Manager and gtag load: consent defaults to
 * denied unless the visitor already accepted on an earlier visit.
 */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}var s=c==='granted'?'granted':'denied';gtag('consent','default',{analytics_storage:s,ad_storage:s,ad_user_data:s,ad_personalization:s,wait_for_update:500});gtag('set','ads_data_redaction',s==='denied');`;
