// /services/online-reputation-management — ORM. Source: lincolnmediainc.com/services/online-reputation-management
// (identify and respond to reputation threats; dilute negative content and promote positives; map the
// brand's search landscape; real-time monitoring; positive content, PR and advocates; improve reviews
// and star ratings; build trust; a single bad review or unanswered account can damage credibility;
// unlock clients, partners and investors). "Removes negative content" is described here as suppressing
// and answering it — we don't promise removal. Left out: figures and clients.
import { P, NYC_VIDEO } from "./_shared";

export default {
  seo: {
    title: "Online Reputation Management (ORM) Services — Reviews & Brand Monitoring | The Lincoln Media",
    description: "Online reputation management that protects and builds trust: real-time monitoring, review management and responses, search-result clean-up with positive content, and crisis response.",
    keywords: ["online reputation management", "ORM services", "review management", "brand monitoring", "reputation repair", "online reviews"],
    image: P.team.image,
    imageAlt: "A team working together around a table of laptops",
  },
  hero: {
    headline: "What people find about you decides whether they call.",
    text: "Real-time monitoring, honest answers to every review and positive content that rises to the top — so your name earns trust wherever someone looks it up.",
    tags: ["Monitoring", "Review management", "Search results", "Positive content", "Crisis response", "Ratings"],
    screens: ["reviews", "mentions", "serp"],
    cta: "Check my reputation",
  },
  intro: {
    ...P.team,
    kicker: "Why reputation",
    lines: ["Your reputation", "is your legacy.", "Protect it."],
    text: "Customers, partners and investors look you up before they decide. A single unanswered complaint or a poor rating can undo years of good work — and a strong, visible reputation opens doors.",
    points: ["Trust that turns visitors into repeat customers", "Problems caught early, answered well", "The best of you shown first"],
  },
  does: {
    kicker: "What ORM does",
    title: "Four ways to protect a name.",
    items: [
      { name: "Monitor", text: "Real-time monitoring of what's said about you, across search, reviews, news and social.", screen: "mentions" },
      { name: "Respond", text: "Threats identified and answered quickly — complaints resolved before they spread.", screen: "reviews" },
      { name: "Promote", text: "Positive content, PR and advocates that put your best foot forward.", screen: "press" },
      { name: "Rank", text: "Your search landscape mapped, and the right pages lifted to the top.", screen: "serp" },
    ],
  },
  showcase: {
    kicker: "ORM in practice",
    title: "Listening, answering, rising.",
    text: "What gets monitored, how it's answered and what people find next time.",
    items: [
      { title: "The monitor", caption: "Every mention, with its sentiment, as it happens.", screen: "mentions" },
      { title: "The reply", caption: "A public answer that shows you listen.", screen: "replies" },
      { title: "The city", caption: "Reputation moves at the speed of a conversation.", ...NYC_VIDEO },
      { title: "The story", caption: "Positive coverage that people find first.", screen: "press" },
      { title: "The team", caption: "People who know your business, answering in your voice.", ...P.studio },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From exposed to trusted.",
    stages: [
      { name: "Map", text: "We map what people find when they search your name — results, reviews, news and social.", screen: "serp" },
      { name: "Monitor", text: "Real-time monitoring alerts us to new mentions and reviews as they appear.", screen: "mentions" },
      { name: "Respond", text: "Every review and complaint answered — fairly, quickly and in your voice.", screen: "reviews" },
      { name: "Build", text: "Positive content and coverage that tell your real story.", screen: "press" },
      { name: "Sustain", text: "Ratings and search results watched and protected over time.", screen: "analytics" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "Reputation, layer by layer.",
    text: "The working views behind a protected name.",
    layers: [
      { name: "Search results", text: "What people find when they look you up.", screen: "serp" },
      { name: "Reviews", text: "Ratings and responses across every source.", screen: "reviews" },
      { name: "Mentions", text: "News, forums and social, monitored live.", screen: "mentions" },
      { name: "Coverage", text: "Positive stories that rise to the top.", screen: "press" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From exposed to trusted.",
    screen: "reviews",
    before: ["Complaints sitting unanswered", "A rating dragged down by a few bad days", "Old negative results on page one"],
    actions: ["Every review answered, fairly and fast", "Happy customers invited to share", "Positive content built to rank"],
    after: ["A record of listening and fixing", "Ratings that reflect the real experience", "Your best story found first"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every part of reputation.",
    items: [
      { name: "Monitoring", text: "Real-time alerts across search, reviews, news and social.", screen: "mentions" },
      { name: "Reviews", text: "Responses, review generation and better star ratings.", screen: "reviews" },
      { name: "Search", text: "Negative results diluted with positive, relevant content.", screen: "serp", href: "/services/seo", linkLabel: "SEO" },
      { name: "Content", text: "Positive stories, PR and brand advocates.", screen: "press", href: "/services/public-relation-firm", linkLabel: "Public relations" },
      { name: "Social", text: "Accounts kept responsive, so no question goes unanswered.", screen: "replies" },
      { name: "Crisis", text: "A calm plan and fast response when something goes wrong.", screen: "brief" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Reputation management, answered.",
    items: [
      { q: "Can you remove negative reviews?", a: "Reviews that break a platform's rules can be reported for removal. Genuine reviews can't be erased — but a fair, prompt public reply, a fix for the problem and more reviews from happy customers change how they read." },
      { q: "How do you push down negative search results?", a: "By building and promoting positive, relevant content — your own pages, profiles, press and articles — so the results people see first tell your real story." },
      { q: "What do you monitor?", a: "Search results for your name, review sites, news, forums and social media, with real-time alerts so threats are answered early." },
      { q: "Who writes the replies to reviews?", a: "We draft replies in your voice and you approve them — or we post directly within guidelines you agree. Anything that needs your decision comes to you straight away." },
      { q: "What if we're facing a reputation crisis now?", a: "Contact us straight away. We'll assess what's being said and where, agree the response with you and start monitoring immediately." },
    ],
  },
  cta: {
    kicker: "Protect your name",
    title: ["Ready to be trusted", "first time?"],
    text: "Tell us your name and what worries you. We'll come back with what people currently find and how we'd improve it — within a day.",
    button: "Check my reputation",
    image: P.empire.image,
    screen: "reviews",
  },
};
