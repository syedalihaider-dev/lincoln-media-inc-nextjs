// /services/android-app-development — same shape as ios-app-development.js.
// Source: lincolnmediainc.com/services/android-app-development. The live page has only its H1, hero
// line and service card, so the Android detail below describes the platform and how we build on it —
// no figures, prices, timelines or clients.
import { PARENT, photo, process, FAQ, cta, SECTORS } from "./_shared";

const ANDROID = {
  platform: "android",
  accent: "#16a36a",
  seo: {
    title: "Android App Development Company — Kotlin & Jetpack Compose | The Lincoln Media",
    description: "Android app development in Kotlin and Jetpack Compose for phones, tablets and foldables across Samsung, Google and every major brand — from UX/UI to Google Play release and support.",
    keywords: ["Android app development", "Kotlin developers", "Jetpack Compose", "Google Play", "Samsung apps", "Android app company"],
    ...photo("devTablet"),
  },
  parent: PARENT,

  hero: {
    title: ["Android App", "Development"],
    tagline: "Dynamic apps for Samsung and Google devices.", // (live card)
    lead: "Android apps that drive customer engagement, optimisation and business expansion — built natively in Kotlin for the whole range of Android phones, tablets and foldables.", // (live hero)
    screens: ["booking", "dashboard"],
    notes: [
      { kind: "push", app: "Yourbrand", title: "Booking confirmed", text: "Private viewing · Tue 25 Nov, 10:30 AM" },
      { kind: "code", file: "BookingScreen.kt", line: "Button(onClick = { vm.book(slot) }) { Text(\"Confirm\") }" },
    ],
    spec: [["Platform", "Phones · tablets · foldables"], ["Languages", "Kotlin · Java"], ["Distribution", "Google Play"]],
  },

  intro: {
    kicker: "Android development",
    statement: "Native and hybrid Android apps, built for every screen your customers carry.", // (live H2 "Native and Hybrid Mobile App Development Company")
    text: [
      "Android runs on thousands of devices, from compact phones to large foldables and tablets. We design and build apps that feel native on all of them — following Material Design, adapting to every screen size and staying fast on modest hardware.",
      "Our developers write modern Kotlin with Jetpack Compose, keep Java where an existing app needs it, and integrate the Google services your product relies on.", // (live FAQ: Java, Kotlin)
    ],
    ...photo("devTablet"),
    facts: [["Interface", "Jetpack Compose · Material 3"], ["Devices", "Phones · tablets · foldables"], ["Practice", "CI · code review · tests"], ["Consultation", "Free"]],
  },

  capabilities: {
    kicker: "What we deliver",
    title: "Everything an Android app needs.",
    items: [
      { name: "Phone, tablet & foldable", text: "Adaptive layouts that make the most of every Android screen size.", screen: "home" },
      { name: "Bookings & scheduling", text: "Calendars, slots and reminders that work the way customers expect.", screen: "booking" },
      { name: "Business dashboards", text: "Reports and tools that put your operation on every team member's phone.", screen: "dashboard" },
      { name: "Payments", text: "Google Pay and card payments with secure, tokenised checkout.", screen: "checkout" },
      { name: "Enterprise workflows", text: "Approvals, field work and internal tools connected to your systems.", screen: "approvals" }, // (live "enterprise app development")
      { name: "Account & settings", text: "Sign-in, preferences and privacy controls done properly.", screen: "profile" },
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "Material, screen by screen.",
    items: [
      { screen: "onboarding", caption: "Onboarding" },
      { screen: "home", caption: "Home" },
      { screen: "booking", caption: "Booking" },
      { screen: "tracking", caption: "Live tracking" },
      { screen: "profile", caption: "Settings" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "Modern Android, end to end.",
    layers: [
      { name: "Interface", tech: "Jetpack Compose · Material 3", text: "Declarative UI with Material components, theming and accessibility." },
      { name: "App logic", tech: "Kotlin · Coroutines · ViewModel", text: "Concise, safe code with predictable state — Java where an app already uses it." }, // (live FAQ)
      { name: "Data", tech: "Room · DataStore · Keystore", text: "Offline storage and settings, with secrets kept in the Android Keystore." },
      { name: "Services", tech: "Firebase · FCM · Google Pay", text: "Push notifications, analytics, crash reporting and payments." },
      { name: "Delivery", tech: "Gradle · Play Console", text: "Automated builds, internal testing tracks and staged Google Play rollouts." },
    ],
  },

  features: {
    kicker: "Built in",
    title: "What every Android app gets.",
    rows: [
      { label: "Features", items: ["Material Design", "Adaptive layouts", "Offline support", "Push notifications", "Google Pay", "Biometric sign-in", "Home-screen widgets", "Accessibility"] },
      { label: "Sectors", items: SECTORS }, // (live)
    ],
  },

  process: process({
    development: "Kotlin and Jetpack Compose, built continuously with code review and automated tests on every change.",
    testing: "Unit and UI tests, then testing on real devices across manufacturers, screen sizes and Android versions.",
    launch: "Google Play listing, review and staged rollout — then support for every new Android release.", // (live Flutter "app upgrade")
  }),

  faq: {
    kicker: "Questions",
    title: "Android development, answered.",
    items: [
      { q: "Should I build for Android or iOS first?", a: "It depends on your audience and goals. Android reaches more devices worldwide; iOS users are often more willing to pay. We build both and will help you decide where to start." }, // (live FAQ)
      { q: "Which languages do you use for Android?", a: "Kotlin for new apps, with Jetpack Compose for the interface, and Java where an existing app is written in it." }, // (live FAQ)
      { q: "Will my app work on Samsung, Pixel and other devices?", a: "Yes. We design adaptive layouts and test on real devices across manufacturers, screen sizes and Android versions, including tablets and foldables." }, // (live card)
      { q: "Can you build native and hybrid Android apps?", a: "Yes — native Kotlin apps, and cross-platform or hybrid apps when one codebase for Android and iOS suits the product better." }, // (live H2)
      FAQ.stores,
      FAQ.cost,
      FAQ.maintenance,
    ],
  },

  cta: cta(["Build your", "Android app."]),
};

export default ANDROID;
