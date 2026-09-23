"use client";

import Link from "next/link";
import { personalInfo, contactDetails, deepDoorways } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function ClosingScene() {
  return (
    <footer id="connect" className={styles.closingScene} aria-label="Closing and Contact">
      <div className={styles.closingContainer}>
        <p className={styles.closingFlourishText}>&ldquo;{personalInfo.footerFlourish}&rdquo;</p>
        <p className={styles.closingProse}>
          Always open to rigorous research conversations, thoughtful software collaborations,
          and exploratory questions.
        </p>

        {/* Editorial Contact Pills */}
        <div className={styles.closingContactRow}>
          <a
            href={`mailto:${contactDetails.email}`}
            className={styles.contactEditorialPill}
          >
            <span>{contactDetails.email}</span>
            <svg
              width="13"
              height="13"
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

          {contactDetails.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={styles.contactEditorialPill}
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

        {/* Deep Doorways into existing site routes */}
        <div className={styles.doorwaysGrid}>
          <div className={styles.doorwaysHead}>Deeper Portals &amp; Detailed Archives</div>
          <div className={styles.doorwaysLinksList}>
            {deepDoorways.map((doorway) => (
              <Link key={doorway.label} href={doorway.href} className={styles.doorwayCard}>
                <h4>{doorway.label} &rarr;</h4>
                <p>{doorway.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quiet Footer Monogram and Back to Top */}
        <div className={styles.footerBar}>
          <span>{personalInfo.copyright}</span>
          <span>{contactDetails.location}</span>
          <a href="#hero">Back to Top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}
