"use client";

import Image from "next/image";
import { personalInfo } from "../data/portfolio-content";
import { artAssets } from "../data/art-assets";
import FloatingPetals from "./FloatingPetals";
import styles from "../v1-art.module.css";

export default function HeroScene() {
  const scrollTo = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.heroScene} aria-label="Hero Scene">
      {/* Layer 1: Distant Botanical Watercolor Wash Plate */}
      <div
        className={`${styles.heroPlateBackdrop} js-hero-bg-plate`}
        style={{ backgroundImage: `url('${artAssets.hero.backdropPlate.src}')` }}
        aria-hidden="true"
      />

      {/* Layer 2: Foreground Botanical Branch with Delicate Occlusion Depth */}
      <Image
        src={artAssets.hero.foregroundBranch.src}
        alt=""
        width={720}
        height={480}
        priority
        className={`${styles.heroForegroundBranch} js-hero-fg-branch`}
        aria-hidden="true"
      />

      {/* Layer 3: Ambient Drifting Petals */}
      <FloatingPetals />

      {/* Layer 4: Main Content Composition */}
      <div className={styles.heroContentGrid}>
        <div className={styles.heroLeftContent}>
          <span className={`${styles.heroEyebrowTag} js-hero-reveal`}>
            {personalInfo.eyebrow}
          </span>

          <h1 className={`${styles.heroHeadline} js-hero-headline`}>
            {personalInfo.headlineMain} <br />
            <span className={styles.heroHeadlineAccent}>
              {personalInfo.headlineAccent}
              <span className={`${styles.heroThreadFlourishLine} js-hero-thread-line`} />
            </span>
          </h1>

          <p className={`${styles.heroBio} js-hero-bio`}>{personalInfo.bio}</p>

          <div className={`${styles.heroActionsRow} js-hero-cta`}>
            <a
              href="#work"
              onClick={(e) => scrollTo(e, "#work")}
              className={styles.editorialActionLink}
            >
              <span>Explore Selected Work</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#story"
              onClick={(e) => scrollTo(e, "#story")}
              className={styles.editorialGhostLink}
            >
              <span>The Intellectual Arc &rarr;</span>
            </a>
          </div>
        </div>

        {/* Right Editorial Marginalia Quote */}
        <div className={`${styles.heroQuoteCol} js-hero-quote`}>
          <aside className={styles.heroQuoteCard} aria-label="Guiding Observation">
            <p className={styles.quoteText}>{personalInfo.supportingQuote}</p>
            <span className={styles.quoteAuthor}>— {personalInfo.quoteAuthor}</span>
          </aside>
        </div>
      </div>

      {/* Scene Footer & Scroll Invitation */}
      <div className={styles.heroScrollCue}>
        <span>Ankit Bhardwaj &middot; Software Systems &amp; Bio-Signals</span>
        <a
          href="#story"
          onClick={(e) => scrollTo(e, "#story")}
          className={styles.heroScrollIndicator}
          aria-label="Scroll to follow the narrative thread"
        >
          <span>Scroll to follow the thread</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
}
