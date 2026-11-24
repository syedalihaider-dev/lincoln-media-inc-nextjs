"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import imgEmpire from "@public/images/home/empire.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import { Browser, Ui } from "../ui/Frames";
import { Landing, Checkout } from "../ui/Screens";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./PaidMedia.module.css";

// Three creatives for the same campaign — the deck the media team tests
const CREATIVES = [
  { img: imgDusk, pos: "50% 70%", line: "Autumn rates. Breakfast for two.", cta: "See the offer" },
  { img: imgTowers, pos: "50% 30%", line: "Midtown, from the 32nd floor.", cta: "View rooms" },
  { img: imgEmpire, pos: "40% 40%", line: "A weekend above Madison Avenue.", cta: "Book direct" },
];

/**
 * Ad → Landing page → Action, as one continuous zoom. A deck of creatives floats in depth with the
 * search ad and the sponsored post around it; as you scroll (held) the deck shuffles until the
 * winning creative is in front. It rushes toward you and the landing page opens out of it — same
 * image, same line — and then the page's own button opens into the confirmed booking.
 */
export default function PaidMedia({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const cards = gsap.utils.toArray("[data-card]", root);
    const words = gsap.utils.toArray("[data-word]", root);

    mm.add(PIN, () => {
      gsap.set(words.slice(1), { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: "+=320%", pin: true, scrub: 0.9, anticipatePin: 1 } });
      // the deck turns in space, then shuffles: each front card drops to the back
      tl.fromTo(q("[data-deck]"), { rotationY: -24, rotationX: 12 }, { rotationY: 8, rotationX: 4, duration: 1.6, ease: "none" }, 0);
      // (card 0 starts in front; the last card — the winning creative — is left facing you)
      cards.slice(0, -1).forEach((c, i) => {
        tl.to(c, { yPercent: -62, rotationZ: -8, duration: 0.3 }, 0.2 + i * 0.6)
          .to(c, { yPercent: 0, z: -420, rotationZ: 0, opacity: 0, duration: 0.3 }, 0.5 + i * 0.6)
          .to(cards.slice(i + 1), { z: (k) => -k * 90, rotationZ: 0, duration: 0.3 }, 0.5 + i * 0.6);
      });
      gsap.utils.toArray("[data-side]", root).forEach((s, i) => tl.to(s, { x: i ? "12vw" : "-12vw", z: -200, opacity: 0, duration: 0.6 }, 1.6));
      // the ad rushes at the camera and the landing page opens out of it
      const front = cards[cards.length - 1];
      tl.to(front, { z: 700, duration: 0.8, ease: "power2.in" }, 1.7)
        .to(front, { opacity: 0, duration: 0.15 }, 2.35)
        .fromTo(q("[data-portal]"), { clipPath: "inset(34% 38% 34% 38% round 22px)", autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", autoAlpha: 1, duration: 0.6, ease: "power3.out" }, 2.25)
        .fromTo(q("[data-portal] [data-page]"), { scale: 1.25 }, { scale: 1, duration: 0.8, ease: "power3.out" }, 2.25)
        .to(words[0], { "--on": 0, duration: 0.1 }, 2.25).to(words[1], { "--on": 1, duration: 0.1 }, 2.3)
        // the button opens into the booking
        .fromTo(q("[data-portal] [data-cta]"), { boxShadow: "0 0 0 0 rgba(54,228,208,0)" }, { boxShadow: "0 0 0 10px rgba(54,228,208,0.45)", duration: 0.25, yoyo: true, repeat: 1 }, 3.1)
        .fromTo(q("[data-action]"), { clipPath: "inset(78% 9% 12% 74% round 14px)", autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", autoAlpha: 1, duration: 0.7, ease: "power3.inOut" }, 3.5)
        .to(q("[data-action] [data-done]"), { autoAlpha: 1, duration: 0.3 }, 4.1)
        .from(q("[data-action] [data-done] > *"), { y: 24, opacity: 0, duration: 0.35, stagger: 0.06 }, 4.15)
        .to(words[1], { "--on": 0, duration: 0.1 }, 3.5).to(words[2], { "--on": 1, duration: 0.1 }, 3.55)
        .to({}, { duration: 0.4 });
    });

    mm.add(SMALL, () => {
      gsap.from(cards, { rotationZ: (i) => (i - 1) * 8, y: 60, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: q("[data-deck]"), start: "top 80%", once: true } });
      gsap.fromTo(q("[data-portal]"), { clipPath: "inset(10% 20% 10% 20% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: q("[data-portal]"), start: "top 90%", end: "top 40%", scrub: 0.5 } });
      gsap.fromTo(q("[data-action]"), { clipPath: "inset(70% 10% 10% 60% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: q("[data-action]"), start: "top 90%", end: "top 40%", scrub: 0.5 } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="paid-title" data-phase="Traffic">
      <div className={styles.copy}>
        <Label>{data.kicker}</Label>
        <h2 id="paid-title" className={styles.title}>
          {data.title.map((w, i) => (
            <span key={w} className={styles.word} data-word>{w}{i < data.title.length - 1 && <i aria-hidden="true"> →</i>}</span>
          ))}
        </h2>
        <p className={styles.text}>{data.text}</p>
        <ul className={styles.stages}>
          {data.stages.map((s) => <li key={s.name}><b>{s.name}</b> {s.text}</li>)}
        </ul>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.deck} data-deck>
          <div className={`${styles.side} ${styles.searchAd}`} data-side>
            <p className={styles.sp}>Sponsored · yourbrand.com</p>
            <b>Yourbrand Midtown — Autumn Park-View Rooms</b>
            <span>Breakfast for two included. Book direct for the best rate.</span>
          </div>
          <div className={`${styles.side} ${styles.social}`} data-side><Ui kind="post" /></div>
          {CREATIVES.map((c, i) => (
            <figure key={c.line} className={styles.card} style={{ "--i": i }} data-card>
              <Image src={c.img} alt="" fill sizes="(max-width: 900px) 70vw, 28vw" quality={75} style={{ objectFit: "cover", objectPosition: c.pos }} />
              <figcaption><small>Yourbrand · Sponsored</small><b>{c.line}</b><span>{c.cta}</span></figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.portal} data-portal>
          <div className={styles.page} data-page><Browser url="yourbrand.com/autumn?utm_source=paid"><Landing /></Browser></div>
        </div>
        <div className={styles.action} data-action>
          <div className={styles.page}><Browser url="yourbrand.com/book/park-view-king"><Checkout /></Browser></div>
        </div>
      </div>
    </section>
  );
}
