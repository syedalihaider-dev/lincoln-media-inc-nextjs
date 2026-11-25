import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The service pages' heading, set like a brand book: a running folio ("Logo Design · The challenge")
// over a mixed-case Unbounded line. tone="ink" on the dark sections.
export default function Head({ service, kicker, title, text, id, tone = "paper", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <p className={styles.folio}><span>{service}</span><i aria-hidden="true" /><span>{kicker}</span></p>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
