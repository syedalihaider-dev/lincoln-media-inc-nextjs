"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Showcase.module.css";

/**
 * The work, as a gallery you walk along. Held on desktop: the five interfaces stand in a row in
 * depth; scrolling slides the row, the screen in the centre turns square to you and comes forward
 * while its neighbours turn away and recede, and the room takes on the colour of the screen in front.
 * Phones: the screens stack, each tilting flat as it arrives.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const n = data.items.length;

  useScene(ref, (mm, root) => {
    const cards = gsap.utils.toArray("[data-card]", root);
    const place = (p) => cards.forEach((c, i) => {
      const d = i - p, a = Math.abs(d);
      // spaced in viewport units so the narrow phone sits in the row like the wide screens
      gsap.set(c, { xPercent: -50, x: `${d * 34}vw`, z: -a * 320, rotationY: gsap.utils.clamp(-50, 50, -d * 38), opacity: a > 2.4 ? 0 : 1 - a * 0.22, zIndex: 10 - Math.round(a) });
    });
    mm.add(PIN, () => {
      place(0);
      gsap.to({ p: 0 }, {
        p: n - 1, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: `+=${n * 60}%`, pin: true, scrub: 0.8, anticipatePin: 1 },
        onUpdate() { const p = this.targets()[0].p; place(p); setAt(Math.round(p)); },
      });
      return () => gsap.set(cards, { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      cards.forEach((c) => gsap.fromTo(c, { rotationX: 30, y: 40, transformPerspective: 1000 }, { rotationX: 0, y: 0, ease: "none", scrollTrigger: { trigger: c, start: "top 95%", end: "top 50%", scrub: 0.5 } }));
    });
  });

  const cur = data.items[at];
  return (
    <section ref={ref} className={styles.section} style={{ "--tint": cur.tint }} aria-labelledby="ux-show">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="ux-show" />
        <p className={styles.now} aria-hidden="true" key={cur.name}><b>{cur.name}</b>{cur.text}</p>
      </div>
      <div className={styles.stage}>
        {data.items.map((it) => (
          <figure key={it.name} className={`${styles.card} ${it.device === "phone" ? styles.phone : ""}`} data-card>
            <OnDevice device={it.device} page={it.page} />
            <figcaption className={styles.cap}><b>{it.name}</b> {it.text}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
