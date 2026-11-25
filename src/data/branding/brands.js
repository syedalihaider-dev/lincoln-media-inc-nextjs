// Fictional demo brands for the Branding & Communication pages. Every identity artefact (marks, cards,
// stationery, labels, posters, screens) is real HTML/CSS drawn from these (src/components/Branding/kit) and
// captioned "Demo identity" — no client, project or result is implied.
// Photography: Unsplash (Unsplash License), chosen blank/unbranded so the demo identity can sit on it.
import cardBlack from "@public/images/branding/card-black.webp";
import stationeryEnvelopes from "@public/images/branding/stationery-envelopes.webp";
import stationerySage from "@public/images/branding/stationery-sage.webp";
import paperGrey from "@public/images/branding/paper-grey.webp";
import takeawaySet from "@public/images/branding/takeaway-set.webp";
import pouchGreen from "@public/images/branding/pouch-green.webp";
import pouchKraft from "@public/images/branding/pouch-kraft.webp";
import boxKraft from "@public/images/branding/box-kraft.webp";
import jarBox from "@public/images/branding/jar-box.webp";
import cupsKraft from "@public/images/branding/cups-kraft.webp";
import bagDark from "@public/images/branding/bag-dark.webp";
import trifold from "@public/images/branding/trifold.webp";
import paperStack from "@public/images/branding/paper-stack.webp";
import swatchFan from "@public/images/branding/swatch-fan.webp";
import swatchOrange from "@public/images/branding/swatch-orange.webp";
import typeBlocks from "@public/images/branding/type-blocks.webp";
import typeTray from "@public/images/branding/type-tray.webp";
import pressAntique from "@public/images/branding/press-antique.webp";
import inkRoller from "@public/images/branding/ink-roller.webp";
import typePile from "@public/images/branding/type-pile.webp";
import studioSunlit from "@public/images/branding/studio-sunlit.webp";
import lettering from "@public/images/branding/lettering.webp";
import drawings from "@public/images/branding/drawings.webp";
import materials from "@public/images/branding/materials.webp";
import billboardDusk from "@public/images/branding/billboard-dusk.webp";
import billboardNight from "@public/images/branding/billboard-night.webp";
import billboardCity from "@public/images/branding/billboard-city.webp";
import coffeeBag from "@public/images/branding/coffee-bag.webp";
import pressWeb from "@public/images/branding/press-web.webp";
import pressPrint from "@public/images/branding/press-print.webp";
import signBrick from "@public/images/branding/sign-brick.webp";
import paperKraft from "@public/images/branding/paper-kraft.webp";
import paperWhite from "@public/images/branding/paper-white.webp";

export const BIMG = {
  cardBlack, stationeryEnvelopes, stationerySage, paperGrey, takeawaySet, pouchGreen, pouchKraft, boxKraft, jarBox,
  cupsKraft, bagDark, trifold, paperStack, swatchFan, swatchOrange, typeBlocks, typeTray, pressAntique, inkRoller,
  typePile, studioSunlit, lettering, drawings, materials, billboardDusk, billboardNight, billboardCity, coffeeBag,
  pressWeb, pressPrint, signBrick, paperKraft, paperWhite,
};

// Where the blank faces sit in the photos (percent of the image), so artwork can be placed on them
export const SURFACES = {
  billboardNight: { img: billboardNight, alt: "A lit bus-stop poster case on a wet street at night", box: [37.3, 36.7, 62.2, 63.3] },
  billboardCity: { img: billboardCity, alt: "A large billboard between city buildings", box: [30, 17.2, 68, 58.8] },
  signBrick: { img: signBrick, alt: "A sign mounted on a brick building", box: [27, 45.5, 54, 57.8] },
};

/*
 * A brand: name, the mark (shape + letter), palette (first = ink, second = paper, third = accent),
 * the line it speaks in, and the people/places that appear on its stationery (all invented).
 */
export const BRANDS = {
  // the category page's brand: a Brooklyn coffee roaster — packaging, cafe, campaign, web, social
  oro: {
    name: "Oro", full: "Oro Coffee Roasters", mark: { shape: "sun", letter: "o" }, lower: true,
    colors: [
      { name: "Espresso", hex: "#2a1a12" }, { name: "Crema", hex: "#f3e8d6" }, { name: "Ember", hex: "#e0552b" }, { name: "Leaf", hex: "#2f4a3a" },
    ],
    idea: "Slow roast. Warm welcome.",
    line: "Mornings, done slowly.",
    descriptor: "Coffee roasters · Brooklyn",
    domain: "orocoffee.co", handle: "@oro.roasters",
    person: { name: "Maya Ortiz", role: "Head Roaster", email: "maya@orocoffee.co", phone: "+1 718 555 0142" },
    address: "88 Kent Ave, Brooklyn NY",
  },
  // logo design: an outdoor equipment maker
  kestrel: {
    name: "Kestrel", full: "Kestrel Outfitters", mark: { shape: "peak", letter: "K" },
    colors: [{ name: "Granite", hex: "#1d2326" }, { name: "Bone", hex: "#ece8df" }, { name: "Signal", hex: "#f2a23a" }, { name: "Pine", hex: "#33503f" }],
    idea: "Built for the long way round.", line: "Further, on purpose.", descriptor: "Outdoor equipment · Est. 2024",
    domain: "kestrel.co", handle: "@kestrel.outfitters",
    person: { name: "Jonah Reyes", role: "Founder", email: "jonah@kestrel.co", phone: "+1 212 555 0188" }, address: "20 Hudson Yards, New York NY",
    site: { nav: ["Packs", "Shelter", "Field notes", "Repairs"], cta: "Shop the range" },
    label: { product: "Ridge 40L", note: "Trail pack · Granite", lines: ["Repairable for life", "Recycled ripstop shell"] },
    slide: { title: "The year ahead", items: ["Launch the repair programme", "Open the first field store", "Bring the range to Europe"] },
  },
  // corporate identity: an advisory firm
  calder: {
    name: "Calder", full: "Calder Partners", mark: { shape: "square", letter: "C" },
    colors: [{ name: "Ink", hex: "#121a2b" }, { name: "Stone", hex: "#eceef1" }, { name: "Brass", hex: "#b58a4c" }, { name: "Slate", hex: "#5a6b7d" }],
    idea: "Clear advice for complex decisions.", line: "Clarity, on record.", descriptor: "Advisory · New York · London",
    domain: "calderpartners.com", handle: "@calderpartners",
    person: { name: "Eleanor Hart", role: "Managing Partner", email: "e.hart@calderpartners.com", phone: "+1 212 555 0110" }, address: "667 Madison Ave, New York NY",
    site: { nav: ["Advisory", "Sectors", "Insights", "People"], end: "Contact", cta: "Talk to a partner" },
    label: { product: "Annual Outlook", note: "Report · 2027", lines: ["Markets, capital and risk", "For clients and partners"] },
    slide: { title: "Our advice, in three moves", items: ["Clarify the decision", "Model the options", "Commit, and review"] },
  },
  // business cards: an architecture studio
  kova: {
    name: "Kova", full: "Studio Kova", mark: { shape: "arch", letter: "k" }, lower: true,
    colors: [{ name: "Charcoal", hex: "#18181a" }, { name: "Plaster", hex: "#efeae2" }, { name: "Terracotta", hex: "#b8583a" }, { name: "Olive", hex: "#6b6a43" }],
    idea: "Rooms that hold a quiet.", line: "Architecture, slowly.", descriptor: "Architecture & interiors",
    domain: "studiokova.com", handle: "@studio.kova",
    person: { name: "Ana Kovač", role: "Principal Architect", email: "ana@studiokova.com", phone: "+1 646 555 0173" }, address: "41 Wooster St, New York NY",
    site: { nav: ["Projects", "Studio", "Journal", "Press"], end: "Contact", cta: "See the work" },
    label: { product: "Monograph", note: "Selected work · Vol. 1", lines: ["Houses, rooms and gardens", "Printed on uncoated stock"] },
    slide: { title: "The brief, restated", items: ["Light from the north", "A kitchen that gathers", "Rooms that hold a quiet"] },
  },
  // brochures & company profiles: a renewable infrastructure company
  northfield: {
    name: "Northfield", full: "Northfield Energy", mark: { shape: "stripes", letter: "N" },
    colors: [{ name: "Deep", hex: "#0f2a2e" }, { name: "Mist", hex: "#eef3f1" }, { name: "Volt", hex: "#c8e05a" }, { name: "Tide", hex: "#2f7a78" }],
    idea: "Power that lasts longer than a promise.", line: "Built to outlast.", descriptor: "Renewable infrastructure",
    domain: "northfield.energy", handle: "@northfieldenergy",
    person: { name: "Samuel Okoye", role: "Chief Executive", email: "s.okoye@northfield.energy", phone: "+1 332 555 0129" }, address: "1 Vanderbilt Ave, New York NY",
    site: { nav: ["Projects", "Approach", "Investors", "Careers"], end: "Contact", cta: "Read the profile" },
    label: { product: "Company Profile", note: "2027 edition", lines: ["Who we are and how we build", "For partners and investors"] },
    slide: { title: "How we build", items: ["Site and grid studies", "Community partnership", "Long-term operation"] },
  },
  // packaging: a loose-leaf tea house
  thyme: {
    name: "Wild Thyme", full: "Wild Thyme Tea Co.", mark: { shape: "leaf", letter: "W" },
    colors: [{ name: "Forest", hex: "#1f3b2d" }, { name: "Oat", hex: "#f1ead8" }, { name: "Saffron", hex: "#e3a53b" }, { name: "Clay", hex: "#b4664a" }],
    idea: "Grown slowly, steeped simply.", line: "A slower cup.", descriptor: "Loose-leaf tea · small harvests",
    domain: "wildthyme.tea", handle: "@wildthyme.tea",
    person: { name: "Priya Nair", role: "Tea Buyer", email: "priya@wildthyme.tea", phone: "+1 917 555 0156" }, address: "12 Orchard St, New York NY",
    site: { nav: ["Teas", "Teaware", "Brewing", "Gifts"], cta: "Shop tea" },
    label: { product: "Mountain Green", note: "Loose leaf · 100 g", lines: ["Grassy, sweet, a little smoke", "Hand-picked, small harvest"] },
    slide: { title: "Next season", items: ["Two new single-estate teas", "A refill tin programme", "Gift boxes for the holidays"] },
  },
};
