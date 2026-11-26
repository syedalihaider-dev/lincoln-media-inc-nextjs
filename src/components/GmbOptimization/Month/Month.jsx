"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import styles from "./Month.module.css";

const DAYS = 30, LEAD = 2; // a 30-day month starting on a Wednesday
// what lands on which day (1-based), keyed to the deliverables
const EVENTS = [
  { d: 1, k: "setup", t: "Profile check", soft: true },
  { d: 1, k: "verify", t: "Verification", soft: true },
  { d: 2, k: "hours", t: "Hours review" },
  { d: 3, k: "cat", t: "Categories & labels" },
  { d: 6, k: "post", t: "Post" },
  { d: 8, k: "photo", t: "New photos" },
  { d: 13, k: "post", t: "Post" },
  { d: 15, k: "insight", t: "Insights review" },
  { d: 20, k: "post", t: "Post" },
  { d: 22, k: "photo", t: "Product photos" },
  { d: 24, k: "hours", t: "Holiday hours" },
  { d: 27, k: "post", t: "Post" },
  { d: 30, k: "report", t: "Monthly report", big: true },
];
const first = {};
EVENTS.forEach((e) => { if (first[e.k] == null) first[e.k] = e.d; });
first.watch = 1;

/**
 * What's included — a managed month. A day cursor sweeps a calendar as you scroll; posts, photo
 * updates, hours and category work, the insights review and the monthly report land on their days,
 * a monitoring trace runs underneath every day, and each deliverable ticks off in the list as its
 * first piece of work appears.
 */
export default function Month({ data }) {
  const ref = useRef(null);
  const [day, setDay] = useState(DAYS);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      setDay(0);
      const evs = gsap.utils.toArray("[data-ev]", root);
      gsap.set(evs, { opacity: 0, y: 12, scale: 0.92 });
      gsap.set(root.querySelector("[data-trace]"), { scaleX: 0 });
      let last = -1;
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 30%", end: "bottom bottom", scrub: 0.6,
        onUpdate: (st) => {
          const d = Math.round(st.progress * DAYS);
          if (d === last) return;
          last = d; setDay(d);
          evs.forEach((el) => gsap.to(el, { opacity: +el.dataset.ev <= d ? 1 : 0, y: +el.dataset.ev <= d ? 0 : 12, scale: +el.dataset.ev <= d ? 1 : 0.92, duration: 0.45, ease: "back.out(1.7)", overwrite: true }));
        } } })
        .to(root.querySelector("[data-trace]"), { scaleX: 1, ease: "none" }, 0);
    });
  }, []);

  const cells = Array.from({ length: LEAD + DAYS }, (_, i) => i - LEAD + 1);
  return (
    <section ref={ref} className={styles.month} aria-labelledby="gmb-month">
      <div className={styles.inner}>
        <div className={styles.side}>
          <Head kicker={data.kicker} title={data.title} text={data.text} id="gmb-month" tone="light" size="md" />
          <ul className={styles.list}>
            {data.deliverables.map((x) => (
              <li key={x.key} className={day >= first[x.key] ? styles.done : ""}><i aria-hidden="true" />{x.name}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cal} aria-hidden="true">
          <div className={styles.calHead}><b>Your profile · this month</b><span>Managed by The Lincoln Media</span></div>
          <div className={styles.week}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => <span key={w}>{w}</span>)}</div>
          <div className={styles.grid}>
            {cells.map((c, i) => (
              <div key={i} className={`${styles.cell} ${c < 1 ? styles.blank : ""} ${c === day ? styles.today : ""} ${c > 0 && c < day ? styles.past : ""}`}>
                {c > 0 && <span className={styles.num}>{c}</span>}
                {EVENTS.filter((e) => e.d === c).map((e) => (
                  <span key={e.k + e.t} data-ev={e.d} className={`${styles.ev} ${styles["e_" + e.k]} ${e.soft ? styles.soft : ""} ${e.big ? styles.big : ""}`}>{e.t}</span>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.watch}><span>Listing monitoring</span><div><i data-trace /></div></div>
        </div>
      </div>
    </section>
  );
}
