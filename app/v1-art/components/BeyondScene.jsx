"use client";

import Image from "next/image";
import { humanPursuits } from "../data/portfolio-content";
import { artAssets } from "../data/art-assets";
import styles from "../v1-art.module.css";

export default function BeyondScene() {
  return (
    <section id="beyond" className={styles.beyondScene} aria-label="Life Beyond Software">
      {/* Botanical Corner Bouquet Accent */}
      <Image
        src={artAssets.work.cornerBouquet.src}
        alt=""
        width={520}
        height={520}
        className={styles.beyondCornerBouquet}
        aria-hidden="true"
      />

      <div className={styles.beyondContainer}>
        <div className={styles.beyondHeader}>
          <span className={styles.narrativeEyebrow}>04 &middot; Human Grounding</span>
          <h2 className={styles.narrativeTitle}>Curiosity Beyond the Screen</h2>
          <p className={styles.narrativeLead}>
            Things pursued for their own sake: drawing, music, basketball, walking forest trails, and
            appreciating books and spaces made with care.
          </p>
        </div>

        {/* Loose, Asymmetric Editorial Composition (No card grid) */}
        <div className={styles.beyondEditorialField}>
          {humanPursuits.map((item) => (
            <article key={item.topic} className={styles.beyondItem}>
              <span className={styles.beyondMediumTag}>{item.medium}</span>
              <h3 className={styles.beyondTopicTitle}>{item.topic}</h3>
              <p className={styles.beyondReflection}>{item.reflection}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
