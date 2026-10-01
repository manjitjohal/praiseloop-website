"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { PLAYBOOK_PDF } from "@/lib/playbook";
import { Icon } from "./icons";

/** The email gate for the sales coaching playbook. */
export default function PlaybookForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("done");
      if (posthog.__loaded) posthog.capture("playbook_requested", { ready: Boolean(PLAYBOOK_PDF) });
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="gate-card gate-done" aria-live="polite">
        <span className="gate-done-ic"><Icon.Check /></span>
        {PLAYBOOK_PDF ? (
          <>
            <h2>It&apos;s on its way.</h2>
            <p>We&apos;ve emailed the playbook to <b>{email}</b>. You can also download it now.</p>
            <a href={PLAYBOOK_PDF} className="btn btn-primary" download><Icon.Download /> Download the playbook</a>
          </>
        ) : (
          <>
            <h2>You&apos;re on the list.</h2>
            <p>We&apos;ll send the playbook to <b>{email}</b> the day it&apos;s ready.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="gate-card">
      <h2>{PLAYBOOK_PDF ? "Get the playbook" : "Get it first"}</h2>
      <p>
        {PLAYBOOK_PDF
          ? "Enter your work email and we'll send it straight over."
          : "We're putting the finishing touches to it. Leave your work email and we'll send it the day it's ready."}
      </p>
      <form className="gate-form" onSubmit={submit}>
        <span className="gate-input">
          <Icon.Mail />
          <input
            type="email"
            required
            placeholder="you@company.com"
            aria-label="Work email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <button type="submit" className="btn btn-primary btn-arrow" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Send me the playbook <Icon.Arrow /></>}
        </button>
      </form>
      {status === "error" ? (
        <p className="gate-fine is-error">
          Something went wrong. Email <a href="mailto:hello@praiseloop.com">hello@praiseloop.com</a> and we&apos;ll send it to you directly.
        </p>
      ) : (
        <p className="gate-fine">Our team sees your request too, so any follow-up starts from it.</p>
      )}
    </div>
  );
}
