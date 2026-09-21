"use client";

import { useEffect, useState } from "react";
import "./art-preview.css";

const frames = {
  arrival: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0032.webp",
  study: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0132.webp",
  window: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0210.webp",
  studio: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0348.webp",
  library: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0442.webp",
  garden: "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master/frame-0538.webp",
};

const chapters = [
  { id: "origin", no: "01", label: "Origin" },
  { id: "work", no: "02", label: "Work" },
  { id: "research", no: "03", label: "Research" },
  { id: "beyond", no: "04", label: "Beyond" },
];

export default function ArtPreviewPage() {
  const [active, setActive] = useState("origin");

  useEffect(() => {
    const observers = chapters.map((chapter) => {
      const el = document.getElementById(chapter.id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(chapter.id),
        { threshold: 0.48 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <main className="art-page">
      <header className="art-nav">
        <a className="art-brand" href="#top">Ankit Bhardwaj</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#beyond">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <aside className="chapter-rail" aria-label="Portfolio chapters">
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={active === chapter.id ? "active" : ""}>
            <span>{chapter.no}</span><b>{chapter.label}</b>
          </a>
        ))}
      </aside>

      <section className="hero" id="top">
        <div className="hero-art" style={{ "--hero": `url("${frames.arrival}")` }}>
          <div className="hero-wash" />
          <div className="paint-edge paint-edge-a" />
          <div className="paint-edge paint-edge-b" />
          <div className="hero-copy">
            <p className="kicker">Portfolio · Delhi, India</p>
            <h1>Curiosity<br/><em>is the thread.</em></h1>
            <p className="hero-intro">
              I began with living systems, signals and questions about how things work.
              Software became one of the places where those questions could become tangible.
            </p>
          </div>
          <div className="hero-note">
            <span>Scroll through the world</span>
            <i />
          </div>
        </div>
      </section>

      <section className="origin story-section" id="origin">
        <div className="chapter-mark"><span>01</span><b>Where it began</b></div>
        <div className="origin-grid">
          <div className="origin-art image-window" style={{ "--image": `url("${frames.study}")` }}>
            <span className="window-label">signals · feedback · living systems</span>
          </div>
          <div className="origin-copy">
            <p className="serif-note">Before software, there was observation.</p>
            <h2>The medium changed.<br/>The questions kept moving.</h2>
            <p>
              Biology taught me to look at life as coordinated systems. Instrumentation &amp; Control gave
              me another language for sensing, feedback, noise and changing states. Software widened
              the territory again.
            </p>
            <p>
              I am most interested when a problem sits between disciplines — when understanding the
              relationship between parts matters as much as building the parts themselves.
            </p>
          </div>
        </div>
      </section>

      <section className="work story-section dark-section" id="work">
        <div className="chapter-mark light"><span>02</span><b>Where it led</b></div>
        <div className="work-intro">
          <p className="serif-note">Different products. A recurring instinct.</p>
          <h2>Build until the idea survives contact with reality.</h2>
        </div>

        <article className="project project-left">
          <div className="project-art image-window" style={{ "--image": `url("${frames.window}")` }}>
            <span className="project-number">01</span>
          </div>
          <div className="project-copy">
            <small>Context · attention · desktop systems</small>
            <h3>Skribly</h3>
            <p className="project-line">Leave the thought where it became relevant.</p>
            <p>
              A contextual note system for Windows: notes, ink and reminders that return with the
              application, file, webpage or screen where they matter.
            </p>
            <a href="https://github.com/Ankit6149/skribly" target="_blank" rel="noreferrer">Inspect the work ↗</a>
          </div>
        </article>

        <article className="project project-right">
          <div className="project-copy">
            <small>Evidence · generation · editorial judgment</small>
            <h3>SignalFlow Studio</h3>
            <p className="project-line">Generation should not erase where an idea came from.</p>
            <p>
              A content production studio that keeps source context, editable outputs and publishing
              handoffs together instead of turning generation into a black box.
            </p>
            <a href="https://github.com/Ankit6149/SignalFlow-Studio" target="_blank" rel="noreferrer">Inspect the work ↗</a>
          </div>
          <div className="project-art image-window" style={{ "--image": `url("${frames.studio}")` }}>
            <span className="project-number">02</span>
          </div>
        </article>
      </section>

      <section className="research story-section" id="research">
        <div className="chapter-mark"><span>03</span><b>Research</b></div>
        <div className="research-world">
          <div className="research-art image-window" style={{ "--image": `url("${frames.library}")` }} />
          <div className="research-card">
            <small>EEG · representation · deep learning</small>
            <h2>Emotion-H Net</h2>
            <p className="project-line">What must a model see before a noisy signal can mean anything?</p>
            <p>
              EEG emotion classification using the DEAP dataset, feature selection and a Transformer-based
              architecture. Published in Springer LNNS following ICDSA 2025.
            </p>
            <div className="metrics">
              <span><b>86.82%</b> test accuracy</span>
              <span><b>0.977</b> AUROC</span>
              <span><b>164</b> selected features</span>
            </div>
          </div>
        </div>
      </section>

      <section className="beyond story-section" id="beyond">
        <div className="beyond-art" style={{ "--image": `url("${frames.garden}")` }}>
          <div className="beyond-wash" />
          <div className="chapter-mark light"><span>04</span><b>Beyond output</b></div>
          <div className="beyond-copy">
            <p className="serif-note">Not everything becomes a project.</p>
            <h2>Observe.<br/>Make.<br/>Move.</h2>
            <p>
              Sketching, painting, basketball, music, biology, nature and old architecture are not side
              decorations around engineering. They are part of how I notice rhythm, structure, movement
              and detail.
            </p>
          </div>
          <div className="beyond-words" aria-hidden="true">
            <span>sketch</span><span>play</span><span>listen</span><span>observe</span>
          </div>
        </div>
      </section>

      <footer className="art-footer">
        <p className="serif-note">The shortest version of the story ends here.</p>
        <h2>The work keeps changing.<br/>The thread stays visible.</h2>
        <div className="footer-links">
          <a href="/projects">Explore projects ↗</a>
          <a href="/about">Read the full story ↗</a>
          <a href="/contact">Start a conversation ↗</a>
        </div>
        <small>Preview direction · September 2026 · isolated from production</small>
      </footer>
    </main>
  );
}
