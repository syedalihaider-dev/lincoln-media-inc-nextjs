// /services/business-card-design — business cards on the Branding service master.
// Demo brand: Studio Kova (architecture). Video: a designer choosing colours on screen (Mixkit). No figures or clients.
import { BRANDS, BIMG } from "../brands";
import poster from "@public/videos/branding/colour-pick-poster.jpg";

export default {
  name: "Business Cards",
  brand: BRANDS.kova,
  seo: {
    title: "Business Card Design Services — Premium Custom Cards | The Lincoln Media",
    description: "Custom business card design with premium print finishes — letterpress, foil, duplex and edge colour — designed to your brand and prepared print-ready for any printer.",
    keywords: ["business card design", "custom business cards", "premium business cards", "letterpress business cards", "foil business cards", "luxury business card design"],
    image: poster,
    imageAlt: "A designer selecting a colour on screen",
  },

  hero: {
    kicker: "Business Card Design",
    title: "Business Cards",
    sub: "The brand you can hold.",
    lead: "A business card is often the first physical piece of a brand someone touches. We design cards with the weight, finish and detail that make people keep them.",
    img: BIMG.cardBlack, alt: "A hand holding a blank black business card",
    artefact: "cards",
  },

  intro: {
    kicker: "The service",
    statement: "Paper, ink and a few millimetres of attention.",
    text: [
      "A card is small, but it's held, turned over and felt. Stock, weight, print method and finish say as much as the design itself — a heavy cotton stock with letterpress reads very differently from a thin gloss card.",
      "We design the card within your identity, choose stock and finishes to match the brand's personality, and prepare precise print-ready artwork — with proofs from the printer before anything is run.",
    ],
    img: BIMG.inkRoller, alt: "An ink roller passing over letterpress type",
  },

  challenge: {
    kicker: "The challenge",
    title: "Cards that end up in the bin.",
    items: ["Thin, flimsy stock", "Too much information", "Tiny unreadable type", "Off-brand colours", "Inconsistent per person", "Print that looks cheap"],
    resolve: "Cards with the right weight, the right finish and only what matters — consistent across the whole team.",
  },

  solution: {
    kicker: "The solution",
    title: "Designed to be kept.",
    artefact: "cards",
    points: [
      { name: "Hierarchy", text: "Name first, role second, details last — readable at a glance, nothing extra.", focus: [0, 0, 86, 64] },
      { name: "The front", text: "A confident front face — mark, colour and space — that works like a small poster.", focus: [14, 30, 100, 100] },
      { name: "Finish", text: "Letterpress, foil, duplex board or edge colour, chosen to suit the brand.", focus: [40, 55, 100, 100] },
      { name: "Team system", text: "A template that keeps every person's card consistent as the team grows.", focus: [0, 0, 100, 100] },
    ],
  },

  showcase: {
    kicker: "The cards",
    title: "Front, back and finish.",
    text: "The Kova card on three surfaces, in three finishes.",
    plates: [
      { kind: "cards", bg: BIMG.materials, caption: "Duplex board" },
      { kind: "card-front", finish: "press", bg: BIMG.paperKraft, caption: "Letterpress" },
      { kind: "card-front", finish: "foil", bg: BIMG.typePile, caption: "Foil on charcoal" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Every detail of the card.",
    items: [
      { name: "Card design", text: "Front and back designed within your brand identity." },
      { name: "Stock selection", text: "Weights and papers — cotton, uncoated, duplex — chosen with you." },
      { name: "Special finishes", text: "Letterpress, blind deboss, foil, spot UV and painted edges." },
      { name: "Team templates", text: "Editable templates so new starters get on-brand cards quickly." },
      { name: "Digital cards", text: "Matching digital business cards and email signatures." },
      { name: "Print management", text: "Print-ready files, proofs and liaison with your printer." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From brief to box of cards.",
    steps: [
      { name: "Brief", text: "Your brand, the people who'll carry the cards and how they'll be used." },
      { name: "Design", text: "Front and back layouts explored within the identity." },
      { name: "Materials", text: "Stocks and finishes sampled and agreed." },
      { name: "Artwork", text: "Precise print-ready files for each person on the team." },
      { name: "Proof & print", text: "Printer proofs checked before the run, then delivery." },
    ],
  },

  experience: {
    kicker: "The card in the world",
    title: "Handed over, kept, remembered.",
    text: "A good card outlasts the meeting — pinned to a board, tucked in a notebook, found again months later.",
    video: { src: "/videos/branding/colour-pick.mp4", mobile: "/videos/branding/colour-pick-mobile.mp4", poster: "/videos/branding/colour-pick-poster.jpg" },
    reel: [{ img: BIMG.cardBlack }, { kind: "card-front" }, { img: BIMG.inkRoller }, { kind: "card-back" }, { img: BIMG.pressAntique }, { kind: "colour" }],
  },

  faq: {
    kicker: "Questions",
    title: "Business cards, answered.",
    items: [
      { q: "Can you design cards if we don't have a full brand identity yet?", a: "Yes. We can design cards from your existing logo, or start with a light identity — logo, colours and type — that the cards then follow." },
      { q: "Do you handle printing?", a: "We prepare print-ready artwork and can manage the print run with a trusted printer, including proofs, or hand the files to your own printer." },
      { q: "What finishes do you recommend?", a: "It depends on the brand: letterpress for a tactile, crafted feel; foil for a touch of luxury; duplex board for weight and colour on the edge. We'll sample options with you." },
      { q: "Can every employee have their own card?", a: "Yes. We set up a template and prepare artwork for each person, and can provide an editable template for future starters." },
      { q: "Do you design digital business cards too?", a: "Yes — matching digital cards and email signatures so the brand is consistent on and off paper." },
    ],
  },

  cta: {
    title: ["Let's design cards", "worth keeping."],
    text: "Tell us about your team and your brand. We'll come back with options, stocks and a timeline.",
    artefact: "cards",
  },
};
