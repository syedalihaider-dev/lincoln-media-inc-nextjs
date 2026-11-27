"use client";

/**
 * Pauses the looping CSS animations (scan lines, pulses, marquees, shimmers…) inside page sections
 * that are well away from the screen, and lets them run again shortly before the section comes back.
 *
 * Browsers keep ticking every running CSS animation each frame, visible or not, and each one marks its
 * element for a style update before the page's scroll handlers run — work that is paid on every frame
 * of scrolling. Paused animations keep their place, so on return they carry on exactly as they were.
 * (globals.css: [data-offscreen] … { animation-play-state: paused }.) JS-driven motion is unaffected.
 *
 * Observes each top-level <section> under `root`; returns a cleanup function.
 */
export function pauseOffscreenAnimations(root) {
  if (!root || typeof IntersectionObserver === "undefined") return () => {};
  const all = [...root.querySelectorAll("section")];
  // only the outermost sections: a nested section is covered by its parent's state
  const sections = all.filter((s) => !s.parentElement?.closest("section") || !root.contains(s.parentElement.closest("section")));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.removeAttribute("data-offscreen") : e.target.setAttribute("data-offscreen", ""))),
    // a full screen of margin above and below: animations are already running when a section arrives
    { rootMargin: "100% 0px 100% 0px" }
  );
  sections.forEach((s) => io.observe(s));
  return () => {
    io.disconnect();
    sections.forEach((s) => s.removeAttribute("data-offscreen"));
  };
}
