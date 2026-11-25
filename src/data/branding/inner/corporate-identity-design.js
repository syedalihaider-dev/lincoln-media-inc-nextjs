// /services/corporate-identity-design — corporate identity on the Branding service master.
// Demo brand: Calder Partners (advisory). Video: choosing from a colour fan (Mixkit). No figures or clients.
import { BRANDS, BIMG } from "../brands";
import poster from "@public/videos/branding/swatches-poster.jpg";

export default {
  name: "Corporate Identity",
  brand: BRANDS.calder,
  seo: {
    title: "Corporate Identity Design Agency — Visual Identity Systems | The Lincoln Media",
    description: "Corporate identity design: logo, colour, typography, stationery, templates and brand guidelines — one coherent visual identity system for every document, screen and space your company uses.",
    keywords: ["corporate identity design", "visual identity system", "brand identity agency", "corporate branding", "stationery design", "brand guidelines", "rebranding"],
    image: poster,
    imageAlt: "Hands fanning through a deck of paint colour swatches",
  },

  hero: {
    kicker: "Corporate Identity Design",
    title: "Corporate Identity",
    sub: "One company. One way of showing up.",
    lead: "A corporate identity is the complete visual system behind a company — mark, colour, type, layout and the rules that bind them — so every proposal, office and screen looks unmistakably like you.",
    img: BIMG.stationeryEnvelopes, alt: "Blank stationery, envelopes and cards arranged on a table",
    artefact: "letter",
  },

  intro: {
    kicker: "The service",
    statement: "Credibility is built one consistent document at a time.",
    text: [
      "Clients judge a firm by everything it sends them: the letter, the deck, the report, the email signature. When those look like they came from different companies, trust quietly erodes.",
      "We design corporate identities as systems: a mark and palette, a typographic hierarchy, grids and templates for the documents you actually produce, and guidelines your team can follow without a designer in the room.",
    ],
    img: BIMG.stationerySage, alt: "Stationery and envelopes laid out on a sage background",
  },

  challenge: {
    kicker: "The challenge",
    title: "Growth makes brands drift.",
    items: ["Five versions of the logo", "Decks made from scratch", "Offices that look different", "Colours picked by eye", "No one owns the rules", "Merged firms, mixed looks"],
    resolve: "One system, documented and templated, so the brand stays itself as the company grows.",
  },

  solution: {
    kicker: "The solution",
    title: "A system, not a style.",
    artefact: "letter",
    points: [
      { name: "Mark & signature", text: "A confident mark and a consistent way of signing every document.", focus: [8, 5, 92, 17] },
      { name: "Typographic voice", text: "A hierarchy of type that makes long documents easy to read and easy to recognise.", focus: [8, 28, 92, 62] },
      { name: "Personal details", text: "Names, roles and contact details set the same way on every piece.", focus: [8, 64, 60, 78] },
      { name: "Colour as a signal", text: "A restrained palette, with an accent used sparingly so it means something.", focus: [8, 88, 45, 97] },
    ],
  },

  showcase: {
    kicker: "The system",
    title: "From letterhead to the lobby wall.",
    text: "The Calder identity across stationery, presentations and the building itself.",
    plates: [
      { kind: "letter", bg: BIMG.paperGrey, caption: "Letterhead" },
      { kind: "slide", bg: BIMG.stationerySage, caption: "Presentation template" },
      { kind: "sign", bg: BIMG.paperWhite, caption: "Fascia & signage" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Every part of the identity.",
    items: [
      { name: "Logo & brand mark", text: "The signature of the company, drawn for print, screen and signage." },
      { name: "Colour & typography", text: "A palette and type system specified for every medium." },
      { name: "Stationery suites", text: "Letterheads, cards, envelopes, compliment slips and email signatures." },
      { name: "Document templates", text: "Proposals, reports and presentations your team can build quickly." },
      { name: "Environmental graphics", text: "Signage, wayfinding and wall graphics for offices and receptions." },
      { name: "Brand guidelines", text: "A practical manual covering every rule, with examples of right and wrong." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From audit to adoption.",
    steps: [
      { name: "Brand audit", text: "Every document, template and space reviewed to see what's working and what isn't." },
      { name: "Strategy", text: "Positioning and personality defined, so the identity has something to express." },
      { name: "Identity design", text: "Mark, palette, type and layout system designed and tested on real documents." },
      { name: "Templates", text: "The everyday documents built as templates in the tools your team uses." },
      { name: "Guidelines & rollout", text: "A guideline manual, training and a rollout plan for every touchpoint." },
    ],
  },

  experience: {
    kicker: "The identity at work",
    title: "Recognisable in every room.",
    text: "In a pitch, in a report, at the reception desk — the same calm, confident company, every time.",
    video: { src: "/videos/branding/swatches.mp4", mobile: "/videos/branding/swatches-mobile.mp4", poster: "/videos/branding/swatches-poster.jpg" },
    reel: [{ img: BIMG.swatchFan }, { kind: "card-back" }, { img: BIMG.stationeryEnvelopes }, { kind: "slide" }, { img: BIMG.paperStack }, { kind: "site", img: BIMG.studioSunlit }],
  },

  faq: {
    kicker: "Questions",
    title: "Corporate identity, answered.",
    items: [
      { q: "What does a corporate identity include?", a: "Typically a logo and its versions, a colour palette, typography, layout grids, imagery guidance, stationery, document and presentation templates, signage principles and a brand guidelines manual." },
      { q: "We're a merger of two firms — can you unify them?", a: "Yes. We audit both identities, agree what each brings, and design one system that respects both histories while presenting a single company." },
      { q: "Will the templates work in Word, PowerPoint or Google Slides?", a: "Yes. We build templates in the tools your team already uses, with styles and layouts locked so documents stay on-brand." },
      { q: "How do you make sure the team actually uses it?", a: "Clear guidelines with examples, ready-made templates and a short training session — the easiest way to be on-brand should be the default way." },
      { q: "Can you roll the identity out to our offices and signage?", a: "Yes. We design environmental graphics and signage and work with your fabricators to produce and install them." },
    ],
  },

  cta: {
    title: ["Let's build your", "identity system."],
    text: "Tell us about your company and where its brand shows up today. We'll come back with a plan and a timeline.",
    artefact: "letter",
  },
};
