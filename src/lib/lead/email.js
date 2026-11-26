import "server-only";
import { siteConfig } from "@/config/site";

// The internal lead notification: every submitted field, then where the lead came from.
// All visitor text is escaped — nothing a visitor types can become HTML in the email.

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const oneLine = (s) => String(s ?? "").replace(/[\r\n]+/g, " ").trim();

const row = (label, value, { pre = false, link = null } = {}) => {
  const v = value === "" || value == null ? '<span style="color:#8a90a3">—</span>' : link ? `<a href="${esc(link)}" style="color:#0f7f74">${esc(value)}</a>` : esc(value);
  return `<tr>
    <td style="padding:12px 16px;border-bottom:1px solid #e6e9f0;width:34%;vertical-align:top;font:600 12px/1.5 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#5b6273">${esc(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #e6e9f0;vertical-align:top;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#0a101c;${pre ? "white-space:pre-wrap;" : ""}">${v}</td>
  </tr>`;
};

const table = (title, rows) => `
  <h2 style="margin:28px 0 10px;font:700 13px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#0f7f74">${esc(title)}</h2>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #e6e9f0;border-radius:10px">${rows.join("")}</table>`;

/**
 * lead = { sourceLabel, fields: [[label, value, kind]], meta: { pageUrl, ip, country, region, city, geoSource, submittedAt, userAgent } }
 * → { subject, html, text }
 */
export function leadEmail(lead) {
  const { sourceLabel, fields, meta, topic } = lead;
  const subject = oneLine(`New Website Lead — ${sourceLabel}${topic ? ` — ${topic}` : ""}`).slice(0, 200);

  const fieldRows = fields.map(([label, value, kind]) =>
    row(label, value, { pre: kind === "long", link: kind === "email" && value ? `mailto:${value}` : kind === "phone" && value ? `tel:${value.replace(/[^\d+]/g, "")}` : null })
  );
  const metaRows = [
    row("Lead Source", sourceLabel),
    row("Page URL", meta.pageUrl, { link: /^https?:\/\//.test(meta.pageUrl) ? meta.pageUrl : null }),
    row("IP Address", meta.ip),
    row("Country", meta.country),
    row("State / Region", meta.region),
    row("City", meta.city),
    row("Submitted", meta.submittedAt),
    row("Browser", meta.userAgent),
  ];

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f2f4f8">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f8;padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden">
      <tr><td style="background:#03050b;padding:26px 32px">
        <p style="margin:0;font:700 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#36e4d0">${esc(siteConfig.name)} · New lead</p>
        <h1 style="margin:10px 0 0;font:700 22px/1.3 Arial,Helvetica,sans-serif;color:#eef1f7">${esc(sourceLabel)}${topic ? ` — ${esc(topic)}` : ""}</h1>
      </td></tr>
      <tr><td style="padding:8px 32px 32px">
        ${table("Submitted details", fieldRows)}
        ${table("Where it came from", metaRows)}
        <p style="margin:24px 0 0;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:#5b6273">Reply to this email to answer the visitor directly (Reply-To is set to the address they entered).</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

  const text = [
    `New Website Lead — ${sourceLabel}${topic ? ` — ${topic}` : ""}`,
    "",
    ...fields.map(([label, value]) => `${label}: ${value || "—"}`),
    "",
    `Lead Source: ${sourceLabel}`,
    `Page URL: ${meta.pageUrl}`,
    `IP Address: ${meta.ip}`,
    `Country: ${meta.country}`,
    `State / Region: ${meta.region}`,
    `City: ${meta.city}`,
    `Submitted: ${meta.submittedAt}`,
    `Browser: ${meta.userAgent}`,
  ].join("\n");

  return { subject, html, text };
}
