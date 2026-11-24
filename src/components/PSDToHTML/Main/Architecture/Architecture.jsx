"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import Code, { HTML } from "@/components/DesignKit/Code";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Architecture.module.css";

/**
 * The code builds the page. On the left, the page's real HTML; on the right, a browser with nothing
 * in it yet. Held on desktop: a highlight moves down the source one block at a time — header, hero,
 * search form, cards — and as each block lights, that part of the page assembles itself in the
 * browser, while the layer it belongs to (semantic HTML, layout, components, content) lights in the
 * list. Phones: the parts build as the browser scrolls into view.
 */
export default function Architecture({ data }) {
  const ref = useRef(null);
  const layers = data.layers;
  useScene(ref, (mm, root) => {
    const parts = () => layers.map((l) => root.querySelector(`[data-browser] [data-part="${l.part}"]`));
    mm.add(PIN, () => {
      const lines = gsap.utils.toArray("[data-code] [data-line]", root);
      const rows = gsap.utils.toArray("[data-layer]", root);
      const ps = parts();
      gsap.set(ps, { opacity: 0, y: 30 });
      gsap.set(lines, { opacity: 0.25 });
      gsap.set(rows, { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${layers.length * 55}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      layers.forEach((l, i) => {
        const block = lines.slice(l.lines[0] - 1, l.lines[1]);
        tl.to(block, { opacity: 1, duration: 0.3, stagger: 0.02 }, i)
          .to(rows[i], { "--on": 1, duration: 0.2 }, i)
          .to(ps[i], { opacity: 1, y: 0, duration: 0.5 }, i + 0.2);
        if (i) tl.to(rows[i - 1], { "--on": 0.4, duration: 0.2 }, i);
      });
      tl.to({}, { duration: 0.4 });
      return () => gsap.set(ps, { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      gsap.from(parts(), { opacity: 0, y: 30, duration: 0.8, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: root.querySelector("[data-browser]"), start: "top 75%", once: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-arch">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="psd-arch" />
        <ol className={styles.layers}>{layers.map((l) => <li key={l.name} data-layer style={{ "--on": 1 }}><b>{l.name}</b><p>{l.text}</p></li>)}</ol>
      </div>
      <div className={styles.work} aria-hidden="true">
        <div className={styles.code} data-code><Code file="index.html" lines={HTML} tabs={["index.html", "styles.css", "responsive.css"]} /></div>
        <div className={styles.browser} data-browser><OnDevice page="home" /></div>
      </div>
    </section>
  );
}
