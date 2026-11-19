"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { useSiteMotion, sfx } from "@/lib/motion";
import MagneticButton from "@/components/Common/MagneticButton";
import Logo from "./Logo";
import Menu from "./Menu";
import styles from "./Header.module.css";

const NAV_KEY = { home: "#home", services: "#services", work: "#work", contact: "#contact" };

/**
 * The homepage header. The guided intro keeps its own HUD header (logo, sound, menu); this one takes
 * over once the visitor is on the homepage (body.in-site). Sound stays one setting: the toggle here
 * presses the intro's own #soundBtn, so voice, effects and the saved preference stay in sync.
 */
export default function Header({ inSite, active }) {
  const { lenis } = useSiteMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(true);
  const lastY = useRef(0);
  const menuBtn = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const site = document.getElementById("site");
      const top = site ? site.offsetTop : 0;
      const local = y - top;
      setScrolled(local > 40);
      // Tuck away while reading downwards, return on the way up
      setHidden(local > 480 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const btn = document.getElementById("soundBtn");
    if (!btn) return;
    const sync = () => setSound(btn.getAttribute("aria-pressed") !== "false");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(btn, { attributes: true, attributeFilter: ["aria-pressed"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const toggleMenu = (v) => {
    setOpen(v);
    sfx("tick");
    if (!v) requestAnimationFrame(() => menuBtn.current?.focus());
  };

  const activeHref = NAV_KEY[active] || (active === "cta" ? "#contact" : active === "launches" ? "#work" : null);

  return (
    <>
      <header
        className={`${styles.header} ${inSite ? styles.on : ""} ${scrolled ? styles.scrolled : ""} ${hidden && !open ? styles.hidden : ""} ${open ? styles.open : ""}`}
        inert={!inSite ? true : undefined}
        aria-hidden={!inSite}
      >
        <a className={styles.logo} href="#home" aria-label={`${SITE.name} — back to top`}>
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={activeHref === n.href ? styles.active : ""} aria-current={activeHref === n.href ? "true" : undefined}>
              <span data-text={n.label}>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.sound}
            aria-pressed={sound}
            aria-label={sound ? "Sound on — turn off" : "Sound off — turn on"}
            onClick={() => document.getElementById("soundBtn")?.click()}
          >
            <span className={styles.wave} aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} />)}</span>
            <span className={styles.soundText}>Sound {sound ? "on" : "off"}</span>
          </button>
          <MagneticButton href="#contact" size="sm" className={styles.talk}>Let&apos;s talk</MagneticButton>
          <button ref={menuBtn} type="button" className={styles.burger} aria-expanded={open} aria-controls="lm-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => toggleMenu(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <Menu open={open} onClose={() => toggleMenu(false)} />
    </>
  );
}
