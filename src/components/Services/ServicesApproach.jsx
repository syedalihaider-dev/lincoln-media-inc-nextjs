"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import imgStudio from "@public/images/about/concept-strategy.webp";
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgGlow from "@public/images/home/laptop-glow.jpg";
import styles from "./ServicesApproach.module.css";

// (live) the studio's own positioning line, with the phrases it leans on marked
const STATEMENT = ["Scalable", "web", "and", "mobile", "solutions", "coupled", "with", "digital", "marketing", "services", "—", "under", "one", "roof."];
const LIT = new Set(["web", "mobile", "digital", "marketing", "under", "one", "roof."]);

// How the studio works, in its own words (repo philosophy and CTA copy; live FAQ)
const PILLARS = [
  { title: "One team. Zero hand-offs.", text: "Creativity, technology and strategy — in one studio, on one project." },
  { title: "A plan, a team and a timeline.", text: "Tell us what you're building. We'll come back with a plan, a team and a timeline." },
  { title: "Every step of the way.", text: "We involve you every step of the way and work in an agile way, so you see the work as it takes shape." },
];

/**
 * Our approach: an editorial chapter. The studio's positioning set large, its words lighting as
 * you read; a collage of three photographs at different depths opening through masks and drifting
 * apart; and the three principles of how it works, joined by a line that draws itself down the page.
 */
export default function ServicesApproach() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-w]"), { color: "rgba(238, 241, 247, 0.14)" }, {
        color: (i, el) => (el.dataset.lit ? "#36e4d0" : "#eef1f7"), ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: root.querySelector("[data-statement]"), start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      });
      // The collage: each picture opens from a different side, then drifts at its own depth
      const figs = gsap.utils.toArray("[data-fig]", root);
      const from = ["inset(100% 0% 0% 0%)", "inset(0% 100% 0% 0%)", "inset(0% 0% 0% 100%)"];
      figs.forEach((f, i) => {
        gsap.fromTo(f, { clipPath: from[i] }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 45%", scrub: 0.6 } });
        gsap.fromTo(f, { yPercent: 12 * (i + 1) }, { yPercent: -12 * (i + 1), ease: "none", scrollTrigger: { trigger: root.querySelector("[data-collage]"), start: "top bottom", end: "bottom top", scrub: true } });
      });
      // The principles: the line draws as you read, each node lights as it is reached
      gsap.fromTo(root.querySelector("[data-line]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pillars]"), start: "top 70%", end: "bottom 60%", scrub: 0.5 } });
      gsap.utils.toArray("[data-pillar]", root).forEach((p) => {
        gsap.fromTo(p.querySelectorAll("[data-pt]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: p, start: "top 72%", once: true, onEnter: () => p.classList.add(styles.lit) } });
      });
    });
    mm.add(DESKTOP_MOTION, () => {
      const c = root.querySelector("[data-collage]");
      const rx = gsap.quickTo(c, "rotationX", { duration: 1.2, ease: "power3.out" });
      const ry = gsap.quickTo(c, "rotationY", { duration: 1.2, ease: "power3.out" });
      const move = (e) => { const b = c.getBoundingClientRect(); ry(((e.clientX - b.left) / b.width - 0.5) * 10); rx(-((e.clientY - b.top) / b.height - 0.5) * 8); };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="approach" className={styles.approach} aria-labelledby="approach-title">
      <header className={styles.head}>
        <Label>Our approach</Label>
        <h2 id="approach-title" className={styles.statement} data-statement>
          {STATEMENT.map((w, i) => <span key={i} data-w data-lit={LIT.has(w) ? "1" : undefined}>{w} </span>)}
        </h2>
      </header>

      <div className={styles.body}>
        <div className={styles.collage} data-collage aria-hidden="true">
          <figure className={`${styles.fig} ${styles.f1}`} data-fig><Image src={imgGlow} alt="" fill sizes="(min-width: 901px) 30vw, 70vw" /></figure>
          <figure className={`${styles.fig} ${styles.f2}`} data-fig><Image src={imgUx} alt="" fill sizes="(min-width: 901px) 26vw, 60vw" /></figure>
          <figure className={`${styles.fig} ${styles.f3}`} data-fig><Image src={imgStudio} alt="" fill sizes="(min-width: 901px) 32vw, 80vw" /></figure>
          <span className={styles.ring} />
        </div>

        <div className={styles.pillars} data-pillars>
          <span className={styles.track} aria-hidden="true"><i data-line /></span>
          <ol className={styles.plist}>
          {PILLARS.map((p) => (
            <li key={p.title} className={styles.pillar} data-pillar>
              <span className={styles.node} aria-hidden="true" />
              <h3 className={styles.pTitle} data-pt>{p.title}</h3>
              <p className={styles.pText} data-pt>{p.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
