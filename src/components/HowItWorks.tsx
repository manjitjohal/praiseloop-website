import { Plug, Settings, Coins, Gift } from "lucide-react";

const steps = [
  {
    icon: Plug,
    step: 1,
    title: "Connect your tools",
    description:
      "Link Salesforce, HubSpot, Slack, or Microsoft Teams in minutes. PraiseLoop listens for the events that matter.",
  },
  {
    icon: Settings,
    step: 2,
    title: "Set recognition rules",
    description:
      "Define what gets rewarded — closed deals, quarterly targets, peer nominations. Set budgets and approval thresholds.",
  },
  {
    icon: Coins,
    step: 3,
    title: "Coins flow automatically",
    description:
      "When employees hit targets, coins land in their wallet instantly. Peer recognition adds more throughout the day.",
  },
  {
    icon: Gift,
    step: 4,
    title: "Redeem real rewards",
    description:
      "Employees browse gift cards from hundreds of brands and redeem with a tap. Real motivation, delivered.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Up and running in{" "}
            <span className="text-brand-teal">four steps</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            No complex rollout. Connect, configure, and start recognising your
            team today.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              {/* Step number */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-teal text-white text-lg font-bold mb-5">
                {item.step}
              </div>
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <item.icon size={28} className="text-brand-orange" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
