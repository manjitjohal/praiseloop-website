import { NextResponse } from "next/server";
import { PLAYBOOK_PDF } from "@/lib/playbook";

/**
 * Sales coaching playbook gate.
 *
 * Emails the visitor (the PDF link once PLAYBOOK_PDF is set, otherwise a
 * confirmation that it's on its way) and sends the lead to the PraiseLoop
 * inbox. Same Resend setup as /api/demo (see that route for the env vars).
 */

const TO_EMAIL = process.env.DEMO_TO_EMAIL || "hello@praiseloop.com";
const FROM_EMAIL = process.env.DEMO_FROM_EMAIL || "PraiseLoop <noreply@updates.praiseloop.com>";

const PERSONAL_DOMAINS = /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|mac|aol|proton|protonmail|gmx|mail|yandex)\./i;

const esc = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c] || c);

async function send(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend send failed (${res.status}): ${detail}`);
  }
}

const FONT = "font-family:Arial,Helvetica,sans-serif";
const button = (href: string, label: string, bg: string) =>
  `<a href="${href}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px;margin:0 8px 8px 0">${label}</a>`;

export async function POST(req: Request) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[playbook] RESEND_API_KEY is not set — cannot deliver the playbook.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const origin = new URL(req.url).origin;
  const pdfUrl = PLAYBOOK_PDF ? `${origin}${PLAYBOOK_PDF}` : null;
  const demoLink = `${origin}/demo`;

  const html = `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.55;max-width:600px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1B6B6B;font-weight:700">PraiseLoop · Sales coaching playbook</p>
    ${
      pdfUrl
        ? `<h2 style="margin:0 0 12px;font-size:22px;line-height:1.25">Here's your sales coaching playbook.</h2>
    <p style="margin:0 0 20px">The five CRM signals that tell a manager who to talk to this week, and four conversation scripts for the 1:1 that follows.</p>
    <div style="margin:0 0 20px">${button(pdfUrl, "Download the playbook", "#F26522")}</div>`
        : `<h2 style="margin:0 0 12px;font-size:22px;line-height:1.25">You're on the list for the sales coaching playbook.</h2>
    <p style="margin:0 0 20px">We're putting the finishing touches to it. We'll send it to this address the day it's ready: the five CRM signals that tell a manager who to talk to this week, and four conversation scripts for the 1:1 that follows.</p>`
    }
    <p style="margin:0 0 16px;color:#64707E">Rather see the loop running on your own numbers? It's a 20-minute demo.</p>
    <div>${button(demoLink, "Book a demo", "#1B6B6B")}</div>
  </div>`;

  const text = [
    pdfUrl ? "Here's your PraiseLoop sales coaching playbook:" : "You're on the list for the PraiseLoop sales coaching playbook.",
    pdfUrl ?? "We're putting the finishing touches to it, and we'll send it to this address the day it's ready.",
    "",
    `Rather see the loop running on your own numbers? Book a 20-minute demo: ${demoLink}`,
  ].join("\n");

  const personal = PERSONAL_DOMAINS.test(email);
  const sends = await Promise.allSettled([
    send(apiKey, {
      to: [email],
      reply_to: TO_EMAIL,
      subject: pdfUrl ? "Your PraiseLoop sales coaching playbook" : "You're on the list: the PraiseLoop sales coaching playbook",
      html,
      text,
    }),
    send(apiKey, {
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Playbook request · ${email.split("@")[1]}`,
      html: `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.5">
        <h2 style="margin:0 0 12px;font-size:18px">New sales coaching playbook request</h2>
        <p style="margin:0"><b>${esc(email)}</b>${personal ? ' <span style="color:#D9551A">(personal email domain)</span>' : ""}</p>
        <p style="margin:12px 0 0;color:#64707E">${pdfUrl ? "They were sent the PDF." : "The PDF isn't live yet: they're waiting for it."}</p>
      </div>`,
      text: `New sales coaching playbook request: ${email}${personal ? " (personal email domain)" : ""}\n${pdfUrl ? "Sent the PDF." : "Waiting for the PDF."}`,
    }),
  ]);

  sends.forEach((s) => {
    if (s.status === "rejected") console.error("[playbook]", s.reason);
  });
  if (sends[0].status === "rejected") {
    return NextResponse.json({ error: "Could not send the playbook." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
