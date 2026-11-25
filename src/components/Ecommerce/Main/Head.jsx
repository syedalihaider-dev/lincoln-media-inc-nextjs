import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The category page's section heading: a small-caps kicker over a mixed-case editorial line (Unbounded 500),
// rising out of its mask. tone="paper" on the light sections.
export default function Head({ kicker, title, text, id, tone = "dark", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <p className={styles.kicker}><span>{kicker}</span></p>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
