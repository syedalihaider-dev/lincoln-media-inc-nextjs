"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import { Browser } from "@/components/DesignKit/Devices";
import Site from "@/components/DesignKit/Site";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./CTA.module.css";

/**
 * The close, as a page loading. The photograph of a developer at work rises into view from the
 * bottom edge; beside the invitation, a browser's loading bar runs across its address bar, the
 * page's grey skeleton gives way to the finished site, and the window tilts forward in perspective.
 * The headline types its words in. Below: ways to reach the studio and the related services.
 */
export default function CTA({ data, links = [] }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-photo]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: root, start: "top 90%", end: "top 20%", scrub: 0.6 } });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", end: "top 10%", scrub: 0.6 } })
        .fromTo(q("[data-load]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 0.6 }, 0)
        .to(q("[data-load]"), { opacity: 0, duration: 0.1 }, 0.62)
        .fromTo(q("[data-skel]"), { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0.6)
        .fromTo(q("[data-win]"), { rotationY: -24, rotationX: 10, z: -200 }, { rotationY: -10, rotationX: 4, z: 0, duration: 1 }, 0);
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 40%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.07 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.3);
      return () => split.revert();
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="psd-cta">
      <figure className={styles.photo} data-photo aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} />
      </figure>
      <div className={styles.body}>
        <div className={styles.inner}>
          <div data-rise><Label>{data.kicker}</Label></div>
          <h2 id="psd-cta" className={styles.title}><span data-l>{data.title[0]}</span><span className={styles.em} data-l>{data.title[1]}</span></h2>
          <p className={styles.text} data-rise>{data.text}</p>
          <div className={styles.actions} data-rise>
            <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
            <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
          </div>
          <address className={styles.contact} data-rise><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span>{SITE.street}, {SITE.locality}</span></address>
        </div>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.win} data-win>
            <Browser url="meridian.example"><Site /></Browser>
            <span className={styles.load} data-load />
            <span className={styles.skel} data-skel><i /><i /><i /><i /></span>
          </div>
        </div>
      </div>
      {links.length > 0 && (
        <nav className={styles.links} aria-label="Related services">
          <p>Related services</p>
          <ul>{links.map((l) => <li key={l.path}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}</ul>
        </nav>
      )}
    </section>
  );
}
