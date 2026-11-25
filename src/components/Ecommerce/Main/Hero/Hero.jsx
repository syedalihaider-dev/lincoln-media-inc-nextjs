"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Button from "@/components/Common/Button";
import VideoBackground from "@/components/Common/VideoBackground";
import { Browser, Phone, DemoTag } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import styles from "./Hero.module.css";

const PHONE_FLOW = ["product", "cart", "checkout", "confirm"]; // the phone walks one purchase while the hero holds

/**
 * The opening frame. Footage of a hand moving along a rail sits in a tall editorial window beside the
 * headline; a product page and a phone stand in front of it at different depths. On scroll (desktop:
 * held) the window opens to full bleed, the headline lifts away letter by letter, the interfaces
 * separate in depth and the phone carries the purchase from product to confirmation.
 */
export default function Hero({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (sel) => root.querySelector(sel);
    const screens = gsap.utils.toArray("[data-flow]", root);
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(q("[data-title]"), { type: "lines,chars", mask: "lines" });
      gsap.timeline({ delay: 0.1 })
        .from(split.chars, { yPercent: 120, duration: 1.3, ease: "expo.out", stagger: 0.025 })
        .from(q("[data-window]"), { clipPath: "inset(50% 30% 50% 70% round 24px)", duration: 1.8, ease: "expo.inOut" }, 0)
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.45)
        .from(q("[data-browser]"), { y: 120, opacity: 0, rotationX: 18, duration: 1.6 }, 0.6)
        .from(q("[data-phone]"), { y: 180, opacity: 0, duration: 1.6 }, 0.75);
      return () => split.revert();
    });

    mm.add(DESKTOP_MOTION, () => {
      gsap.set(screens.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.to(q("[data-window]"), { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .to(q("[data-shade]"), { opacity: 1, duration: 1 }, 0)
        .to(q("[data-copy]"), { yPercent: -30, autoAlpha: 0, duration: 0.55 }, 0.05)
        .to(q("[data-browser]"), { xPercent: -42, yPercent: -8, scale: 0.86, rotationY: 14, duration: 1 }, 0)
        .to(q("[data-phone]"), { xPercent: -30, yPercent: -26, rotationY: -10, duration: 1 }, 0)
        .to(q("[data-still]"), { yPercent: -70, autoAlpha: 0, duration: 0.7 }, 0)
        .to(q("[data-cue]"), { autoAlpha: 0, duration: 0.1 }, 0)
        .fromTo(q("[data-after]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.62);
      screens.slice(1).forEach((s, i) => tl.to(s, { autoAlpha: 1, duration: 0.08 }, 0.2 + i * 0.22));
    });
    // phones and tablets: no hold — a gentle drift as the hero leaves
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(q("[data-phone]"), { yPercent: -14, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.5 } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="ecom-title">
      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><span aria-current="page">{data.kicker}</span></li>
          </ol>
        </nav>
        <h1 id="ecom-title" className={styles.title} data-title>
          {data.title.map((l) => <span key={l} className={styles.tl}>{l} </span>)}
        </h1>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={data.secondary.href} variant="text" icon="down">{data.secondary.label}</Button>
        </div>
      </div>

      <div className={styles.scene} aria-hidden="true">
        <div className={styles.window} data-window>
          <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} tint={false} />
          <span className={styles.shade} data-shade />
        </div>
        <div className={styles.browserWrap} data-browser>
          <Browser url={`${data.store.domain}/products/field-chronograph`}>
            <Screen kind="product" store={data.store} />
          </Browser>
        </div>
        <div className={styles.phoneWrap} data-phone>
          <Phone>
            {PHONE_FLOW.map((k, i) => (
              <div key={k} className={styles.flow} data-flow>
                <Screen kind={k} store={data.store} device="phone" data={k === "product" ? { index: 1 } : {}} />
              </div>
            ))}
          </Phone>
        </div>
        <div className={styles.product} data-still>
          <Image src={data.product} alt="" fill sizes="(max-width: 900px) 30vw, 14vw" priority />
        </div>
      </div>

      <div className={styles.after} data-after aria-hidden="true">
        <DemoTag>Demo store · one purchase, start to finish</DemoTag>
        <p>From the first look to a confirmed order — designed as one experience.</p>
      </div>
      <p className={styles.cue} data-cue aria-hidden="true"><i />Scroll</p>
    </section>
  );
}
