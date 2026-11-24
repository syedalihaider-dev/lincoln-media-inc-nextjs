"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "../Head";
import { Ui } from "../ui/Frames";
import { useScene, undraw, PIN, SMALL } from "../shared";
import styles from "./Ecosystem.module.css";

// Where each channel lies on the table (percent of the plane) — a path that zig-zags left to right
const SPOTS = [[4, 40], [18, 12], [32, 46], [47, 14], [56, 52], [70, 16], [82, 50]];
// Tile centres in the connector SVG's 1500 × 800 space, matching SPOTS
const CENTRES = [[100, 473], [240, 193], [380, 533], [493, 232], [620, 593], [760, 233], [880, 573]];
const link = (a, b) => {
  const [x1, y1] = CENTRES[a], [x2, y2] = CENTRES[b];
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};

/**
 * The ecosystem, built from the work itself. The seven channels' real interfaces — strategy doc,
 * search results, ads manager, social post, content editor, analytics, checkout — lie on a tilted
 * planning table. As you scroll (held), the camera travels along the table; each channel in turn
 * stands up to face you, the line from the channel before it draws itself in, and the index on the
 * left moves to it — until the whole system is lit, connected end to end.
 */
export default function Ecosystem({ data }) {
  const ref = useRef(null);
  const nodes = data.nodes;

  useScene(ref, (mm, root) => {
    const tiles = gsap.utils.toArray("[data-tile]", root);
    const links = gsap.utils.toArray("[data-link]", root);
    const items = gsap.utils.toArray("[data-node]", root);

    mm.add(PIN, () => {
      undraw(links);
      gsap.set(items.slice(1), { "--on": 0 });
      gsap.set(items[0], { "--on": 1 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: root, start: "top top", end: `+=${nodes.length * 60}%`, pin: true, scrub: 0.9, anticipatePin: 1 },
      });
      // the camera tracks the active channel: tile i's centre sits at 39vw + 1.5 × its spot, so a pan
      // from +20vw to −97vw keeps each one near 65vw (the middle of the stage beside the copy)
      tl.fromTo(root.querySelector("[data-plane]"), { rotationX: 58, rotationZ: -6, x: "20vw", y: "8vh" }, { rotationX: 55, rotationZ: -6, x: "-97vw", y: "10vh", ease: "none", duration: nodes.length - 1 }, 0);
      tiles.forEach((t, i) => {
        const at = i;
        tl.to(t, { z: 150, rotationX: -38, duration: 0.45 }, at)
          .to(t.querySelector("[data-lit]"), { opacity: 1, duration: 0.3 }, at);
        if (i) tl.to(links[i - 1], { strokeDashoffset: 0, duration: 0.5, ease: "none" }, at - 0.2);
        if (i) tl.to(items[i - 1], { "--on": 0, duration: 0.25 }, at).to(items[i], { "--on": 1, duration: 0.25 }, at + 0.1);
        // settle back onto the table, still lit, when the next channel takes over
        if (i < tiles.length - 1) tl.to(t, { z: 30, rotationX: 0, duration: 0.45 }, at + 0.85);
      });
      tl.to({}, { duration: 0.4 });
    });

    mm.add(SMALL, () => {
      tiles.forEach((t) => gsap.from(t, { y: 60, rotationX: 30, transformPerspective: 900, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 90%", once: true } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="eco-title" data-phase="Strategy">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="eco-title" />
        <ol className={styles.index}>
          {nodes.map((n) => (
            <li key={n.name} className={styles.node} data-node>
              <b>{n.name}</b>
              <p>{n.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.plane} data-plane>
          <svg className={styles.links} viewBox="0 0 1500 800" preserveAspectRatio="none">
            {nodes.slice(1).map((n, i) => <path key={n.name} d={link(i, i + 1)} pathLength="1" data-link />)}
          </svg>
          {nodes.map((n, i) => (
            <div key={n.name} className={`${styles.tile} ${n.screen === "post" ? styles.phone : ""}`} style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }} data-tile>
              <Ui kind={n.screen} />
              <span className={styles.lit} data-lit />
              <span className={styles.tag}>{n.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
