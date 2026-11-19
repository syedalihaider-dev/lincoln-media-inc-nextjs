import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./SectionHead.module.css";

// The inner pages' section heading: a cyan-ruled eyebrow, a large line that rises out of its mask,
// and the drafting-table registration marks that run through the whole inner-service design
export default function SectionHead({ kicker, title, id, align = "start", className = "", children }) {
  return (
    <header className={`${styles.head} ${styles[align]} ${className}`}>
      <span className={styles.marks} aria-hidden="true" />
      <Label>{kicker}</Label>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {children}
    </header>
  );
}
