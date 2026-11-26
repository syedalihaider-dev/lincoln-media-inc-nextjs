"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Social from "@/components/Common/Social";
import Logo from "@/components/Header/Logo";
import styles from "./Footer.module.css";

/**
 * The footer: a contact band (the next step, the phone line), then the studio — logo, statement and
 * its social profiles — beside the site map and every way to reach us; the name set large along the
 * foot, and the small print.
 */
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
      <div className={styles.band} data-col>
        <p className={styles.bandTitle}>Have a project in mind?</p>
        <div className={styles.bandActions}>
          <Button href="/contact-us#contact-form">Start a project</Button>
          <Button href={SITE.phoneHref} variant="outline" icon="phone">{SITE.phone}</Button>
        </div>
      </div>

      <div className={styles.cols}>
        <div className={styles.lead} data-col>
          <a href="/" className={styles.logo} aria-label={`${SITE.name} — home`}><Logo priority={false} /></a>
          <p className={styles.leadText}>A New York studio for web, marketing, e-commerce, branding, video and animation.</p>
          <Social />
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
          <ul className={styles.contact}>
            <li><a href={SITE.phoneHref}><span>Call</span>{SITE.phone}</a></li>
            <li><a href={SITE.whatsapp} target="_blank" rel="noopener"><span>WhatsApp</span>Message us</a></li>
            <li><a href={`mailto:${SITE.email}`}><span>Email</span>{SITE.email}</a></li>
            <li><address><span>Studio</span>{SITE.street},<br />{SITE.locality}</address></li>
          </ul>
        </div>
      </div>

      <p className={styles.word} aria-label={SITE.name}>
        <span data-word aria-hidden="true">The Lincoln <em>Media</em></span>
      </p>

      <div className={styles.base}>
        {/* #year is filled in by public/app.js */}
        <span>© <span id="year" suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. All rights reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
