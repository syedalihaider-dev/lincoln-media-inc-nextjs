"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Commits.module.css";

/**
 * The process as a project's history. A vertical branch line draws itself down the page as you
 * scroll (scrubbed); each stage is a commit on it — a node that pops when the line reaches it, its
 * message and description sliding in from the side, alternate commits branching left and right on
 * wide screens. The last one is tagged as the release.
 */
export default function Commits({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.fromTo(root.querySelector("[data-branch]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-log]"), start: "top 70%", end: "bottom 60%", scrub: 0.5 } });
      gsap.utils.toArray("[data-commit]", root).forEach((c, i) => {
        gsap.timeline({ scrollTrigger: { trigger: c, start: "top 68%", once: true } })
          .from(c.querySelector("[data-node]"), { scale: 0, duration: 0.5, ease: "back.out(3)" })
          .from(c.querySelector("[data-msg]"), { x: i % 2 ? 50 : -50, opacity: 0, duration: 0.9, ease: "expo.out" }, 0.1);
      });
    });
  });

  return (
    <section ref={ref} className={`${b.bp} ${b.deep} ${styles.section}`} aria-labelledby="pi-commits">
      <BPHead kicker={data.kicker} title={data.title} id="pi-commits" />
      <ol className={styles.log} data-log>
        <span className={styles.branch} data-branch aria-hidden="true" />
        {data.steps.map((s, i) => (
          <li key={s.name} className={`${styles.commit} ${i % 2 ? styles.right : ""}`} data-commit>
            <span className={`${styles.node} ${i === data.steps.length - 1 ? styles.release : ""}`} data-node aria-hidden="true" />
            <div className={styles.msg} data-msg>
              <code>{s.commit}</code>
              <h3>{s.name}{i === data.steps.length - 1 && <em>release</em>}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
