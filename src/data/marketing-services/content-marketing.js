// /services/content-marketing. Source: lincolnmediainc.com/services/content-marketing (storytelling and
// content writing for leads and awareness; the five-step approach — listen, understand, build around
// core issues, offer solutions, measure and repeat; content strategy, personas & journey, content
// schedules, production — writing, video, photography, infographics — outreach with creators, and
// copywriting: SEO copy, articles, product descriptions, email copy). Left out: figures and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "Content Marketing Agency — Strategy, Writing & Video Production | The Lincoln Media",
    description: "Content marketing that earns attention and leads: content strategy, audience personas, editorial calendars, writing, video and design produced in-house, outreach and SEO copywriting.",
    keywords: ["content marketing agency", "content strategy", "content writing services", "SEO copywriting", "video content production", "editorial calendar"],
    image: P.editing.image,
    imageAlt: "A video editing timeline with clips and audio tracks",
  },
  hero: {
    headline: "Stories your customers actually want to read.",
    text: "A content strategy built on what your audience needs — written, filmed and designed in-house, published on a steady schedule and measured by the leads it brings.",
    tags: ["Content strategy", "Personas & journeys", "Editorial calendar", "Writing", "Video & design", "Outreach"],
    screens: ["article", "calendar", "editor"],
    cta: "Plan my content",
  },
  intro: {
    ...P.editing,
    kicker: "Why content",
    lines: ["Ads interrupt.", "Content", "invites."],
    text: "Good content answers the questions your customers are already asking. It builds trust before the sale, supports your SEO and PR, and keeps working long after it's published.",
    points: ["Authority that makes you the obvious choice", "Traffic and links that keep coming", "Material for every other channel"],
  },
  does: {
    kicker: "What content does",
    title: "Listen. Build. Measure. Repeat.",
    items: [
      { name: "Listen", text: "Personas and journey maps built from what your audience asks, worries about and searches for.", screen: "brief" },
      { name: "Plan", text: "A content strategy for on-site and off-site, scheduled weekly or monthly with your approval.", screen: "calendar" },
      { name: "Produce", text: "Writing, video, photography and infographics by in-house writers, designers and editors.", screen: "editor" },
      { name: "Measure", text: "What each piece brings — then more of what works.", screen: "analytics" },
    ],
  },
  showcase: {
    kicker: "Content in practice",
    title: "Made in-house, end to end.",
    text: "The edit suite, the writing desk and the page it all lands on.",
    items: [
      { title: "The edit", caption: "Video cut for the site, the feed and the inbox.", ...P.editing },
      { title: "The post", caption: "One story, adapted for each platform.", screen: "post" },
      { title: "The guide", caption: "A neighbourhood guide that ranks, gets shared and sells rooms.", screen: "article" },
      { title: "The team", caption: "Writers, designers and editors planning together.", ...P.team },
      { title: "The schedule", caption: "A month of content on one calendar.", screen: "calendar" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From questions to content.",
    stages: [
      { name: "Listen", text: "We research your audience — their problems, questions and the words they use.", screen: "brief" },
      { name: "Strategize", text: "Topics, formats and channels mapped to each stage of the customer journey.", screen: "keywords" },
      { name: "Schedule", text: "An editorial calendar agreed with you, weekly or monthly.", screen: "calendar" },
      { name: "Produce", text: "Articles, video, photography and graphics made in-house.", screen: "editor" },
      { name: "Measure", text: "We track what each piece brings and repeat what works.", screen: "analytics" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "Content, layer by layer.",
    text: "The working views behind a steady stream of content.",
    layers: [
      { name: "Published", text: "The finished piece, live on your site.", screen: "article" },
      { name: "Editor", text: "Drafts written, reviewed and optimised for search.", screen: "editor" },
      { name: "Calendar", text: "What's coming, where and when.", screen: "calendar" },
      { name: "Performance", text: "Traffic, engagement and leads per piece.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From posting to publishing.",
    screen: "article",
    before: ["Blog posts written when there's time", "Topics chosen by guesswork", "No link between content and sales"],
    actions: ["A strategy built on audience research", "A steady calendar of in-house content", "Every piece tracked to its results"],
    after: ["Content that answers real questions", "Search visibility that keeps growing", "Leads that arrive already trusting you"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every kind of content.",
    items: [
      { name: "Strategy", text: "A tailored plan for on-site and off-site content.", screen: "brief" },
      { name: "Personas", text: "Audience personas and journey maps that guide every piece.", ...P.sketch },
      { name: "Writing", text: "Articles, guides, product descriptions and SEO copy.", screen: "editor", href: "/services/seo", linkLabel: "SEO" },
      { name: "Video", text: "Video editing, photography and infographics, made in-house.", ...P.editing },
      { name: "Outreach", text: "Creators and influencers on Instagram, X and LinkedIn.", screen: "post", href: "/services/public-relation-firm", linkLabel: "Public relations" },
      { name: "Email copy", text: "Newsletters and campaigns that get opened.", screen: "email", href: "/services/email-marketing", linkLabel: "Email marketing" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Content marketing, answered.",
    items: [
      { q: "Do you have your own writers?", a: "Yes. Our in-house copywriters write web content, articles, blogs and video scripts, working with our designers, illustrators and video editors." },
      { q: "How do you decide what to write about?", a: "From research into your audience — the questions they ask, the problems they have and what they search for — mapped to each stage of their journey to buying." },
      { q: "How often should we publish?", a: "Consistently, at a pace you can keep. We agree a weekly or monthly schedule with you and stick to it — quality and regularity matter more than volume." },
      { q: "Does content marketing help SEO?", a: "Yes. Useful, well-structured content is how pages earn rankings and links. We write with search in mind without writing for robots." },
      { q: "Can you produce video and graphics too?", a: "Yes — video editing, photography and infographics are made in-house alongside the writing." },
    ],
  },
  cta: {
    kicker: "Start publishing",
    title: ["Ready to be worth", "reading?"],
    text: "Tell us who your customers are. We'll come back with a content strategy and the first month's calendar — within a day.",
    button: "Plan my content",
    image: P.team.image,
    screen: "calendar",
  },
};
