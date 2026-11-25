"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { Artefact } from "../../kit/Identity";
import styles from "./CTA.module.css";

/**
 * The service page's close: the invitation in large type on paper beside a block of the demo brand's
 * colour that slides open from the right with the service's artefact turning into place on it; the
 * other branding services follow as the last index.
 */
export default function CTA({ data, brand, siblings }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelector("[data-title]"), { type: "lines", mask: "lines" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 65%", once: true } })
        .fromTo(root.querySelector("[data-block]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
        .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.2)
        .from(root.querySelector("[data-art]"), { rotation: -14, y: 60, opacity: 0, duration: 1.3, ease: "expo.out" }, 0.7)
        .from(root.querySelectorAll("[data-rise]"), { y: 20, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.6);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="bsi-cta">
      <div className={styles.main}>
        <div className={styles.copy}>
          <h2 id="bsi-cta" className={styles.title} data-title>{data.title.map((l, i) => <span key={l} className={i === data.title.length - 1 ? styles.accent : undefined}>{l} </span>)}</h2>
          <p className={styles.text} data-rise>{data.text}</p>
          <div className={styles.actions} data-rise>
            <Button href="/#contact" size="lg">Start a project</Button>
            <Button href={`mailto:${SITE.email}`} variant="text" icon="mail">{SITE.email}</Button>
          </div>
        </div>
        <div className={styles.block} data-block aria-hidden="true">
          <div className={`${styles.art} ${styles[`k_${data.artefact}`] || ""}`} data-art><Artefact kind={data.artefact} brand={brand} /></div>
        </div>
      </div>
      <nav className={styles.sibs} aria-label="More branding services">
        <p>More branding services</p>
        <ul>
          <li><a href="/services/branding-communication-agency"><b>All branding</b><span>Strategy, identity and communication</span></a></li>
          {siblings.map((s) => <li key={s.path}><a href={s.path}><b>{s.name}</b><span>{s.text}</span></a></li>)}
        </ul>
      </nav>
    </section>
  );
}
