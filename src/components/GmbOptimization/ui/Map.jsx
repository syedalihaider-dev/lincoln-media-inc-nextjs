import s from "./Map.module.css";

/*
 * A drawn street map — a fictional neighbourhood on a Brooklyn-like grid, in the page's own palette
 * (no map provider's tiles or branding). Roads carry pathLength="1" and data-road so a section can draw
 * them in; pins are SVG groups (data-pin) so they can drop and pulse. viewBox 1600 × 1000.
 */

const W = 1600, H = 1000;
const ANGLE = -28; // the grid's lean

// streets (long) and avenues (cross) of the rotated grid, in grid space
const STREETS = Array.from({ length: 19 }, (_, i) => -900 + i * 120);
const AVES = Array.from({ length: 13 }, (_, i) => -700 + i * 260);
const MAJOR = new Set([3, 7, 11]);

export const MAP_LABELS = [
  { x: 520, y: 380, t: "Carroll Gardens", big: true },
  { x: 1120, y: 640, t: "Park Slope", big: true },
  { x: 930, y: 250, t: "Gowanus", big: true },
  { x: 720, y: 560, t: "Court St" },
  { x: 1010, y: 470, t: "Smith St" },
];

/** Pin positions (viewBox units). `you` is the demo business. */
export const PINS = [
  { id: "you", x: 760, y: 470, you: true },
  { id: "a", x: 980, y: 380 },
  { id: "b", x: 590, y: 640 },
  { id: "c", x: 1180, y: 560 },
  { id: "d", x: 420, y: 300 },
  { id: "e", x: 1320, y: 330 },
];

export function Pin({ x, y, you, id, label }) {
  return (
    <g className={`${s.pin} ${you ? s.you : ""}`} transform={`translate(${x} ${y})`} data-pin={id}>
      {you && <circle className={s.pulse} r="26" data-pulse />}
      <g data-drop>
        <ellipse className={s.shadow} cx="0" cy="2" rx="9" ry="3.5" />
        <path className={s.head} d="M0 0 C-4 -10 -15 -16 -15 -29 A15 15 0 1 1 15 -29 C15 -16 4 -10 0 0Z" />
        <circle className={s.eye} cy="-29" r={you ? 6 : 5} />
        {label && <text className={s.pinLabel} x="22" y="-24">{label}</text>}
      </g>
    </g>
  );
}

export default function Map({ pins = PINS, className = "", labels = true, children, slice = true, ...rest }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"} className={`${s.map} ${className}`} aria-hidden="true" {...rest}>
      <rect width={W} height={H} className={s.land} />
      {/* water and park */}
      <path className={s.water} data-area d="M-20 -20 H560 C500 80 420 120 380 210 C330 320 250 330 160 420 C90 490 40 600 -20 640 Z" />
      <path className={s.canal} data-road pathLength="1" d="M880 -20 C900 160 860 300 900 420 C930 520 1000 620 980 1020" />
      <path className={s.park} data-area d="M1280 640 L1600 520 L1600 1020 L1380 1020 Z" />
      <g transform={`rotate(${ANGLE} ${W / 2} ${H / 2})`}>
        {STREETS.map((y, i) => <path key={"s" + i} className={MAJOR.has(i) ? s.major : s.road} data-road pathLength="1" d={`M-900 ${y + 500} H2500`} />)}
        {AVES.map((x, i) => <path key={"a" + i} className={i % 4 === 1 ? s.major : s.road} data-road pathLength="1" d={`M${x + 800} -900 V1900`} />)}
        {/* blocks get a few buildings for texture */}
        {AVES.slice(0, -1).flatMap((x, i) => STREETS.slice(0, -1).filter((_, j) => (i * 7 + j * 3) % 5 === 0).map((y, j) => (
          <rect key={`b${i}-${j}`} className={s.block} x={x + 800 + 22} y={y + 500 + 18} width={216} height={84} rx="6" />
        )))}
      </g>
      {labels && MAP_LABELS.map((l) => <text key={l.t} x={l.x} y={l.y} className={l.big ? s.area : s.street} data-label>{l.t}</text>)}
      {children}
      {pins.map((p) => <Pin key={p.id} {...p} />)}
    </svg>
  );
}
