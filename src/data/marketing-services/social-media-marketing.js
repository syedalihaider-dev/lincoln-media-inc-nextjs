// /services/social-media-marketing — SMM. Source: lincolnmediainc.com/services/social-media-marketing
// (paid and organic campaigns; research and strategy teams studying ad patterns and competitors;
// LinkedIn content and lead generation; Facebook pages, posts and boosts; Instagram profiles, content
// and direct messages). Left out: platform user counts, the "+50%" case study, figures and clients.
import { P, NYC_VIDEO } from "./_shared";

export default {
  seo: {
    title: "Social Media Marketing Agency — Facebook, Instagram & LinkedIn | The Lincoln Media",
    description: "Social media marketing that brings leads, not just likes: paid and organic campaigns on Facebook, Instagram and LinkedIn, content made for each platform and community management.",
    keywords: ["social media marketing agency", "social media management", "Facebook marketing", "Instagram marketing", "LinkedIn marketing", "paid social"],
    image: P.phone.image,
    imageAlt: "A hand holding a phone showing a clean app interface",
  },
  hero: {
    headline: "Social that brings in leads, not just likes.",
    text: "Paid and organic campaigns across the platforms your customers use — content made for each feed, ads aimed at the right people and a team answering every reply.",
    tags: ["Facebook", "Instagram", "LinkedIn", "Paid social", "Short-form video", "Community"],
    screens: ["post", "ads", "reel"],
    cta: "Plan my social",
  },
  intro: {
    ...P.phone,
    kicker: "Why social",
    lines: ["Your customers", "are scrolling.", "Stop them."],
    text: "Social is one of the most cost-effective ways to reach the people you want — if the content earns its place in the feed. We research what works in your market, then build campaigns that turn attention into a steady flow of leads.",
    points: ["Reach precisely the audience you choose", "Content that earns attention, not just impressions", "Conversations that turn followers into customers"],
  },
  does: {
    kicker: "What social does",
    title: "Four jobs, every week.",
    items: [
      { name: "Strategy", text: "Research into your audience, your competitors and the ad patterns that work in your market.", screen: "brief" },
      { name: "Content", text: "Posts, stories and short-form video made for each platform.", screen: "reel" },
      { name: "Campaigns", text: "Paid campaigns aimed at the audience most likely to buy.", screen: "ads" },
      { name: "Community", text: "Comments and direct messages answered like customer service.", screen: "replies" },
    ],
  },
  showcase: {
    kicker: "Social in practice",
    title: "A campaign, frame by frame.",
    text: "Film, photography and posts — made for the feed they'll live in.",
    items: [
      { title: "The shoot", caption: "Short-form video, edited for the first two seconds.", ...P.editing },
      { title: "The post", caption: "A branded post your audience recognises before reading the name.", screen: "post" },
      { title: "The footage", caption: "The city after dark — the raw material of the campaign.", ...NYC_VIDEO },
      { title: "The story", caption: "A poll that starts a conversation.", screen: "story" },
      { title: "The numbers", caption: "Reach, engagement and leads, campaign by campaign.", screen: "analytics" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From audience to action.",
    stages: [
      { name: "Research", text: "We study your audience, your competitors and the content and ads that work in your market.", screen: "brief" },
      { name: "Plan", text: "A content calendar and a campaign plan for each platform, agreed with you.", screen: "calendar" },
      { name: "Create", text: "Posts, stories, video and ad creative, made in-house for every feed.", screen: "reel" },
      { name: "Run", text: "Organic posting, paid campaigns and every reply handled.", screen: "replies" },
      { name: "Improve", text: "We report what worked and move effort to the content and ads that convert.", screen: "analytics" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "Social, layer by layer.",
    text: "The working views behind every campaign.",
    layers: [
      { name: "Content calendar", text: "Every post planned, approved and scheduled.", screen: "calendar" },
      { name: "Ads manager", text: "Paid campaigns, budgets and audiences.", screen: "ads" },
      { name: "Monitoring", text: "Mentions and comments across platforms.", screen: "mentions" },
      { name: "Reporting", text: "Engagement and leads, tied to the campaign.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From posting to performing.",
    screen: "analytics",
    before: ["Posts that reach almost no one", "No idea which content brings customers", "Messages left unanswered"],
    actions: ["A plan for each platform and audience", "Paid campaigns behind the best content", "Every reply handled within the day"],
    after: ["Content people stop for", "Leads traced back to the campaign", "A community that trusts the brand"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every feed covered.",
    items: [
      { name: "Facebook", text: "Pages, organic posts and paid campaigns — created, boosted and managed.", screen: "post" },
      { name: "Instagram", text: "Profiles, content and direct messages handled for you.", screen: "story" },
      { name: "LinkedIn", text: "Articles and content written on your behalf, for visibility and leads.", screen: "editor" },
      { name: "Paid social", text: "Campaigns targeted at the people most likely to buy.", screen: "ads", href: "/services/pay-per-click", linkLabel: "Pay-per-click" },
      { name: "Video", text: "Short-form video made for the first two seconds.", screen: "reel" },
      { name: "Community", text: "Replies and messages answered like customer service.", screen: "replies", href: "/services/social-media-optimization", linkLabel: "Social media optimization" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Social media marketing, answered.",
    items: [
      { q: "Which platforms should my business be on?", a: "The ones your customers use. B2B brands usually get most from LinkedIn; consumer brands from Instagram and Facebook. We look at your audience and competitors and recommend where to focus." },
      { q: "Do you run paid ads or just organic posts?", a: "Both. Organic content builds the brand and the community; paid campaigns put the best of it in front of the people most likely to buy." },
      { q: "Who creates the content?", a: "Our in-house team — writers, designers and video editors — or we work with your own photos and footage." },
      { q: "Do you reply to comments and messages?", a: "Yes. Community management is part of the service: comments and direct messages are answered in your brand's voice, and anything that needs you is passed on quickly." },
      { q: "How do you measure social media success?", a: "By what matters to the business — leads, enquiries and sales traced back to campaigns — alongside reach and engagement." },
    ],
  },
  cta: {
    kicker: "Start your social",
    title: ["Ready to stop", "the scroll?"],
    text: "Tell us who you want to reach. We'll come back with a plan for each platform and the first month of content — within a day.",
    button: "Plan my social",
    image: P.dusk.image,
    screen: "analytics",
  },
};
