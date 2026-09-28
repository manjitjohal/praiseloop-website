import { NextResponse } from "next/server";
import {
  computeRoi,
  formatMoney,
  formatMultiple,
  formatNumber,
  pilotPlan,
  projection,
  sanitizeInputs,
  scenarios,
  toSearchParams,
  PILOT_DAYS,
  SOURCES,
  type RoiInputs,
} from "@/lib/roi";

/**
 * ROI business-case handler.
 *
 * The calculator's headline numbers are free on the page. This route is the
 * "extra": when a visitor asks for the CFO business case it (1) emails them a
 * forwardable copy with a link back to their exact inputs, and (2) emails the
 * lead, with their numbers, to the PraiseLoop inbox. Same Resend setup as
 * /api/demo (see that route for the env vars).
 *
 * Inputs are re-sanitised and results recomputed here, so nothing the client
 * sends is echoed into an email except clamped numbers.
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

/* ── Email building blocks (inline styles; email clients ignore <style>) ── */

const FONT = "font-family:Arial,Helvetica,sans-serif";
const row = (label: string, value: string, opts: { note?: string; strong?: boolean; color?: string } = {}) =>
  `<tr>
    <td style="padding:9px 16px 9px 0;border-bottom:1px solid #E7E7E2;color:#1A1A1A;${opts.strong ? "font-weight:700" : ""}">
      ${label}${opts.note ? `<br><span style="font-size:12px;color:#64707E">${opts.note}</span>` : ""}
    </td>
    <td style="padding:9px 0;border-bottom:1px solid #E7E7E2;text-align:right;white-space:nowrap;font-weight:700;color:${opts.color || "#1A1A1A"}">${value}</td>
  </tr>`;
const heading = (text: string) =>
  `<h3 style="margin:28px 0 8px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#1B6B6B">${text}</h3>`;
const button = (href: string, label: string, bg: string) =>
  `<a href="${href}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px;margin:0 8px 8px 0">${label}</a>`;

function buildBusinessCase(i: RoiInputs, link: string, demoLink: string) {
  const r = computeRoi(i);
  const sc = scenarios(i);
  const proj = projection(r);
  const pilot = pilotPlan(i);
  const m = (v: number) => formatMoney(v, i.currency);

  const html = `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.5;max-width:620px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1B6B6B;font-weight:700">PraiseLoop · Business case</p>
    <h2 style="margin:0 0 12px;font-size:24px;line-height:1.2">${m(r.net)} net impact a year, a ${formatMultiple(r.multiple)} return on cost.</h2>
    <p style="margin:0 0 20px;color:#64707E">Modelled for ${formatNumber(i.headcount)} employees on an average salary of ${m(i.salary)}. It's written to forward to finance, with every assumption listed at the bottom. <b>This is a modelled estimate, not a guarantee.</b></p>

    ${heading("The annual model")}
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row("Regretted exits avoided", m(r.retention), { note: `${formatNumber(r.exitsAvoided, 1)} exits × ${i.replacementCost}% of salary to replace`, color: "#16884b" })}
      ${row("Productivity lift, movable middle", m(r.productivity), { note: `${formatNumber(r.middleHeadcount)} people × ${i.productivityLift}% lift`, color: "#16884b" })}
      ${row("Absence days recovered", m(r.absence), { note: `${formatNumber(r.daysRecovered)} days × daily salary cost`, color: "#16884b" })}
      ${row("Gross impact", m(r.gross), { strong: true })}
      ${row("PraiseLoop platform", `−${m(r.platformCost)}`, { note: `${formatNumber(i.headcount)} × ${m(i.seatPrice)} × 12 months, illustrative list price`, color: "#D9551A" })}
      ${row("Reward budget", `−${m(r.rewardCost)}`, { note: `${formatNumber(i.headcount)} × ${m(i.rewardBudget)} a year, paid only on verified results`, color: "#D9551A" })}
      ${row("Net impact · return on cost", `${m(r.net)} · ${formatMultiple(r.multiple)}`, { strong: true })}
    </table>

    ${heading("Three scenarios")}
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${sc.map((s) => row(`${s.label}`, `${m(s.result.net)} · ${formatMultiple(s.result.multiple)}`, { note: `${s.factor}× the lift assumptions` })).join("")}
    </table>

    ${heading("Three years, with ramp-up")}
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${proj.years.map((y) => row(`Year ${y.year}`, m(y.net), { note: `Cumulative ${m(y.cumulative)}` })).join("")}
    </table>
    <p style="margin:8px 0 0;font-size:13px;color:#64707E">Month 1 is go-live and counts no impact. Impact builds to full run-rate by month 6. ${proj.paybackMonth ? `Cumulative payback in <b>month ${proj.paybackMonth}</b>.` : "No payback within 36 months at these inputs."}</p>

    ${heading(`Your ${PILOT_DAYS}-day pilot`)}
    <p style="margin:0">Start with <b>${formatNumber(pilot.seats)} people</b> for ${PILOT_DAYS} days, costing about <b>${m(pilot.cost)}</b> in platform and rewards. At these assumptions, the day-90 report should point to an annualised <b>${m(pilot.annualisedGross)}</b>: about ${formatNumber(pilot.exitsAvoided, 1)} regretted exits avoided and ${formatNumber(pilot.daysRecovered)} absence days recovered a year. If the numbers don't move, you walk away.</p>

    <div style="margin:28px 0 8px">
      ${button(link, "Open your full business case", "#1B6B6B")}
      ${button(demoLink, "Book the 90-day pilot", "#F26522")}
    </div>

    ${heading("Assumptions")}
    <p style="margin:0;font-size:13px;color:#64707E">${i.turnover}% annual voluntary turnover · ${i.turnoverReduction}% of those exits avoided · replacement at ${i.replacementCost}% of salary · ${i.middleShare}% of people in the movable middle with a ${i.productivityLift}% productivity lift · ${i.absenceDays} absence days per person with a ${i.absenceReduction}% reduction · ${i.workingDays} working days a year · platform at ${m(i.seatPrice)} per person per month · rewards at ${m(i.rewardBudget)} per person per year.</p>
    <p style="margin:10px 0 0;font-size:12px;color:#64707E">${SOURCES.map((s) => `${esc(s.claim)} (<a href="${s.url}" style="color:#1B6B6B">${esc(s.source)}</a>)`).join("<br>")}</p>
  </div>`;

  const text = [
    `PraiseLoop business case: ${m(r.net)} net impact a year (${formatMultiple(r.multiple)} return on cost).`,
    `Modelled for ${formatNumber(i.headcount)} employees at ${m(i.salary)} average salary. Modelled estimate, not a guarantee.`,
    "",
    `Regretted exits avoided: ${m(r.retention)}`,
    `Productivity lift, movable middle: ${m(r.productivity)}`,
    `Absence days recovered: ${m(r.absence)}`,
    `Gross impact: ${m(r.gross)}`,
    `PraiseLoop platform: -${m(r.platformCost)}`,
    `Reward budget: -${m(r.rewardCost)}`,
    `Net impact: ${m(r.net)}`,
    "",
    ...sc.map((s) => `${s.label}: ${m(s.result.net)} (${formatMultiple(s.result.multiple)})`),
    "",
    ...proj.years.map((y) => `Year ${y.year}: ${m(y.net)} (cumulative ${m(y.cumulative)})`),
    "",
    `Open your full business case: ${link}`,
    `Book the 90-day pilot: ${demoLink}`,
  ].join("\n");

  return { html, text, result: r };
}

export async function POST(req: Request) {
  let body: { email?: unknown; inputs?: unknown };
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
    console.error("[roi] RESEND_API_KEY is not set — cannot deliver the business case.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const inputs = sanitizeInputs(body?.inputs);
  const origin = new URL(req.url).origin;
  const link = `${origin}/roi-calculator?${toSearchParams(inputs)}&pack=1#business-case`;
  const { html, text, result } = buildBusinessCase(inputs, link, `${origin}/demo`);

  const personal = PERSONAL_DOMAINS.test(email);
  const leadHtml = `<div style="${FONT};font-size:15px;color:#1A1A1A;line-height:1.5">
      <h2 style="margin:0 0 12px;font-size:18px">New ROI calculator lead</h2>
      <p style="margin:0 0 4px"><b>${esc(email)}</b>${personal ? ' <span style="color:#D9551A">(personal email domain)</span>' : ""}</p>
      <p style="margin:0 0 16px;color:#64707E">${formatNumber(inputs.headcount)} employees · ${formatMoney(inputs.salary, inputs.currency)} avg salary · net ${formatMoney(result.net, inputs.currency)} (${formatMultiple(result.multiple)})</p>
      <p style="margin:0 0 20px"><a href="${link}">Open their exact model</a></p>
      <hr style="border:0;border-top:1px solid #E7E7E2;margin:0 0 20px">
      <p style="margin:0 0 12px;color:#64707E;font-size:13px">What they received:</p>
      ${html}
    </div>`;

  const sends = await Promise.allSettled([
    send(apiKey, {
      to: [email],
      reply_to: TO_EMAIL,
      subject: `Your PraiseLoop business case: ${formatMoney(result.net, inputs.currency, { compact: true })} a year`,
      html,
      text,
    }),
    send(apiKey, {
      to: [TO_EMAIL],
      reply_to: email,
      subject: `ROI calculator lead · ${email.split("@")[1]} · ${formatNumber(inputs.headcount)} employees`,
      html: leadHtml,
      text: `New ROI calculator lead: ${email}${personal ? " (personal email domain)" : ""}\n${link}\n\n${text}`,
    }),
  ]);

  sends.forEach((s) => {
    if (s.status === "rejected") console.error("[roi]", s.reason);
  });
  const [toVisitor] = sends;
  if (toVisitor.status === "rejected") {
    return NextResponse.json({ error: "Could not send your business case." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
