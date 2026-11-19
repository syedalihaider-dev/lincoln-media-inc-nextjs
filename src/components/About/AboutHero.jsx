"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { ABOUT_HERO } from "@/data/about";
import { SITE } from "@/data/site";
import MagneticButton from "@/components/Common/MagneticButton";
import Label from "./Label";
import styles from "./AboutHero.module.css";

/**
 * The opening: "the studio window". On the left, the studio's line and its facts. On the right,
 * a composition built in real 3D space — New York at the back, the studio's own photograph in the
 * middle, its work on a device in front, a slowly turning badge — that tilts toward the cursor,
 * opens through masked reveals and pulls apart in depth as you scroll.
 */
export default function AboutHero() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "chars", mask: "chars" });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(split.chars, { yPercent: 115, rotate: 7, transformOrigin: "0% 100%", duration: 1.2, ease: "expo.out", stagger: 0.035 })
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.07 }, 0.35)
        .fromTo(root.querySelector("[data-city]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0)
        .fromTo(root.querySelector("[data-city] img"), { scale: 1.35 }, { scale: 1.08, duration: 2.2, ease: "expo.out" }, 0)
        .fromTo(root.querySelector("[data-studio]"), { clipPath: "inset(0% 100% 0% 0%)", x: -40 }, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1.3, ease: "expo.inOut" }, 0.45)
        .fromTo(root.querySelector("[data-device]"), { yPercent: 40, opacity: 0, rotate: -6 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.6, ease: "expo.out" }, 0.75)
        .fromTo(root.querySelector("[data-badge]"), { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 1.4, ease: "expo.out" }, 0.9);

      // Scroll: the layers part in depth — the city drifts slowest, the device fastest
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(root.querySelector("[data-copy]"), { yPercent: -14, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-city]"), { yPercent: 8, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-studio]"), { yPercent: -30, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-device]"), { yPercent: -70, rotate: -5, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-badge] svg"), { rotate: 220, ease: "none", scrollTrigger: st });
      return () => split.revert();
    });

    // Desktop: the whole composition leans toward the cursor
    mm.add(DESKTOP_MOTION, () => {
      const stage = root.querySelector("[data-stage]");
      const rx = gsap.quickTo(stage, "rotationX", { duration: 1.1, ease: "power3.out" });
      const ry = gsap.quickTo(stage, "rotationY", { duration: 1.1, ease: "power3.out" });
      const move = (e) => { ry((e.clientX / innerWidth - 0.5) * 12); rx(-(e.clientY / innerHeight - 0.5) * 9); };
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const badge = ABOUT_HERO.badge; // set once: it fills the circle's 490-unit path

  return (
    <section ref={ref} id="about-hero" className={styles.hero} aria-labelledby="about-title">
      <div className={styles.copy} data-copy>
        <Label>{ABOUT_HERO.kicker}</Label>
        <h1 id="about-title" className={styles.title}>
          <span className="lm-sr-only">About {SITE.name}: </span>
          {ABOUT_HERO.title.map((w, i) => (
            <span key={w} className={`${styles.line} ${i === ABOUT_HERO.title.length - 1 ? styles.accent : ""}`} data-line>
              {w}{i < ABOUT_HERO.title.length - 1 && " "}
            </span>
          ))}
        </h1>
        <p className={styles.lede} data-wipe>{ABOUT_HERO.lede}</p>
        <dl className={styles.facts}>
          <div data-wipe><dt>Established</dt><dd>{SITE.established}</dd></div>
          <div data-wipe><dt>Studio</dt><dd>{SITE.street}</dd></div>
          <div data-wipe><dt>City</dt><dd>{SITE.locality}</dd></div>
        </dl>
        <div className={styles.actions} data-wipe>
          <MagneticButton href="/#contact" className={styles.btn}>Start a project</MagneticButton>
          <MagneticButton href="#story" variant="ghost" icon="↓" className={styles.btn}>Our story</MagneticButton>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.stage} data-stage>
          <figure className={styles.city} data-city>
            <Image src={ABOUT_HERO.city} alt="" fill priority sizes="(min-width: 1025px) 42vw, 92vw" />
          </figure>
          <figure className={styles.studio} data-studio>
            <Image src={ABOUT_HERO.studio} alt="" fill sizes="(min-width: 1025px) 30vw, 70vw" />
          </figure>
          <div className={styles.device} data-device>
            <Image src={ABOUT_HERO.device} alt="" sizes="(min-width: 1025px) 22vw, 50vw" />
          </div>
          <div className={styles.badge} data-badge>
            <svg viewBox="0 0 200 200">
              <defs><path id="lm-badge-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
              <text><textPath href="#lm-badge-path">{badge}</textPath></text>
            </svg>
            <span className={styles.badgeCore} />
          </div>
          <span className={styles.cross} />
        </div>
      </div>
    </section>
  );
}
