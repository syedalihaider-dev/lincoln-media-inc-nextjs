import Image from "next/image";
import { Ui, isPhoneScreen } from "@/components/DigitalMarketing/ui/Frames";
import styles from "./Visual.module.css";

/**
 * One visual from a service's data: { screen: "serp" } renders that real interface (a phone screen
 * sits centred at phone proportions), { image, alt } renders a photograph filling the frame.
 * `fit="cover"` makes a photo fill its parent; otherwise it keeps a 16:10 frame like a browser.
 */
export default function Visual({ item, sizes = "(max-width: 900px) 90vw, 50vw", fit = "frame", className = "", priority = false }) {
  if (item.screen) {
    return (
      <div className={`${isPhoneScreen(item.screen) ? styles.phone : styles.wide} ${className}`}>
        <Ui kind={item.screen} />
      </div>
    );
  }
  return (
    <figure className={`${styles.photo} ${fit === "cover" ? styles.cover : ""} ${className}`}>
      <Image src={item.image} alt={item.alt || ""} fill sizes={sizes} quality={78} priority={priority} className={styles.img} />
    </figure>
  );
}
