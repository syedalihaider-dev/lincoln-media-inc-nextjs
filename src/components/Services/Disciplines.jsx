"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import { PROCESS } from "@/data/home";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import Label from "@/components/About/Label";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgApp from "@public/images/services/mobile-app-development.jpg";
import imgWeb from "@public/images/services/web-development.jpg";
import imgMarketing from "@public/images/services/digital-marketing.jpg";
import imgBrand from "@public/images/services/branding.jpg";
import imgBags from "@public/images/services/ecommerce.jpg";
import styles from "./Disciplines.module.css";

const cat = Object.fromEntries(SERVICE_CATEGORIES.map((c) => [c.key, c]));
const proc = Object.fromEntries(PROCESS.map((p) => [p.title, p.text]));
// Related inner services, by their live names (URLs come from the categories, so they always match the menu)
const items = Object.fromEntries(SERVICE_CATEGORIES.flatMap((c) => c.items.map((it) => [it.name, it])));
const pick = (...names) => names.map((n) => items[n]).filter(Boolean);

// Six disciplines, each told only with the studio's existing words (live services page, this site's copy)
const CHAPTERS = [
  {
    key: "strategy", kicker: "Digital Strategy", layout: "split",
    lead: proc.Strategy,
    paras: [proc.Discover, "Creativity, technology and strategy. One team. Zero hand-offs."],
    related: pick("UX Design Workshop", "UX Audit", "Conversion Rate Optimization (CRO)", "Content Marketing"),
    images: [imgTeam],
  },
  {
    key: "design", kicker: "Design & User Experience", layout: "collage",
    lead: cat.ux.blurb,
    paras: [cat.ux.text, proc.Design],
    related: pick("UX Design", "Responsive Web Design", "Landing Page Design", "PSD to Responsive HTML", "Graphic Design"),
    images: [imgUx, imgApp],
  },
  {
    key: "development", kicker: "Development", layout: "panorama",
    lead: cat.web.blurb,
    paras: [cat.web.text, cat.mobile.blurb, cat.commerce.blurb, proc.Build],
    related: pick("WordPress Development", "Laravel Development", "Enterprise Development", "iOS App Development", "Android App Development", "Shopify Plus E-commerce Development"),
    images: [imgWeb],
  },
  {
    key: "growth", kicker: "Marketing & Growth", layout: "split flip",
    lead: cat.marketing.blurb,
    paras: [cat.marketing.text, proc["Launch & Grow"]],
    related: pick("Search Engine Optimization (SEO)", "Pay Per Click (PPC)", "Social Media Marketing (SMM)", "Email Marketing", "Content Marketing"),
    images: [imgMarketing],
  },
  {
    key: "branding", kicker: "Branding & Communication", layout: "collage flip",
    lead: cat.brand.blurb,
    paras: [cat.brand.text],
    related: pick("Logo Design", "Corporate Identity Design", "Company Profile & Brochure Design", "Packaging Designs", "Business Card Design"),
    images: [imgBrand, imgBags],
  },
  {
    key: "motion", kicker: "Motion & Animation", layout: "panorama video",
    lead: cat.video.blurb,
    paras: [cat.video.text, cat.animation.text],
    related: pick("Explainer Video Production", "Whiteboard Animation Video", "2D Animation", "3D Animation"),
    images: [],
  },
];

/**
 * What the studio provides, discipline by discipline. Six chapters, three ways of laying out a
 * chapter — a split with a photograph opening beside the words, a collage of two photographs at
 * different depths, a panorama that widens to the full screen as you scroll (live footage for
 * motion) — each mirrored once, so no two neighbours look alike.
 */
export default function Disciplines() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-ch]", root).forEach((ch) => {
        const kind = ch.dataset.ch;
        gsap.fromTo(ch.querySelectorAll("[data-t]"), { clipPath: "inset(0% 100% 0% 0%)", x: -20 }, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1.1, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: ch, start: "top 70%", once: true } });
        gsap.fromTo(ch.querySelectorAll("[data-rel] li"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: ch.querySelector("[data-rel]"), start: "top 88%", once: true } });
        if (kind.startsWith("panorama")) {
          gsap.fromTo(ch.querySelector("[data-pano]"), { clipPath: "inset(0% 14% 0% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ch, start: "top 85%", end: "top 15%", scrub: 0.6 } });
          const img = ch.querySelector("[data-pano] img");
          if (img) gsap.fromTo(img, { scale: 1.25, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true } });
        } else {
          gsap.utils.toArray("[data-img]", ch).forEach((f, i) => {
            gsap.fromTo(f, { clipPath: i ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 40%", scrub: 0.6 } });
            gsap.fromTo(f, { yPercent: i ? 18 : 6 }, { yPercent: i ? -18 : -6, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="disciplines" className={styles.disc} aria-labelledby="disc-title">
      <header className={styles.head}>
        <Label>What we provide</Label>
        <h2 id="disc-title" className={styles.title}>From the first workshop <em>to the launch and beyond.</em></h2>
      </header>

      {CHAPTERS.map((ch) => {
        const [layout, mod] = ch.layout.split(" ");
        return (
          <article key={ch.key} id={ch.key} className={`${styles.chapter} ${styles[layout]} ${mod ? styles[mod] : ""}`} data-ch={ch.layout}>
            {layout === "panorama" && (
              <figure className={styles.pano} data-pano aria-hidden="true">
                {mod === "video"
                  ? <VideoBackground src="/videos/smoke.mp4" mobileSrc="/videos/smoke-mobile.mp4" poster="/videos/smoke-poster.jpg" tint={false} />
                  : <Image src={ch.images[0]} alt="" fill sizes="100vw" />}
                <span className={styles.panoName}>{ch.kicker}</span>
              </figure>
            )}
            {layout !== "panorama" && (
              <div className={styles.media} aria-hidden="true">
                {ch.images.map((img, i) => (
                  <figure key={i} className={`${styles.img} ${styles[`img${i}`]}`} data-img><Image src={img} alt="" fill sizes="(min-width: 901px) 40vw, 90vw" /></figure>
                ))}
              </div>
            )}
            <div className={styles.copy}>
              <p className={styles.kicker} data-t>{ch.kicker}</p>
              <h3 className={styles.lead} data-t>{ch.lead}</h3>
              <div className={styles.paras}>
                {ch.paras.map((p) => <p key={p} data-t>{p}</p>)}
              </div>
              <ul className={styles.related} data-rel aria-label={`${ch.kicker} services`}>
                {ch.related.map((it) => (
                  <li key={it.name}>{it.href ? <a href={it.href}>{it.name}</a> : <span>{it.name}</span>}</li>
                ))}
              </ul>
              {/* one word keeps the button on a single line on phones */}
              <div><Button href="/#contact" variant="text">Talk to us about {ch.kicker.split(" ")[0].toLowerCase()}</Button></div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
