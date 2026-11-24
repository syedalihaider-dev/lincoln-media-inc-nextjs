"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { CASE_STUDIES } from "@/data/work";
import SectionLabel from "@/components/Common/SectionLabel";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import styles from "./WorkShowcase.module.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Chapter IV — Selected work. A smoke-filled title card, then a pinned horizontal gallery:
 * each project's photograph settles from a zoom as it slides in, names overlap the frames,
 * a counter keeps place. Phones get a vertical sequence of masked reveals.
 */
export default function WorkShowcase() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const total = CASE_STUDIES.length;

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Title card: the words separate as you pass through them
      const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-intro]")[0], start: "top top", end: "bottom top", scrub: 0.6 } });
      tl.to(q("[data-big='a']"), { xPercent: -14, ease: "none" }, 0)
        .to(q("[data-big='b']"), { xPercent: 12, ease: "none" }, 0)
        .to(q("[data-intro-inner]"), { opacity: 0.1, scale: 0.94, ease: "none" }, 0);
      gsap.from(q("[data-big] > span"), { yPercent: 110, duration: 1.4, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: q("[data-intro]")[0], start: "top 70%", once: true } });
    });

    mm.add(DESKTOP_MOTION, () => {
      const wrap = q("[data-pin]")[0], track = q("[data-track]")[0];
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.9, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (st) => {
            ref.current.style.setProperty("--wp", st.progress.toFixed(4));
            const n = q("[data-count]")[0];
            if (n) n.textContent = pad(Math.min(total, 1 + Math.floor(st.progress * total * 0.999)));
          },
        },
      });
      q("[data-card]").forEach((card) => {
        const img = card.querySelector("img");
        gsap.fromTo(img, { scale: 1.35, xPercent: -8 }, { scale: 1, xPercent: 8, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        gsap.from(card.querySelector("[data-name]"), { xPercent: 30, opacity: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 90%", end: "left 40%", scrub: true } });
      });
    });

    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      q("[data-card] figure").forEach((f) =>
        gsap.fromTo(f, { clipPath: "inset(14% 8% 14% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 95%", end: "top 45%", scrub: 0.5 } })
      );
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="work" className={styles.section} data-chapter="Work" data-nav="work" aria-labelledby="work-title">
      <div className={styles.intro} data-intro>
        <VideoBackground src="/videos/smoke.mp4" mobileSrc="/videos/smoke-mobile.mp4" poster="/videos/smoke-poster.jpg" className={styles.smoke} tint={false} />
        <div className={styles.introInner} data-intro-inner>
          <SectionLabel index="04">Selected work</SectionLabel>
          <h2 id="work-title" className={styles.big}>
            <span className={styles.bigLine} data-big="a"><span>Built to perform.</span></span>
            <span className={`${styles.bigLine} ${styles.bigRight}`} data-big="b"><span><em>Designed to be felt.</em></span></span>
          </h2>
          <p className={styles.introNote}>
            <span>({pad(total)})</span> Case studies across property, fintech, retail, SaaS, food and recruitment.
          </p>
        </div>
      </div>

      <div className={styles.pin} data-pin>
        <div className={styles.track} data-track>
          {CASE_STUDIES.map((c, i) => (
            <a key={c.slug} href={`/work/${c.slug}`} className={`${styles.card} ${i % 2 ? styles.low : ""}`} data-card aria-label={`${c.name} — ${c.sector}, ${c.year}. View case study`}>
              <figure className={styles.media}>
                <Image src={c.image} alt={c.alt} fill sizes="(max-width: 900px) 92vw, 58vw" quality={80} placeholder="blur" />
              </figure>
              <div className={styles.meta}>
                <p className={styles.kick}><span>{pad(i + 1)}</span><span>{c.sector}</span><span>{c.year}</span></p>
                <h3 className={styles.name} data-name>{c.name}</h3>
                <p className={styles.brief}>{c.brief}</p>
                <p className={styles.tags}>{c.services}</p>
              </div>
            </a>
          ))}
          <div className={styles.outro}>
            <p className={styles.outroText}>Eight brands, eight different problems. <em>Yours could be next.</em></p>
            <Button href="#contact">Start a project</Button>
          </div>
        </div>
        <div className={styles.hud} aria-hidden="true">
          <span><b data-count>01</b> / {pad(total)}</span>
          <span className={styles.bar}><i /></span>
          <span>Scroll to browse</span>
        </div>
      </div>
    </section>
  );
}
