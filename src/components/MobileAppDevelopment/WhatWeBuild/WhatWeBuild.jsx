"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useReducedMotion, sfx } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./WhatWeBuild.module.css";

const ACCENTS = ["#1f6feb", "#16a36a", "#7b5bff", "#0d9488", "#111827", "#ea580c", "#2563eb", "#db2777"];

/**
 * What we build: eight kinds of app in large type, and one phone that answers them. As each name
 * crosses the middle of the screen it lights up and opens its line, and the phone — held beside the
 * list — turns on its axis and comes back round showing that kind of app. Phones: every entry carries
 * its own small device instead.
 */
export default function WhatWeBuild({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const reduced = useReducedMotion();
  const first = useRef(true);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const sts = gsap.utils.toArray("[data-item]", root).map((el, i) =>
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && (setActive(i), sfx("tick")) } })
    );
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-name]"), { yPercent: 60, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
    });
    return () => { mm.revert(); sts.forEach((t) => t.kill()); };
  }, { dependencies: [ready], scope: ref });

  // the held phone turns and comes back showing the active app
  useEffect(() => {
    const root = ref.current;
    const dev = root.querySelector("[data-dev]");
    const layers = gsap.utils.toArray("[data-dev] [data-layer]", root);
    if (first.current || reduced) {
      first.current = false;
      gsap.set(layers, { opacity: (i) => (i === active ? 1 : 0) });
      return;
    }
    const dir = active % 2 ? 1 : -1;
    gsap.timeline({ overwrite: true })
      .to(dev, { rotationY: dir * 70, scale: 0.94, duration: 0.35, ease: "power2.in" })
      .set(layers, { opacity: (i) => (i === active ? 1 : 0) })
      .fromTo(dev, { rotationY: -dir * 70 }, { rotationY: dir * -14, scale: 1, duration: 0.9, ease: "expo.out" });
  }, [active, reduced]);

  const it = data.items[active];
  return (
    <section ref={ref} className={styles.build} aria-labelledby="build-title">
      <Head kicker={data.kicker} title={data.title} id="build-title" className={styles.head} />

      <div className={styles.grid}>
        <ol className={styles.list} data-list>
          {data.items.map((x, i) => (
            <li key={x.name} className={`${styles.item} ${i === active ? styles.on : ""}`} data-item>
              <h3 className={styles.name}><span data-name>{x.name}</span></h3>
              <div className={styles.detail}>
                <div>
                  <p>{x.text}</p>
                  {x.href && <a href={x.href} className={styles.link}>Explore {x.name.replace(/ Applications?$/, "")} <i aria-hidden="true">→</i></a>}
                </div>
              </div>
              <div className={styles.mobileVis} aria-hidden="true">
                <Device platform={x.platform} depth={8}><Screen><AppScreen kind={x.screen} platform={x.platform} accent={ACCENTS[i]} /></Screen></Device>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.side} aria-hidden="true">
          <div className={styles.stage}>
            <Device depth={15} className={styles.device} data-dev>
              {data.items.map((x, i) => <Screen key={x.name}><AppScreen kind={x.screen} platform={x.platform} accent={ACCENTS[i]} /></Screen>)}
            </Device>
            <span className={styles.glow} />
          </div>
          <p className={styles.caption}><i />{it.name}<em>{it.platform === "android" ? "Android" : "iOS"}</em></p>
        </div>
      </div>
    </section>
  );
}
