"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { ABOUT_MISSION } from "@/data/about";
import Label from "./Label";
import styles from "./MissionVision.module.css";

const words = (t) => t.split(" ").map((w, i) => <span key={i} data-vw>{w} </span>);

/**
 * 04 — Mission & Vision, as a split screen that turns over. Mission stands in ink beside the
 * towers; as you scroll, Vision wipes across from the right in deep signal teal behind a lit edge,
 * its words lighting one by one, while a set of lens rings turns with the scroll and leans to the cursor.
 */
export default function MissionVision() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top top", end: "+=170%", pin: true, scrub: 0.7, anticipatePin: 1 },
      });
      tl.fromTo(root.querySelector("[data-mimg]"), { scale: 1.25 }, { scale: 1, duration: 1, ease: "none" }, 0)
        .fromTo(root.querySelector("[data-vision]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, 0.55)
        .fromTo(root.querySelector("[data-edge]"), { left: "100%" }, { left: "0%", duration: 1, ease: "power2.inOut" }, 0.55)
        .to(root.querySelector("[data-mission]"), { xPercent: -18, opacity: 0.25, duration: 1, ease: "power2.inOut" }, 0.55)
        .fromTo(root.querySelectorAll("[data-vw]"), { color: "rgba(238, 241, 247, 0.16)" }, { color: "#eef1f7", stagger: 0.06, duration: 0.3, ease: "none" }, 1.3)
        .fromTo(root.querySelector("[data-rings]"), { rotate: -40, scale: 0.7 }, { rotate: 50, scale: 1, duration: 2.2, ease: "none" }, 0.55);

      // The rings lean toward the cursor
      const rings = root.querySelector("[data-rings-tilt]");
      const rx = gsap.quickTo(rings, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(rings, "rotationY", { duration: 1, ease: "power3.out" });
      gsap.set(rings, { transformPerspective: 900 });
      const move = (e) => { ry((e.clientX / innerWidth - 0.5) * 36); rx(-(e.clientY / innerHeight - 0.5) * 30); };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });

    // Phones: the two panels in turn, each opening as it arrives
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-panel]", root).forEach((p) => {
        gsap.fromTo(p, { clipPath: "inset(12% 0% 12% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: p, start: "top 95%", end: "top 45%", scrub: 0.6 } });
      });
      gsap.fromTo(root.querySelectorAll("[data-vw]"), { color: "rgba(238, 241, 247, 0.16)" }, { color: "#eef1f7", stagger: 0.05, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-vision]"), start: "top 70%", end: "bottom 70%", scrub: 0.6 } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="mission" className={styles.mv} aria-labelledby="mv-title">
      <h2 id="mv-title" className="lm-sr-only">Mission and vision</h2>
      <div className={styles.pin} data-pin>
        {/* Mission */}
        <div className={styles.mission} data-panel>
          <div className={styles.mCopy} data-mission>
            <Label>Mission</Label>
            <p className={styles.giant} aria-hidden="true">Mission</p>
            <h3 className={styles.statement}>{ABOUT_MISSION.mission}</h3>
          </div>
          <figure className={styles.mFig}>
            <div className={styles.mImg} data-mimg>
              <Image src={ABOUT_MISSION.missionImage} alt="Glass towers rising over the street, seen from below" fill sizes="(min-width: 901px) 42vw, 100vw" />
            </div>
            <figcaption>New York</figcaption>
          </figure>
        </div>

        {/* Vision */}
        <div className={styles.vision} data-vision data-panel>
          <div className={styles.vCopy}>
            <p className={styles.vLabel}>Vision</p>
            <p className={styles.giant} aria-hidden="true">Vision</p>
            <h3 className={styles.vStatement}>{words(ABOUT_MISSION.vision)}</h3>
          </div>
          <div className={styles.rings} data-rings-tilt aria-hidden="true">
            <svg viewBox="0 0 400 400" data-rings>
              <circle cx="200" cy="200" r="190" className={styles.r1} />
              <circle cx="200" cy="200" r="150" className={styles.r2} />
              <circle cx="200" cy="200" r="110" className={styles.r3} />
              <circle cx="200" cy="200" r="70" className={styles.r4} />
              <circle cx="200" cy="200" r="8" className={styles.core} />
              <path d="M200 0v60M200 340v60M0 200h60M340 200h60" className={styles.ticks} />
            </svg>
          </div>
        </div>
        <span className={styles.edge} data-edge aria-hidden="true" />
      </div>
    </section>
  );
}
