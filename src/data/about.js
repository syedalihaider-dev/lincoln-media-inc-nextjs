// About page content. Every line is existing company copy — nothing here is new marketing text.
// Sources: (repo) this site's existing pages and homepage data · (live) lincolnmediainc.com/about-us
// Owner's decisions (2026-11-19): mission/vision/values use existing words only; no team section;
// no counters or statistics (none are published on the live site, so none are shown here).
import nycDusk from "@public/images/home/nyc-dusk.jpg";
import empire from "@public/images/home/empire.jpg";
import towers from "@public/images/home/towers.jpg";
import conceptStrategy from "@public/images/about/concept-strategy.webp"; // (live) the About page's own photo
import laptopMobile from "@public/images/about/laptop-mobile.webp"; // (live) device shot
import imgAnalytics from "@public/images/services/digital-marketing.jpg";
import imgContent from "@public/images/services/video-animation.jpg";
import imgBrand from "@public/images/services/branding.jpg";
import imgWeb from "@public/images/services/web-development.jpg";
import imgCommerce from "@public/images/services/ecommerce.jpg";
import imgSecurity from "@public/images/services/ai-saas-mobile.jpg";
import imgApps from "@public/images/services/mobile-app-development.jpg";
import imgQuality from "@public/images/services/ui-ux-design.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";

export const ABOUT_META = {
  title: "About Us — The Lincoln Media",
  description:
    "The Lincoln Media is a New York digital transformation studio, est. 2012: designers, engineers and growth strategists delivering web, mobile and digital marketing under one roof.",
};

export const ABOUT_HERO = {
  kicker: "About The Lincoln Media",
  title: ["Build", "what's", "next."], // (repo) the site's own title: "Build What's Next"
  lede: "A New York studio of designers, engineers and growth strategists.", // (repo)
  city: nycDusk,
  studio: conceptStrategy,
  device: laptopMobile,
  badge: "New York · Est. 2012 · Build what's next · ", // facts + the site's title
};

// Our story — three chapters, each told with the site's own words
export const ABOUT_STORY = [
  {
    key: "studio",
    kicker: "New York · Est. 2012",
    title: "Built to be felt, not just seen.", // (repo) homepage lede
    text: "The Lincoln Media is a New York studio for web, marketing, e-commerce and branding — built to be felt, not just seen.", // (repo)
    detail: "667 Madison Ave, Floor 4&5 · New York, NY 10065", // (repo)
    image: empire,
    alt: "The Manhattan skyline with the Empire State Building at dusk",
  },
  {
    key: "disciplines",
    kicker: "What we do",
    title: "Five disciplines. One team.", // (repo) About page
    text: "Creativity, technology and strategy. One team. Zero hand-offs.", // (repo) philosophy
    disciplines: [
      { name: "Web Development", image: imgWeb },
      { name: "Digital Marketing", image: imgAnalytics },
      { name: "E-commerce Web Development", image: imgCommerce },
      { name: "Digital Branding & Communication", image: imgBrand },
      { name: "AI, SaaS & Mobile Apps", image: imgApps },
    ], // (repo) About page: "Five disciplines. One team."
  },
  {
    key: "brands",
    kicker: "Brands we've moved", // (repo)
    title: "Brands we've moved.",
    // the clients, their sectors and their case studies come from ./work.js (CASE_STUDIES)
  },
];

// Who we are: the live page's nine areas of expertise, each with a photograph from the site's own library
export const ABOUT_EXPERTISE = [
  { name: "Data & Analytics Solutions", image: imgAnalytics },
  { name: "Digital Marketing", image: imgContent },
  { name: "Creative Designing", image: imgBrand },
  { name: "Web Design & Development", image: imgWeb },
  { name: "Digital Commerce", image: imgCommerce },
  { name: "Cyber Security Services", image: imgSecurity },
  { name: "Application Development", image: imgApps },
  { name: "Quality Engineering & Testing", image: imgQuality },
  { name: "Resource Outsourcing", image: imgTeam },
];
export const ABOUT_WHO = { title: "Nine areas of expertise." }; // (live) "areas of expertise"

export const ABOUT_MISSION = {
  mission: "Scalable web and mobile solutions coupled with digital marketing services under one roof.", // (live)
  vision: "Brands don't need more noise. They need moments people remember — and the craft to build them.", // (repo) manifesto
  missionImage: towers,
};

// Values: the three pillars the studio names (repo philosophy), each with the studio's own line for it
export const ABOUT_VALUES = [
  { word: "Creativity", line: "Identities, packaging and brand systems with a point of view — instantly recognisable, impossible to forget.", image: imgBrand, alt: "Colour swatches and brand studies on a desk" }, // (repo) branding
  { word: "Technology", line: "Clean, fast, accessible code. QA'd across every device that matters.", image: imgWeb, alt: "Code on a laptop screen in the dark" }, // (repo) process: Build
  { word: "Strategy", line: "Positioning, journeys and a measurable plan everyone signs off on.", image: imgQuality, alt: "Wireframes being sketched on a tablet" }, // (repo) process: Strategy
];
export const ABOUT_VALUES_HEAD = "Creativity, technology and strategy."; // (repo) philosophy
export const ABOUT_CREED = "One team. Zero hand-offs."; // (repo) philosophy

export const ABOUT_CTA = {
  title: ["Let's create", "something", "unexpected."], // (repo)
  text: "Tell us what you're building. We'll come back with a plan, a team and a timeline.", // (repo)
  promise: "Reach out to our team and we'll get back to you within a day.", // (live)
};
