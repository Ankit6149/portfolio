"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "../v1-art.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function V1Experience({ children }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion media query
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, motion } = context.conditions;

          // 1. Initial Hero Entry Timeline
          const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

          heroTl
            .fromTo(
              ".js-hero-bg-plate",
              { opacity: 0, scale: 1.04 },
              { opacity: 0.92, scale: 1, duration: 1.4 }
            )
            .fromTo(
              ".js-hero-fg-branch",
              { opacity: 0, y: -25, rotate: 2 },
              { opacity: 0.96, y: 0, rotate: 0, duration: 1.2 },
              "-=1.0"
            )
            .fromTo(
              ".js-hero-reveal",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.8 },
              "-=0.9"
            )
            .fromTo(
              ".js-hero-headline",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 1.0 },
              "-=0.7"
            )
            .fromTo(
              ".js-hero-thread-line",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, ease: "power1.inOut" },
              "-=0.5"
            )
            .fromTo(
              [".js-hero-bio", ".js-hero-cta"],
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
              "-=0.6"
            )
            .fromTo(
              ".js-hero-quote",
              { opacity: 0, x: 20 },
              { opacity: 1, x: 0, duration: 0.9 },
              "-=0.7"
            );

          // If reduced motion is requested, stop complex scroll scrubbing
          if (!motion) return;

          // 2. Continuous Living Thread Scrubbing
          const threadPath = document.getElementById("js-living-thread");
          if (threadPath) {
            const length = threadPath.getTotalLength() || 1200;
            gsap.set(threadPath, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });

            gsap.to(threadPath, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
              },
            });
          }

          // 3. Differential Parallax on Desktop
          if (desktop) {
            // Midground Wash Plate (2-4% translation)
            gsap.to(".js-hero-bg-plate", {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            // Foreground Branch (7-12% differential translation)
            gsap.to(".js-hero-fg-branch", {
              yPercent: -18,
              xPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            // Story Strata subtle parallax
            gsap.to(".js-story-bg-strata", {
              yPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: "#story",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });

            // Staggered Narrative Milestones Reveal
            gsap.utils.toArray(".js-milestone-node").forEach((node) => {
              gsap.fromTo(
                node,
                { opacity: 0.35, y: 35 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: node,
                    start: "top 82%",
                    end: "top 50%",
                    scrub: 0.4,
                  },
                }
              );
            });

            // Project Chapters Media & Narrative Shift
            gsap.utils.toArray(".js-work-chapter").forEach((chapter) => {
              const visual = chapter.querySelector(`.${styles.evidenceVisualStage}`);
              if (visual) {
                gsap.fromTo(
                  visual,
                  { y: 40, opacity: 0.85 },
                  {
                    y: -20,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: chapter,
                      start: "top 80%",
                      end: "bottom 30%",
                      scrub: 0.6,
                    },
                  }
                );
              }
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div ref={rootRef} className={styles.experienceWrapper}>
        {children}
      </div>
    </ReactLenis>
  );
}
