// /services/ux-audit — UX Audit. Source: lincolnmediainc.com/services/ux-audit (heuristic UX audits;
// focus areas: digital and content strategy, CRO, lead generation, information architecture,
// engagement and retention, competitor benchmarking; toolkit: analytics, heat mapping, A/B testing,
// user recording). Left out: figures and clients.
import imgAnalytics from "@public/images/services/digital-marketing.jpg";
import imgLaptop from "@public/images/home/laptop-glow.jpg";

export default {
  seo: {
    title: "UX Audit Services — Heuristic Review, Usability & Conversion Analysis | The Lincoln Media",
    description: "A UX audit that shows what's stopping your users: heuristic evaluation, analytics, heatmaps and session recordings, competitor benchmarking and a prioritised list of fixes.",
    keywords: ["UX audit", "UX audit services", "heuristic evaluation", "usability audit", "website UX review", "conversion audit"],
    image: imgAnalytics,
    imageAlt: "An analytics dashboard showing page-load and bounce-rate charts",
  },
  hero: {
    headline: "Find out exactly where your experience loses people.",
    text: "An expert review of your website or app against proven usability principles, backed by your own data — with every finding ranked by impact and a clear fix for each.",
    cta: "Request a UX audit",
    discipline: "UX audit & heuristic review",
    deliverables: ["Heuristic review", "Data analysis", "Benchmark", "Prioritised fixes"],
    tools: ["Analytics", "Heatmaps", "Session recording", "A/B testing"],
    view: "auditreport",
  },
  intro: {
    kicker: "The brief",
    title: "Your analytics tell you where. An audit tells you why.",
    challenge: "Visitors arrive and leave without converting, and the numbers alone don't say what went wrong on the page.",
    approach: "We review every key screen against usability heuristics, then check each suspicion against your analytics, heatmaps and recordings.",
    outcome: "A ranked list of problems, each with evidence and a recommended fix — so you spend effort where it will make a difference.",
    image: imgLaptop,
    alt: "A laptop glowing in a dark room",
  },
  method: {
    kicker: "Methodology",
    title: "How we audit.",
    steps: [
      { name: "Gather", text: "Your goals, data and users.", notes: ["Business goals", "Analytics access", "Key journeys"] },
      { name: "Review", text: "Every screen, every heuristic.", notes: ["Visibility & feedback", "Consistency", "Error prevention"] },
      { name: "Evidence", text: "Check it against real behaviour.", notes: ["Heatmaps", "Session recordings", "Funnel drop-off"] },
      { name: "Prioritise", text: "Impact versus effort.", notes: ["Severity ranking", "Quick wins", "Recommendations"] },
    ],
  },
  showcase: {
    kicker: "Inside the audit",
    title: "Evidence, screen by screen.",
    items: [
      { label: "Findings — home", view: "auditreport", text: "Five issues, pinned where they happen." },
      { label: "Behaviour — recording", view: "test", text: "Where a real visitor hesitated." },
      { label: "Structure — navigation", view: "sitemap", text: "Paths that are longer than they should be." },
      { label: "Mobile — listing", view: "phone", page: "listing", text: "What changes on a small screen." },
      { label: "Benchmark — competitor", view: "landing", text: "How others solve the same task." },
      { label: "Fix — redesigned home", view: "ui", text: "The recommended fixes, applied." },
    ],
  },
  capabilities: {
    kicker: "Audit focus areas",
    title: "What we look at.",
    items: [
      { name: "Usability & IA", text: "Navigation, structure and content — can people find what they came for?", view: "sitemap", items: ["Heuristics", "Information architecture"], tag: "Focus area" },
      { name: "Conversion & leads", text: "Forms, calls to action and checkout — where the journey to a lead or sale breaks.", view: "listing", items: ["CRO", "Lead generation"], tag: "Focus area" },
      { name: "Engagement & retention", text: "What brings people back — and what makes them leave and not return.", view: "dashboard", items: ["Engagement", "Retention"], tag: "Focus area" },
      { name: "Competitor benchmarking", text: "How your experience compares with the alternatives your customers try.", view: "landing", items: ["Benchmark", "Content strategy"], tag: "Focus area" },
    ],
  },
  system: {
    kicker: "Audit toolkit",
    title: "Opinion, checked against data.",
    text: "Every finding is backed by evidence — and every recommendation is specific down to the component and its states, so your team knows exactly what to change.",
    tools: ["Analytics", "Heat mapping", "User recording", "A/B testing", "Accessibility checks"],
  },
  process: {
    kicker: "The transformation",
    title: "From findings to fixes.",
    before: { view: "auditreport", label: "Audit" },
    after: { view: "ui", label: "Fixed" },
    steps: [
      { name: "Gather", text: "Goals, data and journeys." },
      { name: "Review", text: "Heuristic evaluation." },
      { name: "Evidence", text: "Heatmaps and recordings." },
      { name: "Fix", text: "Prioritised and applied." },
    ],
  },
  results: {
    kicker: "After the fixes",
    title: "The same task, without the friction.",
    task: "“Search for a home and book a viewing.”",
    items: ["The search button is seen and used", "A confirmation appears straight after booking", "The price explains what's included", "Text is readable for everyone"],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your project?",
    title: "UX audits, answered.",
    items: [
      { q: "What is a heuristic UX audit?", a: "An expert review of your product against established usability principles — such as visibility of status, consistency, error prevention and recognition over recall — to find problems that stop people completing tasks." },
      { q: "What do you need from us?", a: "Your goals, access to analytics (and heatmaps or recordings if you have them) and a list of the journeys that matter most. We can set up tracking if it isn't in place." },
      { q: "What will the audit report include?", a: "Each finding with a screenshot, the principle it breaks, the evidence behind it, its severity and a recommended fix — ordered so the most valuable changes come first." },
      { q: "Do you also fix the issues?", a: "Yes. We can redesign the affected screens and, if you like, our developers can build the changes and A/B test them." },
      { q: "Can you audit a mobile app?", a: "Yes — websites, web apps and native mobile apps, on every device your users have." },
    ],
  },
  cta: {
    kicker: "Find the friction",
    title: ["See what your", "users see."],
    text: "Send us your site or app and the journeys that matter. We'll come back with how we'd audit it — within a day.",
    button: "Request a UX audit",
    image: imgLaptop,
  },
};
