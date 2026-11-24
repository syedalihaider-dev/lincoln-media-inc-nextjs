// /services/conversation-rate-optimization — CRO (the live site's own slug spelling). Source:
// lincolnmediainc.com/services/conversation-rate-optimization (website and landing-page CRO, CRO
// audits, A/B testing, custom strategy, customer research — interviews, surveys, click data —
// split-test creation, supervision and reporting, professional website review, multilingual CRO,
// counsel for active programmes). Left out: "unlimited support", figures, prices and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "Conversion Rate Optimization (CRO) Agency — A/B Testing & CRO Audits | The Lincoln Media",
    description: "Conversion rate optimization backed by research: CRO audits, customer research, heatmaps, A/B testing and landing-page optimization that turn more of your existing visitors into customers.",
    keywords: ["conversion rate optimization", "CRO agency", "A/B testing", "CRO audit", "landing page optimization", "website conversion"],
    image: P.sketch.image,
    imageAlt: "A designer sketching page wireframes on a tablet",
  },
  hero: {
    headline: "More customers from the visitors you already have.",
    text: "Research, testing and better pages: we find where your site loses people, test the fixes and keep only what proves it converts more.",
    tags: ["CRO audits", "A/B testing", "Heatmaps", "Customer research", "Landing pages", "Multilingual CRO"],
    screens: ["experiment", "heatmap", "checkout"],
    cta: "Get a CRO review",
  },
  intro: {
    ...P.sketch,
    kicker: "Why CRO",
    lines: ["Traffic is rented.", "Conversions", "are owned."],
    text: "Every visitor you already have cost something to win. CRO makes more of them count — by understanding what they need, removing what stops them and proving each change with a test.",
    points: ["Gains without buying more traffic", "Decisions made on evidence, not opinion", "Improvements that last after the test ends"],
  },
  does: {
    kicker: "What CRO does",
    title: "Four steps from leak to lift.",
    items: [
      { name: "Research", text: "Interviews, surveys and click data reveal what your visitors want and what stops them.", screen: "heatmap" },
      { name: "Review", text: "A professional review of the site that finds the gaps costing you sales and leads.", screen: "audit" },
      { name: "Test", text: "Split tests designed, built and supervised until the result is clear.", screen: "experiment" },
      { name: "Report", text: "What won, why — and the commercial gain it's worth.", screen: "analytics" },
    ],
  },
  showcase: {
    kicker: "CRO in practice",
    title: "Evidence, then change.",
    text: "Where the clicks land, what people skip and which version wins.",
    items: [
      { title: "The heatmap", caption: "Where people actually click — often not where you'd expect.", screen: "heatmap" },
      { title: "The checkout", caption: "Fewer fields and a clearer summary on the page that matters most.", screen: "checkout" },
      { title: "The sketches", caption: "Every variant starts on paper, from what the research found.", ...P.sketch },
      { title: "The test", caption: "Two headlines, one winner — decided by real visitors.", screen: "experiment" },
      { title: "The result", caption: "The gain, measured and kept.", ...P.analytics },
    ],
  },
  process: {
    kicker: "How we work",
    title: "Research. Test. Keep what wins.",
    stages: [
      { name: "Research", text: "Analytics, heatmaps, surveys and interviews show where and why people drop out.", screen: "heatmap" },
      { name: "Prioritize", text: "Ideas ranked by likely impact and effort, so the biggest leaks are fixed first.", screen: "brief" },
      { name: "Design", text: "Variants designed and built — copy, layout, forms or the whole page.", screen: "landing" },
      { name: "Test", text: "Split tests supervised until the result is statistically clear.", screen: "experiment" },
      { name: "Roll out", text: "Winners go live for everyone, and what we learned shapes the next test.", screen: "checkout" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "The testing stack, layer by layer.",
    text: "How every change is researched, tested and proven.",
    layers: [
      { name: "The page", text: "The live page and its variants.", screen: "landing" },
      { name: "Behaviour", text: "Heatmaps and recordings of real visits.", screen: "heatmap" },
      { name: "Experiments", text: "Split tests, supervised to a clear result.", screen: "experiment" },
      { name: "Analytics", text: "The funnel, from visit to sale.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From leaking to converting.",
    screen: "landing",
    before: ["A headline that doesn't say what you offer", "The button buried below the photo", "A long form that loses people halfway"],
    actions: ["Research into what visitors need", "Variants tested against the original", "Winners rolled out to everyone"],
    after: ["A page that says one thing clearly", "The next step impossible to miss", "More customers from the same traffic"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every lever on conversion.",
    items: [
      { name: "CRO audits", text: "A full review that finds the gaps in sales and leads.", screen: "audit" },
      { name: "A/B testing", text: "Split tests created, supervised and reported.", screen: "experiment" },
      { name: "Research", text: "Interviews, surveys and click data — the why behind the numbers.", screen: "heatmap" },
      { name: "Landing pages", text: "Pages optimised for one campaign and one action.", screen: "landing", href: "/services/pay-per-click", linkLabel: "Pay-per-click" },
      { name: "Multilingual", text: "Sites localised for regional audiences by translators and writers.", ...P.team },
      { name: "Counsel", text: "Support for teams already running a CRO programme.", screen: "brief" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Conversion optimization, answered.",
    items: [
      { q: "What is a CRO audit?", a: "A professional review of your site and analytics that finds where visitors drop out and why, and lists the changes most likely to increase sales or leads — ranked by impact." },
      { q: "How much traffic do we need for A/B testing?", a: "Enough for a test to reach a clear result in a reasonable time. With lower traffic we focus on research-led fixes and test the pages that matter most, like checkout or your top landing page." },
      { q: "How long does a test run?", a: "Until the result is statistically clear — usually a few weeks, depending on traffic and how big the difference between versions is. We don't call a winner early." },
      { q: "Will testing hurt our SEO?", a: "No. Tests are set up following search engines' guidance, and winners are rolled out properly so nothing is left half-changed." },
      { q: "Can you help a team that already runs CRO?", a: "Yes. We offer counsel for companies with active programmes — reviewing your research, test ideas and reporting, or running tests alongside your team." },
    ],
  },
  cta: {
    kicker: "Convert more",
    title: ["Ready to turn visits", "into customers?"],
    text: "Tell us which page matters most. We'll review it and come back with the first changes worth testing — within a day.",
    button: "Get a CRO review",
    image: P.laptop.image,
    screen: "experiment",
  },
};
