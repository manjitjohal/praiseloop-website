import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Icon } from "@/components/site/icons";
import { BOOKING_URL, CtaBand, FinalCta, NotList, PageHero, PillarGrid, TextSection } from "@/components/site/blocks";

/**
 * Standalone landing page for consultancies: the same loop, with utilisation
 * instead of pipeline as the numbers. Not in the main nav: it's sent in
 * outreach. Draft copy, so it stays out of search until signed off.
 */
export const metadata: Metadata = {
  title: "PraiseLoop for consultancies · Coach the hours that bill",
  description:
    "PraiseLoop coaches every manager and consultant on utilisation and billable hours, then recognises and rewards the results automatically.",
  robots: { index: false, follow: true },
};

export default function ConsultanciesPage() {
  return (
    <div className="plh">
      <SiteHeader />

      <PageHero
        eyebrow="For consultancies"
        title={<>Coach your consultants on the <span className="kw">hours that bill</span>.</>}
        lede="Same loop, different numbers. PraiseLoop coaches every manager and consultant on utilisation and billable hours, then recognises and rewards the results automatically."
        actions={
          <>
            <Link href={BOOKING_URL} className="btn btn-primary btn-arrow">Book a demo <Icon.Arrow /></Link>
            <Link href="/#how" className="btn btn-ghost">See how the loop works</Link>
          </>
        }
      />

      <PillarGrid
        tone="grey"
        eyebrow="The problem"
        title={<>In a consultancy, your pipeline is your people&apos;s <span className="kw">time</span>.</>}
        items={[
          { Ico: Icon.Clock, h: "Utilisation slips quietly", p: "A few unbilled hours a week don't show until the month-end report. By then it's a miss to explain, not a habit to fix." },
          { Ico: Icon.Users, h: "Managers bill too", p: "Team leads carry their own client work. Coaching the team is the first thing to go when the week fills up." },
          { Ico: Icon.Sparkles, h: "Good months go unnoticed", p: "When a consultant has their best month, often the only thing that notices is the invoice." },
        ]}
      />

      <PillarGrid
        eyebrow="One loop"
        title={<>Coach. Recognise. <span className="kw">Reward</span>. On utilisation.</>}
        items={[
          { Ico: Icon.Message, h: "Coach", p: "Managers see whose utilisation moved this week and the conversation to have. Consultants see their own numbers, privately." },
          { Ico: Icon.Sparkles, h: "Recognise", p: <>Recognition that names the result: &ldquo;38 billable hours this week, your best this quarter.&rdquo; People believe it because it&apos;s specific.</> },
          { Ico: Icon.Gift, h: "Reward", p: "Rules built from the incentives you already pay. When the hours are logged, coins land, redeemable for real rewards." },
        ]}
        line="Coaching moves the numbers. Recognition and rewards lock in what worked."
      />

      <TextSection tone="grey" eyebrow="Where the numbers come from" title="Starts with your CRM. Tell us where your hours live.">
        <p>PraiseLoop reads from HubSpot and Salesforce today. If utilisation and billable hours live in a timesheet or PSA tool, tell us which one and we&apos;ll scope the connection with you.</p>
      </TextSection>

      <NotList
        title={<>Coaching, not <span className="kw">timesheet surveillance</span>.</>}
        items={[
          { Ico: Icon.EyeOff, text: <><strong>Not a leaderboard</strong> that ranks your people.</> },
          { Ico: Icon.Receipt, text: <><strong>Not a replacement for your bonus scheme.</strong> It sits alongside it.</> },
          { Ico: Icon.Clock, text: <><strong>No screen or activity tracking.</strong> It works from the numbers you already record.</> },
        ]}
      />

      <CtaBand
        eyebrow="Early access"
        title="We're onboarding our first teams now."
        body="If you run a team of five or more, we'd like to set PraiseLoop up on your own numbers and show you the loop working with your data."
        cta={{ label: "Talk to us about early access", href: BOOKING_URL }}
      />

      <FinalCta
        title={<>See the loop on your own <span className="kw">numbers</span>.</>}
        sub="A 20-minute demo, using the numbers your team already tracks."
      />

      <SiteFooter />
    </div>
  );
}
