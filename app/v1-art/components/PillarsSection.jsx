"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { explorationPillars } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function PillarsSection({ onSelectPillar }) {
  const containerRef = useRef(null);

  const handlePillarClick = (e, pillar) => {
    e.preventDefault();
    if (onSelectPillar) {
      onSelectPillar(pillar.targetId);
    } else {
      const el = document.getElementById(pillar.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className={styles.pillarsSectionWrap} ref={containerRef}>
      {/* Top fine boundary with curated quote */}
      <div className={styles.pillarsDividerRow}>
        <span className={styles.pillarsDividerLine}></span>
        <span className={styles.pillarsDividerTag}>CURIOUS MINDS BUILD BRIGHTER TOMORROWS</span>
        <span className={styles.pillarsDividerLine}></span>
      </div>

      <div className={styles.pillarsGrid}>
        {explorationPillars.map((pillar) => (
          <div key={pillar.number} className={styles.pillarCard}>
            <div className={styles.pillarThumbFrame}>
              <Image
                src={pillar.image}
                alt={pillar.title}
                width={124}
                height={154}
                className={styles.pillarThumbImg}
              />
            </div>

            <div className={styles.pillarTextColumn}>
              <span className={styles.pillarIndexNum}>{pillar.number}</span>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <span className={styles.pillarTagline}>{pillar.tagline}</span>
              <p className={styles.pillarDescription}>{pillar.description}</p>
              
              <a
                href={`#${pillar.targetId}`}
                onClick={(e) => handlePillarClick(e, pillar)}
                className={styles.pillarActionLink}
              >
                <span>{pillar.linkText}</span>
                <span className={styles.pillarArrow}>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
