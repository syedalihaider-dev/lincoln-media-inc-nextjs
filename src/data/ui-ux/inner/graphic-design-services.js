// /services/graphic-design-services — Graphic Design. Source: lincolnmediainc.com/services/graphic-design-services
// (logo, print design, illustration and animation for brands). Left out: "50+ brands", figures, clients.
import imgSwatches from "@public/images/services/branding.jpg";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";

export default {
  seo: {
    title: "Graphic Design Services — Logos, Print, Illustration & Brand Assets | The Lincoln Media",
    description: "Graphic design for brands that want to be remembered: logos, brand identity, print design, illustration, social and digital assets and motion — designed as one consistent system.",
    keywords: ["graphic design services", "graphic design agency", "logo design", "print design", "brand identity design", "illustration"],
    image: imgSwatches,
    imageAlt: "Colour swatches and brand sketches spread across a desk",
  },
  hero: {
    headline: "A look people recognise before they read your name.",
    text: "Logos, print, illustration and motion — designed as one system, so your brand looks the same on a business card, a brochure, a website and a phone screen.",
    cta: "Start a design project",
    discipline: "Graphic & brand design",
    deliverables: ["Logo", "Brand guide", "Print", "Illustration", "Motion"],
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma", "After Effects"],
    view: "brand",
  },
  intro: {
    kicker: "The brief",
    title: "Every touchpoint is a chance to be remembered.",
    challenge: "A brand that looks slightly different everywhere — a stretched logo here, a new colour there — feels less trustworthy than it is.",
    approach: "We design the core identity first, then every asset from it: one palette, one type system, one way of drawing and moving.",
    outcome: "A brand that's instantly recognisable, with the files and guidelines to keep it consistent wherever it appears.",
    image: imgSwatches,
    alt: "Colour swatches, a colour book and a tablet sketch on a desk",
  },
  method: {
    kicker: "Methodology",
    title: "From mood to master files.",
    steps: [
      { name: "Discover", text: "Your audience, competitors and voice.", notes: ["Brand questionnaire", "Competitor review", "Mood boards"] },
      { name: "Concept", text: "Directions to choose from.", notes: ["Logo sketches", "Colour palettes", "Type pairings"] },
      { name: "Design", text: "The identity and its assets.", notes: ["Final logo suite", "Print layouts", "Illustration style"] },
      { name: "Deliver", text: "Files and guidelines.", notes: ["Brand guide", "Print-ready files", "Digital assets"] },
    ],
  },
  showcase: {
    kicker: "The identity",
    title: "One brand, everywhere it appears.",
    items: [
      { label: "Identity — brand board", view: "brand", text: "Logo, palette, type and print together." },
      { label: "System — colour & type", view: "tokens", text: "The rules behind the look." },
      { label: "Digital — website", view: "ui", text: "The identity online." },
      { label: "Mobile — app", view: "phone", page: "home", text: "On the smallest screen." },
      { label: "Print — campaign page", view: "landing", text: "A launch in the same voice." },
      { label: "Product — dashboard", view: "dashboard", text: "Even internal tools on brand." },
    ],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "What we design.",
    items: [
      { name: "Logo & identity", text: "A logo suite, palette and type system with the guidelines to use them well.", view: "brand", items: ["Logo suite", "Brand guide"] },
      { name: "Print design", text: "Business cards, brochures, flyers, packaging and signage — print-ready.", view: "landing", items: ["Brochures", "Stationery", "Packaging"] },
      { name: "Illustration", text: "A drawing style that's yours, for the web, social and print.", view: "tokens", items: ["Custom illustration", "Icon sets"] },
      { name: "Animation & social", text: "Motion graphics and social assets that move the brand onto every feed.", view: "phone", page: "listing", items: ["Motion graphics", "Social templates"] },
    ],
  },
  system: {
    kicker: "Brand system",
    title: "Designed to stay consistent.",
    text: "We build your identity as a system of reusable assets — colours, type, components and templates in every state and theme — so new material always looks like you.",
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma", "After Effects"],
  },
  process: {
    kicker: "The transformation",
    title: "From mood board to finished brand.",
    before: { view: "research", label: "Mood" },
    after: { view: "brand", label: "Brand" },
    steps: [
      { name: "Discover", text: "Audience and voice." },
      { name: "Concept", text: "Directions explored." },
      { name: "Design", text: "Identity and assets." },
      { name: "Deliver", text: "Files and guidelines." },
    ],
  },
  results: {
    kicker: "The result",
    title: "A brand that works everywhere.",
    task: "“Recognise the brand from a single page of its website.”",
    items: ["The logo reads at any size", "Colour and type are consistent on every page", "Print and screen feel like one brand", "Your team has the files and rules to keep it that way"],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your project?",
    title: "Graphic design, answered.",
    items: [
      { q: "What graphic design services do you offer?", a: "Logo and brand identity, print design (business cards, brochures, flyers, packaging), illustration, social media and digital assets, and animation." },
      { q: "How many logo concepts will we see?", a: "We present a small number of distinct directions based on the discovery work, then refine the one you choose until it's right." },
      { q: "Will we receive the source files?", a: "Yes — logos in every format you'll need, print-ready files, source files and a brand guide explaining how to use them." },
      { q: "Can you design print and digital together?", a: "Yes. We design the identity as one system, so the same brand works on paper, on screen and in motion." },
      { q: "Can you refresh our existing brand rather than replace it?", a: "Yes. Often the best result is an evolution — keeping what people recognise and fixing what's inconsistent." },
    ],
  },
  cta: {
    kicker: "Design your brand",
    title: ["Look like", "yourself, everywhere."],
    text: "Tell us about your brand and where it needs to show up. We'll come back with how we'd approach it — within a day.",
    button: "Start a design project",
    image: imgStudio,
  },
};
