import { NextResponse } from "next/server";
import { formatMoney } from "@/lib/roi";
import { PL_WEEKS, answersToParams, buildTeam, quarter, sanitizeAnswers, slipCost, summarise } from "@/lib/see-your-team";

/**
 * "See your team on PraiseLoop" gate.
 *
 * The timeline and the top of the Monday brief are free on the page. When a
 * visitor unlocks the rest, this (1) emails them a forwardable copy with a
 * link back to their exact page, and (2) emails the lead, with their answers,
 * to the PraiseLoop inbox. Same Resend setup as /api/demo (see that route for
 * the env vars). Answers are re-sanitised here, so only whitelisted values
 * and a trimmed, escaped company name reach an email.
 */

const TO_EMAIL = process.env.DEMO_TO_EMAIL || "hello@praiseloop.com";
const FROM_EMAIL = process.env.DEMO_FROM_EMAIL || "PraiseLoop <noreply@updates.praiseloop.com>";

const PERSONAL_DOMAINS = /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|mac|aol|proton|protonmail|gmx|mail|yandex)\./i;

const esc = (s: string) =>
  s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] || c);

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

/* ── Email building blocks (inline styles; email clients ignore <style>) ── */

const FONT = "font-family:Arial,Helvetica,sans-serif";
const heading = (text: string) =>
  `<h3 style="margin:28px 0 8px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#1B6B6B">${text}</h3>`;
const row = (label: string, value: string, color = "#1A1A1A") =>
  `<tr>
    <td style="padding:9px 16px 9px 0;border-bottom:1px solid #E7E7E2;color:#1A1A1A">${label}</td>
    <td style="padding:9px 0;border-bottom:1px solid #E7E7E2;text-align:right;white-space:nowrap;font-weight:700;color:${color}">${value}</td>
  </tr>`;
const button = (href: string, label: string, bg: string) =>
  `<a href="${href}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px;margin:0 8px 8px 0">${label}</a>`;

export async function POST(req: Request) {
  let body: { email?: unknown; answers?: unknown };
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
    console.error("[see-your-team] RESEND_API_KEY is not set — cannot deliver the brief.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const answers = sanitizeAnswers(body?.answers);
  const t = buildTeam(answers);
  const s = t.stall;
  const origin = new URL(req.url).origin;
  const link = `${origin}/see-your-team?${answersToParams(answers)}&pack=1#pack`;
  const demoLink = `${origin}/demo`;
  const whose = t.company ? `${esc(t.company)}’s` : "Your";
  const q = quarter(answers);
  const cost = slipCost(answers);
  const money = (v: number) => formatMoney(v, answers.cur);
  const k = s.kit;
  const step = (n: number, title: string) =>
    `<p style="margin:22px 0 6px;font-weight:700"><span style="display:inline-block;width:22px;height:22px;line-height:22px;border-radius:50%;background:#153F3F;color:#fff;text-align:center;font-size:12px;margin-right:8px">${n}</span>${title}</p>`;

  const html = `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.5;max-width:620px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1B6B6B;font-weight:700">PraiseLoop · See your team</p>
    <h2 style="margin:0 0 12px;font-size:24px;line-height:1.2">${whose} two-week fix for ${esc(s.problem)}.</h2>
    <p style="margin:0 0 8px;color:#64707E">Run it by hand for one rep. PraiseLoop runs it every morning for every rep, and remembers last week.</p>

    ${step(1, "Find who has it")}
    <ul style="margin:0;padding-left:20px">${k.find.map((f) => `<li style="margin:0 0 6px">${esc(f)}</li>`).join("")}</ul>

    ${step(2, "Open the 1:1")}
    <p style="margin:0">Start with something that’s going well, then ask: <b>&ldquo;${esc(s.question)}&rdquo;</b></p>

    ${step(3, "Agree one habit, for two weeks")}
    <p style="margin:0 0 6px;padding:12px 14px;background:#E8F0F0;border-radius:10px"><b>${esc(k.habit)}</b></p>
    <p style="margin:0">Every working day, note it: ${esc(k.track)}</p>

    ${step(4, "Measure it twice")}
    <p style="margin:0">First the habit: <b>${esc(k.behaviour)}</b>. Then the number it should move: <b>${esc(k.outcome)}</b>. Look for an early signal after two weeks and a verdict at three. If it didn’t move, try a different habit.</p>

    ${heading("What the slip costs, from your numbers")}
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row("Each week nobody notices", money(cost.weekly), "#B54848")}
      ${row(`Spotted ${esc(t.spot.how)}`, money(cost.today), "#B54848")}
      ${q.back > 0 ? row(`In the PraiseLoop brief by week ${PL_WEEKS}`, `${money(cost.back)} sooner`, "#1B6B6B") : ""}
    </table>
    <p style="margin:8px 0 0;font-size:13px;color:#64707E">Modelled: a rep closing ${cost.dpm} deals a month at ${esc(formatMoney(answers.deal, answers.cur))} each. ${esc(s.rate.say)} It prices the weeks nobody noticed, not what a plan wins back.</p>

    ${heading("Sam’s plan, as PraiseLoop would put it")}
    <p style="margin:0 0 10px"><b>${esc(s.changedLead)}</b> ${esc(s.changedRest)}</p>
    <p style="margin:0;padding:14px 16px;background:#153F3F;color:#fff;border-radius:12px"><b>Recommended plan · 2 weeks.</b> ${esc(s.plan)}</p>

    <div style="margin:28px 0 8px">
      ${button(link, "Open your full page", "#1B6B6B")}
      ${button(demoLink, "Book a demo", "#F26522")}
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#64707E">Illustrative: Sam and his numbers are made up. The money is worked out from the figures you gave.</p>
  </div>`;

  const text = [
    `${t.company ? `${t.company}’s` : "Your"} two-week fix for ${s.problem}.`,
    "Run it by hand for one rep. PraiseLoop runs it every morning for every rep.",
    "",
    "1. Find who has it",
    ...k.find.map((f) => `- ${f}`),
    "",
    `2. Open the 1:1: start with something that’s going well, then ask "${s.question}"`,
    "",
    `3. Agree one habit, for two weeks: ${k.habit}`,
    `Every working day, note it: ${k.track}`,
    "",
    `4. Measure it twice: ${k.behaviour}, then ${k.outcome}. Early signal after two weeks, a verdict at three.`,
    "",
    `What the slip costs (modelled from your numbers): about ${money(cost.weekly)} a week; ${money(cost.today)} by the time it’s spotted ${t.spot.how}.`,
    q.back > 0 ? `In the PraiseLoop brief by week ${PL_WEEKS}: ${money(cost.back)} sooner.` : "",
    "",
    `Sam’s plan: ${s.plan}`,
    "",
    `Open your full page: ${link}`,
    `Book a demo: ${demoLink}`,
  ].filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");

  const personal = PERSONAL_DOMAINS.test(email);
  const summary = summarise(answers);
  const leadHtml = `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.5">
      <h2 style="margin:0 0 12px;font-size:18px">New "See your team" lead</h2>
      <p style="margin:0 0 4px"><b>${esc(email)}</b>${personal ? ' <span style="color:#D9551A">(personal email domain)</span>' : ""}</p>
      <p style="margin:0 0 16px;color:#64707E">${esc(summary)}</p>
      <p style="margin:0 0 20px"><a href="${link}">Open their exact page</a></p>
      <hr style="border:0;border-top:1px solid #E7E7E2;margin:0 0 20px">
      <p style="margin:0 0 12px;color:#64707E;font-size:13px">What they received:</p>
      ${html}
    </div>`;

  const sends = await Promise.allSettled([
    send(apiKey, {
      to: [email],
      reply_to: TO_EMAIL,
      subject: `Your two-week fix for ${s.problem}, from PraiseLoop`,
      html,
      text,
    }),
    send(apiKey, {
      to: [TO_EMAIL],
      reply_to: email,
      subject: `See your team lead · ${email.split("@")[1]} · ${t.reps} reps per manager`,
      html: leadHtml,
      text: `New "See your team" lead: ${email}${personal ? " (personal email domain)" : ""}\n${summary}\n${link}\n\n${text}`,
    }),
  ]);

  sends.forEach((r) => {
    if (r.status === "rejected") console.error("[see-your-team]", r.reason);
  });
  const [toVisitor] = sends;
  if (toVisitor.status === "rejected") {
    return NextResponse.json({ error: "Could not send your brief." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
