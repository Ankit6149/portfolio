"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroWorldAssets as layers } from "../../data/hero-world-assets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function DecorativeImage({ className, src, priority = false, sizes = "100vw" }) {
  return (
    <Image
      className={className}
      src={src}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      draggable={false}
      aria-hidden="true"
      unoptimized
    />
  );
}

export default function HeroWorld() {
  const scene = useRef(null);
  const [noteOpen, setNoteOpen] = useState(false);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 900px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions.motion) return;

        const scroll = {
          trigger: ".redesign-hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        };

        gsap.to(".hero-world__clouds", { yPercent: 7, xPercent: -3, scale: 1.03, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__far-mountains", { yPercent: 4, scale: 1.025, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__mid-mountains", { yPercent: 9, xPercent: -2, scale: 1.035, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__forest", { yPercent: 13, xPercent: 2, scale: 1.045, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__mist--one", { yPercent: 15, xPercent: 5, opacity: 0.5, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__mist--two", { yPercent: 20, xPercent: -6, opacity: 0.26, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__estate", { yPercent: -8, xPercent: -5, rotate: -0.8, scale: 1.025, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__river", { yPercent: -13, xPercent: 3, scale: 1.045, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__meadow--left", { yPercent: -16, scale: 1.05, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__meadow--right", { yPercent: -18, scale: 1.055, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__flowers", { yPercent: -23, xPercent: -3, rotate: 0.45, scale: 1.06, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__vines", { yPercent: -19, xPercent: 4, rotate: -0.4, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__identity", { yPercent: -13, opacity: 0.3, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__route-progress", { scaleX: 1, ease: "none", scrollTrigger: scroll });
      },
    );

    return () => media.revert();
  }, { scope: scene });

  return (
    <div ref={scene} className="hero-world">
      <div className="hero-world__sky" aria-hidden="true" />
      <div className="hero-world__light" aria-hidden="true" />
      <div className="hero-world__grain" aria-hidden="true" />

      <div className="hero-world__layer hero-world__clouds" aria-hidden="true">
        <DecorativeImage src={layers.clouds} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__far-mountains" aria-hidden="true">
        <DecorativeImage src={layers.farMountains} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__mid-mountains" aria-hidden="true">
        <DecorativeImage src={layers.midMountains} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__forest" aria-hidden="true">
        <DecorativeImage src={layers.forest} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__mist hero-world__mist--one" aria-hidden="true">
        <DecorativeImage src={layers.mist} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__mist hero-world__mist--two" aria-hidden="true">
        <DecorativeImage src={layers.mist} className="hero-world__image" priority />
      </div>

      <div className="hero-world__layer hero-world__river" aria-hidden="true">
        <div className="hero-world__river-shadow" />
        <DecorativeImage src={layers.river} className="hero-world__image hero-world__river-base" priority sizes="70vw" />
        <div className="hero-world__water-light hero-world__water-light--one" />
        <div className="hero-world__water-light hero-world__water-light--two" />
        <div className="hero-world__river-glint" />
      </div>

      <div className="hero-world__layer hero-world__meadow hero-world__meadow--left" aria-hidden="true">
        <DecorativeImage src={layers.meadow} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__meadow hero-world__meadow--right" aria-hidden="true">
        <DecorativeImage src={layers.meadow} className="hero-world__image" priority />
      </div>

      <div className="hero-world__layer hero-world__estate" aria-hidden="true">
        <div className="hero-world__estate-foundation" />
        <div className="hero-world__estate-shadow" />
        <DecorativeImage src={layers.arch} className="hero-world__image hero-world__estate-arch" priority sizes="38vw" />
      </div>

      <div className="hero-world__layer hero-world__flowers" aria-hidden="true">
        <DecorativeImage src={layers.flowerBed} className="hero-world__image" priority sizes="65vw" />
      </div>
      <div className="hero-world__layer hero-world__vines" aria-hidden="true">
        <DecorativeImage src={layers.hangingVines} className="hero-world__image" priority sizes="35vw" />
      </div>

      <div className="hero-world__atmosphere" aria-hidden="true" />
      <div className="hero-world__veil" aria-hidden="true" />

      <div className="hero-world__identity">
        <p className="hero-world__eyebrow">
          <span>Portfolio · 2026</span>
          <i />
          <span>Software, research, systems</span>
        </p>
        <h1>
          <span>Systems thinking,</span>
          <em>expressed through software.</em>
        </h1>
        <div className="hero-world__summary">
          <p>I build thoughtful software across products, research, and experiments—guided by curiosity about people, systems, and the natural world.</p>
          <div className="hero-world__actions">
            <a className="hero-world__button hero-world__button--primary" href="#work"><span>Explore selected work</span><b>↘</b></a>
            <a className="hero-world__button hero-world__button--quiet" href="#origin"><span>Read the story</span><b>→</b></a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-world__marker"
        aria-expanded={noteOpen}
        aria-controls="hero-world-note"
        onClick={() => setNoteOpen((value) => !value)}
      >
        <span>01</span>
        <b>Field note</b>
      </button>

      <aside id="hero-world-note" className={`hero-world__note${noteOpen ? " is-open" : ""}`} aria-hidden={!noteOpen}>
        <small>Observation 01</small>
        <h2>A world should hold attention without trapping it.</h2>
        <p>The scenery moves gently. The content remains usable, readable, and professional.</p>
        <button type="button" onClick={() => setNoteOpen(false)}>Close</button>
      </aside>

      <div className="hero-world__route" aria-hidden="true">
        <span>Follow the river</span>
        <i><b className="hero-world__route-progress" /></i>
        <strong>01 / 04</strong>
      </div>
    </div>
  );
}
