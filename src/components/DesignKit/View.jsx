import { OnDevice } from "./Devices";
import Canvas from "./Canvas";
import Site from "./Site";
import Code, { HTML, CSS, RESPONSIVE, COMPONENT, LANDING } from "./Code";
import { Research, Sitemap, Tokens, TestSession } from "./Artefacts";
import { JourneyMap, AuditReport, Brand } from "./ArtefactsMore";

const CODE = { html: ["index.html", HTML], css: ["styles.css", CSS], responsive: ["responsive.css", RESPONSIVE], component: ["card.html", COMPONENT], landing: ["meridian-west.html", LANDING] };

/**
 * One named visual from a page's data, drawn from the design kit:
 *   research · sitemap · tokens · test · journeymap · auditreport · brand — UX artefacts
 *   wire · grey · ui (+ page)                          — the Meridian site in a browser at that fidelity
 *   phone · tablet (+ page, fid)                       — the site on a device
 *   home · listing · landing · dashboard              — that page in a browser
 *   canvas (+ page, fid)                               — the page on a design-tool artboard
 *   code:html · code:css · code:responsive · code:component · code:landing — the source
 */
export default function View({ view, page = "home", fid = "ui", className = "" }) {
  if (view === "research") return <Research className={className} />;
  if (view === "sitemap") return <Sitemap className={className} />;
  if (view === "tokens") return <Tokens className={className} />;
  if (view === "test") return <TestSession className={className} />;
  if (view === "journeymap") return <JourneyMap />;
  if (view === "auditreport") return <AuditReport />;
  if (view === "brand") return <Brand />;
  if (["wire", "grey", "ui"].includes(view)) return <OnDevice page={page} fid={view} className={className} />;
  if (view === "phone" || view === "tablet") return <OnDevice device={view} page={page} fid={fid} className={className} />;
  if (["home", "listing", "landing", "dashboard"].includes(view)) return <OnDevice page={view} fid={fid} className={className} />;
  if (view === "canvas") return <Canvas className={className} frame={`${page[0].toUpperCase()}${page.slice(1)} — Desktop`}><Site page={page} fid={fid} /></Canvas>;
  if (view?.startsWith("code:")) {
    const [file, lines] = CODE[view.slice(5)] || CODE.html;
    return <Code file={file} lines={lines} className={className} />;
  }
  return null;
}

export const isTall = (view) => view === "phone" || view === "tablet";
