import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The platform pages' section heading: a dossier tab ("Shopify / Capabilities"), then an uppercase
// Unbounded line rising out of its mask. tone="ink" on the dark sections.
export default function Head({ platform, kicker, title, text, id, tone = "paper", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <p className={styles.tab}><b>{platform}</b><span>{kicker}</span></p>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
