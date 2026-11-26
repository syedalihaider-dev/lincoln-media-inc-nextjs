"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Social from "@/components/Common/Social";
import Clock from "@/components/Common/Clock";
import { SITE } from "@/data/site";
import { CONTACT_PAGE } from "@/data/contact";
import s from "./Studio.module.css";

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.street}, ${SITE.locality}`)}`;

/**
 * The studio — Manhattan at dusk opens from a narrow vertical slit into a wide frame while the
 * photograph drifts inside it; the address card rises across its lower edge with the live clock,
 * a maps link and the studio's social profiles.
 */
export default function Studio() {
  const ref = useRef(null);
  const d = CONTACT_PAGE.studio;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      const fig = q("[data-fig]")[0];
      gsap.fromTo(fig, { clipPath: "inset(0% 42% 0% 42% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: fig, start: "top 90%", end: "top 25%", scrub: 0.6 } });
      gsap.fromTo(q("[data-pic]"), { yPercent: -10, scale: 1.18 }, { yPercent: 6, scale: 1.05, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-card]"), { y: 120 }, { y: 0, ease: "none", scrollTrigger: { trigger: fig, start: "top 70%", end: "center 45%", scrub: 0.6 } });
      gsap.fromTo(q("[data-card] [data-up]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: q("[data-card]")[0], start: "top 85%", once: true } });
    });
  });

  return (
    <section ref={ref} className={s.studio} aria-labelledby="studio-title">
      <figure className={s.fig} data-fig>
        <div className={s.pic} data-pic>
          <Image src={d.image} alt={d.alt} fill sizes="100vw" />
        </div>
      </figure>
      <div className={s.card} data-card>
        <p className={s.kicker} data-up>{d.kicker}</p>
        <h2 id="studio-title" className={s.title} data-up>{d.title}</h2>
        <address className={s.address} data-up>
          {SITE.name}<br />{SITE.street}<br />{SITE.locality}
        </address>
        <dl className={s.meta} data-up>
          <div><dt>Local time</dt><dd><Clock prefix="New York" /></dd></div>
          <div><dt>Directions</dt><dd><a href={MAPS} target="_blank" rel="noopener">Open in Google Maps ↗</a></dd></div>
        </dl>
        <div className={s.social} data-up>
          <p className={s.socialLabel}>Follow the studio</p>
          <Social size="sm" />
        </div>
      </div>
    </section>
  );
}
