"use client";
import { useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View from "@/components/DesignKit/View";
import { useScene, PIN } from "@/components/DigitalMarketing/shared";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as files in a project. The section is an editor window: an explorer listing one file
 * per capability, a tab bar and a preview pane. Held on desktop, scrolling opens the files one after
 * another — the explorer highlight and the active tab moving down the project — and the pane swaps to
 * that capability's name, description and its own browser, code or design view, wiping in from the
 * left. Phones: every capability in order, with its view.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const items = data.items;
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      ScrollTrigger.create({ trigger: root, start: "top top", end: `+=${items.length * 40}%`, pin: true, scrub: true, anticipatePin: 1, onUpdate: (s) => setAt(Math.min(items.length - 1, Math.floor(s.progress * items.length))) });
    });
  });

  const cur = items[at];
  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-caps">
      <Head kicker={data.kicker} title={data.title} id="psd-caps" className={styles.head} />
      <div className={styles.ide}>
        <aside className={styles.explorer} aria-hidden="true">
          <p>Project</p>
          {items.map((c, i) => <span key={c.file} className={i === at ? styles.on : ""}>{c.file}</span>)}
        </aside>
        <div className={styles.main}>
          <div className={styles.tabs} aria-hidden="true">{items.map((c, i) => <span key={c.file} className={i === at ? styles.tOn : ""}>{c.file}</span>)}</div>
          <div className={styles.pane} key={cur.file}>
            <div className={styles.text}>
              <h3>{cur.name}</h3>
              <p>{cur.text}</p>
            </div>
            <div className={styles.view} aria-hidden="true"><View view={cur.view} fid={cur.fid} /></div>
          </div>
        </div>
      </div>
      {/* every capability, for phones, reduced motion and assistive tech */}
      <ul className={styles.list}>
        {items.map((c) => (
          <li key={c.file}><code>{c.file}</code><h3>{c.name}</h3><p>{c.text}</p><div aria-hidden="true"><View view={c.view} fid={c.fid} /></div></li>
        ))}
      </ul>
    </section>
  );
}
