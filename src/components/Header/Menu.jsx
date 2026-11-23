"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import { SERVICE_CATEGORIES, categoryHref } from "@/data/service-categories";
import styles from "./Menu.module.css";

const EASE = [0.77, 0, 0.18, 1];
const panel = {
  closed: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.75, ease: EASE, when: "afterChildren" } },
  open: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.85, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 } },
};
const item = {
  closed: { y: "105%", transition: { duration: 0.35, ease: [0.5, 0, 0.75, 0] } },
  open: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fade = { closed: { opacity: 0, y: 12, transition: { duration: 0.2 } }, open: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

const link = (base, href) => (!base || !href.startsWith("#") ? href : href === "#home" ? base : base + href);

/** Full-screen navigation (tablet and phone): the main pages, every service category, and how to reach the studio. */
export default function Menu({ open, onClose, base = "", current = null }) {
  const first = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => first.current?.focus(), 450);
    const onKey = (e) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => { clearTimeout(t); removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div id="lm-menu" className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu" initial="closed" animate="open" exit="closed" variants={panel}>
          <div className={styles.inner}>
            <nav className={styles.primary} aria-label="Menu">
              <ul>
                {NAV.map((n, i) => (
                  <li key={n.href}>
                    <motion.a ref={i === 0 ? first : undefined} href={link(base, n.href)} variants={item} onClick={onClose} className={current === n.href ? styles.current : undefined} aria-current={current === n.href ? "page" : undefined}>
                      <span className={styles.word}>{n.label}</span>
                    </motion.a>
                  </li>
                ))}
                <li>
                  {/* Reloading the homepage starts the AI guide again */}
                  <motion.a href="/" variants={item} onClick={onClose}>
                    <span className={styles.word}><em>Your build plan</em></span>
                  </motion.a>
                </li>
              </ul>
            </nav>

            <motion.aside className={styles.side} variants={fade}>
              <div>
                <p className={styles.h}>Services</p>
                <ul className={styles.services}>
                  {SERVICE_CATEGORIES.map((c) => (
                    <li key={c.key}>
                      {c.key === "web" ? (
                        // Web Development opens to its 14 child pages
                        <details className={styles.sub}>
                          <summary><a href={categoryHref(c)} onClick={onClose}>{c.name}</a><i aria-hidden="true" /></summary>
                          <ul>{c.items.filter((it) => it.href).map((it) => <li key={it.href}><a href={it.href} onClick={onClose}>{it.name}</a></li>)}</ul>
                        </details>
                      ) : (
                        <a href={categoryHref(c)} onClick={onClose}>{c.name}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.h}>Say hello</p>
                <ul className={styles.contact}>
                  <li><a className={styles.tel} href={SITE.phoneHref}>{SITE.phone}</a></li>
                  <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                  <li><a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
                  <li className={styles.addr}>{SITE.street},<br />{SITE.locality}</li>
                </ul>
              </div>
            </motion.aside>
          </div>
          <motion.p className={styles.foot} variants={fade}>
            <span>{SITE.city} · Est. {SITE.established}</span>
            <span>Press Esc to close</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
