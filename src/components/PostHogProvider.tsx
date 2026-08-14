"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

/**
 * Wraps the app in PostHog analytics. No-op when the env vars are absent,
 * so local builds / previews without the key still work (same graceful
 * degradation as the Sanity data layer).
 *
 * `defaults: "2025-05-24"` turns on automatic pageview + pageleave capture,
 * including SPA route changes (App Router client navigation) — so we don't
 * need a manual route-change tracker.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      defaults: "2025-05-24",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
