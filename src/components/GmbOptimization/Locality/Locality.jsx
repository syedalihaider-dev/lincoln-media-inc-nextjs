"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Map, { PINS } from "../ui/Map";
import styles from "./Locality.module.css";

const YOU = PINS[0];
// an illustrative visibility grid around the business: strength falls off with distance, with texture
const GRID = [];
for (let r = -3; r <= 3; r++) for (let c = -5; c <= 5; c++) {
  const x = YOU.x + c * 120, y = YOU.y + r * 110, d = Math.hypot(c * 120, r * 110);
  const wobble = ((c * 7 + r * 13 + 40) % 5) * 40;
  const k = d + wobble < 300 ? 0 : d + wobble < 560 ? 1 : 2;
  GRID.push({ x, y, d, k });
}
const KEYWORDS = [{ t: "florist near me", x: 47, y: 30 }, { t: "wedding flowers brooklyn", x: 64, y: 56 }, { t: "same day flower delivery", x: 30, y: 62 }, { t: "flower shop court st", x: 58, y: 22 }];
const POSTS = [{ t: "Autumn wreath workshop", x: 22, y: 26 }, { t: "Same-day delivery cut-off: 2 pm", x: 66, y: 70 }, { t: "New: plant subscription", x: 72, y: 34 }];

/**
 * Rankings are local — a top-down scan of the neighbourhood, held. A sweep ring expands from the
 * business and lights an illustrative visibility grid (strong near, weaker further out); then the
 * searches people make around it appear as tags, then the posts planned to win them. The three
 * tools on the left take turns with the map.
 */
export default function Locality({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);

  useScene(ref, (mm, root) => {
    const build = (trigger) => {
      const dots = gsap.utils.toArray("[data-dot]", root);
      const tl = gsap.timeline({ scrollTrigger: { ...trigger, onUpdate: (st) => setAt(Math.min(2, Math.floor(st.progress * 3))) } });
      tl.fromTo(root.querySelector("[data-ring]"), { attr: { r: 0 }, opacity: 0.9 }, { attr: { r: 820 }, opacity: 0, ease: "none", duration: 1 }, 0);
      dots.forEach((d) => tl.fromTo(d, { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(2)" }, (+d.dataset.d / 820) * 0.9));
      tl.from(root.querySelectorAll("[data-kw]"), { y: 20, opacity: 0, stagger: 0.12, duration: 0.25 }, 1.1)
        .to(root.querySelectorAll("[data-dot]"), { opacity: 0.45, duration: 0.3 }, 1.1)
        .to(root.querySelectorAll("[data-kw]"), { opacity: 0.3, duration: 0.3 }, 2.1)
        .from(root.querySelectorAll("[data-post]"), { y: 30, scale: 0.9, opacity: 0, stagger: 0.14, duration: 0.3, ease: "back.out(1.6)" }, 2.15)
        .to({}, { duration: 0.4 });
    };
    mm.add(PIN, () => build({ trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.6 }));
    mm.add(SMALL, () => build({ trigger: root.querySelector("[data-board]"), start: "top 70%", end: "bottom 20%", scrub: 0.6 }));
  }, []);

  return (
    <section ref={ref} className={styles.locality} aria-labelledby="gmb-local">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="gmb-local" tone="light" size="md" />
        <ol className={styles.tools}>
          {data.tools.map((t, i) => <li key={t.name} className={i === at ? styles.on : ""}><h3>{t.name}</h3><p>{t.text}</p></li>)}
        </ol>
      </div>
      <div className={styles.board} data-board aria-hidden="true">
        <Map slice={false}>
          <circle data-ring cx={YOU.x} cy={YOU.y} r="0" className={styles.ring} />
          {GRID.map((g, i) => <circle key={i} data-dot data-d={g.d.toFixed(0)} cx={g.x} cy={g.y} r="17" className={`${styles.dot} ${styles["k" + g.k]}`} />)}
        </Map>
        {KEYWORDS.map((k) => <span key={k.t} data-kw className={styles.kw} style={{ left: `${k.x}%`, top: `${k.y}%` }}>“{k.t}”</span>)}
        {POSTS.map((p) => <span key={p.t} data-post className={styles.post} style={{ left: `${p.x}%`, top: `${p.y}%` }}><b>Post</b>{p.t}</span>)}
        <p className={styles.legend}>{data.legend.map((l, i) => <span key={l}><i className={styles["k" + i]} />{l}</span>)}<em>Illustrative scan</em></p>
      </div>
    </section>
  );
}
