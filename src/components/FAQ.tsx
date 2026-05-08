"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does automated recognition work?",
    answer:
      "You create rules in the Coin Engine — for example, 'award 200 coins when a Salesforce deal closes above \u00A310,000'. PraiseLoop listens to webhooks from your CRM and awards coins to the relevant employee automatically. No manual work required.",
  },
  {
    question: "What rewards can employees redeem?",
    answer:
      "PraiseLoop integrates with Tremendous to offer gift cards from hundreds of brands — Amazon, John Lewis, Uber, and more. Employees browse a catalogue and redeem coins instantly.",
  },
  {
    question: "Is there a minimum team size?",
    answer:
      "No. The Starter plan is free for up to 20 employees. Growth and Enterprise plans scale with your organisation.",
  },
  {
    question: "How do budgets and approvals work?",
    answer:
      "Admins mint coins into a master pool, then allocate budgets to departments and managers. High-value awards above a configurable threshold require manager approval before coins transfer.",
  },
  {
    question: "Can we customise the branding?",
    answer:
      "Yes. Enterprise customers get full white-label branding — your logo, your colours, your coin name. The platform looks like your own product.",
  },
  {
    question: "What integrations are supported?",
    answer:
      "Salesforce, HubSpot, Slack, and Microsoft Teams today. We're adding more CRM and HRIS connectors based on customer demand.",
  },
  {
    question: "Is our data secure?",
    answer:
      "PraiseLoop uses an append-only double-entry ledger with row-level locking. All data is multi-tenant isolated by organisation. We support SSO via Google and Microsoft OIDC.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-bg-secondary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Everything you need to know about PraiseLoop.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border-default bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-base font-semibold text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-text-secondary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
