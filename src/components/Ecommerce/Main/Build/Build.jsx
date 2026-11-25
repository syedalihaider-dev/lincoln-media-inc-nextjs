"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser, DemoTag } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Build.module.css";

/**
 * What we build, as an index you read by scrolling. The capability names run down the left in large
 * type; whichever reaches the middle of the screen opens (its description, tags and platform pages)
 * and the held browser on the right wipes up to that capability's interface. Phones show each
 * interface inline under its entry.
 */
export default function Build({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const items = gsap.utils.toArray("[data-item]", root);
    const panes = gsap.utils.toArray("[data-pane]", root);
    const activate = (i) => {
      items.forEach((el, j) => el.classList.toggle(styles.on, j === i));
      panes.forEach((el, j) => el.classList.toggle(styles.shown, j <= i));
      panes.forEach((el, j) => el.classList.toggle(styles.top, j === i));
      root.querySelector("[data-index]").textContent = data.items[i].name;
    };
    activate(0);
    const triggers = items.map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && activate(i) })
    );
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(items.map((el) => el.querySelector("[data-name]")), { yPercent: 60, opacity: 0, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
    });
    return () => { triggers.forEach((t) => t.kill()); mm.revert(); };
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id={data.id} className={styles.build} aria-labelledby="ecom-build-title">
      <Head kicker={data.kicker} title={data.title} id="ecom-build-title" />
      <div className={styles.layout}>
        <ol className={styles.list} data-list>
          {data.items.map((it) => (
            <li key={it.name} className={styles.item} data-item>
              <h3 className={styles.name} data-name>{it.name}</h3>
              <div className={styles.more}>
                <div className={styles.moreIn}>
                  <p>{it.text}</p>
                  <ul className={styles.tags}>{it.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  {it.links && (
                    <p className={styles.links}>
                      {it.links.map((l) => <a key={l.path} href={l.path}>{l.full} <span aria-hidden="true">↗</span></a>)}
                    </p>
                  )}
                  <div className={styles.inline} aria-hidden="true">
                    <Browser url={it.store.domain}><Screen kind={it.screen} store={it.store} data={it.data} /></Browser>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.side} aria-hidden="true">
          <div className={styles.sticky}>
            <div className={styles.stack}>
              {data.items.map((it) => (
                <div key={it.name} className={styles.pane} data-pane>
                  <Browser url={it.store.domain} tone="dark"><Screen kind={it.screen} store={it.store} data={it.data} /></Browser>
                </div>
              ))}
            </div>
            <div className={styles.meta}><DemoTag /><span data-index /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
