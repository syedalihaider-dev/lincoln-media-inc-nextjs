// /services/python-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/python-development (hero, "Hire Our Expert Python Programmers",
// web applications / AI & machine learning / mobile apps, the assessment-to-development process) and the
// live FAQ. Left out: "five years", "Middle East" and "renowned brands" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const PYTHON = {
  parent: PARENT,
  seo: {
    title: "Python Web Application Development Company — The Lincoln Media",
    description: "Python development for web and every kind of application: Python web apps, artificial intelligence and machine learning, mobile apps, automation and data analysis — by expert Python developers.",
    keywords: ["Python development", "Python web development", "Python web applications", "machine learning development", "Python developers"],
    image: pic("circuit"), imageAlt: alt("circuit"),
  },
  demo: { url: "yourbrand.com", photos: [pic("trading"), pic("dash"), pic("circuit"), pic("meeting")] },
  hero: {
    strap: "Python web application development company in the United States", // (live)
    title: ["Python", "Development"],
    tagline: "Your dedicated team of expert Python developers, ready to serve you.", // (live)
    lead: "Hire the best Python developers for web and all kinds of applications.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our Python expertise", href: "#expertise" },
    stage: stage(["trading", "dash", "circuit", "meeting"], "Model deployed"),
  },
  ui: {
    admin: "/admin",
    apiBase: "/api",
    editor: { title: "Dashboard — Insights", action: "Export", panel: "Views", blocks: ["Overview", "Customers", "Forecasts", "Automations", "Reports", "Data sources", "Models", "Settings"] },
    code: {
      tabs: ["app.py", "model.py", "requirements.txt"],
      lines: [
        ["c", "# app.py — a Flask API serving a trained model"],
        ["k", "from flask import Flask, request, jsonify"],
        ["k", "from model import load_model"],
        ["", ""],
        ["", "app = Flask(__name__)"],
        ["s", "model = load_model('models/demand-forecast.joblib')"],
        ["", ""],
        ["s", "@app.post('/api/forecast')"],
        ["k", "def forecast():"],
        ["", "    payload = request.get_json()"],
        ["s", "    weeks = int(payload.get('weeks', 4))"],
        ["s", "    prediction = model.predict(payload['history'], horizon=weeks)"],
        ["s", "    return jsonify({'weeks': weeks, 'forecast': prediction.tolist()})"],
        ["", ""],
        ["s", "if __name__ == '__main__':"],
        ["", "    app.run()"],
      ],
    },
    api: {
      method: "POST",
      path: "/api/forecast",
      json: `{
  "weeks": 4,
  "forecast": [ 1240, 1315, 1290, 1402 ],
  "model": "demand-forecast",
  "generated_at": "2026-11-23T10:00:00Z"
}`,
      links: [["Data analysis", "Reports & visuals"], ["Automation", "Scheduled tasks"], ["Mobile apps", "iOS & Android"]],
    },
    themeFile: "styles.css",
    settings: { title: "Automations · Settings", tabs: ["Schedules", "Models", "Data", "Alerts"], rows: [["Run nightly data import", true], ["Retrain model weekly", true], ["Share reports publicly", false], ["Alert on anomalies", true]], slider: "Forecast horizon" },
  },
  intro: {
    kicker: "Hire our expert Python programmers", // (live)
    statement: "Ingenious solutions for complex problems.", // (live)
    title: "A leading Python web development company", // (live)
    paragraphs: [
      "Python is one of the most popular languages in software and web development — for web and desktop applications, task automation, data analysis and data visualisation.", // (live)
      "Working with us means working with a full-service IT company that understands both software development and branding — whether it's a website, a mobile app or a desktop application.", // (live)
    ],
    image: pic("circuit"), imageAlt: alt("circuit"),
    backdrop: pic("code"),
    marquee: "Python",
  },
  visual: visual("architecture", ["Ingenious", "Python solutions."], "For web, mobile and every kind of application."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our Python development services.",
    intro: "Web applications, artificial intelligence and machine learning, and mobile apps — each starting from your requirements and objectives.", // (live)
    items: [
      chapter("Python Web Applications", "One of our core areas of expertise.", "Flexible, robust web applications built with Python. Have an idea? We'll guide you step by step and create exactly the application you're looking for.", ["Web apps", "Flexible", "Robust"], "devTablet", "code"), // (live)
      chapter("AI & Machine Learning", "Decode your data better and more easily.", "A team well-versed in artificial intelligence and machine learning, ready to help with your AI-based idea.", ["Artificial intelligence", "Machine learning", "Data"], "circuit", "editor"), // (live)
      chapter("Automation & Data", "Everyday tasks, automated.", "Python for task automation, data analysis and data visualisation.", ["Automation", "Analysis", "Visualisation"], "trading", "settings"), // (live)
      chapter("Python Mobile Apps", "High-performance apps for all platforms.", "Modern apps with great features, built for every operating system.", ["Mobile apps", "Cross-platform", "Performance"], "phones", "phone"), // (live)
    ],
  },
  process: process({
    discovery: "Our assessment starts with your requirements, objectives and expectations.", // (live)
    strategy: "We establish a roadmap and recommend the resources that best suit the project.", // (live)
    design: "Once our proposed model is accepted, design begins — apt for your brand and your objectives.", // (live)
    development: "Python development by an experienced, creative team.", // (live)
    launchPhoto: "laptopPhone",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Python web apps", does: "Flexible, robust applications for the web and desktop.", gets: "Exactly the application you had in mind." }, // (live)
      { tech: "AI & machine learning", does: "Models that learn from your data.", gets: "Your data decoded better and more easily." }, // (live)
      { tech: "Task automation", does: "Routine work handled by Python.", gets: "Time back for your team." }, // (live)
      { tech: "Data analysis & visualisation", does: "Turns raw data into clear reports.", gets: "Decisions you can see." }, // (live)
      { tech: "Mobile apps", does: "High-performance apps for every operating system.", gets: "Your product in your customers' pockets." }, // (live)
    ],
    cta: techCta("Ready to build with Python?", "Build your Python app"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a Python build looks like.",
    text: "The same product from every side: the site your customers see, the insights dashboard, the automation settings, the model's API, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Web application" }, { kind: "editor", label: "Insights dashboard" }, { kind: "settings", label: "Automations" }, { kind: "code", label: "Model API" }, { kind: "phone", label: "Mobile app" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Project roadmap", "A roadmap for the package development, with the resources that best suit your project.", "meeting"), // (live)
      capability("One team for everything", "Hire all the resources you need from the same agency.", "team"), // (live)
      capability("Desktop applications", "Python for desktop applications as well as the web.", "glow"), // (live)
      capability("Brand-ready products", "Whatever we create is apt for branding and your objectives.", "studio"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Python product comes together.",
    stages: [
      { name: "Requirements", text: "Your requirements, objectives and expectations — assessed first.", screen: "draft", url: "assessment.docx" }, // (live)
      { name: "Dashboard", text: "The data your business runs on, in one place.", screen: "editor", url: "yourbrand.com/admin" },
      { name: "Design", text: "An interface apt for your brand.", screen: "theme", url: "styles.css" }, // (live)
      { name: "Development", text: "Python, from web app to machine-learning model.", screen: "code", url: "app.py" }, // (live)
      { name: "Integrations", text: "APIs that put the model to work in your product.", screen: "api", url: "yourbrand.com/api" },
      { name: "User experience", text: "A web or mobile app your users enjoy.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("Software that solves real problems.", [
    { name: "Ingenious solutions", text: "Complex problems, solved in Python." }, // (live)
    { name: "Smarter data", text: "AI and machine learning on your data." }, // (live)
    { name: "Less busywork", text: "Everyday tasks, automated." }, // (live)
    { name: "Every platform", text: "Web, desktop and mobile." }, // (live)
    { name: "One agency", text: "All the resources you need, in one team." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "Python, answered.",
    items: [
      { q: "What can you build with Python?", a: "Web and desktop applications, mobile apps, AI and machine-learning solutions, task automation, data analysis and data visualisation." },
      { q: "Can you help with an AI or machine-learning idea?", a: "Yes. Our Python team is well-versed in artificial intelligence and machine learning." },
      { q: "How does a Python project start?", a: "With an assessment of your requirements, objectives and expectations. We then establish a roadmap and recommend resources, and begin design and development once our proposed model is accepted." },
      { q: "Do you build Python mobile apps?", a: "Yes — high-performance apps with great features for all operating systems." },
      FAQ.framework, FAQ.support, FAQ.turnaround, FAQ.cost,
    ],
  },
  cta: cta("Start your Python project"),
};

export default PYTHON;
