// /services/ux-workshops — UX Design Workshop. Source: lincolnmediainc.com/services/ux-workshops
// (collaborative workshops for teams at the discovery and definition phase; determine the task —
// gap analysis, user journey maps; prepare collateral; practise and tweak). Left out: figures, clients.
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgConcept from "@public/images/about/concept-strategy.webp";

export default {
  seo: {
    title: "UX Design Workshops — Discovery, Journey Mapping & Alignment | The Lincoln Media",
    description: "Collaborative UX design workshops for product teams: discovery, gap analysis, user journey mapping, prioritisation and sketching — leaving your team aligned on what to build and why.",
    keywords: ["UX design workshop", "UX workshop", "design thinking workshop", "user journey mapping", "discovery workshop", "product discovery"],
    image: imgTeam,
    imageAlt: "A team working together around a table of laptops and phones",
  },
  hero: {
    headline: "Get the whole team agreeing on what to build — and why.",
    text: "Hands-on workshops at the discovery and definition stage: we bring the methods, the materials and the facilitation; your team brings what it knows. You leave with decisions, not just notes.",
    cta: "Plan a workshop",
    discipline: "Facilitated UX workshops",
    deliverables: ["Gap analysis", "Journey maps", "Priorities", "Sketches", "Next steps"],
    tools: ["FigJam", "Miro", "Sticky notes", "Dot voting"],
    view: "journeymap",
  },
  intro: {
    kicker: "The brief",
    title: "Most product problems are really alignment problems.",
    challenge: "Sales, support, design and engineering each see a different product — and a different user. Decisions stall, or get made on opinion.",
    approach: "Structured, collaborative sessions: we define the task, prepare the collateral, then work through it together and refine as we go.",
    outcome: "A shared picture of your users, an agreed set of priorities and a clear brief your team can act on the next morning.",
    image: imgConcept,
    alt: "A person working on a tablet beside a desktop monitor showing code",
  },
  method: {
    kicker: "Methodology",
    title: "How a workshop runs.",
    steps: [
      { name: "Determine", text: "Define the task and the gaps.", notes: ["Gap analysis", "Who's in the room", "Agree the goal"] },
      { name: "Prepare", text: "Collateral before the session.", notes: ["Research summary", "Draft journey map", "Exercises & materials"] },
      { name: "Workshop", text: "Work it through together.", notes: ["Map the journey", "Find the pain points", "Sketch solutions"] },
      { name: "Refine", text: "Practise, tweak, decide.", notes: ["Vote on priorities", "Test the sketches", "Write the brief"] },
    ],
  },
  showcase: {
    kicker: "From the wall",
    title: "What a workshop produces.",
    items: [
      { label: "Day 1 — journey map", view: "journeymap", text: "The buyer's journey, with every pain point." },
      { label: "Day 1 — research wall", view: "research", text: "Notes grouped into themes." },
      { label: "Day 2 — new structure", view: "sitemap", text: "The structure the team agreed." },
      { label: "Day 2 — sketches", view: "wire", text: "Solutions sketched and voted on." },
      { label: "Day 2 — mobile flow", view: "phone", page: "home", fid: "wire", text: "The key flow on a phone." },
      { label: "Output — direction", view: "grey", text: "A direction ready to design." },
    ],
  },
  capabilities: {
    kicker: "Workshop formats",
    title: "Workshops for every stage.",
    items: [
      { name: "Discovery", text: "Align on users, goals and the problem worth solving — before anything is designed.", view: "research", items: ["Stakeholder mapping", "Gap analysis"], tag: "Format" },
      { name: "Journey mapping", text: "Map the customer's journey end to end and find where it breaks.", view: "journeymap", items: ["Journey map", "Pain points"], tag: "Format" },
      { name: "Ideation & sketching", text: "Generate solutions fast, then vote on what to take forward.", view: "wire", items: ["Crazy eights", "Dot voting"], tag: "Format" },
      { name: "Prioritisation", text: "Turn a long wish-list into an order of work everyone agrees on.", view: "sitemap", items: ["Impact vs effort", "Roadmap"], tag: "Format" },
    ],
  },
  system: {
    kicker: "Materials & tools",
    title: "Everything the room needs.",
    text: "Remote or in person, we prepare the boards, templates and exercises — and capture every decision in a shared file, from first sticky note to final component.",
    tools: ["FigJam", "Miro", "Figma", "Zoom", "Printed journey maps"],
  },
  process: {
    kicker: "The transformation",
    title: "From scattered notes to a clear direction.",
    before: { view: "research", label: "Before" },
    after: { view: "sitemap", label: "After" },
    steps: [
      { name: "Determine", text: "The task and the gaps." },
      { name: "Prepare", text: "Collateral and exercises." },
      { name: "Workshop", text: "Mapped and sketched together." },
      { name: "Refine", text: "Decided, prioritised, briefed." },
    ],
  },
  results: {
    kicker: "The outcome",
    title: "What the team leaves with.",
    task: "“Agree what to fix first on the home-buying journey.”",
    items: ["A shared picture of the user", "The pain points, ranked by impact", "Sketched solutions the team chose", "A brief ready to design from"],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your project?",
    title: "UX workshops, answered.",
    items: [
      { q: "Who should attend a UX workshop?", a: "The people who shape and support the product — typically product owners, designers, developers, marketing and customer-facing staff. Different perspectives are the point." },
      { q: "How long does a workshop take?", a: "From a focused half-day to several days for larger discovery work. We agree the length once we've understood the task and the gaps." },
      { q: "Can workshops be run remotely?", a: "Yes. We run them in person or remotely with shared online boards, prepared in advance so the session flows." },
      { q: "What do we get afterwards?", a: "The boards and maps from the session, a written summary of decisions and priorities, and a brief you can design or build from." },
      { q: "Do we need research beforehand?", a: "It helps but isn't essential. We'll gather what exists — analytics, support tickets, any past research — and prepare it as collateral for the session." },
    ],
  },
  cta: {
    kicker: "Bring your team together",
    title: ["Get everyone", "on one page."],
    text: "Tell us what your team needs to decide. We'll come back with a workshop plan — within a day.",
    button: "Plan a workshop",
    image: imgTeam,
  },
};
