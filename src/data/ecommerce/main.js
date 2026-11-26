// /services/ecommerce-web-development — the E-commerce category page (src/components/Ecommerce/Main).
// Content: the live page's own lines ("We create awesome online stores for simple, better and convenient
// shopping…") and this site's blurb, restructured. No figures, prices, timelines or client names.
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import { STORES, IMG } from "./stores";
import warehouseAisle from "@public/images/ecommerce/warehouse-aisle.webp";
import warehouseFloor from "@public/images/ecommerce/warehouse-floor.webp";
import phoneHands from "@public/images/ecommerce/phone-hands.webp";
import heroPoster from "@public/videos/ecommerce/hangers-poster.jpg";

export const ECOM_PATH = "/services/ecommerce-web-development";
const commerce = SERVICE_CATEGORIES.find((c) => c.key === "commerce");

/* The six platform pages, at the live site's slugs */
const BLURBS = {
  "woo-commerce": "Commerce inside WordPress — content and catalogue in one place.",
  mirakl: "Marketplaces where many sellers share one catalogue and one basket.",
  magento: "Complex catalogues, multiple stores and B2B on Adobe Commerce.",
  "big-commerce": "Open SaaS commerce for retail, B2B and every channel.",
  shopify: "Fast, beautiful Shopify stores built to grow with the brand.",
  "shopify-plus": "High-volume Shopify: drops, regions, automation and checkout.",
};
export const ECOM_CHILDREN = commerce.items.map((i) => ({
  name: i.name.replace(" E-commerce Development", "").replace(" Development", ""),
  full: i.name,
  path: i.href,
  slug: i.href.split("/").pop(),
  text: BLURBS[i.href.split("/").pop()],
}));
const link = (slug) => ECOM_CHILDREN.find((c) => c.slug === slug);

export const ECOM_PAGE = {
  seo: {
    title: "E-commerce Web Development Company in New York | The Lincoln Media",
    description:
      "Custom e-commerce website development on Shopify, Shopify Plus, Magento, WooCommerce, BigCommerce and Mirakl — fast storefronts, frictionless checkout and commerce systems that scale.",
    keywords: ["e-commerce web development", "ecommerce website development company", "Shopify development", "Magento development", "WooCommerce development", "headless commerce", "B2B e-commerce", "marketplace development", "New York"],
    image: heroPoster,
    imageAlt: "A hand moving through clothes on a rail in a boutique",
  },

  hero: {
    kicker: "E-commerce Web Development",
    title: ["Stores", "engineered", "to sell."],
    lead: "We create online stores for simple, better and convenient shopping — conversion-obsessed builds on Shopify, Magento, WooCommerce and more, engineered to sell around the clock.",
    primary: { label: "Start your store", href: "/contact-us#contact-form" },
    secondary: { label: "See what we build", href: "#ecom-build" },
    video: { src: "/videos/ecommerce/hangers.mp4", mobile: "/videos/ecommerce/hangers-mobile.mp4", poster: "/videos/ecommerce/hangers-poster.jpg" },
    store: STORES.maison,
    product: IMG.watch,
  },

  experience: {
    kicker: "The commerce experience",
    statement:
      "A great store isn't a catalogue with a checkout. It's a brand you can walk through, a product you can almost touch, and a purchase that takes seconds — on every screen.",
    columns: [
      { title: "Brand first", text: "Art direction, photography and type that make the store feel like the brand — not like the theme it started from." },
      { title: "Built to convert", text: "Every page has one job. Navigation, search, product pages and checkout are designed around the moment someone decides to buy." },
      { title: "Ready to grow", text: "Catalogues, regions, channels and integrations planned from day one, so success never needs a rebuild." },
    ],
    images: [
      { img: IMG.storeModern, alt: "A minimal fashion store with garments on rails and a dark counter" },
      { img: IMG.handbagChair, alt: "A leather handbag set on an upholstered chair in a boutique" },
    ],
  },

  showcase: {
    kicker: "Every kind of commerce",
    title: "Six ways to sell. One standard of craft.",
    text: "Each model of selling asks for a different store. We design for the way your customers actually buy.",
    items: [
      { name: "Fashion", line: "Lookbooks, size guidance and drops that sell through.", img: IMG.shirts, alt: "Shirts in muted colours on a rail", screen: "lookbook", store: STORES.arden, device: "phone" },
      { name: "Luxury", line: "Quiet pages, large imagery, service that feels like a boutique.", img: IMG.watch, alt: "A silver chronograph with a brown leather strap on black", screen: "product", store: STORES.maison, device: "phone" },
      { name: "Retail", line: "Real filtering, stock by store and click-and-collect.", img: IMG.boutique, alt: "A boutique interior with clothing on hanging rails", screen: "collection", store: STORES.oakmere, device: "phone", data: { title: "Bags", chips: ["All", "In store today", "Leather", "Sort"], active: 1 } },
      { name: "B2B", line: "Account pricing, quick order by SKU and invoice terms.", img: IMG.warehouseRacking, alt: "Boxes stored on warehouse racking", screen: "quickorder", store: STORES.halden, device: "phone" },
      { name: "Marketplace", line: "Many sellers, one catalogue, one basket.", img: IMG.boxesOpen, alt: "Open cardboard boxes ready to be packed", screen: "offers", store: STORES.common, device: "phone" },
      { name: "Subscription", line: "Refills on a schedule the customer controls.", img: IMG.serumPedestal, alt: "An amber dropper bottle on a wooden pedestal in soft light", screen: "subscribe", store: STORES.lumen, device: "phone" },
    ],
  },

  film: {
    video: { src: "/videos/ecommerce/conveyor.mp4", mobile: "/videos/ecommerce/conveyor-mobile.mp4", poster: "/videos/ecommerce/conveyor-poster.jpg" },
    lines: ["Behind every", "buy button", "is an operation."],
    text: "Inventory, payments, tax, shipping and returns. We build the storefront — and connect everything it depends on, so every order placed is an order delivered.",
  },

  build: {
    id: "ecom-build",
    kicker: "What we build",
    title: "From the first product page to the whole platform.",
    items: [
      { name: "Custom e-commerce websites", text: "Bespoke storefronts designed around your brand and catalogue — no template look, no compromises on speed.", screen: "home", store: STORES.maison, tags: ["Art direction", "Design system", "Content"] },
      { name: "Shopify & Shopify Plus", text: "Custom Online Store 2.0 themes, apps and checkout extensions for brands from launch to global scale.", screen: "product", store: STORES.lumen, tags: ["Themes", "Apps", "Checkout"], links: [link("shopify"), link("shopify-plus")] },
      { name: "WooCommerce", text: "Commerce inside WordPress, for brands whose content sells as hard as their products.", screen: "home", store: STORES.terra, tags: ["WordPress", "Plugins", "Content"], links: [link("woo-commerce")] },
      { name: "Magento / Adobe Commerce", text: "Large catalogues, multi-store set-ups and complex pricing on an open, extensible platform.", screen: "admin", store: STORES.halden, data: { app: "Commerce admin", nav: ["Dashboard", "Sales", "Catalog", "Customers", "Stores"], active: 2, title: "Catalog · Products", cols: ["SKU", "Name", "Website", "Status"], rows: [["HL-SAT-14-ST", "Satchel 14\"", "Retail, Trade", "Enabled"], ["HL-SHB-TN", "Shoulder Bag", "Retail", "Enabled"], ["HL-OTT-BK", "Office Tote", "Trade", "Enabled"], ["HL-WDR-ST", "Dress Watch", "Retail", "Draft"]], scope: "Scope: All store views" }, tags: ["Multi-store", "Catalogue", "Extensions"], links: [link("magento")] },
      { name: "BigCommerce", text: "Open SaaS commerce for retailers selling online, in store and to trade buyers from one catalogue.", screen: "collection", store: STORES.oakmere, data: { title: "Bags", chips: ["All", "In store today", "Leather", "Sort"], active: 1 }, tags: ["Multi-channel", "B2B", "Headless"], links: [link("big-commerce")] },
      { name: "B2B e-commerce", text: "Company accounts, buyer roles, price lists, quick order and quotes — the way trade customers already work.", screen: "quickorder", store: STORES.halden, tags: ["Price lists", "Quotes", "ERP"] },
      { name: "Headless commerce", text: "A custom front end on Next.js over your commerce engine, for full creative freedom and very fast pages.", screen: "search", store: STORES.maison, tags: ["Next.js", "APIs", "Edge"] },
      { name: "Marketplace development", text: "Seller onboarding, offers, commissions and split orders, on Mirakl or a custom build.", screen: "offers", store: STORES.common, tags: ["Sellers", "Offers", "Payouts"], links: [link("mirakl")] },
    ],
  },

  architecture: {
    kicker: "Commerce architecture",
    title: "What a store that scales is made of.",
    text: "Four layers, each replaceable, all connected. Built this way, a new channel, market or system is an addition — never a rebuild.",
    layers: [
      { key: "experience", name: "Experience", text: "The storefront on web, mobile and in-store screens. Product pages, search, content and accounts.", chips: ["Storefront", "Mobile", "Content", "Accounts"], store: STORES.maison },
      { key: "commerce", name: "Commerce engine", text: "Shopify, Magento, BigCommerce, WooCommerce or Mirakl — the catalogue, pricing, cart, checkout and orders.", chips: ["Catalogue", "Pricing", "Promotions", "Cart", "Checkout", "Orders"] },
      { key: "services", name: "Services", text: "Specialists the store calls on: payments, tax, search, reviews, email and shipping.", chips: ["Payments", "Tax", "Search", "Reviews", "Email & SMS", "Shipping"] },
      { key: "operations", name: "Operations", text: "Your systems of record: ERP, PIM, warehouse and CRM, kept in sync with the store.", chips: ["ERP", "PIM", "Warehouse", "CRM", "Analytics"] },
    ],
  },

  conversion: {
    kicker: "Conversion & performance",
    title: "Speed is a feature. Friction is a cost.",
    marquee: ["Fast", "Found", "Effortless", "Trusted"],
    items: [
      { key: "speed", name: "Fast experiences", text: "Performance budgets, optimised images and lean code, so pages appear before attention drifts." },
      { key: "mobile", name: "Mobile commerce", text: "Designed for one thumb first: reachable buttons, sticky add to bag, wallets at checkout." },
      { key: "discovery", name: "Product discovery", text: "Collections and filters that mirror how customers think, not how the warehouse is organised." },
      { key: "search", name: "Search", text: "Instant results, typo tolerance and suggestions that lead straight to products." },
      { key: "ux", name: "UX", text: "Clear hierarchy, honest delivery dates and returns information where decisions happen." },
      { key: "checkout", name: "Checkout", text: "Express payment, guest checkout, address lookup and no surprises at the last step." },
      { key: "cro", name: "Conversion optimisation", text: "Analytics and A/B testing after launch, so every change is measured against real behaviour." },
      { key: "scale", name: "Scalability", text: "Built for launch-day traffic: caching, queues and platforms that scale without drama." },
    ],
    store: STORES.maison,
  },

  journey: {
    kicker: "The path to purchase",
    title: "Six moments. Each one designed.",
    store: STORES.maison,
    steps: [
      { name: "Product", text: "It starts with the product — photography, data and the story that makes it worth wanting.", screen: "home" },
      { name: "Discovery", text: "Search that understands, filters that narrow, collections that inspire.", screen: "search" },
      { name: "Product page", text: "Big imagery, clear options, honest delivery and returns, one obvious action.", screen: "product" },
      { name: "Cart", text: "A drawer, not a detour: progress to free delivery and a relevant suggestion.", screen: "cart" },
      { name: "Checkout", text: "Express wallets first, then a short form that fills itself in.", screen: "checkout" },
      { name: "Purchase", text: "Confirmation that reassures — and tracking that brings the customer back.", screen: "confirm" },
    ],
  },

  process: {
    kicker: "How we work",
    title: "Seven moves. No wasted ones.",
    steps: [
      { name: "Discovery", text: "Workshops, audits and research. We study your catalogue, customers, data and operations before we touch a pixel.", img: IMG.boutique, alt: "A boutique interior" },
      { name: "Strategy", text: "Platform choice, architecture, journeys and a measurable plan everyone signs off on." },
      { name: "UX / UI", text: "Wireframes, a design system and prototypes of the moments that matter — tested with real people.", screen: "product", store: STORES.maison },
      { name: "Development", text: "Clean, fast, accessible code. Themes, apps, integrations and data migration, built in reviewed increments.", screen: "admin", store: STORES.maison },
      { name: "Testing", text: "Every device and browser that matters, payments, tax, emails and edge cases — before a customer finds them.", img: phoneHands, alt: "Hands holding a phone" },
      { name: "Launch", text: "Zero-drama launches: redirects, tracking and monitoring in place, with the team on hand." },
      { name: "Optimisation", text: "Then SEO, ads and CRO to compound the results, release after release.", img: IMG.perfumeShelf, alt: "Fragrance bottles on a lit shelf" },
    ],
  },

  quality: {
    kicker: "Quality & scalability",
    title: "Quiet on the outside. Rigorous underneath.",
    img: warehouseFloor,
    imgMobile: warehouseAisle,
    alt: "A warehouse floor lined with shelves of boxes",
    items: [
      { name: "Performance", text: "Core Web Vitals treated as a requirement: image pipelines, caching and code budgets checked on every release." },
      { name: "Security", text: "Hosted, tokenised payment fields, least-privilege admin access, dependency updates and platform patches on a schedule." },
      { name: "Scalability", text: "Platforms and hosting chosen for your peaks, with load testing before campaigns and launches." },
      { name: "Responsive experience", text: "Layouts composed for phone, tablet and desktop — not shrunk from one to the other." },
      { name: "Integrations", text: "ERP, PIM, warehouse, CRM, marketing and marketplace connections with monitoring and retries." },
      { name: "Analytics", text: "E-commerce events tracked end to end, from first view to purchase, so decisions rest on real data." },
    ],
  },

  faq: {
    kicker: "Questions",
    title: "Before you build a store.",
    items: [
      { q: "Which e-commerce platform is right for my business?", a: "It depends on your catalogue, how you sell and what you need to connect. Shopify suits most direct-to-consumer brands; Shopify Plus adds scale and automation; Magento (Adobe Commerce) handles complex catalogues and multi-store set-ups; BigCommerce is strong for multi-channel and B2B; WooCommerce keeps commerce inside WordPress; Mirakl powers marketplaces. We recommend one after discovery, not before." },
      { q: "Can you migrate our existing store without losing SEO?", a: "Yes. We map every product, category and content URL, migrate products, customers and order history where the platforms allow, and put 301 redirects and tracking in place before launch, then monitor search performance afterwards." },
      { q: "Do you design custom stores or use themes?", a: "Both, depending on the brief. Most of our stores are designed from scratch on a custom design system; where speed to market matters more, we build on a well-chosen theme and customise it properly." },
      { q: "What is headless commerce and do we need it?", a: "Headless means a custom front end (for example Next.js) talks to the commerce platform through APIs. It gives total design freedom and very fast pages, but adds complexity. We recommend it when content, performance or multiple front ends justify it." },
      { q: "Can you connect the store to our ERP, warehouse or CRM?", a: "Yes. We integrate stores with ERP, PIM, warehouse, shipping, CRM, marketing and marketplace systems, through native connectors where they're reliable and custom integrations where they're not." },
      { q: "Do you support B2B features like price lists and quick order?", a: "Yes — company accounts, buyer roles, customer-specific pricing, quick order by SKU, quotes and invoice payment terms, on Magento, BigCommerce, Shopify Plus or a custom build." },
      { q: "What happens after launch?", a: "We stay on for support, maintenance and growth: platform updates, new features, SEO, paid media and conversion optimisation based on how customers actually use the store." },
    ],
  },

  cta: {
    kicker: "Start a project",
    title: ["Let's open", "your store."],
    text: "Tell us what you sell and who buys it. We'll come back with a plan, a team and a timeline.",
    video: { src: "/videos/ecommerce/bracelet.mp4", mobile: "/videos/ecommerce/bracelet-mobile.mp4", poster: "/videos/ecommerce/bracelet-poster.jpg" },
  },
};
