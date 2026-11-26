// /services/web-development — the master inner service page; every other service will fill the same shape.
// Source of truth: lincolnmediainc.com/services/web-development (hero, service cards, "Creative Web
// Development Solutions", technologies, FAQ) and its Services menu (names + URLs), plus this site's
// own copy (src/data/services.js, src/data/home.js PROCESS). Copy is restructured for reading, not invented.
// Tags: (live) = the live page, (repo) = this site's existing copy, (live FAQ) = the live page's FAQ.
// Left out on purpose: the live page's figures (265+, 325+, "20+ years" vs "10 years"), AED prices,
// timelines, named enterprise clients, any "why choose us" section, any portfolio / "recent launch" section.
import heroDev from "@public/images/inner/web-development/hero-mob.jpg";
import mockApi from "@public/images/inner/web-development/portfolio-img-1.webp";
import imgCode from "@public/images/services/web-development.jpg";
import imgGlow from "@public/images/home/laptop-glow.jpg";
import imgDesk from "@public/images/services/ui-ux-design.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgCircuit from "@public/images/services/ai-saas-mobile.jpg";
import imgData from "@public/images/services/digital-marketing.jpg";
import imgApp from "@public/images/services/mobile-app-development.jpg";
import imgStudio from "@public/images/about/concept-strategy.webp";
import imgCity from "@public/images/work/belgravia-london.jpg";
import imgHome from "@public/images/work/betterhomes.jpg";
import { PROCESS } from "@/data/home";

const live = (slug) => `/services/${slug}`;
const step = Object.fromEntries(PROCESS.map((p) => [p.title, p.text]));

const WEB_DEVELOPMENT = {
  slug: "web-development",
  path: "/services/web-development",
  name: "Web Development",

  seo: {
    title: "Web Development Services — The Lincoln Media",
    description:
      "Responsive websites and custom web applications — WordPress, SharePoint, Sitecore, Drupal, Laravel, PHP, ASP.NET and Python — with SEO-friendly architecture, integrations and ongoing maintenance.",
    image: imgGlow,
    imageAlt: "A laptop glowing in a dark room",
  },

  hero: {
    strap: "Web development leaders in the USA", // (live)
    title: ["Web", "Development"],
    tagline: "Bring the digital vision of your brand to life with a fully-functional, responsive website.", // (live)
    lead: "Fast, scalable websites and platforms on the stack that fits your business — from CMS builds to enterprise systems.", // (repo)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" }, // (live)
    secondary: { label: "What we build", href: "#build" },
    marquee: ["WordPress", "SharePoint", "Sitecore", "Drupal", "Laravel", "PHP", "ASP.NET", "Python", "AngularJS", "Joomla"], // (live)
    // drawn into the 3D code panel — decorative, no claims
    code: ["<website responsive>", "  <header> navigation </header>", "  <main> hero · story </main>", "  cms: WordPress | Drupal", "  app: Laravel | ASP.NET", "  seo: friendly-architecture", "</website>"],
  },

  intro: {
    kicker: "Solid digital presence",
    statement: ["Your website", "is your brand,", "online."],
    title: "Creative web development solutions for a solid digital presence.", // (live) section heading
    lead: "For most customers the website is where they first meet a brand — and most of them now arrive on a phone. It has to load fast, read clearly and work on every screen.", // (live FAQ, restructured)
    paragraphs: [
      "Design, front-end and back-end development come together in one team — the people who take on complex projects and see them through.", // (live)
      "Developers and the SEO team plan each site together, so it is structured to rank better and convert better from day one.", // (live)
    ],
    image: imgCode,
    imageAlt: "Code open in an editor on a laptop screen",
    mockup: mockApi,
    mockupAlt: "A website built by The Lincoln Media shown on a laptop",
  },

  experience: {
    kicker: "More than a website",
    title: ["We don't just build websites.", "We build digital experiences."],
    text: "A page you can scroll through is the last of several layers. Each one is designed on purpose, and the people who design it work alongside the people who build it.", // (live, restructured)
    url: "yourbrand.com",
    image: imgCity,
    imageAlt: "",
    layers: [
      { name: "Structure", text: "Workshops, audits and research first — we find the real problem before we touch a pixel." }, // (repo Discover)
      { name: "Interface", text: "Systems, prototypes and motion — tested with real people, refined until it sings." }, // (repo Design)
      { name: "Content", text: "A content management system your team can run: WordPress, Drupal, Joomla, or one built from scratch." }, // (live FAQ)
      { name: "Code", text: "Clean, fast, accessible code, QA'd across every device that matters." }, // (repo Build)
    ],
  },

  build: {
    kicker: "What we build",
    title: "Expert web engineering solutions for all sectors.", // (live) section heading
    text: "Pick the platform — or tell us the problem and we'll recommend one.",
    items: [
      { name: "WordPress Development", text: "Visually striking WordPress websites — custom themes, plugins, CMS and WooCommerce stores.", href: live("wordpress-development"), image: imgCode },
      { name: "SharePoint Development", text: "End-to-end custom SharePoint development, where stakeholders store, share and reach information securely from any device.", href: live("sharepoint-development"), image: imgTeam },
      { name: "Enterprise Development", text: "Enterprise management software built to produce more accurate information and better results.", href: live("enterprise-development"), image: imgData },
      { name: "Sitecore Development", text: "Fast, scalable web solutions built on the Sitecore platform.", href: live("sitecore-development"), image: imgGlow },
      { name: "PHP Development", text: "PHP websites built from scratch, front-end and back-end.", href: live("php-development"), image: imgCode },
      { name: "Joomla Development", text: "Joomla development and consulting services.", href: live("joomla-development"), image: imgDesk },
      { name: "ASP.NET Development", text: "Dynamic web pages, applications and services on ASP.NET.", href: live("asp-net-development"), image: imgCircuit },
      { name: "CMS Development", text: "Content management built from scratch, or an existing system tailored to fit.", href: live("cms-website-development"), image: imgStudio },
      { name: "Drupal Development", text: "Customised Drupal website development.", href: live("drupal-web-development"), image: imgDesk },
      { name: "Ibexa DXP", text: "Digital experience platforms that help grow revenue through new sales channels.", href: null, image: imgData },
      { name: "Laravel Development", text: "Scalable, secure web applications on Laravel.", href: live("laravel-web-development"), image: imgCircuit },
      { name: "Python Development", text: "Python web and app development.", href: live("python-development"), image: imgApp },
      { name: "AngularJS Development", text: "Custom AngularJS web development services.", href: live("angularjs-development"), image: imgGlow },
      { name: "Website Maintenance", text: "Ongoing maintenance that improves the performance and security of existing websites.", href: live("website-maintenance-services"), image: imgTeam },
      { name: "WhatsApp Integration", text: "WhatsApp integration for your website, for customer conversations.", href: live("whatsapp-web-integration"), image: imgApp },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything a web project needs, in one team.",
    items: [
      { name: "Strategy", visual: "sitemap", lead: "Understanding the business before designing the site.", text: `${step.Discover} ${step.Strategy}`, tags: ["Workshops", "Audits", "User journeys", "Site structure"], image: imgStudio }, // (repo)
      { name: "UX/UI", visual: "wireframe", lead: "Interfaces that are intuitive to use and good to look at.", text: step.Design, tags: ["Design systems", "Prototypes", "Motion", "User testing"], image: imgDesk }, // (repo)
      { name: "Development", visual: "code", lead: "Front-end and back-end, designed and coded by one team.", text: "PHP, HTML, CSS, JavaScript, React, Laravel and ASP.NET; CMS builds on WordPress, Drupal, Joomla and Sitecore; enterprise management software and custom web applications built around the way the business runs.", tags: ["Front-end", "Back-end", "CMS", "Web applications"], image: imgCode }, // (live FAQ)
      { name: "Integration", visual: "nodes", lead: "Websites connected to the systems the business already relies on.", text: "ERP customisation and integration with SAP, Oracle, Salesforce, Microsoft and other major vendors; cloud services on AWS, Azure and Google Cloud; WhatsApp integration for customer conversations.", tags: ["ERP", "Cloud", "CMS", "WhatsApp"], image: imgCircuit }, // (live FAQ + menu)
      { name: "Optimization", visual: "chart", lead: "Performance, search and security, before and after launch.", text: "SEO-friendly architecture planned with the SEO team, white-hat SEO to grow organic reach, maintenance that improves performance and security, and a low-risk migration process that protects your traffic and data.", tags: ["Technical SEO", "Performance", "Security", "Migration"], image: imgData }, // (live)
    ],
  },

  architecture: {
    kicker: "You name it, we deliver", // (live)
    title: "A digital architecture, layer by layer.",
    text: "Every site stands on four layers. These are the ones the team works with — and if you need a specific framework, the request goes to the people who know it best.", // (live FAQ)
    layers: [
      { name: "Languages", items: ["PHP", "Python", "JavaScript", "Java", "C#", "C++", "Ruby", "HTML", "CSS"] }, // (live)
      { name: "Frameworks", items: ["Laravel", "CodeIgniter", "CakePHP", "React", "Angular", "Vue", "Node", "Ruby on Rails", "Flask", "ASP.NET", "Bootstrap"] }, // (live FAQ)
      { name: "Platforms", items: ["WordPress", "WooCommerce", "Drupal", "Joomla", "Sitecore", "SharePoint", "Ibexa DXP"] }, // (live)
      { name: "Cloud & ERP", items: ["AWS", "Azure", "Google Cloud", "SAP", "Oracle", "Salesforce", "Microsoft"] }, // (live FAQ)
    ],
  },

  process: {
    kicker: "How a build moves",
    title: "Five moves. No wasted ones.", // (repo)
    steps: [
      { name: "Discover", text: step.Discover, visual: "blank" },
      { name: "Strategy", text: step.Strategy, visual: "sitemap" },
      { name: "Design", text: step.Design, visual: "wireframe" },
      { name: "Build", text: step.Build, visual: "code" },
      { name: "Launch & Grow", text: step["Launch & Grow"], visual: "live" },
    ], // (repo)
  },

  devices: {
    kicker: "Responsive development",
    title: ["One digital experience.", "Every screen."],
    text: "Every site we build is responsive. Most web traffic now comes from mobile devices, and responsive design matters for search rankings as well as for people — so the phone layout gets the same care as the desktop.", // (live FAQ)
    points: [
      { name: "Layouts that reflow", text: "Content reorganises for each screen instead of shrinking." },
      { name: "Built for touch", text: "Navigation and forms sized for thumbs as well as cursors." },
      { name: "Tested everywhere", text: "QA'd across every device that matters before launch." }, // (repo)
    ],
    url: "yourbrand.com",
    image: imgHome,
  },

  quality: {
    kicker: "Under the surface",
    title: "Quality you feel before you see it.",
    text: "The work that never shows on a screenshot is what makes a site feel fast and trustworthy.",
    items: [
      { name: "SEO-friendly structure", text: "Developers and the SEO team plan the architecture together, so pages are built to rank and convert." }, // (live)
      { name: "Clean, accessible code", text: "Semantic, accessible markup that is QA'd across every device that matters." }, // (repo)
      { name: "Fast, scalable builds", text: "Websites and platforms on the stack that fits the business, ready to grow with it." }, // (repo)
      { name: "Responsive by default", text: "Every site we build works on every screen." }, // (live)
      { name: "Security & maintenance", text: "Maintenance that improves the performance and security of the site after launch." }, // (live)
      { name: "Low-risk migration", text: "Moving an existing site with a process designed to protect your traffic and data." }, // (live FAQ)
    ],
  },

  interactive: {
    kicker: "Beyond the page",
    title: ["Design on the surface.", "Engineering underneath."],
    text: "Move across the page to look beneath it. Motion, depth and interaction are designed by the same studio that writes the code — so the idea survives the trip from concept to browser.",
    hint: "Move to reveal the code",
    url: "yourbrand.com",
    image: imgCity,
    code: ["<header class=\"site\">", "  <nav aria-label=\"Main\">…</nav>", "</header>", "<main>", "  <section class=\"hero\">", "    <h1>Your brand,", "        online.</h1>", "    <a class=\"cta\">Start</a>", "  </section>", "  <section class=\"story\">", "    <img loading=\"lazy\" …>", "  </section>", "</main>"],
  },

  faq: {
    kicker: "Questions",
    title: "Before you start.",
    items: [
      { q: "What kinds of websites do you develop?", a: "Responsive websites and web applications on WordPress, SharePoint, Sitecore, Drupal, Joomla and Ibexa DXP, PHP and ASP.NET builds, and enterprise management software — for enterprises and start-ups alike." },
      { q: "Can you build custom web applications?", a: "Yes. Enterprise management software and custom web applications on ASP.NET, Laravel, Python and AngularJS, designed and coded front-end and back-end by one team." },
      { q: "Is every website responsive?", a: "Yes. Most web traffic now comes from mobile devices and responsive design matters for search rankings too, so every site we build works on every screen." },
      { q: "Can you integrate my website with other systems?", a: "Yes. We customise and integrate with SAP, Oracle, Salesforce, Microsoft and other major ERP vendors, work with AWS, Azure and Google Cloud, and add WhatsApp integration for customer conversations." },
      { q: "Can you work on an existing website?", a: "Yes — maintenance that improves the performance and security of sites built elsewhere, and a low-risk migration process designed to protect your traffic and data." },
      { q: "Can you build a content management system?", a: "Yes — a CMS built from scratch, or an existing one modified to fit, with particular expertise in WordPress, Drupal and Joomla." },
      { q: "How does the development process work?", a: "Five steps: discover, strategy, design, build, then launch and grow — with prompt support and full transparency throughout." },
      { q: "Do you provide support after launch?", a: "Yes. Websites we build get ongoing support, and the SEO team can keep growing organic reach with white-hat strategies." },
    ],
  },

  cta: {
    kicker: "Start a project",
    title: ["Let's build something", "worth experiencing."],
    text: "Reach out to our team and we'll get back to you within a day.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" }, // (live)
    image: imgGlow,
  },
};

export default WEB_DEVELOPMENT;
