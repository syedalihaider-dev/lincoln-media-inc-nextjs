"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Button from "@/components/Common/Button";
import Head from "../../kit/Head";
import Clip from "../../kit/Clip";
import Timecode from "../../kit/Timecode";
import styles from "./Formats.module.css";

/**
 * What we create — laid out like an editor's bin beside the program monitor. Each format is a clip
 * in the bin (its frame, its name, where it runs); pointing at one, focusing it or tapping it cuts
 * the monitor to that footage — a hard cut through black, as in an edit. On phones the bin carries
 * its own frames and the monitor steps aside.
 */
export default function Formats({ data }) {
  const ref = useRef(null);
  const video = useRef(null);
  const [on, setOn] = useState(0);
  const { ready } = useSiteMotion();
  const it = data.items[on];

  const pick = (i) => {
    if (i === on) return;
    setOn(i);
    sfx("tick");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(ref.current.querySelector("[data-cut]"), { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: true });
      gsap.fromTo(ref.current.querySelectorAll("[data-meta] > *"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "expo.out", overwrite: true });
    }
  };

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-row]"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.2, stagger: 0.05, ease: "expo.inOut", scrollTrigger: { trigger: root.querySelector("[data-bin]"), start: "top 80%", once: true } });
      gsap.from(root.querySelector("[data-monitor]"), { clipPath: "inset(50% 0% 50% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: root.querySelector("[data-bin]"), start: "top 70%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.formats} aria-labelledby="va-formats">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="va-formats" />
      <div className={styles.body}>
        <ul className={styles.bin} data-bin>
          {data.items.map((f, i) => (
            <li key={f.name} data-row>
              <button type="button" className={`${styles.row} ${i === on ? styles.on : ""}`} aria-pressed={i === on} onMouseEnter={() => pick(i)} onFocus={() => pick(i)} onClick={() => pick(i)}>
                <span className={styles.thumb} aria-hidden="true"><img src={f.clip.poster} alt="" loading="lazy" decoding="async" /></span>
                <span className={styles.name}>{f.name}</span>
                <span className={styles.where}>{f.where.join(" · ")}</span>
                <span className={styles.text}>{f.text}</span>
              </button>
              {f.href && <a className={styles.mLink} href={f.href}>See {f.name.toLowerCase()} <i aria-hidden="true">→</i></a>}
            </li>
          ))}
        </ul>

        <div className={styles.side}>
          <div className={styles.monitor} data-monitor>
            <Clip ref={video} clip={it.clip} fit={it.clip.h > it.clip.w ? "contain" : "cover"} label={`${it.name} — footage`} />
            <span className={styles.cut} data-cut aria-hidden="true" />
            <p className={styles.hud} aria-hidden="true"><span>Program</span><Timecode video={video} /></p>
          </div>
          <div className={styles.meta} data-meta aria-live="polite">
            <h3>{it.name}</h3>
            <p>{it.text}</p>
            {it.href ? <Button href={it.href} variant="text" size="sm">See the service</Button> : <Button href="/#contact" variant="text" size="sm">Plan this film</Button>}
          </div>
        </div>
      </div>
    </section>
  );
}
