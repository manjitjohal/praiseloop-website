import type { Metadata } from "next";
import AudiencePage from "@/components/marketing/AudiencePage";
import { Coach, ExampleData } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "For CSMs · A coach for customer success managers · PraiseLoop",
  description:
    "Your own coach spots what's changed in how your accounts are moving, gives you one habit to try, and shows you when it's working.",
};

function CsmToday() {
  return (
    <div className="app narrow">
      <div className="app-top">
        <span className="av t">NK</span>
        <div>
          <div className="hello">Today, Nadia</div>
          <div className="sub">Tuesday · 4 renewals due in the next 90 days</div>
        </div>
        <ExampleData />
      </div>
      <div className="panel target">
        <div className="target-h"><span>Renewals on track</span><span>5 of 7</span></div>
        <div className="bar lt"><span style={{ width: "71%" }} /></div>
        <div className="target-note"><b>2 accounts reach month 8 this month.</b> Northwind and Brightway are due a renewal conversation.</div>
      </div>
      <Coach
        text="Your clients are hearing from you. The gap is how the calls end: 7 of your last 10 finished without an agreed next step. For two weeks, close every call with one next step and a date. I'll show you if it works."
        primary="Start this week"
        secondary="Why this?"
      />
      <div className="mini note">
        <span className="lab">Before your 2pm with Brightway</span>
        <div>On your last call they asked about adding a second team. Worth picking up before you talk renewal.</div>
      </div>
    </div>
  );
}

export default function CsmsPage() {
  return (
    <AudiencePage
      eyebrow="For CSMs"
      title={<>A coach that knows your book, your numbers and <span className="kw">your best quarters</span>.</>}
      lede="Your own coach spots what's changed in how your accounts are moving, gives you one habit to try, and shows you when it's working. It knows which renewals are coming up, so you know where your week should go."
      media={<CsmToday />}
      problem={{
        h: <>Feedback usually turns up at the <span className="kw">quarterly review</span>. By then the renewal&apos;s already wobbling.</>,
        paras: [
          "And “talk to your clients more” doesn't help if you're already on every call. It's what happens on them that counts.",
          "You had a great quarter last year. Do you know why? Most CSMs couldn't tell you.",
        ],
      }}
      points={[
        { h: "Where you stand", p: "Which renewals are on track, which need you, and what's coming up." },
        { h: "Help before a call", p: "What matters about the account, and the question worth asking." },
        { h: "Your own progress", p: "Measured against your own best quarters, not against each other." },
      ]}
      objection={{
        q: "Is this my team lead keeping tabs on me?",
        a: "It works from what's already in the CRM, which your team lead can see today. If your company turns on call notes, the coach reads each call to pull out next steps. And there are no labels: you're ahead of target, on track or behind it. When the coach asks how you're doing, you choose what your team lead sees.",
      }}
    />
  );
}
