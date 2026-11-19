"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import { MEGA_MENU, SERVICES_PAGE } from "@/data/service-categories";
import { useSiteMotion, sfx } from "@/lib/motion";
import Button from "@/components/Common/Button";
import Logo from "./Logo";
import Menu from "./Menu";
import styles from "./Header.module.css";

// Homepage sections → the nav item they belong to
const NAV_KEY = { home: "#home", services: "/services", work: "#work", launches: "#work", contact: "#contact", cta: "#contact" };
const EASE = [0.16, 1, 0.3, 1];

// On other pages (base="/") the homepage anchors become links back to the homepage, e.g. "/#work"
const link = (base, href) => (!base || !href.startsWith("#") ? href : href === "#home" ? base : base + href);

const col = { hidden: { opacity: 0, y: 14 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.08 + i * 0.04, duration: 0.6, ease: EASE } }) };

/**
 * The shared header: logo · navigation · the studio's phone line. Links answer the cursor with a
 * fine line that draws in and a small lift; Services opens a mega menu of every service group and
 * its inner services (the live site's names and URLs). On the homepage the guided intro keeps its
 * own HUD until the visitor reaches the site; the small sound toggle there drives the intro's
 * #soundBtn so voice, effects and the saved preference stay in sync.
 */
export default function Header({ inSite, active, base = "", current = null }) {
  const { lenis } = useSiteMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [sound, setSound] = useState(true);
  const [hasSound, setHasSound] = useState(false);
  const lastY = useRef(0);
  const menuBtn = useRef(null);
  const megaRef = useRef(null);
  const timer = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const site = document.getElementById("site");
      const local = y - (site ? site.offsetTop : 0);
      setScrolled(local > 40);
      setHidden(local > 480 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { if (hidden) setMega(false); }, [hidden]);

  useEffect(() => {
    const btn = document.getElementById("soundBtn");
    setHasSound(!!btn);
    if (!btn) return;
    const sync = () => setSound(btn.getAttribute("aria-pressed") !== "false");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(btn, { attributes: true, attributeFilter: ["aria-pressed"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (open || mega) lenis?.stop();
    else lenis?.start();
  }, [open, mega, lenis]);

  // Mega menu: hover (with a short grace period), click, Escape, click outside
  useEffect(() => {
    if (!mega) return;
    const onKey = (e) => e.key === "Escape" && setMega(false);
    const onDown = (e) => !megaRef.current?.contains(e.target) && setMega(false);
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => { removeEventListener("keydown", onKey); removeEventListener("pointerdown", onDown); };
  }, [mega]);
  const openMega = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(true), 90); };
  const closeMega = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(false), 220); };

  const toggleMenu = (v) => {
    setOpen(v);
    sfx("tick");
    if (!v) requestAnimationFrame(() => menuBtn.current?.focus());
  };

  const activeHref = current || NAV_KEY[active] || null;

  return (
    <>
      <header
        className={`${styles.header} ${inSite ? styles.on : ""} ${scrolled || mega ? styles.scrolled : ""} ${hidden && !open && !mega ? styles.hidden : ""} ${open ? styles.open : ""}`}
        inert={!inSite ? true : undefined}
        aria-hidden={!inSite}
      >
        <a className={styles.logo} href={base ? "/" : "#home"} aria-label={`${SITE.name} — home`}>
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {NAV.map((n) => {
              const href = link(base, n.href);
              const isActive = activeHref === n.href;
              if (!n.dropdown) {
                return (
                  <li key={n.href}>
                    <a href={href} className={`${styles.link} ${isActive ? styles.active : ""}`} aria-current={isActive ? "page" : undefined}>
                      <span className={styles.roll}><span>{n.label}</span><span aria-hidden="true">{n.label}</span></span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={n.href} ref={megaRef} className={styles.hasMega} onPointerEnter={(e) => e.pointerType === "mouse" && openMega()} onPointerLeave={(e) => e.pointerType === "mouse" && closeMega()}>
                  <a href={href} className={`${styles.link} ${isActive || mega ? styles.active : ""}`} aria-current={isActive ? "page" : undefined}>
                    <span className={styles.roll}><span>{n.label}</span><span aria-hidden="true">{n.label}</span></span>
                  </a>
                  <button type="button" className={`${styles.caret} ${mega ? styles.caretOpen : ""}`} aria-expanded={mega} aria-controls="lm-mega" aria-label="Show all services" onClick={() => setMega((v) => !v)}>
                    <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
                  </button>

                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        id="lm-mega"
                        className={styles.mega}
                        initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: EASE, opacity: { duration: 0.12 } } }}
                        exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.35, ease: [0.5, 0, 0.75, 0] } }}
                        onPointerEnter={() => clearTimeout(timer.current)}
                      >
                        <motion.div className={styles.megaLead} custom={0} variants={col} initial="hidden" animate="show">
                          <p className={styles.megaEyebrow}>{SERVICES_PAGE.eyebrow}</p>
                          <p className={styles.megaTitle}>{SERVICES_PAGE.tagline.map((t) => <span key={t}>{t}</span>)}</p>
                          <p className={styles.megaText}>{SERVICES_PAGE.promise}</p>
                          <div className={styles.megaActions}>
                            <Button href="/services" size="sm" onClick={() => setMega(false)}>All services</Button>
                            <Button href="/#contact" size="sm" variant="text" onClick={() => setMega(false)}>{SERVICES_PAGE.expert}</Button>
                          </div>
                        </motion.div>
                        <div className={styles.megaGrid}>
                          {MEGA_MENU.map((g, i) => (
                            <motion.div key={g.title} className={styles.group} custom={i + 1} variants={col} initial="hidden" animate="show">
                              <a className={styles.groupTitle} href={g.href} onClick={() => setMega(false)}>
                                {g.title}<i aria-hidden="true">→</i>
                              </a>
                              <ul>
                                {g.items.map((it) => (
                                  <li key={it.name}>
                                    {it.href ? <a href={it.href} onClick={() => setMega(false)}>{it.name}</a> : <span>{it.name}</span>}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          {hasSound && (
            <button type="button" className={styles.sound} aria-pressed={sound} aria-label={sound ? "Sound on — turn off" : "Sound off — turn on"} onClick={() => document.getElementById("soundBtn")?.click()}>
              <span className={styles.wave} aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} />)}</span>
            </button>
          )}
          <Button href={SITE.phoneHref} variant="outline" size="sm" icon="phone" className={styles.phone} aria-label={`Call ${SITE.phone}`}>
            {SITE.phone}
          </Button>
          <button ref={menuBtn} type="button" className={styles.burger} aria-expanded={open} aria-controls="lm-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => toggleMenu(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <AnimatePresence>{mega && <motion.div className={styles.scrim} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true" />}</AnimatePresence>
      <Menu open={open} onClose={() => toggleMenu(false)} base={base} current={activeHref} />
    </>
  );
}
