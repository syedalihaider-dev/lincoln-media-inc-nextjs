// /services/asp-net-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/asp-net-development (hero, "Expert ASP.NET Developers", desktop
// application development / cloud integration / CMS application development) and the live FAQ.
// Left out: track-record claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const ASPNET = {
  parent: PARENT,
  seo: {
    title: "ASP.NET Core Development Services — The Lincoln Media",
    description: "ASP.NET and .NET development: advanced, feature-rich and secure web applications, desktop applications, cloud integration and CMS-driven websites, built by expert ASP.NET developers.",
    keywords: ["ASP.NET development", "ASP.NET Core development", ".NET development", "dot net web applications", "ASP.NET cloud integration"],
    image: pic("devTablet"), imageAlt: alt("devTablet"),
  },
  demo: { url: "yourbrand.com", photos: [pic("towers"), pic("trading"), pic("london"), pic("meeting")] },
  hero: {
    strap: "ASP.NET Core development services in the United States", // (live)
    title: ["ASP.NET", "Development"],
    tagline: "Our ASP.NET Core developers help businesses through their digital transformation.", // (live)
    lead: "Top-notch ASP.NET development services to build advanced, feature-rich and secure software.", // (live)
    primary: { label: "Speak to an Expert", href: "/contact-us#contact-form" },
    secondary: { label: "Our .NET expertise", href: "#expertise" },
    stage: stage(["towers", "trading", "london", "meeting"], "Build succeeded"),
  },
  ui: {
    admin: "/admin",
    apiBase: "/api",
    editor: { title: "Content — Home page", action: "Publish", panel: "Content", blocks: ["Hero", "Rich text", "Image", "Cards", "Testimonials", "Form", "Navigation", "Footer"] },
    code: {
      tabs: ["Program.cs", "ProductsService.cs", "appsettings.json"],
      lines: [
        ["c", "// Program.cs — ASP.NET Core minimal API"],
        ["k", "var builder = WebApplication.CreateBuilder(args);"],
        ["", "builder.Services.AddDbContext<StoreDb>(o =>"],
        ["s", "    o.UseSqlServer(builder.Configuration.GetConnectionString(\"Store\")));"],
        ["", "builder.Services.AddAuthentication().AddJwtBearer();"],
        ["", ""],
        ["k", "var app = builder.Build();"],
        ["", "app.UseAuthentication();"],
        ["", ""],
        ["s", "app.MapGet(\"/api/products\", async (StoreDb db) =>"],
        ["", "    await db.Products.OrderBy(p => p.Name).Take(20).ToListAsync());"],
        ["", ""],
        ["s", "app.MapPost(\"/api/orders\", async (Order order, StoreDb db) =>"],
        ["", "{ db.Orders.Add(order); await db.SaveChangesAsync(); return Results.Created(); })"],
        ["", "    .RequireAuthorization();"],
        ["k", "app.Run();"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/products",
      json: `[
  { "id": 31, "name": "Annual plan", "price": 1200.00, "inStock": true },
  { "id": 30, "name": "Monthly plan", "price": 110.00, "inStock": true },
  { "id": 29, "name": "Onboarding pack", "price": 350.00, "inStock": false }
]`,
      links: [["Cloud", "Exterior data sources"], ["SQL Server", "Business data"], ["Desktop apps", "Windows clients"]],
    },
    themeFile: "site.css",
    settings: { title: "Application · Settings", tabs: ["General", "Security", "Cloud", "Logging"], rows: [["Two-factor sign-in", true], ["Sync with cloud data", true], ["Maintenance window", false], ["Audit logging", true]], slider: "Session timeout" },
  },
  intro: {
    kicker: "Your go-to ASP.NET web app development company", // (live)
    statement: "Intuitive, easy-to-use web applications.", // (live)
    title: "Expert ASP.NET developers", // (live)
    paragraphs: [
      "For any small or large company to thrive, having an intuitive, easy-to-use web application is important. That's where ASP.NET — Microsoft's framework for high-speed desktop and web software — simplifies the job.", // (live)
      "Our .NET team has extensive experience creating custom .NET solutions for varied industry verticals, and is ready for any kind of challenge in the ASP.NET domain.", // (live)
    ],
    image: pic("devTablet"), imageAlt: alt("devTablet"),
    backdrop: pic("code"),
    marquee: ".NET",
  },
  visual: visual("towers", ["Advanced, feature-rich", "and secure."], "Software built for your digital transformation."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "What we build with ASP.NET.",
    intro: "Custom .NET solutions for web, desktop and the cloud — whatever the challenge in the ASP.NET domain.", // (live)
    items: [
      chapter("ASP.NET Web Applications", "High-speed, secure web software.", "Advanced, feature-rich and secure web applications on ASP.NET Core, built around the way your business works.", ["ASP.NET Core", "Web APIs", "Security"], "devTablet", "code"), // (live)
      chapter("Desktop Application Development", "Scalable .NET applications for the desktop.", "We rely on best practices and standard support systems like Windows Smart Client apps and Windows GUI applications.", ["Smart Client", "Windows GUI", "Scalable"], "glow", "settings"), // (live)
      chapter("Cloud Integration", "Real-world data, complete control.", "If your data comes from an exterior platform, we integrate your application with real-world data and essential systems — giving users a great experience and complete control.", ["Cloud", "Data integration", "Control"], "circuit", "editor"), // (live)
      chapter("CMS Application Development", "Manage your content seamlessly.", "Many CMS-driven websites built with .NET — our experts set up the system so you can manage your website content seamlessly.", ["CMS", ".NET", "Content"], "dash", "theme"), // (live)
      chapter("Responsive Experiences", "Every screen, every visitor.", "Most web traffic now comes from mobile devices. Responsive design keeps those visitors — and it matters for search rankings too.", ["Mobile-first", "Touch-friendly", "Better for SEO"], "phone", "phone"), // (live FAQ)
    ],
  },
  process: process({
    design: "An intuitive, easy-to-use interface for your application.", // (live)
    development: "Custom .NET solutions built with best practices and standard support systems.", // (live)
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "ASP.NET Core", does: "High-speed web software from Microsoft's framework.", gets: "Advanced, secure applications." }, // (live)
      { tech: "Desktop .NET", does: "Windows Smart Client and GUI applications.", gets: "Scalable software on the desktop." }, // (live)
      { tech: "Cloud integration", does: "Connects your app with exterior platforms and real-world data.", gets: "Complete control over your software." }, // (live)
      { tech: ".NET CMS", does: "CMS-driven websites, set up for your team.", gets: "Content you manage seamlessly." }, // (live)
      { tech: "ERP integration", does: "Customisation and integration with SAP, Oracle, Salesforce, Microsoft and more.", gets: "One system, not a patchwork." }, // (live FAQ)
    ],
    cta: techCta("Ready to build your .NET application?", "Build your ASP.NET app"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What an ASP.NET build looks like.",
    text: "The same application from every side: the site your customers see, the content admin, the application settings, the code, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Web application" }, { kind: "editor", label: "Content admin" }, { kind: "settings", label: "App settings" }, { kind: "code", label: "ASP.NET Core API" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Digital transformation", "Our ASP.NET Core developers help businesses through their digital transformation.", "meeting"), // (live)
      capability("ERP integration", "Integration with SAP, Oracle, Salesforce, Microsoft, Infor, IFS, Epicor and more.", "circuit"), // (live FAQ)
      capability("Maintenance & support", "Ongoing help with the software we build once it launches.", "team"), // (live FAQ)
      capability("Migration", "A risk-free method for moving existing websites and applications.", "empire"), // (live FAQ)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one .NET application comes together.",
    stages: [
      { name: "Requirements", text: "What the application must do, for whom — planned before anything is built.", screen: "draft", url: "requirements.docx" },
      { name: "Content", text: "A .NET CMS set up so your team manages content seamlessly.", screen: "editor", url: "yourbrand.com/admin" }, // (live)
      { name: "Design", text: "An intuitive, easy-to-use interface.", screen: "theme", url: "site.css" }, // (live)
      { name: "Development", text: "ASP.NET Core, built with best practices.", screen: "code", url: "Program.cs" }, // (live)
      { name: "Integrations", text: "Cloud platforms and real-world data, connected.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "A secure, high-speed application your users enjoy.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("Software your business can rely on.", [
    { name: "Easy to use", text: "Intuitive applications that help you thrive." }, // (live)
    { name: "Secure", text: "Advanced, feature-rich and secure." }, // (live)
    { name: "Connected", text: "Real-world data from the platforms you use." }, // (live)
    { name: "Under control", text: "Complete control over the entire software." }, // (live)
    { name: "Web and desktop", text: "Scalable .NET wherever your users work." }, // (live)
  ], "towers"),
  faq: {
    kicker: "Questions",
    title: "ASP.NET, answered.",
    items: [
      { q: "What do you build with ASP.NET?", a: "Advanced, feature-rich and secure web applications, scalable desktop applications, cloud-integrated software and CMS-driven websites." },
      { q: "Can you integrate my application with cloud data?", a: "Yes. If your data comes from an exterior platform, we integrate your application with real-world data and essential systems." },
      { q: "Do you build .NET desktop applications?", a: "Yes — using best practices and standard support systems like Windows Smart Client apps and Windows GUI applications." },
      { q: "Can you build a CMS with .NET?", a: "Yes. We have created many CMS-driven websites with .NET, set up so you can manage your content seamlessly." },
      FAQ.erp, FAQ.framework, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your ASP.NET project"),
};

export default ASPNET;
