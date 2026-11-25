"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Architecture.module.css";

/**
 * The store's architecture as four slabs seen from above at an angle: the storefront on top (a real
 * page), then the commerce engine, the services it calls and the systems of record. While the section
 * holds (desktop) the slabs part — one CSS variable, --gap, drives every plane and every connection —
 * the camera eases round, each layer's description lights in turn and packets travel the wires
 * between layers. Phones get the same four layers as a plain stack.
 */
export default function Architecture({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const layers = [...data.layers].reverse(); // bottom plane first in the 3D stack

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const labels = gsap.utils.toArray("[data-label]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "+=170%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      const gap = () => `${Math.round(Math.min(130, Math.max(70, innerHeight * 0.13)))}px`;
      tl.fromTo(q("[data-stack]"), { "--gap": "12px", "--rz": "-46deg", "--rx": "62deg" }, { "--gap": gap, "--rz": "-34deg", "--rx": "56deg", duration: 1 }, 0)
        .fromTo(q("[data-scene]"), { yPercent: 10 }, { yPercent: -6, duration: 1 }, 0)
        .fromTo(q("[data-wires]"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.35);
      labels.forEach((l, i) => tl.fromTo(l, { opacity: 0.25 }, { opacity: 1, duration: 0.12 }, 0.2 + i * 0.18));
      tl.to({}, { duration: 0.2 });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-card]", root).forEach((c) => gsap.from(c, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 88%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.arch} aria-labelledby="ecom-arch">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="ecom-arch" />
        <ol className={styles.labels}>
          {data.layers.map((l) => (
            <li key={l.key} data-label data-card>
              <h3>{l.name}</h3>
              <p>{l.text}</p>
              <ul className={styles.chipsInline}>{l.chips.map((c) => <li key={c}>{c}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.scene} data-scene aria-hidden="true">
        <div className={styles.stack} data-stack>
          {layers.map((l, i) => (
            <div key={l.key} className={`${styles.plane} ${styles[l.key]}`} style={{ "--i": i }}>
              <span className={styles.planeName}>{l.name}</span>
              {l.store ? (
                <div className={styles.storefront}><Browser url={l.store.domain}><Screen kind="home" store={l.store} /></Browser></div>
              ) : (
                <ul className={styles.modules}>{l.chips.map((c) => <li key={c}>{c}</li>)}</ul>
              )}
            </div>
          ))}
          <div className={styles.wires} data-wires>
            {[0, 1, 2].map((i) => [18, 50, 82].map((x) => (
              <span key={`${i}-${x}`} className={styles.wire} style={{ "--i": i, "--x": `${x}%`, "--d": `${(i * 3 + x / 30) * 0.35}s` }}><b /></span>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
}
