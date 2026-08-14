import { NextResponse } from "next/server";

/**
 * Demo-request handler.
 *
 * Receives the /demo form submission and emails the lead to the PraiseLoop
 * inbox via Resend (https://resend.com). Uses Resend's REST API directly so we
 * don't add an npm dependency.
 *
 * Env:
 *   RESEND_API_KEY   (required) — secret API key from the Resend dashboard.
 *   DEMO_TO_EMAIL    (optional) — where leads are sent. Default hello@praiseloop.com.
 *   DEMO_FROM_EMAIL  (optional) — sender address. Defaults to the verified Resend
 *                                 subdomain sender below (updates.praiseloop.com);
 *                                 only override if the verified domain changes. Must
 *                                 always be an address on a domain verified in Resend.
 *
 * Without RESEND_API_KEY the route fails loudly (503) rather than silently
 * dropping the lead — the caller shows a "email us directly" fallback.
 */

const TO_EMAIL = process.env.DEMO_TO_EMAIL || "hello@praiseloop.com";
const FROM_EMAIL = process.env.DEMO_FROM_EMAIL || "PraiseLoop <noreply@updates.praiseloop.com>";

type DemoLead = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  employees?: string;
  message?: string;
};

const esc = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c] || c);

export async function POST(req: Request) {
  let data: DemoLead;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { firstName, lastName, email, company, jobTitle, employees, message } = data || {};

  // Mirror the form's required fields.
  if (!firstName || !lastName || !email || !company || !employees) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[demo] RESEND_API_KEY is not set — cannot deliver demo request.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const fields: [string, string | undefined][] = [
    ["Name", fullName],
    ["Work email", email],
    ["Company", company],
    ["Job title", jobTitle],
    ["Company size", employees],
    ["Message", message],
  ];
  const present = fields.filter(([, v]) => v && v.trim());

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">New demo request</h2>
      <table style="border-collapse:collapse">
        ${present
          .map(
            ([k, v]) =>
              `<tr><td style="padding:5px 16px 5px 0;color:#667;vertical-align:top"><strong>${k}</strong></td><td style="padding:5px 0">${esc(v!)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;
  const text = present.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New demo request · ${company}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[demo] Resend send failed (${res.status}): ${detail}`);
      return NextResponse.json({ error: "Could not send your request." }, { status: 502 });
    }
  } catch (err) {
    console.error("[demo] Resend request threw:", err);
    return NextResponse.json({ error: "Could not send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
