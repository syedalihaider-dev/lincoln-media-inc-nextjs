// /services/flutter-app-development — same shape as ios-app-development.js.
// Source: lincolnmediainc.com/services/flutter-app-development, restructured.
import { PARENT, photo, process, FAQ, cta, SECTORS } from "./_shared";

const FLUTTER = {
  platform: "android",
  accent: "#0284c7",
  seo: {
    title: "Flutter App Development Services — One Codebase, Every Platform | The Lincoln Media",
    description: "Flutter app development in Dart: one codebase for iOS, Android, web and desktop. UI/UX design, front-end and back-end, testing and QA, app upgrades, migration and maintenance.",
    keywords: ["Flutter app development", "Flutter developers", "Dart", "cross-platform app development", "Flutter migration"],
    ...photo("ux"),
  },
  parent: PARENT,

  hero: {
    title: ["Flutter", "Development"],
    tagline: "Next-generation apps for a multi-platform business.", // (live hero)
    lead: "One Flutter codebase for iOS, Android, web and desktop — built with Google's UI toolkit to look and perform beautifully everywhere.", // (live H2)
    screens: ["home", "product"],
    notes: [
      { kind: "push", app: "Yourbrand", title: "Your courier is 5 minutes away", text: "Marco is on Madison Ave with your order." },
      { kind: "code", file: "product_card.dart", line: "FilledButton(onPressed: () => cart.add(item), child: Text('Add'))" },
    ],
    spec: [["Platforms", "iOS · Android · web · desktop"], ["Language", "Dart"], ["Toolkit", "Flutter by Google"]],
  },

  intro: {
    kicker: "Flutter development",
    statement: "Your go-to Flutter app development company — one codebase, every platform.", // (live H2)
    text: [
      "Flutter is Google's UI toolkit for building natively compiled apps for mobile, web and desktop from a single codebase. One team, one set of features, every platform — with pixel-perfect control over the interface.", // (live)
      "We take a test-driven approach, work with the latest Flutter SDK and plugins, keep dependencies secure, and build in data and authentication security from the start.", // (live "Bug-fixing & security")
    ],
    ...photo("ux"),
    facts: [["Codebase", "One, for every platform"], ["Language", "Dart"], ["Approach", "Test-driven"], ["Consultation", "Free"]], // (live)
  },

  capabilities: {
    kicker: "We do everything in Flutter", // (live)
    title: "From first sketch to every store.",
    items: [
      { name: "UI/UX design", text: "Custom interfaces designed once and rendered identically on every platform.", screen: "product" }, // (live)
      { name: "Dart app development", text: "Clean, typed, well-structured Dart, organised for teams and growth.", screen: "home" }, // (live)
      { name: "Flutter for iOS & Android", text: "Native performance and platform conventions on both mobile platforms.", screen: "checkout" }, // (live)
      { name: "Front-end & back-end", text: "The app and the services behind it — APIs, cloud and integrations.", screen: "dashboard" }, // (live)
      { name: "Testing & QA", text: "Unit, widget and integration tests on every build.", screen: "success" }, // (live)
      { name: "Migration & support", text: "Moving existing apps to Flutter, then upgrades and maintenance.", screen: "profile" }, // (live)
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "One design, on every screen.",
    items: [
      { screen: "onboarding", caption: "Onboarding" },
      { screen: "home", caption: "Home" },
      { screen: "product", caption: "Product" },
      { screen: "checkout", caption: "Checkout" },
      { screen: "success", caption: "Order confirmed" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "Flutter, from widget to store.",
    layers: [
      { name: "Interface", tech: "Flutter widgets · Material · Cupertino", text: "Every pixel under control, with platform-appropriate behaviour." },
      { name: "App logic", tech: "Dart · Riverpod · Bloc", text: "Predictable state management that scales with the app." },
      { name: "Data", tech: "Drift · Hive · secure storage", text: "Offline data and encrypted secrets on every platform." },
      { name: "Services", tech: "Firebase · REST · GraphQL", text: "Authentication, push, analytics and your own APIs." }, // (live "front-end and backend")
      { name: "Delivery", tech: "CI pipelines · App Store · Google Play", text: "One pipeline building and releasing to every store." },
    ],
  },

  features: {
    kicker: "Built in",
    title: "What comes with every Flutter app.",
    rows: [
      { label: "Services", items: ["App upgrades", "Bug fixing", "Security", "App maintenance", "Dart development", "Cross-platform", "Testing & QA", "Migration"] }, // (live)
      { label: "Sectors", items: SECTORS }, // (live)
    ],
  },

  process: process({
    development: "Dart and Flutter with the latest SDK and plugins, reviewed and built continuously.", // (live)
    testing: "A test-driven approach: unit, widget and integration tests, then devices on every platform.", // (live)
    launch: "Release to the App Store and Google Play, then app upgrades to keep pace with every new iOS and Android release.", // (live "app upgrade")
  }),

  faq: {
    kicker: "Questions",
    title: "Flutter development, answered.",
    items: [
      { q: "What can Flutter build?", a: "Apps for iOS and Android from one codebase — and the same code can also target web and desktop." }, // (live)
      { q: "Is Flutter as good as native?", a: "For most apps, yes. Flutter compiles to native code and renders its own interface, so it's fast and consistent. Where an app needs deep platform features, we combine Flutter with native code." },
      { q: "Can you move my existing app to Flutter?", a: "Yes. App migration is part of what we do — we plan the move screen by screen so your users aren't disrupted." }, // (live)
      { q: "How do you keep a Flutter app secure and up to date?", a: "We monitor for new add-ons and upgrades, keep the Flutter SDK, plugins and dependencies current, and build in data and authentication security." }, // (live)
      { q: "Do you offer a free consultation?", a: "Yes. Tell us your idea and our experts will help validate it before anything is built." }, // (live "ideation & consulting")
      FAQ.timeline,
      FAQ.maintenance,
    ],
  },

  cta: cta(["Build once.", "Launch everywhere."]),
};

export default FLUTTER;
