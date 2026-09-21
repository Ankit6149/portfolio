"use client";

import { useEffect, useState } from "react";
import "./art-preview.css";

const FRAME = "https://raw.githubusercontent.com/Ankit6149/portfolio/portfolio-world-base/public/portfolio-world/frames/master";

const chapters = [
  ["01", "ROOTS", "roots"],
  ["02", "WORK", "work"],
  ["03", "RESEARCH", "research"],
  ["04", "BEYOND", "beyond"],
];

const projects = [
  {
    name: "Skribly",
    type: "Contextual desktop notes",
    line: "Keep a thought attached to the place where it became useful.",
    body: "A Windows-first note system built around context: applications, windows, files and moments. The interesting work is not the note itself; it is returning the right thought without interrupting the screen it belongs to.",
    href: "https://github.com/Ankit6149/skribly",
  },
  {
    name: "SignalFlow Studio",
    type: "Evidence-aware content studio",
    line: "Generation is useful. Remembering where an idea came from is more useful.",
    body: "A production workflow for gathering source material, shaping outputs and keeping review between evidence and publishing instead of reducing the process to one opaque generation box.",
    href: "https://github.com/Ankit6149/SignalFlow-Studio",
  },
  {
    name: "The Wild Oasis",
    type: "Product engineering",
    line: "Two sides of one product: the customer experience and the operation behind it.",
    body: "A customer booking experience and an internal operations application built across Next.js, React, Supabase, authentication, state and data-heavy workflows.",
    href: "https://github.com/Ankit6149",
  },
];

export default function ArtPreviewPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main className="art-world">
      <div className="progress-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${progress / 100})` }} />
      </div>

      <header className="art-nav">
        <a className="art-nav__name" href="#top">Ankit Bhardwaj</a>
        <nav aria-label="Portfolio sections">
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#beyond">Beyond</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero chapter">
        <div className="scene scene--hero">
          <img src={`${FRAME}/frame-0030.webp`} alt="" />
          <div className="scene__veil" />
          <div className="mist mist--one" />
          <div className="mist mist--two" />
          <div className="hero-botanical hero-botanical--left" aria-hidden="true" />
          <div className="hero-botanical hero-botanical--right" aria-hidden="true" />
        </div>

        <div className="hero-copy">
          <p className="kicker">ANKIT BHARDWAJ · DELHI</p>
          <h1><span>Curiosity</span> is the thread.</h1>
          <p className="hero-deck">
            Life, signals, software, people, systems, drawing, research —
            different rooms of the same curiosity.
          </p>
          <div className="hero-actions">
            <a href="#work">Enter the work <span>↘</span></a>
            <a href="/resume">Resume <span>↗</span></a>
          </div>
        </div>

        <div className="hero-note">
          <span>01 — ARRIVAL</span>
          <p>Not a résumé turned into a website. A place to understand how the work, questions and interests connect.</p>
        </div>

        <div className="scroll-cue" aria-hidden="true"><i />scroll</div>
      </section>

      <section id="roots" className="roots chapter">
        <div className="roots-image frame-window">
          <img src={`${FRAME}/frame-0195.webp`} alt="" />
          <div className="frame-window__wash" />
        </div>

        <div className="chapter-index">
          <span>01</span>
          <p>Where it began</p>
        </div>

        <div className="roots-copy">
          <p className="eyebrow">BEFORE SOFTWARE</p>
          <h2>I was interested in <em>living systems</em> before digital ones.</h2>
          <p>
            Biology first made complexity feel beautiful: separate parts sensing, communicating,
            adapting and somehow remaining one system. Instrumentation and Control later gave
            those instincts another language — signals, feedback, noise, state and stability.
          </p>
          <p>
            Software did not replace those interests. It became the medium where more of them
            could become tangible.
          </p>
        </div>

        <div className="roots-margin-note">
          <span>observe</span><span>measure</span><span>build</span><span>refine</span>
        </div>
      </section>

      <section id="work" className="work chapter">
        <div className="work-sky">
          <img src={`${FRAME}/frame-0285.webp`} alt="" />
          <div />
        </div>

        <div className="chapter-index chapter-index--light">
          <span>02</span>
          <p>Selected work</p>
        </div>

        <div className="work-intro">
          <p className="eyebrow">THINGS THAT BECAME PRODUCTS</p>
          <h2>The interface is only the visible edge.</h2>
          <p>
            I am most interested when a product forces several kinds of thinking to meet:
            interaction, architecture, reliability, automation, data, constraints and what a person
            actually experiences.
          </p>
        </div>

        <div className="project-river">
          {projects.map((project, index) => (
            <article className="project-story" key={project.name}>
              <div className="project-story__number">0{index + 1}</div>
              <div className="project-story__head">
                <span>{project.type}</span>
                <h3>{project.name}</h3>
              </div>
              <blockquote>{project.line}</blockquote>
              <p>{project.body}</p>
              <a href={project.href} target="_blank" rel="noreferrer">
                Inspect the work <span>↗</span>
              </a>
            </article>
          ))}
        </div>

        <p className="work-footnote">
          The public portfolio stays selective. Unreleased product architecture and private client work remain private.
        </p>
      </section>

      <section id="research" className="research chapter">
        <div className="research-scene">
          <img src={`${FRAME}/frame-0360.webp`} alt="" />
          <div className="research-scene__shadow" />
          <div className="research-paper">
            <span>EEG · DEAP · TRANSFORMERS</span>
            <svg viewBox="0 0 800 120" aria-hidden="true">
              <path d="M0 68 C52 68 58 66 84 66 C105 66 108 28 124 28 C143 28 144 100 164 100 C188 100 191 52 214 52 C239 52 245 76 270 76 C298 76 305 64 332 64 C361 64 368 66 393 66 C425 66 428 39 449 39 C471 39 475 92 497 92 C520 92 525 59 549 59 C577 59 582 70 612 70 C644 70 651 66 677 66 C716 66 733 68 800 68" />
            </svg>
            <strong>86.82%</strong>
            <small>test accuracy</small>
          </div>
        </div>

        <div className="chapter-index">
          <span>03</span>
          <p>Research</p>
        </div>

        <div className="research-copy">
          <p className="eyebrow">EMOTION-H NET</p>
          <h2>When a noisy signal has to become <em>meaning</em>.</h2>
          <p>
            My published research explored EEG-based emotion classification using the DEAP dataset.
            The work reduced an initial 600-feature space to 164 selected features and used four
            Transformer encoders to learn from the resulting representation.
          </p>
          <dl>
            <div><dt>86.82%</dt><dd>Test accuracy</dd></div>
            <div><dt>0.977</dt><dd>AUROC</dd></div>
            <div><dt>164</dt><dd>Selected features</dd></div>
          </dl>
          <a href="https://orcid.org/0009-0005-3408-0058" target="_blank" rel="noreferrer">
            Publication record <span>↗</span>
          </a>
        </div>
      </section>

      <section id="beyond" className="beyond chapter">
        <div className="beyond-scene">
          <img src={`${FRAME}/frame-0460.webp`} alt="" />
          <div />
        </div>

        <div className="chapter-index chapter-index--light">
          <span>04</span>
          <p>Beyond output</p>
        </div>

        <div className="beyond-copy">
          <p className="eyebrow">A PERSON IS BIGGER THAN THE WORK</p>
          <h2>Some things influence the work. Some are simply <em>life</em>.</h2>
        </div>

        <div className="beyond-words" aria-label="Interests">
          <span className="word word--draw">drawing</span>
          <span className="word word--basket">basketball</span>
          <span className="word word--music">music</span>
          <span className="word word--biology">biology</span>
          <span className="word word--nature">nature</span>
        </div>

        <div className="beyond-note">
          <p>
            I draw and paint from observation, sing when I get the chance, play basketball,
            keep returning to biology, and think a lot about nature, culture, spirituality and the
            kind of life worth building.
          </p>
        </div>
      </section>

      <section id="contact" className="closing chapter">
        <div className="closing-scene">
          <img src={`${FRAME}/frame-0535.webp`} alt="" />
          <div />
        </div>

        <div className="closing-copy">
          <p className="eyebrow">THE WORLD CONTINUES</p>
          <h2>There is more to inspect than fits on one page.</h2>
          <div className="closing-links">
            <a href="/projects"><span>Projects</span><b>See the builds ↗</b></a>
            <a href="/publications"><span>Research</span><b>Read the work ↗</b></a>
            <a href="/about"><span>Story</span><b>Go deeper ↗</b></a>
            <a href="/contact"><span>Contact</span><b>Start a conversation ↗</b></a>
          </div>
        </div>

        <footer>
          <span>Ankit Bhardwaj</span>
          <span>Software engineer · New Delhi</span>
          <a href="#top">Back to the beginning ↑</a>
        </footer>
      </section>

      <aside className="chapter-rail" aria-label="Chapter navigation">
        {chapters.map(([n, label, id]) => (
          <a href={`#${id}`} key={id}><span>{n}</span>{label}</a>
        ))}
      </aside>
    </main>
  );
}
