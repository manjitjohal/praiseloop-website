import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

/**
 * Deactivated previous homepage.
 * Kept intact and viewable at /versionold but marked noindex and unlinked,
 * so it no longer competes with the live homepage in search.
 */
export const metadata: Metadata = {
  title: "PraiseLoop — previous homepage (archived)",
  robots: { index: false, follow: false },
};

export default function VersionOldPage() {
  return <LandingPage />;
}
