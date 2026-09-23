"use client";

import { personalInfo } from "../data/portfolio-content";
import FloatingPetals from "./FloatingPetals";
import styles from "../v1-art.module.css";

export default function HeroSection() {
  const scrollTo = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.heroSection} aria-label="Hero Introduction">
      {/* Primary Visual Authority Plate */}
      <div
        className={styles.heroBackdropPlate}
        style={{ backgroundImage: `url('/v1-art/hero-plate.png')` }}
        aria-hidden="true"
      />

      {/* Floating Botanical Petals */}
      <FloatingPetals />

      {/* Main Grid: Headline, Bio & Quote */}
      <div className={styles.heroContentGrid}>
        <div className={styles.heroLeftCol}>
          <span className={styles.heroEyebrow}>{personalInfo.eyebrow}</span>
          <h1 className={styles.heroHeadline}>
            {personalInfo.headlineMain} <br />
            <span className={styles.heroHeadlineItalic}>
              the <span className={styles.heroHeadlineScriptSpan}>thread</span>
            </span>
          </h1>

          <p className={styles.heroBio}>{personalInfo.bio}</p>

          <div className={styles.heroCtaRow}>
            <a
              href="#work"
              onClick={(e) => scrollTo(e, "#work")}
              className={styles.btnPrimary}
            >
              <span>Explore My Work</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#story"
              onClick={(e) => scrollTo(e, "#story")}
              className={styles.btnOutline}
            >
              <span>Learn More</span>
            </a>
          </div>
        </div>

        <div className={styles.heroQuoteCol}>
          <aside className={styles.heroQuoteCard} aria-label="Philosophy Quote">
            <p className={styles.quoteText}>{personalInfo.supportingQuote}</p>
            <span className={styles.quoteAuthor}>— {personalInfo.quoteAuthor}</span>
          </aside>
        </div>
      </div>

      {/* Three Pillars: Story, Work, Research */}
      <div className={styles.heroPillarsContainer}>
        <div className={styles.heroPillarsGrid}>
          <a
            href="#story"
            onClick={(e) => scrollTo(e, "#story")}
            className={styles.pillarCard}
          >
            <div
              className={styles.pillarThumbnail}
              style={{
                backgroundImage: `url('/v1-art/petals-layer-1.png')`,
                backgroundColor: "var(--v1-paper-warm)",
              }}
              aria-hidden="true"
            />
            <div className={styles.pillarBody}>
              <span className={styles.pillarNum}>01.</span>
              <h3 className={styles.pillarTitle}>My Story</h3>
              <span className={styles.pillarSubtitle}>A Journey of Curiosity</span>
              <p className={styles.pillarDesc}>
                From small beginnings to systems thinking — the questions and moments that guide my work.
              </p>
              <span className={styles.pillarLinkAction}>Read My Story &rarr;</span>
            </div>
          </a>

          <a
            href="#work"
            onClick={(e) => scrollTo(e, "#work")}
            className={styles.pillarCard}
          >
            <div
              className={styles.pillarThumbnail}
              style={{
                backgroundImage: `url('/v1-art/garden-panoramic.png')`,
                backgroundSize: "cover",
              }}
              aria-hidden="true"
            />
            <div className={styles.pillarBody}>
              <span className={styles.pillarNum}>02.</span>
              <h3 className={styles.pillarTitle}>Selected Work</h3>
              <span className={styles.pillarSubtitle}>Ideas into Reality</span>
              <p className={styles.pillarDesc}>
                Software tools, desktop architectures, and end-to-end creator platforms built for humans.
              </p>
              <span className={styles.pillarLinkAction}>View All Work &rarr;</span>
            </div>
          </a>

          <a
            href="#research"
            onClick={(e) => scrollTo(e, "#research")}
            className={styles.pillarCard}
          >
            <div
              className={styles.pillarThumbnail}
              style={{
                backgroundImage: `url('/v1-art/story-signals.png')`,
                backgroundSize: "cover",
              }}
              aria-hidden="true"
            />
            <div className={styles.pillarBody}>
              <span className={styles.pillarNum}>03.</span>
              <h3 className={styles.pillarTitle}>Research & Writing</h3>
              <span className={styles.pillarSubtitle}>Deeper Explorations</span>
              <p className={styles.pillarDesc}>
                EEG Transformer models, affective computing research (ICDSA 2025), and systems notes.
              </p>
              <span className={styles.pillarLinkAction}>Read My Research &rarr;</span>
            </div>
          </a>
        </div>
      </div>

      {/* Featured Projects Rail Bar */}
      <div className={styles.heroTeaserRail}>
        <div className={styles.teaserRailLabel}>Featured Projects & Research</div>
        <div className={styles.teaserProjectsRow}>
          <a
            href="#skribly"
            onClick={(e) => scrollTo(e, "#skribly")}
            className={styles.teaserProjectItem}
          >
            <div className={styles.teaserProjectInfo}>
              <h4>Skribly</h4>
              <span>AI Study Companion &middot; Local-First</span>
            </div>
            <div className={styles.teaserCircleArrow}>&rarr;</div>
          </a>

          <a
            href="#signalflow"
            onClick={(e) => scrollTo(e, "#signalflow")}
            className={styles.teaserProjectItem}
          >
            <div className={styles.teaserProjectInfo}>
              <h4>SignalFlow Studio</h4>
              <span>Systems for Creators &middot; Synthesis</span>
            </div>
            <div className={styles.teaserCircleArrow}>&rarr;</div>
          </a>

          <a
            href="#emotion-h-net"
            onClick={(e) => scrollTo(e, "#emotion-h-net")}
            className={styles.teaserProjectItem}
          >
            <div className={styles.teaserProjectInfo}>
              <h4>Emotion-H Net</h4>
              <span>Research &middot; ICDSA 2025 Springer</span>
            </div>
            <div className={styles.teaserCircleArrow}>&rarr;</div>
          </a>
        </div>
      </div>
    </section>
  );
}
