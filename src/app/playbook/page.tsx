import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PlaybookForm from "@/components/site/PlaybookForm";
import { FinalCta } from "@/components/site/blocks";
import { Icon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "The sales coaching playbook · PraiseLoop",
  description:
    "A free guide for sales managers: how to find the real gap behind a rep's number, put together a two-week plan, and tell whether it worked.",
  openGraph: {
    title: "The sales coaching playbook · PraiseLoop",
    description:
      "A free guide for sales managers: how to find the real gap behind a rep's number, put together a two-week plan, and tell whether it worked.",
    siteName: "PraiseLoop",
    type: "website",
  },
};

const INSIDE = [
  { Ico: Icon.Search, h: "The five gaps", p: "Activity, conversion at a stage, pipeline quality, a drop from normal, and a rise worth sharing." },
  { Ico: Icon.Calendar, h: "Two-week plans", p: "A template for each gap." },
  { Ico: Icon.Trending, h: "Measuring it", p: "Before and after, against the rep's own normal." },
];

export default function PlaybookPage() {
  return (
    <div className="plh">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container gate-grid">
            <div>
              <span className="eyebrow">Free playbook · coming soon</span>
              <h1>The sales coaching <span className="kw">playbook</span>.</h1>
              <p className="lede">
                Most managers know coaching moves the number. Few have time to work out who needs it this week. This playbook shows how to find the real
                gap behind a rep&apos;s number, put together a two-week plan, and tell whether it worked.
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
