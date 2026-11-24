import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import c from "./Canvas.module.css";

/*
 * A design tool's window, written in HTML at 1440px and scaled to fit: toolbar, layers panel, the
 * canvas with one artboard on it, and the inspector. Not any real product — a generic design file.
 *   frame    — the artboard's name label ("Home — Desktop")
 *   children — what is on the artboard (usually <Site …/> at 1280px, already inside the artboard)
 *   select   — { left, top, width, height } in % of the artboard: draws a selection with handles
 *   redlines — show spacing measurements over the artboard
 *   layers   — names in the layers panel; the first `active` one is highlighted
 */
export default function Canvas({ frame = "Home — Desktop", children, select, redlines = false, layers = DEFAULT_LAYERS, active = 1, zoom = "50%", className = "", artboardWidth = 1280 }) {
  return (
    <div className={`${c.tool} ${className}`} aria-hidden="true">
      <ScaledScreen width={1440}>
        <div className={c.app}>
          <header className={c.top}>
            <span className={c.menu}><i /><i /><i /></span>
            <span className={c.tools}><b>Move</b><span>Frame</span><span>Shape</span><span>Text</span><span>Comment</span></span>
            <span className={c.file}>Meridian / Website</span>
            <span className={c.avatars}><i>UX</i><i>UI</i><i>DEV</i></span>
            <span className={c.share}>Share</span>
          </header>
          <aside className={c.layers}>
            <p className={c.ph}>Layers</p>
            {layers.map((l, i) => <p key={l + i} className={`${c.layer} ${i === active ? c.on : ""} ${l.startsWith("  ") ? c.child : ""}`}><i />{l.trim()}</p>)}
            <p className={c.ph}>Pages</p>
            <p className={c.layer}>Home</p><p className={c.layer}>Listing</p><p className={c.layer}>Components</p>
          </aside>
          <main className={c.canvas}>
            <p className={c.frameName}>{frame}</p>
            <div className={c.board} style={{ width: 896 }}>
              <div className={c.boardInner}><ScaledScreen width={artboardWidth}>{children}</ScaledScreen></div>
              {select && (
                <span className={c.sel} style={{ left: `${select.left}%`, top: `${select.top}%`, width: `${select.width}%`, height: `${select.height}%` }} data-sel>
                  <i /><i /><i /><i /><em>{select.label || "Hero"}</em>
                </span>
              )}
              {redlines && (
                <>
                  <span className={c.rh} style={{ left: "0%", top: "34%", width: "3.8%" }}><b>48</b></span>
                  <span className={c.rv} style={{ left: "24%", top: "9.6%", height: "5%" }}><b>56</b></span>
                  <span className={c.rh} style={{ left: "49.8%", top: "45%", width: "3.8%" }}><b>48</b></span>
                </>
              )}
            </div>
            <span className={c.zoom}>{zoom}</span>
          </main>
          <aside className={c.inspect}>
            <p className={c.ph}>Design</p>
            <div className={c.grid}><span>X <b>0</b></span><span>Y <b>0</b></span><span>W <b>1440</b></span><span>H <b>900</b></span></div>
            <p className={c.ph}>Layout</p>
            <div className={c.grid}><span>Gap <b>48</b></span><span>Pad <b>48</b></span></div>
            <p className={c.ph}>Fill</p>
            <p className={c.swatch}><i style={{ background: "#f4efe8" }} />F4EFE8</p>
            <p className={c.ph}>Text</p>
            <p className={c.font}>Poppins<br /><small>Semibold · 64 / 64 · −4.5%</small></p>
            <p className={c.ph}>Export</p>
            <p className={c.font}>PNG · SVG · <b>Code</b></p>
          </aside>
        </div>
      </ScaledScreen>
    </div>
  );
}

const DEFAULT_LAYERS = ["Home — Desktop", "  Navigation", "  Hero", "  Search", "  New this week", "  Footer"];
