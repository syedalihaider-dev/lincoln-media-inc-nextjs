import Image from "next/image";
import styles from "./MockSite.module.css";

/**
 * A small, generic website built in HTML — not a screenshot — so it genuinely reflows: it sizes
 * itself with container queries, and the same markup lays out as desktop, tablet or phone depending
 * on the frame it sits in. Decorative (aria-hidden): no real brand, no claims.
 * variant "wire" draws it as a wireframe (used for the "beneath the surface" layer).
 */
export default function MockSite({ image, url = "yourbrand.com", variant = "full", sizes = "40vw", chrome = true }) {
  return (
    <div className={`${styles.site} ${styles[variant]}`} aria-hidden="true">
      {chrome && (
        <div className={styles.chrome}><i /><i /><i /><span>{url}</span></div>
      )}
      <div className={styles.page}>
        <header className={styles.nav}>
          <b className={styles.logo}><i />yourbrand</b>
          <span className={styles.links}><em>Work</em><em>About</em><em>Services</em><em>Contact</em></span>
          <span className={styles.burger}><i /><i /></span>
        </header>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>New collection</p>
            <p className={styles.h1}>Your brand, online.</p>
            <p className={styles.p}>A short line that says what you do and who it is for.</p>
            <span className={styles.btn}>Get started</span>
          </div>
          <div className={styles.media}>
            {image && variant !== "wire" && <Image src={image} alt="" fill sizes={sizes} className={styles.img} />}
          </div>
        </div>
        <div className={styles.cards}>
          {[0, 1, 2].map((i) => <div key={i} className={styles.card}><span /><b /><em /></div>)}
        </div>
      </div>
    </div>
  );
}
