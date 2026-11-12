import type { Metadata } from "next";
import MarketingPage from "@/components/marketing/MarketingPage";
import SeeYourTeam from "@/components/see-your-team/SeeYourTeam";

export const metadata: Metadata = {
  title: "See your team on PraiseLoop",
  description:
    "Five questions about how your sales team works, and a page built from your answers: when a slipping rep gets noticed today, and the brief your manager would open on Monday. No email to see it.",
  openGraph: {
    title: "See your team on PraiseLoop",
    description: "Five questions, and the Monday brief your sales manager would open, built from your answers.",
    siteName: "PraiseLoop",
    type: "website",
  },
};

export default function SeeYourTeamPage() {
  return (
    <MarketingPage cta={null}>
      <SeeYourTeam />
    </MarketingPage>
  );
}
