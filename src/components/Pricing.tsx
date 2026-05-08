import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "up to 20 employees",
    description: "Perfect for small teams getting started with recognition.",
    features: [
      "Peer-to-peer recognition",
      "Company feed & leaderboard",
      "Basic analytics",
      "Slack integration",
      "Up to 20 users",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "\u00A349",
    period: "per month",
    description: "For growing teams that want automation and real rewards.",
    features: [
      "Everything in Starter",
      "CRM automation (Salesforce, HubSpot)",
      "Gift card redemption",
      "Budget & approval workflows",
      "Up to 200 users",
      "Manager dashboards",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored to your org",
    description: "White-label, SSO, and dedicated support for large organisations.",
    features: [
      "Everything in Growth",
      "Unlimited users",
      "White-label branding",
      "SSO (Google & Microsoft)",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & priority support",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Simple, transparent{" "}
            <span className="text-brand-orange">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Start free, upgrade when you need automation and rewards.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-brand-teal-dark text-white ring-2 ring-brand-orange shadow-xl scale-[1.02]"
                  : "bg-white border border-border-default"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  plan.highlighted ? "text-white" : "text-text-primary"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? "text-white" : "text-text-primary"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? "text-white/70" : "text-text-secondary"
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className={`mt-3 text-sm ${
                  plan.highlighted ? "text-white/80" : "text-text-secondary"
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        plan.highlighted
                          ? "text-brand-orange"
                          : "text-brand-teal"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-white/90" : "text-text-secondary"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand-orange text-white hover:bg-brand-orange-hover"
                    : "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
