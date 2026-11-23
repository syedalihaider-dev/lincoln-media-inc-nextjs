// /services/enterprise-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/enterprise-development (hero, "Custom Web and Application Solutions
// for Enterprises", custom development / UX-UI / software integration / digital transformation / data
// management) and the live shared FAQ. Left out: "hundreds of clients", "thousands of clients" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const ENTERPRISE = {
  parent: PARENT,
  seo: {
    title: "Enterprise Software & Web Application Development — The Lincoln Media",
    description: "Custom enterprise web and application development: enterprise websites, UX/UI, software integration with APIs and microservices, digital transformation and data management.",
    keywords: ["enterprise development", "enterprise web application", "enterprise software development", "software integration", "digital transformation"],
    image: pic("towers"), imageAlt: alt("towers"),
  },
  demo: { url: "yourbrand.com", photos: [pic("towers"), pic("dash"), pic("london"), pic("meeting")] },
  hero: {
    strap: "Enterprise software and application development company", // (live)
    title: ["Enterprise", "Development"],
    tagline: "Innovative enterprise web applications for your business.", // (live)
    lead: "We'll help you become a lasting success in the global arena by re-engineering solutions.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" },
    secondary: { label: "Our enterprise expertise", href: "#expertise" },
    stage: stage(["towers", "dash", "london", "meeting"], "Report generated"),
  },
  ui: {
    admin: "/admin",
    apiBase: "/api",
    editor: { title: "Operations — Dashboard", action: "Save", panel: "Modules", blocks: ["Records", "Accounting", "Projects", "Automation", "Customers", "Inventory", "Reports", "Users"] },
    code: {
      tabs: ["records.service.ts", "records.controller.ts", "schema.prisma"],
      lines: [
        ["c", "// Records service — one source of truth for every department"],
        ["k", "@Injectable()"],
        ["k", "export class RecordsService {"],
        ["", "  constructor(private db: PrismaService, private events: EventBus) {}"],
        ["", ""],
        ["", "  async create(input: CreateRecordDto) {"],
        ["", "    const record = await this.db.record.create({ data: input });"],
        ["s", "    this.events.publish('record.created', record);"],
        ["", "    return record;"],
        ["", "  }"],
        ["", ""],
        ["", "  findByDepartment(department: string) {"],
        ["s", "    return this.db.record.findMany({ where: { department } });"],
        ["", "  }"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/v1/records?department=finance&limit=3",
      json: `{
  "data": [
    { "id": "R-2041", "type": "invoice", "status": "approved", "owner": "finance" },
    { "id": "R-2040", "type": "purchase-order", "status": "pending", "owner": "finance" },
    { "id": "R-2039", "type": "expense", "status": "approved", "owner": "finance" }
  ],
  "next": "/api/v1/records?cursor=R-2039"
}`,
      links: [["ERP", "Accounting & stock"], ["CRM", "Customer relations"], ["Automation", "Workflows & alerts"]],
    },
    themeFile: "design-tokens.json",
    settings: { title: "Operations · Automation", tabs: ["Workflows", "Approvals", "Integrations", "Data"], rows: [["Auto-approve under limit", true], ["Notify department heads", true], ["Archive closed records", false], ["Nightly data sync", true]], slider: "Approval limit" },
  },
  intro: {
    kicker: "Your go-to enterprise development company", // (live)
    statement: "Everything centralised under one enterprise website.", // (live, restructured)
    title: "Custom web and application solutions for enterprises", // (live)
    paragraphs: [
      "Won't it be easier to control your business operations when everything is centralised? An enterprise website widens your reach and helps in day-to-day activities — managing records, accounting, automation and project management.", // (live)
      "We don't create replicas of websites: we come up with unique features and functionality to solve your problems, starting by carefully noting your requirements and the objective behind the investment.", // (live)
    ],
    image: pic("dash"), imageAlt: alt("dash"),
    backdrop: pic("code"),
    marquee: "Enterprise",
  },
  visual: visual("towers", ["The sky's", "the limit."], "An enterprise website lets you serve far more clients than you could without one."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our enterprise development services.",
    intro: "Custom web development, UX/UI, software integration, digital transformation and data management — designed, built and scaled with industry-specific knowledge.", // (live)
    items: [
      chapter("Custom Enterprise Web Development", "Built to support your business infrastructure.", "Custom enterprise websites that improve key facets of your company — our team uses its industry-specific knowledge to design, build and scale your new enterprise solution.", ["Design", "Build", "Scale"], "devTablet", "code"), // (live)
      chapter("Enterprise UX/UI", "The easier it is to buy, the more people buy.", "UX/UI holds great importance for your scalability — we create a compelling user experience for your enterprise website.", ["User experience", "Interface design", "Scalability"], "ux", "theme"), // (live)
      chapter("Software Integration", "A software infrastructure you can rely on.", "Comprehensive software integration solutions, improving your infrastructure with reliable APIs and well-built microservices.", ["APIs", "Microservices", "Integration"], "circuit", "settings"), // (live)
      chapter("Digital Transformation", "Efficient operations for a demanding market.", "We use digital technologies to create efficient business operations, so you can meet challenging market requirements.", ["Process redesign", "Automation", "Efficiency"], "meeting", "editor"), // (live)
      chapter("Data Management", "Stay ahead with your data.", "An effective data management strategy, and an enterprise website that enables intelligent automation.", ["Data strategy", "Records", "Automation"], "trading", "phone"), // (live)
    ],
  },
  process: process({
    discovery: "We carefully note your requirements and understand the objective behind the investment.", // (live)
    strategy: "A custom plan proposed around those requirements, signed off before the work begins.", // (live)
    design: "A compelling user experience for your enterprise website, designed for scale.", // (live)
    development: "Custom enterprise web development, with reliable APIs and well-built microservices.", // (live)
    launchPhoto: "laptopPhone",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Enterprise web applications", does: "Centralise records, accounting, automation and project management.", gets: "Your operations under control, in one place." }, // (live)
      { tech: "APIs & microservices", does: "Reliable integration across your software infrastructure.", gets: "Systems that talk to each other." }, // (live)
      { tech: "Data management", does: "An effective strategy for collecting and using your data.", gets: "Decisions made on accurate information." }, // (live)
      { tech: "Intelligent automation", does: "Routine work handled by the platform.", gets: "Teams freed for the work that matters." }, // (live)
      { tech: "ERP integration", does: "Customisation and integration with SAP, Oracle, Salesforce, Microsoft and more.", gets: "One system, not a patchwork." }, // (live FAQ)
    ],
    cta: techCta("Ready to centralise your operations?", "Build your enterprise platform"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What an enterprise build looks like.",
    text: "The same platform from every side: the website your customers see, the operations dashboard, the automation settings, the service code, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Enterprise website" }, { kind: "editor", label: "Operations dashboard" }, { kind: "settings", label: "Automation" }, { kind: "code", label: "Microservices" }, { kind: "phone", label: "On the move" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("ERP customisation & integration", "Integration with SAP, Oracle, Salesforce, Microsoft, Infor, IFS, Epicor, SYSPRO, Acumatica, Sage and more.", "circuit"), // (live FAQ)
      capability("Customer relations", "Intuitive websites that showcase your products and services and improve customer relations.", "meeting"), // (live)
      capability("Project management", "Day-to-day project management handled inside your enterprise platform.", "team"), // (live)
      capability("Online presence", "Widen your reach and enhance your presence online.", "london"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one enterprise platform comes together.",
    stages: [
      { name: "Requirements", text: "Your requirements and the objective behind the investment, noted carefully first.", screen: "draft", url: "requirements.docx" }, // (live)
      { name: "Operations", text: "Records, accounting, automation and projects — centralised in one dashboard.", screen: "editor", url: "yourbrand.com/admin" }, // (live)
      { name: "Design", text: "A compelling enterprise UX/UI, designed for scale.", screen: "theme", url: "design-tokens.json" }, // (live)
      { name: "Development", text: "Custom enterprise development on reliable microservices.", screen: "code", url: "records.service.ts" }, // (live)
      { name: "Integrations", text: "APIs connecting your software infrastructure.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "An intuitive website for your customers, and your teams.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("An enterprise that runs as one.", [
    { name: "Centralised operations", text: "Everything under one enterprise website." }, // (live)
    { name: "Wider reach", text: "Serve far more clients than before." }, // (live)
    { name: "Unique functionality", text: "Features built for your problems, not replicas." }, // (live)
    { name: "Intelligent automation", text: "Day-to-day work handled for you." }, // (live)
    { name: "Better customer relations", text: "Show your products and services clearly." }, // (live)
  ], "towers"),
  faq: {
    kicker: "Questions",
    title: "Enterprise development, answered.",
    items: [
      { q: "What will an enterprise website do for my business?", a: "It centralises your operations — managing records, accounting, automation and project management — while widening your reach, showcasing your products and services and improving customer relations." },
      { q: "Can you integrate our existing software?", a: "Yes. We offer comprehensive software integration solutions, improving your infrastructure with reliable APIs and well-built microservices." },
      { q: "Do you help with digital transformation?", a: "Yes. We use digital technologies to create efficient business operations, so you can meet challenging market requirements." },
      { q: "How do you start an enterprise project?", a: "We carefully note your requirements and understand the objective behind the investment, then propose a custom plan." },
      FAQ.erp, FAQ.framework, FAQ.turnaround, FAQ.cost,
    ],
  },
  cta: cta("Start your enterprise project"),
};

export default ENTERPRISE;
