"use client";

import { researchStudy } from "../data/portfolio-content";
import { artAssets } from "../data/art-assets";
import styles from "../v1-art.module.css";

export default function ResearchScene() {
  return (
    <section id="research" className={styles.researchScene} aria-label="Scientific Research">
      {/* Background Strata with Mathematical Waveform Traces */}
      <div
        className={styles.researchStrataPlate}
        style={{ backgroundImage: `url('${artAssets.research.strata.src}')` }}
        aria-hidden="true"
      />

      <div className={styles.researchContainer}>
        <div className={styles.researchHeader}>
          <span className={styles.researchMetaTag}>
            03 &middot; Academic Research &middot; {researchStudy.year}
          </span>
          <h2 className={styles.researchTitle}>{researchStudy.title}</h2>
          <div className={styles.researchVenue}>
            {researchStudy.venue} &mdash; <em>{researchStudy.publisher}</em>
          </div>

          <blockquote className={styles.researchQuestion}>
            “{researchStudy.coreQuestion}”
          </blockquote>

          <p className={styles.narrativeLead}>{researchStudy.abstract}</p>
        </div>

        {/* Multi-Channel EEG Waveform Visual Stage */}
        <div className={styles.eegWaveContainer}>
          <div className={styles.eegWaveHead}>
            <span>Biological Signal Representation &middot; Multi-Channel EEG</span>
            <span>DEAP Benchmark &middot; 4&ndash;45 Hz Spectral Bands</span>
          </div>

          <svg
            className={styles.eegWaveSvg}
            viewBox="0 0 900 160"
            preserveAspectRatio="none"
            aria-label="Multi-channel EEG Signal Waveform Simulation"
          >
            {/* Channel 1: High Frequency Gamma / Beta */}
            <path
              className={styles.eegWaveChannel}
              d="M0 40 Q25 15, 50 40 T100 40 T150 20 T200 65 T250 35 T300 45 T350 25 T400 55 T450 35 T500 40 T550 20 T600 60 T650 30 T700 45 T750 15 T800 55 T850 35 T900 40"
            />
            {/* Channel 2: Alpha Rhythm */}
            <path
              className={styles.eegWaveChannelGhost}
              d="M0 80 Q40 50, 80 80 T160 80 T240 60 T320 100 T400 70 T480 85 T560 60 T640 105 T720 75 T800 80 T900 80"
            />
            {/* Channel 3: Theta / Delta Baseline */}
            <path
              className={styles.eegWaveChannel}
              d="M0 120 Q60 95, 120 120 T240 120 T360 105 T480 135 T600 115 T720 125 T840 110 T900 120"
              style={{ strokeWidth: 1.2, opacity: 0.6 }}
            />
          </svg>
        </div>

        {/* Verified Metrics Spread */}
        <div className={styles.metricsSpread}>
          {researchStudy.verifiedMetrics.map((m) => (
            <div key={m.label} className={styles.metricBlock}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
              <p className={styles.metricDetail}>{m.detail}</p>
            </div>
          ))}
        </div>

        {/* Publication Action */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href={researchStudy.href}
            target="_blank"
            rel="noreferrer"
            className={styles.editorialActionLink}
          >
            <span>{researchStudy.linkLabel}</span>
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
    </section>
  );
}
