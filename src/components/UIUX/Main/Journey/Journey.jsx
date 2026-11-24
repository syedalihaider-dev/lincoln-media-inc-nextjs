"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View from "@/components/DesignKit/View";
import { useScene, PIN } from "@/components/DigitalMarketing/shared";
import styles from "./Journey.module.css";

/**
 * Research → Structure → Wireframe → Prototype → Test → Refine, in one frame. Held on desktop: each
 * stage's artefact is wiped over the last from left to right — sticky notes become a sitemap, the
 * sitemap a wireframe, the wireframe a grey prototype, the prototype a usability session and finally
 * the finished interface — while the stage list advances and a fidelity meter fills from "rough" to
 * "polished". Phones: the six stages stack, each with its own artefact.
 */
export default function Journey({ data }) {
  const ref = useRef(null);
  const stages = data.stages;

  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const layers = gsap.utils.toArray("[data-layer]", root);
      const items = gsap.utils.toArray("[data-item]", root);
      gsap.set(layers.slice(1), { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(items.slice(1), { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${stages.length * 70}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(root.querySelector("[data-meter]"), { scaleX: 1 / stages.length }, { scaleX: 1, ease: "none", duration: stages.length - 1 }, 0);
      stages.forEach((_, i) => {
        if (!i) return;
        tl.to(layers[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, i - 0.7)
          .fromTo(layers[i], { scale: 1.04 }, { scale: 1, duration: 0.7 }, i - 0.7)
          .to(layers[i - 1], { scale: 0.96, opacity: 0.4, duration: 0.7 }, i - 0.7)
          .to(items[i - 1], { "--on": 0.35, duration: 0.2 }, i - 0.5)
          .to(items[i], { "--on": 1, duration: 0.2 }, i - 0.4);
      });
      tl.to({}, { duration: 0.4 });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-journey">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="ux-journey" />
        <ol className={styles.list}>
          {stages.map((s) => (
            <li key={s.name} className={styles.item} data-item>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <div className={styles.mobileView} aria-hidden="true"><View view={s.view} /></div>
            </li>
          ))}
        </ol>
        <div className={styles.meter} aria-hidden="true"><span>Rough</span><i><b data-meter /></i><span>Polished</span></div>
      </div>
      <div className={styles.frame} aria-hidden="true">
        {stages.map((s) => <div key={s.name} className={styles.layer} data-layer><View view={s.view} /></div>)}
      </div>
    </section>
  );
}
