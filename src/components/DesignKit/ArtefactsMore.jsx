import Image from "next/image";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import imgEmpire from "@public/images/home/empire.jpg";
import Site from "./Site";
import a from "./Artefacts.module.css";
import m from "./ArtefactsMore.module.css";

/* More UX artefacts for the Meridian project: a workshop's journey map, a UX audit and a brand board */
const Board = ({ children, paper = true }) => (
  <div className={`${a.board} ${paper ? a.paperBoard : ""}`} style={{ aspectRatio: "16 / 10" }} aria-hidden="true">
    <ScaledScreen width={1280}>{children}</ScaledScreen>
  </div>
);

export function JourneyMap() {
  const cols = [
    ["Discover", "Sees a listing shared by a friend", "“Is this area right for us?”", "Neighbourhood info is hard to find", 60],
    ["Search", "Filters by area and bedrooms", "“Why are so many already gone?”", "Sold homes still show in results", 40],
    ["Compare", "Saves three homes, reads details", "“What's included in the price?”", "Fees hidden until the viewing", 55],
    ["Book", "Requests a Saturday viewing", "“Will anyone confirm this?”", "No confirmation for a day", 20],
    ["Decide", "Visits, then makes an offer", "“Can we move quickly?”", "Offer steps unclear", 70],
  ];
  return (
    <Board>
      <div className={m.jm}>
        <header className={m.head}><b>Journey map — first-time buyer</b><span>Workshop · Day 1</span></header>
        <div className={m.jmGrid}>
          <span className={m.row}>Stage</span>{cols.map((c) => <b key={c[0]} className={m.stage} data-node>{c[0]}</b>)}
          <span className={m.row}>Doing</span>{cols.map((c) => <p key={c[1]} className={m.cell} data-node>{c[1]}</p>)}
          <span className={m.row}>Thinking</span>{cols.map((c) => <p key={c[2]} className={`${m.cell} ${m.y}`} data-node>{c[2]}</p>)}
          <span className={m.row}>Pain point</span>{cols.map((c) => <p key={c[3]} className={`${m.cell} ${m.p}`} data-node>{c[3]}</p>)}
          <span className={m.row}>Feeling</span>{cols.map((c) => <i key={c[0]} className={m.mood} style={{ "--m": c[4] }} data-node />)}
        </div>
      </div>
    </Board>
  );
}

export function AuditReport() {
  const issues = [["High", "Search button reads as decoration", "Visibility"], ["High", "No confirmation after booking", "Feedback"], ["Medium", "Price lacks what's included", "Trust"], ["Medium", "Low contrast on secondary text", "Accessibility"], ["Low", "Inconsistent button labels", "Consistency"]];
  const pins = [[90, 74], [70, 20], [16, 68], [30, 44], [86, 10]];
  return (
    <Board paper={false}>
      <div className={m.audit}>
        <div className={m.auditSite}>
          <Site page="home" />
          {pins.map(([x, y], i) => <span key={i} className={m.pin} style={{ left: `${x}%`, top: `${y}%` }} data-node>{i + 1}</span>)}
        </div>
        <aside className={m.list}>
          <b>UX audit · Home</b><small>Heuristic review · five findings</small>
          {issues.map(([lvl, t, h], i) => <p key={t} data-obs><em className={m[`sev${lvl}`]}>{i + 1} · {lvl}</em>{t}<small>{h}</small></p>)}
        </aside>
      </div>
    </Board>
  );
}

export function Brand() {
  return (
    <Board>
      <div className={m.brand}>
        <div className={m.logoDark} data-piece><span className={m.mark}>M</span><b>Meridian</b></div>
        <div className={m.logoLight} data-piece><span className={m.mark}>M</span><b>Meridian</b><small>Manhattan homes</small></div>
        <div className={m.card} data-piece><b>Ana Ruiz</b><small>Senior agent</small><span>ana@meridian.example<br />Madison Avenue, New York</span><i className={m.mark}>M</i></div>
        <div className={m.brochure} data-piece><Image src={imgEmpire} alt="" fill sizes="20vw" style={{ objectFit: "cover" }} /><small>The Meridian West</small><b>Forty-two homes. One view.</b></div>
        <div className={m.palette} data-piece>{["#1D1A16", "#F4EFE8", "#C4572E", "#2F6B45"].map((h) => <i key={h} style={{ background: h }}><small>{h}</small></i>)}</div>
        <div className={m.specimen} data-piece><b>Aa</b><span>Instrument Sans<br />Semibold · Regular</span></div>
      </div>
    </Board>
  );
}
