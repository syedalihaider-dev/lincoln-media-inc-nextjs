// /services/mirakl — Mirakl marketplace development on the E-commerce platform master. Demo store: Common Goods
// (a multi-seller marketplace). Video: aerial view of distribution warehouses (Mixkit). No figures or clients.
import { STORES, IMG } from "../stores";
import warehouseFloor from "@public/images/ecommerce/warehouse-floor.webp";
import poster from "@public/videos/ecommerce/distribution-poster.jpg";

const store = STORES.common;
const OPERATOR = {
  app: "Marketplace back office",
  nav: ["Dashboard", "Sellers", "Offers", "Catalogue", "Orders", "Payouts", "Settings"],
  active: 2,
  title: "Offers · awaiting review",
  cols: ["Seller", "Product", "Category", "Status"],
  rows: [
    ["Roast House", "Single-origin Beans", "Coffee", "Approved"],
    ["Kiln & Co", "Stoneware Set", "Ceramics", "Approved"],
    ["Atelier Noir", "Eau de Parfum", "Fragrance", "Review"],
    ["Hour Works", "Field Watch", "Watches", "Review"],
    ["Bean Collective", "Single-origin Beans", "Coffee", "Approved"],
  ],
  filters: ["All sellers", "New this week", "Needs review"],
  action: "Invite seller",
};

export default {
  name: "Mirakl",
  accent: "#36e4d0",
  store,
  seo: {
    title: "Mirakl Marketplace Development & Integration | The Lincoln Media",
    description: "Mirakl marketplace development and integration: storefront experience, seller onboarding, catalogue mapping, multi-seller orders, payouts and connections to your commerce platform and ERP.",
    keywords: ["Mirakl development", "Mirakl integration", "marketplace development", "B2B marketplace", "multi-vendor marketplace", "seller onboarding", "marketplace platform", "Mirakl agency"],
    image: poster,
    imageAlt: "Aerial view of warehouses and distribution buildings",
  },

  hero: {
    kicker: "Mirakl Development",
    title: ["Mirakl"],
    sub: "Hundreds of sellers. One store your customers trust.",
    lead: "Marketplace builds on Mirakl — extending your range with third-party sellers while the customer experience, the checkout and the brand stay yours.",
    img: IMG.boxesOpen,
    alt: "Open cardboard boxes ready to be packed",
    screen: "offers",
    facts: ["Marketplace launch", "Seller onboarding", "Integrations"],
  },

  intro: {
    kicker: "The service",
    statement: "A marketplace grows your range without growing your warehouse.",
    text: [
      "Mirakl gives operators the back office for a marketplace: seller onboarding, offers, catalogue quality, order splitting, commissions and payouts. Your storefront presents those offers beside your own products as one catalogue.",
      "We connect Mirakl to your commerce platform and ERP, design how marketplace offers appear — seller choice, delivery promises, returns — and help you launch and scale the seller base.",
    ],
    img: IMG.coffee,
    alt: "Coffee beans spilling from a hessian sack",
  },

  solves: {
    kicker: "What this solves",
    title: "Range, without the risk.",
    pairs: [
      { problem: "Customers leave to find what you don't stock.", solution: "Third-party sellers extend the range in categories you choose." },
      { problem: "Seller products arrive with messy, inconsistent data.", solution: "Catalogue mapping and quality rules before anything goes live." },
      { problem: "One basket with items from several sellers.", solution: "Order splitting, per-seller delivery and a single, simple checkout." },
      { problem: "Commissions and payouts handled in spreadsheets.", solution: "Commission rules and seller payouts managed by the platform." },
    ],
  },

  showcase: {
    kicker: "The marketplace",
    title: "Many sellers, one product page.",
    text: "Customers compare seller offers in one place; operators review and approve them in the back office.",
    main: { kind: "admin", device: "desktop", data: OPERATOR },
    side: { kind: "offers", device: "phone" },
    notes: [
      { x: 14, y: 42, text: "Operator back office" },
      { x: 58, y: 30, text: "Offers reviewed before going live" },
      { x: 74, y: 72, text: "Quality rules by category" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything a marketplace needs.",
    items: [
      { name: "Marketplace storefront", text: "Product pages with seller offers, delivery promises and ratings, designed into your existing store.", screen: "offers" },
      { name: "Mirakl integration", text: "Mirakl connected to Adobe Commerce, Salesforce, Shopify Plus or a custom front end through its APIs.", screen: "admin", data: OPERATOR },
      { name: "Seller onboarding", text: "Seller sign-up, verification, shop set-up and support content, so sellers go live quickly and correctly.", img: IMG.boxesOpen, alt: "Open boxes being prepared" },
      { name: "Catalogue & data quality", text: "Category mapping, attribute rules and product data validation for seller catalogues.", screen: "collection", data: { title: "Coffee", chips: ["All", "Single origin", "Ships tomorrow", "Sort"], active: 1 } },
      { name: "Orders & fulfilment", text: "Multi-seller baskets split into seller orders, with tracking, returns and customer service flows.", img: warehouseFloor, alt: "A warehouse floor" },
      { name: "B2B marketplaces", text: "Trade marketplaces with company accounts, negotiated prices and purchase approvals.", screen: "quickorder", data: { account: "Business account · approved suppliers" } },
    ],
  },

  process: {
    kicker: "How we work",
    title: "From first seller to full marketplace.",
    steps: [
      { name: "Strategy", text: "Categories, seller model, commissions and the customer promise defined." },
      { name: "Architecture", text: "How Mirakl, the storefront, ERP and payments connect." },
      { name: "Experience", text: "Offer display, seller pages, basket and returns designed." },
      { name: "Integration", text: "APIs connected for catalogue, offers, orders and payouts." },
      { name: "Seller launch", text: "First sellers onboarded, catalogue validated, go-live." },
      { name: "Scale", text: "More categories and sellers, with quality monitoring as the marketplace grows." },
    ],
  },

  technology: {
    kicker: "Technology",
    title: "How a Mirakl marketplace connects.",
    rows: [
      { tech: "Mirakl Marketplace Platform", does: "Sellers, offers, orders, commissions and payouts", get: "A marketplace back office ready to run" },
      { tech: "Mirakl APIs", does: "Catalogue, offer and order data exchanged with your store", get: "Seller offers inside your existing storefront" },
      { tech: "Commerce platform connectors", does: "Links to Adobe Commerce, Salesforce and custom builds", get: "One catalogue across first- and third-party stock" },
      { tech: "Payment providers", does: "Split payments and seller payouts", get: "Money flows that reconcile themselves" },
      { tech: "Your ERP & customer service", does: "Finance, reporting and support integrated", get: "Marketplace operations in your existing tools" },
    ],
  },

  experience: {
    kicker: "The experience",
    title: "Many warehouses. One delivery promise.",
    text: "Sellers ship from their own warehouses across the country, but the customer sees one clear promise on the product page and one place to track it.",
    video: { src: "/videos/ecommerce/distribution.mp4", mobile: "/videos/ecommerce/distribution-mobile.mp4", poster: "/videos/ecommerce/distribution-poster.jpg" },
    gallery: [
      { img: IMG.coffee, alt: "Coffee beans" },
      { img: IMG.vasesSet, alt: "Stoneware" },
      { img: IMG.watch, alt: "Field watch" },
    ],
    screen: "offers",
  },

  faq: {
    kicker: "Questions",
    title: "Mirakl, answered.",
    items: [
      { q: "What does Mirakl do?", a: "Mirakl is a marketplace platform for operators. It manages seller onboarding, offers, catalogue quality, order splitting, commissions and payouts, while your own storefront presents the products to customers." },
      { q: "Can Mirakl work with our existing e-commerce platform?", a: "Yes. Mirakl integrates through APIs and connectors with platforms such as Adobe Commerce and Salesforce Commerce Cloud, and with custom storefronts." },
      { q: "How do sellers get their products onto the marketplace?", a: "Sellers upload catalogues and offers, which are mapped to your categories and checked against quality rules before going live. We design and configure that process." },
      { q: "What happens when a basket has items from several sellers?", a: "The customer checks out once; the order is split into seller orders, each shipped and tracked separately, with returns and service handled per seller." },
      { q: "Can we build a B2B marketplace on Mirakl?", a: "Yes. Mirakl supports B2B marketplaces with business accounts, negotiated pricing and purchasing workflows." },
      { q: "Do you help recruit and onboard sellers?", a: "We build the onboarding journey, seller documentation and quality rules, and support the first sellers through go-live; recruiting sellers is usually led by your commercial team." },
    ],
  },

  cta: {
    title: ["Let's launch your", "marketplace."],
    text: "Tell us about your categories and the sellers you want to attract. We'll come back with a Mirakl plan.",
    img: IMG.boxesOpen,
    alt: "Open cardboard boxes",
  },
};
