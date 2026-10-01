import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CountUp from "@/components/site/CountUp";
import { Icon } from "@/components/site/icons";
import { BOOKING_URL, STATS, CtaBand, FinalCta, PageHero, PillarGrid, StatBand } from "@/components/site/blocks";

/**
 * Standalone landing page for finance leaders. Not in the main nav: it's sent
 * in outreach. Draft copy, so it stays out of search until signed off.
 */
export const metadata: Metadata = {
  title: "PraiseLoop for finance leaders · Incentive spend tied to results",
  description:
    "PraiseLoop runs sales rewards from your CRM. When the result is recorded, the reward lands. If it didn't happen, nothing is paid.",
  robots: { index: false, follow: true },
};

const ROI_URL = "/roi-calculator";

export default function CfoPage() {
  return (
    <div className="plh">
      <SiteHeader />
      <CountUp />

      <PageHero
        eyebrow="For CFOs and finance leaders"
        title={<>Pay for results that <span className="kw">actually happened</span>.</>}
        lede="PraiseLoop runs sales rewards from your CRM. When the result is recorded, the reward lands. If it didn't happen, nothing is paid."
        actions={
          <>
            <Link href={ROI_URL} className="btn btn-primary btn-arrow">Build the business case <Icon.Arrow /></Link>
            <Link href={BOOKING_URL} className="btn btn-ghost">Book a demo</Link>
          </>
        }
        meta="Works with HubSpot and Salesforce."
      />

      <PillarGrid
        tone="grey"
        eyebrow="What finance rarely sees"
        title={<>Incentive spend with no line back to the <span className="kw">result</span>.</>}
        items={[
          { Ico: Icon.Receipt, h: "Spend without a trail", p: "SPIFs, contests and spot bonuses get paid, but rarely link back to a result anyone can point to in the CRM." },
          { Ico: Icon.Clock, h: "Coaching nobody can measure", p: "Managers coach when they find the time. Nobody can show what it moved, or what it was worth." },
          { Ico: Icon.Gauge, h: "Misses found late", p: "The quarter-end report shows who missed target. By then the conversation is about the miss, not the fix." },
        ]}
      />

      <PillarGrid
        eyebrow="How PraiseLoop ties spend to results"
        title={<>Every reward traces back to a <span className="kw">CRM record</span>.</>}
        items={[
          { Ico: Icon.Layers, h: "Rules from incentives you already pay", p: "Reward rules are built from your existing incentive plan, so the spend is agreed before anyone earns it." },
          { Ico: Icon.Database, h: "The CRM is the trigger", p: "When HubSpot or Salesforce records the result, coins land, redeemable for real rewards. No result, no payout." },
          { Ico: Icon.Bars, h: "A CFO report at day 90", p: "A 90-day pilot ends with a report on your own numbers: what moved, what it cost, and the case for rolling out, or not." },
        ]}
        line="Not a replacement for your commission plan. It sits alongside it."
      />

      <StatBand
        eyebrow="The research"
        title={<>Recognition and reward both <span className="kw">move performance</span>.</>}
        stats={[STATS.recognise, STATS.reward]}
      />

      <CtaBand
        eyebrow="ROI calculator"
        title="Model it on your own numbers."
        body="Work out the added revenue from lifting your reps below target, then get a business case for finance: net return, payback month and a 90-day pilot plan."
        cta={{ label: "Build the business case", href: ROI_URL }}
      />

      <FinalCta
        title={<>See the loop on your own <span className="kw">KPIs</span>.</>}
        sub="A 20-minute demo, using the numbers your team already tracks."
        secondary={{ label: "Build the business case", href: ROI_URL }}
      />

      <SiteFooter />
    </div>
  );
}
