import Image from "next/image";
import { GMB_BUSINESS as B, GMB_IMAGES } from "@/data/services/gmbOptimization";
import Map, { PINS } from "./Map";
import s from "./Listing.module.css";

/*
 * The demo business's profile and the search around it, as real HTML. Neutral "maps app" styling in
 * the page's palette — no search engine's logo or trade dress.
 */

const P = {
  call: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  dir: "M12 2 22 12 12 22 2 12zM9 13v-2h5V9l3 3-3 3v-2z",
  web: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  save: "M6 3h12v18l-6-4-6 4z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  shield: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6zM9 12l2 2 4-4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  pin: "M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  back: "M15 5l-7 7 7 7",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
};
export const Ic = ({ n, className = "" }) => <svg viewBox="0 0 24 24" className={`${s.ic} ${className}`} aria-hidden="true"><path d={P[n]} /></svg>;
export const Stars = ({ v = 5 }) => <span className={s.stars} style={{ "--v": v / 5 }} aria-hidden="true">★★★★★</span>;

const Actions = ({ hot }) => (
  <div className={s.actions}>
    {[["call", "Call"], ["dir", "Directions"], ["web", "Website"], ["save", "Save"]].map(([k, l]) => <span key={k} className={hot === k ? s.hot : ""}><i><Ic n={k} /></i>{l}</span>)}
  </div>
);

/** The full business profile. Parts carry data-zone (rank, details, posts, products, reviews, guard). */
export function Profile({ active, className = "" }) {
  const z = (k) => ({ "data-zone": k, className: `${s.zone} ${active === k ? s.zOn : ""} ${active && active !== k ? s.zOff : ""}` });
  return (
    <article className={`${s.profile} ${className}`} aria-hidden="true">
      <div className={s.photos}>
        <span><Image src={GMB_IMAGES.florist} alt="" fill sizes="300px" /></span>
        <span><Image src={GMB_IMAGES.counter} alt="" fill sizes="160px" /></span>
      </div>
      <div {...z("rank")}>
        <h4 className={s.name}>{B.name}</h4>
        <p className={s.rate}><b>4.8</b><Stars v={4.8} /><span>(illustrative)</span></p>
        <p className={s.cat}>{B.category} · {B.area}</p>
        <Actions />
      </div>
      <div {...z("details")}>
        <p className={s.line}><Ic n="pin" />{B.street}, Brooklyn, NY</p>
        <p className={s.line}><Ic n="clock" /><b className={s.open}>Open</b>· Closes 7 pm · <u>Hours updated for the holidays</u></p>
        <p className={s.chips}><em>Florist</em><em>Wedding florist</em><em>Plant shop</em><em>Same-day delivery</em></p>
      </div>
      <div {...z("posts")}>
        <span className={s.label}>Updates</span>
        <div className={s.post}><span className={s.postImg}><Image src={GMB_IMAGES.florist} alt="" fill sizes="80px" /></span><div><b>Autumn wreath workshop</b><span>Saturday morning · book a seat</span><u>Learn more</u></div></div>
      </div>
      <div {...z("products")}>
        <span className={s.label}>Products & services</span>
        <div className={s.prods}>{["Seasonal bouquet", "Wedding flowers", "Plant subscription"].map((p, i) => <span key={p}><i style={{ "--h": [12, 340, 110][i] }} />{p}</span>)}</div>
      </div>
      <div {...z("reviews")}>
        <span className={s.label}>Reviews</span>
        <div className={s.review}><p><Stars /> “Beautiful arrangement, delivered the same afternoon.”</p><p className={s.reply}><b>Response from the owner</b>Thank you, Maya — we loved making it for you!</p></div>
      </div>
      <div {...z("guard")}>
        <p className={s.guard}><Ic n="shield" /><span><b>Listing monitored</b>Suggested category change from an unknown user — reviewed and rejected</span></p>
      </div>
      <p className={s.demo}>{B.note}</p>
    </article>
  );
}

/* ───── phone screens for the search journey (390 × 844) ───── */

const Bar = ({ typed = B.query, caret }) => <div className={s.bar}><Ic n="search" /><span>{typed}{caret && <i className={s.caret} />}</span><Ic n="mic" /></div>;
const Result = ({ n, r, cat, open, you }) => (
  <div className={`${s.res} ${you ? s.resYou : ""}`}><div><b>{n}</b><p className={s.rate}><b>{r}</b><Stars v={r} /></p><span>{cat}</span><span className={s.openS}>{open}</span></div>{you && <span className={s.resImg}><Image src={GMB_IMAGES.florist} alt="" fill sizes="90px" /></span>}</div>
);

export function SearchApp({ stage = "search" }) {
  return (
    <div className={s.app}>
      <div className={s.status}><b>9:41</b><span /></div>
      {stage === "search" && (
        <>
          <Bar caret />
          <ul className={s.sugg}>{["florist near me", "florist near me open now", "florist near me same day delivery", "flower delivery Brooklyn"].map((t) => <li key={t}><Ic n="search" />{t}</li>)}</ul>
          <div className={s.kb}>{["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((r) => <p key={r}>{[...r].map((c) => <span key={c}>{c}</span>)}</p>)}<p><span className={s.space}>space</span></p></div>
        </>
      )}
      {stage === "compare" && (
        <>
          <Bar />
          <div className={s.mini}><Map pins={PINS.slice(0, 4)} labels={false} /></div>
          <div className={s.pack}>
            <Result n={B.name} r={4.8} cat="Florist · 0.2 mi" open="Open · Closes 7 pm" you />
            <Result n="Garden Room Flowers" r={4.3} cat="Florist · 0.6 mi" open="Closes 6 pm" />
            <Result n="Stem Studio" r={4.1} cat="Florist · 0.9 mi" open="Closed · Opens 10 am" />
          </div>
        </>
      )}
      {(stage === "choose" || stage === "act") && (
        <div className={s.appProfile}>
          <div className={s.hero}><Image src={GMB_IMAGES.florist} alt="" fill sizes="390px" /><span className={s.back}><Ic n="back" /></span></div>
          <div className={s.apBody}>
            <h4 className={s.name}>{B.name}</h4>
            <p className={s.rate}><b>4.8</b><Stars v={4.8} /></p>
            <p className={s.cat}>{B.category} · {B.street} · <b className={s.open}>Open</b></p>
            <Actions hot={stage === "act" ? "dir" : null} />
            <div className={s.post}><span className={s.postImg}><Image src={GMB_IMAGES.counter} alt="" fill sizes="80px" /></span><div><b>Same-day delivery across Brooklyn</b><span>Order by 2 pm</span></div></div>
            <div className={s.review}><p><Stars /> “Friendly, fast and gorgeous flowers.”</p><p className={s.reply}><b>Response from the owner</b>Thanks for coming in!</p></div>
          </div>
          {stage === "act" && <div className={s.toast}><Ic n="dir" /><div><b>Directions</b><span>4 min walk · via Court St</span></div></div>}
        </div>
      )}
    </div>
  );
}
