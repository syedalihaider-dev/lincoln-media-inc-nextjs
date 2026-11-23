"use client";
// Interface panels drawn on a canvas, used as textures by the 3D scenes (inner-service hero, Services
// ecosystem). Drawing them is cheaper than loading screenshots and keeps every panel in brand colours.
// Each kind is an abstract, recognisable piece of a digital product — no real data, no claims.

const C = {
  bg: "rgba(7, 13, 24, 0.9)",
  bg2: "rgba(13, 22, 38, 0.95)",
  line: "rgba(238, 241, 247, 0.16)",
  soft: "rgba(238, 241, 247, 0.09)",
  text: "rgba(238, 241, 247, 0.55)",
  paper: "#eef1f7",
  cyan: "#36e4d0",
  cyanSoft: "rgba(54, 228, 208, 0.28)",
  violet: "#5b74ff",
};
const MONO = '"JetBrains Mono", ui-monospace, monospace';

function rr(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}
const bar = (ctx, x, y, w, h = 10, c = C.soft) => rr(ctx, x, y, w, h, h / 2, c);

// The shared frame: a dark glass card, a fine border, and a title strip with window dots
function frame(ctx, W, H, label, { chrome = true } = {}) {
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, C.bg2);
  g.addColorStop(1, C.bg);
  rr(ctx, 2, 2, W - 4, H - 4, 22, g, "rgba(54, 228, 208, 0.35)");
  if (!chrome) return 0;
  ctx.fillStyle = C.line;
  ctx.fillRect(2, 52, W - 4, 2);
  ["#ff6b6b", "#ffc857", C.cyan].forEach((c, i) => { ctx.beginPath(); ctx.arc(30 + i * 22, 27, 6, 0, Math.PI * 2); ctx.fillStyle = c; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1; });
  if (label) {
    rr(ctx, 110, 13, Math.min(W - 140, 300), 28, 14, C.soft);
    ctx.fillStyle = C.text;
    ctx.font = `500 15px ${MONO}`;
    ctx.fillText(label, 126, 32);
  }
  return 54;
}

const DRAW = {
  // A website: navigation, a hero with a picture, a row of cards
  browser(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "yourbrand.com");
    const p = 28;
    rr(ctx, p, t + 22, 34, 18, 6, C.cyan);
    [0, 1, 2, 3].forEach((i) => bar(ctx, W - p - 70 * (4 - i), t + 26, 46, 9));
    bar(ctx, p, t + 80, W * 0.38, 20, "rgba(238,241,247,0.75)");
    bar(ctx, p, t + 112, W * 0.3, 20, "rgba(238,241,247,0.75)");
    bar(ctx, p, t + 150, W * 0.34, 9);
    bar(ctx, p, t + 168, W * 0.28, 9);
    rr(ctx, p, t + 196, 120, 34, 17, C.cyan);
    const ix = W * 0.52, iw = W - ix - p, ih = H * 0.42;
    const ig = ctx.createLinearGradient(ix, t + 70, ix + iw, t + 70 + ih);
    ig.addColorStop(0, "rgba(54,228,208,0.55)");
    ig.addColorStop(1, "rgba(91,116,255,0.35)");
    rr(ctx, ix, t + 70, iw, ih, 14, ig);
    ctx.beginPath(); ctx.arc(ix + iw * 0.7, t + 70 + ih * 0.35, ih * 0.16, 0, Math.PI * 2); ctx.fillStyle = "rgba(238,241,247,0.35)"; ctx.fill();
    const cy = t + 90 + ih, cw = (W - p * 2 - 32) / 3;
    for (let i = 0; i < 3; i++) {
      if (cy + 40 > H - 20) break;
      rr(ctx, p + i * (cw + 16), cy, cw, H - cy - 24, 12, C.soft, C.line);
      bar(ctx, p + i * (cw + 16) + 16, cy + 18, cw * 0.5, 9, "rgba(238,241,247,0.4)");
    }
  },
  // Code: real-looking lines in a monospace face, with a cursor line lit
  code(ctx, W, H, label, lines) {
    const t = frame(ctx, W, H, label || "index.html");
    const src = lines && lines.length ? lines : ["<section class=\"hero\">", "  <h1>Your brand</h1>", "  <nav>…</nav>", "</section>"];
    ctx.font = `500 19px ${MONO}`;
    const cols = [C.cyan, C.paper, C.violet, C.text];
    let y = t + 44;
    for (let i = 0; y < H - 20; i++, y += 34) {
      const l = src[i % src.length];
      ctx.fillStyle = "rgba(238,241,247,0.25)";
      ctx.fillText(String(i + 1).padStart(2, " "), 22, y);
      if (i === 2) rr(ctx, 60, y - 22, W - 84, 30, 6, "rgba(54,228,208,0.1)");
      ctx.fillStyle = cols[i % cols.length];
      ctx.fillText(l, 66, y);
    }
  },
  // A phone screen: status, header, picture card, list rows, tab bar
  mobile(ctx, W, H) {
    rr(ctx, 2, 2, W - 4, H - 4, 46, C.bg2, "rgba(54, 228, 208, 0.4)");
    rr(ctx, W / 2 - 50, 18, 100, 22, 11, "rgba(0,0,0,0.6)");
    const p = 26;
    bar(ctx, p, 70, W * 0.45, 16, "rgba(238,241,247,0.75)");
    const g = ctx.createLinearGradient(0, 110, W, 300);
    g.addColorStop(0, "rgba(54,228,208,0.5)");
    g.addColorStop(1, "rgba(91,116,255,0.3)");
    rr(ctx, p, 110, W - p * 2, H * 0.3, 18, g);
    let y = 130 + H * 0.3;
    while (y < H - 140) {
      rr(ctx, p, y, 44, 44, 12, C.cyanSoft);
      bar(ctx, p + 60, y + 8, W * 0.4, 9, "rgba(238,241,247,0.5)");
      bar(ctx, p + 60, y + 26, W * 0.28, 8);
      y += 64;
    }
    rr(ctx, p, H - 90, W - p * 2, 56, 28, C.soft, C.line);
    [0, 1, 2, 3].forEach((i) => { ctx.beginPath(); ctx.arc(p + 40 + i * ((W - p * 2 - 80) / 3), H - 62, 8, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? C.cyan : C.text; ctx.fill(); });
  },
  // A wireframe: boxes crossed out, dashed guides — UX before UI
  wireframe(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "wireframe");
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(54,228,208,0.35)";
    ctx.lineWidth = 2;
    [0.25, 0.5, 0.75].forEach((f) => { ctx.beginPath(); ctx.moveTo(W * f, t + 10); ctx.lineTo(W * f, H - 10); ctx.stroke(); });
    ctx.setLineDash([]);
    const box = (x, y, w, h) => {
      rr(ctx, x, y, w, h, 8, null, "rgba(238,241,247,0.45)");
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y + h); ctx.moveTo(x + w, y); ctx.lineTo(x, y + h);
      ctx.strokeStyle = "rgba(238,241,247,0.18)"; ctx.stroke();
    };
    box(28, t + 24, W - 56, H * 0.32);
    const y2 = t + 44 + H * 0.32, w3 = (W - 56 - 32) / 3;
    for (let i = 0; i < 3; i++) box(28 + i * (w3 + 16), y2, w3, H - y2 - 70);
    bar(ctx, 28, H - 50, W * 0.3, 12, C.cyanSoft);
    ctx.beginPath(); ctx.arc(W * 0.66, H - 44, 12, 0, Math.PI * 2); ctx.strokeStyle = C.cyan; ctx.stroke();
  },
  // A site map: one root, branches, leaves
  sitemap(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "sitemap");
    const node = (x, y, w, lit) => rr(ctx, x - w / 2, y - 16, w, 32, 10, lit ? C.cyan : C.soft, lit ? null : C.line);
    const line = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.bezierCurveTo(x1, (y1 + y2) / 2, x2, (y1 + y2) / 2, x2, y2); ctx.strokeStyle = "rgba(54,228,208,0.45)"; ctx.lineWidth = 2; ctx.stroke(); };
    const top = t + 50, mid = t + (H - t) * 0.48, low = H - 50;
    const xs = [W * 0.2, W * 0.5, W * 0.8];
    xs.forEach((x) => line(W / 2, top + 16, x, mid - 16));
    xs.forEach((x, i) => [x - W * 0.08, x + W * 0.08].forEach((lx) => i !== 1 && line(x, mid + 16, lx, low - 16)));
    node(W / 2, top, 140, true);
    xs.forEach((x) => node(x, mid, 120));
    xs.forEach((x, i) => i !== 1 && [x - W * 0.08, x + W * 0.08].forEach((lx) => node(lx, low, 76)));
  },
  // A layout grid with blocks snapping to columns
  layout(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "grid · 12 col");
    const cols = 12, p = 24, gw = (W - p * 2) / cols;
    for (let i = 0; i < cols; i++) rr(ctx, p + i * gw + 3, t + 14, gw - 6, H - t - 34, 4, "rgba(54,228,208,0.06)");
    rr(ctx, p + 3, t + 30, gw * 7 - 6, (H - t) * 0.36, 10, null, C.cyan);
    rr(ctx, p + gw * 7 + 3, t + 30, gw * 5 - 6, (H - t) * 0.36, 10, C.cyanSoft);
    rr(ctx, p + 3, t + 50 + (H - t) * 0.36, gw * 4 - 6, (H - t) * 0.34, 10, C.soft, C.line);
    rr(ctx, p + gw * 4 + 3, t + 50 + (H - t) * 0.36, gw * 4 - 6, (H - t) * 0.34, 10, C.soft, C.line);
    rr(ctx, p + gw * 8 + 3, t + 50 + (H - t) * 0.36, gw * 4 - 6, (H - t) * 0.34, 10, C.soft, C.line);
  },
  // A small interface component: toggle, slider, button
  component(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "components", { chrome: false });
    void t;
    bar(ctx, 28, 34, W * 0.4, 12, "rgba(238,241,247,0.6)");
    rr(ctx, 28, 70, 76, 38, 19, C.cyan); ctx.beginPath(); ctx.arc(85, 89, 14, 0, Math.PI * 2); ctx.fillStyle = "#06101c"; ctx.fill();
    bar(ctx, 128, 84, W - 160, 8, C.soft); bar(ctx, 128, 84, (W - 160) * 0.62, 8, C.cyan);
    ctx.beginPath(); ctx.arc(128 + (W - 160) * 0.62, 88, 12, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill();
    rr(ctx, 28, H - 66, W - 56, 40, 20, null, "rgba(54,228,208,0.7)");
    bar(ctx, W / 2 - 50, H - 50, 100, 9, "rgba(238,241,247,0.6)");
  },
  // Growth chart: bars and a rising line — marketing
  chart(ctx, W, H, label) {
    const t = frame(ctx, W, H, label);
    const p = 34, base = H - 40, n = 7, bw = (W - p * 2) / n;
    const hs = [0.25, 0.35, 0.3, 0.48, 0.55, 0.68, 0.82];
    hs.forEach((h, i) => rr(ctx, p + i * bw + 8, base - (base - t - 30) * h, bw - 16, (base - t - 30) * h, 6, i === n - 1 ? C.cyan : C.cyanSoft));
    ctx.beginPath();
    hs.forEach((h, i) => { const x = p + i * bw + bw / 2, y = base - (base - t - 30) * h - 24; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.strokeStyle = C.paper; ctx.lineWidth = 3; ctx.stroke();
  },
  // Brand: a mark, a type specimen and swatches
  brand(ctx, W, H, label) {
    const t = frame(ctx, W, H, label);
    const cx = W * 0.28, cy = t + (H - t) * 0.45, r = Math.min(W, H) * 0.17;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = C.cyan; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + r * 0.35, cy - r * 0.2, r * 0.55, 0, Math.PI * 2); ctx.fillStyle = "#07101c"; ctx.fill();
    ctx.fillStyle = C.paper; ctx.font = `800 ${Math.round(r * 1.3)}px "Unbounded", system-ui, sans-serif`; ctx.fillText("Aa", W * 0.56, cy + r * 0.45);
    [C.cyan, C.violet, C.paper, "#0f1626"].forEach((c, i) => rr(ctx, 28 + i * ((W - 56) / 4), H - 64, (W - 56) / 4 - 12, 36, 8, c, C.line));
  },
  // Commerce: a product grid and a cart
  commerce(ctx, W, H, label) {
    const t = frame(ctx, W, H, label);
    const p = 26, gw = (W - p * 2 - 18) / 2, gh = (H - t - 100) / 2;
    for (let i = 0; i < 4; i++) {
      const x = p + (i % 2) * (gw + 18), y = t + 18 + Math.floor(i / 2) * (gh + 14);
      rr(ctx, x, y, gw, gh, 12, C.soft, C.line);
      rr(ctx, x + 12, y + 12, gw - 24, gh * 0.5, 8, i % 2 ? "rgba(91,116,255,0.3)" : C.cyanSoft);
      bar(ctx, x + 12, y + gh * 0.5 + 24, gw * 0.5, 9, "rgba(238,241,247,0.5)");
    }
    rr(ctx, W - p - 150, H - 58, 150, 38, 19, C.cyan);
    ctx.fillStyle = "#06101c"; ctx.font = `600 16px ${MONO}`; ctx.fillText("Add to cart", W - p - 128, H - 33);
  },
  // Video: a frame with a play mark and a timeline of clips
  video(ctx, W, H, label) {
    const t = frame(ctx, W, H, label);
    const g = ctx.createLinearGradient(0, t, W, H);
    g.addColorStop(0, "rgba(91,116,255,0.35)"); g.addColorStop(1, "rgba(54,228,208,0.25)");
    rr(ctx, 24, t + 16, W - 48, H - t - 100, 12, g);
    const cx = W / 2, cy = t + 16 + (H - t - 100) / 2;
    ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.fillStyle = "rgba(3,5,11,0.6)"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - 10, cy - 16); ctx.lineTo(cx + 18, cy); ctx.lineTo(cx - 10, cy + 16); ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill();
    [0.22, 0.14, 0.3, 0.18].reduce((x, w, i) => { rr(ctx, x, H - 66, (W - 48) * w - 6, 30, 6, i === 1 ? C.cyan : C.cyanSoft); return x + (W - 48) * w; }, 24);
  },
  // Animation: a keyframe curve on tracks
  animation(ctx, W, H, label) {
    const t = frame(ctx, W, H, label);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = C.soft; ctx.fillRect(24, t + 30 + i * ((H - t - 50) / 4), W - 48, 2); }
    ctx.beginPath(); ctx.moveTo(24, H - 40);
    ctx.bezierCurveTo(W * 0.35, H - 40, W * 0.4, t + 30, W * 0.62, t + 40);
    ctx.bezierCurveTo(W * 0.8, t + 46, W * 0.82, H * 0.6, W - 24, H * 0.55);
    ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.stroke();
    [[24, H - 40], [W * 0.62, t + 40], [W - 24, H * 0.55]].forEach(([x, y]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = C.paper; ctx.fillRect(-9, -9, 18, 18); ctx.restore(); });
  },
  // Nodes joined by lines — integration
  nodes(ctx, W, H, label) {
    const t = frame(ctx, W, H, label || "integrations");
    const pts = [[0.5, 0.55], [0.18, 0.35], [0.82, 0.35], [0.2, 0.82], [0.8, 0.82]].map(([x, y]) => [W * x, t + (H - t) * y]);
    pts.slice(1).forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(x, y); ctx.strokeStyle = "rgba(54,228,208,0.5)"; ctx.lineWidth = 2; ctx.stroke(); });
    pts.forEach(([x, y], i) => rr(ctx, x - (i ? 44 : 60), y - 22, i ? 88 : 120, 44, 12, i ? C.soft : C.cyan, i ? C.line : null));
  },
};

export const UI_KINDS = Object.keys(DRAW);

/** Draw one panel. Returns a canvas (use with THREE.CanvasTexture). */
export function drawPanel(kind, { width = 640, height = 420, label, lines } = {}) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  (DRAW[kind] || DRAW.browser)(ctx, width, height, label, lines);
  return c;
}
