// /services/social-media-optimization — SMO. Source: lincolnmediainc.com/services/social-media-optimization
// (a brand without an in-house social team; all platforms; social media strategy and brand ethos;
// in-house content production; community management; organic, white-hat growth — no bots or fake
// followers). Left out: the "50% of revenue" statistic, the Middle East line, figures and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "Social Media Optimization (SMO) Services — Profiles, Content & Organic Growth | The Lincoln Media",
    description: "Social media optimization that builds a brand people follow: optimised profiles, a clear social strategy, in-house content, community management and organic growth with real followers — no bots.",
    keywords: ["social media optimization", "SMO services", "social media profile optimization", "organic social growth", "community management", "social media strategy"],
    image: P.swatches.image,
    imageAlt: "Colour swatches and brand sketches on a desk",
  },
  hero: {
    headline: "A social presence that looks, sounds and grows like your brand.",
    text: "A compelling social brand without an in-house team: optimised profiles, a strategy for every platform, content made in-house and organic growth with real followers.",
    tags: ["Profile optimization", "Social strategy", "Content production", "Community", "Organic growth", "All platforms"],
    screens: ["profile", "calendar", "post"],
    cta: "Optimize my social",
  },
  intro: {
    ...P.swatches,
    kicker: "Why SMO",
    lines: ["Your profile", "is your shopfront.", "Make it count."],
    text: "Before anyone buys, they look you up. SMO makes every profile clear, consistent and active — with a voice, a look and a community that make a stranger want to follow, and a follower want to buy.",
    points: ["Profiles that explain you in seconds", "One voice and look across every platform", "Growth from real people — never bots"],
  },
  does: {
    kicker: "What SMO does",
    title: "Four ways to a stronger presence.",
    items: [
      { name: "Strategy", text: "A brand-wide social strategy and a clear ethos that sets you apart from competitors.", screen: "brief" },
      { name: "Profiles", text: "Bios, links, highlights and imagery optimised so every profile works as hard as a homepage.", screen: "profile" },
      { name: "Content", text: "Images, infographics and video made in-house in your voice — or from your own media.", screen: "calendar" },
      { name: "Community", text: "Comments, posts and interactive stories that build loyalty.", screen: "replies" },
    ],
  },
  showcase: {
    kicker: "SMO in practice",
    title: "A brand, consistent everywhere.",
    text: "From the colour palette to the reply in the comments.",
    items: [
      { title: "The identity", caption: "One palette and one voice, applied to every platform.", ...P.swatches },
      { title: "The profile", caption: "A bio, highlights and a grid that say who you are at a glance.", screen: "profile" },
      { title: "The studio", caption: "Content planned and produced in-house.", ...P.studio },
      { title: "The story", caption: "Interactive formats that invite a reply.", screen: "story" },
      { title: "The plan", caption: "A month of content, on one calendar.", screen: "calendar" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From scattered to consistent.",
    stages: [
      { name: "Review", text: "We review every profile you have — and your competitors' — for gaps and inconsistencies.", screen: "profile" },
      { name: "Strategy", text: "A voice, a look and a plan for each platform, built on your brand.", screen: "brief" },
      { name: "Optimize", text: "Bios, links, highlights and imagery updated to work together.", screen: "post" },
      { name: "Publish", text: "In-house content on a steady calendar, in your brand's voice.", screen: "calendar" },
      { name: "Engage", text: "Comments, messages and stories handled daily — growth that stays organic.", screen: "replies" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "SMO, layer by layer.",
    text: "The working views behind a consistent presence.",
    layers: [
      { name: "Brand strategy", text: "Voice, look and goals for every platform.", screen: "brief" },
      { name: "Content calendar", text: "What goes out, where and when.", screen: "calendar" },
      { name: "Monitoring", text: "Mentions and conversations across platforms.", screen: "mentions" },
      { name: "Insights", text: "Growth and engagement, platform by platform.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From inconsistent to unmistakable.",
    screen: "profile",
    before: ["Profiles with different names, bios and looks", "Long gaps between posts", "Followers who never hear back"],
    actions: ["One voice and identity everywhere", "A steady calendar of in-house content", "Daily community management"],
    after: ["A brand people recognise instantly", "Organic growth from real followers", "A community that talks back"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every part of your social presence.",
    items: [
      { name: "Strategy", text: "A brand-wide strategy and ethos to stand out from competitors.", screen: "brief" },
      { name: "Profiles", text: "Optimised bios, links, highlights and imagery on every platform.", screen: "profile" },
      { name: "Content", text: "Images, infographics and video produced in-house, in your voice.", screen: "calendar", href: "/services/content-marketing", linkLabel: "Content marketing" },
      { name: "Community", text: "Comments, posts and stories that build loyalty.", screen: "replies" },
      { name: "Growth", text: "White-hat organic growth — real followers, no bots, no fakes.", screen: "analytics" },
      { name: "Platforms", text: "Instagram, X, Facebook, LinkedIn, Pinterest, Reddit, Quora, Medium and more.", ...P.phone },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Social media optimization, answered.",
    items: [
      { q: "What's the difference between SMO and social media marketing?", a: "SMO strengthens your presence itself — profiles, voice, content and community — so you grow organically. Social media marketing adds campaigns, usually paid, aimed at leads and sales. Most brands need both, and we often run them together." },
      { q: "Do you buy followers or use bots?", a: "Never. Growth is white-hat and organic: real people who follow because the content is worth it. Bought followers don't buy anything, and platforms penalise them." },
      { q: "Which platforms do you cover?", a: "All the major ones — Instagram, Facebook, X, LinkedIn, Pinterest — and community platforms such as Reddit, Quora and Medium where your audience is active." },
      { q: "Can you work with our own photos and videos?", a: "Yes. Our in-house team can create images, infographics and video, or adapt the media you already have to your new look and voice." },
      { q: "We don't have a social media team. Can you run it all?", a: "Yes — that's what SMO is for. We plan, create, publish and reply, and bring you in for approvals and anything that needs a decision." },
    ],
  },
  cta: {
    kicker: "Build your presence",
    title: ["Ready to be", "unmistakable?"],
    text: "Send us your profiles. We'll come back with a review, a strategy and a month of content to start — within a day.",
    button: "Optimize my social",
    image: P.empire.image,
    screen: "calendar",
  },
};
