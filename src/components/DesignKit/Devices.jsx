import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import Site from "./Site";
import d from "./Devices.module.css";

/*
 * Device frames for the design kit. Each renders its content at the device's real width
 * (browser 1280 · tablet 820 · phone 390) and scales it to fit, so the Meridian site inside
 * lays out exactly as it would on that device. Decorative — aria-hidden.
 */
export function Browser({ url = "meridian.example", children, dark = false, width = 1280, className = "", ...rest }) {
  return (
    <div className={`${d.browser} ${dark ? d.dark : ""} ${className}`} aria-hidden="true" {...rest}>
      <div className={d.bar}><span className={d.dots}><i /><i /><i /></span><span className={d.url}><i className={d.lock} />{url}</span><span /></div>
      <div className={d.view}><ScaledScreen width={width}>{children}</ScaledScreen></div>
    </div>
  );
}

export function Tablet({ children, className = "", ...rest }) {
  return (
    <div className={`${d.tablet} ${className}`} aria-hidden="true" {...rest}>
      <div className={d.tGlass}><ScaledScreen width={820}>{children}</ScaledScreen></div>
    </div>
  );
}

export function Phone({ children, className = "", ...rest }) {
  return (
    <div className={`${d.phone} ${className}`} aria-hidden="true" {...rest}>
      {/* a 44px status-bar inset keeps the island clear of the page's own header */}
      <div className={d.pGlass}><ScaledScreen width={390}><div className={d.status}>{children}</div></ScaledScreen><span className={d.island} /></div>
    </div>
  );
}

/** Shorthand: the Meridian site on a device. <OnDevice device="phone" page="listing" fid="wire" /> */
export function OnDevice({ device = "browser", page = "home", fid = "ui", url, className = "", ...rest }) {
  const site = <Site page={page} fid={fid} />;
  if (device === "phone") return <Phone className={className} {...rest}>{site}</Phone>;
  if (device === "tablet") return <Tablet className={className} {...rest}>{site}</Tablet>;
  return <Browser url={url || `meridian.example${page === "home" ? "" : "/" + page}`} className={className} {...rest}>{site}</Browser>;
}
