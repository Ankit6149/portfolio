"use client";

import V1Experience from "./components/V1Experience";
import ThreadConnector from "./components/ThreadConnector";
import Navigation from "./components/Navigation";
import HeroScene from "./components/HeroScene";
import StoryNarrative from "./components/StoryNarrative";
import WorkChapters from "./components/WorkChapters";
import ResearchScene from "./components/ResearchScene";
import BeyondScene from "./components/BeyondScene";
import ClosingScene from "./components/ClosingScene";
import styles from "./v1-art.module.css";

export default function V1ArtPage() {
  return (
    <V1Experience>
      {/* Tactile Paper Grain Overlay */}
      <div className={styles.paperGrain} aria-hidden="true" />

      {/* The Continuous Living Thread Path */}
      <ThreadConnector />

      {/* Responsive & Accessible Navigation */}
      <Navigation />

      {/* Main Continuous Narrative Flow */}
      <main>
        {/* Experience 1: ARRIVAL */}
        <HeroScene />

        {/* Experience 2: THE THREAD / ORIGIN */}
        <StoryNarrative />

        {/* Experience 3: SELECTED WORK */}
        <WorkChapters />

        {/* Experience 4: RESEARCH */}
        <ResearchScene />

        {/* Experience 5: THE PERSON BEYOND OUTPUT */}
        <BeyondScene />

        {/* Experience 6: CLOSING & CONNECTION */}
        <ClosingScene />
      </main>
    </V1Experience>
  );
}
