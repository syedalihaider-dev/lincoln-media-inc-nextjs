// /services/logo-design — reference dataset for the Branding service master (src/components/Branding/Inner).
// Demo brand: Kestrel Outfitters. Video: sketching in a notebook (Mixkit). No figures, prices or clients.
import { BRANDS, BIMG } from "../brands";
import poster from "@public/videos/branding/sketching-poster.jpg";

export default {
  name: "Logo Design",
  brand: BRANDS.kestrel,
  seo: {
    title: "Logo Design Services in New York — Custom Logos & Marks | The Lincoln Media",
    description: "Custom logo design built on strategy: wordmarks, symbols and monograms drawn to work at every size, with a full set of lock-ups, colour versions and files for print and screen.",
    keywords: ["logo design", "custom logo design", "logo designer New York", "brand mark", "wordmark design", "monogram logo", "logo redesign"],
    image: poster,
    imageAlt: "A designer sketching in a notebook beside a tray of pencils",
  },

  hero: {
    kicker: "Logo Design",
    title: "Logo Design",
    sub: "A mark with an idea inside it.",
    lead: "Every logo we draw starts with a reason — the one thing the brand should be remembered for — and ends as a mark that works on a phone icon, a shopfront and everything in between.",
    img: BIMG.lettering, alt: "Hand lettering drawn on tracing paper with a mechanical pencil",
    artefact: "logo",
  },

  intro: {
    kicker: "The service",
    statement: "The smallest piece of the brand does the most work.",
    text: [
      "A logo is seen more often than anything else a company makes — on screens, signs, packaging and invoices — usually for less than a second. It has to be distinctive, simple enough to remember and robust enough to survive every size and surface.",
      "We design logos from strategy outwards: we define what the mark should say, sketch widely, then draw and refine the strongest route on a construction grid until it holds together at sixteen pixels and sixteen feet.",
    ],
    img: BIMG.drawings, alt: "Technical drawings being measured with a caliper",
  },

  challenge: {
    kicker: "The challenge",
    title: "Most logos fail quietly.",
    items: ["Looks like a competitor", "Unreadable when small", "Only works on white", "Trend that dated fast", "Too many details", "Says nothing about you"],
    resolve: "We design marks that are distinctive, simple and drawn for real use — then prove it at every size.",
  },

  solution: {
    kicker: "The solution",
    title: "Built on a grid, not a whim.",
    artefact: "logo",
    points: [
      { name: "Construction", text: "The mark is drawn on a geometric grid so its curves, weights and spacing are consistent and reproducible.", focus: [3, 5, 43, 95] },
      { name: "Lock-ups", text: "Horizontal, stacked and symbol-only versions, so the logo fits every format without being squeezed.", focus: [45, 5, 97, 48] },
      { name: "Colour & reversal", text: "Versions for light, dark and colour backgrounds — tested on real photography, not just white.", focus: [45, 52, 71, 95] },
      { name: "Small sizes", text: "A simplified symbol for favicons, app icons and embroidery, where detail disappears.", focus: [72, 52, 97, 95] },
    ],
  },

  showcase: {
    kicker: "The work",
    title: "One mark, every surface.",
    text: "The Kestrel mark on its sheet, on a card and on the street.",
    plates: [
      { kind: "logo", bg: BIMG.paperWhite, caption: "Logo sheet" },
      { kind: "cards", bg: BIMG.materials, caption: "On stationery" },
      { kind: "poster", bg: BIMG.billboardDusk, caption: "In campaign" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything a mark needs.",
    items: [
      { name: "Wordmarks & logotypes", text: "Custom-drawn lettering for the brand's name, not a typed-out font." },
      { name: "Symbols & monograms", text: "A standalone mark that can carry the brand on its own." },
      { name: "Logo redesign", text: "Modernising an existing logo while keeping the equity people recognise." },
      { name: "Responsive logo sets", text: "Primary, secondary and favicon versions for every size and format." },
      { name: "Colour & usage rules", text: "Clear space, minimum sizes, colour versions and what never to do." },
      { name: "Master artwork files", text: "Vector, print and screen files, organised and ready to hand over." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From a reason to a mark.",
    steps: [
      { name: "Brief & research", text: "Your story, audience and competitors — and the one idea the mark must carry." },
      { name: "Sketching", text: "Dozens of rough routes on paper, explored fast and wide." },
      { name: "Routes", text: "Two or three strong directions presented in context, not in isolation." },
      { name: "Refinement", text: "The chosen route drawn precisely on a grid, tested at every size." },
      { name: "Artwork & guidelines", text: "Final files, lock-ups, colours and usage rules delivered." },
    ],
  },

  experience: {
    kicker: "The mark in the world",
    title: "Recognised before it's read.",
    text: "A good mark becomes a shortcut to everything the brand means — on a jacket tag, a trail sign, a phone screen.",
    video: { src: "/videos/branding/sketching.mp4", mobile: "/videos/branding/sketching-mobile.mp4", poster: "/videos/branding/sketching-poster.jpg" },
    reel: [{ img: BIMG.typeTray }, { kind: "card-front" }, { img: BIMG.lettering }, { kind: "site", img: BIMG.studioSunlit }, { img: BIMG.drawings }, { kind: "quote" }],
  },

  faq: {
    kicker: "Questions",
    title: "Logo design, answered.",
    items: [
      { q: "How many logo concepts will we see?", a: "We sketch widely, then present two or three strong, distinct routes in context — on cards, screens and signage — rather than a long list of options. One route is then refined to completion." },
      { q: "Do we own the logo once it's finished?", a: "Yes. On final payment the full rights to the approved logo and its artwork files transfer to you." },
      { q: "Can you redesign our existing logo?", a: "Yes. We first identify what has equity — a colour, a shape, a letterform — and keep it, so customers still recognise you while the mark becomes clearer and more modern." },
      { q: "What files will we receive?", a: "Vector master files (AI, SVG, PDF), print files in CMYK and spot colour where relevant, screen files (PNG and SVG) and a favicon set, plus a short usage guide." },
      { q: "Is a logo enough, or do we need a full identity?", a: "A logo is the starting point. If you'll use the brand across many touchpoints, a full identity — colours, type, imagery and rules — keeps everything consistent." },
    ],
  },

  cta: {
    title: ["Let's draw your", "mark."],
    text: "Tell us about your business and what you want to be known for. We'll come back with a plan and a timeline.",
    artefact: "logo",
  },
};
