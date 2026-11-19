"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceShowcase.module.css";

const PIN = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const EASE = [0.16, 1, 0.3, 1];

/**
 * The work, on a turntable: the service's portfolio sites stand in a ring in 3D space, reflected on
 * the floor. On desktop the chapter holds while scrolling turns the ring, bringing each project to
 * the front in turn as its name, platform and story change beside it; the ring leans toward the
 * cursor. Phones: the projects one after another.
 */
export default function ServiceShowcase({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.projects.length;
  const step = 360 / n;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(PIN, () => {
      const ring = root.querySelector("[data-ring]");
      let cur = 0;
      gsap.to(ring, {
        rotationY: -step * (n - 1), ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-pin]"), start: "top top", end: `+=${n * 70}%`, pin: true, scrub: 0.8, anticipatePin: 1,
          onUpdate: (s) => { const i = Math.round(s.progress * (n - 1)); if (i !== cur) { cur = i; setActive(i); sfx("tick"); } },
        },
      });
    });
    mm.add(DESKTOP_MOTION, () => {
      const tilt = root.querySelector("[data-tilt]");
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.1, ease: "power3.out" });
      const move = (e) => rx(-(e.clientY / innerHeight - 0.5) * 10);
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    mm.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-mproj]", root).forEach((p) => {
        gsap.fromTo(p.querySelector("[data-mimg]"), { clipPath: "inset(10% 10% 10% 10%)", scale: 0.92 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", scrollTrigger: { trigger: p, start: "top 92%", end: "top 45%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  const cur = data.projects[active];

  return (
    <section ref={ref} id="showcase" className={styles.showcase} aria-labelledby="showcase-title">
      <div className={styles.pin} data-pin>
        <SectionHead kicker={data.kicker} title={data.title} id="showcase-title" />

        <div className={styles.stage}>
          <div className={styles.info}>
            <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}>
              {cur.logo && <span className={styles.logo}><Image src={cur.logo} alt={`${cur.name} logo`} height={34} style={{ width: "auto" }} /></span>}
              <h3 className={styles.name}>{cur.name}</h3>
              <p className={styles.platform}>{cur.platform}</p>
              <p className={styles.text}>{cur.text}</p>
            </motion.div>
            <ul className={styles.dots} aria-hidden="true">{data.projects.map((p, i) => <li key={p.name} className={i === active ? styles.dotOn : undefined}>{p.name}</li>)}</ul>
          </div>

          <div className={styles.space} aria-hidden="true">
            <div className={styles.tilt} data-tilt>
              <div className={styles.ring} data-ring style={{ "--n": n }}>
                {data.projects.map((p, i) => (
                  <figure key={p.name} className={`${styles.panel} ${i === active ? styles.panelOn : ""}`} style={{ "--a": `${i * step}deg` }}>
                    <Image src={p.image} alt="" fill sizes="36vw" />
                  </figure>
                ))}
              </div>
            </div>
            <span className={styles.floor} />
          </div>
        </div>

        {/* Tablet & phone */}
        <div className={styles.mobile}>
          {data.projects.map((p) => (
            <article key={p.name} className={styles.mproj} data-mproj>
              <figure className={styles.mimg} data-mimg aria-hidden="true"><Image src={p.image} alt="" fill sizes="90vw" /></figure>
              {p.logo && <span className={styles.logo}><Image src={p.logo} alt={`${p.name} logo`} height={30} style={{ width: "auto" }} /></span>}
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.platform}>{p.platform}</p>
              <p className={styles.text}>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
