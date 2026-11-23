"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import RevealText from "@/components/Common/RevealText";
import { Browser, Phone, Site, ScreenBody, screenUrl } from "./ui/Screens";
import styles from "./ChildExpertise.module.css";

// The interface each discipline produces
function Screen({ kind, photos, ui }) {
  if (kind === "phone") return <Phone><Site photos={photos} compact /></Phone>;
  return <Browser dark={kind === "code"} url={screenUrl(kind, ui)}><ScreenBody kind={kind} photos={photos} ui={ui} /></Browser>;
}

/**
 * Expertise as an editorial sequence. Each discipline is a chapter: its name set large and rising
 * out of a mask, the detail beside it, and a composition of a real photograph and the real interface
 * the work produces — code, theme system, plugin settings, the CMS editor, the phone. As a chapter
 * arrives the photograph opens through a wipe, the interface swings in from depth in front of it, and
 * the two drift at different speeds while you read. Chapters alternate sides.
 */
export default function ChildExpertise({ data, photos, ui }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const splits = [];
      gsap.utils.toArray("[data-chapter]", root).forEach((ch, i) => {
        const flip = i % 2 ? -1 : 1;
        const photo = ch.querySelector("[data-photo]"), ui = ch.querySelector("[data-ui]");
        gsap.fromTo(photo, { clipPath: flip > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", scrollTrigger: { trigger: ch, start: "top 85%", end: "top 35%", scrub: 0.6 } });
        gsap.fromTo(photo.querySelector("img"), { scale: 1.3 }, { scale: 1.05, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(ui, { rotationY: flip * -28, z: -200, opacity: 0, xPercent: flip * 10 }, { rotationY: flip * -8, z: 0, opacity: 1, xPercent: 0, ease: "power3.out", scrollTrigger: { trigger: ch, start: "top 70%", end: "top 25%", scrub: 0.8 } });
        gsap.fromTo(ui, { yPercent: 10 }, { yPercent: -14, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true } });
        const s = SplitText.create(ch.querySelector("[data-name]"), { type: "lines", mask: "lines" });
        splits.push(s);
        gsap.from(s.lines, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ch, start: "top 72%", once: true } });
        gsap.from(ch.querySelectorAll("[data-detail] > *"), { y: 26, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ch, start: "top 65%", once: true } });
      });
      return () => splits.forEach((s) => s.revert());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="expertise" className={styles.exp} aria-labelledby="expertise-title">
      <header className={styles.head}>
        <Label>{data.kicker}</Label>
        <RevealText id="expertise-title" className={styles.title}>{data.title}</RevealText>
        <p className={styles.intro}>{data.intro}</p>
      </header>

      <ol className={styles.chapters}>
        {data.items.map((it, i) => (
          <li key={it.name} className={`${styles.chapter} ${i % 2 ? styles.flip : ""}`} data-chapter>
            <div className={styles.text}>
              <h3 className={styles.name} data-name>{it.name}</h3>
              <div className={styles.detail} data-detail>
                <p className={styles.lead}>{it.lead}</p>
                <p className={styles.body}>{it.text}</p>
                <ul className={styles.points}>{it.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
            <div className={styles.visual}>
              <figure className={styles.photo} data-photo>
                <Image src={it.photo} alt={it.photoAlt} fill sizes="(max-width: 900px) 92vw, 46vw" quality={80} className={styles.cover} />
              </figure>
              <div className={`${styles.ui} ${it.screen === "phone" ? styles.uiPhone : ""}`} data-ui>
                <Screen kind={it.screen} photos={photos} ui={ui} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
