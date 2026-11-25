// /services/video-animation — the Video & Animation category page (src/components/VideoAnimation/Main).
// Copy: the live site's own lines where it has them (marked "live"), otherwise written from the services
// themselves. No figures, prices or client names. The footage is licensed stock used to show each craft,
// and the page says so (it is not presented as client work).
import { SERVICE_CATEGORIES, visibleItems } from "@/data/service-categories";
import { VIMG, clip } from "./media";

export const VIDEO_PATH = "/services/video-animation";

const cat = SERVICE_CATEGORIES.find((c) => c.key === "video");
const SHORT = { "/services/explainer-videos": "Explainer videos", "/services/whiteboard-videos-animation": "Whiteboard animation" };
const LINE = {
  "/services/explainer-videos": "A product or idea made obvious — scripted, voiced and animated.",
  "/services/whiteboard-videos-animation": "Your idea drawn line by line, in front of the viewer.",
};
// The two active service pages (the other offerings are hidden — src/data/service-categories.js)
export const VIDEO_CHILDREN = visibleItems(cat.items).map((it) => ({ full: it.name, name: SHORT[it.href] || it.name, path: it.href, text: LINE[it.href] }));

export const VIDEO_PAGE = {
  seo: {
    title: "Video Production & Animation Studio, New York | The Lincoln Media",
    description:
      "Brand films, explainer videos, 2D and 3D animation, motion graphics and full video production — written, shot, animated and finished by The Lincoln Media in New York.",
    keywords: ["video production company", "animation studio", "explainer videos", "2D animation", "3D animation", "motion graphics", "brand film", "corporate video", "commercial production", "New York video agency"],
    image: clip("backstage").poster,
    imageAlt: "A camera operator lining up a low shot on a dark, teal-lit film set",
  },

  hero: {
    kicker: "Video & Animation",
    title: ["Stories,", "shot and", "animated."],
    credit: "A Lincoln Media production — New York",
    lead: "Giving your world a better, more inspirational look. Tell amazing stories with our video animation.", // (live)
    sub: "We write, shoot, animate and finish films that make a brand look and sound its best — from the first idea to the final frame.",
    video: clip("backstage"),
    crafts: ["Brand films", "Explainers", "2D animation", "3D animation", "Motion graphics", "Commercials", "Corporate films", "Social cut-downs"],
  },

  motion: {
    kicker: "The power of motion",
    // the statement: strings are words, { img } is a picture set into the line
    statement: [
      "People decide in seconds.", { img: VIMG.lens, alt: "A cinema lens, close" },
      "A moving image holds them there — it explains faster than a page,", { img: VIMG.negative, alt: "A roll of 35mm film negative" },
      "stays longer than a slide, and carries a feeling that words alone can't.",
    ],
    notes: [
      { name: "Attention", text: "Motion is the first thing the eye goes to — on a homepage, in a feed, on a screen across the room." },
      { name: "Clarity", text: "A process shown is understood. The right pictures replace pages of explanation." },
      { name: "Feeling", text: "Picture, music and voice together make people feel something about a brand. That's what they remember." },
    ],
    image: VIMG.street, imageAlt: "A news camera operator filming in a busy city street",
  },

  reel: {
    kicker: "Showreel",
    title: "The crafts, cut together.",
    note: "Craft reel · licensed footage",
    chapters: [
      { label: "Camera", text: "Stabilised, moving camera on a cleared stage.", clip: clip("steadicam") },
      { label: "Illustration", text: "Drawn frames on the tablet, ready to animate.", clip: clip("illustrate") },
      { label: "Direction", text: "Talent, camera and director working the take.", clip: clip("crew") },
      { label: "Rigs", text: "A crane move — the shot that opens a film.", clip: clip("crane") },
    ],
  },

  formats: {
    kicker: "What we create",
    title: "Every format a story needs.",
    text: "One studio for the whole range — choose a format to see where it lives and what it does.",
    items: [
      { name: "Brand films", text: "The film that says who you are — for the homepage, the pitch and the launch.", where: ["Homepage", "Launch", "Investor deck"], clip: clip("backstage") },
      { name: "Explainer videos", text: "A product or idea made simple: script, voice and animation in one short story.", where: ["Landing page", "Sales", "Onboarding"], clip: clip("explainer-hero"), href: "/services/explainer-videos" },
      { name: "Whiteboard animation", text: "An idea drawn line by line in front of the viewer — the format people follow to the end.", where: ["Training", "Education", "Internal"], clip: clip("whiteboard-hero"), href: "/services/whiteboard-videos-animation" },
      { name: "2D animation", text: "Illustrated, frame-led animation with character — flat, textured or hand-drawn.", where: ["Campaign", "Social", "Explainer"], clip: clip("illustrate") },
      { name: "3D animation", text: "Products, spaces and mechanisms modelled, lit and moved in three dimensions.", where: ["Product", "Architecture", "Engineering"], clip: clip("model3d") },
      { name: "Motion graphics", text: "Type, data and interface in motion — titles, lower thirds and graphics packages.", where: ["Events", "Broadcast", "Social"], clip: clip("type") },
      { name: "Product videos", text: "Your product shown working: the features, the details and the moment it earns its place.", where: ["E-commerce", "Launch", "Retail"], clip: clip("slate") },
      { name: "Corporate films", text: "Culture, leadership and recruitment films that sound like your people.", where: ["Careers", "Internal", "Annual report"], clip: clip("crew") },
      { name: "Social media videos", text: "Vertical, captioned and built for the first second of the scroll.", where: ["Reels", "Shorts", "Stories"], clip: clip("steadicam") },
      { name: "Commercials", text: "Broadcast and pre-roll spots built around one idea and one memorable shot.", where: ["TV", "Pre-roll", "Cinema"], clip: clip("crane") },
      { name: "Promotional videos", text: "Launches, events and offers — films made for a moment in time.", where: ["Events", "Offers", "Launch"], clip: clip("beam") },
      { name: "Storytelling films", text: "Documentary-led films built on real people, real places and real voices.", where: ["Brand", "Impact", "Case story"], clip: clip("projector") },
    ],
  },

  interlude: {
    kicker: "Interlude",
    title: "Every film starts with one idea",
    video: clip("projector"),
    lines: ["Every film starts in the dark.", "Then one idea catches the light.", "Everything else is built around it —", "the words, the pictures, the sound, the cut."],
  },

  pipeline: {
    kicker: "From concept to motion",
    title: "Idea to final film, one frame at a time.",
    stages: [
      { name: "Idea", text: "One sentence the whole film has to prove. We find it with you before anything is written.", img: VIMG.idea, alt: "A designer sketching a first idea in a notebook" },
      { name: "Script", text: "Words timed to the second — voice, on-screen text and what the picture does on every line.", artefact: "script" },
      { name: "Storyboard", text: "Every shot drawn as a frame, so you see the film before a single frame is made.", artefact: "board" },
      { name: "Design", text: "Style frames set the look: palette, type, texture and light.", img: VIMG.design, alt: "A colour picker open over a type design on a monitor" },
      { name: "Animation", text: "Frames brought to life — timing, spacing and the weight that makes motion believable.", poster: clip("illustrate").poster, alt: "An illustrator drawing frames on a pen display" },
      { name: "Sound", text: "Voice, music and effects mixed so the film works with the sound on — and captioned for when it's off.", poster: clip("sound").poster, alt: "Hands on a lit mixing console" },
      { name: "Final film", text: "Graded, mastered and delivered in every format and ratio you need.", img: VIMG.final, alt: "A vintage film projector lit in a dark room" },
    ],
    // the script page (screenplay layout, written for this page)
    script: [
      { k: "scene", t: "INT. KITCHEN — MORNING" },
      { k: "action", t: "Coffee pours. A phone lights up on the counter." },
      { k: "who", t: "VOICE (V.O.)" },
      { k: "line", t: "Every morning starts with a list." },
      { k: "action", t: "The list on the screen rearranges itself." },
      { k: "who", t: "VOICE (V.O.)" },
      { k: "line", t: "What if it sorted itself?" },
    ],
    board: [
      { img: VIMG.sketch, shot: "WS", note: "Open on the desk" },
      { img: VIMG.street, shot: "MS", note: "Cut to the street" },
      { img: VIMG.lens, shot: "CU", note: "Push in, rack focus" },
    ],
  },

  showcase: {
    kicker: "Animation showcase",
    title: "Made to move.",
    text: "Pieces from the cutting room — live animations running in this page, and footage of the crafts behind them.",
    pieces: [
      { kind: "kinetic", name: "Kinetic typography", text: "Words cut to the beat of the voice.", words: ["Say", "less.", "Show", "more."] },
      { kind: "clip", name: "Illustration in motion", text: "Drawn frames, built for animation.", clip: clip("illustrate") },
      { kind: "bounce", name: "2D — squash & stretch", text: "The first exercise every animator learns: weight, timing, spacing." },
      { kind: "clip", name: "3D modelling", text: "Products built and lit before they exist.", clip: clip("model3d"), tall: true },
      { kind: "lower", name: "Motion graphics", text: "A lower third, the way it lands on screen.", lines: ["The Lincoln Media", "Video & Animation · New York"] },
      { kind: "product", name: "Product animation", text: "An interface demo: tap, transition, done.", app: { title: "Today", items: ["Review the storyboard", "Record the voice-over", "Approve the first cut"], done: "Film approved" } },
    ],
  },

  production: {
    kicker: "Video production",
    title: "Pre-production to final mix.",
    stages: [
      { name: "Pre-production", text: "Treatment, script, casting, locations and schedule — decided before anyone presses record.", items: ["Treatment", "Script & shot list", "Casting & locations", "Call sheets"], clip: clip("pre") },
      { name: "Production", text: "Directed shoots with the crew, camera, light and sound the idea needs — and nothing it doesn't.", items: ["Direction", "Cinematography", "Lighting", "Location sound"], clip: clip("slate") },
      { name: "Post-production", text: "Every piece brought into one pipeline, with a review link at each stage.", items: ["Assembly", "Review rounds", "Versioning", "Mastering"], clip: clip("post") },
      { name: "Editing", text: "The story found in the footage: pace, structure and the cut that keeps people watching.", items: ["Offline edit", "Online edit", "Cut-downs", "Subtitles"], clip: clip("edit") },
      { name: "Colour", text: "A graded look that holds from scene to scene and suits the brand.", items: ["Correction", "Grade", "Look development", "HDR & SDR"], clip: clip("grade") },
      { name: "Sound", text: "Voice-over, music, effects and a mix that's clear on a laptop and full in a room.", items: ["Voice casting", "Music licensing", "Sound design", "Final mix"], clip: clip("sound") },
      { name: "Motion", text: "Titles, graphics and animation layered into live footage.", items: ["Titles", "Lower thirds", "Graphics packages", "End cards"], clip: clip("type") },
    ],
  },

  story: {
    kicker: "Visual storytelling",
    title: "Every frame has a job.",
    text: "We build films the way stories have always worked — three movements, each with a job to do. Your message lives in the change between the first frame and the last.",
    acts: [
      { name: "Setup", text: "Open on the world your audience already knows: their day, their problem, in their words.", img: VIMG.street, alt: "A camera operator filming a crowd in a city street" },
      { name: "Tension", text: "Then the moment it gets hard — the friction your product, service or idea exists to remove.", img: VIMG.lens, alt: "A cinema lens in blue light" },
      { name: "Resolution", text: "And the change: what it looks like after. The last frame is the one people remember, so it carries your name.", img: VIMG.negative, alt: "A curl of 35mm film negative on a reflective table" },
    ],
  },

  tech: {
    kicker: "Creative technology",
    title: "The tools behind the picture.",
    text: "Each layer below is live — pick one to see it working.",
    layers: [
      { key: "comp", name: "Visual effects & compositing", text: "Green screen keyed and placed into a new world. Drag across the frame to compare the composite with the original plate.", plate: VIMG.greenscreen, bg: VIMG.set },
      { key: "3d", name: "3D", text: "Modelling, lighting and rendering for products and spaces that don't exist yet — or can't be filmed.", clip: clip("model3d") },
      { key: "motion", name: "Motion design", text: "Typography and layout set in motion, designed frame by frame.", clip: clip("type") },
      { key: "graphics", name: "Motion graphics", text: "Graphics packages built as templates, so titles stay consistent across every film.", lines: ["Chapter two", "Behind the scenes"] },
      { key: "interactive", name: "Interactive media", text: "Video that responds to the viewer. Move across the frame — or drag on a phone — to scrub this shot.", clip: clip("steadicam") },
    ],
  },

  faq: {
    kicker: "Questions",
    title: "Before the first frame.",
    items: [
      { q: "How long does a video take to make?", a: "It depends on the format. A motion-graphics piece can be turned round quickly; a live-action shoot with casting and locations needs more planning. Before work starts you get a schedule with every review date in it, and we keep to it." },
      { q: "Do you write the script?", a: "Yes. Most of our films start with a short brief and a conversation. We write the script, you review it, and nothing is designed or shot until the words are approved." },
      { q: "Should we choose 2D, 3D or live action?", a: "It follows the job. Live action shows real people and places; 2D explains and adds personality; 3D shows products and spaces that can't be filmed easily. Many films mix them — we'll recommend one in the treatment and tell you why." },
      { q: "Do you handle voice-over and music?", a: "Yes. We cast voice talent, record in a treated booth, license music or have it composed, and mix the final sound. Every film is also captioned for viewers who watch with the sound off." },
      { q: "What formats do you deliver?", a: "A master file plus the cut-downs each channel needs — 16:9 for web and presentations, 9:16 and 4:5 for social, 1:1 where it helps — with captions and thumbnails." },
      { q: "How do reviews and changes work?", a: "Reviews are built into each stage — script, storyboard, animatic or rough cut, then the final cut — so changes happen when they are cheapest to make. The number of rounds is written into your proposal." },
      { q: "Do we own the finished film?", a: "Yes, the delivered film is yours. Licensed music and stock footage carry their own licence terms; we explain those before anything is signed off." },
    ],
  },

  cta: {
    kicker: "Final frame",
    title: ["Let's make", "your next film."],
    text: "Tell us the story you need to tell. We'll come back with a treatment, a plan and a schedule.",
    video: clip("beam"),
  },
};
