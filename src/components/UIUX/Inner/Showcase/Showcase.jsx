"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View, { isTall } from "@/components/DesignKit/View";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Showcase.module.css";

/**
 * The work, laid out on one big design canvas. Held on desktop: the camera flies across the file —
 * panning and zooming from one labelled artboard to the next, easing out to see the whole file
 * between them — so you move through the project the way a designer does. Phones: the artboards
 * stack, each scaling up from the canvas as it arrives.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const plane = root.querySelector("[data-plane]");
      const view = root.querySelector("[data-view]");
      const boards = gsap.utils.toArray("[data-board]", plane);
      // camera position that centres board b in the view at zoom z
      const cam = (b, z) => () => ({ x: view.clientWidth / 2 - (b.offsetLeft + b.offsetWidth / 2) * z, y: view.clientHeight / 2 - (b.offsetTop + b.offsetHeight / 2) * z });
      const zoomFor = (b) => Math.min((view.clientWidth * 0.78) / b.offsetWidth, (view.clientHeight * 0.8) / b.offsetHeight);
      const fit = () => Math.min(view.clientWidth / plane.offsetWidth, view.clientHeight / plane.offsetHeight) * 0.92;
      gsap.set(plane, { transformOrigin: "0 0" });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${boards.length * 60}%`, pin: true, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true } });
      // start on the whole file, then visit each board
      tl.set(plane, { scale: fit, x: () => (view.clientWidth - plane.offsetWidth * fit()) / 2, y: () => (view.clientHeight - plane.offsetHeight * fit()) / 2 }, 0);
      boards.forEach((b, i) => {
        const z = () => zoomFor(b);
        tl.to(plane, { scale: z, x: () => cam(b, z())().x, y: () => cam(b, z())().y, duration: 1 }, i * 1.2 + 0.2)
          .to(b, { "--on": 1, duration: 0.2 }, i * 1.2 + 0.9)
          .to(b, { "--on": 0, duration: 0.2 }, i * 1.2 + 1.3);
      });
      tl.to(plane, { scale: fit, x: () => (view.clientWidth - plane.offsetWidth * fit()) / 2, y: () => (view.clientHeight - plane.offsetHeight * fit()) / 2, duration: 1 }, boards.length * 1.2 + 0.2);
      return () => gsap.set(plane, { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      gsap.utils.toArray("[data-board]", root).forEach((b) => gsap.from(b, { scale: 0.86, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: b, start: "top 88%", once: true } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-show">
      <Head kicker={data.kicker} title={data.title} id="uxi-show" className={styles.head} />
      <div className={styles.view} data-view>
        <div className={styles.plane} data-plane>
          {data.items.map((it) => (
            <figure key={it.label} className={`${styles.board} ${isTall(it.view) ? styles.tall : ""}`} data-board>
              <figcaption>{it.label}</figcaption>
              <View view={it.view} page={it.page} fid={it.fid} />
              <p className={styles.note}>{it.text}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
