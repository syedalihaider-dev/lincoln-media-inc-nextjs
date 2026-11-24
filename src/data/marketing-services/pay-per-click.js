// /services/pay-per-click — PPC advertising. Source: lincolnmediainc.com/services/pay-per-click
// (Google Ads set-up and optimisation, audience targeting, ROI-driven, real-time tracking, daily
// updates and transparency, sales-cycle consulting). Left out: "over a decade", "100% transparency",
// promised ROAS, figures, prices and clients.
import { P, NYC_VIDEO } from "./_shared";

export default {
  seo: {
    title: "PPC Management Agency — Google Ads & Paid Social Advertising | The Lincoln Media",
    description: "Pay-per-click management that pays its way: Google Ads and paid social campaigns, audience targeting, landing pages and conversion tracking, optimised daily and reported transparently.",
    keywords: ["PPC management", "pay per click agency", "Google Ads management", "paid search", "paid social advertising", "PPC agency New York"],
    image: P.bags.image,
    imageAlt: "Shopping bags on a dark background — sales driven by paid campaigns",
  },
  hero: {
    headline: "Pay for clicks that turn into customers.",
    text: "ROI-driven PPC: Google Ads and paid social built around the right audience, ads that speak to them and landing pages that convert — tracked in real time and optimised every day.",
    tags: ["Google Ads", "Paid search", "Paid social", "Remarketing", "Landing pages", "Conversion tracking"],
    screens: ["ads", "serp", "landing"],
    cta: "Plan my campaigns",
  },
  intro: {
    ...P.bags,
    kicker: "Why paid search",
    lines: ["Traffic on day one.", "Every click", "accountable."],
    text: "PPC puts your business in front of people at the moment they search — and because every click is tracked, every dollar can be traced to the leads and sales it brought in.",
    points: ["Visibility from the day a campaign goes live", "Budget that follows what converts", "Clear numbers on what each lead costs"],
  },
  does: {
    kicker: "What PPC does",
    title: "Four levers on every campaign.",
    items: [
      { name: "Target", text: "The right audience for the right searches — by intent, location, device and time of day.", screen: "brief" },
      { name: "Create", text: "Emotionally appealing ads, written and designed for one audience and one offer.", screen: "post" },
      { name: "Convert", text: "Landing pages built for the ad, so the click lands somewhere that keeps the promise.", screen: "landing" },
      { name: "Optimize", text: "Real-time tracking and daily adjustments to bids, budgets and creative.", screen: "ads" },
    ],
  },
  showcase: {
    kicker: "PPC in practice",
    title: "One click, followed end to end.",
    text: "The ad, the page and the booking — and the dashboard that ties them together.",
    items: [
      { title: "The campaign", caption: "Campaigns, budgets and results in one view, updated through the day.", screen: "ads" },
      { title: "The ad", caption: "Creative made for the feed, aimed at one audience.", screen: "post" },
      { title: "The moment", caption: "People search at all hours — the campaign is ready when they do.", ...NYC_VIDEO },
      { title: "The landing page", caption: "Same message, same image, one clear next step.", screen: "landing" },
      { title: "The return", caption: "Spend measured against what it brings in.", ...P.analytics },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From budget to bookings.",
    stages: [
      { name: "Research", text: "Your goals, your margins and your customers' searches — and what competitors already bid on.", screen: "keywords" },
      { name: "Structure", text: "Campaigns, ad groups and audiences laid out so budget goes where intent is highest.", screen: "brief" },
      { name: "Launch", text: "Ads, extensions and landing pages go live with conversion tracking set up first.", screen: "serp" },
      { name: "Optimize", text: "Daily bid, budget and creative changes based on what actually converts.", screen: "ads" },
      { name: "Report", text: "Transparent reporting on spend, leads and cost per lead — and what we'll change next.", screen: "analytics" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "The campaign, layer by layer.",
    text: "What sits behind every click we buy for you.",
    layers: [
      { name: "The ad", text: "Search and social ads written for one intent.", screen: "serp" },
      { name: "The landing page", text: "Built for the campaign and kept fast.", screen: "landing" },
      { name: "Campaign manager", text: "Bids, budgets and audiences, adjusted daily.", screen: "ads" },
      { name: "Conversion tracking", text: "Every lead and sale traced to the click that earned it.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From spend to return.",
    screen: "ads",
    before: ["Budget spread across searches that never convert", "One generic ad for every audience", "No clear link between spend and sales"],
    actions: ["Campaigns rebuilt around intent", "Ads and pages matched to each audience", "Tracking on every lead and sale"],
    after: ["Budget concentrated where it converts", "Leads you can trace to the click", "Decisions made on real numbers"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every part of paid media.",
    items: [
      { name: "Google Ads", text: "Search, display and shopping campaigns — set up and optimised.", screen: "ads" },
      { name: "Paid social", text: "Facebook and Instagram campaigns for awareness and lead generation.", screen: "post", href: "/services/social-media-marketing", linkLabel: "Social media marketing" },
      { name: "Remarketing", text: "Bring back the people who visited but didn't book.", screen: "email" },
      { name: "Landing pages", text: "Pages built to convert the traffic you're paying for.", screen: "landing", href: "/services/conversation-rate-optimization", linkLabel: "Conversion optimization" },
      { name: "Tracking", text: "Conversion tracking and real-time reporting you can see.", screen: "analytics" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "PPC, answered.",
    items: [
      { q: "How much should we spend on Google Ads?", a: "It depends on what clicks cost in your market, your goals and how much a customer is worth to you. We'll look at your searches and competitors and recommend a starting budget — then move it toward what converts." },
      { q: "How quickly will PPC bring leads?", a: "Campaigns can bring traffic from the day they go live. The first weeks are also for learning — which searches, audiences and ads convert — so results usually improve as we optimise." },
      { q: "Do you build the landing pages too?", a: "Yes. A campaign is only as good as the page it sends people to, so we design pages for each campaign with one message and one action, and test them." },
      { q: "How often do you optimise campaigns?", a: "Continuously — bids, budgets, search terms and creative are reviewed daily with real-time tracking, and you get regular updates on what changed and why." },
      { q: "Will we own our ad accounts?", a: "Yes. Your accounts, your data and your history stay yours; we work inside them with the access you give us." },
    ],
  },
  cta: {
    kicker: "Start your campaigns",
    title: ["Ready for clicks", "that pay their way?"],
    text: "Tell us what you sell and who buys it. We'll come back with a campaign plan, a starting budget and the tracking to prove it — within a day.",
    button: "Plan my campaigns",
    image: P.towers.image,
    screen: "ads",
  },
};
