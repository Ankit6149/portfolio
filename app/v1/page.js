"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    index: "01",
    title: "Skribly",
    kicker: "Contextual desktop notes",
    thought: "A note loses value when the context that made it important disappears.",
    body:
      "A Windows-first contextual notes and annotation app built around overlays, shortcuts, local-first behavior, and notes that return with the relevant app or screen context.",
    tags: ["Tauri", "React", "Rust", "Windows APIs"],
    href: "https://github.com/Ankit6149/skribly",
    visual: "notes",
  },
  {
    index: "02",
    title: "SignalFlow Studio",
    kicker: "AI-assisted content production",
    thought: "Generation is easy. Preserving context and judgment is harder.",
    body:
      "A multi-stage workflow for research, source capture, mixed-context intake, generation, review, platform adaptation, and packaging.",
    tags: ["Next.js", "LLM integrations", "Product systems"],
    href: "https://github.com/Ankit6149/SignalFlow-Studio",
    visual: "flow",
  },
  {
    index: "03",
    title: "Emotion-H Net",
    kicker: "Published research",
    thought: "What must a model see before a noisy signal can mean anything?",
    body:
      "EEG emotion recognition on the DEAP dataset using engineered features, recursive feature elimination, and a lightweight four-encoder Transformer architecture.",
    tags: ["PyTorch", "Transformers", "EEG", "ICDSA 2025"],
    href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
    visual: "signal",
  },
];

const capabilities = [
  ["Interfaces", "React, Next.js, responsive UI, product flows"],
  ["Systems", "APIs, authentication, permissions, event-driven workflows"],
  ["Data", "PostgreSQL, Supabase, Redis, Firebase, SQL"],
  ["AI + automation", "LLM integrations, PyTorch, n8n, MCP, model evaluation"],
  ["Desktop", "Tauri, Rust, Windows APIs"],
  ["Practice", "C++, debugging, testing, CI/CD, deployment"],
];

function Petals({ className = "" }) {
  return (
    <div className={`petal-field ${className}`} aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className={`petal petal--${(i % 6) + 1}`} />
      ))}
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === "notes") {
    return (
      <div className="project-art project-art--notes" aria-hidden="true">
        <div className="note note--one"><span>remember this</span><i /></div>
        <div className="note note--two"><span>returns with context</span></div>
        <div className="note-orbit" />
      </div>
    );
  }

  if (type === "flow") {
    return (
      <div className="project-art project-art--flow" aria-hidden="true">
        <span className="flow-node">Model</span>
        <i />
        <span className="flow-node">Context</span>
        <i />
        <span className="flow-node">Outputs</span>
        <i />
        <span className="flow-node">Package</span>
      </div>
    );
  }

  return (
    <div className="project-art project-art--signal" aria-hidden="true">
      <svg viewBox="0 0 800 260" preserveAspectRatio="none">
        <path d="M0 142 C55 142 55 80 110 80 S165 205 220 205 275 110 330 110 385 150 440 150 495 55 550 55 605 180 660 180 715 122 800 122" />
        <path className="signal-soft" d="M0 160 C70 110 100 200 170 148 S275 75 350 136 440 214 520 135 620 84 800 154" />
      </svg>
      <div className="signal-stat"><strong>86.82%</strong><span>test accuracy</span></div>
    </div>
  );
}

export default function PortfolioV1() {
  const root = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-depth]").forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0);
          gsap.to(layer, {
            yPercent: depth * -10,
            ease: "none",
            scrollTrigger: {
              trigger: layer.closest("section") || root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        gsap.utils.toArray(".reveal-line").forEach((line) => {
          gsap.fromTo(
            line,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: line, start: "top 88%" },
            }
          );
        });

        gsap.utils.toArray(".project-chapter").forEach((chapter) => {
          const title = chapter.querySelector(".project-title-ghost");
          const art = chapter.querySelector(".project-art");
          gsap.fromTo(
            title,
            { xPercent: -8 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: 1 },
            }
          );
          gsap.fromTo(
            art,
            { yPercent: 12, rotate: -1.5 },
            {
              yPercent: -8,
              rotate: 1.5,
              ease: "none",
              scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: 1 },
            }
          );
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="v1-shell">
      <header className="v1-nav">
        <a className="v1-brand" href="#top">AB</a>
        <nav aria-label="Primary">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#about">Beyond</a>
        </nav>
        <a className="v1-contact" href="mailto:ankitbhardwaj80100@gmail.com">Say hello</a>
      </header>

      <main>
        <section id="top" className="hero depth-scene">
          <div className="hero-wash hero-wash--one" data-depth="-0.35" />
          <div className="hero-wash hero-wash--two" data-depth="0.25" />
          <Petals className="hero-petals" />

          <div className="hero-copy" data-depth="-0.08">
            <p className="eyebrow">Ankit Bhardwaj · New Delhi</p>
            <div className="hero-title-wrap">
              <span className="hero-script" aria-hidden="true">curiosity</span>
              <h1>
                <span className="hero-line">Curiosity</span>
                <span className="hero-line hero-line--shift">is the thread.</span>
              </h1>
              <div className="hero-occluder" data-depth="0.34" aria-hidden="true" />
            </div>
            <p className="hero-lead">
              It has taken me from biology to signals, from sketches to software,
              from research to products, and it continues to shape how I understand
              people, systems, and the world around me.
            </p>
            <div className="hero-actions">
              <a href="#story">Enter the story <span>↓</span></a>
              <a href="#work">See what grew from it</a>
            </div>
          </div>

          <div className="hero-side-note" data-depth="0.18">
            <span>Currently</span>
            <strong>Software Engineering Intern</strong>
            <small>Wyrd Media Labs</small>
          </div>

          <div className="hero-depth-word hero-depth-word--one" data-depth="0.5" aria-hidden="true">observe</div>
          <div className="hero-depth-word hero-depth-word--two" data-depth="-0.15" aria-hidden="true">build</div>
        </section>

        <section id="story" className="story-section depth-scene">
          <div className="story-number" aria-hidden="true">01</div>
          <div className="story-copy">
            <p className="section-kicker">The route changed. The questions stayed alive.</p>
            <div className="clip-line"><h2 className="reveal-line">Life first.</h2></div>
            <div className="clip-line"><h2 className="reveal-line">Signals next.</h2></div>
            <div className="clip-line"><h2 className="reveal-line">Software became another medium.</h2></div>
          </div>

          <div className="story-orbit" data-depth="0.3" aria-hidden="true">
            <span>biology</span>
            <span>feedback</span>
            <span>observation</span>
            <span>systems</span>
          </div>

          <div className="story-body">
            <p>
              Biology was an early way of understanding life. Instrumentation and
              Control Engineering introduced signals, measurement, feedback, noise,
              changing state, response, and stability.
            </p>
            <p>
              Software did not replace those interests. It gave them another place to
              become tangible, from interfaces and automations to desktop tools and
              research systems.
            </p>
          </div>
        </section>

        <section id="work" className="work-intro depth-scene">
          <p className="section-kicker">Selected work</p>
          <h2>
            Products as responses
            <span>to things worth noticing.</span>
          </h2>
          <div className="work-bloom" data-depth="0.32" aria-hidden="true" />
        </section>

        <div className="project-list">
          {projects.map((project) => (
            <section className="project-chapter" key={project.title}>
              <div className="project-index">{project.index}</div>
              <div className="project-title-ghost" aria-hidden="true">{project.title}</div>
              <div className="project-grid">
                <div className="project-copy">
                  <p className="project-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <blockquote>{project.thought}</blockquote>
                  <p>{project.body}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer">
                    Inspect the work <span>↗</span>
                  </a>
                </div>
                <ProjectVisual type={project.visual} />
              </div>
            </section>
          ))}
        </div>

        <section id="research" className="research-section depth-scene">
          <div className="research-copy">
            <p className="section-kicker">Research</p>
            <h2>Biology and software met again in a signal.</h2>
            <p>
              Emotion-H Net explored EEG-based emotion recognition on the DEAP dataset.
              The pipeline reduced 600 engineered features to 164 before a lightweight
              four-encoder Transformer learned from them.
            </p>
            <div className="research-metrics">
              <div><strong>150,244</strong><span>parameters</span></div>
              <div><strong>86.82%</strong><span>test accuracy</span></div>
              <div><strong>0.977</strong><span>AUROC</span></div>
            </div>
            <a href="https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18" target="_blank" rel="noreferrer">
              Springer LNNS · ICDSA 2025 ↗
            </a>
          </div>
          <div className="research-art" data-depth="0.22" aria-hidden="true">
            <svg viewBox="0 0 900 500">
              <path d="M0 260 C72 240 92 95 164 180 S264 398 350 258 454 96 540 258 668 410 734 242 814 160 900 224" />
              <path className="research-art-soft" d="M0 305 C90 165 150 405 238 274 S390 164 465 300 585 375 666 245 790 164 900 300" />
            </svg>
            <span className="research-word research-word--signal">signal</span>
            <span className="research-word research-word--meaning">meaning</span>
          </div>
        </section>

        <section className="capabilities-section">
          <p className="section-kicker">Engineering, grouped by purpose</p>
          <div className="capabilities-grid">
            {capabilities.map(([title, body], index) => (
              <div className="capability" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="beyond-section depth-scene">
          <Petals className="beyond-petals" />
          <div className="beyond-words" aria-hidden="true">
            <span data-depth="-0.15">sketch</span>
            <span data-depth="0.24">sing</span>
            <span data-depth="-0.08">play</span>
            <span data-depth="0.18">observe</span>
          </div>
          <div className="beyond-copy">
            <p className="section-kicker">Beyond output</p>
            <h2>Not everything needs to become a project.</h2>
            <p>
              Drawing, painting, music, basketball, biology, nature, architecture,
              culture, and questions about life all exist outside the project archive.
              Some influence the work. Some are simply parts of living.
            </p>
          </div>
        </section>

        <section className="current-section">
          <div>
            <p className="section-kicker">Current chapter</p>
            <h2>Building across frontend, backend, data, integrations, and workflow state.</h2>
          </div>
          <div className="current-copy">
            <p>
              Software Engineering Intern at Wyrd Media Labs since April 2026, working
              across full-stack business products and the operational edge cases that
              appear between interfaces, APIs, permissions, data, and external services.
            </p>
            <p>
              B.Tech in Instrumentation and Control Engineering, NSUT, 2021–2025.
            </p>
          </div>
        </section>

        <section className="closing-section">
          <p className="closing-script" aria-hidden="true">still curious</p>
          <h2>The questions continue.</h2>
          <p>
            Explore the code, the research, the practice, or simply start a conversation.
          </p>
          <div className="closing-links">
            <a href="https://github.com/Ankit6149" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ankit-bhardwaj-6b9b62221/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://leetcode.com/u/ankit_bh_/" target="_blank" rel="noreferrer">LeetCode ↗</a>
            <a href="https://orcid.org/0009-0005-3408-0058" target="_blank" rel="noreferrer">ORCID ↗</a>
            <a href="mailto:ankitbhardwaj80100@gmail.com">Email ↗</a>
          </div>
        </section>
      </main>

      <footer className="v1-footer">
        <span>© {new Date().getFullYear()} Ankit Bhardwaj</span>
        <span>V1 · layered 2D study</span>
        <Link href="/">Current portfolio</Link>
      </footer>
    </div>
  );
}
