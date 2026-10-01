"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

/**
 * Wraps the app in PostHog analytics. No-op when the env vars are absent,
 * so local builds / previews without the key still work (same graceful
 * degradation as the Sanity data layer).
 *
 * Starts only once the visitor accepts cookies (see CookieBanner), and stops
 * capturing if they later withdraw.
 *
 * `defaults: "2025-05-24"` turns on automatic pageview + pageleave capture,
 * including SPA route changes (App Router client navigation) — so we don't
 * need a manual route-change tracker.
 *
 * Events go through the `/ingest` rewrites in next.config.ts (EU cloud) so
 * ad blockers don't drop them.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    const start = () => {
      if (posthog.__loaded) {
        posthog.opt_in_capturing();
        return;
      }
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        defaults: "2025-05-24",
      });
    };

    if (readConsent() === "granted") start();

    const onConsent = (e: Event) => {
      const consent = (e as CustomEvent<Consent>).detail;
      if (consent === "granted") start();
      else if (posthog.__loaded) posthog.opt_out_capturing();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
