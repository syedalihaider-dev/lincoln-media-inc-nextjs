// /services/psd-to-html — PSD to Responsive HTML. Source: lincolnmediainc.com/services/psd-to-html
// ("PSD To Responsive HTML Design"; Photoshop designs converted into responsive HTML/CSS websites,
// manually coded, optimised for size and semantics, tested in all browsers and validated, delivered
// on time, SEO-friendly, indexable code; "will look great on all devices"). Left out: figures, AED
// prices, named clients, portfolio, the site-wide video process and web-design FAQ. Interfaces show
// "Meridian", the same fictional brand as the UI/UX pages.
import imgOg from "@public/images/services/web-development.jpg";
import imgDev from "@public/images/about/concept-strategy.webp";

export const PSD_PATH = "/services/psd-to-html";

export const PSD_PAGE = {
  seo: {
    title: "PSD to HTML Conversion — Pixel-Perfect Responsive HTML/CSS | The Lincoln Media",
    description: "PSD, Figma and XD designs hand-coded into pixel-perfect, responsive HTML and CSS: semantic markup, cross-browser tested, accessible, fast-loading and SEO-friendly.",
    keywords: ["PSD to HTML", "PSD to responsive HTML", "Figma to HTML", "design to code", "HTML CSS conversion", "pixel perfect HTML"],
    image: imgOg,
    imageAlt: "A laptop showing website HTML in a code editor",
  },
  hero: {
    kicker: "PSD to Responsive HTML",
    title: ["Design", "to code."],
    sub: "PSD to Responsive HTML",
    lead: "Your Photoshop, Figma or XD design, hand-coded into clean, responsive HTML and CSS — pixel-perfect, tested in every browser and built to load fast.",
    flow: ["Design file", "Code", "Responsive website", "Production"],
    primary: { label: "Convert my design", href: "/#contact" },
  },
  words: { kicker: "Design becomes reality", words: ["Design", "Code", "Experience"], text: ["A layer in a design file.", "Semantic, hand-written markup.", "A page people use on any screen."] },
  pixel: {
    kicker: "Pixel-perfect development",
    title: "The design, and the build, line up.",
    text: "Every spacing value, type size and colour is taken from your file — then the coded page is checked against the design, layer over layer, until they match.",
    checks: ["Spacing from the file's measurements", "Type scale and line heights", "Colours as tokens", "Images exported at 1× and 2×"],
  },
  responsive: {
    kicker: "Responsive transformation",
    title: "One page. Three layouts. Zero squeezing.",
    steps: [
      { name: "Desktop", w: 1280, rule: "≥ 1000px", code: ".cards { grid-template-columns: repeat(3, 1fr); }" },
      { name: "Tablet", w: 820, rule: "600–999px", code: "@media (max-width: 999px) { .cards { grid-template-columns: 1fr 1fr; } }" },
      { name: "Mobile", w: 390, rule: "< 600px", code: "@media (max-width: 599px) { .hero { grid-template-columns: 1fr; } }" },
    ],
  },
  architecture: {
    kicker: "HTML / CSS architecture",
    title: "Built in layers you can maintain.",
    layers: [
      { name: "Semantic HTML", text: "Header, nav, main, sections and forms — the right element for every job.", part: "nav", lines: [1, 9] },
      { name: "Layout", text: "CSS grid and flexbox, no fixed widths, no hacks.", part: "hero", lines: [10, 17] },
      { name: "Components", text: "Reusable blocks — search, card, form — with clear class names.", part: "search", lines: [17, 21] },
      { name: "Content", text: "Real content, optimised images with width, height and alt text.", part: "cards", lines: [21, 24] },
    ],
  },
  tour: {
    kicker: "Browser experience",
    title: "The finished site, live in the browser.",
    beats: [
      { name: "Navigation", text: "A header that collapses into a menu on small screens." },
      { name: "Hero", text: "Responsive images and a headline set in real type." },
      { name: "Search", text: "Form controls that work with keyboard and touch." },
      { name: "Listings", text: "Cards that reflow from three columns to one." },
      { name: "Booking form", text: "Validated fields and clear error states." },
    ],
  },
  capabilities: {
    kicker: "Development capabilities",
    title: "Every way a design becomes a site.",
    items: [
      { file: "psd-to-html.html", name: "PSD to HTML", text: "Photoshop designs converted to hand-written HTML and CSS.", view: "canvas" },
      { file: "figma-to-html.html", name: "Figma & XD to HTML", text: "Figma and Adobe XD files built with their exact tokens and spacing.", view: "code:html" },
      { file: "responsive.css", name: "Responsive HTML", text: "Layouts written for desktop, tablet and mobile on purpose.", view: "code:responsive" },
      { file: "bootstrap.html", name: "Bootstrap development", text: "Bootstrap builds when your team or CMS needs its grid and components.", view: "home", fid: "grey" },
      { file: "styles.css", name: "CSS implementation", text: "Modern CSS — custom properties, grid, flexbox — organised to last.", view: "code:css" },
      { file: "browsers.test", name: "Cross-browser compatibility", text: "Tested and fixed in every major browser.", view: "listing" },
      { file: "overlay.png", name: "Pixel-perfect conversion", text: "Checked against the design file, layer over layer.", view: "canvas", fid: "wire" },
      { file: "build.config", name: "Front-end optimisation", text: "Compressed assets, lazy-loaded images and minimal code for fast pages.", view: "landing" },
    ],
  },
  performance: {
    kicker: "Performance & compatibility",
    title: "Quality you can't see — until it's missing.",
    rows: [
      { name: "Clean markup", text: "Semantic, validated HTML with no inline clutter." },
      { name: "Responsive structure", text: "Fluid layouts and breakpoints planned per component." },
      { name: "Browser compatibility", text: "Consistent in Chrome, Safari, Firefox and Edge." },
      { name: "Performance", text: "Small files, modern image formats and lazy loading." },
      { name: "Accessibility", text: "Labels, contrast, focus states and keyboard support." },
      { name: "SEO-friendly HTML", text: "Indexable content, headings in order, meaningful titles." },
      { name: "Maintainable CSS", text: "Tokens and components your team can extend." },
    ],
    browsers: ["Chrome", "Safari", "Firefox", "Edge"],
  },
  live: { kicker: "From file to live website", stages: ["Design file", "Code", "Browser", "Live website"] },
  qa: {
    kicker: "Quality assurance",
    title: "Tested before you see it.",
    tests: [
      { name: "Desktop", device: "browser", text: "Layout, spacing and interactions at full width." },
      { name: "Tablet", device: "tablet", text: "Reflow, touch targets and orientation." },
      { name: "Mobile", device: "phone", text: "Navigation, forms and speed on a phone." },
      { name: "Browsers", device: "matrix", text: "Chrome, Safari, Firefox and Edge, side by side." },
      { name: "Approval", device: "approve", text: "Signed off against the design, ready for production." },
    ],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your design files?",
    title: "PSD to HTML, answered.",
    items: [
      { q: "Which design files can you convert?", a: "Photoshop (PSD), Figma, Adobe XD, Sketch and Illustrator files — or even a PDF of the design. We'll ask for the source file where possible so we can take exact measurements." },
      { q: "Is the HTML hand-coded?", a: "Yes. Every page is written by hand — no auto-generated markup — so it's semantic, lightweight and easy for your team or CMS to work with." },
      { q: "Will the website be responsive if my design is desktop-only?", a: "Yes. If you only have a desktop design, we'll propose and build sensible tablet and mobile layouts that follow the same visual language, and share them with you first." },
      { q: "Which browsers do you test in?", a: "The current versions of Chrome, Safari, Firefox and Edge on desktop, and Safari and Chrome on iOS and Android. Code is validated as part of QA." },
      { q: "Is the code SEO-friendly?", a: "Yes — semantic HTML, headings in order, descriptive alt text, fast-loading assets and clean, indexable markup." },
      { q: "Can you turn the HTML into a WordPress or other CMS theme?", a: "Yes. We can deliver static HTML/CSS, or build it straight into WordPress, Shopify or another CMS." },
    ],
  },
  cta: {
    kicker: "Start your build",
    title: ["Turn your design into", "a high-quality website."],
    text: "Send us your design files. We'll review them and come back with a plan and timeline — within a day.",
    primary: { label: "Convert my design", href: "/#contact" },
    image: imgDev,
  },
};
