// /services/gmb-optimization-services — content for GMB (Google Business Profile) Optimization.
// Source: the live page (thelincolnmedia.com/services/gmb-optimization-services): hero line, the six
// service areas, "what sets us apart", the audit / keyword / content tool stack, plan deliverables,
// the four-stage process and the FAQ — restructured. Left out, per the site's content rules: prices,
// package post counts, "265+ / 325+ / 20+" figures, the "less than 6 months" and "2–3 months"
// timelines, and the industry/client claims.
// Every interface shows one fictional business, "Hollis & Vine", a Brooklyn florist — labelled as a demo.
import florist from "@public/images/gmb/florist.webp";
import counter from "@public/images/gmb/counter.webp";
import espresso from "@public/images/gmb/espresso.webp";
import crossing from "@public/images/gmb/crossing.webp";

export const GMB_PATH = "/services/gmb-optimization-services";

const DIR = "/videos/gmb";
const clip = (name, mobile = true) => ({ src: `${DIR}/${name}.mp4`, mobile: mobile ? `${DIR}/${name}-mobile.mp4` : undefined, poster: `${DIR}/${name}-poster.jpg` });

export const GMB_IMAGES = { florist, counter, espresso, crossing };

export const GMB_BUSINESS = {
  name: "Hollis & Vine",
  category: "Florist",
  area: "Carroll Gardens, Brooklyn",
  street: "212 Court St",
  hours: "Open · Closes 7 pm",
  query: "florist near me",
  note: "Demo listing · illustrative",
};

export const GMB_PAGE = {
  seo: {
    title: "GMB Optimization Services in New York | Google Business Profile Management — The Lincoln Media",
    ogTitle: "GMB Optimization Services — Google Business Profile Management | The Lincoln Media",
    description:
      "Google Business Profile (GMB) optimization from a New York digital marketing agency: local rankings on Google Maps, review and reputation management, posts, products, categories, listing monitoring and spam fighting — for one location or many.",
    keywords: ["GMB optimization services", "Google Business Profile optimization", "Google My Business management", "local SEO New York", "Google Maps ranking", "review management", "multi-location GMB"],
    image: `${DIR}/open-poster.jpg`,
    imageAlt: "A shop door sign turned to 'Come in, we're open'",
  },

  hero: {
    kicker: "GMB Optimization",
    title: ["Be the place", "they find first."],
    lead: "Maximizing your Google My Business profile for the best local success.",
    text: "Let us help you get maximum results for your business on your Google Business Profile — so the people searching nearby find you, trust you and come through the door.",
    primary: { label: "Start a project", href: "/contact-us#contact-form" },
    secondary: { label: "What we optimize", href: "#profile" },
  },

  open: {
    video: clip("open"),
    kicker: "Local search",
    title: "The sign on the door is not the first thing they see any more.",
    text: "Before anyone walks past your window, they have already found you — or a competitor — on a map. We make sure the profile they find is complete, accurate, active and worth choosing.",
  },

  moment: {
    kicker: "The moment of search",
    title: "Four taps between a search and a customer.",
    inset: clip("maps", false),
    steps: [
      { key: "search", name: "They search", text: "Someone nearby types what they need. Your categories, keywords and business details decide whether you are in the running." },
      { key: "compare", name: "They compare", text: "Three businesses on a map. Ratings, photos and fresh posts decide which one earns the tap." },
      { key: "choose", name: "They choose", text: "Your profile opens. Accurate hours, products, services and replies to reviews turn interest into trust." },
      { key: "act", name: "They act", text: "Call, directions, website. Every action is a customer — and every one is tracked in your monthly report." },
    ],
  },

  services: {
    kicker: "What we optimize",
    title: "Top-notch GMB services, tailored to your business.",
    text: "Six disciplines, each tied to a part of your profile. Choose one to see where it works.",
    items: [
      { key: "rank", name: "Local rankings", text: "Boost your business's visibility on Google Maps and local search results with expert optimization strategies, ensuring more customers find you first." },
      { key: "reviews", name: "Brand reputation", text: "Strengthen your online credibility with proactive reputation management, customer review strategies and trust-building techniques that help you stand out from competitors." },
      { key: "posts", name: "Engage & captivate", text: "Keep potential customers engaged with compelling posts, promotions and updates that enhance your Google Business Profile and drive more interactions." },
      { key: "details", name: "Expert optimization", text: "Optimize every aspect of your listing with targeted keywords, accurate business details and category enhancements for maximum reach." },
      { key: "products", name: "Products & services", text: "Showcase your offerings with detailed product and service descriptions, pricing and high-quality visuals that attract more leads." },
      { key: "guard", name: "Monitoring & spam fighting", text: "Protect your listing from fake reviews, unauthorized changes and spam attacks with continuous monitoring and Google-compliant reporting." },
    ],
  },

  apart: {
    kicker: "Your go-to digital marketing agency in NY",
    title: "What sets our GMB optimization apart.",
    text: "Expertise, transparency and a data-driven approach. We focus on improving local rankings, enhancing brand reputation and driving customer engagement through strategic profile management — measured against the indicators that matter to your business.",
    image: florist,
    imageAlt: "A florist in her shop checking orders on a tablet among fresh flowers",
    points: [
      { name: "Data-driven GMB strategies", text: "No guesswork. Every recommendation is backed by data analysis, competitor research and continuous monitoring." },
      { name: "Complete transparency", text: "Clear insights, detailed reports and honest communication, so you can follow progress every step of the way." },
      { name: "Commitment to your KPIs", text: "We agree the measures that matter — calls, directions, visits, leads — and manage the profile toward them." },
    ],
  },

  locality: {
    kicker: "Audit · keywords · content",
    title: "Rankings are local. So is our research.",
    text: "Where a searcher stands changes what they see. We audit your visibility across the neighbourhood, research the words your customers really use, and plan content that grows your organic reach in your locality.",
    tools: [
      { name: "GMB audit", text: "Every field, category, photo and review checked against the businesses that outrank you." },
      { name: "Keyword research", text: "The searches people make around you — services, products and neighbourhood names." },
      { name: "Content strategy", text: "Posts, photos, Q&A and product copy planned to cover those searches, week by week." },
    ],
    legend: ["Strong", "Within reach", "Needs work"],
  },

  month: {
    kicker: "What's included",
    title: "A month on your profile.",
    text: "Optimization is not a one-off. Here is what a managed month looks like.",
    deliverables: [
      { name: "Weekly content updates", key: "post" },
      { name: "Labels & category optimization", key: "cat" },
      { name: "Photo & media optimization", key: "photo" },
      { name: "Insights analysis and adjustments", key: "insight" },
      { name: "Listing monitoring", key: "watch" },
      { name: "Business hours optimization", key: "hours" },
      { name: "Profile setup & creation, if required", key: "setup" },
      { name: "Verification assistance, if required", key: "verify" },
      { name: "Monthly performance report", key: "report" },
    ],
  },

  locations: {
    video: clip("neighbourhood"),
    kicker: "Multiple locations",
    title: "One brand. Every neighbourhood.",
    text: "We optimize profiles for businesses with many locations — consistent branding everywhere, with each profile tailored to its own area so it wins its own local searches.",
    places: [
      { area: "Carroll Gardens", street: "212 Court St", hours: "Closes 7 pm", note: "Wedding & event flowers" },
      { area: "Park Slope", street: "88 7th Ave", hours: "Closes 8 pm", note: "Same-day delivery" },
      { area: "Williamsburg", street: "141 Bedford Ave", hours: "Closes 9 pm", note: "Plants & workshops" },
      { area: "Upper West Side", street: "402 Amsterdam Ave", hours: "Closes 7 pm", note: "Corporate subscriptions" },
    ],
  },

  process: {
    kicker: "Our process",
    title: "A route we have driven many times.",
    text: "A New York digital marketing company you can count on for result-driven, sustainable practice — in four stops.",
    stops: [
      { name: "Workshops", items: ["Business analysis", "Campaign objective", "Preparing proposal", "Deciding deliverables"] },
      { name: "Planning", items: ["Industry research", "Competitor research", "Selecting marketing channels", "Strategy development"] },
      { name: "A/B testing", items: ["Experimenting with posts and offers", "Experimenting with content", "Testing local SEO techniques", "Analyzing audience behavior"] },
      { name: "Execution", items: ["Creating the campaign", "Content production", "Strategy optimization", "Analysis and reporting"] },
    ],
  },

  faq: {
    kicker: "Questions",
    title: "GMB optimization, answered.",
    items: [
      { q: "What makes your GMB optimization services different?", a: "Our services are tailored to the specific needs of your business, so your Google Business Profile stands out in local search results. We focus on strategic optimization, using data-driven insights to improve visibility, drive engagement and generate measurable results across all of your target locations." },
      { q: "How long does it take to see results from GMB optimization?", a: "Some improvements — accurate details, better categories, fresh photos and posts — show on your profile straight away, and engagement often follows. Consistently ranking higher in local searches builds over months of ongoing optimization, which is why we report on progress every month." },
      { q: "Do you provide ongoing support for GMB optimization?", a: "Yes. Ongoing management is a core part of our GMB services: we keep your profile updated with fresh content, monitor performance, respond to reviews and refine the strategy so your business keeps its edge in local search." },
      { q: "How do you optimize my Google Business Profile for better visibility?", a: "We focus on the factors that matter: accurate business information, strategic use of keywords, high-quality photos, engaging posts and review management. Improving these together raises your profile's visibility in local searches and on Google Maps." },
      { q: "Can you optimize GMB profiles for multiple locations?", a: "Yes. We specialize in businesses with multiple locations, keeping branding consistent while tailoring each profile to its own area to maximize visibility and engagement in every neighbourhood." },
      { q: "Can you set up and verify a new profile?", a: "Yes. If your business does not have a profile yet, or needs to claim one, profile setup and verification assistance are part of what we do." },
    ],
  },

  cta: {
    video: clip("evening"),
    kicker: "Start a project",
    title: ["Light up", "your corner of the map."],
    text: "Tell us about your business and where your customers are. We'll come back with an audit and a plan.",
    primary: { label: "Get your GMB plan", href: "/contact-us#contact-form" },
  },
};

export const GMB_OFFERS = GMB_PAGE.services.items.map((i) => ({ name: i.name, text: i.text }));
