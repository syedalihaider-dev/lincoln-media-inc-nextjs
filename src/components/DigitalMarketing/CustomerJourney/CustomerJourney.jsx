"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Head from "../Head";
import { Ui } from "../ui/Frames";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./CustomerJourney.module.css";

/**
 * From click to customer, as one camera move. Five scenes — the video that introduced the brand,
 * the guide that answered a question, the rooms compared, the checkout, the email that brought
 * them back — stand along a track. Held on desktop, the track travels sideways; each scene swings
 * round to face you as it reaches the centre and turns away as it leaves, the line along the top
 * fills and the booking confirms as Action passes. Phones: the scenes stack, each tilting up.
 */
export default function CustomerJourney({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const scenes = gsap.utils.toArray("[data-scene]", root);
    const labels = gsap.utils.toArray("[data-label]", root);

    mm.add(PIN, () => {
      const track = q("[data-track]");
      const dist = () => track.scrollWidth - root.clientWidth;
      const move = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() * 1.1}`, pin: true, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true },
      });
      gsap.fromTo(q("[data-fill]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() * 1.1}`, scrub: 0.9, invalidateOnRefresh: true } });
      scenes.forEach((s, i) => {
        const card = s.querySelector("[data-card]");
        // swings round to face the camera at the centre and away again, coming closest as it faces you
        gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: s, containerAnimation: move, start: "left right", end: "right left", scrub: true } })
          .fromTo(card, { rotationY: 38, z: -180 }, { rotationY: 0, z: 30, ease: "power1.out", duration: 1 })
          .to(card, { rotationY: -38, z: -180, ease: "power1.in", duration: 1 });
        ScrollTrigger.create({ trigger: s, containerAnimation: move, start: "left 55%", end: "right 55%", toggleClass: { targets: labels[i], className: styles.on } });
        const done = s.querySelector("[data-done]");
        if (done) gsap.to(done, { autoAlpha: 1, scrollTrigger: { trigger: s, containerAnimation: move, start: "center 55%", end: "center 45%", scrub: true } });
      });
    });

    mm.add(SMALL, () => {
      scenes.forEach((s) => gsap.fromTo(s.querySelector("[data-card]"), { rotationX: 24, y: 40, transformPerspective: 1000 }, { rotationX: 0, y: 0, ease: "none", scrollTrigger: { trigger: s, start: "top 95%", end: "top 45%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="journey-title" data-phase="Conversion">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="journey-title" />
        <ol className={styles.progress} aria-hidden="true">
          {data.stages.map((s) => <li key={s.name} data-label>{s.name}</li>)}
          <span className={styles.line}><i data-fill /></span>
        </ol>
      </div>

      <div className={styles.viewport}>
        <ol className={styles.track} data-track>
          {data.stages.map((s) => (
            <li key={s.name} className={`${styles.scene} ${s.screen === "reel" ? styles.phone : ""}`} data-scene>
              <div className={styles.card} data-card><Ui kind={s.screen} /></div>
              <div className={styles.caption}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
