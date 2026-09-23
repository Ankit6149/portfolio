"use client";

import React from "react";
import styles from "../v1-art.module.css";

export default function ResearchScene() {
  const essays = [
    {
      title: "Systems Thinking for a Kinder Future",
      date: "Mar 12, 2024",
      topic: "SYSTEMS & PHILOSOPHY",
      note: "How circular feedback models and humane constraints produce software that calms rather than drains.",
    },
    {
      title: "The Human Side of Technology",
      date: "Nov 3, 2023",
      topic: "HUMAN FACTORS",
      note: "Preserving context, quiet attention, and the tactile nature of tools built for real humans.",
    },
    {
      title: "Curiosity as a Compounding Force",
      date: "Aug 18, 2023",
      topic: "CREATIVE PRACTICE",
      note: "Why exploratory questioning across disciplines yields the most resilient engineering decisions.",
    },
  ];

  return (
    <section id="research" className={styles.researchSectionWrap} aria-label="Research & Writing">
      {/* Chapter 04 Title Header Row matching 02_image-gen */}
      <div className={styles.researchHeaderGrid}>
        <div className={styles.researchHeaderLeft}>
          <span className={styles.chapterNumLabel}>04.</span>
          <h2 className={styles.chapterMainHeading}>Research &amp; Writing</h2>
          <span className={styles.chapterSubtitleLabel}>DEEPER EXPLORATIONS</span>
          <p className={styles.researchIntroPara}>
            Notes, essays, and experiments on people, systems, bio-signals, and what&apos;s next.
          </p>
        </div>

        <div className={styles.researchHeaderRight}>
          <a
            href="/publications"
            className={styles.editorialActionLink}
          >
            <span>View All Writing</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>
        </div>
      </div>

      {/* 3 Writing / Explorations Cards */}
      <div className={styles.essaysGrid}>
        {essays.map((essay, index) => (
          <article key={index} className={styles.essayCard}>
            <span className={styles.essayTopic}>{essay.topic}</span>
            <h3 className={styles.essayTitle}>{essay.title}</h3>
            <span className={styles.essayDate}>{essay.date}</span>
            <p className={styles.essayNote}>{essay.note}</p>
          </article>
        ))}
      </div>

      {/* Emotion-H Net Verified Research Highlight */}
      <div className={styles.paperSpotlightCard}>
        <div className={styles.paperSpotlightHeader}>
          <span className={styles.paperSpotlightBadge}>ACADEMIC PUBLICATION · ICDSA 2025</span>
          <h3 className={styles.paperSpotlightTitle}>Emotion-H Net: Hybrid Transformer for Affective Recognition</h3>
          <p className={styles.paperSpotlightCitation}>
            Published in <em>6th International Conference on Data Sciences and Applications (ICDSA 2025)</em>, Springer — Lecture Notes in Networks and Systems.
          </p>
        </div>

        {/* Live Multi-Channel EEG Waveform Visual */}
        <div className={styles.eegTraceContainer}>
          <div className={styles.eegTraceHeader}>
            <span className={styles.eegChannelLabel}>CHANNEL F3/F4 (FRONTAL ASYMMETRY) · 4–45 HZ</span>
            <span className={styles.eegStatusBadge}>DEAP BENCHMARK VERIFIED</span>
          </div>
          <svg
            className={styles.eegTraceSvg}
            viewBox="0 0 1000 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 Q50,15 100,40 T200,40 T300,65 T400,20 T500,50 T600,30 T700,60 T800,25 T900,45 T1000,40"
              stroke="var(--v1-teal-deep)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0,40 Q60,60 120,40 T240,25 T360,55 T480,35 T600,45 T720,25 T840,55 T960,35 T1000,40"
              stroke="var(--v1-gold)"
              strokeWidth="1.4"
              opacity="0.7"
              fill="none"
            />
          </svg>
        </div>

        {/* Empirical Metrics Bar */}
        <div className={styles.paperMetricsRow}>
          <div className={styles.paperMetricItem}>
            <span className={styles.metricVal}>86.82%</span>
            <span className={styles.metricLbl}>Accuracy (DEAP)</span>
          </div>
          <div className={styles.paperMetricItem}>
            <span className={styles.metricVal}>0.977</span>
            <span className={styles.metricLbl}>AUROC Metric</span>
          </div>
          <div className={styles.paperMetricItem}>
            <span className={styles.metricVal}>164</span>
            <span className={styles.metricLbl}>Spatiotemporal Features</span>
          </div>
          <div className={styles.paperMetricItem}>
            <span className={styles.metricVal}>~5 MB</span>
            <span className={styles.metricLbl}>Transformer Footprint</span>
          </div>
        </div>

        <div className={styles.paperActionRow}>
          <a
            href="https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.paperActionBtn}
          >
            <span>Read Publication on Springer LNNS</span>
            <span className={styles.btnArrow}>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
