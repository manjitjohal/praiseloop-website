import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PlaybookForm from "@/components/site/PlaybookForm";
import { FinalCta } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "The sales coaching playbook · PraiseLoop",
  description:
    "The five CRM signals that tell a sales manager who to talk to this week, and four conversation scripts for the 1:1 that follows.",
  openGraph: {
    title: "The sales coaching playbook · PraiseLoop",
    description:
      "The five CRM signals that tell a sales manager who to talk to this week, and four conversation scripts for the 1:1 that follows.",
    siteName: "PraiseLoop",
    type: "website",
  },
};

const INSIDE = [
  { Ico: Icon.Search, h: "Five signals", p: "What in your CRM says a rep's week is changing, for better or worse, and who to talk to first." },
  { Ico: Icon.Message, h: "Four conversation scripts", p: "Ready-to-use openers for the 1:1 that follows, so the conversation is about what to do next." },
];

export default function PlaybookPage() {
  return (
    <div className="plh">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container gate-grid">
            <div>
              <span className="eyebrow">Free playbook</span>
              <h1>The sales coaching <span className="kw">playbook</span>.</h1>
              <p className="lede">
                Most managers know coaching moves the number. Few have time to work out who needs it this week. This playbook shows where to look in
                your CRM, and what to say when you find it.
              </p>
              <ul className="gate-list">
                {INSIDE.map((it) => (
                  <li key={it.h}>
                    <span className="ic"><it.Ico /></span>
                    <div><strong>{it.h}</strong><span>{it.p}</span></div>
                  </li>
                ))}
              </ul>
            </div>
            <PlaybookForm />
          </div>
        </section>
      </main>
      <FinalCta
        title={<>Rather see it <span className="kw">live</span>?</>}
        sub="A 20-minute demo, using the numbers your team already tracks."
      />
      <SiteFooter />
    </div>
  );
}
