"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { BIMG } from "@/data/branding/brands";
import { Card, Label, Social, Poster, Mark, Caption } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Transformation.module.css";

/* The "before": what a business looks like with a name and no brand */
function Before({ data, kind }) {
  if (kind === "card") return <div className={styles.bCard}><b>{data.name}</b><span>{data.line}</span><small>info@orocoffee.co · 718 555 0142</small></div>;
  if (kind === "post") return <div className={styles.bPost}><span>NEW!!</span><b>Try our coffee today</b><small>Link in bio</small></div>;
  return <div className={styles.bBag}><Image src={BIMG.pouchKraft} alt="" fill sizes="20vw" /><span className={styles.sticker}>{data.name}</span></div>;
}

/**
 * Strategy → Identity → Communication → Recognition, held on screen (desktop). A business card, a bag
 * and a post start as a generic "before". The brand idea is pinned up; then the identity wipes over
 * each piece from the bottom; the campaign arrives; finally everything recedes and the mark alone is
 * enough to know the brand. The stage list on the left follows the scroll. Phones see before/after.
 */
export default function Transformation({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const qa = (s) => gsap.utils.toArray(s, root);
    const stages = qa("[data-stage]");
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const set = (i) => stages.forEach((s, j) => { s.classList.toggle(styles.on, j === i); s.classList.toggle(styles.done, j < i); });
      set(0);
      gsap.set(qa("[data-after]"), { clipPath: "inset(100% 0% 0% 0%)" });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: root, start: "top top", end: "+=320%", pin: true, scrub: 0.8, anticipatePin: 1, onUpdate: (self) => set(Math.min(3, Math.floor(self.progress * 4.4))) },
      });
      tl.from(q("[data-idea]"), { y: 60, rotation: -6, opacity: 0, duration: 0.6 })
        .fromTo(qa("[data-before]"), { filter: "grayscale(0) brightness(1)" }, { filter: "grayscale(1) brightness(0.8)", duration: 0.4 }, "<")
        .to(qa("[data-after]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, stagger: 0.25 }, "+=0.3")
        .to(q("[data-idea]"), { y: -40, opacity: 0, duration: 0.4 }, "<0.4")
        .from(q("[data-poster]"), { xPercent: 70, rotation: 10, opacity: 0, duration: 0.7 }, "+=0.3")
        .to(qa("[data-piece], [data-poster]"), { scale: 0.86, opacity: 0.16, duration: 0.6 }, "+=0.4")
        .fromTo(q("[data-mark]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, "<0.2")
        .to({}, { duration: 0.4 });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.tx} aria-labelledby="brand-tx">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="brand-tx" />
        <ol className={styles.stages}>
          {data.stages.map((s) => (
            <li key={s.name} className={styles.stage} data-stage>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.stage3} aria-hidden="true">
        <div className={`${styles.piece} ${styles.pCard}`} data-piece>
          <div data-before><Before data={data.before} kind="card" /></div>
          <div className={styles.after} data-after><Card brand={brand} side="front" /></div>
        </div>
        <div className={`${styles.piece} ${styles.pBag}`} data-piece>
          <div data-before><Before data={data.before} kind="bag" /></div>
          <div className={styles.after} data-after><Label brand={brand} /></div>
        </div>
        <div className={`${styles.piece} ${styles.pPost}`} data-piece>
          <div data-before><Before data={data.before} kind="post" /></div>
          <div className={styles.after} data-after><Social brand={brand} kind="quote" /></div>
        </div>
        <div className={styles.idea} data-idea><small>Brand idea</small><b>{brand.idea}</b></div>
        <div className={styles.poster} data-poster><Poster brand={brand} img={BIMG.cupsKraft} /></div>
        <div className={styles.mark} data-mark style={{ "--paper": brand.colors[1].hex, "--ink": brand.colors[0].hex }}><Mark brand={brand} tone="paper" /><span>Known at a glance</span></div>
        <Caption className={styles.caption} />
      </div>

      <div className={styles.compare} aria-hidden="true">
        <div><small>Before</small><Before data={data.before} kind="card" /></div>
        <div><small>After</small><Card brand={brand} side="front" /></div>
        <div><Before data={data.before} kind="post" /></div>
        <div><Social brand={brand} kind="quote" /></div>
      </div>
    </section>
  );
}
