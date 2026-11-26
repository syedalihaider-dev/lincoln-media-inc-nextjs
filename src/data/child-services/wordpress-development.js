// /services/wordpress-development — the first Web Development child page and the master dataset shape.
// Source of truth: lincolnmediainc.com/services/wordpress-development (hero, "Your Go-To WordPress
// Development Company", theme / plugin / CMS sections, technology line, sectors, FAQ). Tags: (live) the
// page itself, (live FAQ) its FAQ, (repo) this site's existing copy. Copy is restructured, not invented.
// Left out on purpose: the live page's figures (265+, 325+, 20+ / "a decade", WordPress market-share
// percentages), AED prices, the 1–3 month timeline, named clients, the portfolio cards, and its "Our Process"
// block (template text written for video animation).
//
// Imagery: real photography only. From the old site (lincolnmediainc.com/assets/images): the Web
// Development hero (developer at work), the UI/UX hero (design studio), and its launched-website mockups;
// the rest is the site's existing photography. Interfaces (site, editor, code, API, theme, store, settings)
// are real HTML at device widths — see src/components/ChildService/ui/Screens.jsx — showing a generic
// "yourbrand" site, never a client.
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgCode from "@public/images/services/web-development.jpg";
import imgDash from "@public/images/work/polly.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgShop from "@public/images/services/ecommerce.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgSeo from "@public/images/services/digital-marketing.jpg";
import imgPhone from "@public/images/services/mobile-app-development.jpg";
import imgEmpire from "@public/images/home/empire.jpg";
import imgRing from "@public/images/work/aureum.jpg";
import imgHouse from "@public/images/work/betterhomes.jpg";
import imgCity from "@public/images/work/belgravia-london.jpg";
import imgDevTablet from "@public/images/about/concept-strategy.webp";
import imgPhones from "@public/images/about/dual-mobile.webp";
import imgDeveloper from "@public/images/inner/wordpress/developer-at-work.webp";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";
import imgLaunched from "@public/images/inner/wordpress/launched-websites.webp";

const WORDPRESS = {
  parent: { name: "Web Development", href: "/services/web-development" },

  seo: {
    title: "WordPress Development Company in the USA — The Lincoln Media",
    description:
      "Custom WordPress development: bespoke themes, custom plugins, enterprise WordPress CMS, WooCommerce stores, integrations, migration and ongoing maintenance — designed and built by in-house WordPress developers.",
    keywords: ["WordPress development", "custom WordPress theme", "WordPress plugin development", "WordPress CMS", "WooCommerce development", "WordPress maintenance"],
    image: imgDeveloper,
    imageAlt: "A developer writing code at a desk",
  },

  // the generic demo site shown across the interfaces (photos: hero fallback, then cards / products)
  demo: { url: "yourbrand.com", photos: [imgDusk, imgRing, imgHouse, imgCity] },

  hero: {
    strap: "WordPress development company in the United States", // (live)
    title: ["WordPress", "Development"],
    tagline: "High-quality, robust and tailor-made WordPress development services.", // (live)
    lead: "Ignite your online identity with professional WordPress website designers and developers.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" }, // (live)
    secondary: { label: "Our WordPress expertise", href: "#expertise" },
    stage: {
      url: "yourbrand.com",
      photos: [imgDusk, imgRing, imgHouse, imgCity],
      video: "/videos/nyc-night.mp4", // plays inside the demo site's hero
      poster: "/videos/nyc-night-poster.jpg",
      toast: "Page updated",
    },
  },

  intro: {
    kicker: "Your go-to WordPress company", // (live)
    statement: "We live and breathe WordPress development.", // (live)
    title: "WordPress website development services", // (live)
    paragraphs: [
      "We enjoy creating CMS websites and WordPress websites that make it super easy for you to upload, update and manage content. Technical knowledge, coupled with creative and marketing expertise, is what makes the difference.", // (live)
      "The team is made of dedicated, in-house WordPress developers who know how to design exceptional WordPress sites that meet all your needs.", // (live)
    ],
    image: imgUx,
    imageAlt: "A designer sketching website wireframes on a tablet",
    backdrop: imgCode,
    marquee: "WordPress",
  },

  visual: {
    image: imgTowers,
    imageAlt: "Glass towers rising into a pale sky, seen from street level",
    caption: ["Ignite your", "online identity."], // (live)
    note: "Websites with an aesthetic design and powerful functionality.", // (live)
  },

  expertise: {
    kicker: "Expertise",
    title: "What we build with WordPress.",
    intro: "From custom development to theme and plugin work, CMS builds and responsive design — our WordPress services cover everything you need.", // (live FAQ)
    items: [
      {
        name: "Custom WordPress Development", // (live FAQ)
        lead: "Built around your business, not a template.",
        text: "Websites designed and coded by in-house WordPress developers, with features designed exclusively for your business — from a theme-based site to a fully custom build.", // (live)
        points: ["Custom builds", "Custom post types", "In-house developers"],
        photo: imgDevTablet, photoAlt: "A developer writing code on a tablet at a desk",
        screen: "code",
      },
      {
        name: "Custom Theme Development", // (live)
        lead: "A theme that is entirely unique and personalised to your company.", // (live)
        text: "Our approach takes care of the look and feel of your website: designers and developers create a WordPress theme that is yours alone.", // (live)
        points: ["Bespoke design", "Typography & colour", "Built for your content"],
        photo: imgUx, photoAlt: "Wireframes for a website being sketched on a tablet",
        screen: "theme",
      },
      {
        name: "Plugin Development & Integration", // (live)
        lead: "The feature you need, even when the market doesn't have it.", // (live)
        text: "A plugin built for you when the one you need isn't available — use it on your own website, or re-sell it under your name. Plugin installation and setup is covered too.", // (live + live FAQ)
        points: ["Custom plugins", "Yours to use or re-sell", "Installation & setup"],
        photo: imgCode, photoAlt: "Code open in an editor on a laptop",
        screen: "settings",
      },
      {
        name: "WordPress CMS Solutions", // (live)
        lead: "A high-performance, scalable enterprise CMS.", // (live)
        text: "Content management that makes it super easy to upload, update and manage content — scaled for the enterprise, with features designed exclusively for your business.", // (live)
        points: ["Easy content editing", "Enterprise-ready", "Scalable"],
        photo: imgDash, photoAlt: "A content dashboard open on a laptop",
        screen: "editor",
      },
      {
        name: "Responsive Experiences", // (live FAQ)
        lead: "Every screen, every visitor.",
        text: "Most web traffic now comes from mobile devices. Responsive design keeps those visitors — and it matters for search rankings too.", // (live FAQ, figure removed)
        points: ["Mobile-first layouts", "Touch-friendly", "Better for SEO"],
        photo: imgPhone, photoAlt: "A phone showing a clean app interface",
        screen: "phone",
      },
    ],
  },

  process: {
    kicker: "How we deliver",
    title: "Involved every step of the way.", // (live FAQ)
    steps: [
      { name: "Discovery", text: "Send us your brief and we meet to discuss the project at length — workshops, audits and research to find the real problem first.", photo: imgTeam, photoAlt: "A team working on laptops around one table" }, // (live FAQ + repo)
      { name: "Strategy", text: "A proposal and a measurable plan everyone signs off on. Once you approve it, the work begins.", photo: imgSeo, photoAlt: "Website performance charts on a screen" }, // (live FAQ + repo)
      { name: "Design", text: "The look and feel of your website, designed as a theme that is entirely unique to your company.", photo: imgUx, photoAlt: "Wireframes being sketched on a tablet" }, // (live)
      { name: "Development", text: "Theme, custom plugins and CMS built by in-house WordPress developers, with full transparency as it happens.", photo: imgDevTablet, photoAlt: "A developer writing code on a tablet" }, // (live)
      { name: "Testing", text: "Clean, fast, accessible code — QA'd across every device that matters before anything goes live.", photo: imgPhones, photoAlt: "Two phones showing app screens", fit: "contain" }, // (repo)
      { name: "Launch", text: "Your site goes live, and we keep helping with it after launch — maintenance, SEO and new features.", photo: imgLaunched, photoAlt: "Websites built by the studio, shown on two monitors", fit: "contain" }, // (live FAQ)
    ],
  },

  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: imgDeveloper, // (old site's Web Development hero)
    video: null, // a real film can replace the photograph: { src, srcMobile, poster }
    rows: [
      { tech: "WordPress CMS", does: "Lets your team upload, update and manage content without a developer.", gets: "A website you control, day to day." }, // (live)
      { tech: "Custom themes & plugins", does: "Features and a look designed exclusively for your business.", gets: "A site that fits you — not a template." }, // (live)
      { tech: "Integrations", does: "Connects WooCommerce, ERP systems such as SAP, Oracle, Salesforce and Microsoft, and WhatsApp.", gets: "One website working with the systems you already run." }, // (live FAQ)
      { tech: "Responsive, SEO-friendly build", does: "Layouts for every screen, structured to rank on Google with white-hat SEO.", gets: "Visitors who find you, and stay." }, // (live FAQ)
      { tech: "Maintenance & security", does: "Ongoing help after launch, keeping performance and security up to date.", gets: "A site that keeps working as you grow." }, // (live FAQ + menu)
    ],
    cta: {
      text: "Ready to build your WordPress experience?",
      primary: { label: "Build your WordPress site", href: "/contact-us#contact-form" },
      secondary: { label: "See how we deliver", href: "#process" },
    },
  },

  showcase: {
    kicker: "In the studio",
    title: "What a WordPress build looks like.",
    text: "The same project from every side: the site your customers see, the editor your team works in, the store, the plugin settings, the phone.",
    url: "yourbrand.com",
    screens: [
      { kind: "site", label: "Custom theme" },
      { kind: "editor", label: "Content editing" },
      { kind: "store", label: "WooCommerce store" },
      { kind: "settings", label: "Custom plugin" },
      { kind: "phone", label: "Responsive" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      { name: "WooCommerce development", text: "E-commerce on WordPress with WooCommerce — one of the most requested platforms for result-driven business models.", image: imgShop, imageAlt: "Shopping bags laid out on a dark surface" }, // (live FAQ)
      { name: "Website migration", text: "Safe, smooth migration with a risk-free method, so you don't lose traffic on the way.", image: imgEmpire, imageAlt: "The Manhattan skyline with the Empire State Building" }, // (live FAQ)
      { name: "Maintenance & security", text: "Ongoing help with the websites we create once they launch, and maintenance that improves the performance and security of sites that have been running for a while.", image: imgTeam, imageAlt: "A team working on laptops around one table" }, // (live FAQ + menu)
      { name: "SEO & organic growth", text: "An SEO team that knows what your website needs to stand out on Google, with a tried and tested white-hat strategy.", image: imgSeo, imageAlt: "Website performance charts on a screen" }, // (live FAQ)
    ],
  },

  ecosystem: {
    kicker: "The ecosystem",
    title: "How one WordPress website comes together.",
    stages: [
      { name: "Content", text: "Your words, images and products — what you want to say and sell — planned before anything is built.", screen: "draft", url: "homepage-copy.docx" }, // (repo Discover, restructured)
      { name: "CMS", text: "WordPress makes it super easy to upload, update and manage that content yourself.", screen: "editor", url: "yourbrand.com/wp-admin" }, // (live)
      { name: "Design", text: "A custom theme gives it a look that is entirely unique and personalised to your company.", screen: "theme", url: "theme.json" }, // (live)
      { name: "Development", text: "Themes, plugins and features designed exclusively for your business, coded by in-house WordPress developers.", screen: "code", url: "functions.php" }, // (live)
      { name: "Integrations", text: "Connected to WooCommerce, ERP systems such as SAP, Oracle, Salesforce and Microsoft, and WhatsApp.", screen: "api", url: "yourbrand.com/wp-json" }, // (live FAQ)
      { name: "User experience", text: "A responsive website your customers can use on every screen, structured to be found on Google.", screen: "site", url: "yourbrand.com" }, // (live FAQ)
    ],
  },

  outcome: {
    image: imgDusk,
    imageAlt: "Manhattan at dusk, the city lights coming on",
    kicker: "What it does for you",
    title: "A website that works as hard as you do.",
    items: [
      { name: "Content you control", text: "Upload, update and manage content yourself — it is super easy." }, // (live)
      { name: "A look that's yours", text: "A theme unique and personalised to your company." }, // (live)
      { name: "Features others don't have", text: "Plugins built for you, ready to use or re-sell." }, // (live)
      { name: "Room to grow", text: "A scalable enterprise CMS, built around your business." }, // (live)
      { name: "Found on Google", text: "Development and white-hat SEO, from one team." }, // (live FAQ)
    ],
    sectorsLabel: "Sectors we build for", // (live: "We help a diverse clientele build result-driven web development")
    sectors: ["Automotive", "Healthcare", "Manufacturing", "Education", "Business Consulting", "Technology", "Real Estate", "Restaurant"], // (live)
  },

  faq: {
    kicker: "Questions",
    title: "WordPress, answered.",
    items: [
      { q: "Do you have WordPress experts in your team?", a: "Yes. Whether you need help with plugin installation, custom theme development, CMS development or e-commerce development, we have you covered." },
      { q: "Can you create a theme-based WordPress website?", a: "Yes. Our WordPress services cover everything from custom WordPress development to theme and plugin development, WooCommerce development and WordPress maintenance." },
      { q: "Can you create a content management system for my website?", a: "Yes. The team is proficient in WordPress, Drupal, Joomla and other content management systems — we can code one from scratch or change your existing CMS to fit your requirements." },
      { q: "Can your developers migrate my website?", a: "Yes. The team has the technical knowledge for safe, smooth website migration and follows a risk-free method so that you don't lose traffic." },
      { q: "Do you offer ongoing help once the site is launched?", a: "Yes, we offer ongoing help with websites we have created once they launch. For a website that has been running for some time, further services are available for a charge." },
      { q: "Can you also help my website rank on Google?", a: "Yes. Our SEO team knows what your website needs to stand out on Google and works with a tried and tested white-hat SEO strategy." },
      { q: "What will be the turnaround time for my project?", a: "Once you send your brief, we schedule a meeting to discuss the project at length. The turnaround time is estimated solely from your project's requirements, and you're involved every step of the way." },
      { q: "What does a project cost?", a: "Every project has different objectives and requirements, so there is no standard price list. Get in touch and we'll prepare a quote for your project." },
    ],
  },

  cta: {
    kicker: "Start your WordPress project",
    title: ["Let's create something", "exceptional."],
    text: "Reach out to our team and we'll get back to you within a day.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" }, // (live)
    image: imgStudio, // (old site's UI/UX hero: a designer at work in the studio)
  },
};

export default WORDPRESS;
