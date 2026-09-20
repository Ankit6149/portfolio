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


function HeroGarden() {
  return (
    <svg className="hero2-garden" viewBox="0 0 1200 900" aria-hidden="true">
      <defs>
        <linearGradient id="forestWash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#123f3b" stopOpacity=".2" />
          <stop offset=".55" stopColor="#0a4c47" stopOpacity=".92" />
          <stop offset="1" stopColor="#062f2c" />
        </linearGradient>
        <linearGradient id="petalWash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7ddd0" />
          <stop offset=".48" stopColor="#e99bad" />
          <stop offset="1" stopColor="#c76681" />
        </linearGradient>
        <filter id="softInk"><feGaussianBlur stdDeviation="16" /></filter>
        <filter id="glow"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      <path className="hero2-wash" d="M405 10C646 22 742 107 887 221c155 122 245 278 273 478 16 116-17 180-66 201H612c-126-80-206-175-246-285-53-147-59-296-11-447C367 127 384 71 405 10Z" fill="url(#forestWash)" />
      <path className="hero2-mist" d="M133 541c197-54 335-64 466-26 114 33 196 99 291 188 67 62 160 94 282 98" fill="none" stroke="#f4eee5" strokeWidth="94" strokeLinecap="round" opacity=".34" filter="url(#softInk)" />

      <g className="hero2-stems" fill="none" stroke="#c9aa61" strokeWidth="2.2">
        <path d="M1120 100C978 193 845 268 727 388c-89 91-143 205-225 355" />
        <path d="M1178 253C1013 270 900 347 808 455c-74 87-121 173-184 319" />
        <path d="M1028 40C946 143 881 213 767 284" />
      </g>

      <g className="hero2-leaves">
        <path d="M873 266c63-49 104-41 127-5-53 25-92 30-127 5Z" fill="#9aae72" />
        <path d="M804 349c44-74 91-88 131-67-34 55-75 79-131 67Z" fill="#cad59c" />
        <path d="M745 430c-10-77 18-119 62-126 7 62-10 104-62 126Z" fill="#71865b" />
        <path d="M666 541c55-55 106-59 140-25-49 42-93 51-140 25Z" fill="#b4c892" />
        <path d="M601 663c-10-69 18-105 58-110 6 53-12 90-58 110Z" fill="#809566" />
      </g>

      <g className="hero2-bloom" fill="url(#petalWash)">
        <path d="M954 167c34-52 82-44 87-3-28 26-59 27-87 3Z" />
        <path d="M1003 183c38-38 81-15 68 23-32 14-58 7-68-23Z" />
        <path d="M969 212c12-54 62-63 80-24-14 33-42 44-80 24Z" />
        <path d="M860 314c30-57 83-53 91-11-26 32-57 36-91 11Z" />
        <path d="M910 334c36-42 82-22 73 19-29 19-58 13-73-19Z" />
        <path d="M817 391c25-47 68-45 78-11-20 29-46 34-78 11Z" />
        <path d="M713 517c31-52 79-45 86-6-25 28-54 31-86 6Z" />
        <path d="M756 540c37-38 77-15 66 21-29 15-54 9-66-21Z" />
      </g>

      <g className="hero2-sparks" fill="#efd79a">
        <circle cx="935" cy="130" r="4" /><circle cx="1055" cy="230" r="5" />
        <circle cx="847" cy="284" r="3.5" /><circle cx="770" cy="456" r="4.5" />
        <circle cx="635" cy="602" r="4" />
      </g>
    </svg>
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
        <section id="top" className="hero2">
          <div className="hero2-paper" aria-hidden="true" />
          <div className="hero2-art" data-depth="0.16">
            <HeroGarden />
          </div>

          <div className="hero2-copy">
            <p className="hero2-kicker">Ankit Bhardwaj · New Delhi</p>

            <div className="hero2-title">
              <span className="hero2-script">curiosity</span>
              <h1>
                <span className="hero2-line hero2-line--one">I build to</span>
                <span className="hero2-line hero2-line--two">understand.</span>
              </h1>
            </div>

            <p className="hero2-intro">
              Software, research, systems and experiments — different mediums,
              connected by the same habit of looking closely and asking better questions.
            </p>

            <div className="hero2-links">
              <a href="#story">Follow the thread <span>↓</span></a>
              <a href="#work">Selected work <span>↘</span></a>
            </div>
          </div>

          <div className="hero2-index" aria-hidden="true">
            <span>01</span><i /><span>arrival</span>
          </div>

          <div className="hero2-foreground" data-depth="0.34" aria-hidden="true">
            <span className="hero2-petal hero2-petal--a" />
            <span className="hero2-petal hero2-petal--b" />
            <span className="hero2-petal hero2-petal--c" />
            <span className="hero2-leaf hero2-leaf--a" />
            <span className="hero2-leaf hero2-leaf--b" />
          </div>
        </section>

        <section id="story" className="thread2">
          <div className="thread2-track" aria-hidden="true">
            <span>observe</span><i /><span>measure</span><i /><span>build</span><i /><span>refine</span>
          </div>

          <div className="thread2-copy">
            <p className="section-kicker">One thread, many mediums</p>
            <h2>
              <span>Life made me curious.</span>
              <span>Engineering taught me to read systems.</span>
              <span>Software let me make ideas tangible.</span>
            </h2>
          </div>

          <div className="thread2-note">
            <span className="thread2-note__mark">↳</span>
            <p>
              Biology, signals, interfaces, automation, research, desktop tools —
              the subjects change. The instinct does not.
            </p>
          </div>

          <div className="thread2-word" data-depth="-0.16" aria-hidden="true">thread</div>
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
