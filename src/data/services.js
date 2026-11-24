// Service lines. The first eight follow lincolnmediainc.com's service menu; "AI, SaaS & Mobile Apps" is this
// site's own line. Lines and sub-services without a page on this site link to /services (no invented URLs).
import web from "@public/images/services/web-development.jpg";
import mobile from "@public/images/services/mobile-app-development.jpg";
import marketing from "@public/images/services/digital-marketing.jpg";
import uiux from "@public/images/services/ui-ux-design.jpg";
import ecommerce from "@public/images/services/ecommerce.jpg";
import branding from "@public/images/services/branding.jpg";
import video from "@public/images/services/video-animation.jpg";
import outsourcing from "@public/images/services/it-outsourcing.jpg";
import ai from "@public/images/services/ai-saas-mobile.jpg";

const s = (slug) => `/services/${slug}`;

export const SERVICES = [
  {
    key: "web",
    title: "Web Development",
    href: s("web-development"),
    image: web,
    alt: "Code editor open on a laptop in a dark studio",
    blurb: "Fast, scalable websites and platforms on the stack that fits your business — from CMS builds to enterprise systems.",
    subs: [
      ["WordPress Development", s("wordpress-development")],
      ["SharePoint Development", s("sharepoint-development")],
      ["Enterprise Development", s("enterprise-development")],
      ["Sitecore Development", s("sitecore-development")],
      ["PHP Development", s("php-development")],
      ["Joomla Development", s("joomla-development")],
      ["ASP.NET Development", s("asp-net-development")],
      ["CMS Development", s("cms-website-development")],
      ["Drupal Development", s("drupal-web-development")],
      ["Laravel Development", s("laravel-web-development")],
      ["Python Development", s("python-development")],
      ["AngularJS Development", s("angularjs-development")],
      ["Website Maintenance Services", s("website-maintenance-services")],
      ["WhatsApp Integration", s("whatsapp-business-integration")],
    ],
  },
  {
    key: "mobile",
    title: "Mobile Application Development",
    href: "/services",
    image: mobile,
    alt: "A hand holding a phone showing a clean dashboard app",
    blurb: "Native and cross-platform apps for iOS and Android — interfaces that win hearts and give your brand a personal channel to its audience.",
    subs: [["Hybrid Apps"], ["Android App Development"], ["iOS App Development"], ["React Native Apps"], ["Flutter Apps"], ["Ruby on Rails Development"]],
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    href: s("digital-marketing"),
    image: marketing,
    alt: "Analytics dashboard with traffic and conversion charts",
    blurb: "SEO, paid media and social built on data — putting your brand in front of the right people and turning attention into revenue.",
    subs: [
      ["Social Media Marketing", s("social-media-marketing")],
      ["Social Media Optimization", s("social-media-optimization")],
      ["Pay Per Click", s("pay-per-click")],
      ["SEO", s("seo")],
      ["Conversion Rate Optimization", s("conversation-rate-optimization")],
      ["Email Marketing", s("email-marketing")],
      ["GMB Optimization", s("gmb-optimization-services")],
      ["Content Marketing", s("content-marketing")],
      ["Online Reputation Management", s("online-reputation-management")],
      ["App Store Optimization"],
      ["Public Relations"],
    ],
  },
  {
    key: "uiux",
    title: "UI/UX Design",
    href: "/services",
    image: uiux,
    alt: "Designer sketching wireframes on a tablet",
    blurb: "Bespoke user experiences for apps and websites — interfaces that make it a pleasure for your audience to interact with your brand.",
    subs: [["PSD to Responsive HTML"], ["UX Design Workshop"], ["Responsive Web Design"], ["UX Design"], ["Landing Page Design"], ["UX Audit"], ["Graphic Design"]],
  },
  {
    key: "ecommerce",
    title: "E-commerce Web Development",
    href: s("ecommerce-web-development"),
    image: ecommerce,
    alt: "Red and black shopping bags on a dark surface",
    blurb: "Conversion-obsessed stores on Shopify, Magento, WooCommerce and more — engineered to sell around the clock.",
    subs: [
      ["WooCommerce", s("ecommerce-web-development/woo-commerce")],
      ["Mirakl", s("ecommerce-web-development/mirakl")],
      ["Magento", s("ecommerce-web-development/magento")],
      ["BigCommerce", s("ecommerce-web-development/big-commerce")],
      ["Shopify", s("ecommerce-web-development/shopify")],
      ["Shopify Plus", s("ecommerce-web-development/shopify-plus")],
    ],
  },
  {
    key: "branding",
    title: "Digital Branding & Communication",
    href: s("branding-communication-agency"),
    image: branding,
    alt: "Colour swatches and brand sketches on a designer's desk",
    blurb: "Identities, packaging and brand systems with a point of view — instantly recognisable, impossible to forget.",
    subs: [
      ["Company Profile & Brochure Design", s("brochure-design")],
      ["Business Card Design", s("business-card-design")],
      ["Corporate Identity Design", s("corporate-identity-design")],
      ["Packaging Designs", s("packaging-designs")],
      ["Logo Design", s("logo-design")],
    ],
  },
  {
    key: "video",
    title: "Video Animation",
    href: "/services",
    image: video,
    alt: "Video editing timeline on a monitor",
    blurb: "Explainer, product, sales and branding videos that make your brand look and sound its best.",
    subs: [["Explainer Video Production"], ["Product Demo Animation"], ["Video Game Trailers"], ["3D Architectural Walkthroughs"], ["Medical Animation"], ["Character Animation"], ["Whiteboard Animation"]],
  },
  {
    key: "outsourcing",
    title: "IT Resource Outsourcing",
    href: "/services",
    image: outsourcing,
    alt: "A team working together around laptops, seen from above",
    blurb: "On-demand IT talent for digital transformation — end-user support, application investment, and cloud and infrastructure expertise.",
    subs: [
      ["Mobile App Developers"], ["Scrum Masters"], ["AWS Engineers"], ["QA Engineers"], ["Node.js Developers"], ["Azure Engineers"],
      ["React Developers"], ["Dynamics 365 Consultants"], ["Project Managers"], [".NET Developers"], ["RPA Developers"],
      ["3D Google Maps Integration"], ["MarTech Consulting"], ["Digital Cloud Transformation"],
    ],
  },
  {
    key: "ai",
    title: "AI, SaaS & Mobile Apps",
    href: s("ai-saas-mobile"),
    image: ai,
    alt: "Glowing circuit board traces in the dark",
    blurb: "Custom AI that does real work inside your business, SaaS platforms built to onboard, bill and scale, and native apps for iOS and Android that feel effortless.",
    subs: [["LLM Integration"], ["AI Agents & Automation"], ["Chatbots & Voice AI"], ["MVP Builds"], ["Multi-tenant SaaS"], ["Subscription Billing"], ["iOS & Android"], ["React Native & Flutter"]],
  },
];

// Values the guided experience pre-selects in the contact form (public/app.js → prefillContact) must stay in this list
export const CONTACT_SERVICES = [
  "Web Development",
  "Mobile Application Development",
  "Digital Marketing",
  "UI/UX Design",
  "E-commerce Web Development",
  "Digital Branding & Communication",
  "Video Animation",
  "IT Resource Outsourcing",
  "AI, SaaS & Mobile Apps",
];
