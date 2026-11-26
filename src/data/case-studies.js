// /case-studies — the exhibition of the studio's real case studies (src/data/work.js, pages at /work/<slug>).
// Facts are only what those pages state: client, sector, year, services and the one-line brief.
// No challenge / approach / results copy exists for any project, so none is shown or invented.
// The photographs are sector photography (see work.js), described as what they show.
import { CASE_STUDIES, LAUNCHES } from "@/data/work";
import belgravia from "@public/images/work/belgravia-london.jpg";

export const CS_PATH = "/case-studies";

const by = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, { ...c, href: `/work/${c.slug}` }]));

// Exhibition order — each room has its own technique (see components/CaseStudies)
export const ROOM_ORDER = ["belgravia-london", "betterhomes", "cryptosouk", "the-bagel-shak", "aureum", "polly", "bike-store", "upmatch"];
export const ROOMS = ROOM_ORDER.map((slug) => by[slug]);
export const room = (slug) => by[slug];

export const CS_PAGE = {
  seo: {
    title: "Case Studies — Selected Work | The Lincoln Media",
    description:
      "Selected case studies from The Lincoln Media, a New York digital studio: luxury real estate, property platforms, fintech, food & beverage, retail e-commerce, SaaS, recruitment and fine jewellery — web design, development, branding, Shopify Plus and SEO.",
    image: belgravia,
    imageAlt: "Aerial view of London and the Thames at dusk — Belgravia London case study",
  },
  hero: {
    kicker: "Case studies · Selected work",
    // the studio's own line for its work (homepage, Selected work chapter)
    lines: ["Built to perform.", "Designed to be felt."],
    intro: "Eight brands across property, fintech, retail, SaaS, food, recruitment and fine jewellery. Each one gets its own room.",
    cue: "Scroll to enter",
  },
  // where each photograph sits in the opening collage: x/y = centre in % of the stage, w = width in vw,
  // r = aspect ratio, d = depth (0 far … 1 near); m = mobile placement [x, y, w] or null (hidden on phones)
  collage: [
    { slug: "upmatch", x: 36, y: 15, w: 12, r: 4 / 3, d: 0.35, m: [27, 20, 40] },
    { slug: "the-bagel-shak", x: 80, y: 22, w: 15, r: 1, d: 0.8, m: [77, 15, 32] },
    { slug: "aureum", x: 12, y: 27, w: 13, r: 3 / 4, d: 0.9, m: [56, 52, 28] },
    { slug: "betterhomes", x: 9, y: 76, w: 14, r: 4 / 3, d: 0.55, m: [22, 76, 38] },
    { slug: "cryptosouk", x: 29, y: 84, w: 15, r: 3 / 2, d: 0.75, m: null },
    { slug: "bike-store", x: 66, y: 86, w: 14, r: 4 / 3, d: 0.45, m: [79, 84, 36] },
    { slug: "polly", x: 89, y: 64, w: 15, r: 4 / 3, d: 0.65, m: null },
  ],
  gallery: {
    // detail crops of the photograph: object-position + zoom
    crops: [
      { pos: "56% 38%", zoom: 1.9, alt: "Detail: the lit upper-floor windows behind the gum tree's trunk" },
      { pos: "70% 66%", zoom: 1.7, alt: "Detail: the glazed terrace and dining room glowing at dusk" },
    ],
    verbs: ["Search.", "Compare.", "Book."],
  },
  bagel: { lines: ["A loud, hungry brand", "and an ordering flow", "that gets bagels", "into hands faster."] },
  aureum: {
    words: ["Quiet luxury,", "loud results."],
    video: { src: "/videos/ecommerce/bracelet.mp4", mobileSrc: "/videos/ecommerce/bracelet-mobile.mp4", poster: "/videos/ecommerce/bracelet-poster.jpg" },
  },
  polly: { halves: ["Turning a dense analytics product", "into a dashboard teams actually enjoy opening."] },
  bike: {
    words: ["Performance", "machines"],
    details: [
      { pos: "14% 70%", zoom: 2.1, alt: "Detail: the deep-section carbon front wheel" },
      { pos: "44% 74%", zoom: 2.6, alt: "Detail: the chainring and crank of the road bike" },
    ],
  },
  index: {
    kicker: "The full collection",
    title: "Every room, at a glance",
    launchesTitle: "Launched with our partner Sybrid",
  },
  finale: {
    kicker: "Start a project",
    title: "Yours could be next.",
    text: "Eight brands, eight different problems. Tell us about yours.",
    primary: { label: "Start a project", href: "/contact-us#contact-form" },
    secondary: { label: "Get your AI build plan", href: "/" },
    video: { src: "/videos/nyc-night.mp4", mobileSrc: "/videos/nyc-night-mobile.mp4", poster: "/videos/nyc-night-poster.jpg" },
  },
};

export { LAUNCHES };
