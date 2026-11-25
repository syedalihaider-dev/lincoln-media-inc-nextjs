// /services/shopify — reference dataset for the E-commerce platform master (src/components/Ecommerce/Inner).
// Demo store: Lumen Skin (DTC skincare). Video: tape sealing a parcel (Mixkit). No figures or clients.
import { STORES, IMG } from "../stores";
import boxesStack from "@public/images/ecommerce/boxes-stack.webp";
import poster from "@public/videos/ecommerce/packing-poster.jpg";

const store = STORES.lumen;

export default {
  name: "Shopify",
  accent: "#36e4d0",
  store,
  seo: {
    title: "Shopify E-commerce Development Agency in New York | The Lincoln Media",
    description: "Custom Shopify stores: Online Store 2.0 themes, apps, checkout extensions, Shopify Markets and migrations — fast, on-brand storefronts built by Shopify developers in New York.",
    keywords: ["Shopify development", "Shopify developers", "custom Shopify theme", "Shopify store design", "Shopify migration", "Shopify apps", "Online Store 2.0", "New York Shopify agency"],
    image: poster,
    imageAlt: "Hands sealing a shipping box with tape",
  },

  hero: {
    kicker: "Shopify E-commerce Development",
    title: ["Shopify"],
    sub: "Stores that look like your brand and sell like a machine.",
    lead: "Custom Online Store 2.0 themes, apps and checkout extensions — built on the platform that lets a brand launch fast and keep growing without replatforming.",
    img: IMG.serumPedestal,
    alt: "An amber serum bottle on a wooden pedestal in soft light",
    screen: "home",
    facts: ["Custom themes", "Apps & integrations", "Migrations"],
  },

  intro: {
    kicker: "The service",
    statement: "A Shopify store should feel like the brand — not like the theme everyone else bought.",
    text: [
      "We design and build Shopify stores from a custom design system: sections and blocks your team can rearrange in the theme editor, product templates for every kind of product, and content modelled in metafields and metaobjects instead of hard-coded pages.",
      "Underneath, we keep the build lean — fast Liquid, minimal apps, and integrations that run through Shopify's APIs so the store stays quick and upgradeable.",
    ],
    img: IMG.creamJar,
    alt: "A jar of white cream resting on a stone",
  },

  solves: {
    kicker: "What this solves",
    title: "The usual Shopify problems — fixed at the source.",
    pairs: [
      { problem: "A theme that looks like a thousand other stores.", solution: "A custom theme on your own design system, built for your products and your story." },
      { problem: "Twenty apps slowing every page down.", solution: "Features built into the theme or one well-chosen app — fewer scripts, faster pages." },
      { problem: "Marketing waits on developers for every landing page.", solution: "Sections and blocks your team composes themselves in the theme editor." },
      { problem: "Products, reviews and stock live in different systems.", solution: "Metafields, metaobjects and API integrations that keep data in one place." },
    ],
  },

  showcase: {
    kicker: "The store",
    title: "Built in sections. Edited by your team.",
    text: "Every page is assembled from sections — the same building blocks the team edits in the theme editor.",
    main: { kind: "product", device: "desktop", data: { index: 0 } },
    side: { kind: "subscribe", device: "phone", data: { index: 1 } },
    notes: [
      { x: 30, y: 22, text: "Product media section" },
      { x: 74, y: 40, text: "Variant picker from metafields" },
      { x: 72, y: 66, text: "Dynamic checkout buttons" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything a Shopify brand needs.",
    items: [
      { name: "Custom theme development", text: "Online Store 2.0 themes with sections everywhere, built from your design system in clean, fast Liquid.", img: IMG.serumAmber, alt: "An amber dropper bottle with a blank label" },
      { name: "Store design & UX", text: "Navigation, collections, product pages and cart designed around how your customers shop.", screen: "collection", data: { title: "Serums", chips: ["All", "Serums", "Sets", "Sort"], active: 1 } },
      { name: "Apps & integrations", text: "Custom apps and API integrations with your ERP, reviews, subscriptions, loyalty and marketing tools.", screen: "admin" },
      { name: "Checkout & discounts", text: "Checkout extensions and Shopify Functions for discounts, delivery and payment rules, where your plan supports them.", screen: "checkout" },
      { name: "Shopify Markets", text: "Selling internationally with local currencies, languages, domains and pricing from one store.", img: boxesStack, alt: "A stack of plain cardboard boxes" },
      { name: "Migration to Shopify", text: "Products, customers, order history, content and SEO redirects moved from your current platform.", screen: "home" },
    ],
  },

  process: {
    kicker: "How we work",
    title: "From brief to busy store.",
    steps: [
      { name: "Discovery", text: "Catalogue, customers, apps and integrations audited; the plan and the Shopify plan agreed." },
      { name: "Design system", text: "Type, colour, components and the key templates designed and prototyped." },
      { name: "Theme build", text: "Sections, blocks and templates developed in Liquid, with metafields for structured content." },
      { name: "Apps & data", text: "Integrations connected, products and customers migrated, redirects mapped." },
      { name: "QA & launch", text: "Devices, payments, taxes and emails tested; domains, tracking and redirects switched on." },
      { name: "Grow", text: "Analytics, A/B tests and new sections released on a steady rhythm." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "What we build with — and why it matters.",
    rows: [
      { tech: "Liquid & Online Store 2.0", does: "Templates, sections and blocks rendered by Shopify", get: "A fast store your team can edit without code" },
      { tech: "Metafields & metaobjects", does: "Structured content attached to products and pages", get: "Rich product pages without hard-coding" },
      { tech: "Shopify Functions", does: "Custom discount, delivery and payment logic", get: "Promotions and rules that fit your business" },
      { tech: "Admin & Storefront APIs", does: "GraphQL access to products, orders and customers", get: "Clean integrations with the rest of your stack" },
      { tech: "Hydrogen", does: "Shopify's React framework for custom storefronts", get: "A headless front end when the brand needs one" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "From unboxing back to the product page.",
    text: "Commerce doesn't end at checkout. Order emails, tracking, refills and the next visit are designed as part of the same store.",
    video: { src: "/videos/ecommerce/packing.mp4", mobile: "/videos/ecommerce/packing-mobile.mp4", poster: "/videos/ecommerce/packing-poster.jpg" },
    gallery: [
      { img: IMG.serumAmber, alt: "Amber dropper bottle" },
      { img: IMG.creamJar, alt: "Jar of cream on stone" },
      { img: boxesStack, alt: "Stack of shipping boxes" },
    ],
    screen: "confirm",
  },

  faq: {
    kicker: "Questions",
    title: "Shopify, answered.",
    items: [
      { q: "Do you build custom Shopify themes or customise existing ones?", a: "Both. For most brands we build a custom Online Store 2.0 theme from our own design system; when speed matters more, we start from a well-built theme and customise it properly, without hacks that break on updates." },
      { q: "Can you migrate our store to Shopify from another platform?", a: "Yes. We migrate products, variants, customers, order history and content where the source platform allows, and map every URL to a 301 redirect to protect search rankings." },
      { q: "Will our team be able to edit the store themselves?", a: "Yes — that's the point of building in sections and blocks. Your team can create pages, rearrange content and update products in the theme editor without a developer." },
      { q: "Do we need Shopify Plus?", a: "Not usually to start. Plus adds checkout extensibility, B2B features, automation and higher limits that high-volume brands need. We'll tell you honestly when the move makes sense." },
      { q: "Can Shopify sell in several countries?", a: "Yes. With Shopify Markets you can sell in local currencies and languages, set prices by market and use local domains — all from one store." },
      { q: "How do you keep a Shopify store fast?", a: "Lean Liquid, optimised images, few and carefully chosen apps, and performance checks on every release." },
    ],
  },

  cta: {
    title: ["Let's build your", "Shopify store."],
    text: "Tell us about your products and where you want to sell. We'll come back with a plan, a team and a timeline.",
    img: IMG.serumPedestal,
    alt: "An amber serum bottle on a pedestal",
  },
};
