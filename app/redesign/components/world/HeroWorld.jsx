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

        gsap.to(".hero-world__clouds", { yPercent: 8, xPercent: -3, scale: 1.03, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__far-mountains", { yPercent: 4, scale: 1.025, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__mid-mountains", { yPercent: 9, xPercent: -2, scale: 1.035, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__forest", { yPercent: 14, xPercent: 2, scale: 1.045, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__mist", { yPercent: 16, xPercent: 5, opacity: 0.54, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__arch", { yPercent: -9, xPercent: -5, rotate: -0.8, scale: 1.025, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__river", { yPercent: -13, xPercent: 3, scale: 1.045, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__meadow", { yPercent: -17, scale: 1.055, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__flowers", { yPercent: -24, xPercent: -3, rotate: 0.5, scale: 1.065, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-world__vines", { yPercent: -20, xPercent: 4, rotate: -0.4, ease: "none", scrollTrigger: scroll });
      },
    );

    return () => media.revert();
  }, { scope: scene });

  return (
    <div ref={scene} className="hero-world">
      <div className="hero-world__sky" aria-hidden="true" />
      <div className="hero-world__light" aria-hidden="true" />

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
      <div className="hero-world__layer hero-world__mist" aria-hidden="true">
        <DecorativeImage src={layers.mist} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__arch" aria-hidden="true">
        <DecorativeImage src={layers.arch} className="hero-world__image" priority sizes="40vw" />
      </div>
      <div className="hero-world__layer hero-world__river" aria-hidden="true">
        <DecorativeImage src={layers.river} className="hero-world__image hero-world__river-base" priority sizes="70vw" />
        <div className="hero-world__water-light hero-world__water-light--one" />
        <div className="hero-world__water-light hero-world__water-light--two" />
      </div>
      <div className="hero-world__layer hero-world__meadow" aria-hidden="true">
        <DecorativeImage src={layers.meadow} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__flowers" aria-hidden="true">
        <DecorativeImage src={layers.flowerBed} className="hero-world__image" priority sizes="70vw" />
      </div>
      <div className="hero-world__layer hero-world__vines" aria-hidden="true">
        <DecorativeImage src={layers.hangingVines} className="hero-world__image" priority sizes="35vw" />
      </div>

      <div className="hero-world__veil" aria-hidden="true" />

      <button
        type="button"
        className="hero-world__plaque"
        aria-expanded={noteOpen}
        aria-controls="hero-world-note"
        onClick={() => setNoteOpen((value) => !value)}
      >
        <span>Field note</span>
        <b>{noteOpen ? "Close" : "Open"}</b>
      </button>

      <div id="hero-world-note" className={`hero-world__note${noteOpen ? " is-open" : ""}`} aria-hidden={!noteOpen}>
        <span>01 · Mountain morning</span>
        <p>A calm surface can still hold active depth. The landscape moves slowly; the work remains clear.</p>
      </div>
    </div>
  );
}
