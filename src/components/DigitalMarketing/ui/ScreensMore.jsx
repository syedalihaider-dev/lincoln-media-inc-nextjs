import { Photo, Mark } from "./Screens";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgEmpire from "@public/images/home/empire.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import base from "./Screens.module.css";
import s from "./ScreensMore.module.css";

/*
 * More of the demo campaign's interfaces, for the Digital Marketing service pages: the SEO audit and
 * rank tracker, the social profile, a click heatmap, an email automation, the content calendar,
 * review management, the app-store listing and search, a press article and a mentions monitor.
 * Same fictional client ("Yourbrand", a Midtown hotel), same real widths (1280 / 390), demo data.
 */

/* ——— SEO site audit ——— */
export function Audit() {
  const issues = [
    ["Error", "12 pages return 404 from internal links", "Crawlability"],
    ["Error", "Room pages share one meta description", "On-page"],
    ["Warning", "Hero images over 400 KB on mobile", "Performance"],
    ["Warning", "Missing hotel structured data", "Rich results"],
    ["Notice", "Three orphan pages in the Journal", "Internal links"],
  ];
  return (
    <div className={s.audit}>
      <header className={s.top}><b>Site audit</b><span>yourbrand.com · 214 pages crawled</span><span className={base.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.auditGrid}>
        <div className={s.score}>
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" className={s.track} /><circle cx="60" cy="60" r="50" className={s.arc} pathLength="1" data-draw /></svg>
          <b>78</b><small>Site health</small>
        </div>
        <div className={s.cats}>
          {[["Crawlability", 64], ["On-page", 72], ["Performance", 58], ["Rich results", 40]].map(([c, v]) => (
            <p key={c}><span>{c}</span><i><b style={{ width: `${v}%` }} data-bar /></i></p>
          ))}
        </div>
      </div>
      <ul className={s.issues}>
        {issues.map(([lvl, t, c]) => <li key={t} data-row><em className={s[lvl.toLowerCase()]}>{lvl}</em><span>{t}</span><small>{c}</small></li>)}
      </ul>
    </div>
  );
}

/* ——— Rank tracking ——— */
export function Keywords() {
  const rows = [
    ["boutique hotel midtown manhattan", 3, "+9", 82],
    ["hotel near madison avenue", 2, "+4", 64],
    ["midtown hotel with rooftop bar", 5, "+12", 58],
    ["park view hotel room nyc", 7, "+6", 46],
    ["48 hours in midtown", 1, "new", 30],
    ["small luxury hotel new york", 11, "+15", 72],
  ];
  return (
    <div className={s.audit}>
      <header className={s.top}><b>Rankings</b><span>Tracked keywords · New York</span><span className={base.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.kwHead}><span>Keyword</span><span>Position</span><span>Change</span><span>Search demand</span></div>
      {rows.map(([k, p, c, v]) => (
        <div key={k} className={s.kwRow} data-row>
          <span>{k}</span><b className={p <= 3 ? s.top3 : ""}>{p}</b><em>{c === "new" ? "New" : `▲ ${c.slice(1)}`}</em>
          <i><b style={{ width: `${v}%` }} data-bar /></i>
        </div>
      ))}
    </div>
  );
}

/* ——— Phone: social profile ——— */
export function Profile() {
  const grid = [imgEmpire, imgDusk, imgTowers, imgDusk, imgTowers, imgEmpire];
  return (
    <div className={`${base.feed} ${s.profile}`}>
      <header className={base.appBar}><b>yourbrand</b><span>Profile</span></header>
      <div className={s.pHead}>
        <span className={s.avatar}><Mark /></span>
        <p><b>Yourbrand Midtown</b><span>Boutique hotel · Madison Avenue</span><span>Rooms with a view, a rooftop and a neighbourhood guide. Book direct ↓</span><a>yourbrand.com/autumn</a></p>
      </div>
      <div className={s.pBtns}><b>Following</b><span>Message</span><span>Book</span></div>
      <div className={s.highlights}>{["Rooms", "Rooftop", "Guide", "Offers"].map((h) => <span key={h}><i />{h}</span>)}</div>
      <div className={s.pGrid}>{grid.map((g, i) => <span key={i} className={s.pCell}><Photo src={g} pos={`${30 + i * 10}% 50%`} sizes="12vw" /></span>)}</div>
    </div>
  );
}

/* ——— Click heatmap over the landing page ——— */
export function Heatmap() {
  const spots = [[30, 28, 140], [78, 62, 120], [22, 66, 90], [52, 84, 70], [86, 12, 60]];
  return (
    <div className={s.heat}>
      <header className={s.top}><b>Heatmap</b><span>/autumn · clicks · desktop</span><span className={base.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.heatPage}>
        <div className={s.heatShot}>
          <div className={s.hsNav}><span className={base.word}><Mark size="sm" /> Yourbrand</span><i /><i /><i /><b /></div>
          <div className={s.hsHero}><Photo src={imgDusk} pos="50% 70%" sizes="40vw" /><span>A weekend above Madison Avenue.</span><b className={s.hsBtn}>Check availability</b></div>
          <div className={s.hsRooms}>{[imgEmpire, imgTowers, imgDusk].map((r, i) => <span key={i}><Photo src={r} sizes="12vw" /></span>)}</div>
        </div>
        {spots.map(([x, y, r], i) => <i key={i} className={s.spot} style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2 }} data-spot />)}
        <p className={s.heatNote} data-note>Most clicks land on the photo — not the button.</p>
      </div>
    </div>
  );
}

/* ——— Email automation flow ——— */
export function Automation() {
  const nodes = [
    ["Trigger", "Guest checks out"],
    ["Wait", "2 days"],
    ["Email", "“Thank you for staying — how was it?”"],
    ["Condition", "Left a review?"],
    ["Email", "“Your member rate for spring”"],
  ];
  return (
    <div className={s.flow}>
      <header className={s.top}><b>Automation</b><span>Post-stay journey · Live</span><i className={s.liveDot}>Running</i></header>
      <div className={s.flowBody}>
        <ol className={s.nodes}>
          {nodes.map(([t, v], i) => <li key={i} className={s[t.toLowerCase()]} data-row><small>{t}</small><b>{v}</b></li>)}
        </ol>
        <aside className={s.flowSide}>
          <b>Audience</b><p>Guests who stayed in the last 90 days</p>
          <b>Segments</b><div className={base.chips}><span>Weekend couples</span><span>Returning</span></div>
          <b>Goal</b><p>Second booking within six months</p>
        </aside>
      </div>
    </div>
  );
}

/* ——— Content calendar ——— */
export function Calendar() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const items = { 2: ["Journal", "48 hours in Midtown"], 5: ["Social", "Rooftop reel"], 9: ["Email", "Autumn rates"], 12: ["Journal", "Where to eat near the park"], 16: ["Social", "Guest story"], 19: ["Video", "A night on the 32nd floor"], 23: ["Email", "Member offer"], 26: ["Journal", "Winter in Midtown"] };
  return (
    <div className={s.cal}>
      <header className={s.top}><b>Content calendar</b><span>November</span><span className={s.legend}><i className={s.journal} />Journal<i className={s.social} />Social<i className={s.email} />Email<i className={s.video} />Video</span></header>
      <div className={s.calGrid}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <b key={d}>{d}</b>)}
        {days.map((d) => (
          <span key={d} className={s.day}>
            <small>{d}</small>
            {items[d] && <em className={s[items[d][0].toLowerCase()]} data-row>{items[d][1]}</em>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ——— Review management ——— */
export function Reviews() {
  const list = [
    [5, "Maps", "Ana R.", "The rooftop at sunset was the highlight of our trip.", "Thank you, Ana — we'll save you the corner table next time."],
    [2, "Travel site", "Tom K.", "Room was lovely but check-in took forty minutes.", "Tom, you're right and we're sorry. We've added a second desk on Fridays — please let us make it up to you."],
    [4, "Maps", "Priya S.", "Great location, the guide in the room was a nice touch.", null],
  ];
  return (
    <div className={s.rev}>
      <header className={s.top}><b>Reviews</b><span>All sources · Last 30 days</span><span className={base.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.revBody}>
        <aside className={s.revSum}>
          <b>4.6</b><span className={base.stars}>★★★★★</span><small>Average rating</small>
          {[5, 4, 3, 2, 1].map((n, i) => <p key={n}><span>{n}★</span><i><b style={{ width: `${[78, 14, 4, 3, 1][i]}%` }} data-bar /></i></p>)}
        </aside>
        <ul className={s.revList}>
          {list.map(([r, src, who, text, reply]) => (
            <li key={who} data-row>
              <p className={s.revHead}><b>{who}</b><span className={base.stars}>{"★".repeat(r)}<span className={s.dim}>{"★".repeat(5 - r)}</span></span><em>{src}</em></p>
              <p>{text}</p>
              {reply ? <p className={s.reply}><b>Yourbrand replied</b>{reply}</p> : <p className={s.draft}>Draft reply ready for approval</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ——— Phone: app store listing ——— */
export function StoreListing() {
  return (
    <div className={`${base.feed} ${s.store}`}>
      <div className={s.appHead}>
        <span className={s.appIcon}><Mark size="md" /></span>
        <p><b>Yourbrand — Book a Stay</b><span>Hotel rooms, offers & your stay</span><em data-cta>Get</em></p>
      </div>
      <div className={s.appStats}><p><b>4.8 ★</b><small>Ratings</small></p><p><b>Travel</b><small>Category</small></p><p><b>4+</b><small>Age</small></p></div>
      <div className={s.shots}>
        {[["Book in three taps", imgDusk], ["Your room key", imgEmpire], ["The neighbourhood", imgTowers]].map(([t, img]) => (
          <span key={t} className={s.shot}><Photo src={img} sizes="10vw" /><b>{t}</b></span>
        ))}
      </div>
      <p className={s.appText}>Book a park-view room, check in from your phone and get the guest guide to Midtown — all in one app.</p>
      <p className={s.appNew}><b>What's new</b>Mobile key for every room, and faster checkout.</p>
    </div>
  );
}

/* ——— Phone: app store search ——— */
export function StoreSearch() {
  const apps = [["Yourbrand — Book a Stay", "Hotel rooms, offers & your stay", "4.8", true], ["City Stays", "Hotels and apartments", "4.4"], ["Trip Planner", "Plan every journey", "4.5"], ["Room Finder", "Last-minute hotel deals", "4.1"]];
  return (
    <div className={`${base.feed} ${s.store}`}>
      <header className={base.appBar}><b>Search</b></header>
      <p className={s.searchBox}>hotel midtown</p>
      <ul className={s.appList}>
        {apps.map(([n, t, r, ours]) => (
          <li key={n} className={ours ? s.ours : ""} data-row>
            <span className={s.appIconSm}>{ours ? <Mark size="sm" /> : n[0]}</span>
            <p><b>{n}</b><span>{t}</span><small>{r} ★</small></p>
            <em>Get</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ——— Press article ——— */
export function Press() {
  return (
    <div className={s.press}>
      <header className={s.paper}><b>The City Ledger</b><nav><span>News</span><span>Business</span><span>Travel</span><span>Culture</span></nav></header>
      <article className={s.pArticle}>
        <p className={base.eyebrow}>Travel · New York</p>
        <h3>Midtown's small hotels are quietly winning the weekend</h3>
        <p className={s.byline}>By the Travel desk · 6 min read</p>
        <div className={s.pImg}><Photo src={imgTowers} pos="50% 30%" sizes="40vw" /></div>
        <p>A handful of independent hotels near Madison Avenue are filling rooms that big chains can't — by selling the neighbourhood, not just the bed.</p>
        <blockquote className={s.quote} data-cta>“People don't come for a room. They come for a weekend in the city — so that's what we sell.”<span>— General manager, Yourbrand Midtown</span></blockquote>
      </article>
    </div>
  );
}

/* ——— Mentions monitor (PR / reputation) ——— */
export function Mentions() {
  const rows = [
    ["The City Ledger", "Midtown's small hotels are quietly winning the weekend", "Positive", "News"],
    ["Travel forum", "Anyone stayed at Yourbrand? Worth it for a long weekend?", "Neutral", "Forum"],
    ["Weekend Journal", "Ten rooftops to see the city from this autumn", "Positive", "Feature"],
    ["Social", "Check-in took ages but the room made up for it", "Negative", "Social"],
    ["Podcast", "Interview: why independent hotels sell the neighbourhood", "Positive", "Audio"],
  ];
  return (
    <div className={s.audit}>
      <header className={s.top}><b>Mentions</b><span>“Yourbrand” · all sources · Live</span><span className={base.demoTag}>Demo account · illustrative data</span></header>
      <div className={s.sent}>
        {[["Positive", 68], ["Neutral", 24], ["Negative", 8]].map(([k, v]) => <p key={k} className={s[k.toLowerCase()]}><span>{k}</span><i><b style={{ width: `${v}%` }} data-bar /></i></p>)}
      </div>
      <ul className={s.mList}>
        {rows.map(([src, t, sent, type]) => (
          <li key={t} data-row><small>{type}</small><p><b>{src}</b><span>{t}</span></p><em className={s[sent.toLowerCase()]}>{sent}</em></li>
        ))}
      </ul>
    </div>
  );
}

export const MORE_SCREENS = {
  audit: { C: Audit, url: "seo › yourbrand.com › site audit" },
  keywords: { C: Keywords, url: "seo › yourbrand.com › rankings" },
  heatmap: { C: Heatmap, url: "insights › yourbrand.com/autumn › heatmap" },
  automation: { C: Automation, url: "email › automations › post-stay" },
  calendar: { C: Calendar, url: "content › calendar › november" },
  reviews: { C: Reviews, url: "reputation › reviews › inbox" },
  press: { C: Press, url: "cityledger.example/travel/midtown-small-hotels" },
  mentions: { C: Mentions, url: "monitoring › mentions › yourbrand" },
  profile: { C: Profile, phone: true },
  storeListing: { C: StoreListing, phone: true },
  storeSearch: { C: StoreSearch, phone: true },
};
