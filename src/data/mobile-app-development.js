// /services/mobile-app-development — the Mobile App Development category page.
// Source: lincolnmediainc.com/services/mobile-app-development and its six child pages, restructured.
// "(live)" marks wording taken from the live pages. Left out on purpose (see project rules): the live
// figures (265+ / 250+ clients, years, "50% faster"), AED prices, timelines, named clients and the
// portfolio, and the shared FAQ's web-design questions. The FAQ below answers app questions only,
// from what the live pages say.
import imgHero from "@public/images/services/mobile-app-development.jpg";

export const MOBILE_PATH = "/services/mobile-app-development";

// The six child pages, at the live site's own slugs (header menu → Mobile App Development)
export const MOBILE_CHILDREN = [
  { slug: "ios-app-development", name: "iOS App Development", short: "iOS", summary: "Elevate your ROI with next-gen iPhone apps." }, // (live card)
  { slug: "android-app-development", name: "Android App Development", short: "Android", summary: "Create dynamic apps for Samsung and Google products." }, // (live card)
  { slug: "flutter-app-development", name: "Flutter Apps", short: "Flutter", summary: "Flutter development for complete web and app solutions." }, // (live card)
  { slug: "react-app-development", name: "React Native Apps", short: "React Native", summary: "Cross-platform React Native apps, efficient and secure." }, // (live card + H1)
  { slug: "hybrid-app-development", name: "Hybrid Apps", short: "Hybrid", summary: "Harness the best of web and mobile in one app." }, // (live H1)
  { slug: "ruby-on-rails-development", name: "Ruby on Rails Development", short: "Ruby on Rails", summary: "Result-driven Ruby on Rails development." }, // (live card)
].map((c) => ({ ...c, path: `/services/${c.slug}` }));

export const MOBILE_PAGE = {
  seo: {
    title: "Mobile App Development Company — iOS, Android & Cross-Platform | The Lincoln Media",
    description:
      "Custom mobile app development for iOS and Android: native, Flutter, React Native and hybrid apps, from product strategy and UX/UI design to APIs, testing, store launch and support.",
    keywords: ["mobile app development", "iOS app development", "Android app development", "cross-platform apps", "Flutter", "React Native", "app development company New York"],
    image: imgHero,
    imageAlt: "A hand holding a phone showing a clean app dashboard",
  },

  hero: {
    kicker: "Mobile App Development",
    title: ["Mobile App", "Development"],
    tagline: "High performance mobile apps for your business.", // (live)
    lead: "Custom apps that engage your audience, win customers and build a brand people recognise — native and cross-platform, for iOS and Android.", // (live hero + repo)
    primary: { label: "Start your app", href: "/#contact" },
    notes: [
      { kind: "push", app: "Yourbrand", title: "Your courier is 5 minutes away", text: "Marco is on Madison Ave with your order." },
      { kind: "code", file: "AddToBag.swift", line: 'Button("Add to bag") { cart.add(item) }' },
      { kind: "api", method: "POST", path: "/v1/orders", status: "201 Created", time: "84 ms" },
    ],
  },

  experience: {
    kicker: "The app experience",
    title: "A great app is more than screens and code.",
    text: "People decide in seconds whether an app stays on their phone. It has to run smoothly, look polished and earn its place — so we design the whole product, from the first idea to the version in the store, with native, cross-platform and progressive web apps all under one roof.", // (live "Why choose us" + "We create awesome applications")
    stages: [
      { name: "Idea", text: "One clear problem worth solving, written as the story of the person who has it." },
      { name: "Experience", text: "The journey through the app — every step from opening it to getting what they came for." },
      { name: "Interface", text: "Screens with one job each: clear hierarchy, comfortable touch targets, a visible next step." },
      { name: "Technology", text: "The code, APIs and services that make it fast, secure and ready to grow." },
      { name: "Product", text: "A finished app in people's hands — measured, supported and improved after launch." }, // (live "post-deployment support")
    ],
    story: "As a returning customer, I want to book a private viewing in under a minute.",
  },

  build: {
    kicker: "What we build",
    title: "Apps for every kind of business.",
    items: [
      { name: "iOS Applications", text: "Native iPhone and iPad apps built for usability, speed and App Store compliance.", screen: "product", platform: "ios", href: "/services/ios-app-development" }, // (live iOS page)
      { name: "Android Applications", text: "Dynamic apps for Samsung and Google devices, across the whole Android range.", screen: "booking", platform: "android", href: "/services/android-app-development" }, // (live card)
      { name: "Cross-Platform Applications", text: "One codebase for iOS and Android with Flutter or React Native — native feel, shared effort.", screen: "home", platform: "android", href: "/services/flutter-app-development" }, // (live Flutter / React pages)
      { name: "Business Applications", text: "Dashboards, reports and tools that put your operation in your pocket.", screen: "dashboard", platform: "ios" },
      { name: "E-commerce Applications", text: "M-commerce apps with fast checkout, secure payments and order tracking.", screen: "checkout", platform: "ios" }, // (live "M-commerce app development")
      { name: "Customer Applications", text: "Bookings, deliveries and support — a personal channel between your brand and its audience.", screen: "tracking", platform: "ios" }, // (repo blurb)
      { name: "Enterprise Applications", text: "Enterprise-enabled, compliance-driven apps with seamless back-end integration.", screen: "approvals", platform: "android" }, // (live "working with us")
      { name: "MVP & Startup Applications", text: "A focused first version to launch, learn from real users and grow.", screen: "onboarding", platform: "ios", href: "/services/ruby-on-rails-development" }, // (live RoR "development for startups")
    ],
  },

  journey: {
    kicker: "The product journey",
    title: "From strategy to the store.",
    stages: [
      { name: "Strategy", text: "We start with consultation: your goals, your users and what success looks like — then a plan everyone signs off on.", screen: "onboarding", mode: "wire", panel: "brief" }, // (live "mobile application consultation")
      { name: "UX/UI", text: "User journeys become wireframes, then a minimalistic interface with a clear type scale, colour and components.", screen: "product", mode: "mono", panel: "tokens" }, // (live "minimalistic design")
      { name: "Architecture", text: "We map the app, its API, the back end and every external service before a line of production code.", screen: "product", mode: "dev", panel: "arch" },
      { name: "Development", text: "Native or cross-platform code, reviewed on every change and built continuously.", screen: "product", panel: "code" }, // (live iOS: CI, Git, code reviews, unit tests)
      { name: "Testing", text: "Strict quality assurance — unit, UI and device tests on the phones and tablets that matter.", screen: "checkout", panel: "tests" }, // (live "strict quality assurance")
      { name: "Launch", text: "Smooth deployment to the App Store and Google Play, then post-deployment support.", screen: "store", panel: "release" }, // (live)
    ],
  },

  design: {
    kicker: "Design + user experience",
    title: "Interfaces people understand at a glance.",
    text: "Good app design is invisible: people find their way without thinking, read what matters first and finish what they came to do. Every screen is designed, tested and refined around that.",
    screens: ["onboarding", "home", "product", "checkout", "success"],
    notes: [
      { at: "top", text: "One headline, one action per screen" },
      { at: "mid", text: "Touch targets of 44 pt and up" },
      { at: "low", text: "Primary action within thumb reach" },
    ],
    principles: [
      { name: "Intuitive navigation", text: "Familiar patterns for each platform, so nobody has to learn the app." },
      { name: "Usability", text: "Readable type, generous touch targets and accessible contrast." },
      { name: "Visual hierarchy", text: "The most important thing on each screen is the first thing you see." },
      { name: "Responsive interfaces", text: "Layouts that adapt from small phones to foldables and tablets." }, // (live "iPad and tablet software development")
      { name: "User journeys", text: "Every path from first open to a finished task, mapped and shortened." },
      { name: "Conversion-focused", text: "Fewer steps to sign up, book or buy — and fewer reasons to stop." },
    ],
  },

  technology: {
    kicker: "Technology & architecture",
    title: "Built on an architecture that lasts.",
    text: "An app is the visible part of a system. Behind every screen sits an API, a back end, data and the services it relies on — designed together, so the app stays fast and dependable as it grows.",
    nodes: ["Mobile app", "API", "Back end", "Database", "External services"],
    platforms: [
      { name: "Native iOS", stack: "Swift · SwiftUI · Objective-C", text: "The best of iPhone and iPad, straight from Apple's own tools.", href: "/services/ios-app-development" }, // (live iOS page)
      { name: "Native Android", stack: "Kotlin · Java · Jetpack Compose", text: "Apps that feel at home on every Android device.", href: "/services/android-app-development" }, // (live FAQ)
      { name: "Flutter", stack: "Dart · Google's UI toolkit", text: "One codebase for iOS, Android, web and desktop.", href: "/services/flutter-app-development" }, // (live Flutter page)
      { name: "React Native", stack: "JavaScript · TypeScript · React", text: "Cross-platform apps with native rendering and fast iteration.", href: "/services/react-app-development" }, // (live React page)
      { name: "Hybrid", stack: "HTML5 · CSS3 · JavaScript · Xamarin", text: "Web technology packaged as an app, on every platform.", href: "/services/hybrid-app-development" }, // (live hybrid page)
      { name: "Ruby on Rails", stack: "Rails API · RubyGems", text: "Back ends and APIs that power the app.", href: "/services/ruby-on-rails-development" }, // (live RoR page)
    ],
    services: [
      { name: "APIs", text: "REST and GraphQL APIs designed for mobile: small payloads, versioned and documented." },
      { name: "Back-end integration", text: "Seamless connection to your existing systems — CRM, ERP and internal tools." }, // (live)
      { name: "Cloud services", text: "Hosting and storage on AWS, Azure or Google Cloud." }, // (live FAQ)
      { name: "Authentication", text: "Secure sign-in with passkeys, biometrics and social accounts." },
      { name: "Push notifications", text: "Timely, relevant messages through APNs and Firebase Cloud Messaging." },
      { name: "Analytics", text: "Event tracking and crash reporting, so decisions follow real use." },
      { name: "Third-party integrations", text: "Payments, maps, messaging and social media integration." }, // (live iOS "common features")
    ],
  },

  showcase: {
    kicker: "Inside an app",
    title: "Explore a complete app experience.",
    steps: [
      { screen: "onboarding", name: "First open", text: "A welcome that explains the value in one line and gets out of the way.", tech: "Content and imagery served from the CMS — updated without a release." },
      { screen: "login", name: "Sign in", text: "Face ID or a passkey instead of yet another password.", tech: "Biometric authentication, tokens stored in the Keychain / Keystore." },
      { screen: "home", name: "Discover", text: "A personal home screen with search, categories and what's new.", tech: "Catalogue streamed from the API; images cached on the device." },
      { screen: "product", name: "Decide", text: "Everything needed to choose — photos, details, reviews and sizes.", tech: "Works without internet connectivity once loaded." }, // (live iOS "common features")
      { screen: "checkout", name: "Pay", text: "A one-screen checkout confirmed with a glance.", tech: "Payment integration with tokenised cards — no card data on the phone." }, // (live)
      { screen: "tracking", name: "Track", text: "Live delivery on a map, with the courier one tap away.", tech: "Real-time location over WebSockets; maps SDK integration." },
      { screen: "lock", name: "Stay in touch", text: "Notifications that are timely and worth opening.", tech: "Push through APNs and FCM, segmented by behaviour." },
    ],
  },

  quality: {
    kicker: "Performance & quality",
    title: "Engineered to run smoothly — and keep running.",
    text: "People abandon apps that stutter, crash or drain the battery. Quality is designed in from the first commit: measured, tested and monitored in production.", // (live "Why choose us")
    items: [
      { key: "frames", name: "Performance", text: "Every frame inside its 16.7 ms budget, so scrolling and animation stay fluid." },
      { key: "motion", name: "Smooth interactions", text: "Gestures and transitions that respond instantly and settle naturally." },
      { key: "scale", name: "Scalability", text: "Back ends that scale out as your audience grows." },
      { key: "security", name: "Security", text: "Encrypted traffic, secure storage and data and authentication security." }, // (live Flutter page)
      { key: "api", name: "API reliability", text: "Retries, caching and offline queues, so a weak signal never loses work." },
      { key: "responsive", name: "Responsive behaviour", text: "Layouts tested on small phones, large phones, foldables and tablets." },
      { key: "code", name: "Maintainability", text: "Clean architecture, reviewed code and secure, up-to-date dependencies." }, // (live Flutter page)
      { key: "tests", name: "Testing", text: "A test-driven approach: unit, UI and device tests on every build." }, // (live Flutter page)
      { key: "release", name: "Production readiness", text: "Monitoring, crash reporting and staged rollouts before anything reaches everyone." },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "One team from idea to app store.",
    items: [
      { name: "Product Strategy", text: "Mobile application consultation that validates the idea before it's built: goals, audience, features and a roadmap.", points: ["Discovery workshops", "Feature prioritisation", "Roadmap & estimate"], screen: "onboarding", mode: "wire" }, // (live)
      { name: "UX/UI Design", text: "Mobile app design from user journeys to a polished, minimalistic interface — for phones, iPad and tablets.", points: ["User journeys & wireframes", "Interface design", "Prototypes & design systems"], screen: "product", mode: "mono" }, // (live)
      { name: "Mobile Development", text: "Native iOS and Android, Flutter, React Native and hybrid apps, written by certified developers.", points: ["Native & cross-platform", "Enterprise & m-commerce apps", "iPad & tablet apps"], screen: "home" }, // (live)
      { name: "API & Backend Integration", text: "Seamless back-end integration: APIs, cloud services, payments and the systems you already run.", points: ["API design", "Cloud back ends", "Third-party integrations"], screen: "tracking" }, // (live)
      { name: "Testing & QA", text: "Strict quality assurance on real devices, automated wherever it helps.", points: ["Unit & UI testing", "Device testing", "Performance & security checks"], screen: "checkout", mode: "dev" }, // (live)
      { name: "Deployment & Support", text: "Smooth deployment to the stores, then mobile app maintenance: upgrades for new OS releases, fixes and new features.", points: ["App Store & Google Play", "OS upgrades & bug fixes", "Ongoing maintenance"], screen: "store" }, // (live)
    ],
  },

  concept: {
    kicker: "From concept to app",
    title: "Watch an idea become an app.",
    stages: [
      { name: "Concept", mode: "wire", text: "Structure first: what goes where, and why." },
      { name: "Design", mode: "mono", text: "Type, colour, spacing and components take shape." },
      { name: "Development", mode: "dev", text: "Every element becomes real, reusable code." },
      { name: "Finished product", mode: null, text: "Real content, real data, in people's hands." },
    ],
  },

  faq: {
    kicker: "Questions",
    title: "Mobile app development, answered.",
    items: [
      { q: "How long does mobile app development take?", a: "It depends on what the app needs to do. Once you send your brief we meet to discuss the project in detail, and the timeline in our proposal is estimated from your requirements — you're involved at every step." }, // (live FAQ)
      { q: "Do you build both iOS and Android apps?", a: "Yes. We build native iOS apps in Swift and Objective-C, native Android apps in Kotlin and Java, and cross-platform apps that run on both. Which comes first depends on your audience and goals — we'll help you decide." }, // (live FAQ)
      { q: "Do you work with Flutter and React Native?", a: "Yes. Flutter lets one codebase serve iOS, Android, web and desktop; React Native brings React to native apps. We recommend the one that fits your product, team and timeline." }, // (live Flutter + React pages)
      { q: "Can you integrate APIs and third-party services?", a: "Yes — payments, maps, social media, messaging, analytics, cloud services and your own CRM or ERP. Seamless back-end integration is part of every project." }, // (live)
      { q: "Can you build an MVP?", a: "Yes. For startups we build a focused first version that can launch quickly, learn from real users and grow into the full product." }, // (live RoR page)
      { q: "Can you redesign or take over an existing app?", a: "Yes. We review the current app, then redesign, migrate or rebuild what needs it — including moving an app to Flutter or another stack." }, // (live Flutter "app migration")
      { q: "Do you provide app maintenance after launch?", a: "Yes. Post-deployment support covers upgrades for new Android and iOS releases, bug fixes, security and new features. We agree the maintenance plan with you up front." }, // (live)
      { q: "Can you handle App Store and Google Play deployment?", a: "Yes. We prepare the store listings, handle review and compliance, and manage releases on the App Store and Google Play." }, // (live "smooth deployment", "Apple Store compliance")
    ],
  },

  cta: {
    kicker: "Start your app",
    title: ["Turn your app idea", "into a digital product."],
    text: "Tell us what you want to build. Reach out to our team and we'll get back to you within a day.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" }, // (live)
    image: imgHero,
    imageAlt: "A hand holding a phone showing a clean app dashboard",
  },
};
