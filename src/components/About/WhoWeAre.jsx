"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { ABOUT_EXPERTISE, ABOUT_WHO } from "@/data/about";
import RevealText from "@/components/Common/RevealText";
import Label from "./Label";
import styles from "./WhoWeAre.module.css";

const ASSEMBLE = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const STACKED = "(max-width: 1100px) and (prefers-reduced-motion: no-preference)";

/**
 * Who we are: the nine areas of expertise from the studio's About page, as a mosaic built in 3D.
 * On desktop the section holds while the nine pictures fly in from scattered depths and settle into
 * one plane; then it leans toward the cursor, and pointing at an area lifts it toward you in full
 * colour while the rest fall back. Tablet and phone: the mosaic opens tile by tile.
 */
export default function WhoWeAre() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const tiles = gsap.utils.toArray("[data-tile]", root);
    const mm = gsap.matchMedia();

    mm.add(ASSEMBLE, () => {
      const plane = root.querySelector("[data-plane]");
      const r = gsap.utils.random;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top top", end: "+=140%", pin: true, scrub: 0.9, anticipatePin: 1 },
      });
      tl.fromTo(plane, { rotationX: 22, rotationY: -26, z: -200 }, { rotationX: 0, rotationY: 0, z: 0, duration: 1, ease: "power2.out" }, 0)
        .fromTo(tiles, {
          x: () => r(-260, 260), y: () => r(-200, 200), z: () => r(-900, 380),
          rotationX: () => r(-50, 50), rotationY: () => r(-60, 60), opacity: 0.15,
        }, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: { each: 0.05, from: "random" } }, 0)
        .fromTo(root.querySelectorAll("[data-name]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, stagger: 0.04, ease: "power2.out" }, 0.75)
        .to({}, { duration: 0.25 });

      // Once settled, the plane leans toward the cursor
      const rx = gsap.quickTo(plane, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(plane, "rotationY", { duration: 1, ease: "power3.out" });
      const move = (e) => {
        if (tl.scrollTrigger.progress < 0.85) return;
        const b = plane.getBoundingClientRect();
        ry(((e.clientX - b.left) / b.width - 0.5) * 10);
        rx(-((e.clientY - b.top) / b.height - 0.5) * 8);
      };
      const leave = () => { if (tl.scrollTrigger.progress >= 0.85) { rx(0); ry(0); } };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);
      return () => { root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave); };
    });

    mm.add(STACKED, () => {
      tiles.forEach((t, i) => {
        gsap.fromTo(t, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out", delay: (i % 2) * 0.08, scrollTrigger: { trigger: t, start: "top 92%", once: true } });
        gsap.fromTo(t.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "expo.out", delay: (i % 2) * 0.08, scrollTrigger: { trigger: t, start: "top 92%", once: true } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="who-we-are" className={styles.who} aria-labelledby="who-title">
      <div className={styles.pin} data-pin>
        <header className={styles.head}>
          <Label>Who we are</Label>
          <RevealText id="who-title" className={styles.title}>{ABOUT_WHO.title}</RevealText>
          <ul className={styles.names}>
            {ABOUT_EXPERTISE.map((a) => <li key={a.name}>{a.name}</li>)}
          </ul>
        </header>

        <div className={styles.space} aria-hidden="true">
          <div className={styles.plane} data-plane>
            {ABOUT_EXPERTISE.map((a, i) => (
              <div key={a.name} className={`${styles.tile} ${styles[`t${i}`]}`} data-tile>
                <div className={styles.lift}>
                  <Image src={a.image} alt="" fill sizes="(min-width: 1101px) 20vw, 50vw" />
                  <span className={styles.name} data-name>{a.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
