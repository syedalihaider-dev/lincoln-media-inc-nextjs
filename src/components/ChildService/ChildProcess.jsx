"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Label from "@/components/About/Label";
import styles from "./ChildProcess.module.css";

/**
 * How the service is delivered, as a journey. On desktop the section holds and the stages travel
 * sideways as chapters; each chapter's photograph opens through a mask and settles as it reaches the
 * middle, its name drifts behind it very large and very faint, and the rail along the top fills stage
 * by stage while the room's light shifts. Phones: the chapters stack, each with its photograph.
 */
export default function ChildProcess({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.steps.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const track = root.querySelector("[data-track]");
    const fill = root.querySelector("[data-fill]");
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      let last = 0;
      // measured from the last chapter's edge (the oversized ghost names overflow and would inflate scrollWidth)
      const dist = () => { const end = track.lastElementChild; return Math.max(0, end.offsetLeft + end.offsetWidth - root.querySelector("[data-viewport]").clientWidth); };
      const move = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root, start: "top top", end: () => `+=${dist() * 0.8}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (st) => {
            // the room's glow (a non-inheriting property, so only the section's own background restyles)
            // and the timeline fill — rather than --p on the section, which restyled the whole track per frame
            const v = st.progress.toFixed(3);
            root.style.setProperty("--cp-glow", v);
            fill?.style.setProperty("--p", v);
            const k = Math.min(n - 1, Math.round(st.progress * (n - 1)));
            if (k !== last) { last = k; setActive(k); sfx("tick"); }
          },
        },
      });
      gsap.utils.toArray("[data-chapter]", root).forEach((ch) => {
        const ca = { containerAnimation: move, trigger: ch, scrub: true };
        gsap.fromTo(ch.querySelector("[data-screen]"), { clipPath: "inset(12% 30% 12% 0% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)", ease: "none", scrollTrigger: { ...ca, start: "left 95%", end: "center 60%" } });
        gsap.fromTo(ch.querySelector("[data-screen] img"), { scale: 1.25, xPercent: 6 }, { scale: 1, xPercent: -2, ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left" } });
        gsap.fromTo(ch.querySelector("[data-ghost]"), { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left" } });
        gsap.fromTo(ch.querySelectorAll("[data-copy] > *"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out", scrollTrigger: { ...ca, start: "left 75%", end: "left 35%" } });
      });
      return () => { setActive(0); root.style.removeProperty("--cp-glow"); fill?.style.removeProperty("--p"); };
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-chapter]", root).forEach((ch) => gsap.from(ch, { y: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ch, start: "top 85%", once: true } }));
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-head] > *"), { y: 24, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.head} data-head>
          <Label>{data.kicker}</Label>
          <h2 id="process-title" className={styles.title}>{data.title}</h2>
        </header>

        <div className={styles.railWrap} aria-hidden="true">
          <ol className={styles.rail}>
            {data.steps.map((s, i) => <li key={s.name} className={i <= active ? styles.reached : ""}>{s.name}</li>)}
          </ol>
          <span className={styles.fill} data-fill />
        </div>

        <div className={styles.viewport} data-viewport>
          <ol className={styles.track} data-track>
            {data.steps.map((s, i) => (
              <li key={s.name} className={`${styles.chapter} ${i === active ? styles.on : ""}`} data-chapter>
                <p className={styles.ghost} data-ghost aria-hidden="true">{s.name}</p>
                <div className={styles.copy} data-copy>
                  <span className={styles.stage}>Stage</span>
                  <h3 className={styles.name}>{s.name}</h3>
                  <p className={styles.text}>{s.text}</p>
                </div>
                <div className={styles.screenWrap}>
                  <figure className={`${styles.screen} ${s.fit === "contain" ? styles.contain : ""}`} data-screen>
                    <Image src={s.photo} alt={s.photoAlt} fill sizes="(max-width: 900px) 92vw, 40vw" className={styles.img} />
                  </figure>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
