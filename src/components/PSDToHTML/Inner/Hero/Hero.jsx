"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { PSD_PATH } from "@/data/psd-to-html/main";
import Button from "@/components/Common/Button";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Hero.module.css";

/**
 * An engineering drawing for a website. Blueprint paper; the service name in the title block with
 * its spec rows (scale, sheets, standard). The page itself is drawn as the subject — with white
 * dimension lines that draw themselves out from its edges, measuring width and breakpoints. As you
 * scroll, the drawing's lines extend, the page slides up inside its frame and the grid drifts.
 */
export default function Hero({ service: s }) {
  const ref = useRef(null);
  const h = s.hero;
  useScene(ref, (mm, root) => {
    const q = (x) => root.querySelector(x);
    mm.add(MOTION, () => {
      gsap.timeline({ delay: 0.1 })
        .from(q("[data-title]"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
        .from(root.querySelectorAll("[data-rise]"), { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.4)
        .from(root.querySelectorAll("[data-dim]"), { scaleX: 0, duration: 1, ease: "expo.inOut", stagger: 0.12 }, 0.6)
        .from(root.querySelectorAll("[data-vdim]"), { scaleY: 0, duration: 1, ease: "expo.inOut", stagger: 0.12 }, 0.7)
        .from(q("[data-subject]"), { y: 40, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.3);
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } })
        .to(q("[data-subject]"), { y: -60 }, 0)
        .to(root, { backgroundPosition: "0px -120px, 0px -120px, 0 0" }, 0);
    });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="pi-title">
      <div className={styles.sheet}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
            <ol><li><a href="/">Home</a></li><li><a href="/services/ui-ux-design">UI/UX Design</a></li><li><a href={PSD_PATH}>PSD to HTML</a></li><li><span aria-current="page">{s.name}</span></li></ol>
          </nav>
          <h1 id="pi-title" className={styles.title} data-title>{s.name}</h1>
          <p className={styles.headline} data-rise>{h.headline}</p>
          <p className={styles.text} data-rise>{h.text}</p>
          <div className={styles.actions} data-rise>
            <Button href="/#contact" size="lg">{h.cta}</Button>
            <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
          </div>
        </div>

        <div className={styles.drawing} aria-hidden="true">
          <span className={styles.dimTop} data-dim><b>{h.dims[0]}</b></span>
          <span className={styles.dimSide} data-vdim><b>{h.dims[1]}</b></span>
          <div className={styles.subject} data-subject><OnDevice page={h.page} /></div>
          <span className={styles.dimBottom} data-dim>{h.breaks.map((b) => <em key={b}>{b}</em>)}</span>
        </div>

        <dl className={styles.block} data-rise>
          <div><dt>Drawing</dt><dd>{s.name}</dd></div>
          {h.spec.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          <div><dt>Studio</dt><dd>{SITE.name}</dd></div>
        </dl>
      </div>
    </section>
  );
}
