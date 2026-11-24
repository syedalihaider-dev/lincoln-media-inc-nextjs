// /services/digital-marketing — the Digital Marketing category page.
// Source: lincolnmediainc.com/services/digital-marketing (restructured) and this repo's own copy.
// "(live)" marks wording taken from the live page. Left out on purpose (see project rules): the live
// figures (265+ / 325+ / 20+ years, "70% of marketers", "400% email ROI", "60% mobile"), AED prices,
// timelines, named clients, the industries grid and the live FAQ (web-design boilerplate). The FAQ
// below answers marketing questions only, from what the live page says the team does.
//
// Every interface on the page follows ONE demo campaign — "Yourbrand", a fictional Midtown hotel —
// from search and ads through social, the landing page and the booking. Figures inside those
// interfaces are illustrative demo-account data, labelled as such on the page; they are never
// presented as Lincoln Media results.
import imgOg from "@public/images/services/digital-marketing.jpg";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";
import imgLaptop from "@public/images/home/laptop-glow.jpg";
import imgEdit from "@public/images/services/video-animation.jpg";
import imgSketch from "@public/images/services/ui-ux-design.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgCharts from "@public/images/services/digital-marketing.jpg";
import { SERVICE_CATEGORIES } from "@/data/service-categories";

export const DM_PATH = "/services/digital-marketing";

// The ten marketing services, at the live site's own slugs (header menu → Digital Marketing)
export const DM_SERVICES = SERVICE_CATEGORIES.find((c) => c.key === "marketing").items.filter((i) => i.href);

// The story the page tells, in order — the fixed rail names the chapter you are in
export const DM_STORY = ["Attention", "Strategy", "Traffic", "Engagement", "Conversion", "Measurement", "Optimization", "Growth"];

export const DM_PAGE = {
  seo: {
    title: "Digital Marketing Agency — SEO, PPC, Social & Content | The Lincoln Media",
    description:
      "Digital marketing that turns attention into growth: SEO, pay-per-click, social media, content, email and conversion optimization, planned as one strategy and measured from the first click to the customer.",
    keywords: ["digital marketing agency", "digital marketing services", "SEO services", "PPC management", "social media marketing", "content marketing", "conversion rate optimization", "digital marketing agency New York"],
    image: imgOg,
    imageAlt: "A marketing analytics dashboard showing traffic, page load and bounce-rate charts",
  },

  hero: {
    kicker: "Digital Marketing",
    title: ["Digital Marketing", "that moves business forward"],
    lead: "Bespoke, multi-channel campaigns for businesses big and small — strategy, creativity, data and performance working as one, so attention turns into revenue.", // (live intro, restructured)
    pillars: ["Strategy", "Creativity", "Data", "Performance"],
    primary: { label: "Plan my growth", href: "/#contact" },
  },

  attention: {
    kicker: "How growth happens",
    words: [
      { word: "Attention", text: "Be found where people are already looking — in search, in their feeds and on the sites they read." },
      { word: "Engagement", text: "Give them a reason to stay: content, creative and conversations worth their time." },
      { word: "Conversion", text: "Turn interest into action with pages, offers and journeys built to convert." },
    ],
  },

  ecosystem: {
    kicker: "The ecosystem",
    title: "Every channel, one strategy.",
    text: "Media specialists, digital strategists, SEO specialists and content marketers under the same roof — so every channel is planned together and each one makes the next work harder.", // (live)
    nodes: [
      { name: "Strategy", screen: "brief", text: "Goals, audiences and a measurable plan, agreed before anything is spent." },
      { name: "SEO", screen: "serp", text: "Search visibility built on technical health, useful content and authority." },
      { name: "Paid Media", screen: "ads", text: "Google and Facebook campaigns aimed at brand awareness and lead generation." }, // (live)
      { name: "Social", screen: "post", text: "Content and conversation that turn cold leads into customers." }, // (live)
      { name: "Content", screen: "editor", text: "Articles, guides and creative that engage visitors and build authority." }, // (live)
      { name: "Analytics", screen: "analytics", text: "One view of every channel, so budget follows what actually works." },
      { name: "Conversion", screen: "checkout", text: "Landing pages and journeys that turn all of that attention into action." },
    ],
  },

  video: {
    kicker: "Campaigns in motion",
    title: ["Marketing is", "no longer static."],
    text: "Audiences move between search, social, video and email in minutes. Campaigns have to move with them — launched, read, adjusted and improved while they run.",
    src: "/videos/nyc-night.mp4",
    mobileSrc: "/videos/nyc-night-mobile.mp4",
    poster: "/videos/nyc-night-poster.jpg",
  },

  performance: {
    kicker: "Performance",
    title: "Marketing activity, measured as business outcomes.",
    steps: [
      { name: "Traffic", text: "Where visitors come from, channel by channel — and which sources deserve more of the budget." },
      { name: "Engagement", text: "What people do once they arrive: the pages they read, the time they stay, the content that holds them." },
      { name: "Conversion", text: "How many visits become enquiries, bookings or sales — and where the journey loses people." },
      { name: "Acquisition", text: "What each new customer costs, campaign by campaign, so every dollar can be defended." },
    ],
  },

  search: {
    kicker: "Search engine optimization",
    title: "Be the answer when they search.",
    query: "boutique hotel midtown manhattan",
    steps: [
      { name: "Search", text: "Someone types the question your business answers." },
      { name: "Discovery", text: "Results appear — the technical work, content and authority decide who is near the top." },
      { name: "Click", text: "A clear title and description earn the click over the results around it." },
      { name: "Experience", text: "A fast, useful page keeps the promise the result made." },
      { name: "Conversion", text: "The visit ends in an enquiry, a booking or a sale." },
    ],
  },

  paid: {
    kicker: "Paid media",
    title: ["Ad", "Landing page", "Action"],
    text: "Google and Facebook paid campaigns for brand awareness and lead generation — with the landing page designed as part of the ad, so the click lands somewhere that keeps the promise.", // (live, extended)
    stages: [
      { name: "The ad", text: "Creative and copy written for one audience and one intent." },
      { name: "The landing page", text: "The same message, the same image, one clear next step." },
      { name: "The action", text: "The booking, the lead or the sale — tracked back to the ad that earned it." },
    ],
  },

  social: {
    kicker: "Social media & content",
    title: "Stories made for the feed.",
    text: "Social engagement builds the awareness that turns cold leads into customers. We plan, create and run content made for each platform — then answer the people who reply.", // (live, extended)
    beats: [
      { name: "Short-form video", text: "Vertical video made for the first two seconds." },
      { name: "Branded posts", text: "A consistent look your audience recognises before they read the name." },
      { name: "Stories & polls", text: "Light-touch formats that start a conversation." },
      { name: "Community", text: "Replies, messages and reviews handled like customer service." },
    ],
  },

  content: {
    kicker: "Content that moves",
    words: [
      { word: "Create", text: "Content strategists, writers and designers making work people want to read and watch.", image: imgEdit, alt: "A video editing timeline with clips and audio tracks" },
      { word: "Capture", text: "Formats built to stop the scroll and earn the first few seconds of attention.", image: imgSketch, alt: "A designer sketching wireframes on a tablet beside a keyboard and mouse" },
      { word: "Connect", text: "The right message for each audience, on the channels they already use.", image: imgTeam, alt: "A team working together at a long table of laptops and phones" },
      { word: "Convert", text: "Every piece with a purpose and a next step — and a number that shows it worked.", image: imgCharts, alt: "An analytics dashboard showing traffic and bounce-rate charts" },
    ],
  },

  journey: {
    kicker: "From click to customer",
    title: "One journey, five decisions.",
    stages: [
      { name: "Discovery", text: "A short video in their feed puts the brand in front of them for the first time.", screen: "reel" },
      { name: "Interest", text: "A search later, a useful guide answers their question — and the brand again.", screen: "article" },
      { name: "Consideration", text: "They compare rooms, read reviews and look for a reason to choose.", screen: "compare" },
      { name: "Action", text: "A short, clear checkout turns the decision into a booking.", screen: "checkout" },
      { name: "Loyalty", text: "A well-timed email brings them back — and they tell someone else.", screen: "email" },
    ],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "What we do, channel by channel.",
    items: [
      { word: "SEO", name: "Search Engine Optimization", text: "Custom SEO plans that fit your business — technical health, content and authority, with measurable results.", visual: "serp", href: "/services/seo" }, // (live)
      { word: "PPC", name: "Pay Per Click", text: "Google and Facebook paid campaigns for awareness and lead generation, managed bid by bid.", visual: "ads", href: "/services/pay-per-click" }, // (live)
      { word: "Social", name: "Social Media Marketing", text: "Content, community and paid social that turn cold leads into customers.", visual: "post", href: "/services/social-media-marketing" }, // (live)
      { word: "Content", name: "Content Marketing", text: "Content strategists and writers producing work that engages visitors and builds authority.", visual: "editor", href: "/services/content-marketing" }, // (live)
      { word: "CRO", name: "Conversion Optimization", text: "Testing and refining the journey so more of the visitors you already have become customers.", visual: "experiment", href: "/services/conversation-rate-optimization" },
      { word: "Analytics", name: "Analytics & Reporting", text: "Tracking set up properly, and reports that say what happened, why, and what to do next.", visual: "analytics" },
      { word: "Strategy", name: "Campaign Strategy", text: "Positioning, audiences and a channel plan everyone signs off on — before a dollar is spent.", visual: "brief" },
      { word: "Landing", name: "Landing Page Optimization", text: "Pages built for one campaign and one action, kept fast and tested over time.", visual: "landing", href: "/services/landing-page-design" },
    ],
  },

  growth: {
    kicker: "The growth loop",
    title: "Every result feeds the next campaign.",
    stages: [
      { name: "Attract", text: "Search, paid and social bring the right people in.", screen: "serp" },
      { name: "Engage", text: "Content and creative give them a reason to stay.", screen: "article" },
      { name: "Convert", text: "A clear page and a short form turn interest into action.", screen: "checkout" },
      { name: "Measure", text: "Every step is tracked from the first click to the sale.", screen: "analytics" },
      { name: "Optimize", text: "We test what could work better and keep what does.", screen: "experiment" },
      { name: "Grow", text: "Budget moves to what works — and the loop starts again, stronger.", screen: "ads" },
    ],
  },

  cinematic: {
    kicker: "The team behind it",
    title: ["Real people.", "Real strategy."],
    text: "Behind every campaign is a team that learns your business — planning, writing, designing and analysing together, and explaining the results in plain language.",
    image: imgStudio,
    alt: "A strategist reviewing an interface on a large monitor in a dimly lit studio",
  },

  faq: {
    kicker: "Questions",
    title: "Digital marketing, answered.",
    items: [
      { q: "What digital marketing services do you provide?", a: "Search engine optimization, pay-per-click advertising, social media marketing and optimization, content marketing, email marketing, conversion rate optimization, online reputation management, app store optimization and PR — planned together as one strategy rather than sold as separate packages." },
      { q: "How do you build a digital marketing strategy?", a: "We start with your goals, your customers and where you stand today: your site, your search visibility, your competitors and the channels you already use. From that we write a plan that names the audiences, the channels, the message and the measures of success — and agree it with you before anything is spent." },
      { q: "Do you provide both SEO and PPC?", a: "Yes. They work best together: paid search brings visibility and data from day one, while SEO builds visibility you don't pay for per click. What we learn from the ads — which searches convert — feeds the SEO plan, and the other way round." },
      { q: "How long does SEO take?", a: "SEO compounds over months rather than days. How quickly it moves depends on your site's current health, your content and how competitive your searches are. We set out what to expect in the plan and report progress as it happens, so you can see the direction early." },
      { q: "Can you manage our social media campaigns?", a: "Yes — organic and paid. We plan the calendar, create the posts, short-form video and stories, run the paid campaigns and handle the replies, messages and reviews that come back." },
      { q: "How do you measure campaign performance?", a: "We set up tracking before a campaign starts, so every visit, enquiry and sale can be traced back to the channel and campaign that earned it. Reports focus on business outcomes — leads, bookings, sales and what each one cost — not on vanity numbers." },
      { q: "Do you optimize landing pages?", a: "Yes. Paid and email campaigns land on pages built for that campaign: one message, one action, fast to load. We then test headlines, layouts and forms to find what converts better." },
      { q: "How do you improve conversions?", a: "By finding where people drop out of the journey — with analytics, recordings and testing — and fixing the biggest leaks first: clearer messaging, faster pages, shorter forms, stronger calls to action. Every change is tested so we keep only what works." },
      { q: "Do you provide analytics and reporting?", a: "Yes. You get regular reports that explain what happened, why it happened and what we will do next, and we're always available to walk you through them." },
    ],
  },

  cta: {
    kicker: "Grow with purpose",
    title: ["Ready to turn attention", "into growth?"],
    text: "Tell us where you want to grow. Reach out to our team and we'll get back to you within a day.", // (live CTA)
    primary: { label: "Start a project", href: "/#contact" },
    image: imgLaptop,
  },
};
