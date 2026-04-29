"use client";

import Link from "next/link";
import { SiteChrome } from "../components/site-chrome";
import {
  CTASection,
  LinkGrid,
  SectionHead,
  StatusBadge,
} from "../components/site-sections";
import { LiveStats } from "../components/live-stats";
import {
  capabilityCards,
  featuredProjects,
  profileLinks,
  siteMeta,
  projectArchive,
} from "../lib/site-data";
import { useState } from "react";
import { ProjectModal } from "../components/project-modal";
import { TechStrip } from "../components/tech-strip";

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-core">
        <div className="core-ring core-ring--1" />
        <div className="core-ring core-ring--2" />
        <div className="core-ring core-ring--3" />
      </div>

      <div className="visual-orbit visual-orbit--slow">
        <div
          className="orbit-node node--coral"
          style={{ top: "0", left: "50%" }}
        />
      </div>

      <div className="visual-orbit visual-orbit--fast">
        <div
          className="orbit-node node--mint"
          style={{ bottom: "20%", right: "10%" }}
        />
        <div
          className="orbit-node node--gold"
          style={{ top: "20%", left: "10%" }}
        />
      </div>

      <svg className="visual-lines" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--forest)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#line-grad)"
          strokeWidth="0.5"
          fill="none"
        />
        <line
          x1="100"
          y1="100"
          x2="180"
          y2="40"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="100"
          x2="20"
          y2="150"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="100"
          x2="160"
          y2="160"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      </svg>

      <div className="visual-data-label">SYS_READY: A-001</div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <SiteChrome>
      <main className="page-shell">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <StatusBadge text="System Ready: A-001" />
              <h1 className="hero-title">
                {siteMeta.heroTitle.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <div className="hero-subcopy">
                <p>{siteMeta.heroText}</p>
              </div>
              <div
                className="nav-actions"
                style={{ marginTop: "3rem", justifyContent: "flex-start" }}
              >
                <Link href="/projects" className="button button-solid">
                  Initialize Discovery
                </Link>
                <Link href="/contact" className="button">
                  Handshake Protocol
                </Link>
              </div>
            </div>
            <div className="hero-visual-col">
              <HeroVisual />
            </div>
          </div>
        </section>

        <div className="technical-divider" />
        <TechStrip />
        <div className="technical-divider" />

        <section className="section-projects" id="work">
          <div className="container">
            <SectionHead
              title="Selected Work"
              kicker="Functional Prototypes & Systems"
              code="DIR: /PROJ"
            />
            <div className="project-featured-grid">
              {featuredProjects.map((project) => (
                <div
                  key={project.name}
                  className="project-featured-card"
                  onClick={() => setActiveProject(project)}
                >
                  <div
                    className="project-card-accent"
                    style={{ background: project.color }}
                  />
                  <div className="project-card-content">
                    <div className="project-card-meta">
                      <span className="project-card-type">{project.type}</span>
                    </div>
                    <h3 className="project-card-title">{project.name}</h3>
                    <p className="project-card-summary">{project.summary}</p>
                    <div className="project-card-stack">
                      {project.stack.split(" / ").map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LiveStats />

        <section className="section-protocols" id="protocols">
          <div className="container">
            <SectionHead
              title="Core Protocols"
              kicker="Operational Capability Stack"
              code="SYS: /LOGIC"
            />
            <div className="capability-grid">
              {capabilityCards.map((card) => (
                <div key={card.label} className="capability-card">
                  <div
                    className="capability-accent"
                    style={{ background: card.color }}
                  />
                  <div className="capability-label">{card.label}</div>
                  <h3 className="capability-title">{card.title}</h3>
                  <p className="capability-body">{card.body}</p>
                  <ul className="capability-points">
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </SiteChrome>
  );
}
