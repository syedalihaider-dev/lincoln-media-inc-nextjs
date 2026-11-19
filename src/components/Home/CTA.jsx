"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import VideoBackground from "@/components/Common/VideoBackground";
import MagneticButton from "@/components/Common/MagneticButton";
import styles from "./CTA.module.css";

/**
 * Chapter XII — the closing scene. New York at night opens from a small window to the whole
 * screen while the last line assembles from both sides; then the stage hands over to the form.
 */
export default function CTA() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-pin]")[0], start: "top top", end: "+=170%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(q("[data-window]"), { clipPath: "inset(30% 36% 30% 36% round 220px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(q("[data-window] video"), { scale: 1.45 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
        .from(q("[data-l='1']"), { xPercent: -60, opacity: 0, ease: "power3.out", duration: 0.7 }, 0.25)
        .from(q("[data-l='2']"), { xPercent: 60, opacity: 0, ease: "power3.out", duration: 0.7 }, 0.35)
        .from(q("[data-l='3']"), { yPercent: 80, opacity: 0, ease: "power3.out", duration: 0.7 }, 0.45)
        .from(q("[data-after]"), { y: 40, opacity: 0, ease: "power3.out", duration: 0.4 }, 0.8);
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(q("[data-l]"), { yPercent: 60, opacity: 0, stagger: 0.12, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="cta" className={styles.section} data-chapter="Let's talk" data-nav="contact" aria-labelledby="cta-title">
      <div className={styles.pin} data-pin>
        <div className={styles.window} data-window>
          <VideoBackground src="/videos/nyc-night.mp4" mobileSrc="/videos/nyc-night-mobile.mp4" poster="/videos/nyc-night-poster.jpg" />
        </div>
        <div className={styles.copy}>
          <p className={styles.kicker} data-after>12 / 13 — {SITE.city}, after hours</p>
          <h2 id="cta-title" className={styles.title}>
            <span data-l="1">Let&apos;s create</span>
            <span data-l="2"><em>something</em></span>
            <span data-l="3">unexpected.</span>
          </h2>
          <div className={styles.after} data-after>
            <p>Tell us what you&apos;re building. We&apos;ll come back with a plan, a team and a timeline.</p>
            <div className={styles.btns}>
              <MagneticButton href="#contact" size="lg" icon="↓">Start a project</MagneticButton>
              <MagneticButton href="/" variant="ghost" size="lg">Get your AI build plan</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
