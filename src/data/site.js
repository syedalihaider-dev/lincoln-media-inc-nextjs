// Business information. Source of truth: this site's existing pages (header, footer, contact form).
export const SITE = {
  name: "The Lincoln Media",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thelincolnmedia.com").replace(/\/$/, ""),
  email: "sales@thelincolnmedia.com",
  phone: "+1-332-222-3984",
  phoneHref: "tel:+13322223984",
  whatsapp: "https://wa.me/13322223984",
  street: "667 Madison Ave, Floor 4&5",
  locality: "New York, NY 10065",
  city: "New York",
  established: 2012,
  title: "The Lincoln Media — Build What's Next",
  description:
    "The Lincoln Media is a New York studio building AI systems, SaaS platforms and mobile apps. Tell our guide what you're building and get a personal build plan.",
};

// In-page anchors stay "#…" so the homepage scrolls smoothly; other pages are full page loads
export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Case Studies", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Overview",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Services", href: "/services" },
      { label: "Terms & Conditions", href: "/terms-and-condition" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Web Solutions",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "E-commerce Web Development", href: "/services/ecommerce-web-development" },
      { label: "Branding & Communication", href: "/services/branding-communication-agency" },
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
