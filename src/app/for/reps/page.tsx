import type { Metadata } from "next";
import AudiencePage from "@/components/marketing/AudiencePage";
import { RepToday } from "@/components/marketing/mocks";

export const metadata: Metadata = {
  title: "For reps · PraiseLoop",
  description:
    "Your own coach finds what's holding your number back, gives you one habit to fix it, and shows you when it's working.",
};

export default function RepsPage() {
  return (
    <AudiencePage
      title={<>Go from behind your number to <span className="kw">beating it</span>.</>}
      lede="Your own coach finds what's holding your number back, gives you one habit to fix it, and shows you when it's working. It knows your target and your next accelerator, so you always know which deals matter most."
      media={<RepToday />}
      problem={{
        h: <>Feedback usually turns up at the <span className="kw">monthly 1:1</span>. By then the deal&apos;s gone.</>,
        paras: [
          "And “make more calls” doesn't help much if your problem is what happens after the proposal goes out.",
          "You had a great March. Do you know why? Most reps couldn't tell you.",
        ],
      }}
      points={[
        { h: "Where you stand", p: "How far you are from target and your next accelerator, every day." },
        { h: "Help before a call", p: "What matters about the deal, and the question worth asking." },
        { h: "Your own progress", p: "Measured against your own best weeks. There's no league table in it." },
      ]}
      objection={{
        q: "Is this my manager keeping tabs on me?",
        a: "It works from what's already in the CRM, which your manager can see today. If your company turns on call notes, the coach reads each call once to pull out next steps, then deletes its copy of the transcript. And there are no labels: you're ahead of target, on track or behind it. When the coach asks how you're doing, you choose what your manager sees.",
      }}
    />
  );
}
