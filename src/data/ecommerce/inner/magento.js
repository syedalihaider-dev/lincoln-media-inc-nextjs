// /services/magento — Magento / Adobe Commerce on the E-commerce platform master. Demo store: Halden Leather
// (retail + trade stores). Video: a spiral parcel conveyor (Mixkit). No figures, licence prices or clients.
import { STORES, IMG } from "../stores";
import warehouseFloor from "@public/images/ecommerce/warehouse-floor.webp";
import poster from "@public/videos/ecommerce/sorting-poster.jpg";

const store = STORES.halden;
const CATALOG = {
  app: "Commerce admin",
  nav: ["Dashboard", "Sales", "Catalog", "Customers", "Marketing", "Stores", "System"],
  active: 2,
  title: "Catalog · Products",
  cols: ["SKU", "Name", "Websites", "Salable qty", "Status"],
  rows: [
    ["HL-SAT-14-ST", "Satchel 14\"", "Retail, Trade", "Main · EU", "Enabled"],
    ["HL-SHB-TN", "Shoulder Bag", "Retail", "Main", "Enabled"],
    ["HL-OTT-BK", "Office Tote", "Trade", "Main · EU", "Enabled"],
    ["HL-WDR-ST", "Dress Watch", "Retail", "Low", "Review"],
  ],
  filters: ["All store views", "Retail US", "Trade", "Retail EU"],
  scope: "Scope: Default Config",
};

export default {
  name: "Magento",
  accent: "#36e4d0",
  store,
  seo: {
    title: "Magento & Adobe Commerce Development Company | The Lincoln Media",
    description: "Magento Open Source and Adobe Commerce development: multi-store set-ups, B2B, custom modules, Hyvä and PWA front ends, integrations, upgrades and performance for complex catalogues.",
    keywords: ["Magento development", "Adobe Commerce development", "Magento 2 developers", "Magento B2B", "Hyvä theme", "Magento upgrade", "Magento multi-store", "Magento extension development"],
    image: poster,
    imageAlt: "Parcels moving along a spiral conveyor in a distribution centre",
  },

  hero: {
    kicker: "Magento E-commerce Development",
    title: ["Magento"],
    sub: "For catalogues, stores and rules that don't fit in a box.",
    lead: "Magento Open Source and Adobe Commerce builds for businesses with large catalogues, several stores, trade customers and the integrations that hold it all together.",
    img: IMG.warehouseRacking,
    alt: "Boxes stored on warehouse racking",
    screen: "admin",
    facts: ["Multi-store", "B2B", "Custom modules"],
  },

  intro: {
    kicker: "The service",
    statement: "When the business is complex, the platform has to bend without breaking.",
    text: [
      "Magento's strength is control: websites, stores and store views from one admin; multi-source inventory; customer-specific pricing; and, on Adobe Commerce, a full B2B suite with company accounts, shared catalogues, quotes and requisition lists.",
      "We build Magento properly — custom modules instead of core edits, modern front ends such as Hyvä, full-page caching and search tuned for big catalogues, and upgrade paths that keep the platform secure.",
    ],
    img: IMG.satchel,
    alt: "A grey leather satchel with gold buckles",
  },

  solves: {
    kicker: "What this solves",
    title: "Magento's power, without Magento's pain.",
    pairs: [
      { problem: "A slow, heavy storefront that customers abandon.", solution: "A modern front end (Hyvä or headless), Varnish caching and tuned search." },
      { problem: "Upgrades postponed for years because everything might break.", solution: "Clean custom modules, automated tests and a planned, routine upgrade path." },
      { problem: "Retail, trade and regional stores run as separate systems.", solution: "One installation: websites, stores and store views with shared catalogue and stock." },
      { problem: "Trade buyers ordering by phone and email.", solution: "Company accounts, shared catalogues, quick order and quotes online." },
    ],
  },

  showcase: {
    kicker: "The platform",
    title: "One admin. Every store.",
    text: "Products, prices and stock managed once, then published to the right website, store and view.",
    main: { kind: "admin", device: "desktop", data: CATALOG },
    side: { kind: "quickorder", device: "phone", data: { account: "Trade account · shared catalogue" } },
    notes: [
      { x: 14, y: 82, text: "Scope switcher for every store view" },
      { x: 62, y: 28, text: "Store-view filters" },
      { x: 70, y: 62, text: "Multi-source inventory" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything Magento can do — done right.",
    items: [
      { name: "Magento store development", text: "New builds on Magento Open Source or Adobe Commerce, from data model to storefront.", screen: "home" },
      { name: "Multi-store & international", text: "Websites, stores and store views for brands, regions, currencies and languages in one installation.", screen: "admin", data: CATALOG },
      { name: "B2B commerce", text: "Company accounts, buyer roles, shared catalogues, negotiable quotes, requisition lists and quick order.", screen: "quickorder", data: { account: "Trade account · shared catalogue" } },
      { name: "Custom modules & extensions", text: "Features built as clean Magento modules, following platform conventions so upgrades stay possible.", img: warehouseFloor, alt: "A warehouse floor with shelving" },
      { name: "Hyvä & headless front ends", text: "Fast, modern storefronts on Hyvä, or headless on GraphQL with a custom front end.", screen: "product" },
      { name: "Upgrades, audits & support", text: "Version upgrades, security patches, code audits and performance work on existing stores.", img: IMG.watchDark, alt: "A steel dress watch on dark leather" },
    ],
  },

  process: {
    kicker: "How we work",
    title: "Engineering for complex commerce.",
    steps: [
      { name: "Audit & discovery", text: "Catalogue, stores, customisations, integrations and hosting reviewed in depth." },
      { name: "Solution design", text: "Store hierarchy, data model, B2B rules and the integration map agreed." },
      { name: "Front end", text: "Design system and storefront built on Hyvä or a headless front end." },
      { name: "Modules & integrations", text: "Custom modules and ERP, PIM and warehouse connections built and tested." },
      { name: "Migration & launch", text: "Data migrated, redirects mapped, load-tested and launched in stages." },
      { name: "Upgrade & evolve", text: "Patches, upgrades and new features on a predictable release schedule." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "The Magento stack, end to end.",
    rows: [
      { tech: "Adobe Commerce / Magento Open Source", does: "The commerce engine: catalogue, pricing, checkout, orders", get: "Full control over complex selling" },
      { tech: "Multi-Source Inventory", does: "Stock across warehouses, stores and sources", get: "Accurate availability everywhere you sell" },
      { tech: "Hyvä themes", does: "A lightweight modern front end for Magento", get: "Much faster pages without going headless" },
      { tech: "GraphQL & REST APIs", does: "Headless front ends and system integrations", get: "Clean connections to ERP, PIM and apps" },
      { tech: "OpenSearch & Varnish", does: "Catalogue search and full-page caching", get: "Fast search and browsing on big catalogues" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "The right product, from the right shelf.",
    text: "Behind every order on a Magento store is a decision about which source ships it. We connect the storefront to the warehouse so that decision is always right.",
    video: { src: "/videos/ecommerce/sorting.mp4", mobile: "/videos/ecommerce/sorting-mobile.mp4", poster: "/videos/ecommerce/sorting-poster.jpg" },
    gallery: [
      { img: IMG.satchel, alt: "Grey leather satchel" },
      { img: IMG.warehouseRacking, alt: "Warehouse racking" },
      { img: IMG.bagTan, alt: "Tan leather bag" },
    ],
    screen: "quickorder",
  },

  faq: {
    kicker: "Questions",
    title: "Magento, answered.",
    items: [
      { q: "Magento Open Source or Adobe Commerce — which do we need?", a: "Open Source covers the core commerce features. Adobe Commerce adds B2B, Page Builder enhancements, staging, advanced segmentation and cloud hosting with support. We recommend one based on your features, scale and budget." },
      { q: "Can you upgrade our old Magento store?", a: "Yes. We audit the code and extensions, plan the upgrade path, replace unsupported extensions, fix customisations that edit the core, and test thoroughly before going live." },
      { q: "Our Magento store is slow. Can it be fixed?", a: "Usually. Typical fixes are full-page caching with Varnish, tuned search, removing heavy extensions, optimising the database and moving the front end to Hyvä." },
      { q: "Can we run several brands or countries from one Magento?", a: "Yes. Magento's websites, stores and store views let you run brands, regions, currencies and languages from one installation with shared or separate catalogues." },
      { q: "Do you build B2B features on Magento?", a: "Yes — company accounts, buyer roles and permissions, shared catalogues, customer-specific pricing, quotes, requisition lists and quick order by SKU." },
      { q: "Should we move away from Magento?", a: "Sometimes it's right, sometimes not. We compare the cost of running and upgrading Magento with platforms like Shopify Plus or BigCommerce, and give you an honest recommendation." },
    ],
  },

  cta: {
    title: ["Let's build your", "Magento platform."],
    text: "Tell us about your catalogue, stores and integrations. We'll come back with a plan, a team and a timeline.",
    img: IMG.warehouseRacking,
    alt: "Warehouse racking with boxes",
  },
};
