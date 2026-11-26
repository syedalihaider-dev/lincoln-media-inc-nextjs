"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sfx } from "@/lib/motion";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import { Profile } from "../ui/Listing";
import styles from "./Anatomy.module.css";

/**
 * What we optimize — the anatomy of a business profile. The six disciplines are listed on the left;
 * choosing one pulls focus on the profile: the card glides so that part sits in the window, the part
 * lights and the rest dims, and the discipline's description is set large beside it.
 */
export default function Anatomy({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const item = data.items[at];

  // glide the card so the active zone is centred in the window
  useEffect(() => {
    const root = ref.current;
    const win = root.querySelector("[data-window]"), card = root.querySelector("[data-card]");
    const zone = card.querySelector(`[data-zone="${item.key}"]`);
    if (!zone) return;
    const y = Math.max(0, Math.min(card.offsetHeight - win.offsetHeight, zone.offsetTop + (zone.offsetParent?.offsetTop || 0) + zone.offsetHeight / 2 - win.offsetHeight / 2));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(card, { y: -y, duration: reduce ? 0 : 1.1, ease: "expo.inOut" });
    if (!reduce) gsap.fromTo(root.querySelector("[data-desc]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
  }, [item.key]);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      // (the zones' contents, not the zones: the zones' own opacity belongs to a CSS transition)
      gsap.from(root.querySelectorAll("[data-card] [data-zone] > *, [data-card] article > div:first-child"), { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-window]"), start: "top 75%", once: true } });
      gsap.from(root.querySelectorAll("[data-item]"), { x: -30, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
    });
  }, []);

  return (
    <section ref={ref} id="profile" className={styles.anatomy} aria-labelledby="gmb-anatomy">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="gmb-anatomy" tone="light" />
      <div className={styles.grid}>
        <ul className={styles.list} data-list role="tablist" aria-label="GMB services">
          {data.items.map((s, i) => (
            <li key={s.key} data-item>
              <button type="button" role="tab" id={`gmb-tab-${s.key}`} aria-selected={i === at} aria-controls="gmb-panel" className={i === at ? styles.on : ""}
                onClick={() => { setAt(i); sfx("tick"); }} onPointerEnter={(e) => e.pointerType === "mouse" && setAt(i)}>
                <span>{s.name}</span><i aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.window} data-window>
          <div className={styles.card} data-card><Profile active={item.key} /></div>
        </div>
        <div className={styles.desc} id="gmb-panel" role="tabpanel" aria-labelledby={`gmb-tab-${item.key}`}>
          <div data-desc>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </div>
        </div>
      </div>
      {/* all six, for readers and search engines */}
      <dl className={styles.sr}>{data.items.map((s) => <div key={s.key}><dt>{s.name}</dt><dd>{s.text}</dd></div>)}</dl>
    </section>
  );
}
