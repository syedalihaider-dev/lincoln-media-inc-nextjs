import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { SCREENS as BASE } from "./Screens";
import { MORE_SCREENS } from "./ScreensMore";
import styles from "./Frames.module.css";

const SCREENS = { ...BASE, ...MORE_SCREENS };
export const isPhoneScreen = (kind) => !!SCREENS[kind]?.phone;

/**
 * A browser window: traffic lights, an address bar and a page rendered at a real desktop width
 * (1280px) scaled to fit. Decorative — the section around it carries the words.
 */
export function Browser({ url, children, width = 1280, dark = false, className = "", ...rest }) {
  return (
    <div className={`${styles.browser} ${dark ? styles.dark : ""} ${className}`} aria-hidden="true" {...rest}>
      <div className={styles.bar}>
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.url}>{url}</span>
        <span className={styles.spacer} />
      </div>
      <div className={styles.view}>
        <ScaledScreen width={width}>{children}</ScaledScreen>
      </div>
    </div>
  );
}

/** A flat phone (glass, bezel, island) holding a 390px-wide interface */
export function Phone({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.phone} ${className}`} aria-hidden="true" {...rest}>
      <div className={styles.glass}>
        <ScaledScreen width={390}>{children}</ScaledScreen>
        <span className={styles.island} />
      </div>
    </div>
  );
}

/** One screen of the demo campaign, in the frame it belongs in: <Ui kind="serp" /> (screen = props for the screen) */
export function Ui({ kind, screen = {}, className = "", ...rest }) {
  const k = SCREENS[kind];
  if (!k) return null;
  const C = k.C;
  return k.phone
    ? <Phone className={className} {...rest}><C {...screen} /></Phone>
    : <Browser url={k.url} dark={k.dark} className={className} {...rest}><C {...screen} /></Browser>;
}
