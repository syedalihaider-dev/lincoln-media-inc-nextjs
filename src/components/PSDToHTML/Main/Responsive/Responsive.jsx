"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Responsive.module.css";

const DEV = ["browser", "tablet", "phone"];

/**
 * Desktop → Tablet → Mobile as three devices on a perspective stage, with a breakpoint ruler above.
 * Held on desktop: the desktop starts alone and large; scrolling shrinks it back to the left, the
 * tablet slides in, then the phone — each laid out for its own width — while the marker on the
 * ruler runs down from 1280 to 390 and the CSS rule that produces each layout appears beneath it.
 * Phones: the three devices stack, the rule shown with each.
 */
export default function Responsive({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const steps = data.steps;
  useScene(ref, (mm, root) => {
    const devs = () => gsap.utils.toArray("[data-dev]", root);
    mm.add(PIN, () => {
      const [d, t, p] = devs();
      const read = root.querySelector("[data-read]");
      const w = { v: steps[0].w };
      gsap.set(d, { xPercent: 30, scale: 1.25 });
      gsap.set([t, p], { xPercent: 60, z: -300, opacity: 0 });
      const show = () => { read.textContent = `${Math.round(w.v)}px`; gsap.set(root.querySelector("[data-mark]"), { left: `${((1440 - w.v) / 1100) * 100}%` }); };
      show();
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 }, scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1, onUpdate: (s) => setAt(s.progress < 0.45 ? 0 : s.progress < 0.8 ? 1 : 2) } });
      tl.to(d, { xPercent: 0, scale: 1, rotationY: 16 }, 0.2)
        .to(t, { xPercent: 0, z: 0, opacity: 1, rotationY: 6 }, 0.3)
        .to(w, { v: steps[1].w, onUpdate: show }, 0.3)
        .to(p, { xPercent: 0, z: 0, opacity: 1, rotationY: -8 }, 1.4)
        .to(w, { v: steps[2].w, onUpdate: show }, 1.4)
        .to({}, { duration: 0.3 });
      return () => gsap.set(devs(), { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      devs().forEach((d) => gsap.from(d, { y: 50, rotationX: 20, transformPerspective: 1000, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: d, start: "top 88%", once: true } }));
    });
  });

  const s = steps[at];
  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-resp">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="psd-resp" />
        <div className={styles.ruler} aria-hidden="true">
          {[1440, 1280, 999, 820, 599, 390].map((v) => <span key={v} style={{ left: `${((1440 - v) / 1100) * 100}%` }}>{v}</span>)}
          <i className={styles.mark} data-mark><b data-read>1280px</b></i>
        </div>
      </div>
      <div className={styles.stage} aria-hidden="true">
        {DEV.map((dv, i) => (
          <figure key={dv} className={`${styles.dev} ${styles[dv]}`} data-dev>
            <OnDevice device={dv} page="home" />
            <figcaption><b>{steps[i].name}</b> {steps[i].rule}<code>{steps[i].code}</code></figcaption>
          </figure>
        ))}
      </div>
      <p className={styles.rule} aria-hidden="true" key={s.name}><span>{s.name} · {s.rule}</span><code>{s.code}</code></p>
    </section>
  );
}
