// /services/web-development — the first inner service page and the master content shape for the rest.
// Source: lincolnmediainc.com/services/web-development (hero, service cards, "Creative Web Development
// Solutions", technologies, portfolio, FAQ), its Services menu (names + URLs), and this site's own copy
// (src/data/services.js, src/data/home.js PROCESS). Copy is restructured for reading, not invented.
// Left out on purpose: the live page's figures (265+, 325+, "20+ years" vs "10 years"), AED prices,
// timelines, named enterprise clients and its process section (which is video-animation template text).
import heroDev from "@public/images/inner/web-development/hero-mob.jpg";
import mockApi from "@public/images/inner/web-development/portfolio-img-1.webp";
import mockCircle from "@public/images/inner/web-development/portfolio-img-2.webp";
import mockGardinia from "@public/images/inner/web-development/portfolio-img-3.webp";
import logoApi from "@public/images/inner/web-development/api.webp";
import logoCircle from "@public/images/inner/web-development/circle-mall.webp";
import logoGardinia from "@public/images/inner/web-development/gardinia.webp";
import imgCode from "@public/images/services/web-development.jpg";
import imgGlow from "@public/images/home/laptop-glow.jpg";
import imgDesk from "@public/images/services/ui-ux-design.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgCircuit from "@public/images/services/ai-saas-mobile.jpg";
import imgData from "@public/images/services/digital-marketing.jpg";
import imgApp from "@public/images/services/mobile-app-development.jpg";
import imgStudio from "@public/images/about/concept-strategy.webp";
import { PROCESS } from "@/data/home";

const live = (slug) => `/services/${slug}`;
const step = Object.fromEntries(PROCESS.map((p) => [p.title, p.text]));

const WEB_DEVELOPMENT = {
  slug: "web-development",
  path: "/services/web-development",
  name: "Web Development",
  motif: "web", // which 3D object family the hero and showcase use (see Services/ServiceShapes)

  seo: {
    title: "Web Development Services — The Lincoln Media",
    description:
      "Fully functional, responsive websites and web applications: WordPress, SharePoint, Sitecore, Drupal, Laravel, PHP, ASP.NET, Python and enterprise development, with SEO-friendly architecture and ongoing maintenance.",
  },

  hero: {
    strap: "Web development leaders in the USA", // (live) "Web Development Leaders in USA"
    title: ["Web", "Development"],
    tagline: "Bring the digital vision of your brand to life with a fully-functional, responsive website.", // (live)
    image: heroDev,
    imageAlt: "A developer at work, code on a laptop screen",
    primary: { label: "Speak to an Expert", href: "/#contact" }, // (live)
    secondary: { label: "Explore what we build", href: "#capabilities" },
    marquee: ["WordPress", "SharePoint", "Sitecore", "Drupal", "Laravel", "PHP", "ASP.NET", "Python", "AngularJS", "Joomla"],
  },

  intro: {
    kicker: "Solid digital presence",
    title: "Creative web development solutions for a solid digital presence.", // (live) section heading
    lead: "Fast, scalable websites and platforms on the stack that fits your business — from CMS builds to enterprise systems.", // (repo)
    paragraphs: [
      "Design, front-end and back-end development come together in one team — the people who take on complex projects and see them through.", // (live, restructured)
      "A project is complete only when its stakeholders are satisfied, and every client gets prompt support and full transparency along the way.", // (live, restructured)
    ],
    points: ["Front-end & back-end", "Prompt support", "Full transparency", "Free consultation"], // (live)
    images: [imgCode, heroDev, imgGlow],
  },

  capabilities: {
    kicker: "What we build",
    title: "Expert web engineering solutions for all sectors.", // (live) section heading
    items: [
      { name: "WordPress Development", text: "Visually striking WordPress websites — custom themes, plugins, CMS and WooCommerce stores.", href: live("wordpress-development"), image: imgCode },
      { name: "SharePoint Development", text: "End-to-end custom SharePoint development services.", href: live("sharepoint-development"), image: imgTeam },
      { name: "Enterprise Development", text: "Enterprise management software built to produce more accurate information and better results.", href: live("enterprise-development"), image: imgData },
      { name: "Sitecore Development", text: "Fast, scalable web solutions built on the Sitecore platform.", href: live("sitecore-development"), image: imgGlow },
      { name: "PHP Development", text: "PHP website development.", href: live("php-development"), image: imgCode },
      { name: "Joomla Development", text: "Joomla development and consulting services.", href: live("joomla-development"), image: imgDesk },
      { name: "ASP.NET Development", text: "Dynamic web pages, applications and services on ASP.NET.", href: live("asp-net-development"), image: imgCircuit },
      { name: "CMS Development", text: "CMS services for software, websites and platforms — built from scratch or tailored from an existing system.", href: live("cms-website-development"), image: imgStudio },
      { name: "Drupal Development", text: "Customised Drupal website development.", href: live("drupal-web-development"), image: imgDesk },
      { name: "Ibexa DXP", text: "Digital experience platforms that help grow revenue through new sales channels.", href: null, image: imgData },
      { name: "Laravel Development", text: "Scalable, secure web applications on Laravel.", href: live("laravel-web-development"), image: imgCircuit },
      { name: "Python Development", text: "Python web and app development.", href: live("python-development"), image: imgApp },
      { name: "AngularJS Development", text: "Custom AngularJS web development services.", href: live("angularjs-development"), image: imgGlow },
      { name: "Website Maintenance Services", text: "Ongoing maintenance that improves the performance and security of existing websites.", href: live("website-maintenance-services"), image: imgTeam },
      { name: "WhatsApp Integration", text: "WhatsApp integration for your website.", href: live("whatsapp-web-integration"), image: imgApp },
    ],
  },

  technology: {
    kicker: "You name it, we deliver", // (live)
    title: "Strategy, design, development, technology, performance.",
    flow: [
      { name: "Strategy", text: step.Strategy },
      { name: "Design", text: step.Design },
      { name: "Development", text: "Front-end and back-end, from CMS builds to enterprise systems." },
      { name: "Technology", text: "Websites and platforms on the stack that fits your business." }, // (repo)
      { name: "Performance", text: "SEO-friendly architecture: developers and the SEO team work together so sites rank and convert." }, // (live)
    ],
    stack: [
      ["Languages", ["PHP", "Python", "JavaScript", "Java", "C#", "C++", "Ruby", "HTML", "CSS"]], // (live) "You name it"
      ["Frameworks", ["Laravel", "CodeIgniter", "CakePHP", "React", "Angular", "Vue", "Node", "Ruby on Rails", "Flask", "ASP.NET", "Bootstrap"]], // (live FAQ)
      ["Platforms", ["WordPress", "WooCommerce", "Drupal", "Joomla", "Sitecore", "SharePoint", "Ibexa DXP"]],
      ["Cloud & ERP", ["AWS", "Azure", "Google Cloud", "SAP", "Oracle", "Salesforce", "Microsoft"]], // (live FAQ)
    ],
  },

  details: {
    kicker: "In detail",
    title: "What a web project with us covers.",
    areas: [
      {
        name: "Website Development",
        lead: "Responsive websites on the platform that fits — WordPress, Drupal, Joomla, Sitecore or PHP built from scratch.",
        body: ["Every site is built to work on every screen: most traffic now arrives on mobile, and responsive design matters for search as well as for people."], // (live FAQ)
        tags: ["WordPress", "Drupal", "Joomla", "Sitecore", "PHP"],
        image: imgCode,
      },
      {
        name: "Enterprise & Custom Applications",
        lead: "Enterprise management software and custom web applications — dynamic pages, applications and services.",
        body: ["SharePoint portals where stakeholders store, share and reach information securely from any device; ASP.NET, Laravel, Python and AngularJS applications built around the way the business runs."], // (live)
        tags: ["Enterprise", "SharePoint", "ASP.NET", "Laravel", "Python", "AngularJS"],
        image: imgData,
      },
      {
        name: "CMS Development",
        lead: "Content management built from scratch, or an existing system modified to fit.",
        body: ["Expertise across WordPress, Drupal and Joomla — custom themes and plugins, editorial workflows, and stores on WooCommerce."], // (live FAQ)
        tags: ["Custom CMS", "WordPress", "Drupal", "Joomla", "WooCommerce"],
        image: imgStudio,
      },
      {
        name: "Front-end & Back-end",
        lead: "One team designs and codes both sides of the website.",
        body: ["Design and development with PHP, HTML, CSS, JavaScript, React, Laravel and ASP.NET — and if you need a specific framework, the request goes to the team that knows it best."], // (live FAQ)
        tags: ["PHP", "HTML", "CSS", "JavaScript", "React", "Laravel", "ASP.NET"],
        image: imgGlow,
      },
      {
        name: "Integrations",
        lead: "Websites connected to the systems the business already relies on.",
        body: ["ERP customisation and integration with SAP, Oracle, Salesforce, Microsoft and other major vendors; cloud services on AWS, Azure and Google Cloud; WhatsApp integration for customer conversations."], // (live FAQ + menu)
        tags: ["ERP", "SAP", "Salesforce", "AWS", "Azure", "WhatsApp"],
        image: imgCircuit,
      },
      {
        name: "SEO-Friendly Architecture",
        lead: "Developers and the SEO team plan the site together.",
        body: ["Developers and the SEO team work together, so sites are structured to rank better and convert better — and white-hat SEO can grow their organic reach after launch."], // (live)
        tags: ["Technical SEO", "Site structure", "White-hat SEO"],
        image: imgData,
      },
      {
        name: "Maintenance & Migration",
        lead: "Support that continues after launch, and moves that don't lose what you've built.",
        body: ["Ongoing help for the websites we build, maintenance that improves performance and security, and a low-risk migration process designed to protect your traffic and data."], // (live FAQ)
        tags: ["Maintenance", "Security", "Performance", "Migration"],
        image: imgTeam,
      },
    ],
  },

  why: {
    kicker: "Why The Lincoln Media",
    title: "Why teams build their websites with us.",
    reasons: [
      { title: "Complete only when you are.", text: "A project isn't finished until its stakeholders are satisfied.", image: imgStudio }, // (live)
      { title: "Prompt support. Full transparency.", text: "Every client gets prompt support and full transparency throughout the project.", image: imgTeam }, // (live)
      { title: "Both sides of the build.", text: "Front-end and back-end in one team that takes on complex projects.", image: imgCode }, // (live)
      { title: "Built to rank.", text: "Developers and SEO specialists plan the architecture together.", image: imgData }, // (live)
      { title: "One team. Zero hand-offs.", text: "Creativity, technology and strategy under one roof.", image: imgGlow }, // (repo)
    ],
  },

  process: {
    kicker: "How a build moves",
    title: "From the first workshop to launch day.",
    steps: PROCESS.map((p, i) => ({ name: p.title, text: p.text, image: [imgTeam, imgStudio, imgDesk, imgCode, imgData][i] })), // (repo)
  },

  showcase: {
    kicker: "Web development portfolio", // (live)
    title: "Websites built for real businesses.",
    projects: [
      { name: "API Establishments", platform: "WordPress", text: "A WordPress website for a hospitality operator, with a user-friendly CMS and multi-platform reach.", image: mockApi, logo: logoApi }, // (live)
      { name: "CircleMall", platform: "SharePoint", text: "A SharePoint-based website where stakeholders store, share and reach information securely from any device.", image: mockCircle, logo: logoCircle }, // (live)
      { name: "Gardinia", platform: "PHP", text: "A PHP website built from scratch for a start-up, with front-end and back-end performance enhancements.", image: mockGardinia, logo: logoGardinia }, // (live)
    ],
  },

  faq: {
    kicker: "Questions",
    title: "Before you start.",
    items: [
      { q: "What kinds of websites do you develop?", a: "Responsive websites and web applications on WordPress, SharePoint, Sitecore, Drupal, Joomla and Ibexa DXP, PHP and ASP.NET builds, and enterprise management software — for enterprises and start-ups alike." },
      { q: "Can you design and code both the front-end and the back-end?", a: "Yes. One team handles design and development, working with PHP, HTML, CSS, JavaScript, React, Laravel and ASP.NET." },
      { q: "I need a specific framework. Do you have the expertise?", a: "The team works with React, Angular, Vue, Laravel, Ruby on Rails, Flask, Node, CakePHP, CodeIgniter and Bootstrap, among others — tell us what you need and the request goes to the right people." },
      { q: "Can you create a content management system for my website?", a: "Yes — a CMS built from scratch, or an existing one modified to fit, with particular expertise in WordPress, Drupal and Joomla." },
      { q: "Do you have WordPress experts?", a: "Yes: custom themes, plugins, CMS work and e-commerce on WooCommerce, plus ongoing maintenance." },
      { q: "Is responsive web design important?", a: "Very. Most web traffic now comes from mobile devices, and responsive design matters for search rankings too — every site we build is responsive." },
      { q: "Can you integrate my website with our ERP or cloud services?", a: "Yes. We customise and integrate with SAP, Oracle, Salesforce, Microsoft and other major ERP vendors, and work with AWS, Azure and Google Cloud." },
      { q: "Can your developers migrate my existing website?", a: "Yes, using a low-risk migration process designed to protect your traffic and your data." },
      { q: "Do you offer help once the site is launched?", a: "Yes. Websites we build get ongoing support; for sites built elsewhere, maintenance is available as a service." },
      { q: "Can you also help the site rank on Google?", a: "Yes. Developers and the SEO team work together on the site's architecture, and the SEO team uses white-hat strategies to grow organic reach." },
    ],
  },

  cta: {
    title: ["Have a digital experience in mind?", "Let's build it."],
    text: "Reach out to our team and we'll get back to you within a day.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" }, // (live)
    image: imgGlow,
  },
};

export default WEB_DEVELOPMENT;
