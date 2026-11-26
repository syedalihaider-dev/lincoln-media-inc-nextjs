"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import styles from "./CTA.module.css";

/**
 * The platform page's close, on paper. The service's photograph rises inside an arch that opens from
 * a slit to its full shape as you arrive, beside the heavy capitals of the invitation; the other five
 * platforms follow as an index to keep exploring.
 */
export default function CTA({ data, siblings }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const arch = root.querySelector("[data-arch]");
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: arch, start: "top 95%", end: "center 55%", scrub: 0.7 } })
        .fromTo(arch, { clipPath: "inset(30% 46% 0% 46% round 999px 999px 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)" }, 0)
        .fromTo(arch.querySelector("img"), { scale: 1.35, yPercent: 8 }, { scale: 1, yPercent: 0 }, 0);
      const split = SplitText.create(root.querySelector("[data-title]"), { type: "lines", mask: "lines" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 65%", once: true } })
        .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out" })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.3);
      gsap.from(root.querySelectorAll("[data-sib]"), { y: 30, opacity: 0, duration: 1, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-sibs]"), start: "top 90%", once: true } });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="eci-cta">
      <div className={styles.main}>
        <div className={styles.copy}>
          <h2 id="eci-cta" className={styles.title} data-title>{data.title.map((l, i) => <span key={l} className={i === data.title.length - 1 ? styles.accent : undefined}>{l} </span>)}</h2>
          <p className={styles.text} data-rise>{data.text}</p>
          <div className={styles.actions} data-rise>
            <Button href="/contact-us#contact-form" size="lg">Start a project</Button>
            <Button href={`mailto:${SITE.email}`} variant="text" icon="mail">{SITE.email}</Button>
          </div>
        </div>
        <figure className={styles.arch} data-arch>
          <Image src={data.img} alt={data.alt} fill sizes="(max-width: 900px) 80vw, 34vw" />
        </figure>
      </div>
      <nav className={styles.sibs} aria-label="Other e-commerce platforms" data-sibs>
        <p>More e-commerce platforms</p>
        <ul>
          <li data-sib><a href="/services/ecommerce-web-development"><b>All e-commerce</b><span>Every platform and service</span></a></li>
          {siblings.map((s) => (
            <li key={s.path} data-sib><a href={s.path}><b>{s.name}</b><span>{s.text}</span></a></li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
