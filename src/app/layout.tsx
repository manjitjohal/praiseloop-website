import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PraiseLoop — Performance-linked recognition & rewards",
  description:
    "Automate employee recognition tied to real KPIs. PraiseLoop connects to your CRM, awards coins when targets are hit, and lets employees redeem real rewards.",
  openGraph: {
    title: "PraiseLoop — Performance-linked recognition & rewards",
    description:
      "Automate employee recognition tied to real KPIs. Award coins, redeem real rewards.",
    siteName: "PraiseLoop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PraiseLoop — Performance-linked recognition & rewards",
    description:
      "Automate employee recognition tied to real KPIs. Award coins, redeem real rewards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
