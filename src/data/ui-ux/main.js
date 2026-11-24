// /services/ui-ux-design — the UI/UX Design category page. Source: lincolnmediainc.com/services/ui-ux-design
// (UX & UI design and consulting; business-centric; full-scope UI and UX within one provider; mobile
// app and website UI; useful, simple UI for better interaction; "Our Creative Approach": requirements,
// competitor audit, IA/UX mapping and wireframes, visual direction and mood boards, device and motion
// checks, UI element library and developer hand-off, post-launch checks; brand + business together).
// Left out: 265+ / 325+ / 20+, AED prices, named clients and the portfolio (Playa, Jino, PicPax), the
// site-wide video-animation process and web-design FAQ. Interfaces show "Meridian", a fictional brand.
import imgOg from "@public/images/services/ui-ux-design.jpg";
import imgStudio from "@public/images/inner/wordpress/design-studio.webp";

export const UIUX_PATH = "/services/ui-ux-design";

export const UIUX_PAGE = {
  seo: {
    title: "UI/UX Design Agency — UX Research, UI Design & Prototyping | The Lincoln Media",
    description: "UI/UX design for websites and apps: user research, information architecture, wireframes, prototypes, interface design, design systems and usability testing — experiences people enjoy using.",
    keywords: ["UI/UX design agency", "UX design services", "UI design", "user research", "wireframing and prototyping", "design systems", "UX design company New York"],
    image: imgOg,
    imageAlt: "A designer sketching page wireframes on a tablet",
  },
  hero: {
    kicker: "UI/UX Design",
    title: ["UI/UX", "Design"],
    lead: "Experiences for websites and apps that people understand at a glance and enjoy using — researched, designed, prototyped and tested by one team, with your business goals built in.",
    stages: ["Research", "UX", "Interface", "Interaction", "Product"],
    primary: { label: "Start a design project", href: "/#contact" },
  },
  statement: {
    kicker: "Design is the experience",
    lines: ["Good design", "is seen.", "Great design", "is experienced."],
    text: "Interfaces aren't pictures. They're what someone feels when they find what they came for in seconds — or don't. We design for that moment: clear, fast, accessible and unmistakably yours.",
  },
  journey: {
    kicker: "The UX journey",
    title: "From a question to a product.",
    stages: [
      { name: "Research", text: "Interviews, analytics and a look at competitors — what people need, and what stops them today.", view: "research" },
      { name: "Structure", text: "Information architecture: the pages, the paths through them and the one task each must make easy.", view: "sitemap" },
      { name: "Wireframe", text: "Layout without decoration — hierarchy, content and flow agreed before a single colour.", view: "wire" },
      { name: "Prototype", text: "A clickable version in grey, so the journey can be felt and changed while change is cheap.", view: "grey" },
      { name: "Test", text: "Real people try real tasks. We watch where they hesitate and why.", view: "test" },
      { name: "Refine", text: "Visual design, motion and detail — the finished interface, ready to hand to developers.", view: "ui" },
    ],
  },
  showcase: {
    kicker: "Interfaces",
    title: "Websites, dashboards, apps, landing pages.",
    items: [
      { name: "Website", text: "A home page that leads with what people came for.", device: "browser", page: "home", tint: "#2a1d16" },
      { name: "Product page", text: "Details, photography and the next step side by side.", device: "browser", page: "listing", tint: "#1c2230" },
      { name: "Mobile app", text: "The same product, rethought for a thumb.", device: "phone", page: "home", tint: "#1d2a22" },
      { name: "Dashboard", text: "Busy information made calm and scannable.", device: "browser", page: "dashboard", tint: "#241c2e" },
      { name: "Landing page", text: "One message, one action, nothing in the way.", device: "browser", page: "landing", tint: "#2e2416" },
    ],
  },
  responsive: {
    kicker: "Mobile + web",
    title: "One design, every screen.",
    text: "We design the layout for each size on purpose — not a desktop squeezed onto a phone. Watch the same page rearrange itself as the screen narrows.",
    steps: [{ name: "Desktop", w: 1280 }, { name: "Tablet", w: 820 }, { name: "Mobile", w: 390 }],
  },
  system: {
    kicker: "Design system",
    title: "Built from parts that fit.",
    text: "Colour, type, spacing, buttons, inputs, cards and states — designed once as a system, so every new page is consistent and developers build faster.",
  },
  motion: {
    kicker: "Interaction & motion",
    title: "Interfaces that answer back.",
    beats: [
      { name: "Hover", spec: "120ms · ease-out", text: "Controls react the moment they're reachable." },
      { name: "Loading", spec: "skeleton · 300ms", text: "The page shows its shape while content arrives." },
      { name: "Transition", spec: "320ms · ease-in-out", text: "Screens hand over so you never lose your place." },
      { name: "Modal", spec: "sheet · 280ms", text: "Focused tasks slide up without leaving the page." },
      { name: "Feedback", spec: "toast · 2.4s", text: "Every action is confirmed, clearly and kindly." },
    ],
  },
  capabilities: {
    kicker: "Capabilities",
    title: "Every part of the experience.",
    items: [
      { name: "UX Research", text: "Interviews, surveys, analytics and competitor audits that show what people need.", view: "research", href: "/services/ux-workshops" },
      { name: "Information Architecture", text: "Sitemaps, navigation and content structure built around real tasks.", view: "sitemap" },
      { name: "Wireframing", text: "Layouts agreed in black and white before anything is styled.", view: "wire", href: "/services/ux-design" },
      { name: "UI Design", text: "Visual direction, mood boards and interfaces with a point of view.", view: "ui" },
      { name: "Prototyping", text: "Clickable prototypes that let you feel the product before it's built.", view: "grey" },
      { name: "Design Systems", text: "A UI element library and tokens, handed off ready for development.", view: "tokens" },
      { name: "Responsive Design", text: "Layouts designed for every screen, from phone to wide desktop.", view: "phone", href: "/services/responsive-website-design" },
      { name: "Interaction Design", text: "Motion and micro-interactions that make an interface feel alive.", view: "dashboard" },
    ],
  },
  transform: {
    kicker: "From wireframe to product",
    title: ["Wireframe", "Interface", "Prototype", "Experience"],
  },
  quality: {
    kicker: "Design quality",
    title: "What makes it feel effortless.",
    notes: [
      { name: "Hierarchy", text: "One headline, one action — the eye knows where to go." },
      { name: "Usability", text: "Search, filter and book without a single instruction." },
      { name: "Accessibility", text: "Contrast, focus states and readable type for everyone." },
      { name: "Consistency", text: "The same button means the same thing on every page." },
      { name: "Responsive", text: "Rearranged, not shrunk, for every screen." },
      { name: "Conversion", text: "The next step is always visible and always clear." },
    ],
  },
  faq: {
    kicker: "Questions",
    ask: "Something else about your design project?",
    title: "UI/UX design, answered.",
    items: [
      { q: "What's the difference between UX and UI design?", a: "UX design is how the product works — the research, structure, flows and decisions that make a task easy. UI design is how it looks and feels — type, colour, layout, components and motion. We do both, as one team, so they never pull in different directions." },
      { q: "What does your UI/UX design process look like?", a: "We start with your requirements and a competitor audit, map the information architecture and user journeys, wireframe the key screens, set the visual direction with mood boards, then design the interface and check it on every device and in motion. We finish with a UI library and a developer hand-off, and check the product again after launch." },
      { q: "Do you design for both websites and mobile apps?", a: "Yes — websites, web apps, dashboards and native or cross-platform mobile apps, each designed for the way people actually use that device." },
      { q: "Will we see the design before it's built?", a: "Yes. You'll review wireframes, then a clickable prototype, then the finished interface — each stage agreed before the next, so there are no surprises at launch." },
      { q: "Do you test designs with real users?", a: "Yes. We run usability tests on prototypes with people who match your audience, watch where they hesitate and refine the design before development starts." },
      { q: "Can you work with our developers?", a: "Yes. We hand off a documented design system and specs your developers can build from — or our own developers can build it with you." },
    ],
  },
  cta: {
    kicker: "Start designing",
    title: ["Design an experience", "people remember."],
    text: "Tell us about your product and the people who use it. We'll come back with how we'd approach it — within a day.",
    primary: { label: "Start a design project", href: "/#contact" },
    image: imgStudio,
  },
};
