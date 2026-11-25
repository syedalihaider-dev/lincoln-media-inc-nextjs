// /services/branding-communication-agency — the Branding & Communication category page (src/components/Branding/Main).
// Content: the live page's own claims ("Identities, packaging and brand systems with a point of view — instantly
// recognisable, impossible to forget"; "We cover the entire spectrum … including designing your company logo"),
// restructured. No figures, clients or results. One demo brand (Oro) runs through the page's artefacts.
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import { BRANDS, BIMG, SURFACES } from "./brands";
import heroPoster from "@public/videos/branding/calligraphy-poster.jpg";

export const BRAND_PATH = "/services/branding-communication-agency";
const cat = SERVICE_CATEGORIES.find((c) => c.key === "brand");

const SHORT = {
  "brochure-design": { name: "Brochures & Profiles", text: "Company profiles and brochures that read like the brand speaks." },
  "business-card-design": { name: "Business Cards", text: "Cards with the weight, finish and detail that people keep." },
  "corporate-identity-design": { name: "Corporate Identity", text: "Complete identity systems — from mark to every document." },
  "packaging-designs": { name: "Packaging", text: "Packaging that sells on the shelf and lives in the home." },
  "logo-design": { name: "Logo Design", text: "Marks built on an idea, drawn to work at every size." },
};
export const BRAND_CHILDREN = cat.items.map((i) => {
  const slug = i.href.split("/").pop();
  return { slug, path: i.href, full: i.name, ...SHORT[slug] };
});

const oro = BRANDS.oro;

export const BRAND_PAGE = {
  brand: oro,
  seo: {
    title: "Branding & Communication Agency in New York | The Lincoln Media",
    description:
      "Brand strategy, identity and communication from a New York studio: positioning, logos, visual identity systems, packaging, brand guidelines, campaigns and creative direction.",
    keywords: ["branding agency", "brand identity design", "brand strategy", "communication agency", "logo design", "visual identity", "packaging design", "creative direction", "New York branding agency"],
    image: heroPoster,
    imageAlt: "A calligrapher drawing letterforms with a broad pen",
  },

  hero: {
    kicker: "Digital Branding & Communication",
    words: ["Strategy", "Identity", "Voice", "Direction"],
    title: ["Brands people", "feel before", "they read."],
    lead: "Identities, packaging and brand systems with a point of view — instantly recognisable, impossible to forget. We cover the whole spectrum, from strategy and your logo to every word and image the brand puts into the world.",
    video: { src: "/videos/branding/calligraphy.mp4", mobile: "/videos/branding/calligraphy-mobile.mp4", poster: "/videos/branding/calligraphy-poster.jpg" },
  },

  perception: {
    kicker: "Brand perception",
    title: "A brand is what people decide you are.",
    text: "We shape that decision — deliberately, consistently, everywhere they meet you.",
    words: [
      { word: "Perception", text: "First impressions are made in a fraction of a second, by type, colour and tone, long before a word is read." },
      { word: "Recognition", text: "A distinctive system — mark, palette, voice — repeated with discipline until it's known at a glance." },
      { word: "Trust", text: "Consistency signals care. A brand that looks and sounds the same everywhere is easier to believe." },
      { word: "Positioning", text: "A clear idea of who you're for and why you're different, so every choice has something to stand on." },
      { word: "Communication", text: "The same idea, translated for every channel — from a business card to a billboard." },
    ],
    images: [
      { img: BIMG.typeBlocks, alt: "Rows of antique wooden letterpress type" },
      { img: BIMG.swatchFan, alt: "A fan of colour swatches arranged as a spectrum" },
    ],
  },

  transformation: {
    kicker: "Brand transformation",
    title: "From a name to a brand people know.",
    stages: [
      { name: "Strategy", text: "We find the idea the brand stands on — here, slow roasting and a warm welcome." },
      { name: "Identity", text: "That idea becomes a mark, a palette, type and a way of laying things out." },
      { name: "Communication", text: "The identity starts talking: a line, a campaign, a voice across every channel." },
      { name: "Recognition", text: "Repeated with care, the brand is known at a glance — even from a cup lid." },
    ],
    before: { name: "Oro Coffee", line: "Quality coffee since 2024" },
  },

  film: {
    video: { src: "/videos/branding/shoot.mp4", mobile: "/videos/branding/shoot-mobile.mp4", poster: "/videos/branding/shoot-poster.jpg" },
    lines: ["Every brand", "is a story", "told on purpose."],
    text: "Brand storytelling is choosing what to say, what to show and what to leave out — then saying it the same way in every room the brand walks into.",
  },

  capabilities: {
    kicker: "What we do",
    title: "Ten disciplines. One brand.",
    items: [
      { name: "Brand Strategy", text: "Research, audience and competitive insight distilled into one clear brand idea.", img: BIMG.drawings, alt: "Technical drawings measured with a caliper" },
      { name: "Brand Positioning", text: "Who you're for, what you stand for and why you, written so the team can use it.", img: BIMG.studioSunlit, alt: "A sunlit studio with a trestle table" },
      { name: "Brand Identity", text: "The whole system: name, mark, colour, type, imagery and the rules that bind them.", img: BIMG.typeTray, alt: "A wooden tray of metal type" },
      { name: "Visual Identity", text: "Logos, palettes, typography, iconography and layout grids, built to flex.", img: BIMG.swatchOrange, alt: "Rows of orange and red colour swatches" },
      { name: "Creative Direction", text: "Art direction for photography, film and campaigns, so every image feels like you.", img: BIMG.materials, alt: "Fabric and material samples on a table" },
      { name: "Corporate Communications", text: "Company profiles, reports, presentations and internal communications.", img: BIMG.paperStack, alt: "A stack of printed documents" },
      { name: "Campaign Development", text: "Campaign ideas, lines and executions across out-of-home, print and digital.", img: BIMG.billboardDusk, alt: "A blank billboard at dusk" },
      { name: "Content Strategy", text: "What to say, where and how often — a voice and a plan for every channel.", img: BIMG.lettering, alt: "Hand lettering on tracing paper" },
      { name: "Digital Branding", text: "The identity translated for websites, social, motion and product interfaces.", img: BIMG.pressWeb, alt: "A printing press running" },
      { name: "Brand Guidelines", text: "Clear, practical guidelines so anyone can use the brand correctly.", img: BIMG.inkRoller, alt: "An ink roller over letterpress type" },
    ],
  },

  showcase: {
    kicker: "Brand identity",
    title: "One identity, every surface.",
    frames: [
      { kind: "logo", name: "Logo & mark", text: "A sun over the horizon line — the first roast of the morning." },
      { kind: "type", name: "Typography", text: "A bold display face for voice, a quiet text face for reading." },
      { kind: "colour", name: "Colour system", text: "Espresso and crema, lit by an ember accent." },
      { kind: "cards", name: "Stationery", text: "Cards and letterheads with the same calm hierarchy." },
      { kind: "pack", name: "Packaging", text: "Labels that read from across the shop and up close at home.", img: BIMG.coffeeBag },
      { kind: "digital", name: "Digital identity", text: "The same warmth on screen, built as a design system.", img: BIMG.cupsKraft },
      { kind: "campaign", name: "Campaign", text: "Out-of-home that says one thing, beautifully." },
    ],
  },

  ecosystem: {
    kicker: "Communication ecosystem",
    title: "One voice across every channel.",
    text: "Pick a channel. The brand changes its format, never its voice.",
    channels: [
      { key: "identity", name: "Identity", text: "The source: mark, palette, type and the idea behind them." },
      { key: "website", name: "Website", text: "The brand's home — where the story is told in full." },
      { key: "social", name: "Social", text: "Short, frequent and recognisable in a moving feed." },
      { key: "campaigns", name: "Campaigns", text: "One idea, loud enough for the street." },
      { key: "content", name: "Content", text: "Guides, journals and decks that carry the voice in depth." },
      { key: "digital", name: "Digital experience", text: "Apps, emails and product moments that feel like the brand." },
    ],
  },

  direction: {
    kicker: "Creative direction",
    words: ["Light.", "Frame.", "Tone."],
    title: "Every image, directed.",
    text: "We art-direct photography, film and campaigns: the light, the set, the crop and the cast — so the brand looks like itself in every frame.",
    video: { src: "/videos/branding/product-set.mp4", mobile: "/videos/branding/product-set-mobile.mp4", poster: "/videos/branding/product-set-poster.jpg" },
  },

  process: {
    kicker: "Our process",
    title: "Seven moves from idea to icon.",
    steps: [
      { name: "Discovery", text: "Workshops, interviews and audits. We learn the business, the audience and the competition.", img: BIMG.studioSunlit },
      { name: "Strategy", text: "The insight and the brand idea — the single thought everything else serves." },
      { name: "Positioning", text: "Who it's for, what it promises and how it sounds, written down and agreed.", img: BIMG.lettering },
      { name: "Identity", text: "Mark, colour, type and imagery, explored widely then refined to one system.", art: "logo" },
      { name: "Communication", text: "Voice, messaging and the first campaign — the identity begins to speak.", img: BIMG.pressPrint },
      { name: "Launch", text: "Guidelines, templates and assets delivered; the brand goes out into the world.", art: "cards" },
      { name: "Evolution", text: "We stay close as the brand grows — new products, channels and markets.", img: BIMG.typePile },
    ],
  },

  experience: {
    kicker: "Brand experience",
    title: "Consistent, wherever it's met.",
    text: "Website, social, packaging, campaign, presentation and the smallest digital asset — one brand, recognisable in every one of them.",
    bg: BIMG.paperKraft,
  },

  faq: {
    kicker: "Questions",
    title: "About building a brand.",
    items: [
      { q: "What's the difference between a logo and a brand identity?", a: "A logo is one element. A brand identity is the whole system — mark, colours, typography, imagery, layout and voice — plus the rules for using them, so everything the brand produces looks and sounds like one company." },
      { q: "Do you start with strategy or design?", a: "Strategy. We start with discovery and positioning so the design has an idea to express. It makes the creative work faster to agree on and far easier to defend." },
      { q: "Can you refresh our brand without starting from scratch?", a: "Yes. Many brands need evolution, not revolution. We audit what has equity — a colour, a symbol, a name — keep it, and modernise the rest." },
      { q: "What do we receive at the end of a branding project?", a: "Typically: the brand strategy and positioning, logo files in every format, colour and typography specifications, brand guidelines, templates for everyday documents, and the first applications such as stationery, social and web assets." },
      { q: "Do you design packaging, brochures and stationery too?", a: "Yes — packaging, company profiles and brochures, business cards and full stationery suites are all part of our branding and communication work." },
      { q: "Can you also run campaigns and content after the identity is done?", a: "Yes. We develop campaigns, content strategy and digital branding, and our web and marketing teams can carry the brand into websites, social and paid media." },
    ],
  },

  cta: {
    kicker: "Start a project",
    title: ["Let's make you", "unmistakable."],
    text: "Tell us about your business and where you want the brand to take it. We'll come back with a plan, a team and a timeline.",
    video: { src: "/videos/branding/paint.mp4", mobile: "/videos/branding/paint-mobile.mp4", poster: "/videos/branding/paint-poster.jpg" },
  },

  surfaces: SURFACES,
};
