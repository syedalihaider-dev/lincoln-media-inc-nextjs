import Image from "next/image";
import imgTowers from "@public/images/home/towers.jpg";
import imgEmpire from "@public/images/home/empire.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgNyc from "@public/videos/nyc-night-poster.jpg";
import s from "./Site.module.css";

/*
 * "Meridian" — a fictional Manhattan homes brand, the demo product for the UI/UX and PSD-to-HTML
 * pages. Real HTML, not a picture: it sizes itself with container queries, so the same markup lays
 * out as desktop, tablet or phone depending on the width of the frame it is in (put it in a
 * ScaledScreen at 1280 / 820 / 390, or animate the frame's width and watch it reflow).
 *
 * page: "home" · "listing" · "landing" · "dashboard"
 * fid:  "ui" (finished) · "grey" (greyscale, no imagery) · "wire" (wireframe boxes)
 * Hooks for animation: data-part="nav|hero|search|cards|form|footer|…" on each block.
 */

const Pic = ({ src, pos = "50% 50%", sizes = "30vw", priority = false }) => (
  <span className={s.pic}><Image src={src} alt="" fill sizes={sizes} quality={70} priority={priority} style={{ objectFit: "cover", objectPosition: pos }} /></span>
);
const Logo = () => <b className={s.logo}><i>M</i>Meridian</b>;

function Nav({ cta = "Book a viewing" }) {
  return (
    <header className={s.nav} data-part="nav">
      <Logo />
      <nav className={s.links}><span>Homes</span><span>Neighbourhoods</span><span>New developments</span><span>Journal</span></nav>
      <span className={s.navCta}>{cta}</span>
      <span className={s.burger}><i /><i /></span>
    </header>
  );
}

const HOMES = [
  [imgEmpire, "40% 40%", "Park Avenue loft", "2 bed · 2 bath · 1,240 sq ft", "$1,850,000"],
  [imgTowers, "50% 30%", "Hudson tower residence", "3 bed · 2 bath · 1,610 sq ft", "$2,400,000"],
  [imgDusk, "60% 60%", "Riverside studio", "Studio · 1 bath · 540 sq ft", "$725,000"],
];

function Cards({ count = 3 }) {
  return (
    <div className={s.cards} data-part="cards">
      {HOMES.slice(0, count).map(([img, pos, t, m, p]) => (
        <article key={t} className={s.card}>
          <Pic src={img} pos={pos} />
          <span className={s.tag}>New</span>
          <p className={s.price}>{p}</p>
          <p className={s.cardTitle}>{t}</p>
          <p className={s.meta}>{m}</p>
        </article>
      ))}
    </div>
  );
}

function Home({ priority }) {
  return (
    <>
      <Nav />
      <section className={s.hero} data-part="hero">
        <div className={s.heroText}>
          <p className={s.eyebrow}>Manhattan homes</p>
          <h3 className={s.h1}>Homes above the city.</h3>
          <p className={s.lead}>Apartments and lofts across Manhattan, chosen for the light, the view and the street below.</p>
          <div className={s.btns}><span className={s.btn}>Browse homes</span><span className={s.ghost}>Book a viewing</span></div>
        </div>
        <div className={s.heroPic}><Pic src={imgTowers} pos="50% 35%" sizes="40vw" priority={priority} /></div>
      </section>
      <div className={s.search} data-part="search">
        <label><small>Neighbourhood</small>Midtown</label>
        <label><small>Bedrooms</small>2+</label>
        <label><small>Budget</small>Up to $2.5M</label>
        <span className={s.btn}>Search</span>
      </div>
      <section className={s.section}>
        <div className={s.sectionHead}><h4 className={s.h2}>New this week</h4><span className={s.more}>View all</span></div>
        <Cards />
      </section>
      <footer className={s.footer} data-part="footer"><Logo /><span>Homes</span><span>Journal</span><span>Contact</span></footer>
    </>
  );
}

function Listing() {
  return (
    <>
      <Nav />
      <section className={s.gallery} data-part="hero">
        <div className={s.gMain}><Pic src={imgEmpire} pos="40% 40%" sizes="50vw" /></div>
        <div className={s.gSide}><Pic src={imgDusk} sizes="20vw" /><Pic src={imgNyc} sizes="20vw" /></div>
      </section>
      <section className={s.detail}>
        <div className={s.detailText} data-part="cards">
          <p className={s.eyebrow}>Midtown · Park Avenue</p>
          <h3 className={s.h1s}>Park Avenue loft</h3>
          <p className={s.facts}><span>2 bed</span><span>2 bath</span><span>1,240 sq ft</span><span>Doorman</span></p>
          <p className={s.lead}>A corner loft with eleven-foot windows facing south over Park Avenue, a chef's kitchen and a quiet bedroom wing.</p>
        </div>
        <div className={s.form} data-part="form">
          <p className={s.price}>$1,850,000</p>
          <p className={s.formTitle}>Book a viewing</p>
          <label><small>Name</small><span>Sara Malik</span></label>
          <label><small>Email</small><span>sara@example.com</span></label>
          <label><small>Preferred day</small><span>Saturday morning</span></label>
          <span className={`${s.btn} ${s.full}`} data-cta>Request viewing</span>
        </div>
      </section>
    </>
  );
}

function Landing() {
  return (
    <>
      <header className={s.nav} data-part="nav"><Logo /><span className={s.navCta}>Register interest</span></header>
      <section className={`${s.hero} ${s.landHero}`} data-part="hero">
        <div className={s.heroText}>
          <p className={s.eyebrow}>Now registering · The Meridian West</p>
          <h3 className={s.h1}>Forty-two homes. One view.</h3>
          <p className={s.lead}>A new building on the West Side, with residences from one to four bedrooms and a rooftop over the Hudson.</p>
          <div className={s.btns}><span className={s.btn} data-cta>Register interest</span></div>
        </div>
        <div className={s.heroPic}><Pic src={imgDusk} pos="60% 55%" sizes="40vw" /></div>
      </section>
      <section className={s.points} data-part="cards">
        {[["Rooftop", "A planted roof terrace over the river."], ["Light", "Floor-to-ceiling windows in every room."], ["Location", "Two blocks from the High Line."]].map(([t, d]) => (
          <p key={t}><b>{t}</b>{d}</p>
        ))}
      </section>
      <section className={s.register} data-part="form">
        <p className={s.h2}>Be first to choose.</p>
        <div className={s.regFields}><span>Full name</span><span>Email</span><span className={s.btn}>Register</span></div>
      </section>
    </>
  );
}

function Dashboard() {
  const rows = [["Park Avenue loft", "Viewing · Sat 10:00", "Confirmed"], ["Hudson tower residence", "Offer received", "Review"], ["Riverside studio", "Viewing · Sun 14:30", "Pending"], ["Chelsea duplex", "Listed today", "Live"]];
  return (
    <div className={s.dash}>
      <aside className={s.dSide} data-part="nav"><Logo /><span className={s.dOn}>Overview</span><span>Listings</span><span>Viewings</span><span>Clients</span><span>Messages</span></aside>
      <div className={s.dMain}>
        <div className={s.dTop} data-part="hero"><h3 className={s.h2}>Good morning, Ana</h3><span className={s.btn}>New listing</span></div>
        <div className={s.dCards} data-part="search">
          {[["Viewings this week", "14"], ["New enquiries", "9"], ["Offers to review", "2"]].map(([k, v]) => <p key={k}><small>{k}</small><b>{v}</b></p>)}
        </div>
        <div className={s.dTable} data-part="cards">
          {rows.map(([a, b, c]) => <p key={a}><b>{a}</b><span>{b}</span><em className={s[c.toLowerCase()]}>{c}</em></p>)}
        </div>
      </div>
    </div>
  );
}

const PAGES = { home: Home, listing: Listing, landing: Landing, dashboard: Dashboard };

export default function Site({ page = "home", fid = "ui", className = "", priority = false, full = false }) {
  const P = PAGES[page] || Home;
  return (
    <div className={`${s.wrap} ${full ? s.natural : ""} ${className}`} aria-hidden="true">
      <div className={`${s.site} ${s[fid]}`}><P priority={priority} /></div>
    </div>
  );
}
