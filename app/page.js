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
import { TechStrip } from "../components/tech-strip";
import {
  capabilityCards,
  featuredProjects,
  profileLinks,
  siteMeta,
  projectArchive,
} from "../lib/site-data";
import { useState } from "react";
import { ProjectModal } from "../components/project-modal";

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="core-ring core-ring--1" />
      <div className="core-ring core-ring--2" />
      <div className="core-ring core-ring--3" />

      <svg
        className="hero-radials"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line className="radial-line radial-line--one" x1="50" y1="50" x2="88" y2="32" />
        <line className="radial-line radial-line--two" x1="50" y1="50" x2="28" y2="86" />
        <line className="radial-line radial-line--three" x1="50" y1="50" x2="18" y2="38" />
      </svg>

      <div className="visual-core">
        <div className="center-square" />
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

      <div className="visual-data-label">SYS_READY: A-001</div>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SiteChrome>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <StatusBadge />
            <h1 className="hero-title">
              ANKIT
              <br />
              BHARDWAJ
            </h1>
            <div className="hero-subtitle">{siteMeta.subtitle}</div>
            <div className="hero-subcopy">
              <p>{siteMeta.heroText}</p>
            </div>
          </div>

          <div className="hero-visual-col">
            <HeroVisual />
          </div>
        </div>
      </section>

      <TechStrip />

      <section className="section">
        <div className="container">
          <SectionHead
            title="Core Protocols"
            kicker="Standardized Portfolio Framework"
            code="[01] FULL STACK [02] RESEARCH [03] CREDENTIALS"
          />

          <div className="bento-grid">
            {capabilityCards.map((card) => (
              <article
                key={card.label}
                className="bento-card bento-accent"
                style={{ "--accent": card.color }}
              >
                <div className="bento-label" style={{ color: card.color }}>
                  {card.label}
                </div>
                <h3 className="bento-title">{card.title}</h3>
                <p className="bento-body">{card.body}</p>
                <ul className="bullet-list">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container">
          <SectionHead
            title="Selected Work"
            kicker="Curated Case Studies"
            code="[A] PRODUCT [B] PLATFORM [C] RESEARCH"
          />

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article
                key={project.name}
                className="project-card project-card--clickable"
                style={{ "--accent": project.color }}
                onClick={() => {
                  const fullProject = projectArchive.find((p) =>
                    p.name.toLowerCase().includes(project.name.toLowerCase()),
                  );
                  setSelectedProject(fullProject || { ...project, id: "FT" });
                }}
              >
                <div className="bento-label">{project.type}</div>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-stack">{project.stack}</p>
                <p className="bento-body">{project.summary}</p>
                <ul className="bullet-list">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          <div className="section-link-row">
            <Link href="/projects" className="button">
              View Full Project Archive
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container">
          <LiveStats />
        </div>
      </section>

      <section className="section section-divider">
        <div className="container">
          <SectionHead
            title="Directory"
            kicker="Explore More"
            code="[NAV] DEEP DIVE [MAP] EXPLORE [PTR] GOTO"
          />
          <div className="bento-grid">
            <Link
              href="/about"
              className="bento-card bento-accent directory-card"
              style={{ "--accent": "var(--coral)" }}
            >
              <div className="bento-label" style={{ color: "var(--coral)" }}>
                06. About
              </div>
              <h3 className="bento-title">
                Working Style & Focus
              </h3>
              <p className="bento-body">
                Learn about my engineering philosophy, core stack, and the way I
                approach scalable system design.
              </p>
              <span className="directory-card-action">Open node -&gt;</span>
            </Link>

            <Link
              href="/experience"
              className="bento-card bento-accent directory-card"
              style={{ "--accent": "var(--mint)" }}
            >
              <div className="bento-label" style={{ color: "var(--mint)" }}>
                03. Experience
              </div>
              <h3 className="bento-title">
                Professional Journey
              </h3>
              <p className="bento-body">
                A detailed timeline of my internships, academic progress, and
                competitive programming achievements.
              </p>
              <span className="directory-card-action">Open node -&gt;</span>
            </Link>

            <Link
              href="/credentials"
              className="bento-card bento-accent directory-card"
              style={{ "--accent": "var(--gold)" }}
            >
              <div className="bento-label" style={{ color: "var(--gold)" }}>
                05. Credentials
              </div>
              <h3 className="bento-title">
                Certificates & Skills
              </h3>
              <p className="bento-body">
                Verified technical certifications across Data Structures,
                Algorithms, Web Development, and AI/ML.
              </p>
              <span className="directory-card-action">Open node -&gt;</span>
            </Link>

            <Link
              href="/contact"
              className="bento-card bento-accent directory-card"
              style={{ "--accent": "var(--blue)" }}
            >
              <div className="bento-label" style={{ color: "var(--blue)" }}>
                07. Contact
              </div>
              <h3 className="bento-title">
                Let&apos;s Connect
              </h3>
              <p className="bento-body">
                Open for software engineering roles. Reach out via email,
                LinkedIn, or check my code on GitHub.
              </p>
              <span className="directory-card-action">Open node -&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container dual-panel">
          <div className="panel">
            <div className="bento-label">Profile Links</div>
            <h3 className="panel-title">
              Public presence and technical proof.
            </h3>
            <p className="bento-body">
              Verify my work across GitHub, LinkedIn, LeetCode, and ORCID. Each
              platform serves a specific purpose in demonstrating technical
              depth and professional credibility.
            </p>
          </div>
          <LinkGrid items={profileLinks} />
        </div>
      </section>

      <CTASection />
    </SiteChrome>
  );
}
