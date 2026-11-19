"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceShowcase.module.css";

const STEP_MS = 5200;
const EASE = [0.16, 1, 0.3, 1];

/**
 * The work, on a turntable: the service's portfolio sites stand in a ring in 3D space, reflected on
 * the floor. No holding the page: while the section is in view the ring turns to the next project
 * every few seconds, and choosing a project turns it to the front (and stops the tour). Its name,
 * platform and story change beside it; the ring leans toward the cursor. Phones: one after another.
 */
export default function ServiceShowcase({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const { ready } = useSiteMotion();
  const n = data.projects.length;
  const step = 360 / n;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => clearTimeout(t);
  }, [auto, inView, active, n]);
  // Turn the ring the short way round to the active project
  const angle = useRef(0);
  useEffect(() => {
    const ring = ref.current.querySelector("[data-ring]");
    let target = -active * step;
    const d = ((target - angle.current) % 360 + 540) % 360 - 180;
    angle.current += d;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.set(ring, { rotationY: angle.current });
    else gsap.to(ring, { rotationY: angle.current, duration: 1.4, ease: "expo.inOut", overwrite: true });
  }, [active, step]);
  const pick = (i) => { setAuto(false); if (i !== active) { setActive(i); sfx("tick"); } };

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
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
      <div className={styles.pin}>
        <SectionHead kicker={data.kicker} title={data.title} id="showcase-title" />

        <div className={styles.stage}>
          <div className={styles.info}>
            <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}>
              {cur.logo && <span className={styles.logo}><Image src={cur.logo} alt={`${cur.name} logo`} height={34} style={{ width: "auto" }} /></span>}
              <h3 className={styles.name}>{cur.name}</h3>
              <p className={styles.platform}>{cur.platform}</p>
              <p className={styles.text}>{cur.text}</p>
            </motion.div>
            <ul className={styles.dots} aria-label="Projects">
              {data.projects.map((p, i) => (
                <li key={p.name}>
                  <button type="button" className={i === active ? styles.dotOn : undefined} aria-pressed={i === active} onClick={() => pick(i)}>
                    {p.name}
                    {i === active && auto && inView && <b key={active} className={styles.timer} style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.space} aria-hidden="true" onClick={() => pick((active + 1) % n)}>
            <div className={styles.tilt} data-tilt>
              <div className={styles.ring} data-ring style={{ "--n": n }}>
                {data.projects.map((p, i) => (
                  <figure key={p.name} className={`${styles.panel} ${i === active ? styles.panelOn : ""}`} style={{ "--a": `${i * step}deg` }}>
                    <Image src={p.image} alt="" fill sizes="36vw" loading="lazy" />
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
              <figure className={styles.mimg} data-mimg aria-hidden="true"><Image src={p.image} alt="" fill sizes="90vw" loading="lazy" /></figure>
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
