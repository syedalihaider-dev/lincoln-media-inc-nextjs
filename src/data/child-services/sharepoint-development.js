// /services/sharepoint-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/sharepoint-development (hero, "Your Go-To SharePoint Development
// Company", "Custom SharePoint-Based Solutions", research / UX / visual design / architecture / consultation)
// and the live shared FAQ. Left out: "100% client satisfaction", track-record and ranking claims, figures.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const SHAREPOINT = {
  parent: PARENT,
  seo: {
    title: "SharePoint Development Company in the USA — The Lincoln Media",
    description: "Custom SharePoint development: intranets, collaboration portals, enterprise search and business-critical web apps — research-led, with seamless UX, visual design and free consultation.",
    keywords: ["SharePoint development", "SharePoint intranet", "custom SharePoint solutions", "SharePoint consulting", "Microsoft SharePoint"],
    image: pic("meeting"), imageAlt: alt("meeting"),
  },
  demo: { url: "yourbrand.com", photos: [pic("empire"), pic("meeting"), pic("towers"), pic("team")] },
  hero: {
    strap: "Professional SharePoint development", // (live)
    title: ["SharePoint", "Development"],
    tagline: "End-to-end SharePoint development and custom SharePoint solutions.", // (live)
    lead: "We help you run your business more efficiently with user-friendly, rich, efficient and secure SharePoint applications.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our SharePoint expertise", href: "#expertise" },
    stage: stage(["empire", "meeting", "towers", "team"], "Document shared"),
  },
  ui: {
    admin: "/sites/intranet",
    apiBase: "/_api",
    editor: { title: "Intranet home — Editing", action: "Publish", panel: "Web parts", blocks: ["Text", "Hero", "News", "Quick links", "Document library", "Events", "People", "Highlighted content"] },
    code: {
      tabs: ["NewsWebPart.ts", "manifest.json", "package-solution.json"],
      lines: [
        ["c", "// SharePoint Framework web part — intranet news"],
        ["k", "import { spfi, SPFx } from '@pnp/sp';"],
        ["k", "import '@pnp/sp/webs'; import '@pnp/sp/lists'; import '@pnp/sp/items';"],
        ["", ""],
        ["k", "export default class NewsWebPart extends BaseClientSideWebPart<IProps> {"],
        ["", "  public async render(): Promise<void> {"],
        ["", "    const sp = spfi().using(SPFx(this.context));"],
        ["", "    const news = await sp.web.lists"],
        ["s", "      .getByTitle('Site Pages').items"],
        ["s", "      .select('Title', 'Description', 'FileRef')"],
        ["s", "      .filter('PromotedState eq 2').top(3)();"],
        ["", "    this.domElement.innerHTML = renderNews(news);"],
        ["", "  }"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/_api/web/lists/getbytitle('Documents')/items?$top=3",
      json: `{
  "value": [
    { "Id": 41, "Title": "Q3 brand guidelines", "Modified": "2026-11-18T09:12:00Z" },
    { "Id": 40, "Title": "Onboarding handbook", "Modified": "2026-11-17T15:40:00Z" },
    { "Id": 39, "Title": "Sales playbook", "Modified": "2026-11-15T11:05:00Z" }
  ]
}`,
      links: [["Document libraries", "Versions & permissions"], ["Enterprise search", "Across the intranet"], ["Workflows", "Business processes"]],
    },
    themeFile: "theme.json · SharePoint",
    settings: { title: "Intranet · Site settings", tabs: ["General", "Permissions", "Search", "Navigation"], rows: [["Version history", true], ["External sharing", false], ["Show in search results", true], ["Approval workflow", true]], slider: "Items per page" },
  },
  intro: {
    kicker: "Your go-to SharePoint company", // (live)
    statement: "Custom SharePoint-based solutions.", // (live)
    title: "User-friendly, rich, efficient and secure applications", // (live)
    paragraphs: [
      "We build flexible, future-proof web apps, enterprise search engines, collaboration interfaces and many other business-critical solutions on SharePoint — products that are user-friendly, modular, feature-rich and highly secure.", // (live)
      "Our SharePoint developers are industry professionals trusted by businesses and brands to deliver exceptional, highly engaging websites. Need a hand executing a complex idea on SharePoint? Let's connect.", // (live)
    ],
    image: pic("meeting"), imageAlt: alt("meeting"),
    backdrop: pic("code"),
    marquee: "SharePoint",
  },
  visual: visual("empire", ["Celebrate the", "change."], "An effortless experience, with an architecture ready for what comes next."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "What we build with SharePoint.",
    intro: "Intranets, collaboration interfaces, enterprise search and web apps — each developed from data-driven insights, not assumptions.", // (live)
    items: [
      chapter("Research & Insight", "Driving the change through research.", "Every SharePoint solution is developed with data-driven insights: well-researched analytics, demographics and psychographic workshops shape what we build.", ["Analytics", "Workshops", "Data-led"], "charts", "settings"), // (live)
      chapter("Seamless User Experience", "UX can make or break your business online.", "We give special importance to UX/UI, producing quick, interactive, ready-to-deploy wireframes as close to the real thing as possible.", ["Wireframes", "Responsive", "Clickable prototypes"], "ux", "editor"), // (live)
      chapter("Appealing Visual Design", "Engaging, creative and lively.", "Visual design that revitalises your brand, delivered through collaborative intranets and cutting-edge technology.", ["Branded intranets", "Visual design", "Engagement"], "studio", "theme"), // (live)
      chapter("Interactive Architecture", "Ready for every future development.", "An interactive architecture with a roadmap to upscale your website for all future development — without building again from scratch.", ["Scalable", "Modular", "Future-proof"], "devTablet", "code"), // (live)
      chapter("On Every Device", "Information wherever your people are.", "A secure place to store, organise, share and access information from any device.", ["Secure access", "Any device", "Collaboration"], "phone", "phone"), // (live portfolio copy)
    ],
  },
  process: process({
    design: "Wireframes and visual design for your intranet or portal — interactive and as close to the real thing as possible.", // (live)
    development: "Web parts, search, libraries and workflows built by SharePoint developers on a modular, secure architecture.", // (live)
    launchPhoto: "mockMall",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "SharePoint intranets", does: "A secure place to store, organise, share and access information from any device.", gets: "One home for your team's knowledge." }, // (live)
      { tech: "Enterprise search", does: "Search across documents, pages and people.", gets: "Answers found in seconds, not folders." }, // (live)
      { tech: "Collaboration interfaces", does: "Shared workspaces that bring teams and documents together.", gets: "Higher employee engagement." }, // (live)
      { tech: "Process automation", does: "Automates complex business processes inside SharePoint.", gets: "Less manual work, fewer errors." }, // (live)
      { tech: "Modular architecture", does: "A roadmap to upscale without rebuilding from scratch.", gets: "A platform that grows with you." }, // (live)
    ],
    cta: techCta("Ready to build your SharePoint solution?", "Build your SharePoint solution"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a SharePoint build looks like.",
    text: "The same intranet from every side: the home page your people see, the page editor, the document library settings, the code behind it, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Intranet home" }, { kind: "editor", label: "Page editing" }, { kind: "settings", label: "Site settings" }, { kind: "code", label: "Custom web part" }, { kind: "phone", label: "On any device" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("SharePoint consultation", "Have an idea? We offer a free consultation, and have helped clients increase employee engagement, facilitate collaboration and automate complex business processes.", "meeting"), // (live)
      capability("Enterprise search engines", "Search built on SharePoint, so information is found rather than hunted for.", "trading"), // (live)
      capability("Collaboration interfaces", "Collaborative intranets that bring teams and their documents together.", "team"), // (live)
      capability("Migration & support", "Safe, smooth migration with a risk-free method, and ongoing help once it launches.", "empire"), // (live FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one SharePoint intranet comes together.",
    stages: [
      { name: "Content", text: "Documents, news and the knowledge your teams need — mapped before anything is built.", screen: "draft", url: "intranet-plan.docx" },
      { name: "Platform", text: "SharePoint stores, organises and secures it, with permissions for every team.", screen: "editor", url: "yourbrand.com/sites/intranet" }, // (live)
      { name: "Design", text: "Appealing visual design that revitalises your brand.", screen: "theme", url: "theme.json" }, // (live)
      { name: "Development", text: "Web parts and business-critical solutions built on a modular architecture.", screen: "code", url: "NewsWebPart.ts" }, // (live)
      { name: "Integrations", text: "Libraries, search and workflows connected, so complex business processes run themselves.", screen: "api", url: "yourbrand.com/_api" }, // (live)
      { name: "User experience", text: "Clickable, convertible, responsive — on every device.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("A workplace that works together.", [
    { name: "Information in one place", text: "Store, organise, share and access it from any device." }, // (live)
    { name: "Engaged employees", text: "Collaboration interfaces people actually use." }, // (live)
    { name: "Automated processes", text: "Complex business processes, handled by the platform." }, // (live)
    { name: "Secure by design", text: "Modular, feature-rich and highly secure." }, // (live)
    { name: "Ready to scale", text: "An architecture with a roadmap for future development." }, // (live)
  ], "london"),
  faq: {
    kicker: "Questions",
    title: "SharePoint, answered.",
    items: [
      { q: "What can you build with SharePoint?", a: "Flexible, future-proof web apps, enterprise search engines, collaboration interfaces, intranets and many other business-critical solutions." },
      { q: "Do you offer SharePoint consulting?", a: "Yes — and the first consultation is free. We have helped clients increase employee engagement, facilitate collaboration and automate complex business processes." },
      { q: "Can SharePoint grow with my business?", a: "Yes. We provide an interactive architecture with a roadmap to upscale your website for future development, without building again from scratch." },
      { q: "Can our team access it from any device?", a: "Yes. Stakeholders can store, organise, share and access information securely from any device." },
      FAQ.erp, FAQ.migrate, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your SharePoint project"),
};

export default SHAREPOINT;
