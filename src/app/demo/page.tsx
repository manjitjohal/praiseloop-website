"use client";

import { useState } from "react";
import Image from "next/image";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    employees: "",
    message: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to backend / email service
    setSubmitted(true);
  };

  return (
    <div className="demo-page">
      <header className="nav">
        <div className="container nav-row">
          <a href="/" aria-label="PraiseLoop">
            <Image src="/praiseloop-logo.png" alt="PraiseLoop" width={131} height={52} style={{ height: 52, width: "auto" }} priority />
          </a>
          <div className="nav-cta">
            <a href="https://app.praiseloop.com" className="btn btn-secondary" style={{ padding: "10px 16px", fontSize: 14 }}>Sign in</a>
          </div>
        </div>
      </header>

      <main className="demo-main">
        <div className="container">
          <div className="demo-grid">
            <div className="demo-copy">
              <h1>See PraiseLoop in action</h1>
              <p className="lede">
                30 minutes. We&apos;ll show you the full platform live — from someone hitting a target to the reward landing in their account. With your data, not a canned demo.
              </p>
              <div className="demo-benefits">
                <div className="demo-benefit">
                  <span className="demo-check">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>See the Outcome Engine fire rewards from your actual tools</span>
                </div>
                <div className="demo-benefit">
                  <span className="demo-check">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>Walk through the analytics dashboard with real-world data</span>
                </div>
                <div className="demo-benefit">
                  <span className="demo-check">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>Get a personalised ROI estimate for your organisation</span>
                </div>
                <div className="demo-benefit">
                  <span className="demo-check">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>No commitment — just a conversation about what&apos;s possible</span>
                </div>
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
                  <a href="/" className="btn btn-secondary" style={{ marginTop: 16 }}>Back to homepage</a>
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
                  <div className="form-field">
                    <label htmlFor="employees">Company size *</label>
                    <select id="employees" required value={form.employees} onChange={update("employees")}>
                      <option value="">Select...</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-2000">501-2,000 employees</option>
                      <option value="2001+">2,001+ employees</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">Anything specific you&apos;d like to see?</label>
                    <textarea id="message" rows={3} value={form.message} onChange={update("message")} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                    Request a demo
                  </button>
                  <p className="form-note">No spam, no pressure. We&apos;ll reach out within 24 hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
