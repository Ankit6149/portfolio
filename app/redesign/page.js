"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";

const MASTER_VIDEO = "/portfolio-world/master/master-scroll-1080p.mp4";
const SCROLL_HEIGHT = 1180;
const SEEK_EPSILON = 1 / 36;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ContinuousVideoWorld() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const loadingRef = useRef(null);
  const rafRef = useRef(null);

  const durationRef = useRef(56);
  const targetTimeRef = useRef(0);
  const [metadataReady, setMetadataReady] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const tick = () => {
      const root = rootRef.current;
      const video = videoRef.current;

      if (root) {
        const maxScroll = Math.max(1, root.offsetHeight - window.innerHeight);
        const rootTop = root.getBoundingClientRect().top;
        const progress = clamp(-rootTop / maxScroll, 0, 1);

        targetTimeRef.current = progress * durationRef.current;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.max(0.004, progress)})`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(progress * 100)}%`;
        }
        if (introRef.current) {
          const opacity = clamp(1 - progress / 0.075, 0, 1);
          introRef.current.style.opacity = String(opacity);
          introRef.current.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
        }
      }

      if (video && metadataReady && Number.isFinite(video.duration) && !video.seeking) {
        const desired = clamp(targetTimeRef.current, 0, Math.max(0, video.duration - 0.02));
        const delta = desired - video.currentTime;

        if (Math.abs(delta) > SEEK_EPSILON) {
          try {
            video.currentTime = desired;
          } catch {
            // Preserve the last decoded frame until the media element catches up.
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [metadataReady]);

  const updateBufferLabel = () => {
    const video = videoRef.current;
    const label = loadingRef.current;
    if (!video || !label || !Number.isFinite(video.duration) || video.duration <= 0) return;

    let bufferedEnd = 0;
    for (let index = 0; index < video.buffered.length; index += 1) {
      bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
    }
    const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
    label.textContent = percent > 0 ? `Preparing motion · ${percent}%` : "Preparing motion";
  };

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    durationRef.current = video.duration;
    targetTimeRef.current = 0;
    video.pause();
    setMetadataReady(true);

    try {
      video.currentTime = 0.001;
    } catch {
      // loadeddata will reveal the first decoded frame when available.
    }

    updateBufferLabel();
  };

  const handleLoadedData = () => {
    setFirstFrameReady(true);
    setLoadError(false);
    updateBufferLabel();
  };

  return (
    <main
      ref={rootRef}
      className="continuous-world"
      data-render-mode="single-master-video"
      data-video-ready={firstFrameReady ? "true" : "false"}
      data-world-sequence="01-10"
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
          className={`continuous-world__poster${firstFrameReady ? " is-hidden" : ""}`}
        />

        <video
          ref={videoRef}
          className={`continuous-world__video${firstFrameReady ? " is-ready" : ""}`}
          src={MASTER_VIDEO}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={handleMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleLoadedData}
          onProgress={updateBufferLabel}
          onError={() => setLoadError(true)}
          aria-label="A continuous cinematic journey through Ankit Bhardwaj's portfolio world"
        />

        <div className="continuous-world__veil" aria-hidden="true" />

        <header className="continuous-world__header">
          <Link href="/redesign" className="continuous-world__brand">Ankit Bhardwaj</Link>
          <nav aria-label="Portfolio navigation">
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <div ref={introRef} className="continuous-world__intro">
          <p>Scroll to move through the world</p>
          <h1>Ankit Bhardwaj</h1>
          <span>Software, research, systems — and the questions that came before them.</span>
        </div>

        {!firstFrameReady && !loadError ? (
          <div className="continuous-world__loading" role="status">
            <span /> <b ref={loadingRef}>Preparing motion</b>
          </div>
        ) : null}

        {loadError ? (
          <div className="continuous-world__loading continuous-world__loading--error" role="status">
            Motion is unavailable. The high-resolution opening still remains visible.
          </div>
        ) : null}

        <div className="continuous-world__progress" aria-hidden="true">
          <i ref={progressRef} />
          <span ref={percentRef}>0%</span>
        </div>
      </div>
    </main>
  );
}

export default function PortfolioWorldBase() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.105,
        smoothWheel: true,
        wheelMultiplier: 0.72,
        touchMultiplier: 1,
      }}
    >
      <ContinuousVideoWorld />
    </ReactLenis>
  );
}
