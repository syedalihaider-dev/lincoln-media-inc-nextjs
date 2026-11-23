// /services/ruby-on-rails-development — same shape as ios-app-development.js.
// Source: lincolnmediainc.com/services/ruby-on-rails-development, restructured. Left out: the live
// page's speed / cost-saving claims and named companies.
import { PARENT, photo, process, FAQ, cta } from "./_shared";

const RAILS = {
  platform: "ios",
  accent: "#dc2626",
  seo: {
    title: "Ruby on Rails Development Company — Back Ends & APIs for Apps | The Lincoln Media",
    description: "Ruby on Rails development: MVPs for startups, enterprise modernisation, Rails APIs for mobile apps, and maintenance with updates, speed optimisation, backups and security.",
    keywords: ["Ruby on Rails development", "RoR developers", "Rails API", "MVP development", "Ruby on Rails company"],
    ...photo("developer"),
  },
  parent: PARENT,

  hero: {
    title: ["Ruby on Rails", "Development"],
    tagline: "Your digital growth partner on Rails.", // (live hero)
    lead: "Efficient, reliable, portable and maintainable Ruby on Rails code — the back ends, APIs and admin tools that power your apps and platforms.", // (live hero)
    screens: ["dashboard", "approvals"],
    notes: [
      { kind: "api", method: "POST", path: "/api/v1/orders", status: "201 Created", time: "84 ms" },
      { kind: "code", file: "orders_controller.rb", line: "render json: Order.create!(order_params), status: :created" },
    ],
    spec: [["Framework", "Ruby on Rails"], ["Architecture", "MVC · Rails API"], ["Powers", "Apps · web · admin"]],
  },

  intro: {
    kicker: "Ruby on Rails development",
    statement: "Result-driven Ruby on Rails development — the engine behind your app.", // (live card)
    text: [
      "Ruby on Rails is a mature, productive framework for web applications and APIs. Its MVC architecture, convention over configuration and huge library of gems make products quick to build and easy to change.", // (live benefits)
      "Our in-house experts build Rails applications and Rails APIs for mobile apps, using RubyGems to avoid reinventing what already works — with security and performance designed in.", // (live)
    ],
    ...photo("developer"),
    facts: [["Architecture", "MVC"], ["APIs", "Rails API · JSON"], ["Ecosystem", "RubyGems"], ["Consultation", "Free"]], // (live)
  },

  capabilities: {
    kicker: "Our Rails services", // (live)
    title: "Rails, from MVP to enterprise.",
    items: [
      { name: "Development for startups", text: "A focused MVP, launched quickly to learn from real users.", screen: "onboarding" }, // (live)
      { name: "Enterprise modernisation", text: "Enterprise features and custom Ruby software for established businesses.", screen: "approvals" }, // (live)
      { name: "APIs for mobile apps", text: "Rails APIs that power iOS and Android apps — fast, versioned and secure.", screen: "home" },
      { name: "Admin & dashboards", text: "Back-office tools and reporting for the people running the product.", screen: "dashboard" },
      { name: "Real-time features", text: "Live updates and notifications with Action Cable and background jobs.", screen: "tracking" },
      { name: "Maintenance & support", text: "Updates, speed optimisation, backups, UX and security improvements.", screen: "profile" }, // (live)
    ],
  },

  screens: {
    kicker: "Interfaces",
    title: "What a Rails back end powers.",
    items: [
      { screen: "dashboard", caption: "Admin dashboard" },
      { screen: "approvals", caption: "Workflows" },
      { screen: "home", caption: "Mobile app" },
      { screen: "tracking", caption: "Real-time" },
      { screen: "lock", caption: "Notifications" },
    ],
  },

  stack: {
    kicker: "The stack",
    title: "Rails, layer by layer.",
    layers: [
      { name: "Clients", tech: "iOS · Android · web", text: "Every app and site talking to one well-designed API." },
      { name: "API", tech: "Rails API · JSON · JWT", text: "Versioned endpoints with authentication built in." }, // (live "Rails API")
      { name: "Application", tech: "Ruby · Rails MVC · RubyGems", text: "Business logic organised the Rails way — easy to change." }, // (live)
      { name: "Data & jobs", tech: "PostgreSQL · Redis · Sidekiq", text: "Reliable data, caching and background processing." },
      { name: "Delivery", tech: "CI · containers · cloud", text: "Automated tests and deployments, monitored in production." },
    ],
  },

  features: {
    kicker: "Built in",
    title: "Why Ruby on Rails.",
    rows: [
      { label: "Benefits", items: ["Cost-effective", "MVC architecture", "Easy to change", "Secure", "Performance", "Flexibility", "Large community", "Free plugins (gems)"] }, // (live)
      { label: "Services", items: ["MVPs for startups", "Enterprise modernisation", "Rails APIs", "Updates", "Speed optimisation", "Backups", "Security improvements"] }, // (live)
    ],
  },

  process: process({
    design: "Data models, API contracts and the admin experience, designed before development starts.",
    development: "Ruby on Rails with RubyGems, reviewed and tested on every change.", // (live)
    testing: "Automated model, request and system tests, plus load and security checks.",
    launch: "Deployment, monitoring and backups — then maintenance, speed optimisation and security updates.", // (live)
  }),

  faq: {
    kicker: "Questions",
    title: "Ruby on Rails, answered.",
    items: [
      { q: "Is Ruby on Rails a good choice for my product?", a: "For most web applications, APIs and MVPs, yes. Rails is cost-effective, secure, flexible and easy to change, with a large community and a big library of free plugins." }, // (live)
      { q: "Can Rails power my mobile app?", a: "Yes. A Rails API is a dependable back end for iOS and Android apps — handling accounts, data, payments and notifications." },
      { q: "Can you build an MVP with Rails?", a: "Yes. Development for startups is one of our core Rails services: a focused first version to launch and learn from." }, // (live)
      { q: "Can you take over and modernise an existing Rails app?", a: "Yes. We modernise enterprise Rails applications, upgrade Rails and Ruby versions, and improve speed, UX and security." }, // (live)
      FAQ.timeline,
      FAQ.cost,
      { q: "Do you maintain Rails applications?", a: "Yes — updates, speed optimisation, backups, UX and security improvements, agreed with you up front." }, // (live)
    ],
  },

  cta: cta(["Power your app", "with Rails."]),
};

export default RAILS;
