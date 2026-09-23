"use client";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import WorkSection from "./components/WorkSection";
import BeyondSection from "./components/BeyondSection";
import ClosingSection from "./components/ClosingSection";
import styles from "./v1-art.module.css";

export default function V1ArtPage() {
  return (
    <main className={styles.root}>
      {/* Subtle tactile paper texture and ambient light gradients */}
      <div className={styles.paperGrainOverlay} aria-hidden="true" />

      {/* Editorial Navigation */}
      <Navigation />

      {/* Hero Scene: Curiosity is the Thread */}
      <HeroSection />

      {/* Narrative Arc: Biology -> Signals -> Software */}
      <StorySection />

      {/* Selected Work: Skribly, SignalFlow Studio, Emotion-H Net */}
      <WorkSection />

      {/* Beyond Work: Creative, physical, and systems dimensions */}
      <BeyondSection />

      {/* Closing: Quiet connection and footer */}
      <ClosingSection />
    </main>
  );
}
