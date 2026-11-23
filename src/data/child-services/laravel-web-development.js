// /services/laravel-web-development — same shape as wordpress-development.js (the approved master).
// Source: lincolnmediainc.com/services/laravel-web-development (hero, "We are Masters in Laravel Web
// Development", customised development / e-commerce / enterprise / data migration / RESTful API / CRM) and
// the live FAQ. Left out: "#1 choice", "certified", "get-rich-quick" and "double your sales" claims.
import { pic, alt, PARENT, stage, process, FAQ, cta, techCta, visual, chapter, capability, outcome } from "./_shared";

const LARAVEL = {
  parent: PARENT,
  seo: {
    title: "Laravel Web Development Company in the USA — The Lincoln Media",
    description: "Laravel web and application development: custom Laravel development, e-commerce, enterprise solutions, data migration, RESTful APIs and CRM development — robust products for start-ups and enterprises.",
    keywords: ["Laravel development", "Laravel web development", "Laravel API development", "Laravel ecommerce", "Laravel CRM"],
    image: pic("devTablet"), imageAlt: alt("devTablet"),
  },
  demo: { url: "yourbrand.com", photos: [pic("dusk"), pic("bike"), pic("house"), pic("ring")] },
  hero: {
    strap: "Laravel web development company in the United States", // (live)
    title: ["Laravel", "Development"],
    tagline: "Robust products on Laravel, developed cost-effectively for start-ups and enterprises.", // (live)
    lead: "Expert Laravel website programmers building high-performance, user-friendly web applications.", // (live)
    primary: { label: "Speak to an Expert", href: "/#contact" },
    secondary: { label: "Our Laravel expertise", href: "#expertise" },
    stage: stage(["dusk", "bike", "house", "ring"], "Migration complete"),
  },
  ui: {
    admin: "/admin",
    apiBase: "/api",
    editor: { title: "CRM — Customers", action: "Save", panel: "Resources", blocks: ["Customers", "Deals", "Orders", "Products", "Invoices", "Tasks", "Reports", "Team"] },
    code: {
      tabs: ["routes/api.php", "CustomerController.php", "Customer.php"],
      lines: [
        ["c", "<?php // routes/api.php"],
        ["k", "use App\\Http\\Controllers\\CustomerController;"],
        ["k", "use Illuminate\\Support\\Facades\\Route;"],
        ["", ""],
        ["", "Route::middleware('auth:sanctum')->group(function () {"],
        ["s", "    Route::apiResource('customers', CustomerController::class);"],
        ["s", "    Route::get('customers/{customer}/deals', [CustomerController::class, 'deals']);"],
        ["", "});"],
        ["", ""],
        ["c", "// CustomerController@index"],
        ["k", "public function index(Request $request)"],
        ["", "{"],
        ["s", "    return CustomerResource::collection("],
        ["s", "        Customer::with('owner')->latest()->paginate(20)"],
        ["", "    );"],
        ["", "}"],
      ],
    },
    api: {
      method: "GET",
      path: "/api/customers?page=1",
      json: `{
  "data": [
    { "id": 418, "name": "Northwind Studio", "stage": "proposal", "owner": "Sam" },
    { "id": 417, "name": "Harbour & Co", "stage": "won", "owner": "Alex" },
    { "id": 416, "name": "Atlas Retail", "stage": "lead", "owner": "Jo" }
  ],
  "meta": { "current_page": 1, "per_page": 20 }
}`,
      links: [["E-commerce", "Orders & payments"], ["CRM", "Customers & deals"], ["Queues", "Email & jobs"]],
    },
    themeFile: "tailwind.config.js",
    settings: { title: "CRM · Settings", tabs: ["General", "Pipelines", "Notifications", "API"], rows: [["Assign new leads automatically", true], ["Email deal updates", true], ["Allow public sign-up", false], ["API rate limiting", true]], slider: "Records per page" },
  },
  intro: {
    kicker: "Masters in Laravel web development", // (live)
    statement: "Exceptional web applications, fast.", // (live)
    title: "Expert Laravel website programmers", // (live)
    paragraphs: [
      "Laravel is an open-source PHP framework built on MVC architecture, streamlining development of high-performance, user-friendly websites.", // (live)
      "From custom Laravel development to API integration, migration, web development and Laravel package development, our expert web developers work with you in a professional manner.", // (live)
    ],
    image: pic("devTablet"), imageAlt: alt("devTablet"),
    backdrop: pic("code"),
    marquee: "Laravel",
  },
  visual: visual("dusk", ["Robust products,", "built cost-effectively."], "High-performance, user-friendly applications on Laravel."), // (live)
  expertise: {
    kicker: "Expertise",
    title: "Our Laravel development services.",
    intro: "Custom development, e-commerce, enterprise solutions, migration, APIs and CRMs — all on Laravel.", // (live)
    items: [
      chapter("Customised Laravel Development", "Designs that suit your brand.", "Exclusive designs with built-in features that deliver a high-quality user experience — captivating your prospects and turning them into long-term customers.", ["Custom builds", "User experience", "Brand fit"], "devTablet", "code"), // (live)
      chapter("Laravel E-commerce", "Sell online with confidence.", "Laravel e-commerce solutions with high-quality UIs and easy navigation for your online store.", ["Online store", "Easy navigation", "Quality UI"], "shop", "store"), // (live)
      chapter("RESTful API Development", "APIs that meet your requirements.", "Our developers have deep expertise in Laravel API packages, creating RESTful API solutions for your business.", ["REST APIs", "Integration", "Packages"], "circuit", "settings"), // (live)
      chapter("Laravel CRM Development", "Manage your customers in a sophisticated way.", "CRMs with competitive features that simplify CRM tasks — and we train you to use them in the best manner possible.", ["CRM", "Automation", "Training"], "meeting", "editor"), // (live)
      chapter("Responsive Experiences", "Every screen, every visitor.", "Most web traffic now comes from mobile devices. Responsive design keeps those visitors — and it matters for search rankings too.", ["Mobile-first", "Touch-friendly", "Better for SEO"], "phone", "phone"), // (live FAQ)
    ],
  },
  process: process({
    design: "Exclusive designs that suit your brand, with a high-quality user experience.", // (live)
    development: "Laravel on MVC architecture — streamlined, high-performance development.", // (live)
    launchPhoto: "laptopPhone",
  }),
  technology: {
    kicker: "The technology behind it",
    title: ["Futuristic technology,", "unique to your business."], // (live)
    text: "Highly innovative, cutting-edge digital technology — built exclusively around your business vision. Here is what each part does for you.", // (live)
    image: pic("developer"), video: null,
    rows: [
      { tech: "Laravel framework", does: "Open-source PHP on MVC architecture, streamlining development.", gets: "Exceptional web applications, fast." }, // (live)
      { tech: "RESTful APIs", does: "API solutions built with Laravel packages.", gets: "Systems that connect to your app." }, // (live)
      { tech: "Laravel e-commerce", does: "Online stores with quality UIs and easy navigation.", gets: "A store customers enjoy using." }, // (live)
      { tech: "Laravel CRM", does: "Features that simplify CRM tasks.", gets: "Customers managed in a sophisticated way." }, // (live)
      { tech: "Data migration", does: "Upgrades your website to the latest Laravel version.", gets: "Efficient services and the latest features." }, // (live)
    ],
    cta: techCta("Ready to build on Laravel?", "Build your Laravel app"),
  },
  showcase: {
    kicker: "In the studio",
    title: "What a Laravel build looks like.",
    text: "The same application from every side: the site your customers see, the CRM admin, the store, the API code, the phone.",
    url: "yourbrand.com",
    screens: [{ kind: "site", label: "Web application" }, { kind: "editor", label: "CRM admin" }, { kind: "store", label: "E-commerce" }, { kind: "code", label: "RESTful API" }, { kind: "phone", label: "Responsive" }],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Everything around the build, covered.",
    items: [
      capability("Laravel data migration", "An upgrade to the latest Laravel version, so you enjoy efficient services and the latest features.", "empire"), // (live)
      capability("Laravel enterprise development", "Websites tailor-made for large corporate entities.", "towers"), // (live)
      capability("Package development", "Laravel packages built for your requirements.", "code"), // (live)
      capability("CRM training", "We train your team to use its CRM in the best manner possible.", "meeting"), // (live)
    ],
  },
  ecosystem: {
    kicker: "The ecosystem",
    title: "How one Laravel application comes together.",
    stages: [
      { name: "Requirements", text: "What the application must do — planned before anything is built.", screen: "draft", url: "requirements.docx" },
      { name: "Admin", text: "A CRM admin to manage your customers in a sophisticated way.", screen: "editor", url: "yourbrand.com/admin" }, // (live)
      { name: "Design", text: "Exclusive designs that suit your brand.", screen: "theme", url: "tailwind.config.js" }, // (live)
      { name: "Development", text: "Laravel on MVC architecture.", screen: "code", url: "routes/api.php" }, // (live)
      { name: "Integrations", text: "RESTful APIs connecting your systems.", screen: "api", url: "yourbrand.com/api" }, // (live)
      { name: "User experience", text: "A high-quality experience that turns prospects into customers.", screen: "site", url: "yourbrand.com" }, // (live)
    ],
  },
  outcome: outcome("An application built to grow.", [
    { name: "Fast to market", text: "Exceptional web applications, fast." }, // (live)
    { name: "Cost-effective", text: "Robust products without the overhead." }, // (live)
    { name: "Loyal customers", text: "Experiences that turn prospects into customers." }, // (live)
    { name: "Connected", text: "RESTful APIs to the systems you rely on." }, // (live)
    { name: "Up to date", text: "The latest Laravel version and features." }, // (live)
  ], "dusk"),
  faq: {
    kicker: "Questions",
    title: "Laravel, answered.",
    items: [
      { q: "Why Laravel?", a: "Laravel is an open-source PHP framework built on MVC architecture, which streamlines development of high-performance, user-friendly web applications." },
      { q: "Can you build an online store on Laravel?", a: "Yes. Laravel e-commerce solutions with high-quality UIs and easy navigation." },
      { q: "Do you develop RESTful APIs?", a: "Yes. Our developers have deep expertise in Laravel API packages and create RESTful API solutions that meet your requirements." },
      { q: "Can you upgrade my Laravel application?", a: "Yes. Our team handles Laravel data migration and upgrades your website to the latest Laravel version." },
      { q: "Can you build a CRM for us?", a: "Yes — CRMs with competitive features that simplify CRM tasks, and we train you to use them." },
      FAQ.framework, FAQ.support, FAQ.cost,
    ],
  },
  cta: cta("Start your Laravel project"),
};

export default LARAVEL;
