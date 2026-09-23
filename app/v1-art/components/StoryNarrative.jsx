"use client";

import { storyMilestones } from "../data/portfolio-content";
import { artAssets } from "../data/art-assets";
import styles from "../v1-art.module.css";

export default function StoryNarrative() {
  return (
    <section id="story" className={styles.narrativeScene} aria-label="Origin and Narrative">
      {/* Waveform & Botanical Strata Backdrop */}
      <div
        className={`${styles.narrativeStrataBackdrop} js-story-bg-strata`}
        style={{ backgroundImage: `url('${artAssets.story.signalsPlate.src}')` }}
        aria-hidden="true"
      />

      <div className={styles.narrativeContainer}>
        <div className={styles.narrativeHeader}>
          <span className={styles.narrativeEyebrow}>01 &middot; Intellectual Genesis</span>
          <h2 className={styles.narrativeTitle}>From Living Systems to Software</h2>
          <p className={styles.narrativeLead}>
            How questions about homeostasis and physiological sensing evolved through instrumentation,
            transducers, and signal processing into a discipline of building resilient, context-aware software.
          </p>
        </div>

        {/* Editorial Scroll-Led Stream (No equal cards/boxes) */}
        <div className={styles.editorialStream}>
          {storyMilestones.map((m) => (
            <article key={m.number} className={`${styles.streamMilestone} js-milestone-node`}>
              <div className={styles.milestoneMeta}>
                <span className={styles.milestoneNum}>{m.number}</span>
                <span className={styles.milestonePhase}>{m.phase}</span>
                <span className={styles.milestoneCadence}>{m.cadence}</span>
              </div>

              <div className={styles.milestoneCore}>
                <h3 className={styles.milestoneTitle}>{m.title}</h3>
                <p className={styles.milestoneProse}>{m.prose}</p>
              </div>

              <div className={styles.milestoneAccent}>
                <span>{m.accent}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
