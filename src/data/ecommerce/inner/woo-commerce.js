// /services/woo-commerce — WooCommerce on the E-commerce platform master. Demo store: Terra Studio (ceramics).
// Video: a fashion photo studio at work (Mixkit) — content-led commerce. No figures or clients.
import { STORES, IMG } from "../stores";
import poster from "@public/videos/ecommerce/studio-poster.jpg";

const store = STORES.terra;
const WP_ADMIN = {
  app: "WordPress",
  nav: ["Dashboard", "Posts", "Pages", "WooCommerce", "Products", "Appearance", "Plugins"],
  active: 3,
  title: "WooCommerce · Orders",
  cols: ["Order", "Customer", "Date", "Status", "Channel"],
  rows: [
    ["#2318", "L. Hart", "Today", "Processing", "Website"],
    ["#2317", "D. Kim", "Today", "Completed", "Website"],
    ["#2316", "P. Alvarez", "Yesterday", "Pending", "Workshop booking"],
    ["#2315", "N. Osei", "Yesterday", "Completed", "Website"],
  ],
};

export default {
  name: "WooCommerce",
  accent: "#36e4d0",
  store,
  seo: {
    title: "WooCommerce Development Company — Custom WordPress Stores | The Lincoln Media",
    description: "WooCommerce development on WordPress: custom block themes, plugins and extensions, payment and shipping integrations, performance tuning and migrations for content-led online stores.",
    keywords: ["WooCommerce development", "WooCommerce developers", "WordPress e-commerce", "custom WooCommerce plugin", "WooCommerce theme", "WooCommerce speed optimisation", "WooCommerce migration"],
    image: poster,
    imageAlt: "A photographer shooting a model in a lit studio",
  },

  hero: {
    kicker: "WooCommerce Development",
    title: ["WooCommerce"],
    sub: "Where the story and the shop are the same website.",
    lead: "Online stores built inside WordPress — for brands whose content, journal and community sell as hard as their products. Open source, fully owned, endlessly extendable.",
    img: IMG.clayHands,
    alt: "Hands shaping clay on a pottery wheel",
    screen: "home",
    facts: ["Custom themes", "Plugins & extensions", "Integrations"],
  },

  intro: {
    kicker: "The service",
    statement: "Your stories bring people in. Your store should be one click away from every one of them.",
    text: [
      "WooCommerce turns WordPress into a complete store: products, cart, checkout, orders and customers living beside your pages, posts and journal — all in an editor your team already knows.",
      "We build WooCommerce stores on block themes and clean custom plugins, keep the plugin list short, and tune hosting, caching and the database so the store stays fast as the catalogue grows.",
    ],
    img: IMG.vasesPair,
    alt: "Three clay vases on a white concrete table",
  },

  solves: {
    kicker: "What this solves",
    title: "WordPress stores that work as well as they read.",
    pairs: [
      { problem: "A slow store weighed down by plugins.", solution: "A lean build: custom code where it counts, fewer plugins, tuned hosting and caching." },
      { problem: "Shop and blog that feel like two different sites.", solution: "One block theme where articles, products and pages share a design system." },
      { problem: "Updates that break the store every few months.", solution: "Maintained, update-safe code with staging and testing before anything goes live." },
      { problem: "Orders re-typed into accounting and shipping tools.", solution: "Payment, shipping and accounting connected through the WooCommerce REST API." },
    ],
  },

  showcase: {
    kicker: "The store",
    title: "Content and commerce, one editor.",
    text: "Products, journal and workshops managed in the same WordPress admin your team already uses.",
    main: { kind: "admin", device: "desktop", data: WP_ADMIN },
    side: { kind: "product", device: "phone", data: { index: 0 } },
    notes: [
      { x: 12, y: 36, text: "WooCommerce inside WordPress" },
      { x: 56, y: 30, text: "Orders from the shop and bookings" },
      { x: 60, y: 76, text: "Statuses synced to shipping" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "The whole WooCommerce stack.",
    items: [
      { name: "Custom WooCommerce themes", text: "Block themes designed for your brand, with product, shop and checkout templates editable in the site editor.", screen: "home" },
      { name: "Plugin & extension development", text: "Custom plugins for product types, pricing rules, bookings and workflows — built on WooCommerce hooks, not hacks.", screen: "admin", data: WP_ADMIN },
      { name: "Payments & shipping", text: "Payment gateways, wallets, subscriptions and real-time shipping rates configured and tested end to end.", screen: "checkout" },
      { name: "Content-led commerce", text: "Journals, lookbooks and guides that link straight to products, so every story is shoppable.", img: IMG.vasesSet, alt: "A stack of glazed bowls and a vase" },
      { name: "Performance & hosting", text: "Caching, image optimisation, High-Performance Order Storage and database tuning for a store that stays quick.", img: IMG.vasesRow, alt: "Ceramic vases in neutral tones" },
      { name: "Migration & maintenance", text: "Moves to WooCommerce from other platforms, plus updates, security and support afterwards.", screen: "collection", data: { title: "Vases", chips: ["All", "Vases", "Tableware", "Sort"], active: 1 } },
    ],
  },

  process: {
    kicker: "How we work",
    title: "Crafted like the products.",
    steps: [
      { name: "Discovery", text: "Products, content, plugins, hosting and integrations reviewed against your goals." },
      { name: "Design", text: "A design system for pages, posts and shop templates — one brand throughout." },
      { name: "Theme & plugins", text: "Block theme and custom plugins built, with a short list of trusted extensions." },
      { name: "Integrations", text: "Payments, shipping, accounting and marketing connected and tested." },
      { name: "Launch", text: "Staging review, data migration, redirects and a calm go-live." },
      { name: "Care", text: "Updates, backups, security and improvements on a maintenance plan." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "Open source, used properly.",
    rows: [
      { tech: "WordPress block themes", does: "Templates and patterns edited in the site editor", get: "A store your team can change without code" },
      { tech: "WooCommerce hooks & filters", does: "Extending checkout, products and emails safely", get: "Custom features that survive updates" },
      { tech: "Cart & Checkout blocks", does: "The modern, block-based checkout experience", get: "A faster, more flexible checkout" },
      { tech: "REST & Store APIs", does: "Connections to ERP, shipping, accounting and apps", get: "Orders that flow without retyping" },
      { tech: "HPOS", does: "Orders stored in dedicated database tables", get: "A store that scales with order volume" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "Every story, one click from the shop.",
    text: "Studio shoots, journal entries and workshop pages flow straight into products — so content does the selling, not just the talking.",
    video: { src: "/videos/ecommerce/studio.mp4", mobile: "/videos/ecommerce/studio-mobile.mp4", poster: "/videos/ecommerce/studio-poster.jpg" },
    gallery: [
      { img: IMG.vasesPair, alt: "Clay vases" },
      { img: IMG.clayHands, alt: "Hands on a pottery wheel" },
      { img: IMG.vasesSet, alt: "Glazed bowls and vase" },
    ],
    screen: "product",
  },

  faq: {
    kicker: "Questions",
    title: "WooCommerce, answered.",
    items: [
      { q: "Is WooCommerce right for our business?", a: "WooCommerce is a great fit when content matters — a journal, guides or a community — and you want full ownership of an open-source store inside WordPress. For very large catalogues or complex B2B we may suggest Magento or BigCommerce instead." },
      { q: "Can you add a store to our existing WordPress site?", a: "Usually, yes. We review your theme, plugins and hosting first; sometimes it's cleaner to rebuild the theme so the shop and the content share one design system." },
      { q: "Why is our WooCommerce store slow, and can you fix it?", a: "Common causes are too many plugins, heavy themes, unoptimised images and under-powered hosting. We profile the store, remove what isn't needed, tune caching and the database and move to better hosting if it's required." },
      { q: "Do you build custom WooCommerce plugins?", a: "Yes — custom product types, pricing and discount rules, booking flows, integrations and admin tools, built on WooCommerce's hooks so they keep working after updates." },
      { q: "Which payment gateways can WooCommerce use?", a: "Most major providers, including card payments, digital wallets, buy-now-pay-later and local methods. We set up and test the ones your customers use." },
      { q: "Do you offer WooCommerce maintenance?", a: "Yes: core, theme and plugin updates on staging first, backups, security monitoring, uptime checks and ongoing improvements." },
    ],
  },

  cta: {
    title: ["Let's build your", "WooCommerce store."],
    text: "Tell us about your products and your content. We'll come back with a plan, a team and a timeline.",
    img: IMG.clayHands,
    alt: "Hands shaping clay on a wheel",
  },
};
