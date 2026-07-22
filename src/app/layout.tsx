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
  title: "PraiseLoop — Reward outcomes, not effort",
  description:
    "PraiseLoop spots when good people start to slip and helps managers turn it around at the right moment. The AI drafts the recognition, your systems trigger the reward, and you see the payback on your own data.",
  openGraph: {
    title: "PraiseLoop — Reward outcomes, not effort",
    description:
      "The performance platform that catches great work early, prompts the manager, and proves the payback on your own data.",
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
