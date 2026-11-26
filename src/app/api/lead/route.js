import { FORM_SOURCES, FORM_FIELDS } from "@/data/forms";
import { clientIp, locate } from "@/lib/lead/visitor";
import { leadEmail } from "@/lib/lead/email";
import { sendLead, mailConfigured } from "@/lib/lead/mailer";

// POST /api/lead — every lead form on the site posts here (JSON).
// Client form → this route → validation + abuse checks → SMTP (server-only credentials) → recipients.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 16 * 1024; // whole request body
const MAX_LEN = { message: 5000, default: 300 };
const MIN_FILL_MS = 2500; // a human takes longer than this to fill the form
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const PHONE = /^[+()\d\s.-]{7,25}$/;

// Rate limit: 5 leads per IP per 10 minutes (per server instance — enough to stop a script hammering one node)
const WINDOW = 10 * 60 * 1000, LIMIT = 5;
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  return list.length > LIMIT;
};

const GENERIC = "Something went wrong while sending your message. Please try again or contact us directly.";
const reply = (status, body) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// strip control characters (keeps newlines in long text), trim, cap length
const clean = (v, key) => {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v !== "string") return "";
  const max = MAX_LEN[key] || MAX_LEN.default;
  const s = key === "message" ? v.replace(/[^\S\n]+/g, " ").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "") : v.replace(/[\u0000-\u001F\u007F]+/g, " ");
  return s.trim().slice(0, max);
};

export async function POST(request) {
  const headers = request.headers;
  if (!(headers.get("content-type") || "").includes("application/json")) return reply(415, { ok: false, error: GENERIC });
  if (Number(headers.get("content-length") || 0) > MAX_BYTES) return reply(413, { ok: false, error: GENERIC });

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) return reply(413, { ok: false, error: GENERIC });
    body = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false, error: GENERIC });
  }
  if (!body || typeof body !== "object") return reply(400, { ok: false, error: GENERIC });

  const ip = clientIp(headers);

  // Bots: the hidden honeypot field is filled — people never see it. Answer as if it worked, so the bot
  // learns nothing, and send nothing (logged, so a dropped lead is never invisible).
  if (typeof body.website === "string" && body.website.trim()) {
    console.warn(`[lead] dropped: honeypot filled (ip ${ip}, source ${String(body.source).slice(0, 20)})`);
    return reply(200, { ok: true });
  }
  // Impossibly fast. A person using browser autofill can get close to this, so never fake a success:
  // ask them to send again (the second attempt is always slower than the threshold).
  const elapsed = Number(body.elapsed);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    console.warn(`[lead] held: submitted ${elapsed}ms after first focus (ip ${ip}) — asked to resend`);
    return reply(429, { ok: false, error: "Please take a moment to check your details, then press send again." });
  }
  if (limited(ip)) return reply(429, { ok: false, error: "You've sent several messages in a short time. Please wait a few minutes, or contact us directly." });

  const sourceKey = Object.hasOwn(FORM_SOURCES, body.source) ? body.source : "website";
  const schema = FORM_FIELDS[sourceKey];
  const data = Object.fromEntries(schema.fields.map(([key]) => [key, clean(body.fields?.[key], key)]));

  // server-side validation (mirrors the form's)
  const errors = {};
  for (const key of schema.required) if (!data[key]) errors[key] = "Required";
  if (data.email && !EMAIL.test(data.email)) errors.email = "Invalid email";
  if (data.phone && (!PHONE.test(data.phone) || (data.phone.match(/\d/g) || []).length < 7)) errors.phone = "Invalid phone";
  if (Object.keys(errors).length) return reply(422, { ok: false, error: "Please check the highlighted fields.", errors });

  if (!mailConfigured()) {
    console.error("[lead] SMTP is not configured (MAIL_* / LEAD_RECIPIENTS) — lead not sent");
    return reply(503, { ok: false, error: GENERIC });
  }

  // where it came from
  const referer = headers.get("referer") || "";
  const pageUrl = clean(typeof body.pageUrl === "string" && /^https?:\/\//.test(body.pageUrl) ? body.pageUrl : referer, "pageUrl").slice(0, 500) || "Unknown";
  const where = await locate(headers, ip);
  const meta = {
    pageUrl,
    ip,
    country: where.country,
    region: where.region,
    city: where.city,
    submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" }) + " (New York)",
    userAgent: clean(headers.get("user-agent") || "", "ua").slice(0, 200),
  };

  const kind = (key) => (key === "message" ? "long" : key === "email" ? "email" : key === "phone" ? "phone" : "text");
  const fields = schema.fields.map(([key, label]) => [label, key === "consent" ? (data.consent === "Yes" ? "Yes — agreed to receive text messages" : "No") : data[key], kind(key)]);
  const topic = data.interest || data.service || "";
  const mail = leadEmail({ sourceLabel: FORM_SOURCES[sourceKey], fields, meta, topic });

  try {
    const sent = await sendLead({ ...mail, replyTo: data.email });
    // SMTP acceptance (not inbox delivery): what the server took, refused, and its reply
    console.info(`[lead] accepted by SMTP: ${FORM_SOURCES[sourceKey]} from ${ip} (${where.country}) · id ${sent.messageId} · to ${sent.accepted.join(", ")} · "${sent.response}"`);
    if (sent.rejected.length) console.warn(`[lead] SMTP refused some recipients: ${sent.rejected.join(", ")}`);
    return reply(200, { ok: true });
  } catch (err) {
    // log the reason, never the credentials or the full error object
    console.error(`[lead] SMTP send failed: ${err?.code || ""} ${err?.responseCode || ""} ${String(err?.response || err?.message || "").slice(0, 200)}`);
    return reply(502, { ok: false, error: GENERIC });
  }
}

export function GET() {
  return reply(405, { ok: false });
}
