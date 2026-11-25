"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Button from "@/components/Common/Button";
import Head from "../Head";
import styles from "./Technology.module.css";

/**
 * Technology as a reading table, not a logo wall: the tool, what it does, what you get. Each row is
 * wiped on from the left while its three cells follow a beat apart; the last line is a call to
 * action, because the point of the stack is the result.
 */
export default function Technology({ data, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-row]", ref.current).forEach((r) => {
        gsap.timeline({ scrollTrigger: { trigger: r, start: "top 88%", once: true } })
          .fromTo(r, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" })
          .from(r.querySelectorAll("[data-cell]"), { y: 16, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 0.5);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.tech} aria-labelledby="eci-tech">
      <Head platform={platform} kicker={data.kicker} title={data.title} id="eci-tech" tone="ink" />
      <div className={styles.table} role="table" aria-label={`${platform} technology`}>
        <div className={styles.headRow} role="row">
          <span role="columnheader">Technology</span><span role="columnheader">What it does</span><span role="columnheader">What you get</span>
        </div>
        {data.rows.map((r) => (
          <div key={r.tech} className={styles.row} role="row" data-row>
            <strong role="cell" data-cell>{r.tech}</strong>
            <span role="cell" data-cell>{r.does}</span>
            <span role="cell" data-cell className={styles.get}>{r.get}</span>
          </div>
        ))}
      </div>
      <div className={styles.end}>
        <p>Not sure which of these your store needs?</p>
        <Button href="/#contact" size="md">Ask our {platform} team</Button>
      </div>
    </section>
  );
}
