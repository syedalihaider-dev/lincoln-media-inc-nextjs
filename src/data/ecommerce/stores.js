// The fictional demo stores the e-commerce pages' interfaces are filled with. Every interface is real
// HTML (src/components/Ecommerce/kit) labelled "Demo store" — no client, figure or result is implied.
// Photography: Unsplash (Unsplash License), chosen without visible brand marks.
import watch from "@public/images/ecommerce/watch.webp";
import watchDark from "@public/images/ecommerce/watch-dark.webp";
import bagOrange from "@public/images/ecommerce/bag-orange.webp";
import bagTan from "@public/images/ecommerce/bag-tan.webp";
import bagBlack from "@public/images/ecommerce/bag-black.webp";
import satchel from "@public/images/ecommerce/satchel-grey.webp";
import perfume from "@public/images/ecommerce/perfume.webp";
import serumAmber from "@public/images/ecommerce/serum-amber.webp";
import serumPedestal from "@public/images/ecommerce/serum-pedestal.webp";
import creamJar from "@public/images/ecommerce/cream-jar.webp";
import vasesPair from "@public/images/ecommerce/vases-pair.webp";
import vasesSet from "@public/images/ecommerce/vases-set.webp";
import vasesRow from "@public/images/ecommerce/vases-row.webp";
import coffee from "@public/images/ecommerce/coffee-sack.webp";
import shirts from "@public/images/ecommerce/shirts-rack.webp";
import racks from "@public/images/ecommerce/racks-white.webp";
import boutique from "@public/images/ecommerce/boutique.webp";
import storeModern from "@public/images/ecommerce/store-modern.webp";
import handbagChair from "@public/images/ecommerce/handbag-chair.webp";
import perfumeShelf from "@public/images/ecommerce/perfume-shelf.webp";
import clayHands from "@public/images/ecommerce/clay-hands.webp";
import boxesOpen from "@public/images/ecommerce/boxes-open.webp";
import warehouseRacking from "@public/images/ecommerce/warehouse-racking.webp";

export const IMG = {
  watch, watchDark, bagOrange, bagTan, bagBlack, satchel, perfume, serumAmber, serumPedestal, creamJar,
  vasesPair, vasesSet, vasesRow, coffee, shirts, racks, boutique, storeModern, handbagChair, perfumeShelf,
  clayHands, boxesOpen, warehouseRacking,
};

const p = (name, price, img, extra = {}) => ({ name, price, img, ...extra });

/* One store per page family. `accent` tints buttons inside the interfaces only. */
export const STORES = {
  // the category page's store: leather goods, watches and fragrance
  maison: {
    name: "Maison Vale", domain: "maisonvale.store", accent: "#0f1626", nav: ["New in", "Leather", "Watches", "Fragrance"],
    hero: { img: storeModern, title: "The autumn edit", sub: "Leather, time and scent — made to keep." },
    products: [
      p("Field Chronograph", "$640", watch, { tag: "New", variant: "Cognac strap" }),
      p("Weekend Holdall", "$420", bagOrange, { variant: "Burnt orange" }),
      p("Eau de Parfum No. 4", "$148", perfume, { variant: "50 ml" }),
      p("City Tote", "$380", bagBlack, { variant: "Black" }),
      p("Crossbody Satchel", "$310", satchel, { variant: "Stone" }),
      p("Saddle Bag", "$295", bagTan, { variant: "Tan" }),
    ],
    search: "leather",
  },
  // WooCommerce: a ceramics studio whose shop lives inside its WordPress site
  terra: {
    name: "Terra Studio", domain: "terrastudio.co", accent: "#5a3d2b", nav: ["Shop", "Journal", "Workshops", "About"],
    hero: { img: clayHands, title: "Thrown by hand", sub: "Small-batch stoneware from our Brooklyn studio." },
    products: [
      p("Pair of Bud Vases", "$86", vasesPair, { tag: "Small batch", variant: "Oat glaze" }),
      p("Table Set", "$140", vasesSet, { variant: "Mixed glazes" }),
      p("Vessel Collection", "$220", vasesRow, { variant: "Set of seven" }),
    ],
    search: "vase",
  },
  // Shopify: a direct-to-consumer skincare brand
  lumen: {
    name: "Lumen Skin", domain: "lumenskin.com", accent: "#7a4a1e", nav: ["Shop all", "Serums", "Moisture", "Sets"],
    hero: { img: serumPedestal, title: "Less, but better", sub: "Three-step skincare, refilled on your schedule." },
    products: [
      p("Daily Serum", "$54", serumAmber, { tag: "Bestseller", variant: "30 ml" }),
      p("Night Oil", "$62", serumPedestal, { variant: "30 ml" }),
      p("Barrier Cream", "$48", creamJar, { variant: "50 ml" }),
    ],
    search: "serum",
  },
  // Shopify Plus: a fashion house running drops across regions
  arden: {
    name: "Arden & Co.", domain: "ardenandco.com", accent: "#111111", nav: ["Women", "Men", "Drop 07", "Stores"],
    hero: { img: racks, title: "Drop 07 — Linen", sub: "Released Thursday, 9am in every region." },
    products: [
      p("Linen Overshirt", "$185", shirts, { tag: "Drop 07", variant: "Sand" }),
      p("Leather Weekender", "$520", bagOrange, { variant: "Rust" }),
      p("Structured Tote", "$460", bagBlack, { variant: "Black" }),
    ],
    search: "linen",
  },
  // Magento / Adobe Commerce: a leather-goods maker with retail and trade stores
  halden: {
    name: "Halden Leather", domain: "haldenleather.com", accent: "#3a2a1f", nav: ["Retail", "Trade", "Bespoke", "Stores"],
    hero: { img: handbagChair, title: "Built to be repaired", sub: "Retail, trade and bespoke from one catalogue." },
    products: [
      p("Satchel 14\"", "$310", satchel, { tag: "Trade price", variant: "Stone", sku: "HL-SAT-14-ST" }),
      p("Shoulder Bag", "$295", bagTan, { variant: "Tan", sku: "HL-SHB-TN" }),
      p("Office Tote", "$380", bagBlack, { variant: "Black", sku: "HL-OTT-BK" }),
      p("Dress Watch", "$540", watchDark, { variant: "Steel", sku: "HL-WDR-ST" }),
    ],
    search: "satchel",
  },
  // BigCommerce: a retailer selling in store, online and to trade buyers
  oakmere: {
    name: "Oakmere", domain: "oakmere.com", accent: "#1d3b33", nav: ["New", "Bags", "Fragrance", "Trade"],
    hero: { img: boutique, title: "In store. Online. Wholesale.", sub: "One catalogue for every way our customers buy." },
    products: [
      p("Market Bag", "$240", bagOrange, { tag: "In store today", variant: "Orange", sku: "OK-MKT-OR" }),
      p("Eau de Parfum", "$120", perfume, { variant: "50 ml", sku: "OK-EDP-50" }),
      p("Saddle Bag", "$210", bagTan, { variant: "Tan", sku: "OK-SDL-TN" }),
      p("Crossbody", "$190", satchel, { variant: "Grey", sku: "OK-CRS-GR" }),
    ],
    search: "bag",
  },
  // Mirakl: a marketplace operator with many sellers
  common: {
    name: "Common Goods", domain: "commongoods.market", accent: "#24324a", nav: ["Home", "Coffee", "Ceramics", "Fragrance"],
    hero: { img: boxesOpen, title: "Hundreds of makers. One basket.", sub: "Independent sellers, one checkout." },
    products: [
      p("Single-origin Beans", "$22", coffee, { tag: "3 sellers", variant: "1 kg", seller: "Roast House" }),
      p("Stoneware Set", "$128", vasesSet, { variant: "Set of four", seller: "Kiln & Co" }),
      p("Eau de Parfum", "$96", perfume, { variant: "50 ml", seller: "Atelier Noir" }),
      p("Field Watch", "$310", watch, { variant: "Leather strap", seller: "Hour Works" }),
    ],
    offers: [
      { seller: "Roast House", price: "$22.00", ship: "Ships tomorrow", note: "Top-rated seller" },
      { seller: "Bean Collective", price: "$23.50", ship: "Ships in 2 days", note: "" },
      { seller: "Northside Roasters", price: "$24.00", ship: "Free delivery", note: "" },
    ],
    search: "coffee",
  },
};
