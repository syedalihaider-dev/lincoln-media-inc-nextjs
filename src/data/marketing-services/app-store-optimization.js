// /services/app-store-optimization — ASO. Source: lincolnmediainc.com/services/app-store-optimization
// (Google Play and Apple App Store optimisation; year-round search optimisation; competitor and keyword
// tracking; working with the dev team; initial audit of size, title, icons, crash rate, compliance and
// category; ratings & review optimisation; app funnel optimisation — UX, subscriptions, push and
// in-app messages; performance marketing with Apple Search Ads and Google App campaigns). Left out:
// "same day" and "absolutely free" claims, figures and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "App Store Optimization (ASO) Agency — Google Play & App Store | The Lincoln Media",
    description: "App store optimization that grows downloads: ASO audits, keyword and competitor tracking, store listing optimisation, ratings and reviews, funnel optimisation and app install campaigns.",
    keywords: ["app store optimization", "ASO agency", "ASO services", "Google Play optimization", "App Store optimization", "app downloads"],
    image: P.phone.image,
    imageAlt: "A hand holding a phone showing an app dashboard",
  },
  hero: {
    headline: "Get your app found, chosen and downloaded.",
    text: "Year-round optimisation for Google Play and the App Store — keywords, listing, ratings and the funnel after install — so more of the right people find your app and keep it.",
    tags: ["ASO audit", "Keyword tracking", "Store listing", "Ratings & reviews", "Funnel optimisation", "App campaigns"],
    screens: ["storeListing", "keywords", "storeSearch"],
    cta: "Get an ASO audit",
  },
  intro: {
    ...P.phone,
    kicker: "Why ASO",
    lines: ["Most apps", "are found", "by search."],
    text: "When people want an app, they search the store. ASO makes sure yours appears for the right searches — and that its icon, screenshots and reviews persuade them to tap Get.",
    points: ["Visibility in both stores, all year round", "A listing that converts browsers to installs", "Ratings and reviews that build trust"],
  },
  does: {
    kicker: "What ASO does",
    title: "Four stages, store to habit.",
    items: [
      { name: "Audit", text: "Title, icon, app size, crash rate, compliance and category — reviewed against your competitors.", screen: "storeListing" },
      { name: "Keywords", text: "Keyword and competitor tracking with premium tools, all year round.", screen: "keywords" },
      { name: "Ratings", text: "Reviews monitored and answered, and the app experience improved from what they say.", screen: "reviews" },
      { name: "Funnel", text: "Onboarding, subscriptions, push and in-app messages optimised after the install.", screen: "analytics" },
    ],
  },
  showcase: {
    kicker: "ASO in practice",
    title: "From search to install.",
    text: "The search, the listing and the people who decide.",
    items: [
      { title: "The search", caption: "Your app among the first results for the words people use.", screen: "storeSearch" },
      { title: "The listing", caption: "Icon, screenshots and a title that explain the app at a glance.", screen: "storeListing" },
      { title: "The design", caption: "Screenshots planned like a story, frame by frame.", ...P.sketch },
      { title: "In the hand", caption: "Built with the dev team, so the app earns its reviews.", ...P.phone },
      { title: "The tracking", caption: "Keyword positions in both stores, week by week.", screen: "keywords" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "Store by store, keyword by keyword.",
    stages: [
      { name: "Audit", text: "We review your listing, technical health and category against competitors.", screen: "storeListing" },
      { name: "Research", text: "Keywords and competitors tracked in both stores.", screen: "keywords" },
      { name: "Optimize", text: "Title, subtitle, description, icon and screenshots rewritten and redesigned.", screen: "storeSearch" },
      { name: "Engage", text: "Reviews answered and the in-app experience improved with the dev team.", screen: "reviews" },
      { name: "Promote", text: "Apple Search Ads and Google App campaigns, where they pay.", screen: "ads" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "ASO, layer by layer.",
    text: "The working views behind every install.",
    layers: [
      { name: "Keyword tracking", text: "Positions in both stores, every day.", screen: "keywords" },
      { name: "Reviews", text: "Ratings and replies across both stores.", screen: "reviews" },
      { name: "App campaigns", text: "Search Ads and app install campaigns.", screen: "ads" },
      { name: "Funnel", text: "From install to subscriber.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From buried to downloaded.",
    screen: "storeSearch",
    before: ["The app missing from its own category searches", "Screenshots that don't explain the app", "Reviews left without an answer"],
    actions: ["A keyword-led title and description", "Screenshots redesigned as a story", "Every review read and answered"],
    after: ["Found for the searches that matter", "A listing that earns the tap", "Ratings that reflect a better app"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything an app listing needs.",
    items: [
      { name: "Audit", text: "Size, title, icons, crash rate, compliance and category, reviewed.", screen: "storeListing" },
      { name: "Keywords", text: "Year-round keyword and competitor tracking in both stores.", screen: "keywords" },
      { name: "Listing", text: "Titles, descriptions, icons and screenshots that convert.", screen: "storeSearch" },
      { name: "Ratings", text: "Review monitoring, replies and a better app experience.", screen: "reviews", href: "/services/online-reputation-management", linkLabel: "Reputation management" },
      { name: "Funnel", text: "UX, subscriptions, push notifications and in-app messages.", screen: "analytics" },
      { name: "Campaigns", text: "Apple Search Ads and Google App campaigns by our paid team.", screen: "ads", href: "/services/pay-per-click", linkLabel: "Pay-per-click" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "App store optimization, answered.",
    items: [
      { q: "Do you optimise for both Google Play and the App Store?", a: "Yes. The two stores rank apps differently, so each listing is researched and optimised on its own terms." },
      { q: "What does an ASO audit cover?", a: "Your title, subtitle and description, icon and screenshots, ratings and reviews, app size, crash rate, compliance and category — compared with your competitors." },
      { q: "How do ratings and reviews affect ASO?", a: "They influence both ranking and whether people download. We monitor and answer reviews, and feed what users say back to your team to improve the app." },
      { q: "Do you work with our developers?", a: "Yes. Some of what helps ASO — app size, stability, onboarding — lives in the app itself, so we work alongside your dev team." },
      { q: "Can you run paid app install campaigns?", a: "Yes. Our paid team runs Apple Search Ads and Google App campaigns, and what they learn about converting keywords feeds the organic listing." },
    ],
  },
  cta: {
    kicker: "Grow your downloads",
    title: ["Ready to reach", "the top of the store?"],
    text: "Send us your app's store links. We'll come back with an audit and the first changes to make — within a day.",
    button: "Get an ASO audit",
    image: P.circuit.image,
    screen: "keywords",
  },
};
