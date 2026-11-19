"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
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

/** Full-screen navigation overlay (Framer Motion). Escape closes it; focus moves in and back out. */
export default function Menu({ open, onClose }) {
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
              <ol>
                {NAV.map((n, i) => (
                  <li key={n.href}>
                    <motion.a ref={i === 0 ? first : undefined} href={n.href} variants={item} onClick={onClose}>
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.word}>{n.label}</span>
                    </motion.a>
                  </li>
                ))}
                <li>
                  {/* Reloading the homepage starts the AI guide again */}
                  <motion.a href="/" variants={item}>
                    <span className={styles.num}>06</span>
                    <span className={styles.word}><em>Your build plan</em></span>
                  </motion.a>
                </li>
              </ol>
            </nav>

            <motion.aside className={styles.side} variants={fade}>
              <div>
                <p className={styles.h}>Services</p>
                <ul className={styles.services}>
                  {SERVICES.map((s) => (
                    <li key={s.key}><a href={s.href}>{s.title}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.h}>Say hello</p>
                <ul className={styles.contact}>
                  <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                  <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
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
