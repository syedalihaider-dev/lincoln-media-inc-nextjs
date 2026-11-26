"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SERVICES_PAGE } from "@/data/service-categories";
import { SITE } from "@/data/site";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import Label from "@/components/About/Label";
import styles from "./ServicesFinale.module.css";

/**
 * The final chapter. New York at night opens through a circle that widens as you arrive; across
 * it, "Design. Build. Launch." in three moves — drawn on a rule, stacked up letter by letter, lifted
 * off on light — the block tilting in depth toward the cursor. Then the invitation and how to answer it.
 */
export default function ServicesFinale() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-film]"), { clipPath: "circle(12% at 50% 55%)" }, { clipPath: "circle(110% at 50% 55%)", ease: "none", scrollTrigger: { trigger: root, start: "top 85%", end: "top 5%", scrub: 0.6 } });
      const [design, build, launch] = gsap.utils.toArray("[data-word]", root);
      const sb = SplitText.create(build, { type: "chars" });
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-words]"), start: "top 85%", end: "bottom 45%", scrub: 0.7 } })
        .fromTo(design, { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .fromTo(root.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 0.1)
        .fromTo(sb.chars, { yPercent: -160, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "bounce.out", stagger: 0.08, duration: 0.8 }, 0.5)
        .fromTo(launch, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 1.1)
        .fromTo(root.querySelector("[data-beam]"), { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power2.out" }, 1.1);
      gsap.fromTo(root.querySelectorAll("[data-rise]"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: 30 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-close]"), start: "top 90%", once: true } });
      return () => sb.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const w = root.querySelector("[data-words]");
      const rx = gsap.quickTo(w, "rotationX", { duration: 1.2, ease: "power3.out" });
      const ry = gsap.quickTo(w, "rotationY", { duration: 1.2, ease: "power3.out" });
      gsap.set(w, { transformPerspective: 1200 });
      const move = (e) => { ry((e.clientX / innerWidth - 0.5) * 12); rx(-(e.clientY / innerHeight - 0.5) * 8); };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const [d, b, l] = SERVICES_PAGE.tagline;

  return (
    <section ref={ref} id="start" className={styles.finale} aria-labelledby="finale-title">
      <div className={styles.film} data-film aria-hidden="true">
        <VideoBackground src="/videos/nyc-night.mp4" mobileSrc="/videos/nyc-night-mobile.mp4" poster="/videos/nyc-night-poster.jpg" />
        <span className={styles.shade} />
      </div>
      <span className={styles.beam} data-beam aria-hidden="true" />

      <div className={styles.inner}>
        <Label>Start a project</Label>
        <p className={styles.words} data-words aria-label={SERVICES_PAGE.tagline.join(" ")}>
          <span className={styles.design} aria-hidden="true"><span data-word>{d}</span><i className={styles.rule} data-rule /></span>
          <span className={styles.build} data-word aria-hidden="true">{b}</span>
          <span className={styles.launch} data-word aria-hidden="true">{l}</span>
        </p>

        <div className={styles.close} data-close>
          <h2 id="finale-title" className={styles.title} data-rise>{SERVICES_PAGE.closing}</h2>
          <p className={styles.promise} data-rise>{SERVICES_PAGE.promise}</p>
          <div className={styles.buttons} data-rise>
            <Button href="/contact-us#contact-form" size="lg">{SERVICES_PAGE.expert}</Button>
            <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
          </div>
          <div data-rise><Button href={`mailto:${SITE.email}`} variant="text">{SITE.email}</Button></div>
        </div>
      </div>
    </section>
  );
}
