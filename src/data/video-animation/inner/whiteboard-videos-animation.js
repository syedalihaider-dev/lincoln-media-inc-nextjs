// /services/whiteboard-videos-animation — Whiteboard Animation Video (master: src/components/VideoAnimation/Inner)
import { VIMG, clip } from "../media";

const whiteboard = {
  slug: "whiteboard-videos-animation",
  name: "Whiteboard Animation Video",
  short: "Whiteboard animation",
  theme: "light",
  seo: {
    title: "Whiteboard Animation Video Production | The Lincoln Media",
    description:
      "Whiteboard animation videos that draw your idea line by line — scripted, illustrated, voiced and animated by The Lincoln Media for training, education and sales.",
    keywords: ["whiteboard animation", "whiteboard animation video", "whiteboard explainer video", "hand-drawn animation", "training video animation", "draw-on animation"],
    image: clip("whiteboard-hero").poster,
    imageAlt: "A hand drawing a line illustration on white paper",
  },

  hero: {
    kicker: "Whiteboard Animation Video",
    title: ["Drawn", "line by line.", "Understood", "at once."],
    lead: "Whiteboard animation builds your idea in front of the viewer — a hand, a pen and a clean white page. People follow it to the end, because they watch it being made.",
    video: clip("whiteboard-hero"),
    artefact: "board",
  },

  // the board artefact (VideoAnimation/kit/Board): drawn left to right, one picture per line of voice
  board: { title: "How it works", labels: ["The idea", "The plan", "Understood"] },

  story: {
    kicker: "Why whiteboard works",
    statement: "Watching an idea get drawn is the closest thing to sitting in the room while someone explains it.",
    text: [
      "The page starts empty. Each line arrives as the voice mentions it, so the viewer's eye is always exactly where the story is — nothing to scan, nothing to miss.",
      "That makes whiteboard the format for things that need to be understood, not just seen: a process, a policy, a service with moving parts. We draw it so the last frame works as a one-page summary of everything said.",
    ],
    img: VIMG.board, alt: "A man writing a plan on a whiteboard with a marker",
  },

  does: {
    kicker: "What a whiteboard video does",
    title: "Built for understanding.",
    items: [
      { name: "Teach a process", problem: "A process with steps, rules and exceptions loses people on paper.", answer: "Each step is drawn as it's explained, building a map the viewer can hold in their head.", where: ["Training", "Education", "Help centre"] },
      { name: "Explain a service", problem: "Services are invisible — there's nothing to film.", answer: "We draw what the service does for people, turning an abstract offer into simple pictures and a clear sequence.", where: ["Website", "Sales", "Proposals"] },
      { name: "Bring in a policy", problem: "Internal changes land as long emails nobody reads.", answer: "A calm, clear film that walks through what's changing, why, and what to do — the same for everyone.", where: ["Internal comms", "HR", "Onboarding"] },
      { name: "Make a case", problem: "Your argument has several moving parts and a conclusion.", answer: "We draw the reasoning step by step, so the conclusion feels earned by the time it appears.", where: ["Pitches", "Funding", "Public sector"] },
    ],
  },

  showcase: {
    kicker: "By hand",
    title: "Every line drawn for the film.",
    text: "Illustrations are drawn for each script — not pulled from a library — so every picture says exactly what the voice says.",
    video: clip("whiteboard-pencil"),
    captions: ["Rough", "Line", "Detail", "Draw-on"],
  },

  capabilities: {
    kicker: "Capabilities",
    title: "Everything on the board.",
    items: [
      { name: "Script & visual metaphors", text: "A script written to be drawn — every line paired with a picture that carries it." },
      { name: "Hand-drawn illustration", text: "Custom drawings in a consistent hand, built for your topic and audience." },
      { name: "Draw-on animation", text: "Lines revealed in the order a hand would draw them, timed to the voice." },
      { name: "Colour accents", text: "Classic black on white, or a single brand colour used to point the eye." },
      { name: "Board styles", text: "Whiteboard, blackboard, glassboard or paper — the surface that suits the subject." },
      { name: "Voice-over & captions", text: "A clear, warm voice, light music, and captions for viewing with the sound off." },
    ],
  },

  process: {
    kicker: "Process",
    title: "From blank board to final film.",
    steps: [
      { name: "Script", text: "We write a script made to be drawn — short sentences, one idea each.", out: "Approved script" },
      { name: "Visual plan", text: "Each line gets its picture: a sketched board plan showing what's drawn when.", out: "Board plan" },
      { name: "Illustration", text: "Final drawings in a consistent hand, prepared in the order they'll appear.", out: "Illustration set" },
      { name: "Draw-on animation", text: "The hand draws each picture as the voice reaches it; the camera moves across the board.", out: "First cut" },
      { name: "Voice, sound & delivery", text: "Final voice, music, mix and captions, delivered in every format you need.", out: "Masters & captions" },
    ],
  },

  creative: {
    kicker: "Draw-on",
    title: "Watch the board fill.",
    text: "This board draws itself live in the page, line by line, the way a whiteboard film builds — each picture arriving as its sentence is spoken.",
    artefact: "board",
    video: clip("whiteboard-marker"),
    videoAlt: "A hand drawing a curve with a marker on a cutting mat",
  },

  quality: {
    kicker: "Production approach",
    title: "Clear before clever.",
    text: "A whiteboard film has one job: to be understood the first time. Every film goes through these checks before it's delivered.",
    checks: [
      "Every sentence paired with one picture — never two ideas at once",
      "Drawings legible on a phone, not just a monitor",
      "Draw-on timed so each picture finishes as its line is spoken",
      "The final board readable as a one-page summary",
      "Voice paced for learning, with room to breathe",
      "Captions and transcript checked word for word",
    ],
    img: VIMG.notebook, alt: "A designer's desk with a sketchbook and drawing pens in a tray",
  },

  faq: {
    kicker: "Questions",
    title: "About whiteboard animation.",
    items: [
      { q: "Is whiteboard animation right for our topic?", a: "It works best for things that need to be understood — processes, services, policies, arguments. If your story is about atmosphere or a physical product, 2D, 3D or live action may serve it better, and we'll say so." },
      { q: "Are the drawings custom?", a: "Yes. Every picture is drawn for your script, in one consistent hand, so the film looks like it was made for you — because it was." },
      { q: "Can we use our brand colours?", a: "Yes. Most whiteboard films use black line work with one accent colour; we can make that accent yours, or work on a coloured or dark board." },
      { q: "How long should it be?", a: "Short enough to keep attention, long enough to explain properly. Training films can run longer than a sales piece; we'll recommend a length with the script." },
      { q: "Can it be updated later?", a: "Yes. Because each scene is built separately, a changed step or a new rule can be redrawn and re-voiced without remaking the whole film." },
      { q: "Can you make versions in other languages?", a: "Yes. We keep on-screen words to a minimum and editable, then record new voice-overs and captions for each language." },
    ],
  },

  cta: {
    title: ["Let's draw", "your idea."],
    text: "Tell us what people need to understand. We'll come back with a script approach, a board style and a schedule.",
    video: clip("whiteboard-marker"),
  },
};

export default whiteboard;
