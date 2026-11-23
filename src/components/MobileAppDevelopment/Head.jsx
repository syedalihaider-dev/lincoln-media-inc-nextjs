import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./Head.module.css";

// The Mobile App Development page's section heading: eyebrow, a large line rising out of its mask,
// and an optional paragraph. tone="light" for the paper sections.
export default function Head({ kicker, title, text, id, tone = "dark", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <Label className={styles.label}>{kicker}</Label>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text} data-head-text>{text}</p>}
    </header>
  );
}
