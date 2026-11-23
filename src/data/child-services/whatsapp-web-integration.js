// /services/whatsapp-web-integration — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/whatsapp-web-integration (hero, "Elevate Your Customer Support with
// WhatsApp Business Integration", automation / API integration / CRM integration) and its own hero image.
// The live page is short, so sections restate its points rather than add claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const WHATSAPP = {
  parent: PARENT,
  seo: {
    title: "WhatsApp Business Integration Service — The Lincoln Media",
    description: "WhatsApp Business integration for your website: WhatsApp API integration, business automation and CRM integration — answer customer queries, generate leads and support customers round the clock.",
    keywords: ["WhatsApp business integration", "WhatsApp API integration", "WhatsApp website integration", "WhatsApp CRM integration", "WhatsApp business automation"],
    image: pic("whatsapp"), imageAlt: alt("whatsapp"),
  },
  demo: { url: "yourbrand.com", photos: [pic("dusk"), pic("ring"), pic("house"), pic("london")] },
  hero: {
    strap: "WhatsApp Business integration service in the United States", // (live)
    title: ["WhatsApp", "Integration"],
    tagline: "WhatsApp for business — to drive sales and offer round-the-clock support.", // (live)
    lead: "Leverage the world's most popular text and voice messaging service for your prospects and customers.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" },
    secondary: { label: "What we integrate", href: "#expertise" },
    stage: stage(["dusk", "ring", "house", "london"], "New WhatsApp message"),
  },
  ui: {
    admin: "/crm",
    apiBase: "/webhooks",
    editor: { title: "CRM — Conversations", action: "Assign", panel: "Inbox", blocks: ["All chats", "New leads", "Support", "Orders", "Campaigns", "Templates", "Reports", "Team"] },
    code: {
      tabs: ["webhook.js", "send-message.js", ".env"],
      lines: [
        ["c", "// webhook.js — incoming WhatsApp messages, into the CRM"],
        ["k", "app.post('/webhooks/whatsapp', async (req, res) => {"],
        ["", "  const change = req.body.entry?.[0]?.changes?.[0]?.value;"],
        ["", "  const msg = change?.messages?.[0];"],
        ["s", "  if (!msg) return res.sendStatus(200);"],
        ["", ""],
        ["", "  const contact = await crm.contacts.upsert({ phone: msg.from });"],
        ["s", "  await crm.conversations.add(contact.id, { channel: 'whatsapp', text: msg.text?.body });"],
        ["", ""],
        ["s", "  if (isNewLead(contact)) await crm.leads.create({ contactId: contact.id, source: 'whatsapp' });"],
        ["", "  res.sendStatus(200);"],
        ["k", "});"],
      ],
    },
    api: {
      method: "POST",
      path: "/v21.0/{phone-number-id}/messages",
      json: `{
  "messaging_product": "whatsapp",
  "to": "15550123456",
  "type": "template",
  "template": {
    "name": "order_update",
    "language": { "code": "en_US" }
  }
}`,
      links: [["CRM", "Contacts & leads"], ["Website", "Chat button & forms"], ["Insights", "Real-time on your phone"]],
    },
    themeFile: "widget.css",
    settings: { title: "WhatsApp · Automation", tabs: ["Replies", "Routing", "Templates", "Insights"], rows: [["Instant greeting message", true], ["Route sales chats to sales team", true], ["Away message out of hours", false], ["Log every chat in CRM", true]], slider: "Reply within (minutes)" },
  },
  intro: {
    kicker: "WhatsApp Business integration", // (live)
    statement: "Elevate your customer support.", // (live)
    title: "Customer support, marketing and teams under one roof", // (live)
    paragraphs: [
      "WhatsApp business automation is the fastest way to step up your marketing and grow your business. It brings customer support, marketing conversations and your internal teams under one roof — a versatile solution for SMEs.", // (live)
      "With our WhatsApp API integration you answer customer queries, generate hot leads, keep a record of your marketing outcomes and get real-time website insights on your phone — all through CRM WhatsApp integration.", // (live)
    ],
    image: pic("whatsapp"), imageAlt: alt("whatsapp"),
    backdrop: pic("code"),
    marquee: "WhatsApp",
  },
  visual: visual("dusk", ["Round-the-clock", "support."], "Your customers, one message away."), // (live)
  expertise: {
    kicker: "What we integrate",
    title: "WhatsApp, built into your business.",
    intro: "WhatsApp API integration, business automation and CRM integration — for support, sales and marketing.", // (live)
    items: [
      chapter("WhatsApp API Integration", "Ace your customer support.", "Answer customer queries through WhatsApp, directly from your website.", ["Website chat", "API", "Support"], "whatsapp", "chat"), // (live)
      chapter("Business Automation", "Step up your marketing.", "WhatsApp business automation — the fastest way to grow your business and keep up with every conversation.", ["Automation", "Quick replies", "Marketing"], "phone", "settings"), // (live)
      chapter("CRM WhatsApp Integration", "Every conversation, on record.", "Generate hot leads and keep a record of your marketing outcomes — with real-time insights on your phone.", ["Leads", "CRM", "Insights"], "meeting", "editor"), // (live)
      chapter("Website Integration", "Your website, one tap from a chat.", "WhatsApp Business website integration that brings support, marketing and internal teams under one roof.", ["Chat button", "Forms", "Teams"], "devTablet", "code"), // (live)
    ],
  },
  process: process({
    design: "Where WhatsApp appears on your website, and how conversations flow to your teams.", // (live, restructured)
    development: "WhatsApp API and CRM integration, connected to your website.", // (live)
    launch: "Your customers can reach you on WhatsApp — and every conversation lands in your CRM.", // (live)
    launchPhoto: "whatsapp",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "WhatsApp Business API", does: "Connects your business to the world's most popular messaging service.", gets: "Customers reach you where they already are." }, // (live)
      { tech: "Business automation", does: "Automated conversations for marketing and support.", gets: "Round-the-clock support." }, // (live)
      { tech: "CRM integration", does: "Every chat and lead recorded in your CRM.", gets: "Hot leads, never lost." }, // (live)
      { tech: "Website integration", does: "WhatsApp built into your website.", gets: "One tap from visitor to conversation." }, // (live)
      { tech: "Real-time insights", does: "Website and marketing insights on your phone.", gets: "Decisions made on the move." }, // (live)
    ],
    cta: techCta("Ready to bring WhatsApp to your business?", "Integrate WhatsApp"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a WhatsApp integration looks like.",
    text: "The same integration from every side: your website, the business chat, the CRM inbox, the automation settings, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Your website" }, { kind: "chat", label: "Business chat" }, { kind: "editor", label: "CRM inbox" }, { kind: "settings", label: "Automation" }, { kind: "phone", label: "On the phone" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the integration, covered.",
    items: [
      capability("Customer support", "Answer customer queries quickly, on the channel they prefer.", "whatsapp"), // (live)
      capability("Lead generation", "Turn conversations into hot leads, recorded in your CRM.", "meeting"), // (live)
      capability("Marketing conversations", "Keep a record of your marketing outcomes.", "charts"), // (live)
      capability("Teams under one roof", "Support, marketing and internal teams working from one place.", "team"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one WhatsApp integration comes together.",
    stages: [
      { name: "Conversations", text: "The questions your customers ask, and who should answer them.", screen: "draft", url: "conversation-plan.docx" },
      { name: "Chat", text: "WhatsApp for business — text and voice, where your customers already are.", screen: "chat", url: "web.whatsapp.com" }, // (live)
      { name: "CRM", text: "Every chat and lead recorded in your CRM.", screen: "editor", url: "yourbrand.com/crm" }, // (live)
      { name: "Development", text: "Webhooks connecting WhatsApp to your systems.", screen: "code", url: "webhook.js" },
      { name: "API", text: "The WhatsApp Business API, sending updates automatically.", screen: "api", url: "graph.facebook.com" }, // (live)
      { name: "User experience", text: "Your website, one tap away from a conversation.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("Customers who are one message away.", [
    { name: "Faster support", text: "Customer queries answered round the clock." }, // (live)
    { name: "More leads", text: "Hot leads generated from conversations." }, // (live)
    { name: "Measured marketing", text: "A record of your marketing outcomes." }, // (live)
    { name: "Insight on the go", text: "Real-time website insights on your phone." }, // (live)
    { name: "One roof", text: "Support, marketing and teams together." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "WhatsApp integration, answered.",
    items: [
      { q: "What can WhatsApp Business integration do for my website?", a: "Answer customer queries, generate hot leads, keep a record of your marketing outcomes and get real-time website insights on your phone." },
      { q: "Can WhatsApp connect to our CRM?", a: "Yes. CRM WhatsApp integration brings customer support, marketing conversations and your internal teams under one roof." },
      { q: "Is WhatsApp integration suitable for small businesses?", a: "Yes — WhatsApp Business website integration is a versatile solution for SMEs." },
      { q: "Can WhatsApp help us offer support around the clock?", a: "Yes. WhatsApp for business helps you drive sales and offer round-the-clock support to prospects and customers." },
      FAQ.support, FAQ.turnaround, FAQ.cost,
    ],
  },
  cta: cta("Start your WhatsApp integration"),
};

export default WHATSAPP;
