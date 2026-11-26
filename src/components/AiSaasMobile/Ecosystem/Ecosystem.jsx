"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import { Ic } from "../ui/Halden";
import styles from "./Ecosystem.module.css";

// What each hand-off actually looks like
const ARTEFACT = {
  users: () => (
    <div className={styles.form}><b>Report an issue</b><span className={styles.field}>Water dripping above the fuse box</span><span className={styles.field}>Unit 4B · hallway</span><span className={styles.send}>Send</span></div>
  ),
  product: () => (
    <div className={styles.inbox}><span className={styles.dot} /><div><b>Leak above electrical panel</b><span>Portal · Unit 4B · just now</span></div></div>
  ),
  ai: () => (
    <div className={styles.ai}><span className={styles.aiH}><Ic n="bolt" /> Classified</span><div className={styles.tags}><em className={styles.hot}>Urgent</em><em>Plumbing</em><em className={styles.warn}>Hazard</em></div><span className={styles.small}>Reply drafted · awaiting approval</span></div>
  ),
  data: () => (
    <pre className={styles.row}>{`jobs/job_5521
tenant   t_alvarez
property 22-northgate
status   scheduled
audit    assistant → alex`}</pre>
  ),
  integrations: () => (
    <ul className={styles.hooks}>{["calendar.event.created", "chat.message #on-call", "accounting.cost.added"].map((h) => <li key={h}><Ic n="check" /><code>{h}</code></li>)}</ul>
  ),
  business: () => (
    <div className={styles.report}><b>Response time by property</b>{[0.42, 0.66, 0.3, 0.84, 0.55].map((v, i) => <span key={i} style={{ "--v": v }}><i /></span>)}<span className={styles.small}>Demo report · illustrative</span></div>
  ),
};

/**
 * SaaS ecosystem — not a diagram of boxes but one request followed end to end. A signal travels a
 * rail through six stations; as it arrives, each station switches on and shows the real artefact
 * of that hand-off (the tenant's form, the inbox row, the classification, the record, the webhooks,
 * the owner's report).
 */
export default function Ecosystem({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(-1);
  const n = data.stations.length;

  useScene(ref, (mm, root) => {
    const run = (trigger) => {
      const tl = gsap.timeline({ scrollTrigger: { ...trigger, onUpdate: (st) => setAt(Math.min(n - 1, Math.floor(st.progress * n * 1.02 - 0.05))) } });
      tl.fromTo(root.querySelector("[data-rail]"), { "--p": 0 }, { "--p": 1, ease: "none", duration: 1 }, 0);
      return tl;
    };
    mm.add(PIN, () => run({ trigger: root, start: "top top", end: "+=170%", pin: true, scrub: 0.6 }));
    mm.add(SMALL, () => run({ trigger: root.querySelector("[data-rail]"), start: "top 70%", end: "bottom 60%", scrub: 0.6 }));
    mm.add("(prefers-reduced-motion: reduce)", () => setAt(n - 1));
  }, []);

  return (
    <section ref={ref} className={styles.eco} aria-labelledby="ai-eco">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-eco" size="md" tone="light" />
      <ol className={styles.rail} data-rail>
        <li className={styles.line} aria-hidden="true" role="presentation"><i /><b /></li>
        {data.stations.map((s, i) => {
          const A = ARTEFACT[s.key];
          return (
            <li key={s.key} className={`${styles.st} ${i <= at ? styles.on : ""} ${i === at ? styles.now : ""}`}>
              <span className={styles.node} aria-hidden="true" />
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <div className={styles.art} aria-hidden="true"><A /></div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
