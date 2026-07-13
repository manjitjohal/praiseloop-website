import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PraiseLoop — Recognition that proves its ROI",
  description:
    "PraiseLoop connects recognition to measurable outcomes — retention, engagement, and performance. When someone hits a target, PraiseLoop rewards them automatically and shows you the impact.",
  openGraph: {
    title: "PraiseLoop — Recognition that proves its ROI",
    description:
      "You invest in recognition. PraiseLoop proves it's working — with measurable impact on retention, engagement, and performance.",
    siteName: "PraiseLoop",
    type: "website",
  },
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
      className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
