// /services/public-relation-firm — Public Relations (the live site's own slug). Source:
// lincolnmediainc.com/services/public-relation-firm (PR for brands of every size through storytelling
// across traditional and social media; multi-channel, data-based, audience-focused content; a 360-degree
// agency with in-house copywriters, branding experts, designers and PR consultants; PR for tech,
// start-ups, B2B and corporate firms and many other industries, with a custom strategy per brand).
// Left out: "recognised as one of the best PR firms", figures and clients. The publication in the
// demo interface is fictional.
import { P, NYC_VIDEO } from "./_shared";

export default {
  seo: {
    title: "Public Relations (PR) Agency — Media Relations & Digital PR | The Lincoln Media",
    description: "Public relations built on storytelling: media relations, press releases, digital PR, thought leadership and coverage monitoring for tech, B2B, start-up and corporate brands.",
    keywords: ["public relations agency", "PR firm", "digital PR", "media relations", "press release services", "PR agency New York"],
    image: P.towers.image,
    imageAlt: "Glass office towers seen from street level",
  },
  hero: {
    headline: "Your story, told where it carries weight.",
    text: "Storytelling across traditional and social media — the right story, the right outlets and the people who read them — from a team of PR consultants, writers and designers under one roof.",
    tags: ["Media relations", "Press releases", "Digital PR", "Thought leadership", "Social PR", "Monitoring"],
    screens: ["press", "mentions", "post"],
    cta: "Plan my PR",
  },
  intro: {
    ...P.studio,
    kicker: "Why PR",
    lines: ["Advertising is", "what you say.", "PR is what they say."],
    text: "Coverage, commentary and word of mouth carry a trust no ad can buy. Good PR finds the story only you can tell and puts it in front of the people whose opinion counts.",
    points: ["Credibility earned through third parties", "Visibility with customers, partners and investors", "A reputation that supports every other channel"],
  },
  does: {
    kicker: "What PR does",
    title: "Four parts of every story.",
    items: [
      { name: "Story", text: "Finding the angle — the news, the insight or the human story only you can tell.", screen: "brief" },
      { name: "Content", text: "Releases, articles and multi-channel content — data-based and audience-focused.", screen: "editor" },
      { name: "Outreach", text: "The right journalists, outlets and creators, approached with the right story.", screen: "press" },
      { name: "Monitor", text: "Coverage and conversation tracked as the story travels.", screen: "mentions" },
    ],
  },
  showcase: {
    kicker: "PR in practice",
    title: "A story, from pitch to page.",
    text: "Where it starts, where it lands and how far it travels.",
    items: [
      { title: "The coverage", caption: "A feature in the publication your customers read.", screen: "press" },
      { title: "The city", caption: "Stories travel — across news, social and conversation.", ...NYC_VIDEO },
      { title: "The newsroom", caption: "Copywriters, designers and PR consultants under one roof.", ...P.team },
      { title: "The share", caption: "The story carried into social, where it keeps travelling.", screen: "post" },
      { title: "The reach", caption: "Mentions and sentiment, tracked as coverage lands.", screen: "mentions" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From story to coverage.",
    stages: [
      { name: "Discover", text: "We learn your business, your market and what makes you newsworthy.", screen: "brief" },
      { name: "Story", text: "The angles and messages that matter to journalists and your audience.", screen: "editor" },
      { name: "Pitch", text: "Tailored pitches to the right outlets, journalists and creators.", screen: "email" },
      { name: "Coverage", text: "Interviews, features and releases — published where it counts.", screen: "press" },
      { name: "Amplify", text: "Coverage shared across your channels, monitored and reported.", screen: "mentions" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "PR, layer by layer.",
    text: "The working views behind every story we place.",
    layers: [
      { name: "Coverage", text: "The story, published.", screen: "press" },
      { name: "Monitoring", text: "Mentions and sentiment across media.", screen: "mentions" },
      { name: "Content", text: "Releases and articles in the making.", screen: "editor" },
      { name: "Reporting", text: "Reach and response, story by story.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From unknown to quoted.",
    screen: "press",
    before: ["A strong business nobody is writing about", "News shared only on your own channels", "No voice in your industry's conversation"],
    actions: ["A story worth telling, sharply framed", "Pitches tailored to the right outlets", "Coverage amplified across your channels"],
    after: ["Your name in the publications that matter", "Credibility earned through others", "A voice your industry listens to"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every part of public relations.",
    items: [
      { name: "Media", text: "Relationships with journalists and outlets, and pitches tailored to them.", screen: "press" },
      { name: "Releases", text: "Press releases and announcements written to be picked up.", screen: "editor" },
      { name: "Digital PR", text: "Multi-channel, data-based content that earns links and coverage.", screen: "article", href: "/services/content-marketing", linkLabel: "Content marketing" },
      { name: "Leadership", text: "Articles, interviews and commentary that make you a voice in your field.", ...P.studio },
      { name: "Social PR", text: "Stories carried into social media and creator channels.", screen: "post", href: "/services/social-media-marketing", linkLabel: "Social media marketing" },
      { name: "Monitoring", text: "Coverage, mentions and sentiment, tracked and reported.", screen: "mentions", href: "/services/online-reputation-management", linkLabel: "Reputation management" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Public relations, answered.",
    items: [
      { q: "What kind of businesses do you do PR for?", a: "Brands of every size — tech, start-ups, B2B and corporate firms, as well as retail, healthcare, real estate, construction, fashion and beauty, travel and hospitality — each with its own strategy." },
      { q: "Can you guarantee media coverage?", a: "No honest PR agency can — editors decide what they publish. What we do is find genuinely newsworthy angles and pitch them to the outlets most likely to care, which is what earns coverage." },
      { q: "What's digital PR?", a: "PR that lives online: stories, data and content placed on news sites, blogs and social channels — which also earns links that help your SEO." },
      { q: "Do you write press releases?", a: "Yes. Our in-house copywriters write releases, articles and statements, and our designers produce any visuals the story needs." },
      { q: "How do you measure PR?", a: "By where coverage lands and who it reaches, the sentiment around your name, links and traffic from coverage, and the enquiries that follow." },
    ],
  },
  cta: {
    kicker: "Tell your story",
    title: ["Ready to be", "in the story?"],
    text: "Tell us what makes your business different. We'll come back with the angles worth pitching and where we'd take them — within a day.",
    button: "Plan my PR",
    image: P.towers.image,
    screen: "mentions",
  },
};
