"use client";

import React from "react";
import { beyondPursuits } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function BeyondScene() {
  return (
    <section id="beyond" className={styles.beyondSectionWrap} aria-label="Beyond Work">
      {/* Chapter 06 Title Header Row matching 02_image-gen */}
      <div className={styles.beyondHeaderGrid}>
        <div className={styles.beyondHeaderLeft}>
          <span className={styles.chapterNumLabel}>06.</span>
          <h2 className={styles.chapterMainHeading}>Beyond Work</h2>
          <span className={styles.chapterSubtitleLabel}>A MORE HUMAN SIDE</span>
          <p className={styles.beyondIntroPara}>
            Books, nature, photography, ideas, and the little things that keep me balanced.
          </p>
        </div>

        <div className={styles.beyondHeaderRight}>
          <a href="/about" className={styles.editorialActionLink}>
            <span>A Glimpse Beyond</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>
        </div>
      </div>

      {/* 5 Icons / Pursuits Row matching 02_image-gen */}
      <div className={styles.pursuitsRowGrid}>
        {beyondPursuits.map((item, idx) => (
          <div key={idx} className={styles.pursuitItemCard}>
            <span className={styles.pursuitIconBadge}>{item.icon}</span>
            <h4 className={styles.pursuitItemTitle}>{item.title}</h4>
            <span className={styles.pursuitItemSubtitle}>{item.subtitle}</span>
            <p className={styles.pursuitItemDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
