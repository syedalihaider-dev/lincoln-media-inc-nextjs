"use client";
import { useRef, useState } from "react";
import Button from "@/components/Common/Button";
import { SITE } from "@/data/site";
import { INTERESTS, BUDGETS, CONSENT } from "@/data/contact";
import { LEAD_ENDPOINT } from "@/data/forms";
import Select from "./Select";

const GENERIC_ERROR = "Something went wrong while sending your message. Please try again or contact us directly.";
import f from "./Form.module.css";

// The required fields (marked * on the live form) and how each is checked
const RULES = {
  name: (v) => (!v ? "Please tell us your full name." : ""),
  company: (v) => (!v ? "Please add your company name." : ""),
  email: (v) => (!v ? "Please add your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "That email address doesn't look right."),
  phone: (v) => (!v ? "Please add a phone number." : /^[+()\d\s.-]{7,}$/.test(v) && (v.match(/\d/g) || []).length >= 7 ? "" : "Please enter a phone number with at least 7 digits."),
};
const ORDER = ["name", "company", "email", "phone"];

/** A text field whose label rests inside it and rises onto the top-left of the border when used. */
function Field({ name, label, type = "text", autoComplete, inputMode, error, onBlur, multiline = false, required = false }) {
  const id = `cf-${name}`, errId = `${id}-error`;
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className={`${f.field} ${multiline ? f.area : ""}`} data-invalid={error ? "true" : undefined} data-field>
      <Tag
        id={id}
        name={name}
        {...(multiline ? { rows: 5 } : { type })}
        className={f.control}
        placeholder=" "
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
        onBlur={onBlur}
      />
      <label htmlFor={id} className={f.label}>{label}</label>
      <span className={f.ring} aria-hidden="true" />
      <p id={errId} className={f.error} role={error ? "alert" : undefined}>{error}</p>
    </div>
  );
}

/**
 * Speak to an Expert — the live site's fields, in its three-column rhythm. Validation is inline
 * (no browser bubbles): errors appear under their field when you leave it, all at once on submit,
 * and the first one takes focus. Submitting posts to /api/lead (validated again on the server, sent
 * over SMTP to the studio) with the form's source and page URL; the button locks while it sends,
 * then the confirmation takes over — or a plain-language error with the direct lines appears.
 */
export default function ContactForm({ copy, source = "contact" }) {
  const ref = useRef(null);
  const started = useRef(0);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [status, setStatus] = useState("idle"); // idle · sending · failed
  const [failure, setFailure] = useState("");

  const check = (name, value) => setErrors((e) => ({ ...e, [name]: RULES[name](value.trim()) }));
  const blur = (name) => (e) => { if (errors[name] !== undefined || e.target.value) check(name, e.target.value); };
  // when the visitor first touches the form (the server uses it to spot instant bot submissions)
  const touch = () => { if (!started.current) started.current = Date.now(); };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return; // no double submissions
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form));
    const next = Object.fromEntries(ORDER.map((k) => [k, RULES[k]((d[k] || "").trim())]));
    setErrors(next);
    const bad = ORDER.find((k) => next[k]);
    if (bad) { ref.current.querySelector(`[name="${bad}"]`)?.focus(); return; }

    setStatus("sending");
    setFailure("");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          pageUrl: window.location.href,
          elapsed: started.current ? Date.now() - started.current : null,
          website: d.website || "",
          fields: {
            name: d.name, company: d.company, email: d.email, phone: d.phone,
            interest: d.interest || "", budget: d.budget || "", message: d.message || "", consent: Boolean(d.consent),
          },
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "");
      setSent({ name: d.name.trim().split(/\s+/)[0] });
      setStatus("idle");
      form.reset();
      started.current = 0;
    } catch (err) {
      setStatus("failed");
      setFailure(err.message || GENERIC_ERROR);
    }
  };

  const again = () => { ref.current.reset(); setErrors({}); setSent(null); setStatus("idle"); requestAnimationFrame(() => ref.current.querySelector("input")?.focus()); };
  const sending = status === "sending";

  return (
    <div className={f.shell} data-sent={sent ? "true" : undefined}>
      <form ref={ref} className={f.form} onSubmit={submit} onFocus={touch} noValidate aria-label={copy.title} aria-busy={sending || undefined} inert={sent ? true : undefined}>
        {/* Honeypot: hidden from people and assistive tech; bots that fill every field reveal themselves */}
        <div className={f.trap} aria-hidden="true">
          <label htmlFor="cf-website">Website</label>
          <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className={f.grid}>
          <Field name="name" label="Full Name*" autoComplete="name" required error={errors.name} onBlur={blur("name")} />
          <Field name="company" label="Company*" autoComplete="organization" required error={errors.company} onBlur={blur("company")} />
          <Field name="email" label="Email*" type="email" autoComplete="email" inputMode="email" required error={errors.email} onBlur={blur("email")} />
          <Field name="phone" label="Phone*" type="tel" autoComplete="tel" inputMode="tel" required error={errors.phone} onBlur={blur("phone")} />
          <Select name="interest" label="I'm interested in" options={INTERESTS} />
          <Select name="budget" label="Budget" options={BUDGETS} />
          <Field name="message" label="Message" multiline />
        </div>

        <div className={f.consent} data-field>
          <input id="cf-consent" name="consent" type="checkbox" value="yes" className={f.checkInput} />
          <label htmlFor="cf-consent" className={f.check}>
            <span className={f.box} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" /></svg></span>
            <span className={f.consentText}>
              {CONSENT.before}
              <a href={CONSENT.privacy.href}>{CONSENT.privacy.label}</a>
              {CONSENT.middle}
              <a href={CONSENT.terms.href}>{CONSENT.terms.label}</a>
              {CONSENT.after}
            </span>
          </label>
        </div>

        {status === "failed" && (
          <p className={f.failure} role="alert">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 16.5v.5M10.3 3.9 2.6 17.4A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0" /></svg>
            <span>{failure} <a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
          </p>
        )}

        <div className={f.actions} data-field>
          <Button type="submit" size="lg" disabled={sending} aria-disabled={sending || undefined} className={sending ? f.sending : ""}>{sending ? "Sending…" : copy.submit}</Button>
          <p className={f.hint}>Or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
      </form>

      <div className={f.done} role="status" aria-live="polite">
        {sent && (
          <>
            <span className={f.doneMark} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" /></svg></span>
            <p className={f.doneTitle}>Thank you{sent.name ? `, ${sent.name}` : ""}.</p>
            <p className={f.doneText}>
              Your enquiry has reached our team, and the right person will get back to you shortly.
              If it&apos;s urgent, call <a href={SITE.phoneHref}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <Button size="md" variant="outline" icon="right" onClick={again}>Start a new enquiry</Button>
          </>
        )}
      </div>
    </div>
  );
}
