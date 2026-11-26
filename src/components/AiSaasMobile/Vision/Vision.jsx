"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import { AI_IMAGES } from "@/data/services/aiSaasMobile";
import { Ic } from "../ui/Halden";
import styles from "./Vision.module.css";

/**
 * From model to product. A held spread: the statement's words light one by one as you scroll, while
 * on the right a model's raw JSON resolves, field by field, into the card a dispatcher actually uses
 * — each line of output travels into the piece of interface it becomes.
 */
export default function Vision({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const words = root.querySelectorAll("[data-w]");
    const lines = root.querySelectorAll("[data-raw] li");
    const parts = root.querySelectorAll("[data-part]");
    const build = (tl) => {
      tl.to(words, { opacity: 1, stagger: 0.05, ease: "none", duration: 0.3 }, 0)
        .fromTo(root.querySelector("[data-card]"), { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, 0.6)
        .to(root.querySelector("[data-raw]"), { rotateY: 18, x: "-8%", z: -120, opacity: 0.35, ease: "power1.inOut", duration: 1.6 }, 0.6)
        .fromTo(parts, { clipPath: "inset(0 100% 0 0 round 12px)", opacity: 0.2 }, { clipPath: "inset(0 0% 0 0 round 12px)", opacity: 1, stagger: 0.28, ease: "power2.out", duration: 0.6 }, 0.8)
        .to(lines, { color: "rgba(54,228,208,0.9)", stagger: 0.18, duration: 0.2, ease: "none" }, 0.8)
        .from(root.querySelector("[data-photo]"), { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "power2.inOut" }, 1.6);
      return tl;
    };
    mm.add(PIN, () => {
      build(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 0.8 } }));
    });
    mm.add(SMALL, () => {
      build(gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-stage]"), start: "top 85%", end: "bottom 45%", scrub: 0.8 } }));
    });
  }, []);

  return (
    <section ref={ref} className={styles.vision} aria-labelledby="ai-vision">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="ai-vision" size="md" />
        <p className={styles.words} aria-label={data.words}>
          {data.words.split(" ").map((w, i) => <span key={i} data-w aria-hidden="true">{w} </span>)}
        </p>
        <p className={styles.text}>{data.text}</p>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <ol className={styles.raw} data-raw>
          {data.raw.map((l, i) => <li key={i}>{l}</li>)}
        </ol>
        <div className={styles.card} data-card>
          <div className={styles.cardHead} data-part><span className={styles.ai}><Ic n="bolt" /> Assistant</span><span className={styles.meta}>Unit 4B · 2 min ago</span></div>
          <div className={styles.tags} data-part><em className={styles.hot}>Urgent</em><em>Plumbing</em><em className={styles.warn}>Electrical hazard</em></div>
          <p className={styles.sum} data-part>Water leaking above the electrical panel in unit 4B.</p>
          <div className={styles.slot} data-part><span><b>Dana R.</b> · 14:00 today</span><span className={styles.meta}>closest, licensed for both trades</span></div>
          <div className={styles.act} data-part><span className={styles.p}>Assign Dana</span><span className={styles.g}>Edit</span><span className={styles.g}>Undo</span></div>
        </div>
        <figure className={styles.photo} data-photo>
          <Image src={AI_IMAGES.reader} alt="" fill sizes="(max-width: 900px) 40vw, 18vw" />
          <figcaption>Where it ends up: in somebody's hand.</figcaption>
        </figure>
      </div>
    </section>
  );
}
