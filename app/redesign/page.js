"use client";

import Link from "next/link";
import { useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const observations = [
  "A thought loses value when its context disappears.",
  "Generated output is easy to create and harder to trust.",
  "A system looks reliable until one dependency stops responding.",
  "A feature can work and still feel wrong.",
  "Noise is not always the absence of meaning.",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SignalLine({ className = "" }) {
  return (
    <svg className={`signal-line ${className}`} viewBox="0 0 900 160" aria-hidden="true">
      <path
        className="signal-line__ghost"
        d="M0 86 C65 86 78 84 105 84 C129 84 130 31 147 31 C168 31 168 131 191 131 C214 131 218 70 244 70 C271 70 279 96 310 96 C342 96 350 82 380 82 C413 82 420 84 450 84 C486 84 489 51 512 51 C535 51 540 116 565 116 C591 116 596 76 625 76 C657 76 665 89 701 89 C736 89 745 84 775 84 C815 84 832 86 900 86"
      />
      <path
        className="signal-line__active js-signal-path"
        d="M0 86 C65 86 78 84 105 84 C129 84 130 31 147 31 C168 31 168 131 191 131 C214 131 218 70 244 70 C271 70 279 96 310 96 C342 96 350 82 380 82 C413 82 420 84 450 84 C486 84 489 51 512 51 C535 51 540 116 565 116 C591 116 596 76 625 76 C657 76 665 89 701 89 C736 89 745 84 775 84 C815 84 832 86 900 86"
      />
    </svg>
  );
}

function NoteVisual() {
  return (
    <div className="visual visual--note" aria-hidden="true">
      <div className="desktop-plane desktop-plane--back" />
      <div className="desktop-plane desktop-plane--middle">
        <span className="desktop-bar" />
        <span className="desktop-line desktop-line--one" />
        <span className="desktop-line desktop-line--two" />
        <span className="desktop-line desktop-line--three" />
      </div>
      <div className="context-note">
        <span className="context-note__pin">same place</span>
        <p>Remember why this mattered.</p>
        <span className="context-note__meta">attached to the active window</span>
      </div>
      <span className="visual-label visual-label--one">application</span>
      <span className="visual-label visual-label--two">context</span>
      <span className="visual-label visual-label--three">thought</span>
    </div>
  );
}

function EvidenceVisual() {
  return (
    <div className="visual visual--evidence" aria-hidden="true">
      <div className="source-stack">
        <div className="source-sheet source-sheet--one">
          <span>brief</span>
          <i />
          <i />
          <i />
        </div>
        <div className="source-sheet source-sheet--two">
          <span>repository</span>
          <i />
          <i />
          <i />
        </div>
        <div className="source-sheet source-sheet--three">
          <span>references</span>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="evidence-thread">
        <span className="thread-dot thread-dot--one" />
        <span className="thread-dot thread-dot--two" />
        <span className="thread-dot thread-dot--three" />
        <span className="thread-line" />
      </div>
      <div className="draft-sheet">
        <span className="draft-sheet__eyebrow">editable draft</span>
        <strong>Words that still remember where they came from.</strong>
        <i />
        <i />
        <i />
        <span className="draft-sheet__status">review before publish</span>
      </div>
    </div>
  );
}

function BrainSignalVisual() {
  return (
    <div className="visual visual--research" aria-hidden="true">
      <div className="research-grid" />
      <SignalLine className="research-wave research-wave--one" />
      <SignalLine className="research-wave research-wave--two" />
      <div className="node-field">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={`node-field__node node-field__node--${(index % 6) + 1}`}
          />
        ))}
        <svg viewBox="0 0 400 300">
          <path d="M58 74 143 42 219 88 305 51 350 121 287 184 334 248 227 229 149 265 92 202 38 143Z" />
          <path d="m58 74 91 191M143 42l84 187M219 88 92 202M305 51 149 265M350 121 38 143M287 184 58 74M334 248 219 88" />
        </svg>
      </div>
      <div className="research-caption">
        <span>signal</span>
        <span>representation</span>
        <span>meaning</span>
      </div>
    </div>
  );
}

const projectStories = [
  {
    number: "01",
    key: "skribli",
    label: "Context and attention",
    title: "Skribli",
    statement: "Leave the thought where it became relevant.",
    body:
      "A note is useful because of what was happening when it was written. Skribli is built around a small interaction: write without leaving the current application, then find the note when that context returns.",
    detail:
      "The visible idea is quiet. The work underneath involves native Windows behaviour, foreground application detection, local persistence, focus, shortcuts, and making sure the tool never takes over the screen it is meant to support.",
    status: "In active rebuild and validation",
    href: "https://github.com/Ankit6149/skribly",
    visual: <NoteVisual />,
  },
  {
    number: "02",
    key: "signalflow",
    label: "Evidence and communication",
    title: "SignalFlow Studio",
    statement: "Generation should not erase where an idea came from.",
    body:
      "SignalFlow Studio keeps product material, repositories, public references, editable drafts, and publishing handoffs inside one reviewable flow.",
    detail:
      "It began as a content generator. The more important problem became preserving context, showing what is real, and keeping a person inside the final decision instead of hiding judgment behind automation.",
    status: "Active product build",
    href: "https://github.com/Ankit6149/SignalFlow-Studio",
    visual: <EvidenceVisual />,
  },
  {
    number: "03",
    key: "emotion",
    label: "Signals and meaning",
    title: "Emotion-H Net",
    statement: "What must a model see before a noisy signal can mean anything?",
    body:
      "During college, an interest in living systems became a research question: could emotion be recognised from electrical activity recorded from the brain?",
    detail:
      "Much of the work happened before the Transformer architecture. The signal had to be divided, represented, reduced, and prepared carefully enough for a model to learn from it without preserving every distraction.",
    status: "Published research, ICDSA 2025",
    href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
    visual: <BrainSignalVisual />,
  },
];

function ProjectStory({ project }) {
  return (
    <section className={`project-story project-story--${project.key}`} id={project.key}>
      <div className="project-story__sticky">
        <div className="project-story__index">
          <span>{project.number}</span>
          <span>{project.label}</span>
        </div>

        <div className="project-story__back-title" aria-hidden="true">
          {project.title}
        </div>

        <div className="project-story__copy">
          <p className="project-story__statement">{project.statement}</p>
          <p>{project.body}</p>
          <p>{project.detail}</p>
          <div className="project-story__meta">
            <span>{project.status}</span>
            <a href={project.href} target="_blank" rel="noreferrer">
              Inspect the work <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="project-story__visual">{project.visual}</div>
      </div>
    </section>
  );
}

function RedesignExperience() {
  const root = useRef(null);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 900px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motion } = context.conditions;
          if (!motion) return;

          const hero = gsap.timeline({
            scrollTrigger: {
              trigger: ".redesign-hero",
              start: "top top",
              end: desktop ? "+=1900" : "+=1050",
              scrub: 1,
              pin: ".redesign-hero__stage",
              anticipatePin: 1,
            },
          });

          hero
            .to(".hero-word--systems", { xPercent: -18, scale: 1.08 }, 0)
            .to(".hero-word--thinking", { xPercent: 14, scale: 0.94 }, 0)
            .to(".hero-word--expressed", { yPercent: -45, opacity: 0.22 }, 0)
            .to(".hero-word--software", { yPercent: -88, scale: 1.16 }, 0)
            .to(".hero-depth-plane--front", { yPercent: -32, rotate: -2 }, 0)
            .to(".hero-depth-plane--back", { yPercent: 25, rotate: 2 }, 0)
            .to(".redesign-hero__intro", { yPercent: -22, opacity: 0.25 }, 0.18)
            .to(".redesign-hero__reveal", { yPercent: -35, opacity: 1 }, 0.38);

          gsap.fromTo(
            ".js-signal-path",
            { strokeDashoffset: 1250 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".origin",
                start: "top 78%",
                end: "bottom 35%",
                scrub: 1,
              },
            },
          );

          gsap.utils.toArray(".origin-word").forEach((word, index) => {
            gsap.fromTo(
              word,
              { yPercent: index % 2 ? 24 : -14 },
              {
                yPercent: index % 2 ? -20 : 18,
                ease: "none",
                scrollTrigger: {
                  trigger: ".origin",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });

          gsap.utils.toArray(".observation-row").forEach((row, index) => {
            gsap.fromTo(
              row,
              { xPercent: index % 2 ? 8 : -8 },
              {
                xPercent: index % 2 ? -8 : 8,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });

          gsap.utils.toArray(".project-story").forEach((section, index) => {
            const title = section.querySelector(".project-story__back-title");
            const visual = section.querySelector(".project-story__visual");
            const copy = section.querySelector(".project-story__copy");

            gsap.fromTo(
              title,
              { xPercent: index % 2 ? 20 : -18, scale: 0.86 },
              {
                xPercent: index % 2 ? -10 : 10,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );

            gsap.fromTo(
              visual,
              { yPercent: 22, rotateX: 7, scale: 0.88 },
              {
                yPercent: -18,
                rotateX: -3,
                scale: 1.02,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 84%",
                  end: "bottom 24%",
                  scrub: 1,
                },
              },
            );

            gsap.fromTo(
              copy,
              { y: 90, opacity: 0.25 },
              {
                y: -24,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                  end: "center 38%",
                  scrub: 1,
                },
              },
            );
          });

          gsap.fromTo(
            ".practice-number__value",
            { textContent: 0 },
            {
              textContent: 806,
              duration: 1,
              snap: { textContent: 1 },
              ease: "none",
              scrollTrigger: {
                trigger: ".practice",
                start: "top 68%",
                end: "center 44%",
                scrub: 1,
              },
            },
          );

          gsap.to(".practice-word--left", {
            xPercent: -24,
            scrollTrigger: {
              trigger: ".practice",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.to(".practice-word--right", {
            xPercent: 24,
            scrollTrigger: {
              trigger: ".practice",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.fromTo(
            ".closing-word",
            { scale: 0.72, letterSpacing: "0.08em" },
            {
              scale: 1.12,
              letterSpacing: "-0.055em",
              ease: "none",
              scrollTrigger: {
                trigger: ".closing",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
              },
            },
          );
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="redesign-shell">
      <header className="redesign-nav">
        <a className="redesign-nav__name" href="#top">
          Ankit Bhardwaj
        </a>
        <nav aria-label="Prototype navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="redesign-nav__alpha" href="/">
          Ask System Alpha
        </Link>
      </header>

      <section className="redesign-hero" id="top">
        <div className="redesign-hero__stage">
          <div className="redesign-hero__intro">
            <span>Software Engineering Intern at Wyrd Media Labs</span>
            <p>
              Software was not where it started. Signals, feedback, living systems,
              and the relationships between things came first.
            </p>
          </div>

          <div className="hero-word hero-word--systems">SYSTEMS</div>
          <div className="hero-word hero-word--thinking">THINKING</div>
          <div className="hero-word hero-word--expressed">EXPRESSED</div>
          <div className="hero-word hero-word--software">SOFTWARE</div>

          <div className="hero-depth-plane hero-depth-plane--back" aria-hidden="true">
            <span>signal</span>
            <span>response</span>
            <span>adaptation</span>
          </div>
          <div className="hero-depth-plane hero-depth-plane--front" aria-hidden="true">
            <span>Systems thinking,</span>
            <strong>expressed through software.</strong>
          </div>

          <div className="redesign-hero__reveal">
            <span>Scroll to follow the thread</span>
            <ArrowIcon />
          </div>
        </div>
      </section>

      <section className="origin">
        <div className="origin__background" aria-hidden="true">
          <span className="origin-word origin-word--signals">signals</span>
          <span className="origin-word origin-word--living">living</span>
          <span className="origin-word origin-word--software">software</span>
        </div>

        <div className="origin__content">
          <p className="section-index">00 / Why</p>
          <h1>The route here was not straight.</h1>
          <div className="origin__columns">
            <p>
              Instrumentation &amp; Control Engineering gave me an early language for
              signals, feedback, noise, changing states, and systems trying to remain
              stable.
            </p>
            <p>
              At the same time, I kept returning to living systems: how they sense,
              communicate, adapt, recover, and remain coordinated while everything
              around them changes.
            </p>
            <p>
              Software arrived gradually. It became the place where these interests
              could meet, disagree, and become something tangible.
            </p>
          </div>
          <SignalLine />
        </div>
      </section>

      <section className="observations">
        <div className="observations__heading">
          <p className="section-index">01 / What keeps returning</p>
          <h2>A few things keep catching my attention.</h2>
        </div>
        <div className="observations__rows">
          {observations.map((observation, index) => (
            <div className="observation-row" key={observation}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{observation}</p>
            </div>
          ))}
        </div>
        <p className="observations__closing">
          Some became products. One became research. All of them changed shape while
          being built.
        </p>
      </section>

      <div id="work" className="work-intro">
        <p className="section-index">02 / Where it led</p>
        <p>Different problems. The same habit of staying with what does not yet make sense.</p>
      </div>

      {projectStories.map((project) => (
        <ProjectStory key={project.key} project={project} />
      ))}

      <section className="practice" id="practice">
        <div className="practice-word practice-word--left" aria-hidden="true">
          FIRST IDEAS FAIL
        </div>
        <div className="practice-word practice-word--right" aria-hidden="true">
          STAY WITH IT
        </div>

        <div className="practice__content">
          <p className="section-index">03 / What the projects do not show</p>
          <div className="practice-number">
            <span className="practice-number__value">806</span>
            <span>problems solved, mostly in C++</span>
          </div>
          <div className="practice__text">
            <p>
              I began LeetCode because interviews required it. The more useful change
              was becoming less surprised when the first approach failed.
            </p>
            <p>
              That patience now carries into product work, debugging, integrations,
              backend behaviour, automation, and the places where an interface stops
              being only an interface.
            </p>
          </div>
          <a
            className="text-link"
            href="https://leetcode.com/u/ankit_bh_/"
            target="_blank"
            rel="noreferrer"
          >
            Open the problem-solving record <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="beyond">
        <div className="beyond__intro">
          <p className="section-index">04 / Beyond output</p>
          <h2>Not everything becomes a project.</h2>
          <p>
            I sketch and paint, sing when I get the chance, play basketball, and keep
            returning to biology even when there is no product waiting at the end.
          </p>
          <p>
            Some interests shape how I notice rhythm, movement, structure, and
            expression. Some are simply parts of life that do not need to justify
            themselves through work.
          </p>
        </div>

        <div className="beyond__words" aria-label="Personal interests">
          <span className="beyond__word beyond__word--sketch">sketch</span>
          <span className="beyond__word beyond__word--sing">sing</span>
          <span className="beyond__word beyond__word--play">play</span>
          <span className="beyond__word beyond__word--observe">observe</span>
          <div className="beyond__line" />
        </div>
      </section>

      <section className="closing">
        <p className="closing-word" aria-hidden="true">
          CONTINUE
        </p>
        <div className="closing__content">
          <p className="section-index">05 / Choose a way in</p>
          <h2>This homepage is the shortest version of the story.</h2>
          <div className="closing__links">
            <Link href="/projects">
              <span>Explore the work</span>
              <small>Projects, research, experiments, and earlier builds</small>
              <ArrowIcon />
            </Link>
            <Link href="/about">
              <span>Read the full story</span>
              <small>Signals, living systems, software, creativity, and the route here</small>
              <ArrowIcon />
            </Link>
            <Link href="/">
              <span>Ask System Alpha</span>
              <small>Find the part of the portfolio that is most relevant to you</small>
              <ArrowIcon />
            </Link>
            <Link href="/contact">
              <span>Start a conversation</span>
              <small>Work, research, questions, or a thoughtful collaboration</small>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <footer className="redesign-footer">
        <span>Portfolio motion study, isolated from the current homepage</span>
        <a href="#top">Back to the beginning</a>
      </footer>
    </main>
  );
}

export default function RedesignPage() {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.08,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      <RedesignExperience />
    </ReactLenis>
  );
}
