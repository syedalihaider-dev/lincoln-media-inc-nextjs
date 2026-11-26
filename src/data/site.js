import { siteConfig, phoneDisplay, phoneHref, whatsappHref } from "@/config/site";

// Business information — everything comes from the single source of truth, src/config/site.js.
// SITE keeps the shape the components have always used (display-ready strings and hrefs).
const { contact, address } = siteConfig;
export const SITE = {
  name: siteConfig.name,
  url: siteConfig.url,
  email: contact.email,
  phone: phoneDisplay,
  phoneHref,
  whatsapp: whatsappHref,
  street: address.street,
  locality: `${address.city}, ${address.region} ${address.postalCode}`,
  city: address.city,
  region: address.region,
  postalCode: address.postalCode,
  established: siteConfig.established,
  title: "The Lincoln Media — Build What's Next",
  description:
    "The Lincoln Media is a New York studio building AI systems, SaaS platforms and mobile apps. Tell our guide what you're building and get a personal build plan.",
};

// The studio's social profiles and the live-chat provider (src/config/site.js)
export const SOCIAL = siteConfig.social;
export const CHAT = siteConfig.chat;

// In-page anchors stay "#…" so the homepage scrolls smoothly; other pages are full page loads
export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact-us#contact-form" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Overview",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Terms & Conditions", href: "/terms-and-condition" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "E-commerce Web Development", href: "/services/ecommerce-web-development" },
      { label: "Branding & Communication", href: "/services/branding-communication-agency" },
      { label: "Video & Animation", href: "/services/video-animation" },
      { label: "AI, SaaS & Mobile Apps", href: "/services/ai-saas-mobile" },
    ],
  },
  {
    title: "Digital Marketing",
    links: [
      { label: "PPC", href: "/services/pay-per-click" },
      { label: "SEO", href: "/services/seo" },
      { label: "CRO", href: "/services/conversation-rate-optimization" },
      { label: "Content Marketing", href: "/services/content-marketing" },
      { label: "SMM", href: "/services/social-media-marketing" },
      { label: "SMO", href: "/services/social-media-optimization" },
      { label: "Email Marketing", href: "/services/email-marketing" },
    ],
  },
];
