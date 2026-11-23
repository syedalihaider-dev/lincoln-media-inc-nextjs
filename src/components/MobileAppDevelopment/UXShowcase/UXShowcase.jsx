"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./UXShowcase.module.css";

const ACCENT = "#1f6feb";

/**
 * Design + UX, presented like a product review on a pale studio table. Five screens of one journey
 * stand in a straight row; as the section passes they open into a fan in depth — the outer ones
 * turning away, the checkout coming forward — and designer's notes pin themselves to it. Below, the
 * six principles each draw their rule and rise in turn.
 */
export default function UXShowcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const mid = Math.floor(data.screens.length / 2);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const slots = gsap.utils.toArray("[data-slot]", root);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const w = () => slots[0].offsetWidth;
      gsap.set(slots, { x: (i) => (i - mid) * w() * 1.14, z: 0, rotationY: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root.querySelector("[data-stage]"), start: "top 80%", end: "bottom 25%", scrub: 0.9, invalidateOnRefresh: true } });
      tl.to(slots, { x: (i) => (i - mid) * w() * 0.82, z: (i) => -Math.abs(i - mid) * 170 + (i === mid ? 90 : 0), rotationY: (i) => (i - mid) * -24, y: (i) => Math.abs(i - mid) * 18, duration: 1 }, 0)
        .to(slots[mid - 1], { z: -380, x: () => -w() * 1.1, duration: 0.6 }, 1)
        .to(slots[mid], { z: 170, scale: 1.04, duration: 0.6 }, 1)
        .from(root.querySelectorAll("[data-note]"), { clipPath: "inset(0% 100% 0% 0%)", opacity: 0, duration: 0.3, stagger: 0.12, ease: "power3.out" }, 1.05);
    });
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-p]", root).forEach((p, i) => {
        gsap.timeline({ scrollTrigger: { trigger: p, start: "top 88%", once: true } })
          .from(p.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut", delay: (i % 3) * 0.08 })
          .from(p.querySelectorAll("h3, p"), { y: 26, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06 }, "-=0.7");
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.ux} aria-labelledby="ux-title">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ux-title" tone="light" align="center" />

      <div className={styles.stage} data-stage aria-hidden="true">
        {data.screens.map((k, i) => (
          <div key={k} className={`${styles.slot} ${i === mid ? styles.mid : ""} ${Math.abs(i - mid) === 2 ? styles.outer : ""}`} data-slot>
            <Device depth={11} finish={i % 2 ? "silver" : "graphite"}><Screen><AppScreen kind={k} accent={ACCENT} /></Screen></Device>
            <span className={styles.shadow} />
            {i === mid && data.notes.map((n) => <span key={n.text} className={`${styles.note} ${styles[`n_${n.at}`]}`} data-note><i />{n.text}</span>)}
          </div>
        ))}
      </div>

      <ul className={styles.principles}>
        {data.principles.map((p) => (
          <li key={p.name} data-p>
            <span className={styles.rule} data-rule />
            <h3>{p.name}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
