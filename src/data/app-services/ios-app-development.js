// /services/ios-app-development — the reference dataset for the Mobile App Development child pages.
// Source: lincolnmediainc.com/services/ios-app-development, restructured. Left out: the "900 million
// users" figure, the shared web-design FAQ, prices, timelines and the portfolio.
import { PARENT, photo, process, FAQ, cta } from "./_shared";

const IOS = {
  platform: "ios",
  accent: "#1f6feb", // the demo app's brand colour in this page's interfaces
  seo: {
    title: "iOS App Development Company — iPhone & iPad Apps | The Lincoln Media",
    description: "Native iPhone and iPad app development in Swift and SwiftUI: UX/UI design, payments, offline mode, cloud and push, built for usability, speed and App Store compliance.",
    keywords: ["iOS app development", "iPhone app development", "iPad app development", "Swift developers", "SwiftUI", "App Store"],
    ...photo("phone"),
  },
  parent: PARENT,

  hero: {
    title: ["iOS App", "Development"],
    tagline: "Turn your idea into an iPhone app people keep.", // (live hero)
    lead: "Native iPhone and iPad apps built in-house for usability, speed and App Store compliance — designed to feel at home on Apple's platforms.", // (live)
    screens: ["product", "home"],
    notes: [
      { kind: "push", app: "Yourbrand", title: "Back in stock", text: "The Carbon Road is available in your size." },
      { kind: "code", file: "ProductView.swift", line: 'Button("Add to bag") { cart.add(item) }' },
    ],
    spec: [["Platform", "iPhone · iPad"], ["Languages", "Swift · Objective-C"], ["Distribution", "App Store"]],
  },

  intro: {
    kicker: "iOS development",
    statement: "Cutting-edge app solutions for every business — native to the iPhone in every detail.", // (live H2)
    text: [
      "iPhone users expect apps that are fast, polished and consistent with the rest of their device. Our in-house team builds for exactly that: usability first, speed throughout and full App Store compliance.", // (live)
      "We have diverse talent in the iOS domain — developers working in Swift, Objective-C and C++ — and a disciplined way of working: continuous integration, Git, code reviews and unit tests on every change.", // (live)
    ],
    ...photo("phone"),
    facts: [["Interface", "SwiftUI · UIKit"], ["Devices", "iPhone · iPad"], ["Practice", "CI · code review · unit tests"], ["Consultation", "Free"]], // (live)
  },

  capabilities: {
    kicker: "What we deliver",
    title: "Everything an iPhone app needs.",
    items: [
      { name: "iPhone & iPad apps", text: "Native apps that adapt from the smallest iPhone to the largest iPad.", screen: "home" },
      { name: "Offline mode", text: "Apps that keep working without internet connectivity and sync when back online.", screen: "product" }, // (live)
      { name: "Payment integration", text: "Secure in-app payments and subscriptions, confirmed with Face ID.", screen: "checkout" }, // (live)
      { name: "Cloud & sync", text: "Cloud computing back ends that keep every device up to date.", screen: "dashboard" }, // (live)
      { name: "Social & sharing", text: "Social media integration, sign-in and sharing built in.", screen: "login" }, // (live)
      { name: "Feedback & support", text: "In-app feedback and support conversations that keep users talking to you.", screen: "chat" }, // (live "user feedback")
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "Designed for iPhone, screen by screen.",
    items: [
      { screen: "onboarding", caption: "Onboarding" },
      { screen: "login", caption: "Face ID sign-in" },
      { screen: "home", caption: "Home" },
      { screen: "checkout", caption: "Checkout" },
      { screen: "lock", caption: "Notifications" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "Built the way Apple builds.",
    layers: [
      { name: "Interface", tech: "SwiftUI · UIKit", text: "Native controls, Dynamic Type and accessibility out of the box." },
      { name: "App logic", tech: "Swift · Swift Concurrency", text: "Modern, safe, fast code — with Objective-C where an app already uses it." }, // (live)
      { name: "Data", tech: "SwiftData · Core Data · Keychain", text: "Local storage for offline use, secrets kept in the Keychain." },
      { name: "Services", tech: "CloudKit · APNs · StoreKit", text: "Cloud sync, push notifications, payments and subscriptions." }, // (live)
      { name: "Delivery", tech: "Xcode Cloud · TestFlight", text: "Continuous integration, beta testing and App Store release." }, // (live)
    ],
  },

  features: {
    kicker: "Built in",
    title: "Common features of our apps.", // (live)
    rows: [
      { label: "Features", items: ["Works without internet", "User feedback", "Cloud computing", "Payment integration", "Social media integration", "Highly optimised", "Great user experience", "Excellent user interface"] }, // (live)
      { label: "App categories", items: ["Weather", "Travel", "Sports", "Social networking", "Shopping", "Magazines & newspapers", "Health & fitness", "Games", "Food & drink", "Entertainment", "Education", "Business", "Books"] }, // (live)
    ],
  },

  process: process({
    development: "Swift and SwiftUI, built continuously with Git, code reviews and unit tests on every change.", // (live)
    testing: "Unit and UI tests, then real-device testing across iPhone and iPad sizes and iOS versions before TestFlight.",
    launch: "App Store review and compliance, the store listing and release — then support for every new iOS version.", // (live)
  }),

  faq: {
    kicker: "Questions",
    title: "iOS development, answered.",
    items: [
      { q: "Should I build for iOS or Android first?", a: "It depends on your audience and goals. iPhone users are often more willing to pay for subscriptions and apps, while Android reaches more devices worldwide. We build both and will help you decide where to start." }, // (live FAQ + iOS page)
      { q: "Which languages do your iOS developers use?", a: "Swift and SwiftUI for new apps, Objective-C where an existing app uses it, and C++ for performance-critical parts." }, // (live)
      { q: "Do you build iPad apps as well?", a: "Yes. We build for iPhone and iPad, adapting layouts and interactions to each screen." }, // (live "iPad and tablet software development")
      { q: "Can my app work offline?", a: "Yes. We design apps that keep working without internet connectivity and sync when the connection returns." }, // (live)
      FAQ.stores,
      FAQ.timeline,
      FAQ.maintenance,
    ],
  },

  cta: cta(["Build your", "iPhone app."]),
};

export default IOS;
