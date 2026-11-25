"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Artefact } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Solution.module.css";

/**
 * The method, read off the work itself. The service's artefact is held on the left (sticky) while the
 * principles scroll past on the right; as each principle reaches the middle of the screen a highlight
 * frame travels to the part of the artefact it's about and the rest of the artefact dims around it.
 * Phones show the artefact once, then the principles.
 */
export default function Solution({ data, brand, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const spot = root.querySelector("[data-spot]");
    const points = gsap.utils.toArray("[data-point]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const go = (i) => {
        const [x0, y0, x1, y1] = data.points[i].focus;
        gsap.to(spot, { left: `${x0}%`, top: `${y0}%`, width: `${x1 - x0}%`, height: `${y1 - y0}%`, autoAlpha: 1, duration: 0.8, ease: "expo.out" });
        points.forEach((p, j) => p.classList.toggle(styles.on, j === i));
      };
      const ts = points.map((p, i) => ScrollTrigger.create({ trigger: p, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && go(i) }));
      return () => ts.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.sol} aria-labelledby="bsi-sol">
      <Head service={service} kicker={data.kicker} title={data.title} id="bsi-sol" />
      <div className={styles.body}>
        <div className={styles.side}>
          <div className={styles.stage} aria-hidden="true">
            {/* the frame is exactly the artefact's box, so focus regions (percent) map straight onto it */}
            <div className={`${styles.frame} ${styles[`k_${data.artefact}`] || ""}`}>
              <Artefact kind={data.artefact} brand={brand} />
              <span className={styles.spot} data-spot />
            </div>
          </div>
        </div>
        <ol className={styles.points}>
          {data.points.map((p) => (
            <li key={p.name} className={styles.point} data-point>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
