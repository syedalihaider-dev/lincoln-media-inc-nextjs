"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Head from "../Head";
import styles from "./Technology.module.css";

/**
 * The stack as an exploded drawing. The service's layers — interface, logic, data, services,
 * delivery — sit as slabs on the blueprint angle, pressed together into one block. As you read down
 * the list beside them the block opens out, slab by slab, and the layer being read lifts and lights.
 */
export default function Technology({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.layers.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const slabs = gsap.utils.toArray("[data-slab]", root);
    const rows = gsap.utils.toArray("[data-row]", root);
    const sts = rows.map((r, i) => gsap.timeline({ scrollTrigger: { trigger: r, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && (setActive(i), sfx("tick")) } }));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      // top slab = the first layer; the block opens from pressed together to spaced out
      gsap.fromTo(slabs, { z: (i) => (n - 1 - i) * 14 }, { z: (i) => (n - 1 - i) * 70, ease: "power2.inOut", scrollTrigger: { trigger: root.querySelector("[data-rows]"), start: "top 75%", end: "center 50%", scrub: 0.8 } });
      gsap.from(rows, { x: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-rows]"), start: "top 85%", once: true } });
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-block]"), { rotationZ: -50 }, { rotationZ: -30, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => { mm.revert(); sts.forEach((t) => t.kill()); };
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.tech} aria-labelledby="stack-title">
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.view}>
          <div className={styles.block} data-block>
            {data.layers.map((l, i) => (
              <div key={l.name} className={`${styles.slab} ${i === active ? styles.on : ""}`} data-slab style={{ "--i": i, transform: `translateZ(${(n - 1 - i) * 40}px)` }}>
                <b>{l.name}</b>
                <small>{l.tech}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="stack-title" />
        <ol className={styles.rows} data-rows>
          {data.layers.map((l, i) => (
            <li key={l.name} className={`${styles.row} ${i === active ? styles.rowOn : ""}`} data-row>
              <h3>{l.name}</h3>
              <p className={styles.techs}>{l.tech}</p>
              <p>{l.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
