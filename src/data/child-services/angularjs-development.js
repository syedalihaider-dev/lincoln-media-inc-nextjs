// /services/angularjs-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/angularjs-development (hero, "Hire Dedicated AngularJS Developers",
// consulting / UX-UI / front-end / web development / single-page apps / web & API integration) and the live
// FAQ. Left out: named clients (Suzuki, Yamaha, Coroli) and "hundreds of brands" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const ANGULAR = {
  parent: PARENT,
  seo: {
    title: "AngularJS Development Company in the USA — The Lincoln Media",
    description: "Angular and AngularJS development: free consulting, UX/UI, front-end development, enterprise-scale web development, single-page applications and web & API integration — all in-house.",
    keywords: ["AngularJS development", "Angular development", "single page application", "Angular front-end", "AngularJS developers"],
    image: pic("ux"), imageAlt: alt("ux"),
  },
  demo: { url: "yourbrand.com", photos: [pic("trading"), pic("house"), pic("bike"), pic("london")] },
  hero: {
    strap: "Leading AngularJS development company in the United States", // (live)
    title: ["AngularJS", "Development"],
    tagline: "A team of specialised, talented developers creating state-of-the-art applications.", // (live)
    lead: "Angular is the choice of world-renowned brands and start-ups alike — the future of UX/UI development.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our Angular expertise", href: "#expertise" },
    stage: stage(["trading", "house", "bike", "london"], "Route loaded"),
  },
  ui: {
    admin: "/app",
    apiBase: "/api",
    editor: { title: "App — Dashboard", action: "Save", panel: "Views", blocks: ["Dashboard", "Search", "Bookings", "Messages", "Profile", "Reports", "Settings", "Help"] },
    code: {
      tabs: ["listings.component.ts", "listings.service.ts", "app.routes.ts"],
      lines: [
        ["c", "// listings.component.ts — a standalone Angular component"],
        ["k", "@Component({"],
        ["s", "  selector: 'app-listings',"],
        ["", "  standalone: true,"],
        ["", "  imports: [AsyncPipe, ListingCard],"],
        ["s", "  template: `"],
        ["s", "    @for (item of listings$ | async; track item.id) {"],
        ["s", "      <app-listing-card [listing]=\"item\" />"],
        ["s", "    }`,"],
        ["k", "})"],
        ["k", "export class ListingsComponent {"],
        ["", "  private api = inject(ListingsService);"],
        ["", "  listings$ = this.api.search({ sort: 'newest', limit: 12 });"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/listings?sort=newest&limit=12",
      json: `{
  "items": [
    { "id": "L-901", "title": "Garden house", "city": "Hudson", "status": "available" },
    { "id": "L-900", "title": "Loft studio", "city": "Brooklyn", "status": "available" },
    { "id": "L-899", "title": "Lake cabin", "city": "Saratoga", "status": "booked" }
  ],
  "total": 12
}`,
      links: [["REST APIs", "Your existing services"], ["Auth", "Secure sign-in"], ["Analytics", "Usage insights"]],
    },
    themeFile: "styles.scss",
    settings: { title: "App · Settings", tabs: ["General", "Routing", "Security", "Performance"], rows: [["Lazy-load routes", true], ["Offline support", true], ["Debug mode", false], ["Pre-render landing pages", true]], slider: "Cache lifetime" },
  },
  intro: {
    kicker: "Hire dedicated AngularJS developers", // (live)
    statement: "Extraordinary applications, built in-house.", // (live, restructured)
    title: "A leading AngularJS development company", // (live)
    paragraphs: [
      "Angular offers numerous benefits, and to make the most of them you need an experienced team of AngularJS developers. At Lincoln Media we do everything in-house — our web developers are proficient in all web technologies, AngularJS among them.", // (live)
      "We love working with cutting-edge web tools to create extraordinary digital products.", // (live)
    ],
    image: pic("ux"), imageAlt: alt("ux"),
    backdrop: pic("code"),
    marquee: "Angular",
  },
  visual: visual("architecture", ["The future of", "UX/UI development."], "State-of-the-art applications, built with Angular."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our services in the AngularJS domain.",
    intro: "From free consulting to front-end, single-page applications and API integration.", // (live)
    items: [
      chapter("AngularJS UX/UI Development", "Stand out in your industry.", "An extraordinary user experience with a visually aesthetic interface — well-designed web solutions with powerful functionality.", ["User experience", "Interface design", "Aesthetic"], "ux", "theme"), // (live)
      chapter("AngularJS Frontend Development", "Aesthetic designs, coded into reality.", "Front-end development is one of our core specialties — flexible, responsive front-ends built with best-in-class practices.", ["Front-end", "Responsive", "Best practices"], "devTablet", "code"), // (live)
      chapter("Single Page Applications", "Fast, to the point, the best experience.", "We know how to clean-code a single-page Angular application that is flexible and reliable.", ["SPA", "Fast", "Reliable"], "trading", "editor"), // (live)
      chapter("Web & API Service Integration", "Connected, without risk.", "APIs connected to your existing applications, with no risk of data theft or loss.", ["APIs", "Integration", "Secure"], "circuit", "settings"), // (live)
      chapter("AngularJS Web Development", "Enterprise-scale Angular.", "Enterprise-scale Angular solutions with powerful back-ends — advanced functionality without compromising performance or security.", ["Enterprise", "Performance", "Security"], "phone", "phone"), // (live)
    ],
  },
  process: process({
    discovery: "Not sure which technology stack is right? Fill out the form and we'll call you the same day — consulting is free.", // (live)
    design: "An extraordinary user experience with a visually aesthetic interface.", // (live)
    development: "Flexible, responsive Angular front-ends and powerful back-ends, built in-house.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Angular", does: "A modern framework for rich, interactive interfaces.", gets: "An application that feels effortless." }, // (live)
      { tech: "Single-page applications", does: "Fast, to-the-point apps that load once and respond instantly.", gets: "The best possible user experience." }, // (live)
      { tech: "API integration", does: "Connects your web solutions to existing applications.", gets: "No risk of data theft or loss." }, // (live)
      { tech: "Powerful back-ends", does: "Advanced functionality behind the interface.", gets: "Performance and security, uncompromised." }, // (live)
      { tech: "Responsive front-ends", does: "Flexible layouts for every screen.", gets: "A product people use anywhere." }, // (live)
    ],
    cta: techCta("Ready to build with Angular?", "Build your Angular app"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What an Angular build looks like.",
    text: "The same application from every side: the site your customers see, the app dashboard, the app settings, the component code, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Web application" }, { kind: "editor", label: "App dashboard" }, { kind: "settings", label: "App settings" }, { kind: "code", label: "Angular component" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Free AngularJS consulting", "Not sure which stack suits your application? We guide you in the right direction, free of charge.", "meeting"), // (live)
      capability("Everything in-house", "Our web developers are proficient in all web technologies — nothing outsourced.", "team"), // (live)
      capability("Maintenance & support", "Ongoing help with the applications we build once they launch.", "glow"), // (live FAQ)
      capability("SEO & organic growth", "An SEO team that knows what your website needs to stand out on Google.", "charts"), // (live FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Angular application comes together.",
    stages: [
      { name: "Requirements", text: "Free consulting to choose the right stack and plan the app.", screen: "draft", url: "requirements.docx" }, // (live)
      { name: "Application", text: "The views your users work in, planned screen by screen.", screen: "editor", url: "yourbrand.com/app" },
      { name: "Design", text: "A visually aesthetic interface.", screen: "theme", url: "styles.scss" }, // (live)
      { name: "Development", text: "Clean-coded Angular components.", screen: "code", url: "listings.component.ts" }, // (live)
      { name: "Integrations", text: "Web and API services, integrated securely.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "A fast single-page experience on every screen.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("An application people love using.", [
    { name: "Stand out", text: "An extraordinary user experience." }, // (live)
    { name: "Fast", text: "Single-page apps that respond instantly." }, // (live)
    { name: "Connected", text: "Your APIs integrated without risk." }, // (live)
    { name: "Enterprise-ready", text: "Powerful back-ends, secure and performant." }, // (live)
    { name: "In-house team", text: "One team for every web technology." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "AngularJS, answered.",
    items: [
      { q: "Do you charge for AngularJS consulting?", a: "No. Fill out the form and we'll call you the same day — it's our responsibility to guide you in the right direction." },
      { q: "Do you build single-page applications?", a: "Yes. Our team has created a number of them and knows how to clean-code a single-page Angular application that is flexible and reliable." },
      { q: "Can you connect Angular to our existing systems?", a: "Yes. We integrate your web solutions and APIs without any risk of data theft or loss." },
      { q: "Do you work in-house?", a: "Yes. We do everything in-house — our web developers are proficient in all web technologies, AngularJS among them." },
      FAQ.framework, FAQ.support, FAQ.turnaround, FAQ.cost,
    ],
  },
  cta: cta("Start your Angular project"),
};

export default ANGULAR;
