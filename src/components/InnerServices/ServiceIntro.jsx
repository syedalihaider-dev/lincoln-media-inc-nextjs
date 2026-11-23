"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import RevealText from "@/components/Common/RevealText";
import styles from "./ServiceIntro.module.css";

/**
 * The editorial opening. A statement set very large, its lines sliding in from opposite sides as
 * you scroll — type that moves like a camera pan. Beside it a photograph opens through a diagonal
 * mask while a real project mockup floats over it at a different depth. Then the heading and copy.
 */
export default function ServiceIntro({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const scrub = (el, from, to, trig = {}) => gsap.fromTo(el, from, { ...to, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 0.8, ...trig } });
      gsap.utils.toArray("[data-st]", root).forEach((l, i) => scrub(l, { xPercent: i % 2 ? 18 : -18, opacity: 0.1 }, { xPercent: 0, opacity: 1 }));
      scrub(root.querySelector("[data-photo]"), { clipPath: "polygon(30% 0%, 100% 0%, 100% 40%, 70% 100%, 0% 100%, 0% 60%)", scale: 1.08 }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)", scale: 1 }, { end: "center 60%" });
      gsap.fromTo(root.querySelector("[data-mock]"), { yPercent: 30, rotate: -4 }, { yPercent: -20, rotate: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(root.querySelectorAll("[data-copy] > *"), { y: 30, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-copy]"), start: "top 85%", once: true } });
    });
    // the visual leans toward the cursor
    mm.add(DESKTOP_MOTION, () => {
      const vis = root.querySelector("[data-visual]");
      const rx = gsap.quickTo(vis, "rotationX", { duration: 1, ease: "power3.out" }), ry = gsap.quickTo(vis, "rotationY", { duration: 1, ease: "power3.out" });
      const move = (e) => { const b = vis.getBoundingClientRect(); ry(((e.clientX - b.left) / b.width - 0.5) * 8); rx(-((e.clientY - b.top) / b.height - 0.5) * 6); };
      const leave = () => { rx(0); ry(0); };
      vis.addEventListener("pointermove", move);
      vis.addEventListener("pointerleave", leave);
      return () => { vis.removeEventListener("pointermove", move); vis.removeEventListener("pointerleave", leave); };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="presence" className={styles.intro} aria-labelledby="presence-title">
      <div className={styles.stage}>
        <p className={styles.statement}>
          {data.statement.map((l, i) => <span key={i} className={styles.st} data-st>{l}</span>)}
        </p>

        <div className={styles.visual} data-visual aria-hidden="true">
          <div className={styles.photo} data-photo>
            <Image src={data.image} alt="" fill sizes="(max-width: 900px) 92vw, 46vw" placeholder="blur" className={styles.img} />
            <span className={styles.scan} />
          </div>
          <div className={styles.mock} data-mock>
            <Image src={data.mockup} alt="" sizes="(max-width: 900px) 60vw, 26vw" className={styles.mockImg} />
          </div>
          <p className={styles.chip}><i />Responsive · SEO-friendly · Live</p>
        </div>
      </div>

      <div className={styles.copy} data-copy>
        <Label>{data.kicker}</Label>
        <RevealText id="presence-title" className={styles.title}>{data.title}</RevealText>
        <p className={styles.lead}>{data.lead}</p>
        <div className={styles.paras}>{data.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
      <p className="lm-sr-only">{data.mockupAlt}</p>
    </section>
  );
}
