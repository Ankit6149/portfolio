"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { techIcons } from "../lib/site-data";

export function TechStrip() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let paused = false;
    const handleEnter = () => (paused = true);
    const handleLeave = () => (paused = false);

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    let rafId;
    let offset = 0;
    const speed = 0.6; // Increased speed for a more dynamic feel

    function animate() {
      if (!paused) {
        offset -= speed;
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(offset) >= halfWidth) {
          offset += halfWidth;
        }
        track.style.transform = `translateX(${offset}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const duplicatedIcons = [...techIcons, ...techIcons];

  return (
    <section className="tech-strip" aria-label="Technology stack" style={{ marginBottom: "5rem" }}>
      <div className="tech-strip-inner">
        {/* Left label */}
        <div className="tech-strip-label tech-strip-label--left">
          <span>Core Stack</span>
        </div>

        {/* Scrolling track */}
        <div className="tech-strip-overflow">
          <div className="tech-strip-track" ref={trackRef}>
            {duplicatedIcons.map((tech, i) => (
              <div key={`${tech.label}-${i}`} className="tech-strip-item">
                <Icon icon={tech.icon} width={32} height={32} />
                <span className="tech-strip-item-label">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right label */}
        <div className="tech-strip-label tech-strip-label--right">
          <span>[ 43+ TECHNOLOGIES ]</span>
        </div>
      </div>
    </section>
  );
}
