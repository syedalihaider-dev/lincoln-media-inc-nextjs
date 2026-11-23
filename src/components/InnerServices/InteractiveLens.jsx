"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import MockSite from "./MockSite";
import ScaledScreen from "./ScaledScreen";
import styles from "./InteractiveLens.module.css";

/**
 * Design on the surface, engineering underneath. A finished page fills a large tilted screen; a
 * lens follows the cursor and shows what lies beneath it — the same page as wireframe, with its code
 * running alongside. The screen rises flat as it scrolls in. On touch screens the lens drifts on its
 * own and follows a finger.
 */
export default function InteractiveLens({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const screen = root.querySelector("[data-screen]");
    const lens = { x: 0.62, y: 0.42 };
    const apply = () => { screen.style.setProperty("--lx", `${lens.x * 100}%`); screen.style.setProperty("--ly", `${lens.y * 100}%`); };
    apply();
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-head]"), { type: "words", mask: "words" });
      gsap.from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
      gsap.fromTo(screen, { rotationX: 28, scale: 0.86, y: 60 }, { rotationX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: screen, start: "top bottom", end: "center 60%", scrub: 0.8 } });
      gsap.fromTo(root.querySelectorAll("[data-ghost]"), { yPercent: 20 }, { yPercent: -30, ease: "none", stagger: 0.1, scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });

      // the lens: follows the pointer; with no pointer over it, it wanders on its own
      const tx = gsap.quickTo(lens, "x", { duration: 0.6, ease: "power3.out", onUpdate: apply });
      const ty = gsap.quickTo(lens, "y", { duration: 0.6, ease: "power3.out", onUpdate: apply });
      const wander = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { duration: 2.6, ease: "sine.inOut", onUpdate: apply } })
        .to(lens, { x: 0.25, y: 0.3 }).to(lens, { x: 0.45, y: 0.72 }).to(lens, { x: 0.8, y: 0.55 });
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? wander.play() : wander.pause()));
      io.observe(screen);
      const move = (e) => { wander.pause(); const b = screen.getBoundingClientRect(); tx((e.clientX - b.left) / b.width); ty((e.clientY - b.top) / b.height); };
      const leave = () => wander.play();
      screen.addEventListener("pointermove", move);
      screen.addEventListener("pointerleave", leave);
      return () => { split.revert(); io.disconnect(); wander.kill(); screen.removeEventListener("pointermove", move); screen.removeEventListener("pointerleave", leave); };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="interactive" className={styles.lensSec} aria-labelledby="interactive-title">
      <div className={styles.copy}>
        <Label>{data.kicker}</Label>
        <h2 id="interactive-title" className={styles.title}>
          <span data-head>{data.title[0]}</span>
          <span className={styles.em} data-head>{data.title[1]}</span>
        </h2>
        <p className={styles.text}>{data.text}</p>
      </div>

      <div className={styles.view} aria-hidden="true">
        <span className={`${styles.ghost} ${styles.g1}`} data-ghost />
        <span className={`${styles.ghost} ${styles.g2}`} data-ghost />
        <div className={styles.screen} data-screen>
          <div className={styles.under}>
            <ScaledScreen width={1280}><MockSite variant="wire" url={data.url} /></ScaledScreen>
            <pre className={styles.code}>{data.code.join("\n")}</pre>
          </div>
          <div className={styles.over}>
            <ScaledScreen width={1280}><MockSite image={data.image} url={data.url} sizes="80vw" /></ScaledScreen>
          </div>
          <span className={styles.ring}><em>{data.hint}</em></span>
        </div>
      </div>
    </section>
  );
}
