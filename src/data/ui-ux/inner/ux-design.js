// /services/ux-design — UX Design. Source: lincolnmediainc.com/services/ux-design (four phases —
// Discovery, Design, Development, Launch; a responsive, cross-platform result). Left out: "award-
// winning", figures, prices, clients and portfolio. Reference shape for the UI/UX inner datasets.
import imgSketch from "@public/images/services/ui-ux-design.jpg";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";

export default {
  seo: {
    title: "UX Design Services — User Research, Wireframes & Prototypes | The Lincoln Media",
    description: "UX design that makes products easy to use: discovery research, user journeys, information architecture, wireframes, prototypes and usability testing for websites and apps.",
    keywords: ["UX design services", "user experience design", "UX design agency", "wireframes and prototypes", "user research", "information architecture"],
    image: imgSketch,
    imageAlt: "A designer sketching page wireframes on a tablet",
  },
  hero: {
    headline: "Products people understand the first time they use them.",
    text: "We design how your website or app works — from research into what people need, through journeys, structure and prototypes, to an experience that's tested before it's built.",
    cta: "Start a UX project",
    discipline: "User experience design",
    deliverables: ["Research", "Journeys", "Wireframes", "Prototypes", "Test reports"],
    tools: ["Figma", "FigJam", "Maze", "Hotjar"],
    view: "canvas",
    page: "listing",
  },
  intro: {
    kicker: "The brief",
    title: "Good UX is invisible. You only notice it when it's missing.",
    challenge: "People leave products that make them think too hard — a confusing menu, a form that asks too much, a button they can't find.",
    approach: "We find out what your users actually need, design the shortest path to it and test that path with real people before development starts.",
    outcome: "An experience that feels obvious: fewer questions, fewer drop-offs and a product that works on every device.",
    image: imgSketch,
    alt: "A designer sketching page wireframes on a tablet beside a keyboard",
  },
  method: {
    kicker: "Methodology",
    title: "Discovery to launch, sorted.",
    steps: [
      { name: "Discovery", text: "Who uses it, what they need, what stops them.", notes: ["Interview users", "Review analytics", "Audit competitors"] },
      { name: "Design", text: "Journeys, structure and screens.", notes: ["Map the journeys", "Sitemap & navigation", "Wireframe key screens"] },
      { name: "Development", text: "Prototype, test, hand off.", notes: ["Clickable prototype", "Usability tests", "Specs for developers"] },
      { name: "Launch", text: "Live, measured and improved.", notes: ["Responsive QA", "Watch real usage", "Refine what we learn"] },
    ],
  },
  showcase: {
    kicker: "Inside the file",
    title: "The project, artboard by artboard.",
    items: [
      { label: "Research — personas & notes", view: "research", text: "What twelve interviews told us." },
      { label: "Structure — sitemap", view: "sitemap", text: "Every page, one primary task." },
      { label: "Wireframe — home", view: "wire", text: "Hierarchy before decoration." },
      { label: "Prototype — mobile", view: "phone", page: "listing", fid: "grey", text: "The journey, clickable." },
      { label: "Test — session 4", view: "test", text: "Watching where people hesitate." },
      { label: "Final — home", view: "ui", text: "The experience, ready to build." },
    ],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "What UX design delivers.",
    items: [
      { name: "User research", text: "Interviews, surveys and analytics that show what people need and what stops them today.", view: "research", items: ["Interviews", "Surveys", "Analytics review"] },
      { name: "Information architecture", text: "Sitemaps, navigation and content structure designed around real tasks.", view: "sitemap", items: ["Sitemap", "Navigation", "Content model"] },
      { name: "Wireframes & prototypes", text: "Layouts agreed in black and white, then a clickable prototype you can feel.", view: "phone", page: "home", fid: "wire", items: ["Wireframes", "Clickable prototype"] },
      { name: "Usability testing", text: "Real people, real tasks — and a design refined by what we see.", view: "test", items: ["Moderated tests", "Findings report"] },
    ],
  },
  system: {
    kicker: "Design system",
    title: "Every state, designed.",
    text: "Each component is designed in all its states — hover, pressed, focus, disabled, light and dark — and documented, so developers build exactly what was tested.",
    tools: ["Figma", "Variables & tokens", "Auto layout", "Dev mode hand-off"],
  },
  process: {
    kicker: "The transformation",
    title: "From the first sketch to the finished screen.",
    before: { view: "wire", page: "listing", label: "Wireframe" },
    after: { view: "ui", page: "listing", label: "Final" },
    steps: [
      { name: "Discovery", text: "What the page must do, and for whom." },
      { name: "Wireframe", text: "Layout and hierarchy, agreed." },
      { name: "Prototype", text: "Tested with real people." },
      { name: "Launch", text: "Designed in full, built and measured." },
    ],
  },
  results: {
    kicker: "The experience",
    title: "What people feel afterwards.",
    task: "“Find a two-bedroom in Midtown and book a Saturday viewing.”",
    items: ["Found what they needed without help", "Understood the price and what's included", "Booked in a few taps, on their phone", "Knew it worked — the confirmation arrived at once"],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your project?",
    title: "UX design, answered.",
    items: [
      { q: "What does a UX designer actually do?", a: "A UX designer works out how a product should work for the people using it: researching their needs, mapping their journeys, structuring the content, designing wireframes and prototypes, and testing them — before anything is built." },
      { q: "What are the phases of your UX design process?", a: "Discovery (research and goals), design (journeys, structure, wireframes and prototypes), development (testing, refinement and hand-off to developers) and launch (responsive QA, measuring real use and refining)." },
      { q: "Do you design for mobile and desktop?", a: "Yes. Every experience is designed to be responsive and cross-platform, with layouts planned for each screen size rather than shrunk from desktop." },
      { q: "Can you improve the UX of our existing product?", a: "Yes. We often start with a UX audit of what you have, then redesign the journeys and screens that matter most rather than starting over." },
      { q: "What will we receive at the end?", a: "Research findings, journey maps, a sitemap, wireframes, a tested prototype and a documented design ready for development — or the built product, if our developers take it forward." },
    ],
  },
  cta: {
    kicker: "Start your UX project",
    title: ["Make it feel", "obvious."],
    text: "Tell us about your product and the people who use it. We'll come back with how we'd approach it — within a day.",
    button: "Start a UX project",
    image: imgStudio,
  },
};
