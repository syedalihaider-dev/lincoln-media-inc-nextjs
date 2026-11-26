"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { Phone } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import styles from "./Hero.module.css";

/**
 * The platform page's opening, on paper. The platform's name is set across the full width in heavy
 * capitals that rise letter by letter; beneath it the service's photograph sits in a capsule that
 * widens into a full frame as it scrolls up the screen, while a phone holding the demo store climbs
 * over its edge and the facts slide in along the base.
 */
export default function Hero({ data, store }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(q("[data-name]"), { type: "words,chars", mask: "chars" });
      gsap.timeline({ delay: 0.1 })
        .from(split.chars, { yPercent: 105, duration: 1.2, stagger: 0.035, ease: "expo.out" })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.07, ease: "expo.out" }, 0.4);
      const frame = q("[data-frame]");
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: frame, start: "top 92%", end: "center 52%", scrub: 0.7 } })
        .fromTo(frame, { clipPath: "inset(0% 26% 0% 26% round 400px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)" }, 0)
        .fromTo(frame.querySelector("img"), { scale: 1.3 }, { scale: 1 }, 0)
        .fromTo(q("[data-phone]"), { yPercent: 40, rotation: 6 }, { yPercent: 0, rotation: -3 }, 0)
        .from(root.querySelectorAll("[data-fact]"), { x: -40, opacity: 0, stagger: 0.1 }, 0.3);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="eci-title">
      <div className={styles.top}>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/services/ecommerce-web-development">E-commerce</a></li>
            <li><span aria-current="page">{data.kicker}</span></li>
          </ol>
        </nav>
      </div>
      <h1 id="eci-title" className={styles.title} style={{ "--len": data.title.join(" ").length, "--word": Math.max(...data.title.map((w) => w.length)) }}>
        <span className={styles.name} data-name>{data.title.join(" ")}</span>
        <span className={styles.srOnly}> — {data.kicker}</span>
      </h1>
      <div className={styles.intro}>
        <p className={styles.sub} data-rise>{data.sub}</p>
        <div className={styles.leadCol}>
          <p className={styles.lead} data-rise>{data.lead}</p>
          <div className={styles.actions} data-rise>
            <Button href="/contact-us#contact-form" size="lg">Start a project</Button>
            <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
          </div>
        </div>
      </div>
      <div className={styles.visual}>
        <figure className={styles.frame} data-frame>
          <Image src={data.img} alt={data.alt} fill sizes="100vw" priority />
        </figure>
        <div className={styles.phone} data-phone aria-hidden="true">
          <Phone><Screen kind={data.screen} store={store} device="phone" /></Phone>
        </div>
        <ul className={styles.facts}>
          {data.facts.map((f) => <li key={f} data-fact>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}
