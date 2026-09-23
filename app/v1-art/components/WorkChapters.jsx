"use client";

import { projectChapters } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function WorkChapters() {
  return (
    <section id="work" className={styles.workScene} aria-label="Selected Engineering Work">
      <div className={styles.workContainer}>
        <div className={styles.workSectionHeader}>
          <span className={styles.narrativeEyebrow}>02 &middot; Engineering Evidence</span>
          <h2 className={styles.narrativeTitle}>Selected Work</h2>
          <p className={styles.narrativeLead}>
            Native desktop architectures and human-in-the-loop production workflows built with precision,
            local-first performance, and respect for attention.
          </p>
        </div>

        {/* Project Chapters */}
        <div className={styles.workChaptersStack}>
          {projectChapters.map((proj) => (
            <article
              key={proj.id}
              id={proj.id}
              className={`${styles.workChapter} js-work-chapter`}
            >
              {/* Left Column: Narrative & Problem Context */}
              <div className={styles.workChapterMain}>
                <div className={styles.chapterIndexRow}>
                  <span className={styles.chapterNum}>{proj.index}</span>
                  <span className={styles.chapterCategory}>{proj.category}</span>
                </div>

                <h3 className={styles.chapterTitle}>{proj.name}</h3>

                <blockquote className={styles.chapterStatement}>
                  “{proj.statement}”
                </blockquote>

                <p className={styles.chapterSummary}>{proj.summary}</p>
                <p className={styles.chapterSummary} style={{ fontStyle: "italic", opacity: 0.9 }}>
                  {proj.problemContext}
                </p>

                <div className={styles.chapterTechList}>
                  {proj.technologies.map((t) => (
                    <span key={t} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={styles.chapterActionRow}>
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.editorialActionLink}
                  >
                    <span>{proj.linkText}</span>
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
              </div>

              {/* Right Column: Designed Interactive Evidence Composition */}
              <div className={styles.evidenceVisualStage}>
                <div className={styles.evidenceTopBar}>
                  <span className={styles.evidenceTypeLabel}>{proj.realEvidence.type}</span>
                  <span className={styles.evidenceStatusDot}>{proj.status}</span>
                </div>

                <ul className={styles.evidencePointList}>
                  {proj.realEvidence.points.map((pt, i) => (
                    <li key={i} className={styles.evidencePointItem}>
                      <span className={styles.evidenceBullet}>&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Specific Architectural Visualizations */}
                {proj.id === "skribly" ? (
                  <div className={styles.skriblyNoteVisual}>
                    <div className={noteVisualStyles.header}>
                      <span>Context: active editor</span>
                      <span>shortcut: alt + space</span>
                    </div>
                    <p className={styles.noteVisualBody}>
                      &ldquo;Leave the thought where it became relevant. Find it when the context returns.&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className={styles.skriblyNoteVisual}>
                    <div className={noteVisualStyles.header}>
                      <span>Pipeline: source &rarr; draft</span>
                      <span>provenance: preserved</span>
                    </div>
                    <p className={styles.noteVisualBody}>
                      &ldquo;Generation should never erase where an idea came from.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const noteVisualStyles = {
  header: styles.noteVisualMeta,
};
