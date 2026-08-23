"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const clips = [
  { src: "/portfolio-world/videos/stone-balcony-enter.mp4", label: "Balcony" },
  { src: "/portfolio-world/videos/study-window.mp4", label: "Study" },
  { src: "/portfolio-world/videos/ancient-library-reverse.mp4", label: "Archive" },
  { src: "/portfolio-world/videos/rustic-study-track.mp4", label: "Passage" },
  { src: "/portfolio-world/videos/art-studio-enter.mp4", label: "Studio" },
  { src: "/portfolio-world/videos/art-studio-glide.mp4", label: "Creation" },
  { src: "/portfolio-world/videos/library-dolly.mp4", label: "Library" },
];

const OVERLAP = 0.085;
const SCROLL_HEIGHT = 860;

export default function PortfolioWorldBase() {
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const durationRefs = useRef(clips.map(() => 8));
  const targetProgress = useRef(0);
  const renderedProgress = useRef(0);
  const rafRef = useRef(null);
  const [readyCount, setReadyCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTimeline = useCallback((progress) => {
    const videos = videoRefs.current;
    const totalUnits = clips.length - (clips.length - 1) * OVERLAP;
    const playhead = Math.min(totalUnits, Math.max(0, progress * totalUnits));
    let strongestIndex = 0;
    let strongestOpacity = -1;

    videos.forEach((video, index) => {
      if (!video) return;
      const start = index * (1 - OVERLAP);
      const local = playhead - start;

      if (local < 0 || local > 1) {
        video.style.opacity = "0";
        video.style.zIndex = "1";
        return;
      }

      let opacity = 1;
      if (index > 0 && local < OVERLAP) opacity = local / OVERLAP;
      if (index < clips.length - 1 && local > 1 - OVERLAP) {
        opacity = Math.min(opacity, (1 - local) / OVERLAP);
      }

      const duration = durationRefs.current[index] || 8;
      const targetTime = Math.max(0, Math.min(duration - 0.035, duration * local));
      if (Number.isFinite(video.duration) && Math.abs(video.currentTime - targetTime) > 0.014) {
        try { video.currentTime = targetTime; } catch {}
      }

      video.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      video.style.zIndex = String(2 + index);

      if (opacity > strongestOpacity) {
        strongestOpacity = opacity;
        strongestIndex = index;
      }
    });

    setActiveIndex((current) => current === strongestIndex ? current : strongestIndex);
  }, []);

  useEffect(() => {
    const tick = () => {
      const target = targetProgress.current;
      const current = renderedProgress.current;
      const distance = target - current;
      const next = Math.abs(distance) < 0.00008 ? target : current + distance * 0.19;
      renderedProgress.current = next;
      renderTimeline(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [renderTimeline]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { targetProgress.current = self.progress; },
      onRefresh: (self) => { targetProgress.current = self.progress; },
    });

    return () => trigger.kill();
  }, { scope: rootRef });

  const handleMetadata = (index) => {
    const video = videoRefs.current[index];
    if (!video || !Number.isFinite(video.duration)) return;
    durationRefs.current[index] = video.duration;
    try { video.currentTime = 0.001; } catch {}
    video.dataset.ready = "true";
    setReadyCount((count) => Math.min(clips.length, count + 1));
  };

  return (
    <main
      ref={rootRef}
      className="continuous-world"
      style={{ "--scroll-height": `${SCROLL_HEIGHT}svh` }}
    >
      <div className="continuous-world__stage">
        <Image
          src={frame01}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={100}
          className={`continuous-world__poster${readyCount ? " is-hidden" : ""}`}
        />

        <div className="continuous-world__videos" aria-hidden="true">
          {clips.map((clip, index) => (
            <video
              key={clip.src}
              ref={(node) => { videoRefs.current[index] = node; }}
              src={clip.src}
              muted
              playsInline
              preload={index < 3 ? "auto" : "metadata"}
              onLoadedMetadata={() => handleMetadata(index)}
              className="continuous-world__video"
            />
          ))}
        </div>

        <div className="continuous-world__veil" />

        <header className="continuous-world__header">
          <span>Ankit Bhardwaj</span>
          <span>{clips[activeIndex]?.label || "World"}</span>
        </header>

        <div className="continuous-world__intro">
          <p>Scroll is the camera.</p>
          <h1>One continuous world.</h1>
          <span>No chapter stops. No page breaks. The film moves only as you move.</span>
        </div>

        <div className="continuous-world__progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(0.015, (activeIndex + 1) / clips.length)})` }} />
        </div>
      </div>
    </main>
  );
}
