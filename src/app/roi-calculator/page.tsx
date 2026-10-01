import type { Metadata } from "next";
import SalesRoiCalculator from "@/components/roi/SalesRoiCalculator";

export const metadata: Metadata = {
  title: "Sales ROI Calculator · PraiseLoop",
  description:
    "Model what lifting your reps below target is worth: company revenue against sales team size, your gap to target, and the added revenue from closing part of it. No email needed to see your number.",
  openGraph: {
    title: "How much revenue is sitting below target? · PraiseLoop ROI calculator",
    description:
      "Your revenue, your sales team and how many reps are below target. Two minutes, and a model your CFO can check line by line.",
    siteName: "PraiseLoop",
    type: "website",
  },
};

export default function SalesRoiCalculatorPage() {
  return <SalesRoiCalculator />;
}
