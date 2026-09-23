"use client";

import React from "react";
import Image from "next/image";
import { storyMilestones } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function StoryNarrative() {
  const storyKeywords = ["PEOPLE", "SYSTEMS", "LEARNING", "IMPACT", "A KINDER TOMORROW"];

  return (
    <section id="story" className={styles.storySectionWrap} aria-label="My Story">
      {/* Chapter 02 Title Header Row matching 02_image-gen */}
      <div className={styles.storyHeaderGrid}>
        <div className={styles.storyHeaderLeft}>
          <span className={styles.chapterNumLabel}>02.</span>
          <h2 className={styles.chapterMainHeading}>My Story</h2>
          <span className={styles.chapterSubtitleLabel}>A JOURNEY OF CURIOSITY</span>
          <p className={styles.storyIntroPara}>
            From a small town to global ideas — a journey of questions, lessons, and the moments that keep me curious.
          </p>
        </div>

        {/* Wide Misty Mountains Banner from 02_image-gen */}
        <div className={styles.storyBannerFrame}>
          <Image
            src="/v1-art/thumb_story_banner.png"
            alt="Misty mountain landscape"
            width={335}
            height={56}
            className={styles.storyBannerImg}
          />
        </div>

        {/* Story Keywords Column on the right */}
        <div className={styles.storyKeywordsCol} aria-hidden="true">
          {storyKeywords.map((kw) => (
            <span key={kw} className={styles.storyKeywordItem}>
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* 4 Milestones Stream */}
      <div className={styles.milestonesStream}>
        {storyMilestones.map((milestone) => (
          <div key={milestone.number} className={styles.milestoneRow}>
            <div className={styles.milestoneMeta}>
              <span className={styles.milestoneNumber}>{milestone.number}</span>
              <span className={styles.milestonePhase}>{milestone.phase}</span>
              <span className={styles.milestoneCadence}>{milestone.cadence}</span>
            </div>

            <div className={styles.milestoneMain}>
              <h3 className={styles.milestoneHeading}>{milestone.title}</h3>
              <p className={styles.milestoneProse}>{milestone.prose}</p>
            </div>

            <div className={styles.milestoneAccentCol}>
              <span className={styles.milestoneAccentTag}>{milestone.accent}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
