// /services/email-marketing. Source: lincolnmediainc.com/services/email-marketing (ROI-driven email
// and marketing automation; build customer loyalty; reach B2C and B2B audiences with automated,
// personalised messages, discounts and codes; track click-through, bounce and conversion rates;
// template design, copy, campaign and lead management). Left out: the 61% / 83% / "400% ROI" /
// "12x" figures, prices and clients.
import { P } from "./_shared";

export default {
  seo: {
    title: "Email Marketing Agency — Campaigns, Automation & Newsletters | The Lincoln Media",
    description: "Email marketing that builds loyalty and sales: campaign strategy, template design, copywriting, automation and segmentation, with reporting on opens, clicks and conversions.",
    keywords: ["email marketing agency", "email marketing services", "marketing automation", "email newsletter design", "email campaigns", "email automation"],
    image: P.developer.image,
    imageAlt: "Hands typing on a keyboard beside a laptop",
  },
  hero: {
    headline: "The channel you own, working for you every day.",
    text: "Email that people open: campaigns and automations that reach the right customer with the right message — designed, written, sent and measured for you.",
    tags: ["Campaigns", "Automation", "Segmentation", "Template design", "Copywriting", "Reporting"],
    screens: ["email", "automation", "analytics"],
    cta: "Plan my email",
  },
  intro: {
    ...P.developer,
    kicker: "Why email",
    lines: ["No algorithm.", "No auction.", "Just your list."],
    text: "Email reaches people who've already asked to hear from you — without paying for every view. Done well, it turns first-time buyers into regulars and regulars into advocates.",
    points: ["A direct line to customers you've already won", "Messages personalised to each segment", "Results you can measure to the click"],
  },
  does: {
    kicker: "What email does",
    title: "Four parts of every send.",
    items: [
      { name: "Strategy", text: "Who to email, what to say and when — mapped to the customer's journey.", screen: "brief" },
      { name: "Design", text: "Templates designed and coded to look right in every inbox.", screen: "email" },
      { name: "Automate", text: "Journeys that send the right message at the right moment, automatically.", screen: "automation" },
      { name: "Measure", text: "Click-through, bounce and conversion rates — read and acted on by specialists.", screen: "analytics" },
    ],
  },
  showcase: {
    kicker: "Email in practice",
    title: "One guest, one journey.",
    text: "From the thank-you after a stay to the offer that brings them back.",
    items: [
      { title: "The email", caption: "A personal welcome back, with the member rate inside.", screen: "email" },
      { title: "On the phone", caption: "Most emails are read on a phone first — so we design for it.", ...P.phone },
      { title: "The journey", caption: "An automation that sends the next email at the right moment.", screen: "automation" },
      { title: "The writing", caption: "Subject lines and copy written to be opened and read.", ...P.studio },
      { title: "The results", caption: "Opens, clicks and bookings per campaign.", screen: "analytics" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From list to loyalty.",
    stages: [
      { name: "Audit", text: "We review your list, your platform and what you've sent so far.", screen: "analytics" },
      { name: "Segment", text: "Your audience split by what they've bought, browsed and asked for.", screen: "brief" },
      { name: "Create", text: "Templates, subject lines and copy designed and written for each segment.", screen: "email" },
      { name: "Automate", text: "Welcome, post-purchase and win-back journeys built and switched on.", screen: "automation" },
      { name: "Improve", text: "We test, report and refine — every send teaches the next one.", screen: "experiment" },
    ],
  },
  tech: {
    kicker: "How it's run",
    title: "Email, layer by layer.",
    text: "Everything behind the message in the inbox.",
    layers: [
      { name: "The inbox", text: "What your customer actually sees.", screen: "email" },
      { name: "Automations", text: "Journeys triggered by what people do.", screen: "automation" },
      { name: "Segments", text: "Who gets which message, and why.", screen: "brief" },
      { name: "Reporting", text: "Opens, clicks and conversions per send.", screen: "analytics" },
    ],
  },
  results: {
    kicker: "What changes",
    title: "From newsletter to revenue.",
    screen: "email",
    before: ["The same email sent to everyone", "Templates that break on phones", "No idea which emails bring sales"],
    actions: ["Segments built from customer data", "Responsive templates and sharper copy", "Automations and tracking switched on"],
    after: ["Messages that feel personal", "Emails that read well everywhere", "Revenue traced to each campaign"],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything email needs.",
    items: [
      { name: "Campaigns", text: "Newsletters and offers planned, written and sent for you.", screen: "email" },
      { name: "Automation", text: "Journeys that run on their own — welcome, post-purchase, win-back.", screen: "automation" },
      { name: "Templates", text: "Branded templates designed and coded for every inbox.", ...P.sketch },
      { name: "Copywriting", text: "Subject lines and copy written to be opened.", screen: "editor", href: "/services/content-marketing", linkLabel: "Content marketing" },
      { name: "Leads", text: "Sign-up forms, lead management and list growth.", screen: "landing" },
      { name: "Analytics", text: "Click-through, bounce and conversion rates, read by specialists.", screen: "analytics" },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Email marketing, answered.",
    items: [
      { q: "Which email platform should we use?", a: "It depends on your list size, your store or CRM and what you need to automate. We'll recommend a reputable platform that fits — or work in the one you already have." },
      { q: "How often should we email our customers?", a: "Often enough to stay remembered, never so often that people unsubscribe. We find the rhythm by testing and watching engagement, and automations handle the timely messages." },
      { q: "Can you grow our email list?", a: "Yes — with sign-up forms, offers and landing pages that give people a reason to subscribe, and only ever with their permission." },
      { q: "Do you write and design the emails?", a: "Yes. Template design, copywriting, campaign management and lead management are all part of the service." },
      { q: "How do you measure email performance?", a: "We report opens, click-through, bounce and unsubscribe rates — and, most importantly, the bookings, sales or leads each campaign brings." },
    ],
  },
  cta: {
    kicker: "Start sending",
    title: ["Ready to make", "the inbox pay?"],
    text: "Tell us about your list and your customers. We'll come back with a plan for your first campaigns and automations — within a day.",
    button: "Plan my email",
    image: P.laptop.image,
    screen: "automation",
  },
};
