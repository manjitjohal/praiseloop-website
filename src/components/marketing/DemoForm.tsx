"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../site/icons";

const EMPTY = { firstName: "", lastName: "", email: "", company: "", jobTitle: "", team: "Sales", teamSize: "", crm: "", csTool: "", message: "" };
const TEAMS = ["Sales", "Customer success", "Both"];
type Field = keyof typeof EMPTY;

/** The demo request form. Posts to /api/demo, which emails the lead to the team. */
export default function DemoForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-card done" role="status">
        <span className="done-ic"><Icon.Check /></span>
        <h2>Thanks, we&apos;ll be in touch.</h2>
        <p>One of the team will email you within 24 hours to find a time.</p>
        <Link className="textlink" href="/product">See how the product works in the meantime</Link>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Book your demo</h2>
      <div className="field-row">
        <div className="field">
          <label htmlFor="firstName">First name *</label>
          <input id="firstName" autoComplete="given-name" required value={form.firstName} onChange={update("firstName")} />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name *</label>
          <input id="lastName" autoComplete="family-name" required value={form.lastName} onChange={update("lastName")} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Work email *</label>
        <input id="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="company">Company *</label>
          <input id="company" autoComplete="organization" required value={form.company} onChange={update("company")} />
        </div>
        <div className="field">
          <label htmlFor="jobTitle">Job title</label>
          <input id="jobTitle" autoComplete="organization-title" value={form.jobTitle} onChange={update("jobTitle")} />
        </div>
      </div>
      <fieldset className="field">
        <legend className="field-legend">Your team *</legend>
        <div className="pick">
          {TEAMS.map((t) => (
            <button key={t} type="button" className={form.team === t ? "on" : ""} aria-pressed={form.team === t} onClick={() => setForm((f) => ({ ...f, team: t, csTool: t === "Sales" ? "" : f.csTool }))}>{t}</button>
          ))}
        </div>
      </fieldset>
      <div className="field-row">
        <div className="field">
          <label htmlFor="teamSize">Team size *</label>
          <select id="teamSize" required value={form.teamSize} onChange={update("teamSize")}>
            <option value="">Select…</option>
            <option value="Under 5">Under 5 people</option>
            <option value="5-20">5–20 people</option>
            <option value="21-50">21–50 people</option>
            <option value="51-200">51–200 people</option>
            <option value="200+">200+ people</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="crm">CRM *</label>
          <select id="crm" required value={form.crm} onChange={update("crm")}>
            <option value="">Select…</option>
            <option value="HubSpot">HubSpot</option>
            <option value="Salesforce">Salesforce</option>
            <option value="Other">Something else</option>
            <option value="None">We don&apos;t use one yet</option>
          </select>
        </div>
      </div>
      {form.team !== "Sales" && (
        <div className="field">
          <label htmlFor="csTool">What do you use for customer success? (optional)</label>
          <select id="csTool" value={form.csTool} onChange={update("csTool")}>
            <option value="">Select…</option>
            <option value="HubSpot Service Hub">HubSpot Service Hub</option>
            <option value="Gainsight">Gainsight</option>
            <option value="ChurnZero">ChurnZero</option>
            <option value="Zendesk">Zendesk</option>
            <option value="Intercom">Intercom</option>
            <option value="Other">Other</option>
            <option value="None">None</option>
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="message">What would you most like to fix?</label>
        <textarea id="message" rows={3} value={form.message} onChange={update("message")} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Book a demo"}
      </button>
      {status === "error" ? (
        <p className="form-note error" role="alert">
          Something went wrong sending your request. Please email us at <a href="mailto:hello@praiseloop.com">hello@praiseloop.com</a>.
        </p>
      ) : (
        <p className="form-note">No spam, no pressure. We&apos;ll reply within 24 hours.</p>
      )}
    </form>
  );
}
