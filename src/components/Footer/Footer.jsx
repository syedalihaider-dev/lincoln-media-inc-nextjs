"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import Clock from "@/components/Common/Clock";
import styles from "./Footer.module.css";

/** The footer: business details, the site map, and the name set as large as the page allows. */
export default function Footer() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(ref.current.querySelector("[data-word]"), { type: "chars", charsClass: styles.ch });
      gsap.from(split.chars, { yPercent: 105, duration: 1.4, stagger: 0.035, ease: "expo.out", scrollTrigger: { trigger: ref.current.querySelector("[data-word]"), start: "top 95%", once: true } });
      gsap.from(ref.current.querySelectorAll("[data-col]"), { y: 40, opacity: 0, stagger: 0.07, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <footer ref={ref} className={styles.footer} data-chapter="Footer" data-nav="contact">
      <div className={styles.cols}>
        <div className={styles.lead} data-col>
          <p className={styles.leadText}>A New York studio for web, marketing, e-commerce and branding.</p>
          <a className={styles.mail} href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        {FOOTER_COLUMNS.map((c) => (
          <nav key={c.title} className={styles.col} aria-label={c.title} data-col>
            <p className={styles.h}>{c.title}</p>
            <ul>
              {c.links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
        ))}
        <div className={styles.col} data-col>
          <p className={styles.h}>Contact</p>
          <ul>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><address>{SITE.street},<br />{SITE.locality}</address></li>
          </ul>
        </div>
      </div>

      <p className={styles.word} aria-label={SITE.name}>
        <span data-word aria-hidden="true">The Lincoln<br /><em>Media</em></span>
      </p>

      <div className={styles.base}>
        {/* #year is filled in by public/app.js */}
        <span>© <span id="year" suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. All rights reserved.</span>
        <span>{SITE.city} · Est. {SITE.established} · <Clock /></span>
        <span>Voice by Kokoro (Apache 2.0)</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
