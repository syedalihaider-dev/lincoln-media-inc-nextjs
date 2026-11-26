import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

/**
 * A service-page section heading: kicker, title rising out of its mask, optional text.
 * Each page gives the kicker its own mark (`mark`) and colour world (`tone`), so the heading system
 * is shared while the pages keep their own identity.
 * tone: "dark" (on ink) · "light" (on paper)
 */
export default function Head({ kicker, title, text, id, mark, tone = "dark", align = "start", as = "h2", size = "lg", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${styles[size]} ${className}`}>
      {kicker && <p className={styles.kicker}>{mark ?? <i className={styles.dot} aria-hidden="true" />}<span>{kicker}</span></p>}
      <RevealText as={as} id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
