import RevealText from "@/components/Common/RevealText";
import styles from "./Head.module.css";

// The Video & Animation section heading: a slate-style kicker (a short rule and the label, like the
// line on a clapperboard), then the title rising out of its mask. tone="light" on white sections.
export default function Head({ kicker, title, text, id, tone = "dark", align = "start", as = "h2", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <p className={styles.kicker}><i aria-hidden="true" />{kicker}</p>
      <RevealText as={as} id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
