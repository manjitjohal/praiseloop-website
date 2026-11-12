"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "../site/icons";

const EMPTY = { name: "", email: "", company: "", teamSize: "", crm: "" };
type Field = keyof typeof EMPTY;

export type DemoFormProps = {
  /** Values to show until the visitor edits that field (e.g. from /see-your-team). */
  defaults?: Partial<Record<Field, string>>;
  /** Sent as the lead's message, so the demo starts from what the visitor already told us. */
  context?: string;
  /** Don't ask for the email again when `defaults.email` is already known. */
  hideKnownEmail?: boolean;
};

/** The demo request form. Posts to /api/demo, which emails the lead to the team. */
export default function DemoForm({ defaults, context, hideKnownEmail }: DemoFormProps = {}) {
  const knownEmail = hideKnownEmail && defaults?.email ? defaults.email : "";
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const value = (field: Field) => (touched[field] ? form[field] : form[field] || defaults?.[field] || "");

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const lead = Object.fromEntries((Object.keys(EMPTY) as Field[]).map((f) => [f, value(f)]));
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context ? { ...lead, message: context } : lead),
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
      {knownEmail ? (
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" autoComplete="name" required value={value("name")} onChange={update("name")} />
          <span className="form-note left">We&apos;ll reply to {knownEmail}.</span>
        </div>
      ) : (
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Name *</label>
            <input id="name" autoComplete="name" required value={value("name")} onChange={update("name")} />
          </div>
          <div className="field">
            <label htmlFor="email">Work email *</label>
            <input id="email" type="email" autoComplete="email" required value={value("email")} onChange={update("email")} />
          </div>
        </div>
      )}
      <div className="field">
        <label htmlFor="company">Company *</label>
        <input id="company" autoComplete="organization" required value={value("company")} onChange={update("company")} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="teamSize">Team size *</label>
          <select id="teamSize" required value={value("teamSize")} onChange={update("teamSize")}>
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
          <select id="crm" required value={value("crm")} onChange={update("crm")}>
            <option value="">Select…</option>
            <option value="HubSpot">HubSpot</option>
            <option value="Salesforce">Salesforce</option>
            <option value="Other">Something else</option>
            <option value="None">We don&apos;t use one yet</option>
          </select>
        </div>
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
