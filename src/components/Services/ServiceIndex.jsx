"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import Button from "@/components/Common/Button";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./ServiceIndex.module.css";

const FILM = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
// Four ways to hang a panel, chosen per category so even the longest list (Web, 14) fits
const LOOK = { web: "side", mobile: "band", marketing: "veil", ux: "type", commerce: "band", brand: "side", video: "veil", animation: "type" };

/**
 * The service index: every inner service, by category, exactly as the studio lists them. On desktop
 * the categories travel past sideways as you scroll, each panel in its own treatment — a photo band,
 * a tall photo beside the list, the photo as a veil behind it, or type alone. Tablet and phone: in turn.
 */
export default function ServiceIndex() {
  const ref = useRef(null);
  const film = useRef(null);
  const { ready, scrollTo } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(FILM, () => {
      const track = root.querySelector("[data-track]");
      const distance = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });
      film.current = tween;
      gsap.utils.toArray("[data-panel]", root).forEach((p) => {
        const img = p.querySelector("[data-pimg]");
        if (img) gsap.fromTo(img, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: 0.6 } });
        gsap.fromTo(p.querySelectorAll("[data-li]"), { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: 0.03, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 80%", end: "left 30%", scrub: 0.6 } });
      });
      return () => { film.current = null; };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // "#index-web" etc. land on that panel within the sideways film
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#index-"]');
      const tween = film.current;
      if (!a || !tween) return;
      const panel = document.querySelector(a.getAttribute("href"));
      if (!panel) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const st = tween.scrollTrigger;
      const frac = Math.min(1, panel.offsetLeft / (panel.parentElement.scrollWidth - innerWidth));
      scrollTo(st.start + frac * (st.end - st.start));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [scrollTo]);

  return (
    <section ref={ref} id="index" className={styles.index} aria-labelledby="index-title">
      <div className={styles.pin} data-pin>
        <header className={styles.head}>
          <Label>Every service</Label>
          <RevealText id="index-title" className={styles.title}>The full menu, <em>service by service.</em></RevealText>
          <p className={styles.hint}>Keep scrolling — every category and everything inside it.</p>
        </header>

        <div className={styles.track} data-track>
          {SERVICE_CATEGORIES.map((c) => {
            const look = LOOK[c.key];
            return (
              <article key={c.key} id={`index-${c.key}`} className={`${styles.panel} ${styles[look]}`} data-panel>
                {look !== "type" && (
                  <figure className={styles.pimg} data-pimg aria-hidden="true">
                    <Image src={c.image} alt="" fill sizes="(min-width: 1101px) 40vw, 100vw" />
                  </figure>
                )}
                <div className={styles.copy}>
                  <h3 className={styles.name}>{c.name}</h3>
                  <p className={styles.text}>{c.text}</p>
                  <ul className={styles.list}>
                    {c.items.map((it) => (
                      <li key={it.name} data-li>
                        {it.href ? <a href={it.href}><span>{it.name}</span><i aria-hidden="true">↗</i></a> : <span className={styles.plain}>{it.name}</span>}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cta}>
                    {c.href ? <Button href={c.href} variant="outline">Explore {c.short}</Button> : <Button href="/#contact" variant="outline">Talk to us about {c.short}</Button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
