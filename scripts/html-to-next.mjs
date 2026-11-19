// Converts the hand-built HTML pages in legacy/ into src/data/legacy-pages.json, which the Next.js app renders.
// Each page keeps its exact markup, stylesheets and scripts, so behaviour is identical to the static site.
// Usage: npm run pages   (runs build-pages.py first, then this)
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const legacy = join(root, "legacy");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === "index.html") out.push(p);
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const pages = {};
for (const file of walk(legacy).sort()) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(html.indexOf("<head>") + 6, html.indexOf("</head>"));
  const bodyOpen = html.match(/<body([^>]*)>/);
  const body = html.slice(html.indexOf(bodyOpen[0]) + bodyOpen[0].length, html.lastIndexOf("</body>"));
  const attr = (n) => (bodyOpen[1].match(new RegExp(`${n}="([^"]*)"`)) || [])[1] || "";
  // Everything in <head> except what Next.js renders itself (charset, viewport, title, description)
  const headTags = head
    .replace(/<meta charset[^>]*>/i, "")
    .replace(/<meta name="viewport"[^>]*>/i, "")
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[^>]*>/i, "")
    .trim();
  const route = "/" + relative(legacy, file).replace(/(^|\/)index\.html$/, "");
  pages[route === "/" ? "/" : route.replace(/\/$/, "")] = {
    title: decode((head.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || ""),
    description: decode((head.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || ""),
    bodyClass: attr("class"),
    dataPage: attr("data-page"),
    head: headTags,
    body: body.trim(),
  };
}
mkdirSync(join(root, "src/data"), { recursive: true });
writeFileSync(join(root, "src/data/legacy-pages.json"), JSON.stringify(pages));
console.log(`Converted ${Object.keys(pages).length} pages → src/data/legacy-pages.json`);
