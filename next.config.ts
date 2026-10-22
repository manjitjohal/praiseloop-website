import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // PostHog reverse proxy: events go to our own domain so ad blockers don't
  // drop them. Keep in sync with api_host in PostHogProvider.tsx.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // /roi-calculator became the sales calculator. Links to the original
  // company-wide model (shared or emailed before the move) always carry `sal`,
  // which the sales model never uses, so send those on with their query intact.
  async redirects() {
    return [
      {
        source: "/roi-calculator",
        has: [{ type: "query", key: "sal" }],
        destination: "/roi-calculator/company-wide",
        permanent: false,
      },
      // Retired pages (22 Oct 2026): send old links somewhere useful.
      { source: "/how-it-works", destination: "/product", permanent: true },
      { source: "/consultancies", destination: "/", permanent: true },
      { source: "/versionold", destination: "/", permanent: true },
      { source: "/v2.html", destination: "/", permanent: true },
    ];
  },
  // PostHog endpoints use trailing slashes; don't let Next redirect them.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
