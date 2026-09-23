"use client";

import React from "react";
import { personalInfo } from "../data/portfolio-content";
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
      {/* Background Watercolor Painting Plate */}
      <div
        className={styles.heroPlateBackdrop}
        style={{ backgroundImage: `url('/v1-art/hero-plate.png')` }}
        aria-hidden="true"
      />

      {/* Ambient Drifting Blossom Petals */}
      <FloatingPetals />

      {/* Main Content Composition */}
      <div className={styles.heroContentGrid}>
        <div className={styles.heroLeftContent}>
          <span className={styles.heroEyebrowTag}>
            {personalInfo.eyebrow}
          </span>

          <h1 className={styles.heroHeadline}>
            {personalInfo.headlineMain} <br />
            <span className={styles.heroHeadlineAccent}>
              the <span className={styles.heroScriptWord}>{personalInfo.headlineAccent}</span>
              {/* Refined Hand-Drawn Flourish Loop */}
              <svg
                className={styles.heroFlourishSvg}
                viewBox="0 0 340 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10,25 Q130,68 270,22 Q315,10 305,34 Q290,62 230,46 Q180,32 140,50"
                  stroke="#C16E5A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className={styles.heroBio}>{personalInfo.bio}</p>

          <div className={styles.heroActionsRow}>
            <a
              href="#work"
              onClick={(e) => scrollTo(e, "#work")}
              className={styles.btnPrimaryPill}
            >
              <span>{personalInfo.ctaPrimary}</span>
              <span className={styles.btnArrow}>&rarr;</span>
            </a>

            <a
              href="#story"
              onClick={(e) => scrollTo(e, "#story")}
              className={styles.btnOutlinePill}
            >
              <span>{personalInfo.ctaSecondary}</span>
            </a>
          </div>
        </div>

        {/* Right Floating Quote Card & Vertical Metadata Pillar */}
        <div className={styles.heroRightSide}>
          <aside className={styles.heroQuoteCard} aria-label="Guiding Observation">
            <p className={styles.quoteText}>{personalInfo.supportingQuote}</p>
            <span className={styles.quoteAuthor}>— {personalInfo.quoteAuthor}</span>
          </aside>

          <div className={styles.heroVerticalTagStrip} aria-hidden="true">
            {personalInfo.verticalTags.map((tag) => (
              <span key={tag} className={styles.heroVerticalTagItem}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
