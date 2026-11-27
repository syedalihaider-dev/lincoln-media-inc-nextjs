"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { ABOUT_STORY } from "@/data/about";
import { CASE_STUDIES } from "@/data/work";
import Label from "./Label";
import styles from "./OurStory.module.css";

const EASE = [0.77, 0, 0.18, 1];
// The film runs where there is room for it; the CSS stacks the chapters below the same width
const FILM = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const STACKED = "(max-width: 1100px) and (prefers-reduced-motion: no-preference)";

/**
 * Our story, as a horizontal film of three chapters. On desktop the section holds still and the
 * chapters slide past: New York opens through a mask; the five disciplines swap their photographs
 * as you travel (or as you point at them); the brands the studio has moved each open their case
 * study, with the client's picture following your hover. Tablet and phone: the chapters in turn.
 */
export default function OurStory() {
  const ref = useRef(null);
  const [disc, setDisc] = useState(0);
  const [brand, setBrand] = useState(0);
  const { ready } = useSiteMotion();
  const [studio, disciplines, brands] = ABOUT_STORY;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();

    mm.add(FILM, () => {
      const track = root.querySelector("[data-track]");
      const distance = () => track.scrollWidth - innerWidth;
      const film = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });
      const inFilm = (el, start = "left 85%", end = "left 35%") => ({ trigger: el, containerAnimation: film, start, end, scrub: 0.6 });

      // Chapter 1: New York opens; its words rise as the frame arrives
      const c1 = root.querySelector("[data-ch='studio']");
      gsap.fromTo(c1.querySelector("[data-reveal]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top 80%", end: "top top", scrub: 0.6 } });
      gsap.fromTo(c1.querySelector("[data-reveal] img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top bottom", end: () => `+=${innerHeight + distance() * 0.4}`, scrub: true } });

      // Chapter 2: the frame wipes in, then each discipline takes the frame in turn as the film travels
      const c2 = root.querySelector("[data-ch='disciplines']");
      gsap.fromTo(c2.querySelector("[data-reveal]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: inFilm(c2) });
      const n = disciplines.disciplines.length;
      ScrollTrigger.create({ trigger: c2, containerAnimation: film, start: "left 60%", end: "right 60%", onUpdate: (s) => setDisc(Math.min(n - 1, Math.floor(s.progress * n))) });

      // Chapter 3: the brand list rules draw in
      const c3 = root.querySelector("[data-ch='brands']");
      gsap.fromTo(c3.querySelectorAll("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", stagger: 0.05, scrollTrigger: inFilm(c3, "left 90%", "left 40%") });

      // Every chapter's words slide in against the film, a little behind it
      gsap.utils.toArray("[data-words]", root).forEach((w) => {
        gsap.fromTo(w, { xPercent: 14 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: w.closest("[data-ch]"), containerAnimation: film, start: "left right", end: "right left", scrub: true } });
      });
    });

    // Tablet / phone: each chapter's picture opens as it arrives
    mm.add(STACKED, () => {
      gsap.utils.toArray("[data-reveal]", root).forEach((f) => {
        gsap.fromTo(f, { clipPath: "inset(15% 10% 15% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 40%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="story" className={styles.story} aria-labelledby="story-title">
      <div className={styles.pin} data-pin>
        <header className={styles.head}>
          <Label>Our story</Label>
          <h2 id="story-title" className="lm-sr-only">Our story</h2>
        </header>

        <div className={styles.track} data-track>
          {/* Chapter 1 — the studio */}
          <article className={`${styles.chapter} ${styles.c1}`} data-ch="studio">
            <figure className={styles.c1Fig} data-reveal>
              <Image src={studio.image} alt={studio.alt} fill sizes="(min-width: 901px) 46vw, 100vw" />
              <figcaption>New York</figcaption>
            </figure>
            <div className={styles.words} data-words>
              <p className={styles.kicker}>{studio.kicker}</p>
              <h3 className={styles.title}>{studio.title}</h3>
              <p className={styles.text}>{studio.text}</p>
              <p className={styles.detail}>{studio.detail}</p>
            </div>
          </article>

          {/* Chapter 2 — five disciplines, one team */}
          <article className={`${styles.chapter} ${styles.c2}`} data-ch="disciplines">
            <div className={styles.words} data-words>
              <p className={styles.kicker}>{disciplines.kicker}</p>
              <h3 className={styles.title}>{disciplines.title}</h3>
              <ul className={styles.discList}>
                {disciplines.disciplines.map((d, i) => (
                  <li key={d.name} className={disc === i ? styles.on : undefined} onPointerEnter={(e) => { if (e.pointerType === "mouse") { setDisc(i); sfx("tick"); } }}>
                    {d.name}
                  </li>
                ))}
              </ul>
              <p className={styles.text}>{disciplines.text}</p>
            </div>
            <figure className={styles.c2Fig} data-reveal aria-hidden="true">
              <AnimatePresence initial={false}>
                <m.div
                  key={disc}
                  className={styles.c2Img}
                  initial={{ clipPath: "inset(0% 0% 100% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 0.9, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                >
                  <Image src={disciplines.disciplines[disc].image} alt="" fill sizes="(min-width: 901px) 36vw, 100vw" />
                </m.div>
              </AnimatePresence>
              <figcaption>{disciplines.disciplines[disc].name}</figcaption>
            </figure>
          </article>

          {/* Chapter 3 — brands we've moved */}
          <article className={`${styles.chapter} ${styles.c3}`} data-ch="brands">
            <div className={styles.words} data-words>
              <p className={styles.kicker}>Case studies</p>
              <h3 className={styles.title}>{brands.title}</h3>
              <ul className={styles.brandList}>
                {CASE_STUDIES.map((c, i) => (
                  <li key={c.slug} onPointerEnter={(e) => { if (e.pointerType === "mouse") { setBrand(i); sfx("tick"); } }}>
                    <span className={styles.rule} data-rule aria-hidden="true" />
                    <a href={`/work/${c.slug}`} onFocus={() => setBrand(i)}>
                      <b>{c.name}</b>
                      <span>{c.sector}</span>
                      <i aria-hidden="true">↗</i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className={styles.c3Fig} aria-hidden="true">
              <AnimatePresence initial={false}>
                <m.div
                  key={brand}
                  className={styles.c3Img}
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.8, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
                >
                  <Image src={CASE_STUDIES[brand].image} alt="" fill sizes="(min-width: 901px) 30vw, 100vw" />
                </m.div>
              </AnimatePresence>
              <figcaption>{CASE_STUDIES[brand].name} — {CASE_STUDIES[brand].services}</figcaption>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
}
