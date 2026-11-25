// /services/shopify-plus — Shopify Plus on the E-commerce platform master. Demo store: Arden & Co. (fashion house).
// Video: a model in a dark boutique (Mixkit). No figures, plan prices or clients.
import { STORES, IMG } from "../stores";
import poster from "@public/videos/ecommerce/boutique-poster.jpg";

const store = STORES.arden;

export default {
  name: "Shopify Plus",
  accent: "#36e4d0",
  store,
  seo: {
    title: "Shopify Plus Development Agency for High-Volume Brands | The Lincoln Media",
    description: "Shopify Plus development for high-volume and global brands: checkout extensibility, Shopify Functions, B2B, expansion stores, Flow automation and headless Hydrogen builds.",
    keywords: ["Shopify Plus development", "Shopify Plus agency", "Shopify Plus checkout extensibility", "Shopify Plus B2B", "Shopify Flow", "Hydrogen headless", "enterprise Shopify"],
    image: poster,
    imageAlt: "A model in a patterned dress standing in a dark boutique",
  },

  hero: {
    kicker: "Shopify Plus E-commerce Development",
    title: ["Shopify", "Plus"],
    sub: "For the days when everyone arrives at once.",
    lead: "Shopify Plus builds for brands running drops, regions and wholesale at scale — with checkout logic, automation and storefronts designed for high volume.",
    img: IMG.racks,
    alt: "Clothing on white rails in a bright studio",
    screen: "lookbook",
    facts: ["Checkout extensibility", "Global & B2B", "Automation"],
  },

  intro: {
    kicker: "The service",
    statement: "At scale, the store is the operation. Every launch, region and rule has to hold.",
    text: [
      "Shopify Plus gives high-volume brands more control: checkout extensions, custom logic with Shopify Functions, B2B on the same platform, expansion stores and automation with Flow.",
      "We use that control carefully — designing launches, markets and wholesale so the team can run them without engineering on standby.",
    ],
    img: IMG.shirts,
    alt: "Linen shirts in muted tones on a rail",
  },

  solves: {
    kicker: "What this solves",
    title: "Growth that outran the store.",
    pairs: [
      { problem: "Product drops that slow the site to a crawl.", solution: "A lean theme, cached pages and launches scheduled ahead, ready for the rush." },
      { problem: "Checkout rules hacked together in scripts.", solution: "Checkout UI extensions and Shopify Functions — supported, upgrade-safe logic." },
      { problem: "Wholesale run from spreadsheets and email.", solution: "B2B on Shopify: company accounts, price lists and payment terms in the same admin." },
      { problem: "A separate team for every regional store.", solution: "Markets and expansion stores sharing one theme, one catalogue process and one workflow." },
    ],
  },

  showcase: {
    kicker: "The store",
    title: "Drop day, designed in advance.",
    text: "Collections, campaigns and checkout rules prepared ahead — then released on schedule in every region.",
    main: { kind: "lookbook", device: "desktop" },
    side: { kind: "checkout", device: "phone" },
    notes: [
      { x: 36, y: 34, text: "Shoppable lookbook hotspots" },
      { x: 62, y: 60, text: "Drop scheduled per region" },
      { x: 20, y: 80, text: "Campaign content from metaobjects" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Built for brands at volume.",
    items: [
      { name: "Plus theme & storefront", text: "A custom theme engineered for heavy traffic, rich media and campaign pages your team assembles.", screen: "lookbook" },
      { name: "Checkout extensibility", text: "Checkout UI extensions, branding and Shopify Functions for discounts, delivery and payment customisation.", screen: "checkout" },
      { name: "B2B on Shopify", text: "Company accounts, catalogues and price lists, quantity rules and payment terms alongside DTC.", screen: "quickorder", data: { account: "Wholesale account · net terms", tiered: true } },
      { name: "Expansion stores & Markets", text: "Regional stores and markets with local currency, language, pricing and content.", img: IMG.boutique, alt: "A boutique interior with clothing on rails" },
      { name: "Automation with Flow", text: "Workflows that tag, route, notify and hide products automatically — so launches run themselves.", screen: "admin", data: { app: "Plus admin", nav: ["Home", "Orders", "Products", "Flow", "Markets", "Settings"], active: 3, title: "Flow · Workflows", cols: ["Workflow", "Trigger", "Status"], rows: [["Hide sold-out drop items", "Inventory changed", "Active"], ["Tag VIP customers", "Order created", "Active"], ["Notify ops on high-risk order", "Order risk analysed", "Active"], ["Wholesale order routing", "Order created", "Draft"]] } },
      { name: "Headless with Hydrogen", text: "A custom React storefront on Hydrogen when the brand experience needs to go beyond a theme.", img: IMG.bagOrange, alt: "An orange leather bag" },
    ],
  },

  process: {
    kicker: "How we work",
    title: "Enterprise pace, studio craft.",
    steps: [
      { name: "Platform review", text: "Current store, apps, scripts and integrations audited against what Plus can now do natively." },
      { name: "Architecture", text: "Stores, markets, B2B and integrations planned — and what moves to Functions and Flow." },
      { name: "Design", text: "Campaign templates, lookbooks and PDPs designed as a flexible system." },
      { name: "Build", text: "Theme, checkout extensions, Functions and custom apps built and reviewed in increments." },
      { name: "Load & launch", text: "Launch rehearsals, monitoring and a team on hand for go-live and the first drops." },
      { name: "Run & optimise", text: "Release cadence, testing and automation tuned with the team that runs the store." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "The Plus toolkit, used with intent.",
    rows: [
      { tech: "Checkout UI extensions", does: "Custom fields, upsells and content inside checkout", get: "A branded checkout that survives upgrades" },
      { tech: "Shopify Functions", does: "Server-side logic for discounts, delivery and payments", get: "Business rules without fragile scripts" },
      { tech: "Shopify Flow", does: "Event-driven automation across orders, stock and customers", get: "Fewer manual tasks on busy days" },
      { tech: "B2B on Shopify", does: "Company accounts, catalogues and payment terms", get: "Wholesale and DTC in one admin" },
      { tech: "Hydrogen & Oxygen", does: "Shopify's React framework and global hosting", get: "A fully custom storefront, still on Shopify" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "The boutique, everywhere at once.",
    text: "The same quiet confidence in the flagship, the lookbook and the checkout — whichever region, device or door the customer comes in through.",
    video: { src: "/videos/ecommerce/boutique.mp4", mobile: "/videos/ecommerce/boutique-mobile.mp4", poster: "/videos/ecommerce/boutique-poster.jpg" },
    gallery: [
      { img: IMG.shirts, alt: "Shirts on a rail" },
      { img: IMG.bagBlack, alt: "Black leather tote" },
      { img: IMG.storeModern, alt: "Minimal fashion store" },
    ],
    screen: "product",
  },

  faq: {
    kicker: "Questions",
    title: "Shopify Plus, answered.",
    items: [
      { q: "When should a brand move from Shopify to Shopify Plus?", a: "When you need what Plus adds: checkout extensibility, B2B, expansion stores, advanced automation, higher API limits or organisation-level management. We'll review your store and say plainly whether the move pays off." },
      { q: "We use Shopify Scripts. What happens to them?", a: "Shopify is replacing Scripts with Shopify Functions and checkout extensions. We audit each script and rebuild its logic on the supported tools, so checkout keeps working through the transition." },
      { q: "Can we sell wholesale on the same store?", a: "Yes. B2B on Shopify Plus supports company accounts, customer-specific catalogues and price lists, quantity rules and payment terms, alongside your direct-to-consumer store." },
      { q: "How do you prepare a store for big launches?", a: "Lean themes, pre-built campaign content, scheduled releases, rehearsed launches, automation for stock and tagging, and monitoring with the team on hand on the day." },
      { q: "Should we go headless with Hydrogen?", a: "Only when the experience needs it — complex content, unusual interactions or several front ends. Otherwise a well-built Plus theme is faster to run and change." },
      { q: "Can you migrate us from Magento or Salesforce Commerce Cloud?", a: "Yes. We plan the data model, migrate catalogue, customers and orders, rebuild integrations, and redirect every URL to protect search traffic." },
    ],
  },

  cta: {
    title: ["Ready for your", "biggest launch?"],
    text: "Tell us about your volume, regions and wholesale. We'll come back with a Shopify Plus plan built around them.",
    img: IMG.racks,
    alt: "Clothing on white rails",
  },
};
