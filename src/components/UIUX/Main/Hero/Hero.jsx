"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { OnDevice } from "@/components/DesignKit/Devices";
import Canvas from "@/components/DesignKit/Canvas";
import Site from "@/components/DesignKit/Site";
import { useScene, PIN, SMALL, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Hero.module.css";

// The fan: each screen's place in it (rotationY, depth) and where it travels as the fan opens
const FAN = [
  { k: "dash", ry: 34, z: -260, out: [-34, -6] },
  { k: "tool", ry: 18, z: -120, out: [-18, 4] },
  { k: "home", ry: 0, z: 0, out: [0, 0] },
  { k: "list", ry: -18, z: -120, out: [18, 4] },
  { k: "phone", ry: -30, z: 80, out: [34, -2] },
];

/**
 * A design studio's wall of work, in depth. Five screens from one product — the dashboard, the
 * design file, the home page, a listing and the phone app — stand in a curved fan. As you scroll
 * (held on desktop) the fan opens: screens turn to face you and pull apart in depth, the phone comes
 * forward, the two words of the title slide in opposite directions and the light moves behind.
 */
export default function Hero({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const cards = gsap.utils.toArray("[data-card]", root);
    mm.add(MOTION, () => {
      gsap.timeline({ delay: 0.1 })
        .from(root.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.12 })
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.4)
        .from(cards, { rotationY: (i) => FAN[i].ry * 2.2, z: -700, opacity: 0, duration: 1.8, ease: "expo.out", stagger: 0.08 }, 0.15);
    });
    const open = (st, k = 1) => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
      cards.forEach((c, i) => tl.to(c, { rotationY: FAN[i].ry * 0.25, xPercent: FAN[i].out[0] * k, yPercent: FAN[i].out[1] * k, z: FAN[i].z * 1.8 * k, duration: 1 }, 0));
      tl.to(q("[data-rig]"), { rotationX: 2, y: k * -30, duration: 1 }, 0)
        .to(q("[data-w1]"), { xPercent: -10 * k, duration: 1 }, 0)
        .to(q("[data-w2]"), { xPercent: 12 * k, duration: 1 }, 0)
        .to(q("[data-glow]"), { xPercent: 40, yPercent: -10, scale: 1.3, duration: 1 }, 0);
      return tl;
    };
    mm.add(PIN, () => {
      open({ trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 0.9, anticipatePin: 1 })
        .to(q("[data-copy]"), { opacity: 0, y: -40, duration: 0.3 }, 0.7);
    });
    mm.add(SMALL, () => { open({ trigger: q("[data-stage]"), start: "top 80%", end: "bottom top", scrub: 0.6 }, 0.4); });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="ux-title">
      <span className={styles.glow} data-glow aria-hidden="true" />
      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li><span aria-current="page">{data.kicker}</span></li></ol>
        </nav>
        <h1 id="ux-title" className={styles.title}>
          <span className={styles.mask}><span data-word data-w1>{data.title[0]}</span></span>{" "}
          <span className={styles.mask}><span data-word data-w2 className={styles.w2}>{data.title[1]}</span></span>
        </h1>
        <div className={styles.side}>
          <p className={styles.lead} data-rise>{data.lead}</p>
          <ol className={styles.flow} data-rise aria-label="How we work">{data.stages.map((s) => <li key={s}>{s}</li>)}</ol>
          <div className={styles.actions} data-rise>
            <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
            <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
          </div>
        </div>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.rig} data-rig>
          {FAN.map((f) => (
            <div key={f.k} className={`${styles.card} ${styles[f.k]}`} style={{ transform: `translateZ(${f.z}px) rotateY(${f.ry}deg)` }} data-card>
              {f.k === "dash" && <OnDevice page="dashboard" />}
              {f.k === "tool" && <Canvas frame="Listing — Desktop" select={{ left: 3.7, top: 46, width: 55, height: 40, label: "Details" }}><Site page="listing" /></Canvas>}
              {f.k === "home" && <OnDevice page="home" />}
              {f.k === "list" && <OnDevice page="landing" />}
              {f.k === "phone" && <OnDevice device="phone" page="listing" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
