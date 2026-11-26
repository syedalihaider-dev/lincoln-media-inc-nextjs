"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Device, { Screen } from "@/components/MobileApp/Device";
import { App } from "../ui/Halden";
import styles from "./Mobile.module.css";

const CENTER = ["job", "assistant", "report"];

/**
 * Mobile experience — a product presentation, held on screen. Over a warm photograph three phones
 * rise at different speeds (the outer two turn in toward the centre); the centre phone grows and
 * steps through a job: the checklist, the voice note becoming a report, the signed-off record —
 * and the note for each moment appears beside it.
 */
export default function Mobile({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelectorAll(s);
    const build = (tl, intro = true) => {
      if (intro) {
        tl.fromTo(root.querySelector("[data-bg]"), { scale: 1.18 }, { scale: 1, ease: "none", duration: 3 }, 0)
          .from(q("[data-side='l']"), { yPercent: 70, rotateY: 40, opacity: 0, ease: "power2.out", duration: 1 }, 0)
          .from(q("[data-side='r']"), { yPercent: 95, rotateY: -40, opacity: 0, ease: "power2.out", duration: 1.1 }, 0.1)
          .from(q("[data-mid]"), { yPercent: 40, scale: 0.86, ease: "power2.out", duration: 1 }, 0);
      }
      const layers = q("[data-mid] [data-layer]"), notes = q("[data-note]");
      CENTER.forEach((_, i) => {
        if (!i) { tl.from(notes[0], { y: 30, opacity: 0, duration: 0.4 }, 0.7); return; }
        const t = 0.9 + i * 0.75;
        tl.to(layers[i - 1], { opacity: 0, yPercent: -4, duration: 0.35 }, t)
          .fromTo(layers[i], { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0, duration: 0.35 }, t)
          .to(notes[i - 1], { opacity: 0.35, duration: 0.3 }, t)
          .from(notes[i], { y: 30, opacity: 0, duration: 0.4 }, t + 0.05);
      });
      tl.to(q("[data-side='l']"), { yPercent: -10, ease: "none", duration: 1.6 }, 1.2).to(q("[data-side='r']"), { yPercent: -22, ease: "none", duration: 1.6 }, 1.2);
    };
    mm.add(PIN, () => build(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.9 } })));
    mm.add(SMALL, () => build(gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-stage]"), start: "top 80%", end: "bottom 30%", scrub: 0.9 } }), false));
  }, []);

  return (
    <section ref={ref} className={styles.mobile} aria-labelledby="ai-mobile">
      <div className={styles.bg} data-bg aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" className={styles.bgImg} />
      </div>
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-mobile" size="md" />
        <ul className={styles.notes}>
          {data.notes.map((n) => <li key={n.title} data-note><h3>{n.title}</h3><p>{n.text}</p></li>)}
        </ul>
      </div>
      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={`${styles.p} ${styles.pl}`} data-side="l"><Device depth={9} finish="silver"><Screen><App screen="today" /></Screen></Device></div>
        <div className={`${styles.p} ${styles.pm}`} data-mid>
          <Device depth={11}>
            {CENTER.map((c, i) => <Screen key={c} style={{ opacity: i ? 0 : 1 }}><App screen={c} /></Screen>)}
          </Device>
        </div>
        <div className={`${styles.p} ${styles.pr}`} data-side="r"><Device depth={9}><Screen><App screen="notify" /></Screen></Device></div>
      </div>
      <p className={styles.sr}>{data.imageAlt}</p>
    </section>
  );
}
