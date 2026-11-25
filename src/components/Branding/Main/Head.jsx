import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The Branding page's section heading: a kicker set between hairlines, then a heavy Unbounded line
// rising out of its mask. tone="paper" on the light spreads.
export default function Head({ kicker, title, text, id, tone = "ink", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <p className={styles.kicker}>{kicker}</p>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
