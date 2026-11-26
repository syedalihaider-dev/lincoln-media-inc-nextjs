// /services/ai-saas-mobile — content for the AI, SaaS & Mobile Apps page.
// Source: the repo's own copy for this service line (legacy page, src/data/services.js subs, homepage
// service list), restructured. No figures, prices, timelines or client names.
// Every interface on the page belongs to one fictional product, "Halden" — an operations platform for
// property-maintenance teams (web console, technician app, assistant) — labelled as a demo.
import datacenter from "@public/images/ai-saas-mobile/datacenter.webp";
import windowLight from "@public/images/ai-saas-mobile/window.webp";
import reader from "@public/images/ai-saas-mobile/reader.webp";
import desk from "@public/images/ai-saas-mobile/desk.webp";

export const AI_PATH = "/services/ai-saas-mobile";

const DIR = "/videos/ai-saas-mobile";
const clip = (name) => ({ src: `${DIR}/${name}.mp4`, mobile: `${DIR}/${name}-mobile.mp4`, poster: `${DIR}/${name}-poster.jpg` });

export const AI_IMAGES = { datacenter, windowLight, reader, desk };

export const AI_PAGE = {
  seo: {
    title: "AI, SaaS & Mobile App Development Company in New York | The Lincoln Media",
    ogTitle: "AI, SaaS & Mobile App Development — The Lincoln Media",
    description:
      "Intelligent products, SaaS platforms and native mobile apps designed and engineered in New York — AI features wired into real workflows, multi-tenant platforms built to onboard, bill and scale, and iOS and Android apps that feel effortless.",
    keywords: ["AI app development", "SaaS development company", "mobile app development New York", "LLM integration", "AI agents and automation", "MVP development", "multi-tenant SaaS", "product engineering"],
    image: `${DIR}/studio-poster.jpg`,
    imageAlt: "A developer working across two screens of code in a dim studio",
  },

  demo: { name: "Halden", note: "Demo product · illustrative data" },

  hero: {
    kicker: "AI, SaaS & Mobile Apps",
    title: ["Products that think,", "platforms that scale,", "apps people keep."],
    text: "Custom AI that does real work inside your business, SaaS platforms built to onboard, bill and scale, and native apps for iOS and Android that feel effortless.",
    chain: ["Intelligent products", "SaaS platforms", "Mobile apps", "Scalable experiences"],
    primary: { label: "Start a project", href: "/contact-us#contact-form" },
    secondary: { label: "See what we build", href: "#build" },
  },

  vision: {
    kicker: "From model to product",
    title: "Intelligence is only useful when someone can use it.",
    words: "A model on its own is a demo. A product is the screen it lives on, the permission it respects, the button that undoes it, the moment it saves somebody a morning.",
    text: "We turn capability into product: the raw output of a model becomes a decision a person can read, trust, edit and act on — inside the tools your team already uses.",
    raw: [
      "{",
      '  "request_id": "rq_8812",',
      '  "trade": "plumbing",',
      '  "urgency": 0.91,',
      '  "hazard": ["water", "electrical"],',
      '  "summary": "Leak above panel, unit 4B",',
      '  "suggested_slot": "today 14:00",',
      '  "assignee": "tech_dana"',
      "}",
    ],
  },

  showcase: {
    kicker: "Interfaces, not slides",
    title: "One product, every surface.",
    text: "A console for the office, an app for the field and an assistant between them — designed as one system so data, decisions and people stay in step.",
    chapters: [
      { view: "overview", app: "today", title: "The day at a glance", text: "Dispatchers see every job, technician and risk on one timeline — with the assistant surfacing what needs a human first." },
      { view: "requests", app: "job", title: "Requests that sort themselves", text: "Messages from email, SMS and the tenant portal are classified by trade and urgency, with a reply drafted and waiting for approval." },
      { view: "automations", app: "assistant", title: "Workflows anyone can change", text: "Rules the operations team writes in plain steps — no ticket to engineering every time the process changes." },
      { view: "billing", app: "report", title: "Built to sell as a service", text: "Workspaces, seats, plans and invoices: the SaaS plumbing that turns software into a business." },
    ],
  },

  film: {
    video: clip("studio"),
    kicker: "Where it gets made",
    lines: ["Design and engineering", "in one room,", "on one roadmap."],
    text: "Product designers, mobile and web engineers and AI specialists work as one team, so what is designed is what ships.",
  },

  build: {
    kicker: "What we build",
    title: "Capabilities, shown working.",
    text: "Pick a capability to see where it lives in a real product.",
    items: [
      { name: "AI-powered SaaS", surface: "console", view: "overview", text: "Platforms with intelligence in the workflow — assistants that know your data and surface what matters, not a chat box bolted on the side." },
      { name: "AI integrations", surface: "console", view: "requests", text: "LLMs wired into the tools your team already uses: classification, summaries, drafted replies and search across your own documents." },
      { name: "Intelligent automation", surface: "console", view: "automations", text: "Agents that handle the busywork — reading requests, routing jobs, chasing approvals — with a person in the loop where it counts." },
      { name: "Mobile applications", surface: "app", view: "today", text: "Native and cross-platform apps for iOS and Android, designed to feel effortless and built to survive launch day and everything after." },
      { name: "Chatbots & voice", surface: "app", view: "assistant", text: "Conversational and voice interfaces that turn a spoken note into a structured record — grounded in your data, never guessing." },
      { name: "SaaS platforms", surface: "console", view: "billing", text: "Multi-tenant platforms engineered from day one to onboard, bill and scale: workspaces, roles, plans, seats and subscription billing." },
      { name: "API integrations", surface: "console", view: "integrations", text: "Payments, accounting, calendars, CRMs and your own systems connected through clean, documented APIs and webhooks." },
      { name: "MVP development", surface: "app", view: "onboard", text: "A focused first version that proves the idea with real users — built on foundations that do not need rewriting when it works." },
      { name: "Custom web applications", surface: "console", view: "schedule", text: "Internal tools and customer-facing web apps shaped around how your business actually operates." },
      { name: "Product engineering", surface: "console", view: "releases", text: "Pipelines, tests, environments and release discipline — the engineering that keeps a product shipping week after week." },
    ],
  },

  architecture: {
    kicker: "Product architecture",
    title: "A product is built in layers.",
    text: "Each stage adds a layer the next one stands on. Scroll to assemble one.",
    steps: [
      { name: "Idea", panel: "brand", label: "Problem & outcome", text: "The problem in one sentence, the user it belongs to and the outcome that proves it is solved." },
      { name: "UX", panel: "wireframe", label: "Flows & wireframes", text: "Journeys, flows and wireframes tested with real people before anything is styled." },
      { name: "Product architecture", panel: "sitemap", label: "Services & data model", text: "Tenancy, roles, data model and services decided up front — the choices that are expensive to change later." },
      { name: "Development", panel: "code", label: "Web · iOS · Android", text: "Clean, typed, reviewed code across web and mobile, shipped behind feature flags in small increments." },
      { name: "AI integration", panel: "nodes", label: "Models & retrieval", text: "Models, retrieval over your own data, guardrails and evaluation sets — with fallbacks for when the model is unsure." },
      { name: "Testing", panel: "chart", label: "QA & evaluation", text: "Automated tests, device QA and AI evaluation runs on every change that matters." },
      { name: "Launch", panel: "mobile", label: "Release", text: "Staged rollouts, store submissions, monitoring and a plan for the first week in production." },
    ],
  },

  mobile: {
    kicker: "Mobile experience",
    title: "Made for the hand it lives in.",
    text: "Offline-ready, fast on mid-range phones, considerate with notifications — mobile apps designed for the moment they are opened, not the demo they are shown in.",
    image: windowLight,
    imageAlt: "A woman smiling at her phone by a sunlit window",
    notes: [
      { title: "Native where it matters", text: "Swift and Kotlin when the product leans on the device; React Native or Flutter when one codebase serves both stores well." },
      { title: "Works without signal", text: "Jobs, forms and photos queue on the device and sync when the connection returns." },
      { title: "Voice to record", text: "A spoken note becomes a structured report the technician checks before it is sent." },
    ],
  },

  ecosystem: {
    kicker: "SaaS ecosystem",
    title: "Follow one request through the system.",
    text: "Every product we build is a chain of hand-offs. Here is one, end to end.",
    stations: [
      { key: "users", name: "Users", text: "A tenant reports a leak from the portal on their phone." },
      { key: "product", name: "Product", text: "The request lands in the dispatcher's inbox, in the right workspace." },
      { key: "ai", name: "AI", text: "The assistant classifies it — plumbing, urgent, electrical hazard — and drafts a reply." },
      { key: "data", name: "Data", text: "The job is written to the tenant's record, with its history and audit trail." },
      { key: "integrations", name: "Integrations", text: "Calendar, team chat and accounting are updated through webhooks." },
      { key: "business", name: "Business", text: "The owner sees response times and costs per property in one report." },
    ],
  },

  scale: {
    kicker: "Performance & scale",
    title: "Engineered for the day it works.",
    text: "Success is a load test. We build for it before it arrives.",
    image: datacenter,
    imageAlt: "A long, blue-lit aisle of server racks in a data centre",
    qualities: [
      { name: "Performance", text: "Budgets for every screen, measured on real mid-range devices and slow networks — not just a developer laptop." },
      { name: "Scalability", text: "Stateless services, queues for slow work and a data model that copes with tenants of every size." },
      { name: "Security", text: "Tenant isolation, least-privilege roles, encrypted secrets and audit logs designed in, not added later." },
      { name: "Responsive", text: "One product that adapts from phone to wide desktop — layouts designed for each, not shrunk from one." },
      { name: "APIs", text: "Versioned, documented APIs so your product can be integrated with — and so your own apps use the same front door." },
      { name: "Integrations", text: "Webhooks, retries and idempotency so the systems around your product stay in sync when something fails." },
      { name: "Maintainability", text: "Typed code, automated tests, readable architecture and documentation the next engineer can pick up." },
    ],
  },

  process: {
    kicker: "How we work",
    title: "From first conversation to compounding growth.",
    steps: [
      { name: "Discovery", text: "Workshops, audits and research. We find the real problem before we touch a pixel.", artefact: "brief" },
      { name: "Strategy", text: "Positioning, journeys and a measurable plan everyone signs off on.", artefact: "roadmap" },
      { name: "UX/UI", text: "Systems, prototypes and motion — tested with real people, refined until it sings.", artefact: "screens" },
      { name: "Development", text: "Clean, fast, accessible code across web and mobile, QA'd on every device that matters.", artefact: "code" },
      { name: "Integration", text: "Models, data and third-party systems connected, evaluated and secured.", artefact: "flow" },
      { name: "Testing", text: "Automated suites, device labs and AI evaluation runs before anything reaches users.", artefact: "tests" },
      { name: "Launch", text: "Zero-drama launches: staged rollouts, store submissions and monitoring from minute one.", artefact: "release" },
      { name: "Growth", text: "Analytics, experiments and a roadmap that compounds what works.", artefact: "growth" },
    ],
  },

  faq: {
    kicker: "Questions",
    title: "Before you build.",
    items: [
      { q: "Can you add AI features to a product we already have?", a: "Yes. We start with an audit of your product and data, find the workflows where a model genuinely saves time — classification, summaries, search, drafted replies — and integrate them into your existing interface and APIs rather than bolting on a separate chat window." },
      { q: "How do you keep our data private when using language models?", a: "We design the data flow first: what is sent to a model, what stays in your infrastructure, how it is logged and who can see it. Retrieval runs over your own data with tenant isolation, and sensitive fields can be masked or kept out of prompts entirely." },
      { q: "Should our app be native or cross-platform?", a: "It depends on the product. Native Swift and Kotlin suit apps that lean heavily on the device; React Native or Flutter suit products where one codebase serving iOS and Android well is the better trade. We recommend one after discovery, with the reasons written down." },
      { q: "Can we start with an MVP?", a: "Yes — most products should. We scope a focused first version that proves the idea with real users, and build it on foundations (auth, tenancy, data model) that do not need rewriting once it works." },
      { q: "Do you build the SaaS side — workspaces, plans and billing?", a: "Yes. Multi-tenant workspaces, roles and permissions, onboarding, plans, seats and subscription billing are part of how we engineer SaaS platforms from day one." },
      { q: "What happens after launch?", a: "We stay on for monitoring, fixes and the next releases, then use analytics and experiments to decide what to build next — SEO, ads and CRO included if the product needs to grow its audience." },
    ],
  },

  cta: {
    video: clip("city"),
    kicker: "Start a project",
    title: ["Let's build the product", "your market is waiting for."],
    text: "Tell us what you're building. We'll come back with a plan, a team and a timeline.",
    primary: { label: "Start a project", href: "/contact-us#contact-form" },
  },
};

// The capabilities as structured-data offers
export const AI_OFFERS = AI_PAGE.build.items.map((i) => ({ name: i.name, text: i.text }));
