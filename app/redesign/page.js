"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
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
  {
    id: "arrival",
    number: "01",
    image: frame01,
    eyebrow: "Arrival",
    title: "Ankit Bhardwaj",
    body: "Software, research, systems — inside one living world.",
    align: "left",
  },
  {
    id: "approach",
    number: "02",
    image: frame02,
    eyebrow: "Approach",
    title: "Curiosity came first.",
    body: "Before software: life, science, observation, and the need to understand how things connect.",
    align: "right",
  },
  {
    id: "threshold",
    number: "03",
    image: frame03,
    eyebrow: "Threshold",
    title: "Enter the work slowly.",
    body: "The portfolio opens as a place to move through, not a stack of disconnected sections.",
    align: "left",
  },
  {
    id: "estate",
    number: "04",
    image: frame04,
    eyebrow: "The estate",
    title: "Observation becomes structure.",
    body: "Ideas, signals, systems, projects, and personal interests begin to share the same environment.",
    align: "right",
  },
  {
    id: "study",
    number: "05",
    image: frame05,
    eyebrow: "Natural archive",
    title: "Biology → signals → engineering.",
    body: "A quiet study for the scientific roots of the story and the questions that came before the tools.",
    align: "left",
  },
  {
    id: "library",
    number: "06",
    image: frame06,
    eyebrow: "Library",
    title: "Research and evidence.",
    body: "A home for published work, experiments, technical thinking, and the details behind decisions.",
    align: "right",
  },
  {
    id: "studio",
    number: "07",
    image: frame07,
    eyebrow: "Creation space",
    title: "Things built, rebuilt, and refined.",
    body: "Projects will live here as real work — not generic cards floating over the scenery.",
    align: "left",
  },
  {
    id: "reflection",
    number: "08",
    image: frame08,
    eyebrow: "Reflection",
    title: "Clarity before complexity.",
    body: "Process, iteration, unfinished questions, and the patterns that keep returning across different kinds of work.",
    align: "right",
  },
  {
    id: "nature",
    number: "09",
    image: frame09,
    eyebrow: "Beyond the desk",
    title: "A person is larger than the work.",
    body: "Drawing, music, basketball, nature, culture, and the parts of life that should not disappear behind a technical identity.",
    align: "left",
  },
  {
    id: "closing",
    number: "10",
    image: frame10,
    eyebrow: "Open horizon",
    title: "The world stays open.",
    body: "A quiet closing point for contact, current work, and whatever comes next.",
    align: "right",
  },
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
        <a
          key={scene.id}
          href={`#${scene.id}`}
          className={index === activeIndex ? "is-active" : ""}
          aria-label={`Go to ${scene.eyebrow}`}
        >
          <span>{scene.number}</span>
          <b>{scene.eyebrow}</b>
        </a>
      ))}
    </aside>
  );
}

function Scene({ scene, index }) {
  return (
    <section
      id={scene.id}
      className={`world-scene world-scene--${scene.align}`}
      data-scene-index={index}
    >
      <div className="world-scene__stage">
        <div className="world-scene__media" aria-hidden="true">
          <Image
            src={scene.image}
            alt=""
            fill
            priority={index < 2}
            sizes="100vw"
            className="world-scene__image"
            quality={100}
          />
          <div className="world-scene__shade" />
          <div className="world-scene__light" />
        </div>

        <div className="world-scene__copy">
          <p className="world-scene__eyebrow"><span>{scene.number}</span>{scene.eyebrow}</p>
          <h1>{scene.title}</h1>
          <p className="world-scene__body">{scene.body}</p>
          {index === 0 ? (
            <div className="world-scene__actions">
              <a href="#approach">Enter the world <span>↓</span></a>
              <Link href="/projects">Selected work <span>↗</span></Link>
            </div>
          ) : null}
          {index === scenes.length - 1 ? (
            <div className="world-scene__actions">
              <Link href="/contact">Get in touch <span>↗</span></Link>
              <a href="#arrival">Return to the beginning <span>↑</span></a>
            </div>
          ) : null}
        </div>

        <div className="world-scene__caption" aria-hidden="true">
          <span>{scene.eyebrow}</span>
          <i />
          <span>Portfolio world · 2026</span>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioWorldBase() {
  const root = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasAudioSources = useMemo(() => scenes.some((scene) => Boolean(scene.audio)), []);

  useGSAP(() => {
    const scope = root.current;
    if (!scope) return;

    const media = gsap.matchMedia();

    gsap.utils.toArray(".world-scene", scope).forEach((section, index) => {
      const image = section.querySelector(".world-scene__image");
      const copy = section.querySelector(".world-scene__copy");
      const light = section.querySelector(".world-scene__light");

      ScrollTrigger.create({
        trigger: section,
        start: "top 52%",
        end: "bottom 48%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          image,
          { scale: 1.035, yPercent: 1.2 },
          {
            scale: 1,
            yPercent: -1.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        gsap.fromTo(
          copy,
          { y: 28, opacity: 0 },
          {
            y: -18,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "center 42%",
              scrub: 0.55,
            },
          },
        );

        gsap.fromTo(
          light,
          { opacity: 0.04, xPercent: -8 },
          {
            opacity: 0.24,
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => media.revert();
  }, { scope: root });

  return (
    <main ref={root} className="portfolio-world-base">
      <WorldHeader activeIndex={activeIndex} />
      <SceneRail activeIndex={activeIndex} />

      <div className="portfolio-world-base__intro-note">
        <span>Visual base</span>
        <p>Clean master frames first. Interactions, object layers, transition video, and sound are added on top.</p>
      </div>

      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}

      {hasAudioSources ? <div className="world-audio-slot" data-audio-ready="true" /> : null}
    </main>
  );
}
