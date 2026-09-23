"use client";

import styles from "../v1-art.module.css";

// Continuous SVG Thread connector that flows through all narrative moments
export default function ThreadConnector() {
  return (
    <div className={styles.threadSvgContainer} aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        {/* Subtle ghost guide path */}
        <path
          className={styles.threadGhost}
          d="M68 0 C 80 40, 75 100, 52 160 C 25 230, 80 290, 48 370 C 15 450, 72 520, 50 610 C 28 690, 78 770, 50 860 C 35 910, 48 960, 50 1000"
        />
        {/* Active living thread whose strokeDashoffset is scrubbed with GSAP ScrollTrigger */}
        <path
          id="js-living-thread"
          className={styles.threadActive}
          d="M68 0 C 80 40, 75 100, 52 160 C 25 230, 80 290, 48 370 C 15 450, 72 520, 50 610 C 28 690, 78 770, 50 860 C 35 910, 48 960, 50 1000"
        />
      </svg>
    </div>
  );
}
