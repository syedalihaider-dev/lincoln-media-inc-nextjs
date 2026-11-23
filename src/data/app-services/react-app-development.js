// /services/react-app-development — same shape as ios-app-development.js.
// Source: lincolnmediainc.com/services/react-app-development (React Native), restructured.
import { PARENT, photo, process, FAQ, cta } from "./_shared";

const REACT = {
  platform: "ios",
  accent: "#7b5bff",
  seo: {
    title: "React Native App Development — Cross-Platform iOS & Android Apps | The Lincoln Media",
    description: "React Native app development for efficient, secure cross-platform apps on iOS and Android: UI/UX design, development, integration with existing apps, and post-launch monitoring.",
    keywords: ["React Native app development", "React Native developers", "cross-platform apps", "TypeScript", "iOS and Android app"],
    ...photo("code"),
  },
  parent: PARENT,

  hero: {
    title: ["React Native", "Development"],
    tagline: "Efficient, secure mobile apps for iOS and Android.", // (live H1)
    lead: "Cross-platform apps built with React Native — one JavaScript codebase, native interfaces on both platforms, for clients around the world.", // (live hero)
    screens: ["chat", "home"],
    notes: [
      { kind: "push", app: "Yourbrand", title: "New message from Support", text: "Your ring leaves the studio this afternoon." },
      { kind: "code", file: "Chat.tsx", line: "<Pressable onPress={() => send(text)}><Text>Send</Text></Pressable>" },
    ],
    spec: [["Platforms", "iOS · Android"], ["Languages", "TypeScript · JavaScript"], ["Framework", "React Native"]],
  },

  intro: {
    kicker: "React Native development",
    statement: "Build your React Native app with us — efficient, refined and future-focused.", // (live H2 + H4)
    text: [
      "React Native brings React to native apps: one codebase, real native components on iOS and Android, and a cost-conscious way to reach both platforms at once.", // (live)
      "We cover everything from ideation to maintenance, and keep monitoring the app after launch. React's modular structure makes upgrades easier, and fast reload keeps development quick.", // (live "Why React Native")
    ],
    ...photo("code"),
    facts: [["Codebase", "Shared for iOS & Android"], ["Language", "TypeScript"], ["After launch", "Monitoring & maintenance"], ["Consultation", "Free"]], // (live)
  },

  capabilities: {
    kicker: "Services we offer", // (live)
    title: "React Native, from design to integration.",
    items: [
      { name: "UI/UX for React Native", text: "Interfaces designed for both platforms, built from shared components.", screen: "product" }, // (live)
      { name: "React Native apps", text: "New apps for iOS and Android from one TypeScript codebase.", screen: "home" }, // (live)
      { name: "Integrated React Native", text: "React Native screens added into existing native apps, step by step.", screen: "chat" }, // (live "integrated React Native apps")
      { name: "Real-time features", text: "Chat, live updates and tracking that feel instant.", screen: "tracking" },
      { name: "Payments & checkout", text: "Secure, native-feeling payment flows on both platforms.", screen: "checkout" },
      { name: "Monitoring & upkeep", text: "Post-launch monitoring, updates and maintenance.", screen: "dashboard" }, // (live)
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "Shared code, native screens.",
    items: [
      { screen: "login", caption: "Sign in" },
      { screen: "home", caption: "Home" },
      { screen: "chat", caption: "Support chat" },
      { screen: "tracking", caption: "Live tracking" },
      { screen: "lock", caption: "Notifications" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "React, all the way to native.",
    layers: [
      { name: "Interface", tech: "React Native · native components", text: "Real native views on iOS and Android, driven by React." },
      { name: "App logic", tech: "TypeScript · React hooks", text: "A modular structure that keeps upgrades and new features straightforward." }, // (live)
      { name: "Data", tech: "React Query · MMKV · secure storage", text: "Cached data, offline support and encrypted secrets." },
      { name: "Services", tech: "REST · GraphQL · push", text: "Your APIs, notifications and third-party SDKs." },
      { name: "Delivery", tech: "Expo · EAS · CodePush", text: "Builds for both stores and fast, safe over-the-air fixes." },
    ],
  },

  features: {
    kicker: "Built in",
    title: "React Native for every industry.", // (live)
    rows: [
      { label: "Why React Native", items: ["One codebase", "Native performance", "Modular structure", "Fast reload", "Easier upgrades", "Shared UI components", "Over-the-air updates"] }, // (live)
      { label: "Industries", items: ["Real estate", "Food & beverages", "Social networking", "Finance", "Education & learning", "Construction", "Transportation", "Automotive"] }, // (live)
    ],
  },

  process: process({
    development: "TypeScript and React Native from one shared codebase, with native modules where the platform demands them.",
    testing: "Unit and component tests, then end-to-end testing on real iOS and Android devices.",
    launch: "Release to both stores, then post-launch monitoring and maintenance.", // (live)
  }),

  faq: {
    kicker: "Questions",
    title: "React Native, answered.",
    items: [
      { q: "Why choose React Native?", a: "One codebase serves iOS and Android with native components, which keeps development efficient and cost-conscious. React's modular structure also makes later upgrades easier." }, // (live)
      { q: "Is React Native fast enough?", a: "Yes, for the vast majority of apps. Interfaces render with native components, and performance-critical parts can be written natively." }, // (live "GPU-driven performance")
      { q: "Can React Native be added to my existing app?", a: "Yes. We can integrate React Native screens into an existing native app and expand from there." }, // (live)
      { q: "Do you design the app as well?", a: "Yes — UI and UX design for React Native is one of our core services." }, // (live)
      FAQ.stores,
      FAQ.cost,
      FAQ.maintenance,
    ],
  },

  cta: cta(["One codebase.", "Two platforms."]),
};

export default REACT;
