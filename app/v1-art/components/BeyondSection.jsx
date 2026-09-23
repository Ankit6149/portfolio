"use client";

import { beyondPursuits } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function BeyondSection() {
  return (
    <section id="beyond" className={styles.beyondSection} aria-label="Beyond Work">
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>03 &middot; Explorations</span>
          <h2 className={styles.sectionTitle}>Curiosity Beyond the Screen</h2>
          <p className={styles.sectionSubtitle}>
            Creative craft, physical dynamics, and natural systems that constantly inform how I design, think, and build.
          </p>
        </div>

        <div className={styles.beyondGrid}>
          {beyondPursuits.map((pursuit) => (
            <article key={pursuit.title} className={styles.beyondCard}>
              <span className={styles.beyondCategory}>{pursuit.category}</span>
              <h3 className={styles.beyondTitle}>{pursuit.title}</h3>
              <p className={styles.beyondDesc}>{pursuit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
