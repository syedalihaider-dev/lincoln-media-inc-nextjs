// Case studies (pages under /work) and recent product launches (external, by Sybrid).
// Copy comes from the existing case-study pages; images are sector photography, not product screenshots.
import aureum from "@public/images/work/aureum.jpg";
import belgravia from "@public/images/work/belgravia-london.jpg";
import betterhomes from "@public/images/work/betterhomes.jpg";
import bike from "@public/images/work/bike-store.jpg";
import crypto from "@public/images/work/cryptosouk.jpg";
import polly from "@public/images/work/polly.jpg";
import bagel from "@public/images/work/the-bagel-shak.jpg";
import upmatch from "@public/images/work/upmatch.jpg";
import syvox from "@public/assets/work/syvox.jpg";
import syhox from "@public/assets/work/syhox.jpg";
import sydesk from "@public/assets/work/sydesk.jpg";
import syforce from "@public/assets/work/syforce.jpg";
import syshield from "@public/assets/work/syshield.jpg";

export const CASE_STUDIES = [
  { slug: "belgravia-london", name: "Belgravia London", sector: "Luxury Real Estate", year: 2025, services: "Web Design · Development · SEO", brief: "A cinematic digital home for prime London property — where architecture leads and the interface steps aside.", image: belgravia, alt: "Aerial view of London and the Thames at dusk" },
  { slug: "betterhomes", name: "BetterHomes", sector: "Property Platform", year: 2025, services: "Product Design · Development", brief: "Search, compare and book viewings in seconds. A property platform rebuilt around speed.", image: betterhomes, alt: "A modern house lit up at dusk" },
  { slug: "cryptosouk", name: "CryptoSouk", sector: "Fintech", year: 2024, services: "UX/UI · Web App · Branding", brief: "A trading experience that makes complex markets feel calm, legible and trustworthy.", image: crypto, alt: "Candlestick trading chart glowing on a dark screen" },
  { slug: "the-bagel-shak", name: "The Bagel Shak", sector: "Food & Beverage", year: 2024, services: "Branding · Packaging · E-commerce", brief: "A loud, hungry brand and an ordering flow that gets bagels into hands faster.", image: bagel, alt: "Fresh seeded bagels on a cooling rack" },
  { slug: "bike-store", name: "Bike Store", sector: "Retail E-commerce", year: 2024, services: "Shopify Plus · CRO", brief: "A performance storefront for performance machines — configurators, rich product stories, zero friction.", image: bike, alt: "A black road bike against a dark backdrop" },
  { slug: "polly", name: "Polly", sector: "SaaS", year: 2023, services: "Product Design · Front-end", brief: "Turning a dense analytics product into a dashboard teams actually enjoy opening.", image: polly, alt: "Analytics dashboard open on a laptop" },
  { slug: "upmatch", name: "Upmatch", sector: "Recruitment", year: 2023, services: "Web Platform · SEO · PPC", brief: "A hiring platform that matches people to roles — and recruiters to their sanity.", image: upmatch, alt: "A team meeting around laptops" },
  { slug: "aureum", name: "Aureum", sector: "Fine Jewellery", year: 2023, services: "Shopify Plus · Art Direction · Email", brief: "Quiet luxury, loud results. A Shopify Plus flagship for handcrafted fine jewellery.", image: aureum, alt: "A diamond ring resting on black velvet" },
];

export const LAUNCHES = [
  { name: "SYVOX 2.0", kind: "Unified communications", tags: "Contact Center · Omni-channel · AI Automation", href: "https://sybrid.com/syvox", image: syvox },
  { name: "SYHOX", kind: "Cloud IP PBX", tags: "IP PBX · Secure Cloud · Call Centers", href: "https://sybrid.com/syhox", image: syhox },
  { name: "SYDESK", kind: "Helpdesk & CRM", tags: "Helpdesk · Asset Management · Complaints", href: "https://sybrid.com/sydesk", image: sydesk },
  { name: "SyForce", kind: "AI human capital management", tags: "HCM · Hiring · Performance", href: "https://sybrid.com/syforce", image: syforce },
  { name: "SyShield", kind: "AI compliance readiness", tags: "Risk · Compliance · Governance", href: "https://sybrid.com/syshield", image: syshield },
];
