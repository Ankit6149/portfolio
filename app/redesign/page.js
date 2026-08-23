"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";
import frame02 from "../../portfolio-assets/PORTFOLIO_F02_APPROACH.png";
import frame03 from "../../portfolio-assets/PORTFOLIO_F03_THRESHOLD.png";
import frame04 from "../../portfolio-assets/PORTFOLIO_F04_ENTER_ESTATE.png";
import frame05 from "../../portfolio-assets/PORTFOLIO_F05_INTERIOR_DISCOVERY.png";
import frame06 from "../../portfolio-assets/PORTFOLIO_F06_DEEPER_INSIDE.png";
import frame07 from "../../portfolio-assets/PORTFOLIO_F07_CREATION_SPACE.png";
import frame08 from "../../portfolio-assets/PORTFOLIO_F08_REFLECTION_SPACE.png";
import frame09 from "../../portfolio-assets/PORTFOLIO_F09_RETURN_TO_NATURE.png";
import frame10 from "../../portfolio-assets/PORTFOLIO_F10_CLOSING_WORLD.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const scenes = [
  { id: "arrival", number: "01", image: frame01, eyebrow: "Arrival", title: "Ankit Bhardwaj", body: "Software, research, systems — inside one living world.", align: "left" },
  { id: "approach", number: "02", image: frame02, eyebrow: "Approach", title: "Curiosity came first.", body: "Before software: life, science, observation, and the need to understand how things connect.", align: "right" },
  { id: "threshold", number: "03", image: frame03, eyebrow: "Threshold", title: "Enter the work slowly.", body: "The portfolio opens as a place to move through, not a stack of disconnected sections.", align: "left" },
  { id: "estate", number: "04", image: frame04, eyebrow: "The estate", title: "Observation becomes structure.", body: "Ideas, signals, systems, projects, and personal interests begin to share the same environment.", align: "right" },
  { id: "study", number: "05", image: frame05, eyebrow: "Natural archive", title: "Biology → signals → engineering.", body: "A quiet study for the scientific roots of the story and the questions that came before the tools.", align: "left" },
  { id: "library", number: "06", image: frame06, eyebrow: "Library", title: "Research and evidence.", body: "A home for published work, experiments, technical thinking, and the details behind decisions.", align: "right" },
  { id: "studio", number: "07", image: frame07, eyebrow: "Creation space", title: "Things built, rebuilt, and refined.", body: "Projects will live here as real work — not generic cards floating over the scenery.", align: "left" },
  { id: "reflection", number: "08", image: frame08, eyebrow: "Reflection", title: "Clarity before complexity.", body: "Process, iteration, unfinished questions, and the patterns that keep returning across different kinds of work.", align: "right" },
  { id: "nature", number: "09", image: frame09, eyebrow: "Beyond the desk", title: "A person is larger than the work.", body: "Drawing, music, basketball, nature, culture, and the parts of life that should not disappear behind a technical identity.", align: "left" },
  { id: "closing", number: "10", image: frame10, eyebrow: "Open horizon", title: "The world stays open.", body: "A quiet closing point for contact, current work, and whatever comes next.", align: "right" },
];

// Each clip is scrubbed by scroll. At the scene rest points the clean still is shown.
// The current repository has seven usable motion clips; the remaining two gaps use a still crossfade
// until matching motion clips are added.
const transitions = [
  { from: 0, to: 1, video: "/portfolio-world/videos/stone-balcony-enter.mp4", label: "Arrival → Approach" },
  { from: 1, to: 2, video: "/portfolio-world/videos/study-window.mp4", label: "Approach → Threshold" },
  { from: 2, to: 3, video: "/portfolio-world/videos/rustic-study-track.mp4", label: "Threshold → Estate" },
  { from: 3, to: 4, video: "/portfolio-world/videos/ancient-library-reverse.mp4", label: "Estate → Study" },
  { from: 4, to: 5, video: "/portfolio-world/videos/library-dolly.mp4", label: "Study → Library" },
  { from: 5, to: 6, video: "/portfolio-world/videos/art-studio-enter.mp4", label: "Library → Studio" },
  { from: 6, to: 7, video: "/portfolio-world/videos/art-studio-glide.mp4", label: "Studio → Reflection" },
  { from: 7, to: 8, video: null, label: "Reflection → Nature" },
  { from: 8, to: 9, video: null, label: "Nature → Closing" },
];

function WorldHeader({ activeIndex }) {
  return (
    <header className="world-header">
      <Link className="world-header__name" href="/redesign">Ankit Bhardwaj</Link>
      <nav className="world-header__nav" aria-label="Portfolio preview navigation">
        <a href="#studio">Work</a>
        <a href="#library">Research</a>
        <Link href="/contact">Contact</Link>
      </nav>
      <div className="world-header__position" aria-live="polite">
        {String(activeIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
      </div>
    </header>
  );
}

function SceneRail({ activeIndex }) {
  return (
    <aside className="scene-rail" aria-label="World chapters">
      {scenes.map((scene, index) => (
        <a key={scene.id} href={`#${scene.id}`} className={index === activeIndex ? "is-active" : ""} aria-label={`Go to ${scene.eyebrow}`}>
          <span>{scene.number}</span><b>{scene.eyebrow}</b>
        </a>
      ))}
    </aside>
  );
}

function RestScene({ scene, index }) {
  return (
    <section id={scene.id} className={`world-rest world-rest--${scene.align}`} data-scene-index={index}>
      <div className="world-rest__stage">
        <Image src={scene.image} alt="" fill priority={index < 2} sizes="100vw" className="world-rest__image" quality={100} />
        <div className="world-rest__shade" />
        <div className="world-rest__copy">
          <p className="world-rest__eyebrow"><span>{scene.number}</span>{scene.eyebrow}</p>
          <h1>{scene.title}</h1>
          <p>{scene.body}</p>
          {index === 0 ? <a className="world-rest__enter" href="#transition-01">Scroll to enter <span>↓</span></a> : null}
          {index === scenes.length - 1 ? (
            <div className="world-rest__actions"><Link href="/contact">Get in touch ↗</Link><a href="#arrival">Return ↑</a></div>
          ) : null}
        </div>
        <div className="world-rest__hint" aria-hidden="true"><span>Still frame</span><i /><span>scroll to move</span></div>
      </div>
    </section>
  );
}

function ScrollVideoTransition({ transition, index, onActive }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const fromScene = scenes[transition.from];
  const toScene = scenes[transition.to];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !transition.video) return;
    const onMetadata = () => {
      // Seek a tiny amount once so Safari/Chromium paints a deterministic first frame.
      try { video.currentTime = 0.001; } catch {}
      setReady(true);
      ScrollTrigger.refresh();
    };
    video.addEventListener("loadedmetadata", onMetadata);
    if (video.readyState >= 1) onMetadata();
    return () => video.removeEventListener("loadedmetadata", onMetadata);
  }, [transition.video]);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    if (!transition.video || !video) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const next = section.querySelector(".transition-fallback__to");
          const prev = section.querySelector(".transition-fallback__from");
          if (prev) prev.style.opacity = String(1 - self.progress);
          if (next) next.style.opacity = String(self.progress);
        },
        onEnter: () => onActive(transition.from),
        onEnterBack: () => onActive(transition.from),
        onLeave: () => onActive(transition.to),
        onLeaveBack: () => onActive(transition.from),
      });
      return;
    }

    const seekToProgress = (progress) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      // Keep away from the exact final encoded frame, which can flash black on some clips.
      const safeDuration = Math.max(0, video.duration - 0.04);
      const time = Math.min(safeDuration, Math.max(0, safeDuration * progress));
      if (Math.abs(video.currentTime - time) > 0.025) {
        try { video.currentTime = time; } catch {}
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.15,
      onEnter: () => onActive(transition.from),
      onEnterBack: () => onActive(transition.from),
      onUpdate: (self) => {
        seekToProgress(self.progress);
        if (self.progress > 0.68) onActive(transition.to); else onActive(transition.from);
      },
      onLeave: () => {
        seekToProgress(1);
        onActive(transition.to);
      },
      onLeaveBack: () => {
        seekToProgress(0);
        onActive(transition.from);
      },
    });

    return () => trigger.kill();
  }, { scope: sectionRef, dependencies: [ready, transition.video] });

  return (
    <section ref={sectionRef} id={`transition-${String(index + 1).padStart(2, "0")}`} className={`world-transition${transition.video ? " has-video" : " is-fallback"}`} aria-label={transition.label}>
      <div className="world-transition__sticky">
        <div className="world-transition__underlay" aria-hidden="true">
          <Image src={fromScene.image} alt="" fill sizes="100vw" className="world-transition__still" quality={100} />
        </div>

        {transition.video ? (
          <video
            ref={videoRef}
            className={`world-transition__video${ready ? " is-ready" : ""}`}
            src={transition.video}
            muted
            playsInline
            preload={index < 2 ? "auto" : "metadata"}
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <div className="transition-fallback" aria-hidden="true">
            <Image src={fromScene.image} alt="" fill sizes="100vw" className="transition-fallback__from" quality={100} />
            <Image src={toScene.image} alt="" fill sizes="100vw" className="transition-fallback__to" quality={100} />
          </div>
        )}

        <div className="world-transition__edge world-transition__edge--start" aria-hidden="true">
          <Image src={fromScene.image} alt="" fill sizes="100vw" quality={100} />
        </div>
        <div className="world-transition__edge world-transition__edge--end" aria-hidden="true">
          <Image src={toScene.image} alt="" fill sizes="100vw" quality={100} />
        </div>

        <div className="world-transition__hud" aria-hidden="true">
          <span>{fromScene.number}</span><i /><strong>{toScene.number}</strong>
          <em>scroll = playback</em>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioWorldBase() {
  const root = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const scope = root.current;
    if (!scope) return;

    const restTriggers = gsap.utils.toArray(".world-rest", scope).map((section, index) => ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => setActiveIndex(index),
      onEnterBack: () => setActiveIndex(index),
    }));

    return () => restTriggers.forEach((trigger) => trigger.kill());
  }, { scope: root });

  return (
    <main ref={root} className="portfolio-world-base portfolio-world-base--scrub">
      <WorldHeader activeIndex={activeIndex} />
      <SceneRail activeIndex={activeIndex} />

      {scenes.map((scene, index) => (
        <div className="world-chapter" key={scene.id}>
          <RestScene scene={scene} index={index} />
          {index < transitions.length ? <ScrollVideoTransition transition={transitions[index]} index={index} onActive={setActiveIndex} /> : null}
        </div>
      ))}
    </main>
  );
}
