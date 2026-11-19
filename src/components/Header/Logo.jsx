import Image from "next/image";
import logo from "@public/images/logo.png";
import styles from "./Logo.module.css";

/**
 * The studio's logo, public/images/logo.png, shown exactly as supplied: the artwork is already in
 * the brand's colours (paper white lettering, the guide's cyan #36e4d0 mark and "MEDIA"), so no
 * colour treatment is applied — only its size, at its own 4:1 proportions.
 */
export default function Logo({ className = "", priority = true }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <Image src={logo} alt="The Lincoln Media" className={styles.img} priority={priority} sizes="180px" />
    </span>
  );
}
