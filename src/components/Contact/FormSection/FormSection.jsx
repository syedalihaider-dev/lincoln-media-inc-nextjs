"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import { CONTACT_PAGE, CONTACT_FORM_ID } from "@/data/contact";
import ContactForm from "../Form/ContactForm";
import s from "./FormSection.module.css";

/**
 * The form's room — #contact-form, where every "start a project" button on the site lands
 * (scroll-margin keeps its first row clear of the fixed header). The panel's edge draws itself,
 * the heading rises, and the fields unveil row by row; the clip is cleared after, so the dropdowns
 * can open past their boxes.
 */
export default function FormSection() {
  const ref = useRef(null);
  const d = CONTACT_PAGE.form;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      const st = { trigger: q("[data-panel]")[0], start: "top 82%", once: true };
      gsap.fromTo(q("[data-edge]"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.inOut", scrollTrigger: st });
      gsap.fromTo(q("[data-head] > *"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: st });
      gsap.fromTo(q("[data-field]"), { clipPath: "inset(0% 0% 100% 0%)", y: 26 }, {
        clipPath: "inset(-40% -4% -40% -4%)", y: 0, duration: 1, stagger: 0.07, ease: "expo.out", delay: 0.25, scrollTrigger: st,
        onComplete() { gsap.set(this.targets(), { clearProps: "clipPath,transform" }); },
      });
    });
  });

  return (
    <section ref={ref} id={CONTACT_FORM_ID} className={s.section} aria-labelledby="form-title">
      <div className={s.panel} data-panel>
        <span className={s.edge} data-edge aria-hidden="true" />
        <header className={s.head} data-head>
          <p className={s.kicker}>{d.kicker}</p>
          <h2 id="form-title" className={s.title}>{d.title}</h2>
          <p className={s.text}>{d.text}</p>
        </header>
        <ContactForm copy={d} />
      </div>
    </section>
  );
}
