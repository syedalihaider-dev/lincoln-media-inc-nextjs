"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Device, { Screen } from "@/components/MobileApp/Device";
import Head from "../Head";
import { Ui } from "../ui/Frames";
import { Reel, Post, Story, Replies } from "../ui/Screens";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./SocialContent.module.css";

// What the feed around the main phone is made of — the campaign's other posts
const LEFT = ["story", "post", "replies", "story"];
const RIGHT = ["post", "story", "post", "replies"];
const MAIN = [Reel, Post, Story, Replies]; // one per beat, in order

/**
 * Vertical storytelling, told the way a feed moves. A solid phone stands in the middle; two
 * columns of the campaign's other posts stream past it — one up, one down — as you scroll (held).
 * At each beat the main screen is wiped upward to the next format: short-form video, a branded
 * post, a story with a poll, then the replies. The matching beat lights up on the left, and the
 * room's light drifts as the phone turns. Phones: the main phone alone, changing as you pass.
 */
export default function SocialContent({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const layers = gsap.utils.toArray("[data-main] [data-layer]", root);
    const beats = gsap.utils.toArray("[data-beat]", root);

    const swap = (tl, step = 1) => {
      gsap.set(layers.slice(1), { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(beats.slice(1), { "--on": 0 });
      layers.slice(1).forEach((l, i) => {
        const at = (i + 1) * step;
        tl.to(l, { clipPath: "inset(0% 0% 0% 0%)", duration: step * 0.35, ease: "power3.inOut" }, at - step * 0.2)
          .to(beats[i], { "--on": 0, duration: 0.1 }, at - step * 0.2)
          .to(beats[i + 1], { "--on": 1, duration: 0.1 }, at - step * 0.1);
      });
      return tl;
    };

    mm.add(PIN, () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "+=300%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(q("[data-col-a]"), { yPercent: 8 }, { yPercent: -46, duration: 4 }, 0)
        .fromTo(q("[data-col-b]"), { yPercent: -46 }, { yPercent: 6, duration: 4 }, 0)
        .fromTo(q("[data-device]"), { rotationY: -22, rotationX: 8 }, { rotationY: 16, rotationX: 2, duration: 4 }, 0)
        .fromTo(q("[data-light]"), { xPercent: -30, yPercent: 10 }, { xPercent: 30, yPercent: -10, duration: 4 }, 0);
      swap(tl, 1);
    });
    mm.add(SMALL, () => {
      swap(gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q("[data-main]"), start: "top 70%", end: "bottom 20%", scrub: 0.6 } }), 1);
    });
  });

  const col = (list, attr) => (
    <div className={styles.col} {...{ [attr]: "" }}>
      {list.map((k, i) => <div key={i} className={styles.thumb}><Ui kind={k} /></div>)}
    </div>
  );

  return (
    <section ref={ref} className={styles.section} aria-labelledby="social-title" data-phase="Engagement">
      <span className={styles.light} data-light aria-hidden="true" />
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="social-title" />
        <ol className={styles.beats}>
          {data.beats.map((b) => <li key={b.name} className={styles.beat} data-beat><b>{b.name}</b><span>{b.text}</span></li>)}
        </ol>
      </div>

      <div className={styles.stage} aria-hidden="true">
        {col(LEFT, "data-col-a")}
        <div className={styles.main} data-main>
          <Device depth={14} data-device className={styles.device}>
            {MAIN.map((C, i) => <Screen key={i}><C /></Screen>)}
          </Device>
        </div>
        {col(RIGHT, "data-col-b")}
      </div>
    </section>
  );
}
