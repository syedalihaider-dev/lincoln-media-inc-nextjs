// /services/big-commerce — BigCommerce on the E-commerce platform master. Demo store: Oakmere (in store,
// online and trade). Video: paying by card at a boutique counter (Mixkit). No figures, plan prices or clients.
import { STORES, IMG } from "../stores";
import phoneHands from "@public/images/ecommerce/phone-hands.webp";
import poster from "@public/videos/ecommerce/instore-poster.jpg";

const store = STORES.oakmere;
const CHANNELS = {
  app: "Store control panel",
  nav: ["Home", "Orders", "Products", "Customers", "Channel Manager", "Storefront", "Settings"],
  active: 4,
  title: "Channel Manager",
  cols: ["Channel", "Type", "Catalogue", "Status"],
  rows: [
    ["oakmere.com", "Storefront", "Full catalogue", "Live"],
    ["Oakmere Trade", "B2B storefront", "Trade price lists", "Live"],
    ["Flagship store", "Point of sale", "In-store stock", "Synced"],
    ["Marketplace", "Marketplace", "Selected products", "Synced"],
    ["Social shop", "Social", "New season", "Review"],
  ],
  action: "Connect channel",
};

export default {
  name: "BigCommerce",
  accent: "#36e4d0",
  store,
  seo: {
    title: "BigCommerce Development Agency — B2B, Multi-Channel & Headless | The Lincoln Media",
    description: "BigCommerce development: custom Stencil themes, Catalyst and headless storefronts, B2B Edition, Multi-Storefront and channel integrations for retailers selling everywhere.",
    keywords: ["BigCommerce development", "BigCommerce agency", "BigCommerce B2B", "BigCommerce headless", "Catalyst BigCommerce", "Stencil theme development", "BigCommerce migration", "multi-channel e-commerce"],
    image: poster,
    imageAlt: "A shopper paying by card at a boutique counter",
  },

  hero: {
    kicker: "BigCommerce Development",
    title: ["BigCommerce"],
    sub: "One catalogue for every way your customers buy.",
    lead: "BigCommerce builds for retailers and wholesalers selling online, in store, on marketplaces and to trade accounts — open SaaS commerce that connects to everything.",
    img: IMG.boutique,
    alt: "A boutique interior with clothing on rails",
    screen: "collection",
    facts: ["Multi-channel", "B2B Edition", "Headless"],
  },

  intro: {
    kicker: "The service",
    statement: "Your customers don't think in channels. Your store shouldn't either.",
    text: [
      "BigCommerce is open SaaS: hosted, secure and updated for you, yet open through APIs to any front end, ERP or channel. Multi-Storefront runs several brands or regions from one control panel; B2B Edition adds company accounts, quotes and price lists.",
      "We design and build BigCommerce storefronts — on Stencil themes or headless with Catalyst and Next.js — and connect them to POS, marketplaces and the systems that run your operation.",
    ],
    img: IMG.handbagChair,
    alt: "A leather handbag on an upholstered chair",
  },

  solves: {
    kicker: "What this solves",
    title: "Selling everywhere, managed in one place.",
    pairs: [
      { problem: "Stock that's right in store but wrong online.", solution: "One catalogue and inventory feeding web, POS and marketplaces." },
      { problem: "Trade customers stuck with PDFs and email orders.", solution: "B2B Edition: company accounts, price lists, quotes and a buyer portal." },
      { problem: "A separate store for every brand or region.", solution: "Multi-Storefront: several storefronts from one control panel." },
      { problem: "A theme that limits what the brand can do.", solution: "A custom Stencil theme — or a headless storefront on Catalyst." },
    ],
  },

  showcase: {
    kicker: "The platform",
    title: "Every channel in one control panel.",
    text: "Storefronts, point of sale, marketplaces and the trade portal, all fed from the same catalogue.",
    main: { kind: "admin", device: "desktop", data: CHANNELS },
    side: { kind: "collection", device: "phone", data: { title: "Bags", chips: ["All", "In store today", "Leather"], active: 1 } },
    notes: [
      { x: 14, y: 52, text: "Channel Manager" },
      { x: 54, y: 46, text: "Trade storefront on price lists" },
      { x: 70, y: 70, text: "POS stock in sync" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "BigCommerce, built for every channel.",
    items: [
      { name: "Custom Stencil themes", text: "Brand-led storefront themes with Page Builder widgets your team can use without code.", screen: "home" },
      { name: "Headless & Catalyst", text: "Next.js storefronts on Catalyst and the GraphQL Storefront API for full creative control.", screen: "search" },
      { name: "B2B Edition", text: "Company accounts, buyer roles, price lists, quotes, invoice payments and quick order.", screen: "quickorder", data: { account: "Trade account · net terms", tiered: true } },
      { name: "Multi-Storefront", text: "Brands, regions and audiences on separate storefronts sharing one catalogue.", screen: "admin", data: CHANNELS },
      { name: "Omnichannel & POS", text: "Point of sale, marketplaces and social channels connected to the same stock.", img: phoneHands, alt: "Hands holding a phone" },
      { name: "Migration to BigCommerce", text: "Catalogue, customers, orders and SEO redirects moved from your current platform.", img: IMG.bagOrange, alt: "An orange leather bag" },
    ],
  },

  process: {
    kicker: "How we work",
    title: "One plan for every channel.",
    steps: [
      { name: "Discovery", text: "Channels, catalogue, B2B needs and integrations mapped." },
      { name: "Architecture", text: "Stencil or headless, storefront structure and the integration plan agreed." },
      { name: "Design", text: "Storefront and trade portal designed on one design system." },
      { name: "Build", text: "Theme or Catalyst storefront, B2B set-up, apps and APIs developed." },
      { name: "Connect", text: "ERP, POS, marketplaces and shipping integrated and tested together." },
      { name: "Launch & grow", text: "Migration, redirects, go-live — then testing and channel growth." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "Open SaaS, opened up.",
    rows: [
      { tech: "Stencil", does: "BigCommerce's theme framework (Handlebars, SCSS)", get: "A custom storefront on fully hosted SaaS" },
      { tech: "Catalyst", does: "BigCommerce's Next.js reference storefront", get: "Headless speed and freedom, faster" },
      { tech: "B2B Edition", does: "Company accounts, quotes, price lists, buyer portal", get: "Trade customers ordering online" },
      { tech: "Multi-Storefront", does: "Several storefronts on one store and catalogue", get: "Brands and regions without duplication" },
      { tech: "GraphQL & REST APIs", does: "Storefront and management APIs, webhooks", get: "Integrations with ERP, POS and channels" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "Browse online. Buy at the counter.",
    text: "Or the other way round. When store, site and trade portal share one catalogue, customers can move between them without noticing the join.",
    video: { src: "/videos/ecommerce/instore.mp4", mobile: "/videos/ecommerce/instore-mobile.mp4", poster: "/videos/ecommerce/instore-poster.jpg" },
    gallery: [
      { img: IMG.boutique, alt: "Boutique interior" },
      { img: IMG.bagTan, alt: "Tan leather bag" },
      { img: IMG.perfume, alt: "Perfume bottle" },
    ],
    screen: "collection",
  },

  faq: {
    kicker: "Questions",
    title: "BigCommerce, answered.",
    items: [
      { q: "Why choose BigCommerce?", a: "It's hosted SaaS with no platform maintenance, yet open through APIs, with strong built-in B2B, multi-storefront and multi-channel features. It suits retailers and wholesalers selling in several places at once." },
      { q: "Stencil theme or headless with Catalyst?", a: "Stencil is quicker to build and easy for teams to manage. Catalyst (Next.js) suits brands that need complete design freedom, very fast pages or several front ends. We recommend based on your content and team." },
      { q: "Can BigCommerce handle B2B?", a: "Yes. B2B Edition adds company accounts, buyer roles, customer-specific price lists, quotes, invoice payments, quick order and a buyer portal." },
      { q: "Can we run several brands from one BigCommerce store?", a: "Yes, with Multi-Storefront: each brand or region gets its own storefront, domain and settings while sharing one catalogue and control panel." },
      { q: "Does BigCommerce connect to our POS and marketplaces?", a: "Yes. BigCommerce connects to point-of-sale systems, major marketplaces and social channels, and we build custom integrations where native connectors fall short." },
      { q: "Can you migrate us to BigCommerce?", a: "Yes — catalogue, customers and orders where possible, plus 301 redirects for every URL and checks on search performance after launch." },
    ],
  },

  cta: {
    title: ["Let's connect", "every channel."],
    text: "Tell us where you sell today and where you want to sell next. We'll come back with a BigCommerce plan.",
    img: IMG.boutique,
    alt: "A boutique interior",
  },
};
