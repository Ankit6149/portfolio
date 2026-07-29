"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const layers = {
  farMountains: "/portfolio-world/scenery/mountains/far-snow.webp",
  midMountains: "/portfolio-world/scenery/mountains/mid-green.webp",
  forest: "/portfolio-world/scenery/midground/forest-line.webp",
  mist: "/portfolio-world/scenery/mist/mist-band.webp",
  meadow: "/portfolio-world/scenery/ground/meadow.webp",
  clouds: "/portfolio-world/scenery/sky/clouds.webp",
  river: "/portfolio-world/water/winding-river.webp",
  arch: "/portfolio-world/architecture/arches/side-arch.webp",
  flowerBed: "/portfolio-world/flora/foreground/flower-bed.webp",
  hangingVines: "/portfolio-world/flora/hanging/hanging-vines.webp",
};

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
    <div ref={scene} className="hero-world" aria-hidden="true">
      <div className="hero-world__sky" />
      <div className="hero-world__light" />

      <div className="hero-world__layer hero-world__clouds">
        <DecorativeImage src={layers.clouds} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__far-mountains">
        <DecorativeImage src={layers.farMountains} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__mid-mountains">
        <DecorativeImage src={layers.midMountains} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__forest">
        <DecorativeImage src={layers.forest} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__mist">
        <DecorativeImage src={layers.mist} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__arch">
        <DecorativeImage src={layers.arch} className="hero-world__image" priority sizes="40vw" />
      </div>
      <div className="hero-world__layer hero-world__river">
        <DecorativeImage src={layers.river} className="hero-world__image hero-world__river-base" priority sizes="70vw" />
        <div className="hero-world__water-light hero-world__water-light--one" />
        <div className="hero-world__water-light hero-world__water-light--two" />
      </div>
      <div className="hero-world__layer hero-world__meadow">
        <DecorativeImage src={layers.meadow} className="hero-world__image" priority />
      </div>
      <div className="hero-world__layer hero-world__flowers">
        <DecorativeImage src={layers.flowerBed} className="hero-world__image" priority sizes="70vw" />
      </div>
      <div className="hero-world__layer hero-world__vines">
        <DecorativeImage src={layers.hangingVines} className="hero-world__image" priority sizes="35vw" />
      </div>

      <div className="hero-world__veil" />

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
