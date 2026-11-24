"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { Browser } from "@/components/DesignKit/Devices";
import Site from "@/components/DesignKit/Site";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Tour.module.css";

/**
 * The finished site, live in one browser that never moves. Held on desktop, your scroll becomes
 * the page's scroll: the site inside travels from the navigation through the hero, the search, the
 * listings and down into a home's page and its booking form, the browser's own scrollbar tracking
 * it, while the part of the build in view is named on the left and its fields light as you reach them.
 * Phones: the same inner scroll, tied to the browser passing through the screen.
 */
export default function Tour({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const run = (st) => {
      const page = q("[data-page]");
      const view = page.parentElement; // the ScaledScreen's inner box, in the same unscaled pixels as the page
      const beats = gsap.utils.toArray("[data-beat]", root);
      const dist = () => page.offsetHeight - view.offsetHeight;
      gsap.set(beats, { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { ...st, invalidateOnRefresh: true } });
      tl.to(page, { y: () => -dist(), duration: 1 }, 0)
        .fromTo(q("[data-thumb]"), { top: "0%" }, { top: "78%", duration: 1 }, 0);
      beats.forEach((b, i) => tl.to(b, { "--on": 1, duration: 0.04 }, (i / beats.length) * 0.96).to(b, { "--on": 0.35, duration: 0.04 }, ((i + 1) / beats.length) * 0.96 - 0.02));
      tl.fromTo(page.querySelectorAll("[data-part='form'] label"), { boxShadow: "0 0 0 0 rgba(196,87,46,0)" }, { boxShadow: "0 0 0 3px rgba(196,87,46,0.35)", stagger: 0.03, duration: 0.05 }, 0.86);
      return tl;
    };
    mm.add(PIN, () => { run({ trigger: root, start: "top top", end: "+=260%", pin: true, scrub: 0.8, anticipatePin: 1 }); });
    mm.add(SMALL, () => { run({ trigger: q("[data-frame]"), start: "top 70%", end: "bottom 20%", scrub: 0.6 }); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-tour">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="psd-tour" />
        <ol className={styles.beats}>{data.beats.map((b) => <li key={b.name} data-beat style={{ "--on": 1 }}><b>{b.name}</b><p>{b.text}</p></li>)}</ol>
      </div>
      <div className={styles.frame} data-frame aria-hidden="true">
        <Browser url="meridian.example">
          <div data-page className={styles.page}><Site page="home" full /><Site page="listing" full /></div>
        </Browser>
        <span className={styles.track}><i data-thumb /></span>
      </div>
    </section>
  );
}
