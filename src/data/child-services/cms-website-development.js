// /services/cms-website-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/cms-website-development (hero, "Content Management System (CMS)
// Development Services", development / integrations / applications / migration / plugins / enterprise CMS)
// and the live FAQ. Left out: named clients (Yamaha, Suzuki, Coroli) and "most valuable brands" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const CMS = {
  parent: PARENT,
  seo: {
    title: "CMS Website Development Services — The Lincoln Media",
    description: "Secure, scalable content management systems: custom CMS development, integrations, CMS applications, migration, plugin development and enterprise CMS solutions on WordPress, Joomla and more.",
    keywords: ["CMS development", "CMS website development", "content management system", "CMS migration", "enterprise CMS"],
    image: pic("dash"), imageAlt: alt("dash"),
  },
  demo: { url: "yourbrand.com", photos: [pic("dusk"), pic("house"), pic("ring"), pic("empire")] },
  hero: {
    strap: "CMS website development services in the United States", // (live)
    title: ["CMS", "Development"],
    tagline: "Secure, scalable web-based content management systems.", // (live)
    lead: "Easily manageable CMSs that help organisations stay at the top of the competition.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our CMS expertise", href: "#expertise" },
    stage: stage(["dusk", "house", "ring", "empire"], "Changes published"),
  },
  ui: {
    admin: "/cms",
    apiBase: "/api",
    editor: { title: "Pages — Home", action: "Publish", panel: "Content types", blocks: ["Pages", "Articles", "Products", "Media", "Forms", "Menus", "SEO", "Users"] },
    code: {
      tabs: ["content-model.ts", "page.schema.ts", "workflows.ts"],
      lines: [
        ["c", "// content-model.ts — the shape of your content, defined once"],
        ["k", "export const Page = defineContentType({"],
        ["s", "  name: 'page',"],
        ["", "  fields: ["],
        ["s", "    text('title', { required: true }),"],
        ["s", "    slug('slug', { from: 'title' }),"],
        ["s", "    richText('body'),"],
        ["s", "    image('hero', { alt: true }),"],
        ["s", "    seo('meta'),"],
        ["", "  ],"],
        ["", "  workflow: ['draft', 'review', 'published'],"],
        ["", "  roles: { editor: ['create', 'update'], publisher: ['publish'] },"],
        ["k", "});"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/content/pages/home",
      json: `{
  "type": "page",
  "slug": "home",
  "title": "Made to be remembered.",
  "status": "published",
  "hero": { "src": "/media/new-season.jpg", "alt": "New season" },
  "meta": { "title": "yourbrand — New season", "description": "..." }
}`,
      links: [["Plugins", "New features"], ["Marketing", "Campaigns & SEO"], ["Workflows", "Review & publish"]],
    },
    themeFile: "theme-settings.json",
    settings: { title: "CMS · Settings", tabs: ["General", "Roles", "Workflows", "SEO"], rows: [["Editorial review before publishing", true], ["Scheduled publishing", true], ["Public registration", false], ["SEO-friendly URLs", true]], slider: "Revisions to keep" },
  },
  intro: {
    kicker: "Your go-to CMS web development company", // (live)
    statement: "The heart and soul of your organisation.", // (live)
    title: "Content Management System (CMS) development services", // (live)
    paragraphs: [
      "A CMS lets you control your content: update, change or delete any text, image, video or audio, and keep your website organised and up to date — without managing raw code, where a single mistake can ruin the look of your site.", // (live)
      "Our dedicated CMS developers implement customised content management systems for mobile and web apps, for enterprises and retail businesses alike — specific to your needs and compliant with international standards.", // (live)
    ],
    image: pic("dash"), imageAlt: alt("dash"),
    backdrop: pic("code"),
    marquee: "CMS",
  },
  visual: visual("empire", ["Control your", "content."], "Update, change or delete any text, image, video or audio — yourself."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our CMS development services.",
    intro: "Whether you need a CMS on Joomla, WordPress or another platform, we deal in all of them.", // (live)
    items: [
      chapter("CMS Development", "Customised platforms for your business.", "Highly proficient, customised content management platforms — on Joomla, WordPress or any other platform you need.", ["Custom CMS", "WordPress", "Joomla"], "dash", "editor"), // (live)
      chapter("CMS Integrations", "A streamlined approach to your workflows.", "Plugins, extensions and tools integrated into your existing CMS — maximising efficiency and boosting your ROI.", ["Plugins", "Extensions", "Tools"], "circuit", "settings"), // (live)
      chapter("CMS Application Development", "SEO-optimised and user-friendly.", "Applications built with the latest technologies and trends, improving your marketing and enabling workflow management at low cost.", ["SEO-optimised", "Workflows", "Marketing"], "devTablet", "code"), // (live)
      chapter("CMS Plugin Development", "New features whenever you need them.", "From drag-and-drop buttons to customisable themes and SEO-boosting modules — plugins that let you add features and make changes at any time.", ["Drag & drop", "Themes", "SEO modules"], "ux", "theme"), // (live)
      chapter("Enterprise CMS Solutions", "One centralised platform.", "Custom enterprise-level CMS solutions to take full control over your content, SEO and marketing campaigns.", ["Enterprise", "SEO", "Campaigns"], "phone", "phone"), // (live)
    ],
  },
  process: process({
    design: "Content types, roles and templates designed around how your team works.", // (live, restructured)
    development: "A customised CMS, specific to your business and compliant with international standards.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Custom CMS", does: "Update, change or delete any text, image, video or audio.", gets: "A website that stays organised and up to date." }, // (live)
      { tech: "Integrations", does: "Plugins, extensions and tools inside your existing CMS.", gets: "Streamlined workflows, better ROI." }, // (live)
      { tech: "Plugins & modules", does: "Drag-and-drop buttons, customisable themes, SEO modules.", gets: "New features whenever you need them." }, // (live)
      { tech: "CMS migration", does: "Moves your website to another CMS without data loss.", gets: "Faster loading, room for more traffic." }, // (live)
      { tech: "Enterprise CMS", does: "Content, SEO and campaigns on one platform.", gets: "Full control, in one place." }, // (live)
    ],
    cta: techCta("Ready to take control of your content?", "Build your CMS"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a CMS build looks like.",
    text: "The same project from every side: the site your customers see, the page editor, the publishing settings, the content model, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Your website" }, { kind: "editor", label: "Content editing" }, { kind: "settings", label: "Publishing workflow" }, { kind: "code", label: "Content model" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("CMS migration", "No risk of data loss — and a migration that improves loading speed and handles more traffic.", "empire"), // (live)
      capability("Workflow management", "Solutions that enable workflow management at low cost.", "team"), // (live)
      capability("Marketing & SEO", "SEO-optimised, user-friendly applications that improve your marketing efforts.", "charts"), // (live)
      capability("Mobile & web apps", "Customised content management for mobile and web apps.", "phones"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one CMS comes together.",
    stages: [
      { name: "Content", text: "Your text, images, video and audio — what you need to manage.", screen: "draft", url: "content-audit.docx" }, // (live)
      { name: "CMS", text: "A platform to update, change or delete any of it, yourself.", screen: "editor", url: "yourbrand.com/cms" }, // (live)
      { name: "Design", text: "Customisable themes for the way your site looks.", screen: "theme", url: "theme-settings.json" }, // (live)
      { name: "Development", text: "A content model built specifically for your business.", screen: "code", url: "content-model.ts" }, // (live)
      { name: "Integrations", text: "Plugins, extensions and tools, seamlessly integrated.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "An organised, up-to-date website for your customers.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("Content you control.", [
    { name: "No code needed", text: "Manage your site without touching HTML, CSS or JS." }, // (live)
    { name: "Always up to date", text: "Keep your website organised and current." }, // (live)
    { name: "Streamlined workflows", text: "Integrations that maximise efficiency." }, // (live)
    { name: "Faster after migration", text: "Better loading speed, more traffic handled." }, // (live)
    { name: "Everything in one place", text: "Content, SEO and campaigns centralised." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "CMS development, answered.",
    items: [
      { q: "Why does my website need a CMS?", a: "A CMS lets you update, change or delete any text, image, video or audio yourself — keeping your website organised and up to date without managing raw code." },
      { q: "Which CMS platforms do you work with?", a: "Whether you need a CMS based on Joomla, WordPress or another platform, we deal in all of them — or build one from scratch." },
      { q: "Can you move my website to a different CMS?", a: "Yes. Our migration services carry no risk of data loss, and improve your website's loading speed and its ability to handle more traffic." },
      { q: "Do you build CMS plugins?", a: "Yes — from drag-and-drop buttons to customisable themes and SEO-boosting modules." },
      FAQ.cms, FAQ.seo, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your CMS project"),
};

export default CMS;
