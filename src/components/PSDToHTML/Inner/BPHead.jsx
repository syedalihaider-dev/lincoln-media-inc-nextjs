import RevealText from "@/components/Common/RevealText";
import b from "./blueprint.module.css";

// Section heading for the blueprint pages: a ruled label, a title rising from its mask, optional text
export default function BPHead({ kicker, title, text, id, className = "" }) {
  return (
    <header className={`${b.head} ${className}`}>
      <p className={b.kicker}>{kicker}</p>
      <RevealText id={id} className={b.title}>{title}</RevealText>
      {text && <p className={b.lede}>{text}</p>}
    </header>
  );
}
