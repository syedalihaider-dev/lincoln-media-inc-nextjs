"use client";
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE, CHAT } from "@/data/site";
import Social from "@/components/Common/Social";
import { openLiveChat, hasLiveChat } from "./providers";
import styles from "./Chat.module.css";

const ICON = {
  chat: <path d="M4 5.5h16v10H9.5L5 19.5V15.5H4z" />,
  brief: <path d="M4 7.5h16v11H4zM9 7.5V5h6v2.5M4 12.5h16" />,
  quote: <path d="M6 3.5h9l3.5 3.5v13.5H6zM14.5 3.5V7.5h4M9 12h6.5M9 15.5h6.5" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  whatsapp: <path d="M4 20l1.2-4A8 8 0 1 1 8.4 19zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.8-2.8l.9-1-1-2z" />,
};

/**
 * "Let's talk" — the site's contact desk. A floating button (bottom right) opens a small branded panel
 * that asks what the visitor wants to discuss and routes them to a real channel: live chat (the
 * provider in src/data/site.js → CHAT, loaded only on request), the project form, an emailed quote
 * request, a call, or WhatsApp. No simulated chat: if live chat can't load, the panel says so and
 * offers the other channels.
 */
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState("idle"); // idle · loading · open · failed
  const panel = useRef(null);
  const launcher = useRef(null);
  const uid = useId();
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  // open / close
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) {
      el.hidden = false;
      if (!reduced()) {
        gsap.timeline()
          .fromTo(el, { clipPath: "inset(100% 0% 0% 0% round 22px)", y: 24 }, { clipPath: "inset(0% 0% 0% 0% round 22px)", y: 0, duration: 0.7, ease: "expo.out" })
          .from(el.querySelectorAll("[data-in]"), { y: 16, opacity: 0, duration: 0.6, stagger: 0.045, ease: "expo.out" }, 0.12);
      }
      el.querySelector("[data-first]")?.focus({ preventScroll: true });
    } else if (!el.hidden) {
      const done = () => { el.hidden = true; };
      if (reduced()) done();
      else gsap.to(el, { clipPath: "inset(100% 0% 0% 0% round 22px)", y: 16, duration: 0.45, ease: "expo.in", onComplete: done });
    }
  }, [open]);

  // Escape closes, and focus stays inside the open panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); launcher.current?.focus(); }
      if (e.key === "Tab") {
        const f = [...panel.current.querySelectorAll("a[href], button:not([disabled])")];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const startLive = async () => {
    setLive("loading");
    const ok = await openLiveChat(CHAT);
    setLive(ok ? "open" : "failed");
    if (ok) setOpen(false);
  };

  const close = () => setOpen(false);
  const options = [
    hasLiveChat(CHAT) && { key: "chat", icon: "chat", label: "Start a conversation", sub: live === "loading" ? "Connecting you to live chat…" : "Live chat with our team", onClick: startLive, busy: live === "loading" },
    { key: "project", icon: "brief", label: "Discuss a project", sub: "Tell us what you're building", href: "/contact-us#contact-form", onClick: close },
    { key: "quote", icon: "quote", label: "Request a quote", sub: "Email your brief — we reply within a day", href: `mailto:${SITE.email}?subject=${encodeURIComponent("Quote request")}` },
    { key: "call", icon: "phone", label: "Call us", sub: SITE.phone, href: SITE.phoneHref },
    SITE.whatsapp && { key: "whatsapp", icon: "whatsapp", label: "Message us on WhatsApp", sub: "Chat from your phone", href: SITE.whatsapp, external: true },
  ].filter(Boolean);

  return (
    <div className={`${styles.chat} ${open ? styles.isOpen : ""}`}>
      <button type="button" className={styles.backdrop} aria-hidden="true" tabIndex={-1} onClick={close} />

      <div ref={panel} id={`${uid}-panel`} className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={`${uid}-title`} hidden>
        <div className={styles.head} data-in>
          <p className={styles.brand}>{SITE.name}</p>
          <button type="button" className={styles.x} onClick={() => { close(); launcher.current?.focus(); }} aria-label="Close"><i /></button>
        </div>
        <h2 id={`${uid}-title`} className={styles.title} data-in>What would you like to discuss?</h2>
        <ul className={styles.options}>
          {options.map((o, i) => {
            const inner = (
              <>
                <span className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24">{ICON[o.icon]}</svg></span>
                <span className={styles.label}><b>{o.label}</b><small>{o.sub}</small></span>
                <span className={styles.arrow} aria-hidden="true">{o.busy ? <i className={styles.spin} /> : "→"}</span>
              </>
            );
            const common = { className: styles.option, "data-first": i === 0 ? "" : undefined };
            return (
              <li key={o.key} data-in>
                {o.href
                  ? <a href={o.href} onClick={o.onClick} {...(o.external ? { target: "_blank", rel: "noopener" } : {})} {...common}>{inner}</a>
                  : <button type="button" onClick={o.onClick} disabled={o.busy} aria-busy={o.busy || undefined} {...common}>{inner}</button>}
              </li>
            );
          })}
        </ul>
        {live === "failed" && (
          <p className={styles.note} role="status" data-in>Live chat couldn't load just now — please call or email us instead, and we'll pick it up straight away.</p>
        )}
        <div className={styles.foot} data-in>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><span>{SITE.street}, {SITE.locality}</span></p>
          <Social size="sm" />
        </div>
      </div>

      <button ref={launcher} type="button" className={styles.launcher} aria-expanded={open} aria-controls={`${uid}-panel`} onClick={() => setOpen((v) => !v)}>
        <span className={styles.lText}>{open ? "Close" : "Let's talk"}</span>
        <span className={styles.lDisc} aria-hidden="true">
          <svg viewBox="0 0 24 24" className={styles.lChat}>{ICON.chat}</svg>
          <i className={styles.lX} />
        </span>
      </button>
    </div>
  );
}
