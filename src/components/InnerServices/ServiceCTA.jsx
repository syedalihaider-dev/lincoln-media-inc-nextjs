"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import ServiceButton from "./ServiceButton";
import styles from "./ServiceCTA.module.css";

/**
 * The conclusion. A glowing screen in the dark opens through a widening circle as you arrive, a
 * grid floor runs away beneath it into the distance, and the invitation flips up letter by letter
 * in 3D — then leans toward the cursor. Then the ways to answer: a call to action, phone, email.
 */
export default function ServiceCTA({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "chars,words", mask: "words" });
      // the word masks would clip the glow, so the split is undone once the letters have landed
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 55%", once: true }, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 100, rotationX: -90, transformOrigin: "50% 100% -20px", opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.022 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.5);
      gsap.fromTo(root.querySelector("[data-bg]"), { clipPath: "circle(12% at 50% 55%)" }, { clipPath: "circle(75% at 50% 55%)", ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "top 20%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-bg] img"), { scale: 1.35 }, { scale: 1.05, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const title = root.querySelector("[data-title]");
      const rx = gsap.quickTo(title, "rotationX", { duration: 1.2, ease: "power3.out" }), ry = gsap.quickTo(title, "rotationY", { duration: 1.2, ease: "power3.out" });
      const move = (e) => {
        const b = root.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
        ry((px - 0.5) * 10); rx(-(py - 0.5) * 8);
        root.style.setProperty("--sx", `${px * 100}%`); root.style.setProperty("--sy", `${py * 100}%`);
      };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.bg} data-bg aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" placeholder="blur" className={styles.img} />
      </div>
      <span className={styles.spot} aria-hidden="true" />
      <span className={styles.floor} aria-hidden="true" />

      <div className={styles.inner}>
        <div data-rise><Label>{data.kicker}</Label></div>
        <div className={styles.titleWrap}>
          <h2 id="cta-title" className={styles.title} data-title>
            <span data-l>{data.title[0]}</span>
            <span className={styles.em} data-l>{data.title[1]}</span>
          </h2>
        </div>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <ServiceButton href={data.primary.href} size="lg">{data.primary.label}</ServiceButton>
          <ServiceButton href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</ServiceButton>
        </div>
        <p className={styles.mail} data-rise>or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </section>
  );
}
