"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useMediaQuery, useSiteMotion, sfx } from "@/lib/motion";
import { SERVICES } from "@/data/services";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import styles from "./Services.module.css";

const ServicesRing = dynamic(() => import("./ServicesRing"), { ssr: false, loading: () => null });
const pad = (n) => String(n).padStart(2, "0");
const IMAGES = SERVICES.map((s) => s.image);

/**
 * Chapter 03 — Services, as a place you move through. Desktop: the chapter pins and the nine
 * disciplines stand on a ring in 3D; the scroll turns the ring, so each discipline swings to face you
 * while its name sweeps across the back wall and its details take the front.
 * Phones: an open editorial list. Reduced motion: no ring, a still photograph per discipline.
 */
export default function Services() {
  const ref = useRef(null);
  const st = useRef(null);
  const ring = useRef({ turn: 0, active: 0, px: 0, py: 0 });
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const desktop3D = useMediaQuery(DESKTOP_MOTION);
  const count = SERVICES.length;

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      let cur = 0;
      const r = ring.current;
      st.current = ScrollTrigger.create({
        trigger: ref.current.querySelector("[data-pin]"),
        start: "top top",
        end: `+=${count * 60}%`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          r.turn = self.progress * (count - 1);
          const i = Math.round(r.turn);
          r.active = i;
          ref.current.style.setProperty("--p", self.progress.toFixed(4));
          if (i !== cur) { cur = i; setActive(i); sfx("tick"); }
        },
      });
      // The back-wall title band drifts with the turn of the ring
      gsap.fromTo(q("[data-wall]"), { xPercent: 4 }, { xPercent: -4, ease: "none", scrollTrigger: { trigger: ref.current.querySelector("[data-pin]"), start: "top top", end: `+=${count * 60}%`, scrub: true } });

      const move = (e) => { r.px = e.clientX / innerWidth - 0.5; r.py = e.clientY / innerHeight - 0.5; };
      addEventListener("pointermove", move);
      return () => { st.current = null; removeEventListener("pointermove", move); };
    });
    return () => mm.revert();
  }, { dependencies: [ready, count], scope: ref });

  // Choosing a discipline scrolls the pinned chapter to it (or just switches when nothing is pinned)
  const choose = (i) => {
    const s = st.current;
    if (s) scrollTo(s.start + (i / (count - 1)) * (s.end - s.start));
    else { ring.current.turn = i; ring.current.active = i; setActive(i); }
  };

  return (
    <section ref={ref} id="services" className={styles.section} data-chapter="Services" data-nav="services" aria-labelledby="services-title">
      <div className={styles.pin} data-pin>
        {/* Back wall: the active discipline's name, huge and hollow */}
        <div className={styles.wall} aria-hidden="true">
          <div data-wall>
            {SERVICES.map((s, i) => (
              <span key={s.key} className={`${styles.wallWord} ${i === active ? styles.wallOn : ""}`}>{s.title}</span>
            ))}
          </div>
        </div>

        {/* The ring (desktop, motion allowed) or a still photograph (reduced motion) */}
        <div className={styles.stage} aria-hidden="true">
          {ready && desktop3D ? (
            <ServicesRing images={IMAGES} state={ring} />
          ) : (
            <div className={styles.still}>
              {SERVICES.map((s, i) => (
                <figure key={s.key} className={`${styles.frame} ${i === active ? styles.current : ""}`}>
                  <Image src={s.image} alt="" fill sizes="36vw" placeholder="blur" />
                </figure>
              ))}
            </div>
          )}
        </div>

        <header className={styles.head}>
          <SectionLabel index="03">What we do</SectionLabel>
          <RevealText id="services-title" className={styles.title}>
            Nine disciplines. <em>One team.</em>
          </RevealText>
          <a className={styles.all} href="/services">Explore all services <i aria-hidden="true">↗</i></a>
        </header>

        <div className={styles.body}>
          {/* Index of disciplines (desktop) */}
          <ol className={styles.index} aria-label="Disciplines">
            {SERVICES.map((s, i) => (
              <li key={s.key}>
                <button type="button" className={i === active ? styles.on : ""} aria-current={i === active ? "true" : undefined} aria-controls={`svc-${s.key}`} onClick={() => choose(i)}>
                  <span className={styles.idxNo}>{pad(i + 1)}</span>
                  <span className={styles.idxName}>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.dial} aria-hidden="true">
            <span className={styles.counter}><b>{pad(active + 1)}</b> / {pad(count)}</span>
            <span className={styles.progress}><i /></span>
          </div>

          {/* Details: all in the document; on desktop only the active one shows */}
          <div className={styles.details} aria-live="polite">
            {SERVICES.map((s, i) => (
              <article key={s.key} id={`svc-${s.key}`} className={`${styles.detail} ${i === active ? styles.shown : ""}`}>
                <figure className={styles.mobileImg}>
                  <Image src={s.image} alt={s.alt} fill sizes="100vw" placeholder="blur" />
                </figure>
                <p className={styles.dNo}>{pad(i + 1)} — {pad(count)}</p>
                <h3 className={styles.dTitle}>{s.title}</h3>
                <p className={styles.dBlurb}>{s.blurb}</p>
                <ul className={styles.chips}>
                  {s.subs.map(([label, href]) => (
                    <li key={label}>{href ? <a href={href}>{label}</a> : <span>{label}</span>}</li>
                  ))}
                </ul>
                <a className={styles.explore} href={s.href}>
                  {s.href === "/services" ? "See all services" : `Explore ${s.title}`} <i aria-hidden="true">→</i>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
