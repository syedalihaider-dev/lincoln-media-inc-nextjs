// /services/php-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/php-development (hero, "Elite PHP Web Development Consulting
// Services", LAMP, web portals and back-ends, enterprise sites and e-commerce stores) and the live FAQ.
// Left out: "renowned brands" claims and figures.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const PHP = {
  parent: PARENT,
  seo: {
    title: "PHP Web Development Services in the USA — The Lincoln Media",
    description: "Custom PHP applications and websites: LAMP development, web portals, PHP back-ends, high-performance enterprise sites and e-commerce stores — built to international development standards.",
    keywords: ["PHP development", "PHP web development", "custom PHP applications", "LAMP development", "PHP backend"],
    image: pic("code"), imageAlt: alt("code"),
  },
  demo: { url: "yourbrand.com", photos: [pic("dusk"), pic("bike"), pic("ring"), pic("house")] },
  hero: {
    strap: "PHP web development services in the United States", // (live)
    title: ["PHP", "Development"],
    tagline: "A highly interactive, scalable and custom PHP website development company.", // (live)
    lead: "Professional PHP developers creating efficient, custom PHP applications and websites that fully meet your core business needs.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" },
    secondary: { label: "Our PHP expertise", href: "#expertise" },
    stage: stage(["dusk", "bike", "ring", "house"], "Deployed to production"),
  },
  ui: {
    admin: "/admin",
    apiBase: "/api",
    editor: { title: "Admin — Products", action: "Save", panel: "Sections", blocks: ["Products", "Categories", "Orders", "Customers", "Pages", "Media", "Users", "Settings"] },
    code: {
      tabs: ["ProductController.php", "routes.php", "composer.json"],
      lines: [
        ["c", "<?php // ProductController.php"],
        ["k", "declare(strict_types=1);"],
        ["", ""],
        ["k", "final class ProductController"],
        ["k", "{"],
        ["", "    public function __construct(private PDO $db) {}"],
        ["", ""],
        ["", "    public function list(int $page = 1): array"],
        ["", "    {"],
        ["s", "        $stmt = $this->db->prepare('SELECT id, name, price FROM products"],
        ["s", "                                    ORDER BY created_at DESC LIMIT 24 OFFSET :o');"],
        ["", "        $stmt->bindValue(':o', ($page - 1) * 24, PDO::PARAM_INT);"],
        ["", "        $stmt->execute();"],
        ["", "        return $stmt->fetchAll(PDO::FETCH_ASSOC);"],
        ["", "    }"],
        ["k", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/products?category=new-in&page=1",
      json: `{
  "page": 1,
  "items": [
    { "id": 812, "name": "Signature piece", "price": 240.00 },
    { "id": 811, "name": "Everyday edit", "price": 95.00 },
    { "id": 810, "name": "Limited series", "price": 180.00 }
  ]
}`,
      links: [["MySQL", "Products & orders"], ["Payments", "Checkout"], ["Cloud", "Hosting & storage"]],
    },
    themeFile: "styles.scss",
    settings: { title: "Store · Settings", tabs: ["General", "Catalogue", "Checkout", "Performance"], rows: [["Product reviews", true], ["Guest checkout", true], ["Maintenance mode", false], ["Page caching", true]], slider: "Products per page" },
  },
  intro: {
    kicker: "Your go-to PHP development company", // (live)
    statement: "Elite PHP web development, built to international standards.", // (live, restructured)
    title: "Elite PHP web development consulting services", // (live)
    paragraphs: [
      "Our PHP programmers harness the open-source power of PHP to create stunning web portals and PHP back-ends. Our expertise with LAMP and PHP web development reduces development costs and removes frustrating technological diversions.", // (live)
      "We design high-performance, feature-rich enterprise websites as well as e-commerce stores with thousands of product pages — ideating, creating and launching any kind of website you choose.", // (live)
    ],
    image: pic("devTablet"), imageAlt: alt("devTablet"),
    backdrop: pic("code"),
    marquee: "PHP",
  },
  visual: visual("dusk", ["We ideate, create", "and launch."], "Any kind of website you choose, built on PHP."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "What we build with PHP.",
    intro: "Modern design principles combined with the latest tech in the cloud, mobile and desktop — tailored solutions that connect teams, companies and brands with their customers.", // (live)
    items: [
      chapter("Custom PHP Applications", "Efficient applications built around your business.", "Custom PHP applications and websites that fully meet your core business needs, created to international standards of development.", ["Custom apps", "Clean code", "International standards"], "devTablet", "code"), // (live)
      chapter("Web Portals & PHP Back-ends", "The open-source power of PHP.", "Stunning web portals and the PHP back-ends behind them, built by our PHP programmers.", ["Portals", "Back-ends", "Open source"], "code", "editor"), // (live)
      chapter("LAMP Development", "Lower costs, fewer diversions.", "Our LAMP expertise drastically reduces development costs and removes frustrating technological diversions.", ["Linux", "Apache", "MySQL", "PHP"], "circuit", "settings"), // (live)
      chapter("Enterprise & E-commerce", "High-performance and feature-rich.", "Enterprise websites and e-commerce stores that contain thousands of underlying product pages.", ["Enterprise sites", "E-commerce", "Scale"], "shop", "store"), // (live)
      chapter("Cloud, Mobile & Desktop", "Tailored for every platform.", "Modern design principles with the latest tech in the cloud, mobile and desktop — simplifying and accelerating business processes and lowering costs.", ["Cloud", "Mobile", "Desktop"], "phone", "phone"), // (live)
    ],
  },
  process: process({
    design: "Modern design principles applied to your website or portal before a line is coded.", // (live)
    development: "Efficient, custom PHP built to international standards of development.", // (live)
    launchPhoto: "mockStartup",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "PHP & LAMP", does: "Open-source technology that keeps development costs down.", gets: "More website for your budget." }, // (live)
      { tech: "Custom PHP back-ends", does: "The logic and data behind your portal or store.", gets: "A site that works the way your business does." }, // (live)
      { tech: "E-commerce at scale", does: "Stores with thousands of product pages.", gets: "Room for your whole catalogue." }, // (live)
      { tech: "Cloud, mobile & desktop", does: "Tailored solutions across platforms.", gets: "Faster business processes, lower costs." }, // (live)
      { tech: "Responsive, SEO-friendly build", does: "Layouts for every screen, structured to rank on Google.", gets: "Visitors who find you, and stay." }, // (live FAQ)
    ],
    cta: techCta("Ready to build with PHP?", "Build your PHP website"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a PHP build looks like.",
    text: "The same project from every side: the site your customers see, the admin panel, the store, the settings, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Custom website" }, { kind: "editor", label: "Admin panel" }, { kind: "store", label: "E-commerce store" }, { kind: "settings", label: "Store settings" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("PHP consulting", "Elite PHP web development consulting, from first idea to launch.", "meeting"), // (live)
      capability("Website migration", "Safe, smooth migration with a risk-free method, so you don't lose traffic on the way.", "empire"), // (live FAQ)
      capability("Maintenance & security", "Ongoing help once your website launches, keeping it fast and secure.", "team"), // (live FAQ)
      capability("SEO & organic growth", "An SEO team that knows what your website needs to stand out on Google.", "charts"), // (live FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one PHP website comes together.",
    stages: [
      { name: "Content", text: "Your pages, products and copy, planned before anything is built.", screen: "draft", url: "homepage-copy.docx" },
      { name: "Admin", text: "A custom admin panel to manage products, pages and orders.", screen: "editor", url: "yourbrand.com/admin" },
      { name: "Design", text: "Modern design principles, applied to your brand.", screen: "theme", url: "styles.scss" }, // (live)
      { name: "Development", text: "Custom PHP, built to international standards.", screen: "code", url: "ProductController.php" }, // (live)
      { name: "Integrations", text: "Databases, payments and cloud services connected.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "A fast, responsive website your customers enjoy.", screen: "site", url: "yourbrand.com" },
    ],
  },
  outcome: outcome("A website built for your business.", [
    { name: "Lower costs", text: "Open-source LAMP keeps development efficient." }, // (live)
    { name: "Exactly what you need", text: "Custom applications that meet your core needs." }, // (live)
    { name: "Built to scale", text: "Thousands of product pages, no problem." }, // (live)
    { name: "Faster processes", text: "Business processes simplified and accelerated." }, // (live)
    { name: "Closer to customers", text: "Solutions that connect your brand with its customers." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "PHP, answered.",
    items: [
      { q: "What can you build with PHP?", a: "Custom PHP applications and websites, web portals, PHP back-ends, enterprise websites and e-commerce stores with thousands of product pages." },
      { q: "Why PHP and LAMP?", a: "Our expertise with LAMP and PHP web development drastically reduces development costs and removes frustrating technological diversions." },
      { q: "Do you build PHP e-commerce stores?", a: "Yes — high-performance, feature-rich stores that can contain thousands of underlying product pages." },
      { q: "Can you build for mobile and the cloud too?", a: "Yes. We combine modern design principles with the latest tech in the cloud, mobile and desktop." },
      FAQ.framework, FAQ.migrate, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your PHP project"),
};

export default PHP;
