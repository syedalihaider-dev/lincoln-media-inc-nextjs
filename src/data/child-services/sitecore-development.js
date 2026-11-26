// /services/sitecore-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/sitecore-development (hero, "Sitecore Implementation & Consultation",
// personalization / analytics / campaigns / content optimisation, Experience Platform, UX-to-SEO) and the
// live shared FAQ. Left out: "Platinum & Gold Partner", "certified", "award-winning", "No.1" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const SITECORE = {
  parent: PARENT,
  seo: {
    title: "Sitecore Development & Implementation in the USA — The Lincoln Media",
    description: "Sitecore implementation, consultation and CMS development: personalised digital experiences, tracking and analytics, marketing campaigns and content optimisation — built by an in-house full-stack team.",
    keywords: ["Sitecore development", "Sitecore implementation", "Sitecore CMS", "Sitecore Experience Platform", "Sitecore consultation"],
    image: pic("london"), imageAlt: alt("london"),
  },
  demo: { url: "yourbrand.com", photos: [pic("london"), pic("ring"), pic("house"), pic("dusk")] },
  hero: {
    strap: "Best Sitecore development in the United States", // (live)
    title: ["Sitecore", "Development"],
    tagline: "Powerful CMSs and digital experience platforms, built by an in-house full-stack team.", // (live)
    lead: "Blazing fast web solutions with Sitecore developers in the USA.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our Sitecore expertise", href: "#expertise" },
    stage: stage(["london", "ring", "house", "dusk"], "Personalisation live"),
  },
  ui: {
    admin: "/sitecore",
    apiBase: "/sitecore/api",
    editor: { title: "Experience Editor — Home", action: "Publish", panel: "Components", blocks: ["Hero banner", "Rich text", "Promo", "Carousel", "Personalised offer", "Form", "Navigation", "Footer"] },
    code: {
      tabs: ["HeroBanner.cs", "HeroBanner.cshtml", "Foundation.config"],
      lines: [
        ["c", "// Sitecore MVC rendering — a personalised hero banner"],
        ["k", "public class HeroBannerController : SitecoreController"],
        ["k", "{"],
        ["", "    public ActionResult HeroBanner()"],
        ["", "    {"],
        ["", "        var item = RenderingContext.Current.Rendering.Item;"],
        ["", "        var model = new HeroBannerModel"],
        ["", "        {"],
        ["s", "            Title    = item[\"Title\"],"],
        ["s", "            Subtitle = item[\"Subtitle\"],"],
        ["s", "            Image    = MediaManager.GetMediaUrl(item.Fields[\"Image\"])"],
        ["", "        };"],
        ["s", "        return View(\"~/Views/Hero/HeroBanner.cshtml\", model);"],
        ["", "    }"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/sitecore/api/layout/render/jss?item=/&sc_lang=en",
      json: `{
  "sitecore": {
    "context": { "pageEditing": false, "language": "en" },
    "route": {
      "name": "home",
      "placeholders": {
        "main": [ { "componentName": "HeroBanner" }, { "componentName": "PersonalisedOffer" } ]
      }
    }
  }
}`,
      links: [["Personalisation", "Content per visitor"], ["Analytics", "Tracking & insights"], ["Campaigns", "Marketing automation"]],
    },
    themeFile: "design-system.json",
    settings: { title: "Personalisation · Rules", tabs: ["Rules", "Goals", "Campaigns", "Analytics"], rows: [["Personalise for returning visitors", true], ["Show regional offers", true], ["A/B test hero banner", false], ["Track campaign goals", true]], slider: "Engagement value" },
  },
  intro: {
    kicker: "Sitecore implementation & consultation", // (live)
    statement: "Reshape your business with data and marketing.", // (live, restructured)
    title: "A full-service digital design and Sitecore development agency", // (live)
    paragraphs: [
      "Sitecore is a leading digital experience platform, enabling brands to use the power of data and marketing — personalisation, tracking and analytics, marketing campaigns and content optimisation.", // (live)
      "We don't just design and build, we also optimise Sitecore websites. With an in-house team of full-stack Sitecore developers we don't outsource — so working with us means clear communication and timely delivery.", // (live)
    ],
    image: pic("studio"), imageAlt: alt("studio"),
    backdrop: pic("code"),
    marquee: "Sitecore",
  },
  visual: visual("london", ["Connecting businesses", "with the world."], "Real-time data from the Sitecore Experience Platform gives you an edge over competitors."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "What we build with Sitecore.",
    intro: "From Sitecore integration to Sitecore CMS development and support — we think big while obsessing over detail.", // (live)
    items: [
      chapter("Sitecore Implementation", "Implementation partners from start to finish.", "From Sitecore integration to CMS development and support, we deal in all of it — for start-ups and established enterprises alike.", ["Integration", "CMS development", "Support"], "devTablet", "code"), // (live)
      chapter("Personalised Experiences", "The right content for every visitor.", "Multi-channel, contextually personalised marketing programmes and frictionless user experiences, optimised to the highest standards.", ["Personalisation", "Multi-channel", "Optimisation"], "studio", "settings"), // (live)
      chapter("Experience Platform", "Real-time data, an edge over competitors.", "We connect businesses and customers with the world through the Sitecore Experience Platform, and bring poorly performing implementations back on track.", ["Real-time data", "Analytics", "Recovery"], "trading", "editor"), // (live)
      chapter("UX to Sitecore SEO", "A winning digital strategy, end to end.", "As Sitecore experience architects we craft the strategy all the way from UX to Sitecore SEO, enhancing customer experience with Sitecore's built-in features.", ["UX", "SEO", "Built-in tools"], "ux", "theme"), // (live)
      chapter("Responsive Experiences", "Every screen, every visitor.", "Most web traffic now comes from mobile devices. Responsive design keeps those visitors — and it matters for search rankings too.", ["Mobile-first", "Touch-friendly", "Better for SEO"], "phone", "phone"), // (live FAQ)
    ],
  },
  process: process({
    design: "UX and digital strategy crafted by Sitecore experience architects.", // (live)
    development: "Sitecore implementation by an in-house full-stack team — no outsourcing.", // (live)
    launch: "Your site goes live with technical support, custom hosting and optimisation behind it.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Sitecore CMS", does: "Manage content and optimise it from one platform.", gets: "Effective content, kept up to date." }, // (live)
      { tech: "Personalisation", does: "Contextually personalised experiences across channels.", gets: "Visitors who see what matters to them." }, // (live)
      { tech: "Tracking & analytics", does: "Real-time data collected through the Experience Platform.", gets: "An edge over competitors." }, // (live)
      { tech: "Marketing campaigns", does: "Create and run campaigns inside Sitecore.", gets: "Marketing that performs." }, // (live)
      { tech: "Support & hosting", does: "Technical support, custom hosting and optimisation.", gets: "A platform that keeps performing." }, // (live)
    ],
    cta: techCta("Ready to build your Sitecore experience?", "Build your Sitecore site"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a Sitecore build looks like.",
    text: "The same experience from every side: the site your customers see, the Experience Editor, the personalisation rules, the rendering code, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Personalised site" }, { kind: "editor", label: "Experience Editor" }, { kind: "settings", label: "Personalisation" }, { kind: "code", label: "Custom rendering" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Sitecore consultation", "Have a query? Our Sitecore consultant will guide you.", "meeting"), // (live)
      capability("Implementation recovery", "Poorly performing Sitecore implementations brought back on track.", "trading"), // (live)
      capability("Support & hosting", "Technical support, custom hosting and optimisation from Sitecore specialists.", "team"), // (live)
      capability("Sitecore SEO", "Search built into the strategy from the first UX decision.", "charts"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Sitecore experience comes together.",
    stages: [
      { name: "Content", text: "Your content and campaigns, planned around the customers you want to reach.", screen: "draft", url: "campaign-brief.docx" },
      { name: "CMS", text: "Sitecore manages, tracks and optimises that content.", screen: "editor", url: "yourbrand.com/sitecore" }, // (live)
      { name: "Design", text: "UX crafted by Sitecore experience architects.", screen: "theme", url: "design-system.json" }, // (live)
      { name: "Development", text: "Implementation by an in-house full-stack Sitecore team.", screen: "code", url: "HeroBanner.cs" }, // (live)
      { name: "Data", text: "Real-time data from the Experience Platform, feeding personalisation and analytics.", screen: "api", url: "yourbrand.com/sitecore/api" }, // (live)
      { name: "User experience", text: "Frictionless, personalised experiences for every visitor.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("A website that knows its visitors.", [
    { name: "Personalised journeys", text: "Contextually personalised, multi-channel." }, // (live)
    { name: "Data you can act on", text: "Real-time tracking and analytics." }, // (live)
    { name: "Campaigns that run", text: "Create and run marketing in one place." }, // (live)
    { name: "Found on Google", text: "A strategy from UX all the way to Sitecore SEO." }, // (live)
    { name: "Clear communication", text: "An in-house team — nothing outsourced." }, // (live)
  ], "london"),
  faq: {
    kicker: "Questions",
    title: "Sitecore, answered.",
    items: [
      { q: "Why choose Sitecore?", a: "Sitecore is a leading digital experience platform that brings personalisation, tracking and analytics, marketing campaigns and content optimisation together — everything you need to create and run effective campaigns." },
      { q: "Do you outsource Sitecore development?", a: "No. We have an in-house team of full-stack Sitecore developers, which means clear communication and timely delivery." },
      { q: "Can you fix an underperforming Sitecore implementation?", a: "Yes. Our Sitecore developers have helped bring poorly performing implementations back on track." },
      { q: "Do you provide Sitecore support and hosting?", a: "Yes — technical support, custom hosting and optimisation from our Sitecore specialists." },
      FAQ.seo, FAQ.migrate, FAQ.turnaround, FAQ.cost,
    ],
  },
  cta: cta("Start your Sitecore project"),
};

export default SITECORE;
