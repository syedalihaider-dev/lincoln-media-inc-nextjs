import "server-only";
import nodemailer from "nodemailer";

// SMTP transport built from server-only environment variables (.env.local / host settings).
// Credentials never leave the server and are never logged or returned.

let transport = null;

export function mailConfigured() {
  const e = process.env;
  return Boolean(e.MAIL_HOST && e.MAIL_PORT && e.MAIL_USERNAME && e.MAIL_PASSWORD && e.MAIL_FROM_ADDRESS && recipients().length);
}

export function recipients() {
  return (process.env.LEAD_RECIPIENTS || "").split(",").map((s) => s.trim()).filter(Boolean);
}

function getTransport() {
  if (transport) return transport;
  const e = process.env;
  const port = Number(e.MAIL_PORT) || 587;
  const enc = (e.MAIL_ENCRYPTION || "tls").toLowerCase();
  transport = nodemailer.createTransport({
    host: e.MAIL_HOST,
    port,
    secure: enc === "ssl" || port === 465, // implicit TLS
    requireTLS: enc === "tls", // STARTTLS on 587
    auth: { user: e.MAIL_USERNAME, pass: e.MAIL_PASSWORD },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  return transport;
}

/**
 * Sends to every lead recipient. From = the studio's mailbox; Reply-To = the visitor.
 * Resolves only when the SMTP server has accepted the message for at least one recipient
 * (nodemailer rejects on connection/auth/DATA errors; this also fails when every RCPT was refused).
 * Returns { messageId, accepted, rejected, response } for logging — no credentials.
 */
export async function sendLead({ subject, html, text, replyTo }) {
  const e = process.env;
  const from = { name: e.MAIL_FROM_NAME || "Website", address: e.MAIL_FROM_ADDRESS };
  const info = await getTransport().sendMail({ from, to: recipients(), replyTo, subject, html, text });
  const accepted = (info.accepted || []).map(String);
  const rejected = (info.rejected || []).map(String);
  if (!accepted.length) {
    const err = new Error(`SMTP accepted no recipients (rejected: ${rejected.join(", ") || "all"})`);
    err.code = "ENORECIPIENTS";
    err.response = info.response;
    throw err;
  }
  return { messageId: info.messageId, accepted, rejected, response: String(info.response || "").slice(0, 160) };
}
