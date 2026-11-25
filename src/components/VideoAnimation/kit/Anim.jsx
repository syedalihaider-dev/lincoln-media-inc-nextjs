"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Anim.module.css";

/**
 * Live animation pieces, made in the page rather than recorded: each is a GSAP timeline that loops
 * while the piece is on screen and stops off-screen. Reduced-motion visitors see the held frame
 * (the timeline's "hold" label). Every piece scales with its box (container units).
 */
function useLoop(build) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    const ctx = gsap.context(() => {
      const tl = build(root, (s) => root.querySelectorAll(s));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { tl.pause(tl.labels.hold ?? tl.duration()); return; }
      tl.pause();
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.2 });
      io.observe(root);
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
  }, [build]);
  return ref;
}

/* Kinetic typography — four words, four different entrances, cut to an imagined voice */
const kinetic = (root, q) => {
  const w = q("[data-w]");
  return gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "expo.out" } })
    .set(w, { autoAlpha: 0 })
    .fromTo(w[0], { autoAlpha: 1, yPercent: -120, scale: 1.4 }, { yPercent: 0, scale: 1, duration: 0.7 })
    .fromTo(w[1], { autoAlpha: 1, xPercent: 60, skewX: -12 }, { xPercent: 0, skewX: 0, duration: 0.7 }, "+=0.15")
    .to([w[0], w[1]], { yPercent: -60, autoAlpha: 0.25, duration: 0.6, ease: "power3.inOut" }, "+=0.5")
    .fromTo(w[2], { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)", yPercent: 40 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.7 }, "<0.2")
    .fromTo(w[3], { autoAlpha: 1, scale: 3.2, rotate: -6 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" }, "+=0.2")
    .addLabel("hold")
    .to(w, { autoAlpha: 0, yPercent: "-=20", duration: 0.45, stagger: 0.05, ease: "power2.in" }, "+=1.1");
};
export function Kinetic({ words }) {
  const ref = useLoop(kinetic);
  return (
    <div ref={ref} className={`${styles.stage} ${styles.kin}`} aria-label={words.join(" ")} role="img">
      <span className={styles.kLine}><span className={styles.kA} data-w>{words[0]}</span><span className={styles.kB} data-w>{words[1]}</span></span>
      <span className={styles.kLine}><span className={styles.kC} data-w>{words[2]}</span><span className={styles.kD} data-w>{words[3]}</span></span>
    </div>
  );
}

/* Squash & stretch — a ball crossing the frame in three bounces, with onion-skin spacing marks */
// onion-skin marks along the path (closer together near each apex, where the ball slows)
const ARC = [[6, 18], [14, 40], [21, 70], [28, 100], [34, 70], [39, 59], [44, 56], [49, 59], [54, 70], [60, 100], [66, 82], [72, 79], [78, 82], [84, 100], [94, 100]];
// [x%, y%, seconds]: falls ease in (gravity), rises ease out; each landing squashes, each fall stretches
const PATH = [[28, 100, 0.55], [44, 56, 0.4], [60, 100, 0.4], [72, 79, 0.26], [84, 100, 0.26]];
const bounce = (root, q) => {
  const ball = q("[data-ball]")[0];
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).set(ball, { left: "6%", top: "18%", scaleX: 1, scaleY: 1, autoAlpha: 1 });
  PATH.forEach(([x, y, d]) => {
    const falling = y === 100;
    tl.to(ball, { left: `${x}%`, duration: d, ease: "none" })
      .to(ball, { top: `${y}%`, duration: d, ease: falling ? "power2.in" : "power2.out" }, "<")
      .to(ball, { scaleY: falling ? 1.16 : 1, scaleX: falling ? 0.88 : 1, duration: d, ease: "power1.in" }, "<");
    if (falling) tl.to(ball, { scaleY: 0.6, scaleX: 1.42, duration: 0.07, ease: "power1.out" }).to(ball, { scaleY: 1, scaleX: 1, duration: 0.14, ease: "power2.out" });
  });
  return tl.to(ball, { left: "94%", duration: 0.6, ease: "power2.out" }).addLabel("hold").to(ball, { autoAlpha: 0, duration: 0.3 }, "+=0.6");
};
export function Bounce() {
  const ref = useLoop(bounce);
  return (
    <div ref={ref} className={`${styles.stage} ${styles.bounce}`} role="img" aria-label="A ball bouncing across the frame, squashing on each landing">
      <div className={styles.field}>
        {ARC.map(([x, y], i) => <i key={i} className={styles.ghost} style={{ left: `${x}%`, top: `${y}%` }} />)}
        <span className={styles.ball} data-ball />
      </div>
      <span className={styles.floor} />
    </div>
  );
}

/* Lower third — the name strap as it lands over footage */
const lower = (root, q) => gsap.timeline({ repeat: -1, repeatDelay: 0.6, defaults: { ease: "expo.out" } })
  .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" })
  .fromTo(q("[data-l1]"), { yPercent: 110 }, { yPercent: 0, duration: 0.8 }, "-=0.35")
  .fromTo(q("[data-l2]"), { xPercent: -8, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8 }, "-=0.55")
  .addLabel("hold")
  .to(q("[data-l1], [data-l2]"), { yPercent: -110, duration: 0.5, ease: "power3.in" }, "+=1.8")
  .to(q("[data-bar]"), { scaleX: 0, transformOrigin: "right", duration: 0.6, ease: "expo.inOut" }, "-=0.2")
  .set(q("[data-bar]"), { transformOrigin: "left" });
export function LowerThird({ lines, image, alt = "" }) {
  const ref = useLoop(lower);
  return (
    <div ref={ref} className={`${styles.stage} ${styles.lower}`}>
      {image && <img src={image.src} alt={alt} className={styles.bg} loading="lazy" decoding="async" />}
      <div className={styles.strap}>
        <span className={styles.bar} data-bar />
        <span className={styles.mask}><span className={styles.l1} data-l1>{lines[0]}</span></span>
        <span className={styles.l2} data-l2>{lines[1]}</span>
      </div>
    </div>
  );
}

/* Product animation — an interface demo: three tasks ticked, then the confirmation */
const product = (root, q) => {
  const rows = q("[data-row]"), tap = q("[data-tap]")[0];
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, defaults: { ease: "expo.out" } })
    .set(rows, { opacity: 1 }).set(q("[data-tick]"), { scale: 0 }).set(q("[data-strike]"), { scaleX: 0 }).set(q("[data-toast]"), { yPercent: 140, autoAlpha: 0 })
    .from(rows, { x: 30, opacity: 0, stagger: 0.12, duration: 0.7 });
  rows.forEach((r, i) => {
    tl.to(tap, { top: `${r.offsetTop + r.offsetHeight / 2}px`, autoAlpha: 1, duration: 0.45, ease: "power3.inOut" }, i ? "+=0.25" : "+=0.4")
      .fromTo(tap, { scale: 1 }, { scale: 0.7, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" })
      .to(r.querySelector("[data-tick]"), { scale: 1, duration: 0.5, ease: "back.out(2.4)" }, "-=0.1")
      .to(r.querySelector("[data-strike]"), { scaleX: 1, duration: 0.5, ease: "expo.inOut" }, "<");
  });
  return tl.to(tap, { autoAlpha: 0, duration: 0.3 })
    .to(q("[data-toast]"), { yPercent: 0, autoAlpha: 1, duration: 0.8 }, "-=0.1")
    .addLabel("hold")
    .to(rows, { opacity: 0.4, duration: 0.4 }, "+=1.4");
};
export function Product({ app }) {
  const ref = useLoop(product);
  return (
    <div className={`${styles.stage} ${styles.product}`}>
      <div ref={ref} className={styles.phone} role="img" aria-label={`An app screen: ${app.items.join(", ")} — ${app.done}`}>
        <p className={styles.appTitle}>{app.title}</p>
        <ul className={styles.rows}>
          {app.items.map((t) => (
            <li key={t} className={styles.row} data-row>
              <span className={styles.box}><i data-tick /></span>
              <span className={styles.task}>{t}<i data-strike /></span>
            </li>
          ))}
        </ul>
        <span className={styles.tap} data-tap />
        <p className={styles.toast} data-toast><i aria-hidden="true" />{app.done}</p>
      </div>
    </div>
  );
}
