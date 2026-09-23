"use client";

import { projects } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function WorkSection() {
  return (
    <section id="work" className={styles.workSection} aria-label="Selected Projects">
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>02 &middot; Engineering & Research</span>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <p className={styles.sectionSubtitle}>
            Concrete engineering evidence: local-first native tools, creator studio systems,
            and peer-reviewed affective machine learning research.
          </p>
        </div>

        <div className={styles.workList}>
          {projects.map((proj) => (
            <article
              key={proj.id}
              id={proj.id === "emotion-h-net" ? "research" : proj.id}
              className={styles.projectCard}
            >
              <div className={styles.projectCardAccentLine} />

              <div className={styles.projectMainCol}>
                <span className={styles.projectBadge}>{proj.badge}</span>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <div className={styles.projectSubtitle}>{proj.subtitle}</div>

                <blockquote className={styles.projectStatement}>
                  “{proj.statement}”
                </blockquote>

                <p className={styles.projectDesc}>{proj.description}</p>

                <div className={styles.projectTags}>
                  {proj.tags.map((t) => (
                    <span key={t} className={styles.tagPill}>
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.projectLinkBtn}
                >
                  <span>{proj.externalLabel}</span>
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>

              <div className={styles.projectEvidenceCol}>
                {proj.metrics && (
                  <div className={styles.metricsGrid}>
                    {proj.metrics.map((m) => (
                      <div key={m.label} className={styles.metricTile}>
                        <div className={styles.metricValue}>{m.value}</div>
                        <div className={styles.metricLabel}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.projectHighlightsCard}>
                  <div className={styles.evidenceCardTitle}>Key Architecture & Validation</div>
                  <ul className={styles.highlightList}>
                    {proj.highlights.map((h, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <span className={styles.highlightBullet}>&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
