import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The child pages' section heading: the section's name in a drawing-sheet tag, then the line itself
export default function Head({ kicker, title, id, className = "", tone = "dark" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${className}`}>
      <p className={styles.tag}><i aria-hidden="true" />{kicker}</p>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
    </header>
  );
}
