"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { MANIFESTO } from "@/data/home";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import SectionLabel from "@/components/Common/SectionLabel";
import towers from "@public/images/home/towers.jpg";
import empire from "@public/images/home/empire.jpg";
import styles from "./Manifesto.module.css";

// The statement, with the phrase that carries it set in violet
const STATEMENT = [
  { t: "Brands don't need more noise. They need " },
  { t: "moments people remember", em: true },
  { t: " — and the craft to build them." },
];
const PILLARS = ["Creativity", "Technology", "Strategy"];

/**
 * Chapter 02 — About, as an editorial spread. The page turns from deep space to paper: a running
 * head like a magazine, a statement that inks itself in as you read down, a band of the studio's three
 * pillars sliding sideways with the scroll, and two photographs set like plates with captions.
 */
export default function Manifesto() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      // Paper rises over the corridor: a hard horizontal wipe, like a page being laid down
      gsap.fromTo(q("[data-panel]"), { clipPath: "polygon(0% 18%, 100% 4%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 20%", scrub: 0.5 } });

      // Running head slides in from the gutter
      gsap.from(q("[data-head] > *"), { y: 18, opacity: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });

      // Word by word, the statement inks itself in
      gsap.fromTo(q("[data-w]"), { opacity: 0.1 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 78%", end: "bottom 50%", scrub: 0.6 } });

      // Pillars band: two rows travelling in opposite directions
      gsap.fromTo(q("[data-band='a']"), { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: q("[data-bands]")[0], start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-band='b']"), { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: q("[data-bands]")[0], start: "top bottom", end: "bottom top", scrub: true } });

      // Plates: unmask upward, image counter-drifts inside its frame
      q("[data-plate]").forEach((el) => {
        gsap.fromTo(el.querySelector("[data-frame]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 40%", scrub: 0.5 } });
        gsap.fromTo(el.querySelector("img"), { scale: 1.3, yPercent: -8 }, { scale: 1, yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.fromTo(q("[data-year]"), { xPercent: 12 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const band = (dir) => (
    <p className={styles.band} data-band={dir} aria-hidden="true">
      {[0, 1, 2].map((r) => PILLARS.map((p, i) => (
        <span key={`${r}-${i}`} className={(i + r + (dir === "b" ? 1 : 0)) % 2 ? styles.out : ""}>{p}<i>✳</i></span>
      )))}
    </p>
  );

  return (
    <section ref={ref} id="stories" className={styles.section} data-chapter="About" data-nav="home" aria-labelledby="manifesto-title">
      <div className={styles.panel} data-panel>
        <header className={styles.head} data-head>
          <SectionLabel index="02" tone="light">About the studio</SectionLabel>
          <span className={styles.folio}>{SITE.name} — {SITE.city}</span>
          <span className={styles.folio}>Est. {SITE.established}</span>
        </header>

        <div className={styles.spread}>
          <span className={styles.year} data-year aria-hidden="true">{SITE.established}</span>
          <h2 id="manifesto-title" className={styles.kicker}>{MANIFESTO.studio}</h2>
          <p className={styles.statement} data-statement>
            {STATEMENT.map((seg, i) => {
              const words = seg.t.split(/(\s+)/);
              const out = words.map((w, k) => (/^\s+$/.test(w) || !w ? w : <span key={`${i}-${k}`} data-w>{w}</span>));
              return seg.em ? <em key={i}>{out}</em> : <span key={i}>{out}</span>;
            })}
          </p>

          <figure className={`${styles.plate} ${styles.p1}`} data-plate>
            <div className={styles.frame} data-frame>
              <Image src={towers} alt="Glass towers rising into the sky, seen from street level" fill sizes="(max-width: 900px) 60vw, 24vw" placeholder="blur" />
            </div>
            <figcaption>Fig. 01 — Built upward</figcaption>
          </figure>
          <figure className={`${styles.plate} ${styles.p2}`} data-plate>
            <div className={styles.frame} data-frame>
              <Image src={empire} alt="The Manhattan skyline with the Empire State Building" fill sizes="(max-width: 900px) 90vw, 38vw" placeholder="blur" />
            </div>
            <figcaption>Fig. 02 — {SITE.city}, where the studio works</figcaption>
          </figure>

          <div className={styles.cols}>
            <p className={styles.philosophy}>{MANIFESTO.philosophy}</p>
            <ul className={styles.index} aria-label="Disciplines">
              {SERVICES.map((s, i) => (
                <li key={s.key}><a href="#services"><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bands} data-bands>
          {band("a")}
          {band("b")}
        </div>
      </div>
    </section>
  );
}
