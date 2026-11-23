// Shared parts for the Web Development child pages: the image library, and builders for the sections
// whose content is common to every service (process, FAQ answers from the live FAQ, sectors, CTA).
// Every dataset (<slug>.js) fills the same shape as wordpress-development.js — the approved master.
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgCode from "@public/images/services/web-development.jpg";
import imgDash from "@public/images/work/polly.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgGlow from "@public/images/home/laptop-glow.jpg";
import imgEmpireCity from "@public/images/home/empire.jpg";
import imgShop from "@public/images/services/ecommerce.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgCharts from "@public/images/services/digital-marketing.jpg";
import imgPhone from "@public/images/services/mobile-app-development.jpg";
import imgCircuit from "@public/images/services/ai-saas-mobile.jpg";
import imgRing from "@public/images/work/aureum.jpg";
import imgHouse from "@public/images/work/betterhomes.jpg";
import imgLondon from "@public/images/work/belgravia-london.jpg";
import imgTrading from "@public/images/work/cryptosouk.jpg";
import imgMeeting from "@public/images/work/upmatch.jpg";
import imgBike from "@public/images/work/bike-store.jpg";
import imgDevTablet from "@public/images/about/concept-strategy.webp";
import imgPhones from "@public/images/about/dual-mobile.webp";
import imgLaptopPhone from "@public/images/about/laptop-mobile.webp";
import imgDeveloper from "@public/images/inner/wordpress/developer-at-work.webp";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";
import imgLaunched from "@public/images/inner/wordpress/launched-websites.webp";
import imgArchitecture from "@public/images/inner/shared/architecture-white.webp";
import imgWhatsApp from "@public/images/inner/whatsapp/whatsapp-phone.webp";
import mockHospitality from "@public/images/inner/web-development/portfolio-img-1.webp";
import mockMall from "@public/images/inner/web-development/portfolio-img-2.webp";
import mockStartup from "@public/images/inner/web-development/portfolio-img-3.webp";

// [image, alt] — every photograph used by the child pages, described once
export const IMG = {
  ux: [imgUx, "A designer sketching website wireframes on a tablet"],
  code: [imgCode, "Code open in an editor on a laptop"],
  dash: [imgDash, "A dashboard open on a laptop"],
  towers: [imgTowers, "Glass towers rising into a pale sky, seen from street level"],
  dusk: [imgDusk, "Manhattan at dusk, the city lights coming on"],
  glow: [imgGlow, "A laptop glowing in a dark room"],
  empire: [imgEmpireCity, "The Manhattan skyline with the Empire State Building"],
  shop: [imgShop, "Shopping bags laid out on a dark surface"],
  team: [imgTeam, "A team working on laptops around one table"],
  charts: [imgCharts, "Website performance charts on a screen"],
  phone: [imgPhone, "A phone showing a clean app interface"],
  circuit: [imgCircuit, "A lit circuit board seen up close"],
  ring: [imgRing, "A diamond ring resting on black velvet"],
  house: [imgHouse, "A modern house lit up at dusk"],
  london: [imgLondon, "London and the Thames at dusk, from above"],
  trading: [imgTrading, "A trading chart glowing on a dark screen"],
  meeting: [imgMeeting, "A team meeting around laptops"],
  bike: [imgBike, "A road bike against a dark backdrop"],
  devTablet: [imgDevTablet, "A developer writing code on a tablet at a desk"],
  phones: [imgPhones, "Two phones showing app screens"],
  laptopPhone: [imgLaptopPhone, "A website shown on a laptop and a phone"],
  developer: [imgDeveloper, "A developer writing code at a desk"],
  studio: [imgStudio, "A designer at work on a large monitor in the studio"],
  launched: [imgLaunched, "Websites built by the studio, shown on two monitors"],
  architecture: [imgArchitecture, "White architectural facades against a grey sky"],
  whatsapp: [imgWhatsApp, "WhatsApp open on a phone resting on a keyboard"],
  mockHospitality: [mockHospitality, "A website built by the studio, shown on a laptop"],
  mockMall: [mockMall, "A website built by the studio, shown on a laptop"],
  mockStartup: [mockStartup, "A website built by the studio, shown on a laptop"],
};
const pic = (k) => IMG[k][0];
const alt = (k) => IMG[k][1];
export { pic, alt };

export const PARENT = { name: "Web Development", href: "/services/web-development" };

// The live pages' own sector list ("We help a diverse clientele build result-driven web development")
export const SECTORS = ["Automotive", "Healthcare", "Manufacturing", "Education", "Business Consulting", "Technology", "Real Estate", "Restaurant"];

/** The hero's stage: the generic demo site in a browser, its editor, its phone — photos vary per service */
export const stage = (photoKeys, toast = "Page updated") => ({
  url: "yourbrand.com",
  photos: photoKeys.map(pic),
  video: "/videos/nyc-night.mp4",
  poster: "/videos/nyc-night-poster.jpg",
  toast,
});

/** How we deliver — the six stages every page shares; design/development (and optionally the others) are the service's own */
export function process({ design, development, discovery, strategy, testing, launch, launchPhoto = "launched" }) {
  const step = (name, text, k, fit) => ({ name, text, photo: pic(k), photoAlt: alt(k), ...(fit ? { fit } : {}) });
  return {
    kicker: "How we deliver",
    title: "Involved every step of the way.", // (live FAQ)
    steps: [
      step("Discovery", discovery || "Send us your brief and we meet to discuss the project at length — workshops, audits and research to find the real problem first.", "team"), // (live FAQ + repo)
      step("Strategy", strategy || "A proposal and a measurable plan everyone signs off on. Once you approve it, the work begins.", "charts"), // (live FAQ + repo)
      step("Design", design, "ux"),
      step("Development", development, "devTablet"),
      step("Testing", testing || "Clean, fast, accessible code — QA'd across every device that matters before anything goes live.", "phones", "contain"), // (repo)
      step("Launch", launch || "It goes live, and we keep helping after launch — maintenance, SEO and new features.", launchPhoto, "contain"), // (live FAQ)
    ],
  };
}

/** Answers from the live site's shared FAQ, reused where they fit the service */
export const FAQ = {
  migrate: { q: "Can your developers migrate my website?", a: "Yes. The team has the technical knowledge for safe, smooth website migration and follows a risk-free method so that you don't lose traffic." },
  support: { q: "Do you offer ongoing help once it's launched?", a: "Yes, we offer ongoing help with what we have built once it launches. For a website that has been running for some time, further services are available for a charge." },
  seo: { q: "Can you also help my website rank on Google?", a: "Yes. Our SEO team knows what your website needs to stand out on Google and works with a tried and tested white-hat SEO strategy." },
  turnaround: { q: "What will be the turnaround time for my project?", a: "Once you send your brief, we schedule a meeting to discuss the project at length. The turnaround time is estimated solely from your project's requirements, and you're involved every step of the way." },
  cost: { q: "What does a project cost?", a: "Every project has different objectives and requirements, so there is no standard price list. Get in touch and we'll prepare a quote for your project." },
  framework: { q: "I'm looking for a specific framework. Do you have the expertise?", a: "The team works with React, Angular, Vue, Laravel, Ruby on Rails, Flask, Node, CakePHP, CodeIgniter and Bootstrap, among others — tell us your preferred technology and we'll connect you with the right people." },
  erp: { q: "Do you offer ERP customisation and integration?", a: "Yes. Our engineers handle ERP integration with SAP, Oracle, Salesforce, Microsoft, Infor, IFS, Epicor, SYSPRO, Acumatica, Sage and more." },
  cms: { q: "Can you create a content management system for my website?", a: "Yes. The team is proficient in WordPress, Drupal, Joomla and other content management systems — we can code one from scratch or change your existing CMS to fit your requirements." },
  responsive: { q: "Is responsive design important?", a: "Very. Most web traffic now comes from mobile devices, and responsive design matters for search rankings too — so everything we build works on every screen." },
};

/** The closing invitation */
export const cta = (kicker, title = ["Let's create something", "exceptional."]) => ({
  kicker,
  title,
  text: "Reach out to our team and we'll get back to you within a day.", // (live)
  primary: { label: "Speak to an Expert", href: "/#contact" }, // (live)
  image: pic("studio"),
});

/** The technology section's call to action */
export const techCta = (text, label) => ({
  text,
  primary: { label, href: "/#contact" },
  secondary: { label: "See how we deliver", href: "#process" },
});

/** The visual break */
export const visual = (k, caption, note) => ({ image: pic(k), imageAlt: alt(k), caption, note });

/** One expertise chapter */
export const chapter = (name, lead, text, points, photoKey, screen) => ({ name, lead, text, points, photo: pic(photoKey), photoAlt: alt(photoKey), screen });

/** One capability panel */
export const capability = (name, text, k) => ({ name, text, image: pic(k), imageAlt: alt(k) });

/** The outcome section */
export const outcome = (title, items, k = "dusk") => ({
  image: pic(k),
  imageAlt: alt(k),
  kicker: "What it does for you",
  title,
  items,
  sectorsLabel: "Sectors we build for", // (live)
  sectors: SECTORS,
});
