import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

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

export const metadata: Metadata = {
  title: "PraiseLoop · AI-Powered Performance, Recognition & Rewards",
  description:
    "Rewards are earned, not given. PraiseLoop plugs into the systems where work is measured. When a verified KPI result lands, recognition and reward fire automatically. If the result didn't happen, the reward doesn't exist.",
  openGraph: {
    title: "PraiseLoop · AI-Powered Performance, Recognition & Rewards",
    description:
      "One connected loop: the AI watches the outcomes you already track, prompts the manager, fires the reward, and proves the payback on your own data.",
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
      className={`${figtree.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
