"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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

  const durationRef = useRef(56);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);
  const videoFrameCallbackRef = useRef(null);
  const [metadataReady, setMetadataReady] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useLenis(() => ScrollTrigger.update());

  const updateBufferLabel = useCallback(() => {
    const video = videoRef.current;
    const label = loadingRef.current;
    if (!video || !label || !Number.isFinite(video.duration) || video.duration <= 0) return;

    let bufferedEnd = 0;
    for (let index = 0; index < video.buffered.length; index += 1) {
      bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
    }
    const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
    label.textContent = percent > 0 ? `Preparing motion · ${percent}%` : "Preparing motion";
  }, []);

  useEffect(() => {
    const pumpSeek = () => {
      const video = videoRef.current;
      if (video && metadataReady && Number.isFinite(video.duration) && !video.seeking) {
        const desired = clamp(targetTimeRef.current, 0, Math.max(0, video.duration - 0.02));
        const delta = desired - video.currentTime;

        // The old builds continuously replaced currentTime while the decoder was
        // already seeking, which made the picture judder. One seek is allowed to
        // finish before the next target is issued; intermediate wheel events are
        // deliberately discarded in favour of the newest target.
        if (Math.abs(delta) > SEEK_EPSILON) {
          try {
            video.currentTime = desired;
          } catch {
            // Keep the previous decoded frame visible until the browser is ready.
          }
        }
      }

      rafRef.current = requestAnimationFrame(pumpSeek);
    };

    rafRef.current = requestAnimationFrame(pumpSeek);
    return () => cancelAnimationFrame(rafRef.current);
  }, [metadataReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof video.requestVideoFrameCallback !== "function") return undefined;

    const observeDecodedFrames = () => {
      videoFrameCallbackRef.current = video.requestVideoFrameCallback(() => {
        if (!firstFrameReady && video.readyState >= 2) setFirstFrameReady(true);
        observeDecodedFrames();
      });
    };

    observeDecodedFrames();
    return () => {
      if (
        videoFrameCallbackRef.current !== null &&
        typeof video.cancelVideoFrameCallback === "function"
      ) {
        video.cancelVideoFrameCallback(videoFrameCallbackRef.current);
      }
    };
  }, [firstFrameReady]);

  useGSAP(() => {
    if (!metadataReady) return undefined;

    const playhead = { time: 0 };
    const tween = gsap.to(playhead, {
      time: durationRef.current,
      ease: "none",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        targetTimeRef.current = playhead.time;

        const trigger = tween.scrollTrigger;
        const progress = trigger ? trigger.progress : 0;
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
      },
    });

    return () => tween.kill();
  }, { scope: rootRef, dependencies: [metadataReady] });

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    durationRef.current = video.duration;
    targetTimeRef.current = 0;
    video.pause();
    try {
      video.currentTime = 0.001;
    } catch {
      // loadeddata will make the first decoded frame available shortly.
    }
    setMetadataReady(true);
    updateBufferLabel();
    requestAnimationFrame(() => ScrollTrigger.refresh());
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
