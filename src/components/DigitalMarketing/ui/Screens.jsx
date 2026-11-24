import Image from "next/image";
import VideoBackground from "@/components/Common/VideoBackground";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgEmpire from "@public/images/home/empire.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import s from "./Screens.module.css";

/*
 * The demo campaign's interfaces, written in HTML at real device widths (1280 desktop, 390 phone).
 * One fictional client — "Yourbrand", a Midtown hotel — runs through all of them, so the page can
 * follow a single campaign from the search box to the return visit. Figures are demo-account data.
 * Hooks for the sections' animations: data-typed, data-result, data-ours, data-draw, data-bar,
 * data-funnel, data-cta, data-done, data-row, data-variant.
 */

export const Photo = ({ src, pos = "50% 50%", sizes = "(max-width: 900px) 50vw, 26vw", priority = false }) => (
  <Image src={src} alt="" fill sizes={sizes} quality={75} priority={priority} style={{ objectFit: "cover", objectPosition: pos }} />
);
export const Mark = ({ size = "md" }) => <span className={`${s.mark} ${s[size]}`}>Y</span>;

// An SVG path through a series, scaled into a w × h box against a shared maximum
export const path = (pts, max, w = 800, h = 220) =>
  pts.map((v, i) => `${i ? "L" : "M"}${((i / (pts.length - 1)) * w).toFixed(1)},${(h - (v / max) * h * 0.9).toFixed(1)}`).join(" ");
const THIS = [38, 42, 40, 47, 52, 50, 58, 61, 57, 66, 72, 70, 78, 84, 81, 90, 96, 94, 103, 110];
const PREV = [36, 37, 39, 38, 41, 40, 43, 42, 44, 46, 45, 48, 47, 50, 49, 52, 51, 54, 53, 55];
const MAX = Math.max(...THIS);

/* ——— Search results ——— */
export function Serp({ query = "boutique hotel midtown manhattan" }) {
  const others = [
    { site: "Weekend Journal", path: "travel › new-york", title: "The best boutique hotels in Midtown Manhattan", text: "From Bryant Park to Madison Avenue — the small hotels worth booking this season, with notes on rooms, views and neighbourhoods." },
    { site: "City Guide", path: "hotels › midtown", title: "Where to stay in Midtown: a neighbourhood guide", text: "Close to the theatres, the museums and the park. How to choose a hotel in Midtown, by budget and by block." },
    { site: "Travel Forum", path: "threads › nyc", title: "Quiet boutique hotel near Fifth Avenue?", text: "Looking for somewhere small with a view for a long weekend in November — any recommendations from recent stays?" },
  ];
  return (
    <div className={s.serp}>
      <header className={s.serpTop}>
        <span className={s.serpLogo}>Search</span>
        <div className={s.serpBox}><span data-typed>{query}</span><i className={s.caret} /></div>
      </header>
      <nav className={s.serpTabs}><b>All</b><span>Maps</span><span>Images</span><span>News</span><span>Hotels</span></nav>
      <div className={s.serpBody}>
        <div className={s.results}>
          <article className={s.res} data-result>
            <p className={s.resSite}><Mark size="sm" /><span><b>Yourbrand</b><em>yourbrand.com › autumn</em></span></p>
            <p className={s.sponsored}>Sponsored</p>
            <h4>Yourbrand Midtown — Autumn Park-View Rooms</h4>
            <p>Breakfast for two included. Two minutes from Madison Avenue. Book direct for the best rate.</p>
          </article>
          <article className={`${s.res} ${s.ours}`} data-result data-ours>
            <p className={s.resSite}><Mark size="sm" /><span><b>Yourbrand</b><em>yourbrand.com</em></span></p>
            <h4>Yourbrand — Boutique Hotel in Midtown Manhattan</h4>
            <p>A small hotel above Madison Avenue with park and skyline views, a rooftop bar and rooms designed for long weekends in the city.</p>
            <div className={s.sitelinks}><span>Rooms & suites</span><span>Autumn offer</span><span>The Journal</span><span>Book direct</span></div>
          </article>
          {others.map((r) => (
            <article key={r.title} className={s.res} data-result>
              <p className={s.resSite}><span className={s.favi}>{r.site[0]}</span><span><b>{r.site}</b><em>{r.path}</em></span></p>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
        <aside className={s.panel} data-result>
          <div className={s.panelImg}><Photo src={imgDusk} pos="40% 60%" /></div>
          <h4>Yourbrand Midtown</h4>
          <p className={s.stars}>★★★★★ <span>4.8 · Boutique hotel</span></p>
          <p>Madison Avenue, New York</p>
          <div className={s.panelBtns}><span>Website</span><span>Directions</span><b>Check rates</b></div>
        </aside>
      </div>
    </div>
  );
}

/* ——— The campaign landing page ——— */
export function Landing({ headline = "A weekend above Madison Avenue.", priority = false }) {
  return (
    <div className={s.site}>
      <header className={s.siteNav}>
        <span className={s.word}><Mark /> Yourbrand</span>
        <nav><span>Rooms</span><span>Dining</span><span>Offers</span><span>Journal</span></nav>
        <b className={s.navBtn}>Book</b>
      </header>
      <section className={s.siteHero}>
        <Photo src={imgDusk} pos="50% 70%" sizes="(max-width: 900px) 90vw, 60vw" priority={priority} />
        <div className={s.siteCopy}>
          <p className={s.eyebrow}>Autumn in Midtown</p>
          <h3 data-variant>{headline}</h3>
          <p>Park-view rooms with breakfast for two, steps from Fifth Avenue.</p>
        </div>
        <div className={s.booker}>
          <label><small>Check in</small>Fri 14 Nov</label>
          <label><small>Check out</small>Sun 16 Nov</label>
          <label><small>Guests</small>2 adults</label>
          <b data-cta>Check availability</b>
        </div>
      </section>
      <section className={s.rooms}>
        {[["Park View King", imgEmpire, "30% 40%"], ["Skyline Suite", imgTowers, "50% 40%"], ["Classic Queen", imgDusk, "70% 60%"]].map(([n, img, pos]) => (
          <article key={n}><div className={s.roomImg}><Photo src={img} pos={pos} /></div><h5>{n}</h5><p>Breakfast for two · Free cancellation</p></article>
        ))}
      </section>
    </div>
  );
}

/* ——— Checkout, with the confirmed state laid over it ——— */
export function Checkout() {
  return (
    <div className={s.checkout}>
      <header className={s.siteNav}><span className={s.word}><Mark /> Yourbrand</span><span className={s.secure}>Secure checkout</span></header>
      <div className={s.coBody}>
        <div className={s.coForm}>
          <ol className={s.steps}><li className={s.done}>Room</li><li className={s.now}>Your details</li><li>Confirm</li></ol>
          <h3>Who's staying?</h3>
          <div className={s.fields}>
            <label><small>Full name</small>Sara Malik</label>
            <label><small>Email</small>sara@example.com</label>
            <label className={s.wide}><small>Card</small>•••• •••• •••• 4242</label>
          </div>
          <b className={s.coBtn} data-cta>Confirm booking</b>
          <p className={s.fine}>Free cancellation until 48 hours before arrival.</p>
        </div>
        <aside className={s.summary}>
          <div className={s.sumImg}><Photo src={imgEmpire} pos="40% 40%" /></div>
          <h4>Park View King</h4>
          <p>Fri 14 – Sun 16 Nov · 2 nights</p>
          <p>Breakfast for two included</p>
          <p className={s.total}><span>Total</span><b>$612</b></p>
        </aside>
      </div>
      <div className={s.confirmed} data-done>
        <span className={s.tick}>✓</span>
        <h3>You're booked, Sara.</h3>
        <p>Confirmation YB-20418 · Park View King · 14–16 Nov</p>
        <p className={s.fine}>We've sent the details to sara@example.com.</p>
      </div>
    </div>
  );
}

/* ——— Ads manager ——— */
export function AdManager() {
  const rows = [
    ["Autumn rooms — Search", "Search", true, 82, [3, 4, 4, 6, 7, 8, 10]],
    ["Autumn rooms — Social video", "Social", true, 64, [2, 3, 5, 4, 6, 8, 9]],
    ["Retargeting — Viewed rooms", "Display", true, 46, [4, 4, 5, 6, 6, 7, 8]],
    ["Brand — Search", "Search", true, 30, [5, 5, 6, 5, 6, 6, 7]],
    ["Journal — Content promotion", "Social", false, 18, [3, 3, 2, 3, 2, 2, 1]],
  ];
  return (
    <div className={s.ads}>
      <header className={s.adsTop}><b>Campaigns</b><span>Yourbrand · Last 14 days</span><i className={s.adsNew}>+ New campaign</i></header>
      <div className={s.adsHead}><span>Campaign</span><span>Channel</span><span>Budget used</span><span>Bookings</span></div>
      {rows.map(([name, ch, on, budget, spark]) => (
        <div key={name} className={`${s.adsRow} ${on ? "" : s.off}`} data-row>
          <span className={s.adsName}><i className={`${s.toggle} ${on ? s.on : ""}`} />{name}</span>
          <span className={s.chip}>{ch}</span>
          <span className={s.budget}><i style={{ width: `${budget}%` }} data-bar /></span>
          <svg viewBox="0 0 70 24" className={s.spark}><path d={path(spark, 10, 70, 24)} pathLength="1" data-draw /></svg>
        </div>
      ))}
      <p className={s.demo}>Demo account · illustrative data</p>
    </div>
  );
}

/* ——— Analytics overview (dark) ——— */
export function Analytics() {
  const kpis = [["Sessions", "48.2k", "+18%"], ["Engaged sessions", "31.6k", "+22%"], ["Bookings", "1,284", "+27%"], ["Cost per booking", "$38", "−12%"]];
  const channels = [["Organic search", 92], ["Paid search", 74], ["Social", 58], ["Email", 41], ["Referral", 22]];
  const funnel = [["Visits", 100], ["Room viewed", 54], ["Checkout", 19], ["Booked", 11]];
  return (
    <div className={s.an}>
      <header className={s.anTop}><b>Overview</b><span>Last 30 days vs previous period</span><span className={s.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.kpis}>{kpis.map(([k, v, d]) => <div key={k} className={s.kpi} data-kpi><small>{k}</small><b>{v}</b><em>{d}</em></div>)}</div>
      <div className={s.anGrid}>
        <div className={s.card}>
          <p className={s.cardTitle}>Sessions <span><i className={s.keyNow} />This period <i className={s.keyPrev} />Previous</span></p>
          <svg viewBox="0 0 800 220" preserveAspectRatio="none" className={s.chart}>
            {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="800" y1={20 + i * 60} y2={20 + i * 60} />)}
            <path d={`${path(THIS, MAX)} L800,220 L0,220 Z`} className={s.area} data-area />
            <path d={path(PREV, MAX)} className={s.prev} pathLength="1" data-draw />
            <path d={path(THIS, MAX)} className={s.now} pathLength="1" data-draw />
          </svg>
        </div>
        <div className={s.card}>
          <p className={s.cardTitle}>Sessions by channel</p>
          <ul className={s.bars}>{channels.map(([c, v]) => <li key={c}><span>{c}</span><i><b style={{ width: `${v}%` }} data-bar /></i></li>)}</ul>
        </div>
        <div className={`${s.card} ${s.wideCard}`}>
          <p className={s.cardTitle}>Booking funnel</p>
          <ol className={s.funnel}>{funnel.map(([f, v]) => <li key={f}><i style={{ height: `${v}%` }} data-funnel /><span>{f}</span></li>)}</ol>
        </div>
      </div>
    </div>
  );
}

/* ——— Strategy document ——— */
export function Brief() {
  return (
    <div className={s.doc}>
      <aside className={s.docSide}><b>Yourbrand</b><span className={s.docOn}>Autumn growth plan</span><span>Audience research</span><span>Channel plan</span><span>Measurement</span></aside>
      <article className={s.docBody}>
        <p className={s.eyebrow}>Strategy · Approved</p>
        <h3>Autumn growth plan</h3>
        <h5>Objective</h5>
        <p>Fill park-view rooms on weekends from October to December, with more guests booking direct.</p>
        <h5>Audiences</h5>
        <div className={s.chips}><span>Weekend couples</span><span>Returning guests</span><span>Theatre-goers</span></div>
        <h5>Channels</h5>
        <table className={s.table}><tbody>
          <tr><td>Search</td><td>Capture people already looking for a Midtown hotel</td></tr>
          <tr><td>Social</td><td>Build awareness with short video from the rooftop</td></tr>
          <tr><td>Content</td><td>Neighbourhood guides that rank and get shared</td></tr>
          <tr><td>Email</td><td>Bring past guests back with a member rate</td></tr>
        </tbody></table>
        <h5>We'll measure</h5>
        <p>Direct bookings · cost per booking · return-guest rate</p>
      </article>
    </div>
  );
}

/* ——— Content editor ——— */
export function Editor() {
  return (
    <div className={s.editor}>
      <header className={s.edTop}><span className={s.word}><Mark size="sm" /> Journal</span><span>Draft · saved</span><b>Publish</b></header>
      <div className={s.edBody}>
        <article className={s.edDoc}>
          <h3>48 hours in Midtown: a guest's guide</h3>
          <p>Midtown rewards the people who slow down. Here's how our guests spend a long weekend between the park, the theatres and the quiet streets most visitors walk straight past.</p>
          <h5>Friday: arrive before sunset</h5>
          <p>Drop your bags and head for the rooftop. The light over the Empire State Building is at its best in the hour before dark.</p>
          <span className={s.cursorLine} />
        </article>
        <aside className={s.edSide}>
          <b>Search</b>
          <p className={s.ok}>Keyphrase in title</p>
          <p className={s.ok}>Meta description length</p>
          <p className={s.ok}>Three internal links</p>
          <p className={s.ok}>Images have alt text</p>
          <p className={s.warn}>Add one more subheading</p>
          <b>Readability</b>
          <p className={s.ok}>Good</p>
        </aside>
      </div>
    </div>
  );
}

/* ——— A/B experiment ——— */
export function Experiment() {
  return (
    <div className={s.exp}>
      <header className={s.adsTop}><b>Experiment</b><span>Autumn landing page · headline</span><i className={s.live}>Running</i></header>
      <div className={s.variants}>
        {[["A", "Book your stay in Midtown", 52], ["B", "A weekend above Madison Avenue.", 78]].map(([k, h, w]) => (
          <div key={k} className={`${s.variant} ${k === "B" ? s.winner : ""}`} data-variant>
            <div className={s.varHero}><Photo src={imgDusk} pos="50% 70%" /><span>{h}</span></div>
            <p><b>Variant {k}</b>{k === "B" && <em>Leading</em>}</p>
            <span className={s.rate}><i style={{ width: `${w}%` }} data-bar /></span>
            <small>{k === "A" ? "2.1%" : "2.9%"} booking rate</small>
          </div>
        ))}
      </div>
      <p className={s.demo}>Demo account · illustrative data</p>
    </div>
  );
}

/* ——— Journal article (published) ——— */
export function Article() {
  return (
    <div className={s.site}>
      <header className={s.siteNav}><span className={s.word}><Mark /> Yourbrand</span><nav><span>Rooms</span><span>Offers</span><span>Journal</span></nav><b className={s.navBtn}>Book</b></header>
      <article className={s.article}>
        <p className={s.eyebrow}>The Journal · Neighbourhood</p>
        <h3>48 hours in Midtown: a guest's guide</h3>
        <div className={s.artImg}><Photo src={imgTowers} pos="50% 30%" /></div>
        <p>Midtown rewards the people who slow down. Here's how our guests spend a long weekend between the park, the theatres and the quiet streets most visitors walk straight past.</p>
        <div className={s.inline} data-cta><span>Stay where this guide begins</span><b>See park-view rooms →</b></div>
      </article>
    </div>
  );
}

/* ——— Rooms compared, with reviews ——— */
export function Compare() {
  const rooms = [["Classic Queen", imgDusk, "From $219"], ["Park View King", imgEmpire, "From $289"], ["Skyline Suite", imgTowers, "From $420"]];
  return (
    <div className={s.site}>
      <header className={s.siteNav}><span className={s.word}><Mark /> Yourbrand</span><nav><span>Rooms</span><span>Offers</span><span>Journal</span></nav><b className={s.navBtn}>Book</b></header>
      <div className={s.compare}>
        <h3>Choose your room</h3>
        <div className={s.cmpGrid}>
          {rooms.map(([n, img, p], i) => (
            <article key={n} className={i === 1 ? s.pick : ""} data-result>
              {i === 1 && <span className={s.badge}>Most booked</span>}
              <div className={s.roomImg}><Photo src={img} /></div>
              <h5>{n}</h5><p>{p} · Breakfast for two</p>
            </article>
          ))}
        </div>
        <blockquote className={s.review}>★★★★★ “The view alone was worth it — and the guide in the room sent us to the best breakfast in Midtown.” <span>Verified guest</span></blockquote>
      </div>
    </div>
  );
}

/* ——— Email client, the return visit ——— */
export function Email() {
  const list = [["Yourbrand", "Welcome back, Sara — your member rate is ready", true], ["Airline", "Your trip to New York: check in now"], ["Bank", "Your statement is ready"], ["Newsletter", "Five weekend ideas for December"]];
  return (
    <div className={s.mail}>
      <aside className={s.inbox}><b>Inbox</b>{list.map(([f, t, on]) => <p key={t} className={on ? s.mailOn : ""}><strong>{f}</strong><span>{t}</span></p>)}</aside>
      <article className={s.msg}>
        <p className={s.from}><Mark size="sm" /> <span><b>Yourbrand Midtown</b><em>to Sara</em></span></p>
        <h3>Welcome back, Sara — your member rate is ready</h3>
        <div className={s.msgImg}><Photo src={imgEmpire} pos="50% 35%" /></div>
        <p>Thank you for staying with us in November. As a returning guest, your next weekend comes with a member rate and a late check-out.</p>
        <b className={s.coBtn} data-cta>Book your return</b>
      </article>
    </div>
  );
}

/* ——— Phone: a sponsored post in a feed ——— */
export function Post() {
  return (
    <div className={s.feed}>
      <header className={s.appBar}><b>Feed</b><span>Following</span></header>
      <article className={s.post}>
        <p className={s.postHead}><Mark size="sm" /><span><b>yourbrand</b><em>Sponsored</em></span></p>
        <div className={s.postImg}><Photo src={imgEmpire} pos="45% 40%" sizes="(max-width: 900px) 40vw, 18vw" /></div>
        <p className={s.postCta} data-cta><span>Autumn rates · park-view rooms</span><b>Book now</b></p>
        <p className={s.actions}><span>Like</span><span>Comment</span><span>Share</span><span>Save</span></p>
        <p className={s.caption}><b>yourbrand</b> Autumn above Madison Avenue. Park-view rooms with breakfast for two — this season only.</p>
        <p className={s.comment}><b>ana.travels</b> Stayed here last spring, that rooftop!</p>
      </article>
    </div>
  );
}

/* ——— Phone: short-form video ——— */
export function Reel() {
  return (
    <div className={s.reel}>
      <VideoBackground src="/videos/nyc-night-mobile.mp4" poster="/videos/nyc-night-poster.jpg" tint={false} className={s.reelVideo} />
      <span className={s.reelProgress}><i /></span>
      <div className={s.reelCopy}>
        <p><Mark size="sm" /> <b>yourbrand</b> <span className={s.follow}>Follow</span></p>
        <p>Midtown after dark, from the 32nd floor.</p>
        <small>Original audio · Yourbrand</small>
      </div>
      <div className={s.reelSide}><span>Like</span><span>Reply</span><span>Share</span></div>
    </div>
  );
}

/* ——— Phone: a story with a poll ——— */
export function Story() {
  return (
    <div className={s.story}>
      <Photo src={imgDusk} pos="45% 60%" sizes="(max-width: 900px) 40vw, 18vw" />
      <span className={s.storyBars}><i className={s.full} /><i className={s.half} /><i /></span>
      <p className={s.storyHead}><Mark size="sm" /> <b>yourbrand</b> <em>2h</em></p>
      <div className={s.poll} data-cta>
        <b>Which would you wake up to?</b>
        <span><i style={{ width: "64%" }} data-bar />Park view<em>64%</em></span>
        <span><i style={{ width: "36%" }} data-bar />Skyline view<em>36%</em></span>
      </div>
      <p className={s.reply}>Send a message</p>
    </div>
  );
}

/* ——— Phone: replies, handled like customer service ——— */
export function Replies() {
  const thread = [
    ["ana.travels", "Is the rooftop open in November?", false],
    ["yourbrand", "It is, Ana — heated, with blankets, until 11pm. We'd love to see you up there.", true],
    ["mike_nyc", "Do park-view rooms face Central Park?", false],
    ["yourbrand", "They face Madison Avenue toward the park — floors 20 and up see the trees. Happy to note a high floor for you.", true],
  ];
  return (
    <div className={s.feed}>
      <header className={s.appBar}><b>Comments</b><span>Autumn post</span></header>
      <div className={s.thread}>
        {thread.map(([who, text, us], i) => (
          <p key={i} className={us ? s.us : ""}><b>{who}</b>{text}<small>{us ? "Replied · 4m" : "12m"}</small></p>
        ))}
      </div>
      <p className={s.compose}>Reply as yourbrand…</p>
    </div>
  );
}

// kind → component, frame and address bar
export const SCREENS = {
  brief: { C: Brief, url: "docs.yourbrand.com/autumn-growth-plan" },
  serp: { C: Serp, url: "search?q=boutique+hotel+midtown+manhattan" },
  ads: { C: AdManager, url: "ads manager › yourbrand › campaigns" },
  analytics: { C: Analytics, url: "analytics › yourbrand.com › overview", dark: true },
  editor: { C: Editor, url: "cms.yourbrand.com/journal/edit" },
  landing: { C: Landing, url: "yourbrand.com/autumn" },
  checkout: { C: Checkout, url: "yourbrand.com/book/park-view-king" },
  experiment: { C: Experiment, url: "experiments › autumn landing page" },
  article: { C: Article, url: "yourbrand.com/journal/48-hours-in-midtown" },
  compare: { C: Compare, url: "yourbrand.com/rooms" },
  email: { C: Email, url: "mail › inbox" },
  post: { C: Post, phone: true },
  reel: { C: Reel, phone: true },
  story: { C: Story, phone: true },
  replies: { C: Replies, phone: true },
};
