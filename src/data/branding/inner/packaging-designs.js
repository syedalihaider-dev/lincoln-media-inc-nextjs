// /services/packaging-designs — packaging on the Branding service master.
// Demo brand: Wild Thyme Tea Co. Video: beans falling in slow motion (Mixkit). No figures or clients.
import { BRANDS, BIMG } from "../brands";
import poster from "@public/videos/branding/beans-poster.jpg";

export default {
  name: "Packaging Design",
  brand: BRANDS.thyme,
  seo: {
    title: "Packaging Design Agency — Labels, Boxes & Pouches | The Lincoln Media",
    description: "Packaging design for food, beverage, beauty and retail brands: labels, pouches, boxes and ranges designed to stand out on shelf and online, with print-ready dielines and production support.",
    keywords: ["packaging design", "packaging design agency", "label design", "product packaging", "box design", "pouch packaging design", "food packaging design"],
    image: poster,
    imageAlt: "Coffee beans falling onto a pile of roasted beans",
  },

  hero: {
    kicker: "Packaging Designs",
    title: "Packaging",
    sub: "Chosen in three seconds. Kept for months.",
    lead: "Packaging that wins the shelf and the scroll — then earns its place in the kitchen. We design labels, pouches, boxes and whole ranges, right down to the dieline.",
    img: BIMG.pouchGreen, alt: "A hand holding a blank green stand-up pouch",
    artefact: "label",
  },

  intro: {
    kicker: "The service",
    statement: "On the shelf, the pack is the salesperson.",
    text: [
      "A shopper decides in seconds, often from several feet away, then reads the detail up close. Good packaging works at both distances: a clear brand block and product name that stand out, and honest, well-set information on the back.",
      "We design packaging within the brand identity, build range architecture so products are easy to tell apart, and prepare precise dielines and print-ready artwork for your manufacturer.",
    ],
    img: BIMG.jarBox, alt: "A frosted glass jar beside a plain box",
  },

  challenge: {
    kicker: "The challenge",
    title: "Lost on a crowded shelf.",
    items: ["Blends into the category", "Range variants look identical", "Too much text on front", "Unreadable back panels", "Looks wrong online", "Prints differently than designed"],
    resolve: "Packs that stand out at distance, read well up close and print exactly as designed.",
  },

  solution: {
    kicker: "The solution",
    title: "Designed for two distances.",
    artefact: "label",
    points: [
      { name: "Brand block", text: "The mark placed where the eye lands first, consistent across every product.", focus: [12, 5, 88, 33] },
      { name: "Product & variant", text: "Name, flavour and format, colour-coded so the range is easy to navigate.", focus: [6, 35, 94, 58] },
      { name: "The story", text: "A few honest lines that make the product worth choosing.", focus: [8, 60, 92, 79] },
      { name: "Details", text: "Legal and practical information set clearly — never an afterthought.", focus: [20, 84, 80, 97] },
    ],
  },

  showcase: {
    kicker: "The range",
    title: "On shelf, online, at home.",
    text: "The Wild Thyme range on real packaging surfaces.",
    plates: [
      { kind: "label", bg: BIMG.pouchKraft, caption: "Pouch label" },
      { kind: "label", bg: BIMG.boxKraft, caption: "Gift box sleeve" },
      { kind: "quote", bg: BIMG.bagDark, caption: "Launch social" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Every part of the pack.",
    items: [
      { name: "Label design", text: "Front and back labels for jars, bottles, tins and bags." },
      { name: "Boxes & cartons", text: "Structural cartons, sleeves and gift boxes." },
      { name: "Pouches & bags", text: "Flexible packaging with clear, reliable print areas." },
      { name: "Range architecture", text: "Systems of colour and layout for families of products." },
      { name: "Dielines & artwork", text: "Precise print-ready files built to your manufacturer's templates." },
      { name: "E-commerce imagery", text: "Pack shots and mock-ups that work as small thumbnails online." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From shelf audit to production.",
    steps: [
      { name: "Category audit", text: "We study the shelf and the screen to see where you can stand out." },
      { name: "Concepts", text: "Two or three design routes, shown on the real pack shapes." },
      { name: "Range system", text: "The chosen route extended across every product and size." },
      { name: "Artwork & dielines", text: "Print-ready files built precisely to the manufacturer's templates." },
      { name: "Proofing", text: "Colour proofs and press checks so it prints as designed." },
    ],
  },

  experience: {
    kicker: "The pack in the world",
    title: "From the shelf to the kitchen.",
    text: "On a crowded shelf, in an online grid, on a kitchen counter — the same pack, recognisable and worth keeping.",
    video: { src: "/videos/branding/beans.mp4", mobile: "/videos/branding/beans-mobile.mp4", poster: "/videos/branding/beans-poster.jpg" },
    reel: [{ img: BIMG.pouchGreen }, { kind: "label" }, { img: BIMG.cupsKraft }, { kind: "social", img: BIMG.takeawaySet }, { img: BIMG.jarBox }, { kind: "colour" }],
  },

  faq: {
    kicker: "Questions",
    title: "Packaging, answered.",
    items: [
      { q: "Do you design the packaging structure or just the graphics?", a: "Mostly the graphics and range system on existing formats — labels, pouches, cartons and sleeves. For custom structures we work with packaging engineers and your manufacturer." },
      { q: "Can you work with our manufacturer's dielines?", a: "Yes. We build artwork precisely on your manufacturer's templates and check bleeds, safe areas and print processes with them." },
      { q: "Can you design a whole product range?", a: "Yes. We create a range system — colour, layout and naming rules — so new products can be added easily and shoppers can tell variants apart." },
      { q: "Will the packaging work for online sales too?", a: "Yes. We test designs as small online thumbnails and can produce pack shots and mock-ups for your store and marketplaces." },
      { q: "Can you help with regulatory information on the label?", a: "We set the information you provide clearly and consistently; the regulatory content itself should be confirmed by you or your compliance advisor." },
    ],
  },

  cta: {
    title: ["Let's design a pack", "people keep."],
    text: "Tell us about your products and where they're sold. We'll come back with a plan and a timeline.",
    artefact: "label",
  },
};
