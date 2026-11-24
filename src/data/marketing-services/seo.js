// /services/seo — Search Engine Optimization. Source: lincolnmediainc.com/services/seo (its six
// services: on-page, off-page, SEO audit, keyword research & content strategy, content writing, US SEO;
// "data-driven", "highly transparent"). Left out: the "first page in under 6 months" promise,
// "guaranteed organic reach", figures, prices and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "SEO Services — Search Engine Optimization Agency in New York | The Lincoln Media",
    description: "SEO services built on data: technical audits, on-page and off-page SEO, keyword research and content strategy, with transparent reporting on rankings, traffic and leads.",
    keywords: ["SEO services", "search engine optimization agency", "SEO audit", "on-page SEO", "off-page SEO", "keyword research", "SEO company New York"],
    image: P.analytics.image,
    imageAlt: "An analytics dashboard showing search traffic and page performance",
  },
  hero: {
    headline: "Be found first by the people already looking for you.",
    text: "Technical health, useful content and real authority — a data-driven SEO plan that grows your visibility, your traffic and the enquiries that come from it, reported in plain language.",
    tags: ["On-page SEO", "Off-page SEO", "SEO audits", "Keyword research", "Content writing", "Local & US SEO"],
    screens: ["keywords", "serp", "audit"],
    cta: "Get an SEO plan",
  },
  intro: {
    ...P.developer,
    kicker: "Why search matters",
    lines: ["Search is where", "intent lives.", "Be the answer."],
    text: "When someone searches for what you sell, they've already decided they need it. SEO makes sure the result they choose is yours — and that the page they land on keeps the promise the result made.",
    points: ["Visibility you don't pay for per click", "Traffic that arrives already interested", "Authority that compounds over time"],
  },
  does: {
    kicker: "What SEO does",
    title: "Four kinds of work, one ranking.",
    items: [
      { name: "Audit", text: "A research-based audit of your site — crawlability, speed, structure and content — with every fix prioritised by impact.", screen: "audit" },
      { name: "On-page", text: "Titles, meta descriptions, headings, URLs and internal links tuned so each page clearly answers one search.", screen: "editor" },
      { name: "Off-page", text: "High-quality backlinks and referrals earned from relevant sites — authority search engines trust.", screen: "mentions" },
      { name: "Measure", text: "Rankings, traffic and the enquiries they bring, tracked and reported openly so you always know what moved.", screen: "keywords" },
    ],
  },
  showcase: {
    kicker: "SEO in practice",
    title: "From a search to a booking.",
    text: "The work behind one result: the audit that cleared the way, the page that earned the click and the numbers that proved it.",
    items: [
      { title: "The data", caption: "Every decision starts in the analytics — which pages earn visits and which lose them.", ...P.analytics },
      { title: "The result", caption: "A clear title and description that earn the click on a phone.", screen: "serp" },
      { title: "The technical work", caption: "Speed, structure and clean code — the part of SEO nobody sees.", ...P.code },
      { title: "The tracking", caption: "Positions for the searches that matter, week by week.", screen: "keywords" },
      { title: "The content", caption: "Guides that answer real questions and rank for them.", screen: "article" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "A plan you can see working.",
    stages: [
      { name: "Audit", text: "We crawl the site, study your search data and competitors, and list what's holding you back.", screen: "audit" },
      { name: "Research", text: "Keyword research maps what your customers search for, by intent — and which searches you can win.", screen: "keywords" },
      { name: "Optimize", text: "Technical fixes and on-page work go live in order of impact, page by page.", screen: "editor" },
      { name: "Authority", text: "Content and outreach earn the links and mentions that build trust with search engines.", screen: "mentions" },
      { name: "Report", text: "Transparent reporting on rankings, traffic and leads — and the plan for next month.", screen: "analytics" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "The SEO stack, layer by layer.",
    text: "Four working views, one picture of your search performance.",
    layers: [
      { name: "Search results", text: "What your customers actually see — and where you sit in it.", screen: "serp" },
      { name: "Rank tracking", text: "Daily positions for the searches that bring business.", screen: "keywords" },
      { name: "Site audit", text: "Technical health, checked continuously, issues ranked by impact.", screen: "audit" },
      { name: "Analytics", text: "Organic traffic and the enquiries it leads to.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From buried to found.",
    screen: "serp",
    before: ["Pages that search engines struggle to crawl", "Titles that don't match what people search", "Competitors answering your customers' questions"],
    actions: ["Technical fixes, ranked by impact", "Pages rewritten around real search intent", "Content and links that build authority"],
    after: ["Your pages in the results that matter", "Clicks from people already looking to buy", "Visibility that keeps compounding"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything search needs.",
    items: [
      { name: "On-page SEO", text: "Meta descriptions, titles, URLs and structure optimised page by page.", screen: "editor" },
      { name: "Off-page SEO", text: "Quality backlinks and referrals from sites your customers trust.", screen: "mentions" },
      { name: "SEO audits", text: "A research-based audit report — and the fixes, done.", screen: "audit" },
      { name: "Keywords", text: "Keyword research and a content strategy for awareness and leads.", screen: "keywords" },
      { name: "Content", text: "SEO-friendly writing by people who know the subject.", screen: "article", href: "/services/content-marketing", linkLabel: "Content marketing" },
      { name: "Local SEO", text: "Strategies built for the US market and the cities you serve.", screen: "serp" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "SEO, answered.",
    items: [
      { q: "What does an SEO audit include?", a: "A crawl of your whole site plus a review of your search data and competitors. You get a report of technical issues, content gaps and link opportunities — each ranked by its likely impact — and we can carry out the fixes for you." },
      { q: "How long does SEO take to work?", a: "SEO compounds over months rather than days. How quickly it moves depends on your site's current health, your content and how competitive your searches are. We set expectations in the plan and report progress as it happens, so you can see the direction early." },
      { q: "Do you use white-hat SEO only?", a: "Yes. We follow search engines' guidelines — useful content, a sound technical base and links earned from relevant sites — because shortcuts put your visibility at risk." },
      { q: "What's the difference between on-page and off-page SEO?", a: "On-page SEO is everything on your own site: content, titles, meta descriptions, URLs, speed and structure. Off-page SEO is your reputation elsewhere — mainly links and mentions from other sites that tell search engines you can be trusted." },
      { q: "How will I know it's working?", a: "You'll see your rankings for the searches that matter, your organic traffic and the enquiries or sales it brings — reported openly, with what we did and what comes next." },
      { q: "Can SEO and paid search work together?", a: "Yes, and they work best together. Paid search gives visibility and data from day one; SEO builds visibility you don't pay for per click. Searches that convert in your ads tell us what to prioritise in SEO." },
    ],
  },
  cta: {
    kicker: "Get found",
    title: ["Ready to be", "found first?"],
    text: "Tell us what your customers search for. We'll come back with an audit, a plan and the first fixes to make — and we reply within a day.",
    button: "Get an SEO plan",
    image: P.laptop.image,
    screen: "keywords",
  },
};
