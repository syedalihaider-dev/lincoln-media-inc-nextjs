"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { Ui } from "../ui/Frames";
import { useScene, PIN, SMALL, MOTION } from "../shared";
import styles from "./Hero.module.css";

// The control room's layers: which interface, where it sits, and how far it travels in depth
const LAYERS = [
  { kind: "analytics", cls: "analytics", z: -320, spread: [-120, -60] },
  { kind: "ads", cls: "ads", z: -180, spread: [140, -90] },
  { kind: "landing", cls: "landing", z: 0, spread: [0, 0] },
  { kind: "serp", cls: "serp", z: 120, spread: [-170, 70] },
  { kind: "post", cls: "post", z: 240, spread: [190, 60] },
];

/**
 * The opening: a digital marketing control room. Five real interfaces from one campaign — the
 * analytics, the ads manager, the landing page, the search result and the social post — stand in
 * one 3D space. As you scroll (desktop: the scene holds) the camera swings round, the layers pull
 * apart in depth at different speeds, the booking confirmation floats forward and the headline
 * drifts back — until the landing page fills the view and the story begins.
 */
export default function Hero({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const layers = gsap.utils.toArray("[data-layer]", root);

    mm.add(MOTION, () => {
      gsap.timeline({ delay: 0.1 })
        .from(root.querySelectorAll("[data-line]"), { yPercent: 112, duration: 1.4, ease: "expo.out", stagger: 0.12 })
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.4)
        .from(q("[data-rig]"), { rotationX: 40, rotationY: -50, z: -600, opacity: 0, duration: 2.2, ease: "expo.out" }, 0)
        .from(layers, { z: (i) => -400 - i * 120, opacity: 0, duration: 1.8, ease: "expo.out", stagger: 0.09 }, 0.2)
        .from(q("[data-toast]"), { y: 30, scale: 0.9, opacity: 0, duration: 1.2 }, 1.2);
    });

    const camera = (st, far = 1) => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
      tl.to(q("[data-rig]"), { rotationY: 14, rotationX: 6, duration: 1 }, 0)
        .to(q("[data-glow]"), { xPercent: -30, scale: 1.4, duration: 1 }, 0)
        .to(q("[data-floor]"), { rotationX: 78, opacity: 0.35, duration: 1 }, 0);
      layers.forEach((l, i) => {
        const L = LAYERS[i];
        tl.to(l, { x: L.spread[0] * far, y: L.spread[1] * far, z: L.z * 1.8 * far, duration: 1 }, 0);
      });
      tl.to(q("[data-toast]"), { z: 380 * far, y: -60, duration: 1 }, 0);
      return tl;
    };

    mm.add(PIN, () => {
      const tl = camera({ trigger: root, start: "top top", end: "+=160%", pin: true, scrub: 0.9, anticipatePin: 1 });
      tl.to(q("[data-copy]"), { x: -80, y: -40, opacity: 0, filter: "blur(6px)", duration: 0.35 }, 0.45)
        .to(q("[data-cue]"), { opacity: 0, duration: 0.1 }, 0)
        // the landing page comes forward to meet the viewer — the hand-off into the next chapter
        .to(layers[2], { z: 520, duration: 0.4 }, 0.6)
        .to(layers.filter((_, i) => i !== 2), { opacity: 0, duration: 0.25 }, 0.72)
        .to(q("[data-toast]"), { opacity: 0, duration: 0.2 }, 0.75)
        .to(q("[data-veil]"), { opacity: 1, duration: 0.2 }, 0.82);
    });
    mm.add(SMALL, () => {
      camera({ trigger: q("[data-stage]"), start: "top 75%", end: "bottom top", scrub: 0.6 }, 0.45);
    });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="dm-title">
      <span className={styles.glow} data-glow aria-hidden="true" />

      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><span aria-current="page">{data.kicker}</span></li>
          </ol>
        </nav>
        <h1 id="dm-title" className={styles.title}>
          <span className={styles.mask}><span data-line>{data.title[0]}</span></span>
          <span className={styles.mask}><span data-line className={styles.l2}>{data.title[1]}</span></span>
        </h1>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <ul className={styles.pillars} data-rise aria-label="What every campaign combines">
          {data.pillars.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <span className={styles.floor} data-floor />
        <div className={styles.rig} data-rig>
          {LAYERS.map((l) => (
            <div key={l.kind} className={`${styles.layer} ${styles[l.cls]}`} style={{ transform: `translateZ(${l.z}px)` }} data-layer>
              <Ui kind={l.kind} screen={l.kind === "landing" ? { priority: true } : undefined} />
            </div>
          ))}
          <div className={styles.toast} data-toast>
            <span className={styles.toastTick}>✓</span>
            <span><b>New booking</b><small>Park View King · from Search</small></span>
          </div>
        </div>
      </div>

      <span className={styles.veil} data-veil aria-hidden="true" />
      <p className={styles.cue} data-cue aria-hidden="true"><i />Scroll into the campaign</p>
    </section>
  );
}
