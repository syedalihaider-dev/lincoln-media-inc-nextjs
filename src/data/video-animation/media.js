// Video & Animation media. Footage: Mixkit (free licence), trimmed and re-encoded for the web
// (1280×720 H.264, no audio; "-mobile" = 640×360 for phones). Stills: frames from Mixkit clips.
import lens from "@public/images/video-animation/lens.webp";
import negative from "@public/images/video-animation/negative.webp";
import street from "@public/images/video-animation/street.webp";
import idea from "@public/images/video-animation/idea.webp";
import design from "@public/images/video-animation/design.webp";
import final from "@public/images/video-animation/final.webp";
import greenscreen from "@public/images/video-animation/greenscreen.webp";
import studio from "@public/images/video-animation/studio.webp";
import set from "@public/images/video-animation/set.webp";
import reel from "@public/images/video-animation/reel.webp";
import desk3d from "@public/images/video-animation/desk3d.webp";
import sketch from "@public/images/video-animation/sketch.webp";
import review from "@public/images/video-animation/review.webp";
import mic from "@public/images/video-animation/mic.webp";
import voice from "@public/images/video-animation/voice.webp";
import board from "@public/images/video-animation/board.webp";
import notebook from "@public/images/video-animation/notebook.webp";
import pencil from "@public/images/video-animation/pencil.webp";
import drawing from "@public/images/video-animation/drawing.webp";

export const VIMG = { lens, negative, street, idea, design, final, greenscreen, studio, set, reel, desk3d, sketch, review, mic, voice, board, notebook, pencil, drawing };

const DIR = "/videos/video-animation";
// clips with a phone encode (full-bleed backgrounds)
const MOBILE = new Set(["backstage", "projector", "beam", "explainer-hero", "whiteboard-hero"]);
// model3d is portrait (720×1280); every other clip is 1280×720
const PORTRAIT = new Set(["model3d"]);

/** A clip: { src, mobile?, poster, w, h } */
export const clip = (name) => ({
  name,
  src: `${DIR}/${name}.mp4`,
  mobile: MOBILE.has(name) ? `${DIR}/${name}-mobile.mp4` : undefined,
  poster: `${DIR}/${name}-poster.jpg`,
  w: PORTRAIT.has(name) ? 720 : 1280,
  h: PORTRAIT.has(name) ? 1280 : 720,
});
