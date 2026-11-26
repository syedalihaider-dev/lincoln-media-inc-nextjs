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

// The studio's social profiles — exactly the links the reference site (thelincolnmedia.com) shows in its
// header and footer. It has no YouTube channel link (its YouTube tile points nowhere), so none is listed here.
export const SOCIAL = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/thelincolnmedia" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/thelincolnmedia_/" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/the-lincoln-media/" },
  { key: "x", label: "X", href: "https://x.com/lincolnmedia_1" },
  { key: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/thelincolnmedia_/" },
  { key: "quora", label: "Quora", href: "https://www.quora.com/profile/The-Lincoln-Media" },
];

// Live chat. The reference site runs Zendesk Chat with this widget key; the chat panel
// (Common/Chat) loads it only when a visitor asks for live chat. Swap provider/key here to change it —
// the panel calls the provider through Common/Chat/providers.js, so the design doesn't change.
// Set provider to null to hide the live-chat option.
export const CHAT = { provider: "zendesk", key: "4338bf84-3cf8-46ef-9cd1-996399dc7b9d" };

// In-page anchors stay "#…" so the homepage scrolls smoothly; other pages are full page loads
export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Case Studies", href: "/case-studies" },
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
