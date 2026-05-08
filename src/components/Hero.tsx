import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-teal-dark to-brand-teal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            Performance-linked recognition
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Recognition that{" "}
            <span className="text-brand-orange">drives results</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Automate employee recognition tied to real KPIs. PraiseLoop connects
            to your CRM, awards coins when targets are hit, and lets employees
            redeem real rewards.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-orange-hover transition-colors shadow-lg shadow-brand-orange/25"
            >
              Book a Demo
              <ArrowRight size={18} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "3x", label: "Recognition uplift" },
              { value: "89%", label: "Employee engagement" },
              { value: "<5min", label: "Setup time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs md:text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V20C240 50 480 0 720 20C960 40 1200 0 1440 20V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
