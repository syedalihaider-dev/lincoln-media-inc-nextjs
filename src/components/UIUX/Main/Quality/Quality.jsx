"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Quality.module.css";

// Where each review note lands on the home page (% of the browser), in the data's order
const SPOTS = [[18, 31], [40, 76], [9, 47.5], [92, 9.5], [71, 36], [91, 76]];

/**
 * A design review, played on the finished page. Held on desktop: numbered markers drop onto the
 * interface one at a time — the headline, the search, the button's contrast, the navigation, the
 * photo, the call to action — each pulsing as its review note slides in beside the screen, until
 * the whole page is annotated. Phones: the markers land as the screen passes; the notes follow.
 */
export default function Quality({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const marks = () => gsap.utils.toArray("[data-mark]", root);
    mm.add(PIN, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(root.querySelector("[data-screen]"), { rotationX: 14, scale: 0.94 }, { rotationX: 0, scale: 1, duration: 0.6, ease: "power2.out" }, 0);
      marks().forEach((m, i) => tl.from(m, { scale: 0, y: -40, opacity: 0, duration: 0.35, ease: "back.out(2.4)" }, 0.4 + i * 0.5)
        .from(root.querySelector(`[data-note="${i}"]`), { x: i % 2 ? 50 : -50, opacity: 0, duration: 0.35, ease: "power3.out" }, 0.45 + i * 0.5));
      tl.to({}, { duration: 0.4 });
    });
    mm.add(SMALL, () => {
      gsap.from(marks(), { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2.4)", stagger: 0.12, scrollTrigger: { trigger: root.querySelector("[data-screen]"), start: "top 70%", once: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-quality">
      <Head kicker={data.kicker} title={data.title} id="ux-quality" className={styles.head} />
      <div className={styles.grid}>
        <ol className={`${styles.notes} ${styles.left}`}>
          {data.notes.filter((_, i) => i % 2 === 0).map((n) => <li key={n.name} data-note={data.notes.indexOf(n)} style={{ "--n": `"${data.notes.indexOf(n) + 1}"` }}><b>{n.name}</b><p>{n.text}</p></li>)}
        </ol>
        <div className={styles.screen} data-screen aria-hidden="true">
          <OnDevice page="home" />
          {SPOTS.map(([x, y], i) => <span key={i} className={styles.mark} style={{ left: `${x}%`, top: `${y}%` }} data-mark>{i + 1}</span>)}
        </div>
        <ol className={`${styles.notes} ${styles.right}`}>
          {data.notes.filter((_, i) => i % 2 === 1).map((n) => <li key={n.name} data-note={data.notes.indexOf(n)} style={{ "--n": `"${data.notes.indexOf(n) + 1}"` }}><b>{n.name}</b><p>{n.text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
