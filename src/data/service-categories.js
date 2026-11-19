// Services — the source of truth is lincolnmediainc.com (services page + its Services menu), with this
// site's own existing copy (src/data/services.js, src/data/home.js) for the longer descriptions.
// URLs: exactly the live site's /services/<slug> links. Inner service pages are not built yet, so some
// of these routes will only resolve once they are. Items the live site lists without a page have no link.
import imgWeb from "@public/images/services/web-development.jpg";
import imgMobile from "@public/images/services/mobile-app-development.jpg";
import imgMarketing from "@public/images/services/digital-marketing.jpg";
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgCommerce from "@public/images/services/ecommerce.jpg";
import imgBrand from "@public/images/services/branding.jpg";
import imgVideo from "@public/images/services/video-animation.jpg";
import imgAnimation from "@public/videos/smoke-poster.jpg";
import imgAi from "@public/images/services/ai-saas-mobile.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";

const s = (name, slug = null) => ({ name, href: slug ? `/services/${slug}` : null });

export const SERVICES_PAGE = {
  title: "Services — The Lincoln Media",
  description:
    "A full-service creative digital agency: web development, mobile apps, digital marketing, UI/UX design, e-commerce, branding & communication, video animation and animation services.",
  headline: "Our digital services create lovely projects & deliver memorable experiences.", // (live) services hero
  eyebrow: "A full-service creative digital agency", // (live)
  expert: "Speak to an Expert", // (live)
  rfp: "If you have any RFP requirement, please share it with us at", // (live)
  tagline: ["Design.", "Build.", "Launch."], // (live)
  closing: "Let's build something awesome.", // (live)
  promise: "Reach out to our team and we'll get back to you within a day.", // (live)
};

/* The eight categories of the live Services page.
   text  = the live page's own line;  blurb = this site's existing longer description. */
export const SERVICE_CATEGORIES = [
  {
    key: "web", name: "Web Development", short: "Web",
    text: "Desktop & mobile websites done right by professional web development experts.",
    blurb: "Fast, scalable websites and platforms on the stack that fits your business — from CMS builds to enterprise systems.",
    href: "/services/web-development", image: imgWeb, alt: "Code editor open on a laptop in a dark studio",
    items: [
      s("WordPress Development", "wordpress-development"), s("SharePoint Development", "sharepoint-development"),
      s("Enterprise Development", "enterprise-development"), s("Sitecore Development", "sitecore-development"),
      s("PHP Development", "php-development"), s("Joomla Development", "joomla-development"),
      s("ASP.NET Development", "asp-net-development"), s("CMS Development", "cms-website-development"),
      s("Drupal Development", "drupal-web-development"), s("Laravel Development", "laravel-web-development"),
      s("Python Development", "python-development"), s("AngularJS Development", "angularjs-development"),
      s("Website Maintenance Services", "website-maintenance-services"), s("WhatsApp Integration", "whatsapp-web-integration"),
    ],
  },
  {
    key: "mobile", name: "Mobile Application Development", short: "Mobile",
    text: "High performance mobile apps for your business.",
    blurb: "Native and cross-platform apps for iOS and Android — interfaces that win hearts and give your brand a personal channel to its audience.",
    href: "/services/mobile-app-development", image: imgMobile, alt: "A hand holding a phone showing a clean dashboard app",
    items: [
      s("Hybrid Apps", "hybrid-app-development"), s("Android App Development", "android-app-development"),
      s("iOS App Development", "ios-app-development"), s("React Native Apps", "react-app-development"),
      s("Flutter Apps", "flutter-app-development"), s("Ruby on Rails (ROR) Development", "ruby-on-rails-development"),
    ],
  },
  {
    key: "marketing", name: "Digital Marketing", short: "Marketing",
    text: "Strategies to boost your conversions & ROI, done by gurus.",
    blurb: "SEO, paid media and social built on data — putting your brand in front of the right people and turning attention into revenue.",
    href: "/services/digital-marketing", image: imgMarketing, alt: "Analytics dashboard with traffic and conversion charts",
    items: [
      s("Social Media Marketing (SMM)", "social-media-marketing"), s("Social Media Optimization (SMO)", "social-media-optimization"),
      s("Pay Per Click (PPC)", "pay-per-click"), s("Search Engine Optimization (SEO)", "seo"),
      s("Conversion Rate Optimization (CRO)", "conversation-rate-optimization"), s("Email Marketing", "email-marketing"),
      s("Content Marketing", "content-marketing"), s("Online Reputation Management (ORM)", "online-reputation-management"),
      s("App Store Optimization (ASO)", "app-store-optimization"), s("Public Relations (PR)", "public-relation-firm"),
    ],
  },
  {
    key: "ux", name: "UI/UX Design", short: "UI/UX",
    text: "Great user experience, with responsive web design.",
    blurb: "Bespoke user experiences for apps and websites — interfaces that make it a pleasure for your audience to interact with your brand.",
    href: "/services/ui-ux-design", image: imgUx, alt: "Designer sketching wireframes on a tablet",
    items: [
      s("PSD to Responsive HTML", "psd-to-html"), s("UX Design Workshop", "ux-workshops"),
      s("Responsive Web Design", "responsive-website-design"), s("UX Design", "ux-design"),
      s("Landing Page Design", "landing-page-design"), s("UX Audit", "ux-audit"), s("Graphic Design", "graphic-design-services"),
    ],
  },
  {
    key: "commerce", name: "E-Commerce Solutions", short: "E-Commerce",
    text: "We create awesome online stores for simple, better and convenient shopping. Greater e-commerce experience, every time.",
    blurb: "Conversion-obsessed stores on Shopify, Magento, WooCommerce and more — engineered to sell around the clock.",
    href: "/services/ecommerce-web-development", image: imgCommerce, alt: "Shopping bags arranged on a dark surface",
    items: [
      s("WooCommerce Development", "woo-commerce"), s("Mirakl Development", "mirakl"),
      s("Magento E-commerce Development", "magento"), s("BigCommerce Development", "big-commerce"),
      s("Shopify E-commerce Development", "shopify"), s("Shopify Plus E-commerce Development", "shopify-plus"),
    ],
  },
  {
    key: "brand", name: "Digital Branding & Communication", short: "Branding",
    text: "We cover the entire spectrum of digital marketing, including designing your company logo.",
    blurb: "Identities, packaging and brand systems with a point of view — instantly recognisable, impossible to forget.",
    href: "/services/branding-communication-agency", image: imgBrand, alt: "Colour swatches and brand studies on a desk",
    items: [
      s("Company Profile & Brochure Design", "brochure-design"), s("Business Card Design", "business-card-design"),
      s("Corporate Identity Design", "corporate-identity-design"), s("Packaging Designs", "packaging-designs"), s("Logo Design", "logo-design"),
    ],
  },
  {
    key: "video", name: "Video Animation", short: "Video",
    text: "Giving your world a better, more inspirational look. Tell amazing stories with our video animation.",
    blurb: "Explainer, product, sales and branding videos that make your brand look and sound its best.",
    href: "/services/video-animation", image: imgVideo, alt: "A video editing timeline on a monitor",
    items: [
      s("Explainer Video Production", "explainer-videos"), s("Whiteboard Animation Video", "whiteboard-videos-animation"),
      s("Product Demo Animation"), s("Video Game Trailer"), s("3D Architectural Walkthroughs"), s("Medical Animation Studio"), s("Character Animation Video"),
    ],
  },
  {
    key: "animation", name: "Animation Services", short: "Animation",
    text: "We bring your ideas to life with engaging animations. From explainer videos to motion graphics, we deliver captivating visual content that tells your story with impact.",
    blurb: "From explainer videos to motion graphics, we deliver captivating visual content that tells your story with impact.",
    href: null, image: imgAnimation, alt: "Smoke drifting through darkness",
    items: [s("2D Animation"), s("3D Animation"), s("Whiteboard Animation")],
  },
];

// The other service lines this site already offers (src/data/services.js)
export const OTHER_SERVICES = [
  { key: "ai", name: "AI, SaaS & Mobile Apps", text: "Custom AI that does real work inside your business, SaaS platforms built to onboard, bill and scale, and native apps for iOS and Android that feel effortless.", href: "/services/ai-saas-mobile", image: imgAi },
  { key: "outsourcing", name: "IT Resource Outsourcing", text: "On-demand IT talent for digital transformation — end-user support, application investment, and cloud and infrastructure expertise.", href: null, image: imgTeam },
  { key: "gmb", name: "GMB Optimization Services", text: null, href: "/services/gmb-optimization-services", image: null },
];

// Where a category lives: its own page, or its place on the Services page
export const categoryHref = (c) => c.href || `/services#${c.key}`;

// The Services mega menu: the live site's menu groups, with Video and Animation together and the other lines last
const byKey = Object.fromEntries(SERVICE_CATEGORIES.map((c) => [c.key, c]));
export const MEGA_MENU = [
  { title: "Web Development", href: byKey.web.href, items: byKey.web.items },
  { title: "Mobile App Development", href: byKey.mobile.href, items: byKey.mobile.items },
  { title: "Digital Marketing", href: byKey.marketing.href, items: byKey.marketing.items },
  { title: "UI/UX Design", href: byKey.ux.href, items: byKey.ux.items },
  { title: "E-Commerce", href: byKey.commerce.href, items: byKey.commerce.items },
  { title: "Branding & Communication", href: byKey.brand.href, items: byKey.brand.items },
  { title: "Video & Animation", href: byKey.video.href, items: [...byKey.video.items, ...byKey.animation.items] },
  { title: "Other Digital Services", href: "/services", items: OTHER_SERVICES.map((o) => ({ name: o.name, href: o.href })) },
];
