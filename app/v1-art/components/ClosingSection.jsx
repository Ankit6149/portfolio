"use client";

import { personalInfo, socialLinks } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function ClosingSection() {
  return (
    <footer id="connect" className={styles.closingSection} aria-label="Connect and Closing">
      <div className={styles.closingContainer}>
        <p className={styles.closingFlourish}>&ldquo;{personalInfo.footerFlourish}&rdquo;</p>
        <p className={styles.closingSub}>
          Always open to rigorous research dialogues, impactful software collaborations,
          and exploratory engineering questions.
        </p>

        <div className={styles.socialRow}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? "_self" : "_blank"}
              rel="noreferrer"
              className={styles.socialPill}
            >
              <span>{link.label}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <span>{personalInfo.copyright}</span>
          <a href="#hero">Back to Top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}
