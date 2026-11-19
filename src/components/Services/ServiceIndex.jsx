"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SERVICE_CATEGORIES, categoryHref } from "@/data/service-categories";
import Button from "@/components/Common/Button";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./ServiceIndex.module.css";

const keyFromHash = (h) => (h?.startsWith("#index-") ? h.slice(7) : null);

/**
 * The service index: every inner service, by category, exactly as the studio lists them. A plain
 * two-column grid — the eight categories as tabs on the left, the chosen one on the right with its
 * photograph, description and every service inside it. Phones: the tabs become a row of chips above.
 * Links to "#index-<key>" (from the menu or elsewhere) open that category and scroll to the index.
 */
export default function ServiceIndex() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = SERVICE_CATEGORIES.length;
  const c = SERVICE_CATEGORIES[active];

  // "#index-web" etc. select that tab (the page's own smooth scroll then takes over)
  useEffect(() => {
    const select = (k) => { const i = SERVICE_CATEGORIES.findIndex((s) => s.key === k); if (i >= 0) setActive(i); };
    select(keyFromHash(location.hash));
    const onClick = (e) => { const a = e.target.closest?.('a[href*="#index-"]'); if (a) select(keyFromHash(a.hash)); };
    const onHash = () => select(keyFromHash(location.hash));
    document.addEventListener("click", onClick, true);
    addEventListener("hashchange", onHash);
    return () => { document.removeEventListener("click", onClick, true); removeEventListener("hashchange", onHash); };
  }, []);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-tab]"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root.querySelector("[data-tabs]"), start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // Each change: the photograph wipes in, the list deals in
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = ref.current;
    gsap.fromTo(root.querySelector("[data-pimg]"), { clipPath: "inset(0% 0% 0% 100% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.9, ease: "expo.inOut" });
    gsap.fromTo(root.querySelector("[data-pimg] img"), { scale: 1.2 }, { scale: 1, duration: 1.4, ease: "expo.out" });
    gsap.fromTo(root.querySelectorAll("[data-pt]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.05 });
    gsap.fromTo(root.querySelectorAll("[data-li]"), { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out", stagger: 0.025, delay: 0.15 });
  }, { dependencies: [active], scope: ref });

  const pick = (i) => { if (i !== active) { setActive(i); sfx("tick"); } };
  const onKey = (e) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const i = (active + d + n) % n;
    pick(i);
    ref.current.querySelectorAll("[role=tab]")[i]?.focus();
  };

  return (
    <section ref={ref} id="index" className={styles.index} aria-labelledby="index-title">
      <header className={styles.head}>
        <Label>Every service</Label>
        <RevealText id="index-title" className={styles.title}>The full menu, <em>service by service.</em></RevealText>
      </header>

      <div className={styles.grid}>
        <div className={styles.tabs} role="tablist" aria-label="Service categories" aria-orientation="vertical" onKeyDown={onKey} data-tabs>
          {SERVICE_CATEGORIES.map((s, i) => (
            <button
              key={s.key} type="button" role="tab" id={`index-${s.key}`} aria-selected={i === active} aria-controls="index-panel" tabIndex={i === active ? 0 : -1}
              className={`${styles.tab} ${i === active ? styles.on : ""}`} onClick={() => pick(i)} data-tab
            >
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.panel} id="index-panel" role="tabpanel" aria-labelledby={`index-${c.key}`}>
          <div className={styles.top}>
            <figure className={styles.pimg} data-pimg aria-hidden="true"><Image src={c.image} alt="" fill sizes="(min-width: 1001px) 26vw, 92vw" loading="lazy" /></figure>
            <div className={styles.copy}>
              <h3 className={styles.name} data-pt>{c.name}</h3>
              <p className={styles.text} data-pt>{c.text}</p>
              <div data-pt><Button href={categoryHref(c)} variant="outline" size="sm">Explore {c.short}</Button></div>
            </div>
          </div>
          <ul className={styles.list} aria-label={`${c.name} services`}>
            {c.items.map((it) => (
              <li key={it.name} data-li>
                {it.href ? <a href={it.href}><span>{it.name}</span><i aria-hidden="true">↗</i></a> : <span className={styles.plain}>{it.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
