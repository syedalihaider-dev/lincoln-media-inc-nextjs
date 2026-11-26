import Button from "@/components/Common/Button";
import c from "./common.module.css";

/** Heading text split into characters for scroll reveals; screen readers get the plain text once. */
export function Chars({ text, attr = "data-char", className = "" }) {
  return (
    <>
      <span className={c.sr}>{text}</span>
      <span aria-hidden="true" className={`${c.chars} ${className}`}>
        {text.split(" ").map((word, w) => (
          <span key={w} className={c.word}>
            {[...word].map((ch, i) => <span key={i} className={c.ch}><span {...{ [attr]: "" }}>{ch}</span></span>)}
          </span>
        ))}
      </span>
    </>
  );
}

/** Words, each in its own mask, for word-level reveals */
export function Words({ text, attr = "data-word" }) {
  return (
    <>
      <span className={c.sr}>{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => <span key={i} className={c.wmask}><span {...{ [attr]: "" }}>{w}</span></span>)}
      </span>
    </>
  );
}

/** Sector · year line above a project name */
export const Kicker = ({ room, className = "", ...rest }) => (
  <p className={`${c.kicker} ${className}`} {...rest}>{room.sector}<i aria-hidden="true">·</i>{room.year}</p>
);

/** The project's facts — the museum wall label. Only what the case study states. */
export function Facts({ room, className = "", item }) {
  const rows = [["Client", room.name], ["Sector", room.sector], ["Year", room.year], ["Services", room.services]];
  return (
    <dl className={`${c.facts} ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={k === "Services" ? c.wide : undefined} {...(item ? { [item]: "" } : {})}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Link to the project's own case-study page */
export const ProjectLink = ({ room, variant = "text", ...rest }) => (
  <Button href={room.href} variant={variant} size="sm" aria-label={`View the ${room.name} case study`} {...rest}>View the case study</Button>
);
