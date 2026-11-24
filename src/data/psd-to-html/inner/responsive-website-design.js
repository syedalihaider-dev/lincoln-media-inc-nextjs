// /services/responsive-website-design — Responsive Web Design. Source: lincolnmediainc.com/services/
// responsive-website-design (responsive, mobile-friendly designs; accessibility; modern design; quick
// delivery). Left out: figures, prices, clients and portfolio. Reference shape for the PSD inner datasets.
import imgOg from "@public/images/about/laptop-mobile.webp";
import imgPhone from "@public/images/services/mobile-app-development.jpg";
import imgCode from "@public/images/services/web-development.jpg";
import { CSS, RESPONSIVE, HTML } from "@/components/DesignKit/Code";

export default {
  seo: {
    title: "Responsive Web Design Services — Mobile-Friendly Websites | The Lincoln Media",
    description: "Responsive web design that works on every screen: mobile-first layouts, fluid grids, accessible components and fast pages, designed and built for phones, tablets and desktops.",
    keywords: ["responsive web design", "mobile-friendly website", "responsive website design services", "mobile-first design", "responsive web design company"],
    image: imgOg,
    imageAlt: "A website shown on a tablet and a phone side by side",
  },
  hero: {
    headline: "One website that fits every screen it meets.",
    text: "Mobile-first, accessible and modern: layouts designed for phones, tablets and desktops on purpose, then built with fluid grids and breakpoints that hold up on any device.",
    cta: "Plan my responsive site",
    page: "home",
    dims: ["360 → 1920 px", "Fluid"],
    breaks: ["360", "600", "1000", "1440"],
    spec: [["Approach", "Mobile-first"], ["Breakpoints", "3 + fluid"], ["Standard", "WCAG 2.2 AA"]],
  },
  notes: {
    kicker: "General notes",
    title: "Most of your visitors arrive on a phone.",
    text: "A site that only works on a desktop turns people away before they read a word. We design every layout for the screen it will be seen on — and build it to adapt to the ones in between.",
    image: imgPhone,
    alt: "A hand holding a phone showing a clean app interface",
    points: ["Designed mobile-first, then widened", "Fluid grids — no fixed widths", "Touch targets sized for thumbs", "Accessible on every device", "Fast on mobile networks"],
  },
  build: {
    kicker: "Methodology",
    title: "Built in the open.",
    term: "meridian — responsive",
    url: "localhost:3000",
    page: "home",
    steps: [
      { name: "Plan", text: "Content and breakpoints agreed per page." },
      { name: "Wireframe", text: "Layouts for phone, tablet and desktop." },
      { name: "Design", text: "Visual design at every size." },
      { name: "Build", text: "Fluid grids and components, tested as we go." },
    ],
    log: [
      ["cmd", "npm run plan"], ["ok", "content model · 6 templates"], ["ok", "breakpoints · 600 / 1000 / 1440"],
      ["cmd", "npm run wireframe"], ["ok", "home · listing · contact"], ["info", "  phone → tablet → desktop"],
      ["cmd", "npm run build"], ["ok", "grid · fluid, no fixed widths"], ["ok", "images · srcset + lazy"], ["ok", "type · clamp() scale"],
      ["cmd", "npm run test:devices"], ["ok", "iPhone · Pixel · iPad · desktop"], ["url", "  ready → meridian.example"],
    ],
  },
  sheets: {
    kicker: "Drawings",
    title: "Every page, every size.",
    items: [
      { tag: "Desktop", title: "Home — 1440", text: "The full layout.", view: "home" },
      { tag: "Tablet", title: "Home — 820", text: "Two columns, menu in a button.", view: "tablet" },
      { tag: "Phone", title: "Home — 390", text: "One column, photo first.", view: "phone" },
      { tag: "Wireframe", title: "Listing — structure", text: "Agreed before it was styled.", view: "wire", page: "listing" },
      { tag: "Design", title: "Listing — 1440", text: "The finished detail page.", view: "listing" },
      { tag: "Code", title: "responsive.css", text: "The rules behind the layouts.", view: "code:responsive" },
    ],
  },
  parts: {
    kicker: "Parts list",
    title: "What a responsive site is made of.",
    page: "home",
    items: [
      { tag: "Nav", name: "Adaptive navigation", text: "A full menu on desktop that folds into a button on smaller screens.", box: [0, 7, 100, 10] },
      { tag: "Hero", name: "Fluid hero", text: "Type and images that scale with the screen, and reorder on phones.", box: [3, 19, 94, 49] },
      { tag: "Form", name: "Touch-friendly forms", text: "Large targets, the right keyboard for each field, clear errors.", box: [3, 70, 94, 10] },
      { tag: "Grid", name: "Responsive grid", text: "Cards that move from three columns to two to one.", box: [3, 84, 94, 15] },
    ],
  },
  stack: {
    kicker: "Elevation",
    title: "The layers under every page.",
    text: "Each layer is written to adapt — so the page holds together at any width.",
    layers: [
      { name: "Markup", text: "Semantic HTML that reads well on any device and to screen readers.", tools: "HTML5 · ARIA", file: "index.html", code: HTML.slice(0, 10) },
      { name: "Layout", text: "CSS grid and flexbox with fluid sizes and a few deliberate breakpoints.", tools: "Grid · Flexbox · clamp()", file: "styles.css", code: CSS.slice(7, 20) },
      { name: "Breakpoints", text: "Media and container queries that rearrange, not just shrink.", tools: "Media queries · Container queries", file: "responsive.css", code: RESPONSIVE },
      { name: "Assets", text: "Images in modern formats, sized for each screen and lazy-loaded.", tools: "AVIF · WebP · srcset", file: "card.html", code: ["<img src=\"loft-800.avif\"", "  srcset=\"loft-400.avif 400w,", "          loft-800.avif 800w,", "          loft-1600.avif 1600w\"", "  sizes=\"(max-width: 600px) 100vw, 33vw\"", "  width=\"800\" height=\"533\"", "  loading=\"lazy\" alt=\"Park Avenue loft\">"] },
    ],
  },
  commits: {
    kicker: "History",
    title: "From brief to launch.",
    steps: [
      { commit: "a1f3c2e · plan", name: "Plan", text: "Content, templates and breakpoints agreed for every page." },
      { commit: "b7d901a · wireframes", name: "Wireframes", text: "Phone, tablet and desktop layouts reviewed with you." },
      { commit: "c42e8f0 · design", name: "Design", text: "Visual design applied at every size." },
      { commit: "d903b15 · build", name: "Build", text: "Fluid, accessible front end built and optimised." },
      { commit: "e5a7c66 · test", name: "Device testing", text: "Checked on real phones, tablets and browsers." },
      { commit: "f1029bd · launch", name: "Launch", text: "Live, monitored and fast on every screen." },
    ],
  },
  signoff: {
    kicker: "Inspection",
    title: "Checked on every screen.",
    page: "home",
    items: ["Readable without zooming on a phone", "Nothing scrolls sideways at any width", "Buttons and links easy to tap", "Fast on a mobile connection", "Usable with a keyboard and screen reader"],
  },
  faq: {
    kicker: "Questions",
    title: "Responsive web design, answered.",
    ask: "Something else about your website?",
    items: [
      { q: "What is responsive web design?", a: "A website built so its layout adapts to the screen it's viewed on — rearranging content, resizing images and adjusting navigation so it's easy to use on a phone, a tablet or a large desktop." },
      { q: "Why design mobile-first?", a: "Most visitors now arrive on a phone. Designing for the smallest screen first forces clear priorities, and widening a focused layout works better than squeezing a crowded one." },
      { q: "Can you make our existing site responsive?", a: "Yes. Depending on how it's built, we can rework the front end of your current site or rebuild the templates responsively while keeping your content and CMS." },
      { q: "Is a responsive site better for SEO?", a: "Search engines index the mobile version of your site, so a fast, readable mobile experience is essential to how you rank — and it keeps visitors from leaving." },
      { q: "Which devices do you test on?", a: "Current iPhones and Android phones, iPads and Android tablets, and desktops in Chrome, Safari, Firefox and Edge — plus the widths in between." },
    ],
  },
  cta: {
    kicker: "Fit every screen",
    title: ["Ready for a site", "that fits?"],
    text: "Tell us about your site and your visitors. We'll come back with how we'd make it work on every screen — within a day.",
    button: "Plan my responsive site",
    image: imgCode,
  },
};
