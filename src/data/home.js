// Homepage content carried over from the existing homepage and about page.
import canvas from "@public/assets/partners/canvas-digital.jpg";
import sybrid from "@public/assets/partners/sybrid.jpg";
import nextapp from "@public/assets/partners/nextapp.jpg";

export const HERO = {
  lede: "The Lincoln Media is a New York studio for web, marketing, e-commerce and branding — built to be felt, not just seen.",
};

export const MANIFESTO = {
  statement: "Brands don't need more noise. They need moments people remember — and the craft to build them.",
  philosophy: "Creativity, technology and strategy. One team. Zero hand-offs.",
  studio: "A New York studio of designers, engineers and growth strategists.",
};

// Icons are the line drawings used on the existing homepage
export const INDUSTRIES = [
  { name: "Healthcare", text: "Patient portals, telehealth and HIPAA-minded platforms that make care easier to reach.", chips: ["Telehealth apps", "Patient portals", "AI triage"], icon: ["M12 21s-7.5-4.6-9.3-9.4C1.4 8.2 3.6 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.6 0 5.8 3.7 4.5 7.1C19.5 16.4 12 21 12 21Z", "M3.5 12h4l1.8-3 2.6 6 1.8-3H20"] },
  { name: "Fitness & Wellness", text: "Apps and sites that keep members moving — bookings, coaching and progress in one place.", chips: ["Class booking", "Coaching apps", "Wearable sync"], icon: ["M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"] },
  { name: "Law Firms", text: "Websites and client tools that win trust, generate leads and cut admin for legal teams.", chips: ["Lead-gen sites", "Client intake", "Document AI"], icon: ["M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2", "M5 7l-3 7a3 3 0 0 0 6 0Z", "M19 7l-3 7a3 3 0 0 0 6 0Z"] },
  { name: "Real Estate", text: "Listings, virtual tours and CRMs that turn browsers into buyers and tenants.", chips: ["Property portals", "Virtual tours", "Agent CRM"], icon: ["M3 21h18M5 21V10l7-6 7 6v11", "M9.5 21v-6h5v6", "M9 11h.01M15 11h.01"] },
  { name: "E-commerce & Retail", text: "Stores built to convert, with fast checkout, smart search and inventory that stays in sync.", chips: ["Shopify Plus", "Headless stores", "CRO"], icon: ["M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8Z", "M9 10V6a3 3 0 0 1 6 0v4"] },
  { name: "Finance & Fintech", text: "Secure dashboards, payments and trading tools with compliance designed in from day one.", chips: ["Payments", "Dashboards", "KYC flows"], icon: ["M3 20h18", "M6 16V11M10 16V7M14 16v-6M18 16V5", "M5 8l5-4 4 3 5-4"] },
];

export const PROCESS = [
  { title: "Discover", text: "Workshops, audits and research. We find the real problem before we touch a pixel." },
  { title: "Strategy", text: "Positioning, journeys and a measurable plan everyone signs off on." },
  { title: "Design", text: "Systems, prototypes and motion — tested with real people, refined until it sings." },
  { title: "Build", text: "Clean, fast, accessible code. QA'd across every device that matters." },
  { title: "Launch & Grow", text: "Zero-drama launches, then SEO, ads and CRO to compound the results." },
];

export const STATS = [
  { value: 1200, suffix: "+", label: "Projects delivered" },
  { value: 850, suffix: "+", label: "Happy clients" },
  { value: 12, suffix: "", label: "Years in the game" },
  { value: 25, suffix: "+", label: "Countries reached" },
];

export const PARTNERS = [
  { name: "Canvas Digital", role: "Creative & digital studio", image: canvas, href: null },
  { name: "Sybrid", role: "A technology solutions company", image: sybrid, href: "https://sybrid.com/" },
  { name: "Next App", role: "Mobile apps, web & software", image: nextapp, href: "https://www.nextappinc.com/" },
];

export const CLIENTS = ["Belgravia London", "BetterHomes", "CryptoSouk", "The Bagel Shak", "Bike Store", "Polly", "Upmatch", "Aureum"];

// Every technology here is named in the studio's service lines
export const STACK = [
  { group: "Platforms", items: ["WordPress", "Drupal", "Joomla", "Sitecore", "SharePoint"] },
  { group: "Engineering", items: ["PHP", "Laravel", "Python", "ASP.NET", "AngularJS", "Node.js", "React", "Ruby on Rails"] },
  { group: "Commerce", items: ["Shopify Plus", "Shopify", "Magento", "WooCommerce", "BigCommerce", "Mirakl"] },
  { group: "Mobile", items: ["iOS", "Android", "React Native", "Flutter", "Hybrid"] },
  { group: "Cloud & AI", items: ["AWS", "Azure", "Dynamics 365", "LLM Integration", "AI Agents", "RPA"] },
];
