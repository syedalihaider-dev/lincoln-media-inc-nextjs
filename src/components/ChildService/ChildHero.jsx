"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import { Browser, Phone, Site, Editor } from "./ui/Screens";
import styles from "./ChildHero.module.css";

/**
 * The child-service hero: the service shown as the product it makes. A finished website in a browser —
 * its hero a playing film — with the CMS editor for the same page standing behind it and the phone
 * version in front, set in perspective. It settles into place as the name sets letter by letter; the
 * layers lean with the cursor at their own depths, and scrolling turns the composition to face you.
 */
export default function ChildHero({ service: s }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const h = s.hero;
  const st = h.stage;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const stage = root.querySelector("[data-stage]");
    const layers = gsap.utils.toArray("[data-layer]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "words,chars", mask: "chars" });
      gsap.timeline({ delay: 0.15, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 120, duration: 1.3, ease: "expo.out", stagger: 0.03 })
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", stagger: 0.08 }, 0.3)
        .fromTo(stage, { rotationY: -34, rotationX: 22, scale: 0.86, opacity: 0 }, { rotationY: -14, rotationX: 7, scale: 1, opacity: 1, duration: 2, ease: "expo.out" }, 0.1)
        .from(layers, { z: -260, opacity: 0, duration: 1.6, ease: "expo.out", stagger: 0.14 }, 0.35);
      // scrolling turns the composition to face the viewer and lifts the copy away
      const sc = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(stage, { rotationY: -2, rotationX: 0, scale: 1.08, yPercent: -6, ease: "none", scrollTrigger: sc });
      gsap.to(root.querySelector("[data-copy]"), { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: sc });
      return () => split.revert();
    });
    // each layer leans with the cursor at its own depth
    mm.add(DESKTOP_MOTION, () => {
      const qs = layers.map((l) => ({ x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3.out" }), y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3.out" }), k: +l.dataset.depth || 1 }));
      const move = (e) => { const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5; qs.forEach((q) => { q.x(px * 26 * q.k); q.y(py * 18 * q.k); }); };
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="hero" className={styles.hero} aria-labelledby="child-title">
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.copy} data-copy>
        <nav className={styles.crumb} aria-label="Breadcrumb" data-wipe>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href={s.parent.href}>{s.parent.name}</a></li>
            <li aria-current="page">{s.name}</li>
          </ol>
        </nav>
        <div data-wipe><Label>{h.strap}</Label></div>
        <h1 id="child-title" className={styles.title}>
          <span className={styles.l1} data-line>{h.title[0]}</span>
          <span className={styles.l2} data-line>{h.title[1]}</span>
        </h1>
        <p className={styles.tagline} data-wipe>{h.tagline}</p>
        <p className={styles.lead} data-wipe>{h.lead}</p>
        <div className={styles.actions} data-wipe>
          <Button href={h.primary.href} size="lg">{h.primary.label}</Button>
          <Button href={h.secondary.href} variant="text" icon="down">{h.secondary.label}</Button>
        </div>
      </div>

      <div className={styles.view} aria-hidden="true">
        <div className={styles.stage} data-stage>
          <div className={`${styles.layer} ${styles.editor}`} data-layer data-depth="0.6"><Browser url={`${st.url}/wp-admin`}><Editor photo={st.photos[1]} /></Browser></div>
          <div className={`${styles.layer} ${styles.main}`} data-layer data-depth="1"><Browser url={st.url}><Site photos={st.photos} video={st.video} poster={st.poster} /></Browser></div>
          <div className={`${styles.layer} ${styles.phone}`} data-layer data-depth="1.8"><Phone><Site photos={st.photos} compact /></Phone></div>
          <p className={`${styles.layer} ${styles.toast}`} data-layer data-depth="2.4"><i />{st.toast}<b>View page</b></p>
        </div>
      </div>
    </section>
  );
}
