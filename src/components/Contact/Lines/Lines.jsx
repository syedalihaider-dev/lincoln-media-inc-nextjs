"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import { SITE } from "@/data/site";
import { CONTACT_PAGE } from "@/data/contact";
import s from "./Lines.module.css";

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.street}, ${SITE.locality}`)}`;
const LINES = [
  { verb: "Call", value: SITE.phone, href: SITE.phoneHref, note: "Speak to the team" },
  { verb: "Write", value: SITE.email, href: `mailto:${SITE.email}`, note: "Send a brief any time" },
  { verb: "Message", value: "WhatsApp", href: SITE.whatsapp, note: "Opens WhatsApp", ext: true },
  { verb: "Visit", value: `${SITE.street}, ${SITE.locality}`, href: MAPS, note: "Opens Google Maps", ext: true },
];

/**
 * Four direct lines, set as type rather than icon cards. Each row slides out from behind its own
 * edge as it scrolls in, its rule drawing across; on hover the value fills with light from the left
 * and the arrow steps forward.
 */
export default function Lines() {
  const ref = useRef(null);
  const d = CONTACT_PAGE.lines;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      q("[data-row]").forEach((row, i) => {
        const st = { trigger: row, start: "top 92%", end: "top 55%", scrub: 0.6 };
        gsap.fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(row.querySelector("[data-slide]"), { xPercent: i % 2 ? 8 : -8, clipPath: i % 2 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { xPercent: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: st });
      });
    });
  });

  return (
    <section ref={ref} className={s.lines} aria-labelledby="lines-title">
      <header className={s.head}>
        <p className={s.kicker}>{d.kicker}</p>
        <h2 id="lines-title" className={s.title}>{d.title}</h2>
      </header>
      <ul className={s.list}>
        {LINES.map((l) => (
          <li key={l.verb} className={s.row} data-row>
            <a href={l.href} className={s.link} {...(l.ext ? { target: "_blank", rel: "noopener" } : {})} aria-label={`${l.verb}: ${l.value}${l.ext ? " (opens in a new tab)" : ""}`}>
              <span className={s.slide} data-slide>
                <span className={s.verb}>{l.verb}</span>
                <span className={s.value}><span className={s.fill} data-text={l.value}>{l.value}</span></span>
                <span className={s.note}>{l.note}</span>
                <span className={s.arrow} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={l.ext ? "M6 18 18 6M9 6h9v9" : "M4 12h15M13 6l6 6-6 6"} /></svg></span>
              </span>
            </a>
            <i className={s.rule} data-rule aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
