// /services/explainer-videos — Explainer Video Production (master: src/components/VideoAnimation/Inner)
import { VIMG, clip } from "../media";

const explainer = {
  slug: "explainer-videos",
  name: "Explainer Video Production",
  short: "Explainer videos",
  theme: "dark",
  seo: {
    title: "Explainer Video Production Company | The Lincoln Media",
    description:
      "Explainer videos that make a product, service or idea obvious — scripted, storyboarded, voiced and animated by one New York team, delivered in every format you need.",
    keywords: ["explainer video production", "animated explainer video", "explainer video company", "product explainer", "2D explainer animation", "SaaS explainer video"],
    image: clip("explainer-hero").poster,
    imageAlt: "A hand drawing an animation frame on a tablet with a stylus",
  },

  hero: {
    kicker: "Explainer Video Production",
    title: ["Make the", "complicated", "obvious."],
    lead: "Explainer videos that turn a product, a process or an idea into a short story anyone can follow — scripted, voiced and animated by one team.",
    video: clip("explainer-hero"),
    artefact: "animatic",
  },

  // the animatic artefact (VideoAnimation/kit/Animatic): four scenes, each with its voice line
  animatic: {
    scenes: [
      { name: "Problem", line: "Your product does something new — and new is hard to explain." },
      { name: "Turn", line: "So we stop describing it, and show it." },
      { name: "How", line: "Three steps. One idea each. Nothing extra.", steps: ["Plan", "Make", "Ship"] },
      { name: "Close", line: "Watch it once, and it's obvious.", word: "Obvious." },
    ],
  },

  story: {
    kicker: "Why explainers work",
    statement: "If a buyer has to read three pages to understand you, most of them won't.",
    text: [
      "An explainer does the reading for them. It takes the thing you do, finds the one idea that makes it click, and shows it — voice, picture and words landing together.",
      "We write it like a story, not a feature list: the problem your audience recognises, the turn where your product appears, and the change it makes. Then we design and animate every frame to say exactly that.",
    ],
    img: VIMG.review, alt: "Two people reviewing a cut on a laptop screen",
  },

  does: {
    kicker: "What an explainer does",
    title: "One film, four jobs.",
    items: [
      { name: "Explain a product", problem: "Your product does something new, and new is hard to describe.", answer: "We show it working — the before, the moment of use, the after — so the value is seen, not claimed.", where: ["Homepage", "Product page", "App store"] },
      { name: "Pitch an idea", problem: "Investors and partners give you minutes, not hours.", answer: "A tight story that frames the problem, the market moment and your answer — ready to open a deck or close an email.", where: ["Investor deck", "Partnerships", "Events"] },
      { name: "Onboard customers", problem: "New users stall at the same step and support tickets repeat.", answer: "Short how-to films that walk through each step in the product's own interface, so people get to value without asking.", where: ["Onboarding", "Help centre", "In-app"] },
      { name: "Train your team", problem: "Processes live in long documents nobody finishes.", answer: "Clear, consistent training films that every new starter sees the same way — easy to update when the process changes.", where: ["Training", "Internal comms", "LMS"] },
    ],
  },

  showcase: {
    kicker: "Inside the studio",
    title: "Drawn, animated and timed to the voice.",
    text: "Every explainer passes through the same desk: script on one screen, frames on the other.",
    video: clip("explainer-studio"),
    captions: ["Style frames", "Animatic", "Animation", "Final mix"],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything an explainer needs.",
    items: [
      { name: "Scriptwriting", text: "Your message cut to the words that matter, timed to the voice and tested out loud." },
      { name: "Storyboards & animatics", text: "Every scene sketched and timed to a scratch voice before animation starts, so you approve the film early." },
      { name: "Illustration & style frames", text: "A look built from your brand — palette, type, characters and texture." },
      { name: "2D & motion animation", text: "Character, object and interface animation with real timing and weight." },
      { name: "Voice-over & sound", text: "Professional voice talent, licensed or composed music, and a clean final mix." },
      { name: "Captions & cut-downs", text: "Captioned masters and short versions in every ratio for social, ads and presentations." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From brief to finished film.",
    steps: [
      { name: "Brief & message", text: "We learn the product and the audience, and agree the single idea the film must land.", out: "Creative brief" },
      { name: "Script", text: "A script timed to the voice, with what the picture does on every line.", out: "Approved script" },
      { name: "Storyboard & animatic", text: "Frames drawn and cut to a scratch voice — the film in rough, before animation.", out: "Animatic" },
      { name: "Design & animation", text: "Style frames set the look; then every scene is animated to the approved timing.", out: "First cut" },
      { name: "Voice, sound & delivery", text: "Final voice, music and mix, captions, and every format and ratio you need.", out: "Masters & cut-downs" },
    ],
  },

  creative: {
    kicker: "Animatic",
    title: "See the film before it's animated.",
    text: "An animatic is the explainer in rough: frames cut to the voice so timing and story are settled before the expensive part. This one runs live in the page — press a scene to jump to it.",
    artefact: "animatic",
    video: clip("explainer-artist"),
    videoAlt: "An illustrator drawing on a tablet by a bright window",
  },

  quality: {
    kicker: "Production approach",
    title: "Checked before it ships.",
    text: "Every explainer goes through the same quality pass before delivery. These are the checks it has to clear.",
    checks: [
      "Script approved before a single frame is drawn",
      "Every claim checked against your product and terms",
      "Voice recorded in a treated booth, edited for breath and pace",
      "Animation timed to the final voice, not the scratch",
      "Captions checked word for word and supplied as a separate file",
      "Masters and cut-downs exported for each platform's specification",
    ],
    img: VIMG.voice, alt: "A voice-over artist recording in a studio with headphones on",
  },

  faq: {
    kicker: "Questions",
    title: "About explainer videos.",
    items: [
      { q: "How long should an explainer be?", a: "As short as the message allows. Most explainers are a minute or two — long enough to set up the problem and show the answer, short enough to be watched to the end. We'll recommend a length when we write the script." },
      { q: "Do you write the script, or do we?", a: "We write it, from a brief and a conversation with your team. If you already have a script, we'll edit it for timing and for the picture." },
      { q: "Can you show our actual product?", a: "Yes. We can animate your real interface from screens or design files, or design a simplified version that keeps the focus on the idea." },
      { q: "Can we choose the voice?", a: "Yes. We share voice samples that suit the script and your audience; you choose, and we direct the recording." },
      { q: "Can it be translated?", a: "Yes. We plan for localisation from the start — on-screen text kept editable, timing with room for longer languages — then record new voice-overs and captions." },
      { q: "What do we get at the end?", a: "A captioned master, short cut-downs in the ratios you need, a thumbnail, and the caption files. Project files can be included on request." },
    ],
  },

  cta: {
    title: ["Let's explain", "what you do."],
    text: "Send us the product, the audience and the one thing they need to understand. We'll come back with a script approach and a schedule.",
    video: clip("explainer-studio"),
  },
};

export default explainer;
