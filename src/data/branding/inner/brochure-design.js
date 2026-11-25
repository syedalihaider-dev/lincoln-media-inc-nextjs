// /services/brochure-design — company profiles & brochures on the Branding service master.
// Demo brand: Northfield Energy. Video: a stack of documents on a desk (Mixkit). No figures or clients.
import { BRANDS, BIMG } from "../brands";
import poster from "@public/videos/branding/paper-stack-poster.jpg";

export default {
  name: "Brochures & Profiles",
  brand: BRANDS.northfield,
  seo: {
    title: "Company Profile & Brochure Design Services | The Lincoln Media",
    description: "Company profile and brochure design: editorial layouts, copywriting support, photography direction and print-ready or interactive PDF files that present your business with clarity and confidence.",
    keywords: ["company profile design", "brochure design", "corporate brochure", "company profile designer", "annual report design", "editorial design", "print design agency"],
    image: poster,
    imageAlt: "A tall stack of printed documents on a desk",
  },

  hero: {
    kicker: "Company Profile & Brochure Design",
    title: "Brochures & Profiles",
    sub: "Your company, told well on paper.",
    lead: "Company profiles and brochures designed like good magazines — a clear story, generous layouts, strong photography and words that read the way the brand speaks.",
    img: BIMG.trifold, alt: "A blank trifold brochure standing on a white surface",
    artefact: "spread",
  },

  intro: {
    kicker: "The service",
    statement: "A profile is a handshake that stays on the desk.",
    text: [
      "Investors, partners and clients often meet your company through a document before they meet your people. A well-made profile answers their questions in the order they ask them — and leaves an impression of care.",
      "We plan the story, shape the copy with you, direct or select photography, and design editorial layouts on a grid built from your identity. Files are delivered print-ready, and as accessible interactive PDFs for sending.",
    ],
    img: BIMG.paperStack, alt: "A stack of printed brochures",
  },

  challenge: {
    kicker: "The challenge",
    title: "Brochures nobody finishes.",
    items: ["Walls of dense text", "Stock photos everywhere", "No clear story", "Out-of-date facts", "Looks like a template", "Hard to read on screen"],
    resolve: "A clear story, editorial layouts and real imagery — a document people actually read to the end.",
  },

  solution: {
    kicker: "The solution",
    title: "Edited like a magazine.",
    artefact: "spread",
    points: [
      { name: "Story first", text: "We structure the document around the reader's questions, not the org chart.", focus: [53, 12, 97, 40] },
      { name: "Editorial grid", text: "A grid built from the identity, so every page feels part of one publication.", focus: [53, 40, 97, 72] },
      { name: "Imagery", text: "Real photography directed or selected to show the work, the people and the places.", focus: [0, 0, 50, 100] },
      { name: "Proof points", text: "The facts that matter, set so they can be found in seconds.", focus: [53, 72, 97, 92] },
    ],
  },

  showcase: {
    kicker: "The publication",
    title: "Spreads with room to breathe.",
    text: "The Northfield profile in print and on screen.",
    plates: [
      { kind: "spread", img: BIMG.pressWeb, bg: BIMG.paperGrey, caption: "Company profile" },
      { kind: "slide", bg: BIMG.paperStack, caption: "Investor presentation" },
      { kind: "spread", img: BIMG.pressPrint, bg: BIMG.paperKraft, caption: "Project brochure" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "From first page to final file.",
    items: [
      { name: "Company profiles", text: "The definitive document about who you are and what you do." },
      { name: "Sales brochures", text: "Product and service brochures that support the sales conversation." },
      { name: "Annual & impact reports", text: "Clear, honest reporting, designed for reading and reference." },
      { name: "Copy & structure", text: "Story planning and editing so the words are as strong as the layout." },
      { name: "Photography direction", text: "Art direction for shoots, or careful selection of existing imagery." },
      { name: "Print & interactive PDF", text: "Print-ready files and accessible, linked PDFs for email." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From outline to press.",
    steps: [
      { name: "Content plan", text: "Audience, purpose and a page-by-page outline agreed." },
      { name: "Copy", text: "Your content shaped and edited into a clear story." },
      { name: "Layout", text: "An editorial grid and key spreads designed for approval." },
      { name: "Full design", text: "Every page designed, with imagery and charts drawn in-house." },
      { name: "Print & digital", text: "Proofing, print management and an interactive PDF." },
    ],
  },

  experience: {
    kicker: "The document in the world",
    title: "Read, shared, kept.",
    text: "On a boardroom table, in an investor's inbox, in a project tender — the same clear, confident company.",
    video: { src: "/videos/branding/paper-stack.mp4", mobile: "/videos/branding/paper-stack-mobile.mp4", poster: "/videos/branding/paper-stack-poster.jpg" },
    reel: [{ img: BIMG.pressWeb }, { kind: "slide" }, { img: BIMG.trifold }, { kind: "spread", img: BIMG.pressPrint }, { img: BIMG.paperStack }, { kind: "letter" }],
  },

  faq: {
    kicker: "Questions",
    title: "Brochures, answered.",
    items: [
      { q: "Do you write the content as well?", a: "We help shape it. Usually you provide the facts and drafts; we structure the story and edit the copy so it reads clearly and in the brand's voice. Full copywriting is available too." },
      { q: "Can you work with our existing photography?", a: "Yes. We select and treat existing imagery consistently, and recommend a shoot where the right pictures don't exist yet." },
      { q: "Will we get a print version and a digital version?", a: "Yes — print-ready files with bleed and crop marks, and an interactive PDF optimised for email with links and accessible text." },
      { q: "Can our team update the profile later?", a: "We can supply an editable template for simple updates, or keep the master files and update them for you." },
      { q: "Do you manage the printing?", a: "We can manage proofs and the print run with a trusted printer, or hand over files to your own printer." },
    ],
  },

  cta: {
    title: ["Let's tell your", "story well."],
    text: "Tell us who the document is for and what it needs to achieve. We'll come back with an outline and a timeline.",
    artefact: "spread",
  },
};
