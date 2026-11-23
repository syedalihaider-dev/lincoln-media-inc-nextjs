// /services/hybrid-app-development — same shape as ios-app-development.js.
// Source: lincolnmediainc.com/services/hybrid-app-development, restructured.
import { PARENT, photo, process, FAQ, cta, SECTORS } from "./_shared";

const HYBRID = {
  platform: "android",
  accent: "#ea580c",
  seo: {
    title: "Hybrid App Development Company — Web & Mobile in One App | The Lincoln Media",
    description: "Hybrid app development with HTML5, CSS3 and JavaScript: one versatile, feature-rich app for iOS, Android and the web, with third-party integrations — expand your reach for less.",
    keywords: ["hybrid app development", "hybrid mobile apps", "HTML5 apps", "Ionic Capacitor", "Xamarin", "cross-platform"],
    ...photo("laptopPhone"),
  },
  parent: PARENT,

  hero: {
    title: ["Hybrid App", "Development"],
    tagline: "Harness the best of web and mobile.", // (live H1)
    lead: "Expand your customer reach and grow your business with hybrid apps — one versatile, feature-rich app for iOS, Android and the web.", // (live hero)
    screens: ["home", "store"],
    notes: [
      { kind: "push", app: "Yourbrand", title: "New season is live", text: "Shop the collection in the app or on the web." },
      { kind: "api", method: "GET", path: "/v1/catalogue", status: "200 OK", time: "42 ms" },
    ],
    spec: [["Platforms", "iOS · Android · web"], ["Languages", "HTML5 · CSS3 · JavaScript"], ["Distribution", "App Store · Google Play"]],
  },

  intro: {
    kicker: "Hybrid development",
    statement: "Your satisfaction is our top priority — one app, built once, everywhere your customers are.", // (live H2)
    text: [
      "Hybrid apps are versatile and feature-rich, built on a cross-channel architecture so the same app reaches iOS, Android and the web. That lowers cost and extends your marketing reach.", // (live)
      "We build with HTML5, CSS3 and JavaScript and frameworks such as AngularJS and Xamarin, deliver to both app stores, and connect the third-party services your business uses.", // (live)
    ],
    ...photo("laptopPhone"),
    facts: [["Architecture", "Cross-channel"], ["Languages", "HTML5 · CSS3 · JS"], ["Reach", "iOS · Android · web"], ["Consultation", "Free"]], // (live)
  },

  capabilities: {
    kicker: "Hybrid services you need", // (live)
    title: "One app, every channel.",
    items: [
      { name: "iOS & Android delivery", text: "One app published to both app stores.", screen: "store" }, // (live)
      { name: "Web and app together", text: "Share content and features between your website and your app.", screen: "home" }, // (live H1)
      { name: "Third-party integrations", text: "Payments, maps, social and the services you already use.", screen: "checkout" }, // (live)
      { name: "Native device features", text: "Camera, location, notifications and biometrics through native plugins.", screen: "login" },
      { name: "Offline-ready", text: "Local caching so the app keeps working on a weak signal.", screen: "product" },
      { name: "Updates & support", text: "Ongoing improvements, maintenance and store updates.", screen: "profile" },
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "Web technology, app experience.",
    items: [
      { screen: "onboarding", caption: "Onboarding" },
      { screen: "home", caption: "Home" },
      { screen: "product", caption: "Product" },
      { screen: "checkout", caption: "Checkout" },
      { screen: "store", caption: "Store listing" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "The web, packaged as an app.",
    layers: [
      { name: "Interface", tech: "HTML5 · CSS3", text: "Responsive, accessible interfaces styled for each platform." }, // (live)
      { name: "App logic", tech: "JavaScript · TypeScript · AngularJS", text: "Shared logic for every platform the app runs on." }, // (live)
      { name: "Native bridge", tech: "Capacitor · Cordova (PhoneGap) · Xamarin", text: "Device features — camera, location, push — through native plugins." }, // (live: PhoneGap, Xamarin)
      { name: "Services", tech: "REST APIs · third-party SDKs", text: "Your back end, payments, maps and social integrations." }, // (live)
      { name: "Delivery", tech: "App Store · Google Play · web", text: "One release process for every channel." },
    ],
  },

  features: {
    kicker: "Built in",
    title: "Why opt for hybrid.", // (live)
    rows: [
      { label: "Benefits", items: ["One app for every platform", "Lower cost", "Wider marketing reach", "Faster updates", "Shared web content", "Third-party integrations", "Native device features"] }, // (live)
      { label: "Sectors", items: SECTORS }, // (live)
    ],
  },

  process: process({
    development: "HTML5, CSS3 and JavaScript in one codebase, wrapped with native plugins for device features.", // (live)
    testing: "Testing in every target browser and on real iOS and Android devices.",
  }),

  faq: {
    kicker: "Questions",
    title: "Hybrid apps, answered.",
    items: [
      { q: "What is a hybrid app?", a: "An app built with web technologies — HTML5, CSS3 and JavaScript — and packaged to run on iOS and Android, so one codebase reaches every platform." }, // (live)
      { q: "Can a hybrid app match a native one?", a: "For many apps, yes: with careful design and native plugins, hybrid apps deliver a quality experience. Where an app needs heavy graphics or deep platform features, we'll recommend native or Flutter instead." }, // (live)
      { q: "Which languages and frameworks do you use?", a: "HTML5, CSS3 and JavaScript, with frameworks including AngularJS, Xamarin and PhoneGap/Cordova-style native bridges." }, // (live)
      { q: "Why choose hybrid over native?", a: "One app across platforms reduces cost and extends your marketing reach — ideal when speed to market and budget matter most." }, // (live)
      FAQ.stores,
      FAQ.cost,
      FAQ.maintenance,
    ],
  },

  cta: cta(["One app.", "Every channel."]),
};

export default HYBRID;
