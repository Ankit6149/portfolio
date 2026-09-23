"use client";

import { storyAnchors } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function StorySection() {
  return (
    <section id="story" className={styles.storySection} aria-label="Origins and Story">
      {/* Waveform & Botanical Signal Plate */}
      <div
        className={styles.storySignalPlate}
        style={{ backgroundImage: `url('/v1-art/story-signals.png')` }}
        aria-hidden="true"
      />

      <div className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>01 &middot; Intellectual Arc</span>
          <h2 className={styles.sectionTitle}>From Living Systems to Software</h2>
          <p className={styles.sectionSubtitle}>
            How questions about biology and physiological signals evolved into a discipline of feedback loops,
            rigorous machine learning, and human-centered software architectures.
          </p>
        </div>

        <div className={styles.storyGrid}>
          {storyAnchors.map((anchor) => (
            <article key={anchor.number} className={styles.storyCard}>
              <span className={styles.storyCardNum}>{anchor.number}</span>
              <h3 className={styles.storyCardTitle}>{anchor.title}</h3>
              <span className={styles.storyCardSub}>{anchor.subtitle}</span>
              <p className={styles.storyCardSummary}>{anchor.summary}</p>
              <p className={styles.storyCardDesc}>{anchor.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
