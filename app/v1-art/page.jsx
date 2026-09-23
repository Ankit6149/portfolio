"use client";

import React, { useState } from "react";
import V1Experience from "./components/V1Experience";
import Navigation from "./components/Navigation";
import HeroScene from "./components/HeroScene";
import PillarsSection from "./components/PillarsSection";
import FeaturedProjects from "./components/FeaturedProjects";
import StoryNarrative from "./components/StoryNarrative";
import ResearchScene from "./components/ResearchScene";
import BeyondScene from "./components/BeyondScene";
import ClosingScene from "./components/ClosingScene";
import ProjectModal from "./components/ProjectModal";
import styles from "./v1-art.module.css";

export default function V1ArtPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectPillar = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <V1Experience>
      {/* Tactile Paper Grain Overlay */}
      <div className={styles.paperGrain} aria-hidden="true" />

      {/* Accessible Sticky Editorial Navigation */}
      <Navigation />

      {/* Main Art-Directed Living Flow */}
      <main className={styles.mainCanvas}>
        {/* 01. Hero Arrival with Script Flourish & Floating Quote */}
        <HeroScene />

        {/* The 3 Exploration Pillars (01 Story, 02 Work, 03 Research) */}
        <PillarsSection onSelectPillar={handleSelectPillar} />

        {/* 05. Featured Projects Bar (Skribly, SignalFlow Studio, Emotion-H·Net) */}
        <div id="work">
          <FeaturedProjects onSelectProject={setSelectedProject} />
        </div>

        {/* 02. Story & Intellectual Genesis Stream */}
        <StoryNarrative />

        {/* 04. Research & Writing with Bio-Signal Waveform & Publications */}
        <ResearchScene />

        {/* 06. Beyond Work Pursuits */}
        <BeyondScene />

        {/* 07. Closing Scene, Contact & Deeper Portals */}
        <ClosingScene />
      </main>

      {/* Interactive Project Evidence Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </V1Experience>
  );
}
