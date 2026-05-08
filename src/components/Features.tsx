import {
  Trophy,
  Zap,
  Users,
  Gift,
  BarChart3,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Peer-to-Peer Recognition",
    description:
      "Employees send recognitions with value badges and optional coin rewards. Build a culture of appreciation across every team.",
  },
  {
    icon: Zap,
    title: "Automated CRM Awards",
    description:
      "Connect Salesforce or HubSpot. When a deal closes or a target is hit, coins are awarded automatically — no manual work.",
  },
  {
    icon: Users,
    title: "Manager Approvals",
    description:
      "High-value awards route through approval workflows. Managers review, approve, or reject with full audit trails.",
  },
  {
    icon: Gift,
    title: "Real Rewards Redemption",
    description:
      "Employees redeem coins for gift cards from hundreds of brands via Tremendous. Real incentives, not just kudos.",
  },
  {
    icon: BarChart3,
    title: "Budget Controls",
    description:
      "Mint coins, allocate department budgets, set peer allowances, and track spend — all from a single admin dashboard.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "Multi-tenant architecture, SSO with Google & Microsoft, append-only ledger, and full white-label branding per org.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Everything you need to{" "}
            <span className="text-brand-orange">recognise great work</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            From peer shout-outs to automated KPI rewards, PraiseLoop handles
            the full recognition lifecycle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border-default bg-white p-8 hover:shadow-lg hover:border-brand-teal/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-bg-light-teal text-brand-teal mb-5">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
