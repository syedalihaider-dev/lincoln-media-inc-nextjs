import c from "./Code.module.css";

/*
 * A code editor pane with real, syntax-coloured HTML/CSS for the Meridian site. The tokenizer is a
 * small regex pass — enough to colour tags, attributes, strings, selectors, properties and comments.
 * Each line carries data-line (its index) so sections can reveal or highlight lines on scroll.
 */
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function paint(line, lang) {
  let t = esc(line);
  if (/^\s*(\/\*|<!--).*/.test(line)) return `<i class="${c.cm}">${t}</i>`;
  if (lang === "css") {
    t = t.replace(/^(\s*)([^:{}]+)(\s*\{)/, `$1<i class="${c.sel}">$2</i>$3`)
      .replace(/^(\s*)(@media[^{]*)/, `$1<i class="${c.at}">$2</i>`)
      .replace(/^(\s+)([a-z-]+)(:)/, `$1<i class="${c.prop}">$2</i>$3`)
      .replace(/(:\s*)([^;]+)(;)/, `$1<i class="${c.val}">$2</i>$3`);
    return t;
  }
  // attributes first: the tag pass only matches "&lt;", so it can't re-match the markup inserted here
  return t
    .replace(/ ([a-z-]+)="([^"]*)"/g, ` <i class="${c.attr}">$1</i>=<i class="${c.str}">"$2"</i>`)
    .replace(/(&lt;\/?)([a-z0-9-]+)/g, `$1<i class="${c.tag}">$2</i>`);
}

export default function Code({ file = "index.html", lines = HTML, lang, tabs, active = 0, className = "", start = 1, dark = true }) {
  const l = lang || (file.endsWith(".css") ? "css" : "html");
  return (
    <div className={`${c.editor} ${dark ? "" : c.light} ${className}`} aria-hidden="true">
      <div className={c.tabs}>
        {(tabs || [file]).map((t, i) => <span key={t} className={i === active ? c.on : ""}>{t}</span>)}
      </div>
      <pre className={c.pre}>
        {lines.map((ln, i) => (
          <span key={i} className={c.ln} data-line={i}>
            <b>{i + start}</b>
            <code dangerouslySetInnerHTML={{ __html: paint(ln, l) || " " }} />
          </span>
        ))}
      </pre>
    </div>
  );
}

// The Meridian site's own source, in the pieces the pages show
export const HTML = [
  "<!-- Meridian — home -->",
  '<header class="site-nav">',
  '  <a class="logo" href="/">Meridian</a>',
  '  <nav aria-label="Main">',
  '    <a href="/homes">Homes</a>',
  '    <a href="/neighbourhoods">Neighbourhoods</a>',
  "  </nav>",
  '  <a class="btn btn--dark" href="/viewing">Book a viewing</a>',
  "</header>",
  '<main id="main">',
  '  <section class="hero">',
  '    <p class="eyebrow">Manhattan homes</p>',
  "    <h1>Homes above the city.</h1>",
  '    <a class="btn" href="/homes">Browse homes</a>',
  '    <img src="towers.avif" alt="Glass towers in Midtown"',
  '      width="1200" height="900" loading="eager">',
  "  </section>",
  '  <form class="search" role="search">',
  '    <label>Neighbourhood <select name="area">…</select></label>',
  '    <button class="btn">Search</button>',
  "  </form>",
  '  <section class="cards" aria-label="New this week">',
  '    <article class="card">…</article>',
  "  </section>",
  "</main>",
];

export const CSS = [
  "/* tokens */",
  ":root {",
  "  --ink: #1d1a16;",
  "  --cream: #f4efe8;",
  "  --accent: #c4572e;",
  "  --space: clamp(20px, 4vw, 48px);",
  "}",
  ".hero {",
  "  display: grid;",
  "  grid-template-columns: 1fr 1fr;",
  "  gap: var(--space);",
  "  align-items: center;",
  "}",
  ".hero h1 {",
  "  font: 600 clamp(40px, 5vw, 64px)/1 var(--sans);",
  "  letter-spacing: -0.045em;",
  "}",
  ".cards {",
  "  display: grid;",
  "  grid-template-columns: repeat(3, 1fr);",
  "  gap: 22px;",
  "}",
];

export const RESPONSIVE = [
  "/* tablet */",
  "@media (max-width: 999px) {",
  "  .site-nav nav { display: none; }",
  "  .cards { grid-template-columns: 1fr 1fr; }",
  "}",
  "/* phone */",
  "@media (max-width: 599px) {",
  "  .hero { grid-template-columns: 1fr; }",
  "  .hero img { order: -1; }",
  "  .search { grid-template-columns: 1fr; }",
  "  .cards { grid-template-columns: 1fr; }",
  "}",
];

export const COMPONENT = [
  "<!-- components/card.html -->",
  '<article class="card">',
  '  <img class="card__img" src="loft.avif" alt=""',
  '    width="600" height="400" loading="lazy">',
  '  <span class="card__tag">New</span>',
  '  <p class="card__price">$1,850,000</p>',
  '  <h3 class="card__title">Park Avenue loft</h3>',
  '  <p class="card__meta">2 bed · 2 bath</p>',
  "</article>",
];

export const LANDING = [
  "<!-- landing/meridian-west.html -->",
  '<section class="hero hero--launch">',
  '  <p class="eyebrow">Now registering</p>',
  "  <h1>Forty-two homes. One view.</h1>",
  '  <a class="btn" href="#register">Register interest</a>',
  "</section>",
  '<form id="register" class="register" novalidate>',
  '  <input name="name" autocomplete="name" required>',
  '  <input name="email" type="email" required>',
  '  <button class="btn">Register</button>',
  "</form>",
];
