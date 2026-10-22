import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import CookieBanner from "@/components/CookieBanner";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Google Analytics 4 property and Google Tag Manager container. Both run in
 * Google Consent Mode: storage is denied until the visitor accepts cookies
 * (CONSENT_DEFAULT_SCRIPT runs first; CookieBanner updates it).
 */
const GA_ID = "G-D51ZZLEPBP";
const GTM_ID = "GTM-57GNLCMQ";

const TITLE = "PraiseLoop · The AI coach for revenue teams";
const DESCRIPTION =
  "PraiseLoop is the AI coach for sales and customer success teams. It finds why each person's numbers moved, coaches the fix, and shows what it was worth. Works from your HubSpot data today.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.praiseloop.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "PraiseLoop",
    type: "website",
  },
  // Google Search Console ownership check.
  verification: { google: "HuFO6srtaMadFYeGuWmn3_mZBfDbxbY-ky8Hc_STInc" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <Script id="consent-default" strategy="beforeInteractive">{CONSENT_DEFAULT_SCRIPT}</Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <PostHogProvider>{children}</PostHogProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
