"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { featuredProjects } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function FeaturedProjects({ onSelectProject }) {
  const containerRef = useRef(null);

  return (
    <section className={styles.featuredProjectsWrap} ref={containerRef} id="featured-work">
      {/* Top Header Row */}
      <div className={styles.featuredHeaderRow}>
        <span className={styles.featuredHeaderLeft}>FEATURED PROJECTS</span>
        <span className={styles.featuredHeaderRight}>BETTER SYSTEMS. KINDER TECHNOLOGY.</span>
      </div>

      {/* Grid of 3 Horizontal Project Cards */}
      <div className={styles.featuredProjectsGrid}>
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className={styles.featuredProjectCard}
            onClick={() => onSelectProject && onSelectProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectProject && onSelectProject(project);
              }
            }}
          >
            <div className={styles.featuredThumbBox}>
              <Image
                src={project.image}
                alt={project.name}
                width={122}
                height={78}
                className={styles.featuredThumbImg}
              />
            </div>

            <div className={styles.featuredInfoBox}>
              <h4 className={styles.featuredProjectTitle}>{project.name}</h4>
              <span className={styles.featuredProjectTag}>{project.tag}</span>
              <p className={styles.featuredProjectDesc}>{project.description}</p>
            </div>

            <button
              type="button"
              className={styles.featuredArrowCircle}
              aria-label={`View ${project.name} details`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject && onSelectProject(project);
              }}
            >
              <span>&rarr;</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
