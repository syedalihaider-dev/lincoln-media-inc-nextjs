// /services/drupal-web-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/drupal-web-development (hero, "Hire Drupal Web Developer", why
// Drupal, design & development / theme development / customisation / installation & configuration) and the
// live FAQ. Left out: the "1M+ developers" figure and "certified" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const DRUPAL = {
  parent: PARENT,
  seo: {
    title: "Drupal Website Development Company — The Lincoln Media",
    description: "Custom Drupal development: Drupal design and development, theme development, customisation, installation and configuration — feature-rich, SEO-friendly content management for businesses of every size.",
    keywords: ["Drupal development", "Drupal website development", "Drupal theme development", "custom Drupal", "Drupal CMS"],
    image: pic("ux"), imageAlt: alt("ux"),
  },
  demo: { url: "yourbrand.com", photos: [pic("london"), pic("house"), pic("ring"), pic("towers")] },
  hero: {
    strap: "Leading Drupal website development company in the United States", // (live)
    title: ["Drupal", "Development"],
    tagline: "Using Drupal, we design websites that make customers for you.", // (live)
    lead: "Feature-rich, SEO-friendly content management systems built on Drupal.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our Drupal expertise", href: "#expertise" },
    stage: stage(["london", "house", "ring", "towers"], "Content moderated"),
  },
  ui: {
    admin: "/admin/content",
    apiBase: "/jsonapi",
    editor: { title: "Edit Basic page — Home", action: "Save", panel: "Paragraphs", blocks: ["Hero", "Text", "Image", "Views list", "Card grid", "Accordion", "Call to action", "Webform"] },
    code: {
      tabs: ["yourbrand.module", "yourbrand.info.yml", "yourbrand.theme"],
      lines: [
        ["c", "<?php // yourbrand.module — custom Drupal module"],
        ["", ""],
        ["k", "use Drupal\\node\\NodeInterface;"],
        ["", ""],
        ["c", "/** Implements hook_node_presave(). */"],
        ["k", "function yourbrand_node_presave(NodeInterface $node) {"],
        ["s", "  if ($node->bundle() === 'article' && $node->isNew()) {"],
        ["s", "    $node->set('moderation_state', 'draft');"],
        ["", "  }"],
        ["k", "}"],
        ["", ""],
        ["c", "/** Implements hook_theme(). */"],
        ["k", "function yourbrand_theme() {"],
        ["s", "  return ['featured_list' => ['variables' => ['items' => []]]];"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/jsonapi/node/article?sort=-created&page[limit]=3",
      json: `{
  "data": [
    { "type": "node--article", "id": "b1f6…", "attributes": { "title": "New season", "status": true } },
    { "type": "node--article", "id": "a93c…", "attributes": { "title": "Journal", "status": true } },
    { "type": "node--article", "id": "7d20…", "attributes": { "title": "Visit us", "status": true } }
  ]
}`,
      links: [["Views", "Lists & blocks"], ["Multisite", "One codebase, many sites"], ["Moderation", "Review & publish"]],
    },
    themeFile: "yourbrand.theme",
    settings: { title: "Configuration · Content moderation", tabs: ["Workflows", "Multisite", "SEO", "Performance"], rows: [["Moderate new articles", true], ["Pathauto URL aliases", true], ["Maintenance mode", false], ["Aggregate CSS & JS", true]], slider: "Cache max age" },
  },
  intro: {
    kicker: "Hire Drupal web developers", // (live)
    statement: "The backbone of your online PR.", // (live)
    title: "Unrivalled Drupal solutions", // (live)
    paragraphs: [
      "If you can't control the content on your website, you can't accelerate your marketing. Drupal is consistently named among the best content systems — open source, and free to download, use and modify.", // (live)
      "It's an enterprise CMS with ready-made solutions: SEO-ready themes, integration, content moderation, paragraphs, multisite configuration and more. To make the most of them, you need expert Drupal developers.", // (live)
    ],
    image: pic("ux"), imageAlt: alt("ux"),
    backdrop: pic("code"),
    marquee: "Drupal",
  },
  visual: visual("london", ["Websites that make", "customers for you."], "Feature-rich, SEO-friendly Drupal experiences."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our Drupal services.",
    intro: "Whether you are a small business or a large-scale enterprise, our Drupal designers give you every functionality you ask for.", // (live)
    items: [
      chapter("Drupal Design & Development", "Every functionality you ask for.", "Custom Drupal development for small businesses and large enterprises alike, from a team with several years of Drupal experience.", ["Custom builds", "Enterprise", "Small business"], "devTablet", "code"), // (live)
      chapter("Drupal Theme Development", "A UI/UX designed from scratch.", "A custom theme and UI/UX built to your needs, with customisable components such as views, lists, blocks and admin tools.", ["Views", "Blocks", "Admin tools"], "ux", "theme"), // (live)
      chapter("Drupal Customization", "Tell us what you need.", "Custom themes, plugin customisation and any features and functionality you're looking for — leave the rest to us.", ["Themes", "Modules", "Features"], "dash", "editor"), // (live)
      chapter("Installation & Configuration", "A finely tuned configuration.", "Seamless Drupal installation and configuration, better deployment strategies and a more sophisticated maintenance approach.", ["Installation", "Deployment", "Maintenance"], "circuit", "settings"), // (live)
      chapter("Responsive Experiences", "Every screen, every visitor.", "Most web traffic now comes from mobile devices. Responsive design keeps those visitors — and it matters for search rankings too.", ["Mobile-first", "Touch-friendly", "Better for SEO"], "phone", "phone"), // (live FAQ)
    ],
  },
  process: process({
    design: "A UI/UX and complete Drupal theme designed from scratch around your needs.", // (live)
    development: "Custom Drupal development, with better deployment strategies built in.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Drupal CMS", does: "Open-source, enterprise-grade content management.", gets: "Control over the content that drives your marketing." }, // (live)
      { tech: "Content moderation", does: "Review and publishing built into the platform.", gets: "The right content, approved before it's live." }, // (live)
      { tech: "Multisite configuration", does: "Several websites from one platform.", gets: "Every brand and region managed together." }, // (live)
      { tech: "Custom themes", does: "Customisable views, lists, blocks and admin tools.", gets: "A look that is yours, edited without heavy code." }, // (live)
      { tech: "SEO-friendly build", does: "SEO-ready themes and structure.", gets: "Websites that make customers for you." }, // (live)
    ],
    cta: techCta("Ready to build on Drupal?", "Build your Drupal site"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a Drupal build looks like.",
    text: "The same project from every side: the site your customers see, the content editor, the moderation workflow, the custom module, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Drupal website" }, { kind: "editor", label: "Content editing" }, { kind: "settings", label: "Moderation" }, { kind: "code", label: "Custom module" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Deployment strategy", "Better deployment strategies, and fine-tuned configuration management.", "circuit"), // (live)
      capability("Maintenance", "A more sophisticated maintenance approach for your CMS.", "team"), // (live)
      capability("Website migration", "Safe, smooth migration with a risk-free method, so you don't lose traffic on the way.", "empire"), // (live FAQ)
      capability("SEO & organic growth", "SEO-friendly Drupal, and an SEO team that knows how to stand out on Google.", "charts"), // (live + FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Drupal website comes together.",
    stages: [
      { name: "Content", text: "The content that powers your marketing, planned first.", screen: "draft", url: "content-plan.docx" }, // (live)
      { name: "CMS", text: "Drupal manages it, with moderation and paragraphs built in.", screen: "editor", url: "yourbrand.com/admin/content" }, // (live)
      { name: "Design", text: "A custom theme with views, lists and blocks.", screen: "theme", url: "yourbrand.theme" }, // (live)
      { name: "Development", text: "Custom modules for every functionality you ask for.", screen: "code", url: "yourbrand.module" }, // (live)
      { name: "Integrations", text: "Integration and multisite configuration, served through Drupal's API.", screen: "api", url: "yourbrand.com/jsonapi" }, // (live)
      { name: "User experience", text: "A feature-rich, SEO-friendly site that makes customers for you.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("A website that makes customers.", [
    { name: "Content under control", text: "The backbone of your online PR." }, // (live)
    { name: "Enterprise-ready", text: "Moderation, integration and multisite built in." }, // (live)
    { name: "Your own look", text: "A custom theme, adjusted in the editor." }, // (live)
    { name: "Found on Google", text: "SEO-friendly from the start." }, // (live)
    { name: "Easy to maintain", text: "A sophisticated maintenance approach." }, // (live)
  ], "london"),
  faq: {
    kicker: "Questions",
    title: "Drupal, answered.",
    items: [
      { q: "Why Drupal?", a: "Drupal is open source — free to download, use and modify — and it is an enterprise CMS with ready-made solutions including SEO-ready themes, integration, content moderation, paragraphs and multisite configuration." },
      { q: "Can you design a custom Drupal theme?", a: "Yes. We create the UI/UX from scratch and a complete theme to your needs, with customisable components such as views, lists, blocks and admin tools." },
      { q: "Do you customise existing Drupal websites?", a: "Yes — custom themes, plugin customisation and any features and functionality you're looking for." },
      { q: "Can you install and configure Drupal for us?", a: "Yes. We handle installation and configuration, with better deployment strategies and a more sophisticated maintenance approach." },
      FAQ.cms, FAQ.migrate, FAQ.seo, FAQ.cost,
    ],
  },
  cta: cta("Start your Drupal project"),
};

export default DRUPAL;
