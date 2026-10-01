"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const BENEFITS = [
  "See what a manager sees each week: what changed in the CRM, and the conversation to have",
  "Watch a result in your CRM turn into recognition and coins, automatically",
  "Walk through a 90-day pilot and the CFO report at the end of it",
  "No commitment, just a conversation about what's possible",
];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    teamSize: "",
    crm: "",
    message: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="demo-page">
      <SiteHeader />

      <main className="demo-main">
        <div className="container">
          <div className="demo-grid">
            <div className="demo-copy">
              <h1>See PraiseLoop in action</h1>
              <p className="lede">
                20 minutes, using the numbers your team already tracks. We&apos;ll show you the loop live, from a result landing in your CRM to the coaching
                moment, the recognition and the reward.
              </p>
              <div className="demo-benefits">
                {BENEFITS.map((b) => (
                  <div key={b} className="demo-benefit">
                    <span className="demo-check">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-form-wrap">
              {submitted ? (
                <div className="demo-success">
                  <div className="demo-success-icon">
                    <svg width="32" height="32" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h2>Thanks! We&apos;ll be in touch.</h2>
                  <p>One of our team will reach out within 24 hours to schedule your demo.</p>
                  <Link href="/" className="btn btn-secondary" style={{ marginTop: 16 }}>Back to homepage</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="demo-form">
                  <h3>Book your demo</h3>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="firstName">First name *</label>
                      <input id="firstName" type="text" required value={form.firstName} onChange={update("firstName")} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastName">Last name *</label>
                      <input id="lastName" type="text" required value={form.lastName} onChange={update("lastName")} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Work email *</label>
                    <input id="email" type="email" required value={form.email} onChange={update("email")} />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="company">Company *</label>
                      <input id="company" type="text" required value={form.company} onChange={update("company")} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="jobTitle">Job title</label>
                      <input id="jobTitle" type="text" value={form.jobTitle} onChange={update("jobTitle")} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="teamSize">Sales team size *</label>
                      <select id="teamSize" required value={form.teamSize} onChange={update("teamSize")}>
                        <option value="">Select...</option>
                        <option value="Under 5">Under 5 people</option>
                        <option value="5-20">5–20 people</option>
                        <option value="21-50">21–50 people</option>
                        <option value="51-200">51–200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="crm">CRM *</label>
                      <select id="crm" required value={form.crm} onChange={update("crm")}>
                        <option value="">Select...</option>
                        <option value="HubSpot">HubSpot</option>
                        <option value="Salesforce">Salesforce</option>
                        <option value="Other">Something else</option>
                        <option value="None">We don&apos;t use one yet</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">Anything specific you&apos;d like to see?</label>
                    <textarea id="message" rows={3} value={form.message} onChange={update("message")} />
                  </div>
                  <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8, opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "default" : "pointer" }}>
                    {status === "sending" ? "Sending…" : "Request a demo"}
                  </button>
                  {status === "error" ? (
                    <p className="form-note" style={{ color: "#c0392b" }}>
                      Something went wrong sending your request. Please email us directly at{" "}
                      <a href="mailto:hello@praiseloop.com" style={{ color: "inherit", textDecoration: "underline" }}>hello@praiseloop.com</a>.
                    </p>
                  ) : (
                    <p className="form-note">No spam, no pressure. We&apos;ll reach out within 24 hours.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
