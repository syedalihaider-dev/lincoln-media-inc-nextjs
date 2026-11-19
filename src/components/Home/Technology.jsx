"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useReducedMotion } from "@/lib/motion";
import { STACK } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import styles from "./Technology.module.css";

// three.js + React Three Fiber load only when this chapter approaches the viewport
const TechNetwork = dynamic(() => import("./TechNetwork"), { ssr: false, loading: () => null });

const ALL = STACK.flatMap((g) => g.items);

/**
 * Chapter 07 — The stack, as a living network (real-time 3D): every technology is a node wired to its
 * group's hub, every hub wired to a core, data pulses running along the spokes. Scroll turns it, the
 * pointer tilts it, and hovering a group swings that cluster round to face you with its names lit.
 */
export default function Technology() {
  const ref = useRef(null);
  const sculpture = useRef({ progress: 0, focus: -1, px: 0, py: 0 });
  const labels = useRef(null);
  const [mount, setMount] = useState(false);
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(-1);
  const reduced = useReducedMotion();
  const { ready } = useSiteMotion();

  // Mount the 3D scene shortly before it's needed; render frames only while it's on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setMount(true);
    }, { rootMargin: "300px 0px" });
    io.observe(ref.current);
    const move = (e) => { sculpture.current.px = e.clientX / innerWidth - 0.5; sculpture.current.py = e.clientY / innerHeight - 0.5; };
    addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); removeEventListener("pointermove", move); };
  }, []);

  useEffect(() => { sculpture.current.focus = focus; }, [focus]);

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.to(sculpture.current, { progress: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-row='a']"), { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-row='b']"), { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q("[data-stage]"), { scale: 0.7, opacity: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 15%", scrub: true } });
      // Children, not the groups: the groups own a CSS opacity transition (hover dimming)
      gsap.from(q("[data-group] > *"), { y: 40, opacity: 0, stagger: 0.05, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: q("[data-groups]")[0], start: "top 85%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const frameloop = reduced ? "demand" : visible ? "always" : "never";

  return (
    <section ref={ref} id="technology" className={styles.section} data-chapter="Technology" data-nav="services" aria-labelledby="tech-title">
      <div className={styles.rows} aria-hidden="true">
        <p className={styles.row} data-row="a">{[...ALL, ...ALL].slice(0, 22).join(" · ")}</p>
        <p className={`${styles.row} ${styles.outline}`} data-row="b">{[...ALL].reverse().concat(ALL).slice(0, 22).join(" · ")}</p>
      </div>

      <div className={styles.stage}>
        <div className={styles.stageInner} data-stage>
          <div className={styles.halo} aria-hidden="true" />
          {mount && <TechNetwork state={sculpture} labels={labels} frameloop={frameloop} />}
          {mount && (
            <div className={styles.labels} ref={labels} aria-hidden="true">
              {STACK.map((g, gi) => (
                <span key={g.group} data-g={gi} className={`${styles.hubLabel} ${focus === gi ? styles.hubOn : ""}`}>
                  {String(gi + 1).padStart(2, "0")} {g.group}
                </span>
              ))}
              {focus > -1 && STACK[focus].items.map((t, ii) => (
                <span key={t} data-g={focus} data-i={ii} className={styles.nodeLabel}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <header className={styles.head}>
        <SectionLabel index="07">Technology</SectionLabel>
        <RevealText id="tech-title" className={styles.title}>
          The stack <em>behind the work.</em>
        </RevealText>
        <p className={styles.sub}>Platforms, frameworks and clouds we build on every day — chosen for the problem, never for the trend.</p>
      </header>

      <div className={styles.groups} data-groups onPointerLeave={() => setFocus(-1)}>
        {STACK.map((g, i) => (
          <div
            key={g.group}
            className={`${styles.group} ${focus > -1 && focus !== i ? styles.dim : ""} ${focus === i ? styles.focus : ""}`}
            data-group
            onPointerEnter={() => setFocus(i)}
          >
            <h3 className={styles.gName}><span>0{i + 1}</span>{g.group}</h3>
            <ul>
              {g.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
