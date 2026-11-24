// /services/landing-page-design — Landing Page Design. Source: lincolnmediainc.com/services/landing-page-design
// (custom landing page design and development, no templates; for WordPress, apps and websites;
// conversion-focused and data-led). Left out: figures, prices, clients and portfolio.
import imgOg from "@public/images/services/digital-marketing.jpg";
import imgSketch from "@public/images/services/ui-ux-design.jpg";
import imgLaptop from "@public/images/home/laptop-glow.jpg";
import { LANDING, CSS } from "@/components/DesignKit/Code";

export default {
  seo: {
    title: "Landing Page Design & Development — Custom, High-Converting Pages | The Lincoln Media",
    description: "Custom landing page design and development for campaigns, products and apps: one message, one action, fast-loading and tested to convert — built for WordPress or as standalone pages.",
    keywords: ["landing page design", "landing page development", "custom landing pages", "high converting landing page", "landing page agency", "campaign landing page"],
    image: imgOg,
    imageAlt: "An analytics dashboard showing page-load and bounce-rate charts",
  },
  hero: {
    headline: "One page. One message. One action.",
    text: "Custom landing pages — never templates — designed around a single campaign and built to load fast, read clearly and turn visitors into leads, sign-ups or sales.",
    cta: "Plan my landing page",
    page: "landing",
    dims: ["One page", "One goal"],
    breaks: ["Hook", "Proof", "Offer", "Action"],
    spec: [["Built for", "Campaigns"], ["Platform", "WordPress or static"], ["Goal", "One action"]],
  },
  notes: {
    kicker: "General notes",
    title: "Every click you pay for deserves a page built for it.",
    text: "Sending campaign traffic to a home page wastes it. A landing page repeats the promise the ad made, removes every distraction and makes the next step impossible to miss.",
    image: imgSketch,
    alt: "A designer sketching page wireframes on a tablet",
    points: ["Designed from scratch, never a template", "One message that matches the campaign", "One clear call to action", "Fast enough for paid traffic", "Built to test and improve"],
  },
  build: {
    kicker: "Methodology",
    title: "From brief to live page.",
    term: "meridian-west — landing",
    url: "meridian.example/west",
    page: "landing",
    steps: [
      { name: "Brief", text: "The campaign, the audience and the one action." },
      { name: "Wireframe", text: "Hook, proof, offer, action — in that order." },
      { name: "Design", text: "Copy and visuals made for this page alone." },
      { name: "Launch", text: "Built, tracked and ready to test." },
    ],
    log: [
      ["cmd", "npm run brief"], ["ok", "audience · first-time buyers"], ["ok", "goal · register interest"],
      ["cmd", "npm run wireframe"], ["ok", "hook → proof → offer → form"],
      ["cmd", "npm run build"], ["ok", "form · validated, 2 fields"], ["ok", "images · avif, lazy"], ["ok", "tracking · conversion event"],
      ["cmd", "npm run deploy"], ["warn", "  A/B test · headline variants ready"], ["url", "  live → meridian.example/west"],
    ],
  },
  sheets: {
    kicker: "Drawings",
    title: "The page, from sketch to screen.",
    items: [
      { tag: "Wireframe", title: "Launch page — structure", text: "Hook, proof, offer, action.", view: "wire", page: "landing" },
      { tag: "Design", title: "Launch page — desktop", text: "The finished page.", view: "landing" },
      { tag: "Phone", title: "Launch page — mobile", text: "Where most clicks land.", view: "phone", page: "landing" },
      { tag: "Code", title: "meridian-west.html", text: "Lean, hand-written markup.", view: "code:landing" },
      { tag: "Canvas", title: "Launch page — design file", text: "Measured and handed off.", view: "canvas", page: "landing" },
      { tag: "Grey", title: "Launch page — prototype", text: "Tested before it was styled.", view: "grey", page: "landing" },
    ],
  },
  parts: {
    kicker: "Parts list",
    title: "What a landing page needs — and nothing else.",
    page: "landing",
    items: [
      { tag: "Hook", name: "Headline that matches the ad", text: "The same promise the campaign made, in the first line people read.", box: [3, 18, 50, 46] },
      { tag: "Visual", name: "One strong image", text: "A photograph that shows the offer, not decoration.", box: [52, 19, 45, 46] },
      { tag: "Proof", name: "Reasons to believe", text: "The three things that matter, said briefly.", box: [3, 66, 94, 14] },
      { tag: "Action", name: "One clear form", text: "Short, validated and impossible to miss.", box: [3, 82, 94, 17] },
    ],
  },
  stack: {
    kicker: "Elevation",
    title: "Light by design.",
    text: "Landing pages carry paid traffic, so every layer is kept lean and measurable.",
    layers: [
      { name: "Markup", text: "One page of semantic HTML, nothing the visitor doesn't need.", tools: "HTML5", file: "meridian-west.html", code: LANDING },
      { name: "Styles", text: "Only the CSS this page uses, inlined where it speeds the first paint.", tools: "Critical CSS · Grid", file: "styles.css", code: CSS.slice(7, 17) },
      { name: "Form & tracking", text: "Validation that helps, and an event for every conversion.", tools: "Form validation · Analytics events", file: "form.js", code: ["const form = document.querySelector('#register');", "form.addEventListener('submit', (e) => {", "  if (!form.checkValidity()) {", "    e.preventDefault();", "    form.reportValidity();", "    return;", "  }", "  gtag('event', 'generate_lead', {", "    campaign: 'meridian-west',", "  });", "});"] },
      { name: "Platform", text: "Built into WordPress or delivered as a standalone page.", tools: "WordPress · Static", file: "page-west.php", code: ["<?php /* Template Name: Meridian West */", "get_header('landing'); ?>", "<main id=\"main\">", "  <?php get_template_part('parts/hero', 'launch'); ?>", "  <?php get_template_part('parts/register'); ?>", "</main>", "<?php get_footer('landing'); ?>"] },
    ],
  },
  commits: {
    kicker: "History",
    title: "From campaign to conversion.",
    steps: [
      { commit: "a8c1f02 · brief", name: "Brief", text: "The campaign, audience and the single action agreed." },
      { commit: "b31d7e9 · wireframe", name: "Wireframe", text: "Structure and copy order mapped." },
      { commit: "c6f2a10 · design", name: "Design", text: "Custom visuals and copy for this page." },
      { commit: "d0e45b8 · build", name: "Build", text: "Fast, responsive and tracked." },
      { commit: "e7b9c31 · launch", name: "Launch & test", text: "Live with headline variants ready to test." },
    ],
  },
  signoff: {
    kicker: "Inspection",
    title: "Ready for traffic.",
    page: "landing",
    items: ["The headline matches the campaign", "One action, visible on every screen", "The form works and is tracked", "Loads fast on mobile", "Ready to A/B test"],
  },
  faq: {
    kicker: "Questions",
    title: "Landing pages, answered.",
    ask: "Something else about your campaign?",
    items: [
      { q: "What's the difference between a landing page and a home page?", a: "A home page serves everyone and links everywhere. A landing page serves one campaign and one audience, with one action — which is why it converts paid traffic far better." },
      { q: "Do you use templates?", a: "No. Every landing page is designed for its campaign, audience and offer, then hand-built so it's fast and fits your brand." },
      { q: "Can you build landing pages in WordPress?", a: "Yes — as WordPress templates your team can edit, or as standalone pages, whichever suits your campaign and tools." },
      { q: "Will the page be tracked?", a: "Yes. We set up conversion tracking so every sign-up, lead or sale can be traced to the campaign that brought it." },
      { q: "Can you test different versions?", a: "Yes. We can prepare headline, image and form variants and run A/B tests to find what converts best." },
    ],
  },
  cta: {
    kicker: "Launch your page",
    title: ["Make every click", "count."],
    text: "Tell us about your campaign and who it's for. We'll come back with a landing page plan — within a day.",
    button: "Plan my landing page",
    image: imgLaptop,
  },
};
