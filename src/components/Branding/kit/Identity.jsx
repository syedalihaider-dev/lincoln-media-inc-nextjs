import Image from "next/image";
import s from "./Identity.module.css";

/**
 * Identity artefacts for the demo brands (src/data/branding/brands.js), in real HTML/CSS/SVG.
 * Every artefact is a size container: its contents are measured in cqw, so one card, label or poster
 * renders correctly at any size. Colours come from the brand: --ink, --paper, --acc, --alt.
 */
const vars = (b) => ({ "--ink": b.colors[0].hex, "--paper": b.colors[1].hex, "--acc": b.colors[2].hex, "--alt": b.colors[3].hex });
// the brand's palette as page-level tokens (--b0 ink · --b1 paper · --b2 accent · --b3 second colour)
export const brandVars = (b) => Object.fromEntries(b.colors.map((c, i) => [`--b${i}`, c.hex]));
const Art = ({ brand, className = "", ratio, children, ...rest }) => (
  <div className={`${s.art} ${className}`} style={{ ...vars(brand), ...(ratio ? { aspectRatio: ratio } : {}) }} {...rest}>
    <div className={s.in}>{children}</div>
  </div>
);

/* The mark: a simple geometric symbol per brand, drawn in SVG */
export function Mark({ brand, tone = "ink", className = "" }) {
  const c = tone === "paper" ? "var(--paper)" : tone === "acc" ? "var(--acc)" : "var(--ink)";
  const shapes = {
    sun: <><circle cx="50" cy="50" r="40" fill={c} /><rect x="6" y="56" width="88" height="7" fill="var(--hole, var(--paper))" /><rect x="6" y="70" width="88" height="5" fill="var(--hole, var(--paper))" /></>,
    peak: <><path d="M8 84 L42 22 L58 50 L68 36 L92 84 Z" fill={c} /><path d="M42 22 L50 37 L44 41 L38 34 Z" fill="var(--hole, var(--paper))" /></>,
    square: <><rect x="10" y="10" width="80" height="80" fill={c} /><path d="M66 34 A22 22 0 1 0 66 66" fill="none" stroke="var(--hole, var(--paper))" strokeWidth="9" /></>,
    arch: <><path d="M14 92 V48 A36 36 0 0 1 86 48 V92 Z" fill={c} /><path d="M38 92 V58 A12 12 0 0 1 62 58 V92 Z" fill="var(--hole, var(--paper))" /></>,
    stripes: <><circle cx="50" cy="50" r="42" fill={c} /><rect x="8" y="34" width="84" height="6" fill="var(--hole, var(--paper))" /><rect x="8" y="48" width="84" height="6" fill="var(--hole, var(--paper))" /><rect x="8" y="62" width="84" height="6" fill="var(--hole, var(--paper))" /></>,
    leaf: <><path d="M50 8 C82 26 86 64 50 92 C14 64 18 26 50 8 Z" fill={c} /><path d="M50 22 V86" stroke="var(--hole, var(--paper))" strokeWidth="5" /></>,
  };
  return <svg viewBox="0 0 100 100" className={`${s.mark} ${className}`} aria-hidden="true">{shapes[brand.mark.shape]}</svg>;
}

export function Wordmark({ brand, tone = "ink", stacked = false, className = "" }) {
  return (
    <span className={`${s.wordmark} ${stacked ? s.stacked : ""} ${s[`t_${tone}`]} ${className}`} style={vars(brand)}>
      <Mark brand={brand} tone={tone} />
      <b className={brand.lower ? s.lower : ""}>{brand.lower ? brand.name.toLowerCase() : brand.name}</b>
    </span>
  );
}

export function Swatches({ brand, className = "" }) {
  return (
    <Art brand={brand} className={`${s.swatches} ${className}`} ratio="16 / 10">
      {brand.colors.map((c, i) => (
        <span key={c.hex} style={{ background: c.hex, color: i === 1 ? brand.colors[0].hex : brand.colors[1].hex }}>
          <b>{c.name}</b><small>{c.hex.toUpperCase()}</small>
        </span>
      ))}
    </Art>
  );
}

export function TypeSpecimen({ brand, className = "" }) {
  return (
    <Art brand={brand} className={`${s.specimen} ${className}`} ratio="16 / 10">
      <div className={s.specA}><small>Display</small><b>Aa</b><span>Unbounded · Bold</span></div>
      <div className={s.specB}><small>Text</small><p>{brand.idea} {brand.full} writes plainly, warmly and with intent.</p><span>Poppins · Regular / Medium</span></div>
      <p className={s.specLine}>ABCDEFGHIJKLM<br />nopqrstuvwxyz 0123456789</p>
    </Art>
  );
}

export function Card({ brand, side = "front", finish = "", className = "" }) {
  return (
    <Art brand={brand} className={`${s.card} ${s[side]} ${finish ? s[finish] : ""} ${className}`} ratio="85 / 55">
      {side === "front" ? (
        <><Wordmark brand={brand} tone="paper" /><small className={s.cardDesc}>{brand.descriptor}</small></>
      ) : (
        <>
          <div className={s.cardWho}><b>{brand.person.name}</b><span>{brand.person.role}</span></div>
          <div className={s.cardHow}><span>{brand.person.email}</span><span>{brand.person.phone}</span><span>{brand.domain}</span></div>
          <Mark brand={brand} className={s.cardMark} />
        </>
      )}
    </Art>
  );
}

export function Letterhead({ brand, className = "" }) {
  return (
    <Art brand={brand} className={`${s.letter} ${className}`} ratio="210 / 297">
      <header><Wordmark brand={brand} /><small>{brand.address}<br />{brand.domain}</small></header>
      <p className={s.lDate}>25 November 2026</p>
      <p className={s.lBody}>Dear Alex,<br /><br />Thank you for meeting with us this week. As discussed, we've set out the next steps below, with the people responsible and the decisions we'll need from you along the way.</p>
      <p className={s.lBody}>We look forward to working together.</p>
      <p className={s.lSign}><b>{brand.person.name}</b><br />{brand.person.role}</p>
      <footer><span /></footer>
    </Art>
  );
}

export function Spread({ brand, img, alt = "", title, className = "" }) {
  return (
    <Art brand={brand} className={`${s.spread} ${className}`} ratio="2 / 1.3">
      <div className={s.spL}>
        {img && <span className={s.spImg}><Image src={img} alt={alt} fill sizes="40vw" /></span>}
        <small className={s.spFolio}>02 — {brand.full}</small>
      </div>
      <div className={s.spR}>
        <small>Company profile</small>
        <h4>{title || brand.idea}</h4>
        <div className={s.spCols}>
          <p>{brand.full} was founded on a simple idea: {brand.idea.toLowerCase()} Everything we make starts from it.</p>
          <p>This profile sets out who we are, how we work and what partners can expect from us — in plain words.</p>
        </div>
        <div className={s.spFacts}><span><b>Founded</b>New York</span><span><b>Focus</b>{brand.descriptor.split("·")[0]}</span></div>
        <small className={s.spFolio}>03</small>
      </div>
    </Art>
  );
}

export function Label({ brand, product = brand.label?.product || "Breakfast Blend", note = brand.label?.note || "Whole bean · 340 g", lines = brand.label?.lines || ["Notes of cocoa, orange peel and honey", "Roasted in small batches"], className = "" }) {
  return (
    <Art brand={brand} className={`${s.label} ${className}`} ratio="3 / 4">
      <Wordmark brand={brand} stacked tone="ink" />
      <div className={s.lbBand}><b>{product}</b><small>{note}</small></div>
      <ul className={s.lbNotes}>{lines.map((l) => <li key={l}>{l}</li>)}</ul>
      <small className={s.lbFoot}>{brand.domain}</small>
    </Art>
  );
}

export function Poster({ brand, img, className = "" }) {
  return (
    <Art brand={brand} className={`${s.poster} ${className}`} ratio="2 / 3">
      {img && <span className={s.poImg}><Image src={img} alt="" fill sizes="30vw" /></span>}
      <h4>{brand.line}</h4>
      <div className={s.poFoot}><Wordmark brand={brand} tone="paper" /><small>{brand.domain}</small></div>
    </Art>
  );
}

export function Social({ brand, img, kind = "post", className = "" }) {
  return (
    <Art brand={brand} className={`${s.social} ${s[kind]} ${className}`} ratio="4 / 5">
      <header><Mark brand={brand} tone="paper" /><b>{brand.handle}</b></header>
      <div className={s.soBody}>
        {img ? <span className={s.soImg}><Image src={img} alt="" fill sizes="20vw" /></span> : null}
        <p>{kind === "quote" ? `“${brand.idea}”` : brand.line}</p>
      </div>
      <footer><i /><i /><i /></footer>
    </Art>
  );
}

export function Slide({ brand, title = brand.slide?.title || "Where we go next", items = brand.slide?.items || ["Open a second roastery", "Launch the subscription", "Wholesale to more cafés"], className = "" }) {
  return (
    <Art brand={brand} className={`${s.slide} ${className}`} ratio="16 / 9">
      <small>{brand.full} · Annual review</small>
      <h4>{title}</h4>
      <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
      <Wordmark brand={brand} className={s.slMark} />
    </Art>
  );
}

export function Site({ brand, img, className = "" }) {
  const nav = brand.site?.nav || ["Shop", "Cafés", "Journal", "Wholesale"];
  return (
    <Art brand={brand} className={`${s.site} ${className}`} ratio="16 / 10">
      <nav><Wordmark brand={brand} />{nav.map((n) => <span key={n}>{n}</span>)}<em>{brand.site?.end || "Bag"}</em></nav>
      <section>
        <div><small>{brand.descriptor}</small><h4>{brand.line}</h4><span className={s.siBtn}>{brand.site?.cta || "Shop coffee"}</span></div>
        {img && <span className={s.siImg}><Image src={img} alt="" fill sizes="30vw" /></span>}
      </section>
    </Art>
  );
}

/* Logo construction: the mark on its grid with keylines, then the lock-ups and the smallest sizes */
export function LogoSheet({ brand, className = "" }) {
  return (
    <Art brand={brand} className={`${s.sheet} ${className}`} ratio="16 / 10">
      <div className={s.grid}>
        <svg viewBox="0 0 100 100" className={s.keylines} aria-hidden="true">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => <g key={v}><line x1={v} y1="0" x2={v} y2="100" /><line x1="0" y1={v} x2="100" y2={v} /></g>)}
          <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="24" /><line x1="0" y1="0" x2="100" y2="100" /><line x1="100" y1="0" x2="0" y2="100" />
        </svg>
        <Mark brand={brand} className={s.gridMark} />
      </div>
      <div className={s.lockups}>
        <div className={s.lu1}><Wordmark brand={brand} /></div>
        <div className={s.lu2}><Wordmark brand={brand} tone="paper" stacked /></div>
        <div className={s.lu3}><Mark brand={brand} tone="paper" /></div>
        <div className={s.lu4}>{[48, 32, 20, 14].map((z) => <span key={z} style={{ width: `${z / 10}cqw` }}><Mark brand={brand} /></span>)}<small>Minimum sizes</small></div>
      </div>
    </Art>
  );
}

/* A photograph with artwork placed on its blank face (SURFACES in brands.js). The figure must keep the
   photo's own aspect ratio (no cropping) for the face to line up — set it with `ratio`. */
export function OnSurface({ surface, children, className = "", sizes = "60vw" }) {
  const [x0, y0, x1, y1] = surface.box;
  return (
    <figure className={`${s.surface} ${className}`} style={{ aspectRatio: `${surface.img.width} / ${surface.img.height}` }}>
      <Image src={surface.img} alt={surface.alt} fill sizes={sizes} />
      <div className={s.face} style={{ left: `${x0}%`, top: `${y0}%`, width: `${x1 - x0}%`, height: `${y1 - y0}%` }}>{children}</div>
    </figure>
  );
}

/*
 * Any artefact by name, so datasets can choose one: "logo" · "type" · "colour" · "card-front" · "card-back"
 * · "cards" (front over back) · "letter" · "spread" · "label" · "poster" · "social" · "quote" · "slide" · "site"
 * · "sign" (a fascia). `img` feeds artefacts that carry a photograph.
 */
export function Artefact({ kind, brand, img, finish, className = "" }) {
  switch (kind) {
    case "logo": return <LogoSheet brand={brand} className={className} />;
    case "type": return <TypeSpecimen brand={brand} className={className} />;
    case "colour": return <Swatches brand={brand} className={className} />;
    case "card-front": return <Card brand={brand} side="front" finish={finish} className={className} />;
    case "card-back": return <Card brand={brand} side="back" className={className} />;
    case "cards": return <div className={`${s.cardPair} ${className}`}><Card brand={brand} side="back" /><Card brand={brand} side="front" finish={finish} /></div>;
    case "letter": return <Letterhead brand={brand} className={className} />;
    case "spread": return <Spread brand={brand} img={img} className={className} />;
    case "label": return <Label brand={brand} className={className} />;
    case "poster": return <Poster brand={brand} img={img} className={className} />;
    case "social": return <Social brand={brand} img={img} className={className} />;
    case "quote": return <Social brand={brand} kind="quote" className={className} />;
    case "slide": return <Slide brand={brand} className={className} />;
    case "site": return <Site brand={brand} img={img} className={className} />;
    default: return <Art brand={brand} className={`${s.sign} ${className}`} ratio="3 / 2"><Wordmark brand={brand} tone="paper" /></Art>;
  }
}

export function Caption({ children = "Demo identity · illustrative", className = "" }) {
  return <span className={`${s.caption} ${className}`}>{children}</span>;
}
