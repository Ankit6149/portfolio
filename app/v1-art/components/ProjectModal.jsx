"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../v1-art.module.css";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close project modal"
        >
          &times;
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.modalThumbWrap}>
            <Image
              src={project.image}
              alt={project.name}
              width={160}
              height={100}
              className={styles.modalThumbImg}
            />
          </div>
          <div>
            <span className={styles.modalCategory}>{project.category}</span>
            <h2 className={styles.modalTitle}>{project.name}</h2>
          </div>
        </div>

        <p className={styles.modalSummary}>{project.longSummary}</p>

        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}>ARCHITECTURAL & EMPIRICAL EVIDENCE</h4>
          <ul className={styles.modalPointsList}>
            {project.keyPoints.map((point, i) => (
              <li key={i} className={styles.modalPointItem}>
                <span className={styles.modalPointDot}></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}>CORE TECHNOLOGIES</h4>
          <div className={styles.modalTechRow}>
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.modalTechTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.modalActionBtn}
          >
            <span>Visit Verified Repository & Paper</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
