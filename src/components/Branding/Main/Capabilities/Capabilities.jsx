"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Capabilities.module.css";

/**
 * What we do, as an index of ten disciplines in large type. On desktop a picture follows the pointer
 * through the list, wiping to the discipline under it (keyboard focus opens the same picture beside the
 * row); the rest of the list dims. Rows draw their rules as they arrive. Phones show a thumbnail per row.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const rows = gsap.utils.toArray("[data-row]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      rows.forEach((r) => gsap.timeline({ scrollTrigger: { trigger: r, start: "top 92%", once: true } })
        .from(r.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
        .from(r.querySelector("[data-name]"), { yPercent: 100, duration: 1, ease: "expo.out" }, 0.3));
    });
    // the pointer preview (fine pointers, motion allowed)
    mm.add("(hover: hover) and (pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const prev = root.querySelector("[data-preview]");
      const pics = gsap.utils.toArray("[data-pic]", prev);
      const xTo = gsap.quickTo(prev, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(prev, "y", { duration: 0.6, ease: "power3" });
      let cur = -1;
      const show = (i) => {
        if (i === cur) return;
        if (cur >= 0) gsap.to(pics[cur], { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power3.inOut" });
        gsap.fromTo(pics[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" });
        cur = i;
      };
      const list = root.querySelector("[data-list]");
      const move = (e) => { const r = list.getBoundingClientRect(); xTo(e.clientX - r.left); yTo(e.clientY - r.top); };
      const enter = () => gsap.to(prev, { autoAlpha: 1, scale: 1, duration: 0.4 });
      const leave = () => { gsap.to(prev, { autoAlpha: 0, scale: 0.85, duration: 0.4 }); rows.forEach((r) => r.classList.remove(styles.on)); list.classList.remove(styles.dim); };
      const handlers = rows.map((r, i) => { const h = () => { show(i); rows.forEach((x) => x.classList.toggle(styles.on, x === r)); list.classList.add(styles.dim); }; r.addEventListener("pointerenter", h); return h; });
      gsap.set(prev, { autoAlpha: 0, scale: 0.85 });
      list.addEventListener("pointermove", move);
      list.addEventListener("pointerenter", enter);
      list.addEventListener("pointerleave", leave);
      return () => {
        rows.forEach((r, i) => r.removeEventListener("pointerenter", handlers[i]));
        list.removeEventListener("pointermove", move); list.removeEventListener("pointerenter", enter); list.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="brand-capabilities" className={styles.caps} aria-labelledby="brand-caps">
      <Head kicker={data.kicker} title={data.title} id="brand-caps" />
      <div className={styles.listWrap} data-list>
        <ul className={styles.list}>
          {data.items.map((it) => (
            <li key={it.name} className={styles.row} data-row tabIndex={0}>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3 className={styles.name}><span data-name>{it.name}</span></h3>
              <p className={styles.text}>{it.text}</p>
              <figure className={styles.thumb} aria-hidden="true"><Image src={it.img} alt="" fill sizes="(max-width: 900px) 30vw, 20vw" /></figure>
            </li>
          ))}
        </ul>
        <div className={styles.preview} data-preview aria-hidden="true">
          {data.items.map((it) => <figure key={it.name} className={styles.pic} data-pic><Image src={it.img} alt="" fill sizes="22vw" /></figure>)}
        </div>
      </div>
    </section>
  );
}
