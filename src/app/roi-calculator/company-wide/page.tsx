import type { Metadata } from "next";
import CompanyRoiCalculator from "@/components/roi/CompanyRoiCalculator";

export const metadata: Metadata = {
  title: "Company-wide ROI Calculator · PraiseLoop",
  description:
    "Model what performance-linked recognition is worth to your P&L across the company: regretted exits avoided, productivity on the movable middle and absence days recovered. No email needed to see your number.",
  openGraph: {
    title: "What's it worth to your P&L? · PraiseLoop company-wide ROI calculator",
    description:
      "Four numbers from your HRIS, two minutes, and a model your CFO can check line by line.",
    siteName: "PraiseLoop",
    type: "website",
  },
};

export default function CompanyRoiCalculatorPage() {
  return <CompanyRoiCalculator />;
}
