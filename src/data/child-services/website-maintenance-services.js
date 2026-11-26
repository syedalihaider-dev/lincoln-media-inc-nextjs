// /services/website-maintenance-services — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/website-maintenance-services (hero, "Website Maintenance Agency",
// "Reliable web AMC services", the AMC coverage list, free consultation) and the live FAQ.
// Left out: "cheapest plans" and ranking claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const MAINTENANCE = {
  parent: PARENT,
  seo: {
    title: "Website Maintenance Services (AMC) — The Lincoln Media",
    description: "Website maintenance and annual maintenance contracts for WordPress sites and Shopify, Magento and WooCommerce stores: security, updates, plugins, themes, content, technical optimisation, SEO and hosting.",
    keywords: ["website maintenance services", "website AMC", "WordPress maintenance", "website support", "annual maintenance contract"],
    image: pic("team"), imageAlt: alt("team"),
  },
  demo: { url: "yourbrand.com", photos: [pic("empire"), pic("ring"), pic("bike"), pic("house")] },
  hero: {
    strap: "Best website (AMC) maintenance services in the United States", // (live)
    title: ["Website", "Maintenance"],
    tagline: "Hand over the daily running and maintenance of your website to our support team.", // (live)
    lead: "From website security to migration, plugin installation to customisation, we do everything.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "What we maintain", href: "#expertise" },
    stage: stage(["empire", "ring", "bike", "house"], "All updates applied"),
  },
  ui: {
    admin: "/wp-admin",
    apiBase: "/status",
    editor: { title: "Updates — Dashboard", action: "Update all", panel: "Maintenance", blocks: ["Core updates", "Plugins", "Themes", "Backups", "Security scan", "Uptime", "Content", "Reports"] },
    code: {
      tabs: ["maintenance.log", "backup.sh", "crontab"],
      lines: [
        ["c", "# maintenance.log — monthly run, yourbrand.com"],
        ["k", "$ wp core check-update"],
        ["s", "  WordPress is at the latest version."],
        ["k", "$ wp plugin update --all"],
        ["s", "  Updated 4 of 4 plugins."],
        ["k", "$ wp theme update --all"],
        ["s", "  Updated 1 of 1 themes."],
        ["k", "$ wp db optimize"],
        ["s", "  Success: Database optimized."],
        ["k", "$ ./backup.sh --offsite"],
        ["s", "  Backup stored: 2026-11-23_0200.tar.gz"],
        ["k", "$ wp cache flush"],
        ["s", "  Success: The cache was flushed."],
      ],
    },
    api: {
      method: "GET",
      path: "/status/health",
      json: `{
  "site": "yourbrand.com",
  "status": "healthy",
  "ssl": { "valid": true, "renews": "2027-02-14" },
  "core": "up to date",
  "plugins": { "outdated": 0 },
  "last_backup": "2026-11-23T02:00:00Z"
}`,
      links: [["Hosting", "Server & uptime"], ["Backups", "Off-site copies"], ["Security", "Scans & SSL"]],
    },
    themeFile: "theme.json",
    settings: { title: "Maintenance plan · Settings", tabs: ["Plan", "Updates", "Backups", "Security"], rows: [["Automatic plugin updates", true], ["Daily off-site backups", true], ["Pause updates during campaigns", false], ["Weekly security scans", true]], slider: "Backup retention" },
  },
  intro: {
    kicker: "Website maintenance agency", // (live)
    statement: "Reliable web AMC services.", // (live)
    title: "A strategic website maintenance plan", // (live)
    paragraphs: [
      "Without a technical background, website maintenance can be tricky. From security checks to content updates, upgrading plugins to moving to a new CMS version, it takes time and focus.", // (live)
      "Our team of web instructors and developers works with you to set up a strategic maintenance plan — covering WordPress websites as well as Shopify, Magento and WooCommerce stores, from themes and plugins to content, images, videos and the software itself.", // (live)
    ],
    image: pic("team"), imageAlt: alt("team"),
    backdrop: pic("code"),
    marquee: "Maintenance",
  },
  visual: visual("empire", ["Secure, optimised,", "well maintained."], "Mitigate every kind of risk with regular web maintenance."), // (live)
  expertise: {
    kicker: "What we maintain",
    title: "Our website AMC covers everything.",
    intro: "Technical optimisation, content, SEO, plugins, themes, updates, design and hosting — or a short fix when that's all you need.", // (live)
    items: [
      chapter("WordPress Updates & Plugins", "Always on the latest version.", "WordPress core updates, plugins, themes and templates kept current — and plugin installation and customisation when you need it.", ["Core updates", "Plugins", "Themes"], "code", "code"), // (live)
      chapter("Technical & Structure Optimisation", "Fast and well organised.", "Technical optimisation and site-structure optimisation, so your website stays fast and easy to navigate.", ["Performance", "Site structure", "Hosting"], "charts", "settings"), // (live)
      chapter("Content Alterations & Planning", "Your site, always up to date.", "Content alterations, additions and planning — text, images and videos handled for you.", ["Content updates", "Images & video", "Planning"], "dash", "editor"), // (live)
      chapter("Design & Creative", "Fresh pages when you need them.", "Design and creative work, from a new page to a short fix.", ["New pages", "Design", "Short fixes"], "studio", "theme"), // (live)
      chapter("Stores & Social", "Every platform you run.", "Shopify, Magento and WooCommerce stores, off-page SEO and social media — all covered by the plan.", ["Shopify", "Magento", "WooCommerce"], "shop", "phone"), // (live)
    ],
  },
  process: process({
    discovery: "Fill out the form and our team calls you the same day — the initial consultation is free.", // (live)
    strategy: "We learn your requirements and the current state of your website, then propose a custom maintenance package.", // (live)
    design: "Design and creative updates — new pages, templates and refreshes.", // (live)
    development: "Updates, plugins, themes and technical optimisation, handled by our developers.", // (live)
    testing: "Security checks and testing after every change, before anything goes live.", // (live)
    launch: "A secure, optimised, well-maintained website — month after month.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Security checks", does: "Regular checks that mitigate risks to your site.", gets: "A secure website." }, // (live)
      { tech: "Updates & plugins", does: "WordPress, plugin and theme updates kept current.", gets: "No outdated software." }, // (live)
      { tech: "Technical optimisation", does: "Performance and site-structure improvements.", gets: "An optimised website." }, // (live)
      { tech: "Content & SEO", does: "Content changes and off-page SEO handled for you.", gets: "A site that stays fresh and visible." }, // (live)
      { tech: "Hosting", does: "Hosting looked after as part of the plan.", gets: "One team for the whole website." }, // (live)
    ],
    cta: techCta("Ready to hand over your maintenance?", "Get a maintenance plan"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What maintenance looks like.",
    text: "The same website from every side: the site your customers see, the updates dashboard, the maintenance plan, the monthly run, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Your website" }, { kind: "editor", label: "Updates dashboard" }, { kind: "settings", label: "Maintenance plan" }, { kind: "code", label: "Monthly run" }, { kind: "phone", label: "Checked on mobile" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the website, covered.",
    items: [
      capability("Short fixes", "Don't need a full package? Hire our team for a short fix or a new page.", "devTablet"), // (live)
      capability("Website migration", "Moving to a new CMS version or platform, with a risk-free method.", "empire"), // (live + FAQ)
      capability("Training", "Our web instructors train your team to manage the website.", "meeting"), // (live)
      capability("Off-page SEO & social", "Backlinks, marketing and social media as part of the plan.", "charts"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one maintenance plan comes together.",
    stages: [
      { name: "Assessment", text: "Your requirements and the current state of your website.", screen: "draft", url: "site-audit.docx" }, // (live)
      { name: "Dashboard", text: "Every update, backup and scan in one place.", screen: "editor", url: "yourbrand.com/wp-admin" },
      { name: "Design", text: "Design and creative kept consistent with your brand.", screen: "theme", url: "theme.json" }, // (live)
      { name: "Updates", text: "Core, plugins and themes updated on schedule.", screen: "code", url: "maintenance.log" }, // (live)
      { name: "Monitoring", text: "Security, backups and hosting checked continuously.", screen: "api", url: "yourbrand.com/status" }, // (live)
      { name: "User experience", text: "A secure, optimised website your customers can rely on.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("A website you never have to worry about.", [
    { name: "Fewer risks", text: "Regular maintenance mitigates every kind of risk." }, // (live)
    { name: "Time back", text: "Your daily tasks, not your website's." }, // (live)
    { name: "Always current", text: "Updates, plugins and themes handled." }, // (live)
    { name: "Optimised", text: "Technical and structure optimisation." }, // (live)
    { name: "Any platform", text: "WordPress, Shopify, Magento, WooCommerce." }, // (live)
  ], "empire"),
  faq: {
    kicker: "Questions",
    title: "Maintenance, answered.",
    items: [
      { q: "What does your maintenance plan cover?", a: "Technical optimisation, content alterations and planning, off-page SEO, web page maintenance, social media, site-structure optimisation, plugins, themes and templates, WordPress updates, design and creative, and hosting." },
      { q: "Which platforms do you maintain?", a: "WordPress websites as well as Shopify, Magento and WooCommerce stores." },
      { q: "Can I hire you for a single fix?", a: "Yes. If you don't want a complete package, hire our team for a short fix or a new page." },
      { q: "How do we get started?", a: "Fill out the form and our team will call you the same day. The initial consultation is free; we then propose a custom maintenance package for your website." },
      FAQ.migrate, FAQ.support, FAQ.seo, FAQ.cost,
    ],
  },
  cta: cta("Start your maintenance plan", ["Let's keep your website", "exceptional."]),
};

export default MAINTENANCE;
