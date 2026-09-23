"use client";

import React from "react";
import Link from "next/link";
import { personalInfo, socialLinks, deepDoorways } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function ClosingScene() {
  return (
    <footer id="connect" className={styles.closingSectionWrap} aria-label="Closing & Contact">
      {/* Chapter 07 Title Header Row matching 02_image-gen */}
      <div className={styles.closingHeaderGrid}>
        <div className={styles.closingHeaderLeft}>
          <span className={styles.chapterNumLabel}>07.</span>
          <h2 className={styles.chapterMainHeading}>Let&apos;s Connect</h2>
          <span className={styles.chapterSubtitleLabel}>IDEAS ARE BETTER TOGETHER</span>
          <p className={styles.closingIntroPara}>
            I&apos;m always open to thoughtful conversations, collaborations, and new ideas.
          </p>
        </div>

        {/* Script Callout + Start a Conversation Button */}
        <div className={styles.closingCalloutRight}>
          <p className={styles.closingScriptQuote}>
            {personalInfo.closingScript}
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className={styles.btnPrimaryPill}
          >
            <span>Start a Conversation</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>
        </div>
      </div>

      {/* Social Links Row */}
      <div className={styles.closingSocialRow}>
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={styles.closingSocialLink}
          >
            <span>{item.label}</span>
            <span className={styles.closingSocialArrow}>&#8599;</span>
          </a>
        ))}
      </div>

      {/* Deeper Portals Navigation */}
      <div className={styles.closingDoorwaysSection}>
        <span className={styles.doorwaysHeaderLabel}>DEEPER ARCHIVES &amp; PORTALS</span>
        <div className={styles.doorwaysRowList}>
          {deepDoorways.map((door) => (
            <Link key={door.label} href={door.href} className={styles.doorwayLinkCard}>
              <h4 className={styles.doorwayTitle}>{door.label} &rarr;</h4>
              <p className={styles.doorwayDesc}>{door.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Editorial Masthead Bar matching 02_image-gen */}
      <div className={styles.closingFooterMasthead}>
        <span className={styles.mastheadBrand}>
          ANKIT BHARDWAJ &nbsp;|&nbsp; BUILDER &middot; RESEARCHER &middot; LIFELONG LEARNER
        </span>
        <span className={styles.mastheadFlourish}>
          {personalInfo.footerFlourish}
        </span>
        <span className={styles.mastheadEst}>
          EST. &infin;
        </span>
      </div>
    </footer>
  );
}
