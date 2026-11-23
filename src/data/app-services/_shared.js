// Shared parts for the Mobile App Development child pages: the photo library and builders for the
// sections every page has in common (process, shared FAQ answers, closing). Every dataset (<slug>.js)
// fills the same shape as ios-app-development.js — the master's reference dataset.
import imgPhone from "@public/images/services/mobile-app-development.jpg";
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgCode from "@public/images/services/web-development.jpg";
import imgCircuit from "@public/images/services/ai-saas-mobile.jpg";
import imgDevTablet from "@public/images/about/concept-strategy.webp";
import imgLaptopPhone from "@public/images/about/laptop-mobile.webp";
import imgPhones from "@public/images/about/dual-mobile.webp";
import imgDeveloper from "@public/images/inner/wordpress/developer-at-work.webp";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";
import { MOBILE_PATH, MOBILE_CHILDREN } from "@/data/mobile-app-development";

// [image, alt] — every photograph used by these pages, described once
export const IMG = {
  phone: [imgPhone, "A hand holding a phone showing a clean app dashboard"],
  ux: [imgUx, "A designer sketching app wireframes on a tablet"],
  code: [imgCode, "Code open in an editor on a laptop"],
  circuit: [imgCircuit, "A lit circuit board seen up close"],
  devTablet: [imgDevTablet, "A developer working on a tablet at a desk"],
  laptopPhone: [imgLaptopPhone, "The same product shown on a laptop and a phone"],
  phones: [imgPhones, "Two phones showing app screens"],
  developer: [imgDeveloper, "A developer writing code at a desk"],
  studio: [imgStudio, "A designer at work on a large monitor in the studio"],
};
export const photo = (k) => ({ image: IMG[k][0], imageAlt: IMG[k][1] });

export const PARENT = { name: "Mobile App Development", href: MOBILE_PATH };
export const SIBLINGS = MOBILE_CHILDREN;

// The live pages' sector list ("We help a diverse clientele…")
export const SECTORS = ["Automotive", "Healthcare", "Manufacturing", "Education", "Business Consulting", "Technology", "Real Estate", "Restaurant"];

/** How we deliver — six stages; development and testing are each service's own */
export function process({ development, testing, design, launch }) {
  return {
    kicker: "How we deliver",
    title: "From first call to the store.",
    steps: [
      { name: "Consultation", text: "A free consultation to understand the idea, your users and your goals, and to validate it before anything is built." }, // (live: Flutter + iOS pages)
      { name: "UX/UI design", text: design || "User journeys, wireframes and a polished interface — prototyped and tested before development starts." },
      { name: "Architecture", text: "The app, its API, data and the services it relies on, planned together so it can grow." },
      { name: "Development", text: development },
      { name: "Testing & QA", text: testing || "Strict quality assurance: unit, UI and device testing on the phones and tablets that matter." }, // (live)
      { name: "Launch & support", text: launch || "Smooth deployment to the App Store and Google Play, then post-deployment support, upgrades and new features." }, // (live)
    ],
  };
}

/** Answers that hold for every mobile service (from the live FAQ and pages) */
export const FAQ = {
  timeline: { q: "How long will my app take to build?", a: "It depends on what the app needs to do. Once you send your brief we meet to discuss it in detail, and the timeline in our proposal is estimated from your requirements — you're involved every step of the way." }, // (live FAQ)
  cost: { q: "What does an app cost?", a: "Every app has different objectives and features, so there's no standard price list. A native app usually costs more than a cross-platform one. Tell us about your project and we'll prepare a custom proposal." }, // (live FAQ, without the AED figures)
  maintenance: { q: "Do you maintain the app after launch?", a: "Yes. Post-deployment support covers upgrades for new iOS and Android releases, bug fixes, security updates and new features. We agree the maintenance plan with you up front." }, // (live)
  stores: { q: "Do you handle App Store and Google Play release?", a: "Yes. We prepare the store listings, take the app through review and compliance, and manage releases and updates." }, // (live "smooth deployment")
  existing: { q: "Can you take over or redesign an existing app?", a: "Yes. We review the current app and code, then fix, redesign, migrate or rebuild what needs it." }, // (live "app migration and support")
};

/** The closing invitation */
export const cta = (title, text = "Reach out to our team and we'll get back to you within a day.") => ({ // (live)
  kicker: "Start your app",
  title,
  text,
  primary: { label: "Speak to an Expert", href: "/#contact" }, // (live)
});
