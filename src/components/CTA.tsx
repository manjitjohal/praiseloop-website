import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-20 md:py-28 bg-gradient-to-br from-brand-teal-dark to-brand-teal"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Ready to transform how your team gets recognised?
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
          Join companies using PraiseLoop to drive engagement, retain top
          talent, and link recognition to real business outcomes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@praiseloop.com"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-8 py-4 text-base font-semibold text-white hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/25"
          >
            Book a Demo
            <ArrowRight size={18} />
          </a>
          <a
            href="mailto:hello@praiseloop.com"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            Contact Sales
          </a>
        </div>
        <p className="mt-6 text-sm text-white/50">
          Free for up to 20 users. No credit card required.
        </p>
      </div>
    </section>
  );
}
