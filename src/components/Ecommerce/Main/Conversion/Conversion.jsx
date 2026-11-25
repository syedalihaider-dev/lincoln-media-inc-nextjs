"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Conversion.module.css";

/* One small working interface per principle. Each plays (CSS) once its row enters the screen. */
function Fragment({ k, store }) {
  const [a, b, c] = store.products;
  switch (k) {
    case "speed":
      return (
        <div className={styles.fSpeed}>
          <span className={styles.fImg}><Image src={a.img} alt="" fill sizes="20vw" /></span>
          <span className={styles.skel} />
          <b>{a.name}</b><small>{a.price}</small>
        </div>
      );
    case "mobile":
      return (
        <div className={styles.fMobile}>
          <span className={styles.fPhone}><Image src={b.img} alt="" fill sizes="10vw" /><i className={styles.thumb} /><em className={styles.sticky}>Add to bag · {b.price}</em></span>
        </div>
      );
    case "discovery":
      return (
        <div className={styles.fDisc}>
          <p className={styles.chips}><span>Leather</span><span>Under $400</span><span>In stock</span></p>
          <p className={styles.minis}>{store.products.map((p, i) => <span key={p.name} style={{ "--n": i }}><Image src={p.img} alt="" fill sizes="6vw" /></span>)}</p>
        </div>
      );
    case "search":
      return (
        <div className={styles.fSearch}>
          <p className={styles.field}><span className={styles.typed}>{store.search}</span></p>
          <p className={styles.sugs}>{[a, c].map((p) => <span key={p.name}><i><Image src={p.img} alt="" fill sizes="4vw" /></i>{p.name}</span>)}</p>
        </div>
      );
    case "ux":
      return (
        <div className={styles.fUx}>
          <b>{a.name}</b>
          <span><i />Order today, dispatched tomorrow</span>
          <span><i />Free returns, collected from your door</span>
          <span><i />Pay in full or in instalments</span>
        </div>
      );
    case "checkout":
      return (
        <div className={styles.fCheck}>
          <span>Wallet</span><span>Pay later</span><span className={styles.pressed}>Saved card<i /></span>
        </div>
      );
    case "cro":
      return (
        <div className={styles.fCro}>
          <span><small>Variant A</small><i>Add to bag</i></span>
          <span><small>Variant B</small><i>Add to bag — free delivery</i></span>
          <em>Experiment running · results decide</em>
        </div>
      );
    default:
      return (
        <div className={styles.fScale}>
          <em>Launch day · orders flowing</em>
          <p>{Array.from({ length: 14 }, (_, i) => <span key={i}>#{1040 + (i % 7)}</span>)}</p>
        </div>
      );
  }
}

/**
 * Conversion and performance, set on paper. A line of large words drifts sideways with the scroll;
 * below it eight principles sit in two offset columns, each with a small working interface that wipes
 * in from the left and then plays its moment — the skeleton loading into a product, a query typing,
 * filters narrowing, a wallet pressed, an experiment, orders queueing on launch day.
 */
export default function Conversion({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const rows = gsap.utils.toArray("[data-row]", root);
    // the micro-interactions play once their row is on screen (also with reduced motion: they're short)
    const plays = rows.map((r) => ScrollTrigger.create({ trigger: r, start: "top 75%", once: true, onEnter: () => r.classList.add(styles.play) }));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-marquee]"), { xPercent: 4 }, { xPercent: -38, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      rows.forEach((r) => {
        gsap.timeline({ scrollTrigger: { trigger: r, start: "top 85%", once: true } })
          .fromTo(r.querySelector("[data-frag]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" })
          .from(r.querySelectorAll("h3, p[data-t]"), { x: -24, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.4);
      });
    });
    return () => { plays.forEach((t) => t.kill()); mm.revert(); };
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.conv} aria-labelledby="ecom-conv">
      <Head kicker={data.kicker} title={data.title} id="ecom-conv" tone="paper" />
      <div className={styles.marqueeWrap} aria-hidden="true">
        <p className={styles.marquee} data-marquee>{[...data.marquee, ...data.marquee].map((w, i) => <span key={i}>{w}</span>)}</p>
      </div>
      <ul className={styles.rows}>
        {data.items.map((it) => (
          <li key={it.key} className={styles.row} data-row>
            <div className={styles.frag} data-frag aria-hidden="true"><Fragment k={it.key} store={data.store} /></div>
            <h3>{it.name}</h3>
            <p data-t>{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
