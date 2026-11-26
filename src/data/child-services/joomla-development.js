// /services/joomla-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/joomla-development (hero, "Why Us for Joomla Development?",
// extension development / CMS development / customisation, multi-language + SEO, training) and the live FAQ.
// Left out: "over ten years", "renowned service providers" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const JOOMLA = {
  parent: PARENT,
  seo: {
    title: "Joomla Website Development Services — The Lincoln Media",
    description: "Joomla website development, extension development, CMS development and customisation: scalable, secure, multi-language and SEO-friendly Joomla websites, with training for your team.",
    keywords: ["Joomla development", "Joomla website development", "Joomla extension development", "Joomla CMS", "Joomla customization"],
    image: pic("ux"), imageAlt: alt("ux"),
  },
  demo: { url: "yourbrand.com", photos: [pic("empire"), pic("house"), pic("ring"), pic("london")] },
  hero: {
    strap: "Joomla website development services", // (live)
    title: ["Joomla", "Development"],
    tagline: "Joomla development solutions for artistically pure and rich websites.", // (live)
    lead: "Our Joomla website developers and designers create aesthetic websites that are scalable and easy to maintain.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our Joomla expertise", href: "#expertise" },
    stage: stage(["empire", "house", "ring", "london"], "Article published"),
  },
  ui: {
    admin: "/administrator",
    apiBase: "/api/index.php/v1",
    editor: { title: "Articles: Edit — Home", action: "Save & Close", panel: "Modules", blocks: ["Article", "Menu", "Custom HTML", "Latest articles", "Breadcrumbs", "Search", "Language switcher", "Footer"] },
    code: {
      tabs: ["mod_featured.php", "tmpl/default.php", "mod_featured.xml"],
      lines: [
        ["c", "<?php // mod_featured — a custom Joomla module"],
        ["k", "defined('_JEXEC') or die;"],
        ["", ""],
        ["k", "use Joomla\\CMS\\Factory;"],
        ["k", "use Joomla\\CMS\\Helper\\ModuleHelper;"],
        ["", ""],
        ["", "$db    = Factory::getContainer()->get('DatabaseDriver');"],
        ["", "$query = $db->getQuery(true)"],
        ["s", "    ->select($db->quoteName(['id', 'title', 'alias']))"],
        ["s", "    ->from($db->quoteName('#__content'))"],
        ["s", "    ->where($db->quoteName('featured') . ' = 1')"],
        ["", "    ->setLimit((int) $params->get('count', 3));"],
        ["", "$items = $db->setQuery($query)->loadObjectList();"],
        ["", ""],
        ["s", "require ModuleHelper::getLayoutPath('mod_featured', $params->get('layout', 'default'));"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/index.php/v1/content/articles?filter[featured]=1",
      json: `{
  "data": [
    { "type": "articles", "id": "64", "attributes": { "title": "New season", "language": "en-GB" } },
    { "type": "articles", "id": "63", "attributes": { "title": "Nouvelle saison", "language": "fr-FR" } },
    { "type": "articles", "id": "62", "attributes": { "title": "Journal", "language": "en-GB" } }
  ]
}`,
      links: [["Extensions", "Custom features"], ["Languages", "Multi-language content"], ["SEO", "Search-friendly URLs"]],
    },
    themeFile: "templateDetails.xml",
    settings: { title: "Global Configuration", tabs: ["Site", "System", "Server", "Permissions"], rows: [["Search engine friendly URLs", true], ["Multilingual associations", true], ["Site offline", false], ["Gzip page compression", true]], slider: "Default list limit" },
  },
  intro: {
    kicker: "Why us for Joomla development", // (live)
    statement: "Scalable, secure and easy to maintain.", // (live, restructured)
    title: "Unparalleled Joomla development services", // (live)
    paragraphs: [
      "We know how to design and develop your website using best industry practices — keeping ease of use, robust security and powerful functionality.", // (live)
      "Our Joomla websites include multi-language support and SEO-friendly features, so you are more visible online and can expand your customer base worldwide. And we train you to manage the content on your site with clarity and ease.", // (live)
    ],
    image: pic("ux"), imageAlt: alt("ux"),
    backdrop: pic("code"),
    marquee: "Joomla",
  },
  visual: visual("architecture", ["Artistically pure,", "and rich."], "Aesthetic Joomla websites that stay easy to maintain."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "What we build with Joomla.",
    intro: "Our services are not limited to Joomla website development — we also build extensions, content management systems and customisations.", // (live)
    items: [
      chapter("Joomla Website Development", "Aesthetic, scalable websites.", "Websites designed and developed with best industry practices — easy to use, robustly secure and powerful.", ["Best practices", "Security", "Scalability"], "devTablet", "code"), // (live)
      chapter("Joomla Extension Development", "Ahead of the competition.", "A powerful extension tailored to your website's needs, bridging the gap and putting you ahead of the competition.", ["Custom extensions", "Modules", "Plugins"], "code", "settings"), // (live)
      chapter("Joomla CMS Development", "Built from the root of your requirements.", "Content management systems and websites built around your requirements, to help accelerate your business.", ["CMS", "Content workflows", "Training"], "dash", "editor"), // (live)
      chapter("Joomla Customization", "Beyond the basic features.", "New features for your existing Joomla website — a wide range of customisation solutions to take your site to the next level.", ["New features", "Templates", "Free consultation"], "ux", "theme"), // (live)
      chapter("Multi-language & SEO", "Visible worldwide.", "Multi-language support and SEO-friendly features that help you expand your customer base worldwide.", ["Multi-language", "SEO-friendly", "Responsive"], "phone", "phone"), // (live)
    ],
  },
  process: process({
    design: "An aesthetic Joomla template, designed for your brand and easy to maintain.", // (live)
    development: "Joomla built with best industry practices — modules, extensions and multi-language content.", // (live)
    launch: "Your site goes live, and we train you to manage its content with clarity and ease.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Joomla CMS", does: "Manage the content on your site with clarity and ease.", gets: "A website your team runs itself." }, // (live)
      { tech: "Custom extensions", does: "Features tailored to your website's needs.", gets: "An edge over the competition." }, // (live)
      { tech: "Multi-language support", does: "Content in the languages your customers speak.", gets: "A customer base that reaches worldwide." }, // (live)
      { tech: "SEO-friendly features", does: "Search-friendly structure built in.", gets: "More visibility online." }, // (live)
      { tech: "Security & maintenance", does: "Robust security, and a site that's easy to maintain.", gets: "A website that keeps working." }, // (live)
    ],
    cta: techCta("Ready to build your Joomla website?", "Build your Joomla site"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a Joomla build looks like.",
    text: "The same project from every side: the site your customers see, the article editor, the global configuration, the custom module, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Joomla website" }, { kind: "editor", label: "Article editing" }, { kind: "settings", label: "Configuration" }, { kind: "code", label: "Custom module" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Content training", "We train you to manage the content on your site with the utmost clarity and ease.", "meeting"), // (live)
      capability("Free consultation", "Talk to our expert developers about your Joomla website — the first consultation is free.", "team"), // (live)
      capability("Website migration", "Safe, smooth migration with a risk-free method, so you don't lose traffic on the way.", "empire"), // (live FAQ)
      capability("SEO & organic growth", "SEO-friendly features, and an SEO team that knows what your site needs to stand out.", "charts"), // (live + FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Joomla website comes together.",
    stages: [
      { name: "Content", text: "Your articles, menus and languages, planned before anything is built.", screen: "draft", url: "homepage-copy.docx" },
      { name: "CMS", text: "Joomla manages that content — and we train you to use it.", screen: "editor", url: "yourbrand.com/administrator" }, // (live)
      { name: "Design", text: "An aesthetic template that is easy to maintain.", screen: "theme", url: "templateDetails.xml" }, // (live)
      { name: "Development", text: "Extensions and modules tailored to your needs.", screen: "code", url: "mod_featured.php" }, // (live)
      { name: "Integrations", text: "Multi-language content and SEO-friendly URLs, served through the Joomla API.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "A secure, easy-to-use website in every language you need.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("A website your team can run.", [
    { name: "Easy to maintain", text: "Scalable and simple to keep up to date." }, // (live)
    { name: "Visible worldwide", text: "Multi-language and SEO-friendly." }, // (live)
    { name: "Features that fit", text: "Extensions tailored to your website." }, // (live)
    { name: "Robust security", text: "Built on best industry practices." }, // (live)
    { name: "Confidence", text: "Training to manage your content with ease." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "Joomla, answered.",
    items: [
      { q: "What Joomla services do you offer?", a: "Joomla website development, extension development, CMS development and customisation services." },
      { q: "Can you add features to my existing Joomla website?", a: "Yes. We help you move beyond the basic features with a wide range of Joomla customisation solutions — and the first consultation is free." },
      { q: "Will my Joomla website support several languages?", a: "Yes. Our Joomla websites include multi-language support and SEO-friendly features, helping you expand your customer base worldwide." },
      { q: "Will you show us how to manage the site?", a: "Yes. We make it a priority to train you on managing the content on your site with clarity and ease." },
      FAQ.cms, FAQ.migrate, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your Joomla project"),
};

export default JOOMLA;
