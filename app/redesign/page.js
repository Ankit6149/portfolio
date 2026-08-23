"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const observations = [
  "A thought loses value when its context disappears.",
  "Generated output is easy to create and harder to trust.",
  "A system looks reliable until one dependency stops responding.",
  "A feature can work and still feel wrong.",
  "Noise is not always the absence of meaning.",
];

const worldStates = {
  hero: { background: "#e8e0d3", ink: "#161814", accent: "#4c6454", mist: "#c9c2b6", label: "relationships" },
  origin: { background: "#eee8de", ink: "#171915", accent: "#596d5f", mist: "#d4cdc1", label: "signals · adaptation" },
  observations: { background: "#e4ded2", ink: "#171915", accent: "#4f6555", mist: "#c8c0b4", label: "what keeps returning" },
  skribli: { background: "#ddd8cb", ink: "#171915", accent: "#7a7255", mist: "#c8c2b5", label: "context" },
  signalflow: { background: "#d4d9d1", ink: "#171915", accent: "#536b61", mist: "#bdc6bd", label: "evidence" },
  emotion: { background: "#d9d3dc", ink: "#171915", accent: "#6f627f", mist: "#c7bfcb", label: "representation" },
  practice: { background: "#171a17", ink: "#f0eadf", accent: "#b1c2b5", mist: "#2d332e", label: "practice" },
  beyond: { background: "#eee8de", ink: "#171915", accent: "#806e61", mist: "#d4cabd", label: "expression" },
  closing: { background: "#e8e0d3", ink: "#171915", accent: "#4f6555", mist: "#c9c2b6", label: "continue" },
};

const sectionNav = [
  ["01", "Beginning", "#origin"],
  ["02", "Patterns", "#observations"],
  ["03", "Work", "#work"],
  ["04", "Practice", "#practice"],
  ["05", "Beyond", "#beyond"],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function BackgroundSystem() {
  return (
    <div className="world" aria-hidden="true">
      <div className="world__wash" />
      <div className="world__grid" />
      <svg className="world__thread" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path className="world__thread-ghost" d="M70 -20 C20 80 88 150 44 240 C10 310 84 370 54 455 C25 535 86 590 42 675 C15 730 78 815 55 900 C45 940 48 990 72 1030" />
        <path className="world__thread-active js-world-thread" d="M70 -20 C20 80 88 150 44 240 C10 310 84 370 54 455 C25 535 86 590 42 675 C15 730 78 815 55 900 C45 940 48 990 72 1030" />
      </svg>
      <div className="world__orb world__orb--one" />
      <div className="world__orb world__orb--two" />
      <div className="world__coordinate world__coordinate--one">SENSE</div>
      <div className="world__coordinate world__coordinate--two">RESPOND</div>
      <div className="world__state js-world-label">relationships</div>
    </div>
  );
}

function Navigation({ onOpenAlpha }) {
  return (
    <>
      <nav className="redesign-nav" aria-label="Portfolio navigation">
        <Link href="/redesign" className="redesign-nav__brand">Ankit Bhardwaj</Link>
        <div className="redesign-nav__links">
          <a href="#work">Work</a>
          <a href="#origin">About</a>
          <a href="#emotion">Research</a>
          <Link href="/contact">Contact</Link>
        </div>
        <button type="button" className="alpha-entry" onClick={onOpenAlpha}>Ask System Alpha <span>↗</span></button>
      </nav>
      <aside className="section-rail" aria-label="Page chapters">
        {sectionNav.map(([number, label, href]) => (
          <a key={href} href={href} data-rail-link={href.slice(1)}>
            <span>{number}</span><b>{label}</b>
          </a>
        ))}
      </aside>
    </>
  );
}

function SignalLine({ className = "" }) {
  return (
    <svg className={`signal-line ${className}`} viewBox="0 0 900 160" aria-hidden="true">
      <path className="signal-line__ghost" d="M0 86 C65 86 78 84 105 84 C129 84 130 31 147 31 C168 31 168 131 191 131 C214 131 218 70 244 70 C271 70 279 96 310 96 C342 96 350 82 380 82 C413 82 420 84 450 84 C486 84 489 51 512 51 C535 51 540 116 565 116 C591 116 596 76 625 76 C657 76 665 89 701 89 C736 89 745 84 775 84 C815 84 832 86 900 86" />
      <path className="signal-line__active js-signal-path" d="M0 86 C65 86 78 84 105 84 C129 84 130 31 147 31 C168 31 168 131 191 131 C214 131 218 70 244 70 C271 70 279 96 310 96 C342 96 350 82 380 82 C413 82 420 84 450 84 C486 84 489 51 512 51 C535 51 540 116 565 116 C591 116 596 76 625 76 C657 76 665 89 701 89 C736 89 745 84 775 84 C815 84 832 86 900 86" />
    </svg>
  );
}

function SectionHandoff({ from, to }) {
  return <div className="handoff" aria-hidden="true"><span>{from}</span><i /><b>{to}</b></div>;
}

function NoteVisual() {
  return (
    <div className="visual visual--note" aria-hidden="true">
      <div className="desktop-plane desktop-plane--back" />
      <div className="desktop-plane desktop-plane--middle">
        <span className="desktop-bar" /><span className="desktop-line desktop-line--one" /><span className="desktop-line desktop-line--two" /><span className="desktop-line desktop-line--three" />
      </div>
      <div className="context-note"><span className="context-note__pin">same place</span><p>Remember why this mattered.</p><span className="context-note__meta">attached to the active window</span></div>
      <span className="visual-label visual-label--one">application</span><span className="visual-label visual-label--two">context</span><span className="visual-label visual-label--three">thought</span>
    </div>
  );
}

function EvidenceVisual() {
  return (
    <div className="visual visual--evidence" aria-hidden="true">
      <div className="source-stack">
        {["brief", "repository", "references"].map((label, index) => (
          <div key={label} className={`source-sheet source-sheet--${index + 1}`}><span>{label}</span><i /><i /><i /></div>
        ))}
      </div>
      <div className="evidence-thread"><span className="thread-dot thread-dot--one" /><span className="thread-dot thread-dot--two" /><span className="thread-dot thread-dot--three" /><span className="thread-line" /></div>
      <div className="draft-sheet"><span className="draft-sheet__eyebrow">editable draft</span><strong>Words that still remember where they came from.</strong><i /><i /><i /><span className="draft-sheet__status">review before publish</span></div>
    </div>
  );
}

function BrainSignalVisual() {
  return (
    <div className="visual visual--research" aria-hidden="true">
      <div className="research-grid" /><SignalLine className="research-wave research-wave--one" /><SignalLine className="research-wave research-wave--two" />
      <div className="node-field">
        {Array.from({ length: 18 }).map((_, index) => <span key={index} className={`node-field__node node-field__node--${(index % 6) + 1}`} />)}
        <svg viewBox="0 0 400 300"><path d="M58 74 143 42 219 88 305 51 350 121 287 184 334 248 227 229 149 265 92 202 38 143Z" /><path d="m58 74 91 191M143 42l84 187M219 88 92 202M305 51 149 265M350 121 38 143M287 184 58 74M334 248 219 88" /></svg>
      </div>
      <div className="research-caption"><span>signal</span><span>representation</span><span>meaning</span></div>
    </div>
  );
}

const projectStories = [
  {
    number: "01", key: "skribli", state: "skribli", label: "Context and attention", title: "Skribli",
    statement: "Leave the thought where it became relevant.",
    body: "A note is useful because of what was happening when it was written. Skribli is built around a small interaction: write without leaving the current application, then find the note when that context returns.",
    detail: "The visible idea is quiet. The work underneath involves native Windows behaviour, foreground application detection, local persistence, focus, shortcuts, and making sure the tool never takes over the screen it is meant to support.",
    status: "In active rebuild and validation", href: "https://github.com/Ankit6149/skribly", handoff: ["thought", "evidence"], visual: <NoteVisual />,
  },
  {
    number: "02", key: "signalflow", state: "signalflow", label: "Evidence and communication", title: "SignalFlow Studio",
    statement: "Generation should not erase where an idea came from.",
    body: "SignalFlow Studio keeps product material, repositories, public references, editable drafts, and publishing handoffs inside one reviewable flow.",
    detail: "It began as a content generator. The more important problem became preserving context, showing what is real, and keeping a person inside the final decision instead of hiding judgment behind automation.",
    status: "Active product build", href: "https://github.com/Ankit6149/SignalFlow-Studio", handoff: ["evidence", "signal"], visual: <EvidenceVisual />,
  },
  {
    number: "03", key: "emotion", state: "emotion", label: "Signals and meaning", title: "Emotion-H Net",
    statement: "What must a model see before a noisy signal can mean anything?",
    body: "During college, an interest in living systems became a research question: could emotion be recognised from electrical activity recorded from the brain?",
    detail: "Much of the work happened before the Transformer architecture. The signal had to be divided, represented, reduced, and prepared carefully enough for a model to learn from it without preserving every distraction.",
    status: "Published research, ICDSA 2025", href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18", handoff: ["representation", "practice"], visual: <BrainSignalVisual />,
  },
];

function ProjectStory({ project }) {
  return (
    <section className={`project-story project-story--${project.key} world-section`} id={project.key} data-world={project.state} data-rail="work">
      <div className="project-story__sticky">
        <div className="project-story__index"><span>{project.number}</span><span>{project.label}</span></div>
        <div className="project-story__back-title" aria-hidden="true">{project.title}</div>
        <div className="project-story__copy">
          <p className="project-story__statement">{project.statement}</p><p>{project.body}</p><p>{project.detail}</p>
          <div className="project-story__meta"><span>{project.status}</span><a href={project.href} target="_blank" rel="noreferrer">Inspect the work <ArrowIcon /></a></div>
        </div>
        <div className="project-story__visual">{project.visual}</div>
        <SectionHandoff from={project.handoff[0]} to={project.handoff[1]} />
      </div>
    </section>
  );
}

function RedesignExperience() {
  const root = useRef(null);
  const [isAlphaOpen, setIsAlphaOpen] = useState(false);

  useLenis(() => ScrollTrigger.update());

  useGSAP(() => {
    const shell = root.current;
    const media = gsap.matchMedia();

    const applyState = (name, immediate = false) => {
      const state = worldStates[name] || worldStates.hero;
      const duration = immediate ? 0 : 0.8;
      gsap.to(shell, { "--world-bg": state.background, "--world-ink": state.ink, "--world-accent": state.accent, "--world-mist": state.mist, duration, ease: "power2.out", overwrite: true });
      gsap.to(".js-world-label", {
        opacity: 0, y: -8, duration: immediate ? 0 : 0.2,
        onComplete: () => {
          const label = shell.querySelector(".js-world-label");
          if (label) label.textContent = state.label;
          gsap.to(label, { opacity: 0.62, y: 0, duration: immediate ? 0 : 0.35 });
        },
      });
    };

    applyState("hero", true);

    gsap.utils.toArray(".world-section").forEach((section) => {
      const stateName = section.dataset.world;
      const railName = section.dataset.rail;
      ScrollTrigger.create({
        trigger: section, start: "top 58%", end: "bottom 42%",
        onEnter: () => applyState(stateName), onEnterBack: () => applyState(stateName),
        onToggle: (self) => {
          if (!self.isActive || !railName) return;
          shell.querySelectorAll("[data-rail-link]").forEach((link) => link.classList.toggle("is-active", link.dataset.railLink === railName));
        },
      });
    });

    gsap.to(".js-world-thread", { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: shell, start: "top top", end: "bottom bottom", scrub: 0.35 } });
    gsap.to(".world__orb--one", { yPercent: 160, xPercent: -45, rotate: 120, ease: "none", scrollTrigger: { trigger: shell, start: "top top", end: "bottom bottom", scrub: 1 } });
    gsap.to(".world__orb--two", { yPercent: -125, xPercent: 52, rotate: -90, ease: "none", scrollTrigger: { trigger: shell, start: "top top", end: "bottom bottom", scrub: 1 } });

    media.add({ desktop: "(min-width: 900px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const { desktop, motion } = context.conditions;
      if (!motion) return;

      const hero = gsap.timeline({ scrollTrigger: { trigger: ".redesign-hero", start: "top top", end: desktop ? "+=1900" : "+=1050", scrub: 1, pin: ".redesign-hero__stage", anticipatePin: 1 } });
      hero
        .to(".hero-word--systems", { xPercent: -18, scale: 1.08 }, 0)
        .to(".hero-word--thinking", { xPercent: 14, scale: 0.94 }, 0)
        .to(".hero-word--expressed", { yPercent: -45, opacity: 0.2 }, 0)
        .to(".hero-word--software", { yPercent: -88, scale: 1.16 }, 0)
        .to(".hero-depth-plane--front", { yPercent: -32, rotate: -2 }, 0)
        .to(".hero-depth-plane--back", { yPercent: 25, rotate: 2 }, 0)
        .to(".redesign-hero__intro", { yPercent: -22, opacity: 0.25 }, 0.18)
        .to(".redesign-hero__reveal", { yPercent: -35, opacity: 1 }, 0.38)
        .to(".hero-to-origin", { scaleY: 1, opacity: 1 }, 0.28);

      gsap.fromTo(".js-signal-path", { strokeDashoffset: 1250 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".origin", start: "top 78%", end: "bottom 35%", scrub: 1 } });

      gsap.utils.toArray(".origin-word").forEach((word, index) => {
        gsap.fromTo(word, { yPercent: index % 2 ? 24 : -14 }, { yPercent: index % 2 ? -20 : 18, ease: "none", scrollTrigger: { trigger: ".origin", start: "top bottom", end: "bottom top", scrub: 1 } });
      });

      gsap.utils.toArray(".observation-row").forEach((row, index) => {
        gsap.fromTo(row, { xPercent: index % 2 ? 8 : -8 }, { xPercent: index % 2 ? -8 : 8, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1 } });
      });

      gsap.utils.toArray(".project-story").forEach((section, index) => {
        const title = section.querySelector(".project-story__back-title");
        const visual = section.querySelector(".project-story__visual");
        const copy = section.querySelector(".project-story__copy");
        const handoff = section.querySelector(".handoff");
        gsap.fromTo(title, { xPercent: index % 2 ? 20 : -18, scale: 0.86 }, { xPercent: index % 2 ? -10 : 10, scale: 1.08, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(visual, { yPercent: 22, rotateX: 7, scale: 0.88 }, { yPercent: -18, rotateX: -3, scale: 1.02, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(copy, { y: 100, opacity: 0.25 }, { y: -15, opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 82%", end: "65% 45%", scrub: 1 } });
        gsap.fromTo(handoff, { opacity: 0, y: 36 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: section, start: "55% 55%", end: "bottom 38%", scrub: 1 } });
      });

      gsap.to(".practice-word--one", { xPercent: -26, ease: "none", scrollTrigger: { trigger: ".practice", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".practice-word--two", { xPercent: 24, ease: "none", scrollTrigger: { trigger: ".practice", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".closing__background", { scale: 1.18, ease: "none", scrollTrigger: { trigger: ".closing", start: "top bottom", end: "bottom top", scrub: 1 } });
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div ref={root} id="top" className="redesign-shell">
        <BackgroundSystem />
        <Navigation onOpenAlpha={() => setIsAlphaOpen(true)} />

        <main className="redesign-main">
          <section className="redesign-hero world-section" data-world="hero" data-rail="beginning">
            <div className="redesign-hero__stage">
              <div className="redesign-hero__intro">
                <p className="redesign-eyebrow">Ankit Bhardwaj</p>
                <p className="redesign-role">Software Engineering Intern at Wyrd Media Labs</p>
                <p className="redesign-hero__lead">Signals, feedback, living systems, and the relationships between things came first. Software became the place where many of those questions could become tangible.</p>
              </div>
              <div className="hero-word hero-word--systems">SYSTEMS</div><div className="hero-word hero-word--thinking">THINKING</div><div className="hero-word hero-word--expressed">expressed</div><div className="hero-word hero-word--software">SOFTWARE</div>
              <div className="hero-depth-plane hero-depth-plane--back" aria-hidden="true"><span>signal</span><span>response</span><span>adaptation</span></div>
              <div className="hero-depth-plane hero-depth-plane--front">Systems thinking,<em>expressed through software.</em></div>
              <div className="redesign-hero__reveal"><span>Scroll to follow the relationship</span><i /></div>
              <div className="hero-to-origin" aria-hidden="true" />
            </div>
          </section>

          <section className="origin world-section" id="origin" data-world="origin" data-rail="beginning">
            <div className="origin-word origin-word--one">signals</div><div className="origin-word origin-word--two">living systems</div><div className="origin-word origin-word--three">software</div>
            <div className="redesign-container origin__content">
              <div className="chapter-marker"><span>01</span><b>Where it began</b></div>
              <h2>The medium changed. The questions kept changing shape.</h2>
              <div className="origin__columns"><p>Instrumentation & Control gave me an early language for signals, feedback, noise, changing states, and systems trying to remain stable.</p><p>Biology kept pulling me toward living systems: how separate parts sense, communicate, adapt, recover, and remain coordinated.</p><p>Software arrived gradually, then became the place where those different interests could meet and become things people use.</p></div>
              <SignalLine /><SectionHandoff from="questions" to="patterns" />
            </div>
          </section>

          <section className="observations world-section" id="observations" data-world="observations" data-rail="patterns">
            <div className="redesign-container observations__intro"><div className="chapter-marker"><span>02</span><b>What keeps returning</b></div><h2>A few problems keep appearing in different forms.</h2></div>
            <div className="observations__rows">{observations.map((observation, index) => <div className="observation-row" key={observation}><span>{String(index + 1).padStart(2, "0")}</span><p>{observation}</p></div>)}</div>
            <div className="redesign-container"><SectionHandoff from="patterns" to="work" /></div>
          </section>

          <section className="work-intro world-section" id="work" data-world="skribli" data-rail="work">
            <div className="redesign-container work-intro__grid"><div className="chapter-marker"><span>03</span><b>Where it led</b></div><p>Different problems. The same habit of staying with what does not yet make sense.</p></div>
          </section>

          <div className="work-continuum">{projectStories.map((project) => <ProjectStory key={project.key} project={project} />)}</div>

          <section className="practice world-section" id="practice" data-world="practice" data-rail="practice">
            <div className="practice-word practice-word--one">FIRST IDEAS FAIL</div><div className="practice-word practice-word--two">STAY WITH IT</div>
            <div className="redesign-container practice__content">
              <div className="chapter-marker"><span>04</span><b>What projects do not show</b></div>
              <div className="practice-number"><span className="practice-number__value">806</span><span>problems solved, mostly in C++</span></div>
              <div className="practice__text"><p>I began LeetCode because interviews required it. The more useful change was becoming less surprised when the first approach failed.</p><p>That patience now carries into product work, debugging, integrations, backend behaviour, automation, and the places where an interface stops being only an interface.</p></div>
              <SectionHandoff from="practice" to="person" />
            </div>
          </section>

          <section className="beyond world-section" id="beyond" data-world="beyond" data-rail="beyond">
            <div className="beyond__copy"><div className="chapter-marker"><span>05</span><b>Beyond output</b></div><h2>Not everything becomes a project.</h2><p>I sketch and paint, sing when I get the chance, play basketball, and keep returning to biology even when there is no product waiting at the end.</p><p>Some interests influence how I notice rhythm, movement, structure, and expression. Some are simply parts of life.</p></div>
            <div className="beyond__words" aria-hidden="true"><span className="beyond-word beyond-word--sketch">sketch</span><span className="beyond-word beyond-word--sing">sing</span><span className="beyond-word beyond-word--play">play</span><span className="beyond-word beyond-word--observe">observe</span></div>
          </section>

          <section className="closing world-section" data-world="closing">
            <div className="closing__background">CONTINUE</div>
            <div className="redesign-container closing__content">
              <div className="chapter-marker"><span>06</span><b>Choose a way in</b></div><h2>This homepage is the shortest version of the story.</h2>
              <div className="closing__links">
                <Link href="/projects"><strong>Explore the work</strong><span>Projects, research, experiments, and earlier builds</span><ArrowIcon /></Link>
                <Link href="/about"><strong>Read the full story</strong><span>Signals, living systems, software, and the route here</span><ArrowIcon /></Link>
                <button type="button" onClick={() => setIsAlphaOpen(true)}><strong>Ask System Alpha</strong><span>Find the part of the portfolio that is most relevant to you</span><ArrowIcon /></button>
                <Link href="/contact"><strong>Start a conversation</strong><span>Work, research, questions, or collaboration</span><ArrowIcon /></Link>
              </div>
            </div>
          </section>
        </main>

        {isAlphaOpen ? (
          <div className="alpha-panel" role="dialog" aria-modal="true" aria-labelledby="alpha-panel-title">
            <button type="button" className="alpha-panel__backdrop" aria-label="Close System Alpha" onClick={() => setIsAlphaOpen(false)} />
            <div className="alpha-panel__card">
              <button type="button" className="alpha-panel__close" onClick={() => setIsAlphaOpen(false)}>Close</button>
              <small>System Alpha · portfolio guide</small><h3 id="alpha-panel-title">Where should we begin?</h3>
              <p>The full assistant remains connected to the current portfolio while this redesign is still under review. Open it to ask about the work, research, route into software, or the project that represents Ankit best.</p>
              <Link href="/">Open System Alpha</Link>
            </div>
          </div>
        ) : null}

        <footer className="redesign-footer"><span>© {new Date().getFullYear()} Ankit Bhardwaj</span><span>Portfolio preview · master remains unchanged</span><a href="#top">Back to top ↑</a></footer>
      </div>
    </ReactLenis>
  );
}

export default function RedesignPage() {
  return <RedesignExperience />;
}
