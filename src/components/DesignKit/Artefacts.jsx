import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import Image from "next/image";
import imgEmpire from "@public/images/home/empire.jpg";
import Site from "./Site";
import a from "./Artefacts.module.css";

/*
 * The working artefacts of UX design for the Meridian project, in HTML at 1280px: a research board
 * (interview notes grouped into themes, and a persona), a sitemap, a design-system sheet and a
 * usability-test session. Each sits on a fixed-ratio board and scales to fit. Decorative.
 */
const Board = ({ children, ratio = "16 / 10", className = "", ...rest }) => (
  <div className={`${a.board} ${className}`} style={{ aspectRatio: ratio }} aria-hidden="true" {...rest}>
    <ScaledScreen width={1280}>{children}</ScaledScreen>
  </div>
);

export const NOTES = [
  ["Light", "“We want to see the view before we book a viewing.”", "y"],
  ["Light", "Photos of the windows matter more than the kitchen.", "y"],
  ["Trust", "“Is the price real, or a teaser?”", "p"],
  ["Trust", "Wants the agent's name on every listing.", "p"],
  ["Time", "Viewings booked by phone, at lunch, in a rush.", "b"],
  ["Time", "“Saturday mornings are the only time we both have.”", "b"],
  ["Area", "Searches by neighbourhood, not by price.", "g"],
  ["Area", "Asks what the street is like at night.", "g"],
];

export function Research() {
  return (
    <Board className={a.paperBoard}>
      <div className={a.research}>
        <header className={a.rHead}><b>Meridian — discovery</b><span>12 interviews · 3 weeks</span></header>
        <div className={a.notes}>
          {NOTES.map(([t, n, col], i) => <p key={i} className={`${a.note} ${a[col]}`} data-note style={{ "--r": `${((i * 37) % 9) - 4}deg` }}><small>{t}</small>{n}</p>)}
        </div>
        <aside className={a.persona} data-persona>
          <span className={a.avatar}>S</span>
          <b>Sara, 34</b>
          <p>Buying her first home with her partner. Works in Midtown, decides on her phone, books viewings on Saturdays.</p>
          <p className={a.need}><small>Needs</small>See the light · trust the price · book in a minute</p>
        </aside>
      </div>
    </Board>
  );
}

export function Sitemap() {
  const tree = [["Home", ["Homes", "Neighbourhoods", "New developments", "Journal"]], ["Homes", ["Search", "Listing", "Book a viewing"]]];
  return (
    <Board className={a.paperBoard}>
      <div className={a.map}>
        <p className={a.root} data-node>Home</p>
        <div className={a.level}>
          {tree[0][1].map((n) => (
            <div key={n} className={a.branch}>
              <p className={a.node} data-node>{n}</p>
              {n === "Homes" && <div className={a.sub}>{tree[1][1].map((x) => <p key={x} className={a.leaf} data-node>{x}</p>)}</div>}
              {n === "Neighbourhoods" && <div className={a.sub}>{["Midtown", "Chelsea", "Upper West Side"].map((x) => <p key={x} className={a.leaf} data-node>{x}</p>)}</div>}
              {n === "Journal" && <div className={a.sub}><p className={a.leaf} data-node>Article</p></div>}
            </div>
          ))}
        </div>
        <p className={a.mapNote}>Primary task: find a home → book a viewing in under a minute</p>
      </div>
    </Board>
  );
}

export function Tokens() {
  return (
    <Board className={a.paperBoard}>
      <div className={a.tokens}>
        <section className={a.tCol}>
          <h5>Colour</h5>
          <div className={a.swatches}>{[["Ink", "#1D1A16"], ["Cream", "#F4EFE8"], ["Sand", "#E7DED2"], ["Clay", "#C4572E"], ["Moss", "#2F6B45"]].map(([n, h]) => <p key={n} data-piece><i style={{ background: h }} />{n}<small>{h}</small></p>)}</div>
          <h5>Type</h5>
          <div className={a.type} data-piece><p className={a.t1}>Display 64</p><p className={a.t2}>Heading 30</p><p className={a.t3}>Body 16 — Homes above the city.</p><p className={a.t4}>LABEL 13</p></div>
          <h5>Spacing</h5>
          <div className={a.space} data-piece>{[4, 8, 12, 16, 24, 32, 48].map((n) => <i key={n} style={{ width: n * 1.6 }}><small>{n}</small></i>)}</div>
        </section>
        <section className={a.tCol}>
          <h5>Buttons</h5>
          <div className={a.btnRow} data-piece><span className={a.bPrimary}>Default</span><span className={`${a.bPrimary} ${a.hover}`}>Hover</span><span className={`${a.bPrimary} ${a.press}`}>Pressed</span><span className={a.bDisabled}>Disabled</span></div>
          <div className={a.btnRow} data-piece><span className={a.bGhost}>Secondary</span><span className={a.bText}>Text link →</span></div>
          <h5>Inputs</h5>
          <div className={a.inputs} data-piece><span>Neighbourhood<b>Midtown</b></span><span className={a.focus}>Email<b>sara@example.com</b></span><span className={a.error}>Phone<b>Enter a phone number</b></span></div>
          <h5>Navigation</h5>
          <div className={a.navDemo} data-piece><b>Meridian</b><span>Homes</span><span>Neighbourhoods</span><em>Book</em></div>
        </section>
        <section className={a.tCol}>
          <h5>Card</h5>
          <div className={a.cardDemo} data-piece><div className={a.cardImg}><Image src={imgEmpire} alt="" fill sizes="20vw" style={{ objectFit: "cover" }} /></div><b>$1,850,000</b><span>Park Avenue loft</span><small>2 bed · 2 bath</small></div>
          <h5>States</h5>
          <div className={a.states} data-piece><span className={a.ok}>Viewing confirmed</span><span className={a.warn}>Offer pending</span><span className={a.skel}><i /><i /><i /></span></div>
        </section>
      </div>
    </Board>
  );
}

export function TestSession() {
  return (
    <Board>
      <div className={a.test}>
        <div className={a.testSite}><Site page="listing" /></div>
        <aside className={a.testSide}>
          <p className={a.rec}><i />Session 4 · Recording</p>
          <b>Task</b><p>“Find a two-bedroom in Midtown and book a Saturday viewing.”</p>
          <b>Notes</b>
          <p className={a.obs} data-obs>Found the loft from the home page search.</p>
          <p className={a.obs} data-obs>Paused at the price — looked for what's included.</p>
          <p className={a.obs} data-obs>Booked the viewing without help.</p>
          <p className={a.verdict} data-obs>Task completed</p>
        </aside>
        <span className={a.cursor} data-cursor />
      </div>
    </Board>
  );
}
